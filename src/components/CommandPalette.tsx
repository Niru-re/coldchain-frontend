import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Truck, 
  AlertTriangle, 
  Warehouse, 
  Cpu, 
  FileText, 
  Settings, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectShipment: (id: string) => void;
  onNavigateView: (view: 'marketing' | 'operations' | 'farmer' | 'admin') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectShipment,
  onNavigateView,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: 'crit-cc-1048',
      type: 'Shipment',
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      title: 'Inspect Critical Alert #CC-1048 (Ratnagiri Alphonso Mangoes)',
      subtitle: 'Dynamic shelf-life risk (+2.8°C excursion) · AI rescue ready',
      action: () => {
        onNavigateView('operations');
        onSelectShipment('CC-1048');
        onClose();
      },
    },
    {
      id: 'ship-cc-2210',
      type: 'Shipment',
      icon: Truck,
      iconColor: 'text-[#F2AE32]',
      title: 'Open Biologics Cryo-Transit #CC-2210 (mRNA Basel -> Berlin)',
      subtitle: '-71.4°C Ultra-Low Freezer · Rail Corridor Nominal',
      action: () => {
        onNavigateView('operations');
        onSelectShipment('CC-2210');
        onClose();
      },
    },
    {
      id: 'wh-panvel',
      type: 'Facility',
      icon: Warehouse,
      iconColor: 'text-[#F2AE32]',
      title: 'Panvel Western Cold Hub Alpha Capacity & Zones',
      subtitle: 'Zone 1: +3.8°C · 78% capacity · 1,240 pallets',
      action: () => {
        onNavigateView('operations');
        onClose();
      },
    },
    {
      id: 'farmer-portal',
      type: 'Portal',
      icon: Layers,
      iconColor: 'text-[#F2AE32]',
      title: 'Switch to Producer / Farmer Direct Experience',
      subtitle: 'Pristine harvest quality tracking & escrow settlements',
      action: () => {
        onNavigateView('farmer');
        onClose();
      },
    },
    {
      id: 'sim-engine',
      type: 'AI Tool',
      icon: Sparkles,
      iconColor: 'text-purple-400',
      title: 'Run Counterfactual Risk Simulator',
      subtitle: 'Model "What if 6h delay?" or "Compressor failure at 38°C ambient"',
      action: () => {
        onNavigateView('operations');
        onSelectShipment('CC-1048');
        onClose();
      },
    },
    {
      id: 'admin-rules',
      type: 'Admin',
      icon: Settings,
      iconColor: 'text-[#A5A5A4]',
      title: 'Configure HACCP & GDP Compliance Thresholds',
      subtitle: 'Enterprise rule engine & temperature tolerance matrix',
      action: () => {
        onNavigateView('admin');
        onClose();
      },
    },
  ];

  const filtered = quickActions.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-xl border border-[#D0CEC9] bg-[#0a0e17] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="flex items-center border-b border-[#D0CEC9] px-4 py-3 bg-[#0d121c]">
          <Search className="h-5 w-5 text-[#F2AE32] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a shipment ID, route, sensor, warehouse or action... (e.g. CC-1048, pharma, rescue)"
            autoFocus
            className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded bg-[#E8E6E2] px-2 py-0.5 text-[11px] font-mono text-[#292D2F] border border-[#D0CEC9]">ESC to close</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500">
            {filtered.length > 0 ? 'Suggested Commands & Real-time Assets' : 'No matching results'}
          </div>

          {filtered.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full text-left flex items-start gap-3 p-3 rounded-lg hover:bg-[#E8E6E2]/50 transition-colors group border border-transparent hover:border-[#D0CEC9]"
              >
                <div className={`mt-0.5 p-2 rounded-md bg-[#06383D] border border-[#D0CEC9] ${item.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-100 group-hover:text-[#F2AE32] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#E8E6E2] text-[#292D2F] border border-[#D0CEC9]">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#A5A5A4] truncate mt-0.5">{item.subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#F2AE32] transition-transform group-hover:translate-x-0.5 shrink-0 mt-1" />
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-[#D0CEC9] px-4 py-2 bg-[#06383D]/90 text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navigation: <strong className="text-[#A5A5A4]">↑ ↓</strong></span>
            <span>Select: <strong className="text-[#A5A5A4]">Enter</strong></span>
          </div>
          <span className="font-mono text-[10px] text-[#F2AE32]/80">ColdChain 360 Real-Time Telemetry Engine</span>
        </div>
      </div>
    </div>
  );
};
