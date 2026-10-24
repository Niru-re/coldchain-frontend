import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Truck,
  Thermometer,
  Gauge,
  Clock,
  Radio,
  Search,
  AlertTriangle,
  CheckCircle2,
  Layers,
  RefreshCw,
  SlidersHorizontal,
  Compass,
  ShieldAlert,
  ArrowRight,
  Info,
  Maximize2,
  Database,
  Play
} from 'lucide-react';
import api from '../services/api';
import { 
  RealLeafletMap, 
  MapVehiclePoint, 
  MapGeofence, 
  MapThermalZone, 
  MapCityNode,
  isValidCoordinate
} from '../components/common/RealLeafletMap';

export interface ColdChainVehicle {
  id: string;
  plate: string;
  driverName: string;
  driverPhone: string;
  model: string;
  cargo: string;
  origin: string;
  destination: string;
  currentLocation: string;
  coordinates: { x: number; y: number };
  lat: number;
  lng: number;
  hasGps?: boolean;
  routeCoordinates?: [number, number][];
  targetTemp: string;
  requiredMinTemp: number;
  requiredMaxTemp: number;
  currentTemp: number;
  tempStatus: 'normal' | 'warning' | 'critical';
  speedKmH: number;
  status: 'In Transit' | 'Idle' | 'Alert';
  eta: string;
  fuelPct: number;
  reeferUnit: string;
  reeferStatus: 'Active Chilling' | 'Stabilized' | 'Defrost Cycle' | 'Compressor Warning';
  batteryPct: number;
  lastPing: string;
  lastUpdated?: string;
  dataSource?: 'real' | 'simulated';
  shipmentId?: string;
  heading?: number;
  routeProgress?: number;
}

export interface GeofenceZone {
  id: string;
  name: string;
  category: 'Origin' | 'Delivery Zone' | 'Restricted Area';
  status: 'Active' | 'Breached';
  location: string;
  radiusKm: number;
  vehiclesInside: string[];
  alertTrigger: string;
}

const DEMO_VEHICLES: ColdChainVehicle[] = [
  {
    id: 'CC-REEFER-01',
    plate: 'MH-12-AB-1234',
    driverName: 'Rajesh Sharma',
    driverPhone: '+91 98230 44102',
    model: 'Tata Signa 4825.TK Multi-Temp',
    cargo: 'Active Biologics & Vaccines',
    origin: 'Bhiwandi Central Cold Hub',
    destination: 'Pune Bio-Cluster MIDC',
    currentLocation: 'Khopoli Expressway Section (KM 68)',
    coordinates: { x: 28, y: 66 },
    lat: 18.7880,
    lng: 73.3440,
    hasGps: true,
    routeCoordinates: [
      [19.2967, 73.0631],
      [19.0330, 73.0297],
      [18.7880, 73.3440],
      [18.7557, 73.4091],
      [18.5204, 73.8567],
    ],
    targetTemp: '2°C to 8°C',
    requiredMinTemp: 2.0,
    requiredMaxTemp: 8.0,
    currentTemp: 3.8,
    tempStatus: 'normal',
    speedKmH: 68,
    status: 'In Transit',
    eta: '1h 45m (Today 20:30 IST)',
    fuelPct: 78,
    reeferUnit: 'Thermo King SLXi-400',
    reeferStatus: 'Active Chilling',
    batteryPct: 94,
    lastPing: '2s ago',
    dataSource: 'simulated'
  },
  {
    id: 'CC-REEFER-02',
    plate: 'MH-31-TR-4912',
    driverName: 'Amit Verma',
    driverPhone: '+91 94221 80107',
    model: 'BharatBenz 3528C Cold-Max',
    cargo: 'Specialty Dairy & Butter Cults',
    origin: 'Nagpur Multi-Modal Cold Park',
    destination: 'Nashik Agro Terminal',
    currentLocation: 'Jalgaon Bypass (NH-53)',
    coordinates: { x: 38, y: 58 },
    lat: 20.9980,
    lng: 75.5660,
    hasGps: true,
    routeCoordinates: [
      [21.1458, 79.0882],
      [20.7002, 77.0082],
      [20.9980, 75.5660],
      [20.9042, 74.7749],
      [19.9975, 73.7898],
    ],
    targetTemp: '0°C to 4°C',
    requiredMinTemp: 0.0,
    requiredMaxTemp: 4.0,
    currentTemp: 2.4,
    tempStatus: 'normal',
    speedKmH: 72,
    status: 'In Transit',
    eta: '3h 10m (Today 22:15 IST)',
    fuelPct: 82,
    reeferUnit: 'Carrier Transicold Vector 1550',
    reeferStatus: 'Stabilized',
    batteryPct: 89,
    lastPing: '5s ago',
    dataSource: 'simulated'
  },
  {
    id: 'CC-REEFER-03',
    plate: 'GJ-06-AZ-3304',
    driverName: 'Vikram Rathore',
    driverPhone: '+91 97240 11118',
    model: 'Volvo FM 420 High-Capacity',
    cargo: 'Fresh Sea-Cargo & Salmon Fillets',
    origin: 'Dahej Marine Cold Terminal',
    destination: 'Surat Central Cold Storage',
    currentLocation: 'Ankleshwar GIDC Industrial Gate',
    coordinates: { x: 24, y: 51 },
    lat: 21.6260,
    lng: 73.0030,
    hasGps: true,
    routeCoordinates: [
      [21.7120, 72.5850],
      [21.7051, 72.9959],
      [21.6260, 73.0030],
      [21.1702, 72.8311],
    ],
    targetTemp: '-2°C to 2°C',
    requiredMinTemp: -2.0,
    requiredMaxTemp: 2.0,
    currentTemp: 5.6,
    tempStatus: 'critical',
    speedKmH: 0,
    status: 'Alert',
    eta: 'Delayed (+45m excursion)',
    fuelPct: 54,
    reeferUnit: 'Thermo King SLXi-300',
    reeferStatus: 'Compressor Warning',
    batteryPct: 62,
    lastPing: '12s ago',
    dataSource: 'simulated'
  },
  {
    id: 'CC-REEFER-04',
    plate: 'HR-55-BW-9014',
    driverName: 'Satish Patil',
    driverPhone: '+91 98112 66124',
    model: 'Eicher Pro 6035 Ultra-Chiller',
    cargo: 'Hormone Injections & Plasma',
    origin: 'Baddi Pharma Manufacturing Park',
    destination: 'Jaipur Medical Cold Depot',
    currentLocation: 'NH-48 Kotputli Corridor',
    coordinates: { x: 37, y: 23 },
    lat: 27.7050,
    lng: 76.1990,
    hasGps: true,
    routeCoordinates: [
      [30.9578, 76.7914],
      [28.6139, 77.2090],
      [27.7050, 76.1990],
      [26.9124, 75.7873],
    ],
    targetTemp: '2°C to 8°C',
    requiredMinTemp: 2.0,
    requiredMaxTemp: 8.0,
    currentTemp: 4.2,
    tempStatus: 'normal',
    speedKmH: 76,
    status: 'In Transit',
    eta: '2h 20m (Today 21:40 IST)',
    fuelPct: 88,
    reeferUnit: 'Carrier Supra 850',
    reeferStatus: 'Active Chilling',
    batteryPct: 98,
    lastPing: '1s ago',
    dataSource: 'simulated'
  },
  {
    id: 'CC-REEFER-05',
    plate: 'KA-01-MJ-6721',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98450 12890',
    model: 'Ashok Leyland 5525 Chiller 24T',
    cargo: 'High-Value Enzymes & Probiotics',
    origin: 'Bengaluru Electronic City Hub',
    destination: 'Chennai Port Cold Terminal',
    currentLocation: 'Ranipet Expressway (NH-48)',
    coordinates: { x: 49, y: 84 },
    lat: 12.9270,
    lng: 79.3330,
    hasGps: true,
    routeCoordinates: [
      [12.9716, 77.5946],
      [12.7409, 77.8253],
      [12.9165, 79.1325],
      [12.9270, 79.3330],
      [13.0827, 80.2707],
    ],
    targetTemp: '2°C to 6°C',
    requiredMinTemp: 2.0,
    requiredMaxTemp: 6.0,
    currentTemp: 3.1,
    tempStatus: 'normal',
    speedKmH: 64,
    status: 'In Transit',
    eta: '4h 05m (Tomorrow 00:15 IST)',
    fuelPct: 69,
    reeferUnit: 'Thermo King V-800 MAX',
    reeferStatus: 'Stabilized',
    batteryPct: 91,
    lastPing: '4s ago',
    dataSource: 'simulated'
  },
  {
    id: 'CC-REEFER-06',
    plate: 'TS-08-KL-4099',
    driverName: 'Harpreet Singh',
    driverPhone: '+91 99814 33131',
    model: 'Mahindra Furio 17 Cold-Carrier',
    cargo: 'Frozen Plasma & Reagents',
    origin: 'Genome Valley Hyderabad',
    destination: 'Vijayawada Multi-Cold Hub',
    currentLocation: 'Suryapet Highway Corridor (NH-65)',
    coordinates: { x: 56, y: 70 },
    lat: 17.1439,
    lng: 79.6239,
    hasGps: true,
    routeCoordinates: [
      [17.3850, 78.4867],
      [17.0577, 79.2684],
      [17.1439, 79.6239],
      [16.5062, 80.6480],
    ],
    targetTemp: '-20°C to -15°C',
    requiredMinTemp: -20.0,
    requiredMaxTemp: -15.0,
    currentTemp: -18.2,
    tempStatus: 'normal',
    speedKmH: 58,
    status: 'In Transit',
    eta: '1h 50m (Today 20:35 IST)',
    fuelPct: 74,
    reeferUnit: 'Carrier Supra 1150 U',
    reeferStatus: 'Active Chilling',
    batteryPct: 87,
    lastPing: '8s ago',
    dataSource: 'simulated'
  }
];

const GEOFENCE_ZONES: GeofenceZone[] = [
  {
    id: 'GF-01',
    name: 'Bhiwandi Central Cold Hub (Origin Alpha)',
    category: 'Origin',
    status: 'Active',
    location: 'Bhiwandi Industrial Bypass (NH-160)',
    radiusKm: 12.0,
    vehiclesInside: ['CC-REEFER-01'],
    alertTrigger: 'Unscheduled departure < -20m'
  },
  {
    id: 'GF-02',
    name: 'JNPT Port Bio-Pharma Terminal (Zone B)',
    category: 'Delivery Zone',
    status: 'Active',
    location: 'Nhava Sheva Port Special Cold Corridor',
    radiusKm: 9.0,
    vehiclesInside: ['CC-REEFER-02', 'CC-REEFER-05'],
    alertTrigger: 'Dwell time > 90 min at customs bay'
  },
  {
    id: 'GF-03',
    name: 'Western Ghats Extreme Ambient Zone',
    category: 'Restricted Area',
    status: 'Breached',
    location: 'Kasara Ghat & Igatpuri Incline (+42°C ambient)',
    radiusKm: 18.0,
    vehiclesInside: ['CC-REEFER-03'],
    alertTrigger: 'High ambient solar soak risk — dual reefer mandatory'
  }
];

const REAL_GEOFENCES: MapGeofence[] = [
  {
    id: 'GF-01',
    name: 'Bhiwandi Central Cold Hub (Origin Alpha)',
    lat: 19.2967,
    lng: 73.0631,
    radiusMeters: 12000,
    category: 'Origin',
    status: 'Active',
    alertTrigger: 'Unscheduled departure < -20m'
  },
  {
    id: 'GF-02',
    name: 'JNPT Port Bio-Pharma Terminal (Zone B)',
    lat: 18.9490,
    lng: 72.9510,
    radiusMeters: 9000,
    category: 'Delivery Zone',
    status: 'Active',
    alertTrigger: 'Dwell time > 90 min at customs bay'
  },
  {
    id: 'GF-03',
    name: 'Western Ghats Extreme Ambient Zone',
    lat: 19.6750,
    lng: 73.4830,
    radiusMeters: 18000,
    category: 'Restricted Area',
    status: 'Breached',
    alertTrigger: 'High ambient solar soak risk — dual reefer mandatory'
  }
];

const REAL_THERMAL_ZONES: MapThermalZone[] = [
  {
    id: 'TH-01',
    name: 'Vidarbha Heat Corridor',
    lat: 21.1458,
    lng: 79.0882,
    radiusMeters: 75000,
    ambientTemp: '+44.2°C',
    riskLevel: 'Severe'
  },
  {
    id: 'TH-02',
    name: 'Kotputli-Jaipur Solar Soak Arc',
    lat: 27.7050,
    lng: 76.1990,
    radiusMeters: 60000,
    ambientTemp: '+41.8°C',
    riskLevel: 'Moderate'
  },
  {
    id: 'TH-03',
    name: 'Gujarat Petrochemical Ambient Zone',
    lat: 21.6260,
    lng: 73.0030,
    radiusMeters: 45000,
    ambientTemp: '+39.5°C',
    riskLevel: 'Critical'
  }
];

const MAP_CITIES: (MapCityNode & { x: number; y: number })[] = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, x: 42, y: 16 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, x: 33, y: 26 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, x: 22, y: 44 },
  { name: 'Surat', lat: 21.1702, lng: 72.8311, x: 24, y: 53 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, x: 26, y: 64 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, x: 30, y: 69 },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882, x: 54, y: 55 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, x: 52, y: 72 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, x: 44, y: 86 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, x: 51, y: 84 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, x: 82, y: 45 }
];

// Corridor Waypoints for Fleet Trucks
const CORRIDOR_ROUTES: Record<string, [number, number][]> = {
  'CC-REEFER-01': [
    [16.9902, 73.3120], // Ratnagiri Orchard
    [17.7120, 73.3890], // Khed
    [18.5204, 73.8567], // Pune
    [18.9894, 73.1175], // Panvel Hub
    [19.0896, 72.8656], // Mumbai Cargo BOM
  ],
  'CC-REEFER-02': [
    [19.9975, 73.7898], // Nashik
    [19.6750, 73.4830], // Igatpuri
    [19.2967, 73.0631], // Bhiwandi
    [18.9499, 72.9511], // JNPT Port
  ],
  'CC-REEFER-03': [
    [18.5204, 73.8567], // Pune
    [18.7557, 73.4091], // Lonavala
    [18.7880, 73.3440], // Khopoli
    [19.0330, 73.0297], // Navi Mumbai
    [19.2967, 73.0631], // Bhiwandi
  ],
  'CC-REEFER-04': [
    [18.9500, 72.9500], // Mumbai Nhava Sheva
    [18.9894, 73.1175], // Panvel
    [18.7880, 73.3440], // Expressway
    [18.5204, 73.8567], // Pune Bio Park
  ],
  'CC-REEFER-05': [
    [21.1458, 79.0882], // Nagpur
    [20.7002, 77.0082], // Karanja Lad
    [19.8762, 75.3433], // Aurangabad
    [19.6750, 73.4830], // Igatpuri
    [19.0760, 72.8777], // Mumbai
  ],
};

export const LiveTrackingPage: React.FC = () => {
  const navigate = useNavigate();

  // Data Source Mode: 'live' (FastAPI Backend) vs 'simulated' (Corridor Demo Scenario)
  const [dataMode, setDataMode] = useState<'live' | 'simulated'>('live');
  const [liveVehicles, setLiveVehicles] = useState<ColdChainVehicle[]>([]);
  const [activeVehicles, setActiveVehicles] = useState<ColdChainVehicle[]>(DEMO_VEHICLES);
  const [isMovingActive, setIsMovingActive] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2 | 5>(1);
  const [followVehicle, setFollowVehicle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [isAutoPollEnabled, setIsAutoPollEnabled] = useState<boolean>(false);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('CC-REEFER-01');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Transit' | 'Idle' | 'Alert'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLayer, setActiveLayer] = useState<'corridors' | 'geofences' | 'thermal'>('corridors');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Fetch live telemetry from FastAPI backend
  const fetchLiveTelemetry = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [trucksRes, shipmentsRes] = await Promise.allSettled([
        api.getTrucks(),
        api.getShipments({ limit: 50 }),
      ]);

      if (trucksRes.status === 'rejected') {
        console.warn('FastAPI backend offline, active in Autonomous Live GPS Simulation');
        setApiError('FastAPI backend offline (port 8000). Active in Autonomous Live GPS Simulation Mode.');
        setActiveVehicles(DEMO_VEHICLES);
        setLastSyncedAt(new Date());
        return;
      }

      const trucks = trucksRes.value || [];
      const shipments = shipmentsRes.status === 'fulfilled' ? shipmentsRes.value.items || [] : [];

      if (trucks.length === 0) {
        setLiveVehicles([]);
        setApiError(null);
        setLastSyncedAt(new Date());
        return;
      }

      // Map backend trucks and correlate with active shipments
      const mappedVehicles: ColdChainVehicle[] = trucks.map((t: any) => {
        const matchingShipment = shipments.find(
          (s: any) => s.truckId === t.id || t.current_cargo?.includes(s.id) || s.id === t.current_cargo
        );

        const lat = typeof t.latitude === 'number' && !isNaN(t.latitude) ? t.latitude : NaN;
        const lng = typeof t.longitude === 'number' && !isNaN(t.longitude) ? t.longitude : NaN;
        const hasValidCoords = isValidCoordinate(lat, lng);

        const currentTemp = t.current_temperature != null ? t.current_temperature : (matchingShipment?.temperature ?? 4.0);
        const targetTempStr = t.target_temperature != null 
          ? `${t.target_temperature}°C` 
          : (matchingShipment ? `${matchingShipment.minTemp}°C to ${matchingShipment.maxTemp}°C` : '2°C to 8°C');
        const reqMin = t.target_temperature != null ? t.target_temperature - 3 : (matchingShipment?.minTemp ?? 2.0);
        const reqMax = t.target_temperature != null ? t.target_temperature + 3 : (matchingShipment?.maxTemp ?? 8.0);
        const tempStatus: 'normal' | 'warning' | 'critical' = 
          currentTemp > reqMax + 2 || currentTemp < reqMin - 2
            ? 'critical'
            : currentTemp > reqMax || currentTemp < reqMin
            ? 'warning'
            : 'normal';

        const statusMap: Record<string, 'In Transit' | 'Idle' | 'Alert'> = {
          'En Route': 'In Transit',
          'In Transit': 'In Transit',
          'Docking': 'Idle',
          'Standby': 'Idle',
          'Maintenance Required': 'Alert',
          'Alert': 'Alert',
        };

        const lastPingStr = t.updated_at 
          ? new Date(t.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          : 'Live Sync';

        return {
          id: t.id,
          plate: t.plate_number || t.id,
          driverName: t.driver_name || 'Assigned Driver',
          driverPhone: '+91 98230 44102',
          model: t.vehicle_type || 'Heavy Reefer 32T',
          cargo: t.current_cargo || matchingShipment?.commodity || 'Cold-Chain Payload',
          origin: matchingShipment?.origin || 'Central Cold Hub',
          destination: matchingShipment?.destination || 'Regional Destination Center',
          currentLocation: t.current_location || (hasValidCoords ? `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E` : 'Awaiting GPS Fix'),
          coordinates: { x: 50, y: 50 },
          lat: lat,
          lng: lng,
          hasGps: hasValidCoords,
          routeCoordinates: CORRIDOR_ROUTES[t.id] || (hasValidCoords ? [[lat - 0.2, lng - 0.2], [lat, lng], [lat + 0.2, lng + 0.2]] : undefined),
          targetTemp: targetTempStr,
          requiredMinTemp: reqMin,
          requiredMaxTemp: reqMax,
          currentTemp: currentTemp,
          tempStatus: tempStatus,
          speedKmH: t.status === 'En Route' ? 68 : 0,
          status: statusMap[t.status] || 'In Transit',
          eta: matchingShipment?.eta || (t.status === 'En Route' ? 'Projected · Today' : 'Docked / Standby'),
          fuelPct: t.fuel_level || 85,
          reeferUnit: 'Carrier Vector 1550',
          reeferStatus: t.status === 'En Route' ? 'Active Chilling' : 'Stabilized',
          batteryPct: 95,
          lastPing: lastPingStr,
          lastUpdated: t.updated_at ? new Date(t.updated_at).toLocaleString() : undefined,
          dataSource: 'real',
          shipmentId: matchingShipment?.id,
          heading: 140,
          routeProgress: 1.0,
        };
      });

      setLiveVehicles(mappedVehicles);
      setActiveVehicles(mappedVehicles);
      setApiError(null);
      setLastSyncedAt(new Date());

      // If currently selected vehicle is not in list, select first available
      if (mappedVehicles.length > 0 && !mappedVehicles.some((v) => v.id === selectedVehicleId)) {
        setSelectedVehicleId(mappedVehicles[0].id);
      }
    } catch (err: any) {
      console.warn('FastAPI backend telematics sync error:', err);
      setApiError(err.message || 'FastAPI backend connection failed');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [selectedVehicleId]);

  // Initial load
  useEffect(() => {
    fetchLiveTelemetry();
  }, [fetchLiveTelemetry]);

  // Mode switcher sync
  useEffect(() => {
    if (dataMode === 'simulated') {
      setActiveVehicles(DEMO_VEHICLES);
    } else if (dataMode === 'live' && liveVehicles.length > 0) {
      setActiveVehicles(liveVehicles);
    }
  }, [dataMode, liveVehicles]);

  // Real-time Moving Telematics Loop (Advance trucks along their routes)
  useEffect(() => {
    if (!isMovingActive) return;

    const interval = setInterval(() => {
      setActiveVehicles((prevList) =>
        prevList.map((veh) => {
          if (veh.status !== 'In Transit' || !veh.routeCoordinates || veh.routeCoordinates.length < 2) {
            return veh;
          }

          const pts = veh.routeCoordinates;
          const N = pts.length - 1;
          const currentProg = veh.routeProgress ?? 0.5;
          const step = 0.015 * simulationSpeed;
          let nextProg = currentProg + step;
          if (nextProg >= N) {
            nextProg = 0;
          }

          const segIdx = Math.min(Math.floor(nextProg), N - 1);
          const t = nextProg - segIdx;

          const p1 = pts[segIdx];
          const p2 = pts[segIdx + 1];

          const lat = p1[0] + (p2[0] - p1[0]) * t;
          const lng = p1[1] + (p2[1] - p1[1]) * t;

          // Heading angle in degrees
          const dLng = ((p2[1] - p1[1]) * Math.PI) / 180;
          const lat1 = (p1[0] * Math.PI) / 180;
          const lat2 = (p2[0] * Math.PI) / 180;
          const y = Math.sin(dLng) * Math.cos(lat2);
          const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
          const heading = Math.round(((Math.atan2(y, x) * 180) / Math.PI + 360) % 360);

          const liveSpeed = Math.max(30, Math.min(95, Math.round(veh.speedKmH + Math.sin(Date.now() / 2000) * 2)));
          const liveTemp = +(veh.currentTemp + Math.sin(Date.now() / 3500) * 0.04).toFixed(1);

          return {
            ...veh,
            lat,
            lng,
            heading,
            speedKmH: liveSpeed,
            currentTemp: liveTemp,
            routeProgress: nextProg,
            lastPing: 'Just now (Live GPS)',
            currentLocation: `${veh.origin.split(',')[0]} → ${veh.destination.split(',')[0]} · Highway KM ${Math.round(nextProg * 35)}`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [isMovingActive, simulationSpeed]);

  // Periodic Polling (30s) if enabled
  useEffect(() => {
    if (!isAutoPollEnabled || dataMode !== 'live') return;
    const interval = setInterval(() => {
      fetchLiveTelemetry();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAutoPollEnabled, dataMode, fetchLiveTelemetry]);

  // Active vehicle list derived from moving telematics
  const vehicles = useMemo(() => {
    return activeVehicles;
  }, [activeVehicles]);

  const selectedVehicle = useMemo(() => {
    return vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0] || DEMO_VEHICLES[0];
  }, [vehicles, selectedVehicleId]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (statusFilter !== 'All' && v.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          v.plate.toLowerCase().includes(q) ||
          v.id.toLowerCase().includes(q) ||
          v.driverName.toLowerCase().includes(q) ||
          v.currentLocation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vehicles, statusFilter, searchQuery]);

  // Filter and map points strictly with valid coordinates
  const mapVehicles: MapVehiclePoint[] = useMemo(() => {
    return filteredVehicles.map((v) => ({
      id: v.id,
      lat: v.lat,
      lng: v.lng,
      label: v.plate.includes('-') ? v.plate.split('-')[0] + '-' + v.plate.split('-')[1] : v.plate,
      plateNumber: v.plate,
      driverName: v.driverName,
      driverPhone: v.driverPhone,
      cargo: v.cargo,
      origin: v.origin,
      destination: v.destination,
      currentLocation: v.currentLocation,
      temp: v.currentTemp,
      targetTemp: v.targetTemp,
      tempStatus: v.tempStatus,
      speedKmH: v.speedKmH,
      status: v.status,
      eta: v.eta,
      reeferUnit: v.reeferUnit,
      reeferStatus: v.reeferStatus,
      fuelPct: v.fuelPct,
      routeCoordinates: v.routeCoordinates,
      lastUpdated: v.lastUpdated || v.lastPing,
      dataSource: v.dataSource || (dataMode === 'live' ? 'real' : 'simulated'),
      shipmentId: v.shipmentId,
      heading: v.heading,
      routeProgress: v.routeProgress,
    }));
  }, [filteredVehicles, dataMode]);

  const validPlotCount = useMemo(() => {
    return mapVehicles.filter((v) => isValidCoordinate(v.lat, v.lng)).length;
  }, [mapVehicles]);

  const handleManualRefresh = () => {
    if (dataMode === 'live') {
      fetchLiveTelemetry();
    } else {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const getTempBadgeColor = (tempStatus: string) => {
    if (tempStatus === 'critical') return 'bg-red-50 text-[#DC2626] border border-red-200';
    if (tempStatus === 'warning') return 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40';
    return 'bg-emerald-50 text-[#16803C] border border-emerald-200';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Alert') return 'bg-red-50 text-[#DC2626] border border-red-200';
    if (status === 'Idle') return 'bg-[#06383D]/10 text-[#06383D] border border-[#D0CEC9]';
    return 'bg-emerald-50 text-[#16803C] border border-emerald-200';
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-black text-[#292D2F] tracking-tight uppercase">
              Live Tracking
            </h1>

            {/* Mode Indicator Badges */}
            {dataMode === 'live' ? (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16803C] border border-emerald-200 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
                <span>LIVE BACKEND TELEMETRY</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-[#B45309] border border-amber-200 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>SIMULATED CORRIDOR SCENARIO</span>
              </span>
            )}

            {lastSyncedAt && (
              <span className="text-[10px] font-mono text-[#A5A5A4]">
                Synced {lastSyncedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            ColdChain 360 AI Telemetry Network — Real geodetic coordinates, temperature telemetry, and corridor status.
          </p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Data Source Mode Switcher */}
          <div className="flex items-center bg-white p-1 rounded-lg border border-[#D0CEC9] shadow-xs font-mono text-xs">
            <button
              onClick={() => { setDataMode('live'); fetchLiveTelemetry(); }}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                dataMode === 'live'
                  ? 'bg-[#06383D] text-white font-bold'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Live DB</span>
            </button>
            <button
              onClick={() => setDataMode('simulated')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                dataMode === 'simulated'
                  ? 'bg-[#06383D] text-white font-bold'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-[#F2AE32]" />
              <span>Simulation</span>
            </button>
          </div>

          {/* Auto-Poll Toggle */}
          {dataMode === 'live' && (
            <button
              onClick={() => setIsAutoPollEnabled((prev) => !prev)}
              title="Toggle 30-second periodic telemetry polling"
              className={`px-2.5 py-2 rounded-lg border font-mono text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                isAutoPollEnabled
                  ? 'bg-[#16803C]/10 border-[#16803C] text-[#16803C] font-bold'
                  : 'bg-white border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Poll 30s:</span>
              <span className="font-bold">{isAutoPollEnabled ? 'ON' : 'OFF'}</span>
            </button>
          )}

          <button
            onClick={handleManualRefresh}
            title="Refresh telemetry from backend"
            className="flex items-center gap-2 border border-[#D0CEC9] bg-white text-[#292D2F] hover:border-[#06383D]/40 font-mono text-xs font-bold rounded-lg px-3 py-2 shadow-sm transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#06383D] ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>SYNC NOW</span>
          </button>

          <button
            onClick={() => navigate('/shipments')}
            className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 text-xs font-mono transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>DISPATCH OVERVIEW</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
          </button>
        </div>
      </div>

      {/* Telemetry Status / Hardware Note Banner */}
      <div className="flex flex-wrap items-center justify-between p-3.5 rounded-xl bg-white border border-[#D0CEC9] shadow-sm text-xs font-mono gap-2">
        <div className="flex items-center gap-2.5 text-[#292D2F]">
          <Info className="w-4 h-4 text-[#F2AE32] shrink-0" />
          {dataMode === 'live' ? (
            <span>
              <strong className="text-[#06383D]">Live Telemetry Mode:</strong> Connected to FastAPI backend (<code className="text-[#06383D]">/api/v1/fleet/trucks</code>). Markers rendered strictly where verified GPS latitude &amp; longitude exist.
            </span>
          ) : (
            <span>
              <strong className="text-[#06383D]">Simulation Mode:</strong> Displaying simulated multi-modal freight scenario across India's cold corridors. All demo coordinates and excursions are synthetic.
            </span>
          )}
        </div>
        <span className="px-2.5 py-0.5 rounded bg-[#06383D]/10 text-[#06383D] font-bold text-[10px]">
          {dataMode === 'live' ? `DATABASE: ${validPlotCount} OF ${vehicles.length} GEOLOCATED` : 'SCENARIO SIMULATOR'}
        </span>
      </div>

      {/* Informative Guidance Box when Live DB has trucks without coordinates */}
      {dataMode === 'live' && vehicles.length > 0 && validPlotCount === 0 && !isLoading && (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <div className="font-bold flex items-center gap-2 text-sm text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Fleet Coordinates Pending GPS Telemetry Ingestion</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Found {vehicles.length} registered vehicles in the database, but their latitude and longitude fields are currently empty. Post breadcrumbs to <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">/api/v1/shipments/telematics/ping</code> to plot live assets.
            </p>
          </div>
          <button
            onClick={() => setDataMode('simulated')}
            className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-xs"
          >
            Switch to Simulation Mode
          </button>
        </div>
      )}

      {/* Main 2-Column Split: 1/3 Vehicle List + 2/3 Live Map Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: 1/3 Width (4 cols) — Active Vehicles List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                REGISTERED FLEET ({vehicles.length})
              </span>
              <span className="text-[10px] font-mono text-[#16803C] font-bold">
                {validPlotCount} ON MAP
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#A5A5A4] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plate, driver, city..."
                className="w-full bg-white border border-[#D0CEC9] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none focus:border-[#F2AE32] font-mono"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 font-mono text-[11px] overflow-x-auto pb-1">
              {(['All', 'In Transit', 'Idle', 'Alert'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === filter
                      ? 'bg-[#06383D] text-white font-bold shadow-xs'
                      : 'border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Vehicle Cards List */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredVehicles.map((vehicle) => {
              const isSelected = selectedVehicleId === vehicle.id;
              const hasCoords = isValidCoordinate(vehicle.lat, vehicle.lng);

              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  className={`rounded-xl border p-4 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-2 border-[#F2AE32] shadow-md ring-2 ring-[#F2AE32]/20'
                      : 'bg-white border-[#D0CEC9] hover:border-[#06383D]/40 hover:bg-[#F0EEEA]/50 shadow-sm'
                  }`}
                >
                  {/* Top Bar: Plate, ID & Status Badge */}
                  <div className="flex items-start justify-between gap-2 border-b border-[#D0CEC9] pb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#06383D]" />
                        <span className="font-mono text-sm font-black text-[#292D2F]">
                          {vehicle.plate}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#A5A5A4] font-medium flex items-center gap-1.5">
                        <span>{vehicle.id}</span>
                        <span>&bull;</span>
                        <span>{vehicle.model.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${getStatusBadge(vehicle.status)}`}>
                        ● {vehicle.status}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-mono">
                        {hasCoords ? (
                          <span className="text-[#16803C] font-semibold">GPS PLOTTED</span>
                        ) : (
                          <span className="text-[#A5A5A4]">GPS PENDING</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cargo & Driver */}
                  <div className="mt-2.5 space-y-1 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5A5A4] text-[11px]">Cargo:</span>
                      <span className="text-[#292D2F] font-bold text-xs truncate max-w-[190px]">{vehicle.cargo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A5A5A4] text-[11px]">Location:</span>
                      <span className="text-[#06383D] font-semibold text-[11px] truncate max-w-[190px]">
                        {vehicle.currentLocation}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry Metric Badges Grid */}
                  <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-[#D0CEC9] font-mono text-xs text-center">
                    
                    {/* Temperature */}
                    <div className={`p-1.5 rounded-lg border flex flex-col justify-center ${getTempBadgeColor(vehicle.tempStatus)}`}>
                      <span className="text-[9px] uppercase font-bold text-[#A5A5A4]">TEMP</span>
                      <span className="text-xs font-black">
                        {vehicle.currentTemp > 0 ? `+${vehicle.currentTemp}` : vehicle.currentTemp}°C
                      </span>
                    </div>

                    {/* Speed */}
                    <div className="p-1.5 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex flex-col justify-center">
                      <span className="text-[9px] uppercase font-bold text-[#A5A5A4]">SPEED</span>
                      <span className="text-xs font-black text-[#292D2F]">
                        {vehicle.speedKmH} <span className="text-[9px] font-normal">km/h</span>
                      </span>
                    </div>

                    {/* ETA */}
                    <div className="p-1.5 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex flex-col justify-center">
                      <span className="text-[9px] uppercase font-bold text-[#A5A5A4]">ETA</span>
                      <span className="text-[11px] font-bold text-[#F2AE32] truncate">
                        {vehicle.eta.split('(')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="mt-2 text-right">
                      <span className="text-[10px] font-mono font-bold text-[#F2AE32] tracking-wider uppercase">
                        SELECTED ASSET ➔
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredVehicles.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-[#D0CEC9] text-[#A5A5A4] font-mono text-xs space-y-2">
                <Truck className="w-8 h-8 text-[#A5A5A4] mx-auto opacity-50" />
                <p>No vehicles found matching current filter.</p>
                <button
                  onClick={() => { setStatusFilter('All'); setSearchQuery(''); }}
                  className="text-xs font-bold text-[#06383D] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: 2/3 Width (8 cols) — Live Map Canvas & Selected Telemetry */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main Map Box */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            
            {/* Map Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#06383D]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#292D2F]">
                  NATIONAL COLD-CORRIDOR RADAR
                </span>
                <span className="px-2 py-0.5 rounded bg-[#F2AE32]/15 text-[#F2AE32] text-[10px] font-mono font-bold">
                  {dataMode === 'live' ? 'FASTAPI VECTOR FEED' : 'DEMO SCENARIO'}
                </span>
              </div>

              {/* Layer Controls */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  onClick={() => setActiveLayer('corridors')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'corridors'
                      ? 'bg-[#06383D] text-white font-bold'
                      : 'border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F]'
                  }`}
                >
                  Corridors
                </button>
                <button
                  onClick={() => setActiveLayer('geofences')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'geofences'
                      ? 'bg-[#06383D] text-white font-bold'
                      : 'border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F]'
                  }`}
                >
                  Geofence Zones
                </button>
                <button
                  onClick={() => setActiveLayer('thermal')}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeLayer === 'thermal'
                      ? 'bg-[#F2AE32] text-[#292D2F] font-bold'
                      : 'border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F]'
                  }`}
                >
                  Thermal Heatmap
                </button>
              </div>
            </div>

            {/* Real Interactive Leaflet Map Canvas */}
            <div className="space-y-4">
              {/* Live Moving GPS Telematics Control Toolbar */}
              <div className="bg-[#06383D] text-[#F0EEEA] p-3 rounded-xl border border-[#06383D] flex flex-wrap items-center justify-between gap-3 shadow-md font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isMovingActive ? 'bg-emerald-400 opacity-75' : 'bg-amber-400 opacity-50'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${isMovingActive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  </span>
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                      <span className={isMovingActive ? 'text-emerald-400' : 'text-amber-400'}>
                        {isMovingActive ? 'LIVE GPS TELEMATICS ENGINE ACTIVE' : 'TELEMATICS ENGINE PAUSED'}
                      </span>
                      <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-300">
                        9 SATS LOCKED
                      </span>
                    </div>
                    <div className="text-[11px] text-[#F0EEEA]/80 flex flex-wrap items-center gap-x-2">
                      <span>Target: <strong className="text-white">{selectedVehicle.plate}</strong></span>
                      <span>&bull;</span>
                      <span>Lat: <strong className="text-[#F2AE32]">{selectedVehicle.lat.toFixed(5)}°N</strong></span>
                      <span>&bull;</span>
                      <span>Lng: <strong className="text-[#F2AE32]">{selectedVehicle.lng.toFixed(5)}°E</strong></span>
                      <span>&bull;</span>
                      <span>Speed: <strong className="text-white">{selectedVehicle.speedKmH} km/h</strong></span>
                      <span>&bull;</span>
                      <span>Heading: <strong className="text-white">{selectedVehicle.heading ?? 0}°</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Pause / Play */}
                  <button
                    onClick={() => setIsMovingActive(!isMovingActive)}
                    className="px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold transition flex items-center gap-1.5 border border-white/20 cursor-pointer"
                    title={isMovingActive ? 'Pause real-time GPS progression' : 'Resume real-time GPS progression'}
                  >
                    {isMovingActive ? '⏸ PAUSE' : '▶ RESUME'}
                  </button>

                  {/* Speed Multiplier */}
                  <div className="flex items-center bg-black/30 rounded p-0.5 border border-white/10 text-[10px] font-bold">
                    {([1, 2, 5] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setSimulationSpeed(spd)}
                        className={`px-2 py-0.5 rounded transition cursor-pointer ${
                          simulationSpeed === spd ? 'bg-[#F2AE32] text-[#06383D]' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Camera Lock / Follow Vehicle */}
                  <button
                    onClick={() => setFollowVehicle(!followVehicle)}
                    className={`px-2.5 py-1.5 rounded text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                      followVehicle
                        ? 'bg-[#F2AE32] text-[#06383D] border-[#F2AE32]'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                    title="Keep map camera centered on the moving vehicle"
                  >
                    🎯 CAMERA LOCK: {followVehicle ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              <RealLeafletMap
                vehicles={mapVehicles}
                selectedVehicleId={selectedVehicleId}
                onSelectVehicle={(id) => setSelectedVehicleId(id)}
                activeLayer={activeLayer}
                geofences={REAL_GEOFENCES}
                thermalZones={REAL_THERMAL_ZONES}
                cities={MAP_CITIES}
                initialCenter={[19.5, 74.5]}
                initialZoom={6}
                heightClass="h-[460px] sm:h-[500px]"
                followSelectedVehicle={followVehicle}
                isLoading={isLoading && isRefreshing}
                apiError={dataMode === 'live' ? apiError : null}
                onRetry={fetchLiveTelemetry}
                dataSourceLabel={
                  dataMode === 'live'
                    ? (validPlotCount > 0 ? `${validPlotCount} LIVE GPS FIXES` : 'COORDINATES PENDING')
                    : 'SIMULATED DATA'
                }
                emptyStateMessage={
                  dataMode === 'live'
                    ? 'No vehicles with valid coordinates in database.'
                    : 'No simulated vehicles matched the current filter.'
                }
              />

              {/* Bottom Floating Telemetry Dossier */}
              <div className="bg-white/95 backdrop-blur-md border border-[#D0CEC9] p-4 rounded-xl shadow-xs space-y-3 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D0CEC9] pb-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-[#292D2F]">{selectedVehicle.plate}</span>
                    <span className="text-[#A5A5A4]">({selectedVehicle.cargo})</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      selectedVehicle.dataSource === 'real'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {selectedVehicle.dataSource === 'real' ? 'REAL GPS TELEMETRY' : 'SIMULATED DATA'}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getTempBadgeColor(selectedVehicle.tempStatus)}`}>
                    ● REEFER TEMP: {selectedVehicle.currentTemp > 0 ? `+${selectedVehicle.currentTemp}` : selectedVehicle.currentTemp}°C ({selectedVehicle.targetTemp})
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <div className="text-[10px] text-[#A5A5A4] uppercase">ROUTE CORRIDOR</div>
                    <div className="font-bold text-[#292D2F] mt-0.5 truncate">
                      {selectedVehicle.origin.split(' ')[0]} ➔ {selectedVehicle.destination.split(' ')[0]}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#A5A5A4] uppercase">CURRENT SPEED</div>
                    <div className="font-bold text-[#292D2F] mt-0.5">
                      {selectedVehicle.speedKmH} km/h
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#A5A5A4] uppercase">COOLING UNIT</div>
                    <div className="font-bold text-[#06383D] mt-0.5 truncate">
                      {selectedVehicle.reeferStatus}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#A5A5A4] uppercase">PROJECTED ETA</div>
                    <div className="font-bold text-[#F2AE32] mt-0.5 truncate">
                      {selectedVehicle.eta}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instruction Footer below map */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A5A5A4] pt-1">
              <span>Click on any vehicle or radar marker pin to open live temperature dossier.</span>
              <span className="text-[#06383D] font-bold">
                {dataMode === 'live' ? 'FASTAPI REST BACKEND READY' : 'SIMULATOR SCENARIO ACTIVE'}
              </span>
            </div>
          </div>

          {/* Dossier Card: Detailed Selected Vehicle Telemetry */}
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  ACTIVE ASSET DOSSIER
                </span>
                <h3 className="text-base font-bold text-[#292D2F] mt-0.5">
                  {selectedVehicle.model} — {selectedVehicle.plate}
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2 py-1 rounded bg-[#06383D]/10 text-[#06383D] font-bold">
                  VEHICLE ID: {selectedVehicle.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">REEFER HARDWARE</div>
                <div className="font-bold text-[#292D2F]">{selectedVehicle.reeferUnit}</div>
                <div className="text-[11px] text-[#16803C]">Compressor Head: 100% OK</div>
              </div>

              <div className="p-3 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">PILOT IN CABIN</div>
                <div className="font-bold text-[#292D2F]">{selectedVehicle.driverName}</div>
                <div className="text-[11px] text-[#06383D]">{selectedVehicle.driverPhone}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
                <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">AUXILIARY BATTERY & FUEL</div>
                <div className="font-bold text-[#292D2F]">{selectedVehicle.batteryPct}% Battery · {selectedVehicle.fuelPct}% Diesel</div>
                <div className="text-[11px] text-[#F2AE32]">~18.5 hrs reserve runtime</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* LOWER SECTION 1: Geofencing Zones Section */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              VIRTUAL PERIMETER ENFORCEMENT
            </div>
            <h2 className="text-lg font-black text-[#292D2F] font-sans">
              Geofence Monitoring Zones
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#06383D] bg-[#06383D]/10 px-3 py-1 rounded-md">
            3 ACTIVE GEOFENCE MONITORS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                <th className="py-2.5 px-3">Zone ID & Name</th>
                <th className="py-2.5 px-3">Zone Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Anchor Location & Radius</th>
                <th className="py-2.5 px-3">Vehicles Currently Inside</th>
                <th className="py-2.5 px-3">Enforcement Trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0CEC9]">
              {GEOFENCE_ZONES.map((zone) => (
                <tr key={zone.id} className="hover:bg-[#F0EEEA] transition-colors">
                  <td className="py-3 px-3 font-bold text-[#292D2F]">
                    <div>{zone.name}</div>
                    <div className="text-[10px] text-[#A5A5A4]">{zone.id}</div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      zone.category === 'Restricted Area'
                        ? 'bg-red-50 text-[#DC2626] border border-red-200'
                        : zone.category === 'Delivery Zone'
                        ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                        : 'bg-[#06383D]/10 text-[#06383D] border border-[#D0CEC9]'
                    }`}>
                      {zone.category}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      zone.status === 'Breached'
                        ? 'bg-red-50 text-[#DC2626] border border-red-200 animate-pulse'
                        : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                    }`}>
                      ● {zone.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#A5A5A4]">
                    <div className="text-[#292D2F] font-medium">{zone.location}</div>
                    <div className="text-[10px]">Radius: {zone.radiusKm} km perimeter</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {zone.vehiclesInside.map((vId) => (
                        <span key={vId} className="px-2 py-0.5 rounded bg-white border border-[#D0CEC9] text-[#06383D] font-bold text-[10px]">
                          {vId}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#A5A5A4] text-[11px]">
                    {zone.alertTrigger}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOWER SECTION 2: Temperature Summary Compliance Table */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              COLD-CHAIN INTEGRITY COMPLIANCE
            </div>
            <h2 className="text-lg font-black text-[#292D2F] font-sans">
              Fleet Temperature Audit & Deviation Summary
            </h2>
          </div>
          <span className="text-xs font-mono text-[#16803C] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
            <span>THERMAL SLA MONITORING ACTIVE</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                <th className="py-2.5 px-3">Vehicle Plate & ID</th>
                <th className="py-2.5 px-3">Commodity / Payload</th>
                <th className="py-2.5 px-3">Required Temp Range</th>
                <th className="py-2.5 px-3">Live Sensor Temp</th>
                <th className="py-2.5 px-3">Variance</th>
                <th className="py-2.5 px-3">Reefer Unit Status</th>
                <th className="py-2.5 px-3">Compliance Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0CEC9]">
              {vehicles.map((v) => {
                const isOutOfRange = v.currentTemp < v.requiredMinTemp || v.currentTemp > v.requiredMaxTemp;
                const variance = isOutOfRange
                  ? (v.currentTemp > v.requiredMaxTemp ? +(v.currentTemp - v.requiredMaxTemp).toFixed(1) : -(v.requiredMinTemp - v.currentTemp).toFixed(1))
                  : 0;

                return (
                  <tr key={v.id} className="hover:bg-[#F0EEEA] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#292D2F]">
                      <div className="font-sans font-bold">{v.plate}</div>
                      <div className="text-[10px] text-[#A5A5A4]">{v.id}</div>
                    </td>
                    <td className="py-3 px-3 font-sans text-xs text-[#292D2F]">
                      {v.cargo}
                    </td>
                    <td className="py-3 px-3 text-[#06383D] font-bold">
                      {v.targetTemp}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        v.tempStatus === 'critical'
                          ? 'bg-red-50 text-[#DC2626] border border-red-200'
                          : v.tempStatus === 'warning'
                          ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                          : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                      }`}>
                        {v.currentTemp > 0 ? `+${v.currentTemp}` : v.currentTemp}°C
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {variance === 0 ? (
                        <span className="text-[#16803C] font-semibold">0.0°C (Nominal)</span>
                      ) : (
                        <span className={`font-bold ${variance > 0 ? 'text-[#DC2626]' : 'text-[#F2AE32]'}`}>
                          {variance > 0 ? `+${variance}` : variance}°C excursion
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-[#A5A5A4]">
                      <div className="text-[#292D2F] font-medium">{v.reeferStatus}</div>
                      <div className="text-[10px]">{v.reeferUnit}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        v.tempStatus === 'critical'
                          ? 'bg-red-50 text-[#DC2626] border border-red-200'
                          : v.tempStatus === 'warning'
                          ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                          : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                      }`}>
                        {v.tempStatus === 'critical' ? 'THERMAL BREACH' : v.tempStatus === 'warning' ? 'BORDERLINE' : 'COMPLIANT'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedVehicleId(v.id)}
                        className="px-2.5 py-1 rounded text-[11px] font-mono font-bold border border-[#D0CEC9] text-[#06383D] hover:bg-[#F2AE32] hover:text-[#292D2F] hover:border-[#F2AE32] transition-colors cursor-pointer"
                      >
                        LOCATE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
