import React, { useState, useMemo, useEffect } from 'react';
import api from '../services/api';
import {
  AlertTriangle,
  RotateCw,
  CheckCircle2,
  ShieldAlert,
  X,
  Clock,
  Navigation,
  ArrowRight,
  Filter,
  Layers,
  Thermometer,
  Truck,
  Bell,
  Sliders,
  Mail,
  Smartphone,
  Check,
  Download,
  CheckCheck,
  AlertOctagon,
  Wrench,
  Search,
  Sparkles,
  Info
} from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────────────────────────────
export type AlertSeverity = 'Critical' | 'Warning' | 'Info';
export type AlertStatus = 'Active' | 'Acknowledged' | 'Resolved';
export type AlertType =
  | 'High Temp Alert'
  | 'Low Temp Alert'
  | 'Delivery Delay'
  | 'Route Deviation'
  | 'Vehicle Breakdown';

export interface ColdChainAlert {
  id: string;
  type: AlertType;
  category: 'Temperature' | 'Delivery' | 'Route Deviation' | 'Vehicle';
  severity: AlertSeverity;
  vehicleId: string;
  shipmentId: string;
  driverName?: string;
  title: string;
  message: string;
  timestamp: string;
  relativeTime: string;
  status: AlertStatus;
  currentTemp?: string;
  threshold?: string;
  location: string;
  recommendation: string;
}

// ─── 15 DEMO ALERTS ──────────────────────────────────────────────────────────
const INITIAL_DEMO_ALERTS: ColdChainAlert[] = [
  {
    id: 'ALT-101',
    type: 'High Temp Alert',
    category: 'Temperature',
    severity: 'Critical',
    vehicleId: 'CC-102',
    shipmentId: 'SHP-8092',
    driverName: 'Rajesh Sharma',
    title: 'Core Chamber Temp Exceeded +8.0°C Threshold',
    message: 'Reefer container interior temperature spiked to +9.4°C (Safe limit: +2°C to +8°C). Compressor primary loop pressure dropped below 45 PSI in Jalgaon corridor.',
    timestamp: '2026-10-21 15:42 IST',
    relativeTime: '12 mins ago',
    status: 'Active',
    currentTemp: '+9.4°C',
    threshold: '+8.0°C Max',
    location: 'Jalgaon Bypass (NH-53), Maharashtra',
    recommendation: 'Autonomous Bypass: Direct driver to Shrirampur Cold Depot or engage secondary diesel generator.',
  },
  {
    id: 'ALT-102',
    type: 'Low Temp Alert',
    category: 'Temperature',
    severity: 'Warning',
    vehicleId: 'CC-124',
    shipmentId: 'SHP-8125',
    driverName: 'Satish Patil',
    title: 'Cryo Chamber Overcooling Below -75°C Nominal',
    message: 'Chamber sensor T-2 logged -82.4°C on Baddi-Hyderabad corridor. Risk of structural glass micro-fractures in biological vaccine ampoules.',
    timestamp: '2026-10-21 15:26 IST',
    relativeTime: '28 mins ago',
    status: 'Active',
    currentTemp: '-82.4°C',
    threshold: '-70.0°C Min',
    location: 'NH-44 Adilabad Industrial Corridor',
    recommendation: 'Throttle liquid nitrogen injector valve duty cycle to 40% via remote IoT telemetry link.',
  },
  {
    id: 'ALT-103',
    type: 'Route Deviation',
    category: 'Route Deviation',
    severity: 'Critical',
    vehicleId: 'CC-102',
    shipmentId: 'SHP-8092',
    driverName: 'Rajesh Sharma',
    title: 'Geofenced Corridor Deviation Detected (4.8 km Off)',
    message: 'Truck CC-102 departed approved NH-53 high-speed expressway. Telemetry confirms 18 minutes stationary at an uncertified road junction.',
    timestamp: '2026-10-21 15:05 IST',
    relativeTime: '45 mins ago',
    status: 'Acknowledged',
    location: 'Jalgaon Outer Bypass Link, Maharashtra',
    recommendation: 'Contact driver Rajesh Sharma immediately. Dispatch security escort if no telemetry ping within 10 minutes.',
  },
  {
    id: 'ALT-104',
    type: 'Delivery Delay',
    category: 'Delivery',
    severity: 'Warning',
    vehicleId: 'CC-107',
    shipmentId: 'SHP-8104',
    driverName: 'Amit Verma',
    title: 'Projected Arrival Delay +45m at Bhiwandi MegaHub',
    message: 'Freight choke point bottleneck on Samruddhi Mahamarg Shirdi corridor. Revised autonomous ETA updated to 19:55 IST.',
    timestamp: '2026-10-21 14:45 IST',
    relativeTime: '1.2h ago',
    status: 'Active',
    location: 'Samruddhi Mahamarg Shirdi Corridor',
    recommendation: 'Reschedule inbound warehouse unloading dock slot at Bhiwandi from Bay 4 to Bay 9.',
  },
  {
    id: 'ALT-105',
    type: 'Vehicle Breakdown',
    category: 'Vehicle',
    severity: 'Critical',
    vehicleId: 'CC-118',
    shipmentId: 'SHP-8119',
    driverName: 'Vikram Rathore',
    title: 'Auxiliary Refrigeration Alternator Stalled',
    message: 'Thermo King reefer alternator stalled on Ahmednagar bypass. Currently operating on 24V backup battery bank (estimated 38 mins runtime).',
    timestamp: '2026-10-21 14:15 IST',
    relativeTime: '1.5h ago',
    status: 'Active',
    currentTemp: '+4.8°C',
    threshold: '+6.0°C Max',
    location: 'Ahmednagar Bypass (NH-61), Maharashtra',
    recommendation: 'Urgent mobile technician dispatch dispatched from Pune Hub (ETA 34m). Driver notified to stay parked in shaded lot.',
  },
  {
    id: 'ALT-106',
    type: 'High Temp Alert',
    category: 'Temperature',
    severity: 'Warning',
    vehicleId: 'CC-131',
    shipmentId: 'SHP-8138',
    driverName: 'Harpreet Singh',
    title: 'Fresh Produce Chamber Drift (+7.1°C vs +4.0°C)',
    message: 'Organic strawberry consignment chamber temperature elevated during prolonged defrost cycle. Thermal drift rate +0.4°C/15min.',
    timestamp: '2026-10-21 13:40 IST',
    relativeTime: '2h ago',
    status: 'Acknowledged',
    currentTemp: '+7.1°C',
    threshold: '+5.0°C Max',
    location: 'Indore Ring Road Interchange Plaza',
    recommendation: 'Abort automated defrost sequence. Force chiller active refrigeration cycle.',
  },
  {
    id: 'ALT-107',
    type: 'Delivery Delay',
    category: 'Delivery',
    severity: 'Critical',
    vehicleId: 'CC-168',
    shipmentId: 'SHP-8164',
    driverName: 'Kuldeep Yadav',
    title: 'Severe Customs Clearance Queue at JNPT Port',
    message: 'Port container terminal customs scan server outage. Outbound maritime export consignment delayed by 2h 15m; risks vessel cut-off time.',
    timestamp: '2026-10-21 13:10 IST',
    relativeTime: '2.5h ago',
    status: 'Active',
    location: 'JNPT Port Container Terminal Gate 3',
    recommendation: 'Activate VIP green-channel customs clearance token via automated API gateway.',
  },
  {
    id: 'ALT-108',
    type: 'Vehicle Breakdown',
    category: 'Vehicle',
    severity: 'Warning',
    vehicleId: 'CC-156',
    shipmentId: 'SHP-8153',
    driverName: 'Sandeep Rao',
    title: 'Left Outer Dual Tire TPMS Loss (92 PSI)',
    message: 'Tire pressure sensor detected progressive slow leak (-26 PSI below nominal 118 PSI). Safe highway speed capped at 60 km/h.',
    timestamp: '2026-10-21 12:45 IST',
    relativeTime: '3h ago',
    status: 'Resolved',
    location: 'NH-48 Chitradurga Sector, Karnataka',
    recommendation: 'Tire swapped at Chitradurga authorized commercial pitstop. PSI verified 120.',
  },
  {
    id: 'ALT-109',
    type: 'Low Temp Alert',
    category: 'Temperature',
    severity: 'Warning',
    vehicleId: 'CC-142',
    shipmentId: 'SHP-8147',
    driverName: 'Manoj Shinde',
    title: 'Liquid Dairy Chiller Approaching Freezing (-0.8°C)',
    message: 'Temperature in liquid pasteurized milk tank dropped below freezing point. Risk of emulsion separation and protein degradation.',
    timestamp: '2026-10-21 11:30 IST',
    relativeTime: '4.2h ago',
    status: 'Resolved',
    currentTemp: '-0.8°C',
    threshold: '+1.0°C Min',
    location: 'Kirloskarvadi Industrial Feeder Highway',
    recommendation: 'Chiller setpoint adjusted to +2.5°C. Milk bulk agitator engaged successfully.',
  },
  {
    id: 'ALT-110',
    type: 'Route Deviation',
    category: 'Route Deviation',
    severity: 'Warning',
    vehicleId: 'CC-131',
    shipmentId: 'SHP-8138',
    driverName: 'Harpreet Singh',
    title: 'Unvetted Rural Shortcut Taken Near Indore',
    message: 'Vehicle bypassed official highway bypass onto narrow unpaved state road. High vibration telemetry detected on solar module cargo.',
    timestamp: '2026-10-21 10:15 IST',
    relativeTime: '5.5h ago',
    status: 'Acknowledged',
    location: 'Indore Rural Sector Route 14',
    recommendation: 'Audio alert broadcast to cabin. Driver returning to national highway via Exit 4B.',
  },
  {
    id: 'ALT-111',
    type: 'Delivery Delay',
    category: 'Delivery',
    severity: 'Info',
    vehicleId: 'CC-124',
    shipmentId: 'SHP-8125',
    driverName: 'Satish Patil',
    title: 'Precautionary Speed Reduction (+20m ETA)',
    message: 'Heavy monsoonal downpour and dense fog in Adilabad ghat section. Speed intentionally throttled to 55 km/h for load stability.',
    timestamp: '2026-10-21 09:20 IST',
    relativeTime: '6.4h ago',
    status: 'Resolved',
    location: 'NH-44 Adilabad Section',
    recommendation: 'Weather cleared. Vehicle resumed normal speed schedule without cold chain impact.',
  },
  {
    id: 'ALT-112',
    type: 'High Temp Alert',
    category: 'Temperature',
    severity: 'Critical',
    vehicleId: 'WH-BHIWANDI',
    shipmentId: 'BAY-A-ICE',
    title: 'Deep Freeze Bay A Evaporator Fan Anomaly (-15.4°C)',
    message: 'Warehouse Deep Freeze room temperature warmed above -18°C setpoint due to primary evaporator coil icing.',
    timestamp: '2026-10-21 07:45 IST',
    relativeTime: '8h ago',
    status: 'Acknowledged',
    currentTemp: '-15.4°C',
    threshold: '-18.0°C Max',
    location: 'Bhiwandi Cold MegaHub, Chamber A',
    recommendation: 'Secondary redundant refrigeration unit switched on. Core product temperatures remained within safe range.',
  },
  {
    id: 'ALT-113',
    type: 'Vehicle Breakdown',
    category: 'Vehicle',
    severity: 'Critical',
    vehicleId: 'CC-102',
    shipmentId: 'SHP-8092',
    driverName: 'Rajesh Sharma',
    title: 'Tractor Engine Coolant Overheating Warning (104°C)',
    message: 'Main prime-mover engine temperature triggered critical dashboard sensor. Driver pulled over safely to expressway shoulder.',
    timestamp: '2026-10-21 05:30 IST',
    relativeTime: '10h ago',
    status: 'Resolved',
    location: 'Amravati Multi-Modal Toll Plaza',
    recommendation: 'Coolant topped up by toll breakdown crew. Engine thermal benchmark restored to 88°C.',
  },
  {
    id: 'ALT-114',
    type: 'Route Deviation',
    category: 'Route Deviation',
    severity: 'Info',
    vehicleId: 'CC-107',
    shipmentId: 'SHP-8104',
    driverName: 'Amit Verma',
    title: 'Highway Authority Traffic Diversion at Igatpuri',
    message: 'Expressway lane repair necessitated minor 2.2 km detour through service road. ETA impact under 8 minutes.',
    timestamp: '2026-10-21 03:15 IST',
    relativeTime: '12.5h ago',
    status: 'Resolved',
    location: 'Igatpuri Descent Corridor',
    recommendation: 'Route cleared and normalized. System logging zero route deviation penalty.',
  },
  {
    id: 'ALT-115',
    type: 'Low Temp Alert',
    category: 'Temperature',
    severity: 'Info',
    vehicleId: 'CC-168',
    shipmentId: 'SHP-8164',
    driverName: 'Kuldeep Yadav',
    title: 'Chamber Pre-cooling Target Complete (-22.0°C)',
    message: 'Vehicle CC-168 completed 45-minute mandatory pre-cooling cycle. Ready for frozen marine export loading.',
    timestamp: '2026-10-21 01:20 IST',
    relativeTime: '14.3h ago',
    status: 'Resolved',
    currentTemp: '-22.0°C',
    threshold: '-20.0°C Target',
    location: 'Manesar Automotive Manufacturing Zone',
    recommendation: 'Dock loading commenced under sealed air-curtain protocol.',
  },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export const AlertsPage: React.FC = () => {
  // Alert list state
  const [alerts, setAlerts] = useState<ColdChainAlert[]>(INITIAL_DEMO_ALERTS);

  // 5 Tabs: All Alerts | Temperature | Delivery | Route Deviation | Vehicle
  const [activeTab, setActiveTab] = useState<'All Alerts' | 'Temperature' | 'Delivery' | 'Route Deviation' | 'Vehicle'>('All Alerts');

  // Filter bar states
  const [dateRange, setDateRange] = useState<'All' | 'Today' | 'Past 24h' | 'Past 7 Days'>('All');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical' | 'Warning' | 'Info'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Acknowledged' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected alert modal
  const [selectedAlert, setSelectedAlert] = useState<ColdChainAlert | null>(null);

  useEffect(() => {
    api.getAlerts().then((data) => {
      if (data && data.length > 0) {
        const mapped: ColdChainAlert[] = data.map((a) => ({
          id: a.id,
          type: (a.alert_type === 'Temperature Excursion' ? 'High Temp Alert' : 'Vehicle Breakdown') as any,
          category: (a.alert_type === 'Temperature Excursion' ? 'Temperature' : 'Vehicle') as any,
          severity: (a.severity === 'critical' ? 'Critical' : a.severity === 'warning' ? 'Warning' : 'Info') as any,
          vehicleId: a.truck_id || 'CC-102',
          shipmentId: a.shipment_id || 'SHP-8092',
          title: a.title,
          message: a.description,
          timestamp: '2026-10-21 13:45 IST',
          relativeTime: 'Just now',
          status: (a.is_resolved ? 'Resolved' : a.is_acknowledged ? 'Acknowledged' : 'Active') as any,
          location: 'NH-66 Khed Corridor',
          recommendation: a.recommended_actions?.[0]?.description || 'Initiate standard cold preservation protocol.',
        }));
        setAlerts((prev) => {
          const ids = new Set(mapped.map((m) => m.id));
          return [...mapped, ...prev.filter((p) => !ids.has(p.id))];
        });
      }
    }).catch(() => {});
  }, []);

  // Notification Settings states
  const [smsEnabled, setSmsEnabled] = useState<boolean>(true);
  const [emailEnabled, setEmailEnabled] = useState<boolean>(true);
  const [inAppEnabled, setInAppEnabled] = useState<boolean>(true);
  const [highTempThreshold, setHighTempThreshold] = useState<string>('8.0');
  const [lowTempThreshold, setLowTempThreshold] = useState<string>('2.0');
  const [settingsSavedToast, setSettingsSavedToast] = useState<string | null>(null);
  const [thresholdError, setThresholdError] = useState<string | null>(null);

  // Export & Action Toasts
  const [actionToast, setActionToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => {
      setActionToast(null);
    }, 3500);
  };

  // Active alert count
  const activeAlertCount = useMemo(() => {
    return alerts.filter((a) => a.status === 'Active').length;
  }, [alerts]);

  // Tab count helper
  const getTabCount = (tab: typeof activeTab) => {
    if (tab === 'All Alerts') return alerts.length;
    return alerts.filter((a) => a.category === tab).length;
  };

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter((item) => {
      // Tab filter
      const matchTab = activeTab === 'All Alerts' || item.category === activeTab;

      // Severity filter
      const matchSeverity = severityFilter === 'All' || item.severity === severityFilter;

      // Status filter
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;

      // Date Range simulation
      let matchDate = true;
      if (dateRange === 'Today') {
        matchDate = item.relativeTime.includes('m') || item.relativeTime.includes('h');
      } else if (dateRange === 'Past 24h') {
        matchDate = true; // all 15 demo alerts are within 24h
      }

      // Search Query
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchTab && matchSeverity && matchStatus && matchDate && matchSearch;
    });
  }, [alerts, activeTab, severityFilter, statusFilter, dateRange, searchQuery]);

  // Handlers for alert status changes
  const handleAcknowledge = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    api.acknowledgeAlert(id, 'Control Room Operator').catch(() => {});
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Acknowledged' } : a))
    );
    if (selectedAlert?.id === id) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: 'Acknowledged' } : null));
    }
    showToast(`Alert ${id} acknowledged.`);
  };

  const handleResolve = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    api.resolveAlert(id, 'Resolved via standard operating procedure.').catch(() => {});
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Resolved' } : a))
    );
    if (selectedAlert?.id === id) {
      setSelectedAlert((prev) => (prev ? { ...prev, status: 'Resolved' } : null));
    }
    showToast(`Alert ${id} resolved successfully.`);
  };

  // Bulk actions
  const handleMarkAllAcknowledged = () => {
    setAlerts((prev) =>
      prev.map((a) => (a.status === 'Active' ? { ...a, status: 'Acknowledged' } : a))
    );
    showToast('All active alerts marked as acknowledged.');
  };

  const handleExportAlerts = () => {
    showToast(`Alert log exported (${filteredAlerts.length} records in CSV).`);
  };

  // Settings Save Handler with Validation
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setThresholdError(null);

    const high = parseFloat(highTempThreshold);
    const low = parseFloat(lowTempThreshold);

    if (isNaN(high) || isNaN(low)) {
      setThresholdError('Please enter valid numerical temperature values.');
      return;
    }

    if (high <= low) {
      setThresholdError('High temperature threshold must be strictly greater than low temperature threshold.');
      return;
    }

    setSettingsSavedToast('Notification channels & thermal thresholds updated successfully.');
    setTimeout(() => {
      setSettingsSavedToast(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">

      {/* Floating Action Toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#06383D] text-white px-4 py-3 rounded-xl border border-[#F2AE32]/40 shadow-xl flex items-center gap-3 font-mono text-xs animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-[#F2AE32]" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* ─── HEADER WITH ACTIVE ALERT BADGE ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D]">
              ColdChain 360 AI · Telemetry Exception Engine
            </span>
            <span className="bg-[#F2AE32]/15 text-[#F2AE32] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#F2AE32]/30">
              DEMO DATA (15 ALERTS)
            </span>
            <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              Every Degree. Every Route. Every Delivery.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl lg:text-3xl font-black text-[#292D2F] tracking-tight">
              Alerts &amp; Notifications
            </h1>
            <span className="px-2.5 py-1 rounded-full bg-[#DC2626] text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {activeAlertCount} Active Anomaly{activeAlertCount === 1 ? '' : 's'}
            </span>
          </div>

          <p className="text-xs lg:text-sm text-[#A5A5A4] font-medium mt-1">
            Real-time cold-chain exception triage: High/Low thermal breaches, ETA delays, unauthorized route diversions, and refrigeration mechanics.
          </p>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <button
            onClick={handleMarkAllAcknowledged}
            disabled={activeAlertCount === 0}
            className={`px-3 py-2 rounded-lg border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeAlertCount > 0
                ? 'bg-white border-[#D0CEC9] text-[#292D2F] hover:border-[#06383D] shadow-2xs'
                : 'bg-[#F0EEEA] border-[#D0CEC9] text-[#A5A5A4] cursor-not-allowed opacity-60'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#16803C]" />
            <span>Mark All Read</span>
          </button>

          <button
            onClick={handleExportAlerts}
            className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* ─── 5 TABS: ALL | TEMPERATURE | DELIVERY | ROUTE DEVIATION | VEHICLE ─── */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#D0CEC9] shadow-xs overflow-x-auto">
        {(
          [
            { key: 'All Alerts', label: 'All Alerts', icon: Bell },
            { key: 'Temperature', label: 'Temperature', icon: Thermometer },
            { key: 'Delivery', label: 'Delivery', icon: Clock },
            { key: 'Route Deviation', label: 'Route Deviation', icon: Navigation },
            { key: 'Vehicle', label: 'Vehicle', icon: Truck },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const count = getTabCount(tab.key);
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#06383D] text-white shadow-xs'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F2AE32]' : ''}`} />
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F0EEEA] text-[#A5A5A4]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── FILTER BAR ─── */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#06383D]" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#292D2F]">
              Alert Filter Radar
            </span>
          </div>
          <span className="text-xs font-mono text-[#A5A5A4]">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#A5A5A4]" />
            <input
              type="text"
              placeholder="Search truck, title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#D0CEC9] rounded-lg pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#F2AE32]"
            />
          </div>

          {/* Date Range */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32] font-sans"
            >
              <option value="All">All Timestamps</option>
              <option value="Today">Today's Alerts</option>
              <option value="Past 24h">Past 24 Hours</option>
              <option value="Past 7 Days">Past 7 Days</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32] font-sans"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical (Red)</option>
              <option value="Warning">Warning (Amber)</option>
              <option value="Info">Info (Teal/Blue)</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs text-[#292D2F] focus:outline-none focus:border-[#F2AE32] font-sans"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Acknowledged">Acknowledged</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* ─── ALERT CARDS LIST ─── */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-12 text-center space-y-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-[#16803C] mx-auto" />
            <h3 className="text-base font-bold text-[#292D2F]">No Alerts Found</h3>
            <p className="text-xs text-[#A5A5A4] max-w-md mx-auto">
              No anomalies matching the selected filters. All cold-chain consignments in this view are running within certified envelope standards.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map((alert) => {
              const isCritical = alert.severity === 'Critical';
              const isWarning = alert.severity === 'Warning';
              const isResolved = alert.status === 'Resolved';
              const isAcknowledged = alert.status === 'Acknowledged';

              // Severity Icon & Styling
              let severityIcon = <Info className="w-4 h-4 text-[#06383D]" />;
              let severityBadge = 'bg-[#06383D]/10 text-[#06383D] border border-[#06383D]/20';
              let cardBorder = 'border-[#D0CEC9] hover:border-[#06383D]/40';

              if (isCritical) {
                severityIcon = <AlertTriangle className="w-4 h-4 text-[#DC2626]" />;
                severityBadge = 'bg-red-50 text-[#DC2626] border border-red-200';
                cardBorder = alert.status === 'Active' ? 'border-[#DC2626] shadow-xs' : 'border-[#D0CEC9]';
              } else if (isWarning) {
                severityIcon = <AlertOctagon className="w-4 h-4 text-[#F2AE32]" />;
                severityBadge = 'bg-[#F2AE32]/15 text-[#F2AE32] border border-[#F2AE32]/30';
                cardBorder = alert.status === 'Active' ? 'border-[#F2AE32]/80' : 'border-[#D0CEC9]';
              }

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`bg-white rounded-xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${cardBorder} ${
                    isResolved ? 'opacity-70 bg-white/70' : ''
                  }`}
                >
                  {/* Top Bar: Severity Icon, Alert Type & Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 border-b border-[#D0CEC9]/60 pb-3">
                      <div className="flex items-center gap-2">
                        {severityIcon}
                        <span className="font-mono text-xs font-black text-[#292D2F]">
                          {alert.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${severityBadge}`}>
                          {alert.severity}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            isResolved
                              ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                              : isAcknowledged
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-red-50 text-[#DC2626] border border-red-200 animate-pulse'
                          }`}
                        >
                          {alert.status}
                        </span>
                      </div>
                    </div>

                    {/* IDs & Relative Time */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#A5A5A4]">
                      <div className="flex items-center gap-1.5 font-bold text-[#06383D]">
                        <span>{alert.vehicleId}</span>
                        <span>·</span>
                        <span>{alert.shipmentId}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.relativeTime}
                      </span>
                    </div>

                    {/* Title & Message */}
                    <div>
                      <h3 className="text-sm font-bold text-[#292D2F] font-sans group-hover:text-[#06383D] transition-colors line-clamp-1">
                        {alert.title}
                      </h3>
                      <p className="text-xs text-[#A5A5A4] mt-1 font-sans line-clamp-2 leading-relaxed">
                        {alert.message}
                      </p>
                    </div>

                    {/* Telemetry pill if present */}
                    {alert.currentTemp && (
                      <div className="p-2 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between text-xs font-mono">
                        <span className="text-[#A5A5A4] text-[11px]">Telemetry Reading:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#DC2626]">{alert.currentTemp}</span>
                          <span className="text-[10px] text-[#A5A5A4]">({alert.threshold})</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom: Location & Action Buttons */}
                  <div className="pt-2 border-t border-[#D0CEC9]/60 space-y-3">
                    <div className="text-[11px] font-mono text-[#A5A5A4] truncate">
                      📍 {alert.location}
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {alert.status === 'Active' && (
                        <button
                          onClick={(e) => handleAcknowledge(alert.id, e)}
                          className="flex-1 py-1.5 px-3 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] hover:border-[#06383D] font-bold text-[11px] transition-all cursor-pointer"
                        >
                          Acknowledge
                        </button>
                      )}

                      {alert.status !== 'Resolved' ? (
                        <button
                          onClick={(e) => handleResolve(alert.id, e)}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-[#06383D] hover:bg-[#06383D]/85 text-white font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Check className="w-3 h-3 text-[#F2AE32]" />
                          <span>Resolve</span>
                        </button>
                      ) : (
                        <div className="w-full py-1 px-2 rounded bg-emerald-50 text-[#16803C] text-[11px] font-bold text-center border border-emerald-200">
                          ✓ Resolved
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── NOTIFICATION SETTINGS SECTION (AT BOTTOM) ─── */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D0CEC9] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#06383D]/10 flex items-center justify-center text-[#06383D]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#292D2F]">
                Notification &amp; Escalation Settings
              </h2>
              <p className="text-xs text-[#A5A5A4] font-medium">
                Configure autonomous dispatch triggers, multi-channel alerts, and cold-chain temperature excursion thresholds.
              </p>
            </div>
          </div>
          <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded self-start sm:self-auto">
            GLOBAL POLICY
          </span>
        </div>

        {/* Feedback Messages */}
        {settingsSavedToast && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16803C] shrink-0" />
            <span>{settingsSavedToast}</span>
          </div>
        )}

        {thresholdError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-xs font-mono font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
            <span>{thresholdError}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3 Channels: SMS, Email, In-App */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                1. Delivery Notification Channels (3 Channels)
              </div>

              {/* SMS Channel */}
              <div className="p-3.5 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-[#06383D]" />
                  <div>
                    <div className="text-xs font-bold text-[#292D2F]">SMS Telemetry Dispatch</div>
                    <div className="text-[11px] text-[#A5A5A4]">Priority SMS sent to driver &amp; hub manager</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsEnabled(!smsEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    smsEnabled ? 'bg-[#06383D]' : 'bg-[#D0CEC9]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform shadow-xs absolute top-1 ${
                      smsEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* Email Channel */}
              <div className="p-3.5 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06383D]" />
                  <div>
                    <div className="text-xs font-bold text-[#292D2F]">Email Critical Incident Digest</div>
                    <div className="text-[11px] text-[#A5A5A4]">Formal audit trail to operations &amp; QA team</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    emailEnabled ? 'bg-[#06383D]' : 'bg-[#D0CEC9]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform shadow-xs absolute top-1 ${
                      emailEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* In-App Channel */}
              <div className="p-3.5 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-[#06383D]" />
                  <div>
                    <div className="text-xs font-bold text-[#292D2F]">In-App Control Tower Radar</div>
                    <div className="text-[11px] text-[#A5A5A4]">Instant banner notification and audio ping</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInAppEnabled(!inAppEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    inAppEnabled ? 'bg-[#06383D]' : 'bg-[#D0CEC9]'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform transform shadow-xs absolute top-1 ${
                      inAppEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Threshold Settings: High temp & Low temp */}
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
                2. Cold-Chain Thermal Envelope Thresholds
              </div>

              <div className="p-4 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] space-y-4">
                {/* High Temp Threshold */}
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#292D2F] flex items-center justify-between">
                    <span>High Temp Breach Threshold (°C)</span>
                    <span className="text-[10px] text-[#DC2626]">Triggers High Temp Alert</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={highTempThreshold}
                      onChange={(e) => setHighTempThreshold(e.target.value)}
                      className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-sm text-[#292D2F] font-mono focus:outline-none focus:border-[#F2AE32]"
                      placeholder="e.g. 8.0"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-mono text-[#A5A5A4]">°C</span>
                  </div>
                  <div className="text-[10px] text-[#A5A5A4]">
                    Nominal pharma upper limit is usually +8.0°C. Exceeding triggers instantaneous bypass.
                  </div>
                </div>

                {/* Low Temp Threshold */}
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#292D2F] flex items-center justify-between">
                    <span>Low Temp Breach Threshold (°C)</span>
                    <span className="text-[10px] text-[#06383D]">Triggers Low Temp Alert</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={lowTempThreshold}
                      onChange={(e) => setLowTempThreshold(e.target.value)}
                      className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-sm text-[#292D2F] font-mono focus:outline-none focus:border-[#F2AE32]"
                      placeholder="e.g. 2.0"
                    />
                    <span className="absolute right-3 top-2.5 text-xs font-mono text-[#A5A5A4]">°C</span>
                  </div>
                  <div className="text-[10px] text-[#A5A5A4]">
                    Lower safety limit for chilling. Falling below risks irreversible freezing crystallization.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 border-t border-[#D0CEC9]/60 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs font-mono text-[#A5A5A4]">
              * Policy changes immediately calibrate edge IoT sensor beacons across all 128 active trucks.
            </span>
            <button
              type="submit"
              className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-6 py-2.5 hover:bg-[#F2AE32]/85 transition-all text-xs font-mono uppercase tracking-wider cursor-pointer shadow-xs"
            >
              Save Notification Settings
            </button>
          </div>
        </form>
      </div>

      {/* ─── MODAL: ALERT DETAIL & DISPATCH ACTION ─── */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] p-6 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                <span className="text-base font-bold font-mono text-[#292D2F]">
                  {selectedAlert.id} · {selectedAlert.type}
                </span>
              </div>
              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1 rounded-lg text-[#A5A5A4] hover:text-[#292D2F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="text-base font-bold font-sans text-[#292D2F]">
                {selectedAlert.title}
              </div>
              <p className="text-[#A5A5A4] font-sans leading-relaxed">
                {selectedAlert.message}
              </p>

              {/* Anomaly Details */}
              <div className="p-3.5 rounded-lg bg-[#F0EEEA] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Vehicle ID:</span>
                  <span className="font-bold text-[#292D2F]">{selectedAlert.vehicleId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Shipment Reference:</span>
                  <span className="font-bold text-[#06383D]">{selectedAlert.shipmentId}</span>
                </div>
                {selectedAlert.driverName && (
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Assigned Driver:</span>
                    <span className="font-bold text-[#292D2F]">{selectedAlert.driverName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Telemetry Timestamp:</span>
                  <span className="font-bold text-[#292D2F]">{selectedAlert.timestamp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Last Known Coordinates:</span>
                  <span className="font-bold text-[#292D2F]">{selectedAlert.location}</span>
                </div>
                {selectedAlert.currentTemp && (
                  <div className="flex justify-between pt-1 border-t border-[#D0CEC9]">
                    <span className="text-[#A5A5A4]">Temp Sensor:</span>
                    <span className="font-bold text-[#DC2626]">
                      {selectedAlert.currentTemp} (Safe Envelope: {selectedAlert.threshold})
                    </span>
                  </div>
                )}
              </div>

              {/* AI Recommendation */}
              <div className="p-3.5 rounded-lg bg-[#F2AE32]/10 border border-[#F2AE32]/30 text-[#292D2F]">
                <strong className="text-[#F2AE32] block mb-1 uppercase font-bold text-[10px]">
                  ColdChain 360 AI Recommended Action:
                </strong>
                {selectedAlert.recommendation}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center gap-3">
              {selectedAlert.status === 'Active' && (
                <button
                  onClick={() => handleAcknowledge(selectedAlert.id)}
                  className="flex-1 py-2.5 rounded-lg border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] font-bold text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  ACKNOWLEDGE
                </button>
              )}

              {selectedAlert.status !== 'Resolved' ? (
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="flex-1 py-2.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/85 text-white font-bold text-xs font-mono uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-[#F2AE32]" />
                  <span>EXECUTE RESOLUTION</span>
                </button>
              ) : (
                <div className="flex-1 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16803C] font-bold text-xs font-mono text-center">
                  ✓ EXCEPTION FULLY RESOLVED
                </div>
              )}

              <button
                onClick={() => setSelectedAlert(null)}
                className="px-4 py-2.5 rounded-lg border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] font-bold text-xs font-mono uppercase"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Demo Note */}
      <div className="border-t border-[#D0CEC9] pt-4 text-center text-xs font-mono text-[#A5A5A4]">
        * All 15 telemetry alerts, sensor thresholds, and automated actions are simulated for demonstration purposes.
      </div>
    </div>
  );
};
