import React, { useState } from 'react';
import {
  Train, Clock, AlertTriangle, CheckCircle2, Thermometer, BarChart3,
  Calendar, MapPin, ArrowRight, Activity, Layers, Package, Truck,
  Radio, ShieldAlert, ChevronDown, ChevronRight, Plus, X, RefreshCw, Download
} from 'lucide-react';
import { VerificationMatrixModal } from '../../components/portal/VerificationMatrixModal';
import { SharedReportsAnalyticsExport } from '../../components/portal/shared/SharedReportsAnalyticsExport';

// ── Demo data ────────────────────────────────────────────────────────────────

const TRAINS = [
  { no: '00901', name: 'Kisan Rail Express',   origin: 'Nashik Road', dep: '06:10', dest: 'Mumbai CSMT',     arr: '10:45',    status: 'ON TIME',       platform: 'P4'  },
  { no: '00902', name: 'DFC Reefer Freight',   origin: 'Ludhiana',    dep: '22:30', dest: 'JNPT Uran',       arr: '18:20+1',  status: 'DELAYED',       platform: 'P7'  },
  { no: '00903', name: 'Vande Sheetala',       origin: 'Bangalore',   dep: '05:00', dest: 'New Delhi',       arr: '07:30+1',  status: 'ON TIME',       platform: 'P2'  },
  { no: '00904', name: 'Agri Cargo Special',   origin: 'Amritsar',    dep: '14:15', dest: 'Kolkata Goods',   arr: '08:45+2',  status: 'RUNNING LATE',  platform: 'P11' },
];

const WAGONS = [
  { id: 'RFN-4481', type: 'BRRNAN-C',       train: '00901', cargo: 'Alphonso Mangoes', consignee: 'Fresh2Market',  temp: '+8\u00b0C',  status: 'LOADED'  },
  { id: 'RFN-4482', type: 'BRRNAN-C',       train: '00901', cargo: 'Onion Sacks',      consignee: 'NHRDF Exports', temp: 'Ambient', status: 'LOADING' },
  { id: 'REF-2201', type: 'ISO Reefer',     train: '00902', cargo: 'Frozen Chicken',   consignee: 'Skylark Foods', temp: '-20\u00b0C', status: 'SEALED'  },
  { id: 'RFN-4490', type: 'BRRNAN-C',       train: '00903', cargo: 'Grapes (Export)',  consignee: 'Sahyadri Farms',temp: '+5\u00b0C',  status: 'LOADED'  },
];

const REEFER_WAGONS = [
  { id: 'REF-2201', type: 'ISO 40ft Reefer', power: 'Genset (415V)',       setpoint: '-20\u00b0C', current: '-19.6\u00b0C', train: '00902', status: 'IN SERVICE', poh: 'Apr 2027' },
  { id: 'REF-2205', type: 'ISO 20ft Reefer', power: 'Genset (415V)',       setpoint: '+4\u00b0C',  current: '+4.2\u00b0C',  train: '00901', status: 'IN SERVICE', poh: 'Jun 2027' },
  { id: 'REF-2208', type: 'BRRNAN-C',        power: 'Central Power Car',   setpoint: '+8\u00b0C',  current: '+8.7\u00b0C',  train: '00903', status: 'LOADED',     poh: 'Jan 2027' },
  { id: 'REF-2190', type: 'ISO 40ft Reefer', power: 'Genset (415V)',       setpoint: '-20\u00b0C', current: '\u2014',       train: 'YARD',  status: 'AVAILABLE',  poh: 'Mar 2027' },
];

const DWELL_STATIONS = [
  { station: 'Nashik Road',     scheduled: 12, actual: 13, variance: 1   },
  { station: 'Igatpuri',        scheduled: 8,  actual: 24, variance: 16  },
  { station: 'Kasara',          scheduled: 5,  actual: 11, variance: 6   },
  { station: 'Kalyan Jn.',      scheduled: 10, actual: 10, variance: 0   },
  { station: 'Thane',           scheduled: 4,  actual: 4,  variance: 0   },
  { station: 'Mumbai CSMT',     scheduled: 20, actual: 20, variance: 0   },
];

const TRANSFER_TABLE = [
  { train: '00901', arrival: '10:45', station: 'Bhiwandi ICD',       trucks: 'CC-REEFER-07, CC-REEFER-12', cargo: '48 MT Produce', window: '10:45\u201313:00', status: 'SCHEDULED'  },
  { train: '00903', arrival: '07:30', station: 'Delhi Tughlaqabad',  trucks: 'CC-REEFER-22',               cargo: '22 MT Pharma',  window: '07:30\u201309:00', status: 'CONFIRMED'  },
];

const DISRUPTIONS = [
  { id: 1, title: 'Section Block: Igatpuri\u2013Kasara Ghat',      detail: 'Track maintenance, Block ends 18:00. Affected: Trains 00901, 00902', severity: 'CRITICAL' },
  { id: 2, title: 'Flash Flood Advisory: Konkan Line',             detail: 'Bridge gauge check active. Diversion via Pune recommended.',          severity: 'HIGH'     },
  { id: 3, title: 'Fog Speed Restriction: Delhi Division',         detail: 'Max 45 km/h until 10:00 IST.',                                        severity: 'MODERATE' },
];

const DIVERSION_ROUTES: Record<string, { original: string[]; diverted: string[]; etaImpact: string }> = {
  '00901': {
    original: ['Nashik Road', 'Igatpuri', 'Kasara', 'Kalyan Jn.', 'Thane', 'Mumbai CSMT'],
    diverted: ['Nashik Road', 'Manmad Jn.', 'Pune', 'Lonavala', 'Kalyan Jn.', 'Thane', 'Mumbai CSMT'],
    etaImpact: '+2h 15min',
  },
  '00902': {
    original: ['Ludhiana', 'Ambala Jn.', 'Panipat', 'New Delhi', 'Mathura', 'Surat', 'JNPT Uran'],
    diverted: ['Ludhiana', 'Ambala Jn.', 'Panipat', 'New Delhi', 'Kota Jn.', 'Surat', 'JNPT Uran'],
    etaImpact: '+3h 00min',
  },
  '00903': {
    original: ['Bangalore', 'Guntakal', 'Nagpur', 'Bhopal', 'Agra', 'New Delhi'],
    diverted: ['Bangalore', 'Guntakal', 'Hyderabad', 'Nagpur', 'Bhopal', 'Agra', 'New Delhi'],
    etaImpact: '+1h 30min',
  },
  '00904': {
    original: ['Amritsar', 'Ambala', 'Mughal Sarai', 'Kolkata Goods'],
    diverted: ['Amritsar', 'Ambala', 'Patna Jn.', 'Kolkata Goods'],
    etaImpact: '+45min',
  },
};

const DETENTION_WAGONS = [
  { id: 'RFN-4412', type: 'BRRNAN-C',   days: 5, free: 2, demurrage: 7500  },
  { id: 'REF-2188', type: 'ISO Reefer 40ft', days: 4, free: 2, demurrage: 9000  },
  { id: 'RFN-4398', type: 'BRRNAN-C',   days: 3, free: 2, demurrage: 2500  },
];

const ZONE_DISTANCES: Record<string, Record<string, number>> = {
  Western:  { Eastern: 1820, Southern: 1250, Central: 680,  Western: 0    },
  Eastern:  { Western: 1820, Southern: 2100, Central: 1340, Eastern: 0    },
  Southern: { Western: 1250, Eastern: 2100,  Central: 1560, Southern: 0   },
  Central:  { Western: 680,  Eastern: 1340,  Southern: 1560, Central: 0   },
};

const WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALENDAR_DATA: Record<string, string[]> = {
  'RFN-4481': ['ALLOCATED','ALLOCATED','FREE','FREE','MAINTENANCE','FREE','FREE'],
  'RFN-4482': ['LOADING','ALLOCATED','ALLOCATED','FREE','FREE','FREE','ALLOCATED'],
  'REF-2201': ['ALLOCATED','ALLOCATED','ALLOCATED','ALLOCATED','FREE','FREE','FREE'],
  'RFN-4490': ['FREE','ALLOCATED','ALLOCATED','ALLOCATED','ALLOCATED','FREE','FREE'],
};

const PLATFORMS = ['P1','P2','P3','P4'];
const TIME_SLOTS = ['06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00'];
const SLOT_DATA: Record<string, Record<string, string>> = {
  P1: { '06:00':'00903','08:00':'\u2014','10:00':'\u2014','12:00':'00901','14:00':'\u2014','16:00':'00904','18:00':'\u2014','20:00':'\u2014' },
  P2: { '06:00':'\u2014','08:00':'00901','10:00':'\u2014','12:00':'\u2014','14:00':'00902','16:00':'\u2014','18:00':'00904','20:00':'\u2014' },
  P3: { '06:00':'\u2014','08:00':'\u2014','10:00':'00902','12:00':'\u2014','14:00':'00903','16:00':'\u2014','18:00':'\u2014','20:00':'00901' },
  P4: { '06:00':'00901','08:00':'\u2014','10:00':'\u2014','12:00':'00904','14:00':'\u2014','16:00':'00903','18:00':'\u2014','20:00':'\u2014' },
};

const FEATURES = [
  { id: 'RAIL-01', label: 'Train Schedule & Timetable Management' },
  { id: 'RAIL-02', label: 'Wagon & Container Allocation' },
  { id: 'RAIL-03', label: 'Rail Freight Capacity Optimization' },
  { id: 'RAIL-04', label: 'Station Dwell-Time Analysis' },
  { id: 'RAIL-05', label: 'Train Delay & Connection Miss Prediction' },
  { id: 'RAIL-06', label: 'Railway Yard Congestion Monitoring' },
  { id: 'RAIL-07', label: 'Wagon Availability & Utilization Analytics' },
  { id: 'RAIL-08', label: 'Rail Freight Tariff Calculator' },
  { id: 'RAIL-09', label: 'Railway Route Disruption & Diversion Planning' },
  { id: 'RAIL-10', label: 'Refrigerated Wagon Availability Management' },
  { id: 'RAIL-11', label: 'Station Loading & Unloading Slot Scheduling' },
  { id: 'RAIL-12', label: 'Rail-to-Truck Transfer Slot Coordination' },
  { id: 'RAIL-13', label: 'Wagon Detention & Demurrage Cost Prediction' },
  { id: 'RAIL-14', label: 'Train Formation & Cargo Compatibility Planning' },
];

const TABS = [
  { key: 'timetable',  label: 'Timetable & Schedules'  },
  { key: 'wagon',      label: 'Wagon & Formation'       },
  { key: 'capacity',   label: 'Capacity & Yard'         },
  { key: 'station',    label: 'Station Operations'      },
  { key: 'reefer',     label: 'Reefer Wagons'           },
  { key: 'tariff',     label: 'Tariff & Demurrage'      },
  { key: 'disruption', label: 'Disruptions'             },
];

// ── Style helpers ─────────────────────────────────────────────────────────────

const mono = "'IBM Plex Mono', 'Courier New', monospace";
const sans = "'IBM Plex Sans', 'Helvetica Neue', sans-serif";

const statusColor = (s: string): string => {
  if (s === 'ON TIME' || s === 'LOADED' || s === 'SEALED' || s === 'IN SERVICE' || s === 'CONFIRMED' || s === 'SCHEDULED') return '#22C55E';
  if (s === 'DELAYED' || s === 'CRITICAL') return '#EF4444';
  if (s === 'RUNNING LATE' || s === 'LOADING' || s === 'HIGH') return '#F59E0B';
  if (s === 'AVAILABLE') return '#2563EB';
  if (s === 'MODERATE') return '#F59E0B';
  return '#94A3B8';
};

const StatusChip: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <span style={{
    background: color + '20',
    color,
    border: `1px solid ${color}40`,
    borderRadius: 4,
    padding: '2px 8px',
    fontSize: 11,
    fontFamily: mono,
    fontWeight: 600,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
  }}>{label}</span>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: 10, padding: 20, ...style }}>
    {children}
  </div>
);

const SectionLabel: React.FC<{ text: string; id?: string }> = ({ text, id }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    {id && (
      <span style={{ fontFamily: mono, fontSize: 10, color: '#2563EB', background: '#EEF1F8', border: '1px solid #CBD5E1', borderRadius: 4, padding: '2px 6px', letterSpacing: '0.06em' }}>{id}</span>
    )}
    <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: '#0F1B35', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{text}</span>
  </div>
);

const thStyle: React.CSSProperties = {
  padding: '10px 14px',
  textAlign: 'left',
  fontSize: 11,
  fontFamily: sans,
  fontWeight: 700,
  color: '#475569',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  borderBottom: '2px solid #CBD5E1',
  background: '#EEF1F8',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  fontSize: 13,
  color: '#0F1B35',
  borderBottom: '1px solid #EEF1F8',
  whiteSpace: 'nowrap',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #CBD5E1',
  borderRadius: 6,
  fontFamily: mono,
  fontSize: 13,
  color: '#0F1B35',
  background: '#F4F6FB',
  boxSizing: 'border-box',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #CBD5E1',
  borderRadius: 6,
  fontFamily: sans,
  fontSize: 13,
  color: '#0F1B35',
  background: '#F4F6FB',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontFamily: sans,
  fontWeight: 600,
  color: '#475569',
  marginBottom: 4,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const tempColor = (t: string): string => {
  if (t.startsWith('-')) return '#2563EB';
  if (t === 'Ambient') return '#94A3B8';
  return '#22C55E';
};

// ── Tab 1: Timetable & Schedules ─────────────────────────────────────────────

const TimetableTab: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState('00901');
  const [delayResult, setDelayResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const delayMap: Record<string, number> = { '00901': 4, '00902': 40, '00903': 0, '00904': 15 };

  const handleRecalculate = () => {
    setCalculating(true);
    setDelayResult(null);
    setTimeout(() => {
      setDelayResult(delayMap[selectedTrain] ?? 0);
      setCalculating(false);
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Live Train Timetable" id="RAIL-01" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 820 }}>
            <thead>
              <tr>
                {['Train No.','Name','Origin','Departure','Destination','Arrival','Status','Platform'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRAINS.map((t, i) => (
                <tr key={t.no} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F4F6FB' }}>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E' }}>{t.no}</td>
                  <td style={{ ...tdStyle, fontFamily: sans, fontWeight: 600 }}>{t.name}</td>
                  <td style={tdStyle}>{t.origin}</td>
                  <td style={{ ...tdStyle, fontFamily: mono }}>{t.dep}</td>
                  <td style={tdStyle}>{t.dest}</td>
                  <td style={{ ...tdStyle, fontFamily: mono }}>{t.arr}</td>
                  <td style={tdStyle}><StatusChip label={t.status} color={statusColor(t.status)} /></td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#2563EB' }}>{t.platform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel text="Delay Predictor" id="RAIL-05" />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <label style={labelStyle}>Select Train</label>
            <select
              value={selectedTrain}
              onChange={e => { setSelectedTrain(e.target.value); setDelayResult(null); }}
              style={{ ...selectStyle, fontFamily: mono, minWidth: 220 }}
            >
              {TRAINS.map(t => <option key={t.no} value={t.no}>{t.no} \u2014 {t.name}</option>)}
            </select>
          </div>
          <button
            onClick={handleRecalculate}
            disabled={calculating}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: '#1E3A6E', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: calculating ? 0.7 : 1 }}
          >
            <RefreshCw size={14} />
            {calculating ? 'Recalculating\u2026' : 'Recalculate'}
          </button>
        </div>
        {delayResult !== null && (
          <div style={{ marginTop: 18, padding: 16, background: delayResult === 0 ? '#22C55E10' : delayResult > 20 ? '#EF444410' : '#F59E0B10', border: `1px solid ${delayResult === 0 ? '#22C55E' : delayResult > 20 ? '#EF4444' : '#F59E0B'}40`, borderRadius: 8 }}>
            <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: delayResult === 0 ? '#22C55E' : delayResult > 20 ? '#EF4444' : '#F59E0B' }}>
              {delayResult === 0 ? 'ON TIME' : `+${delayResult} min`}
            </div>
            <div style={{ fontFamily: sans, fontSize: 12, color: '#475569', marginTop: 4 }}>
              Predicted arrival delay for Train {selectedTrain}
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, color: '#94A3B8', marginTop: 6, letterSpacing: '0.05em' }}>SIMULATED DEMO \u2014 NOT ACTUAL RAILWAY DATA</div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Tab 2: Wagon & Formation ──────────────────────────────────────────────────

const WagonTab: React.FC = () => {
  const [compatResult, setCompatResult] = useState<string | null>(null);

  const calendarColor = (s: string): { bg: string; text: string } => {
    if (s === 'ALLOCATED')   return { bg: '#1E3A6E', text: '#fff' };
    if (s === 'LOADING')     return { bg: '#F59E0B', text: '#fff' };
    if (s === 'MAINTENANCE') return { bg: '#EF4444', text: '#fff' };
    return { bg: '#EEF1F8', text: '#94A3B8' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Wagon Allocation" id="RAIL-02" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                {['Wagon ID','Type','Train','Cargo','Consignee','Temp Zone','Status'].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {WAGONS.map((w, i) => (
                <tr key={w.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F4F6FB' }}>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E' }}>{w.id}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontSize: 12 }}>{w.type}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#2563EB' }}>{w.train}</td>
                  <td style={tdStyle}>{w.cargo}</td>
                  <td style={tdStyle}>{w.consignee}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: tempColor(w.temp) }}>{w.temp}</td>
                  <td style={tdStyle}><StatusChip label={w.status} color={statusColor(w.status)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel text="Wagon Availability Calendar (This Week)" id="RAIL-07" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 620 }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 120 }}>Wagon ID</th>
                {WEEKS.map(d => <th key={d} style={{ ...thStyle, textAlign: 'center', width: 80 }}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(CALENDAR_DATA).map(([wid, days]) => (
                <tr key={wid}>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, fontSize: 12, color: '#1E3A6E' }}>{wid}</td>
                  {days.map((day, i) => {
                    const c = calendarColor(day);
                    return (
                      <td key={i} style={{ ...tdStyle, textAlign: 'center', padding: 6 }}>
                        <span style={{ background: c.bg, color: c.text, borderRadius: 4, padding: '3px 8px', fontSize: 10, fontFamily: mono, fontWeight: 600 }}>{day.substring(0, 3)}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, flexWrap: 'wrap' }}>
          {([['ALLOCATED', '#1E3A6E'], ['LOADING', '#F59E0B'], ['MAINTENANCE', '#EF4444'], ['FREE', '#EEF1F8']] as [string, string][]).map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 2, background: color, border: '1px solid #CBD5E1' }} />
              <span style={{ fontSize: 11, fontFamily: sans, color: '#475569' }}>{label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel text="Train Formation Planner" id="RAIL-14" />
        <div style={{ fontSize: 12, fontFamily: sans, color: '#475569', marginBottom: 14 }}>Train 00901 \u2014 Kisan Rail Express rake composition</div>
        <div style={{ overflowX: 'auto', paddingBottom: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'stretch', minWidth: 'max-content' }}>
            {/* Loco */}
            <div style={{ background: '#0F1B35', color: '#fff', borderRadius: 8, padding: '10px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 80, gap: 4 }}>
              <Train size={20} color="#3B82F6" />
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.04em' }}>WDP-4D</span>
              <span style={{ fontFamily: sans, fontSize: 9, color: '#94A3B8' }}>LOCO</span>
            </div>
            {WAGONS.map((w) => (
              <div key={w.id} style={{ background: '#EEF1F8', border: `2px solid ${tempColor(w.temp)}`, borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 90 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: tempColor(w.temp) }} />
                <span style={{ fontFamily: mono, fontSize: 10, fontWeight: 700, color: '#1E3A6E' }}>{w.id}</span>
                <span style={{ fontFamily: sans, fontSize: 9, color: '#475569', textAlign: 'center', maxWidth: 80, lineHeight: 1.3 }}>{w.cargo}</span>
                <span style={{ fontFamily: mono, fontSize: 9, color: tempColor(w.temp), fontWeight: 700 }}>{w.temp}</span>
              </div>
            ))}
            {/* Guard van */}
            <div style={{ background: '#1E3A6E', color: '#fff', borderRadius: 8, padding: '10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 70, gap: 4 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.04em' }}>GV</span>
              <span style={{ fontFamily: sans, fontSize: 9, color: '#94A3B8' }}>GUARD VAN</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setCompatResult(compatResult ? null : '\u2713 All wagon types compatible with train 00901. Reefer power supply confirmed on REF-2201. No hazmat conflicts detected.')}
          style={{ marginTop: 14, padding: '8px 18px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <CheckCircle2 size={14} /> Check Compatibility
        </button>
        {compatResult && (
          <div style={{ marginTop: 12, padding: 12, background: '#22C55E10', border: '1px solid #22C55E40', borderRadius: 6, fontFamily: sans, fontSize: 13, color: '#22C55E' }}>
            {compatResult}
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Tab 3: Capacity & Yard ────────────────────────────────────────────────────

const CapacityTab: React.FC = () => {
  const trainCapacity = [
    { train: '00901', name: 'Kisan Rail Express', pct: 82 },
    { train: '00902', name: 'DFC Reefer Freight',  pct: 95 },
    { train: '00903', name: 'Vande Sheetala',      pct: 61 },
    { train: '00904', name: 'Agri Cargo Special',  pct: 74 },
  ];

  const tracks = Array.from({ length: 12 }, (_, i) => {
    const id = `P${i + 1}`;
    const occupied = [3, 5, 7, 9, 10, 12].includes(i + 1);
    const maintenance = [6].includes(i + 1);
    return { id, occupied, maintenance };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Network Capacity Dashboard" id="RAIL-03" />
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { label: 'Network Capacity Used', value: '78%', color: '#F59E0B' },
            { label: 'Available TEU Slots',   value: '142', color: '#22C55E' },
            { label: 'Booked Next 7 Days',    value: '89',  color: '#2563EB' },
          ].map(m => (
            <div key={m.label} style={{ flex: '1 1 160px', background: '#EEF1F8', borderRadius: 8, padding: 18, border: '1px solid #CBD5E1' }}>
              <div style={{ fontFamily: mono, fontSize: 28, fontWeight: 700, color: m.color }}>{m.value}</div>
              <div style={{ fontFamily: sans, fontSize: 12, color: '#475569', marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color: '#0F1B35', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Train-wise Capacity Utilization</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {trainCapacity.map(t => (
            <div key={t.train}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, color: '#1E3A6E' }}>{t.train}</span>
                <span style={{ fontFamily: sans, fontSize: 12, color: '#475569' }}>{t.name} \u2014 <strong>{t.pct}%</strong></span>
              </div>
              <div style={{ height: 12, background: '#EEF1F8', borderRadius: 6, overflow: 'hidden', border: '1px solid #CBD5E1' }}>
                <div style={{ height: '100%', width: `${t.pct}%`, background: t.pct > 90 ? '#EF4444' : t.pct > 75 ? '#F59E0B' : '#2563EB', borderRadius: 6, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel text="Yard Congestion Monitor \u2014 CSMT Goods Yard" id="RAIL-06" />
        <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
          {([['Occupied','#0F1B35'],['Available','#EEF1F8'],['Under Maintenance','#EF444440']] as [string, string][]).map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 24, height: 12, background: color, border: '1px solid #CBD5E1', borderRadius: 2 }} />
              <span style={{ fontFamily: sans, fontSize: 11, color: '#475569' }}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tracks.map(tr => (
            <div key={tr.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: '#475569', width: 32 }}>{tr.id}</span>
              <div style={{ flex: 1, height: 20, background: tr.maintenance ? '#EF444420' : '#F4F6FB', border: `1px solid ${tr.maintenance ? '#EF444460' : '#CBD5E1'}`, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 7, left: 0, right: 0, height: 1, background: '#CBD5E1' }} />
                <div style={{ position: 'absolute', top: 11, left: 0, right: 0, height: 1, background: '#CBD5E1' }} />
                {tr.occupied && !tr.maintenance && (
                  <div style={{ position: 'absolute', top: 2, left: 20, right: 20, bottom: 2, background: '#0F1B35', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: mono, fontSize: 9, color: '#3B82F6', letterSpacing: '0.08em' }}>RAKE OCCUPIED</span>
                  </div>
                )}
                {tr.maintenance && (
                  <div style={{ position: 'absolute', top: 2, left: 0, right: 0, bottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: mono, fontSize: 9, color: '#EF4444', letterSpacing: '0.06em' }}>\u26a0 MAINTENANCE</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: 10, background: '#EEF1F8', borderRadius: 6, fontFamily: sans, fontSize: 12, color: '#475569' }}>
          Occupied: <strong style={{ color: '#0F1B35' }}>6 tracks</strong> &nbsp;|&nbsp; Available: <strong style={{ color: '#22C55E' }}>5 tracks</strong> &nbsp;|&nbsp; Maintenance: <strong style={{ color: '#EF4444' }}>1 track</strong>
        </div>
      </Card>
    </div>
  );
};

// ── Tab 4: Station Operations ─────────────────────────────────────────────────

interface SlotModalProps {
  onClose: () => void;
}

const SlotModal: React.FC<SlotModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({ platform: 'P1', time: '06:00', train: '', crane: 'CR-1' });
  const [saved, setSaved] = useState(false);

  const setField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,27,53,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: 380, border: '1px solid #CBD5E1', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 16, color: '#0F1B35' }}>Book New Loading Slot</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}><X size={18} /></button>
        </div>
        {saved ? (
          <div style={{ padding: 16, background: '#22C55E10', border: '1px solid #22C55E40', borderRadius: 8, textAlign: 'center', fontFamily: sans, color: '#22C55E', fontWeight: 700, fontSize: 14 }}>
            Slot booked successfully! \u2713
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Platform</label>
              <select value={form.platform} onChange={setField('platform')} style={selectStyle}>
                {PLATFORMS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Time Slot</label>
              <select value={form.time} onChange={setField('time')} style={selectStyle}>
                {TIME_SLOTS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Train Number</label>
              <input value={form.train} onChange={setField('train')} placeholder="e.g. 00901" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Crane Assignment</label>
              <select value={form.crane} onChange={setField('crane')} style={selectStyle}>
                {['CR-1','CR-2','CR-3','Forklift-A'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setSaved(true)} style={{ flex: 1, padding: '10px', background: '#1E3A6E', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Confirm Booking</button>
              <button onClick={onClose} style={{ flex: 1, padding: '10px', background: '#EEF1F8', color: '#475569', border: '1px solid #CBD5E1', borderRadius: 6, fontFamily: sans, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StationTab: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ platform: string; time: string } | null>(null);

  const varianceColor = (v: number): string => v === 0 ? '#22C55E' : v <= 15 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Station Dwell-Time Analysis" id="RAIL-04" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr>
                {['Station','Scheduled Dwell (min)','Actual Dwell (min)','Variance'].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {DWELL_STATIONS.map((s, i) => (
                <tr key={s.station} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F4F6FB' }}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{s.station}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, textAlign: 'center' }}>{s.scheduled}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, textAlign: 'center' }}>{s.actual}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, textAlign: 'center', fontWeight: 700, color: varianceColor(s.variance) }}>
                    {s.variance === 0 ? '\u2014' : `+${s.variance} min`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel text="Loading Slot Scheduler" id="RAIL-11" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 10 }}>
          {selectedSlot && (
            <div style={{ padding: '8px 14px', background: '#EEF1F8', border: '1px solid #CBD5E1', borderRadius: 6, fontFamily: mono, fontSize: 12, color: '#1E3A6E' }}>
              Selected: {selectedSlot.platform} @ {selectedSlot.time} \u2014 Train: {SLOT_DATA[selectedSlot.platform]?.[selectedSlot.time] !== '\u2014' ? SLOT_DATA[selectedSlot.platform]?.[selectedSlot.time] : 'EMPTY'}
            </div>
          )}
          <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 13, cursor: 'pointer', marginLeft: 'auto' }}>
            <Plus size={14} /> Book New Slot
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ ...thStyle, width: 70 }}>Platform</th>
                {TIME_SLOTS.map(t => <th key={t} style={{ ...thStyle, textAlign: 'center', fontFamily: mono, fontSize: 10 }}>{t}</th>)}
              </tr>
            </thead>
            <tbody>
              {PLATFORMS.map(p => (
                <tr key={p}>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E', textAlign: 'center', background: '#EEF1F8' }}>{p}</td>
                  {TIME_SLOTS.map(t => {
                    const val = SLOT_DATA[p]?.[t] ?? '\u2014';
                    const isSelected = selectedSlot?.platform === p && selectedSlot?.time === t;
                    return (
                      <td
                        key={t}
                        onClick={() => setSelectedSlot({ platform: p, time: t })}
                        style={{ ...tdStyle, textAlign: 'center', cursor: 'pointer', background: isSelected ? '#2563EB20' : val !== '\u2014' ? '#1E3A6E10' : '#fff', border: isSelected ? '2px solid #2563EB' : '1px solid #EEF1F8', padding: '8px 6px' }}
                      >
                        {val !== '\u2014' ? (
                          <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, color: '#1E3A6E' }}>{val}</span>
                        ) : (
                          <span style={{ color: '#CBD5E1', fontSize: 12 }}>\u2014</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && <SlotModal onClose={() => setShowModal(false)} />}
      </Card>

      <Card>
        <SectionLabel text="Rail-to-Truck Transfer Coordination" id="RAIL-12" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr>
                {['Train','Arrival','Transfer Station','Assigned Trucks','Cargo','Transfer Window','Status'].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {TRANSFER_TABLE.map((row, i) => (
                <tr key={row.train} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F4F6FB' }}>
                  <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E' }}>{row.train}</td>
                  <td style={{ ...tdStyle, fontFamily: mono }}>{row.arrival}</td>
                  <td style={tdStyle}>{row.station}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontSize: 12 }}>{row.trucks}</td>
                  <td style={tdStyle}>{row.cargo}</td>
                  <td style={{ ...tdStyle, fontFamily: mono, fontSize: 12 }}>{row.window}</td>
                  <td style={tdStyle}><StatusChip label={row.status} color={statusColor(row.status)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ── Tab 5: Reefer Wagons ──────────────────────────────────────────────────────

const ReeferTab: React.FC = () => {
  const reeferStatusColor = (s: string): string => {
    if (s === 'IN SERVICE') return '#22C55E';
    if (s === 'LOADED')     return '#2563EB';
    if (s === 'AVAILABLE')  return '#F59E0B';
    return '#94A3B8';
  };

  const telemetry = [
    { label: 'Output Voltage', value: '415 V',     ok: true  },
    { label: 'Frequency',      value: '50.1 Hz',   ok: true  },
    { label: 'Load %',         value: '72%',        ok: true  },
    { label: 'Engine RPM',     value: '1800 rpm',   ok: true  },
    { label: 'Coolant Temp',   value: '88\u00b0C',  ok: false },
    { label: 'Fuel Level',     value: '61%',        ok: true  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Refrigerated Wagon Fleet" id="RAIL-10" />
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr>
                {['Wagon ID','Type','Power','Setpoint','Current Temp','Train','Status','POH Due'].map(h => <th key={h} style={thStyle}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {REEFER_WAGONS.map((w, i) => {
                const spVal = parseFloat(w.setpoint);
                const curVal = parseFloat(w.current);
                const tempOk = w.current !== '\u2014' && !isNaN(spVal) && !isNaN(curVal) && Math.abs(curVal - spVal) < 1.5;
                return (
                  <tr key={w.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F4F6FB' }}>
                    <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E' }}>{w.id}</td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>{w.type}</td>
                    <td style={{ ...tdStyle, fontSize: 12 }}>{w.power}</td>
                    <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#2563EB' }}>{w.setpoint}</td>
                    <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: w.current === '\u2014' ? '#94A3B8' : tempOk ? '#22C55E' : '#EF4444' }}>{w.current}</td>
                    <td style={{ ...tdStyle, fontFamily: mono, fontWeight: 700, color: '#1E3A6E' }}>{w.train}</td>
                    <td style={tdStyle}><StatusChip label={w.status} color={reeferStatusColor(w.status)} /></td>
                    <td style={{ ...tdStyle, fontFamily: mono, fontSize: 12 }}>{w.poh}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <SectionLabel text="Power Car Telemetry \u2014 Train 00902 DFC Reefer Freight" />
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {telemetry.map(t => (
            <div key={t.label} style={{ background: '#EEF1F8', border: `1px solid ${t.ok ? '#CBD5E1' : '#EF4444'}`, borderRadius: 8, padding: '14px 18px', minWidth: 130, flex: '1 1 130px' }}>
              <div style={{ fontFamily: mono, fontSize: 20, fontWeight: 700, color: t.ok ? '#0F1B35' : '#EF4444' }}>{t.value}</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: '#475569', marginTop: 4 }}>{t.label}</div>
              <div style={{ marginTop: 6 }}><StatusChip label={t.ok ? 'NOMINAL' : 'ALERT'} color={t.ok ? '#22C55E' : '#EF4444'} /></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ── Tab 6: Tariff & Demurrage ─────────────────────────────────────────────────

const TariffTab: React.FC = () => {
  const [origin, setOrigin] = useState('Western');
  const [dest, setDest] = useState('Eastern');
  const [wagonType, setWagonType] = useState('BRRNAN-C');
  const [commodityClass, setCommodityClass] = useState('1');
  const [tonnage, setTonnage] = useState('50');
  const [kisanSubsidy, setKisanSubsidy] = useState(false);
  const [tariffResult, setTariffResult] = useState<{ base: number; reefer: number; fuel: number; subsidy: number; net: number } | null>(null);

  const [detWagonId, setDetWagonId] = useState('');
  const [detDays, setDetDays] = useState('3');
  const [detWagonType, setDetWagonType] = useState('BRRNAN-C');
  const [demurrageResult, setDemurrageResult] = useState<number | null>(null);

  const zones = ['Western', 'Eastern', 'Southern', 'Central'];
  const distance = ZONE_DISTANCES[origin]?.[dest] ?? 0;

  const ratePerKm: Record<string, number> = { 'BRRNAN-C': 2.1, 'ISO Reefer 20ft': 3.8, 'ISO Reefer 40ft': 4.5 };
  const commMultiplier: Record<string, number> = { '1': 1.2, '2': 1.0, '3': 0.9 };
  const reeferSurcharge: Record<string, number> = { 'BRRNAN-C': 0, 'ISO Reefer 20ft': 1800, 'ISO Reefer 40ft': 3200 };

  const handleCalcTariff = () => {
    const tons = parseFloat(tonnage) || 0;
    const base = Math.round(distance * (ratePerKm[wagonType] ?? 2.1) * tons * (commMultiplier[commodityClass] ?? 1));
    const reefer = reeferSurcharge[wagonType] ?? 0;
    const fuel = Math.round(base * 0.08);
    const subtotal = base + reefer + fuel;
    const subsidy = kisanSubsidy ? Math.round(subtotal * 0.5) : 0;
    setTariffResult({ base, reefer, fuel, subsidy, net: subtotal - subsidy });
  };

  const handleCalcDemurrage = () => {
    const extraDays = Math.max(0, parseInt(detDays) - 2);
    const rate = detWagonType === 'ISO Reefer 40ft' ? 4500 : 2500;
    setDemurrageResult(extraDays * rate);
  };

  const fmtINR = (n: number) => '\u20b9' + n.toLocaleString('en-IN');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Rail Freight Tariff Calculator" id="RAIL-08" />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Form */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle}>Origin Zone</label>
                <select value={origin} onChange={e => { setOrigin(e.target.value); setTariffResult(null); }} style={selectStyle}>
                  {zones.map(z => <option key={z}>{z}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Destination Zone</label>
                <select value={dest} onChange={e => { setDest(e.target.value); setTariffResult(null); }} style={selectStyle}>
                  {zones.map(z => <option key={z}>{z}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Distance (km)</label>
              <div style={{ padding: '8px 10px', border: '1px solid #CBD5E1', borderRadius: 6, fontFamily: mono, fontSize: 13, color: '#2563EB', background: '#EEF1F8', fontWeight: 700 }}>{distance} km</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Wagon Type</label>
              <select value={wagonType} onChange={e => { setWagonType(e.target.value); setTariffResult(null); }} style={selectStyle}>
                {['BRRNAN-C','ISO Reefer 20ft','ISO Reefer 40ft'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Commodity Class</label>
              <select value={commodityClass} onChange={e => { setCommodityClass(e.target.value); setTariffResult(null); }} style={selectStyle}>
                <option value="1">1 \u2014 Perishable</option>
                <option value="2">2 \u2014 Food Grain</option>
                <option value="3">3 \u2014 General</option>
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Tonnage (MT)</label>
              <input type="number" value={tonnage} onChange={e => { setTonnage(e.target.value); setTariffResult(null); }} min={1} style={inputStyle} />
            </div>
            <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="kisan" checked={kisanSubsidy} onChange={e => { setKisanSubsidy(e.target.checked); setTariffResult(null); }} style={{ width: 16, height: 16, cursor: 'pointer' }} />
              <label htmlFor="kisan" style={{ fontFamily: sans, fontSize: 13, color: '#0F1B35', cursor: 'pointer' }}>Apply Kisan Rail Subsidy (50%)</label>
            </div>
            <button onClick={handleCalcTariff} style={{ width: '100%', padding: '11px', background: '#0F1B35', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Calculate Tariff
            </button>
          </div>
          {/* Result */}
          {tariffResult && (
            <div style={{ flex: '1 1 260px' }}>
              <div style={{ background: '#EEF1F8', border: '1px solid #CBD5E1', borderRadius: 10, padding: 20 }}>
                <div style={{ fontFamily: mono, fontSize: 10, color: '#94A3B8', letterSpacing: '0.06em', marginBottom: 14 }}>ESTIMATED \u2014 DEMO CALCULATION</div>
                {[
                  { label: 'Base Freight Charge',          val: tariffResult.base,     color: '#0F1B35' },
                  { label: 'Refrigeration Surcharge',      val: tariffResult.reefer,   color: '#2563EB' },
                  { label: 'Fuel Adjustment (8%)',         val: tariffResult.fuel,     color: '#F59E0B' },
                  ...(tariffResult.subsidy > 0 ? [{ label: 'Kisan Rail Subsidy (\u221250%)', val: -tariffResult.subsidy, color: '#22C55E' }] : []),
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #CBD5E1' }}>
                    <span style={{ fontFamily: sans, fontSize: 13, color: '#475569' }}>{row.label}</span>
                    <span style={{ fontFamily: mono, fontWeight: 700, color: row.color, fontSize: 14 }}>{row.val < 0 ? '\u2212' : ''}{fmtINR(Math.abs(row.val))}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, padding: '10px 0' }}>
                  <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, color: '#0F1B35' }}>Net Payable</span>
                  <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 22, color: '#1E3A6E' }}>{fmtINR(tariffResult.net)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card>
        <SectionLabel text="Wagon Detention & Demurrage Calculator" id="RAIL-13" />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Wagon ID</label>
              <input value={detWagonId} onChange={e => setDetWagonId(e.target.value)} placeholder="e.g. RFN-4481" style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Total Detention Days</label>
              <input type="number" value={detDays} onChange={e => setDetDays(e.target.value)} min={0} style={inputStyle} />
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, fontFamily: sans }}>Free time: 2 days included</div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Wagon Type</label>
              <select value={detWagonType} onChange={e => setDetWagonType(e.target.value)} style={selectStyle}>
                <option>BRRNAN-C</option>
                <option>ISO Reefer 20ft</option>
                <option>ISO Reefer 40ft</option>
              </select>
            </div>
            <button onClick={handleCalcDemurrage} style={{ width: '100%', padding: '10px', background: '#1E3A6E', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Calculate Demurrage
            </button>
            {demurrageResult !== null && (
              <div style={{ marginTop: 14, padding: 14, background: demurrageResult > 0 ? '#EF444410' : '#22C55E10', border: `1px solid ${demurrageResult > 0 ? '#EF4444' : '#22C55E'}40`, borderRadius: 8 }}>
                <div style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: demurrageResult > 0 ? '#EF4444' : '#22C55E' }}>{fmtINR(demurrageResult)}</div>
                <div style={{ fontFamily: sans, fontSize: 12, color: '#475569', marginTop: 4 }}>
                  {demurrageResult > 0 ? `Demurrage for ${Math.max(0, parseInt(detDays) - 2)} chargeable day(s) at ${fmtINR(detWagonType === 'ISO Reefer 40ft' ? 4500 : 2500)}/day` : 'Within free time \u2014 No demurrage'}
                </div>
              </div>
            )}
          </div>
          <div style={{ flex: '1 1 280px' }}>
            <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, color: '#0F1B35', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>\u26a0 Wagons Currently In Detention</div>
            {DETENTION_WAGONS.map(w => (
              <div key={w.id} style={{ background: '#EF444408', border: '1px solid #EF444430', borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 14, color: '#1E3A6E' }}>{w.id}</span>
                  <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 15, color: '#EF4444' }}>{fmtINR(w.demurrage)}</span>
                </div>
                <div style={{ fontFamily: sans, fontSize: 12, color: '#475569', marginTop: 4 }}>
                  {w.type} \u00b7 {w.days} days total ({w.days - w.free} chargeable)
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ── Tab 7: Disruptions ────────────────────────────────────────────────────────

const DisruptionTab: React.FC = () => {
  const [selectedTrain, setSelectedTrain] = useState('');
  const route = selectedTrain ? DIVERSION_ROUTES[selectedTrain] : null;

  const sevColor = (s: string): string => {
    if (s === 'CRITICAL') return '#EF4444';
    if (s === 'HIGH')     return '#F59E0B';
    return '#2563EB';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Card>
        <SectionLabel text="Active Disruption Alerts" id="RAIL-09" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DISRUPTIONS.map(d => (
            <div key={d.id} style={{ background: sevColor(d.severity) + '0A', border: `1.5px solid ${sevColor(d.severity)}40`, borderLeft: `4px solid ${sevColor(d.severity)}`, borderRadius: 8, padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <ShieldAlert size={16} color={sevColor(d.severity)} />
                <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, color: '#0F1B35' }}>{d.title}</span>
                <StatusChip label={d.severity} color={sevColor(d.severity)} />
              </div>
              <div style={{ fontFamily: sans, fontSize: 13, color: '#475569' }}>{d.detail}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel text="Diversion Route Planner" />
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Select Affected Train</label>
          <select value={selectedTrain} onChange={e => setSelectedTrain(e.target.value)} style={{ ...selectStyle, fontFamily: mono, minWidth: 280 }}>
            <option value="">\u2014 Select Train \u2014</option>
            {TRAINS.map(t => <option key={t.no} value={t.no}>{t.no} \u2014 {t.name}</option>)}
          </select>
        </div>
        {route && (
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {/* Original */}
            <div style={{ flex: '1 1 240px', background: '#EEF1F8', border: '1px solid #CBD5E1', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 12, color: '#475569', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Original Route</div>
              {route.original.map((st, i) => (
                <div key={`orig-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1E3A6E', flexShrink: 0 }} />
                    {i < route.original.length - 1 && <div style={{ width: 2, height: 22, background: '#CBD5E1' }} />}
                  </div>
                  <span style={{ fontFamily: sans, fontSize: 13, color: '#0F1B35', paddingBottom: i < route.original.length - 1 ? 10 : 0 }}>{st}</span>
                </div>
              ))}
            </div>
            {/* Diverted */}
            <div style={{ flex: '1 1 240px', background: '#F59E0B08', border: '1.5px solid #F59E0B40', borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: sans, fontWeight: 700, fontSize: 12, color: '#F59E0B', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Diverted Route</div>
              {route.diverted.map((st, i) => {
                const isNew = !route.original.includes(st);
                return (
                  <div key={`div-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: isNew ? '#F59E0B' : '#1E3A6E', flexShrink: 0 }} />
                      {i < route.diverted.length - 1 && <div style={{ width: 2, height: 22, background: isNew ? '#F59E0B80' : '#CBD5E1' }} />}
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 13, color: isNew ? '#B45309' : '#0F1B35', fontWeight: isNew ? 700 : 400, paddingBottom: i < route.diverted.length - 1 ? 10 : 0 }}>
                      {st}{isNew ? ' \u2736' : ''}
                    </span>
                  </div>
                );
              })}
              <div style={{ marginTop: 14, padding: '8px 12px', background: '#F59E0B15', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} color="#F59E0B" />
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 13, color: '#B45309' }}>ETA Impact: {route.etaImpact}</span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────

export const RailwayAdminPortalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [showVerify, setShowVerify] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'timetable':  return <TimetableTab />;
      case 'wagon':      return <WagonTab />;
      case 'capacity':   return <CapacityTab />;
      case 'station':    return <StationTab />;
      case 'reefer':     return <ReeferTab />;
      case 'tariff':     return <TariffTab />;
      case 'disruption': return <DisruptionTab />;
      default:           return null;
    }
  };

  return (
    <div className="railway-portal" style={{ background: '#F4F6FB', minHeight: '100%' }}>

      {/* ── Header ── */}
      <div style={{ background: '#0F1B35' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, height: 64 }}>
          {/* Signal lights + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 6px #EF4444' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Train size={20} color="#3B82F6" />
              <span style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, color: '#FFFFFF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Rail Network Ops Console
              </span>
            </div>
          </div>
          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: sans, fontSize: 11, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Rail Administration \u00b7 ColdChain 360
            </span>
            <span style={{ fontFamily: mono, fontSize: 12, color: '#3B82F6', background: '#1E3A6E', border: '1px solid #2563EB40', borderRadius: 4, padding: '3px 10px', letterSpacing: '0.06em' }}>
              14 / 14 FEATURES
            </span>
            <button
              onClick={() => setShowVerify(true)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, fontFamily: sans, fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: '0.04em' }}
            >
              <CheckCircle2 size={13} /> Verify Features
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={{ background: '#FFFFFF', borderBottom: '2px solid #CBD5E1', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', minWidth: 'max-content' }}>
          {TABS.map(tab => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '14px 22px',
                  border: 'none',
                  borderBottom: active ? '3px solid #0F1B35' : '3px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: sans,
                  fontWeight: active ? 700 : 500,
                  fontSize: 13,
                  color: active ? '#0F1B35' : '#475569',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  marginBottom: -2,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Tab Content ── */}
      <div style={{ padding: '28px 32px', maxWidth: 1280, margin: '0 auto' }}>
        {renderTab()}
      </div>

      {/* ── Shared Reports Footer ── */}
      <div style={{ padding: '0 32px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <SharedReportsAnalyticsExport portalName="Railway Administration" />
      </div>

      {/* ── Verification Modal ── */}
      {showVerify && (
        <VerificationMatrixModal
          features={FEATURES}
          portalName="Railway Administration Portal"
          onClose={() => setShowVerify(false)}
        />
      )}

    </div>
  );
};
