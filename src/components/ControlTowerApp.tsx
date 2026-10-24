import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Truck, 
  Layers, 
  TrendingUp, 
  Sliders, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  Compass,
  Radio,
  Zap,
  Filter,
  ShieldAlert,
  Search,
  Check,
  X
} from 'lucide-react';
import { Shipment } from '../types';
import { mockWarehouses, mockFleet } from '../data/mockData';

interface ControlTowerAppProps {
  shipments: Shipment[];
  selectedShipmentId: string;
  onSelectShipment: (id: string) => void;
  onApplyRescueAction: (actionTitle: string) => void;
}

export const ControlTowerApp: React.FC<ControlTowerAppProps> = ({
  shipments,
  selectedShipmentId,
  onSelectShipment,
  onApplyRescueAction,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'biologics'>('all');
  const [activeTab, setActiveTab] = useState<'telemetry' | 'decision' | 'twin'>('telemetry');
  const [isRescueApproved, setIsRescueApproved] = useState<boolean>(false);

  const selected = shipments.find(s => s.id === selectedShipmentId) || shipments[0];

  const filtered = shipments.filter(s => {
    if (filterMode === 'critical') return s.riskScore > 60;
    if (filterMode === 'biologics') return s.category === 'Biologics';
    return true;
  });

  return (
    <div className="h-[calc(100vh-64px)] bg-[#06383D] text-[#F0EEEA] flex flex-col font-mono text-xs overflow-hidden select-none">
      
      {/* 1. TOP OPERATIONS APP STATUS BAR */}
      <div className="hairline-b bg-[#06383D] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#16803C] animate-pulse" />
            <span className="font-semibold text-white">GLOBAL OPERATIONS DESK · SHIFT 2</span>
          </div>
          <span className="text-[#D0CEC9]">|</span>
          <span className="text-[#A5A5A4]">ACTIVE MISSIONS: <strong className="text-white">1,248</strong></span>
          <span className="text-[#D0CEC9]">|</span>
          <span className="text-[#A5A5A4]">UNRESOLVED EXCURSIONS: <strong className="text-rose-400">1</strong></span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#A5A5A4]">
          <span>UTC: 14:20:05</span>
          <span className="text-[#D0CEC9]">|</span>
          <span className="text-[#F2AE32]">LEO TELEMATICS LATENCY: 28ms</span>
        </div>
      </div>

      {/* 2. THREE-PANE SERIOUS OPERATIONS LAYOUT: LEFT RAIL (240px) | CENTER LIVE MAP (FLEX) | RIGHT AI INCIDENT (380px) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANE: SHIPMENT ROSTER RAIL */}
        <div className="w-80 hairline-r bg-[#06383D] flex flex-col shrink-0">
          
          {/* Header & Filter */}
          <div className="p-3 border-b border-[#D0CEC9] space-y-2">
            <div className="flex justify-between items-center text-[11px] text-[#A5A5A4]">
              <span>CONSIGNMENT ROSTER</span>
              <span>{filtered.length} Displayed</span>
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => setFilterMode('all')}
                className={`flex-1 py-1 text-[10px] rounded border transition-colors ${
                  filterMode === 'all' ? 'bg-[#E8E6E2]/20 text-white border-[#D0CEC9]' : 'bg-transparent text-[#A5A5A4] border-[#D0CEC9]'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilterMode('critical')}
                className={`flex-1 py-1 text-[10px] rounded border transition-colors flex items-center justify-center gap-1 ${
                  filterMode === 'critical' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-transparent text-[#A5A5A4] border-[#D0CEC9]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                CRITICAL (1)
              </button>
              <button
                onClick={() => setFilterMode('biologics')}
                className={`flex-1 py-1 text-[10px] rounded border transition-colors ${
                  filterMode === 'biologics' ? 'bg-[#E8E6E2]/20 text-white border-[#D0CEC9]' : 'bg-transparent text-[#A5A5A4] border-[#D0CEC9]'
                }`}
              >
                BIOLOGICS
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#D0CEC9]/20">
            {filtered.map(s => {
              const isSelected = s.id === selected.id;
              const isCritical = s.riskScore > 60;
              return (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectShipment(s.id);
                    setIsRescueApproved(false);
                  }}
                  className={`p-3 cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[#06383D]/90 border-l-2 border-[#F2AE32]' 
                      : 'hover:bg-[#E8E6E2]/10'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="font-bold text-white">#{s.id}</span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      isCritical ? 'text-rose-400 bg-rose-950 border border-rose-900 animate-pulse' : 'text-[#16803C]'
                    }`}>
                      {s.riskLevel}
                    </span>
                  </div>

                  <div className="text-xs text-white font-sans truncate">{s.commodity}</div>
                  <div className="text-[10px] text-[#A5A5A4] truncate mt-0.5">{s.origin.split(',')[0]} → {s.destination.split(',')[0]}</div>

                  <div className="mt-2 flex justify-between items-center text-[10px] text-[#A5A5A4]">
                    <span className={s.temperature > s.maxTemp ? 'text-rose-400 font-bold' : 'text-[#F2AE32]'}>
                      {s.temperature > 0 ? `+${s.temperature}` : s.temperature}°C
                    </span>
                    <span>Life: {s.remainingShelfLifeHours}h</span>
                    <span>ETA: {s.eta.split('·')[1] || s.eta}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Fleet Quick State */}
          <div className="p-3 border-t border-[#D0CEC9] bg-[#06383D] text-[10px] text-[#A5A5A4] space-y-1">
            <div className="flex justify-between">
              <span>STANDBY RESCUE REEFERS:</span>
              <span className="text-[#16803C] font-bold">2 Ready</span>
            </div>
            <div className="flex justify-between">
              <span>MAHAD DEPOT BAY 4:</span>
              <span className="text-[#F2AE32] font-bold">Pre-Chilled (+3.8°C)</span>
            </div>
          </div>

        </div>

        {/* CENTER PANE: DOMINATING LIVE OPERATIONS MAP (FLEX-1) */}
        <div className="flex-1 flex flex-col bg-[#06383D] relative">
          
          {/* Map Controls & Status Header */}
          <div className="p-3 border-b border-[#D0CEC9] bg-[#06383D]/90 flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-3">
              <span className="text-[#A5A5A4]">SELECTED MISSION:</span>
              <span className="font-bold text-white">#{selected.id} · {selected.commodity}</span>
              <span className="text-[#D0CEC9]">/</span>
              <span className="text-[#A5A5A4]">CORRIDOR: <strong className="text-white">NH-66 Khed Bypass</strong></span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#A5A5A4]">CARRIER: <strong className="text-white">{selected.carrier}</strong></span>
              <span className="text-[#D0CEC9]">|</span>
              <span className="text-[#A5A5A4]">MODE: <strong className="text-[#F2AE32]">{selected.mode}</strong></span>
            </div>
          </div>

          {/* Full-width Map Canvas (Dominates Center) */}
          <div className="flex-1 relative overflow-hidden bg-radar-grid">
            
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Geographic Landform contours */}
              <path d="M 100 550 Q 250 400 380 300 T 650 180 T 850 80" stroke="rgba(242, 174, 50, 0.2)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 50 250 Q 300 200 600 240 T 950 200" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4 4" />
              <path d="M 50 450 Q 400 420 700 480 T 950 450" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4 4" />

              {/* HIGHWAY 66 MAIN CORRIDOR */}
              <path 
                d="M 180 500 L 320 400 L 480 320 L 650 240 L 800 160 L 900 100" 
                stroke="rgba(255, 255, 255, 0.2)" 
                strokeWidth="2.5" 
              />

              {/* EMERGENCY DIVERSION BRANCH TO MAHAD COLD STORAGE */}
              <path 
                d="M 480 320 Q 560 280 620 300" 
                stroke={isRescueApproved || selected.status === 'Rerouted' ? '#F2AE32' : 'rgba(255, 255, 255, 0.15)'} 
                strokeWidth={isRescueApproved || selected.status === 'Rerouted' ? "4" : "1.5"} 
                strokeDasharray={isRescueApproved || selected.status === 'Rerouted' ? "none" : "4 4"} 
              />

              {/* NODE 1: Ratnagiri Farm */}
              <g transform="translate(180, 500)">
                <circle r="7" fill="#16803C" />
                <circle r="14" stroke="#16803C" strokeWidth="1" opacity="0.3" />
                <text x="-40" y="24" fill="#A5A5A4" fontSize="11" fontFamily="monospace">Ratnagiri Depot</text>
              </g>

              {/* NODE 2: Chiplun Station */}
              <g transform="translate(320, 400)">
                <circle r="5" fill="#A5A5A4" />
                <text x="-20" y="20" fill="#A5A5A4" fontSize="10" fontFamily="monospace">Chiplun</text>
              </g>

              {/* NODE 3: Poladpur Excursion Anomaly */}
              <g transform="translate(480, 320)">
                <circle r="10" fill="#ef4444" />
                <circle r="22" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                <text x="-40" y="-16" fill="#f87171" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  EXCURSION POINT (+9.8°C)
                </text>
              </g>

              {/* NODE 4: Mahad Agro Cold Hub (Divert Destination) */}
              <g transform="translate(620, 300)">
                <rect x="-10" y="-10" width="20" height="20" fill={isRescueApproved ? "#F2AE32" : "#06383D"} stroke="#ffffff" strokeWidth="1.5" rx="3" />
                <circle r="28" stroke="#F2AE32" strokeWidth="1" opacity="0.4" className="animate-pulse" />
                <text x="18" y="5" fill="#F2AE32" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  Mahad Cold Hub (Bay 4 Ready)
                </text>
              </g>

              {/* NODE 5: Panvel Intermodal Hub */}
              <g transform="translate(800, 160)">
                <circle r="6" fill="#A5A5A4" />
                <text x="-25" y="22" fill="#A5A5A4" fontSize="10" fontFamily="monospace">Panvel Multi-Modal</text>
              </g>

              {/* NODE 6: Mumbai Airport Cargo Terminal (BOM) */}
              <g transform="translate(900, 100)">
                <circle r="8" fill="#F2AE32" />
                <circle r="18" stroke="#F2AE32" strokeWidth="1" opacity="0.3" />
                <text x="-70" y="-16" fill="#A5A5A4" fontSize="11" fontFamily="monospace">Mumbai Air Cargo (BOM)</text>
              </g>

              {/* TRUCK PAYLOAD ICON */}
              <g transform={isRescueApproved || selected.status === 'Rerouted' ? "translate(550, 310)" : "translate(480, 320)"}>
                <circle r="12" fill="#06383D" stroke="#F2AE32" strokeWidth="2.5" />
                <circle r="5" fill="#F2AE32" />
              </g>
            </svg>

            {/* Inset Telemetry HUD on Map */}
            <div className="absolute bottom-4 left-4 bg-[#06383D]/95 border border-[#D0CEC9] p-3 rounded text-[11px] space-y-1.5 shadow-2xl backdrop-blur max-w-xs">
              <div className="flex justify-between border-b border-[#D0CEC9] pb-1">
                <span className="text-[#A5A5A4]">CONSIGNMENT HUD:</span>
                <span className="text-[#F2AE32] font-bold">{selected.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A5A4]">Core Probe:</span>
                <span className="text-rose-400 font-bold">+{selected.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A5A4]">Usable Life:</span>
                <span className="text-[#F2AE32]">{selected.remainingShelfLifeHours} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A5A4]">Original ETA:</span>
                <span className="text-[#A5A5A4]">{selected.originalEta}</span>
              </div>
            </div>

          </div>

          {/* BOTTOM TELEMETRY TIMELINE STRIP */}
          <div className="hairline-t bg-[#06383D] p-3 shrink-0 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-[#A5A5A4]">HISTORICAL EXPOSURE:</span>
                <span className="text-rose-400 font-bold">01h 42m above 7.0°C</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[#A5A5A4]">COMPRESSOR DISCHARGE:</span>
                <span className="text-[#F2AE32] font-bold">218 PSI (Under-pressure)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-[#A5A5A4]">AUTOMATED PROTOCOL:</span>
              <span className="text-[#F2AE32] font-bold">PARETO OPTIMIZATION READY</span>
            </div>
          </div>

        </div>

        {/* RIGHT PANE: AI INCIDENT & RESCUE DECISION PANEL (380px) */}
        <div className="w-96 hairline-l bg-[#06383D] flex flex-col shrink-0">
          
          {/* Header */}
          <div className="p-3 border-b border-[#D0CEC9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              <span className="font-bold text-rose-400">AI INCIDENT PANEL</span>
            </div>
            <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
              CRITICAL EXCURSION
            </span>
          </div>

          {/* Incident Details */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            <div className="p-3 bg-[#06383D] rounded border border-[#D0CEC9] space-y-1.5">
              <div className="text-[10px] text-[#A5A5A4] uppercase">INCIDENT IDENTIFIER</div>
              <div className="text-sm font-bold text-white">#ALT-8849: Thermal Rise Breached Safe Envelope</div>
              <p className="text-[11px] text-[#A5A5A4] font-sans leading-relaxed">
                Core temp reached <strong className="text-rose-400">+9.8°C</strong>. Model predicts enzymatic softening before cargo reaches bonded air freight customs at BOM.
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-[#06383D] rounded border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] text-[10px] block">TEMPERATURE</span>
                <span className="text-rose-400 font-bold text-sm">+9.8°C</span>
                <span className="text-[#A5A5A4] text-[10px] block">Safe: 4–7°C</span>
              </div>
              <div className="p-2.5 bg-[#06383D] rounded border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] text-[10px] block">SHELF LIFE</span>
                <span className="text-[#F2AE32] font-bold text-sm">19.5h</span>
                <span className="text-[#A5A5A4] text-[10px] block">ETA: 24.1h</span>
              </div>
              <div className="p-2.5 bg-[#06383D] rounded border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] text-[10px] block">VALUE AT RISK</span>
                <span className="text-white font-bold text-sm">{selected.economicValue}</span>
                <span className="text-[#A5A5A4] text-[10px] block">100% Export loss</span>
              </div>
              <div className="p-2.5 bg-[#06383D] rounded border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] text-[10px] block">RISK SCORE</span>
                <span className="text-rose-400 font-bold text-sm">84 / 100</span>
                <span className="text-[#A5A5A4] text-[10px] block">Critical alert</span>
              </div>
            </div>

            {/* AI Recommendation Highlight */}
            <div className="p-4 rounded border border-[#F2AE32]/40 bg-[#06383D]/30 space-y-2">
              <div className="flex items-center gap-1.5 text-[#F2AE32] font-bold text-[11px]">
                <Zap className="h-3.5 w-3.5 fill-current" />
                AI RECOMMENDATION
              </div>
              <h4 className="text-sm font-semibold text-white">DIVERT TO MAHAD COLD STORAGE HUB</h4>
              <p className="text-[11px] text-[#A5A5A4] font-sans leading-relaxed">
                Divert vehicle 18km to Mahad Agro Hub. Bay 4 is pre-cooled to 3.8°C. Preserves 93% of consignment export value.
              </p>

              <div className="hairline-t pt-2 space-y-1 text-[10px] text-[#A5A5A4]">
                <div className="flex justify-between">
                  <span>Estimated Cargo Survival:</span>
                  <span className="text-[#16803C] font-bold">93%</span>
                </div>
                <div className="flex justify-between">
                  <span>Economic Value Protected:</span>
                  <span className="text-white font-bold">₹48,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Divert Arrival Time:</span>
                  <span className="text-[#F2AE32]">15:40 IST (In 45 mins)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Execution Footer (Review / Approve / Reject) */}
          <div className="p-3 border-t border-[#D0CEC9] bg-[#06383D] space-y-2 shrink-0">
            {isRescueApproved || selected.status === 'Rerouted' ? (
              <div className="p-3 rounded bg-[#06383D]/60 border border-[#16803C]/40 text-[#16803C] text-center font-bold text-xs">
                RESCUE PLAN APPROVED & DISPATCHED
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIsRescueApproved(true);
                    onApplyRescueAction('Divert to Mahad Cold Hub');
                  }}
                  className="flex-1 py-2.5 rounded bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#292D2F] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="h-4 w-4" />
                  Approve Divert
                </button>
                <button
                  onClick={() => setIsRescueApproved(false)}
                  className="px-3 py-2.5 rounded border border-[#D0CEC9] text-[#A5A5A4] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
