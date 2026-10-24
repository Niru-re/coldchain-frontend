import React from 'react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { LogisticsHero } from '../components/cinematic/LogisticsHero';
import { ScrollNetworkTransition } from '../components/cinematic/ScrollNetworkTransition';
import { ScrollDrivenVideoSection } from '../components/cinematic/ScrollDrivenVideoSection';
import { LiveNetworkMapSection } from '../components/cinematic/LiveNetworkMapSection';
import { WarehouseLoadingSection } from '../components/cinematic/WarehouseLoadingSection';
import { DataVisibilitySection } from '../components/cinematic/DataVisibilitySection';
import { IntelligentRoutingSection } from '../components/cinematic/IntelligentRoutingSection';
import { ShipmentJourneySection } from '../components/cinematic/ShipmentJourneySection';
import { AlertIntelligenceSection } from '../components/cinematic/AlertIntelligenceSection';
import { FleetNightTransitSection } from '../components/cinematic/FleetNightTransitSection';
import { FTLIntelligenceBento } from '../components/cinematic/FTLIntelligenceBento';
import { LogisticsAnalyticsPreview } from '../components/cinematic/LogisticsAnalyticsPreview';
import { ControlTowerGateway } from '../components/cinematic/ControlTowerGateway';
import { Link } from 'react-router-dom';
import { Truck, ArrowUpRight, ShieldCheck, Radio } from 'lucide-react';

interface LandingPageProps {
  onOpenCommandPalette: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenCommandPalette }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] text-[#292D2F] flex flex-col font-sans selection:bg-[#F2AE32]/20 selection:text-[#F2AE32]">
      
      {/* Top Navbar */}
      <LandingNavbar onOpenCommandPalette={onOpenCommandPalette} />

      {/* SECTION 01 — MOTION SITES LOGISTICS FREIGHT HERO */}
      <LogisticsHero />

      {/* SECTION 02 — SCROLL TRANSITION */}
      <div id="network-transition">
        <ScrollNetworkTransition />
      </div>

      {/* DEDICATED SCROLL-DRIVEN STICKY VIDEO SECTION (Video 4: Aerial Corridor Flow) */}
      <ScrollDrivenVideoSection />

      {/* SECTION 03 — LIVE LOGISTICS NETWORK */}
      <div id="network">
        <LiveNetworkMapSection />
      </div>

      {/* SECTION 03.5 — COLDCHAIN 360 INTELLIGENCE 6-PILLAR BENTO GRID */}
      <div id="intelligence">
        <FTLIntelligenceBento />
      </div>

      {/* SECTION 04 — WAREHOUSE OPERATIONS & DOCK LOADING (Video 6: Forklift Truck Loading) */}
      <div id="warehouse">
        <WarehouseLoadingSection />
      </div>

      {/* SECTION 05 — DATA BECOMES VISIBLE */}
      <DataVisibilitySection />

      {/* SECTION 06 — INTELLIGENT ROUTING */}
      <div id="routing">
        <IntelligentRoutingSection />
      </div>

      {/* SECTION 07 — SHIPMENT JOURNEY & CUSTODY (Video 3: Cargo Handling) */}
      <div id="journey">
        <ShipmentJourneySection />
      </div>

      {/* SECTION 08 — ALERT INTELLIGENCE */}
      <div id="alerts">
        <AlertIntelligenceSection />
      </div>

      {/* SECTION 09 — 24/7 NIGHT TRANSIT & FLEET (Video 5: Night Highway Freight) */}
      <div id="fleet-transit">
        <FleetNightTransitSection />
      </div>

      {/* SECTION 09.5 — ENTERPRISE PREDICTIVE ANALYTICS PREVIEW */}
      <div id="analytics">
        <LogisticsAnalyticsPreview />
      </div>

      {/* SECTION 10 — VIDEO TRANSITION INTO DASHBOARD (Video 1: Control Room) */}
      <ControlTowerGateway />

      {/* Enterprise Platform Footer — Clean Light Industrial Surface */}
      <footer className="w-full border-t border-[#D0CEC9] bg-[#E8E6E2] py-16 px-6 lg:px-8 font-mono text-xs text-[#A5A5A4]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#06383D] flex items-center justify-center text-white shadow-2xs">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-[#292D2F] text-sm">ColdChain 360</span>
              <span className="text-[#A5A5A4] block text-[10px]">Intelligent Cold Chain Logistics & Control Tower</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] font-semibold">
            <Link to="/dashboard" className="hover:text-[#F2AE32] transition-colors">DASHBOARD</Link>
            <Link to="/tracking" className="hover:text-[#F2AE32] transition-colors">LIVE TRACKING</Link>
            <Link to="/shipments" className="hover:text-[#F2AE32] transition-colors">SHIPMENTS</Link>
            <Link to="/fleet" className="hover:text-[#F2AE32] transition-colors">FLEET & DRIVERS</Link>
            <Link to="/routes" className="hover:text-[#F2AE32] transition-colors">ROUTES</Link>
            <Link to="/warehouse" className="hover:text-[#F2AE32] transition-colors">WAREHOUSE</Link>
            <Link to="/alerts" className="hover:text-[#F2AE32] transition-colors">ALERTS</Link>
            <Link to="/analytics" className="hover:text-[#F2AE32] transition-colors">ANALYTICS</Link>
            <Link to="/ai-intelligence" className="hover:text-[#F2AE32] transition-colors text-[#06383D]">AI INTELLIGENCE (8)</Link>
            <Link to="/customer-tracking" className="hover:text-[#F2AE32] transition-colors">CUSTOMER PORTAL</Link>
            <Link to="/users" className="hover:text-[#F2AE32] transition-colors">USERS</Link>
            <Link to="/support" className="hover:text-[#F2AE32] transition-colors">SUPPORT</Link>
            <Link to="/login" className="hover:text-[#F2AE32] transition-colors">LOGIN</Link>
          </div>

          <div className="text-[#A5A5A4] text-[10px]">
            © 2026 ColdChain 360 TECHNOLOGIES PVT. LTD. · ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>

    </div>
  );
};
