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
  Maximize2
} from 'lucide-react';
import { Shipment } from '../types';
import { RescueEngineModal } from './RescueEngineModal';
import { DigitalTwin } from './DigitalTwin';
import { CounterfactualSimulator } from './CounterfactualSimulator';
import { mockWarehouses, mockFleet } from '../data/mockData';

interface OperationsTowerProps {
  shipments: Shipment[];
  selectedShipmentId: string;
  onSelectShipment: (id: string) => void;
  onApplyRescueAction: (actionTitle: string) => void;
}

export const OperationsTower: React.FC<OperationsTowerProps> = ({
  shipments,
  selectedShipmentId,
  onSelectShipment,
  onApplyRescueAction,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rescue' | 'digitaltwin' | 'simulator' | 'fleet'>('overview');
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'biologics' | 'produce'>('all');

  const selectedShipment = shipments.find(s => s.id === selectedShipmentId) || shipments[0];

  const filteredShipments = shipments.filter(s => {
    if (filterMode === 'critical') return s.riskScore > 60 || s.status === 'Critical Alert';
    if (filterMode === 'biologics') return s.category === 'Biologics' || s.category === 'Pharmaceuticals';
    if (filterMode === 'produce') return s.category === 'Fresh Produce' || s.category === 'Seafood';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#06383D] text-[#F0EEEA] flex flex-col">
      
      {/* Sub-header Operations Status Bar */}
      <div className="border-b border-[#D0CEC9] bg-[#06383D] px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2AE32] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2AE32]"></span>
              </span>
              <span className="font-semibold text-white">GLOBAL FLEET CONTROL TOWER</span>
            </div>
            <span className="text-[#D0CEC9]">|</span>
            <span className="text-xs text-[#A5A5A4] font-mono hidden md:inline">
              1,248 Active Transits · 4 Modes · 99.82% Cold Chain Integrity
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-5 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="text-[#A5A5A4]">At-Risk Cargo:</span>
              <span className="text-rose-400 font-bold bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded">
                1 Consignment (#CC-1048)
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="text-[#A5A5A4]">Avg Shelf-Life Retained:</span>
              <span className="text-[#16803C] font-bold">94.6%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Shipment Roster + Center Operations Stage */}
      <div className="mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Shipment Roster & Filter */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4 flex flex-col h-full shadow-lg">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#D0CEC9]">
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#F2AE32]" />
                Active Monitored Cargo
              </h2>
              <span className="text-xs font-mono text-[#A5A5A4] bg-[#06383D] px-2 py-0.5 rounded border border-[#D0CEC9]">
                {filteredShipments.length} Active
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex gap-1.5 my-3 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  filterMode === 'all' 
                    ? 'bg-[#F2AE32]/20 text-[#F2AE32] border border-[#F2AE32]/30' 
                    : 'text-[#A5A5A4] hover:text-white bg-[#06383D] border border-[#D0CEC9]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('critical')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all flex items-center gap-1 ${
                  filterMode === 'critical' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                    : 'text-[#A5A5A4] hover:text-white bg-[#06383D] border border-[#D0CEC9]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                Critical Excursions
              </button>
              <button
                onClick={() => setFilterMode('biologics')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  filterMode === 'biologics' 
                    ? 'bg-[#06383D]/40 text-[#F2AE32] border border-[#F2AE32]/30' 
                    : 'text-[#A5A5A4] hover:text-white bg-[#06383D] border border-[#D0CEC9]'
                }`}
              >
                Biologics
              </button>
            </div>

            {/* Shipment Cards List */}
            <div className="space-y-2.5 overflow-y-auto max-h-[720px] pr-1">
              {filteredShipments.map(s => {
                const isSelected = s.id === selectedShipment.id;
                const isCrit = s.riskScore > 60;
                return (
                  <div
                    key={s.id}
                    onClick={() => onSelectShipment(s.id)}
                    className={`cursor-pointer rounded-lg p-3.5 border transition-all text-left ${
                      isSelected
                        ? 'border-[#F2AE32] bg-[#06383D]/90 shadow-md shadow-[#F2AE32]/20'
                        : isCrit
                        ? 'border-rose-800/80 bg-rose-950/20 hover:border-rose-700'
                        : 'border-[#D0CEC9]/60 bg-[#06383D]/40 hover:border-[#D0CEC9] hover:bg-[#06383D]/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-white">#{s.id}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#E8E6E2]/20 text-[#A5A5A4] border border-[#D0CEC9]">
                          {s.mode}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isCrit ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' : 'bg-[#16803C]/10 text-[#16803C] border border-[#16803C]/20'
                      }`}>
                        {s.riskLevel.toUpperCase()}
                      </span>
                    </div>

                    <h4 className="text-xs font-medium text-white mt-2 truncate">{s.commodity}</h4>
                    <p className="text-[11px] text-[#A5A5A4] truncate mt-0.5">
                      {s.origin.split(',')[0]} → {s.destination.split(',')[0]}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#D0CEC9]/40 flex items-center justify-between text-[11px] font-mono">
                      <div>
                        <span className="text-[#A5A5A4] block text-[10px]">TEMP</span>
                        <span className={`font-semibold ${s.temperature > s.maxTemp ? 'text-rose-400' : 'text-[#F2AE32]'}`}>
                          {s.temperature > 0 ? `+${s.temperature}` : s.temperature}°C
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="text-[#A5A5A4] block text-[10px]">SHELF LIFE</span>
                        <span className={`font-semibold ${s.remainingShelfLifeHours < 24 ? 'text-[#F2AE32]' : 'text-[#16803C]'}`}>
                          {s.remainingShelfLifeHours}h
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[#A5A5A4] block text-[10px]">ETA</span>
                        <span className="text-[#A5A5A4]">{s.eta.split('·')[1] || s.eta}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Active Mission Operations Center */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          
          {/* Active Shipment Banner */}
          <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-5 shadow-lg">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-wider font-semibold">Active Consignment Mission</span>
                  <span className="text-[#D0CEC9]">·</span>
                  <span className="text-xs font-mono text-[#A5A5A4]">{selectedShipment.trackingNumber}</span>
                  <span className="text-[#D0CEC9]">·</span>
                  <span className="text-xs text-[#A5A5A4]">{selectedShipment.category}</span>
                </div>
                <h1 className="text-xl font-bold text-white tracking-tight mt-1">
                  {selectedShipment.commodity}
                </h1>
                <p className="text-xs text-[#A5A5A4] mt-1 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-[#F2AE32]" />
                  Currently at: <strong className="text-white">{selectedShipment.currentLocation}</strong>
                </p>
              </div>

              {/* Top Quick Status Tags */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="p-2 rounded-lg bg-[#06383D] border border-[#D0CEC9] text-center min-w-24">
                  <span className="text-[10px] text-[#A5A5A4] font-mono block">TEMP TOLERANCE</span>
                  <span className="text-xs font-mono font-bold text-white">
                    {selectedShipment.minTemp}°C to {selectedShipment.maxTemp}°C
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#06383D] border border-[#D0CEC9] text-center min-w-24">
                  <span className="text-[10px] text-[#A5A5A4] font-mono block">EST. VALUE</span>
                  <span className="text-xs font-mono font-bold text-[#16803C]">
                    {selectedShipment.economicValue}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-[#06383D] border border-[#D0CEC9] text-center min-w-24">
                  <span className="text-[10px] text-[#A5A5A4] font-mono block">RISK INDEX</span>
                  <span className={`text-xs font-mono font-bold ${selectedShipment.riskScore > 60 ? 'text-rose-400' : 'text-[#16803C]'}`}>
                    {selectedShipment.riskScore} / 100
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs across Operations sub-engines */}
            <div className="mt-6 flex flex-wrap gap-2 border-b border-[#D0CEC9] pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'overview'
                    ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#D0CEC9]'
                    : 'text-[#A5A5A4] hover:text-white'
                }`}
              >
                Telemetry & Waypoints
              </button>

              {selectedShipment.aiAlert && (
                <button
                  onClick={() => setActiveTab('rescue')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeTab === 'rescue'
                      ? 'bg-rose-950/70 text-rose-300 border border-rose-500/50'
                      : 'text-rose-400 hover:bg-rose-950/30'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  AI Rescue Engine
                </button>
              )}

              <button
                onClick={() => setActiveTab('digitaltwin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'digitaltwin'
                    ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#D0CEC9]'
                    : 'text-[#A5A5A4] hover:text-white'
                }`}
              >
                Cargo Digital Twin
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#D0CEC9]'
                    : 'text-[#A5A5A4] hover:text-white'
                }`}
              >
                Counterfactual Simulator
              </button>
            </div>

            {/* Tab 1: Overview & Waypoint Route Radar */}
            {activeTab === 'overview' && (
              <div className="mt-5 space-y-6">
                
                {/* Visual Multimodal Waypoints Progress */}
                <div>
                  <h3 className="text-xs font-semibold text-[#A5A5A4] uppercase tracking-wider font-mono mb-3">
                    Multimodal Corridor Transit Sequence
                  </h3>
                  <div className="relative flex flex-col md:flex-row justify-between gap-4">
                    {selectedShipment.waypoints.map((wp, idx) => (
                      <div key={idx} className="flex-1 flex items-start gap-3 relative">
                        <div className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                          wp.completed 
                            ? 'bg-[#F2AE32]/20 text-[#F2AE32] border border-[#F2AE32]/50' 
                            : wp.current
                            ? 'bg-[#F2AE32]/20 text-[#F2AE32] border border-[#F2AE32]/60 ring-2 ring-[#F2AE32]/30 animate-pulse'
                            : 'bg-[#06383D] text-[#D0CEC9] border border-[#D0CEC9]'
                        }`}>
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono uppercase text-[#A5A5A4] block">{wp.type}</span>
                          <h4 className="text-xs font-medium text-white truncate">{wp.name}</h4>
                          {wp.timestamp && (
                            <span className="text-[10px] text-[#A5A5A4] font-mono block mt-0.5">{wp.timestamp}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Temperature & Ambient Heat Graph */}
                <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs font-semibold text-white">Thermal Excursion vs Safe Envelope</h4>
                      <p className="text-[11px] text-[#A5A5A4]">Cargo core temperature measured against exterior ambient asphalt stress</p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono">
                      <span className="flex items-center gap-1.5 text-[#F2AE32]">
                        <span className="h-2 w-2 rounded-full bg-[#F2AE32]" /> Cargo Temp
                      </span>
                      <span className="flex items-center gap-1.5 text-[#A5A5A4]">
                        <span className="h-2 w-2 rounded-full bg-[#A5A5A4]" /> Ambient Temp
                      </span>
                    </div>
                  </div>

                  {/* Synthetic bar chart for cross-platform stability */}
                  <div className="grid grid-cols-5 gap-2 h-40 items-end border-b border-[#D0CEC9] pb-2">
                    {selectedShipment.temperatureHistory.map((th, i) => {
                      const isHigh = th.temp > th.safeMax;
                      const heightPct = Math.min(100, Math.max(15, (th.temp / (th.safeMax * 1.6)) * 80));
                      return (
                        <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                          <span className={`text-[10px] font-mono ${isHigh ? 'text-rose-400 font-bold' : 'text-[#A5A5A4]'}`}>
                            {th.temp}°C
                          </span>
                          <div 
                            className={`w-full max-w-[48px] rounded-t transition-all ${
                              isHigh ? 'bg-gradient-to-t from-rose-900 to-rose-500' : 'bg-gradient-to-t from-[#06383D] to-[#F2AE32]'
                            }`}
                            style={{ height: `${heightPct}%` }}
                          />
                          <span className="text-[10px] font-mono text-[#A5A5A4] mt-1">{th.time}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-mono text-[#A5A5A4]">
                    <span>Safe Ceiling: +{selectedShipment.maxTemp}°C</span>
                    <span>Safe Floor: +{selectedShipment.minTemp}°C</span>
                  </div>
                </div>

                {/* Show Rescue Teaser if alert exists */}
                {selectedShipment.aiAlert && (
                  <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-rose-200">Autonomous AI Rescue Recommendation Available</h4>
                        <p className="text-[11px] text-[#A5A5A4]">
                          Thermal leak detected. Divert to Mahad Cold Hub can preserve $48,500 of fresh produce.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('rescue')}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-semibold text-xs transition-colors shrink-0"
                    >
                      Inspect Rescue Plan
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* Tab 2: Rescue Engine */}
            {activeTab === 'rescue' && (
              <div className="mt-5">
                <RescueEngineModal 
                  shipment={selectedShipment} 
                  onApplyRescueAction={onApplyRescueAction} 
                />
              </div>
            )}

            {/* Tab 3: Digital Twin */}
            {activeTab === 'digitaltwin' && (
              <div className="mt-5">
                <DigitalTwin shipment={selectedShipment} />
              </div>
            )}

            {/* Tab 4: Counterfactual Simulator */}
            {activeTab === 'simulator' && (
              <div className="mt-5">
                <CounterfactualSimulator shipment={selectedShipment} />
              </div>
            )}

          </div>

          {/* Connected Infrastructure: Warehouses & Fleet Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Warehouse Nodes */}
            <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4">
              <h3 className="text-xs font-semibold text-[#A5A5A4] font-mono uppercase tracking-wider mb-3">
                Strategic Cold Storage Nodes (Maharashtra Corridor)
              </h3>
              <div className="space-y-2.5">
                {mockWarehouses.map(wh => (
                  <div key={wh.id} className="p-2.5 rounded-lg bg-[#06383D] border border-[#D0CEC9] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{wh.name}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-[#06383D] text-[#16803C] border border-[#16803C]/40">
                          {wh.riskStatus}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A5A5A4] block mt-0.5">{wh.zone}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-[#F2AE32] font-bold block">{wh.currentTemp}°C</span>
                      <span className="text-[10px] text-[#A5A5A4]">{wh.capacityUsedPercentage}% Cap</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet Ready Units */}
            <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4">
              <h3 className="text-xs font-semibold text-[#A5A5A4] font-mono uppercase tracking-wider mb-3">
                Telemetry Fleet Health & Emergency Standby
              </h3>
              <div className="space-y-2.5">
                {mockFleet.map(fl => (
                  <div key={fl.id} className="p-2.5 rounded-lg bg-[#06383D] border border-[#D0CEC9] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{fl.plate}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-[#06383D] text-[#F2AE32] border border-[#D0CEC9]">
                          {fl.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A5A5A4] block mt-0.5">{fl.type} · {fl.location}</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className={`font-bold block ${fl.reeferHealthScore < 70 ? 'text-[#F2AE32]' : 'text-[#16803C]'}`}>
                        {fl.reeferHealthScore}% Health
                      </span>
                      <span className="text-[10px] text-[#A5A5A4]">{fl.compressorPressurePsi} PSI</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
