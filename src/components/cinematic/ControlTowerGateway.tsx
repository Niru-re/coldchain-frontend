import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  LayoutDashboard, 
  MapPin, 
  Truck, 
  Lock, 
  Activity, 
  Gauge, 
  Radio, 
  CheckCircle2,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CinematicVideoBackground } from '../common/CinematicVideoBackground';
import { VIDEO_MAPPING } from '../../config/videoConfig';

export const ControlTowerGateway: React.FC = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0);

  const handleStartTransition = () => {
    setIsTransitioning(true);
    setTransitionStep(1);
    setTimeout(() => setTransitionStep(2), 500);
    setTimeout(() => setTransitionStep(3), 1000);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1600);
  };

  return (
    <div id="dashboard-gateway" className="relative">
      <CinematicVideoBackground
        video={VIDEO_MAPPING.controlTower}
        overlayVariant="editorial"
        className="relative min-h-screen border-b border-[#D0CEC9] flex flex-col justify-center items-center overflow-hidden text-center py-28 px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto w-full relative z-10 space-y-12">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D0CEC9] text-[#292D2F] text-xs font-mono uppercase tracking-widest shadow-2xs font-bold"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>REAL-WORLD OPERATIONS ➔ DIGITAL CONTROL TOWER</span>
          </motion.div>

          {/* Editorial Titles */}
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-none"
            >
              TAKE THE<br />
              <span className="text-[#F2AE32]">
                DRIVER’S SEAT.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-[#292D2F] max-w-2xl mx-auto font-medium bg-white/80 p-3 rounded-xl border border-[#D0CEC9]/60 backdrop-blur-sm"
            >
              Experience the enterprise dashboard. Live tracking, exception interventions, dispatch optimization, and fleet telematics consolidated into a unified control cockpit.
            </motion.p>
          </div>

          {/* Interactive Light Dashboard Window Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full max-w-3xl mx-auto rounded-2xl border border-[#D0CEC9] bg-white shadow-[0_16px_48px_rgba(6,56,61,0.1)] overflow-hidden text-left"
          >
            {/* Window Top Bar */}
            <div className="bg-[#F0EEEA] px-4 py-3 border-b border-[#D0CEC9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E0DED9]" />
                <div className="w-3 h-3 rounded-full bg-[#E0DED9]" />
                <div className="w-3 h-3 rounded-full bg-[#E0DED9]" />
                <span className="text-[11px] font-mono text-[#A5A5A4] ml-2 font-bold">
                  ColdChain 360.control-tower.enterprise/live
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#16803C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                128 HAULERS LIVE
              </span>
            </div>

            {/* Dashboard Content Mockup — Warm Off-White Theme */}
            <div className="p-6 bg-[#F0EEEA] space-y-4 font-mono text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#D0CEC9]">
                  <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">ACTIVE EN ROUTE</div>
                  <div className="text-xl font-bold font-sans text-[#292D2F]">128 Trucks</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#D0CEC9]">
                  <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">ON-TIME SLA</div>
                  <div className="text-xl font-bold font-sans text-[#16803C]">94.7%</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#D0CEC9]">
                  <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">ACTIVE EXCEPTION</div>
                  <div className="text-xl font-bold font-sans text-[#F2AE32]">2 Warnings</div>
                </div>
              </div>

              {/* Mockup Row */}
              <div className="p-3 rounded-xl bg-white border border-[#D0CEC9] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-pulse" />
                  <span className="font-bold text-[#292D2F]">CC-102 (TATA PRIMA)</span>
                  <span className="text-[#A5A5A4]">NAGPUR ➔ MUMBAI</span>
                </div>
                <span className="text-[#16803C] font-bold">78.4 km/h · ETA 18:45</span>
              </div>
            </div>
          </motion.div>

          {/* Launch Control Room Transition Button */}
          <div className="pt-2">
            <button
              onClick={handleStartTransition}
              disabled={isTransitioning}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#F2AE32] hover:bg-[#F2AE32]/85 text-[#292D2F] font-bold text-sm font-sans tracking-wide uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(242,174,50,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-[#292D2F]" />
              <span>{isTransitioning ? 'INITIALIZING CONTROL TOWER...' : 'ENTER CONTROL TOWER DASHBOARD'}</span>
              <ArrowRight className="w-4 h-4 text-[#292D2F]" />
            </button>
          </div>

        </div>
      </CinematicVideoBackground>
    </div>
  );
};
