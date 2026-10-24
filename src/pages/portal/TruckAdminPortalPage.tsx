import React, { useState } from 'react';
import { VerificationMatrixModal } from '../../components/portal/VerificationMatrixModal';
import { SharedShipmentTrackerETA } from '../../components/portal/shared/SharedShipmentTrackerETA';
import { SharedAISpoilageAlerts } from '../../components/portal/shared/SharedAISpoilageAlerts';
import { SharedEmergencyCargoRescue } from '../../components/portal/shared/SharedEmergencyCargoRescue';
import { SharedReportsAnalyticsExport } from '../../components/portal/shared/SharedReportsAnalyticsExport';

// ─── DEMO DATA ────────────────────────────────────────────────────────────────

// DEMO DATA – Fleet vehicles
const DEMO_FLEET_TABLE = [
  { id: 'MH-12-AB-4432', route: 'Pune → Mumbai', location: 'Khopoli Toll', temp: '-18.2°C', status: 'In Transit' },
  { id: 'MH-14-CD-8821', route: 'Nashik → Nagpur', location: 'Igatpuri Ghat', temp: '-17.9°C', status: 'In Transit' },
  { id: 'MH-04-EF-2290', route: 'Mumbai → Pune', location: 'Lonavala', temp: '-19.1°C', status: 'In Transit' },
  { id: 'MH-20-GH-5573', route: 'Nagpur → Nashik', location: 'Wardha Bypass', temp: '-16.4°C', status: 'Delayed' },
  { id: 'MH-43-JK-1109', route: 'Pune → Nashik', location: 'Sinnar Hub', temp: '-18.8°C', status: 'Loading' },
  { id: 'MH-11-LM-3340', route: 'Nashik → Mumbai', location: 'Kasara Ghat', temp: '-17.2°C', status: 'In Transit' },
];

// DEMO DATA – Deviation alerts
const DEMO_DEVIATION_ALERTS = [
  { truck: 'MH-20-GH-5573', type: 'Unauthorized Stop', detail: 'Stopped >15 min at Wardha Bypass (non-approved halt)', time: '14:32', severity: 'HIGH' },
  { truck: 'MH-14-CD-8821', type: 'Route Deviation', detail: 'Deviated 4.2 km from planned route near Igatpuri', time: '13:58', severity: 'MEDIUM' },
];

// DEMO DATA – Drivers
const DEMO_DRIVERS = [
  { name: 'Rajesh Kumar',    shift: '06:00', driven: 6.5,  remaining: 4.5, status: 'Active',   leg: 'Origin → Relay' },
  { name: 'Suresh Patel',    shift: '12:30', driven: 0,    remaining: 11,  status: 'Rested',   leg: 'Relay → Destination' },
  { name: 'Anil Deshmukh',   shift: '04:00', driven: 9.2,  remaining: 1.8, status: 'Fatigued', leg: 'Origin → Relay' },
  { name: 'Manoj Shinde',    shift: '08:00', driven: 4.1,  remaining: 6.9, status: 'Active',   leg: 'Relay → Destination' },
  { name: 'Vivek Chaudhari', shift: '00:00', driven: 11.0, remaining: 0,   status: 'Fatigued', leg: 'Emergency Reserve' },
];

// DEMO DATA – Reefer health
const DEMO_REEFER_HEALTH = [
  { truck: 'MH-12-AB-4432', health: 94, vibration: '0.8 g', freon: '145 PSI', airflow: '1240 CFM', status: 'OK' },
  { truck: 'MH-04-EF-2290', health: 71, vibration: '1.4 g', freon: '118 PSI', airflow: '990 CFM',  status: 'Warning' },
  { truck: 'MH-43-JK-1109', health: 43, vibration: '2.9 g', freon: '88 PSI',  airflow: '640 CFM',  status: 'Critical' },
];

// DEMO DATA – Route options
const DEMO_ROUTES = [
  { label: 'Recommended (AI Optimal)', distance: '242 km', tolls: '₹680', eta: '4h 12m', color: '#F2AE32', type: 'recommended' },
  { label: 'Alternate 1 (Via Pune Bypass)', distance: '261 km', tolls: '₹520', eta: '4h 48m', color: '#60A5FA', type: 'alternate1' },
  { label: 'Alternate 2 (NH-160)', distance: '289 km', tolls: '₹340', eta: '5h 22m', color: '#8B9BB4', type: 'alternate2' },
];

// DEMO DATA – Fuel efficiency table
const DEMO_FUEL_TABLE = [
  { truck: 'MH-12-AB-4432', diesel: '22.4', reefer: '1.9', co2: '59.6', efficiency: 'Good' },
  { truck: 'MH-14-CD-8821', diesel: '25.1', reefer: '2.2', co2: '66.8', efficiency: 'Average' },
  { truck: 'MH-04-EF-2290', diesel: '24.8', reefer: '2.1', co2: '66.0', efficiency: 'Average' },
  { truck: 'MH-20-GH-5573', diesel: '28.9', reefer: '2.6', co2: '76.9', efficiency: 'Poor' },
  { truck: 'MH-43-JK-1109', diesel: '21.7', reefer: '1.8', co2: '57.8', efficiency: 'Good' },
];

// DEMO DATA – Maintenance schedule
const DEMO_MAINTENANCE = [
  { truck: 'MH-12-AB-4432', lastService: '2025-09-14', nextDue: '2025-12-14', type: 'Full Service', status: 'OK' },
  { truck: 'MH-14-CD-8821', lastService: '2025-10-01', nextDue: '2026-01-01', type: 'Oil & Filter', status: 'OK' },
  { truck: 'MH-04-EF-2290', lastService: '2025-08-20', nextDue: '2025-11-20', type: 'Brake Inspection', status: 'Overdue' },
  { truck: 'MH-20-GH-5573', lastService: '2025-10-10', nextDue: '2026-01-10', type: 'Reefer Tune-up', status: 'Upcoming' },
  { truck: 'MH-43-JK-1109', lastService: '2025-07-05', nextDue: '2025-10-05', type: 'Full Service', status: 'Overdue' },
];

// DEMO DATA – Emergency backup trucks
const DEMO_BACKUP_TRUCKS = [
  { id: 'MH-09-PQ-7765', driver: 'Dinesh Rao', eta: '18 min', distance: '9.4 km', available: true },
  { id: 'MH-18-RS-2241', driver: 'Pradeep Singh', eta: '31 min', distance: '17.1 km', available: true },
  { id: 'MH-22-TU-4490', driver: 'Kedar Jadhav', eta: '47 min', distance: '24.8 km', available: true },
];

// DEMO DATA – Emergency contacts
const DEMO_EMERGENCY_CONTACTS = [
  { name: 'Fleet Ops Control Room', number: '1800-222-9001', role: 'Primary Dispatch' },
  { name: 'Roadside Assistance', number: '+91-98220-11234', role: 'Breakdown Response' },
  { name: 'Medical Emergency', number: '108', role: 'Ambulance' },
  { name: 'Highway Police', number: '100', role: 'Traffic/Accident' },
];

// ─── PALETTE CONSTANTS ────────────────────────────────────────────────────────
const C = {
  bg:        '#111418',
  surface:   '#1C2028',
  surface2:  '#13161B',
  border:    '#2E3440',
  textPri:   '#E8EAF0',
  textSec:   '#8B9BB4',
  amber:     '#F2AE32',
  green:     '#22C55E',
  red:       '#EF4444',
  blue:      '#60A5FA',
};

const BARLOW: React.CSSProperties = { fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif" };
const INTER: React.CSSProperties  = { fontFamily: "'Inter', system-ui, sans-serif" };

// ─── SHARED STYLE HELPERS ─────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  padding: '16px 20px',
};

const tag = (color: string): React.CSSProperties => ({
  background: color + '22',
  color: color,
  border: `1px solid ${color}44`,
  borderRadius: 4,
  padding: '2px 8px',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.05em',
  ...BARLOW,
});

const btnPrimary: React.CSSProperties = {
  background: C.amber,
  color: '#111418',
  border: 'none',
  borderRadius: 6,
  padding: '8px 18px',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 13,
  letterSpacing: '0.04em',
  ...BARLOW,
};

const btnSecondary: React.CSSProperties = {
  background: 'transparent',
  color: C.amber,
  border: `1px solid ${C.amber}`,
  borderRadius: 6,
  padding: '7px 16px',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 13,
  ...BARLOW,
};

const inputStyle: React.CSSProperties = {
  background: C.surface2,
  border: `1px solid ${C.border}`,
  borderRadius: 6,
  color: C.textPri,
  padding: '8px 12px',
  fontSize: 13,
  width: '100%',
  boxSizing: 'border-box',
  ...INTER,
};

const selectStyle: React.CSSProperties = { ...inputStyle };

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  fontSize: 11,
  fontWeight: 700,
  color: C.textSec,
  borderBottom: `1px solid ${C.border}`,
  letterSpacing: '0.08em',
  ...BARLOW,
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: 13,
  color: C.textPri,
  borderBottom: `1px solid ${C.border}22`,
  ...INTER,
};

// ─── SECTION LABEL ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ code: string; title: string }> = ({ code, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
    <span style={tag(C.amber)}>{code}</span>
    <h3 style={{ ...BARLOW, color: C.textPri, margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '0.04em' }}>
      {title}
    </h3>
  </div>
);

// ─── STATUS COLOR ─────────────────────────────────────────────────────────────
const statusColor = (s: string): string => {
  if (/transit|active|ok|good/i.test(s)) return C.green;
  if (/warn|medium|upcoming|average/i.test(s)) return C.amber;
  if (/critical|high|fatigued|overdue|poor|delayed/i.test(s)) return C.red;
  if (/rest/i.test(s)) return C.blue;
  return C.textSec;
};

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
interface KPICardProps { label: string; value: string; unit?: string; color?: string }
const KPICard: React.FC<KPICardProps> = ({ label, value, unit, color = C.amber }) => (
  <div style={{ ...card, flex: 1, minWidth: 140 }}>
    <div style={{ fontSize: 11, color: C.textSec, letterSpacing: '0.1em', marginBottom: 6, ...BARLOW }}>
      {label} <span style={{ color: C.textSec, fontSize: 10 }}>· DEMO</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span style={{ fontSize: 32, fontWeight: 700, color, lineHeight: 1, ...BARLOW }}>{value}</span>
      {unit && <span style={{ fontSize: 13, color: C.textSec, ...INTER }}>{unit}</span>}
    </div>
  </div>
);

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
const ProgressBar: React.FC<{ value: number; max: number; color?: string; height?: number }> = ({
  value, max, color = C.amber, height = 6,
}) => (
  <div style={{ background: C.surface2, borderRadius: height, height, overflow: 'hidden', width: '100%' }}>
    <div style={{
      width: `${Math.min(100, (value / max) * 100)}%`,
      background: color,
      height: '100%',
      borderRadius: height,
      transition: 'width 0.4s',
    }} />
  </div>
);

// ─── INDIA MAP SVG ────────────────────────────────────────────────────────────
const IndiaMapSVG: React.FC = () => (
  <svg viewBox="0 0 400 260" style={{ width: '100%', maxWidth: 480, display: 'block', margin: '0 auto' }}>
    <rect width="400" height="260" rx="8" fill={C.surface2} />
    {[40, 80, 120, 160, 200, 240].map(y => (
      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={C.border} strokeWidth="0.5" />
    ))}
    {[50, 100, 150, 200, 250, 300, 350].map(x => (
      <line key={x} x1={x} y1="0" x2={x} y2="260" stroke={C.border} strokeWidth="0.5" />
    ))}
    {/* Alternate route */}
    <polyline points="80,200 160,180 220,140 300,100 340,60" fill="none" stroke="#8B9BB4" strokeWidth="2" strokeDasharray="6,4" />
    {/* Recommended route + glow */}
    <polyline points="80,200 130,160 200,120 280,80 340,60" fill="none" stroke={C.amber} strokeWidth="7" opacity="0.18" />
    <polyline points="80,200 130,160 200,120 280,80 340,60" fill="none" stroke={C.amber} strokeWidth="3" />
    {/* Nodes */}
    {[
      { cx: 80,  cy: 200, label: 'Pune',     dy: 16 },
      { cx: 130, cy: 160, label: 'Lonavala', dy: 16 },
      { cx: 200, cy: 120, label: 'Nashik',   dy: -8 },
      { cx: 280, cy: 80,  label: 'Nagpur',   dy: -8 },
      { cx: 340, cy: 60,  label: 'Mumbai',   dy: -8 },
    ].map(n => (
      <g key={n.label}>
        <circle cx={n.cx} cy={n.cy} r="10" fill={C.amber} opacity="0.18" />
        <circle cx={n.cx} cy={n.cy} r="6"  fill={C.amber} />
        <text x={n.cx} y={n.cy + n.dy} textAnchor="middle" fill={C.textPri}
          fontSize="12" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="600">
          {n.label}
        </text>
      </g>
    ))}
    {/* Legend */}
    <line x1="20" y1="240" x2="50" y2="240" stroke={C.amber} strokeWidth="3" />
    <text x="56" y="244" fill={C.textPri} fontSize="11" fontFamily="'Barlow Condensed', Arial, sans-serif">Recommended</text>
    <line x1="160" y1="240" x2="190" y2="240" stroke="#8B9BB4" strokeWidth="2" strokeDasharray="4,3" />
    <text x="196" y="244" fill={C.textSec} fontSize="11" fontFamily="'Barlow Condensed', Arial, sans-serif">Alternate</text>
    <text x="8" y="16" fill={C.amber} fontSize="11" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700" letterSpacing="1">
      LIVE ROUTE MAP · DEMO
    </text>
  </svg>
);

// ─── AIRFLOW SVG ──────────────────────────────────────────────────────────────
const AirflowSVG: React.FC = () => (
  <svg viewBox="0 0 360 180" style={{ width: '100%', maxWidth: 400, display: 'block', margin: '0 auto' }}>
    <defs>
      <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#60A5FA" />
      </marker>
    </defs>
    <rect width="360" height="180" rx="6" fill={C.surface2} />
    <rect x="30" y="30" width="300" height="120" rx="4" fill="none" stroke={C.border} strokeWidth="2" />
    <line x1="200" y1="30" x2="200" y2="150" stroke={C.border} strokeWidth="1" strokeDasharray="4,3" />
    {/* Blind spot */}
    <rect x="205" y="95" width="80" height="50" rx="3" fill={C.red} opacity="0.22" />
    <rect x="205" y="95" width="80" height="50" rx="3" fill="none" stroke={C.red} strokeWidth="1.5" strokeDasharray="4,3" />
    <text x="245" y="125" textAnchor="middle" fill={C.red} fontSize="10"
      fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700">BLIND SPOT</text>
    {/* Airflow arrows */}
    <line x1="50" y1="60" x2="120" y2="60" stroke={C.blue} strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <line x1="50" y1="90" x2="120" y2="90" stroke={C.blue} strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <line x1="50" y1="120" x2="120" y2="120" stroke={C.blue} strokeWidth="2" markerEnd="url(#arrowBlue)" />
    <line x1="130" y1="60" x2="195" y2="60" stroke={C.blue} strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowBlue)" />
    <line x1="130" y1="90" x2="195" y2="90" stroke={C.blue} strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowBlue)" />
    {/* Evaporator */}
    <rect x="35" y="45" width="14" height="90" rx="2" fill={C.blue} opacity="0.4" />
    <text x="42" y="170" textAnchor="middle" fill={C.blue} fontSize="9"
      fontFamily="'Barlow Condensed', Arial, sans-serif">EVAP</text>
    <text x="180" y="24" textAnchor="middle" fill={C.textSec} fontSize="10"
      fontFamily="'Barlow Condensed', Arial, sans-serif">FRONT</text>
    <text x="320" y="24" textAnchor="middle" fill={C.textSec} fontSize="10"
      fontFamily="'Barlow Condensed', Arial, sans-serif">REAR</text>
    <text x="8" y="12" fill={C.amber} fontSize="10" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700">
      AIRFLOW DIAGRAM · DEMO
    </text>
  </svg>
);

// ─── AXLE WEIGHT SVG ──────────────────────────────────────────────────────────
const AxleWeightSVG: React.FC<{ front: number; rear: number; gvw: number }> = ({ front, rear, gvw }) => {
  const frontPct = gvw > 0 ? (front / gvw) * 100 : 0;
  const rearPct  = gvw > 0 ? (rear  / gvw) * 100 : 0;
  const frontColor = front > 6000 ? C.red : front > 5000 ? C.amber : C.green;
  const rearColor  = rear  > 11000 ? C.red : rear  > 9500  ? C.amber : C.green;
  return (
    <svg viewBox="0 0 340 160" style={{ width: '100%', maxWidth: 380, display: 'block', margin: '0 auto' }}>
      <rect width="340" height="160" rx="6" fill={C.surface2} />
      <rect x="60" y="60" width="220" height="50" rx="4" fill={C.border} />
      <rect x="250" y="40" width="30" height="20" rx="2" fill={C.border} />
      <ellipse cx="100" cy="118" rx="18" ry="18" fill={C.surface} stroke={frontColor} strokeWidth="3" />
      <ellipse cx="240" cy="118" rx="18" ry="18" fill={C.surface} stroke={rearColor}  strokeWidth="3" />
      <line x1="100" y1="100" x2="100" y2="50" stroke={frontColor} strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="240" y1="100" x2="240" y2="50" stroke={rearColor}  strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="100" y="45" textAnchor="middle" fill={frontColor} fontSize="13"
        fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700">{front.toLocaleString()} kg</text>
      <text x="100" y="30" textAnchor="middle" fill={C.textSec} fontSize="10"
        fontFamily="'Barlow Condensed', Arial, sans-serif">FRONT ({frontPct.toFixed(0)}%)</text>
      <text x="240" y="45" textAnchor="middle" fill={rearColor} fontSize="13"
        fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700">{rear.toLocaleString()} kg</text>
      <text x="240" y="30" textAnchor="middle" fill={C.textSec} fontSize="10"
        fontFamily="'Barlow Condensed', Arial, sans-serif">REAR ({rearPct.toFixed(0)}%)</text>
      <text x="170" y="150" textAnchor="middle" fill={C.textSec} fontSize="10"
        fontFamily="'Barlow Condensed', Arial, sans-serif">Legal: Front ≤6000 kg · Rear ≤11500 kg · GVW ≤49,000 kg</text>
      <text x="8" y="12" fill={C.amber} fontSize="10" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700">
        AXLE LOAD DIAGRAM · DEMO
      </text>
    </svg>
  );
};

// ─── MAINTENANCE MODAL ────────────────────────────────────────────────────────
interface MaintenanceModalProps { onClose: () => void }
const MaintenanceModal: React.FC<MaintenanceModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({ truck: '', date: '', type: '', notes: '' });
  const [saved, setSaved] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));
  const submit = () => { if (form.truck && form.date && form.type) setSaved(true); };
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000000AA', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...card, width: 440, maxWidth: '95vw' }}>
        <h3 style={{ ...BARLOW, color: C.amber, margin: '0 0 16px', fontSize: 20 }}>SCHEDULE SERVICE</h3>
        {saved ? (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
            <div style={{ color: C.green, fontSize: 16, ...BARLOW, fontWeight: 700 }}>Service Scheduled!</div>
            <div style={{ color: C.textSec, fontSize: 13, marginTop: 6, ...INTER }}>
              {form.truck} · {form.type} · {form.date}
            </div>
            <button style={{ ...btnPrimary, marginTop: 16 }} onClick={onClose}>Close</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>VEHICLE ID</label>
              <input style={inputStyle} value={form.truck} onChange={e => set('truck', e.target.value)} placeholder="e.g. MH-12-AB-4432" />
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>SERVICE DATE</label>
              <input style={inputStyle} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>SERVICE TYPE</label>
              <select style={selectStyle} value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="">Select type…</option>
                <option>Full Service</option>
                <option>Oil & Filter</option>
                <option>Brake Inspection</option>
                <option>Reefer Tune-up</option>
                <option>Tyre Change</option>
                <option>Engine Check</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>NOTES</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 60 }} value={form.notes}
                onChange={e => set('notes', e.target.value)} placeholder="Additional notes…" />
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
              <button style={btnSecondary} onClick={onClose}>Cancel</button>
              <button style={btnPrimary} onClick={submit}>Schedule</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── RELAY CONFIRMED TOAST ────────────────────────────────────────────────────
const RelayConfirmed: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
  <div style={{
    background: C.green + '22', border: `1px solid ${C.green}55`, borderRadius: 8,
    padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
  }}>
    <span style={{ fontSize: 20 }}>✅</span>
    <div style={{ flex: 1 }}>
      <div style={{ color: C.green, fontWeight: 700, ...BARLOW, fontSize: 15 }}>RELAY HANDOVER SCHEDULED</div>
      <div style={{ color: C.textSec, fontSize: 12, ...INTER }}>
        Rajesh Kumar → Suresh Patel at Nashik Relay Hub · ETA 16:45
      </div>
    </div>
    <button style={{ ...btnSecondary, fontSize: 11, padding: '4px 10px' }} onClick={onDismiss}>Dismiss</button>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
export const TruckAdminPortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);

  // Tab 2
  const [relayConfirmed, setRelayConfirmed] = useState(false);

  // Tab 3
  const [haltMinutes, setHaltMinutes] = useState<number>(45);
  const [commodity, setCommodity] = useState('Frozen Vegetables');
  const [spoilageResult, setSpoilageResult] = useState<number | null>(null);
  const calcSpoilage = () => {
    const base: Record<string, number> = {
      'Frozen Vegetables': 0.8,
      'Frozen Fish':       1.2,
      'Ice Cream':         1.5,
      'Dairy Products':    0.6,
      'Frozen Meat':       0.9,
    };
    const rate = base[commodity] ?? 1.0;
    const risk = Math.min(100, haltMinutes * rate * 0.9);
    setSpoilageResult(Math.round(risk));
  };

  // Tab 4
  const [routeOrigin, setRouteOrigin] = useState('Pune');
  const [routeDest, setRouteDest]     = useState('Mumbai');
  const [showRoutes, setShowRoutes]   = useState(false);
  const [tcDist,   setTcDist]   = useState<number>(242);
  const [tcFuelR,  setTcFuelR]  = useState<number>(98.5);
  const [tcEffic,  setTcEffic]  = useState<number>(4.2);
  const [tcToll,   setTcToll]   = useState<number>(680);
  const [tcAllow,  setTcAllow]  = useState<number>(850);
  const fuelCost  = tcEffic > 0 ? (tcDist / tcEffic) * tcFuelR : 0;
  const totalCost = fuelCost + tcToll + tcAllow;

  // Tab 5
  const [co2Cargo, setCo2Cargo] = useState<number>(18);
  const [co2Dist,  setCo2Dist]  = useState<number>(242);
  const co2Truck = (co2Dist * 0.27).toFixed(1);
  const co2Rail  = (co2Dist * 0.03 * co2Cargo).toFixed(1);

  // Tab 6
  const [frontAxle, setFrontAxle] = useState<number>(5400);
  const [rearAxle,  setRearAxle]  = useState<number>(10200);
  const [gvw,       setGvw]       = useState<number>(15600);
  const frontOK = frontAxle <= 6000;
  const rearOK  = rearAxle  <= 11500;
  const gvwOK   = gvw       <= 49000;

  // Tab 7
  const [strandedTruck, setStrandedTruck] = useState('MH-04-EF-2290');
  const [incidentDesc,  setIncidentDesc]  = useState('');
  const [backupResults, setBackupResults] = useState(false);

  const TABS = [
    'Fleet Overview',
    'Driver & Relay',
    'Reefer Health',
    'Route & Tolls',
    'Fuel & Emissions',
    'Load & Maintenance',
    'Emergency',
  ];

  // ── TAB 1 ─────────────────────────────────────────────────────────────────
  const renderFleetOverview = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <KPICard label="TOTAL FLEET"    value="128"  unit="trucks"  color={C.amber} />
        <KPICard label="IN TRANSIT"     value="114"  unit="active"  color={C.green} />
        <KPICard label="TEMP BREACHES"  value="0"    unit="alerts"  color={C.green} />
        <KPICard label="AVG SPEED"      value="68.4" unit="km/h"    color={C.blue}  />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        <div style={{ ...card, border: `1.5px solid ${C.amber}55` }}>
          <SectionLabel code="TRK-01 · TRK-02" title="Route Map & Live GPS" />
          <IndiaMapSVG />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={tag(C.green)}>● 114 IN TRANSIT</span>
            <span style={tag(C.amber)}>● 6 DELAYED</span>
            <span style={tag(C.blue)}>● 8 LOADING</span>
          </div>
        </div>

        <div style={card}>
          <SectionLabel code="TRK-10" title="Deviation Alerts" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {DEMO_DEVIATION_ALERTS.map((a, i) => (
              <div key={i} style={{
                background: C.surface2,
                border: `1px solid ${statusColor(a.severity)}44`,
                borderLeft: `3px solid ${statusColor(a.severity)}`,
                borderRadius: 6, padding: '10px 12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ ...BARLOW, fontWeight: 700, color: statusColor(a.severity), fontSize: 13 }}>
                    {a.type}
                  </span>
                  <span style={tag(statusColor(a.severity))}>{a.severity}</span>
                </div>
                <div style={{ fontSize: 12, color: C.textSec, ...INTER }}>{a.detail}</div>
                <div style={{ fontSize: 11, color: C.textSec, marginTop: 4, ...BARLOW }}>
                  {a.truck} · {a.time}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <SectionLabel code="TRK-05" title="Road Alerts" />
            <div style={{
              background: C.surface2, border: `1px solid ${C.red}44`,
              borderLeft: `3px solid ${C.red}`, borderRadius: 6, padding: '10px 12px',
            }}>
              <div style={{ color: C.red, fontWeight: 700, fontSize: 13, ...BARLOW }}>⚠ DANGEROUS ROUTE SEGMENT</div>
              <div style={{ fontSize: 12, color: C.textSec, ...INTER }}>
                Igatpuri Ghat (NH-3): Fog + wet road advisory. Reduce speed.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-02" title="Fleet Status Table" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Vehicle ID','Route','Current Location','Reefer Temp','Status','Action'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_FLEET_TABLE.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : C.surface2 + '80' }}>
                  <td style={tdStyle}>
                    <span style={{ ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif", color: C.amber, fontWeight: 700 }}>
                      {row.id}
                    </span>
                  </td>
                  <td style={tdStyle}>{row.route}</td>
                  <td style={tdStyle}>{row.location}</td>
                  <td style={tdStyle}>
                    <span style={{ color: C.blue, ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>
                      {row.temp}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={tag(statusColor(row.status))}>{row.status}</span>
                  </td>
                  <td style={tdStyle}>
                    <button style={{ ...btnSecondary, fontSize: 11, padding: '3px 10px' }}>Track</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-02" title="Shipment ETA Tracker" />
        <SharedShipmentTrackerETA />
      </div>
    </div>
  );

  // ── TAB 2 ─────────────────────────────────────────────────────────────────
  const renderDriverRelay = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={card}>
        <SectionLabel code="TRK-03" title="Relay Planner" />
        {relayConfirmed && <RelayConfirmed onDismiss={() => setRelayConfirmed(false)} />}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 12, alignItems: 'center' }}>
          <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 10, color: C.textSec, letterSpacing: '0.1em', ...BARLOW, marginBottom: 6 }}>LEG 1 · ORIGIN</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.amber, ...BARLOW }}>PUNE</div>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 4 }}>Depart: 06:00</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>DRIVER</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPri, ...BARLOW }}>Rajesh Kumar</div>
              <span style={tag(C.green)}>Active</span>
            </div>
          </div>
          <div style={{ color: C.amber, fontSize: 22, fontWeight: 700 }}>→</div>
          <div style={{ background: C.surface2, border: `1.5px solid ${C.amber}55`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 10, color: C.amber, letterSpacing: '0.1em', ...BARLOW, marginBottom: 6 }}>RELAY HUB</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.amber, ...BARLOW }}>NASHIK</div>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 4 }}>Handover: ~16:45</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>HANDOVER POINT</div>
              <div style={{ fontSize: 13, color: C.textSec, ...INTER }}>Nashik Cold Hub, Plot C-12</div>
            </div>
          </div>
          <div style={{ color: C.amber, fontSize: 22, fontWeight: 700 }}>→</div>
          <div style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 10, color: C.textSec, letterSpacing: '0.1em', ...BARLOW, marginBottom: 6 }}>LEG 2 · DESTINATION</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.amber, ...BARLOW }}>NAGPUR</div>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 4 }}>Arrive: ~22:00</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>DRIVER</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPri, ...BARLOW }}>Suresh Patel</div>
              <span style={tag(C.blue)}>Rested</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button style={btnPrimary} onClick={() => setRelayConfirmed(true)}>Schedule Relay Handover</button>
          <button style={btnSecondary}>Edit Route</button>
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-13" title="Driver Hours & Safety Monitoring" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Driver','Leg','Shift Start','Hours Driven','Hours Remaining','Duty Cycle','Status'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DEMO_DRIVERS.map((d, i) => {
                const totalAllowed = 11;
                const pct = d.driven / totalAllowed;
                const barColor = pct > 0.9 ? C.red : pct > 0.7 ? C.amber : C.green;
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : C.surface2 + '80' }}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>{d.name}</td>
                    <td style={{ ...tdStyle, fontSize: 11, color: C.textSec }}>{d.leg}</td>
                    <td style={tdStyle}>{d.shift}</td>
                    <td style={{ ...tdStyle, ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif", color: barColor }}>
                      {d.driven} h
                    </td>
                    <td style={{ ...tdStyle, ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>
                      {d.remaining} h
                    </td>
                    <td style={{ ...tdStyle, minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <ProgressBar value={d.driven} max={totalAllowed} color={barColor} height={6} />
                        </div>
                        <span style={{ fontSize: 11, color: barColor, ...BARLOW, minWidth: 32 }}>
                          {((d.driven / totalAllowed) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={tag(statusColor(d.status))}>{d.status.toUpperCase()}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', background: C.surface2, borderRadius: 6, fontSize: 12, color: C.textSec, ...INTER }}>
          ℹ Max driving hours: 11h/day · Mandatory rest: 8h break after 11h drive · HOS compliance per MV Act
        </div>
      </div>
    </div>
  );

  // ── TAB 3 ─────────────────────────────────────────────────────────────────
  const renderReeferHealth = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <SectionLabel code="TRK-07" title="Reefer Engine Health Monitor" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 14 }}>
          {DEMO_REEFER_HEALTH.map((r, i) => {
            const hColor = r.health >= 80 ? C.green : r.health >= 60 ? C.amber : C.red;
            return (
              <div key={i} style={{ ...card, borderTop: `3px solid ${hColor}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif", color: C.amber, fontWeight: 700, fontSize: 15 }}>
                    {r.truck}
                  </span>
                  <span style={tag(hColor)}>{r.status.toUpperCase()}</span>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 4 }}>HEALTH SCORE</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: hColor, ...BARLOW,
                      fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{r.health}%</span>
                    <div style={{ flex: 1 }}>
                      <ProgressBar value={r.health} max={100} color={hColor} height={8} />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 6 }}>
                  {[
                    { label: 'VIBRATION', val: r.vibration },
                    { label: 'FREON PSI', val: r.freon },
                    { label: 'AIRFLOW',   val: r.airflow },
                    { label: 'STATUS',    val: r.status },
                  ].map(m => (
                    <div key={m.label} style={{ background: C.surface2, borderRadius: 5, padding: '8px 10px' }}>
                      <div style={{ fontSize: 10, color: C.textSec, ...BARLOW, letterSpacing: '0.08em' }}>{m.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.textPri, ...BARLOW,
                        fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-08" title="AI Waiting-Time Spoilage Predictor" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 12, alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>HALT DURATION (minutes)</label>
            <input style={inputStyle} type="number" value={haltMinutes} min={0} max={480}
              onChange={e => setHaltMinutes(Number(e.target.value))} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>COMMODITY TYPE</label>
            <select style={selectStyle} value={commodity} onChange={e => setCommodity(e.target.value)}>
              {['Frozen Vegetables','Frozen Fish','Ice Cream','Dairy Products','Frozen Meat'].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            {spoilageResult !== null && (
              <div style={{
                background: spoilageResult > 60 ? C.red + '22' : spoilageResult > 30 ? C.amber + '22' : C.green + '22',
                border: `1px solid ${spoilageResult > 60 ? C.red : spoilageResult > 30 ? C.amber : C.green}55`,
                borderRadius: 8, padding: '12px 16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: C.textSec, ...BARLOW, marginBottom: 2 }}>SPOILAGE RISK</div>
                <div style={{
                  fontSize: 32, fontWeight: 700, ...BARLOW,
                  fontFamily: "'Barlow Condensed', Arial, sans-serif",
                  color: spoilageResult > 60 ? C.red : spoilageResult > 30 ? C.amber : C.green,
                }}>
                  {spoilageResult}%
                </div>
                <div style={{ fontSize: 11, color: C.textSec, ...INTER }}>
                  {spoilageResult > 60 ? '🔴 HIGH RISK — reroute immediately' :
                   spoilageResult > 30 ? '🟡 MODERATE — monitor closely' :
                   '🟢 LOW RISK — within safe window'}
                </div>
              </div>
            )}
          </div>
          <button style={btnPrimary} onClick={calcSpoilage}>Calculate Risk</button>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: C.textSec, ...INTER }}>
          * SIMULATED DEMO — Risk calculated using commodity-specific decay rate model
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-09" title="Cargo Airflow Blind-Spot Detection" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
          <AirflowSVG />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: C.red + '22', border: `1px solid ${C.red}44`, borderRadius: 6, padding: '10px 14px' }}>
              <div style={{ color: C.red, fontWeight: 700, ...BARLOW, fontSize: 14 }}>⚠ BLIND SPOT DETECTED</div>
              <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 4 }}>
                Rear-right quadrant (0.8 m²) showing inadequate airflow coverage.
                Airflow velocity: 0.3 m/s (below 0.5 m/s threshold).
              </div>
            </div>
            <div style={{ background: C.surface2, borderRadius: 6, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 6 }}>AIRFLOW METRICS</div>
              {[
                { label: 'Front Zone Coverage', val: '96%',    color: C.green },
                { label: 'Mid Zone Coverage',   val: '84%',    color: C.green },
                { label: 'Rear Zone Coverage',  val: '51%',    color: C.red   },
                { label: 'Avg Velocity',         val: '0.7 m/s', color: C.blue },
              ].map(m => (
                <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: C.textSec, ...INTER }}>{m.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: m.color, ...BARLOW,
                    fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{m.val}</span>
                </div>
              ))}
            </div>
            <button style={btnPrimary}>Run Full Scan</button>
          </div>
        </div>
      </div>

      <SharedAISpoilageAlerts />
    </div>
  );

  // ── TAB 4 ─────────────────────────────────────────────────────────────────
  const renderRouteTolls = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={card}>
        <SectionLabel code="TRK-01" title="AI Route Optimizer" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 14 }}>
          <div style={{ minWidth: 160 }}>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>ORIGIN</label>
            <select style={selectStyle} value={routeOrigin}
              onChange={e => { setRouteOrigin(e.target.value); setShowRoutes(false); }}>
              {['Pune','Nashik','Mumbai','Nagpur'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ minWidth: 160 }}>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>DESTINATION</label>
            <select style={selectStyle} value={routeDest}
              onChange={e => { setRouteDest(e.target.value); setShowRoutes(false); }}>
              {['Mumbai','Pune','Nashik','Nagpur'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button style={btnPrimary} onClick={() => setShowRoutes(true)}>⚡ Optimize Route</button>
        </div>

        {showRoutes && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 4 }}>
              SIMULATED DEMO — Routes for {routeOrigin} → {routeDest}
            </div>
            {DEMO_ROUTES.map((r, i) => (
              <div key={i} style={{
                background: C.surface2, border: `1.5px solid ${r.color}55`,
                borderLeft: `4px solid ${r.color}`, borderRadius: 8,
                padding: '14px 18px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: 10,
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: r.color, fontSize: 15, ...BARLOW }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 3 }}>
                    {r.type === 'recommended' ? '🔹 AI-recommended: lowest fuel + toll + time composite score' :
                     r.type === 'alternate1'   ? '🔹 Lower toll cost, slightly longer distance' :
                     '🔹 Least toll, longest route'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Distance', val: r.distance },
                    { label: 'Tolls',    val: r.tolls    },
                    { label: 'ETA',      val: r.eta      },
                  ].map(m => (
                    <div key={m.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: r.color, ...BARLOW,
                        fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{m.val}</div>
                    </div>
                  ))}
                </div>
                {i === 0 && <button style={btnPrimary}>Select</button>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={card}>
        <SectionLabel code="TRK-14" title="Road Toll & Trip Cost Calculator" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 16 }}>
          {([
            { label: 'DISTANCE (km)',         val: tcDist,  setFn: setTcDist,  step: 1 },
            { label: 'FUEL RATE (₹/L)',       val: tcFuelR, setFn: setTcFuelR, step: 0.1 },
            { label: 'EFFICIENCY (km/L)',      val: tcEffic, setFn: setTcEffic, step: 0.1 },
            { label: 'TOLL AMOUNT (₹)',        val: tcToll,  setFn: setTcToll,  step: 1 },
            { label: 'DRIVER ALLOWANCE (₹)',   val: tcAllow, setFn: setTcAllow, step: 1 },
          ] as { label: string; val: number; setFn: (n: number) => void; step: number }[]).map(f => (
            <div key={f.label}>
              <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>{f.label}</label>
              <input style={inputStyle} type="number" value={f.val} min={0} step={f.step}
                onChange={e => f.setFn(Number(e.target.value))} />
            </div>
          ))}
        </div>
        <div style={{ ...card, background: C.surface2, marginTop: 4 }}>
          <div style={{ fontSize: 11, color: C.textSec, letterSpacing: '0.1em', ...BARLOW, marginBottom: 12 }}>
            ITEMIZED TRIP COST · SIMULATED DEMO
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                { item: 'Fuel Cost',         val: fuelCost, formula: `${tcDist}km ÷ ${tcEffic}km/L × ₹${tcFuelR}/L` },
                { item: 'Toll Charges',      val: tcToll,   formula: 'As entered' },
                { item: 'Driver Allowance',  val: tcAllow,  formula: 'As entered' },
              ].map(row => (
                <tr key={row.item} style={{ borderBottom: `1px solid ${C.border}33` }}>
                  <td style={{ ...tdStyle, color: C.textSec }}>{row.item}</td>
                  <td style={{ ...tdStyle, fontSize: 11, color: C.textSec + '99' }}>{row.formula}</td>
                  <td style={{ ...tdStyle, textAlign: 'right', ...BARLOW,
                    fontFamily: "'Barlow Condensed', Arial, sans-serif", color: C.textPri, fontSize: 15, fontWeight: 700 }}>
                    ₹{row.val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ ...tdStyle, fontWeight: 700, color: C.amber, ...BARLOW, fontSize: 15 }}>
                  TOTAL TRIP COST
                </td>
                <td style={{ ...tdStyle, textAlign: 'right', fontSize: 22, fontWeight: 700, color: C.amber,
                  ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>
                  ₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ── TAB 5 ─────────────────────────────────────────────────────────────────
  const renderFuelEmissions = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={card}>
        <SectionLabel code="TRK-04" title="Fuel Consumption Monitor" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: C.surface2, borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, letterSpacing: '0.08em', marginBottom: 8 }}>
              PRIMARY DIESEL · DEMO DATA
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.amber, ...BARLOW,
              fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>24.8</div>
            <div style={{ fontSize: 13, color: C.textSec, ...INTER, marginBottom: 10 }}>Litres / 100 km</div>
            <ProgressBar value={24.8} max={40} color={C.amber} height={10} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 11, color: C.green, ...BARLOW }}>EFFICIENT: &lt;22</span>
              <span style={{ fontSize: 11, color: C.red, ...BARLOW }}>POOR: &gt;30</span>
            </div>
          </div>
          <div style={{ background: C.surface2, borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, letterSpacing: '0.08em', marginBottom: 8 }}>
              REEFER AUX GENERATOR · DEMO DATA
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: C.blue, ...BARLOW,
              fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>2.1</div>
            <div style={{ fontSize: 13, color: C.textSec, ...INTER, marginBottom: 10 }}>Litres / Hour</div>
            <ProgressBar value={2.1} max={4} color={C.blue} height={10} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 11, color: C.green, ...BARLOW }}>EFFICIENT: &lt;2.0</span>
              <span style={{ fontSize: 11, color: C.red, ...BARLOW }}>POOR: &gt;3.0</span>
            </div>
          </div>
        </div>
      </div>

      <div style={card}>
        <SectionLabel code="TRK-04" title="CO₂ Emissions Calculator" />
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>CARGO (tonnes)</label>
            <input style={{ ...inputStyle, width: 130 }} type="number" value={co2Cargo} min={1}
              onChange={e => setCo2Cargo(Number(e.target.value))} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>DISTANCE (km)</label>
            <input style={{ ...inputStyle, width: 130 }} type="number" value={co2Dist} min={1}
              onChange={e => setCo2Dist(Number(e.target.value))} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: C.surface2, borderRadius: 8, padding: 16, borderTop: `3px solid ${C.amber}` }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 6 }}>TRUCK ROAD TRANSPORT</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: C.amber, ...BARLOW,
              fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{co2Truck} kg</div>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER }}>CO₂ equivalent · ~270g/km</div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.textSec, ...INTER }}>
              Fuel used: ~{(co2Dist / 4.2).toFixed(0)} L diesel
            </div>
          </div>
          <div style={{ background: C.surface2, borderRadius: 8, padding: 16, borderTop: `3px solid ${C.green}` }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 6 }}>RAIL ALTERNATIVE</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: C.green, ...BARLOW,
              fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{co2Rail} kg</div>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER }}>CO₂ equivalent · ~30g/tonne·km</div>
            <div style={{ marginTop: 8, fontSize: 11, color: C.green, ...INTER }}>
              Saves {(parseFloat(co2Truck) - parseFloat(co2Rail)).toFixed(1)} kg CO₂ vs road
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.textSec, ...INTER, marginTop: 10 }}>
          * SIMULATED DEMO — Emission factors sourced from IPCC AR6 / India MoRTH standards
        </div>
      </div>

      <div style={card}>
        <div style={{ fontSize: 11, color: C.textSec, letterSpacing: '0.1em', ...BARLOW, marginBottom: 12 }}>
          FLEET FUEL EFFICIENCY TABLE · DEMO DATA
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Vehicle ID','Diesel (L/100km)','Reefer (L/hr)','CO₂ (kg/100km)','Efficiency'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_FUEL_TABLE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : C.surface2 + '80' }}>
                <td style={{ ...tdStyle, ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif", color: C.amber, fontWeight: 700 }}>
                  {row.truck}
                </td>
                <td style={tdStyle}>{row.diesel}</td>
                <td style={tdStyle}>{row.reefer}</td>
                <td style={tdStyle}>{row.co2}</td>
                <td style={tdStyle}>
                  <span style={tag(statusColor(row.efficiency))}>{row.efficiency.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SharedReportsAnalyticsExport />
    </div>
  );

  // ── TAB 6 ─────────────────────────────────────────────────────────────────
  const renderLoadMaintenance = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {maintenanceModalOpen && <MaintenanceModal onClose={() => setMaintenanceModalOpen(false)} />}

      <div style={card}>
        <SectionLabel code="TRK-11" title="Truck Capacity & Load Distribution" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
          <AxleWeightSVG front={frontAxle} rear={rearAxle} gvw={gvw} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {([
              { label: 'FRONT AXLE LOAD (kg)',       val: frontAxle, setFn: setFrontAxle, limit: 6000 },
              { label: 'REAR AXLE LOAD (kg)',         val: rearAxle,  setFn: setRearAxle,  limit: 11500 },
              { label: 'GROSS VEHICLE WEIGHT (kg)',   val: gvw,       setFn: setGvw,       limit: 49000 },
            ] as { label: string; val: number; setFn: (n: number) => void; limit: number }[]).map(f => {
              const ok = f.val <= f.limit;
              return (
                <div key={f.label}>
                  <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>{f.label}</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input style={{ ...inputStyle, flex: 1 }} type="number" value={f.val} min={0}
                      onChange={e => f.setFn(Number(e.target.value))} />
                    <span style={tag(ok ? C.green : C.red)}>{ok ? '✓ OK' : '⚠ OVER'}</span>
                  </div>
                  <div style={{ fontSize: 11, color: C.textSec, ...INTER, marginTop: 2 }}>
                    Legal limit: {f.limit.toLocaleString()} kg
                    {!ok && <span style={{ color: C.red }}> (+{(f.val - f.limit).toLocaleString()} kg overload)</span>}
                  </div>
                </div>
              );
            })}
            <div style={{
              background: (frontOK && rearOK && gvwOK) ? C.green + '22' : C.red + '22',
              border: `1px solid ${(frontOK && rearOK && gvwOK) ? C.green : C.red}55`,
              borderRadius: 6, padding: '10px 14px',
            }}>
              <div style={{ fontWeight: 700, color: (frontOK && rearOK && gvwOK) ? C.green : C.red, ...BARLOW, fontSize: 14 }}>
                {(frontOK && rearOK && gvwOK) ? '✅ LOAD DISTRIBUTION COMPLIANT' : '⚠ LOAD COMPLIANCE VIOLATION'}
              </div>
              <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 4 }}>
                {(frontOK && rearOK && gvwOK)
                  ? 'All axle loads within legal limits. Safe to dispatch.'
                  : 'Overloaded! Reduce cargo before dispatch. Penalty: ₹20,000+ fine.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionLabel code="TRK-06" title="Predictive Maintenance Scheduler" />
          <button style={btnPrimary} onClick={() => setMaintenanceModalOpen(true)}>+ Schedule Service</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Vehicle ID','Last Service','Next Due','Service Type','Status'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_MAINTENANCE.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : C.surface2 + '80' }}>
                <td style={{ ...tdStyle, ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif", color: C.amber, fontWeight: 700 }}>
                  {row.truck}
                </td>
                <td style={tdStyle}>{row.lastService}</td>
                <td style={tdStyle}>{row.nextDue}</td>
                <td style={tdStyle}>{row.type}</td>
                <td style={tdStyle}>
                  <span style={tag(statusColor(row.status))}>{row.status.toUpperCase()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── TAB 7 ─────────────────────────────────────────────────────────────────
  const renderEmergency = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={card}>
        <SectionLabel code="TRK-12" title="Roadside Emergency Truck Matching" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>STRANDED VEHICLE</label>
            <select style={selectStyle} value={strandedTruck}
              onChange={e => { setStrandedTruck(e.target.value); setBackupResults(false); }}>
              {DEMO_FLEET_TABLE.map(f => (
                <option key={f.id} value={f.id}>{f.id} — {f.route}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.textSec, ...BARLOW }}>INCIDENT DESCRIPTION</label>
            <input style={inputStyle} value={incidentDesc} onChange={e => setIncidentDesc(e.target.value)}
              placeholder="e.g. Reefer compressor failure, flat tyre…" />
          </div>
        </div>
        <button style={{ ...btnPrimary, background: C.red, marginBottom: 16 }}
          onClick={() => setBackupResults(true)}>
          🚨 Find Nearest Backup Truck
        </button>

        {backupResults && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: C.textSec, ...BARLOW, marginBottom: 4 }}>
              BACKUP TRUCKS NEAR {strandedTruck} · DEMO DATA
            </div>
            {DEMO_BACKUP_TRUCKS.map((t, i) => (
              <div key={i} style={{
                background: C.surface2, border: `1px solid ${C.border}`,
                borderLeft: `4px solid ${i === 0 ? C.green : i === 1 ? C.amber : C.blue}`,
                borderRadius: 8, padding: '14px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ ...BARLOW, fontFamily: "'Barlow Condensed', Arial, sans-serif",
                    color: C.amber, fontWeight: 700, fontSize: 15 }}>{t.id}</div>
                  <div style={{ fontSize: 12, color: C.textSec, ...INTER }}>Driver: {t.driver}</div>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>ETA</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.green, ...BARLOW,
                      fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{t.eta}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: C.textSec, ...BARLOW }}>DISTANCE</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.blue, ...BARLOW,
                      fontFamily: "'Barlow Condensed', Arial, sans-serif" }}>{t.distance}</div>
                  </div>
                </div>
                <button style={{ ...btnPrimary, background: i === 0 ? C.green : C.amber, color: '#111418' }}>
                  {i === 0 ? 'Dispatch' : 'Reserve'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={card}>
        <SectionLabel code="TRK-12" title="Emergency Contact List" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
          {DEMO_EMERGENCY_CONTACTS.map((c, i) => (
            <div key={i} style={{
              background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px',
            }}>
              <div style={{ fontSize: 10, color: C.textSec, ...BARLOW, letterSpacing: '0.08em', marginBottom: 4 }}>
                {c.role.toUpperCase()}
              </div>
              <div style={{ fontWeight: 700, color: C.textPri, ...BARLOW, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.amber, ...BARLOW,
                fontFamily: "'Barlow Condensed', Arial, sans-serif", marginTop: 4 }}>{c.number}</div>
            </div>
          ))}
        </div>
      </div>

      <SharedEmergencyCargoRescue />
    </div>
  );

  // ── TAB RENDERER ──────────────────────────────────────────────────────────
  const renderTab = () => {
    switch (activeTab) {
      case 0: return renderFleetOverview();
      case 1: return renderDriverRelay();
      case 2: return renderReeferHealth();
      case 3: return renderRouteTolls();
      case 4: return renderFuelEmissions();
      case 5: return renderLoadMaintenance();
      case 6: return renderEmergency();
      default: return null;
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="truck-portal" style={{ background: C.bg, minHeight: '100%' }}>

      <VerificationMatrixModal isOpen={verifyOpen} onClose={() => setVerifyOpen(false)} />

      {/* HEADER */}
      <div style={{
        background: C.surface,
        borderBottom: `3px solid ${C.amber}`,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 64,
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 4, height: 40, background: C.amber, borderRadius: 2 }} />
          <div>
            <h1 style={{
              margin: 0, fontSize: 24, fontWeight: 900, color: C.amber,
              letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.1,
              fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
            }}>
              FLEET COMMAND CENTER
            </h1>
            <div style={{ fontSize: 12, color: C.textSec, ...INTER, marginTop: 2 }}>
              Truck Administration · ColdChain 360
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: C.amber + '22', border: `1px solid ${C.amber}55`,
            borderRadius: 6, padding: '6px 14px',
            fontFamily: "'Barlow Condensed', Arial, sans-serif",
            color: C.amber, fontWeight: 700, fontSize: 14, letterSpacing: '0.06em',
          }}>
            14 / 14 FEATURES
          </div>
          <button style={btnPrimary} onClick={() => setVerifyOpen(true)}>
            ✓ Verify Features
          </button>
        </div>
      </div>

      {/* TAB BAR */}
      <div style={{
        background: C.surface2,
        borderBottom: `1px solid ${C.border}`,
        display: 'flex',
        overflowX: 'auto',
        padding: '0 16px',
      }}>
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === i ? `3px solid ${C.amber}` : '3px solid transparent',
              color: activeTab === i ? C.amber : C.textSec,
              padding: '14px 18px',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: activeTab === i ? 700 : 500,
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
              fontFamily: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div style={{ padding: '20px 24px', maxWidth: 1400, margin: '0 auto' }}>
        {renderTab()}
      </div>
    </div>
  );
};
