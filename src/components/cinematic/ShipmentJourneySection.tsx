import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  MapPin, 
  Truck, 
  Package, 
  ShieldCheck, 
  ArrowRight,
  Navigation,
  Lock,
  Layers
} from 'lucide-react';
import { VIDEO_MAPPING } from '../../config/videoConfig';
import { OptimizedVideo } from '../common/OptimizedVideo';

export const ShipmentJourneySection: React.FC = () => {

  // Exact 5-stage chain of custody timeline requested:
  // PICKUP -> ORIGIN HUB -> IN TRANSIT -> DESTINATION HUB -> DELIVERED
  const timelineStages = [
    {
      id: 'pickup',
      title: 'PICKUP',
      subtitle: 'Factory Warehouse Dock Loading',
      time: '04:30 IST',
      location: 'Tata Motors Assembly Plant, Pune Corridor',
      status: 'completed', // green
      description: 'Pallet staging verified, BLE cryptographic seal engaged, driver safety briefing verified.',
    },
    {
      id: 'origin-hub',
      title: 'ORIGIN HUB',
      subtitle: 'Nagpur Multi-Modal Logistics Center',
      time: '06:00 IST',
      location: 'MIHAN Inland Port, Gate 4',
      status: 'completed', // green
      description: 'Axle weighbridge tare validation (38.4T gross), E-way bill auto-reconciliation complete.',
    },
    {
      id: 'in-transit',
      title: 'IN TRANSIT',
      subtitle: 'Samruddhi Expressway Trunk',
      time: '14:20 IST (NOW)',
      location: 'Approaching Kasara Ghat Bypass (PK-244)',
      status: 'active', // amber
      description: 'Cruising at 78.4 km/h with 1-sec GPS telemetry. Continuous infrared driver fatigue monitoring active.',
    },
    {
      id: 'destination-hub',
      title: 'DESTINATION HUB',
      subtitle: 'Nhava Sheva Cross-Dock Depot',
      time: '18:45 IST (PROJECTED)',
      location: 'JNPT Port Buffer Terminal',
      status: 'pending', // gray
      description: 'Automated yard bay reservation confirmed. Pre-cleared Customs fast-pass gatehouse.',
    },
    {
      id: 'delivered',
      title: 'DELIVERED',
      subtitle: 'Consignee Berth Release',
      time: '20:15 IST (PROJECTED)',
      location: 'GTI Berth 3, JNPT Port',
      status: 'pending', // gray
      description: 'Digital proof of delivery (e-POD), biometric receiver sign-off, BLE e-seal decommission.',
    },
  ];

  return (
    <section className="relative w-full bg-white py-28 px-6 lg:px-8 border-b border-[#D0CEC9] overflow-hidden">
      {/* Background Subtle Industrial Lines */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#F2AE32] text-xs font-mono uppercase tracking-widest bg-[#F0EEEA] px-3 py-1.5 rounded-full border border-[#D0CEC9] font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>UNBROKEN CHAIN OF CUSTODY · 5-STAGE AUDIT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
            CHAIN OF CUSTODY.<br />
            <span className="text-[#F2AE32]">
              EVERY SECOND RECORDED.
            </span>
          </h2>

          <p className="text-[#A5A5A4] text-base sm:text-lg font-medium leading-relaxed">
            From factory staging to container terminal berth, freight custody is backed by physical weighbridge logs, satellite pings, and cryptographic e-seals.
          </p>
        </div>

        {/* Clean Editorial Layout: Video on One Side, Timeline on the Other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Crystal-Clear Video 3 in an Editorial Frame (6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-28">
            <div className="relative w-full aspect-[4/3] rounded-2xl border border-[#D0CEC9] bg-[#E8E6E2] overflow-hidden shadow-[0_12px_40px_rgba(6,56,61,0.08)]">
              {/* Native Cargo Handling Video with Lazy Loading & Memory Optimization */}
              <OptimizedVideo
                src={VIDEO_MAPPING.cargoHandling.path}
                ariaLabel="Cargo handling physical inspection"
                playbackRate={0.95}
                className="w-full h-full"
              />

              {/* Localized Bottom Warm Vignette for Text Badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* Top Video Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 rounded-lg bg-white/95 backdrop-blur-sm border border-[#D0CEC9] text-[11px] font-mono text-[#292D2F] font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
                <span>CARGO HANDLING · PHYSICAL INSPECTION</span>
              </div>

              {/* Bottom Video Dossier Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#D0CEC9] flex items-center justify-between text-xs font-mono shadow-sm">
                <div>
                  <span className="text-[10px] text-[#A5A5A4] uppercase block">ACTIVE SHIPMENT</span>
                  <span className="font-bold text-[#292D2F]">SHP-8092 · 38.4 TONS</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#F0EEEA] text-[#F2AE32] font-bold border border-[#D0CEC9]">
                  IN TRANSIT
                </span>
              </div>
            </div>

            {/* Video Annotation Card */}
            <div className="p-5 rounded-2xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between font-mono text-xs text-[#A5A5A4]">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#06383D]" />
                <span>ELECTRONIC TAMPER SEAL: <strong className="text-[#292D2F]">ES-9941 (LOCKED)</strong></span>
              </div>
              <span className="text-[#16803C] font-bold">100% INTEGRITY</span>
            </div>
          </div>

          {/* RIGHT COLUMN: Clean Editorial Timeline (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {timelineStages.map((stage, idx) => {
              const isCompleted = stage.status === 'completed';
              const isActive = stage.status === 'active';
              const isPending = stage.status === 'pending';

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-white border-2 border-[#F2AE32] shadow-[0_8px_30px_rgba(242,174,50,0.15)]'
                      : isCompleted
                      ? 'bg-white border-[#D0CEC9] shadow-2xs'
                      : 'bg-[#F0EEEA] border-[#E0DED9] opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Status Indicator Icon */}
                    <div className="mt-1">
                      {isCompleted && (
                        <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16803C]">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {isActive && (
                        <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center text-[#F2AE32]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F2AE32] animate-ping" />
                        </div>
                      )}
                      {isPending && (
                        <div className="w-7 h-7 rounded-full bg-[#E8E6E2] border border-[#D0CEC9] flex items-center justify-center text-[#A5A5A4]">
                          <Circle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Timeline Stage Details */}
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-[#292D2F] tracking-wider uppercase">
                            0{idx + 1} · {stage.title}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            isCompleted 
                              ? 'bg-emerald-50 text-[#16803C] border border-emerald-200' 
                              : isActive 
                              ? 'bg-amber-50 text-[#F2AE32] border border-amber-200' 
                              : 'bg-[#E8E6E2] text-[#A5A5A4] border border-[#D0CEC9]'
                          }`}>
                            {isCompleted ? 'COMPLETED' : isActive ? 'IN PROGRESS' : 'PENDING'}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#A5A5A4]">{stage.time}</span>
                      </div>

                      <div className="text-base font-bold text-[#292D2F] font-sans">
                        {stage.subtitle}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#A5A5A4]">
                        <MapPin className="w-3 h-3 text-[#06383D]" />
                        <span>{stage.location}</span>
                      </div>

                      <p className="text-xs text-[#A5A5A4] pt-1 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
