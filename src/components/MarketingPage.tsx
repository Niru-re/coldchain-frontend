import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  Thermometer, 
  Truck, 
  Plane, 
  Train, 
  Warehouse, 
  Sprout, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  TrendingDown, 
  Layers, 
  Compass, 
  Globe2, 
  Zap, 
  FileCheck2,
  ChevronRight,
  Play,
  RotateCw,
  Clock
} from 'lucide-react';

interface MarketingPageProps {
  onLaunchTower: () => void;
  onLaunchFarmerPortal: () => void;
  onLaunchAdmin: () => void;
}

export const MarketingPage: React.FC<MarketingPageProps> = ({
  onLaunchTower,
  onLaunchFarmerPortal,
  onLaunchAdmin,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(2); // AI Predict & Rescue step

  const industries = [
    {
      name: 'Pharmaceuticals & Biologics',
      temp: '-80°C to +8°C',
      challenge: 'Irreversible denaturation of mRNA and blood plasma upon micro-excursion.',
      risk: 'Loss of life-saving batches and non-compliance with strict WHO GDP standards.',
      solution: 'Cryo-grade telematics with LEO satellite backup and automated hospital redirection.',
    },
    {
      name: 'Fresh Horticultural Produce',
      temp: '+2°C to +6°C',
      challenge: 'Post-harvest respiration and rapid ethylene accumulation accelerating decay.',
      risk: 'Loss of export grading, enzymatic rot, and total loss before reaching global ports.',
      solution: 'Dynamic Arrhenius shelf-life engine triggering proactive local cold storage rerouting.',
    },
    {
      name: 'Dairy & Artisanal Cheeses',
      temp: '+1°C to +4°C',
      challenge: 'Bacterial acidification and fat emulsion breakdown during highway traffic delays.',
      risk: 'Spontaneous curdling and massive retail consignment rejections.',
      solution: 'Continuous pH and thermal telemetry coupled with on-demand reefer fleet matching.',
    },
    {
      name: 'Premium Seafood & Sashimi',
      temp: '-1.5°C to +1°C',
      challenge: 'Super-chilled brine preservation requires sub-degree thermal precision.',
      risk: 'Histamine buildup and degradation of sashimi texture within hours.',
      solution: 'Sub-zero hydro-chilled cargo digital twins with predictive airport customs clearance.',
    },
  ];

  return (
    <div className="bg-[#06383D] text-[#F0EEEA] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-36 border-b border-[#D0CEC9] bg-radial-glow">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2AE32]/30 bg-[#06383D]/20 px-3.5 py-1 text-xs font-mono text-[#F2AE32] shadow-lg shadow-[#F2AE32]/20 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F2AE32] animate-pulse" />
            <span>Autonomous Cold-Chain Intelligence System · v2.4</span>
            <ChevronRight className="h-3 w-3 text-[#F2AE32]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Core Positioning & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                The intelligence layer for the world's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2AE32] via-[#F2AE32]/80 to-[#0A4A50]">cold chain</span>.
              </h1>

              <p className="text-lg text-[#A5A5A4] leading-relaxed max-w-2xl font-normal">
                ColdChain 360 monitors temperature, predicts thermal risk, and orchestrates intelligent rescue responses across road, rail, air, and marine networks before valuable cargo becomes a loss.
              </p>

              {/* Tagline Pill */}
              <div className="text-xs font-mono text-[#A5A5A4] flex items-center gap-2">
                <span className="text-[#F2AE32]">MONITOR</span>
                <span>→</span>
                <span className="text-sky-300">PREDICT</span>
                <span>→</span>
                <span className="text-blue-400">PREVENT</span>
                <span>→</span>
                <span className="text-rose-400">RESCUE</span>
                <span>→</span>
                <span className="text-[#16803C]">OPTIMIZE</span>
              </div>

              {/* Primary Action Group */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onLaunchTower}
                  className="rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/85 px-6 py-3.5 text-sm font-semibold text-[#292D2F] shadow-xl shadow-[#F2AE32]/25 transition-all flex items-center gap-2 group cursor-pointer"
                >
                  Explore AI Control Tower
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={onLaunchFarmerPortal}
                  className="rounded-lg border border-[#D0CEC9] bg-[#06383D]/90 hover:bg-[#E8E6E2] hover:text-[#292D2F] px-5 py-3.5 text-sm font-semibold text-white transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Sprout className="h-4 w-4 text-[#16803C]" />
                  Producer / Farmer Portal
                </button>
              </div>

              {/* Quick Credibility KPIs */}
              <div className="pt-8 border-t border-[#D0CEC9] grid grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <span className="text-2xl font-bold text-white block">$420M+</span>
                  <span className="text-[#A5A5A4]">Perishables Protected</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#16803C] block">99.82%</span>
                  <span className="text-[#A5A5A4]">Zero-Loss Deliveries</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#F2AE32] block">4,800+</span>
                  <span className="text-[#A5A5A4]">Active IoT Nodes</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Operational Telemetry Simulation Widget */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#D0CEC9] bg-[#06383D]/90 p-5 shadow-2xl backdrop-blur-xl relative">
                
                {/* Live simulation badge */}
                <div className="flex items-center justify-between pb-3 border-b border-[#D0CEC9]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                    </span>
                    <span className="text-xs font-mono font-semibold text-white">INTERCEPTED EXCURSION #CC-1048</span>
                  </div>
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    AI RESCUE TRIGGERED
                  </span>
                </div>

                {/* Simulated Telemetry Card */}
                <div className="mt-4 space-y-3">
                  <div className="p-3 rounded-lg bg-[#06383D]/60 border border-[#D0CEC9] flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[#A5A5A4] block text-[10px] font-mono">PAYLOAD</span>
                      <strong className="text-white">Alphonso Export Mangoes (6.2T)</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[#A5A5A4] block text-[10px] font-mono">CORE TEMP</span>
                      <span className="text-rose-400 font-bold font-mono text-sm">+9.8°C (Max: +7.0°C)</span>
                    </div>
                  </div>

                  {/* Arrhenius Shelf Life Depletion Indicator */}
                  <div className="p-3 rounded-lg bg-[#06383D]/60 border border-[#D0CEC9] space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#A5A5A4]">Dynamic Usable Shelf-Life:</span>
                      <span className="text-[#F2AE32] font-bold">19.5 Hours Remaining</span>
                    </div>
                    <div className="w-full bg-[#E8E6E2] rounded-full h-2">
                      <div className="bg-[#F2AE32] h-2 rounded-full" style={{ width: '28%' }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#A5A5A4] font-mono">
                      <span>Harvest Baseline: 72h</span>
                      <span>Target ETA at BOM: 24h</span>
                    </div>
                  </div>

                  {/* System Recommendation */}
                  <div className="p-3 rounded-lg bg-[#06383D]/20 border border-[#F2AE32]/30 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#F2AE32] font-semibold">
                      <Sparkles className="h-3.5 w-3.5" />
                      Autonomous Rescue Recommendation:
                    </div>
                    <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
                      Divert 18km to Mahad Cold Hub (Bay 4 pre-chilled to 3.8°C). Preserves $48,500 export batch from spoilage.
                    </p>
                  </div>

                  {/* Action Button inside widget */}
                  <button
                    onClick={onLaunchTower}
                    className="w-full mt-2 py-2.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#292D2F] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Inspect Full Intervention Matrix
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRUSTED BY / ECOSYSTEM STRIP */}
      <section className="py-8 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-[#A5A5A4] mb-6">
            TRUSTED BY GLOBAL PHARMACEUTICAL PRODUCERS, AGRO COOPERATIVES & MULTIMODAL LOGISTICS ENTERPRISES
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center opacity-65 grayscale hover:grayscale-0 transition-all font-mono text-sm text-[#A5A5A4]">
            <span className="font-bold tracking-tight">NOVAVITA BIO</span>
            <span className="font-bold tracking-tight">MAERSK COLD</span>
            <span className="font-bold tracking-tight">AGRO HARVEST</span>
            <span className="font-bold tracking-tight">SWISS CRYO-RAIL</span>
            <span className="font-bold tracking-tight">NORDIC FJORD</span>
            <span className="font-bold tracking-tight">CARRIER TRANSICOLD</span>
          </div>
        </div>
      </section>

      {/* 3. COLD CHAIN PROBLEM & ROOT CAUSES */}
      <section className="py-24 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold">The $1.3 Trillion Perishables Crisis</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Why traditional cold chains fail before anyone notices.
            </h2>
            <p className="text-[#A5A5A4] text-base mt-3 leading-relaxed">
              Standard GPS trackers only report "where the truck is" and static data loggers only reveal that goods spoiled <em className="text-white">after</em> they arrive at the buyer's loading dock.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] space-y-3">
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 w-fit">
                <Thermometer className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Silent Micro-Excursions</h3>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                A +2°C rise over 4 hours in ambient 38°C heat degrades shelf life by 60% without triggering crude static threshold buzzers.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] space-y-3">
              <div className="p-2.5 rounded-lg bg-[#F2AE32]/10 border border-[#F2AE32]/30 text-[#F2AE32] w-fit">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Blind Intermodal Handshakes</h3>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                Cargo sits on airport tarmac or rail sidings with disconnected telematics systems, creating critical visibility voids.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] space-y-3">
              <div className="p-2.5 rounded-lg bg-[#F2AE32]/10 border border-[#F2AE32]/30 text-[#F2AE32] w-fit">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Inaction & Total Consignment Loss</h3>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                By the time human dispatchers coordinate phone calls, produce is rotten or vaccines are discarded, resulting in 100% economic waste.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. AI RESCUE ENGINE & INTERACTIVE STORYTELLING */}
      <section className="py-24 border-b border-[#D0CEC9] bg-gradient-to-b from-[#06383D] via-[#0A4A50] to-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-widest font-semibold">Autonomous Orchestration</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
                When the plan breaks, intelligence takes over.
              </h2>
              <p className="text-[#A5A5A4] text-sm mt-2 max-w-2xl">
                ColdChain 360 doesn't just alert you to disaster. The AI Rescue Brain evaluates emergency cold storage hubs, replacement reefers, and alternative buyer markets in real time.
              </p>
            </div>

            <button
              onClick={onLaunchTower}
              className="text-xs font-mono text-[#F2AE32] hover:text-white flex items-center gap-1.5 border border-[#F2AE32]/30 px-3.5 py-2 rounded-lg bg-[#06383D]/40"
            >
              Test Live in Operations Tower
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Step Sequence Interactive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Steps */}
            <div className="lg:col-span-5 space-y-4">
              <div 
                onClick={() => setActiveStep(1)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeStep === 1 
                    ? 'border-[#F2AE32] bg-[#06383D]/30 ring-1 ring-[#F2AE32]/20' 
                    : 'border-[#D0CEC9] bg-[#06383D]/70 hover:border-[#D0CEC9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#F2AE32]">STAGE 01</span>
                  <span className="text-[#A5A5A4]">Continuous Biothermal Mapping</span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-1">Multi-Sensor Ingestion (BLE + CAN-Bus)</h4>
                <p className="text-xs text-[#A5A5A4] mt-1">
                  Ingests core probe temperature, door lock status, compressor PSI and exterior heat.
                </p>
              </div>

              <div 
                onClick={() => setActiveStep(2)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeStep === 2 
                    ? 'border-rose-400 bg-rose-950/30 ring-1 ring-rose-400/20' 
                    : 'border-[#D0CEC9] bg-[#06383D]/70 hover:border-[#D0CEC9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-400">STAGE 02 · CRITICAL</span>
                  <span className="text-[#A5A5A4]">Dynamic Arrhenius Decay</span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-1">Future Failure Radar Detects Excursion</h4>
                <p className="text-xs text-[#A5A5A4] mt-1">
                  Predicts remaining usable life will hit zero 3.5 hours before cargo arrives at airport.
                </p>
              </div>

              <div 
                onClick={() => setActiveStep(3)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  activeStep === 3 
                    ? 'border-[#16803C] bg-[#06383D]/30 ring-1 ring-[#16803C]/20' 
                    : 'border-[#D0CEC9] bg-[#06383D]/70 hover:border-[#D0CEC9]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#16803C]">STAGE 03</span>
                  <span className="text-[#A5A5A4]">Autonomous Mitigation</span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-1">AI Rescue Route Dispatched</h4>
                <p className="text-xs text-[#A5A5A4] mt-1">
                  Interception route booked at Mahad Hub Bay 4. $48,500 cargo value salvaged.
                </p>
              </div>
            </div>

            {/* Right Interactive Visual Demonstration */}
            <div className="lg:col-span-7 bg-[#06383D] border border-[#D0CEC9] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-[#D0CEC9]">
                <span className="text-xs font-mono text-[#A5A5A4]">MISSION ROUTE: RATNAGIRI → MUMBAI AIR CARGO</span>
                <span className="text-xs font-mono text-[#F2AE32] bg-[#06383D]/50 px-2.5 py-0.5 rounded border border-[#06383D]/30">
                  NH-66 HIGHWAY CORRIDOR
                </span>
              </div>

              {/* Highway Route Schematic */}
              <div className="py-8 relative">
                
                {/* Route Line */}
                <div className="h-1 bg-[#E8E6E2] w-full relative">
                  <div className="absolute left-0 top-0 h-1 bg-gradient-to-r from-[#F2AE32] via-[#F2AE32] to-rose-500 w-3/4" />
                </div>

                {/* Nodes along the route */}
                <div className="flex justify-between items-center -mt-3.5 relative px-2">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#F2AE32] border-2 border-[#06383D] text-[#292D2F] flex items-center justify-center text-[10px] font-bold">✓</div>
                    <span className="text-[10px] font-mono text-[#A5A5A4] mt-1">Ratnagiri Hub</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#F2AE32] border-2 border-[#06383D] text-[#292D2F] flex items-center justify-center text-[10px] font-bold">✓</div>
                    <span className="text-[10px] font-mono text-[#A5A5A4] mt-1">Chiplun</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-rose-500 border-2 border-white text-[#292D2F] flex items-center justify-center text-xs font-bold animate-ping absolute -top-1" />
                    <div className="h-8 w-8 rounded-full bg-rose-500 border-2 border-white text-[#292D2F] flex items-center justify-center text-xs font-bold z-10">!</div>
                    <span className="text-[10px] font-mono text-rose-400 font-bold mt-1">Khed Anomaly (+9.8°C)</span>
                  </div>

                  {/* Diversion branch to Mahad */}
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[#16803C] border-2 border-[#06383D] text-[#292D2F] flex items-center justify-center text-[10px] font-bold">✦</div>
                    <span className="text-[10px] font-mono text-[#16803C] font-bold mt-1">Mahad Cold Storage (Divert)</span>
                  </div>

                  <div className="flex flex-col items-center opacity-40">
                    <div className="h-6 w-6 rounded-full bg-[#E8E6E2] text-[#A5A5A4] flex items-center justify-center text-[10px]">✕</div>
                    <span className="text-[10px] font-mono text-[#A5A5A4] mt-1">Mumbai BOM (Original)</span>
                  </div>
                </div>

              </div>

              {/* Metric Callouts */}
              <div className="grid grid-cols-3 gap-3 border-t border-[#D0CEC9] pt-4 text-xs font-mono">
                <div className="p-2.5 bg-[#06383D]/60 rounded">
                  <span className="text-[#A5A5A4] block text-[10px]">PREVENTED SPOILAGE</span>
                  <span className="text-[#16803C] font-bold text-sm">$48,500</span>
                </div>
                <div className="p-2.5 bg-[#06383D]/60 rounded">
                  <span className="text-[#A5A5A4] block text-[10px]">PRESERVED SHELF LIFE</span>
                  <span className="text-[#F2AE32] font-bold text-sm">+68.5 Hours</span>
                </div>
                <div className="p-2.5 bg-[#06383D]/60 rounded">
                  <span className="text-[#A5A5A4] block text-[10px]">ALGORITHM SPEED</span>
                  <span className="text-white font-bold text-sm">420ms Evaluation</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. MULTIMODAL LOGISTICS (ROAD, RAIL, AIR, MARINE) */}
      <section className="py-24 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-widest font-semibold">End-to-End Visibility</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Unified telemetry across every mode of transport.
            </h2>
            <p className="text-[#A5A5A4] text-sm mt-3">
              No blind spots between highway reefers, high-speed rail cryo-cars, airport tarmac handling, and destination retail hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] hover:border-[#F2AE32]/50 transition-colors">
              <div className="p-3 rounded-lg bg-[#F2AE32]/10 text-[#F2AE32] w-fit mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Highway Reefers</h3>
              <p className="text-xs text-[#A5A5A4] mt-2 leading-relaxed">
                Direct integration with Thermo King and Carrier microprocessors. Real-time engine load, alternator health, and multi-zone temperature probes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] hover:border-[#F2AE32]/50 transition-colors">
              <div className="p-3 rounded-lg bg-[#06383D]/20 text-[#A5A5A4] w-fit mb-4">
                <Train className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Intermodal Rail</h3>
              <p className="text-xs text-[#A5A5A4] mt-2 leading-relaxed">
                Low-power mesh networks transmitting through steel containers on trans-continental freight corridors without external generator dependence.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] hover:border-[#F2AE32]/50 transition-colors">
              <div className="p-3 rounded-lg bg-[#06383D]/20 text-[#F2AE32] w-fit mb-4">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Air Cargo Tarmac</h3>
              <p className="text-xs text-[#A5A5A4] mt-2 leading-relaxed">
                LEO satellite connectivity tracking temperature on airport tarmac during loading delays, flight transit, and bonded customs holds.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#D0CEC9] bg-[#06383D] hover:border-[#F2AE32]/50 transition-colors">
              <div className="p-3 rounded-lg bg-[#06383D]/20 text-[#16803C] w-fit mb-4">
                <Warehouse className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Cold Storage Hubs</h3>
              <p className="text-xs text-[#A5A5A4] mt-2 leading-relaxed">
                Automated dock bay reservation, blast chiller status monitoring, and FIFO/FEFO expiration tracking for rapid turnarounds.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. INDUSTRY SOLUTIONS (INTERACTIVE CARDS) */}
      <section className="py-24 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-widest font-semibold">Specialized Protocols</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2">
              Engineered for strict biological and thermal requirements.
            </h2>
            <p className="text-[#A5A5A4] text-sm mt-3">
              Select an industry to explore the exact cold-chain challenges, thermal tolerances, and ColdChain 360 AI protection models.
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-[#D0CEC9] pb-4 mb-8">
            {industries.map((ind, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndustry(idx)}
                className={`text-left p-3 rounded-lg text-xs font-medium transition-all ${
                  selectedIndustry === idx
                    ? 'bg-[#06383D]/20 text-[#F2AE32] border border-[#F2AE32]/40'
                    : 'text-[#A5A5A4] hover:text-white bg-[#06383D]/40 border border-transparent'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Selected Industry Card Reveal */}
          <div className="rounded-2xl border border-[#D0CEC9] bg-[#06383D] p-6 lg:p-8 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <span className="text-xs font-mono text-[#A5A5A4]">Target Industry Sector</span>
                <h3 className="text-2xl font-bold text-white mt-1">{industries[selectedIndustry].name}</h3>
              </div>
              <div className="p-2.5 rounded-lg bg-[#06383D] border border-[#D0CEC9] font-mono text-xs">
                <span className="text-[#A5A5A4] block text-[10px]">CRITICAL TEMPERATURE ENVELOPE</span>
                <span className="text-[#F2AE32] font-bold text-sm">{industries[selectedIndustry].temp}</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-[#06383D]/50 border border-[#D0CEC9] space-y-2">
                <span className="text-xs font-mono uppercase text-rose-400 font-semibold block">Primary Operational Challenge</span>
                <p className="text-xs text-[#A5A5A4] leading-relaxed">{industries[selectedIndustry].challenge}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#06383D]/50 border border-[#D0CEC9] space-y-2">
                <span className="text-xs font-mono uppercase text-[#F2AE32] font-semibold block">Failure Consequences</span>
                <p className="text-xs text-[#A5A5A4] leading-relaxed">{industries[selectedIndustry].risk}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#06383D]/30 border border-[#F2AE32]/30 space-y-2">
                <span className="text-xs font-mono uppercase text-[#F2AE32] font-semibold block">ColdChain 360 AI Solution</span>
                <p className="text-xs text-white leading-relaxed">{industries[selectedIndustry].solution}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. SUSTAINABILITY & ESG IMPACT */}
      <section className="py-24 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono text-[#16803C] uppercase tracking-widest font-semibold">Climate & Food Waste Impact</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Saving cargo from the dumpster is the single highest-ROI climate intervention.
              </h2>
              <p className="text-[#A5A5A4] text-sm leading-relaxed">
                When a container of refrigerated food or biologics is spoiled, the embedded emissions from cultivation, processing, packaging, and fuel are completely wasted. ColdChain 360 eliminates this cycle.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#06383D]/30 border border-[#F2AE32]/30 text-[#F2AE32]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Reduced 14,200 Metric Tons of CO2e across 1,200 active routes</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#06383D] border border-[#D0CEC9] text-[#A5A5A4]">
                  <CheckCircle2 className="h-4 w-4 text-[#F2AE32] shrink-0" />
                  <span>38% reduction in empty emergency reefer deadhead miles</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#06383D] border border-[#D0CEC9] text-[#A5A5A4]">
                  <CheckCircle2 className="h-4 w-4 text-[#F2AE32] shrink-0" />
                  <span>99.4% escrow payout fulfillment directly to local farm cooperatives</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4 font-mono">
              <div className="p-6 rounded-2xl bg-[#06383D] border border-[#D0CEC9] text-center">
                <span className="text-4xl font-extrabold text-[#16803C] block mb-1">42%</span>
                <span className="text-xs text-[#A5A5A4] font-semibold block">Food Waste Reduction</span>
                <p className="text-[11px] text-[#A5A5A4] mt-2">Measured across 85 farm-to-export corridors</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#06383D] border border-[#D0CEC9] text-center">
                <span className="text-4xl font-extrabold text-[#F2AE32] block mb-1">Zero</span>
                <span className="text-xs text-[#A5A5A4] font-semibold block">Vaccine Batch Discard</span>
                <p className="text-[11px] text-[#A5A5A4] mt-2">In WHO GDP verified clinical trials</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#06383D] border border-[#D0CEC9] text-center">
                <span className="text-4xl font-extrabold text-white block mb-1">2.4x</span>
                <span className="text-xs text-[#A5A5A4] font-semibold block">Faster Response Speed</span>
                <p className="text-[11px] text-[#A5A5A4] mt-2">Over manual phone dispatch calls</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#06383D] border border-[#D0CEC9] text-center">
                <span className="text-4xl font-extrabold text-[#F2AE32] block mb-1">100%</span>
                <span className="text-xs text-[#A5A5A4] font-semibold block">Audit Integrity</span>
                <p className="text-[11px] text-[#A5A5A4] mt-2">Cryptographic SHA-256 sensor logs</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION / ENTERPRISE ONBOARDING */}
      <section className="py-24 bg-gradient-to-t from-[#06383D] to-[#0A4A50] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-widest font-semibold">Immediate Deployment</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Protect your next high-value shipment today.
          </h2>
          <p className="text-[#A5A5A4] text-base max-w-2xl mx-auto">
            Deploy ColdChain 360 plug-and-play IoT sensors or connect directly to your existing Thermo King, Carrier, and telematics APIs in under 30 minutes.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchTower}
              className="rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 px-7 py-3.5 text-sm font-semibold text-[#292D2F] shadow-xl shadow-[#F2AE32]/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              Open Operations Command Center
              <ChevronRight className="h-4 w-4" />
            </button>

            <button
              onClick={onLaunchAdmin}
              className="rounded-lg border border-[#D0CEC9] bg-[#06383D] hover:bg-[#E8E6E2] hover:text-[#292D2F] px-6 py-3.5 text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              Enterprise Admin Console
            </button>
          </div>
        </div>
      </section>

      {/* 9. ENTERPRISE FOOTER */}
      <footer className="border-t border-[#D0CEC9] bg-[#06383D] py-14 text-xs text-[#A5A5A4]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#D0CEC9]">
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-[#F2AE32] flex items-center justify-center font-bold text-[#292D2F] text-xs">C3</div>
                <span className="text-base font-bold text-white tracking-tight">ColdChain<span className="text-[#F2AE32]">360</span></span>
              </div>
              <p className="text-[#A5A5A4] max-w-sm leading-relaxed">
                Intelligent cold-chain infrastructure for a moving world. Autonomous AI monitoring, dynamic shelf-life calculation, and intermodal rescue dispatch.
              </p>
              <div className="font-mono text-[11px] text-[#A5A5A4]">
                SOC-2 Type II Certified · FDA 21 CFR Part 11 Validated · ISO 27001
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Platform</h4>
              <ul className="space-y-1.5">
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Operations Tower</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">AI Rescue Engine</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Cargo Digital Twin</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Counterfactual Simulator</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Solutions</h4>
              <ul className="space-y-1.5">
                <li><button onClick={onLaunchFarmerPortal} className="hover:text-[#F2AE32]">Producer / Farmer Portal</button></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Biologics & Pharma</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Fresh Produce & Fruits</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Seafood Cold Links</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono">Governance</h4>
              <ul className="space-y-1.5">
                <li><button onClick={onLaunchAdmin} className="hover:text-[#F2AE32]">Admin Console</button></li>
                <li><a href="#" className="hover:text-[#F2AE32]">GDP Compliance</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Security & RBAC</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Audit Trails</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A5A5A4] font-mono text-[11px]">
            <div>© 2026 ColdChain 360 Inc. All rights reserved. Built for mission-critical logistics.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#A5A5A4]">Privacy Policy</a>
              <a href="#" className="hover:text-[#A5A5A4]">Terms of Service</a>
              <a href="#" className="hover:text-[#A5A5A4]">Security Disclosures</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
