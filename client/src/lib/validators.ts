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

// New booking flow validators
export const customerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be less than 60 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  
  phone: z
    .string()
    .regex(
      /^(\+91[-\s]?)?[6-9]\d{9}$/,
      'Please enter a valid Indian phone number'
    ),
  
  address: z
    .string()
    .min(8, 'Address must be at least 8 characters')
    .max(200, 'Address must be less than 200 characters'),
  
  pincode: z
    .string()
    .regex(/^\d{6}$/, 'Pincode must be 6 digits')
    .optional()
    .or(z.literal(''))
});

export const bookingSchema = z.object({
  selectedServices: z
    .array(z.object({
      id: z.string(),
      name: z.string(),
      vehicleType: z.enum(['bike', 'car']),
      priceMin: z.number(),
      priceMax: z.number()
    }))
    .min(1, 'Please select at least one service'),
  
  selectedSlot: z
    .object({
      date: z.enum(['today', 'tomorrow']),
      time: z.enum(['10-12', '12-2', '2-4', '4-6']),
      label: z.string()
    })
    .nullable()
    .refine((slot) => slot !== null, 'Please select a time slot'),
  
  customer: customerSchema
});

export type CustomerData = z.infer<typeof customerSchema>;
export type BookingData = z.infer<typeof bookingSchema>;
