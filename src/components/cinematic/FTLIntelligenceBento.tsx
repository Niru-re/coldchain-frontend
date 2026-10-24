import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Navigation, 
  Clock, 
  Truck, 
  Thermometer, 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  Zap,
  Cpu,
  Layers,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FTLIntelligenceBento: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#E8E6E2] py-28 px-6 lg:px-8 border-b border-[#D0CEC9] overflow-hidden">
      {/* Background Subtle Industrial Pattern */}
      <div className="absolute inset-0 bg-industrial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D0CEC9] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#F2AE32] font-mono text-xs uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-[#D0CEC9] shadow-2xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-[#F2AE32]" />
              <span>CORE ARCHITECTURE · 6 TELEMETRY PILLARS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
              ColdChain 360 INTELLIGENCE<br />
              <span className="text-[#F2AE32]">
                SYSTEM ARCHITECTURE
              </span>
            </h2>
            <p className="text-[#A5A5A4] text-base leading-relaxed font-medium">
              Every inland haul is governed by a unified real-time feedback loop. Six coordinated intelligence modules eliminate blind spots, transit delays, and cargo loss.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#A5A5A4]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#D0CEC9] shadow-2xs font-bold text-[#16803C]">
              <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
              <span>ALL 6 SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>

        {/* Bento Grid — White Cards on Warm Neutral Background with Amber & Teal Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* PILLAR 1: LIVE TRACKING (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-7 rounded-2xl border border-[#D0CEC9] bg-white p-8 relative overflow-hidden group hover:border-[#F2AE32] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#F2AE32]">
                  <Radio className="w-6 h-6 animate-pulse" />
                </div>
                <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#F0EEEA] border border-[#D0CEC9] text-[#F2AE32] font-bold">
                  1-SEC PING RATE
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#292D2F] tracking-wide uppercase font-sans mb-2">
                01 · Live Tracking & Geofencing
              </h3>
              <p className="text-[#A5A5A4] text-sm leading-relaxed max-w-lg mb-6">
                Sub-meter GPS correlation fused with 5G cellular and L-band satellite mesh. Automated geofence entry/exit certification with zero manual check-ins.
              </p>
            </div>

            {/* Micro Visual: Live Coordinate Telemetry */}
            <div className="pt-4 border-t border-[#E0DED9] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#A5A5A4]">LAT/LONG:</span>
                <span className="text-[#292D2F] font-bold">19.9975° N, 73.7898° E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A5A5A4]">GEOFENCE:</span>
                <span className="text-[#16803C] font-bold">LOCKED & VERIFIED</span>
              </div>
              <Link 
                to="/tracking" 
                className="text-[#F2AE32] hover:text-[#F2AE32]/85 flex items-center gap-1 font-bold ml-auto"
              >
                <span>OPEN RADAR</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* PILLAR 2: REAL-TIME DYNAMIC ETA (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-5 rounded-2xl border border-[#D0CEC9] bg-white p-8 relative overflow-hidden group hover:border-[#06383D] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col justify-between min-h-[340px]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#06383D]">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-[#F0EEEA] border border-[#D0CEC9] text-[#06383D] font-bold">
                  ±6 MIN ACCURACY
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#292D2F] tracking-wide uppercase font-sans mb-2">
                02 · Real-Time Dynamic ETA
              </h3>
              <p className="text-[#A5A5A4] text-sm leading-relaxed mb-6">
                Predictive neural network accounts for FASTag toll gate queue depths, mountain ghat ascents, and monsoon road friction factors.
              </p>
            </div>

            {/* Micro Visual: ETA Delta */}
            <div className="p-3.5 rounded-xl bg-[#F0EEEA] border border-[#E0DED9] font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-[#A5A5A4] block text-[10px]">PREDICTED DESTINATION ETA</span>
                <span className="text-[#292D2F] font-bold text-sm">18:45 IST (TODAY)</span>
              </div>
              <span className="px-2 py-1 rounded bg-emerald-50 border border-emerald-200 text-[#16803C] text-[11px] font-bold">
                ON TIME SLA
              </span>
            </div>
          </motion.div>

          {/* PILLAR 3: ROUTE INTELLIGENCE & OPTIMIZATION (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-4 rounded-2xl border border-[#D0CEC9] bg-white p-7 relative overflow-hidden group hover:border-[#F2AE32] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#F2AE32]">
                  <Navigation className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase text-[#F2AE32] bg-[#F0EEEA] px-2 py-0.5 rounded border border-[#D0CEC9] font-bold">
                  -94 MIN DETOUR
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#292D2F] tracking-wide uppercase font-sans mb-2">
                03 · Route Intelligence
              </h3>
              <p className="text-[#A5A5A4] text-sm leading-relaxed mb-4">
                Autonomous re-routing engine dynamically reroutes around bottlenecks at Kasara Ghat and Mumbai-Agra Highway.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between font-mono text-xs">
              <span className="text-[#A5A5A4]">ACTIVE CORRIDORS:</span>
              <span className="text-[#292D2F] font-bold">3 DYNAMIC PATHS</span>
            </div>
          </motion.div>

          {/* PILLAR 4: FLEET VISIBILITY & WEIGHT TELEMETRY (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setHoveredIndex(4)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-4 rounded-2xl border border-[#D0CEC9] bg-white p-7 relative overflow-hidden group hover:border-[#16803C] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#16803C]">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase text-[#16803C] bg-[#F0EEEA] px-2 py-0.5 rounded border border-[#D0CEC9] font-bold">
                  128 ACTIVE RIGS
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#292D2F] tracking-wide uppercase font-sans mb-2">
                04 · Fleet Visibility
              </h3>
              <p className="text-[#A5A5A4] text-sm leading-relaxed mb-4">
                Axle weight load sensors, tyre pressure monitoring systems (TPMS), and engine ECU diagnostics streaming live.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between font-mono text-xs">
              <span className="text-[#A5A5A4]">FLEET AVAILABILITY:</span>
              <span className="text-[#16803C] font-bold">98.4% NOMINAL</span>
            </div>
          </motion.div>

          {/* PILLAR 5: SHIPMENT CONTROL & COLD-CHAIN INTEGRITY (4 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            onMouseEnter={() => setHoveredIndex(5)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-4 rounded-2xl border border-[#D0CEC9] bg-white p-7 relative overflow-hidden group hover:border-[#06383D] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-center text-[#06383D]">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] uppercase text-[#06383D] bg-[#F0EEEA] px-2 py-0.5 rounded border border-[#D0CEC9] font-bold">
                  DIGITAL SEAL
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#292D2F] tracking-wide uppercase font-sans mb-2">
                05 · Shipment Control
              </h3>
              <p className="text-[#A5A5A4] text-sm leading-relaxed mb-4">
                Electronic tamper seals, humidity & reefer container temperature telemetry with immutable audit logs.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between font-mono text-xs">
              <span className="text-[#A5A5A4]">REEFER CHAMBER:</span>
              <span className="text-[#06383D] font-bold">-18.4° C LOCKED</span>
            </div>
          </motion.div>

          {/* PILLAR 6: EXCEPTION ALERTS (12 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredIndex(6)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="lg:col-span-12 rounded-2xl border border-[#D0CEC9] bg-white p-8 relative overflow-hidden group hover:border-[#DC2626] transition-all duration-300 shadow-[0_4px_20px_rgba(6,56,61,0.05)] hover:shadow-[0_8px_30px_rgba(6,56,61,0.09)] hover:-translate-y-1 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#DC2626] shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                    06 · EXCEPTION ALERTS & SOS DISPATCH
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-50 text-[#DC2626] border border-red-200">
                    ZERO HUMAN DELAY
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#292D2F] tracking-wide uppercase font-sans">
                  Automated Incident & SOS Protocol
                </h3>
                <p className="text-[#A5A5A4] text-sm max-w-2xl leading-relaxed">
                  Sudden route deviations, unauthorized cabin door opening, or engine halts instantly trigger protocol: local highway patrol dispatch, customer notification, and backup hauler diversion within 12 minutes.
                </p>
              </div>
            </div>

            <Link
              to="/alerts"
              className="px-6 py-3.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-[0_4px_12px_rgba(220,38,38,0.25)] cursor-pointer"
            >
              <span>INSPECT EXCEPTION DISPATCH</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
