import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { generateSitemap, generateRobotsTxt } from "./seo";
import { z } from "zod";

const mechanicSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  vehicleType: z.string(),
  serviceId: z.string().optional(),
  radiusKm: z.number().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO Routes
  app.get('/sitemap.xml', (req, res) => {
    try {
      res.setHeader('Content-Type', 'application/xml');
      res.send(generateSitemap());
    } catch (error) {
      res.status(500).send('Error generating sitemap');
    }
  });

  app.get('/robots.txt', (req, res) => {
    try {
      res.setHeader('Content-Type', 'text/plain');
      res.send(generateRobotsTxt());
    } catch (error) {
      res.status(500).send('Error generating robots.txt');
    }
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Get services by vehicle type
  app.get("/api/services/:vehicleType", async (req, res) => {
    try {
      const { vehicleType } = req.params;
      const services = await storage.getServicesByVehicleType(vehicleType);
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Search mechanics
  app.post("/api/mechanics/search", async (req, res) => {
    try {
      const searchParams = mechanicSearchSchema.parse(req.body);
      const mechanics = await storage.searchMechanics(searchParams);
      res.json(mechanics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid search parameters", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to search mechanics" });
      }
    }
  });

  // OTP endpoints
  app.post("/api/otp/send", async (req, res) => {
    const { phone } = req.body;
    
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }
    
    try {
      // Generate session ID and OTP
      const sessionId = Math.random().toString(36).substring(2, 15);
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in memory (in production, use Redis or similar)
      (global as any).otpStore = (global as any).otpStore || {};
      (global as any).otpStore[sessionId] = {
        phone,
        code: otpCode,
        timestamp: Date.now(),
        verified: false
      };
      
      // In production, send SMS via Twilio/SMS service
      console.log(`OTP for ${phone}: ${otpCode}`);
      
      res.json({ sessionId, message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ error: 'Failed to send OTP' });
    }
  });

  app.post("/api/otp/verify", async (req, res) => {
    const { phone, sessionId, code } = req.body;
    
    if (!phone || !sessionId || !code) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
      (global as any).otpStore = (global as any).otpStore || {};
      const otpData = (global as any).otpStore[sessionId];
      
      if (!otpData) {
        return res.status(400).json({ error: 'Invalid session' });
      }
      
      if (otpData.phone !== phone) {
        return res.status(400).json({ error: 'Phone number mismatch' });
      }
      
      // Check if OTP expired (5 minutes)
      if (Date.now() - otpData.timestamp > 5 * 60 * 1000) {
        delete (global as any).otpStore[sessionId];
        return res.status(400).json({ error: 'OTP expired' });
      }
      
      if (otpData.code !== code) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
      
      // Mark as verified and generate token
      otpData.verified = true;
      const otpToken = Math.random().toString(36).substring(2, 15);
      (global as any).otpStore[`token_${otpToken}`] = { phone, verified: true, timestamp: Date.now() };
      
      res.json({ verified: true, otpToken });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });

  // Create lead (enhanced for new flow)
  app.post("/api/leads", async (req, res) => {
    try {
      const { vehicle, city, services, addons, estTotal, customer, address, otpToken } = req.body;
      
      // Verify OTP token if provided
      if (otpToken) {
        (global as any).otpStore = (global as any).otpStore || {};
        const tokenData = (global as any).otpStore[`token_${otpToken}`];
        if (!tokenData || !tokenData.verified || tokenData.phone !== customer.phone) {
          return res.status(400).json({ error: 'Invalid or expired OTP token' });
        }
      }
      
      // Validate NCR city
      const ncrCities = ['delhi', 'gurugram', 'noida', 'ghaziabad', 'faridabad'];
      if (city && !ncrCities.includes(city?.toLowerCase())) {
        return res.status(400).json({ error: 'Service not available in this city' });
      }
      
      const leadData = {
        customerName: customer.name,
        customerPhone: customer.phone,
        address: address.text,
        lat: address.lat,
        lng: address.lng,
        vehicleType: vehicle,
        serviceId: services[0]?.id, // Primary service
        totalAmount: estTotal?.max || estTotal?.min || services.reduce((sum: number, s: any) => sum + s.price, 0),
        status: 'pending'
      };
      
      const lead = await storage.createLead(leadData);
      
      // Add initial status update
      await storage.addStatusUpdate({
        leadId: lead.id,
        status: "confirmed",
        message: "Your booking has been confirmed and assigned to a mechanic"
      });

      res.json({ trackingId: lead.trackingId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid lead data", details: error.errors });
      } else {
        console.error('Error creating lead:', error);
        res.status(500).json({ error: "Failed to create lead" });
      }
    }
  });

  // Create booking (new booking flow)
  app.post("/api/booking", async (req, res) => {
    try {
      const { nanoid } = await import('nanoid');
      
      // Generate tracking ID
      const trackingId = `GW-${nanoid(8).toUpperCase()}`;
      
      // Mock response for booking submission
      res.status(201).json({ 
        ok: true, 
        trackingId,
        message: 'Booking received successfully. A mechanic will contact you shortly.'
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  });

  // Track lead by tracking ID
  app.get("/api/track/:trackingId", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const lead = await storage.getLeadByTrackingId(trackingId);
      
      if (!lead) {
        res.status(404).json({ error: "Tracking ID not found" });
        return;
      }

      const statusUpdates = await storage.getStatusUpdatesByLeadId(lead.id);
      const mechanic = lead.mechanicId ? await storage.getMechanicById(lead.mechanicId) : null;

      res.json({
        id: lead.id,
        trackingId: lead.trackingId,
        status: lead.status,
        customerName: lead.customerName,
        customerPhone: lead.customerPhone,
        address: lead.address,
        vehicleType: lead.vehicleType,
        services: [{ id: lead.serviceId, name: "Service", price: lead.totalAmount }],
        mechanic: mechanic ? {
          name: mechanic.name,
          phone: mechanic.phone,
          rating: mechanic.rating
        } : undefined,
        totalAmount: lead.totalAmount,
        createdAt: lead.createdAt
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracking information" });
    }
  });

  // Track lead by customer details
  app.post("/api/track/customer", async (req, res) => {
    try {
      const { name, phone } = req.body;
      
      if (!name || !phone) {
        res.status(400).json({ error: "Name and phone are required" });
        return;
      }

      const leads = await storage.getAllLeads();
      const matchingLead = leads.find(lead => 
        lead.customerName.toLowerCase().includes(name.toLowerCase()) && 
        lead.customerPhone.includes(phone)
      );
      
      if (!matchingLead) {
        res.status(404).json({ error: "No booking found with provided details" });
        return;
      }

      const statusUpdates = await storage.getStatusUpdatesByLeadId(matchingLead.id);
      const mechanic = matchingLead.mechanicId ? await storage.getMechanicById(matchingLead.mechanicId) : null;

      res.json({
        id: matchingLead.id,
        trackingId: matchingLead.trackingId,
        status: matchingLead.status,
        customerName: matchingLead.customerName,
        customerPhone: matchingLead.customerPhone,
        address: matchingLead.address,
        vehicleType: matchingLead.vehicleType,
        services: [{ id: matchingLead.serviceId, name: "Service", price: matchingLead.totalAmount }],
        mechanic: mechanic ? {
          name: mechanic.name,
          phone: mechanic.phone,
          rating: mechanic.rating
        } : undefined,
        totalAmount: matchingLead.totalAmount,
        createdAt: matchingLead.createdAt
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to search for booking" });
    }
  });

  // Get all leads (admin)
  app.get("/api/admin/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      const leadsWithMechanics = await Promise.all(
        leads.map(async (lead) => {
          const mechanic = lead.mechanicId ? await storage.getMechanicById(lead.mechanicId) : null;
          return { ...lead, mechanic };
        })
      );
      res.json(leadsWithMechanics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  // Get all mechanics (admin)
  app.get("/api/admin/mechanics", async (req, res) => {
    try {
      const mechanics = await storage.getMechanics();
      res.json(mechanics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mechanics" });
    }
  });

  // Simulate status progression for demo
  app.post("/api/track/:trackingId/progress", async (req, res) => {
    try {
      const { trackingId } = req.params;
      const lead = await storage.getLeadByTrackingId(trackingId);
      
      if (!lead) {
        res.status(404).json({ error: "Tracking ID not found" });
        return;
      }

      const statusProgression = ["confirmed", "assigned", "on_the_way", "in_progress", "completed"];
      const currentIndex = statusProgression.indexOf(lead.status || "confirmed");
      
      if (currentIndex < statusProgression.length - 1) {
        const nextStatus = statusProgression[currentIndex + 1];
        await storage.updateLeadStatus(trackingId, nextStatus);
        
        const messages = {
          assigned: "Mechanic has been assigned to your request",
          on_the_way: "Mechanic is on the way to your location", 
          in_progress: "Service work has started",
          completed: "Service has been completed successfully"
        };

        await storage.addStatusUpdate({
          leadId: lead.id,
          status: nextStatus,
          message: messages[nextStatus as keyof typeof messages] || ""
        });

        res.json({ status: nextStatus });
      } else {
        res.json({ status: lead.status });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
