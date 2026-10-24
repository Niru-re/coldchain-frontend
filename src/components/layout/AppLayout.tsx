import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Package, 
  Truck, 
  GitFork, 
  Warehouse,
  AlertTriangle, 
  BarChart3, 
  Sparkles,
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  LogOut, 
  ShieldCheck,
  UserCheck,
  HelpCircle,
  Menu,
  X,
  Compass,
  Users,
  Sprout,
  Train,
  CheckCircle2
} from 'lucide-react';
import { MOCK_ALERTS } from '../../data/ftlData';
import { useAuth, UserRole } from '../../context/AuthContext';
import { VerificationMatrixModal } from '../portal/VerificationMatrixModal';
import api from '../../services/api';

interface AppLayoutProps {
  children: React.ReactNode;
  onOpenCommandPalette: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onOpenCommandPalette }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, user, setRole } = useAuth();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [unreadAlerts] = useState<number>(MOCK_ALERTS.filter(a => !a.resolved).length);
  const [isMatrixOpen, setIsMatrixOpen] = useState<boolean>(false);
  const [dbStatus, setDbStatus] = useState<'Checking' | 'Connected' | 'Disconnected'>('Checking');

  useEffect(() => {
    let isMounted = true;
    const fetchDbHealth = async () => {
      try {
        const res = await api.checkDatabaseHealth();
        if (isMounted) {
          if (res.status === 'healthy' && res.database === 'connected') {
            setDbStatus('Connected');
          } else {
            setDbStatus('Disconnected');
          }
        }
      } catch {
        if (isMounted) {
          setDbStatus('Disconnected');
        }
      }
    };

    fetchDbHealth();
    const interval = setInterval(fetchDbHealth, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // The 4 Specialized Role Portals & Core Modules
  const allNavigationItems = [
    // 4 Role-Based Portals (62 Features Total)
    { name: 'Farmer Portal', path: '/portal/farmer', icon: Sprout, badge: '20 FT', roles: ['farmer', 'admin'] },
    { name: 'Truck Administration', path: '/portal/truck', icon: Truck, badge: '14 FT', roles: ['truck_admin', 'admin'] },
    { name: 'Railway Administration', path: '/portal/railway', icon: Train, badge: '14 FT', roles: ['railway_admin', 'admin'] },
    { name: 'Warehouse Admin', path: '/portal/warehouse', icon: Warehouse, badge: '14 FT', roles: ['warehouse_admin', 'admin'] },

    // Core Control Tower Navigation
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin', 'driver'] },
    { name: 'Shipments & Orders', path: '/shipments', icon: Package, count: '6 Active', roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin', 'farmer', 'driver'] },
    { name: 'Live Tracking', path: '/tracking', icon: Map, badge: 'LIVE', roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin', 'farmer', 'driver', 'customer'] },
    { name: 'Fleet & Drivers', path: '/fleet', icon: Truck, count: '128', roles: ['admin', 'truck_admin'] },
    { name: 'Routes & Scheduling', path: '/routes', icon: GitFork, roles: ['admin', 'truck_admin', 'railway_admin', 'driver'] },
    { name: 'Warehouse & Inventory', path: '/warehouse', icon: Warehouse, count: '4 Hubs', roles: ['admin', 'warehouse_admin'] },
    { name: 'Alerts & Notifications', path: '/alerts', icon: AlertTriangle, count: unreadAlerts > 0 ? `${unreadAlerts}` : undefined, isAlert: true, roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin', 'farmer', 'driver'] },
    { name: 'Reports & Analytics', path: '/analytics', icon: BarChart3, roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin'] },
    { name: 'AI Intelligence', path: '/ai-intelligence', icon: Sparkles, badge: '8 AI', roles: ['admin', 'truck_admin', 'farmer'] },
    { name: 'Customer Tracking', path: '/customer-tracking', icon: Search, roles: ['admin', 'farmer', 'customer'] },
    { name: 'User & Security', path: '/users', icon: ShieldCheck, roles: ['admin'] },
    { name: 'Support / Contact', path: '/support', icon: HelpCircle, roles: ['admin', 'truck_admin', 'railway_admin', 'warehouse_admin', 'farmer', 'driver', 'customer'] },
  ];

  // Filter navigation items based on active role
  const visibleNavItems = allNavigationItems.filter(item => item.roles.includes(role));

  return (
    <div className="min-h-screen bg-[#F0EEEA] text-[#292D2F] flex flex-col font-sans selection:bg-[#F2AE32]/20 selection:text-[#F2AE32]">
      
      <div className="flex flex-1">
        
        {/* DESKTOP COLLAPSIBLE SIDEBAR */}
        <aside className={`hidden md:flex flex-col border-r border-[#D0CEC9] bg-white transition-all duration-300 relative z-30 shadow-2xs ${
          collapsed ? 'w-20' : 'w-64'
        }`}>
          {/* Sidebar Header Brand */}
          <div className="h-20 flex items-center justify-between px-5 border-b border-[#D0CEC9]">
            <Link to="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#06383D] flex items-center justify-center text-white font-black shrink-0 shadow-2xs">
                <Truck className="w-4 h-4 text-white" />
              </div>
              {!collapsed && (
                <div>
                  <div className="text-base font-black tracking-tight text-[#292D2F] font-sans flex items-center gap-1">
                    ColdChain <span className="text-[#F2AE32]">360</span>
                  </div>
                  <div className="text-[9px] font-mono text-[#A5A5A4] tracking-wider uppercase font-semibold">
                    CONTROL TOWER
                  </div>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-lg text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA] transition-colors cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Role Indicator in Sidebar */}
          {!collapsed && (
            <div className="px-4 pt-3 pb-1 border-b border-[#D0CEC9] bg-[#F0EEEA]/50">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-[#A5A5A4] uppercase font-bold">CLEARANCE ROLE:</span>
                <span className="px-2 py-0.5 rounded bg-[#06383D] text-[#F2AE32] font-black uppercase">
                  {role}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-[#F0EEEA] text-[#292D2F] border border-[#D0CEC9] font-bold shadow-2xs'
                      : 'text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#F2AE32]' : 'text-[#A5A5A4] group-hover:text-[#292D2F]'}`} />
                  
                  {!collapsed && (
                    <span className="flex-1 truncate uppercase text-[11px]">
                      {item.name}
                    </span>
                  )}

                  {!collapsed && item.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-[#06383D] text-[9px] text-[#F2AE32] font-bold">
                      {item.badge}
                    </span>
                  )}

                  {!collapsed && item.count && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      item.isAlert 
                        ? 'bg-red-50 text-[#DC2626] border border-red-200 font-bold' 
                        : 'bg-[#E8E6E2] text-[#A5A5A4]'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#F2AE32] rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer User Info */}
          <div className="p-4 border-t border-[#D0CEC9] space-y-2 font-mono text-xs">
            <Link
              to="/"
              className={`flex items-center gap-2.5 p-2 rounded-lg text-[#A5A5A4] hover:text-[#F2AE32] hover:bg-[#F0EEEA] transition-colors ${collapsed ? 'justify-center' : ''}`}
            >
              <Globe className="w-4 h-4" />
              {!collapsed && <span>Public Platform</span>}
            </Link>

            {!collapsed && (
              <div className="p-3 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#292D2F] truncate max-w-[130px]">{user.name}</div>
                  <div className="text-[9px] flex items-center gap-1 font-semibold">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        dbStatus === 'Connected'
                          ? 'bg-[#16803C]'
                          : dbStatus === 'Disconnected'
                          ? 'bg-[#DC2626]'
                          : 'bg-[#F2AE32] animate-pulse'
                      }`}
                    />
                    <span
                      className={
                        dbStatus === 'Connected'
                          ? 'text-[#16803C]'
                          : dbStatus === 'Disconnected'
                          ? 'text-[#DC2626]'
                          : 'text-[#B45309]'
                      }
                    >
                      DB {dbStatus} &bull; {role.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Link to="/login" title="Sign out" className="text-[#A5A5A4] hover:text-[#DC2626]">
                  <LogOut className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN BODY AREA */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* TOP BAR */}
          <header className="h-20 border-b border-[#D0CEC9] bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
            
            {/* Search / Command Bar Trigger */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] hover:border-[#A5A5A4] text-[#A5A5A4] hover:text-[#292D2F] text-xs font-mono transition-all cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#A5A5A4]" />
                <span className="hidden sm:inline">Search cold-chain modules, shipments, haulers...</span>
                <span className="sm:hidden">Search...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white border border-[#D0CEC9] text-[10px] text-[#A5A5A4]">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* Role Switcher & Feature Matrix in Top Bar */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Real Live Database Connectivity Indicator */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold tracking-wider transition-all shadow-2xs ${
                  dbStatus === 'Connected'
                    ? 'bg-[#16803C]/10 text-[#16803C] border-[#16803C]/30'
                    : dbStatus === 'Disconnected'
                    ? 'bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30'
                    : 'bg-[#F2AE32]/10 text-[#B45309] border-[#F2AE32]/30'
                }`}
                title={`Live Database Connection: ${dbStatus}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    dbStatus === 'Connected'
                      ? 'bg-[#16803C]'
                      : dbStatus === 'Disconnected'
                      ? 'bg-[#DC2626]'
                      : 'bg-[#F2AE32] animate-pulse'
                  }`}
                />
                <span className="hidden sm:inline">DB:</span>
                <span>{dbStatus}</span>
              </div>

              {/* 62-Feature Verification Matrix Trigger Button */}
              <button
                onClick={() => setIsMatrixOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#06383D] hover:bg-[#06383D]/90 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-2xs border border-[#06383D] cursor-pointer"
                title="Audit all 62 Cold-Chain Features across 4 Portals"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F2AE32]" />
                <span className="hidden xl:inline">Feature Matrix</span>
                <span className="px-1.5 py-0.2 rounded-md bg-[#F2AE32] text-[#0B0E14] text-[10px] font-black">
                  62 / 62
                </span>
              </button>

              {/* Portal Jump Selector */}
              <div className="hidden lg:flex items-center gap-1 bg-[#F0EEEA] p-1 rounded-xl border border-[#D0CEC9] font-mono text-[10px]">
                <span className="text-[#A5A5A4] font-bold px-1.5 uppercase text-[9px]">PORTAL:</span>
                {[
                  { id: 'farmer', label: 'Farmer', path: '/portal/farmer' },
                  { id: 'truck_admin', label: 'Truck', path: '/portal/truck' },
                  { id: 'railway_admin', label: 'Railway', path: '/portal/railway' },
                  { id: 'warehouse_admin', label: 'Warehouse', path: '/portal/warehouse' },
                  { id: 'admin', label: 'Central', path: '/dashboard' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setRole(p.id as UserRole);
                      navigate(p.path);
                    }}
                    className={`px-2 py-1 rounded-lg uppercase cursor-pointer transition-all ${
                      role === p.id
                        ? 'bg-[#06383D] text-[#F2AE32] font-black shadow-2xs'
                        : 'text-[#A5A5A4] hover:text-[#292D2F]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Back to Public Home link */}
              <Link
                to="/"
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#A5A5A4] hover:text-[#292D2F] border border-[#D0CEC9] hover:border-[#A5A5A4] transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#F2AE32]" />
                <span>Product Home</span>
              </Link>

              {/* User Profile Avatar */}
              <Link
                to="/users"
                className="flex items-center gap-2.5 pl-2 pr-2 py-1 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] hover:border-[#A5A5A4] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#06383D] flex items-center justify-center text-xs font-bold font-mono text-[#F2AE32]">
                  {user.avatar}
                </div>
                <div className="hidden xl:block text-left text-xs font-mono">
                  <div className="text-[#292D2F] font-bold">{user.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-[#A5A5A4] uppercase">{role.replace('_', ' ')}</div>
                </div>
              </Link>
            </div>
          </header>

          {/* MOBILE SLIDE-OUT MENU */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-[#D0CEC9] p-4 space-y-2 font-mono text-xs shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-[#D0CEC9]">
                <button
                  onClick={() => {
                    setIsMatrixOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-[#06383D] text-[#F2AE32] font-bold text-center flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Audit 62-Feature Matrix</span>
                </button>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D0CEC9]">
                <span className="text-[#A5A5A4] uppercase font-bold text-[10px]">Portal Role:</span>
                <div className="flex flex-wrap gap-1">
                  {(['farmer', 'truck_admin', 'railway_admin', 'warehouse_admin', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setMobileMenuOpen(false);
                        if (r === 'farmer') navigate('/portal/farmer');
                        else if (r === 'truck_admin') navigate('/portal/truck');
                        else if (r === 'railway_admin') navigate('/portal/railway');
                        else if (r === 'warehouse_admin') navigate('/portal/warehouse');
                        else navigate('/dashboard');
                      }}
                      className={`px-2 py-1 rounded text-[10px] uppercase ${
                        role === r ? 'bg-[#06383D] text-[#F2AE32] font-bold' : 'bg-[#F0EEEA] text-[#292D2F]'
                      }`}
                    >
                      {r.replace('_admin', '')}
                    </button>
                  ))}
                </div>
              </div>

              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    location.pathname === item.path ? 'bg-[#06383D] text-white font-bold' : 'text-[#292D2F] hover:bg-[#F0EEEA]'
                  }`}
                >
                  <span className="uppercase">{item.name}</span>
                  {item.badge && <span className="text-[10px] text-[#F2AE32]">{item.badge}</span>}
                </Link>
              ))}
            </div>
          )}

          {/* MAIN VIEW CONTENT CONTAINER */}
          <main className="flex-1 pb-20 md:pb-6 overflow-x-hidden bg-[#F0EEEA]">
            {children}
          </main>

        </div>

      </div>

      {/* MOBILE BOTTOM BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#D0CEC9] px-4 py-2 flex items-center justify-around font-mono text-[10px] shadow-lg">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 py-1 ${
            location.pathname === '/dashboard' ? 'text-[#06383D] font-bold' : 'text-[#A5A5A4]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/tracking"
          className={`flex flex-col items-center gap-1 py-1 ${
            location.pathname.startsWith('/tracking') ? 'text-[#06383D] font-bold' : 'text-[#A5A5A4]'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Live Radar</span>
        </Link>
        <Link
          to="/shipments"
          className={`flex flex-col items-center gap-1 py-1 ${
            location.pathname.startsWith('/shipments') ? 'text-[#06383D] font-bold' : 'text-[#A5A5A4]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Shipments</span>
        </Link>
        <Link
          to="/ai-intelligence"
          className={`flex flex-col items-center gap-1 py-1 ${
            location.pathname.startsWith('/ai-intelligence') ? 'text-[#F2AE32] font-bold' : 'text-[#A5A5A4]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>8 AI Tools</span>
        </Link>
      </nav>

      {/* 95-Feature Verification Matrix Modal */}
      <VerificationMatrixModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        onNavigateToPortal={(portalKey) => {
          setIsMatrixOpen(false);
          if (portalKey === 'farmer') navigate('/portal/farmer');
          else if (portalKey === 'truck') navigate('/portal/truck');
          else if (portalKey === 'railway') navigate('/portal/railway');
          else if (portalKey === 'warehouse') navigate('/portal/warehouse');
        }}
      />

    </div>
  );
};
