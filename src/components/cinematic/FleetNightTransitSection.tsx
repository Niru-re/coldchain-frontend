import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Moon, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Radio, 
  AlertTriangle, 
  Navigation, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Activity,
  Flame,
  Zap,
  Gauge
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { VIDEO_MAPPING } from '../../config/videoConfig';
import { OptimizedVideo } from '../common/OptimizedVideo';

export const FleetNightTransitSection: React.FC = () => {

  return (
    <section className="relative min-h-screen w-full bg-[#F0EEEA] border-b border-[#D0CEC9] py-28 px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Subtle Industrial Lines */}
      <div className="absolute inset-0 bg-industrial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#F2AE32] text-xs font-mono uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-[#D0CEC9] shadow-2xs font-bold">
            <Moon className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>24/7 UNBROKEN FLEET TRANSIT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-none">
            NIGHT CORRIDORS.<br />
            <span className="text-[#F2AE32]">
              ZERO BLIND SPOTS.
            </span>
          </h2>

          <p className="text-[#A5A5A4] text-base sm:text-lg font-medium">
            When daytime highway traffic drops, transit velocity accelerates. High-precision night telemetry, active driver fatigue infrared monitoring, and 5G continuous mesh connection across national expressways.
          </p>
        </div>

        {/* Tall Editorial Composition: Vertical Video Centerpiece Surrounded by Fleet Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 2 Core Statistic Panels (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Panel 1: ACTIVE FLEET */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#D0CEC9] bg-white p-7 shadow-[0_8px_30px_rgba(6,56,61,0.06)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#F2AE32]" />
                  ACTIVE FLEET
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-50 text-[#F2AE32] border border-amber-200">
                  DISPATCHED
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-black font-sans text-[#292D2F]">128 TRUCKS</div>
                <div className="text-xs font-mono text-[#06383D] font-bold">+8.4% Capacity Deployed</div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#A5A5A4] pt-2 border-t border-[#E0DED9]">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Corridor Cruise Velocity:</span>
                  <span className="text-[#292D2F] font-bold">78.4 km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Kasara Descent Status:</span>
                  <span className="text-[#16803C] font-bold">Free Flow (Zero Delay)</span>
                </div>
              </div>
            </motion.div>

            {/* Panel 2: ON-TIME RATE */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#D0CEC9] bg-white p-7 shadow-[0_8px_30px_rgba(6,56,61,0.06)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                  ON-TIME SLA RATE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-[#16803C] border border-emerald-200">
                  GUARANTEED
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-black font-sans text-[#16803C]">94.7%</div>
                <div className="text-xs font-mono text-[#A5A5A4]">Audited across 4,200+ hauls</div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#A5A5A4] pt-2 border-t border-[#E0DED9]">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Driver Fatigue Monitor:</span>
                  <span className="text-[#16803C] font-bold">100% Alert Status</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Mandatory Rest Check:</span>
                  <span className="text-[#292D2F] font-bold">Shirdi Rest Plaza (in 1h 40m)</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Center Column: Tall Portrait Video Centerpiece (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl border-2 border-[#D0CEC9] bg-white shadow-[0_16px_48px_rgba(6,56,61,0.12)] overflow-hidden p-2.5"
            >
              {/* Outer Phone / Cockpit Rig Housing */}
              <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-black flex flex-col justify-between">
                
                {/* Real Vertical Night Video with Lazy Loading & Off-screen pause */}
                <OptimizedVideo
                  src={VIDEO_MAPPING.fleetTransit.path}
                  ariaLabel="Night fleet transit video"
                  playbackRate={0.95}
                  className="w-full h-full"
                />

                {/* Subtle Localized Contrast Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

                {/* Top Telemetry Overlay */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-white">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-red-400">REC</span> 03:42:18
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white font-bold text-[10px]">
                    5G · 60 FPS
                  </span>
                </div>

                {/* Bottom Overlay Bar */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 text-xs font-mono text-[#292D2F] shadow-md space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">NIGHT TELEMETRY</span>
                    <span className="text-[#16803C] font-bold">NOMINAL</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-black text-lg text-[#292D2F]">78.4 KM/H</span>
                    <span className="text-[10px] text-[#F2AE32] font-bold">MH-12-RN-8821</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Right Column: 2 Core Statistic Panels (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Panel 3: AVG TRANSIT */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#D0CEC9] bg-white p-7 shadow-[0_8px_30px_rgba(6,56,61,0.06)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#06383D]" />
                  AVG TRANSIT TURNAROUND
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-teal-50 text-[#06383D] border border-teal-200">
                  EXPRESSWAY
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-black font-sans text-[#292D2F]">13.6 HOURS</div>
                <div className="text-xs font-mono text-[#16803C] font-bold">-4.2 hrs faster vs standard highway</div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#A5A5A4] pt-2 border-t border-[#E0DED9]">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Distance Covered:</span>
                  <span className="text-[#292D2F] font-bold">812 km (Nagpur-Mumbai)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">FASTag Toll Pass Time:</span>
                  <span className="text-[#06383D] font-bold">&lt; 45 sec per gate</span>
                </div>
              </div>
            </motion.div>

            {/* Panel 4: UTILIZATION */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-[#D0CEC9] bg-white p-7 shadow-[0_8px_30px_rgba(6,56,61,0.06)] space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#F2AE32]" />
                  FLEET UTILIZATION
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-50 text-[#F2AE32] border border-amber-200">
                  OPTIMIZED
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-black font-sans text-[#F2AE32]">87.2%</div>
                <div className="text-xs font-mono text-[#A5A5A4]">-34.2% deadhead miles eliminated</div>
              </div>

              <div className="space-y-2 font-mono text-xs text-[#A5A5A4] pt-2 border-t border-[#E0DED9]">
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Highway Emergency Mesh:</span>
                  <span className="text-[#16803C] font-bold">28 Standby Depots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Mean Intervention Time:</span>
                  <span className="text-[#292D2F] font-bold">18 Minutes</span>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* Bottom Banner & Fleet Roster Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#D0CEC9]">
          <div className="text-sm font-mono text-[#A5A5A4]">
            <span className="text-[#F2AE32] font-bold">24/7 NIGHT LOGISTICS ACTIVE:</span> 64 heavy freight haulers currently in transit across Central & Western expressways.
          </div>

          <Link
            to="/fleet"
            className="px-6 py-3 rounded-xl bg-[#F2AE32] hover:bg-[#F2AE32]/85 text-[#292D2F] font-bold text-xs font-sans uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>INSPECT 24/7 FLEET ROSTER</span>
            <ArrowRight className="w-4 h-4 text-[#292D2F]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
