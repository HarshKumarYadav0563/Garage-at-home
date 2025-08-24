import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertWaitlistSchema, bookingRequestSchema } from "@shared/schema";
import { isNCR, NCR_CITIES } from "@shared/config/serviceAreas";
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

  // Create lead
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
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
        res.status(500).json({ error: "Failed to create lead" });
      }
    }
  });

  // Create comprehensive booking
  app.post("/api/leads", async (req, res) => {
    try {
      const bookingData = bookingRequestSchema.parse(req.body);
      
      // Validate city is in NCR
      if (!isNCR(bookingData.city)) {
        res.status(400).json({ 
          ok: false, 
          reason: "OUT_OF_AREA",
          message: "Service is currently available only in Delhi-NCR area"
        });
        return;
      }
      
      // Rate limiting by phone (basic)
      const recentBookings = await storage.getLeads();
      const phoneBookings = recentBookings.filter(lead => 
        lead.customerPhone === bookingData.customer.phone &&
        lead.createdAt && 
        new Date().getTime() - new Date(lead.createdAt).getTime() < 3600000 // 1 hour
      );
      
      if (phoneBookings.length >= 3) {
        res.status(429).json({ 
          ok: false,
          reason: "RATE_LIMITED",
          message: "Too many bookings from this number. Please try again later."
        });
        return;
      }
      
      const result = await storage.createBooking(bookingData);
      
      res.status(201).json({ 
        ok: true, 
        trackingId: result.trackingId,
        message: 'Booking received successfully. A mechanic will contact you shortly.'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          ok: false,
          reason: "VALIDATION_ERROR",
          message: "Invalid booking data", 
          details: error.errors 
        });
      } else {
        console.error('Error creating booking:', error);
        res.status(500).json({ 
          ok: false,
          reason: "INTERNAL_ERROR",
          message: 'Failed to create booking' 
        });
      }
    }
  });

  // Legacy booking endpoint (keep for compatibility)
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

  // Waitlist endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const waitlistData = insertWaitlistSchema.parse(req.body);
      
      await storage.addToWaitlist(waitlistData);
      
      res.status(201).json({ 
        ok: true,
        message: `Thank you for your interest! We'll notify you when we launch in ${waitlistData.city}.`
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          ok: false,
          message: "Invalid waitlist data", 
          details: error.errors 
        });
      } else {
        console.error('Error adding to waitlist:', error);
        res.status(500).json({ 
          ok: false,
          message: 'Failed to add to waitlist' 
        });
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

  // SEO endpoints
  app.get("/sitemap.xml", (req, res) => {
    try {
      // Import here to avoid issues with client-side code
      const { generateXMLSitemap } = require('../client/src/utils/sitemap');
      const sitemap = generateXMLSitemap();
      res.set('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });

  app.get("/robots.txt", (req, res) => {
    try {
      const { generateRobotsTxt } = require('../client/src/utils/sitemap');
      const robots = generateRobotsTxt();
      res.set('Content-Type', 'text/plain');
      res.send(robots);
    } catch (error) {
      console.error('Error generating robots.txt:', error);
      res.status(500).send('Error generating robots.txt');
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
