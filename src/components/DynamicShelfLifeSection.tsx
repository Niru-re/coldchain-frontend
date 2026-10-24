import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Layers,
  Thermometer,
  Shield
} from 'lucide-react';

export const DynamicShelfLifeSection: React.FC = () => {
  const [ambientStress, setAmbientStress] = useState<number>(38); // Exterior heat in Celsius
  const [thermalRise, setThermalRise] = useState<number>(2.8); // Cargo excursion above max
  const [transitDelay, setTransitDelay] = useState<number>(2.5); // Hours delayed in traffic

  // Baseline values
  const harvestBaselineHours = 72;
  const originalDestinationEtaHours = 24;

  // Real biochemical Arrhenius formula estimation
  // Higher temp and delay drastically drop usable life
  const decayRateFactor = 1 + (thermalRise * 0.9) + (Math.max(0, ambientStress - 30) * 0.08);
  const consumedLifeEquivalent = (14 * decayRateFactor) + (transitDelay * 3.5);
  const remainingLifeHours = Math.max(0, Number((harvestBaselineHours - consumedLifeEquivalent).toFixed(1)));

  // Risk status
  const isArrivalRisk = remainingLifeHours <= originalDestinationEtaHours;
  const isTerminal = remainingLifeHours <= 6;

  return (
    <section className="py-24 border-b border-subtle bg-[#05070a] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            DYNAMIC SHELF-LIFE DYNAMICS
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Static expiry dates are a dangerous fiction.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            A box of mangoes or biologics doesn't expire on a pre-printed calendar date. Its true biological clock accelerates or decelerates with every degree and every hour of transit.
          </p>
        </div>

        {/* Large Interactive Visualization Banner */}
        <div className="border border-subtle bg-[#080d14] rounded-lg p-6 sm:p-10 space-y-8">
          
          {/* Header comparison title */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
            <div className="font-mono text-xs text-[#A5A5A4]">
              BIOCHEMICAL KINETICS: STATIC PACKAGING DATE vs. DYNAMIC USABLE LIFE
            </div>
            <div className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
              isTerminal 
                ? 'text-rose-400 bg-rose-950/60 border-rose-800' 
                : isArrivalRisk 
                ? 'text-[#F2AE32] bg-[#F2AE32]/10 border-[#F2AE32]/30' 
                : 'text-[#16803C] bg-[#06383D]/20 border-[#16803C]/30'
            }`}>
              {isTerminal ? 'TERMINAL QUALITY COLLAPSE' : isArrivalRisk ? 'ARRIVAL EXHAUSTION RISK' : 'NOMINAL BUFFER'}
            </div>
          </div>

          {/* Large Horizontal Life Bar Comparison */}
          <div className="space-y-6">
            
            {/* BAR 1: Static Expiry Bar (Deceptive) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#A5A5A4]">TRADITIONAL STATIC PACKAGING EXPIRY (Assumes constant +4°C)</span>
                <span className="text-[#292D2F]">72.0 Hours Remaining</span>
              </div>
              <div className="w-full bg-[#06383D] h-6 rounded flex items-center px-2 relative border border-subtle">
                <div className="h-4 bg-[#A5A5A4] rounded w-full" />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-[#292D2F] font-semibold tracking-wider">
                  STATIC DATE SAYS: "FRESH FOR 3 DAYS" (BLIND TO REALITY)
                </span>
              </div>
            </div>

            {/* BAR 2: ColdChain 360 Dynamic Life Bar (Realistic) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#F2AE32] font-bold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  ColdChain 360 DYNAMIC USABLE LIFE
                </span>
                <span className={`font-bold text-sm ${isArrivalRisk ? 'text-rose-400' : 'text-[#16803C]'}`}>
                  {remainingLifeHours} Hours Remaining
                </span>
              </div>
              
              <div className="w-full bg-[#06383D] h-8 rounded flex items-center px-1 relative border border-subtle overflow-hidden">
                {/* Active remaining life width */}
                <div 
                  className={`h-6 rounded transition-all duration-300 ${
                    isTerminal 
                      ? 'bg-gradient-to-r from-rose-900 to-rose-600' 
                      : isArrivalRisk 
                      ? 'bg-gradient-to-r from-amber-800 via-rose-700 to-amber-500' 
                      : 'bg-gradient-to-r from-[#06383D] to-[#F2AE32]'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, (remainingLifeHours / harvestBaselineHours) * 100))}%` }}
                />

                {/* Target ETA threshold indicator on bar */}
                <div 
                  className="absolute top-0 bottom-0 border-r-2 border-white z-10 flex flex-col justify-end"
                  style={{ left: `${(originalDestinationEtaHours / harvestBaselineHours) * 100}%` }}
                >
                  <span className="bg-[#06383D] text-white font-mono text-[9px] px-1 py-0.5 border border-[#D0CEC9] -ml-12 mb-0.5 whitespace-nowrap">
                    Destination Arrival (24h)
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Harvest: 0h</span>
                <span>Destination ETA: 24h</span>
                <span>Original Nominal Life: 72h</span>
              </div>
            </div>

          </div>

          {/* Interactive Simulation Sliders */}
          <div className="hairline-t pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Slider 1 */}
            <div className="space-y-2 bg-[#05070a] p-4 rounded border border-subtle">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A5A5A4]">Exterior Ambient Heat</span>
                <span className="text-rose-400 font-bold">{ambientStress}°C</span>
              </div>
              <input
                type="range"
                min={25}
                max={48}
                step={1}
                value={ambientStress}
                onChange={e => setAmbientStress(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-1.5 bg-[#E8E6E2] rounded"
              />
              <span className="text-[10px] font-mono text-slate-500 block">Asphalt heat radiation accelerates thermal leak</span>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2 bg-[#05070a] p-4 rounded border border-subtle">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A5A5A4]">Reefer Core Temp Excursion</span>
                <span className="text-[#F2AE32] font-bold">+{thermalRise}°C above max</span>
              </div>
              <input
                type="range"
                min={0}
                max={6}
                step={0.2}
                value={thermalRise}
                onChange={e => setThermalRise(Number(e.target.value))}
                className="w-full accent-[#F2AE32] cursor-pointer h-1.5 bg-[#E8E6E2] rounded"
              />
              <span className="text-[10px] font-mono text-slate-500 block">Measured by BLE flesh core probes</span>
            </div>

            {/* Slider 3 */}
            <div className="space-y-2 bg-[#05070a] p-4 rounded border border-subtle">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#A5A5A4]">Highway Transit Delay</span>
                <span className="text-[#F2AE32] font-bold">+{transitDelay} Hours</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={0.5}
                value={transitDelay}
                onChange={e => setTransitDelay(Number(e.target.value))}
                className="w-full accent-[#F2AE32] cursor-pointer h-1.5 bg-[#E8E6E2] rounded"
              />
              <span className="text-[10px] font-mono text-slate-500 block">Traffic congestion / customs clearance hold</span>
            </div>

          </div>

          {/* Operational takeaway */}
          <div className="p-4 rounded bg-[#05070a] border border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-[#A5A5A4]">
              <strong className="text-[#F2AE32]">SYSTEM VERDICT: </strong>
              {isArrivalRisk 
                ? `Usable shelf life (${remainingLifeHours}h) is LESS than time required to reach destination airport (24h). Immediate rerouting mandatory.` 
                : `Adequate biological buffer (${remainingLifeHours}h remaining vs 24h arrival). Consignment safe to proceed.`}
            </div>
            <div className="text-[#A5A5A4] text-[11px] shrink-0">
              Arrhenius Decay Rate: <span className="text-white font-bold">{decayRateFactor.toFixed(2)}x</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
