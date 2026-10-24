import React, { useState } from 'react';
import { 
  motion 
} from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  Building,
  RotateCcw,
  Truck
} from 'lucide-react';

export const RescueDecisionSection: React.FC = () => {
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(1); // Default to Action B (Recommended)
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  const actions = [
    {
      id: 'ACT-A',
      title: 'Action A: Continue Original Highway Route',
      description: 'Proceed along NH-66 toward Mumbai Air Cargo. Hope reefer recovers output before temperature reaches +12°C.',
      eta: '19:45 IST (+2.5h delay)',
      cost: '₹0 (Standard budget)',
      tempRisk: 'Extreme (100% loss guaranteed)',
      shelfLifeRemaining: '0.0h (Expired upon landing at BOM)',
      survivalProb: '4%',
      salvageValue: '₹0 (100% loss)',
      carbon: '+0kg CO2e',
      isRecommended: false,
      rejectionReason: 'Biochemically impossible to maintain quality. Cargo will be incinerated at airport customs.',
    },
    {
      id: 'ACT-B',
      title: 'Action B: Divert to Mahad Agro Cold Hub (Recommended)',
      description: 'Divert vehicle 18km to Mahad Cold Chain Hub. Dock bay 4 is pre-reserved and chilled to +3.8°C. Cross-dock into backup reefer #RF-904.',
      eta: '15:40 IST (Divert Arrival)',
      cost: '₹4,500 ($54 cross-dock fee)',
      tempRisk: 'Low (Restored within 45m)',
      shelfLifeRemaining: '62.5 Hours (Pristine Grade-A)',
      survivalProb: '93%',
      salvageValue: '₹48,500 ($582 value protected)',
      carbon: '-18kg CO2e saved',
      isRecommended: true,
      explanation: 'Optimal trade-off: 18km detour prevents total destruction of export consignment while adding only 45 minutes to transit buffer.',
    },
    {
      id: 'ACT-C',
      title: 'Action C: Switch to On-Demand CryoReefer Rendezvous',
      description: 'Deploy idle CryoReefer from Chiplun depot for mid-highway trailer transfer at Poladpur rest station.',
      eta: '17:15 IST (Transfer complete)',
      cost: '₹14,000 (Emergency dispatch)',
      tempRisk: 'Moderate (Open air transfer)',
      shelfLifeRemaining: '48.0 Hours',
      survivalProb: '76%',
      salvageValue: '₹39,000 (Minor thermal dip)',
      carbon: '+42kg CO2e (Double transit)',
      isRecommended: false,
      rejectionReason: 'Highway trailer transfer risks humidity spike and carries 3.1x higher logistics expense.',
    },
    {
      id: 'ACT-D',
      title: 'Action D: Redirect to Local Pulping & Processing Facility',
      description: 'Send mangoes to Khed juice processing factory for immediate pulping before mold onset.',
      eta: '14:45 IST',
      cost: '-₹18,000 (Salvaged as pulp)',
      tempRisk: 'None (Consumed immediately)',
      shelfLifeRemaining: 'Immediate consumption',
      survivalProb: '100% (As pulp)',
      salvageValue: '₹18,000 (62% markdown loss)',
      carbon: '-45kg CO2e',
      isRecommended: false,
      rejectionReason: 'Destroys export premium. Farmers lose 62% of agreed consignment value.',
    },
    {
      id: 'ACT-E',
      title: 'Action E: Sell-Before-Spoil to Pune Domestic Retailers',
      description: 'Reroute consignment via Tamhini Ghat to Nature Fresh Supermarket Pune fulfillment center.',
      eta: '18:00 IST',
      cost: '₹2,500 toll & transit',
      tempRisk: 'Low-Medium',
      shelfLifeRemaining: '24.0 Hours',
      survivalProb: '84%',
      salvageValue: '₹41,000 (85% spot recovery)',
      carbon: '+12kg CO2e',
      isRecommended: false,
      rejectionReason: 'Solid backup, but Mahad Cold Hub preserves London export contract at 100% value.',
    },
  ];

  const current = actions[selectedActionIndex];

  const handleDispatch = () => {
    setIsDispatched(true);
  };

  return (
    <section className="py-24 border-b border-subtle bg-[#05070a] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            AUTONOMOUS DECISION ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            When the plan breaks, intelligence takes over.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            ColdChain 360 generates and compares multi-objective rescue alternatives across survival probability, remaining shelf life, economic salvage value, and carbon impact.
          </p>
        </div>

        {/* Operational Decision Matrix Interface */}
        <div className="border border-subtle bg-[#080d14] rounded-lg p-6 sm:p-8 space-y-6">
          
          {/* Top incident summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-rose-400 font-bold uppercase">INCIDENT #ALT-8849:</span>
                <span className="font-mono text-xs text-[#A5A5A4]">Alphonso Export Grade (6.2T) · ₹48,500 Consignment</span>
              </div>
              <p className="text-xs text-[#A5A5A4] mt-0.5">
                Thermal rise: <strong>+9.8°C</strong> (Limit: 4–7°C). AI predicted usable shelf life exhausts 3.5h before airport ETA.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#A5A5A4]">
              <span>ALGORITHM:</span>
              <strong className="text-white">Pareto Optimization v3.1</strong>
            </div>
          </div>

          {/* Action Comparison Strip (All 5 Options) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {actions.map((act, idx) => {
              const isSelected = selectedActionIndex === idx;
              return (
                <button
                  key={act.id}
                  onClick={() => {
                    setSelectedActionIndex(idx);
                    setIsDispatched(false);
                  }}
                  className={`p-3 rounded text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#F2AE32] bg-[#0d1624]'
                      : 'border-subtle bg-[#06090e] hover:border-[#D0CEC9]'
                  }`}
                >
                  {act.isRecommended && (
                    <span className="absolute -top-2 right-2 bg-[#F2AE32] text-[#292D2F] text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                      RECOMMENDED
                    </span>
                  )}
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-mono mb-1">
                      <span className={isSelected ? 'text-[#F2AE32] font-bold' : 'text-[#A5A5A4]'}>{act.id}</span>
                      <span className="text-slate-500">{act.survivalProb} Survival</span>
                    </div>
                    <div className="text-xs font-medium text-[#292D2F] line-clamp-2 leading-snug">
                      {act.title.split(':')[1] || act.title}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-subtle flex justify-between items-center text-[10px] font-mono text-[#A5A5A4]">
                    <span>ETA: {act.eta.split(' ')[0]}</span>
                    <span className={act.isRecommended ? 'text-[#16803C] font-bold' : 'text-[#A5A5A4]'}>
                      {act.survivalProb}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep Detailed Inspection of Selected Option */}
          <div className="hairline-t pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Narrative / Rationale (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#A5A5A4]">SELECTED INTERVENTION PLAN:</span>
                <span className={`text-xs font-mono font-bold ${current.isRecommended ? 'text-[#F2AE32]' : 'text-[#A5A5A4]'}`}>
                  {current.title}
                </span>
              </div>

              <p className="text-sm text-[#A5A5A4] leading-relaxed font-normal">
                {current.description}
              </p>

              {/* Explainability Callout */}
              <div className={`p-4 rounded border text-xs font-mono space-y-1.5 ${
                current.isRecommended 
                  ? 'bg-[#06383D]/20 border border-[#F2AE32]/30 text-[#F2AE32]' 
                  : 'bg-[#06383D]/90 border-subtle text-[#A5A5A4]'
              }`}>
                <div className="flex items-center gap-2 font-bold text-slate-100">
                  <Sparkles className="h-4 w-4 text-[#F2AE32]" />
                  <span>AI REASONING RATIONALE:</span>
                </div>
                <p className="text-[#A5A5A4] font-sans text-xs leading-relaxed">
                  {current.explanation || current.rejectionReason}
                </p>
              </div>

              {/* Execution Dispatch Bar */}
              <div className="pt-2 flex items-center gap-4">
                {isDispatched ? (
                  <div className="flex items-center gap-2 text-xs font-mono text-[#16803C] bg-[#06383D]/20 border border-[#16803C]/40 px-4 py-3 rounded">
                    <CheckCircle2 className="h-4 w-4" />
                    AUTONOMOUS PROTOCOL DISPATCHED · RE-ROUTE TRANSMITTED TO VEHICLE TELEMATICS
                  </div>
                ) : (
                  <button
                    onClick={handleDispatch}
                    className="rounded bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#292D2F] font-semibold text-xs font-mono px-5 py-3 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F2AE32]/20"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    APPROVE & EXECUTE INTERVENTION
                  </button>
                )}
              </div>
            </div>

            {/* Right Detailed Tradeoff Matrix (5 cols) */}
            <div className="lg:col-span-5 bg-[#05070a] border border-subtle rounded p-4 space-y-3 font-mono text-xs">
              <div className="text-[10px] uppercase text-slate-500 border-b border-subtle pb-2">
                MULTI-OBJECTIVE IMPACT ANALYSIS
              </div>

              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">Cargo Survival Probability:</span>
                <span className={`font-bold ${current.isRecommended ? 'text-[#16803C]' : 'text-[#A5A5A4]'}`}>
                  {current.survivalProb}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">Protected Economic Value:</span>
                <span className="text-white font-bold">{current.salvageValue}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">Usable Life Remaining:</span>
                <span className="text-[#F2AE32]">{current.shelfLifeRemaining}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">Logistics Cost Delta:</span>
                <span className="text-[#292D2F]">{current.cost}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">Arrival ETA Variance:</span>
                <span className="text-amber-400">{current.eta}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-[#A5A5A4]">Carbon Impact (CO2e):</span>
                <span className="text-[#16803C] font-semibold">{current.carbon}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
