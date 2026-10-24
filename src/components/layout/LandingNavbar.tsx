import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Search, 
  Menu, 
  X, 
  LayoutDashboard, 
  Radio, 
  LogIn 
} from 'lucide-react';

interface LandingNavbarProps {
  onOpenCommandPalette: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenCommandPalette }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F0EEEA]/95 backdrop-blur-md border-b border-[#D0CEC9] shadow-[0_4px_16px_rgba(41,45,47,0.08)]' 
          : 'bg-[#0B0E14]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-colors ${
              scrolled ? 'bg-[#06383D] group-hover:bg-[#F2AE32]' : 'bg-[#F2AE32] text-[#0B0E14] group-hover:bg-white'
            }`}>
              <Truck className={`w-5 h-5 ${scrolled ? 'text-white' : 'text-[#0B0E14]'}`} />
            </div>
            <div>
              <div className={`text-xl font-black tracking-tight font-sans flex items-center gap-2 ${
                scrolled ? 'text-[#292D2F]' : 'text-white'
              }`}>
                ColdChain <span className="text-[#F2AE32]">360</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  scrolled 
                    ? 'bg-[#06383D]/10 border border-[#06383D]/25 text-[#06383D]' 
                    : 'bg-[#F2AE32]/20 border border-[#F2AE32]/40 text-[#F2AE32]'
                }`}>
                  COLD CHAIN
                </span>
              </div>
              <div className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                scrolled ? 'text-[#292D2F]/80' : 'text-white/70'
              }`}>
                Autonomous Cold Chain Logistics
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links - Harmonized with Train Video Palette */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider uppercase">
            <a 
              href="#network" 
              className={`transition-colors ${
                scrolled ? 'text-[#292D2F] hover:text-[#06383D]' : 'text-white/85 hover:text-[#F2AE32]'
              }`}
            >
              NETWORK
            </a>
            <Link 
              to="/ai-intelligence" 
              className={`transition-colors flex items-center gap-1.5 font-bold ${
                scrolled ? 'text-[#06383D] hover:text-[#06383D]/80' : 'text-[#F2AE32] hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-pulse"></span>
              AI INTELLIGENCE
            </Link>
            <Link 
              to="/customer-tracking" 
              className={`transition-colors ${
                scrolled ? 'text-[#292D2F] hover:text-[#06383D]' : 'text-white/85 hover:text-[#F2AE32]'
              }`}
            >
              CUSTOMER PORTAL
            </Link>
            <Link 
              to="/support" 
              className={`transition-colors ${
                scrolled ? 'text-[#292D2F] hover:text-[#06383D]' : 'text-white/85 hover:text-[#F2AE32]'
              }`}
            >
              SUPPORT
            </Link>
            <Link 
              to="/tracking" 
              className={`transition-colors flex items-center gap-1.5 font-bold ${
                scrolled ? 'text-[#06383D] hover:text-[#06383D]/80' : 'text-white hover:text-[#F2AE32]'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 animate-pulse ${scrolled ? 'text-[#06383D]' : 'text-[#F2AE32]'}`} />
              LIVE RADAR
            </Link>
          </nav>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3.5">
          {/* Quick Command Palette Trigger (CTRL+K) */}
          <button
            onClick={onOpenCommandPalette}
            className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shadow-2xs ${
              scrolled
                ? 'bg-white border border-[#D0CEC9] hover:border-[#06383D] text-[#292D2F]'
                : 'bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#F2AE32]/60 text-white/90'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${scrolled ? 'text-[#06383D]' : 'text-[#F2AE32]'}`} />
            <span className="font-semibold">Search fleet...</span>
            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              scrolled ? 'bg-[#F0EEEA] border border-[#D0CEC9] text-[#292D2F]' : 'bg-white/15 border border-white/20 text-[#F2AE32]'
            }`}>
              Ctrl+K
            </kbd>
          </button>

          {/* Sign In / Login Button — Styled for Perfect Contrast in Both States */}
          <Link
            to="/login"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 font-bold text-xs tracking-wider uppercase transition-all shadow-xs cursor-pointer ${
              scrolled
                ? 'border-[#06383D] text-[#06383D] hover:bg-[#06383D] hover:text-white'
                : 'border-[#F2AE32] text-[#F2AE32] hover:bg-[#F2AE32] hover:text-[#0B0E14] shadow-[0_2px_10px_rgba(242,174,50,0.25)]'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>LOGIN</span>
          </Link>

          {/* Launch Control Tower Button — Warm Locomotive Amber Primary CTA */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#0B0E14] font-black text-xs font-sans tracking-wide uppercase transition-all shadow-[0_4px_14px_rgba(242,174,50,0.35)] hover:shadow-[0_6px_20px_rgba(242,174,50,0.5)] cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#0B0E14]" />
            <span>ENTER CONTROL TOWER</span>
          </Link>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? 'text-[#292D2F] hover:bg-[#E8E6E2]' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D0CEC9] bg-white p-6 space-y-3 font-sans text-xs uppercase font-semibold text-[#292D2F]">
          <Link 
            to="/dashboard" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#06383D] font-bold py-2 border-b border-[#E0DED9]"
          >
            CONTROL TOWER DASHBOARD
          </Link>
          <Link 
            to="/ai-intelligence" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-bold py-2 border-b border-[#E0DED9] flex items-center justify-between"
          >
            <span>AI INTELLIGENCE (8 ENGINES)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F2AE32]/20 text-[#292D2F] font-mono">AI</span>
          </Link>
          <Link 
            to="/tracking" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-bold py-2 border-b border-[#E0DED9]"
          >
            LIVE REEFER TRACKING
          </Link>
          <Link 
            to="/shipments" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-semibold py-2 border-b border-[#E0DED9]"
          >
            SHIPMENTS & ORDERS
          </Link>
          <Link 
            to="/warehouse" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-semibold py-2 border-b border-[#E0DED9]"
          >
            WAREHOUSE & INVENTORY
          </Link>
          <Link 
            to="/customer-tracking" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-semibold py-2 border-b border-[#E0DED9]"
          >
            CUSTOMER TRACKING PORTAL
          </Link>
          <Link 
            to="/support" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-[#292D2F] font-semibold py-2 border-b border-[#E0DED9]"
          >
            24/7 SUPPORT & RESCUE
          </Link>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-lg border-2 border-[#06383D] text-[#06383D] font-bold flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>LOGIN TO PORTAL</span>
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center rounded-lg bg-[#F2AE32] text-[#0B0E14] font-black shadow-sm"
            >
              ENTER CONTROL TOWER
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
