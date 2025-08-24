import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const mechanicSearchSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  vehicleType: z.string(),
  serviceId: z.string().optional(),
  radiusKm: z.number().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Create lead (updated for new booking flow)
  app.post("/api/leads", async (req, res) => {
    try {
      const leadSchema = z.object({
        vehicle: z.enum(['bike', 'car']),
        city: z.string(),
        services: z.array(z.object({
          id: z.string(),
          name: z.string(),
          price: z.number()
        })),
        addons: z.array(z.object({
          id: z.string(),
          name: z.string(),
          price: z.number()
        })).optional(),
        estTotal: z.object({
          min: z.number(),
          max: z.number()
        }),
        customer: z.object({
          name: z.string().min(2),
          phone: z.string().regex(/^[6-9]\d{9}$/),
          email: z.string().email().optional(),
          contactPref: z.enum(['phone', 'email', 'both'])
        }),
        address: z.object({
          text: z.string().min(5),
          lat: z.number().optional(),
          lng: z.number().optional(),
          pincode: z.string().optional()
        }),
        otpToken: z.string()
      });
      
      const leadData = leadSchema.parse(req.body);
      
      // Validate NCR cities
      const ncrCities = ['delhi', 'gurugram', 'noida', 'ghaziabad', 'faridabad'];
      if (!ncrCities.includes(leadData.city.toLowerCase())) {
        return res.status(400).json({ error: "Service not available in your city", availableCities: ncrCities });
      }
      
      const { nanoid } = await import('nanoid');
      const trackingId = `GW-${nanoid(8).toUpperCase()}`;
      
      // Create lead with automatic slot assignment
      const leadForStorage = {
        customerName: leadData.customer.name,
        customerPhone: leadData.customer.phone,
        customerEmail: leadData.customer.email || '',
        address: leadData.address.text,
        lat: leadData.address.lat || 0,
        lng: leadData.address.lng || 0,
        vehicleType: leadData.vehicle,
        vehicleBrand: '',
        vehicleModel: '',
        serviceId: leadData.services[0]?.id || '',
        mechanicId: '',
        trackingId,
        estTotal: leadData.estTotal.max
      };
      
      const lead = await storage.createLead(leadForStorage);
      
      // Add initial status update
      await storage.addStatusUpdate({
        leadId: lead.id,
        status: "confirmed",
        message: "Your booking has been confirmed. A mechanic will be assigned shortly."
      });

      res.json({ trackingId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid booking data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  // OTP Send
  app.post("/api/otp/send", async (req, res) => {
    try {
      const { phone } = z.object({ phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number") }).parse(req.body);
      
      const { nanoid } = await import('nanoid');
      const sessionId = nanoid(16);
      
      // In production, send actual OTP via SMS service
      console.log(`Sending OTP to ${phone} with sessionId: ${sessionId}`);
      
      res.json({ sessionId });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid phone number", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to send OTP" });
      }
    }
  });

  // OTP Verify
  app.post("/api/otp/verify", async (req, res) => {
    try {
      const { phone, sessionId, code } = z.object({
        phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
        sessionId: z.string(),
        code: z.string().length(6, "OTP must be 6 digits")
      }).parse(req.body);
      
      // Mock verification - in production, verify against stored OTP
      const isValidOtp = code === "123456" || code === "000000"; // Accept test codes
      
      if (isValidOtp) {
        const { nanoid } = await import('nanoid');
        const otpToken = nanoid(32);
        
        res.json({ verified: true, otpToken });
      } else {
        res.status(400).json({ verified: false, error: "Invalid OTP" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to verify OTP" });
      }
    }
  });

  // Waitlist
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { name, phone, city, email } = z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
        city: z.string().min(1, "City is required"),
        email: z.string().email("Invalid email").optional()
      }).parse(req.body);
      
      const { nanoid } = await import('nanoid');
      const id = nanoid(8);
      
      // In production, store in database
      console.log(`Added to waitlist: ${name}, ${phone}, ${city}, ${email}`);
      
      res.json({ ok: true, id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to add to waitlist" });
      }
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
        lead,
        statusUpdates,
        mechanic
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tracking information" });
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
