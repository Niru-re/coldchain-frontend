import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Truck,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Bell,
  Calendar,
  Gauge,
  Thermometer,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Snowflake,
  Timer,
  LifeBuoy,
  Calculator,
  RotateCcw,
  Landmark,
  Leaf,
  Recycle,
  UserCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend
} from 'recharts';
import api, { DashboardKPIs } from '../services/api';

// ─── DEMO DATA: 12-Hour Temperature History ──────────────────────────────────
const TEMP_HISTORY_DATA = [
  { time: '08:00', vehicle1: 3.8, vehicle2: 4.1, minLimit: 2.0, maxLimit: 8.0 },
  { time: '09:00', vehicle1: 3.6, vehicle2: 4.4, minLimit: 2.0, maxLimit: 8.0 },
  { time: '10:00', vehicle1: 4.0, vehicle2: 5.2, minLimit: 2.0, maxLimit: 8.0 },
  { time: '11:00', vehicle1: 3.9, vehicle2: 6.8, minLimit: 2.0, maxLimit: 8.0 },
  { time: '12:00', vehicle1: 4.2, vehicle2: 8.4, minLimit: 2.0, maxLimit: 8.0 },
  { time: '13:00', vehicle1: 4.1, vehicle2: 9.8, minLimit: 2.0, maxLimit: 8.0 }, // Excursion peak
  { time: '14:00', vehicle1: 3.7, vehicle2: 9.2, minLimit: 2.0, maxLimit: 8.0 }, // Excursion
  { time: '15:00', vehicle1: 3.9, vehicle2: 7.6, minLimit: 2.0, maxLimit: 8.0 }, // AI recovery
  { time: '16:00', vehicle1: 4.3, vehicle2: 5.9, minLimit: 2.0, maxLimit: 8.0 },
  { time: '17:00', vehicle1: 4.0, vehicle2: 4.8, minLimit: 2.0, maxLimit: 8.0 },
  { time: '18:00', vehicle1: 3.8, vehicle2: 4.3, minLimit: 2.0, maxLimit: 8.0 },
  { time: '19:00', vehicle1: 3.9, vehicle2: 4.0, minLimit: 2.0, maxLimit: 8.0 },
];

// ─── DEMO DATA: Sample Shipments ─────────────────────────────────────────────
interface DashboardShipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'At Risk' | 'Delivered' | 'Delayed';
  temp: string;
  tempStatus: 'normal' | 'warning' | 'critical';
  eta: string;
  product: string;
  reeferId: string;
}

const DASHBOARD_SHIPMENTS: DashboardShipment[] = [
  {
    id: 'SHP-8092',
    customer: 'Tata Consumer Logistics',
    origin: 'Shimla Cold-Hub',
    destination: 'Mumbai Port CFS',
    status: 'At Risk',
    temp: '+9.2°C',
    tempStatus: 'critical',
    eta: 'Today · 21:30',
    product: 'Apples - 2T',
    reeferId: 'CC-102'
  },
  {
    id: 'SHP-8104',
    customer: 'Serum Institute Biopharma',
    origin: 'Pune Biotech Park',
    destination: 'Delhi NCR Hub',
    status: 'In Transit',
    temp: '+3.8°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 06:00',
    product: 'Vaccines - 50kg',
    reeferId: 'CC-107'
  },
  {
    id: 'SHP-8119',
    customer: 'Amul Dairy Federation',
    origin: 'Anand Processing Unit',
    destination: 'Hyderabad Terminal',
    status: 'In Transit',
    temp: '-21.4°C',
    tempStatus: 'normal',
    eta: 'Today · 23:45',
    product: 'Ice Cream - 1.5T',
    reeferId: 'CC-118'
  },
  {
    id: 'SHP-8125',
    customer: 'Mahyco Fresh Agri',
    origin: 'Mahabaleshwar Farms',
    destination: 'Bengaluru Central',
    status: 'In Transit',
    temp: '+2.9°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 09:15',
    product: 'Strawberries - 800kg',
    reeferId: 'CC-124'
  },
  {
    id: 'SHP-8138',
    customer: 'Biocon Biologics',
    origin: 'Bengaluru Bio-Park',
    destination: 'Mumbai Nhava Sheva',
    status: 'Delayed',
    temp: '-28.0°C',
    tempStatus: 'normal',
    eta: 'Today · 22:40 (Delayed +45m)',
    product: 'Blood Plasma - 120L',
    reeferId: 'CC-131'
  },
  {
    id: 'SHP-8147',
    customer: 'Godrej Agrovet',
    origin: 'Nashik Agro Terminal',
    destination: 'Goa Cold Depot',
    status: 'Delivered',
    temp: '+1.8°C',
    tempStatus: 'normal',
    eta: 'Delivered (14:30)',
    product: 'Fresh Poultry - 3.2T',
    reeferId: 'CC-142'
  }
];

// ─── DEMO DATA: 8 AI Intelligence Modules ────────────────────────────────────
interface AIModuleShortcut {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  metric: string;
  icon: React.ElementType;
  badge: string;
}

const AI_MODULES: AIModuleShortcut[] = [
  {
    id: 'mod-1',
    slug: 'survival-clock',
    name: 'AI Cargo Survival Clock',
    tagline: 'Estimates remaining safe time for sensitive cargo',
    metric: '98.4% Accuracy',
    icon: Timer,
    badge: 'ACTIVE'
  },
  {
    id: 'mod-2',
    slug: 'rescue-engine',
    name: 'AI Cargo Rescue Engine',
    tagline: 'Autonomous re-routing & emergency cold bay diversion',
    metric: '1 Pending Rescue',
    icon: LifeBuoy,
    badge: 'ACTION REQ'
  },
  {
    id: 'mod-3',
    slug: 'loss-calculator',
    name: 'AI Loss Calculator',
    tagline: 'Consignment spoilage loss audit vs intervention cost',
    metric: '₹4.2L Claim Mitigated',
    icon: Calculator,
    badge: 'FINANCIAL'
  },
  {
    id: 'mod-4',
    slug: 'reverse-logistics',
    name: 'AI Reverse Logistics Optimizer',
    tagline: 'Triage returned/rejected loads for recovery or reuse',
    metric: '34% Deadhead Saved',
    icon: RotateCcw,
    badge: 'CAPACITY'
  },
  {
    id: 'mod-5',
    slug: 'govt-benefits',
    name: 'AI Government Benefit Optimizer',
    tagline: 'Discover applicable PMKSY & cold chain capital subsidies',
    metric: '₹18.5L Unlocked',
    icon: Landmark,
    badge: 'POLICY'
  },
  {
    id: 'mod-6',
    slug: 'green-fleet',
    name: 'Green Fleet Optimizer',
    tagline: 'Recommends electric & fuel-efficient reefer vehicles',
    metric: '12.4T CO2 Reduced',
    icon: Leaf,
    badge: 'ECO'
  },
  {
    id: 'mod-7',
    slug: 'waste-fertilizer',
    name: 'AI Organic Waste-to-Fertilizer System',
    tagline: 'Connects spoiled perishables with bio-composting plants',
    metric: '94% Waste Diverted',
    icon: Recycle,
    badge: 'CIRCULAR'
  },
  {
    id: 'mod-8',
    slug: 'driver-relay',
    name: 'AI Driver Rotation & Relay Fleet System',
    tagline: '500-km handover planning with continuous reefer telemetry',
    metric: '99.2% Safety Score',
    icon: UserCheck,
    badge: 'SAFETY'
  }
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Live formatted current time
  const [currentTime, setCurrentTime] = useState<string>('');
  const [shipmentFilter, setShipmentFilter] = useState<'All' | 'In Transit' | 'At Risk' | 'Delivered' | 'Delayed'>('All');
  const [activeVehicle1, setActiveVehicle1] = useState(true);
  const [activeVehicle2, setActiveVehicle2] = useState(true);
  const [kpiData, setKpiData] = useState<DashboardKPIs | null>(null);
  const [liveShipments, setLiveShipments] = useState<DashboardShipment[]>(DASHBOARD_SHIPMENTS);
  const [dbStatus, setDbStatus] = useState<'Checking' | 'Connected' | 'Disconnected'>('Checking');

  useEffect(() => {
    let isMounted = true;
    api.checkDatabaseHealth().then((res) => {
      if (isMounted) {
        setDbStatus(res.status === 'healthy' && res.database === 'connected' ? 'Connected' : 'Disconnected');
      }
    }).catch(() => {
      if (isMounted) setDbStatus('Disconnected');
    });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    api.getDashboardKPIs()
      .then((data) => setKpiData(data))
      .catch((err) => console.log('Baseline dashboard metrics active:', err));

    api.getShipments({ limit: 10 })
      .then((res) => {
        if (res.items && res.items.length > 0) {
          const mapped: DashboardShipment[] = res.items.map((item) => ({
            id: item.id,
            customer: item.farmerProducer || 'ColdChain Enterprise Client',
            origin: item.origin,
            destination: item.destination,
            status: (item.status === 'Critical Alert' ? 'At Risk' : item.status === 'Delivered' ? 'Delivered' : 'In Transit'),
            temp: `${item.temperature > 0 ? '+' : ''}${item.temperature.toFixed(1)}°C`,
            tempStatus: (item.status === 'Critical Alert' ? 'critical' : item.temperature > item.maxTemp ? 'warning' : 'normal'),
            eta: item.eta,
            product: item.commodity,
            reeferId: item.truckId || 'CC-102',
          }));
          setLiveShipments(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredShipments = liveShipments.filter((s) => {
    if (shipmentFilter === 'All') return true;
    return s.status === shipmentFilter;
  });

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">
      
      {/* ─── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              COLDCHAIN 360 AI · COLD-CHAIN TELEMETRY RADAR
            </span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              dbStatus === 'Connected'
                ? 'bg-[#16803C]/10 text-[#16803C]'
                : dbStatus === 'Disconnected'
                ? 'bg-[#DC2626]/10 text-[#DC2626]'
                : 'bg-[#F2AE32]/10 text-[#B45309]'
            }`}>
              {dbStatus === 'Connected' ? 'DATABASE CONNECTED' : dbStatus === 'Disconnected' ? 'DATABASE DISCONNECTED' : 'CHECKING DATABASE'}
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#292D2F] tracking-tight">
            Operations Dashboard
          </h1>
          <p className="text-xs font-mono text-[#A5A5A4] mt-1 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              dbStatus === 'Connected' ? 'bg-[#16803C] animate-pulse' : dbStatus === 'Disconnected' ? 'bg-[#DC2626]' : 'bg-[#F2AE32] animate-pulse'
            }`} />
            <span>Telemetry Synchronized:</span>
            <span className="font-bold text-[#292D2F]">{currentTime || 'Synchronizing telemetry...'}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/shipments"
            className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            <Package className="w-4 h-4 text-[#F2AE32]" />
            <span>View All Shipments</span>
          </Link>
          <Link
            to="/alerts"
            className="border border-[#D0CEC9] text-[#292D2F] hover:border-[#06383D]/40 font-bold rounded-lg px-4 py-2 text-xs font-mono uppercase tracking-wider flex items-center gap-2 bg-white transition-colors"
          >
            <Bell className="w-4 h-4 text-[#DC2626]" />
            <span>Alerts Center (8)</span>
          </Link>
        </div>
      </div>

      {/* ─── KPI ROW 1 (4 CARDS) ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Active Shipments */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm relative overflow-hidden group hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Active Shipments
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#06383D]/10 flex items-center justify-center text-[#06383D]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#292D2F]">{kpiData ? kpiData.active_shipments : 24}</span>
            <span className="text-[10px] font-mono text-[#16803C] font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +3 today
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>19 refrigerated, 5 deep-freeze</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">{dbStatus === 'Connected' && kpiData ? 'SUPABASE' : 'DEMO DATA'}</span>
          </div>
        </div>

        {/* 2. Vehicles in Transit */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm relative overflow-hidden group hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Vehicles in Transit
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#06383D]/10 flex items-center justify-center text-[#06383D]">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#292D2F]">{kpiData ? kpiData.fleet_active_count : 18}</span>
            <span className="text-[10px] font-mono text-[#06383D] font-semibold">
              75% Reefer Power
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>14 on schedule, 4 delayed</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">{dbStatus === 'Connected' && kpiData ? 'SUPABASE' : 'DEMO DATA'}</span>
          </div>
        </div>

        {/* 3. At Temp Risk (Amber / Red) */}
        <div className="bg-white rounded-xl border-2 border-[#F2AE32] p-5 shadow-sm relative overflow-hidden bg-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F2AE32]">
              At Temp Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F2AE32]/20 flex items-center justify-center text-[#F2AE32]">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#DC2626]">{kpiData ? kpiData.critical_alerts : 3}</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#DC2626] border border-red-200">
              URGENT EXCURSION
            </span>
          </div>
          <div className="mt-2 text-xs text-[#292D2F] font-medium flex items-center justify-between">
            <span>2 threshold warnings, 1 excursion</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">{dbStatus === 'Connected' && kpiData ? 'SUPABASE' : 'DEMO DATA'}</span>
          </div>
        </div>

        {/* 4. Delayed Deliveries (Red) */}
        <div className="bg-white rounded-xl border border-red-200 p-5 shadow-sm relative overflow-hidden bg-red-50/10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626]">
              Delayed Deliveries
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-[#DC2626]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#DC2626]">5</span>
            <span className="text-[10px] font-mono text-[#DC2626] font-semibold">
              Avg +38m delay
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>Traffic chokepoints on NH-48</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>
        </div>

      </div>

      {/* ─── KPI ROW 2 (4 CARDS) ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 5. Temp Compliance */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Temp Compliance
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#16803C]/10 flex items-center justify-center text-[#16803C]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#16803C]">96.8%</span>
            <span className="text-[10px] font-mono text-[#16803C] font-bold">
              Target: &ge;95%
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>+1.4% vs last week SLA</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>
        </div>

        {/* 6. Pending Alerts */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Pending Alerts
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#06383D]/10 flex items-center justify-center text-[#06383D]">
              <Bell className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#292D2F]">8</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#F2AE32]/15 text-[#F2AE32]">
              3 CRITICAL
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>3 temp, 5 route bottlenecks</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>
        </div>

        {/* 7. Upcoming Deliveries */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Upcoming Deliveries
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#F2AE32]/20 flex items-center justify-center text-[#F2AE32]">
              <Calendar className="w-4 h-4 text-[#292D2F]" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#292D2F]">12 today</span>
            <span className="text-[10px] font-mono text-[#16803C] font-semibold">
              4 completed
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>Next arrival: JNPT CFS (42m)</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>
        </div>

        {/* 8. Fleet Available */}
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm hover:border-[#06383D]/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Fleet Available
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#06383D]/10 flex items-center justify-center text-[#06383D]">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#292D2F]">14/32</span>
            <span className="text-[10px] font-mono text-[#06383D] font-bold">
              43.7% Standby
            </span>
          </div>
          <div className="mt-2 text-xs text-[#A5A5A4] flex items-center justify-between">
            <span>10 Reefer 32FT, 4 Cryo 20FT</span>
            <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>
        </div>

      </div>

      {/* ─── TEMPERATURE HISTORY CHART & STATUS OVERVIEW ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TEMPERATURE HISTORY CHART (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                    TELEMETRY MONITOR
                  </span>
                  <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    DEMO DATA
                  </span>
                </div>
                <h2 className="text-base font-black text-[#292D2F] mt-0.5 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#F2AE32]" />
                  Temperature History (Last 12 Hours)
                </h2>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVehicle1(!activeVehicle1)}
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md transition-colors border ${
                    activeVehicle1
                      ? 'bg-[#06383D] text-white border-[#06383D]'
                      : 'bg-[#F0EEEA] text-[#A5A5A4] border-[#D0CEC9]'
                  }`}
                >
                  CC-107 (Normal)
                </button>
                <button
                  onClick={() => setActiveVehicle2(!activeVehicle2)}
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md transition-colors border ${
                    activeVehicle2
                      ? 'bg-[#DC2626] text-white border-[#DC2626]'
                      : 'bg-[#F0EEEA] text-[#A5A5A4] border-[#D0CEC9]'
                  }`}
                >
                  CC-102 (Excursion)
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TEMP_HISTORY_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E3DE" />
                  <XAxis
                    dataKey="time"
                    stroke="#A5A5A4"
                    tick={{ fill: '#A5A5A4', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <YAxis
                    stroke="#A5A5A4"
                    tick={{ fill: '#A5A5A4', fontSize: 10, fontFamily: 'monospace' }}
                    domain={[0, 12]}
                    unit="°C"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#D0CEC9',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                    }}
                    formatter={(value: any, name: any) => {
                      if (name === 'vehicle1') return [`${value}°C`, 'CC-107 (Vaccine Reefer - Normal)'];
                      if (name === 'vehicle2') return [`${value}°C`, 'CC-102 (Produce Reefer - Excursion)'];
                      return [value, name];
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={30}
                    wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }}
                  />
                  {/* Threshold Reference Lines */}
                  <ReferenceLine
                    y={8.0}
                    label={{ value: 'Max Limit (+8°C)', fill: '#DC2626', fontSize: 10, position: 'insideTopRight' }}
                    stroke="#DC2626"
                    strokeDasharray="4 4"
                  />
                  <ReferenceLine
                    y={2.0}
                    label={{ value: 'Min Limit (+2°C)', fill: '#F2AE32', fontSize: 10, position: 'insideBottomRight' }}
                    stroke="#F2AE32"
                    strokeDasharray="4 4"
                  />
                  {activeVehicle1 && (
                    <Line
                      type="monotone"
                      dataKey="vehicle1"
                      name="CC-107 (Normal)"
                      stroke="#06383D"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#06383D' }}
                      activeDot={{ r: 5 }}
                    />
                  )}
                  {activeVehicle2 && (
                    <Line
                      type="monotone"
                      dataKey="vehicle2"
                      name="CC-102 (Excursion)"
                      stroke="#DC2626"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#DC2626' }}
                      activeDot={{ r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart footer notes */}
          <div className="mt-3 pt-3 border-t border-[#D0CEC9] flex flex-wrap items-center justify-between text-xs font-mono text-[#A5A5A4]">
            <span className="flex items-center gap-1.5 text-[#DC2626] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              Excursion peak (+9.8°C at 13:00) resolved via AI Rescue Throttle
            </span>
            <span>SETPOINT: 2.0°C - 8.0°C · DEMO DATA</span>
          </div>
        </div>

        {/* SHIPMENT STATUS OVERVIEW TABLE (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3 mb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  ACTIVE MANIFEST
                </span>
                <h2 className="text-base font-black text-[#292D2F] mt-0.5">
                  Shipment Status Overview
                </h2>
              </div>
              <Link
                to="/shipments"
                className="text-xs font-mono font-bold text-[#F2AE32] hover:text-[#06383D] flex items-center gap-1"
              >
                <span>VIEW ALL (24)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
              {(['All', 'In Transit', 'At Risk', 'Delivered', 'Delayed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setShipmentFilter(tab)}
                  className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    shipmentFilter === tab
                      ? 'bg-[#06383D] text-white'
                      : 'bg-[#F0EEEA] text-[#A5A5A4] hover:text-[#292D2F]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px]">
                    <th className="pb-2">Shipment</th>
                    <th className="pb-2">Route</th>
                    <th className="pb-2 text-center">Temp</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D0CEC9]/60">
                  {filteredShipments.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => navigate(`/shipments/${s.id}`)}
                      className="hover:bg-[#F0EEEA] cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pr-2">
                        <div className="font-bold text-[#292D2F] group-hover:text-[#F2AE32] transition-colors">
                          {s.id}
                        </div>
                        <div className="text-[10px] text-[#A5A5A4] font-sans truncate max-w-[120px]">
                          {s.product}
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <div className="text-[#292D2F] font-sans text-xs">
                          {s.origin.split(' ')[0]} &rarr; {s.destination.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-[#A5A5A4]">
                          {s.eta}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                            s.tempStatus === 'critical'
                              ? 'bg-red-50 text-[#DC2626] border border-red-200'
                              : 'bg-[#06383D]/10 text-[#06383D]'
                          }`}
                        >
                          {s.temp}
                        </span>
                      </td>
                      <td className="py-2.5 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            s.status === 'Delivered'
                              ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                              : s.status === 'At Risk'
                              ? 'bg-[#F2AE32]/15 text-[#F2AE32] border border-[#F2AE32]/30'
                              : s.status === 'Delayed'
                              ? 'bg-red-50 text-[#DC2626] border border-red-200'
                              : 'bg-[#06383D]/10 text-[#06383D] border border-[#06383D]/20'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredShipments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-xs text-[#A5A5A4]">
                        No shipments found matching filter '{shipmentFilter}'.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-[#D0CEC9] flex items-center justify-between text-[11px] font-mono text-[#A5A5A4]">
            <span>Click any shipment to inspect telemetry</span>
            <span className="text-[10px]">DEMO DATA</span>
          </div>
        </div>

      </div>

      {/* ─── AI INTELLIGENCE SHORTCUTS (4x2 GRID) ────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                PREDICTIVE & AUTONOMOUS ENGINES
              </span>
              <span className="bg-[#F2AE32]/15 text-[#F2AE32] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                8 MODULES
              </span>
            </div>
            <h2 className="text-xl font-black text-[#292D2F] mt-0.5">
              AI Intelligence Shortcuts
            </h2>
          </div>
          <Link
            to="/ai-intelligence"
            className="text-xs font-mono font-bold text-[#06383D] hover:text-[#F2AE32] flex items-center gap-1"
          >
            <span>OPEN AI PLATFORM DIRECTORY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_MODULES.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.id}
                to={`/ai-intelligence?module=${module.slug}`}
                className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm hover:border-[#F2AE32] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#06383D]/10 text-[#06383D] flex items-center justify-center group-hover:bg-[#F2AE32]/20 group-hover:text-[#292D2F] transition-colors">
                      <Icon className="w-5 h-5 text-[#06383D]" />
                    </div>
                    <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded group-hover:bg-[#F2AE32]/15 group-hover:text-[#F2AE32] transition-colors">
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#292D2F] group-hover:text-[#06383D] transition-colors">
                    {module.name}
                  </h3>
                  <p className="text-xs text-[#A5A5A4] mt-1 line-clamp-2">
                    {module.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D0CEC9] flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#06383D]">
                    {module.metric}
                  </span>
                  <div className="flex items-center gap-1 text-[#F2AE32] font-bold group-hover:translate-x-1 transition-transform">
                    <span>Launch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ─── FOOTER BADGE ─────────────────────────────────────────────────────── */}
      <div className="text-center py-2 text-xs font-mono text-[#A5A5A4]">
        ColdChain 360 AI v2.4 · Industrial Cold-Chain Fleet Telemetry · DEMO DATA SIMULATION
      </div>

    </div>
  );
};
