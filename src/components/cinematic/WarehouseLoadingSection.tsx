import React from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Scale, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Warehouse,
  Lock,
  MapPin
} from 'lucide-react';
import { CinematicVideoBackground } from '../common/CinematicVideoBackground';
import { VIDEO_MAPPING } from '../../config/videoConfig';

export const WarehouseLoadingSection: React.FC = () => {
  return (
    <CinematicVideoBackground
      video={VIDEO_MAPPING.warehouseOperations}
      overlayVariant="left"
      enableParallax={true}
      className="relative min-h-screen border-b border-[#D0CEC9] flex flex-col justify-center py-28 px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#F2AE32] text-xs font-mono uppercase tracking-widest bg-white/95 px-3 py-1.5 rounded-full border border-[#D0CEC9] shadow-2xs font-bold">
            <Warehouse className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>WAREHOUSE OPERATIONS & FORKLIFT STAGING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#292D2F] tracking-tight uppercase font-sans leading-none">
            EVERY LOAD.<br />
            <span className="text-[#F2AE32]">
              ACCOUNTED FOR.
            </span>
          </h2>

          <p className="text-[#292D2F] text-base sm:text-lg font-medium max-w-2xl bg-white/80 p-3 rounded-xl border border-[#D0CEC9]/60 backdrop-blur-sm">
            Automated pallet staging, tare/gross axle weighbridge validation, and digital cryptographic e-seal pairing before departure onto the expressway.
          </p>
        </div>

        {/* Clean White Operational Cards Layered Directly Over Bright Video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* Card 1: LOADING STATUS (Active - Amber) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border-2 border-[#F2AE32] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(242,174,50,0.15)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-[#F2AE32]" />
                LOADING STATUS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-50 text-[#F2AE32] border border-amber-200">
                ACTIVE
              </span>
            </div>

            <div>
              <div className="text-2xl font-black font-sans text-[#292D2F]">BAY 12</div>
              <div className="text-xs text-[#A5A5A4] mt-0.5">Forklift Crew Alpha-4</div>
            </div>

            <div className="pt-2 border-t border-[#E0DED9] text-[11px] font-mono text-[#F2AE32] font-semibold">
              32 / 32 Pallets Staged
            </div>
          </motion.div>

          {/* Card 2: WEIGHT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(6,56,61,0.06)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#06383D]" />
                GROSS WEIGHT
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-[#16803C] border border-emerald-200">
                VERIFIED
              </span>
            </div>

            <div>
              <div className="text-2xl font-black font-sans text-[#292D2F]">38.4 TONS</div>
              <div className="text-xs text-[#A5A5A4] mt-0.5">Tare Weight: 14.2 T</div>
            </div>

            <div className="pt-2 border-t border-[#E0DED9] text-[11px] font-mono text-[#16803C] font-semibold">
              Axle Balance: 49.8% / 50.2%
            </div>
          </motion.div>

          {/* Card 3: SEAL STATUS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(6,56,61,0.06)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#16803C]" />
                SEAL STATUS
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-50 text-[#16803C] border border-emerald-200">
                LOCKED
              </span>
            </div>

            <div>
              <div className="text-2xl font-black font-mono text-[#292D2F]">#SL-9941</div>
              <div className="text-xs text-[#A5A5A4] mt-0.5">BLE Tamper-Evident</div>
            </div>

            <div className="pt-2 border-t border-[#E0DED9] text-[11px] font-mono text-[#16803C] font-semibold">
              Zero Breach Detected
            </div>
          </motion.div>

          {/* Card 4: ORIGIN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(6,56,61,0.06)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F2AE32]" />
                ORIGIN
              </span>
              <span className="text-[10px] font-mono text-[#A5A5A4]">HUB A</span>
            </div>

            <div>
              <div className="text-xl font-black font-sans text-[#292D2F]">NAGPUR</div>
              <div className="text-xs text-[#A5A5A4] mt-0.5">MIHAN Multi-Modal Logistics</div>
            </div>

            <div className="pt-2 border-t border-[#E0DED9] text-[11px] font-mono text-[#A5A5A4]">
              Departed: 06:30 IST
            </div>
          </motion.div>

          {/* Card 5: DESTINATION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.32 }}
            className="rounded-2xl border border-[#D0CEC9] bg-white/95 backdrop-blur-md p-5 shadow-[0_8px_24px_rgba(6,56,61,0.06)] space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-2.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#A5A5A4] flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#06383D]" />
                DESTINATION
              </span>
              <span className="text-[10px] font-mono text-[#A5A5A4]">PORT</span>
            </div>

            <div>
              <div className="text-xl font-black font-sans text-[#292D2F]">MUMBAI</div>
              <div className="text-xs text-[#A5A5A4] mt-0.5">JNPT Container Terminal</div>
            </div>

            <div className="pt-2 border-t border-[#E0DED9] text-[11px] font-mono text-[#06383D] font-bold">
              ETA: 18:45 IST
            </div>
          </motion.div>

        </div>

      </div>
    </CinematicVideoBackground>
  );
};
