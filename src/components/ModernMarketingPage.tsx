import React, { useState } from 'react';
import { HeroMapSection } from './HeroMapSection';
import { ProblemTimelineSection } from './ProblemTimelineSection';
import { IntelligenceSplitSection } from './IntelligenceSplitSection';
import { DynamicShelfLifeSection } from './DynamicShelfLifeSection';
import { RescueDecisionSection } from './RescueDecisionSection';
import { MultimodalJourneySection } from './MultimodalJourneySection';
import { SensorTruthSection } from './SensorTruthSection';
import { WarehouseIntelligenceSection } from './WarehouseIntelligenceSection';
import { IndustryIntelligenceSection } from './IndustryIntelligenceSection';
import { PlatformArchitectureSection } from './PlatformArchitectureSection';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileCheck2, 
  RotateCw,
  Globe,
  ChevronRight
} from 'lucide-react';

interface ModernMarketingPageProps {
  onLaunchTower: () => void;
  onLaunchFarmerPortal: () => void;
  onLaunchAdmin: () => void;
}

export const ModernMarketingPage: React.FC<ModernMarketingPageProps> = ({
  onLaunchTower,
  onLaunchFarmerPortal,
  onLaunchAdmin,
}) => {
  return (
    <div className="bg-[#06383D] text-[#F0EEEA] flex flex-col font-sans selection:bg-[#F2AE32]/20 selection:text-[#F2AE32]">
      
      {/* 1. HERO WITH REGIONAL COLD-CHAIN NETWORK MAP */}
      <HeroMapSection
        onExplore={onLaunchTower}
        onHowItWorks={() => {
          const el = document.getElementById('problem-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. THE COLD-CHAIN PROBLEM (EDITORIAL TIMELINE) */}
      <div id="problem-section">
        <ProblemTimelineSection />
      </div>

      {/* 3. PREDICTIVE RISK ENGINE & FUTURE FAILURE RADAR (SPLIT SCREEN) */}
      <IntelligenceSplitSection />

      {/* 4. DYNAMIC SHELF-LIFE DYNAMICS (ARRHENIUS LIFE BAR) */}
      <DynamicShelfLifeSection />

      {/* 5. AI RESCUE ENGINE (OPERATIONAL DECISION MATRIX) */}
      <RescueDecisionSection />

      {/* 6. CONTINUOUS MULTIMODAL CUSTODY JOURNEY */}
      <MultimodalJourneySection />

      {/* 7. SENSOR TRUTH ENGINE (TELEMETRY REASONING) */}
      <SensorTruthSection />

      {/* 8. WAREHOUSE INTELLIGENCE & TOP-DOWN BLUEPRINT */}
      <WarehouseIntelligenceSection />

      {/* 9. INDUSTRY INTELLIGENCE (VERTICAL SPECIFIC MODELS) */}
      <IndustryIntelligenceSection />

      {/* 10. PLATFORM ARCHITECTURE (SYSTEMS TOPOLOGY) */}
      <PlatformArchitectureSection />

      {/* 11. SECURITY, RELIABILITY & ESG IMPACT */}
      <section className="py-24 border-b border-[#D0CEC9] bg-[#06383D]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-[#16803C]">
                AUDIT INTEGRITY & CLIMATE IMPACT
              </div>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
                Enterprise trust backed by cryptographic proof.
              </h2>
              <p className="text-base text-[#A5A5A4] leading-relaxed font-normal">
                Every sensor telemetry point is sealed with elliptic-curve digital signatures at the hardware micro-controller level, providing tamper-evident audit trails for global regulators and insurance underwriters.
              </p>

              <div className="space-y-3 pt-3 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded bg-[#06383D] border border-[#D0CEC9] text-[#A5A5A4]">
                  <CheckCircle2 className="h-4 w-4 text-[#16803C] shrink-0" />
                  <span>FDA 21 CFR Part 11 & EU GDP Good Distribution Practice Certified</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded bg-[#06383D] border border-[#D0CEC9] text-[#A5A5A4]">
                  <CheckCircle2 className="h-4 w-4 text-[#F2AE32] shrink-0" />
                  <span>Eliminated 14,200 metric tons of embedded agricultural waste emissions</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded bg-[#06383D] border border-[#D0CEC9] text-[#A5A5A4]">
                  <CheckCircle2 className="h-4 w-4 text-[#F2AE32] shrink-0" />
                  <span>Human-in-the-loop signoff protocol for all autonomous vehicle re-routes</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 border border-[#D0CEC9] bg-[#06383D] rounded-lg p-6 sm:p-8 space-y-4 font-mono text-xs">
              <div className="text-[10px] text-[#A5A5A4] uppercase border-b border-[#D0CEC9] pb-2">
                VERIFIABLE OPERATIONAL OUTCOMES (DEMO BENCHMARKS)
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-2xl font-bold text-white block">94 mins</span>
                  <span className="text-[#A5A5A4] text-[11px] mt-1 block">Lead-Time Advantage</span>
                  <span className="text-[10px] text-[#A5A5A4]">Over legacy static alarms</span>
                </div>

                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-2xl font-bold text-[#16803C] block">93%</span>
                  <span className="text-[#A5A5A4] text-[11px] mt-1 block">Consignment Salvage Rate</span>
                  <span className="text-[10px] text-[#A5A5A4]">During in-transit compressor failures</span>
                </div>

                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-2xl font-bold text-[#F2AE32] block">&lt;450ms</span>
                  <span className="text-[#A5A5A4] text-[11px] mt-1 block">Decision Latency</span>
                  <span className="text-[10px] text-[#A5A5A4]">Multi-objective Pareto evaluation</span>
                </div>

                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-2xl font-bold text-[#A5A5A4] block">100%</span>
                  <span className="text-[#A5A5A4] text-[11px] mt-1 block">Audit Reproducibility</span>
                  <span className="text-[10px] text-[#A5A5A4]">Immutable SHA-256 telemetry chains</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. FINAL CALL TO ACTION */}
      <section className="py-24 bg-[#06383D] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            ENTERPRISE DEPLOYMENT READY
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Deploy intelligence to your temperature-sensitive cargo.
          </h2>
          <p className="text-[#A5A5A4] text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Connect your existing Carrier, Thermo King, and telematics hardware in minutes. Experience real-time biothermal prediction and automated cold rescue.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onLaunchTower}
              className="rounded-md bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#292D2F] font-medium text-xs sm:text-sm px-6 py-3.5 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F2AE32]/10"
            >
              Launch Operations Control Tower
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onLaunchFarmerPortal}
              className="rounded-md border border-[#D0CEC9] bg-[#06383D] hover:bg-[#E8E6E2] hover:text-[#292D2F] text-white text-xs sm:text-sm px-5 py-3.5 transition-colors cursor-pointer"
            >
              Producer / Farmer Portal
            </button>
          </div>
        </div>
      </section>

      {/* 13. ENTERPRISE FOOTER */}
      <footer className="hairline-t bg-[#06383D] py-14 text-xs font-mono text-[#A5A5A4]">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-[#D0CEC9]">
            
            <div className="col-span-2 space-y-3 font-sans">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-[#F2AE32] flex items-center justify-center font-bold text-[#292D2F] text-xs font-mono">C3</div>
                <span className="text-base font-semibold text-white tracking-tight">ColdChain<span className="text-[#F2AE32]">360</span></span>
              </div>
              <p className="text-[#A5A5A4] text-xs max-w-sm leading-relaxed font-normal">
                Intelligent cold-chain infrastructure for a moving world. Autonomous AI monitoring, dynamic shelf-life calculation, and intermodal rescue dispatch.
              </p>
              <div className="text-[11px] font-mono text-[#A5A5A4] pt-1">
                DEMO ENVIRONMENT · PRODUCTION-GRADE LOGISTICS ARCHITECTURE
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-white font-medium text-[11px] uppercase">OPERATIONAL MODULES</div>
              <ul className="space-y-1.5 text-[#A5A5A4]">
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Control Tower</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Rescue Engine</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Dynamic Shelf Life</button></li>
                <li><button onClick={onLaunchTower} className="hover:text-[#F2AE32]">Sensor Truth Engine</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-medium text-[11px] uppercase">COMMODITY PROTOCOLS</div>
              <ul className="space-y-1.5 text-[#A5A5A4]">
                <li><button onClick={onLaunchFarmerPortal} className="hover:text-[#F2AE32]">Horticulture Produce</button></li>
                <li><a href="#" className="hover:text-[#F2AE32]">mRNA Biologics</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Artisanal Dairy</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Sashimi Marine</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-medium text-[11px] uppercase">ENTERPRISE COMPLIANCE</div>
              <ul className="space-y-1.5 text-[#A5A5A4]">
                <li><button onClick={onLaunchAdmin} className="hover:text-[#F2AE32]">Admin Console</button></li>
                <li><a href="#" className="hover:text-[#F2AE32]">FDA 21 CFR Part 11</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">EU GDP Standards</a></li>
                <li><a href="#" className="hover:text-[#F2AE32]">Cryptographic Logs</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A5A5A4] text-[11px]">
            <div>© 2026 ColdChain 360 Inc. All rights reserved. Precision Cold Intelligence.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#A5A5A4]">Privacy Policy</a>
              <a href="#" className="hover:text-[#A5A5A4]">Terms of Telemetry Service</a>
              <a href="#" className="hover:text-[#A5A5A4]">Security Architecture</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
