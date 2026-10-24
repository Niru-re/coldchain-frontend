import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  Clock,
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  User,
  Phone,
  Gauge,
  Wind,
  Droplets,
  Layers,
  Download,
  Key,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Legend
} from 'recharts';

// ─── DEMO DATA: 24-HOUR TEMPERATURE & AMBIENT TELEMETRY ──────────────────────
const TEMP_24H_DATA = [
  { hour: '00:00', temp: 3.4, ambient: 24.1, humidity: 88, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '02:00', temp: 3.2, ambient: 23.5, humidity: 89, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '04:00', temp: 3.5, ambient: 22.8, humidity: 90, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '06:00', temp: 3.8, ambient: 25.2, humidity: 87, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '08:00', temp: 4.1, ambient: 28.6, humidity: 85, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '10:00', temp: 4.9, ambient: 32.4, humidity: 82, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '11:00', temp: 6.4, ambient: 34.8, humidity: 80, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '12:00', temp: 8.1, ambient: 36.2, humidity: 78, minLimit: 2.0, maxLimit: 8.0 }, // Excursion start
  { hour: '13:00', temp: 9.8, ambient: 37.5, humidity: 76, minLimit: 2.0, maxLimit: 8.0 }, // Excursion peak
  { hour: '14:00', temp: 9.4, ambient: 38.0, humidity: 75, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '15:00', temp: 9.2, ambient: 36.8, humidity: 77, minLimit: 2.0, maxLimit: 8.0 }, // Current temp
  { hour: '16:00', temp: 7.8, ambient: 35.0, humidity: 79, minLimit: 2.0, maxLimit: 8.0 }, // Projected recovery
  { hour: '17:00', temp: 6.1, ambient: 33.2, humidity: 82, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '18:00', temp: 4.9, ambient: 30.5, humidity: 84, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '20:00', temp: 4.0, ambient: 27.8, humidity: 86, minLimit: 2.0, maxLimit: 8.0 },
  { hour: '22:00', temp: 3.6, ambient: 25.4, humidity: 88, minLimit: 2.0, maxLimit: 8.0 },
];

// ─── DEMO DATA: LOADING RECORDS (4 PALLETS) ──────────────────────────────────
interface LoadingRecord {
  palletId: string;
  loadingTime: string;
  weight: string;
  handler: string;
  originDepot: string;
  dockDoor: string;
  preCoolTemp: string;
  sealCheck: 'Verified' | 'Pending';
}

const LOADING_RECORDS: LoadingRecord[] = [
  {
    palletId: 'PLT-8092-01',
    loadingTime: '04:45 IST',
    weight: '500 kg',
    handler: 'Ramesh Kale (Cold-Store Supervisor)',
    originDepot: 'Shimla Agro Cold-Terminal Bay 2',
    dockDoor: 'Dock Door #04',
    preCoolTemp: '+3.1°C',
    sealCheck: 'Verified'
  },
  {
    palletId: 'PLT-8092-02',
    loadingTime: '05:00 IST',
    weight: '500 kg',
    handler: 'Ramesh Kale (Cold-Store Supervisor)',
    originDepot: 'Shimla Agro Cold-Terminal Bay 2',
    dockDoor: 'Dock Door #04',
    preCoolTemp: '+3.2°C',
    sealCheck: 'Verified'
  },
  {
    palletId: 'PLT-8092-03',
    loadingTime: '05:15 IST',
    weight: '500 kg',
    handler: 'Dinesh Patil (Dock Master)',
    originDepot: 'Shimla Agro Cold-Terminal Bay 3',
    dockDoor: 'Dock Door #05',
    preCoolTemp: '+3.0°C',
    sealCheck: 'Verified'
  },
  {
    palletId: 'PLT-8092-04',
    loadingTime: '05:30 IST',
    weight: '500 kg',
    handler: 'Dinesh Patil (Dock Master)',
    originDepot: 'Shimla Agro Cold-Terminal Bay 3',
    dockDoor: 'Dock Door #05',
    preCoolTemp: '+3.3°C',
    sealCheck: 'Verified'
  }
];

// ─── DEMO DATA: TEMPERATURE EXCURSION ALERTS ─────────────────────────────────
interface ExcursionAlert {
  alertId: string;
  timestamp: string;
  severity: 'Critical' | 'Warning' | 'Resolved';
  peakTemp: string;
  duration: string;
  triggerCause: string;
  resolutionAction: string;
  slaStatus: string;
}

const EXCURSION_ALERTS: ExcursionAlert[] = [
  {
    alertId: 'ALT-EXC-409',
    timestamp: 'Today · 13:10 IST (2h 20m ago)',
    severity: 'Critical',
    peakTemp: '+9.8°C (Threshold > 8.0°C)',
    duration: '38 minutes above limit',
    triggerCause: 'Compressor auxiliary defrost cycle extended during steep highway incline with 38°C ambient heat',
    resolutionAction: 'AI Cargo Rescue Engine engaged secondary reefer loop; auxiliary cooling throttled to 100% capacity. Temperature descending back toward safe zone.',
    slaStatus: 'Under Active SLA Monitoring (Kinnow Apples remain within cumulative degree-hour tolerance)'
  },
  {
    alertId: 'ALT-DEV-204',
    timestamp: 'Today · 11:45 IST',
    severity: 'Warning',
    peakTemp: '+6.4°C (Normal Range)',
    duration: '14 minutes',
    triggerCause: 'Vehicle halted for unscheduled toll gate inspection near Amravati bypass',
    resolutionAction: 'Driver instructed to maintain engine idle to power reefer genset continuously.',
    slaStatus: 'Resolved'
  }
];

export const ShipmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Active view tab
  const [activeTab, setActiveTab] = useState<'telemetry' | 'loading' | 'alerts' | 'pod'>('telemetry');

  // Shipment identity with fallback to default demo data
  const shipmentId = id || 'SHP-8092';

  // Customize demo metadata based on ID
  const isVaccine = shipmentId === 'SHP-8104';
  const isIceCream = shipmentId === 'SHP-8119';

  const productName = isVaccine
    ? 'Vaccines - 50kg (mRNA Immunization Vials)'
    : isIceCream
    ? 'Ice Cream - 1.5T (Dairy Gelato Cartons)'
    : 'Apples - 2T (Royal Gala & Kinnow Mandarins)';

  const setpointRange = isVaccine
    ? '+2.0°C to +8.0°C (Pharma Cold-Chain)'
    : isIceCream
    ? '-25.0°C to -18.0°C (Deep Frozen)'
    : '+2.0°C to +8.0°C (Fresh Produce)';

  const currentTemp = isVaccine ? '+3.8°C' : isIceCream ? '-21.4°C' : '+9.2°C';
  const statusBadge = isVaccine ? 'In Transit' : isIceCream ? 'In Transit' : 'At Risk';
  const originCity = isVaccine ? 'Pune Biotech Cluster' : isIceCream ? 'Anand Mega Dairy' : 'Shimla Cold-Hub';
  const destinationCity = isVaccine ? 'Delhi NCR Vaccine Depot' : isIceCream ? 'Hyderabad Central Terminal' : 'Mumbai Port CFS';

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">
      
      {/* ─── TOP BAR & BACK BUTTON ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D0CEC9] pb-4">
        <Link
          to="/shipments"
          className="border border-[#D0CEC9] text-[#A5A5A4] hover:border-[#06383D]/40 hover:text-[#292D2F] font-bold rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 bg-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-[#06383D]" />
          <span>Back to Shipments</span>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A5A5A4]">
          <span>
            WAYBILL: <strong className="text-[#292D2F]">WB-2026-88192-IN</strong>
          </span>
          <span className="text-[#D0CEC9]">|</span>
          <span>
            E-SEAL: <strong className="text-[#16803C]">#SL-9941 (INTACT)</strong>
          </span>
          <span className="text-[#D0CEC9]">|</span>
          <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
            DEMO DATA
          </span>
        </div>
      </div>

      {/* ─── SHIPMENT IDENTITY BANNER CARD ─────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black text-[#292D2F] font-mono">
                {shipmentId}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  statusBadge === 'At Risk'
                    ? 'bg-amber-50 text-[#F2AE32] border border-amber-200'
                    : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                ● {statusBadge}
              </span>
              <span className="bg-[#06383D]/10 text-[#06383D] text-xs font-mono font-bold px-2.5 py-1 rounded-md">
                CURRENT TEMP: {currentTemp}
              </span>
            </div>

            <div className="text-sm font-semibold text-[#292D2F] mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[#A5A5A4]">Route:</span>
              <span className="font-bold text-[#06383D]">{originCity}</span>
              <ArrowRight className="w-4 h-4 text-[#F2AE32]" />
              <span className="font-bold text-[#06383D]">{destinationCity}</span>
              <span className="text-[#A5A5A4] text-xs">· 1,480 km Corridor</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/tracking"
              className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Truck className="w-4 h-4 text-[#F2AE32]" />
              <span>Live GPS Satellite View</span>
            </Link>
            <Link
              to={`/ai-intelligence?module=cargo-rescue-engine&shipment=${shipmentId}`}
              className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-4 py-2 hover:bg-[#F2AE32]/85 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
              <span>AI Rescue Advisory</span>
            </Link>
          </div>
        </div>

        {/* ─── 3-COLUMN INFO: PRODUCT | VEHICLE & DRIVER | TIMELINE ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* COLUMN 1: PRODUCT DETAILS */}
          <div className="bg-[#F0EEEA] rounded-xl p-4 border border-[#D0CEC9] space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D] flex items-center gap-1.5">
                <Package className="w-4 h-4 text-[#F2AE32]" />
                1. Product Details
              </span>
              <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">COMMODITY & CARGO</span>
                <span className="font-bold text-[#292D2F]">{productName}</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">REQUIRED TEMP RANGE</span>
                <span className="font-bold text-[#06383D]">{setpointRange}</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">BREACH LIMIT</span>
                <span className="text-[#DC2626] font-bold">Alert if &gt; 8.0°C for &gt; 20 mins</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">ESTIMATED SHELF-LIFE INTEGRITY</span>
                <span className="text-[#16803C] font-bold">91.4% Intact · 11.2 Days Remaining</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">CONSIGNMENT INSURED VALUE</span>
                <span className="font-bold text-[#292D2F]">₹24,50,000 (Comprehensive Cold SLA)</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2: VEHICLE & DRIVER */}
          <div className="bg-[#F0EEEA] rounded-xl p-4 border border-[#D0CEC9] space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#F2AE32]" />
                2. Vehicle &amp; Driver
              </span>
              <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">ASSIGNED REEFER RIG</span>
                <span className="font-bold text-[#292D2F]">CC-102 (Carrier Vector 1550 Hybrid)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">COMMAND PILOT (DRIVER)</span>
                <span className="font-bold text-[#292D2F]">Rajesh Sharma (+91 98230 44102)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">DRIVER QUALIFICATION</span>
                <span className="text-[#16803C] font-bold">HACCP Cold-Chain Level 3 · Score: 97.4%</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">REEFER GENSET &amp; POWER</span>
                <span className="font-bold text-[#06383D]">Diesel: 74% · Battery: 98% · Cycle 4</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">CURRENT SPEED &amp; LOCATION</span>
                <span className="font-bold text-[#292D2F]">62 km/h · Jalgaon Bypass (NH-53)</span>
              </div>
            </div>
          </div>

          {/* COLUMN 3: TIMELINE & CUSTODY */}
          <div className="bg-[#F0EEEA] rounded-xl p-4 border border-[#D0CEC9] space-y-3">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F2AE32]" />
                3. Timeline &amp; Custody
              </span>
              <span className="text-[9px] font-mono text-[#A5A5A4]">DEMO DATA</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">DISPATCH DEPARTURE</span>
                <span className="font-bold text-[#292D2F]">Today · 05:30 IST (Shimla Bay 2)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">CHECKPOINT 1 (PASSED)</span>
                <span className="font-bold text-[#16803C]">Amravati Multi-Modal (08:45 IST)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">CHECKPOINT 2 (PASSED)</span>
                <span className="font-bold text-[#16803C]">Akola Commercial Post (12:15 IST)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">PROJECTED ARRIVAL (ETA)</span>
                <span className="font-bold text-[#DC2626]">Today · 21:30 IST (+30m Delay)</span>
              </div>
              <div>
                <span className="text-[#A5A5A4] text-[10px] block">CHAIN OF CUSTODY</span>
                <span className="text-[#06383D] font-bold">Cryptographic e-Seal #SL-9941 Intact</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── SECTION TABS: TELEMETRY | LOADING | ALERTS | POD ─────────────────── */}
      <div className="flex border-b border-[#D0CEC9] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'telemetry'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>24h Temperature Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('loading')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'loading'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Loading Records ({LOADING_RECORDS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'alerts'
              ? 'border-[#F2AE32] text-[#DC2626]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Temp Excursions &amp; Alerts (2)</span>
        </button>

        <button
          onClick={() => setActiveTab('pod')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'pod'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Proof of Delivery (e-POD)</span>
        </button>
      </div>

      {/* ─── TAB 1: 24-HOUR TEMPERATURE TELEMETRY CHART ──────────────────────── */}
      {activeTab === 'telemetry' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                  IOT SENSOR TELEMETRY STREAM
                </span>
                <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  DEMO DATA
                </span>
              </div>
              <h2 className="text-lg font-black text-[#292D2F] mt-0.5">
                24-Hour Chamber Temperature &amp; Ambient Exposure
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#06383D] font-bold">
                <span className="w-3 h-3 rounded-full bg-[#06383D]" />
                Chamber (°C)
              </span>
              <span className="flex items-center gap-1.5 text-[#A5A5A4] font-bold">
                <span className="w-3 h-3 rounded-full bg-[#F2AE32]" />
                Ambient Exterior (°C)
              </span>
            </div>
          </div>

          {/* AreaChart */}
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TEMP_24H_DATA} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="tempGradientTeal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06383D" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06383D" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="ambientGradientAmber" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2AE32" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F2AE32" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E3DE" />
                <XAxis
                  dataKey="hour"
                  stroke="#A5A5A4"
                  tick={{ fill: '#A5A5A4', fontSize: 10, fontFamily: 'monospace' }}
                />
                <YAxis
                  stroke="#A5A5A4"
                  tick={{ fill: '#A5A5A4', fontSize: 10, fontFamily: 'monospace' }}
                  domain={[0, 42]}
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
                    if (name === 'temp') return [`${value}°C`, 'Chamber Internal Temp'];
                    if (name === 'ambient') return [`${value}°C`, 'External Ambient Temp'];
                    return [value, name];
                  }}
                />
                {/* Reference Lines for Safe Range */}
                <ReferenceLine
                  y={8.0}
                  label={{ value: 'Upper Limit (+8°C)', fill: '#DC2626', fontSize: 10, position: 'insideTopRight' }}
                  stroke="#DC2626"
                  strokeDasharray="4 4"
                />
                <ReferenceLine
                  y={2.0}
                  label={{ value: 'Lower Limit (+2°C)', fill: '#F2AE32', fontSize: 10, position: 'insideBottomRight' }}
                  stroke="#F2AE32"
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="ambient"
                  name="ambient"
                  stroke="#F2AE32"
                  strokeWidth={2}
                  fill="url(#ambientGradientAmber)"
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  name="temp"
                  stroke="#06383D"
                  strokeWidth={2.5}
                  fill="url(#tempGradientTeal)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Telemetry Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-[#D0CEC9] text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">CURRENT READING</span>
              <span className="font-bold text-[#DC2626] text-sm">{currentTemp}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">MIN RECORDED</span>
              <span className="font-bold text-[#06383D] text-sm">+3.2°C</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">MAX PEAK (EXCURSION)</span>
              <span className="font-bold text-[#DC2626] text-sm">+9.8°C</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">CURRENT AMBIENT</span>
              <span className="font-bold text-[#292D2F] text-sm">+36.8°C</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">CHAMBER HUMIDITY</span>
              <span className="font-bold text-[#06383D] text-sm">77% RH</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0EEEA]">
              <span className="text-[#A5A5A4] text-[10px] block">AIRFLOW CIRCULATION</span>
              <span className="font-bold text-[#16803C] text-sm">1,850 m³/h</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: LOADING RECORDS TABLE ─────────────────────────────────────── */}
      {activeTab === 'loading' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                COLD-STORE DISPATCH &amp; PRE-COOLING AUDIT
              </span>
              <h2 className="text-lg font-black text-[#292D2F] mt-0.5">
                Pallet Loading Records &amp; Gate Verification
              </h2>
            </div>
            <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              DEMO DATA
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Pallet / Batch ID</th>
                  <th className="py-2.5 px-3">Loading Time</th>
                  <th className="py-2.5 px-3">Gross Weight</th>
                  <th className="py-2.5 px-3">Pre-cooling Temp</th>
                  <th className="py-2.5 px-3">Origin Cold Depot</th>
                  <th className="py-2.5 px-3">Dock Handler</th>
                  <th className="py-2.5 px-3 text-right">Seal Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CEC9]/60">
                {LOADING_RECORDS.map((r) => (
                  <tr key={r.palletId} className="hover:bg-[#F0EEEA] transition-colors">
                    <td className="py-3 px-3 font-bold text-[#292D2F]">
                      {r.palletId}
                    </td>
                    <td className="py-3 px-3 text-[#A5A5A4]">
                      {r.loadingTime}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#06383D]">
                      {r.weight}
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-[#06383D]/10 text-[#06383D] font-bold px-2 py-0.5 rounded">
                        {r.preCoolTemp}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#292D2F]">
                      {r.originDepot} ({r.dockDoor})
                    </td>
                    <td className="py-3 px-3 text-[#A5A5A4]">
                      {r.handler}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="bg-emerald-50 text-[#16803C] border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        ✓ {r.sealCheck}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-[#D0CEC9] flex flex-wrap items-center justify-between text-xs font-mono text-[#A5A5A4]">
            <span>Total Inspected Cargo: 2,000 kg across 4 pre-conditioned pallets</span>
            <span>Gate-out Quality Inspector: Verma R. K. (ID #EMP-9821)</span>
          </div>
        </div>
      )}

      {/* ─── TAB 3: TEMPERATURE EXCURSION ALERTS ──────────────────────────────── */}
      {activeTab === 'alerts' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DC2626]">
                ACTIVE THERMAL COMPLIANCE AUDIT
              </span>
              <h2 className="text-lg font-black text-[#292D2F] mt-0.5">
                Temperature Excursion Events &amp; Autonomous Rescue Log
              </h2>
            </div>
            <span className="bg-red-50 text-[#DC2626] border border-red-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              1 CRITICAL EVENT
            </span>
          </div>

          <div className="space-y-4">
            {EXCURSION_ALERTS.map((alert) => (
              <div
                key={alert.alertId}
                className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${
                  alert.severity === 'Critical'
                    ? 'bg-red-50/20 border-red-200'
                    : 'bg-[#F0EEEA] border-[#D0CEC9]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D0CEC9]/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        alert.severity === 'Critical'
                          ? 'bg-[#DC2626] text-white'
                          : 'bg-[#F2AE32] text-[#292D2F]'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-bold text-[#292D2F]">{alert.alertId}</span>
                    <span className="text-[#A5A5A4]">· {alert.timestamp}</span>
                  </div>
                  <span className="text-[#DC2626] font-bold">{alert.peakTemp}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#A5A5A4] text-[10px] block uppercase font-bold">TRIGGER ROOT CAUSE</span>
                    <p className="text-[#292D2F] font-sans mt-0.5 text-xs">
                      {alert.triggerCause}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#06383D] text-[10px] block uppercase font-bold">AUTONOMOUS MITIGATION / AI RESCUE</span>
                    <p className="text-[#292D2F] font-sans mt-0.5 text-xs">
                      {alert.resolutionAction}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D0CEC9]/40 flex flex-wrap items-center justify-between text-[11px] text-[#A5A5A4]">
                  <span>Duration: <strong className="text-[#292D2F]">{alert.duration}</strong></span>
                  <span className="text-[#16803C] font-semibold">{alert.slaStatus}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#D0CEC9] flex items-center justify-end">
            <Link
              to="/ai-intelligence?module=cargo-rescue-engine"
              className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <span>Open Autonomous Rescue Engine Simulator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
            </Link>
          </div>
        </div>
      )}

      {/* ─── TAB 4: PROOF OF DELIVERY (E-POD) SECTION ─────────────────────────── */}
      {activeTab === 'pod' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                CONSIGNMENT HANDOVER &amp; CUSTODY SETTLEMENT
              </span>
              <h2 className="text-lg font-black text-[#292D2F] mt-0.5">
                Proof of Delivery (e-POD) &amp; Digital Bill of Lading
              </h2>
            </div>
            <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              DEMO DATA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Recipient Details & Terminal */}
            <div className="bg-[#F0EEEA] rounded-xl p-5 border border-[#D0CEC9] space-y-3 font-mono text-xs">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D] block border-b border-[#D0CEC9] pb-2">
                Designated Consignee &amp; Receiving Officer
              </span>

              <div className="space-y-2">
                <div>
                  <span className="text-[#A5A5A4] text-[10px] block">RECIPIENT NAME</span>
                  <span className="font-bold text-[#292D2F] text-sm">
                    Dr. Arvind Swaminathan
                  </span>
                  <span className="text-[#A5A5A4] block text-[11px]">
                    Chief Cold-Chain Inbound Officer · JNPT CFS Terminal
                  </span>
                </div>

                <div>
                  <span className="text-[#A5A5A4] text-[10px] block">RECEIVING DOCK</span>
                  <span className="font-bold text-[#292D2F]">
                    Gate 3 Pre-conditioned Receiving Terminal, Nhava Sheva, Mumbai
                  </span>
                </div>

                <div>
                  <span className="text-[#A5A5A4] text-[10px] block">EXPECTED HANDOVER TIMESTAMP</span>
                  <span className="font-bold text-[#06383D]">
                    Today · 21:30 IST (Scheduled Inbound Inspection Window)
                  </span>
                </div>

                <div>
                  <span className="text-[#A5A5A4] text-[10px] block">ELECTRONIC WAYBILL ID</span>
                  <span className="font-bold text-[#292D2F]">
                    e-WB-2026-90218-GSTIN-27AAACP0129
                  </span>
                </div>
              </div>
            </div>

            {/* Signature on File & Digital Seal Preview */}
            <div className="bg-[#F0EEEA] rounded-xl p-5 border border-[#D0CEC9] space-y-4 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D]">
                    Digital Handover Verification
                  </span>
                  <span className="bg-emerald-50 text-[#16803C] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">
                    SIGNATURE ON FILE
                  </span>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-white border border-[#D0CEC9] flex flex-col items-center justify-center space-y-2">
                  <div className="font-serif italic text-2xl text-[#06383D] tracking-wide select-none">
                    Arvind Swaminathan
                  </div>
                  <div className="text-[10px] text-[#A5A5A4] font-mono text-center">
                    Aadhaar e-Sign Token #E-SIG-99124-OK · Timestamp Pre-authorized
                  </div>
                  <div className="text-[9px] text-[#16803C] font-mono font-bold">
                    ✓ Cryptographic Key Validated
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => alert(`Generated electronic proof-of-delivery report for ${shipmentId}.`)}
                  className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F2AE32]" />
                  <span>Download e-POD Manifest (PDF)</span>
                </button>
                <span className="text-[10px] text-[#A5A5A4]">COMPLIANCE ID: #POD-7712</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── FOOTER AUDIT NOTE ────────────────────────────────────────────────── */}
      <div className="text-center py-2 text-xs font-mono text-[#A5A5A4]">
        ColdChain 360 AI · Consignment Dossier for {shipmentId} · ALL DATA CLEARLY LABELED AS DEMO DATA
      </div>

    </div>
  );
};
