import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  RotateCw, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Navigation, 
  ArrowRight, 
  TrendingUp,
  X,
  Volume2,
  Bell
} from 'lucide-react';
import { MOCK_ALERTS, FTLAlert } from '../../data/ftlData';

export const AlertIntelligenceSection: React.FC = () => {
  const [alerts, setAlerts] = useState<FTLAlert[]>(MOCK_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string>('ALT-102-DEV');
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Critical' | 'Warning' | 'Info'>('All');

  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === 'All') return true;
    return a.severity === activeTab;
  });

  const handleExecuteOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setAlerts((prev) =>
        prev.map((a) => (a.id === selectedAlertId ? { ...a, resolved: true } : a))
      );
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1200);
  };

  return (
    <section className="relative min-h-screen w-full bg-[#E8E6E2] py-28 px-6 lg:px-8 border-b border-[#D0CEC9] flex flex-col justify-center overflow-hidden">
      {/* Background Subtle Industrial Pattern */}
      <div className="absolute inset-0 bg-industrial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[#DC2626] text-xs font-mono uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-[#D0CEC9] shadow-2xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-ping" />
            SECTION 07 · EXCEPTION MANAGEMENT & INTERVENTION
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
            ALERT INTELLIGENCE
          </h2>
          <p className="text-[#A5A5A4] text-base sm:text-lg font-medium">
            Immediate multi-sensor correlation transforms highway anomalies into automated resolution maneuvers before delay penalties accrue.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {(['All', 'Critical', 'Warning', 'Info'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2-Column Split: Active Incident Queue vs Interactive Resolution Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Incident Roster (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {filteredAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlertId;
              const isCritical = alert.severity === 'Critical';
              const isWarning = alert.severity === 'Warning';

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-[#06383D] shadow-[0_8px_24px_rgba(6,56,61,0.08)] -translate-y-0.5'
                      : 'bg-white/80 hover:bg-white border-[#D0CEC9] shadow-2xs'
                  } ${alert.resolved ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E0DED9]">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isCritical ? 'bg-[#DC2626]' : isWarning ? 'bg-[#F2AE32]' : 'bg-[#06383D]'}`} />
                      <span className="font-mono text-xs font-bold text-[#292D2F]">{alert.truckId}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      alert.resolved
                        ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                        : isCritical
                        ? 'bg-red-50 text-[#DC2626] border border-red-200'
                        : 'bg-amber-50 text-[#F2AE32] border border-amber-200'
                    }`}>
                      {alert.resolved ? 'RESOLVED' : alert.severity}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-[#292D2F] font-sans mt-2.5">
                    {alert.title}
                  </div>
                  <p className="text-xs text-[#A5A5A4] mt-1 leading-relaxed line-clamp-2">
                    {alert.description}
                  </p>

                  <div className="pt-3 border-t border-[#E0DED9] flex items-center justify-between text-[11px] font-mono text-[#A5A5A4] mt-2">
                    <span>{alert.time}</span>
                    <span className="text-[#292D2F] font-semibold">{alert.location.split(',')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Resolution Dossier & Optimization Actuator (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#D0CEC9] bg-white p-7 sm:p-9 shadow-[0_12px_40px_rgba(6,56,61,0.06)] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#DC2626] font-bold">
                  AUTONOMOUS RESOLUTION DISPATCH
                </span>
                <h3 className="text-2xl font-bold text-[#292D2F] font-sans mt-1">
                  {selectedAlert.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-lg bg-[#F0EEEA] border border-[#D0CEC9] text-xs font-mono font-bold text-[#292D2F]">
                {selectedAlert.id}
              </span>
            </div>

            <p className="text-sm text-[#A5A5A4] leading-relaxed">
              {selectedAlert.description}
            </p>

            {/* Telemetry Snapshot Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#F0EEEA] border border-[#E0DED9]">
                <div className="text-[#A5A5A4] text-[10px] uppercase">AFFECTED VEHICLE</div>
                <div className="font-bold text-[#292D2F] mt-1">{selectedAlert.truckId}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F0EEEA] border border-[#E0DED9]">
                <div className="text-[#A5A5A4] text-[10px] uppercase">INCIDENT LOCATION</div>
                <div className="font-bold text-[#292D2F] mt-1 truncate">{selectedAlert.location}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F0EEEA] border border-[#E0DED9]">
                <div className="text-[#A5A5A4] text-[10px] uppercase">SLA IMPACT RISK</div>
                <div className="font-bold text-[#DC2626] mt-1">+{selectedAlert.delayImpact} Min Potential</div>
              </div>
            </div>

            {/* Automated Recommendation Box */}
            <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-[#F2AE32] font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>AI RE-ROUTING RECOMMENDATION</span>
              </div>
              <p className="text-[#292D2F] font-sans text-sm">
                {selectedAlert.actionRecommendation}
              </p>
            </div>

            {/* Execute Resolution CTA */}
            <div className="pt-2 flex items-center justify-between">
              <div className="text-xs font-mono text-[#A5A5A4]">
                {selectedAlert.resolved ? (
                  <span className="text-[#16803C] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    DISPATCH OVERRIDE EXECUTED
                  </span>
                ) : (
                  <span>Estimated recovery: 18 minutes</span>
                )}
              </div>

              {!selectedAlert.resolved && (
                <button
                  onClick={handleExecuteOptimize}
                  disabled={isOptimizing}
                  className="px-6 py-3 rounded-xl bg-[#06383D] hover:bg-[#F2AE32] hover:text-[#292D2F] text-white font-sans font-bold text-xs uppercase tracking-wide flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {isOptimizing ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>DISPATCHING BYPASS...</span>
                    </>
                  ) : (
                    <>
                      <span>EXECUTE AUTONOMOUS DETOUR</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
