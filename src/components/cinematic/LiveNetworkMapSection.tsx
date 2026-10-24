import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Navigation, 
  Clock, 
  Gauge, 
  Layers, 
  CheckCircle,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TRUCKS, CITY_NODES, FTLTruck } from '../../data/ftlData';
import { RealLeafletMap, MapVehiclePoint, MapCityNode, MapThermalZone } from '../common/RealLeafletMap';

const TRUCK_COORDINATES: Record<string, { lat: number; lng: number; route?: [number, number][] }> = {
  'CC-102': { 
    lat: 20.9980, 
    lng: 75.5660, 
    route: [[21.1458, 79.0882], [20.7002, 77.0082], [20.9980, 75.5660], [19.9975, 73.7898], [19.0760, 72.8777]] 
  },
  'CC-107': { 
    lat: 19.7660, 
    lng: 74.4780, 
    route: [[21.1458, 79.0882], [20.7002, 77.0082], [19.8762, 75.3433], [19.7660, 74.4780], [19.2967, 73.0631]] 
  },
  'CC-118': { 
    lat: 19.0950, 
    lng: 74.7490, 
    route: [[21.7120, 72.5850], [21.1702, 72.8311], [19.0950, 74.7490], [19.8762, 75.3433]] 
  },
  'CC-124': { 
    lat: 19.6640, 
    lng: 78.5320, 
    route: [[30.9578, 76.7914], [28.6139, 77.2090], [21.1458, 79.0882], [19.6640, 78.5320], [17.3850, 78.4867]] 
  },
  'CC-131': { 
    lat: 22.7196, 
    lng: 75.8577, 
    route: [[21.1702, 72.8311], [22.7196, 75.8577], [23.2599, 77.4126], [24.5362, 81.3037]] 
  },
  'CC-142': { 
    lat: 18.9490, 
    lng: 72.9510, 
    route: [[17.0673, 74.3739], [18.5204, 73.8567], [18.9490, 72.9510]] 
  },
};

const NETWORK_CITIES: MapCityNode[] = [
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { name: 'Surat', lat: 21.1702, lng: 72.8311 },
  { name: 'Indore', lat: 22.7196, lng: 75.8577 },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { name: 'Nashik', lat: 19.9975, lng: 73.7898 },
  { name: 'Mumbai / JNPT', lat: 19.0760, lng: 72.8777 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
];

const TRAFFIC_WEATHER_ZONES: MapThermalZone[] = [
  {
    id: 'TR-01',
    name: 'Kasara Ghat Congestion +55m',
    lat: 19.6750,
    lng: 73.4830,
    radiusMeters: 28000,
    ambientTemp: 'Heavy Freight Congestion',
    riskLevel: 'Critical'
  },
  {
    id: 'TR-02',
    name: 'Bhor Ghat Heavy Gradient',
    lat: 18.7750,
    lng: 73.3500,
    radiusMeters: 22000,
    ambientTemp: 'Steep Incline / Wet Surface',
    riskLevel: 'Moderate'
  }
];

export const LiveNetworkMapSection: React.FC = () => {
  const [selectedTruck, setSelectedTruck] = useState<FTLTruck>(MOCK_TRUCKS[0]);
  const [activeLayer, setActiveLayer] = useState<'routes' | 'traffic' | 'weather'>('routes');

  const mapTrucks: MapVehiclePoint[] = useMemo(() => {
    return MOCK_TRUCKS.map((truck) => {
      const geo = TRUCK_COORDINATES[truck.id] || { lat: 19.0760, lng: 72.8777 };
      return {
        id: truck.id,
        lat: geo.lat,
        lng: geo.lng,
        label: truck.id,
        driverName: truck.driverName,
        driverPhone: truck.driverPhone,
        cargo: truck.model,
        origin: truck.origin,
        destination: truck.destination,
        currentLocation: truck.currentLocation,
        speedKmH: truck.speedKmH,
        status: truck.status,
        eta: truck.eta,
        fuelPct: truck.fuelPct,
        routeCoordinates: geo.route,
      };
    });
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white py-24 px-6 lg:px-8 border-b border-[#D0CEC9] flex flex-col justify-center overflow-hidden">
      {/* Background Subtle Industrial Pattern */}
      <div className="absolute inset-0 bg-industrial-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D0CEC9] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[#F2AE32] text-xs font-mono uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-ping" />
              SECTION 03 · TELEMETRY RADAR
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
              LIVE LOGISTICS NETWORK
            </h2>
            <p className="text-[#A5A5A4] text-base max-w-xl font-medium">
              High-frequency sensor telemetry across India's primary cargo arteries. Every vehicle connected via 5G and satellite mesh.
            </p>
          </div>

          {/* Interactive Layer Switches */}
          <div className="flex items-center gap-2 bg-[#F0EEEA] p-1.5 rounded-xl border border-[#D0CEC9] font-mono text-xs">
            <button
              onClick={() => setActiveLayer('routes')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLayer === 'routes' ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              Corridors
            </button>
            <button
              onClick={() => setActiveLayer('traffic')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLayer === 'traffic' ? 'bg-white text-[#F2AE32] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              Live Traffic Density
            </button>
            <button
              onClick={() => setActiveLayer('weather')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeLayer === 'weather' ? 'bg-white text-[#06383D] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              Ghat Road Surface
            </button>
          </div>
        </div>

        {/* Map Viewport with Floating Cards — Light Neutral Map */}
        <div className="relative w-full h-[620px] sm:h-[700px] rounded-2xl border border-[#D0CEC9] bg-[#F0EEEA] shadow-[0_10px_35px_rgba(6,56,61,0.06)] overflow-hidden">
          
          {/* Main Visual Real Map */}
          <RealLeafletMap
            vehicles={mapTrucks}
            selectedVehicleId={selectedTruck.id}
            onSelectVehicle={(id) => {
              const found = MOCK_TRUCKS.find((t) => t.id === id);
              if (found) setSelectedTruck(found);
            }}
            activeLayer={activeLayer}
            cities={NETWORK_CITIES}
            thermalZones={activeLayer === 'traffic' || activeLayer === 'weather' ? TRAFFIC_WEATHER_ZONES : []}
            initialCenter={[21.0, 78.5]}
            initialZoom={5}
            heightClass="h-full"
            showOverlayControls={true}
            className="absolute inset-0 w-full h-full rounded-2xl"
          />

          {/* FLOATING CARD 1: Selected Truck Telemetry Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-6 left-6 z-20 w-72 sm:w-80 rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_12px_36px_rgba(6,56,61,0.1)] space-y-4 pointer-events-auto"
          >
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
                <div>
                  <div className="text-sm font-mono font-black text-[#292D2F] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-pulse" />
                    {selectedTruck.id}
                  </div>
                  <div className="text-xs text-[#A5A5A4] font-medium">
                    {selectedTruck.origin.split(' ')[0]} → {selectedTruck.destination.split(' ')[0]}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold ${
                  selectedTruck.status === 'Off Route' 
                    ? 'bg-red-50 text-[#DC2626] border border-red-200' 
                    : 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                }`}>
                  ● {selectedTruck.status === 'Off Route' ? 'DEVIATION' : 'ON ROUTE'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 rounded-lg bg-[#F0EEEA] border border-[#E0DED9]">
                  <div className="text-[10px] text-[#A5A5A4] uppercase">CURRENT SPEED</div>
                  <div className="text-xl font-bold text-[#292D2F] flex items-baseline gap-1">
                    {selectedTruck.speedKmH} <span className="text-xs text-[#A5A5A4]">km/h</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F0EEEA] border border-[#E0DED9]">
                  <div className="text-[10px] text-[#A5A5A4] uppercase">PROJECTED ETA</div>
                  <div className="text-xl font-bold text-[#F2AE32] flex items-baseline gap-1">
                    {selectedTruck.eta.split('·')[1] || '18:45'}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-[#A5A5A4]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#A5A5A4]">Driver</span>
                  <span className="text-[#292D2F] font-semibold">{selectedTruck.driverName}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#A5A5A4]">Current Node</span>
                  <span className="text-[#292D2F] truncate max-w-[160px]">{selectedTruck.currentLocation}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#A5A5A4]">Gross Cargo</span>
                  <span className="text-[#292D2F] font-semibold">{selectedTruck.grossWeightTon} Tons</span>
                </div>
              </div>

              <Link
                to={`/shipments/${selectedTruck.activeShipmentId}`}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#F0EEEA] hover:bg-[#E8E6E2] border border-[#D0CEC9] text-[#292D2F] text-xs font-mono tracking-wider transition-colors font-bold"
              >
                <span>OPEN DISPATCH DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
              </Link>
            </motion.div>

            {/* FLOATING CARD 2: Active Trucks KPI Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-6 right-6 z-20 w-64 rounded-2xl border border-[#D0CEC9] bg-white p-5 shadow-[0_12px_36px_rgba(6,56,61,0.1)]"
            >
              <div className="text-[10px] font-mono uppercase text-[#A5A5A4] tracking-wider font-semibold">
                PAN-INDIA FLEET CAPACITY
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <div className="text-3xl font-black text-[#292D2F] font-sans tracking-tight">
                  128 ACTIVE TRUCKS
                </div>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+8.4% vs Last Week</span>
              </div>
              <div className="mt-3 pt-3 border-t border-[#E0DED9] text-[11px] font-mono text-[#A5A5A4]">
                Avg Corridor Velocity: 68.4 km/h
              </div>
            </motion.div>

            {/* FLOATING CARD 3: Corridor Health & Toll Telemetry */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-6 right-6 z-20 hidden md:block w-72 rounded-2xl border border-[#D0CEC9] bg-white p-5 shadow-[0_12px_36px_rgba(6,56,61,0.1)] font-mono text-xs space-y-2"
            >
              <div className="flex items-center justify-between text-[#292D2F]">
                <span className="text-[10px] uppercase text-[#A5A5A4] font-semibold">WESTERN CORRIDOR HEALTH</span>
                <span className="text-[#16803C] font-bold">98.2% NOMINAL</span>
              </div>
              <div className="w-full bg-[#E8E6E2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#16803C] h-full w-[98.2%]" />
              </div>
              <p className="text-[10px] text-[#A5A5A4] pt-1">
                Autonomous weighbridge clearance pre-approved at 8 multi-modal toll plazas.
              </p>
            </motion.div>

        </div>

      </div>
    </section>
  );
};
