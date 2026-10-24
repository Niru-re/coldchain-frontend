import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Truck, 
  Package, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  X, 
  LayoutDashboard,
  Users,
  GitFork, 
  Warehouse,
  BarChart3, 
  Globe, 
  KeyRound, 
  CornerDownLeft, 
  Radio,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Clock,
  ShieldAlert,
  Calculator,
  RotateCcw,
  Landmark,
  Leaf,
  Recycle,
  UserCheck
} from 'lucide-react';
import { MOCK_TRUCKS, MOCK_SHIPMENTS, MOCK_ALERTS } from '../../data/ftlData';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

interface PaletteCommandItem {
  id: string;
  category: 'Navigation' | 'AI Intelligence' | 'Fleet' | 'Shipments' | 'Alerts';
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  onSelect: () => void;
}

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({ 
  isOpen, 
  onClose,
  onOpen 
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const shortcutModifier = isMac ? '⌘' : 'Ctrl';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const flatItems: PaletteCommandItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. The 12 Strictly Defined Core Navigation Items
    const navItems: PaletteCommandItem[] = [
      {
        id: 'nav-dashboard',
        category: 'Navigation',
        title: 'Dashboard',
        subtitle: 'Key operational cold-chain metrics, compliance & active manifests',
        badge: '/dashboard',
        badgeColor: 'text-[#06383D] bg-[#F0EEEA]',
        icon: LayoutDashboard,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/dashboard'),
      },
      {
        id: 'nav-shipments',
        category: 'Navigation',
        title: 'Shipments & Orders',
        subtitle: 'Manage active cold-chain consignments, QR scanning & POD records',
        badge: 'ACTIVE LOADS',
        badgeColor: 'text-[#F2AE32] bg-[#F2AE32]/10',
        icon: Package,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/shipments'),
      },
      {
        id: 'nav-tracking',
        category: 'Navigation',
        title: 'Live Tracking',
        subtitle: 'GPS vehicle radar, thermal geofences & ambient corridor heatmaps',
        badge: 'LIVE MAP',
        badgeColor: 'text-[#16803C] bg-emerald-50',
        icon: Radio,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/tracking'),
      },
      {
        id: 'nav-fleet',
        category: 'Navigation',
        title: 'Fleet & Drivers',
        subtitle: 'Refrigerated vehicle health, maintenance scheduling, driver logs & fuel',
        badge: '128 FLEET',
        badgeColor: 'text-[#292D2F] bg-[#F0EEEA]',
        icon: Truck,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/fleet'),
      },
      {
        id: 'nav-routes',
        category: 'Navigation',
        title: 'Routes & Delivery Scheduling',
        subtitle: 'Multi-corridor routing, traffic delays & scheduled dock appointments',
        badge: 'SCHEDULING',
        badgeColor: 'text-[#292D2F] bg-[#F0EEEA]',
        icon: GitFork,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/routes'),
      },
      {
        id: 'nav-warehouse',
        category: 'Navigation',
        title: 'Warehouse & Inventory',
        subtitle: 'Multi-chamber cold hubs, pallet lot tracking & humidity compliance',
        badge: '4 HUBS',
        badgeColor: 'text-[#06383D] bg-[#06383D]/10',
        icon: Warehouse,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/warehouse'),
      },
      {
        id: 'nav-alerts',
        category: 'Navigation',
        title: 'Alerts & Notifications',
        subtitle: 'High/low temp excursions, delivery delays & breakdown incident desk',
        badge: 'INCIDENTS',
        badgeColor: 'text-[#DC2626] bg-red-50 border border-red-200',
        icon: AlertTriangle,
        iconColor: 'text-[#DC2626]',
        onSelect: () => handleNavigate('/alerts'),
      },
      {
        id: 'nav-analytics',
        category: 'Navigation',
        title: 'Reports & Analytics',
        subtitle: 'Delivery performance, temperature compliance, transport costs & CSV export',
        badge: 'EXPORT CSV',
        badgeColor: 'text-[#292D2F] bg-[#F0EEEA]',
        icon: BarChart3,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/analytics'),
      },
      {
        id: 'nav-ai',
        category: 'Navigation',
        title: 'AI Intelligence',
        subtitle: 'Dedicated platform with the exact 8 autonomous cold-chain engines',
        badge: '8 AI ENGINES',
        badgeColor: 'text-[#F2AE32] bg-[#06383D]',
        icon: Sparkles,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence'),
      },
      {
        id: 'nav-customer-tracking',
        category: 'Navigation',
        title: 'Customer Tracking',
        subtitle: 'Public & consignee shipment lookup, live temperature badge & POD download',
        badge: 'CUSTOMER PORTAL',
        badgeColor: 'text-[#06383D] bg-[#F0EEEA]',
        icon: Search,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/customer-tracking'),
      },
      {
        id: 'nav-users',
        category: 'Navigation',
        title: 'User Management & Security',
        subtitle: 'Role-based access (Admin, Driver, Customer), encryption & audit logs',
        badge: 'RBAC · AUDIT',
        badgeColor: 'text-[#292D2F] bg-[#F0EEEA]',
        icon: ShieldCheck,
        iconColor: 'text-[#06383D]',
        onSelect: () => handleNavigate('/users'),
      },
      {
        id: 'nav-support',
        category: 'Navigation',
        title: 'Support / Contact',
        subtitle: 'Emergency thermal hotline (+91 1800-COLD-360), regional hubs & tickets',
        badge: '24/7 HOTLINE',
        badgeColor: 'text-[#292D2F] bg-[#F0EEEA]',
        icon: HelpCircle,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/support'),
      },
    ];

    // 2. The Exact 8 AI Features
    const aiItems: PaletteCommandItem[] = [
      {
        id: 'ai-survival-clock',
        category: 'AI Intelligence',
        title: '1. AI Cargo Survival Clock',
        subtitle: 'Estimate remaining safe time for temperature-sensitive cargo via Arrhenius kinetics',
        badge: 'SURVIVAL CLOCK',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Clock,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=survival-clock'),
      },
      {
        id: 'ai-rescue-engine',
        category: 'AI Intelligence',
        title: '2. AI Cargo Rescue Engine',
        subtitle: 'Autonomous route diversions, backup refrigerated haulers & emergency cold-storage bays',
        badge: 'RESCUE ENGINE',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: ShieldAlert,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=rescue-engine'),
      },
      {
        id: 'ai-loss-calculator',
        category: 'AI Intelligence',
        title: '3. AI Loss Calculator',
        subtitle: 'Estimate financial loss from spoilage vs intervention and rescue cost',
        badge: 'LOSS CALC',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Calculator,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=loss-calculator'),
      },
      {
        id: 'ai-reverse-logistics',
        category: 'AI Intelligence',
        title: '4. AI Reverse Logistics Optimizer',
        subtitle: 'Manage rejected or returned shipments for recovery, reuse, or safe bio-disposal',
        badge: 'REVERSE LOGISTICS',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: RotateCcw,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=reverse-logistics'),
      },
      {
        id: 'ai-govt-benefits',
        category: 'AI Intelligence',
        title: '5. AI Government Benefit Optimizer',
        subtitle: 'Discover applicable PM Kisan SAMPADA, MIDH & MOFPI cold-chain subsidy schemes',
        badge: 'GOVT BENEFITS',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Landmark,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=govt-benefits'),
      },
      {
        id: 'ai-green-fleet',
        category: 'AI Intelligence',
        title: '6. Green Fleet Optimizer',
        subtitle: 'Recommend electric/fuel-efficient refrigerated vehicles, energy use & emission savings',
        badge: 'GREEN FLEET',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Leaf,
        iconColor: 'text-[#16803C]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=green-fleet'),
      },
      {
        id: 'ai-waste-fertilizer',
        category: 'AI Intelligence',
        title: '7. AI Organic Waste-to-Fertilizer System',
        subtitle: 'Connect spoiled perishables with certified bio-fertilizer and composting units',
        badge: 'WASTE TO BIO',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Recycle,
        iconColor: 'text-[#16803C]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=waste-fertilizer'),
      },
      {
        id: 'ai-driver-relay',
        category: 'AI Intelligence',
        title: '8. AI Driver Rotation and Relay Fleet System',
        subtitle: 'Plan driver handovers approximately every 500 km with continuous thermal monitoring',
        badge: '500-KM RELAY',
        badgeColor: 'text-[#06383D] bg-[#F2AE32]/20',
        icon: Users,
        iconColor: 'text-[#F2AE32]',
        onSelect: () => handleNavigate('/ai-intelligence?tab=driver-relay'),
      },
    ];

    // 3. Searchable Fleet Vehicles
    const truckItems: PaletteCommandItem[] = MOCK_TRUCKS.map((t) => ({
      id: `truck-${t.id}`,
      category: 'Fleet',
      title: `${t.id} · ${t.regNumber}`,
      subtitle: `Pilot: ${t.driverName} · ${t.model} · ${t.status} (${t.speedKmH} km/h)`,
      badge: `${t.status}`,
      badgeColor: t.status === 'Warning' ? 'text-[#DC2626] bg-red-50 border-red-200' : 'text-[#06383D] bg-[#F0EEEA]',
      icon: Truck,
      iconColor: t.status === 'Warning' ? 'text-[#DC2626]' : 'text-[#F2AE32]',
      onSelect: () => handleNavigate(`/tracking?truck=${t.id}`),
    }));

    // 4. Searchable Consignment Shipments
    const shipmentItems: PaletteCommandItem[] = MOCK_SHIPMENTS.map((s) => ({
      id: `shipment-${s.id}`,
      category: 'Shipments',
      title: `${s.id} · ${s.commodity}`,
      subtitle: `${s.originCity} ➔ ${s.destinationCity} · Assigned: ${s.truckId} · ETA: ${s.eta}`,
      badge: s.riskLevel === 'Critical' ? 'CRITICAL RISK' : `${s.status.toUpperCase()}`,
      badgeColor: s.riskLevel === 'Critical' ? 'text-[#DC2626] bg-red-50 border-red-200' : 'text-[#F2AE32] bg-amber-50 border-amber-200',
      icon: Package,
      iconColor: s.riskLevel === 'Critical' ? 'text-[#DC2626]' : 'text-[#06383D]',
      onSelect: () => handleNavigate(`/shipments/${s.id}`),
    }));

    if (!q) {
      return [...navItems, ...aiItems];
    }

    const matchesQuery = (item: PaletteCommandItem) => 
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      (item.badge && item.badge.toLowerCase().includes(q));

    const filteredNav = navItems.filter(matchesQuery);
    const filteredAI = aiItems.filter(matchesQuery);
    const filteredTrucks = truckItems.filter(matchesQuery);
    const filteredShipments = shipmentItems.filter(matchesQuery);

    return [...filteredNav, ...filteredAI, ...filteredTrucks, ...filteredShipments];
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePaletteKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (flatItems.length === 0 ? 0 : (prev + 1) % flatItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (flatItems.length === 0 ? 0 : (prev - 1 + flatItems.length) % flatItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (flatItems.length > 0 && flatItems[selectedIndex]) {
          flatItems[selectedIndex].onSelect();
        }
      }
    };

    window.addEventListener('keydown', handlePaletteKeyDown);
    return () => window.removeEventListener('keydown', handlePaletteKeyDown);
  }, [isOpen, flatItems, selectedIndex, onClose]);

  useEffect(() => {
    if (isOpen && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selectedIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#292D2F]/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="w-full max-w-2xl bg-white border border-[#D0CEC9] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] font-mono animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#D0CEC9] bg-white">
          <Search className="w-5 h-5 text-[#A5A5A4] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, page name, or AI feature..."
            className="flex-1 bg-transparent text-sm text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[#A5A5A4] hover:text-[#292D2F]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-[#A5A5A4] bg-[#F0EEEA] border border-[#D0CEC9] rounded-md">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-[#F0EEEA]"
        >
          {flatItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#A5A5A4]">
              No results found matching "{query}".
            </div>
          ) : (
            flatItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  onClick={item.onSelect}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? 'bg-[#06383D] text-white'
                      : 'text-[#292D2F] hover:bg-[#F0EEEA]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-[#F2AE32]' : 'bg-[#F0EEEA] text-[#06383D]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold truncate">{item.title}</div>
                      <div className={`text-[11px] truncate ${isSelected ? 'text-white/80' : 'text-[#A5A5A4]'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      isSelected ? 'bg-white/20 text-[#F2AE32]' : item.badgeColor || 'bg-[#F0EEEA] text-[#A5A5A4]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-[#D0CEC9] bg-[#F0EEEA] flex items-center justify-between text-[11px] text-[#A5A5A4]">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D0CEC9] text-[10px]">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D0CEC9] text-[10px]">↓</kbd>
            <span>to navigate</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#D0CEC9] text-[10px]">↵</kbd>
            <span>to select</span>
          </div>
          <span className="font-bold text-[#06383D]">ColdChain 360</span>
        </div>
      </div>
    </div>
  );
};
