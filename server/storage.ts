import { type Service, type Mechanic, type Lead, type StatusUpdate, type InsertService, type InsertMechanic, type InsertLead, type InsertStatusUpdate } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Services
  getServices(): Promise<Service[]>;
  getServicesByVehicleType(vehicleType: string): Promise<Service[]>;
  
  // Mechanics
  getMechanics(): Promise<Mechanic[]>;
  getMechanicsByCity(city: string): Promise<Mechanic[]>;
  getMechanicById(id: string): Promise<Mechanic | undefined>;
  searchMechanics(params: {
    lat: number;
    lng: number;
    vehicleType: string;
    serviceId?: string;
    radiusKm?: number;
  }): Promise<Mechanic[]>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead & { trackingId: string }>;
  getLeadByTrackingId(trackingId: string): Promise<Lead | undefined>;
  getLeads(): Promise<Lead[]>;
  updateLeadStatus(trackingId: string, status: string): Promise<void>;
  
  // Status Updates
  addStatusUpdate(update: InsertStatusUpdate): Promise<StatusUpdate>;
  getStatusUpdatesByLeadId(leadId: string): Promise<StatusUpdate[]>;
}

export class MemStorage implements IStorage {
  private services: Map<string, Service>;
  private mechanics: Map<string, Mechanic>;
  private leads: Map<string, Lead>;
  private statusUpdates: Map<string, StatusUpdate>;

  constructor() {
    this.services = new Map();
    this.mechanics = new Map();
    this.leads = new Map();
    this.statusUpdates = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed services
    const servicesData: Service[] = [
      {
        id: "srv_001",
        name: "Basic Oil Change",
        vehicleType: "bike",
        category: "maintenance",
        description: "Engine oil change with filter replacement",
        basePrice: "299.00",
        duration: 45,
        skills: ["oil_change", "filter_replacement"]
      },
      {
        id: "srv_002", 
        name: "Brake Service",
        vehicleType: "bike",
        category: "repair",
        description: "Complete brake inspection and adjustment",
        basePrice: "399.00",
        duration: 60,
        skills: ["brake_service"]
      },
      {
        id: "srv_003",
        name: "Car AC Service",
        vehicleType: "car", 
        category: "maintenance",
        description: "AC cleaning and gas refill",
        basePrice: "899.00",
        duration: 120,
        skills: ["ac_service"]
      },
      {
        id: "srv_004",
        name: "Car Oil Change",
        vehicleType: "car",
        category: "maintenance", 
        description: "Premium engine oil change",
        basePrice: "599.00",
        duration: 90,
        skills: ["oil_change"]
      }
    ];

    // Seed mechanics
    const mechanicsData: Mechanic[] = [
      {
        id: "mech_001",
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        lat: "23.3441",
        lng: "85.3096",
        city: "ranchi",
        skills: ["oil_change", "brake_service", "general_repair"],
        ratingAvg: "4.8",
        jobsDone: 250,
        serviceRadiusKm: 15,
        isActive: true,
        nextSlots: ["2024-01-25T15:00:00Z", "2024-01-25T17:00:00Z", "2024-01-26T10:00:00Z"]
      },
      {
        id: "mech_002", 
        name: "Amit Singh",
        phone: "+91 87654 32109",
        lat: "23.3548",
        lng: "85.3345",
        city: "ranchi",
        skills: ["ac_service", "oil_change", "brake_service"],
        ratingAvg: "4.9",
        jobsDone: 180,
        serviceRadiusKm: 20,
        isActive: true,
        nextSlots: ["2024-01-25T16:30:00Z", "2024-01-26T09:00:00Z"]
      },
      {
        id: "mech_003",
        name: "Manoj Patel", 
        phone: "+91 76543 21098",
        lat: "23.3294",
        lng: "85.2947",
        city: "ranchi",
        skills: ["oil_change", "general_repair"],
        ratingAvg: "4.7",
        jobsDone: 320,
        serviceRadiusKm: 12,
        isActive: true,
        nextSlots: ["2024-01-26T10:00:00Z", "2024-01-26T14:00:00Z"]
      }
    ];

    servicesData.forEach(service => this.services.set(service.id, service));
    mechanicsData.forEach(mechanic => this.mechanics.set(mechanic.id, mechanic));
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServicesByVehicleType(vehicleType: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.vehicleType === vehicleType);
  }

  async getMechanics(): Promise<Mechanic[]> {
    return Array.from(this.mechanics.values());
  }

  async getMechanicsByCity(city: string): Promise<Mechanic[]> {
    return Array.from(this.mechanics.values()).filter(m => m.city === city.toLowerCase());
  }

  async getMechanicById(id: string): Promise<Mechanic | undefined> {
    return this.mechanics.get(id);
  }

  async searchMechanics(params: {
    lat: number;
    lng: number;
    vehicleType: string;
    serviceId?: string;
    radiusKm?: number;
  }): Promise<Mechanic[]> {
    const radiusKm = params.radiusKm || 25;
    const mechanics = Array.from(this.mechanics.values()).filter(mechanic => {
      const distance = this.calculateDistance(
        params.lat, 
        params.lng, 
        parseFloat(mechanic.lat), 
        parseFloat(mechanic.lng)
      );
      return distance <= radiusKm && mechanic.isActive;
    });

    // Rank mechanics using the specified algorithm
    return mechanics.map(mechanic => {
      const distance = this.calculateDistance(
        params.lat,
        params.lng,
        parseFloat(mechanic.lat),
        parseFloat(mechanic.lng)
      );
      
      const score = 
        0.45 * (1 / (distance + 0.5)) +
        0.25 * (parseFloat(mechanic.ratingAvg || '0') / 5) +
        0.15 * Math.min((mechanic.jobsDone || 0) / 500, 1) +
        0.15 * ((mechanic.nextSlots || []).length > 0 ? 1 : 0);

      return { ...mechanic, distance, score };
    }).sort((a, b) => b.score - a.score);
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  async createLead(leadData: InsertLead): Promise<Lead & { trackingId: string }> {
    const id = randomUUID();
    const trackingId = `GW${Date.now().toString().slice(-8)}`;
    const lead: Lead = {
      id,
      trackingId,
      ...leadData,
      lat: leadData.lat || null,
      lng: leadData.lng || null,
      serviceId: leadData.serviceId || null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.leads.set(id, lead);
    return { ...lead, trackingId };
  }

  async getLeadByTrackingId(trackingId: string): Promise<Lead | undefined> {
    return Array.from(this.leads.values()).find(lead => lead.trackingId === trackingId);
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async updateLeadStatus(trackingId: string, status: string): Promise<void> {
    const lead = await this.getLeadByTrackingId(trackingId);
    if (lead) {
      lead.status = status;
      lead.updatedAt = new Date();
      this.leads.set(lead.id, lead);
    }
  }

  async addStatusUpdate(update: InsertStatusUpdate): Promise<StatusUpdate> {
    const id = randomUUID();
    const statusUpdate: StatusUpdate = {
      id,
      ...update,
      message: update.message || null,
      timestamp: new Date(),
    };
    this.statusUpdates.set(id, statusUpdate);
    return statusUpdate;
  }

  async getStatusUpdatesByLeadId(leadId: string): Promise<StatusUpdate[]> {
    return Array.from(this.statusUpdates.values())
      .filter(update => update.leadId === leadId)
      .sort((a, b) => new Date(a.timestamp!).getTime() - new Date(b.timestamp!).getTime());
  }
}

export const storage = new MemStorage();
