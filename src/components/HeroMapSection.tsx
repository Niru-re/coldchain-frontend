import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Thermometer, 
  ArrowRight,
  Shield,
  Activity,
  Maximize2,
  RefreshCw,
  Compass
} from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onHowItWorks: () => void;
}

export const HeroMapSection: React.FC<HeroProps> = ({ onExplore, onHowItWorks }) => {
  // State simulation steps: 0 = NORMAL, 1 = THERMAL RISK, 2 = AI INTERVENTION, 3 = PROTECTED
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => ((prev + 1) % 4) as 0 | 1 | 2 | 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const phaseConfig = {
    0: {
      status: 'NOMINAL',
      statusColor: 'text-[#F2AE32] bg-[#06383D]/20 border-[#06383D]/30',
      badge: 'NORMAL ENVELOPE',
      temp: '4.8°C',
      tempDelta: 'Stable',
      tempColor: 'text-[#F2AE32]',
      eta: '17:15 IST (BOM Airport)',
      shelfLife: '68.0 Hours',
      riskScore: '12 / 100',
      callout: 'NH-66 Khed Corridor. Reefer compressor active at 285 PSI. Temperature strictly compliant.',
      cargoPos: { x: '24%', y: '68%' },
      activeNode: 'Khed Transit',
    },
    1: {
      status: 'THERMAL EXCURSION',
      statusColor: 'text-rose-400 bg-rose-950/60 border-rose-800/40',
      badge: 'THERMAL RISK DETECTED',
      temp: '9.8°C',
      tempDelta: '+2.8°C Above Safe Limit',
      tempColor: 'text-rose-400 font-bold',
      eta: '19:45 IST (Delayed Traffic)',
      shelfLife: '19.5 Hours (Depreciating 3.2x)',
      riskScore: '84 / 100 (CRITICAL)',
      callout: 'Secondary coil micro-leakage detected. Arrhenius model predicts biochemical spoilage before airport arrival.',
      cargoPos: { x: '42%', y: '52%' },
      activeNode: 'Poladpur Pass',
    },
    2: {
      status: 'AI ORCHESTRATION',
      statusColor: 'text-amber-400 bg-amber-950/60 border-amber-800/40',
      badge: 'AI INTERVENTION ACTIVE',
      temp: '9.2°C',
      tempDelta: 'Evaluating 5 Rescue Corridors',
      tempColor: 'text-amber-300',
      eta: 'Divert ETA: 15:40 IST (Mahad Bay 4)',
      shelfLife: 'Stabilizing at 64.0h post-divert',
      riskScore: '42 / 100',
      callout: 'Autonomous decision: Divert 18km to Mahad Emergency Agro Hub. Pre-cooling dock bay 4 to 3.8°C.',
      cargoPos: { x: '58%', y: '42%' },
      activeNode: 'Mahad Junction',
    },
    3: {
      status: 'CARGO PROTECTED',
      statusColor: 'text-[#F2AE32] bg-[#06383D]/20 border-[#06383D]/30',
      badge: 'RESCUE COMPLETE · VALUE SECURED',
      temp: '3.9°C',
      tempDelta: 'Restored to Safe Envelope',
      tempColor: 'text-[#F2AE32] font-bold',
      eta: 'Consignment Transferred to Backup Reefer',
      shelfLife: '62.5 Hours Remaining (SAFE)',
      riskScore: '8 / 100',
      callout: '₹48,500 export grade mango consignment fully salvaged. Escrow released to farmer cooperative.',
      cargoPos: { x: '68%', y: '36%' },
      activeNode: 'Mahad Cold Storage Hub',
    },
  };

  const current = phaseConfig[phase];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between border-b border-subtle bg-[#05070a] overflow-hidden">
      {/* Precision architectural grid lines */}
      <div className="absolute inset-0 bg-radar-grid opacity-40 pointer-events-none" />

      {/* Top telemetry status ticker bar */}
      <div className="hairline-b bg-[#070b10] px-4 py-2 sm:px-8 text-[11px] font-mono text-[#A5A5A4] flex flex-wrap items-center justify-between gap-4 relative z-20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#F2AE32]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F2AE32] animate-pulse" />
            LIVE WESTERN ASIA CORRIDOR TELEMETRY
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-[#A5A5A4]">SYSTEM: ONLINE</span>
          <span className="text-slate-600">/</span>
          <span className="hidden md:inline text-[#A5A5A4]">LEO SATELLITE MESH CONNECTIVITY 99.98%</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#A5A5A4]">MONITORING: <strong className="text-white">1,248 SHIPMENTS</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-[#A5A5A4]">DEMO CONSIGNMENT: <strong className="text-[#F2AE32]">#CC-1048</strong></span>
        </div>
      </div>

      {/* Main split: Left editorial copy, Right operational live map */}
      <div className="mx-auto max-w-[1600px] w-full px-4 sm:px-8 py-8 lg:py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Editorial & Brand Positioning */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#F2AE32]">
            <span className="h-1 w-6 bg-[#F2AE32]" />
            <span>COLD-CHAIN INTELLIGENCE PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-medium tracking-tight text-white leading-[1.08]">
            The intelligence layer for the world’s cold chain.
          </h1>

          <p className="text-base sm:text-lg text-[#A5A5A4] font-normal leading-relaxed max-w-xl">
            ColdChain 360 monitors temperature, predicts thermal risk, and orchestrates interventions before valuable cargo loses economic value.
          </p>

          {/* Core loop linear tracker */}
          <div className="pt-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 mb-2 tracking-wider">Autonomous Protocol Loop</div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A4]">
              <span className="text-[#292D2F] font-semibold">MONITOR</span>
              <span className="text-slate-600">→</span>
              <span className="text-[#F2AE32] font-semibold">PREDICT</span>
              <span className="text-slate-600">→</span>
              <span className="text-amber-400 font-semibold">PREVENT</span>
              <span className="text-slate-600">→</span>
              <span className="text-rose-400 font-semibold">RESCUE</span>
              <span className="text-slate-600">→</span>
              <span className="text-[#F2AE32] font-semibold">OPTIMIZE</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onExplore}
              className="rounded-md bg-white hover:bg-[#E8E6E2] text-[#292D2F] font-medium text-xs sm:text-sm px-6 py-3.5 transition-all flex items-center gap-2 shadow-lg shadow-white/5 cursor-pointer"
            >
              Explore Operations Platform
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onHowItWorks}
              className="rounded-md border border-subtle bg-[#0a0f14] hover:bg-[#111820] text-[#292D2F] text-xs sm:text-sm px-5 py-3.5 transition-colors cursor-pointer"
            >
              See How It Works
            </button>
          </div>

          {/* Manual phase inspection buttons */}
          <div className="pt-4 border-t border-subtle">
            <div className="text-[10px] font-mono uppercase text-slate-500 mb-2">Inspect Live Lifecycle Simulation:</div>
            <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
              {(['01 NORMAL', '02 EXCURSION', '03 AI RESCUE', '04 PROTECTED'] as const).map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setPhase(idx as 0 | 1 | 2 | 3)}
                  className={`py-1.5 px-1 text-center rounded border transition-all ${
                    phase === idx 
                      ? 'border-[#F2AE32] bg-[#06383D]/20 text-[#F2AE32] font-semibold' 
                      : 'border-subtle bg-[#080d14] text-[#A5A5A4] hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Regional Cold-Chain Network Map */}
        <div className="lg:col-span-7 relative">
          
          <div className="rounded-lg border border-subtle bg-[#070b10] p-4 sm:p-6 shadow-2xl relative overflow-hidden min-h-[520px] flex flex-col justify-between">
            
            {/* Top Map Operational Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-3 relative z-20">
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded bg-[#06383D] border border-subtle text-[#F2AE32]">
                  <Compass className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs font-mono font-medium text-[#292D2F]">
                    MAHARASHTRA AGRO-EXPORT LOGISTICS CORRIDOR (NH-66)
                  </div>
                  <div className="text-[10px] font-mono text-[#A5A5A4]">
                    Ratnagiri Orchards → Panvel Multi-Modal Hub → Mumbai Chhatrapati Shivaji Airport (BOM)
                  </div>
                </div>
              </div>

              <div className={`px-2.5 py-1 rounded text-[10px] font-mono font-semibold border ${current.statusColor}`}>
                {current.badge}
              </div>
            </div>

            {/* Central Geographic Route Graphic (SVG Map with animated nodes & route lines) */}
            <div className="relative w-full h-[360px] my-4 select-none">
              
              <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background topographic faint grid lines */}
                <path d="M 50 100 Q 200 80 400 120 T 750 100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 50 200 Q 250 180 500 220 T 750 190" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 50 300 Q 200 320 450 280 T 750 310" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Coastline faint contour */}
                <path d="M 120 380 Q 150 250 220 180 T 360 80 T 480 20" stroke="rgba(0, 210, 255, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* ORIGINAL HIGHWAY ROUTE: Ratnagiri -> Khed -> Chiplun -> Mahad -> Panvel -> Mumbai BOM */}
                <path 
                  d="M 140 340 L 260 260 L 360 210 L 480 160 L 620 100 L 720 70" 
                  stroke="rgba(255, 255, 255, 0.15)" 
                  strokeWidth="2" 
                />

                {/* RESCUE DIVERT ROUTE TO MAHAD: From near Chiplun into Mahad Hub */}
                <path 
                  d="M 360 210 Q 420 180 460 195" 
                  stroke={phase >= 2 ? '#F2AE32' : 'rgba(255, 255, 255, 0.08)'} 
                  strokeWidth={phase >= 2 ? "3" : "1"} 
                  strokeDasharray={phase >= 2 ? "none" : "3 3"} 
                />

                {/* NODE 1: Ratnagiri Farm Depot */}
                <g transform="translate(140, 340)">
                  <circle r="6" fill="#10b981" />
                  <circle r="12" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1" />
                  <text x="-40" y="20" fill="#94a3b8" fontSize="10" fontFamily="monospace">Ratnagiri Farm</text>
                </g>

                {/* NODE 2: Khed Transit Point */}
                <g transform="translate(260, 260)">
                  <circle r="5" fill="#38bdf8" />
                  <text x="-25" y="18" fill="#64748b" fontSize="9" fontFamily="monospace">Khed</text>
                </g>

                {/* NODE 3: Poladpur / Anomaly Zone */}
                <g transform="translate(360, 210)">
                  <circle r={phase === 1 ? "9" : "5"} fill={phase === 1 ? "#ef4444" : "#94a3b8"} />
                  {phase === 1 && (
                    <circle r="18" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                  )}
                  <text x="-35" y="-12" fill={phase === 1 ? "#f87171" : "#64748b"} fontSize="10" fontFamily="monospace" fontWeight="bold">
                    {phase === 1 ? "EXCURSION ZONE" : "Poladpur Pass"}
                  </text>
                </g>

                {/* NODE 4: Mahad Agro Cold Hub (Divert Target) */}
                <g transform="translate(460, 195)">
                  <rect x="-8" y="-8" width="16" height="16" fill={phase >= 2 ? "#F2AE32" : "#1e293b"} stroke={phase >= 2 ? "#ffffff" : "#475569"} strokeWidth="1.5" rx="2" />
                  {phase >= 2 && (
                    <circle r="22" stroke="#F2AE32" strokeWidth="1" opacity="0.4" className="animate-pulse" />
                  )}
                  <text x="14" y="4" fill={phase >= 2 ? "#F2AE32" : "#64748b"} fontSize="10" fontFamily="monospace" fontWeight="bold">
                    Mahad Cold Hub (Rescue Target)
                  </text>
                </g>

                {/* NODE 5: Panvel Intermodal Rail Hub */}
                <g transform="translate(620, 100)">
                  <circle r="5" fill="#64748b" />
                  <text x="-20" y="18" fill="#64748b" fontSize="9" fontFamily="monospace">Panvel Multi-Modal</text>
                </g>

                {/* NODE 6: Mumbai Airport Air Cargo (BOM) */}
                <g transform="translate(720, 70)">
                  <circle r="7" fill={phase === 3 ? "#64748b" : "#3b82f6"} />
                  <circle r="14" stroke="#3b82f6" strokeOpacity="0.2" strokeWidth="1" />
                  <text x="-65" y="-12" fill="#94a3b8" fontSize="10" fontFamily="monospace">Mumbai Air Cargo (BOM)</text>
                </g>

                {/* ACTIVE CARGO TRUCK / PAYLOAD MARKER */}
                <g transform={
                  phase === 0 ? "translate(210, 295)" :
                  phase === 1 ? "translate(360, 210)" :
                  phase === 2 ? "translate(415, 202)" :
                  "translate(460, 195)"
                }>
                  <circle r="10" fill="#05070a" stroke={phase === 1 ? "#ef4444" : phase >= 2 ? "#F2AE32" : "#10b981"} strokeWidth="2" />
                  <circle r="4" fill={phase === 1 ? "#ef4444" : phase >= 2 ? "#F2AE32" : "#10b981"} />
                </g>
              </svg>

              {/* Floating Live Telemetry Hud Box */}
              <div className="absolute top-2 left-2 bg-[#05070a]/90 border border-subtle p-3 rounded text-[11px] font-mono space-y-1.5 shadow-xl max-w-[260px] backdrop-blur">
                <div className="flex justify-between items-center text-[#A5A5A4] border-b border-subtle pb-1">
                  <span>TELEMETRY FEED</span>
                  <span className="text-[#F2AE32]">S-8849 BLE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Core Temp:</span>
                  <span className={current.tempColor}>{current.temp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Remaining Life:</span>
                  <span className="text-white">{current.shelfLife}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5A5A4]">Risk Score:</span>
                  <span className={phase === 1 ? 'text-rose-400 font-bold' : 'text-[#A5A5A4]'}>{current.riskScore}</span>
                </div>
              </div>

            </div>

            {/* Bottom Map Callout Explanation */}
            <div className="hairline-t pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div className="text-[#A5A5A4] flex items-center gap-2">
                <span className="text-[#F2AE32] font-bold">STATE REASONING:</span>
                <span>{current.callout}</span>
              </div>
              <div className="text-slate-500 text-[11px] shrink-0">
                Next cycle in 4.5s
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Hero Flow: Sensor -> AI -> Prediction -> Intervention -> Survival */}
      <div className="hairline-t bg-[#070b10] py-4 px-4 sm:px-8 relative z-10">
        <div className="mx-auto max-w-[1600px] grid grid-cols-2 md:grid-cols-6 gap-3 font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 01</span>
            <span className="text-[#A5A5A4] font-medium">SENSOR DATA</span>
            <span className="text-[11px] text-slate-500">Core flesh temp, BLE mesh</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 02</span>
            <span className="text-[#F2AE32] font-medium">AI INTERPRETATION</span>
            <span className="text-[11px] text-slate-500">CAN-bus cross validation</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 03</span>
            <span className="text-rose-400 font-medium">RISK PREDICTION</span>
            <span className="text-[11px] text-slate-500">Arrhenius biochemical curve</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 04</span>
            <span className="text-amber-400 font-medium">DECISION</span>
            <span className="text-[11px] text-slate-500">Evaluate 5 rescue corridors</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 05</span>
            <span className="text-[#F2AE32] font-medium">INTERVENTION</span>
            <span className="text-[11px] text-slate-500">Divert to Mahad Hub Bay 4</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500">STEP 06</span>
            <span className="text-[#F2AE32] font-medium">CARGO SURVIVAL</span>
            <span className="text-[11px] text-slate-500">₹48,500 protected</span>
          </div>
        </div>
      </div>

    </section>
  );
};
