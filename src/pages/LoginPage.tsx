import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, 
  Sprout, 
  Train, 
  Warehouse, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';

interface PortalOption {
  role: UserRole;
  title: string;
  badge: string;
  featuresCount: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  demoEmail: string;
  targetRoute: string;
  highlightColor: string;
  accentBg: string;
}

const PORTALS: PortalOption[] = [
  {
    role: 'farmer',
    title: 'Farmer Portal',
    badge: 'Producers & Co-Ops',
    featuresCount: '20 Features',
    icon: Sprout,
    description: 'Crop pre-cooling monitoring, kinetic shelf-life prediction, APMC mandi prices, PMKSY/MIDH subsidies, and OpenCV produce grading.',
    demoEmail: 'ramesh.deshmukh@agrocoop.in',
    targetRoute: '/portal/farmer',
    highlightColor: 'border-[#16803C] hover:border-[#16803C]',
    accentBg: 'bg-[#16803C]/10 text-[#16803C]',
  },
  {
    role: 'truck_admin',
    title: 'Truck Administration',
    badge: 'Highway Fleet Ops',
    featuresCount: '14 Features',
    icon: Truck,
    description: 'Road route optimization, live GPS & geofencing, 500-km relay planning, reefer health diagnostics, and roadside emergency recovery.',
    demoEmail: 'truck.admin@coldchain360.in',
    targetRoute: '/portal/truck',
    highlightColor: 'border-[#06383D] hover:border-[#06383D]',
    accentBg: 'bg-[#06383D]/10 text-[#06383D]',
  },
  {
    role: 'railway_admin',
    title: 'Railway Administration',
    badge: 'Kisan Rail & DFC',
    featuresCount: '14 Features',
    icon: Train,
    description: 'Train timetables, wagon allocation, rail freight capacity, yard congestion monitoring, tariff calculator, and rail-to-truck transfer coordination.',
    demoEmail: 'kisan.rail@coldchain360.in',
    targetRoute: '/portal/railway',
    highlightColor: 'border-[#2563EB] hover:border-[#2563EB]',
    accentBg: 'bg-[#2563EB]/10 text-[#2563EB]',
  },
  {
    role: 'warehouse_admin',
    title: 'Warehouse Administration',
    badge: 'Cold Hub & Chambers',
    featuresCount: '14 Features',
    icon: Warehouse,
    description: 'Multi-chamber CA monitoring, FEFO pallet barcode tracking, blast freezing cycles, ammonia detection, and commercial storage billing.',
    demoEmail: 'warehouse.lead@coldchain360.in',
    targetRoute: '/portal/warehouse',
    highlightColor: 'border-[#D97706] hover:border-[#D97706]',
    accentBg: 'bg-[#D97706]/10 text-[#D97706]',
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(role || 'farmer');
  const [username, setUsername] = useState('ramesh.deshmukh@agrocoop.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectRole = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setErrorMessage(null);
    const portal = PORTALS.find(p => p.role === newRole);
    if (portal) {
      setUsername(portal.demoEmail);
    } else if (newRole === 'admin') {
      setUsername('ops.lead@coldchain360.in');
    } else if (newRole === 'driver') {
      setUsername('rajesh.sharma@coldchain360.in');
    } else {
      setUsername('supplychain@serumbiopharma.com');
    }
  };

  const executeSignIn = async (
    targetRole: UserRole,
    targetUser: string,
    targetPath?: string,
    targetPassword?: string
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await login(targetRole, targetUser, targetPassword || 'ColdChain2026!');
      const storedRole = (localStorage.getItem('cc360_user_role') as UserRole) || targetRole;
      setTimeout(() => {
        setIsLoading(false);
        if (targetPath) {
          navigate(targetPath);
        } else {
          if (storedRole === 'admin') navigate('/dashboard');
          else if (storedRole === 'farmer') navigate('/portal/farmer');
          else if (storedRole === 'truck_admin') navigate('/portal/truck');
          else if (storedRole === 'railway_admin') navigate('/portal/railway');
          else if (storedRole === 'warehouse_admin') navigate('/portal/warehouse');
          else if (storedRole === 'customer') navigate('/customer-tracking');
          else if (storedRole === 'driver') navigate('/routes');
          else navigate('/dashboard');
        }
      }, 450);
    } catch (err: any) {
      setIsLoading(false);
      let msg = err?.message || 'Authentication failed. Please verify credentials or backend status.';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.toLowerCase().includes('connection refused')) {
        msg = 'Cannot reach backend service at http://localhost:8000. Please ensure the FastAPI server is running.';
      }
      setErrorMessage(msg);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectivePassword = password === '••••••••••••' ? 'ColdChain2026!' : password;
    executeSignIn(selectedRole, username, undefined, effectivePassword);
  };

  return (
    <div className="min-h-screen w-full bg-[#F0EEEA] flex flex-col justify-between font-sans selection:bg-[#F2AE32]/20 selection:text-[#F2AE32] relative overflow-hidden">
      
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-10 w-full px-6 py-5 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#06383D] flex items-center justify-center text-white shadow-2xs">
            <Truck className="w-5 h-5 text-[#F2AE32]" />
          </div>
          <div>
            <span className="text-xl font-black text-[#292D2F]">ColdChain <span className="text-[#F2AE32]">360</span></span>
            <span className="text-[10px] font-mono text-[#A5A5A4] block tracking-wider uppercase font-semibold">
              UNIFIED 4-PORTAL GATEWAY
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-mono text-[#06383D] hover:text-[#F2AE32] transition-colors font-bold flex items-center gap-1.5"
        >
          <span>Product Overview</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D0CEC9] text-[10px] font-mono uppercase text-[#06383D] font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>ROLE-BASED COLD CHAIN ARCHITECTURE · 95 FEATURES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#292D2F] tracking-tight uppercase">
            Select Your Cold Chain Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#A5A5A4] font-mono">
            Direct access to specialized operational terminals with telemetry, AI predictive alerts, and simulated computer vision.
          </p>
        </div>

        {/* 4 DISTINCT PORTAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTALS.map((portal) => {
            const Icon = portal.icon;
            const isSelected = selectedRole === portal.role;

            return (
              <div
                key={portal.role}
                onClick={() => handleSelectRole(portal.role)}
                className={`rounded-2xl border transition-all cursor-pointer bg-white p-5 flex flex-col justify-between shadow-2xs relative group hover:shadow-md ${
                  isSelected 
                    ? 'border-[#06383D] ring-2 ring-[#06383D]/20 shadow-md' 
                    : 'border-[#D0CEC9] hover:border-[#06383D]/40'
                }`}
              >
                {/* Active Indicator Pin */}
                {isSelected && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#06383D] text-[#F2AE32] text-[9px] font-mono font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selected</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${portal.accentBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#F0EEEA] text-[#292D2F] border border-[#D0CEC9]">
                      {portal.featuresCount}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-[#A5A5A4] uppercase font-semibold">
                      {portal.badge}
                    </div>
                    <h2 className="text-base font-black text-[#292D2F] leading-snug">
                      {portal.title}
                    </h2>
                  </div>

                  <p className="text-[11px] text-[#A5A5A4] line-clamp-3 leading-relaxed font-mono">
                    {portal.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EEEA] mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      executeSignIn(portal.role, portal.demoEmail, portal.targetRoute);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#06383D] hover:bg-[#06383D]/90 text-white font-mono text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>Instant Enter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Form & Secondary Roles Card */}
        <div className="max-w-xl mx-auto rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-8 shadow-sm font-mono space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D0CEC9]">
            <div className="space-y-0.5">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">Active Selection Clearance:</span>
              <h3 className="text-base font-black text-[#292D2F] uppercase">
                {selectedRole.replace('_', ' ')}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#16803C]/10 text-[#16803C] border border-[#16803C]/20">
              Demo Clearance Active
            </span>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 flex items-start gap-2.5 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[#A5A5A4] uppercase font-semibold text-[11px]">Authorized Demo Identifier / Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] text-[#292D2F] focus:outline-none focus:border-[#06383D] font-bold font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#A5A5A4] uppercase font-semibold text-[11px]">Security Clearance Token</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => {
                    if (password === '••••••••••••') {
                      setPassword('');
                    }
                  }}
                  onBlur={() => {
                    if (!password) {
                      setPassword('••••••••••••');
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
                <KeyRound className="w-4 h-4 text-[#A5A5A4] absolute right-3.5 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#06383D] hover:bg-[#06383D]/85 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>{isLoading ? 'ESTABLISHING CLEARANCE...' : `SIGN IN AS ${selectedRole.toUpperCase().replace('_', ' ')}`}</span>
              <ArrowRight className="w-4 h-4 text-[#F2AE32]" />
            </button>
          </form>

          {/* Secondary Central Hub Quick Links */}
          <div className="pt-2 border-t border-[#D0CEC9] space-y-2">
            <div className="text-[10px] text-[#A5A5A4] uppercase font-bold text-center">
              Or Access Core Logistics Towers
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => executeSignIn('admin', 'ops.lead@coldchain360.in', '/dashboard')}
                className="p-2 rounded-lg bg-[#F0EEEA] hover:bg-[#D0CEC9]/60 text-[10px] text-center font-bold text-[#292D2F] uppercase transition-colors"
              >
                Central Control
              </button>
              <button
                type="button"
                onClick={() => executeSignIn('driver', 'rajesh.sharma@coldchain360.in', '/routes')}
                className="p-2 rounded-lg bg-[#F0EEEA] hover:bg-[#D0CEC9]/60 text-[10px] text-center font-bold text-[#292D2F] uppercase transition-colors"
              >
                Pilot / Driver
              </button>
              <button
                type="button"
                onClick={() => executeSignIn('customer', 'supplychain@serumbiopharma.com', '/customer-tracking')}
                className="p-2 rounded-lg bg-[#F0EEEA] hover:bg-[#D0CEC9]/60 text-[10px] text-center font-bold text-[#292D2F] uppercase transition-colors"
              >
                Consignee / Client
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] flex items-start gap-2.5 text-[10px] text-[#A5A5A4]">
            <Info className="w-4 h-4 text-[#F2AE32] shrink-0 mt-0.5" />
            <span>
              <strong>Frontend Demonstration Note:</strong> Simulated pre-loaded JWT tokens provide full interactive access to all 95 cold-chain features across the 4 portals without external database dependencies.
            </span>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs font-mono text-[#A5A5A4]">
        &copy; 2026 ColdChain 360 TECHNOLOGIES PVT. LTD. &bull; ALL RIGHTS RESERVED
      </footer>

    </div>
  );
};
