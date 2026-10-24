import React, { useState } from 'react';
import { 
  Building2, 
  FlaskConical, 
  Apple, 
  Fish, 
  Milk, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const IndustryIntelligenceSection: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);

  const sectors = [
    {
      id: 'PHARMA',
      name: 'Pharmaceuticals & Biologics',
      icon: FlaskConical,
      tempRange: '-80°C to +8°C (Cryo to Chilled)',
      shelfLifeModel: 'First-order protein denature kinetics',
      compliance: 'WHO GDP, FDA 21 CFR Part 11, EU Guidelines 2013/C 343/01',
      primaryThreat: 'Irreversible denaturation of mRNA strands upon +2°C micro-excursion.',
      rescueAction: 'Automated hospital pharmacy redirect with digital sign-off escrow.',
      economicImpact: 'Batch values often exceed $500,000; zero tolerance for thermal breaches.',
    },
    {
      id: 'PRODUCE',
      name: 'Fresh Horticultural Produce',
      icon: Apple,
      tempRange: '+2.0°C to +7.0°C',
      shelfLifeModel: 'Arrhenius respiration & ethylene release kinetics',
      compliance: 'APEDA Export Certification, GlobalGAP Standards, HACCP',
      primaryThreat: 'Silent respiration spike leading to mold and enzymatic softening.',
      rescueAction: 'Divert to pre-chilled regional cold storage or local wholesale auction.',
      economicImpact: 'Preserves farm cooperative livelihoods and export Grade-A premiums.',
    },
    {
      id: 'DAIRY',
      name: 'Dairy & Cultured Cheeses',
      icon: Milk,
      tempRange: '+1.0°C to +4.5°C',
      shelfLifeModel: 'Lactic acid bacterial proliferation curve',
      compliance: 'ISO 22000, FSSAI Schedule 4, Pasteurized Milk Ordinance',
      primaryThreat: 'Acidification and lipid separation during highway traffic gridlock.',
      rescueAction: 'On-demand reefer fleet rendezvous or rapid processing cross-dock.',
      economicImpact: 'Prevents mass consignment dumping and milk tanker curdling.',
    },
    {
      id: 'SEAFOOD',
      name: 'Seafood & Sashimi Grade Fish',
      icon: Fish,
      tempRange: '-1.5°C to +1.0°C (Super-Chilled)',
      shelfLifeModel: 'Histamine production and muscle autolysis rate',
      compliance: 'FDA Seafood HACCP, EU Hygiene Package 853/2004',
      primaryThreat: 'Melting ice slurries and sub-degree temperature rises causing histamine spikes.',
      rescueAction: 'High-speed airport tarmac prioritization and direct buyer liquidation.',
      economicImpact: 'Maintains $40+/kg sashimi grade pricing in Tokyo and London markets.',
    },
  ];

  const current = sectors[selectedIndustry];
  const IconComponent = current.icon;

  return (
    <section className="py-24 border-b border-subtle bg-[#05070a] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            VERTICAL-SPECIFIC PROTOCOLS
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Tailored biological models for every cold commodity.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            A single generic temperature threshold cannot protect mRNA vaccines, fresh mangoes, and wild sashimi salmon. ColdChain 360 applies commodity-specific biophysical models.
          </p>
        </div>

        {/* Large Vertical Panel Selector */}
        <div className="border border-subtle bg-[#080d14] rounded-lg p-6 sm:p-8 space-y-6">
          
          {/* Industry Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-subtle pb-4">
            {sectors.map((sector, idx) => {
              const TabIcon = sector.icon;
              const isSelected = selectedIndustry === idx;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedIndustry(idx)}
                  className={`p-3 rounded text-left transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#06383D]/20 text-[#F2AE32] border border-[#F2AE32]/30'
                      : 'bg-[#05070a] text-[#A5A5A4] hover:text-white border border-subtle'
                  }`}
                >
                  <TabIcon className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-medium truncate">{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Deep Commodity Inspection Breakdown */}
          <div className="pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#06383D]/20 border border-[#F2AE32]/30 text-[#F2AE32] rounded">
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500">{current.id} PROTOCOL</span>
                  <h3 className="text-xl font-medium text-white">{current.name}</h3>
                </div>
              </div>

              <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-2 font-mono text-xs">
                <span className="text-slate-500 text-[10px] block uppercase">THERMAL SPECIFICATION</span>
                <span className="text-[#F2AE32] font-bold text-base block">{current.tempRange}</span>
                <span className="text-[#A5A5A4] text-[11px] block mt-1">Biophysical Model: {current.shelfLifeModel}</span>
              </div>

              <p className="text-xs text-[#A5A5A4] leading-relaxed font-normal">
                {current.economicImpact}
              </p>
            </div>

            {/* Right Detailed Intelligence Matrix (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-1.5">
                <span className="text-slate-500 text-[10px] block uppercase">PRIMARY BIOLOGICAL THREAT</span>
                <p className="text-rose-400 font-sans text-xs leading-relaxed">{current.primaryThreat}</p>
              </div>

              <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-1.5">
                <span className="text-slate-500 text-[10px] block uppercase">AUTONOMOUS RESCUE PLAYBOOK</span>
                <p className="text-[#292D2F] font-sans text-xs leading-relaxed">{current.rescueAction}</p>
              </div>

              <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-1.5 sm:col-span-2">
                <span className="text-slate-500 text-[10px] block uppercase">REGULATORY & AUDIT COMPLIANCE STANDARDS</span>
                <p className="text-[#F2AE32] font-sans text-xs">{current.compliance}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
