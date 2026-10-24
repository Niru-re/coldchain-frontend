import React, { useState } from 'react';
import { 
  Activity, 
  Cpu, 
  Clock, 
  AlertTriangle, 
  TrendingDown, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Zap,
  BarChart2
} from 'lucide-react';

export const IntelligenceSplitSection: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<'+2h' | '+4h' | '+7h' | '+9h'>('+4h');

  const horizonDetails = {
    '+2h': {
      time: '16:30 IST',
      temp: '10.4°C',
      shelfLife: '14.2 Hours remaining',
      biochemicalState: 'Enzymatic respiration surge. Surface softening begins.',
      commercialImpact: 'Loss of London export Grade-A status. 20% value haircut.',
      recommendedAction: 'Execute Divert to Mahad Hub Bay 4 immediately.',
      color: 'text-amber-400',
    },
    '+4h': {
      time: '18:30 IST',
      temp: '11.8°C',
      shelfLife: '8.5 Hours remaining',
      biochemicalState: 'Cell wall degradation. Internal condensation and mold risk.',
      commercialImpact: 'Air cargo terminal rejection guaranteed under APEDA standards.',
      recommendedAction: 'Liquidate to domestic wholesale market or lose entire load.',
      color: 'text-rose-400',
    },
    '+7h': {
      time: '21:30 IST',
      temp: '13.2°C',
      shelfLife: '2.0 Hours remaining',
      biochemicalState: 'Irreversible fruit rot and alcohol fermentation.',
      commercialImpact: '100% loss ($48,500 total write-off). Insurance claim disputed.',
      recommendedAction: 'Total loss without emergency cryogenic intervention.',
      color: 'text-rose-500 font-bold',
    },
    '+9h': {
      time: '23:30 IST',
      temp: '14.5°C',
      shelfLife: '0.0 Hours (Terminal Spoilage)',
      biochemicalState: 'Cargo completely unsalvageable. Bio-waste disposal required.',
      commercialImpact: 'Disposal logistics costs + carrier penalty fees.',
      recommendedAction: 'Consignment declared complete loss.',
      color: 'text-rose-600 font-bold',
    },
  };

  const curr = horizonDetails[selectedHorizon];

  return (
    <section className="py-24 border-b border-subtle bg-[#070b10] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            PREDICTIVE RISK ENGINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Intelligence that sees the problem before you do.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            Instead of telling you what happened in the past, ColdChain 360 continuously runs biothermal simulations to model future cargo states across a multi-hour horizon.
          </p>
        </div>

        {/* Large Split Screen Operational Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-subtle bg-[#05070a] rounded-lg overflow-hidden">
          
          {/* LEFT PANEL: Live Shipment Telemetry (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 hairline-r space-y-6">
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500">LIVE TELEMETRY STREAM</span>
                <h3 className="text-base font-medium text-white">Consignment #CC-1048 Telematics</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#F2AE32] bg-[#06383D]/20 px-2.5 py-1 rounded border border-[#06383D]/30">
                <Activity className="h-3.5 w-3.5" />
                CAN-BUS SYNCED
              </div>
            </div>

            {/* Dense Telemetry Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">CURRENT TEMP</span>
                <span className="text-rose-400 font-bold text-base">+9.8°C</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Safe ceiling: 7.0°C</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">SAFE LIMIT</span>
                <span className="text-[#292D2F] font-bold text-base">4.0°C – 7.0°C</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Produce Envelope</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">EXPOSURE TIME</span>
                <span className="text-amber-400 font-bold text-base">01h 42m</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Continuous breach</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">TARGET ETA</span>
                <span className="text-[#292D2F] font-bold text-base">19:45 IST</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Mumbai Air Cargo</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">REMAINING LIFE</span>
                <span className="text-amber-400 font-bold text-base">19.5 Hours</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Accelerated decay</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block">RISK LEVEL</span>
                <span className="text-rose-400 font-bold text-base">CRITICAL (84)</span>
                <span className="text-slate-500 text-[10px] block mt-0.5">Rescue required</span>
              </div>
            </div>

            {/* Micro Sensor Status Matrix */}
            <div className="hairline-t pt-4 space-y-2 text-xs font-mono">
              <div className="text-[10px] text-slate-500 uppercase">Hardware Telemetry Verification</div>
              <div className="flex justify-between py-1.5 border-b border-subtle text-[#A5A5A4]">
                <span>Compressor Discharge Pressure:</span>
                <span className="text-amber-400">218 PSI (Under-pressured)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-subtle text-[#A5A5A4]">
                <span>Evaporator Suction Line:</span>
                <span className="text-[#292D2F]">+8.4°C</span>
              </div>
              <div className="flex justify-between py-1.5 text-[#A5A5A4]">
                <span>Door Seal Electronic Sensor:</span>
                <span className="text-[#16803C]">Locked & Tamper-Free</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: AI Prediction Horizon Timeline (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#06383D] space-y-6">
            <div className="flex items-center justify-between border-b border-subtle pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500">FORWARD SIMULATION MODEL</span>
                <h3 className="text-base font-medium text-white">Future Failure Radar</h3>
              </div>
              <div className="text-xs font-mono text-[#A5A5A4]">
                Model: <strong className="text-white">Arrhenius v4.2</strong>
              </div>
            </div>

            {/* Time Horizon Selector Tabs */}
            <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
              {(['+2h', '+4h', '+7h', '+9h'] as const).map(horizon => (
                <button
                  key={horizon}
                  onClick={() => setSelectedHorizon(horizon)}
                  className={`py-2 px-1 text-center rounded border transition-all ${
                    selectedHorizon === horizon
                      ? 'border-[#F2AE32] bg-[#06383D]/20 text-[#F2AE32] font-bold'
                      : 'border-subtle bg-[#080d14] text-[#A5A5A4] hover:text-white'
                  }`}
                >
                  {horizon}
                </button>
              ))}
            </div>

            {/* Dynamic Forecast for Selected Horizon */}
            <div className="p-5 rounded bg-[#080d16] border border-subtle space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-subtle pb-3">
                <span className="text-[#A5A5A4]">PROJECTED TIMESTAMP:</span>
                <span className="text-white font-bold">{curr.time}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#A5A5A4]">Predicted Cargo Temp:</span>
                <span className={curr.color}>{curr.temp}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#A5A5A4]">Usable Shelf Life:</span>
                <span className="text-white">{curr.shelfLife}</span>
              </div>

              <div className="hairline-t pt-3 space-y-1">
                <span className="text-[#A5A5A4] block text-[10px]">BIOCHEMICAL RESIDUAL STATE:</span>
                <p className="text-[#292D2F] font-sans text-xs">{curr.biochemicalState}</p>
              </div>

              <div className="hairline-t pt-3 space-y-1">
                <span className="text-[#A5A5A4] block text-[10px]">COMMERCIAL IMPACT:</span>
                <p className="text-rose-400 font-sans text-xs">{curr.commercialImpact}</p>
              </div>
            </div>

            {/* Recommended Protocol Action */}
            <div className="p-3.5 rounded bg-[#06383D]/20 border border-[#F2AE32]/30 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[10px] text-[#F2AE32] block uppercase">RECOMMENDED PROTOCOL</span>
                <span className="text-[#292D2F] font-semibold">{curr.recommendedAction}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#F2AE32] shrink-0" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
