export interface CropBatch {
  id: string;
  crop: string;
  variety: string;
  farmerName: string;
  farmLocation: string;
  harvestDate: string;
  quantityTons: number;
  initialTemp: number;
  currentTemp: number;
  targetTemp: number;
  humidity: number;
  shelfLifeDaysTotal: number;
  shelfLifeRemainingDays: number;
  grade: 'A' | 'B' | 'C';
  qualityScore: number;
  status: 'Pre-Cooling' | 'In-Transit' | 'Stored' | 'Dispatched' | 'Delivered';
  allocatedHub: string;
  assignedVehicle?: string;
  mandiRatePerKg: number;
  escrowSecuredAmount: number;
  subsidyEligible: string;
  qrPayload: string;
}

export interface MandiRate {
  market: string;
  state: string;
  crop: string;
  modalPricePerKg: number;
  dailyArrivalTons: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export interface RailwayTrainRake {
  trainNumber: string;
  trainName: string;
  originStation: string;
  destinationStation: string;
  departureTime: string;
  currentLocation: string;
  signalBlock: string;
  speedKmH: number;
  totalWagons: number;
  reeferWagonsOccupied: number;
  totalTeuCapacity: number;
  powerCarStatus: 'Online · 415V' | 'Auxiliary Generator Active' | 'Standby';
  gensetFuelPercent: number;
  avgCargoTemp: number;
  targetTemp: number;
  delayMinutes: number;
  kisanSubsidyClaimedInr: number;
  status: 'In-Transit' | 'Loading at Siding' | 'Marshalling' | 'Unloading' | 'Delayed';
}

export interface WarehouseChamber {
  chamberId: string;
  name: string;
  type: 'Deep Freeze' | 'Chilled Cold Room' | 'Controlled Atmosphere (CA)' | 'Blast Freezer Tunnel';
  temperature: number;
  targetTemp: number;
  humidityRh: number;
  targetHumidityRh: number;
  gasO2Percent?: number;
  gasCO2Percent?: number;
  palletCapacity: number;
  occupiedPallets: number;
  refrigerantStatus: 'Optimal · Freon R404A' | 'Normal · Ammonia NH3' | 'Warning Leak Sensor' | 'Defrost Cycle';
  ammoniaPpm: number;
  status: 'Active' | 'Pre-Cooling' | 'Defrosting' | 'Maintenance';
}

export interface PalletInventory {
  palletId: string;
  batchId: string;
  commodity: string;
  growerOrClient: string;
  inwardDate: string;
  expiryDate: string;
  daysRemaining: number;
  weightKg: number;
  binLocation: string; // Aisle-Rack-Shelf
  coreTemp: number;
  fefoPriority: 'High' | 'Normal' | 'Expedited';
  status: 'Allocated' | 'In-Blast' | 'Ready for Dispatch' | 'Staged Dock';
}

export interface InspectionResult {
  inspectionId: string;
  type: 'produce' | 'truck_seal' | 'rail_seal' | 'warehouse_pallet';
  title: string;
  timestamp: string;
  confidence: number;
  defectPercentage: number;
  verdict: 'PASS · Premium Grade' | 'PASS · Commercial Clearance' | 'ALERT · Defect Detected' | 'REJECT · Breach Suspected';
  featuresDetected: string[];
  simulatedBboxes: { label: string; x: number; y: number; w: number; h: number; severity: 'low' | 'med' | 'high' }[];
}

export const MOCK_CROP_BATCHES: CropBatch[] = [
  {
    id: 'LOT-AGRO-701',
    crop: 'Alphonso Mango',
    variety: 'GI Tagged Ratnagiri',
    farmerName: 'Ramesh Deshmukh',
    farmLocation: 'Ratnagiri, Maharashtra',
    harvestDate: '2026-10-21',
    quantityTons: 14.5,
    initialTemp: 28.5,
    currentTemp: 11.2,
    targetTemp: 10.0,
    humidity: 88,
    shelfLifeDaysTotal: 21,
    shelfLifeRemainingDays: 16.4,
    grade: 'A',
    qualityScore: 94,
    status: 'In-Transit',
    allocatedHub: 'Bhiwandi Mega Cold Hub',
    assignedVehicle: 'CC-REEFER-01',
    mandiRatePerKg: 195,
    escrowSecuredAmount: 2827500,
    subsidyEligible: 'PMKSY Cold Chain Grant (35%)',
    qrPayload: 'CC360://CROP/LOT-AGRO-701/RATNAGIRI/MANGO-A/20261021'
  },
  {
    id: 'LOT-AGRO-702',
    crop: 'Pomegranate',
    variety: 'Bhagwa Export Grade',
    farmerName: 'Sanjay Patil',
    farmLocation: 'Solapur, Maharashtra',
    harvestDate: '2026-10-20',
    quantityTons: 22.0,
    initialTemp: 26.0,
    currentTemp: 5.4,
    targetTemp: 5.0,
    humidity: 92,
    shelfLifeDaysTotal: 60,
    shelfLifeRemainingDays: 52.0,
    grade: 'A',
    qualityScore: 97,
    status: 'In-Transit',
    allocatedHub: 'JNPT Port Container Terminal',
    assignedVehicle: 'CC-REEFER-04',
    mandiRatePerKg: 140,
    escrowSecuredAmount: 3080000,
    subsidyEligible: 'APEDA Cold Logistics Scheme',
    qrPayload: 'CC360://CROP/LOT-AGRO-702/SOLAPUR/BHAGWA-A/20261020'
  },
  {
    id: 'LOT-AGRO-703',
    crop: 'Table Grapes',
    variety: 'Thomson Seedless',
    farmerName: 'Kailash Shinde',
    farmLocation: 'Nashik, Maharashtra',
    harvestDate: '2026-10-19',
    quantityTons: 18.2,
    initialTemp: 24.0,
    currentTemp: 1.8,
    targetTemp: 1.0,
    humidity: 94,
    shelfLifeDaysTotal: 45,
    shelfLifeRemainingDays: 38.5,
    grade: 'A',
    qualityScore: 92,
    status: 'Stored',
    allocatedHub: 'Nashik Pre-Cooling Center',
    assignedVehicle: 'CC-REEFER-08',
    mandiRatePerKg: 110,
    escrowSecuredAmount: 2002000,
    subsidyEligible: 'MIDH Packhouse Capital Grant',
    qrPayload: 'CC360://CROP/LOT-AGRO-703/NASHIK/GRAPES-A/20261019'
  },
  {
    id: 'LOT-AGRO-704',
    crop: 'Strawberries',
    variety: 'Winter Dawn Sweet',
    farmerName: 'Anand More',
    farmLocation: 'Mahabaleshwar, Maharashtra',
    harvestDate: '2026-10-21',
    quantityTons: 6.8,
    initialTemp: 22.0,
    currentTemp: 3.2,
    targetTemp: 2.0,
    humidity: 95,
    shelfLifeDaysTotal: 10,
    shelfLifeRemainingDays: 7.2,
    grade: 'B',
    qualityScore: 86,
    status: 'Pre-Cooling',
    allocatedHub: 'Pune Bio & Perishable Air Cargo',
    mandiRatePerKg: 280,
    escrowSecuredAmount: 1904000,
    subsidyEligible: 'PM Formalisation of Micro FME',
    qrPayload: 'CC360://CROP/LOT-AGRO-704/MAHABALESHWAR/STRAWBERRY/20261021'
  }
];

export const MOCK_MANDI_RATES: MandiRate[] = [
  { market: 'Vashi APMC (Mumbai)', state: 'Maharashtra', crop: 'Alphonso Mango', modalPricePerKg: 210, dailyArrivalTons: 140, trend: 'up', changePercent: 4.8 },
  { market: 'Azadpur (Delhi)', state: 'Delhi NCR', crop: 'Alphonso Mango', modalPricePerKg: 245, dailyArrivalTons: 85, trend: 'up', changePercent: 6.2 },
  { market: 'Pune APMC (Market Yard)', state: 'Maharashtra', crop: 'Pomegranate', modalPricePerKg: 145, dailyArrivalTons: 220, trend: 'stable', changePercent: 0.5 },
  { market: 'Surat APMC', state: 'Gujarat', crop: 'Table Grapes', modalPricePerKg: 125, dailyArrivalTons: 160, trend: 'down', changePercent: -2.4 },
  { market: 'Bengaluru Yeshwanthpur', state: 'Karnataka', crop: 'Strawberries', modalPricePerKg: 310, dailyArrivalTons: 42, trend: 'up', changePercent: 8.5 },
];

export const MOCK_RAILWAY_RAKES: RailwayTrainRake[] = [
  {
    trainNumber: 'KISAN-00114',
    trainName: 'Western DFC Superfast Kisan Rail',
    originStation: 'Bhusawal Junction (BSL)',
    destinationStation: 'JNPT Port Container Terminal (JNP)',
    departureTime: '2026-10-21 21:30',
    currentLocation: 'Igatpuri DFC Viaduct · KM 128',
    signalBlock: 'DFC Block SEC-441 (Green Signal)',
    speedKmH: 88,
    totalWagons: 42,
    reeferWagonsOccupied: 38,
    totalTeuCapacity: 84,
    powerCarStatus: 'Online · 415V',
    gensetFuelPercent: 91,
    avgCargoTemp: 4.2,
    targetTemp: 4.0,
    delayMinutes: 0,
    kisanSubsidyClaimedInr: 842000,
    status: 'In-Transit'
  },
  {
    trainNumber: 'KISAN-00118',
    trainName: 'Central Agro Cold Express',
    originStation: 'Nagpur Multi-Modal Logistics Park',
    destinationStation: 'Tughlakabad Inland Container Depot (TKD)',
    departureTime: '2026-10-21 16:00',
    currentLocation: 'Bhopal Loop Siding KM 342',
    signalBlock: 'Waiting Passenger Interlock',
    speedKmH: 0,
    totalWagons: 40,
    reeferWagonsOccupied: 36,
    totalTeuCapacity: 80,
    powerCarStatus: 'Online · 415V',
    gensetFuelPercent: 78,
    avgCargoTemp: -18.8,
    targetTemp: -20.0,
    delayMinutes: 18,
    kisanSubsidyClaimedInr: 960000,
    status: 'Delayed'
  },
  {
    trainNumber: 'KISAN-00122',
    trainName: 'Konkan Coastal Cold Corridor',
    originStation: 'Ratnagiri Siding (RN)',
    destinationStation: 'Navi Mumbai Cold Hub (KLMG)',
    departureTime: '2026-10-22 04:00',
    currentLocation: 'Ratnagiri Siding Spur 3',
    signalBlock: 'Pre-Departure Inspection',
    speedKmH: 0,
    totalWagons: 24,
    reeferWagonsOccupied: 20,
    totalTeuCapacity: 48,
    powerCarStatus: 'Standby',
    gensetFuelPercent: 100,
    avgCargoTemp: 9.8,
    targetTemp: 10.0,
    delayMinutes: 0,
    kisanSubsidyClaimedInr: 412000,
    status: 'Loading at Siding'
  }
];

export const MOCK_WAREHOUSE_CHAMBERS: WarehouseChamber[] = [
  {
    chamberId: 'CH-01',
    name: 'Chamber 1 · Deep Sub-Zero Cryo',
    type: 'Deep Freeze',
    temperature: -24.8,
    targetTemp: -25.0,
    humidityRh: 82,
    targetHumidityRh: 80,
    palletCapacity: 1200,
    occupiedPallets: 1080,
    refrigerantStatus: 'Optimal · Freon R404A',
    ammoniaPpm: 0.2,
    status: 'Active'
  },
  {
    chamberId: 'CH-02',
    name: 'Chamber 2 · Pharma & Biologics Chiller',
    type: 'Chilled Cold Room',
    temperature: 4.1,
    targetTemp: 4.0,
    humidityRh: 65,
    targetHumidityRh: 65,
    palletCapacity: 800,
    occupiedPallets: 742,
    refrigerantStatus: 'Normal · Ammonia NH3',
    ammoniaPpm: 0.8,
    status: 'Active'
  },
  {
    chamberId: 'CH-03',
    name: 'Chamber 3 · Controlled Atmosphere (CA) Produce',
    type: 'Controlled Atmosphere (CA)',
    temperature: 0.8,
    targetTemp: 1.0,
    humidityRh: 94.5,
    targetHumidityRh: 95.0,
    gasO2Percent: 1.4,
    gasCO2Percent: 1.1,
    palletCapacity: 1500,
    occupiedPallets: 1390,
    refrigerantStatus: 'Normal · Ammonia NH3',
    ammoniaPpm: 0.5,
    status: 'Active'
  },
  {
    chamberId: 'CH-04',
    name: 'Chamber 4 · Rapid Blast Freezing Tunnel',
    type: 'Blast Freezer Tunnel',
    temperature: -38.2,
    targetTemp: -40.0,
    humidityRh: 80,
    targetHumidityRh: 80,
    palletCapacity: 250,
    occupiedPallets: 160,
    refrigerantStatus: 'Optimal · Freon R404A',
    ammoniaPpm: 0.1,
    status: 'Pre-Cooling'
  }
];

export const MOCK_PALLET_INVENTORY: PalletInventory[] = [
  { palletId: 'PLT-9901', batchId: 'LOT-AGRO-701', commodity: 'Alphonso Mango', growerOrClient: 'Deshmukh Agro Co-op', inwardDate: '2026-10-21', expiryDate: '2026-11-10', daysRemaining: 19, weightKg: 850, binLocation: 'A-04-R2-P01', coreTemp: 10.2, fefoPriority: 'Normal', status: 'Allocated' },
  { palletId: 'PLT-9902', batchId: 'LOT-AGRO-702', commodity: 'Bhagwa Pomegranate', growerOrClient: 'Patil Agro Fresh', inwardDate: '2026-10-20', expiryDate: '2026-12-15', daysRemaining: 54, weightKg: 920, binLocation: 'B-12-R1-P08', coreTemp: 5.1, fefoPriority: 'Normal', status: 'Allocated' },
  { palletId: 'PLT-9903', batchId: 'LOT-PHARMA-108', commodity: 'Rabies Vaccine Bulk', growerOrClient: 'Serum BioPharma Ltd', inwardDate: '2026-10-18', expiryDate: '2026-10-28', daysRemaining: 6, weightKg: 420, binLocation: 'C-01-R4-P02', coreTemp: 3.8, fefoPriority: 'High', status: 'Staged Dock' },
  { palletId: 'PLT-9904', batchId: 'LOT-DAIRY-404', commodity: 'Frozen Buffalo Butter', growerOrClient: 'Amul Dairy Logistics', inwardDate: '2026-10-15', expiryDate: '2027-04-15', daysRemaining: 175, weightKg: 1000, binLocation: 'D-08-R3-P11', coreTemp: -24.5, fefoPriority: 'Normal', status: 'Allocated' },
  { palletId: 'PLT-9905', batchId: 'LOT-AGRO-704', commodity: 'Strawberries Sweet', growerOrClient: 'More Agro Mahabaleshwar', inwardDate: '2026-10-21', expiryDate: '2026-10-27', daysRemaining: 5, weightKg: 640, binLocation: 'A-02-R1-P05', coreTemp: 2.2, fefoPriority: 'High', status: 'Ready for Dispatch' }
];

export const MOCK_INSPECTION_PRESETS: Record<string, InspectionResult> = {
  produce: {
    inspectionId: 'INSP-CV-01',
    type: 'produce',
    title: 'OpenCV Produce Quality & Blemish Scan',
    timestamp: '2026-10-21 14:22:08',
    confidence: 96.8,
    defectPercentage: 3.2,
    verdict: 'PASS · Premium Grade',
    featuresDetected: ['Skin Uniformity: 98%', 'Surface Bruise: None', 'Color Index: 14Y/02G (Optimal Ripeness)', 'Stem Intact: Yes'],
    simulatedBboxes: [
      { label: 'Grade A Specimen', x: 22, y: 18, w: 26, h: 28, severity: 'low' },
      { label: 'Grade A Specimen', x: 54, y: 22, w: 25, h: 30, severity: 'low' },
      { label: 'Minor Skin Fleck (0.8mm)', x: 38, y: 64, w: 14, h: 12, severity: 'med' }
    ]
  },
  truck_seal: {
    inspectionId: 'INSP-CV-02',
    type: 'truck_seal',
    title: 'OpenCV Reefer Latch & E-Seal Integrity',
    timestamp: '2026-10-21 15:45:10',
    confidence: 99.1,
    defectPercentage: 0.0,
    verdict: 'PASS · Commercial Clearance',
    featuresDetected: ['Bolt Seal Locked: Confirmed', 'Cable Tension: 1200 N', 'Barcode Matching: CC-SEAL-88912', 'Cut Marks: None'],
    simulatedBboxes: [
      { label: 'Lock Bolt Intact', x: 42, y: 35, w: 18, h: 32, severity: 'low' },
      { label: 'Barcode Verified', x: 40, y: 70, w: 22, h: 15, severity: 'low' }
    ]
  },
  rail_seal: {
    inspectionId: 'INSP-CV-03',
    type: 'rail_seal',
    title: 'OpenCV Wayside Wagon Seal Camera Scan',
    timestamp: '2026-10-21 18:12:44',
    confidence: 97.4,
    defectPercentage: 1.1,
    verdict: 'PASS · Commercial Clearance',
    featuresDetected: ['Wagon Door Flush: Confirmed', 'RFID Tag Active: 865 MHz', 'Tamper Wire Unbroken: Yes'],
    simulatedBboxes: [
      { label: 'Wagon Door Seal #WGN-44', x: 48, y: 28, w: 20, h: 35, severity: 'low' }
    ]
  },
  warehouse_pallet: {
    inspectionId: 'INSP-CV-04',
    type: 'warehouse_pallet',
    title: 'OpenCV Pallet Staging & Carton Integrity Check',
    timestamp: '2026-10-21 19:05:30',
    confidence: 94.2,
    defectPercentage: 4.8,
    verdict: 'PASS · Commercial Clearance',
    featuresDetected: ['Shrink Wrap Tension: 94%', 'Carton Crush: Zero', 'Tilt Angle: 0.6° (Stable)', 'Pallet Footing: Solid Timber'],
    simulatedBboxes: [
      { label: 'Carton Tier 1-4 Level', x: 25, y: 20, w: 50, h: 60, severity: 'low' },
      { label: 'Corner Wrap Tension Good', x: 74, y: 30, w: 12, h: 45, severity: 'low' }
    ]
  }
};

export interface ReeferTruck {
  id: string;
  type: string;
  driverName: string;
  driverPhone: string;
  currentLocation: string;
  temperature: number;
  speed: number;
  status: 'in-transit' | 'docked' | 'idle' | 'maintenance';
}

export const MOCK_REEFER_FLEET: ReeferTruck[] = [
  {
    id: 'CC-REEFER-01',
    type: 'Volvo FH16 Multi-Zone (-25°C to +15°C)',
    driverName: 'Rajesh Sharma',
    driverPhone: '+91 98230 44102',
    currentLocation: 'NH-48 Expressway (KM 142)',
    temperature: 3.8,
    speed: 68,
    status: 'in-transit',
  },
  {
    id: 'CC-REEFER-02',
    type: 'Tata Signa 4825.TK Heavy Carrier',
    driverName: 'Gurdeep Singh',
    driverPhone: '+91 98110 55219',
    currentLocation: 'Nashik Agro Terminal',
    temperature: 4.2,
    speed: 72,
    status: 'in-transit',
  },
  {
    id: 'CC-REEFER-03',
    type: 'BharatBenz 3528R Sub-Zero Reefer',
    driverName: 'Suresh Patil',
    driverPhone: '+91 94220 88314',
    currentLocation: 'Pune Cold Hub Siding',
    temperature: -18.5,
    speed: 0,
    status: 'docked',
  },
  {
    id: 'CC-REEFER-04',
    type: 'Mahindra Blazo X Pharma Reefer',
    driverName: 'Mohan Kumar',
    driverPhone: '+91 97330 19283',
    currentLocation: 'Mumbai Nhava Sheva Buffer',
    temperature: 2.1,
    speed: 45,
    status: 'in-transit',
  },
  {
    id: 'CC-REEFER-05',
    type: 'Eicher Pro 6028 Dual-Temp',
    driverName: 'Amit Verma',
    driverPhone: '+91 98990 64721',
    currentLocation: 'Nagpur Central Maintenance Base',
    temperature: 5.0,
    speed: 0,
    status: 'maintenance',
  },
];

