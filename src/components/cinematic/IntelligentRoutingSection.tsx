import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  MapPin, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Fuel, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { ROUTE_OPTIONS, RouteOption } from '../../data/ftlData';

export const IntelligentRoutingSection: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-b');
  const selectedRoute = ROUTE_OPTIONS.find((r) => r.id === selectedRouteId) || ROUTE_OPTIONS[0];

  return (
    <section className="relative min-h-screen w-full bg-[#F0EEEA] py-28 px-6 lg:px-8 border-b border-[#D0CEC9] flex flex-col justify-center overflow-hidden">
      {/* Ambience & Grid */}
      <div className="absolute inset-0 bg-industrial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#06383D] text-xs font-mono uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-[#D0CEC9] shadow-2xs font-bold">
            <Compass className="w-3.5 h-3.5 text-[#06383D]" />
            <span>SECTION 05 · AUTONOMOUS ROUTING ENGINE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
            INTELLIGENT ROUTING
          </h2>
          <p className="text-[#A5A5A4] text-base sm:text-lg font-medium">
            Dynamic corridor evaluation based on live gradient resistance, real-time toll queues, seasonal weather hazards, and historical congestion models.
          </p>
        </div>

        {/* Route Selector Tabs (ROUTE A, ROUTE B, ROUTE C) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROUTE_OPTIONS.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                onClick={() => setSelectedRouteId(route.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? 'bg-white border-2 border-[#F2AE32] shadow-[0_8px_30px_rgba(242,174,50,0.15)] -translate-y-1'
                    : 'bg-white hover:bg-[#F0EEEA] border-[#D0CEC9] shadow-2xs hover:border-[#A5A5A4]'
                }`}
              >
                {route.recommended && (
                  <span className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-[#F2AE32] text-[#292D2F] text-[10px] font-mono font-bold uppercase tracking-wider shadow-sm">
                    RECOMMENDED
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#A5A5A4] uppercase">
                      {route.id.toUpperCase()}
                    </span>
                    <span className={`text-xs font-mono font-bold ${route.recommended ? 'text-[#16803C]' : 'text-[#DC2626]'}`}>
                      {route.recommended ? '-94m FASTER' : '+70m TRAFFIC'}
                    </span>
                  </div>

                  <div className="text-xl font-bold text-[#292D2F] font-sans">
                    {route.name}
                  </div>

                  <p className="text-xs text-[#A5A5A4] leading-relaxed">
                    {route.tagline}
                  </p>

                  <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between font-mono text-xs">
                    <span className="text-[#292D2F] font-bold">{route.durationFormatted}</span>
                    <span className="text-[#A5A5A4]">{route.distanceKm} km</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Route Intelligence Breakdown Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRoute.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#D0CEC9] bg-white p-8 sm:p-10 shadow-[0_12px_40px_rgba(6,56,61,0.06)] space-y-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E0DED9] pb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#F2AE32] font-bold">
                  AUTONOMOUS DISPATCH DOSSIER
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#292D2F] font-sans mt-1">
                  {selectedRoute.name}
                </h3>
                <p className="text-sm text-[#A5A5A4] mt-1">
                  Corridor Topology: {selectedRoute.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] font-mono text-xs text-center">
                  <div className="text-[10px] text-[#A5A5A4] uppercase">ESTIMATED FUEL</div>
                  <div className="font-bold text-[#292D2F]">₹{selectedRoute.fuelCostInr.toLocaleString()}</div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] font-mono text-xs text-center">
                  <div className="text-[10px] text-[#A5A5A4] uppercase">TOLL TARIFF</div>
                  <div className="font-bold text-[#292D2F]">₹{selectedRoute.tollInr.toLocaleString()}</div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 font-mono text-xs text-center">
                  <div className="text-[10px] text-[#16803C] uppercase font-bold">RELIABILITY INDEX</div>
                  <div className="font-bold text-[#16803C]">{100 - selectedRoute.riskScore}%</div>
                </div>
              </div>
            </div>

            {/* Reasons / Corridors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              {selectedRoute.reasons.map((reason, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F0EEEA] border border-[#E0DED9] space-y-1">
                  <div className="text-[#06383D] font-bold text-[10px]">CORRIDOR PARAMETER 0{idx + 1}</div>
                  <div className="text-[#292D2F] font-medium font-sans text-xs">{reason}</div>
                </div>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
