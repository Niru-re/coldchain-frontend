import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Navigation, 
  TrendingUp, 
  CheckCircle2, 
  Radio, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { VIDEO_MAPPING } from '../../config/videoConfig';
import { OptimizedVideo } from '../common/OptimizedVideo';

export const ScrollDrivenVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.33) {
        setStage(0);
      } else if (latest < 0.68) {
        setStage(1);
      } else {
        setStage(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const textOpacity1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const textY1 = useTransform(scrollYProgress, [0, 0.25, 0.33], [0, 0, -30]);

  const textOpacity2 = useTransform(scrollYProgress, [0.33, 0.45, 0.60, 0.68], [0, 1, 1, 0]);
  const textY2 = useTransform(scrollYProgress, [0.33, 0.45, 0.60, 0.68], [30, 0, 0, -30]);

  const textOpacity3 = useTransform(scrollYProgress, [0.68, 0.80, 1], [0, 1, 1]);
  const textY3 = useTransform(scrollYProgress, [0.68, 0.80, 1], [30, 0, 0]);

  return (
    <div
      ref={containerRef}
      className="relative h-[280vh] w-full bg-[#F0EEEA] select-none"
    >
      {/* STICKY FULLSCREEN VIEWPORT CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10">
        
        {/* 1. BACKGROUND FULL-SCREEN HIGHWAY VIDEO — BRIGHT & CLEAR */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <OptimizedVideo
            src={VIDEO_MAPPING.logisticsNetwork.path}
            ariaLabel="Aerial highway logistics network"
            playbackRate={0.9}
            className="w-full h-full"
          />

          {/* Localized Warm Gradients only — The Aerial Highway Video Remains Crisp & Visible! */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F0EEEA] via-transparent to-[#F0EEEA]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F0EEEA]/90 via-[#F0EEEA]/30 to-transparent pointer-events-none" />
        </div>

        {/* 2. TOP TELEMETRY STRIP — PHYSICAL LOGISTICS PANEL */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2AE32] animate-pulse" />
            <span className="text-[#292D2F] font-bold uppercase tracking-wider bg-white/90 px-3 py-1 rounded-lg border border-[#D0CEC9] shadow-2xs backdrop-blur-sm">
              CORRIDOR PROGRESSION 0{stage + 1} / 03 · WESTERN EXPRESSWAY TRUNK
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-[#D0CEC9] text-[#A5A5A4] shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-[#06383D] animate-pulse" />
            <span className="font-semibold">ACTIVE HIGHWAY FEED · 5G CORRIDOR</span>
          </div>
        </div>

        {/* 3. CENTER EDITORIAL HEADLINES WITH LIGHT BACKDROP CARD */}
        <div className="relative z-10 w-full max-w-4xl mx-auto my-auto text-left pointer-events-none">
          
          {/* STAGE 1: "CONNECTED FROM ORIGIN..." */}
          <motion.div
            style={{ opacity: textOpacity1, y: textY1 }}
            className={`p-8 sm:p-10 rounded-2xl bg-white/92 backdrop-blur-md border border-[#D0CEC9] shadow-[0_12px_36px_rgba(6,56,61,0.08)] max-w-2xl ${stage === 0 ? 'block' : 'hidden'}`}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#F2AE32] font-bold mb-2">
              DISPATCH PHASE · FIRST MILE HUB
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-none">
              CONNECTED FROM ORIGIN...
            </h2>
            <p className="text-base sm:text-lg text-[#292D2F]/80 font-medium mt-3 leading-relaxed">
              Nagpur Zero-Mile Multi-Modal Hub · Automated tare weighbridge and tamper-sealed manifest.
            </p>
          </motion.div>

          {/* STAGE 2: "...TO DESTINATION." */}
          <motion.div
            style={{ opacity: textOpacity2, y: textY2 }}
            className={`p-8 sm:p-10 rounded-2xl bg-white/92 backdrop-blur-md border border-[#D0CEC9] shadow-[0_12px_36px_rgba(6,56,61,0.08)] max-w-2xl ${stage === 1 ? 'block' : 'hidden'}`}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#06383D] font-bold mb-2">
              HIGHWAY CRUISE · 812 KM EXPRESSWAY
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-none">
              ...TO DESTINATION.
            </h2>
            <p className="text-base sm:text-lg text-[#292D2F]/80 font-medium mt-3 leading-relaxed">
              Samruddhi Mahamarg Trunk · Cruise optimization holding 76 km/h with zero urban chokepoints.
            </p>
          </motion.div>

          {/* STAGE 3: "EVERY MOMENT VISIBLE." */}
          <motion.div
            style={{ opacity: textOpacity3, y: textY3 }}
            className={`p-8 sm:p-10 rounded-2xl bg-white/92 backdrop-blur-md border border-[#D0CEC9] shadow-[0_12px_36px_rgba(6,56,61,0.08)] max-w-2xl ${stage === 2 ? 'block' : 'hidden'}`}
          >
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-[#16803C] font-bold mb-2">
              UNBROKEN CUSTODY · ZERO BLIND SPOTS
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-tight">
              CONNECTED FROM ORIGIN<br />
              <span className="text-[#F2AE32]">TO DESTINATION.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#292D2F]/80 font-medium mt-3 leading-relaxed">
              From inland depot departure to maritime berth customs, every driver action and vehicle second is auditable.
            </p>
          </motion.div>

        </div>

        {/* 4. PHYSICAL LOGISTICS INFORMATION PANELS OVER FOOTAGE */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          {/* PHYSICAL PANEL: CC-102 (Nagpur -> Mumbai | 62 km/h | ETA 18:45 | ON ROUTE) */}
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(6,56,61,0.08)] space-y-3">
              <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
                <div className="font-mono text-sm font-bold text-[#292D2F] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#F2AE32]" />
                  CC-102 · TATA PRIMA 5530.S
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#F0EEEA] text-[#16803C] border border-[#D0CEC9]">
                  ● ON ROUTE
                </span>
              </div>

              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#A5A5A4]">Nagpur → Mumbai (JNPT Port)</span>
                <span className="text-[#F2AE32] font-bold">78.4 km/h</span>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-[#A5A5A4] pt-2 border-t border-[#E0DED9]">
                <span>PROJECTED ARRIVAL:</span>
                <span className="text-[#292D2F] font-bold">18:45 IST (TODAY)</span>
              </div>
            </div>
          </div>

          {/* PHYSICAL PANEL: REAL-TIME RADAR STATS */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-4 shadow-[0_8px_24px_rgba(6,56,61,0.08)]">
              <div className="text-[10px] font-mono uppercase text-[#A5A5A4]">CORRIDOR ELEVATION</div>
              <div className="text-xl font-bold font-mono text-[#292D2F] mt-1">540m MSL</div>
              <div className="text-[10px] font-mono text-[#06383D] mt-0.5">Kasara Ghat Descent</div>
            </div>

            <div className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-4 shadow-[0_8px_24px_rgba(6,56,61,0.08)]">
              <div className="text-[10px] font-mono uppercase text-[#A5A5A4]">AIR BRAKE PSI</div>
              <div className="text-xl font-bold font-mono text-[#16803C] mt-1">118 PSI</div>
              <div className="text-[10px] font-mono text-[#A5A5A4] mt-0.5">Optimal Dual-Circuit</div>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-4 shadow-[0_8px_24px_rgba(6,56,61,0.08)]">
              <div className="text-[10px] font-mono uppercase text-[#A5A5A4]">TOLL FAST-PASS</div>
              <div className="text-xl font-bold font-mono text-[#F2AE32] mt-1">8/8 PASSED</div>
              <div className="text-[10px] font-mono text-[#A5A5A4] mt-0.5">Auto-Cleared FASTag</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
