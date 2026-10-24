export interface ChecklistItem {
  id: string;
  portal: 'farmer' | 'truck' | 'railway' | 'warehouse';
  category: string;
  title: string;
  description: string;
  isShared: boolean;
  sharedType?: 
    | 'temperature-humidity'
    | 'spoilage-alerts'
    | 'opencv-inspection'
    | 'tracking-eta'
    | 'qr-cargo'
    | 'digital-pod'
    | 'reports-analytics'
    | 'emergency-recovery';
  status: 'implemented' | 'simulated_demo';
  aiOrEngine?: string;
  keyAction?: string;
}

export interface PortalMeta {
  id: 'farmer' | 'truck' | 'railway' | 'warehouse';
  name: string;
  shortName: string;
  path: string;
  featureCount: number;
  iconName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
}

export const PORTAL_METAS: Record<string, PortalMeta> = {
  farmer: {
    id: 'farmer',
    name: 'Farmer Portal',
    shortName: 'Farmer',
    path: '/portal/farmer',
    featureCount: 20,
    iconName: 'Sprout',
    tagline: 'Harvest Registration, AI Quality, Mandi Rates & Farm-to-Hub Transport',
    primaryColor: '#06383D',
    accentColor: '#16803C',
    badge: '20 Features'
  },
  truck: {
    id: 'truck',
    name: 'Truck Administration Portal',
    shortName: 'Truck Fleet',
    path: '/portal/truck',
    featureCount: 14,
    iconName: 'Truck',
    tagline: 'Road Route AI, Live GPS, Driver Rotation, Fuel Optimization & Emergency Rescue',
    primaryColor: '#1C1F26',
    accentColor: '#F2AE32',
    badge: '14 Features'
  },
  railway: {
    id: 'railway',
    name: 'Railway Administration Portal',
    shortName: 'Rail Ops',
    path: '/portal/railway',
    featureCount: 14,
    iconName: 'Train',
    tagline: 'Train Schedules, Wagon Allocation, Freight Capacity & Rail-to-Truck Transfers',
    primaryColor: '#0F1B35',
    accentColor: '#3B82F6',
    badge: '14 Features'
  },
  warehouse: {
    id: 'warehouse',
    name: 'Warehouse Administration Portal',
    shortName: 'Cold Storage',
    path: '/portal/warehouse',
    featureCount: 14,
    iconName: 'Warehouse',
    tagline: 'Multi-Chamber CA Cold Storage, Pallet QR Tracking, FEFO & Power Audit',
    primaryColor: '#06383D',
    accentColor: '#7C3AED',
    badge: '14 Features'
  }
};

export const ALL_CHECKLIST_FEATURES: ChecklistItem[] = [
  // ==========================================
  // FARMER PORTAL — 20 FEATURES
  // ==========================================
  {
    id: 'FARM-01',
    portal: 'farmer',
    category: 'Harvest & Crop Registration',
    title: 'Crop & Lot Registration',
    description: 'Register harvest batches with variety, crop classification, harvest date, and harvest volume in tonnes.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Register Harvest Batch'
  },
  {
    id: 'FARM-02',
    portal: 'farmer',
    category: 'Quality & Degradation Assessment',
    title: 'Crop Quality & Grade Assessment',
    description: 'Rule-based Grade A/B/C classification with moisture content, firmness score, and blemish percentage evaluation.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Evaluate Quality Matrix'
  },
  {
    id: 'FARM-03',
    portal: 'farmer',
    category: 'Computer Vision',
    title: 'OpenCV Image-Inspection Interface',
    description: 'Image upload interface for produce photos with simulated computer-vision bounding boxes, defect localization, and confidence grading.',
    isShared: true,
    sharedType: 'opencv-inspection',
    status: 'simulated_demo',
    aiOrEngine: 'OpenCV / Edge Defect Simulator',
    keyAction: 'Upload Produce Photo'
  },
  {
    id: 'FARM-04',
    portal: 'farmer',
    category: 'Shelf Life & Spoilage',
    title: 'Remaining Shelf Life Estimator',
    description: 'Dynamic shelf life countdown derived from temperature exposure, harvest date, grade, and commodity variety data.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'Shelf Life Decay Predictor',
    keyAction: 'Estimate Remaining Life'
  },
  {
    id: 'FARM-05',
    portal: 'farmer',
    category: 'Storage & Hub Logistics',
    title: 'Available Cold Storage Slot Finder',
    description: 'Live availability matrix of cold storage hubs within 100 km showing chamber type, pallet capacity, and temperature zones.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Book Storage Slot'
  },
  {
    id: 'FARM-06',
    portal: 'farmer',
    category: 'Transport & Booking',
    title: 'Reefer Truck Booking & Dispatch',
    description: 'Farmer-side interface to book available reefer trucks for farm-to-hub transport with estimated cost and ETA.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Book Refrigerated Transport'
  },
  {
    id: 'FARM-07',
    portal: 'farmer',
    category: 'Shipment Tracking',
    title: 'Live Shipment Status & ETA Tracker',
    description: 'Farmer-facing consignment tracker showing real-time truck location milestones and delivery confirmation.',
    isShared: true,
    sharedType: 'tracking-eta',
    status: 'implemented',
    keyAction: 'Track My Shipment'
  },
  {
    id: 'FARM-08',
    portal: 'farmer',
    category: 'Market Intelligence',
    title: 'APMC Mandi Price Dashboard',
    description: 'Real-time commodity price feed from major APMC mandis showing modal price, minimum, maximum, and trade volume.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Check Mandi Rates'
  },
  {
    id: 'FARM-09',
    portal: 'farmer',
    category: 'Predictive AI',
    title: 'AI Spoilage Risk & Transit Alert',
    description: 'Rule-based spoilage risk scoring that triggers pre-emptive action when temperature deviation or shelf life decay exceeds thresholds.',
    isShared: true,
    sharedType: 'spoilage-alerts',
    status: 'simulated_demo',
    aiOrEngine: 'Spoilage Risk Engine v2',
    keyAction: 'View Risk Alerts'
  },
  {
    id: 'FARM-10',
    portal: 'farmer',
    category: 'Temperature Monitoring',
    title: 'Cold Chain Temperature Compliance Monitor',
    description: 'Farmer dashboard showing cold chain temperature compliance from farm gate to cold hub with breach timeline.',
    isShared: true,
    sharedType: 'temperature-humidity',
    status: 'implemented',
    keyAction: 'View Temp Compliance'
  },
  {
    id: 'FARM-11',
    portal: 'farmer',
    category: 'Cargo Identification',
    title: 'Produce QR Label Generator & Scanner',
    description: 'Generate and scan QR labels linking each pallet or crate to crop lot, harvest date, farmer ID, and destination hub.',
    isShared: true,
    sharedType: 'qr-cargo',
    status: 'implemented',
    keyAction: 'Generate Produce QR'
  },
  {
    id: 'FARM-12',
    portal: 'farmer',
    category: 'Proof of Delivery',
    title: 'Digital Delivery Confirmation (e-POD)',
    description: 'Electronic proof of delivery confirmation with dock receiving temperature validation and farmer payment trigger.',
    isShared: true,
    sharedType: 'digital-pod',
    status: 'implemented',
    keyAction: 'Confirm Delivery'
  },
  {
    id: 'FARM-13',
    portal: 'farmer',
    category: 'Subsidies & Government Schemes',
    title: 'Government Subsidy & Scheme Calculator',
    description: 'Calculates eligible cold chain infrastructure subsidies under PMKSY, MoFPI MIDH, and APEDA export assistance schemes.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'Government Scheme Eligibility Engine',
    keyAction: 'Check Subsidy Eligibility'
  },
  {
    id: 'FARM-14',
    portal: 'farmer',
    category: 'Emergency & Recovery',
    title: 'Cargo Emergency Rescue Coordination',
    description: 'Emergency re-routing or backup cold storage request when primary truck or storage facility faces a critical failure.',
    isShared: true,
    sharedType: 'emergency-recovery',
    status: 'implemented',
    keyAction: 'Trigger Cargo Rescue'
  },
  {
    id: 'FARM-15',
    portal: 'farmer',
    category: 'Financial & Payments',
    title: 'Digital Farmer Wallet & Payment Status',
    description: 'Transparent payment tracking showing escrow release status, Mandi settlement, and government subsidy disbursements.',
    isShared: false,
    status: 'implemented',
    keyAction: 'View Payment Status'
  },
  {
    id: 'FARM-16',
    portal: 'farmer',
    category: 'Weather Intelligence',
    title: 'Farm Weather & Harvest Planning Advisor',
    description: 'Hyperlocal weather forecast integration helping farmers plan optimal harvest windows and pre-cooling logistics.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'IMD Weather Forecast Adapter',
    keyAction: 'Check Harvest Weather'
  },
  {
    id: 'FARM-17',
    portal: 'farmer',
    category: 'Market Access',
    title: 'B2B Buyer & Export Market Linkage',
    description: 'Connects certified Grade A produce to registered institutional buyers, supermarket chains, and APEDA export agents.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Find Buyers'
  },
  {
    id: 'FARM-18',
    portal: 'farmer',
    category: 'Analytics & Reporting',
    title: 'Farm Produce Analytics & Seasonal Reports',
    description: 'Season-on-season crop volume, quality grading trends, revenue analytics, and cold chain utilization summary.',
    isShared: true,
    sharedType: 'reports-analytics',
    status: 'implemented',
    keyAction: 'Export Farm Report'
  },
  {
    id: 'FARM-19',
    portal: 'farmer',
    category: 'Digital Identity',
    title: 'Farmer KYC & Aadhaar-Linked Profile',
    description: 'Secure farmer digital identity linked to PM-Kisan records, bank account, and crop insurance eligibility verification.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Complete Farmer KYC'
  },
  {
    id: 'FARM-20',
    portal: 'farmer',
    category: 'Training & Support',
    title: 'Cold Chain Best-Practice Advisory & Helpdesk',
    description: 'Regional language advisory content on pre-cooling practices, optimal packaging, and ColdChain 360 helpdesk support.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Get Advisory Support'
  },

  // ==========================================
  // TRUCK ADMINISTRATION — 14 FEATURES
  // ==========================================
  {
    id: 'TRK-01',
    portal: 'truck',
    category: 'Route Intelligence',
    title: 'AI Road Route & Traffic Optimization',
    description: 'Rule-based multi-route analyzer comparing highway alternatives by distance, tolls, traffic density, and reefer-speed suitability. Demo routes clearly labeled as simulated.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'Road Route Optimization Engine',
    keyAction: 'Optimize Route'
  },
  {
    id: 'TRK-02',
    portal: 'truck',
    category: 'Live Tracking',
    title: 'Live GPS Tracking & Geofencing',
    description: 'Vehicle position tracking on a road map with geofence zone management, corridor alerts, and landmark-based breadcrumb trail.',
    isShared: true,
    sharedType: 'tracking-eta',
    status: 'implemented',
    keyAction: 'Track Active Fleet'
  },
  {
    id: 'TRK-03',
    portal: 'truck',
    category: 'Driver Operations',
    title: 'Driver Rotation & Relay Planning',
    description: 'Automated 500-km relay planning assigning rested drivers at mid-route hubs to eliminate fatigue stops and overnight spoilage risk.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Schedule Driver Relay'
  },
  {
    id: 'TRK-04',
    portal: 'truck',
    category: 'Energy & Sustainability',
    title: 'Fuel Consumption & Emissions Optimization',
    description: 'Dual fuel monitor tracking primary diesel and reefer aux generator (L/hr). CO2 per tonne-km calculated and aerodynamic speed profiles suggested.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Audit Fuel Efficiency'
  },
  {
    id: 'TRK-05',
    portal: 'truck',
    category: 'Safety Alerts',
    title: 'Road Accident & Dangerous Route Alerts',
    description: 'Highway incident feed showing active accident blackspots, landslide closures, fog advisories, and alternative safe corridors.',
    isShared: true,
    sharedType: 'spoilage-alerts',
    status: 'simulated_demo',
    aiOrEngine: 'Highway Risk Intelligence Feed',
    keyAction: 'View Route Hazards'
  },
  {
    id: 'TRK-06',
    portal: 'truck',
    category: 'Fleet Maintenance',
    title: 'Truck Breakdown & Predictive Maintenance',
    description: 'Odometer and engine-hour based service scheduler with predictive failure scoring for tyres, brakes, and engine components.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Schedule Maintenance'
  },
  {
    id: 'TRK-07',
    portal: 'truck',
    category: 'Reefer Health',
    title: 'Reefer Engine Failure Prediction',
    description: 'Compressor vibration, freon pressure, and evaporator airflow analytics predicting reefer unit failure before it occurs.',
    isShared: true,
    sharedType: 'spoilage-alerts',
    status: 'simulated_demo',
    aiOrEngine: 'Carrier Transicold Predictive Engine',
    keyAction: 'Run Health Diagnosis'
  },
  {
    id: 'TRK-08',
    portal: 'truck',
    category: 'Cargo Protection',
    title: 'AI Waiting-Time Spoilage Predictor',
    description: 'Calculates cargo shelf-life impact from extended roadside halts, border queues, or toll congestion — alerting when risk exceeds safe threshold.',
    isShared: true,
    sharedType: 'spoilage-alerts',
    status: 'simulated_demo',
    aiOrEngine: 'Halt-Time Spoilage Risk Model',
    keyAction: 'Check Spoilage Risk'
  },
  {
    id: 'TRK-09',
    portal: 'truck',
    category: 'Cargo Protection',
    title: 'Cargo Airflow Blind-Spot Detection',
    description: 'Airflow pattern visualization identifying cold-spot blind zones inside the reefer box where cargo may be warming due to stacking.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'CFD Airflow Blind-Spot Simulator',
    keyAction: 'Inspect Airflow Map'
  },
  {
    id: 'TRK-10',
    portal: 'truck',
    category: 'Security & Compliance',
    title: 'Unauthorized Stop & Route Deviation Detection',
    description: 'Geofence and time-based alert system flagging unplanned stops exceeding 15 minutes or lateral route deviation beyond 2.5 km.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Review Deviation Log'
  },
  {
    id: 'TRK-11',
    portal: 'truck',
    category: 'Load Management',
    title: 'Truck Capacity & Load Distribution Optimization',
    description: 'Axle weight validation and load stacking planner ensuring cargo is distributed within legal gross vehicle weight limits.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Optimize Load Plan'
  },
  {
    id: 'TRK-12',
    portal: 'truck',
    category: 'Emergency Response',
    title: 'Roadside Emergency Truck Matching',
    description: 'One-click SOS matching broken-down reefer trucks with nearby available backup units from the fleet or partner network.',
    isShared: true,
    sharedType: 'emergency-recovery',
    status: 'implemented',
    keyAction: 'Request Emergency Truck'
  },
  {
    id: 'TRK-13',
    portal: 'truck',
    category: 'Driver Safety',
    title: 'Driver Hours, Rest & Safety Monitoring',
    description: 'Tracks cumulative driving hours, mandatory rest compliance, and harsh-braking/speeding events for each active driver.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Monitor Driver Safety'
  },
  {
    id: 'TRK-14',
    portal: 'truck',
    category: 'Trip Economics',
    title: 'Road Toll & Trip Cost Calculator',
    description: 'Automated FASTag toll estimation, highway cess, permit fees, fuel cost, and driver allowance combined into a total trip cost sheet.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Calculate Trip Cost'
  },

  // ==========================================
  // RAILWAY ADMINISTRATION — 14 FEATURES
  // ==========================================
  {
    id: 'RAIL-01',
    portal: 'railway',
    category: 'Scheduling',
    title: 'Train Schedule & Timetable Management',
    description: 'Full timetable management for freight trains including departure/arrival times, station halts, platform assignments and schedule revisions.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Manage Timetable'
  },
  {
    id: 'RAIL-02',
    portal: 'railway',
    category: 'Wagon Operations',
    title: 'Wagon & Container Allocation',
    description: 'Assign refrigerated wagons and ISO containers to specific trains, cargo types, and consignees with slot-booking matrix.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Allocate Wagons'
  },
  {
    id: 'RAIL-03',
    portal: 'railway',
    category: 'Capacity Planning',
    title: 'Rail Freight Capacity Optimization',
    description: 'Rake utilization dashboard showing occupied vs. available TEU slots, payload tonnage, and booking forecasts across the network.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Optimize Capacity'
  },
  {
    id: 'RAIL-04',
    portal: 'railway',
    category: 'Performance Analytics',
    title: 'Station Dwell-Time Analysis',
    description: 'Measures actual vs. scheduled dwell times at each station to identify bottlenecks in loading, unloading, and crew operations.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Analyze Dwell Times'
  },
  {
    id: 'RAIL-05',
    portal: 'railway',
    category: 'Predictive Analytics',
    title: 'Train Delay & Connection Miss Prediction',
    description: 'Simulated delay forecasting model estimating late arrivals from junction congestion, passenger priority crossings, and weather blocks.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'Rail Delay Prediction Engine',
    keyAction: 'Predict Delay Risk'
  },
  {
    id: 'RAIL-06',
    portal: 'railway',
    category: 'Yard Management',
    title: 'Railway Yard Congestion Monitoring',
    description: 'Real-time yard occupancy dashboard tracking active rakes, platform allocations, track availability, and shunting queues.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Monitor Yard Status'
  },
  {
    id: 'RAIL-07',
    portal: 'railway',
    category: 'Rolling Stock Analytics',
    title: 'Wagon Availability & Utilization Analytics',
    description: 'Fleet availability calendar showing wagons in service, under maintenance (POH/ROH), empty-returning, and booked for future rakes.',
    isShared: false,
    status: 'implemented',
    keyAction: 'View Wagon Availability'
  },
  {
    id: 'RAIL-08',
    portal: 'railway',
    category: 'Tariff & Billing',
    title: 'Rail Freight Tariff Calculator',
    description: 'Distance-based tariff calculator with editable inputs for commodity class, wagon type, distance, and applicable concessions.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Calculate Freight Tariff'
  },
  {
    id: 'RAIL-09',
    portal: 'railway',
    category: 'Network Resilience',
    title: 'Railway Route Disruption & Diversion Planning',
    description: 'Disruption management console for track blocks, bridge closures, and flood alerts with alternative route diversion options.',
    isShared: false,
    status: 'simulated_demo',
    aiOrEngine: 'Network Disruption Router',
    keyAction: 'Plan Diversion Route'
  },
  {
    id: 'RAIL-10',
    portal: 'railway',
    category: 'Cold Chain',
    title: 'Refrigerated Wagon Availability Management',
    description: 'Dedicated availability tracker for reefer-equipped wagons and power car gensets across the cold-chain freight network.',
    isShared: true,
    sharedType: 'temperature-humidity',
    status: 'implemented',
    keyAction: 'Book Reefer Wagon'
  },
  {
    id: 'RAIL-11',
    portal: 'railway',
    category: 'Terminal Operations',
    title: 'Station Loading & Unloading Slot Scheduling',
    description: 'Timed loading slot planner for each station platform including gantry crane booking, dock assignments, and handover windows.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Schedule Loading Slot'
  },
  {
    id: 'RAIL-12',
    portal: 'railway',
    category: 'Intermodal',
    title: 'Rail-to-Truck Transfer Slot Coordination',
    description: 'Synchronizes train arrival schedules with road feeder truck availability to minimize dwell at intermodal transfer terminals.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Coordinate Transfer'
  },
  {
    id: 'RAIL-13',
    portal: 'railway',
    category: 'Tariff & Billing',
    title: 'Wagon Detention & Demurrage Cost Prediction',
    description: 'Calculates accumulating wagon detention charges when release is delayed beyond the free-time window at origin or destination.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Calculate Demurrage'
  },
  {
    id: 'RAIL-14',
    portal: 'railway',
    category: 'Operational Planning',
    title: 'Train Formation & Cargo Compatibility Planning',
    description: 'Rake formation planner verifying wagon order, cargo compatibility (no hazmat near food), and total train length compliance.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Plan Train Formation'
  },

  // ==========================================
  // WAREHOUSE ADMINISTRATION — 14 FEATURES
  // ==========================================
  {
    id: 'WHS-01',
    portal: 'warehouse',
    category: 'Facility Capacity',
    title: 'Multi-Chamber Storage Capacity & Space Allocation',
    description: 'Interactive schematic of warehouse chambers tracking total capacity, occupied pallet positions, and cubic meter utilization.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Allocate Pallet Slots'
  },
  {
    id: 'WHS-02',
    portal: 'warehouse',
    category: 'Thermal Telemetry',
    title: 'Multi-Zone Precision Temperature Monitoring',
    description: 'Real-time telemetry across Deep Freeze (-25°C), Meat/Dairy Chiller (+2°C to +4°C), and Fresh Produce (+8°C to +12°C).',
    isShared: true,
    sharedType: 'temperature-humidity',
    status: 'implemented',
    keyAction: 'Inspect Chamber Temps'
  },
  {
    id: 'WHS-03',
    portal: 'warehouse',
    category: 'Atmospheric Telemetry',
    title: 'Controlled Atmosphere (CA) O2/CO2/Humidity Telemetry',
    description: 'Precision monitoring of Controlled Atmosphere chambers regulating Oxygen (1.5%), Carbon Dioxide (1.0%), and Relative Humidity (95%).',
    isShared: true,
    sharedType: 'temperature-humidity',
    status: 'implemented',
    keyAction: 'Adjust CA Gas Levels'
  },
  {
    id: 'WHS-04',
    portal: 'warehouse',
    category: 'Inventory Management',
    title: 'Real-Time Pallet Inventory Ledger',
    description: 'Searchable ledger tracking batch numbers, commodity type, gross weight, inward date, client name, and allocated bay.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Filter Pallet Inventory'
  },
  {
    id: 'WHS-05',
    portal: 'warehouse',
    category: 'Cargo Identification',
    title: 'QR Code Pallet Tracking & Bin Location Lookup',
    description: 'Scan or generate QR labels mapping individual pallets to exact 3D rack coordinates (Aisle-Rack-Shelf-Position).',
    isShared: true,
    sharedType: 'qr-cargo',
    status: 'implemented',
    keyAction: 'Scan Pallet QR'
  },
  {
    id: 'WHS-06',
    portal: 'warehouse',
    category: 'Quality & Expiry',
    title: 'Batch Expiry & FEFO (First-Expired, First-Out) Tracker',
    description: 'Automated warehouse dispatch prioritization sequencing pallets with shortest remaining shelf life for immediate loading.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Review FEFO Priority Queue'
  },
  {
    id: 'WHS-07',
    portal: 'warehouse',
    category: 'Safety & Alarms',
    title: 'Automated Ammonia/Freon Refrigerant Leak Alarm',
    description: 'Continuous chemical sensor array monitoring compressor plant rooms with instant audio-visual warning and emergency exhaust trigger.',
    isShared: true,
    sharedType: 'spoilage-alerts',
    status: 'implemented',
    keyAction: 'Inspect Gas Sensor Alarms'
  },
  {
    id: 'WHS-08',
    portal: 'warehouse',
    category: 'Inward Operations',
    title: 'Inward Goods Receiving & Core Temp Inspection',
    description: 'Dock receiving station validating inward produce temperature probes, packaging seal integrity, and gross weight slip.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Record Inward Consignment'
  },
  {
    id: 'WHS-09',
    portal: 'warehouse',
    category: 'Computer Vision',
    title: 'OpenCV Pallet Condition & Carton Damage Inspector',
    description: 'Upload pallet receiving photos to evaluate carton crushing, shrink-wrap tearing, and frost damage via edge analysis.',
    isShared: true,
    sharedType: 'opencv-inspection',
    status: 'simulated_demo',
    aiOrEngine: 'OpenCV Carton Integrity Model',
    keyAction: 'Upload Pallet Image'
  },
  {
    id: 'WHS-10',
    portal: 'warehouse',
    category: 'Pre-Cooling Operations',
    title: 'Blast Freezing & Pre-Cooling Tunnel Controls',
    description: 'Controls rapid pull-down blast tunnels reducing core temperature from +25°C to +4°C within 120 minutes of inward receipt.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Start Blast Cycle'
  },
  {
    id: 'WHS-11',
    portal: 'warehouse',
    category: 'Outward Operations',
    title: 'Truck Bay Dock Scheduling & Cross-Dock Dispatch',
    description: 'Management of 8 loading bays with scheduled truck turnaround times, dock leveler operations, and seal dispatch logs.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Schedule Loading Bay'
  },
  {
    id: 'WHS-12',
    portal: 'warehouse',
    category: 'Billing & Commercials',
    title: 'Cold Storage Tariff, Power Surcharge & Billing Engine',
    description: 'Automated client billing calculator applying per-pallet-day rates, blast cooling surcharge, and handling tariffs.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Generate Storage Invoice'
  },
  {
    id: 'WHS-13',
    portal: 'warehouse',
    category: 'Facility Maintenance',
    title: 'Preventative Chiller Maintenance Scheduler',
    description: 'Scheduled maintenance calendar for evaporator fans, condenser cleaning, compressor oil changes, and insulated door gaskets.',
    isShared: false,
    status: 'implemented',
    keyAction: 'Log Compressor Maintenance'
  },
  {
    id: 'WHS-14',
    portal: 'warehouse',
    category: 'Energy & Loss Analytics',
    title: 'Energy Efficiency (kWh/Tonne) & Loss Prevention Audit',
    description: 'Energy analytics tracking COP (Coefficient of Performance) and thermal insulation efficiency to minimize operational power costs.',
    isShared: true,
    sharedType: 'reports-analytics',
    status: 'implemented',
    keyAction: 'Audit Energy Performance'
  }
];

export const getChecklistByPortal = (portalId: 'farmer' | 'truck' | 'railway' | 'warehouse') => {
  return ALL_CHECKLIST_FEATURES.filter(item => item.portal === portalId);
};

export const getChecklistStats = () => {
  const total = ALL_CHECKLIST_FEATURES.length;
  const implemented = ALL_CHECKLIST_FEATURES.filter(f => f.status === 'implemented').length;
  const simulatedDemo = ALL_CHECKLIST_FEATURES.filter(f => f.status === 'simulated_demo').length;
  const shared = ALL_CHECKLIST_FEATURES.filter(f => f.isShared).length;

  return {
    total,
    implemented,
    simulatedDemo,
    shared,
    farmer: ALL_CHECKLIST_FEATURES.filter(f => f.portal === 'farmer').length,
    truck: ALL_CHECKLIST_FEATURES.filter(f => f.portal === 'truck').length,
    railway: ALL_CHECKLIST_FEATURES.filter(f => f.portal === 'railway').length,
    warehouse: ALL_CHECKLIST_FEATURES.filter(f => f.portal === 'warehouse').length,
  };
};
