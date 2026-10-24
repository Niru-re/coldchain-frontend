export interface Shipment {
  id: string;
  trackingNumber: string;
  commodity: string;
  category: 'Pharmaceuticals' | 'Dairy' | 'Fresh Produce' | 'Seafood' | 'Biologics' | 'Frozen Foods';
  origin: string;
  destination: string;
  currentLocation: string;
  carrier: string;
  mode: 'Road' | 'Rail' | 'Air' | 'Multimodal';
  temperature: number; // Celsius
  minTemp: number;
  maxTemp: number;
  humidity: number; // Percentage
  batteryLevel: number;
  reeferStatus: 'Active & Optimal' | 'Eco Mode' | 'Defrosting Cycle' | 'Compressor Warning' | 'Critical Failure';
  doorStatus: 'Sealed & Locked' | 'Open' | 'Tamper Detected';
  gpsSignal: 'Strong (5G/LEO)' | 'Degraded' | 'Offline Mesh';
  riskScore: number; // 0-100
  riskLevel: 'Nominal' | 'Guarded' | 'Elevated' | 'Critical';
  remainingShelfLifeHours: number;
  initialShelfLifeHours: number;
  eta: string;
  originalEta: string;
  shockG: number;
  lightLux: number;
  farmerProducer: string;
  economicValue: string;
  co2SavedKg: number;
  truckId?: string;
  driverId?: number;
  status: 'In Transit' | 'Critical Alert' | 'Rerouted' | 'Delivered' | 'Quarantined' | 'Pending' | 'Scheduled';
  waypoints: {
    name: string;
    type: 'Farm' | 'Truck' | 'Hub' | 'Rail' | 'Airport' | 'Warehouse' | 'Buyer';
    completed: boolean;
    current?: boolean;
    timestamp?: string;
  }[];
  temperatureHistory: {
    time: string;
    temp: number;
    ambientTemp: number;
    safeMin: number;
    safeMax: number;
  }[];
  aiAlert?: {
    id: string;
    severity: 'critical' | 'warning' | 'info';
    title: string;
    description: string;
    predictedExcursionTime: string;
    predictedLossUsd: string;
    recommendedActions: {
      id: string;
      title: string;
      description: string;
      shelfLifePreserved: string;
      costDelta: string;
      etaChange: string;
      co2Delta: string;
      confidence: number;
      recommended: boolean;
    }[];
  };
}

export interface WarehouseNode {
  id: string;
  name: string;
  location: string;
  zone: string;
  currentTemp: number;
  targetTemp: number;
  capacityUsedPercentage: number;
  palletCount: number;
  maxPallets: number;
  riskStatus: 'Optimal' | 'Caution' | 'Excursion Warning';
  expiringLotsCount: number;
}

export interface FleetVehicle {
  id: string;
  plate: string;
  type: 'Heavy Reefer 32T' | 'Electric Urban Reefer' | 'Dual-Zone Intermodal' | 'Pharma-Grade Cryo Carrier';
  driver: string;
  status: 'En Route' | 'Docking' | 'Standby' | 'Maintenance Required';
  reeferHealthScore: number; // 0-100
  fuelLevel: number;
  currentCargo: string;
  compressorPressurePsi: number;
  refrigerantLevelPct: number;
  location: string;
}

export interface FarmerShipmentSummary {
  id: string;
  crop: string;
  variety: string;
  harvestDate: string;
  dispatchTime: string;
  targetBuyer: string;
  buyerLocation: string;
  quantityTons: number;
  currentTemp: number;
  tempSafe: boolean;
  cargoHealthScore: number;
  payoutStatus: 'Escrow Secured' | 'Processing' | 'Paid';
  payoutAmount: string;
  sensorVerificationScore: number;
  eta: string;
  liveStatusText: string;
}
