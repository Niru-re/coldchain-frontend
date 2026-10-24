import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Terminal, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentView: 'marketing' | 'operations' | 'farmer' | 'admin';
  setCurrentView: (view: 'marketing' | 'operations' | 'farmer' | 'admin') => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenCommandPalette,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#06383D]/30 bg-[#06383D]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentView('marketing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-[#F2AE32] p-[1px] shadow-lg shadow-[#F2AE32]/20">
              <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#06383D]">
                <div className="h-3 w-3 rounded-full bg-[#F2AE32] group-hover:scale-125 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-lg tracking-tight text-white">ColdChain<span className="text-[#F2AE32]">360</span></span>
                <span className="rounded bg-[#F2AE32]/10 px-1.5 py-0.5 text-[10px] font-mono text-[#F2AE32] border border-[#F2AE32]/30">v2.4 Enterprise</span>
              </div>
              <p className="text-[10px] font-medium tracking-wide text-[#A5A5A4]">Intelligent Cold-Chain Infrastructure</p>
            </div>
          </button>

          {/* Primary View Switcher tabs */}
          <nav className="hidden lg:flex items-center space-x-1 pl-4 border-l border-[#06383D]/30">
            <button
              onClick={() => setCurrentView('marketing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentView === 'marketing'
                  ? 'bg-[#06383D] text-[#F2AE32] shadow-sm border border-[#F2AE32]/30'
                  : 'text-[#A5A5A4] hover:text-white hover:bg-[#06383D]/50'
              }`}
            >
              Platform Overview
            </button>
            <button
              onClick={() => setCurrentView('operations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentView === 'operations'
                  ? 'bg-[#06383D]/20 text-[#F2AE32] border border-[#F2AE32]/30 shadow-sm'
                  : 'text-[#A5A5A4] hover:text-white hover:bg-[#06383D]/50'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              AI Control Tower
            </button>
            <button
              onClick={() => setCurrentView('farmer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentView === 'farmer'
                  ? 'bg-[#06383D]/20 text-[#F2AE32] border border-[#F2AE32]/30 shadow-sm'
                  : 'text-[#A5A5A4] hover:text-white hover:bg-[#06383D]/50'
              }`}
            >
              Producer / Farmer Portal
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                currentView === 'admin'
                  ? 'bg-[#06383D]/20 text-[#A5A5A4] border border-[#F2AE32]/30 shadow-sm'
                  : 'text-[#A5A5A4] hover:text-white hover:bg-[#06383D]/50'
              }`}
            >
              Enterprise Admin
            </button>
          </nav>
        </div>

        {/* Right CTA / Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Command Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-[#06383D]/30 bg-[#06383D]/80 px-2.5 py-1.5 text-xs text-[#A5A5A4] hover:border-[#06383D]/50 hover:text-white transition-colors shadow-inner"
          >
            <Search className="h-3.5 w-3.5 text-[#A5A5A4]" />
            <span className="font-mono text-[11px]">Quick Search</span>
            <kbd className="rounded bg-[#06383D] px-1.5 py-0.5 text-[10px] font-mono text-[#A5A5A4] border border-[#06383D]/30">⌘K</kbd>
          </button>

          {currentView === 'marketing' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('operations')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#A5A5A4] hover:text-white px-3 py-2 rounded-md hover:bg-[#06383D]/50 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentView('operations')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 px-3.5 py-2 text-xs font-semibold text-[#292D2F] shadow-md shadow-[#F2AE32]/20 transition-all hover:shadow-[#F2AE32]/30"
              >
                Launch Control Tower
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#F2AE32] bg-[#06383D]/40 border border-[#F2AE32]/30 px-2.5 py-1 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F2AE32] animate-pulse" />
                TELEMETRY LIVE · 4,812 IOT NODES
              </div>
              <button
                onClick={() => setCurrentView('marketing')}
                className="inline-flex items-center gap-1 text-xs text-[#A5A5A4] hover:text-white px-2.5 py-1.5 rounded border border-[#06383D]/30 hover:border-[#06383D]/50"
              >
                Exit to Website
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Subnav for Mobile */}
      <div className="flex lg:hidden overflow-x-auto border-t border-[#06383D]/30 px-4 py-2 space-x-2 bg-[#06383D]">
        <button
          onClick={() => setCurrentView('marketing')}
          className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded ${
            currentView === 'marketing' ? 'bg-[#06383D] text-[#F2AE32] border border-[#F2AE32]/30' : 'text-[#A5A5A4]'
          }`}
        >
          Website
        </button>
        <button
          onClick={() => setCurrentView('operations')}
          className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded ${
            currentView === 'operations' ? 'bg-[#06383D] text-[#F2AE32] border border-[#F2AE32]/30' : 'text-[#A5A5A4]'
          }`}
        >
          Operations Tower
        </button>
        <button
          onClick={() => setCurrentView('farmer')}
          className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded ${
            currentView === 'farmer' ? 'bg-[#06383D] text-[#F2AE32] border border-[#F2AE32]/30' : 'text-[#A5A5A4]'
          }`}
        >
          Farmer Portal
        </button>
        <button
          onClick={() => setCurrentView('admin')}
          className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded ${
            currentView === 'admin' ? 'bg-[#06383D] text-[#A5A5A4] border border-[#F2AE32]/30' : 'text-[#A5A5A4]'
          }`}
        >
          Admin Console
        </button>
      </div>
    </header>
  );
};
