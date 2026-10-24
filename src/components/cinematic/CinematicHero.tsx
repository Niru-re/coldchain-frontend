import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Radio, 
  Activity,
  Layers,
  ChevronDown,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicVideoBackground } from '../common/CinematicVideoBackground';
import { VIDEO_MAPPING } from '../../config/videoConfig';
import { HeroRealMap } from './HeroRealMap';

interface CinematicHeroProps {
  onExploreClick: () => void;
  onWatchClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onExploreClick, onWatchClick }) => {
  return (
    <CinematicVideoBackground
      video={VIDEO_MAPPING.hero}
      isHero={true}
      overlayVariant="left"
      enableParallax={true}
      className="min-h-screen border-b border-[#D0CEC9] flex flex-col justify-between pt-20"
    >
      {/* Top Ambient Telemetry Ticker — Light Industrial Clean */}
      <div className="w-full border-b border-[#D0CEC9]/80 bg-white/70 backdrop-blur-md px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono tracking-wider text-[#A5A5A4]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#F2AE32] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-ping" />
              ColdChain 360 SYSTEM · V4.8
            </span>
            <span className="hidden sm:inline-block text-[#D0CEC9]">|</span>
            <span className="hidden sm:inline-block text-[#292D2F] font-semibold">NATIONAL CORRIDOR MATRIX: ACTIVE</span>
            <span className="hidden md:inline-block text-[#D0CEC9]">|</span>
            <span className="hidden md:inline-block text-[#16803C] font-semibold">FLEET HEALTH: 99.98%</span>
          </div>

          <div className="flex items-center gap-4 text-[#A5A5A4]">
            <span className="hidden lg:inline-flex items-center gap-1.5 font-mono">
              <Radio className="w-3.5 h-3.5 text-[#06383D]" />
              RADAR LATENCY: 38ms
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#D0CEC9] text-[#292D2F] font-bold text-[10px]">
              PAN-INDIA
            </span>
          </div>
        </div>
      </div>

      {/* Hero Core Content: Left text with warm readable gradient, Right clear highway truck footage */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Massive Editorial Typography & Light Contrast Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 lg:space-y-8"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#D0CEC9] text-[#292D2F] text-xs font-mono font-bold tracking-widest uppercase shadow-2xs backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F2AE32]" />
            <span>ColdChain 360 LOGISTICS</span>
          </div>

          {/* Headline - Editorial High Impact Industrial */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-[#292D2F] leading-[0.92] uppercase font-sans">
              MOVE <span className="text-[#F2AE32]">FREIGHT.</span><br />
              MOVE <span className="text-[#292D2F]">SMARTER.</span>
            </h1>
          </div>

          {/* Supporting Statement */}
          <p className="text-lg sm:text-xl text-[#A5A5A4] font-medium leading-relaxed max-w-xl">
            Real-time visibility, intelligent routing and operational control for modern inland freight across India’s core industrial corridors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#network"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-[#E8E6E2] border border-[#D0CEC9] text-[#292D2F] font-bold text-xs font-sans tracking-wide uppercase transition-all duration-200 shadow-sm hover:border-[#06383D] cursor-pointer"
            >
              <span>EXPLORE NETWORK</span>
              <ArrowRight className="w-4 h-4 text-[#F2AE32]" />
            </a>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#F2AE32] hover:bg-[#F2AE32]/85 text-[#292D2F] font-bold text-xs font-sans tracking-wide uppercase transition-all duration-200 shadow-[0_4px_16px_rgba(242,174,50,0.25)] hover:shadow-[0_6px_20px_rgba(242,174,50,0.35)] cursor-pointer"
            >
              <span>ENTER CONTROL TOWER</span>
              <ArrowRight className="w-4 h-4 text-[#292D2F]" />
            </Link>
          </div>

          {/* Clean Micro Telemetry Metrics */}
          <div className="pt-6 border-t border-[#D0CEC9] grid grid-cols-3 gap-6 font-mono">
            <div>
              <div className="text-3xl font-black text-[#292D2F] tracking-tight">128+</div>
              <div className="text-[11px] uppercase tracking-wider text-[#A5A5A4] mt-0.5 font-medium">Active Fleet Trucks</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#06383D] tracking-tight">94.7%</div>
              <div className="text-[11px] uppercase tracking-wider text-[#A5A5A4] mt-0.5 font-medium">On-Time SLA</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#16803C] tracking-tight">13h 40m</div>
              <div className="text-[11px] uppercase tracking-wider text-[#A5A5A4] mt-0.5 font-medium">Avg Nagpur-Mumbai</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean White Logistics Corridor Card Overlay */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative w-full h-[460px] sm:h-[500px] rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md shadow-[0_12px_40px_rgba(6,56,61,0.08)] overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E0DED9]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2AE32] animate-pulse" />
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-[#292D2F] uppercase block">
                  PRIMARY CORRIDOR · NAGPUR → MUMBAI
                </span>
                <span className="text-[10px] font-mono text-[#A5A5A4] block">
                  NH-53 / SAMRUDDHI EXPRESSWAY
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#F0EEEA] border border-[#D0CEC9] text-[10px] font-mono font-bold text-[#06383D]">
              CC-102 EN ROUTE
            </span>
          </div>

          {/* Real Leaflet Map with CartoDB Positron Tiles */}
          <div className="relative w-full h-[300px] sm:h-[330px] rounded-xl my-2 border border-[#E0DED9] overflow-hidden">
            <HeroRealMap />
          </div>

          {/* Footer Card Telemetry */}
          <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-2 text-[#A5A5A4]">
              <MapPin className="w-3.5 h-3.5 text-[#06383D]" />
              <span>CURRENT LOCATION:</span>
              <span className="font-bold text-[#292D2F]">KASARA GHAT APPROACH</span>
            </div>
            <span className="text-[#16803C] font-bold">SPEED: 78.4 KM/H</span>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="w-full flex justify-center pb-4 text-[#A5A5A4] font-mono text-xs">
        <a href="#network" className="inline-flex items-center gap-2 hover:text-[#292D2F] transition-colors">
          <span>SCROLL TO EXPLORE NETWORK</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#F2AE32]" />
        </a>
      </div>
    </CinematicVideoBackground>
  );
};
