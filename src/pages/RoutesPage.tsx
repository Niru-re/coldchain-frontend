import React, { useState, useMemo } from 'react';
import {
  GitFork,
  Calendar,
  Zap,
  MapPin,
  Clock,
  Fuel,
  ArrowRight,
  TrendingDown,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  Compass,
  Gauge,
  Info,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  Flame,
  Leaf
} from 'lucide-react';

export interface ActiveCorridorRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estDuration: string;
  vehiclesOnRoute: number;
  trafficStatus: 'Normal' | 'Slow' | 'Congested';
  trafficDelayMinutes: number;
  status: 'Active' | 'Optimal' | 'Restricted';
  avgSpeedKmH: number;
  waypoints: string[];
}

export interface VehicleFuelMetric {
  vehicleId: string;
  plate: string;
  routeId: string;
  fuelPct: number;
  fuelLiters: number;
  maxTankLiters: number;
  reeferBurnLitersPerHr: number;
  estRangeKm: number;
  fuelStatus: 'Optimal' | 'Normal' | 'Low Fuel';
}

export interface DeliveryScheduleItem {
  id: string;
  date: string;
  scheduledTime: string;
  shipmentId: string;
  origin: string;
  destination: string;
  driver: string;
  vehicle: string;
  status: 'Confirmed' | 'Scheduled' | 'Pending Prep';
  cargoType: string;
}

export interface OptimizationResult {
  origin: string;
  destination: string;
  priority: 'Speed' | 'Fuel' | 'Both';
  routeA: {
    name: string;
    tagline: string;
    distanceKm: number;
    duration: string;
    fuelLiters: number;
    fuelCostInr: number;
    co2Kg: number;
    tempStabilityIndex: number;
    tollInr: number;
    potholeVibrationScore: 'Low' | 'Medium' | 'High';
    recommended: boolean;
  };
  routeB: {
    name: string;
    tagline: string;
    distanceKm: number;
    duration: string;
    fuelLiters: number;
    fuelCostInr: number;
    co2Kg: number;
    tempStabilityIndex: number;
    tollInr: number;
    potholeVibrationScore: 'Low' | 'Medium' | 'High';
    recommended: boolean;
  };
}

const INITIAL_ROUTES: ActiveCorridorRoute[] = [
  {
    id: 'RT-MUM-PUN',
    name: 'Mumbai JNPT ➔ Pune Chakan MIDC',
    origin: 'JNPT Port Custom Terminal, Mumbai',
    destination: 'Chakan Auto-Pharma Hub, Pune',
    distanceKm: 148,
    estDuration: '3h 15m',
    vehiclesOnRoute: 3,
    trafficStatus: 'Slow',
    trafficDelayMinutes: 25,
    status: 'Active',
    avgSpeedKmH: 52,
    waypoints: ['Khopoli Interchange', 'Khandala Ghat Descent', 'Talegaon Toll']
  },
  {
    id: 'RT-NGP-BHI',
    name: 'Nagpur Multi-Modal ➔ Bhiwandi Cold Hub',
    origin: 'Nagpur Logistics Park (Zero Mile)',
    destination: 'Bhiwandi Central Cold Mega Hub',
    distanceKm: 702,
    estDuration: '10h 30m',
    vehiclesOnRoute: 5,
    trafficStatus: 'Normal',
    trafficDelayMinutes: 0,
    status: 'Optimal',
    avgSpeedKmH: 74,
    waypoints: ['Wardha Gate #4', 'Aurangabad Express', 'Shirdi Service Plaza']
  },
  {
    id: 'RT-DEL-JAI',
    name: 'Delhi Okhla ➔ Jaipur Sitapura Agro Park',
    origin: 'Okhla Cold Consolidation Hub, Delhi',
    destination: 'Sitapura Bio-Agro Park, Jaipur',
    distanceKm: 268,
    estDuration: '4h 45m',
    vehiclesOnRoute: 4,
    trafficStatus: 'Normal',
    trafficDelayMinutes: 0,
    status: 'Active',
    avgSpeedKmH: 68,
    waypoints: ['Gurugram Kherki Toll', 'Neemrana Hub', 'Shahpura Bypass']
  },
  {
    id: 'RT-BLR-CHE',
    name: 'Bengaluru Electronic City ➔ Chennai Port',
    origin: 'Electronic City Phase 2, Bengaluru',
    destination: 'Chennai Port Container Freight Station',
    distanceKm: 345,
    estDuration: '6h 10m',
    vehiclesOnRoute: 2,
    trafficStatus: 'Congested',
    trafficDelayMinutes: 45,
    status: 'Active',
    avgSpeedKmH: 48,
    waypoints: ['Hosur Border Check', 'Ranipet Toll', 'Sriperumbudur SEZ']
  },
  {
    id: 'RT-AMD-SRT',
    name: 'Ahmedabad Sanand ➔ Surat Diamond SEZ',
    origin: 'Sanand Industrial Cluster, Ahmedabad',
    destination: 'Surat Central Cold Depot',
    distanceKm: 280,
    estDuration: '4h 20m',
    vehiclesOnRoute: 3,
    trafficStatus: 'Normal',
    trafficDelayMinutes: 0,
    status: 'Optimal',
    avgSpeedKmH: 72,
    waypoints: ['Vadodara Expressway Link', 'Bharuch Narmada Bridge', 'Ankleshwar']
  },
  {
    id: 'RT-HYD-VIZ',
    name: 'Hyderabad Genome ➔ Visakhapatnam Pharma City',
    origin: 'Genome Valley Terminal #1, Hyderabad',
    destination: 'Visakhapatnam Jawaharlal Nehru Pharma City',
    distanceKm: 620,
    estDuration: '11h 00m',
    vehiclesOnRoute: 2,
    trafficStatus: 'Normal',
    trafficDelayMinutes: 0,
    status: 'Active',
    avgSpeedKmH: 62,
    waypoints: ['Suryapet Plaza', 'Vijayawada Outer Ring', 'Rajahmundry Bypass']
  }
];

const INITIAL_FUEL_METRICS: VehicleFuelMetric[] = [
  {
    vehicleId: 'TS-V01',
    plate: 'MH-12-AB-1234',
    routeId: 'RT-MUM-PUN',
    fuelPct: 82,
    fuelLiters: 246,
    maxTankLiters: 300,
    reeferBurnLitersPerHr: 2.8,
    estRangeKm: 680,
    fuelStatus: 'Optimal'
  },
  {
    vehicleId: 'TS-V02',
    plate: 'MH-31-TR-4912',
    routeId: 'RT-NGP-BHI',
    fuelPct: 74,
    fuelLiters: 222,
    maxTankLiters: 300,
    reeferBurnLitersPerHr: 3.2,
    estRangeKm: 590,
    fuelStatus: 'Normal'
  },
  {
    vehicleId: 'TS-V03',
    plate: 'GJ-06-AZ-3304',
    routeId: 'RT-AMD-SRT',
    fuelPct: 35,
    fuelLiters: 105,
    maxTankLiters: 300,
    reeferBurnLitersPerHr: 3.9,
    estRangeKm: 240,
    fuelStatus: 'Low Fuel'
  },
  {
    vehicleId: 'TS-V04',
    plate: 'HR-55-BW-9014',
    routeId: 'RT-DEL-JAI',
    fuelPct: 91,
    fuelLiters: 182,
    maxTankLiters: 200,
    reeferBurnLitersPerHr: 1.8,
    estRangeKm: 720,
    fuelStatus: 'Optimal'
  },
  {
    vehicleId: 'TS-V05',
    plate: 'KA-01-MJ-6721',
    routeId: 'RT-BLR-CHE',
    fuelPct: 68,
    fuelLiters: 204,
    maxTankLiters: 300,
    reeferBurnLitersPerHr: 3.0,
    estRangeKm: 540,
    fuelStatus: 'Normal'
  },
  {
    vehicleId: 'TS-V06',
    plate: 'TS-08-KL-4099',
    routeId: 'RT-HYD-VIZ',
    fuelPct: 58,
    fuelLiters: 145,
    maxTankLiters: 250,
    reeferBurnLitersPerHr: 2.5,
    estRangeKm: 460,
    fuelStatus: 'Normal'
  }
];

const INITIAL_SCHEDULE: DeliveryScheduleItem[] = [
  {
    id: 'SCH-01',
    date: '2026-10-22',
    scheduledTime: '06:30 IST',
    shipmentId: 'SHP-901',
    origin: 'Mumbai JNPT Cold Hub',
    destination: 'Pune Bio-Cluster MIDC',
    driver: 'Rajesh Sharma',
    vehicle: 'MH-12-AB-1234',
    status: 'Confirmed',
    cargoType: 'Vaccines (+2°C to +8°C)'
  },
  {
    id: 'SCH-02',
    date: '2026-10-22',
    scheduledTime: '08:00 IST',
    shipmentId: 'SHP-902',
    origin: 'Baddi Pharma Manufacturing',
    destination: 'Delhi NCR Cold Hub',
    driver: 'Satish Patil',
    vehicle: 'HR-55-BW-9014',
    status: 'Scheduled',
    cargoType: 'Injectables (+4°C)'
  },
  {
    id: 'SCH-03',
    date: '2026-10-23',
    scheduledTime: '05:45 IST',
    shipmentId: 'SHP-903',
    origin: 'Nagpur Multi-Modal Park',
    destination: 'Nashik Agro Terminal',
    driver: 'Amit Verma',
    vehicle: 'MH-31-TR-4912',
    status: 'Scheduled',
    cargoType: 'Specialty Dairy (+2°C)'
  },
  {
    id: 'SCH-04',
    date: '2026-10-24',
    scheduledTime: '07:15 IST',
    shipmentId: 'SHP-904',
    origin: 'Bengaluru Electronic City',
    destination: 'Chennai Port CFS Terminal',
    driver: 'Suresh Kumar',
    vehicle: 'KA-01-MJ-6721',
    status: 'Scheduled',
    cargoType: 'Probiotic Cultures (+4°C)'
  },
  {
    id: 'SCH-05',
    date: '2026-10-25',
    scheduledTime: '09:30 IST',
    shipmentId: 'SHP-905',
    origin: 'Genome Valley Hyderabad',
    destination: 'Vijayawada Regional Depot',
    driver: 'Harpreet Singh',
    vehicle: 'TS-08-KL-4099',
    status: 'Pending Prep',
    cargoType: 'Cryo Reagents (-20°C)'
  },
  {
    id: 'SCH-06',
    date: '2026-10-26',
    scheduledTime: '06:00 IST',
    shipmentId: 'SHP-906',
    origin: 'Sonipat Agri-Biotech Depot',
    destination: 'Chandigarh Research Facility',
    driver: 'Kuldeep Yadav',
    vehicle: 'DL-01-AB-1904',
    status: 'Scheduled',
    cargoType: 'Frozen Plasma (-22°C)'
  },
  {
    id: 'SCH-07',
    date: '2026-10-27',
    scheduledTime: '10:00 IST',
    shipmentId: 'SHP-907',
    origin: 'Dankuni Hub Kolkata',
    destination: 'Durgapur Hospital Logistics',
    driver: 'Manoj Shinde',
    vehicle: 'WB-23-CD-8812',
    status: 'Scheduled',
    cargoType: 'Insulin Cartridges (+5°C)'
  },
  {
    id: 'SCH-08',
    date: '2026-10-28',
    scheduledTime: '04:30 IST',
    shipmentId: 'SHP-908',
    origin: 'Dahej Marine Terminal',
    destination: 'Surat Cold Chain Center',
    driver: 'Vikram Rathore',
    vehicle: 'GJ-06-AZ-3304',
    status: 'Scheduled',
    cargoType: 'Chilled Seafood (0°C)'
  }
];

export const RoutesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routes' | 'schedule' | 'optimization'>('routes');

  // Active Routes State
  const [routes] = useState<ActiveCorridorRoute[]>(INITIAL_ROUTES);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('RT-NGP-BHI');

  // Delivery Schedule State
  const [schedules, setSchedules] = useState<DeliveryScheduleItem[]>(INITIAL_SCHEDULE);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState<boolean>(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    scheduledTime: '08:00 IST',
    shipmentId: '',
    origin: '',
    destination: '',
    driver: '',
    vehicle: ''
  });
  const [scheduleFormError, setScheduleFormError] = useState<string>('');
  const [scheduleSuccessMessage, setScheduleSuccessMessage] = useState<string>('');

  // Route Optimization State
  const [optOrigin, setOptOrigin] = useState<string>('Nagpur Multi-Modal Park');
  const [optDestination, setOptDestination] = useState<string>('Mumbai JNPT Export Terminal');
  const [optPriority, setOptPriority] = useState<'Speed' | 'Fuel' | 'Both'>('Both');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<OptimizationResult | null>({
    origin: 'Nagpur Multi-Modal Park',
    destination: 'Mumbai JNPT Export Terminal',
    priority: 'Both',
    routeA: {
      name: 'CORRIDOR A: Samruddhi Mahamarg (Autonomous Express)',
      tagline: 'Precision Thermal Corridor — Minimal vibration & steady cruise',
      distanceKm: 702,
      duration: '10h 30m',
      fuelLiters: 198,
      fuelCostInr: 17820,
      co2Kg: 524,
      tempStabilityIndex: 99.4,
      tollInr: 2150,
      potholeVibrationScore: 'Low',
      recommended: true
    },
    routeB: {
      name: 'CORRIDOR B: NH-53 Traditional Jalgaon Highway',
      tagline: 'Standard National Highway — Urban choke points & ghat wear',
      distanceKm: 764,
      duration: '13h 15m',
      fuelLiters: 242,
      fuelCostInr: 21780,
      co2Kg: 641,
      tempStabilityIndex: 94.1,
      tollInr: 2850,
      potholeVibrationScore: 'High',
      recommended: false
    }
  });

  const selectedRoute = useMemo(() => {
    return routes.find((r) => r.id === selectedRouteId) || routes[0];
  }, [routes, selectedRouteId]);

  // Handle Schedule Modal Submit
  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleFormError('');

    if (
      !scheduleForm.date ||
      !scheduleForm.scheduledTime.trim() ||
      !scheduleForm.shipmentId.trim() ||
      !scheduleForm.origin.trim() ||
      !scheduleForm.destination.trim() ||
      !scheduleForm.driver.trim() ||
      !scheduleForm.vehicle.trim()
    ) {
      setScheduleFormError('Please fill out all fields to schedule the reefer dispatch.');
      return;
    }

    const newDelivery: DeliveryScheduleItem = {
      id: `SCH-0${schedules.length + 1}`,
      date: scheduleForm.date,
      scheduledTime: scheduleForm.scheduledTime.trim(),
      shipmentId: scheduleForm.shipmentId.trim().toUpperCase(),
      origin: scheduleForm.origin.trim(),
      destination: scheduleForm.destination.trim(),
      driver: scheduleForm.driver.trim(),
      vehicle: scheduleForm.vehicle.trim().toUpperCase(),
      status: 'Scheduled',
      cargoType: 'Cold-Chain Pharma (+2°C to +8°C)'
    };

    setSchedules([newDelivery, ...schedules]);
    setIsScheduleModalOpen(false);
    setScheduleForm({
      date: '',
      scheduledTime: '08:00 IST',
      shipmentId: '',
      origin: '',
      destination: '',
      driver: '',
      vehicle: ''
    });
    setScheduleSuccessMessage(`Delivery ${newDelivery.shipmentId} scheduled successfully for ${newDelivery.date}.`);
    setTimeout(() => setScheduleSuccessMessage(''), 4500);
  };

  // Handle Run Simulation
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationResult({
        origin: optOrigin,
        destination: optDestination,
        priority: optPriority,
        routeA: {
          name: `${optOrigin.split(' ')[0]} ➔ ${optDestination.split(' ')[0]} (Direct Green Corridor)`,
          tagline: 'Recommended AI Route: Gradient optimized with uninterrupted reefer power line',
          distanceKm: optPriority === 'Speed' ? 685 : 702,
          duration: optPriority === 'Speed' ? '9h 55m' : '10h 30m',
          fuelLiters: optPriority === 'Fuel' ? 188 : 198,
          fuelCostInr: optPriority === 'Fuel' ? 16920 : 17820,
          co2Kg: 512,
          tempStabilityIndex: 99.6,
          tollInr: 2150,
          potholeVibrationScore: 'Low',
          recommended: true
        },
        routeB: {
          name: `${optOrigin.split(' ')[0]} ➔ ${optDestination.split(' ')[0]} (Legacy Municipal Highway)`,
          tagline: 'Alternative Secondary Route: Higher stop-and-go reefer thermal draw',
          distanceKm: 760,
          duration: '13h 20m',
          fuelLiters: 245,
          fuelCostInr: 22050,
          co2Kg: 648,
          tempStabilityIndex: 93.8,
          tollInr: 2800,
          potholeVibrationScore: 'High',
          recommended: false
        }
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-5">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#292D2F] tracking-tight uppercase">
              Routes & Delivery Scheduling
            </h1>
            <span className="bg-[#F2AE32]/15 text-[#292D2F] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#F2AE32]/40">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Corridor Intelligence, Active Haul Fleet Tracking & Predictive Route Optimization — ColdChain 360 AI
          </p>
        </div>

        {/* 3 Tabs Switcher */}
        <div className="flex p-1 bg-white border border-[#D0CEC9] rounded-xl font-mono text-xs shadow-xs">
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'routes'
                ? 'bg-[#06383D] text-white shadow-xs'
                : 'text-[#A5A5A4] hover:text-[#292D2F]'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Active Routes</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#06383D] text-white shadow-xs'
                : 'text-[#A5A5A4] hover:text-[#292D2F]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Delivery Schedule</span>
          </button>
          <button
            onClick={() => setActiveTab('optimization')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'optimization'
                ? 'bg-[#06383D] text-white shadow-xs'
                : 'text-[#A5A5A4] hover:text-[#292D2F]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Route Optimization</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {scheduleSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-mono text-[#16803C] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-bold">{scheduleSuccessMessage}</span>
          </div>
          <button onClick={() => setScheduleSuccessMessage('')} className="p-1 hover:text-[#292D2F]">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: ACTIVE ROUTES & FUEL MONITORING                   */}
      {/* ======================================================== */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          
          {/* Active Routes Table */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  HIGHWAY LOGISTICS CORRIDORS
                </span>
                <h2 className="text-lg font-black text-[#292D2F] font-sans">
                  Active Heavy Freight Routes ({routes.length})
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-[#16803C] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md">
                6 NATIONAL CORRIDORS OPERATIONAL
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                    <th className="py-2.5 px-3">Route ID & Name</th>
                    <th className="py-2.5 px-3">Origin Hub</th>
                    <th className="py-2.5 px-3">Destination Terminal</th>
                    <th className="py-2.5 px-3">Distance (km)</th>
                    <th className="py-2.5 px-3">Est. Duration</th>
                    <th className="py-2.5 px-3">Vehicles on Route</th>
                    <th className="py-2.5 px-3">Traffic Status</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D0CEC9]">
                  {routes.map((route) => {
                    const isSelected = selectedRouteId === route.id;

                    return (
                      <tr
                        key={route.id}
                        onClick={() => setSelectedRouteId(route.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#F2AE32]/10 font-medium' : 'hover:bg-[#F0EEEA]'
                        }`}
                      >
                        <td className="py-3 px-3">
                          <div className="font-sans font-bold text-[#292D2F]">{route.name}</div>
                          <div className="text-[10px] text-[#A5A5A4]">{route.id} · Avg {route.avgSpeedKmH} km/h</div>
                        </td>

                        <td className="py-3 px-3 font-sans text-xs text-[#292D2F]">
                          {route.origin}
                        </td>

                        <td className="py-3 px-3 font-sans text-xs text-[#292D2F]">
                          {route.destination}
                        </td>

                        <td className="py-3 px-3 font-bold text-[#292D2F]">
                          {route.distanceKm} km
                        </td>

                        <td className="py-3 px-3 font-semibold text-[#06383D]">
                          {route.estDuration}
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-[#06383D]/10 text-[#06383D] font-bold text-[10px]">
                            {route.vehiclesOnRoute} Trucks
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            route.trafficStatus === 'Normal'
                              ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                              : route.trafficStatus === 'Slow'
                              ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                              : 'bg-red-50 text-[#DC2626] border border-red-200'
                          }`}>
                            ● {route.trafficStatus} {route.trafficDelayMinutes > 0 ? `(+${route.trafficDelayMinutes}m)` : ''}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            route.status === 'Optimal'
                              ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40 font-bold'
                              : 'bg-white border border-[#D0CEC9] text-[#06383D]'
                          }`}>
                            {route.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRouteId(route.id);
                            }}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#06383D] text-white'
                                : 'border border-[#D0CEC9] text-[#06383D] hover:bg-[#F2AE32] hover:text-[#292D2F]'
                            }`}
                          >
                            {isSelected ? 'Viewing' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Styled Route Visualization Card */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  CORRIDOR TOPOLOGY SPECIFICATION
                </span>
                <h3 className="text-base font-bold text-[#292D2F] mt-0.5">
                  {selectedRoute.name} ({selectedRoute.distanceKm} km · {selectedRoute.estDuration})
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-[#A5A5A4]">Traffic Clearance:</span>
                <span className="font-bold text-[#16803C]">SLA 98.2%</span>
              </div>
            </div>

            {/* Simple SVG Route Visualization */}
            <div className="p-4 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[#A5A5A4] text-[10px] uppercase font-bold">
                <span>{selectedRoute.origin}</span>
                <span className="text-[#06383D] font-bold">EXPRESS ROUTE ARTERY</span>
                <span>{selectedRoute.destination}</span>
              </div>

              {/* Graphic Polyline Progression */}
              <div className="relative py-4">
                <svg viewBox="0 0 800 60" className="w-full h-12">
                  {/* Background Track Line */}
                  <line x1="40" y1="30" x2="760" y2="30" stroke="#D0CEC9" strokeWidth="6" strokeLinecap="round" />
                  {/* Active Highlight Line */}
                  <line x1="40" y1="30" x2="520" y2="30" stroke="#F2AE32" strokeWidth="6" strokeLinecap="round" />
                  
                  {/* Origin Node */}
                  <circle cx="40" cy="30" r="10" fill="#06383D" stroke="#FFFFFF" strokeWidth="3" />
                  <text x="40" y="55" textAnchor="middle" fontSize="10" fill="#292D2F" fontWeight="bold">ORIGIN</text>

                  {/* Intermediate Waypoints */}
                  {selectedRoute.waypoints.map((wp, idx) => {
                    const cx = 220 + idx * 180;
                    return (
                      <g key={wp}>
                        <circle cx={cx} cy="30" r="6" fill="#F2AE32" stroke="#FFFFFF" strokeWidth="2" />
                        <text x={cx} y="55" textAnchor="middle" fontSize="9" fill="#06383D" fontWeight="bold">{wp}</text>
                      </g>
                    );
                  })}

                  {/* Destination Node */}
                  <circle cx="760" cy="30" r="10" fill="#16803C" stroke="#FFFFFF" strokeWidth="3" />
                  <text x="760" y="55" textAnchor="middle" fontSize="10" fill="#292D2F" fontWeight="bold">DESTINATION</text>
                </svg>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#292D2F] pt-2 border-t border-[#D0CEC9]">
                <span>Speed Target: <strong>{selectedRoute.avgSpeedKmH} km/h cruise</strong></span>
                <span>Corridor Vehicles: <strong>{selectedRoute.vehiclesOnRoute} active reefers</strong></span>
                <span>Status: <strong className="text-[#16803C]">{selectedRoute.status} Dispatch</strong></span>
              </div>
            </div>
          </div>

          {/* Fuel Monitoring Section on Active Routes Tab */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  REAL-TIME AUXILIARY & PROPULSION ENERGY
                </span>
                <h2 className="text-lg font-black text-[#292D2F] font-sans">
                  Active Fleet Fuel & Reefer Consumption Monitoring
                </h2>
              </div>
              <span className="text-xs font-mono font-bold text-[#06383D] bg-[#06383D]/10 px-3 py-1 rounded-md">
                TELEMETRY REEFER SENSORS
              </span>
            </div>

            {/* Small Cards for Each Vehicle Showing Current Fuel Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              {INITIAL_FUEL_METRICS.map((fm) => (
                <div
                  key={fm.vehicleId}
                  className="p-4 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                    <div>
                      <div className="font-sans font-bold text-sm text-[#292D2F]">{fm.plate}</div>
                      <div className="text-[10px] text-[#A5A5A4]">{fm.vehicleId} · {fm.routeId}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      fm.fuelStatus === 'Low Fuel'
                        ? 'bg-red-50 text-[#DC2626] border border-red-200'
                        : fm.fuelStatus === 'Optimal'
                        ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                        : 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                    }`}>
                      ● {fm.fuelStatus}
                    </span>
                  </div>

                  {/* Fuel Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#A5A5A4]">Main Fuel Tank</span>
                      <span className="font-bold text-[#292D2F]">{fm.fuelPct}% ({fm.fuelLiters}L / {fm.maxTankLiters}L)</span>
                    </div>
                    <div className="w-full bg-[#E8E6E2] h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          fm.fuelPct < 40 ? 'bg-[#DC2626]' : fm.fuelPct < 70 ? 'bg-[#F2AE32]' : 'bg-[#16803C]'
                        }`}
                        style={{ width: `${fm.fuelPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D0CEC9] text-[11px]">
                    <div>
                      <div className="text-[9px] text-[#A5A5A4] uppercase">REEFER BURN</div>
                      <div className="font-bold text-[#06383D] mt-0.5">{fm.reeferBurnLitersPerHr} L/hr</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-[#A5A5A4] uppercase">EST. CRUISE RANGE</div>
                      <div className="font-bold text-[#292D2F] mt-0.5">{fm.estRangeKm} km</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: DELIVERY SCHEDULE                                 */}
      {/* ======================================================== */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  7-DAY DISPATCH TIMELINE
                </span>
                <h2 className="text-lg font-black text-[#292D2F] font-sans">
                  Scheduled Reefer Deliveries ({schedules.length})
                </h2>
              </div>

              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-4 py-2 hover:bg-[#F2AE32]/85 text-xs font-mono shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>SCHEDULE DELIVERY</span>
              </button>
            </div>

            {/* Calendar Table of Scheduled Deliveries */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Shipment ID</th>
                    <th className="py-2.5 px-3">Origin Hub</th>
                    <th className="py-2.5 px-3">Destination Terminal</th>
                    <th className="py-2.5 px-3">Assigned Pilot</th>
                    <th className="py-2.5 px-3">Reefer Vehicle</th>
                    <th className="py-2.5 px-3">Scheduled Time</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D0CEC9]">
                  {schedules.map((sch) => (
                    <tr key={sch.id} className="hover:bg-[#F0EEEA] transition-colors">
                      <td className="py-3 px-3 font-bold text-[#292D2F]">
                        {sch.date}
                      </td>

                      <td className="py-3 px-3">
                        <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                          {sch.shipmentId}
                        </span>
                        <div className="text-[10px] text-[#A5A5A4] mt-0.5">{sch.cargoType}</div>
                      </td>

                      <td className="py-3 px-3 font-sans text-xs text-[#292D2F]">
                        {sch.origin}
                      </td>

                      <td className="py-3 px-3 font-sans text-xs text-[#292D2F]">
                        {sch.destination}
                      </td>

                      <td className="py-3 px-3 font-bold text-[#292D2F]">
                        {sch.driver}
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono text-xs font-semibold text-[#06383D] bg-[#F0EEEA] px-2 py-0.5 rounded border border-[#D0CEC9]">
                          {sch.vehicle}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[#292D2F] font-bold">
                        {sch.scheduledTime}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          sch.status === 'Confirmed'
                            ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                            : sch.status === 'Scheduled'
                            ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                            : 'bg-[#06383D]/10 text-[#06383D]'
                        }`}>
                          ● {sch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: ROUTE OPTIMIZATION                                */}
      {/* ======================================================== */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          
          {/* Optimization Form */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="border-b border-[#D0CEC9] pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                AI-POWERED CORRIDOR SIMULATOR
              </span>
              <h2 className="text-lg font-black text-[#292D2F] font-sans">
                Corridor Trade-Off & Temperature Optimization
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                  Origin Hub
                </label>
                <select
                  value={optOrigin}
                  onChange={(e) => setOptOrigin(e.target.value)}
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                >
                  <option value="Nagpur Multi-Modal Park">Nagpur Multi-Modal Park</option>
                  <option value="Mumbai JNPT Port">Mumbai JNPT Port</option>
                  <option value="Delhi Okhla Terminal">Delhi Okhla Terminal</option>
                  <option value="Bengaluru Electronic City">Bengaluru Electronic City</option>
                  <option value="Ahmedabad Sanand Hub">Ahmedabad Sanand Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                  Destination Terminal
                </label>
                <select
                  value={optDestination}
                  onChange={(e) => setOptDestination(e.target.value)}
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                >
                  <option value="Mumbai JNPT Export Terminal">Mumbai JNPT Export Terminal</option>
                  <option value="Pune Bio-Cluster MIDC">Pune Bio-Cluster MIDC</option>
                  <option value="Chennai Port CFS">Chennai Port CFS</option>
                  <option value="Jaipur Agro-Tech Park">Jaipur Agro-Tech Park</option>
                  <option value="Hyderabad Genome Valley">Hyderabad Genome Valley</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                  Optimization Priority
                </label>
                <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                  {(['Speed', 'Fuel', 'Both'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setOptPriority(p)}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        optPriority === p
                          ? 'bg-[#06383D] text-white shadow-xs'
                          : 'border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#D0CEC9]">
              <span className="text-[11px] font-mono text-[#A5A5A4]">
                Evaluating gradient drag, road roughness index, live FASTag toll matrix, and ambient thermal curves.
              </span>
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-5 py-2 hover:bg-[#F2AE32]/85 text-xs font-mono shadow-sm flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-[#292D2F]" />
                    <span>CALCULATING CORRIDORS...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-[#292D2F]" />
                    <span>RUN CORRIDOR OPTIMIZATION</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Demo Notice Banner */}
          <div className="p-3.5 rounded-xl bg-white border border-[#D0CEC9] shadow-sm text-xs font-mono flex items-center gap-2.5 text-[#292D2F]">
            <Info className="w-4 h-4 text-[#F2AE32] shrink-0" />
            <span>
              <strong>Note:</strong> Route optimization uses demo data — live integration requires traffic API and GPS connectivity.
            </span>
          </div>

          {/* Route A vs Route B Comparison Table */}
          {simulationResult && (
            <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                    ML CORRIDOR SIMULATION RESULT
                  </span>
                  <h3 className="text-base font-bold text-[#292D2F]">
                    Route A (Autonomous Express) vs Route B (Standard Highway)
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-md bg-[#16803C]/10 text-[#16803C] font-mono font-bold text-xs">
                  ROUTE A RECOMMENDED (-84 MIN SAVED)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                      <th className="py-2.5 px-3">Metric Description</th>
                      <th className="py-2.5 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">
                        ROUTE A (OPTIMAL)
                      </th>
                      <th className="py-2.5 px-3 text-[#A5A5A4]">
                        ROUTE B (TRADITIONAL)
                      </th>
                      <th className="py-2.5 px-3 text-right">Variance / Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0CEC9]">
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Corridor Distance</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">{simulationResult.routeA.distanceKm} km</td>
                      <td className="py-3 px-3 text-[#A5A5A4]">{simulationResult.routeB.distanceKm} km</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">-{simulationResult.routeB.distanceKm - simulationResult.routeA.distanceKm} km saved</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Estimated Duration</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">{simulationResult.routeA.duration}</td>
                      <td className="py-3 px-3 text-[#A5A5A4]">{simulationResult.routeB.duration}</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">Faster by 2h 45m</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Estimated Diesel Fuel Use</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">{simulationResult.routeA.fuelLiters} Liters</td>
                      <td className="py-3 px-3 text-[#A5A5A4]">{simulationResult.routeB.fuelLiters} Liters</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">-{simulationResult.routeB.fuelLiters - simulationResult.routeA.fuelLiters} Liters</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Fuel Cost (INR)</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">₹{simulationResult.routeA.fuelCostInr.toLocaleString()}</td>
                      <td className="py-3 px-3 text-[#A5A5A4]">₹{simulationResult.routeB.fuelCostInr.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">-₹{(simulationResult.routeB.fuelCostInr - simulationResult.routeA.fuelCostInr).toLocaleString()}</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Carbon Footprint (CO2e)</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#06383D]">{simulationResult.routeA.co2Kg} kg CO2e</td>
                      <td className="py-3 px-3 text-[#A5A5A4]">{simulationResult.routeB.co2Kg} kg CO2e</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">-{simulationResult.routeB.co2Kg - simulationResult.routeA.co2Kg} kg CO2e</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Cold-Chain Temperature Stability Index</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#16803C]">{simulationResult.routeA.tempStabilityIndex}% SLA</td>
                      <td className="py-3 px-3 text-[#DC2626] font-semibold">{simulationResult.routeB.tempStabilityIndex}% SLA</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">+5.3% Thermal Integrity</td>
                    </tr>
                    <tr className="hover:bg-[#F0EEEA]">
                      <td className="py-3 px-3 font-semibold text-[#292D2F]">Road Pothole & Shock Vibration Risk</td>
                      <td className="py-3 px-3 bg-[#06383D]/5 font-bold text-[#16803C]">Low (Laser-graded Expressway)</td>
                      <td className="py-3 px-3 text-[#DC2626]">High (Municipal Highway Potholes)</td>
                      <td className="py-3 px-3 text-right text-[#16803C] font-bold">Zero cargo shift risk</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action recommendation bar */}
              <div className="p-4 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                  <span className="text-[#292D2F] font-bold">
                    ColdChain 360 AI recommends locking Route A for all temperature-sensitive cargo.
                  </span>
                </div>
                <button
                  onClick={() => alert("Route A locked into active dispatch manifesto.")}
                  className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 transition-colors cursor-pointer"
                >
                  LOCK ROUTE A DISPATCH
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: SCHEDULE DELIVERY FORM                            */}
      {/* ======================================================== */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#06383D]" />
                <h3 className="text-base font-bold text-[#292D2F] font-sans">
                  Schedule Cold Delivery
                </h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded text-[#A5A5A4] hover:text-[#292D2F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {scheduleFormError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-mono text-[#DC2626]">
                {scheduleFormError}
              </div>
            )}

            <form onSubmit={handleScheduleSubmit} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Scheduled Time *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 06:30 IST"
                    value={scheduleForm.scheduledTime}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, scheduledTime: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                  Shipment Consignment ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. SHP-909"
                  value={scheduleForm.shipmentId}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, shipmentId: e.target.value })}
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Origin Hub *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mumbai JNPT"
                    value={scheduleForm.origin}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, origin: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Destination Terminal *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune MIDC"
                    value={scheduleForm.destination}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, destination: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Assigned Pilot *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Sharma"
                    value={scheduleForm.driver}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, driver: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A4] font-bold uppercase text-[10px] mb-1">
                    Reefer Vehicle *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MH-12-AB-1234"
                    value={scheduleForm.vehicle}
                    onChange={(e) => setScheduleForm({ ...scheduleForm, vehicle: e.target.value })}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32]"
                    required
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#D0CEC9] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] px-4 py-2 rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-5 py-2 hover:bg-[#F2AE32]/85 shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
