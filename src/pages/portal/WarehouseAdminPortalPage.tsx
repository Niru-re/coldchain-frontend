import React, { useState } from 'react';
import {
  Warehouse, Thermometer, Wind, Package, QrCode, CalendarClock,
  AlertTriangle, Truck, FileText, Zap, Wrench, BarChart3,
  CheckCircle2, XCircle, Clock, Search, Filter, Upload,
  Play, Pause, Plus, X, ChevronRight, AlertOctagon,
  Snowflake, Leaf, FlaskConical, Gauge, Activity, ShieldCheck,
  DollarSign, ClipboardList, Eye, RefreshCw, ArrowRight
} from 'lucide-react';
import { VerificationMatrixModal } from '../../components/portal/VerificationMatrixModal';
import { SharedReportsAnalyticsExport } from '../../components/portal/shared/SharedReportsAnalyticsExport';
import { SharedAISpoilageAlerts } from '../../components/portal/shared/SharedAISpoilageAlerts';
import {
  MOCK_WAREHOUSE_CHAMBERS,
  MOCK_PALLET_INVENTORY,
  WarehouseChamber,
  PalletInventory
} from '../../data/portalMockData';

// ─── COLOURS ────────────────────────────────────────────────────────────────
const C = {
  bg: '#F5F7F6',
  surface: '#FFFFFF',
  surface2: '#EEF2F0',
  teal: '#06383D',
  tealMid: '#0D5359',
  tealLight: '#E6F2F3',
  border: '#D1DAD8',
  borderLight: '#E8EDEC',
  textPrimary: '#1A2C2E',
  textSecondary: '#4A6B6E',
  textMuted: '#8AADAF',
  cyan: '#0891B2',
  cyanLightBg: '#E0F2FE',
  amber: '#F2AE32',
  red: '#DC2626',
  redLightBg: '#FEE2E2',
  green: '#16A34A',
  greenLightBg: '#DCFCE7',
  purple: '#7C3AED',
};

// ─── ADDITIONAL DEMO DATA ───────────────────────────────────────────────────
interface Chamber6 {
  id: string; name: string; zone: string; setpoint: string;
  occupied: number; total: number; currentTemp: string;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL' | 'ACTIVE';
  statusColor: string; tempBg: string; tempColor: string;
}

const CHAMBERS_6: Chamber6[] = [
  { id: 'A', name: 'Chamber A', zone: 'Deep Freeze', setpoint: '-25°C', occupied: 420, total: 480, currentTemp: '-24.8°C', status: 'OPTIMAL', statusColor: C.cyan, tempBg: C.cyanLightBg, tempColor: C.cyan },
  { id: 'B', name: 'Chamber B', zone: 'Meat/Dairy Chiller', setpoint: '+2°C to +4°C', occupied: 380, total: 400, currentTemp: '+3.1°C', status: 'OPTIMAL', statusColor: C.tealMid, tempBg: C.tealLight, tempColor: C.tealMid },
  { id: 'C', name: 'Chamber C', zone: 'Fresh Produce', setpoint: '+8°C to +12°C', occupied: 310, total: 360, currentTemp: '+9.4°C', status: 'OPTIMAL', statusColor: C.green, tempBg: C.greenLightBg, tempColor: C.green },
  { id: 'D', name: 'Chamber D', zone: 'CA (Controlled Atmosphere)', setpoint: '+2°C, O₂ 1.5%, CO₂ 1%', occupied: 280, total: 320, currentTemp: '+2.2°C', status: 'OPTIMAL', statusColor: C.tealMid, tempBg: C.tealLight, tempColor: C.tealMid },
  { id: 'E', name: 'Chamber E', zone: 'Blast Tunnel', setpoint: 'Pull-down -25°C', occupied: 40, total: 40, currentTemp: '-18.0°C', status: 'ACTIVE', statusColor: C.amber, tempBg: '#FEF3C7', tempColor: '#B45309' },
  { id: 'F', name: 'Chamber F', zone: 'Ambient Buffer', setpoint: '+18°C to +22°C', occupied: 85, total: 200, currentTemp: '+20.1°C', status: 'OPTIMAL', statusColor: '#6B7280', tempBg: '#F3F4F6', tempColor: '#374151' },
];

interface PalletRow {
  batchId: string; commodity: string; client: string; chamber: string;
  bay: string; pallets: number; inwardDate: string; expDate: string;
  daysLeft: number; status: 'OK' | 'EXPIRING' | 'URGENT';
}

const PALLET_TABLE: PalletRow[] = [
  { batchId: 'BTH-2041', commodity: 'Alphonso Mangoes', client: 'Fresh2Market', chamber: 'C (Fresh)', bay: 'C-04-R2-S1', pallets: 28, inwardDate: '2026-10-18', expDate: '2026-10-28', daysLeft: 6, status: 'EXPIRING' },
  { batchId: 'BTH-2038', commodity: 'Frozen Chicken', client: 'Skylark Foods', chamber: 'A (Deep Freeze)', bay: 'A-01-R1-S3', pallets: 60, inwardDate: '2026-10-10', expDate: '2026-12-10', daysLeft: 49, status: 'OK' },
  { batchId: 'BTH-2035', commodity: 'UHT Milk', client: 'Amul Direct', chamber: 'B (Dairy)', bay: 'B-02-R3-S2', pallets: 45, inwardDate: '2026-10-15', expDate: '2026-11-15', daysLeft: 24, status: 'OK' },
  { batchId: 'BTH-2030', commodity: 'Grapes (Export)', client: 'Sahyadri Farms', chamber: 'D (CA)', bay: 'D-01-R2-S4', pallets: 40, inwardDate: '2026-10-12', expDate: '2026-10-25', daysLeft: 3, status: 'URGENT' },
  { batchId: 'BTH-2025', commodity: 'Pomegranates', client: 'NatFresh', chamber: 'C (Fresh)', bay: 'C-07-R1-S2', pallets: 22, inwardDate: '2026-10-16', expDate: '2026-11-05', daysLeft: 14, status: 'OK' },
];

interface DockBay {
  id: number; label: string; status: 'LOADING' | 'AVAILABLE' | 'SCHEDULED' | 'MAINTENANCE';
  vehicle?: string; eta?: string;
}
const DOCK_BAYS: DockBay[] = [
  { id: 1, label: 'Bay 1', status: 'LOADING', vehicle: 'CC-REEFER-04', eta: '15:30' },
  { id: 2, label: 'Bay 2', status: 'AVAILABLE' },
  { id: 3, label: 'Bay 3', status: 'LOADING', vehicle: 'CC-REEFER-11', eta: '16:00' },
  { id: 4, label: 'Bay 4', status: 'AVAILABLE' },
  { id: 5, label: 'Bay 5', status: 'SCHEDULED', vehicle: 'CC-REEFER-07', eta: '17:00' },
  { id: 6, label: 'Bay 6', status: 'MAINTENANCE' },
  { id: 7, label: 'Bay 7', status: 'SCHEDULED', vehicle: 'CC-REEFER-02', eta: '18:30' },
  { id: 8, label: 'Bay 8', status: 'AVAILABLE' },
];

interface PreCoolSlot {
  slot: string; commodity: string; targetTemp: string; start: string; duration: string; status: 'COMPLETED' | 'IN PROGRESS' | 'SCHEDULED';
}
const PRE_COOL_SCHEDULE: PreCoolSlot[] = [
  { slot: 'AM-01', commodity: 'Mango Export', targetTemp: '+8°C', start: '06:00', duration: '45 min', status: 'COMPLETED' },
  { slot: 'AM-02', commodity: 'Pomegranates', targetTemp: '+5°C', start: '08:30', duration: '60 min', status: 'COMPLETED' },
  { slot: 'PM-01', commodity: 'Grapes (CA)', targetTemp: '+3°C', start: '14:00', duration: '75 min', status: 'IN PROGRESS' },
  { slot: 'PM-02', commodity: 'Frozen Prawns', targetTemp: '-20°C', start: '18:00', duration: '120 min', status: 'SCHEDULED' },
];

const DISPATCH_SCHEDULE = [
  { time: '14:00', truck: 'CC-REEFER-04', commodity: 'Grapes (Export) · BTH-2030', dest: 'JNPT Port', bay: 'Bay 1', type: 'Departure' },
  { time: '15:30', truck: 'CC-REEFER-08', commodity: 'Alphonso Mangoes · BTH-2041', dest: 'Vashi APMC', bay: 'Bay 2', type: 'Arrival' },
  { time: '16:00', truck: 'CC-REEFER-11', commodity: 'Frozen Chicken · BTH-2038', dest: 'Mumbai Hub', bay: 'Bay 3', type: 'Departure' },
  { time: '17:30', truck: 'CC-REEFER-07', commodity: 'UHT Milk · BTH-2035', dest: 'Amul DC Pune', bay: 'Bay 5', type: 'Arrival' },
];

const BILLING_RATES: Record<string, number> = {
  'Deep Freeze': 38,
  'Chiller': 32,
  'CA Store': 45,
  'Fresh Produce': 28,
};

const RECENT_BILLS = [
  { invoice: 'INV-2026-1041', client: 'Skylark Foods', amount: '₹1,86,240', period: 'Oct 1–20 2026', status: 'PAID' },
  { invoice: 'INV-2026-1038', client: 'Fresh2Market', amount: '₹74,880', period: 'Sep 25 – Oct 15', status: 'PENDING' },
  { invoice: 'INV-2026-1035', client: 'Sahyadri Farms', amount: '₹1,26,000', period: 'Oct 5–20 2026', status: 'PAID' },
  { invoice: 'INV-2026-1031', client: 'Amul Direct', amount: '₹1,00,800', period: 'Oct 1–20 2026', status: 'OVERDUE' },
];

const MAINTENANCE_TASKS = [
  { id: 1, title: 'Chamber A Evaporator Fan', location: 'Chamber A', due: 'Oct 28, 2026', priority: 'HIGH' },
  { id: 2, title: 'Condenser Coil Cleaning', location: 'Chamber B', due: 'Nov 05, 2026', priority: 'MEDIUM' },
  { id: 3, title: 'Compressor Oil Change', location: 'Plant Room 1', due: 'Nov 12, 2026', priority: 'MEDIUM' },
  { id: 4, title: 'Insulated Door Gasket', location: 'Chamber C, D', due: 'Dec 01, 2026', priority: 'LOW' },
];

const ENERGY_MONTHS = [
  { month: 'May', kwh: 41200 },
  { month: 'Jun', kwh: 44800 },
  { month: 'Jul', kwh: 46500 },
  { month: 'Aug', kwh: 50100 },
  { month: 'Sep', kwh: 49300 },
  { month: 'Oct', kwh: 48200 },
];

const ENERGY_BY_CHAMBER = [
  { chamber: 'Chamber A (Deep Freeze)', kwhMt: 4.2, insulation: 94 },
  { chamber: 'Chamber B (Chiller)', kwhMt: 2.8, insulation: 97 },
  { chamber: 'Chamber C (Fresh)', kwhMt: 2.4, insulation: 96 },
  { chamber: 'Chamber D (CA)', kwhMt: 3.1, insulation: 95 },
  { chamber: 'Chamber E (Blast)', kwhMt: 6.8, insulation: 92 },
  { chamber: 'Chamber F (Ambient)', kwhMt: 1.9, insulation: 98 },
];

const INWARD_LOG = [
  { id: 'IWD-1041', commodity: 'Alphonso Mangoes', supplier: 'Deshmukh Agro', qty: '14.5 MT', coreTemp: '+10.2°C', chamber: 'C (Fresh)', date: '2026-10-18', status: 'ACCEPTED' },
  { id: 'IWD-1040', commodity: 'Frozen Chicken', supplier: 'Skylark Processors', qty: '28.0 MT', coreTemp: '-18.8°C', chamber: 'A (Deep Freeze)', date: '2026-10-17', status: 'ACCEPTED' },
  { id: 'IWD-1038', commodity: 'UHT Milk Cartons', supplier: 'Amul Direct Delhi', qty: '19.2 MT', coreTemp: '+4.1°C', chamber: 'B (Dairy)', date: '2026-10-15', status: 'ACCEPTED' },
  { id: 'IWD-1034', commodity: 'Grapes (Export)', supplier: 'Sahyadri Farms', qty: '16.8 MT', coreTemp: '+2.2°C', chamber: 'D (CA)', date: '2026-10-12', status: 'ACCEPTED' },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────
const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: 12, padding: '20px', ...style }}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; code: string; style?: React.CSSProperties }> = ({ icon, title, code, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, ...style }}>
    <span style={{ color: C.tealMid }}>{icon}</span>
    <span style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 16, color: C.textPrimary }}>{title}</span>
    <span style={{ fontSize: 11, background: C.tealLight, color: C.tealMid, border: `1px solid ${C.border}`, borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{code}</span>
  </div>
);

const StatusChip: React.FC<{ label: string; color: string; bg: string }> = ({ label, color, bg }) => (
  <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.04em' }}>{label}</span>
);

const ProgressBar: React.FC<{ value: number; max: number; color?: string }> = ({ value, max, color = C.cyan }) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: C.surface2, borderRadius: 6, height: 8, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, background: color, height: '100%', borderRadius: 6, transition: 'width 0.4s' }} />
    </div>
  );
};

const TealBtn: React.FC<{ onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties; small?: boolean }> = ({ onClick, children, style, small }) => (
  <button onClick={onClick} style={{ background: C.teal, color: '#fff', border: 'none', borderRadius: 8, padding: small ? '6px 14px' : '9px 20px', fontWeight: 600, fontSize: small ? 12 : 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
    {children}
  </button>
);

const OutlineBtn: React.FC<{ onClick?: () => void; children: React.ReactNode; style?: React.CSSProperties; small?: boolean }> = ({ onClick, children, style, small }) => (
  <button onClick={onClick} style={{ background: 'transparent', color: C.tealMid, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: small ? '4px 10px' : '7px 16px', fontWeight: 600, fontSize: small ? 11 : 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, ...style }}>
    {children}
  </button>
);

const Input: React.FC<{ label: string; value: string | number; onChange: (v: string) => void; type?: string; placeholder?: string }> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: C.textSecondary }}>{label}</label>
    <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
      style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: C.textPrimary, background: C.surface, outline: 'none' }} />
  </div>
);

const Select: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: C.textSecondary }}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: C.textPrimary, background: C.surface, outline: 'none' }}>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

// ─── MODAL SHELL ──────────────────────────────────────────────────────────────
const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ background: C.surface, borderRadius: 14, padding: 28, minWidth: 400, maxWidth: 560, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 16, color: C.textPrimary }}>{title}</span>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}><X size={20} /></button>
      </div>
      {children}
    </div>
  </div>
);

// ─── TAB 1 — OVERVIEW ────────────────────────────────────────────────────────
const AlarmSensor: React.FC<{ zone: string; alarmActive: boolean }> = ({ zone, alarmActive }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: alarmActive ? '#FEF3C7' : C.greenLightBg, border: `1px solid ${alarmActive ? '#FDE68A' : '#BBF7D0'}`, borderRadius: 8 }}>
    <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{zone}</span>
    <StatusChip label={alarmActive ? '⚠ WARNING' : '✓ SAFE'} color={alarmActive ? '#92400E' : C.green} bg={alarmActive ? '#FDE68A' : C.greenLightBg} />
  </div>
);

const OverviewTab: React.FC = () => {
  const [alarmActive, setAlarmActive] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-01 Chamber Capacity Cards */}
      <Card>
        <SectionTitle icon={<Warehouse size={18} />} title="Multi-Chamber Storage Capacity & Space Allocation" code="WHS-01" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {CHAMBERS_6.map(ch => {
            const pct = Math.round((ch.occupied / ch.total) * 100);
            const isFull = pct >= 100;
            return (
              <div key={ch.id} style={{ border: `1.5px solid ${C.borderLight}`, borderRadius: 10, padding: '14px 16px', background: C.bg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{ch.name}</div>
                    <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 2 }}>{ch.zone}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>Setpoint: {ch.setpoint}</div>
                  </div>
                  <StatusChip label={ch.status} color={ch.statusColor} bg={`${ch.statusColor}22`} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 4px' }}>
                  <span style={{ fontSize: 12, color: C.textSecondary }}>Pallets: <b style={{ color: C.textPrimary }}>{ch.occupied}/{ch.total}</b></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: isFull ? C.red : C.tealMid }}>{pct}%</span>
                </div>
                <ProgressBar value={ch.occupied} max={ch.total} color={isFull ? C.red : ch.statusColor} />
                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6, background: ch.tempBg, borderRadius: 20, padding: '3px 10px' }}>
                  <Thermometer size={12} color={ch.tempColor} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: ch.tempColor }}>{ch.currentTemp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* WHS-02 Temperature Monitoring */}
      <Card>
        <SectionTitle icon={<Thermometer size={18} />} title="Multi-Zone Precision Temperature Monitoring" code="WHS-02" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
          {CHAMBERS_6.map(ch => (
            <div key={ch.id} style={{ textAlign: 'center', background: ch.tempBg, borderRadius: 10, padding: '12px 8px', border: `1px solid ${C.borderLight}` }}>
              <Thermometer size={18} color={ch.tempColor} style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 11, fontWeight: 700, color: ch.tempColor }}>{ch.currentTemp}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>Ch. {ch.id}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* WHS-03 CA Telemetry */}
      <Card>
        <SectionTitle icon={<FlaskConical size={18} />} title="Controlled Atmosphere (CA) O₂/CO₂/Humidity Telemetry — Chamber D" code="WHS-03" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { label: 'O₂ Level', value: 1.5, unit: '%', target: '1.5%', max: 5, color: C.cyan, ideal: '< 2%' },
            { label: 'CO₂ Level', value: 1.0, unit: '%', target: '1.0%', max: 5, color: C.tealMid, ideal: '< 2%' },
            { label: 'Relative Humidity', value: 95, unit: '%', target: '95%', max: 100, color: C.purple, ideal: '90–95%' },
          ].map(g => {
            const pct = (g.value / g.max) * 100;
            const r = 36;
            const circ = 2 * Math.PI * r;
            const dashOffset = circ * (1 - pct / 100);
            return (
              <div key={g.label} style={{ textAlign: 'center', padding: '16px', background: C.bg, borderRadius: 10, border: `1px solid ${C.borderLight}` }}>
                <svg width="100" height="100" style={{ margin: '0 auto 8px', display: 'block' }}>
                  <circle cx="50" cy="50" r={r} fill="none" stroke={C.borderLight} strokeWidth="8" />
                  <circle cx="50" cy="50" r={r} fill="none" stroke={g.color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={dashOffset}
                    strokeLinecap="round" transform="rotate(-90 50 50)" />
                  <text x="50" y="54" textAnchor="middle" fontSize="14" fontWeight="700" fill={g.color}>{g.value}{g.unit}</text>
                </svg>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{g.label}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Target: {g.target} · Ideal: {g.ideal}</div>
                <StatusChip label="NORMAL" color={C.green} bg={C.greenLightBg} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* WHS-07 Ammonia Leak Alarm */}
      <Card>
        <SectionTitle icon={<AlertOctagon size={18} />} title="Automated Ammonia/Freon Refrigerant Leak Alarm" code="WHS-07" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {['Compressor Room', 'Condenser Hall', 'Chamber D CA Line'].map(zone => (
            <AlarmSensor key={zone} zone={zone} alarmActive={alarmActive} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <TealBtn onClick={() => setAlarmActive(a => !a)} style={{ background: alarmActive ? C.amber : C.teal }}>
            {alarmActive ? <><AlertTriangle size={14} /> Clear Test</> : <><ShieldCheck size={14} /> Test Alarm System</>}
          </TealBtn>
          {alarmActive && (
            <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600, background: '#FEF3C7', padding: '6px 14px', borderRadius: 8, border: '1px solid #FDE68A' }}>
              ⚠ DEMO: Alarm triggered — NH₃ simulated at 25 ppm in Compressor Room
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};

// ─── TAB 2 — INVENTORY ───────────────────────────────────────────────────────
const InventoryTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [chamberFilter, setChamberFilter] = useState('All');
  const [qrInput, setQrInput] = useState('');
  const [qrResult, setQrResult] = useState<PalletRow | null>(null);

  const filtered = PALLET_TABLE.filter(p => {
    const matchSearch = p.batchId.toLowerCase().includes(search.toLowerCase()) || p.commodity.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchChamber = chamberFilter === 'All' || p.chamber.startsWith(chamberFilter.charAt(0));
    return matchSearch && matchChamber;
  });

  const handleQR = () => {
    const found = PALLET_TABLE.find(p => p.batchId.toLowerCase() === qrInput.toLowerCase() || p.bay.toLowerCase() === qrInput.toLowerCase());
    setQrResult(found || null);
  };

  const statusBadge = (s: PalletRow['status']) => {
    if (s === 'URGENT') return <StatusChip label="🔴 URGENT" color={C.red} bg={C.redLightBg} />;
    if (s === 'EXPIRING') return <StatusChip label="⚠ EXPIRING" color="#92400E" bg="#FEF3C7" />;
    return <StatusChip label="OK" color={C.green} bg={C.greenLightBg} />;
  };

  const fefoSorted = [...PALLET_TABLE].sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-04 Pallet Ledger */}
      <Card>
        <SectionTitle icon={<Package size={18} />} title="Real-Time Pallet Inventory Ledger" code="WHS-04" />
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '7px 12px' }}>
            <Search size={14} color={C.textMuted} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search batch, commodity, client..."
              style={{ border: 'none', outline: 'none', fontSize: 13, color: C.textPrimary, background: 'transparent', width: '100%' }} />
          </div>
          <Select label="" value={chamberFilter} onChange={setChamberFilter} options={['All', 'A (Deep Freeze)', 'B (Dairy)', 'C (Fresh)', 'D (CA)']} />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.surface2 }}>
                {['Batch ID', 'Commodity', 'Client', 'Chamber', 'Bay', 'Pallets', 'Inward Date', 'Exp Date', 'Days Left', 'Status'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, fontSize: 12, whiteSpace: 'nowrap', borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.batchId} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: '9px 10px', fontWeight: 600, color: C.tealMid }}>{row.batchId}</td>
                  <td style={{ padding: '9px 10px', color: C.textPrimary }}>{row.commodity}</td>
                  <td style={{ padding: '9px 10px', color: C.textSecondary }}>{row.client}</td>
                  <td style={{ padding: '9px 10px', color: C.textSecondary, whiteSpace: 'nowrap' }}>{row.chamber}</td>
                  <td style={{ padding: '9px 10px', fontFamily: 'monospace', fontSize: 12, color: C.textPrimary }}>{row.bay}</td>
                  <td style={{ padding: '9px 10px', color: C.textPrimary, textAlign: 'center' }}>{row.pallets}</td>
                  <td style={{ padding: '9px 10px', color: C.textMuted }}>{row.inwardDate}</td>
                  <td style={{ padding: '9px 10px', color: C.textMuted }}>{row.expDate}</td>
                  <td style={{ padding: '9px 10px', textAlign: 'center', fontWeight: 700, color: row.daysLeft <= 5 ? C.red : row.daysLeft <= 10 ? '#92400E' : C.green }}>{row.daysLeft}d</td>
                  <td style={{ padding: '9px 10px' }}>{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* WHS-05 QR Scan */}
      <Card>
        <SectionTitle icon={<QrCode size={18} />} title="QR Code Pallet Tracking & Bin Location Lookup" code="WHS-05" />
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: '7px 12px' }}>
            <QrCode size={14} color={C.textMuted} />
            <input value={qrInput} onChange={e => setQrInput(e.target.value)} placeholder="Scan QR or enter Batch ID (e.g. BTH-2030)..."
              style={{ border: 'none', outline: 'none', fontSize: 13, color: C.textPrimary, background: 'transparent', width: '100%' }}
              onKeyDown={e => e.key === 'Enter' && handleQR()} />
          </div>
          <TealBtn onClick={handleQR}><Search size={14} /> Lookup</TealBtn>
        </div>
        {qrResult ? (
          <div style={{ background: C.tealLight, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.teal, marginBottom: 10 }}>✓ Pallet Found: {qrResult.batchId}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[
                { label: 'Commodity', val: qrResult.commodity },
                { label: 'Client', val: qrResult.client },
                { label: 'Chamber', val: qrResult.chamber },
                { label: '3D Location (Aisle-Rack-Shelf)', val: qrResult.bay },
                { label: 'Pallets', val: String(qrResult.pallets) },
                { label: 'Inward Date', val: qrResult.inwardDate },
                { label: 'Expiry Date', val: qrResult.expDate },
                { label: 'Days Remaining', val: `${qrResult.daysLeft} days` },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{f.val}</div>
                </div>
              ))}
            </div>
          </div>
        ) : qrInput && (
          <div style={{ padding: '12px 14px', background: C.redLightBg, border: `1px solid #FCA5A5`, borderRadius: 8, fontSize: 13, color: C.red }}>
            No pallet found for "{qrInput}". Try BTH-2030, BTH-2041, etc.
          </div>
        )}
      </Card>

      {/* WHS-06 FEFO */}
      <Card>
        <SectionTitle icon={<CalendarClock size={18} />} title="Batch Expiry & FEFO (First-Expired, First-Out) Priority Queue" code="WHS-06" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {fefoSorted.map((row, i) => (
            <div key={row.batchId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: i === 0 ? C.redLightBg : i === 1 ? '#FEF3C7' : C.bg, border: `1px solid ${i === 0 ? '#FCA5A5' : i === 1 ? '#FDE68A' : C.borderLight}`, borderRadius: 8 }}>
              <span style={{ fontWeight: 700, color: C.textMuted, fontSize: 12, minWidth: 20 }}>#{i + 1}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{row.batchId} — {row.commodity}</div>
                <div style={{ fontSize: 12, color: C.textSecondary }}>{row.client} · {row.chamber} · Bay: {row.bay}</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 80 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: row.daysLeft <= 5 ? C.red : row.daysLeft <= 10 ? '#92400E' : C.textPrimary }}>{row.daysLeft}d left</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Exp: {row.expDate}</div>
              </div>
              <TealBtn small style={{ background: row.daysLeft <= 5 ? C.red : C.teal }}>
                <Truck size={12} /> Load for Dispatch
              </TealBtn>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ─── TAB 3 — INWARD ──────────────────────────────────────────────────────────
const InwardTab: React.FC = () => {
  const [form, setForm] = useState({ commodity: '', supplier: '', qty: '', coreTemp: '', packaging: 'OK', grossWeight: '', chamber: 'C (Fresh)' });
  const [submitted, setSubmitted] = useState(false);
  const [assignedBay, setAssignedBay] = useState('');
  const [inspecting, setInspecting] = useState(false);
  const [inspected, setInspected] = useState(true);

  const handleAccept = () => {
    const bays = ['C-08-R2-S1', 'A-03-R1-S4', 'B-04-R2-S2', 'D-02-R1-S3'];
    setAssignedBay(bays[Math.floor(Math.random() * bays.length)]);
    setSubmitted(true);
  };

  const handleRunInspection = () => {
    setInspecting(true);
    setInspected(false);
    setTimeout(() => { setInspecting(false); setInspected(true); }, 2200);
  };

  const update = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-08 Inward Receiving */}
      <Card>
        <SectionTitle icon={<ClipboardList size={18} />} title="Inward Goods Receiving & Core Temperature Inspection" code="WHS-08" />
        {submitted ? (
          <div style={{ background: C.greenLightBg, border: `1.5px solid #86EFAC`, borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.green, marginBottom: 6 }}>✓ Inward Accepted Successfully</div>
            <div style={{ fontSize: 13, color: C.textPrimary }}>Commodity: <b>{form.commodity || 'N/A'}</b> | Supplier: <b>{form.supplier || 'N/A'}</b></div>
            <div style={{ fontSize: 13, color: C.textPrimary, marginTop: 4 }}>Auto-assigned Bay: <b style={{ color: C.tealMid }}>{assignedBay}</b> in {form.chamber}</div>
            <OutlineBtn style={{ marginTop: 12 }} onClick={() => setSubmitted(false)}>Log Another</OutlineBtn>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 16 }}>
            <Input label="Commodity" value={form.commodity} onChange={update('commodity')} placeholder="e.g. Alphonso Mangoes" />
            <Input label="Supplier" value={form.supplier} onChange={update('supplier')} placeholder="Supplier name" />
            <Input label="Quantity (MT)" value={form.qty} onChange={update('qty')} type="number" placeholder="e.g. 14.5" />
            <Input label="Core Temperature (°C)" value={form.coreTemp} onChange={update('coreTemp')} type="number" placeholder="e.g. 10.2" />
            <Select label="Packaging Check" value={form.packaging} onChange={update('packaging')} options={['OK', 'Damaged', 'Partial']} />
            <Input label="Gross Weight (kg)" value={form.grossWeight} onChange={update('grossWeight')} type="number" placeholder="e.g. 14500" />
            <Select label="Assigned Chamber" value={form.chamber} onChange={update('chamber')} options={['A (Deep Freeze)', 'B (Dairy)', 'C (Fresh)', 'D (CA)', 'F (Ambient)']} />
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <TealBtn onClick={handleAccept}><CheckCircle2 size={14} /> Accept Inward</TealBtn>
            </div>
          </div>
        )}
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textSecondary, marginBottom: 10 }}>Recent Inward Log</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ background: C.surface2 }}>
                {['Inward ID', 'Commodity', 'Supplier', 'Qty', 'Core Temp', 'Chamber', 'Date', 'Status'].map(h => (
                  <th key={h} style={{ padding: '7px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INWARD_LOG.map((row, i) => (
                <tr key={row.id} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: '8px 10px', fontWeight: 600, color: C.tealMid }}>{row.id}</td>
                  <td style={{ padding: '8px 10px', color: C.textPrimary }}>{row.commodity}</td>
                  <td style={{ padding: '8px 10px', color: C.textSecondary }}>{row.supplier}</td>
                  <td style={{ padding: '8px 10px', color: C.textPrimary }}>{row.qty}</td>
                  <td style={{ padding: '8px 10px', color: C.textPrimary }}>{row.coreTemp}</td>
                  <td style={{ padding: '8px 10px', color: C.textSecondary }}>{row.chamber}</td>
                  <td style={{ padding: '8px 10px', color: C.textMuted }}>{row.date}</td>
                  <td style={{ padding: '8px 10px' }}><StatusChip label={row.status} color={C.green} bg={C.greenLightBg} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* WHS-09 OpenCV */}
      <Card>
        <SectionTitle icon={<Eye size={18} />} title="OpenCV Pallet Condition & Carton Damage Inspector" code="WHS-09" />
        <div style={{ border: `2px dashed ${C.tealMid}`, borderRadius: 12, padding: '32px', textAlign: 'center', marginBottom: 16, background: C.tealLight }}>
          <Warehouse size={36} color={C.tealMid} style={{ margin: '0 auto 10px' }} />
          <div style={{ fontWeight: 600, color: C.tealMid, fontSize: 14 }}>Drop pallet image here or click to upload</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>Supports JPG, PNG · Max 10MB</div>
          <OutlineBtn style={{ marginTop: 14 }}><Upload size={13} /> Choose File</OutlineBtn>
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <TealBtn onClick={handleRunInspection}>
            {inspecting ? <><RefreshCw size={13} className="spin" /> Analysing...</> : <><Eye size={13} /> Run Inspection</>}
          </TealBtn>
          <span style={{ fontSize: 11, background: C.amber + '22', color: '#92400E', border: `1px solid ${C.amber}`, borderRadius: 6, padding: '6px 12px', fontWeight: 600 }}>
            SIMULATED DEMO
          </span>
        </div>
        {inspected && !inspecting && (
          <div style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '16px 18px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: C.teal, marginBottom: 12 }}>Pallet BTH-2041 — Image Analysis Results</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
              {[
                { metric: 'Carton Crush', value: '0%', icon: <CheckCircle2 size={16} />, color: C.green },
                { metric: 'Shrink Wrap Integrity', value: '98%', icon: <CheckCircle2 size={16} />, color: C.green },
                { metric: 'Frost Damage', value: '0%', icon: <CheckCircle2 size={16} />, color: C.green },
              ].map(m => (
                <div key={m.metric} style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.greenLightBg, borderRadius: 8, padding: '10px 14px', border: `1px solid #BBF7D0` }}>
                  <span style={{ color: m.color }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{m.metric}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: m.color }}>{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Tilt Angle: 0.4° (Stable)', 'Pallet Footing: Solid Timber', 'Label Legibility: 100%', 'Stack Height: Compliant'].map(f => (
                <span key={f} style={{ fontSize: 11, background: C.tealLight, color: C.tealMid, border: `1px solid ${C.border}`, borderRadius: 20, padding: '3px 10px' }}>{f}</span>
              ))}
            </div>
            <div style={{ marginTop: 12, fontWeight: 700, fontSize: 13, color: C.green }}>✓ PASS · Commercial Clearance — Confidence: 94.2%</div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ─── TAB 4 — BLAST & COOLING ─────────────────────────────────────────────────
const BlastTab: React.FC = () => {
  const [blastModal, setBlastModal] = useState(false);
  const [newBlast, setNewBlast] = useState({ commodity: '', targetTemp: '', duration: '' });
  const updateB = (k: keyof typeof newBlast) => (v: string) => setNewBlast(b => ({ ...b, [k]: v }));

  const slotStatusBadge = (s: PreCoolSlot['status']) => {
    if (s === 'COMPLETED') return <StatusChip label="COMPLETED" color={C.green} bg={C.greenLightBg} />;
    if (s === 'IN PROGRESS') return <StatusChip label="IN PROGRESS" color="#92400E" bg="#FEF3C7" />;
    return <StatusChip label="SCHEDULED" color={C.cyan} bg={C.cyanLightBg} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-10 Blast Tunnels */}
      <Card>
        <SectionTitle icon={<Snowflake size={18} />} title="Blast Freezing & Pre-Cooling Tunnel Controls" code="WHS-10" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
          {/* Tunnel 1 Active */}
          <div style={{ border: `2px solid ${C.cyan}`, borderRadius: 12, padding: '18px', background: C.cyanLightBg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 15, color: C.textPrimary }}>Blast Tunnel 1</div>
              <StatusChip label="ACTIVE" color={C.cyan} bg="#BAE6FD" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Current Temp</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: C.cyan }}>-18.0°C</div>
                <div style={{ fontSize: 11, color: C.textSecondary }}>↓ Pull-down to -25°C</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Cargo Loaded</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.textPrimary }}>40 Pallets</div>
                <div style={{ fontSize: 11, color: C.textSecondary }}>Grapes (Export)</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 6 }}>Time Elapsed: <b>45 min / 120 min</b></div>
            <ProgressBar value={45} max={120} color={C.cyan} />
            <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>Est. completion: 75 min remaining</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <OutlineBtn small><Pause size={13} /> Pause</OutlineBtn>
              <OutlineBtn small><XCircle size={13} /> Abort</OutlineBtn>
            </div>
          </div>
          {/* Tunnel 2 Idle */}
          <div style={{ border: `1.5px solid ${C.borderLight}`, borderRadius: 12, padding: '18px', background: C.bg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 15, color: C.textPrimary }}>Blast Tunnel 2</div>
              <StatusChip label="IDLE" color={C.textMuted} bg={C.surface2} />
            </div>
            <div style={{ textAlign: 'center', padding: '24px 0', color: C.textMuted }}>
              <Snowflake size={32} style={{ margin: '0 auto 10px', display: 'block' }} />
              <div style={{ fontSize: 13 }}>Tunnel standby — ready for next blast cycle</div>
            </div>
            <TealBtn onClick={() => setBlastModal(true)} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              <Play size={14} /> Start New Blast Cycle
            </TealBtn>
          </div>
        </div>

        {/* Pre-Cool Schedule */}
        <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 10, fontFamily: "'Manrope', 'Segoe UI', sans-serif" }}>Pre-Cooling Schedule — Today</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface2 }}>
              {['Slot', 'Commodity', 'Target Temp', 'Scheduled Start', 'Duration', 'Status'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRE_COOL_SCHEDULE.map((row, i) => (
              <tr key={row.slot} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '9px 10px', fontWeight: 700, color: C.tealMid }}>{row.slot}</td>
                <td style={{ padding: '9px 10px', color: C.textPrimary }}>{row.commodity}</td>
                <td style={{ padding: '9px 10px', fontWeight: 700, color: C.cyan }}>{row.targetTemp}</td>
                <td style={{ padding: '9px 10px', color: C.textSecondary }}>{row.start}</td>
                <td style={{ padding: '9px 10px', color: C.textSecondary }}>{row.duration}</td>
                <td style={{ padding: '9px 10px' }}>{slotStatusBadge(row.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {blastModal && (
        <Modal title="Start New Blast Cycle" onClose={() => setBlastModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Commodity" value={newBlast.commodity} onChange={updateB('commodity')} placeholder="e.g. Frozen Prawns" />
            <Input label="Target Temperature (°C)" value={newBlast.targetTemp} onChange={updateB('targetTemp')} type="number" placeholder="-25" />
            <Input label="Estimated Duration (min)" value={newBlast.duration} onChange={updateB('duration')} type="number" placeholder="120" />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
              <OutlineBtn onClick={() => setBlastModal(false)}>Cancel</OutlineBtn>
              <TealBtn onClick={() => setBlastModal(false)}><Play size={13} /> Start Blast Cycle</TealBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── TAB 5 — DOCK & DISPATCH ─────────────────────────────────────────────────
const DockTab: React.FC = () => {
  const [scheduleModal, setScheduleModal] = useState(false);
  const [dockForm, setDockForm] = useState({ bay: '1', truck: '', time: '', batch: '' });
  const updateD = (k: keyof typeof dockForm) => (v: string) => setDockForm(f => ({ ...f, [k]: v }));

  const bayColor = (s: DockBay['status']): { bg: string; border: string; text: string; chip: string; chipBg: string } => {
    if (s === 'LOADING') return { bg: C.cyanLightBg, border: C.cyan, text: C.textPrimary, chip: C.cyan, chipBg: '#BAE6FD' };
    if (s === 'AVAILABLE') return { bg: C.greenLightBg, border: '#86EFAC', text: C.textPrimary, chip: C.green, chipBg: C.greenLightBg };
    if (s === 'SCHEDULED') return { bg: '#FEF3C7', border: '#FDE68A', text: C.textPrimary, chip: '#92400E', chipBg: '#FDE68A' };
    return { bg: C.redLightBg, border: '#FCA5A5', text: C.textPrimary, chip: C.red, chipBg: C.redLightBg };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-11 Bay Cards */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionTitle icon={<Truck size={18} />} title="Truck Bay Dock Scheduling & Cross-Dock Dispatch" code="WHS-11" style={{ marginBottom: 0 }} />
          <TealBtn onClick={() => setScheduleModal(true)}><Plus size={14} /> Schedule Bay</TealBtn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {DOCK_BAYS.map(bay => {
            const col = bayColor(bay.status);
            return (
              <div key={bay.id} style={{ border: `2px solid ${col.border}`, borderRadius: 10, padding: '14px 14px', background: col.bg }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: col.text }}>{bay.label}</span>
                  <StatusChip label={bay.status} color={col.chip} bg={col.chipBg} />
                </div>
                {bay.vehicle ? (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary }}>{bay.vehicle}</div>
                    <div style={{ fontSize: 11, color: C.textSecondary }}>ETA clear: {bay.eta}</div>
                  </>
                ) : (
                  <div style={{ fontSize: 12, color: C.textMuted }}>{bay.status === 'MAINTENANCE' ? 'Under maintenance — bay closed' : 'Ready for assignment'}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dispatch Schedule */}
        <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 10, fontFamily: "'Manrope', 'Segoe UI', sans-serif" }}>Today's Dispatch Schedule</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface2 }}>
              {['Time', 'Truck', 'Commodity / Batch', 'Destination', 'Bay', 'Type'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISPATCH_SCHEDULE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '9px 10px', fontWeight: 700, color: C.tealMid }}>{row.time}</td>
                <td style={{ padding: '9px 10px', fontWeight: 600, color: C.textPrimary }}>{row.truck}</td>
                <td style={{ padding: '9px 10px', color: C.textSecondary }}>{row.commodity}</td>
                <td style={{ padding: '9px 10px', color: C.textSecondary }}>{row.dest}</td>
                <td style={{ padding: '9px 10px', color: C.textPrimary }}>{row.bay}</td>
                <td style={{ padding: '9px 10px' }}>
                  <StatusChip label={row.type} color={row.type === 'Departure' ? C.cyan : C.green} bg={row.type === 'Departure' ? C.cyanLightBg : C.greenLightBg} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {scheduleModal && (
        <Modal title="Schedule Dock Bay" onClose={() => setScheduleModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Select label="Bay Number" value={dockForm.bay} onChange={updateD('bay')} options={DOCK_BAYS.filter(b => b.status !== 'MAINTENANCE').map(b => String(b.id))} />
            <Input label="Truck Number" value={dockForm.truck} onChange={updateD('truck')} placeholder="e.g. CC-REEFER-05" />
            <Input label="Scheduled Time" value={dockForm.time} onChange={updateD('time')} type="time" />
            <Input label="Cargo Batch ID" value={dockForm.batch} onChange={updateD('batch')} placeholder="e.g. BTH-2041" />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
              <OutlineBtn onClick={() => setScheduleModal(false)}>Cancel</OutlineBtn>
              <TealBtn onClick={() => setScheduleModal(false)}><CheckCircle2 size={13} /> Confirm Schedule</TealBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── TAB 6 — BILLING ─────────────────────────────────────────────────────────
const BillingTab: React.FC = () => {
  const [client, setClient] = useState('');
  const [commodity, setCommodity] = useState('Frozen Produce');
  const [chamber, setChamber] = useState('Deep Freeze');
  const [pallets, setPallets] = useState('');
  const [days, setDays] = useState('');
  const [blastCycles, setBlastCycles] = useState('0');
  const [invoice, setInvoice] = useState<{ storage: number; blast: number; surcharge: number; gst: number; total: number } | null>(null);

  const generate = () => {
    const rate = BILLING_RATES[chamber] ?? 38;
    const p = parseFloat(pallets) || 0;
    const d = parseFloat(days) || 0;
    const bc = parseFloat(blastCycles) || 0;
    const storage = rate * p * d;
    const blast = bc * 1200;
    const surcharge = (storage + blast) * 0.12;
    const subtotal = storage + blast + surcharge;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    setInvoice({ storage, blast, surcharge, gst, total });
  };

  const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

  const billStatusColor = (s: string) => {
    if (s === 'PAID') return { color: C.green, bg: C.greenLightBg };
    if (s === 'PENDING') return { color: '#92400E', bg: '#FEF3C7' };
    return { color: C.red, bg: C.redLightBg };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionTitle icon={<DollarSign size={18} />} title="Cold Storage Tariff, Power Surcharge & Billing Engine" code="WHS-12" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Calculator */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Billing Calculator</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Input label="Client Name" value={client} onChange={setClient} placeholder="e.g. Skylark Foods" />
              <Input label="Commodity Type" value={commodity} onChange={setCommodity} placeholder="e.g. Frozen Chicken" />
              <Select label="Chamber Type" value={chamber} onChange={setChamber} options={Object.keys(BILLING_RATES)} />
              <Input label="Number of Pallets" value={pallets} onChange={setPallets} type="number" placeholder="e.g. 60" />
              <Input label="Storage Days" value={days} onChange={setDays} type="number" placeholder="e.g. 20" />
              <Input label="Blast Tunnel Cycles Used" value={blastCycles} onChange={setBlastCycles} type="number" placeholder="0" />
              <TealBtn onClick={generate}><FileText size={14} /> Generate Invoice</TealBtn>
            </div>
          </div>

          {/* Rate Reference */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Rate Reference <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 400 }}>(DEMO RATES)</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.entries(BILLING_RATES).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: C.bg, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{k}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: C.tealMid }}>₹{v}/pallet/day</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: C.bg, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 13, color: C.textSecondary }}>Blast Tunnel</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: C.tealMid }}>₹1,200/cycle</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: C.bg, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 13, color: C.textSecondary }}>Power Surcharge</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: C.amber }}>12%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: C.bg, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 13, color: C.textSecondary }}>GST</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: C.amber }}>18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Output */}
        {invoice && (
          <div style={{ marginTop: 20, border: `2px solid ${C.tealMid}`, borderRadius: 12, padding: '18px 20px', background: C.tealLight }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 16, color: C.teal }}>ESTIMATED INVOICE — DEMO ONLY</div>
              <span style={{ fontSize: 11, background: C.amber + '33', color: '#92400E', border: `1px solid ${C.amber}`, borderRadius: 6, padding: '3px 10px', fontWeight: 600 }}>DEMO ESTIMATE</span>
            </div>
            <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 14 }}>
              Client: <b style={{ color: C.textPrimary }}>{client || 'N/A'}</b> · Commodity: <b style={{ color: C.textPrimary }}>{commodity}</b> · Chamber: <b style={{ color: C.textPrimary }}>{chamber}</b>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
              {[
                { label: `Storage Charges (${pallets || 0} pallets × ${days || 0} days × ₹${BILLING_RATES[chamber]}/day)`, val: invoice.storage },
                { label: `Blast Tunnel Charges (${blastCycles} cycles × ₹1,200)`, val: invoice.blast },
                { label: `Power Surcharge (12%)`, val: invoice.surcharge },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.textSecondary }}>{r.label}</span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{fmt(r.val)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.textSecondary }}>GST @ 18%</span>
                <span style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{fmt(invoice.gst)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: `2px solid ${C.tealMid}` }}>
              <span style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 16, color: C.teal }}>Total Payable (incl. GST 18%)</span>
              <span style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 22, color: C.teal }}>{fmt(invoice.total)}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Recent Bills */}
      <Card>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 14, fontFamily: "'Manrope', 'Segoe UI', sans-serif" }}>Recent Billing History</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface2 }}>
              {['Invoice No.', 'Client', 'Amount', 'Period', 'Status'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_BILLS.map((row, i) => {
              const sc = billStatusColor(row.status);
              return (
                <tr key={row.invoice} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: '9px 10px', fontWeight: 600, color: C.tealMid }}>{row.invoice}</td>
                  <td style={{ padding: '9px 10px', color: C.textPrimary }}>{row.client}</td>
                  <td style={{ padding: '9px 10px', fontWeight: 700, color: C.textPrimary }}>{row.amount}</td>
                  <td style={{ padding: '9px 10px', color: C.textMuted }}>{row.period}</td>
                  <td style={{ padding: '9px 10px' }}><StatusChip label={row.status} color={sc.color} bg={sc.bg} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// ─── TAB 7 — MAINTENANCE & ENERGY ────────────────────────────────────────────
const MaintenanceEnergyTab: React.FC = () => {
  const [maintModal, setMaintModal] = useState(false);
  const [newMaint, setNewMaint] = useState({ title: '', location: '', due: '', priority: 'MEDIUM' });
  const updateM = (k: keyof typeof newMaint) => (v: string) => setNewMaint(m => ({ ...m, [k]: v }));
  const maxKwh = Math.max(...ENERGY_MONTHS.map(m => m.kwh));

  const priorityColor = (p: string) => {
    if (p === 'HIGH') return { color: C.red, bg: C.redLightBg };
    if (p === 'MEDIUM') return { color: '#92400E', bg: '#FEF3C7' };
    return { color: C.green, bg: C.greenLightBg };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* WHS-13 Maintenance */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionTitle icon={<Wrench size={18} />} title="Preventative Chiller Maintenance Scheduler" code="WHS-13" style={{ marginBottom: 0 }} />
          <TealBtn onClick={() => setMaintModal(true)}><Plus size={14} /> Log New Maintenance</TealBtn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {MAINTENANCE_TASKS.map(task => {
            const pc = priorityColor(task.priority);
            return (
              <div key={task.id} style={{ border: `1.5px solid ${C.borderLight}`, borderRadius: 10, padding: '16px', background: C.bg, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{task.title}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{task.location}</div>
                  </div>
                  <StatusChip label={task.priority} color={pc.color} bg={pc.bg} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CalendarClock size={13} color={C.textMuted} />
                  <span style={{ fontSize: 12, color: C.textSecondary }}>Due: <b style={{ color: C.textPrimary }}>{task.due}</b></span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <TealBtn small><CalendarClock size={12} /> Schedule Service</TealBtn>
                  <OutlineBtn style={{ fontSize: 12, padding: '5px 12px' }}>View History</OutlineBtn>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* WHS-14 Energy Audit */}
      <Card>
        <SectionTitle icon={<Zap size={18} />} title="Energy Efficiency (kWh/Tonne) & Loss Prevention Audit" code="WHS-14" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Energy Consumed', value: '48,200', unit: 'kWh/month', icon: <Zap size={20} />, color: C.amber },
            { label: 'COP (Coefficient of Performance)', value: '2.8', unit: 'W/W', icon: <Gauge size={20} />, color: C.cyan },
            { label: 'kWh per Tonne', value: '3.4', unit: 'kWh/MT', icon: <Activity size={20} />, color: C.green },
          ].map(m => (
            <div key={m.label} style={{ border: `1.5px solid ${C.borderLight}`, borderRadius: 10, padding: '16px', background: C.bg, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${m.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color, flexShrink: 0 }}>
                {m.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{m.label}</div>
                <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 22, color: C.textPrimary }}>{m.value}</div>
                <div style={{ fontSize: 11, color: C.textSecondary }}>{m.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Bar Chart */}
        <div style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary, marginBottom: 14, fontFamily: "'Manrope', 'Segoe UI', sans-serif" }}>Monthly Energy Consumption (May – Oct 2026)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140, marginBottom: 24, padding: '0 8px' }}>
          {ENERGY_MONTHS.map(m => {
            const barH = Math.round((m.kwh / maxKwh) * 110);
            const isLast = m.month === 'Oct';
            return (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: isLast ? C.tealMid : C.textMuted }}>{(m.kwh / 1000).toFixed(1)}k</div>
                <div style={{ width: '100%', background: isLast ? C.tealMid : C.cyan, borderRadius: '6px 6px 0 0', height: barH, opacity: isLast ? 1 : 0.7, transition: 'height 0.4s' }} />
                <div style={{ fontSize: 11, fontWeight: 600, color: isLast ? C.tealMid : C.textSecondary }}>{m.month}</div>
              </div>
            );
          })}
        </div>

        {/* Chamber Efficiency Table */}
        <div style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary, marginBottom: 10, fontFamily: "'Manrope', 'Segoe UI', sans-serif" }}>Energy Efficiency by Chamber</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: C.surface2 }}>
              {['Chamber', 'kWh / MT', 'Insulation Efficiency %', 'Rating'].map(h => (
                <th key={h} style={{ padding: '8px 10px', textAlign: 'left', fontWeight: 600, color: C.textSecondary, fontSize: 12, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ENERGY_BY_CHAMBER.map((row, i) => (
              <tr key={row.chamber} style={{ background: i % 2 === 0 ? C.surface : C.bg, borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '9px 10px', color: C.textPrimary }}>{row.chamber}</td>
                <td style={{ padding: '9px 10px', fontWeight: 700, color: row.kwhMt > 5 ? C.red : row.kwhMt > 3.5 ? C.amber : C.green }}>{row.kwhMt}</td>
                <td style={{ padding: '9px 10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ProgressBar value={row.insulation} max={100} color={row.insulation >= 95 ? C.green : C.amber} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.textPrimary, minWidth: 36 }}>{row.insulation}%</span>
                  </div>
                </td>
                <td style={{ padding: '9px 10px' }}>
                  <StatusChip label={row.insulation >= 95 ? 'EFFICIENT' : 'REVIEW'} color={row.insulation >= 95 ? C.green : '#92400E'} bg={row.insulation >= 95 ? C.greenLightBg : '#FEF3C7'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {maintModal && (
        <Modal title="Log New Maintenance Task" onClose={() => setMaintModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Task Title" value={newMaint.title} onChange={updateM('title')} placeholder="e.g. Fan Motor Replacement" />
            <Input label="Location / Equipment" value={newMaint.location} onChange={updateM('location')} placeholder="e.g. Chamber A" />
            <Input label="Due Date" value={newMaint.due} onChange={updateM('due')} type="date" />
            <Select label="Priority" value={newMaint.priority} onChange={updateM('priority')} options={['HIGH', 'MEDIUM', 'LOW']} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
              <OutlineBtn onClick={() => setMaintModal(false)}>Cancel</OutlineBtn>
              <TealBtn onClick={() => setMaintModal(false)}><CheckCircle2 size={13} /> Log Task</TealBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const TABS = [
  { label: 'Overview', icon: <BarChart3 size={15} /> },
  { label: 'Inventory', icon: <Package size={15} /> },
  { label: 'Inward', icon: <ClipboardList size={15} /> },
  { label: 'Blast & Cooling', icon: <Snowflake size={15} /> },
  { label: 'Dock & Dispatch', icon: <Truck size={15} /> },
  { label: 'Billing', icon: <FileText size={15} /> },
  { label: 'Maintenance & Energy', icon: <Wrench size={15} /> },
];

export const WarehouseAdminPortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const tabContent = [
    <OverviewTab />,
    <InventoryTab />,
    <InwardTab />,
    <BlastTab />,
    <DockTab />,
    <BillingTab />,
    <MaintenanceEnergyTab />,
  ];

  return (
    <div className="warehouse-portal" style={{ background: C.bg, minHeight: '100%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 24px 48px' }}>

        {/* ── HEADER ── */}
        <div style={{ background: C.surface, borderRadius: 14, padding: '22px 24px', borderLeft: `5px solid ${C.tealMid}`, border: `1px solid ${C.borderLight}`, borderLeftWidth: 5, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Warehouse size={26} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.tealMid, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
              APEX MEGA COLD LOGISTICS
            </div>
            <h1 style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 22, color: C.textPrimary, margin: 0, lineHeight: 1.2 }}>
              Warehouse Administration
            </h1>
            <div style={{ fontSize: 13, color: C.textSecondary, marginTop: 3 }}>
              Multi-Chamber Cold Storage · Inventory Control · Compliance
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ background: C.tealLight, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: C.tealMid }}>
              ✓ 14 / 14 FEATURES ACTIVE
            </div>
            <TealBtn onClick={() => setVerifyModalOpen(true)}>
              <ShieldCheck size={14} /> Verify Features
            </TealBtn>
          </div>
        </div>

        {/* ── QUICK STATS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'Total Capacity', value: '14,200 MT', sub: 'Across 6 chambers', icon: <Warehouse size={20} />, color: C.tealMid, bg: C.tealLight },
            { label: 'Chambers Active', value: '6 / 6', sub: 'All chambers operational', icon: <CheckCircle2 size={20} />, color: C.green, bg: C.greenLightBg },
            { label: 'Temp Alerts', value: '0', sub: 'All zones in range', icon: <Thermometer size={20} />, color: C.cyan, bg: C.cyanLightBg },
          ].map(s => (
            <div key={s.label} style={{ background: C.surface, border: `1px solid ${C.borderLight}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontFamily: "'Manrope', 'Segoe UI', sans-serif", fontWeight: 800, fontSize: 22, color: C.textPrimary, lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 1 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TAB BAR ── */}
        <div style={{ background: C.surface, borderRadius: 12, padding: '4px 6px', border: `1px solid ${C.borderLight}`, display: 'flex', gap: 2, marginBottom: 20, overflowX: 'auto' }}>
          {TABS.map((tab, i) => {
            const active = activeTab === i;
            return (
              <button key={tab.label} onClick={() => setActiveTab(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 9, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: 'nowrap',
                  background: active ? C.teal : 'transparent', color: active ? '#fff' : C.textSecondary, transition: 'all 0.2s',
                }}>
                {tab.icon} {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <div style={{ minHeight: 400 }}>
          {tabContent[activeTab]}
        </div>

        {/* ── SHARED COMPONENTS ── */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SharedReportsAnalyticsExport portalType="warehouse" />
          <SharedAISpoilageAlerts portalType="warehouse" />
        </div>
      </div>

      {verifyModalOpen && (
        <VerificationMatrixModal
          portalType="warehouse"
          onClose={() => setVerifyModalOpen(false)}
        />
      )}
    </div>
  );
};
