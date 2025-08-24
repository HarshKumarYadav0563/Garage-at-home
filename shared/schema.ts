import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Services table
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  vehicleType: text("vehicle_type").notNull(), // 'bike' or 'car'
  category: text("category").notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  skills: json("skills").$type<string[]>().default([]),
});

// Mechanics table
export const mechanics = pgTable("mechanics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  lat: decimal("lat", { precision: 10, scale: 8 }).notNull(),
  lng: decimal("lng", { precision: 10, scale: 8 }).notNull(),
  city: text("city").notNull(),
  skills: json("skills").$type<string[]>().default([]),
  ratingAvg: decimal("rating_avg", { precision: 3, scale: 2 }).default("0"),
  jobsDone: integer("jobs_done").default(0),
  serviceRadiusKm: integer("service_radius_km").default(10),
  isActive: boolean("is_active").default(true),
  nextSlots: json("next_slots").$type<string[]>().default([]),
});

// Leads table
export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingId: text("tracking_id").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  address: text("address").notNull(),
  lat: decimal("lat", { precision: 10, scale: 8 }),
  lng: decimal("lng", { precision: 10, scale: 8 }),
  vehicleType: text("vehicle_type").notNull(),
  vehicleBrand: text("vehicle_brand"),
  vehicleModel: text("vehicle_model"),
  serviceId: varchar("service_id").references(() => services.id),
  mechanicId: varchar("mechanic_id").references(() => mechanics.id),
  slotStart: timestamp("slot_start"),
  slotEnd: timestamp("slot_end"),
  status: text("status").default("pending"), // pending, confirmed, assigned, on_the_way, in_progress, completed, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Status updates table
export const statusUpdates = pgTable("status_updates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").references(() => leads.id).notNull(),
  status: text("status").notNull(),
  message: text("message"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Waitlist table
export const waitlist = pgTable("waitlist", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  city: text("city").notNull(),
  vehicleType: text("vehicle_type"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertMechanicSchema = createInsertSchema(mechanics).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ 
  id: true, 
  trackingId: true, 
  createdAt: true, 
  updatedAt: true 
});
export const insertStatusUpdateSchema = createInsertSchema(statusUpdates).omit({ id: true });
export const insertWaitlistSchema = createInsertSchema(waitlist).omit({ id: true, createdAt: true });

// New booking schemas
export const bookingRequestSchema = z.object({
  vehicle: z.enum(['bike', 'car']),
  city: z.string().min(1),
  services: z.array(z.object({
    id: z.string(),
    title: z.string(),
    priceMin: z.number(),
    priceMax: z.number()
  })).min(1),
  addons: z.array(z.object({
    id: z.string(),
    title: z.string(),
    priceMin: z.number(),
    priceMax: z.number()
  })).optional().default([]),
  estTotal: z.object({
    min: z.number(),
    max: z.number()
  }),
  customer: z.object({
    name: z.string().min(2).max(60),
    phone: z.string().regex(/^[+]?[91]?[0-9]{10}$/),
    email: z.string().email().optional(),
    contactPref: z.enum(['call', 'whatsapp'])
  }),
  address: z.object({
    text: z.string().min(5),
    lat: z.number().optional(),
    lng: z.number().optional(),
    pincode: z.string().optional()
  }),
  slot: z.object({
    startISO: z.string(),
    endISO: z.string()
  })
});

// Types
export type Service = typeof services.$inferSelect;
export type Mechanic = typeof mechanics.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type StatusUpdate = typeof statusUpdates.$inferSelect;
export type Waitlist = typeof waitlist.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type InsertMechanic = z.infer<typeof insertMechanicSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertStatusUpdate = z.infer<typeof insertStatusUpdateSchema>;
export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type BookingRequest = z.infer<typeof bookingRequestSchema>;
