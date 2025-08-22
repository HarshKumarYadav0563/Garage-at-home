import { z } from 'zod';

export const phoneSchema = z.string()
  .regex(/^(\+91[-\s]?)?[6-9]\d{9}$/, "Please enter a valid Indian phone number");

export const nameSchema = z.string()
  .min(2, "Name must be at least 2 characters")
  .max(60, "Name must be less than 60 characters");

export const addressSchema = z.string()
  .min(10, "Please enter a complete address");

export const vehicleSchema = z.object({
  type: z.enum(['bike', 'car']),
  brand: z.string().min(1, "Please select a vehicle brand"),
  model: z.string().min(1, "Please select a vehicle model"),
});

export const locationSchema = z.object({
  address: addressSchema,
  lat: z.number(),
  lng: z.number(),
});

export const timeSlotSchema = z.object({
  slotStart: z.date(),
  slotEnd: z.date(),
}).refine((data) => data.slotStart < data.slotEnd, {
  message: "End time must be after start time",
});

export const customerDetailsSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
});
