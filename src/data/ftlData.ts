export interface CityNode {
  id: string;
  name: string;
  state: string;
  role: string;
  x: number; // percentage in stylized map (0-100)
  y: number; // percentage in stylized map (0-100)
  activeShipments: number;
  hubType: 'Origin' | 'Destination' | 'Interchange' | 'Terminal';
}

export interface FTLTruck {
  id: string; // e.g., CC-102
  regNumber: string; // e.g., MH-31-TR-4912
  model: string; // e.g., Tata Signa 4825.TK
  driverName: string;
  driverPhone: string;
  driverSafetyScore: number;
  currentLocation: string;
  destination: string;
  origin: string;
  coordinates: { x: number; y: number };
  speedKmH: number;
  fuelPct: number;
  grossWeightTon: number;
  maxWeightTon: number;
  status: 'En Route' | 'Docking' | 'Standby' | 'Warning' | 'Off Route';
  eta: string;
  remainingDistanceKm: number;
  engineHealthPct: number;
  tirePressurePsi: number;
  lastPing: string;
  activeShipmentId: string;
  lat?: number;
  lng?: number;
}

export interface FTLShipment {
  id: string;
  client: string;
  commodity: string;
  category: 'Industrial Machinery' | 'Automotive Assemblies' | 'FMCG Goods' | 'Polymers & Chemicals' | 'Renewables' | 'Pharmaceuticals';
  originCity: string;
  destinationCity: string;
  currentCity: string;
  truckId: string;
  driverName: string;
  valueInr: string;
  status: 'In Transit' | 'Critical Alert' | 'Rerouted' | 'Delivered' | 'Pending Dispatch';
  eta: string;
  originalEta: string;
  progressPct: number;
  weightTons: number;
  corridor: string;
  riskLevel: 'Low' | 'Medium' | 'Critical';
  waypoints: {
    name: string;
    completed: boolean;
    current?: boolean;
    time?: string;
  }[];
}

export interface RouteOption {
  id: string;
  name: string;
  tagline: string;
  distanceKm: number;
  durationFormatted: string;
  fuelCostInr: number;
  tollInr: number;
  totalCostInr: number;
  riskScore: number; // 0-100 (lower is better)
  recommended: boolean;
  reasons: string[];
  svgPath: string;
  color: string;
}

export interface FTLAlert {
  id: string;
  truckId: string;
  shipmentId: string;
  driverName: string;
  type: 'Route Deviation' | 'ETA Delay' | 'Driver Break' | 'Vehicle Issue' | 'Traffic Risk';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  description: string;
  deviationMinutes?: number;
  delayImpact?: string;
  location: string;
  timestamp: string;
  time?: string;
  recommendedAction: string;
  actionRecommendation?: string;
  actionButtonLabel: string;
  resolved?: boolean;
}

export interface FTLDriver {
  id: string;
  name: string;
  phone: string;
  experienceYears: number;
  licenseNumber: string;
  safetyScore: number;
  assignedTruckId: string;
  currentRoute: string;
  hoursOfServiceLogged: number;
  maxDailyHours: number;
  status: 'On Duty' | 'Mandatory Rest' | 'Off Duty';
  totalTripsCompleted: number;
}

export const CITY_NODES: CityNode[] = [
  { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', role: 'Northern Logistics Spine', x: 42, y: 16, activeShipments: 42, hubType: 'Origin' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', role: 'North-West Freight Junction', x: 33, y: 26, activeShipments: 19, hubType: 'Interchange' },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', role: 'Industrial Export Complex', x: 22, y: 44, activeShipments: 34, hubType: 'Origin' },
  { id: 'surat', name: 'Surat', state: 'Gujarat', role: 'Heavy Cargo Corridor', x: 24, y: 53, activeShipments: 28, hubType: 'Interchange' },
  { id: 'indore', name: 'Indore', state: 'Madhya Pradesh', role: 'Central Freight Interchange', x: 40, y: 46, activeShipments: 31, hubType: 'Interchange' },
  { id: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', role: 'Heartland Transshipment', x: 50, y: 44, activeShipments: 26, hubType: 'Interchange' },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', role: 'Zero Mile Multi-Modal Hub', x: 54, y: 55, activeShipments: 58, hubType: 'Origin' },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', role: 'Northern Maharashtra Feeder', x: 28, y: 58, activeShipments: 22, hubType: 'Interchange' },
  { id: 'mumbai', name: 'Mumbai / JNPT', state: 'Maharashtra', role: 'Deep Sea Port & Terminal', x: 26, y: 64, activeShipments: 65, hubType: 'Destination' },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', role: 'Automotive MIDC Cluster', x: 30, y: 69, activeShipments: 47, hubType: 'Origin' },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', role: 'South-Central Gateway', x: 52, y: 72, activeShipments: 38, hubType: 'Interchange' },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', role: 'Southern High-Tech Hub', x: 44, y: 86, activeShipments: 44, hubType: 'Destination' },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', role: 'Eastern Maritime Gateway', x: 82, y: 45, activeShipments: 29, hubType: 'Destination' },
];

export const MOCK_TRUCKS: FTLTruck[] = [
  {
    id: 'CC-102',
    regNumber: 'MH-31-TR-4912',
    model: 'Tata Signa 4825.TK Heavy Carrier',
    driverName: 'Rajesh Sharma',
    driverPhone: '+91 98230 44102',
    driverSafetyScore: 97.4,
    currentLocation: 'Jalgaon Bypass (NH-53)',
    destination: 'Nhava Sheva Port, Mumbai',
    origin: 'Nagpur Multi-Modal Logistics Park',
    coordinates: { x: 38, y: 58 },
    speedKmH: 62,
    fuelPct: 74,
    grossWeightTon: 38.4,
    maxWeightTon: 42.0,
    status: 'Off Route',
    eta: 'Today · 18:45 IST',
    remainingDistanceKm: 342,
    engineHealthPct: 96,
    tirePressurePsi: 118,
    lastPing: '4s ago',
    activeShipmentId: 'SHP-8092',
  },
  {
    id: 'CC-107',
    regNumber: 'MH-12-QX-7721',
    model: 'Ashok Leyland 5525 Tractor Trailer',
    driverName: 'Amit Verma',
    driverPhone: '+91 94221 80107',
    driverSafetyScore: 94.2,
    currentLocation: 'Samruddhi Mahamarg Shirdi Corridor',
    destination: 'Bhiwandi Warehousing Hub, Mumbai',
    origin: 'Nagpur Multi-Modal Logistics Park',
    coordinates: { x: 44, y: 57 },
    speedKmH: 78,
    fuelPct: 82,
    grossWeightTon: 32.5,
    maxWeightTon: 40.0,
    status: 'En Route',
    eta: 'Today · 19:10 IST',
    remainingDistanceKm: 285,
    engineHealthPct: 98,
    tirePressurePsi: 120,
    lastPing: '2s ago',
    activeShipmentId: 'SHP-8104',
  },
  {
    id: 'CC-118',
    regNumber: 'GJ-06-AZ-3304',
    model: 'BharatBenz 3528C Heavy Hauler',
    driverName: 'Vikram Rathore',
    driverPhone: '+91 97240 11118',
    driverSafetyScore: 91.8,
    currentLocation: 'Ahmednagar Bypass (NH-61)',
    destination: 'Aurangabad MIDC Complex',
    origin: 'Dahej Petrochemical Complex',
    coordinates: { x: 35, y: 64 },
    speedKmH: 0,
    fuelPct: 56,
    grossWeightTon: 29.8,
    maxWeightTon: 35.0,
    status: 'Warning',
    eta: 'Today · 21:30 IST',
    remainingDistanceKm: 164,
    engineHealthPct: 88,
    tirePressurePsi: 104,
    lastPing: '12s ago',
    activeShipmentId: 'SHP-8119',
  },
  {
    id: 'CC-124',
    regNumber: 'HR-55-BW-9014',
    model: 'Volvo FM 420 High-Capacity Container Reefer',
    driverName: 'Satish Patil',
    driverPhone: '+91 98112 66124',
    driverSafetyScore: 99.1,
    currentLocation: 'NH-44 Adilabad Section',
    destination: 'Hyderabad Genome Valley',
    origin: 'Baddi Pharma Manufacturing Park',
    coordinates: { x: 53, y: 65 },
    speedKmH: 71,
    fuelPct: 88,
    grossWeightTon: 26.2,
    maxWeightTon: 32.0,
    status: 'En Route',
    eta: 'Tomorrow · 04:20 IST',
    remainingDistanceKm: 410,
    engineHealthPct: 99,
    tirePressurePsi: 122,
    lastPing: '1s ago',
    activeShipmentId: 'SHP-8125',
  },
  {
    id: 'CC-131',
    regNumber: 'MP-09-CV-5582',
    model: 'Tata Prima 5530.S Long Haul Express',
    driverName: 'Harpreet Singh',
    driverPhone: '+91 99814 33131',
    driverSafetyScore: 96.0,
    currentLocation: 'Indore Ring Road Interchange',
    destination: 'Rewa Solar Ultra Megawatt Park',
    origin: 'Surat SEZ Port Cargo',
    coordinates: { x: 42, y: 47 },
    speedKmH: 64,
    fuelPct: 69,
    grossWeightTon: 39.1,
    maxWeightTon: 45.0,
    status: 'En Route',
    eta: 'Tomorrow · 08:00 IST',
    remainingDistanceKm: 512,
    engineHealthPct: 95,
    tirePressurePsi: 119,
    lastPing: '5s ago',
    activeShipmentId: 'SHP-8138',
  },
  {
    id: 'CC-142',
    regNumber: 'MH-10-EE-2299',
    model: 'Eicher Pro 6035 Multi-axle Container',
    driverName: 'Manoj Shinde',
    driverPhone: '+91 98220 99142',
    driverSafetyScore: 98.7,
    currentLocation: 'JNPT Port Container Terminal Gate 3',
    destination: 'Nhava Sheva Port, Mumbai',
    origin: 'Kirloskarvadi Industrial Cluster',
    coordinates: { x: 26, y: 64 },
    speedKmH: 0,
    fuelPct: 92,
    grossWeightTon: 34.0,
    maxWeightTon: 36.0,
    status: 'Docking',
    eta: 'Completed',
    remainingDistanceKm: 0,
    engineHealthPct: 97,
    tirePressurePsi: 121,
    lastPing: '30s ago',
    activeShipmentId: 'SHP-8147',
  },
  {
    id: 'CC-156',
    regNumber: 'TN-04-MK-8819',
    model: 'Mahindra Blazo X 35 Multi-axle Express',
    driverName: 'Sandeep Rao',
    driverPhone: '+91 98402 77156',
    driverSafetyScore: 95.3,
    currentLocation: 'NH-48 Chitradurga Sector',
    destination: 'Noida Tech Industrial Zone',
    origin: 'Sriperumbudur Electronics SEZ',
    coordinates: { x: 46, y: 81 },
    speedKmH: 74,
    fuelPct: 78,
    grossWeightTon: 22.8,
    maxWeightTon: 32.0,
    status: 'En Route',
    eta: 'In 32 Hours',
    remainingDistanceKm: 1480,
    engineHealthPct: 94,
    tirePressurePsi: 118,
    lastPing: '3s ago',
    activeShipmentId: 'SHP-8153',
  },
  {
    id: 'CC-168',
    regNumber: 'DL-01-AB-1904',
    model: 'BharatBenz 4028T Logistics Express',
    driverName: 'Kuldeep Yadav',
    driverPhone: '+91 98101 22168',
    driverSafetyScore: 93.9,
    currentLocation: 'Delhi-Mumbai Expressway (Dausa Segment)',
    destination: 'JNPT Port, Mumbai',
    origin: 'Manesar Automotive Manufacturing Zone',
    coordinates: { x: 38, y: 24 },
    speedKmH: 82,
    fuelPct: 85,
    grossWeightTon: 37.6,
    maxWeightTon: 40.0,
    status: 'En Route',
    eta: 'Tomorrow · 14:20 IST',
    remainingDistanceKm: 890,
    engineHealthPct: 98,
    tirePressurePsi: 120,
    lastPing: '2s ago',
    activeShipmentId: 'SHP-8164',
  },
];

export const MOCK_SHIPMENTS: FTLShipment[] = [
  {
    id: 'SHP-8092',
    client: 'Tata Motors Precision Components',
    commodity: 'Transmission & Axle Assemblies',
    category: 'Automotive Assemblies',
    originCity: 'Nagpur Multi-Modal Logistics Park',
    destinationCity: 'Mumbai JNPT Port Export Terminal',
    currentCity: 'Jalgaon Bypass (NH-53)',
    truckId: 'CC-102',
    driverName: 'Rajesh Sharma',
    valueInr: '₹64,50,000',
    status: 'Critical Alert',
    eta: 'Today · 18:45 IST',
    originalEta: 'Today · 18:00 IST',
    progressPct: 62,
    weightTons: 38.4,
    corridor: 'NH-53 / Central Maharashtra',
    riskLevel: 'Critical',
    waypoints: [
      { name: 'Nagpur Dispatch Gate 2', completed: true, time: '05:30 IST' },
      { name: 'Amravati Multi-Modal Toll', completed: true, time: '08:45 IST' },
      { name: 'Akola Commercial Checkpost', completed: true, time: '12:15 IST' },
      { name: 'Jalgaon Deviation Point (Active)', completed: true, current: true, time: '15:20 IST' },
      { name: 'Nashik Industrial Corridor Bypass', completed: false },
      { name: 'JNPT Port Custom Freight Station', completed: false },
    ],
  },
  {
    id: 'SHP-8104',
    client: 'Hindustan Unilever Consumer Logistics',
    commodity: 'Packaged Household Consumables',
    category: 'FMCG Goods',
    originCity: 'Nagpur Multi-Modal Logistics Park',
    destinationCity: 'Bhiwandi Warehousing Hub, Mumbai',
    currentCity: 'Samruddhi Mahamarg Shirdi Corridor',
    truckId: 'CC-107',
    driverName: 'Amit Verma',
    valueInr: '₹42,80,000',
    status: 'In Transit',
    eta: 'Today · 19:10 IST',
    originalEta: 'Today · 19:30 IST',
    progressPct: 74,
    weightTons: 32.5,
    corridor: 'Samruddhi Mahamarg Expressway',
    riskLevel: 'Low',
    waypoints: [
      { name: 'Nagpur Fulfillment Center', completed: true, time: '06:00 IST' },
      { name: 'Wardha Interchange Gate 4', completed: true, time: '07:40 IST' },
      { name: 'Aurangabad Express Segment', completed: true, time: '13:00 IST' },
      { name: 'Shirdi Rest Plaza (Current)', completed: true, current: true, time: '16:00 IST' },
      { name: 'Igatpuri Descent Corridor', completed: false },
      { name: 'Bhiwandi Central Mega Hub', completed: false },
    ],
  },
  {
    id: 'SHP-8119',
    client: 'Reliance Petrochemicals Dahej',
    commodity: 'High-Density Polyethylene Granules',
    category: 'Polymers & Chemicals',
    originCity: 'Dahej Petrochemical Complex',
    destinationCity: 'Aurangabad MIDC Complex',
    currentCity: 'Ahmednagar Bypass (NH-61)',
    truckId: 'CC-118',
    driverName: 'Vikram Rathore',
    valueInr: '₹88,20,000',
    status: 'Critical Alert',
    eta: 'Today · 21:30 IST',
    originalEta: 'Today · 20:15 IST',
    progressPct: 58,
    weightTons: 29.8,
    corridor: 'Gujarat-Maharashtra Trans-Corridor',
    riskLevel: 'Medium',
    waypoints: [
      { name: 'Dahej Loading Bay 8', completed: true, time: '04:00 IST' },
      { name: 'Surat Ring Road Toll Gate', completed: true, time: '07:15 IST' },
      { name: 'Dhule Border Checkpost', completed: true, time: '11:30 IST' },
      { name: 'Ahmednagar Halt (Sensor Alert)', completed: true, current: true, time: '15:45 IST' },
      { name: 'Aurangabad MIDC Zone B', completed: false },
    ],
  },
  {
    id: 'SHP-8125',
    client: 'Serum Institute Biopharma Division',
    commodity: 'Active Temperature Vaccines & Biologics',
    category: 'Pharmaceuticals',
    originCity: 'Baddi Pharma Manufacturing Park',
    destinationCity: 'Hyderabad Genome Valley',
    currentCity: 'NH-44 Adilabad Section',
    truckId: 'CC-124',
    driverName: 'Satish Patil',
    valueInr: '₹1,95,00,000',
    status: 'In Transit',
    eta: 'Tomorrow · 04:20 IST',
    originalEta: 'Tomorrow · 04:30 IST',
    progressPct: 81,
    weightTons: 26.2,
    corridor: 'North-South Industrial Expressway',
    riskLevel: 'Low',
    waypoints: [
      { name: 'Baddi Cold Depot A', completed: true, time: 'Day 1 · 02:00' },
      { name: 'Delhi Western Peripheral Expressway', completed: true, time: 'Day 1 · 09:30' },
      { name: 'Gwalior Logistics Node', completed: true, time: 'Day 1 · 17:00' },
      { name: 'Nagpur Outer Ring Bypass', completed: true, time: 'Day 2 · 04:00' },
      { name: 'Adilabad Corridor (In Transit)', completed: true, current: true, time: 'Day 2 · 14:00' },
      { name: 'Genome Valley Terminal 1', completed: false },
    ],
  },
  {
    id: 'SHP-8138',
    client: 'Adani Solar Infrastructure',
    commodity: 'Monocrystalline Solar PV Modules',
    category: 'Renewables',
    originCity: 'Surat SEZ Port Cargo',
    destinationCity: 'Rewa Solar Ultra Megawatt Park',
    currentCity: 'Indore Ring Road Interchange',
    truckId: 'CC-131',
    driverName: 'Harpreet Singh',
    valueInr: '₹1,12,00,000',
    status: 'In Transit',
    eta: 'Tomorrow · 08:00 IST',
    originalEta: 'Tomorrow · 08:15 IST',
    progressPct: 48,
    weightTons: 39.1,
    corridor: 'West-Central Solar Supply Chain',
    riskLevel: 'Low',
    waypoints: [
      { name: 'Surat Cargo Terminal Port 1', completed: true, time: '03:15 IST' },
      { name: 'Vadodara Express Link', completed: true, time: '06:45 IST' },
      { name: 'Indore Central Interchange (Current)', completed: true, current: true, time: '15:10 IST' },
      { name: 'Bhopal Bypass Outer Ring', completed: false },
      { name: 'Rewa Solar Park Substation Gate', completed: false },
    ],
  },
  {
    id: 'SHP-8147',
    client: 'Kirloskar Heavy Engineering Corp',
    commodity: 'Sub-sea Centrifugal Pumps & Turbine Castings',
    category: 'Industrial Machinery',
    originCity: 'Kirloskarvadi Industrial Cluster',
    destinationCity: 'Mumbai JNPT Port Export Terminal',
    currentCity: 'JNPT Port Container Terminal Gate 3',
    truckId: 'CC-142',
    driverName: 'Manoj Shinde',
    valueInr: '₹76,40,000',
    status: 'Delivered',
    eta: 'Delivered',
    originalEta: 'Today · 14:00 IST',
    progressPct: 100,
    weightTons: 34.0,
    corridor: 'NH-48 Western Freight Spine',
    riskLevel: 'Low',
    waypoints: [
      { name: 'Kirloskarvadi Foundry Yard', completed: true, time: '02:00 IST' },
      { name: 'Satara Highway Toll', completed: true, time: '05:30 IST' },
      { name: 'Pune Expressway Toll Interchange', completed: true, time: '08:50 IST' },
      { name: 'JNPT Port Custom CFS Gate 3', completed: true, current: true, time: '13:45 IST' },
    ],
  },
];

export const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: 'route-b',
    name: 'ROUTE B · Samruddhi Mahamarg (Expressway)',
    tagline: 'Recommended Autonomous Route',
    distanceKm: 812,
    durationFormatted: '13h 40m',
    fuelCostInr: 8120,
    tollInr: 2150,
    totalCostInr: 10270,
    riskScore: 6,
    recommended: true,
    reasons: [
      'Lower traffic density (average cruise 76 km/h)',
      'Lower fuel consumption (-8.4% drag & gradient saving)',
      'Higher delivery reliability (zero rural railway crossings)',
      'Express rest stops with heavy-duty tire cooling plazas',
    ],
    svgPath: 'M 540,550 C 490,560 410,570 330,600 C 290,620 270,635 260,640',
    color: '#00d2ff',
  },
  {
    id: 'route-a',
    name: 'ROUTE A · NH-53 Central Spine (Traditional)',
    tagline: 'Standard Highway Route',
    distanceKm: 864,
    durationFormatted: '15h 10m',
    fuelCostInr: 9600,
    tollInr: 2850,
    totalCostInr: 12450,
    riskScore: 48,
    recommended: false,
    reasons: [
      'Congestion around Jalgaon & Akola urban chokepoints',
      'Higher toll fees across multiple municipal toll gates',
      'Average transit speed limited to 54 km/h',
    ],
    svgPath: 'M 540,550 C 470,530 380,540 320,570 C 280,590 270,620 260,640',
    color: '#64748b',
  },
  {
    id: 'route-c',
    name: 'ROUTE C · South Pune Industrial Detour',
    tagline: 'Heavy Load Industrial Corridors',
    distanceKm: 920,
    durationFormatted: '17h 20m',
    fuelCostInr: 10900,
    tollInr: 3200,
    totalCostInr: 14100,
    riskScore: 62,
    recommended: false,
    reasons: [
      '+108 km excess deadhead distance',
      'High peak-hour congestion on Pune Outer Ring Road',
      'Substantial toll tariff surcharges',
    ],
    svgPath: 'M 540,550 C 500,640 420,680 340,680 C 290,670 270,655 260,640',
    color: '#94a3b8',
  },
];

export const MOCK_ALERTS: FTLAlert[] = [
  {
    id: 'ALT-102-DEV',
    truckId: 'CC-102',
    shipmentId: 'SHP-8092',
    driverName: 'Rajesh Sharma',
    type: 'Route Deviation',
    severity: 'Critical',
    title: 'ROUTE DEVIATION DETECTED · TRUCK CC-102',
    description: 'Vehicle diverted 4.8 km off NH-53 scheduled waypoint at Jalgaon bypass. Telemetry confirms 12 minutes elapsed since unplanned departure.',
    deviationMinutes: 12,
    location: 'Jalgaon Outer Bypass Link, Maharashtra',
    timestamp: '15:20 IST · 4 mins ago',
    recommendedAction: 'Autonomous Route Recalculation: Divert back via State Corridor 19 with zero toll penalty.',
    actionButtonLabel: 'OPTIMIZE ROUTE',
    resolved: false,
  },
  {
    id: 'ALT-118-HALT',
    truckId: 'CC-118',
    shipmentId: 'SHP-8119',
    driverName: 'Vikram Rathore',
    type: 'Vehicle Issue',
    severity: 'Warning',
    title: 'UNSCHEDULED HALT & TIRE SENSOR ANOMALY',
    description: 'Truck stationary for 42 minutes on Ahmednagar bypass. Right rear dual tire pressure dropped to 104 PSI (-14 PSI nominal).',
    location: 'Ahmednagar Highway Rest Stop, NH-61',
    timestamp: '15:05 IST · 19 mins ago',
    recommendedAction: 'Dispatch Mobile Assistance Team from Shrirampur hub (ETA 18m).',
    actionButtonLabel: 'DISPATCH ROAD SUPPORT',
    resolved: false,
  },
  {
    id: 'ALT-TRAFFIC-KASARA',
    truckId: 'CC-107',
    shipmentId: 'SHP-8104',
    driverName: 'Amit Verma',
    type: 'Traffic Risk',
    severity: 'Warning',
    title: 'HEAVY BOTTLENECK PROJECTED · KASARA GHAT',
    description: 'Landslide clearing operations in Kasara descent corridor. Expected delay of 55 minutes if current trajectory maintained.',
    location: 'NH-160 Kasara Ghat Incline',
    timestamp: '14:48 IST · 36 mins ago',
    recommendedAction: 'Divert through Malshej Corridor or throttle cruise to 60 km/h to sync with clearance schedule.',
    actionButtonLabel: 'APPLY CONGESTION BYPASS',
    resolved: false,
  },
  {
    id: 'ALT-HOS-SINGH',
    truckId: 'CC-131',
    shipmentId: 'SHP-8138',
    driverName: 'Harpreet Singh',
    type: 'Driver Break',
    severity: 'Info',
    title: 'HOURS OF SERVICE (HOS) MANDATORY REST APPROACHING',
    description: 'Driver Harpreet Singh has logged 7.2 continuous hours on road. Legal maximum 8.0 hours requires 45-minute mandatory safety break.',
    location: 'Indore Ring Road Interchange Plaza',
    timestamp: '14:15 IST · 1h ago',
    recommendedAction: 'Pre-book dedicated heavy vehicle driver rest pod at Indore Freight City.',
    actionButtonLabel: 'RESERVE REST BAY',
    resolved: false,
  },
  {
    id: 'ALT-124-ETA',
    truckId: 'CC-124',
    shipmentId: 'SHP-8125',
    driverName: 'Satish Patil',
    type: 'ETA Delay',
    severity: 'Info',
    title: 'EARLY ARRIVAL ADVISORY · HYDERABAD HUB',
    description: 'Favorable tailwinds & green wave toll clearance have advanced projected delivery ETA by 28 minutes.',
    location: 'NH-44 Adilabad Section',
    timestamp: '13:50 IST · 1.5h ago',
    recommendedAction: 'Notify Genome Valley dock manager to prep inbound inspection bay.',
    actionButtonLabel: 'ADVISE DOCK CREW',
    resolved: false,
  },
];

export const MOCK_DRIVERS: FTLDriver[] = [
  {
    id: 'DRV-101',
    name: 'Rajesh Sharma',
    phone: '+91 98230 44102',
    experienceYears: 14,
    licenseNumber: 'MH-31-2009004812',
    safetyScore: 97.4,
    assignedTruckId: 'CC-102',
    currentRoute: 'Nagpur → Mumbai (NH-53)',
    hoursOfServiceLogged: 6.4,
    maxDailyHours: 8.0,
    status: 'On Duty',
    totalTripsCompleted: 482,
  },
  {
    id: 'DRV-102',
    name: 'Amit Verma',
    phone: '+91 94221 80107',
    experienceYears: 11,
    licenseNumber: 'MH-12-2012009841',
    safetyScore: 94.2,
    assignedTruckId: 'CC-107',
    currentRoute: 'Nagpur → Mumbai (Samruddhi Mahamarg)',
    hoursOfServiceLogged: 5.8,
    maxDailyHours: 8.0,
    status: 'On Duty',
    totalTripsCompleted: 396,
  },
  {
    id: 'DRV-103',
    name: 'Vikram Rathore',
    phone: '+91 97240 11118',
    experienceYears: 16,
    licenseNumber: 'GJ-06-2007001290',
    safetyScore: 91.8,
    assignedTruckId: 'CC-118',
    currentRoute: 'Dahej → Aurangabad',
    hoursOfServiceLogged: 7.1,
    maxDailyHours: 8.0,
    status: 'On Duty',
    totalTripsCompleted: 530,
  },
  {
    id: 'DRV-104',
    name: 'Satish Patil',
    phone: '+91 98112 66124',
    experienceYears: 18,
    licenseNumber: 'HR-55-2005008742',
    safetyScore: 99.1,
    assignedTruckId: 'CC-124',
    currentRoute: 'Baddi → Hyderabad',
    hoursOfServiceLogged: 4.2,
    maxDailyHours: 8.0,
    status: 'On Duty',
    totalTripsCompleted: 615,
  },
  {
    id: 'DRV-105',
    name: 'Harpreet Singh',
    phone: '+91 99814 33131',
    experienceYears: 9,
    licenseNumber: 'MP-09-2014003310',
    safetyScore: 96.0,
    assignedTruckId: 'CC-131',
    currentRoute: 'Surat → Rewa',
    hoursOfServiceLogged: 7.2,
    maxDailyHours: 8.0,
    status: 'On Duty',
    totalTripsCompleted: 312,
  },
  {
    id: 'DRV-106',
    name: 'Manoj Shinde',
    phone: '+91 98220 99142',
    experienceYears: 12,
    licenseNumber: 'MH-10-2011005523',
    safetyScore: 98.7,
    assignedTruckId: 'CC-142',
    currentRoute: 'Kirloskarvadi → JNPT (Completed)',
    hoursOfServiceLogged: 8.0,
    maxDailyHours: 8.0,
    status: 'Mandatory Rest',
    totalTripsCompleted: 440,
  },
];

// Analytics Mock Data
export const ANALYTICS_ON_TIME_TREND = [
  { month: 'Jan', onTimePct: 91.2, target: 94.0 },
  { month: 'Feb', onTimePct: 92.5, target: 94.0 },
  { month: 'Mar', onTimePct: 93.8, target: 94.0 },
  { month: 'Apr', onTimePct: 93.1, target: 94.0 },
  { month: 'May', onTimePct: 94.9, target: 94.0 },
  { month: 'Jun', onTimePct: 94.7, target: 94.0 },
];

export const ANALYTICS_FLEET_UTILIZATION = [
  { time: '00:00', utilization: 72 },
  { time: '04:00', utilization: 68 },
  { time: '08:00', utilization: 86 },
  { time: '12:00', utilization: 92 },
  { time: '16:00', utilization: 89 },
  { time: '20:00', utilization: 84 },
];

export const ANALYTICS_CORRIDOR_VOLUME = [
  { corridor: 'Nagpur - Mumbai', volumeTons: 14200, trucks: 48 },
  { corridor: 'Delhi - Mumbai', volumeTons: 22800, trucks: 64 },
  { corridor: 'Gujarat - Pune', volumeTons: 11400, trucks: 36 },
  { corridor: 'North - South NH44', volumeTons: 18900, trucks: 52 },
  { corridor: 'Bengaluru - Chennai', volumeTons: 9800, trucks: 28 },
];

export const ANALYTICS_EFFICIENCY = [
  { week: 'W1', routeSavings: 4200, fuelSavedLiters: 1120 },
  { week: 'W2', routeSavings: 5400, fuelSavedLiters: 1450 },
  { week: 'W3', routeSavings: 6100, fuelSavedLiters: 1680 },
  { week: 'W4', routeSavings: 7800, fuelSavedLiters: 2100 },
];
