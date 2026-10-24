import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { 
  Truck, 
  Search, 
  Filter, 
  Gauge, 
  Fuel, 
  Wrench, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  Layers,
  Users,
  Calendar,
  Thermometer,
  Clock,
  Phone,
  ShieldCheck,
  Zap,
  Plus
} from 'lucide-react';
import { MOCK_TRUCKS, MOCK_DRIVERS, FTLTruck, FTLDriver } from '../data/ftlData';

interface MaintenanceSchedule {
  id: string;
  vehicleId: string;
  plate: string;
  serviceType: 'Compressor Overhaul' | 'Reefer Coil De-Ice' | 'Brake & Tire Check' | 'Routine Engine Service';
  scheduledDate: string;
  depotLocation: string;
  status: 'Scheduled' | 'Overdue' | 'In Bay';
  estimatedDuration: string;
}

const INITIAL_MAINTENANCE: MaintenanceSchedule[] = [
  {
    id: 'MNT-401',
    vehicleId: 'CC-102',
    plate: 'MH-31-TR-4912',
    serviceType: 'Compressor Overhaul',
    scheduledDate: '2026-10-25',
    depotLocation: 'Nagpur Multi-Modal Maintenance Bay 2',
    status: 'Scheduled',
    estimatedDuration: '4.5 Hours',
  },
  {
    id: 'MNT-402',
    vehicleId: 'CC-118',
    plate: 'GJ-06-AZ-3304',
    serviceType: 'Reefer Coil De-Ice',
    scheduledDate: '2026-10-22',
    depotLocation: 'Surat Central Reefer Workshop',
    status: 'In Bay',
    estimatedDuration: '2.0 Hours',
  },
  {
    id: 'MNT-403',
    vehicleId: 'CC-124',
    plate: 'HR-55-BW-9014',
    serviceType: 'Brake & Tire Check',
    scheduledDate: '2026-10-28',
    depotLocation: 'Delhi NCR Fleet Staging Yard',
    status: 'Scheduled',
    estimatedDuration: '3.0 Hours',
  },
];

export const FleetPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'vehicles' | 'drivers' | 'maintenance' | 'fuel'>('vehicles');
  const [trucks, setTrucks] = useState<FTLTruck[]>(MOCK_TRUCKS);
  const [drivers, setDrivers] = useState<FTLDriver[]>(MOCK_DRIVERS);

  useEffect(() => {
    api.getTrucks().then((data) => {
      if (data && data.length > 0) {
        const mapped: FTLTruck[] = data.map((t) => ({
          id: t.id,
          regNumber: t.plate_number,
          model: t.vehicle_type || 'Heavy Reefer 32T',
          driverName: t.driver_name || 'Assigned Fleet Driver',
          driverPhone: '+91 98230 44102',
          driverSafetyScore: 98,
          currentLocation: t.current_location || 'NH-48 Expressway',
          destination: 'Mumbai Port CFS',
          origin: 'Nagpur Multi-Modal Logistics Hub',
          coordinates: { x: 45, y: 55 },
          speedKmH: 68,
          fuelPct: t.fuel_level || 85,
          grossWeightTon: 28.5,
          maxWeightTon: 32.0,
          status: (t.status === 'En Route' ? 'En Route' : t.status === 'Docking' ? 'Docking' : 'Standby'),
          eta: 'Today · 21:30 IST',
          remainingDistanceKm: 142,
          engineHealthPct: t.reefer_health_score || 95,
          tirePressurePsi: 110,
          lastPing: '2 mins ago',
          activeShipmentId: t.current_cargo || 'CC-1048',
          lat: typeof t.latitude === 'number' && !isNaN(t.latitude) ? t.latitude : undefined,
          lng: typeof t.longitude === 'number' && !isNaN(t.longitude) ? t.longitude : undefined,
        }));
        setTrucks((prev) => {
          const ids = new Set(mapped.map((m) => m.id));
          return [...mapped, ...prev.filter((p) => !ids.has(p.id))];
        });
      }
    }).catch(() => {});
  }, []);
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceSchedule[]>(INITIAL_MAINTENANCE);
  const [selectedTruck, setSelectedTruck] = useState<FTLTruck | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);

  const [maintenanceForm, setMaintenanceForm] = useState({
    vehicleId: 'CC-102',
    plate: 'MH-31-TR-4912',
    serviceType: 'Compressor Overhaul' as MaintenanceSchedule['serviceType'],
    scheduledDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    depotLocation: 'Nagpur Multi-Modal Maintenance Bay 2',
    estimatedDuration: '4.0 Hours'
  });

  const handleScheduleMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    const newMnt: MaintenanceSchedule = {
      id: `MNT-${Math.floor(400 + Math.random() * 500)}`,
      vehicleId: maintenanceForm.vehicleId,
      plate: maintenanceForm.plate,
      serviceType: maintenanceForm.serviceType,
      scheduledDate: maintenanceForm.scheduledDate,
      depotLocation: maintenanceForm.depotLocation,
      status: 'Scheduled',
      estimatedDuration: maintenanceForm.estimatedDuration
    };
    setMaintenanceList([newMnt, ...maintenanceList]);
    setIsMaintenanceModalOpen(false);
    setToastMessage(`✓ Scheduled ${newMnt.serviceType} for ${newMnt.vehicleId} on ${newMnt.scheduledDate}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredTrucks = useMemo(() => {
    return trucks.filter((t) => {
      if (filterStatus !== 'All' && t.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          t.id.toLowerCase().includes(q) ||
          t.model.toLowerCase().includes(q) ||
          t.driverName.toLowerCase().includes(q) ||
          t.currentLocation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [trucks, filterStatus, searchQuery]);

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.assignedTruckId.toLowerCase().includes(q) ||
          d.phone.includes(q)
        );
      }
      return true;
    });
  }, [drivers, searchQuery]);

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto font-sans bg-[#F0EEEA]">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              Fleet & Drivers
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              FLEET & TELEMETRY
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Reefer trucks &bull; Commercial pilot roster &bull; Maintenance scheduling &bull; Fuel monitoring
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => navigate('/tracking')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 font-mono text-xs font-bold transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Gauge className="w-4 h-4 text-[#F2AE32]" />
          <span>VIEW LIVE RADAR</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#06383D] text-white px-5 py-3 rounded-xl shadow-xl border border-[#F2AE32] flex items-center gap-3 font-mono text-xs animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-[#F2AE32] shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">TOTAL REEFER ASSETS</div>
          <div className="text-3xl font-black text-[#292D2F] mt-1 font-sans">128 Units</div>
          <div className="text-[#16803C] text-[11px] mt-1 font-semibold">● 100% OBD-II Connected</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">ACTIVE IN TRANSIT</div>
          <div className="text-3xl font-black text-[#F2AE32] mt-1 font-sans">64 Haulers</div>
          <div className="text-[#A5A5A4] text-[11px] mt-1 font-semibold">Average Speed: 68 km/h</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">VERIFIED DRIVERS</div>
          <div className="text-3xl font-black text-[#06383D] mt-1 font-sans">{drivers.length} Pilots</div>
          <div className="text-[#06383D] text-[11px] mt-1 font-semibold">96.8% Safety Compliance</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">MAINTENANCE DUE</div>
          <div className="text-3xl font-black text-[#DC2626] mt-1 font-sans">{maintenanceList.length} Units</div>
          <div className="text-[#A5A5A4] text-[11px] mt-1 font-semibold">Compressor & Coil checks</div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-[#D0CEC9] font-mono text-xs shadow-2xs">
        {[
          { id: 'vehicles', label: '1. Refrigerated Vehicles', icon: Truck },
          { id: 'drivers', label: '2. Driver Management', icon: Users },
          { id: 'maintenance', label: '3. Maintenance Scheduling', icon: Wrench },
          { id: 'fuel', label: '4. Fuel & Energy Telemetry', icon: Fuel },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#06383D] text-white font-bold shadow-xs'
                  : 'text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2AE32]' : 'text-[#06383D]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: REFRIGERATED VEHICLES */}
      {/* ============================================================== */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D0CEC9] shadow-2xs">
            <div className="flex items-center gap-3 w-full sm:w-80">
              <Search className="w-4 h-4 text-[#A5A5A4]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vehicle ID, model, driver..."
                className="w-full bg-transparent border-none text-xs font-mono text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              {(['All', 'En Route', 'Off Route', 'Docking'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    filterStatus === status
                      ? 'bg-[#06383D] text-white font-bold'
                      : 'text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Truck Asset Grid */}
          {filteredTrucks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#D0CEC9] space-y-3 font-mono">
              <Truck className="w-10 h-10 text-[#A5A5A4] mx-auto opacity-50" />
              <div className="text-base font-bold text-[#292D2F]">No vehicles matching "{searchQuery}"</div>
              <p className="text-xs text-[#A5A5A4]">Try adjusting your search query or status filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setFilterStatus('All'); }}
                className="px-4 py-2 rounded-lg bg-[#06383D] text-white text-xs font-bold hover:bg-[#06383D]/85 cursor-pointer"
              >
                Reset Vehicle Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrucks.map((truck) => (
                <div
                  key={truck.id}
                  onClick={() => setSelectedTruck(truck)}
                  className="rounded-2xl border border-[#D0CEC9] bg-white p-6 shadow-xs hover:border-[#06383D] hover:-translate-y-0.5 transition-all cursor-pointer space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#06383D]">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-sm font-bold text-[#292D2F]">{truck.id}</div>
                        <div className="text-[11px] text-[#A5A5A4]">{truck.model}</div>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      truck.status === 'Off Route'
                        ? 'bg-red-50 text-[#DC2626] border border-red-200'
                        : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                    }`}>
                      ● {truck.status}
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-xs text-[#A5A5A4]">
                    <div className="flex justify-between">
                      <span>Route:</span>
                      <span className="text-[#292D2F] font-semibold">{truck.origin.split(' ')[0]} ➔ {truck.destination.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-[#06383D] truncate max-w-[180px]">{truck.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <span className="text-[#292D2F] font-bold">{truck.speedKmH} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Pilot:</span>
                      <span className="text-[#292D2F]">{truck.driverName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fuel Level:</span>
                      <span className="text-[#F2AE32] font-bold">{truck.fuelPct}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D0CEC9] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#A5A5A4]">ETA: {truck.eta.split('·')[1] || '18:45'}</span>
                    <span className="text-[#06383D] hover:text-[#F2AE32] font-bold flex items-center gap-1">
                      <span>DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: DRIVER MANAGEMENT */}
      {/* ============================================================== */}
      {activeTab === 'drivers' && (
        <div className="space-y-6">
          {filteredDrivers.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-[#D0CEC9] space-y-3 font-mono">
              <Users className="w-10 h-10 text-[#A5A5A4] mx-auto opacity-50" />
              <div className="text-base font-bold text-[#292D2F]">No drivers matching "{searchQuery}"</div>
              <p className="text-xs text-[#A5A5A4]">Try searching by pilot name, assigned truck, or contact number.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-lg bg-[#06383D] text-white text-xs font-bold hover:bg-[#06383D]/85 cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
              {filteredDrivers.map((drv) => (
                <div
                  key={drv.id}
                  className="rounded-2xl border border-[#D0CEC9] bg-white p-6 space-y-4 shadow-xs"
                >
                  <div className="flex items-start justify-between border-b border-[#D0CEC9] pb-3">
                    <div>
                      <h3 className="text-base font-bold text-[#292D2F] font-sans">{drv.name}</h3>
                      <div className="text-xs text-[#A5A5A4] mt-0.5">License: {drv.licenseNumber}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      drv.status === 'On Duty'
                        ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                        : 'bg-[#F0EEEA] text-[#A5A5A4] border border-[#D0CEC9]'
                    }`}>
                      ● {drv.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A4]">Assigned Truck:</span>
                      <strong className="text-[#06383D]">{drv.assignedTruckId}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A4]">Phone Contact:</span>
                      <strong className="text-[#292D2F]">{drv.phone}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A4]">Experience:</span>
                      <strong className="text-[#292D2F]">{drv.experienceYears} Years</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A4]">Safety Score:</span>
                      <strong className="text-[#16803C]">{drv.safetyScore} / 100</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A5A5A4]">Hours of Service (HOS):</span>
                      <strong className="text-[#292D2F]">{drv.hoursOfServiceLogged} / {drv.maxDailyHours} Hours</strong>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-[#D0CEC9]">
                    <div className="flex justify-between text-[10px] text-[#A5A5A4]">
                      <span>Shift Fatigue Index</span>
                      <span className="font-bold text-[#292D2F]">
                        {Math.round((drv.hoursOfServiceLogged / drv.maxDailyHours) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-[#F0EEEA] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${drv.hoursOfServiceLogged > 7 ? 'bg-[#DC2626]' : 'bg-[#16803C]'}`}
                        style={{ width: `${Math.min(100, (drv.hoursOfServiceLogged / drv.maxDailyHours) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: MAINTENANCE SCHEDULING */}
      {/* ============================================================== */}
      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
            <div>
              <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans">
                VEHICLE MAINTENANCE SCHEDULING
              </h2>
              <p className="text-xs text-[#A5A5A4]">Mandatory reefer compressor checks, cooling coil de-icing, and chassis safety inspections.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#F0EEEA] text-[#06383D] font-bold text-xs border border-[#D0CEC9]">
                {maintenanceList.length} SESSIONS
              </span>
              <button
                onClick={() => setIsMaintenanceModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2AE32] text-[#292D2F] font-bold text-xs uppercase cursor-pointer hover:bg-[#F2AE32]/85 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Schedule Service</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] font-bold uppercase text-[10px]">
                  <th className="py-3 px-3">MAINTENANCE ID</th>
                  <th className="py-3 px-3">VEHICLE & PLATE</th>
                  <th className="py-3 px-3">SERVICE TYPE</th>
                  <th className="py-3 px-3">SCHEDULED DATE</th>
                  <th className="py-3 px-3">DEPOT LOCATION</th>
                  <th className="py-3 px-3">EST. DOWNTIME</th>
                  <th className="py-3 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CEC9]">
                {maintenanceList.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F0EEEA]/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-[#06383D]">{m.id}</td>
                    <td className="py-3 px-3">
                      <strong className="text-[#292D2F]">{m.vehicleId}</strong>
                      <div className="text-[10px] text-[#A5A5A4]">{m.plate}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#292D2F]">{m.serviceType}</td>
                    <td className="py-3 px-3">{m.scheduledDate}</td>
                    <td className="py-3 px-3 text-[#A5A5A4]">{m.depotLocation}</td>
                    <td className="py-3 px-3">{m.estimatedDuration}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        m.status === 'In Bay'
                          ? 'bg-[#F2AE32]/20 text-[#292D2F] border border-[#F2AE32]/40'
                          : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                      }`}>
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: FUEL & ENERGY TELEMETRY */}
      {/* ============================================================== */}
      {activeTab === 'fuel' && (
        <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-6 font-mono">
          <div className="border-b border-[#D0CEC9] pb-4">
            <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans">
              REAL-TIME FUEL & AUXILIARY REEFER BURN
            </h2>
            <p className="text-xs text-[#A5A5A4]">Continuous CAN-bus fuel sensor monitoring and auxiliary reefer diesel consumption.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trucks.slice(0, 6).map((truck) => (
              <div key={truck.id} className="p-4 rounded-xl border border-[#D0CEC9] bg-[#F0EEEA]/40 space-y-3">
                <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                  <span className="font-bold text-[#06383D]">{truck.id} ({truck.regNumber})</span>
                  <span className="text-xs font-black text-[#F2AE32]">{truck.fuelPct}% FUEL</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Engine Health:</span>
                    <strong className="text-[#16803C]">{truck.engineHealthPct}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Auxiliary Reefer Burn:</span>
                    <strong className="text-[#292D2F]">2.4 L / hour</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Estimated Range:</span>
                    <strong className="text-[#06383D]">{Math.round((truck.fuelPct / 100) * 850)} km</strong>
                  </div>
                </div>

                <div className="w-full bg-[#E8E6E2] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${truck.fuelPct < 25 ? 'bg-[#DC2626]' : 'bg-[#06383D]'}`}
                    style={{ width: `${truck.fuelPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Modal for Selected Truck */}
      {selectedTruck && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 max-w-lg w-full space-y-5 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#F2AE32]" />
                <span className="text-lg font-bold text-[#292D2F]">{selectedTruck.id}</span>
              </div>
              <button
                onClick={() => setSelectedTruck(null)}
                className="p-1 rounded-lg text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#F0EEEA] flex justify-between">
                <span className="text-[#A5A5A4]">Prime Mover:</span>
                <span className="font-bold text-[#292D2F]">{selectedTruck.model}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0EEEA] flex justify-between">
                <span className="text-[#A5A5A4]">Assigned Pilot:</span>
                <span className="font-bold text-[#292D2F]">{selectedTruck.driverName}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0EEEA] flex justify-between">
                <span className="text-[#A5A5A4]">Corridor Location:</span>
                <span className="font-bold text-[#06383D]">{selectedTruck.currentLocation}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0EEEA] flex justify-between">
                <span className="text-[#A5A5A4]">Speed & Fuel:</span>
                <span className="font-bold text-[#292D2F]">{selectedTruck.speedKmH} km/h &bull; {selectedTruck.fuelPct}% Diesel</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigate('/tracking')}
                className="flex-1 py-3 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                VIEW LIVE ON RADAR
              </button>
              <button
                onClick={() => setSelectedTruck(null)}
                className="px-5 py-3 rounded-xl border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Maintenance Modal */}
      {isMaintenanceModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 max-w-lg w-full space-y-4 shadow-2xl font-mono">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#06383D]" />
                <h3 className="font-bold text-base text-[#292D2F] font-sans">
                  Schedule Vehicle Maintenance
                </h3>
              </div>
              <button onClick={() => setIsMaintenanceModalOpen(false)} className="text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleMaintenance} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Select Vehicle Asset</label>
                <select
                  value={maintenanceForm.vehicleId}
                  onChange={(e) => {
                    const selTruck = trucks.find(t => t.id === e.target.value);
                    setMaintenanceForm({
                      ...maintenanceForm,
                      vehicleId: e.target.value,
                      plate: selTruck?.regNumber || 'MH-12-AB-1234'
                    });
                  }}
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg p-2.5 font-bold text-[#292D2F]"
                >
                  {trucks.map(t => (
                    <option key={t.id} value={t.id}>{t.id} ({t.regNumber} - {t.model})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Maintenance Service Type</label>
                <select
                  value={maintenanceForm.serviceType}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, serviceType: e.target.value as any })}
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg p-2.5 font-bold text-[#292D2F]"
                >
                  <option value="Compressor Overhaul">Compressor Overhaul</option>
                  <option value="Reefer Coil De-Ice">Reefer Coil De-Ice</option>
                  <option value="Brake & Tire Check">Brake & Tire Check</option>
                  <option value="Routine Engine Service">Routine Engine Service</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Scheduled Date</label>
                  <input
                    type="date"
                    required
                    value={maintenanceForm.scheduledDate}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, scheduledDate: e.target.value })}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg p-2.5 text-[#292D2F]"
                  />
                </div>
                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Est. Downtime</label>
                  <input
                    type="text"
                    required
                    value={maintenanceForm.estimatedDuration}
                    onChange={(e) => setMaintenanceForm({ ...maintenanceForm, estimatedDuration: e.target.value })}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg p-2.5 text-[#292D2F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Workshop / Depot Bay</label>
                <input
                  type="text"
                  required
                  value={maintenanceForm.depotLocation}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, depotLocation: e.target.value })}
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg p-2.5 text-[#292D2F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#D0CEC9]">
                <button
                  type="button"
                  onClick={() => setIsMaintenanceModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D0CEC9] text-[#292D2F] font-bold hover:bg-[#F0EEEA] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#06383D] text-white font-bold hover:bg-[#06383D]/85 cursor-pointer"
                >
                  Confirm Service Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
