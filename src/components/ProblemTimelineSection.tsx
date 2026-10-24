import React, { useState } from 'react';
import { 
  motion 
} from 'framer-motion';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Eye, 
  TrendingUp, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const ProblemTimelineSection: React.FC = () => {
  const [inspectedHour, setInspectedHour] = useState<number>(3); // Default at 14:00

  const timelineData = [
    {
      time: '08:00',
      temp: 4.8,
      status: 'Nominal',
      operatorStatus: 'Unnoticed (Normal check)',
      aiStatus: 'Normal Baseline',
      decayRate: '1.0x (Standard)',
      note: 'Departed Ratnagiri facility. Reefer operating nominally.',
    },
    {
      time: '10:00',
      temp: 5.1,
      status: 'Nominal',
      operatorStatus: 'Unnoticed',
      aiStatus: 'Micro-fluctuation within noise threshold',
      decayRate: '1.1x',
      note: 'Asphalt ambient heat rising to 32°C. Reefer duty cycle increases.',
    },
    {
      time: '12:00',
      temp: 6.2,
      status: 'Approaching limit',
      operatorStatus: 'Unnoticed (Within 7°C threshold)',
      aiStatus: 'Early Warning: Evaporator cooling rate degraded 18%',
      decayRate: '1.5x',
      note: 'Driver stops for scheduled fuel check. Door seal remains tight.',
    },
    {
      time: '13:18',
      temp: 7.2,
      status: 'Envelope breached',
      operatorStatus: 'Unnoticed (No threshold alarm triggered)',
      aiStatus: 'AI PREDICTS EXCURSION & TERMINAL SPOILAGE RISK (13:18)',
      decayRate: '2.4x Accelerated',
      note: 'ColdChain 360 calculates shelf life will exhaust before airport arrival.',
      highlightAI: true,
    },
    {
      time: '14:00',
      temp: 7.8,
      status: 'Critical Rise',
      operatorStatus: 'Unnoticed',
      aiStatus: 'Rescue Divert Generated (Mahad Bay 4)',
      decayRate: '3.1x Accelerated',
      note: 'Core temperature steadily climbing. Respiration rate peaking.',
    },
    {
      time: '14:52',
      temp: 8.9,
      status: 'Emergency',
      operatorStatus: 'HUMAN OPERATOR FINALLY NOTICES STATIC ALARM (14:52)',
      aiStatus: 'Rescue Plan was available 94 minutes ago',
      decayRate: '3.8x Accelerated',
      note: 'Static threshold buzzer fires. Operator begins dialing dispatch by phone.',
      highlightHuman: true,
    },
    {
      time: '16:00',
      temp: 9.8,
      status: 'Terminal Excursion',
      operatorStatus: 'Too late to reach airport safely',
      aiStatus: 'Diverted to Mahad — Cargo Saved',
      decayRate: 'Saved via pre-cooling',
      note: 'Without AI intervention, consignment would be rejected at bonded customs.',
    },
  ];

  return (
    <section className="py-24 border-b border-subtle bg-[#05070a] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Section Header: Editorial & Non-card */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-rose-400">
            THE ROOT CAUSE OF COLD-CHAIN SPOILAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Cold-chain failure is rarely sudden.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            Most temperature excursions are gradual thermodynamic leaks. Standard static monitors alert you only <em className="text-white font-medium">after</em> the damage is irreversible.
          </p>
        </div>

        {/* Large Editorial Temperature Curve Diagram */}
        <div className="mt-14 border border-subtle bg-[#080d14] rounded-lg p-6 sm:p-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
            <div className="font-mono text-xs text-[#A5A5A4]">
              CONSIGNMENT #CC-1048 · THERMAL ENVELOPE (SAFE: 4.0°C — 7.0°C)
            </div>
            <div className="flex items-center gap-6 font-mono text-xs">
              <span className="flex items-center gap-2 text-[#F2AE32]">
                <span className="h-2 w-2 rounded-full bg-[#F2AE32]" />
                AI Prediction (13:18)
              </span>
              <span className="flex items-center gap-2 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-400" />
                Human Static Notice (14:52)
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                Delta: <strong>94 Minutes Lag</strong>
              </span>
            </div>
          </div>

          {/* Timeline Curve Graph Visual */}
          <div className="py-8 relative">
            
            {/* Safe envelope boundary line (7.0°C max limit) */}
            <div className="relative mb-8">
              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-1">
                <span>MAX SAFE TEMPERATURE CEILING: +7.0°C</span>
                <span>Critical Excursion Line</span>
              </div>
              <div className="w-full h-px border-b border-dashed border-amber-500/60" />
            </div>

            {/* Horizontal Timeline checkpoints */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {timelineData.map((item, idx) => {
                const isSelected = inspectedHour === idx;
                const isExcursion = item.temp > 7.0;
                return (
                  <div
                    key={idx}
                    onClick={() => setInspectedHour(idx)}
                    className={`cursor-pointer p-3.5 rounded border transition-all text-left relative ${
                      isSelected
                        ? 'border-[#F2AE32] bg-[#0d1624]'
                        : isExcursion
                        ? 'border-rose-900/50 bg-[#120a0e] hover:border-rose-700'
                        : 'border-subtle bg-[#06090e] hover:border-[#D0CEC9]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#A5A5A4]">{item.time}</span>
                      <span className={`font-bold ${isExcursion ? 'text-rose-400' : 'text-[#F2AE32]'}`}>
                        +{item.temp}°C
                      </span>
                    </div>

                    {/* Visual Bar Height indicator */}
                    <div className="w-full bg-[#06383D] rounded-full h-1 mt-3 mb-2">
                      <div 
                        className={`h-1 rounded-full ${isExcursion ? 'bg-rose-500' : 'bg-[#F2AE32]'}`}
                        style={{ width: `${Math.min(100, (item.temp / 10) * 100)}%` }}
                      />
                    </div>

                    <div className="text-[11px] text-[#A5A5A4] truncate font-medium">{item.status}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">Decay: {item.decayRate}</div>

                    {item.highlightAI && (
                      <span className="absolute -top-2.5 right-2 bg-[#F2AE32] text-[#292D2F] text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                        AI DETECTED
                      </span>
                    )}

                    {item.highlightHuman && (
                      <span className="absolute -top-2.5 right-2 bg-rose-500 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                        HUMAN SAW
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Split Detail comparison for Selected Hour */}
          <div className="hairline-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase text-[#A5A5A4]">
                INSPECTION AT {timelineData[inspectedHour].time} IST
              </div>
              <h3 className="text-xl font-medium text-white">
                {timelineData[inspectedHour].note}
              </h3>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                Biochemical decay rate: <strong className="text-[#F2AE32] font-mono">{timelineData[inspectedHour].decayRate}</strong>. Every degree above +7.0°C in high ambient heat cuts shelf life by roughly 12 hours per 60 minutes.
              </p>
            </div>

            <div className="p-4 rounded border border-subtle bg-[#05070a] space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-subtle">
                <span className="text-[#A5A5A4]">AI Intelligence Engine:</span>
                <span className="text-[#F2AE32] font-semibold">{timelineData[inspectedHour].aiStatus}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A5A5A4]">Standard Telematics / Operator:</span>
                <span className={inspectedHour >= 5 ? 'text-rose-400 font-semibold' : 'text-[#A5A5A4]'}>
                  {timelineData[inspectedHour].operatorStatus}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                The 94-minute lead time provided by ColdChain 360 enables rerouting to an emergency pre-chilled dock bay before cellular tissue collapses.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
