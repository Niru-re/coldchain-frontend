import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Thermometer, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  Building2,
  Navigation
} from 'lucide-react';
import { Shipment } from '../types';

interface RescueSimulationProps {
  shipment: Shipment;
  onApplyRescueAction: (actionTitle: string) => void;
}

export const RescueEngineModal: React.FC<RescueSimulationProps> = ({
  shipment,
  onApplyRescueAction,
}) => {
  const alert = shipment.aiAlert;
  const [selectedActionId, setSelectedActionId] = useState<string>(
    alert?.recommendedActions.find(a => a.recommended)?.id || 'REC-01'
  );
  const [simulationState, setSimulationState] = useState<'idle' | 'simulating' | 'applied'>('idle');
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

  if (!alert) return null;

  const currentAction = alert.recommendedActions.find(a => a.id === selectedActionId) || alert.recommendedActions[0];

  const handleApply = () => {
    setSimulationState('simulating');
    setTimeout(() => {
      setSimulationState('applied');
      setAppliedMessage(`Automated Protocol Executed: "${currentAction.title}". Divert coordinates transmitted to Telematics Unit & Mahad Hub Bay 4.`);
      onApplyRescueAction(currentAction.title);
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-rose-500/30 bg-gradient-to-b from-[#140b12] to-[#0d0e14] p-5 shadow-2xl relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-900/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-rose-400 font-semibold tracking-wider uppercase">Autonomous AI Rescue Engine</span>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-mono text-rose-300 border border-rose-500/30">Action Required</span>
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">{alert.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <span className="text-[#A5A5A4] block text-[11px]">Predicted Loss If Inaction:</span>
            <span className="text-rose-400 font-bold">{alert.predictedLossUsd}</span>
          </div>
          <div className="text-right border-l border-[#D0CEC9] pl-4">
            <span className="text-[#A5A5A4] block text-[11px]">Shelf-Life Limit:</span>
            <span className="text-amber-400 font-bold">{shipment.remainingShelfLifeHours} hrs (ETA: {shipment.eta})</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-[#A5A5A4] leading-relaxed max-w-4xl">
        {alert.description}
      </p>

      {/* Rescue Options Comparison Matrix */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {alert.recommendedActions.map(action => {
          const isSelected = action.id === selectedActionId;
          return (
            <div
              key={action.id}
              onClick={() => setSelectedActionId(action.id)}
              className={`cursor-pointer rounded-lg p-3.5 border transition-all text-left relative flex flex-col justify-between ${
                isSelected 
                  ? 'border-[#F2AE32]/80 bg-[#06383D]/20 shadow-lg shadow-[#06383D]/40' 
                  : 'border-[#D0CEC9] bg-[#06383D]/90 hover:border-[#D0CEC9] hover:bg-[#06383D]'
              }`}
            >
              {action.recommended && (
                <div className="absolute -top-2.5 right-3 bg-[#F2AE32] text-[#292D2F] text-[10px] font-bold font-mono px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  OPTIMAL AI RESCUE
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-[11px] font-mono font-semibold ${isSelected ? 'text-[#F2AE32]' : 'text-[#A5A5A4]'}`}>
                    Option {action.id.replace('REC-', '0')}
                  </span>
                  <span className="text-[11px] font-mono text-[#A5A5A4]">
                    Confidence: <strong className="text-[#16803C]">{action.confidence}%</strong>
                  </span>
                </div>
                <h4 className="font-medium text-xs text-white mt-1 leading-snug">{action.title}</h4>
                <p className="text-[11px] text-[#A5A5A4] mt-2 line-clamp-2 leading-relaxed">{action.description}</p>
              </div>

              {/* Matrix Tradeoffs */}
              <div className="mt-3 pt-3 border-t border-[#D0CEC9]/80 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Shelf-Life Saved:</span>
                  <span className="text-[#16803C] font-semibold">{action.shelfLifePreserved}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Cost Impact:</span>
                  <span className="text-[#A5A5A4]">{action.costDelta}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">ETA Variance:</span>
                  <span className="text-amber-400">{action.etaChange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Carbon Effect:</span>
                  <span className="text-[#A5A5A4]">{action.co2Delta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Action Deep Rationale & Execution Bar */}
      <div className="mt-4 rounded-lg border border-[#D0CEC9] bg-[#090d14] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#292D2F]">Selected Execution Plan:</span>
            <span className="text-xs font-semibold text-[#F2AE32]">{currentAction.title}</span>
          </div>
          <p className="text-xs text-[#A5A5A4]">
            {currentAction.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          {simulationState === 'applied' ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#16803C] bg-[#06383D]/20 border border-[#16803C]/30 px-4 py-2.5 rounded-lg w-full md:w-auto justify-center">
              <CheckCircle2 className="h-4 w-4" />
              Rescue Protocol Dispatched & En Route
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={simulationState === 'simulating'}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#292D2F] font-semibold text-xs px-5 py-2.5 transition-all shadow-lg shadow-[#F2AE32]/20 hover:shadow-[#F2AE32]/30 w-full md:w-auto cursor-pointer disabled:opacity-50"
            >
              {simulationState === 'simulating' ? (
                <>
                  <div className="h-3.5 w-3.5 border-2 border-[#292D2F] border-t-transparent rounded-full animate-spin" />
                  Generating Intermodal Handshake...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-current" />
                  Approve & Execute Rescue Divert
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {appliedMessage && (
        <div className="mt-3 p-3 rounded-md bg-[#06383D]/20 border border-[#16803C]/40 text-xs text-[#16803C] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-[#16803C] shrink-0" />
          <span>{appliedMessage}</span>
        </div>
      )}
    </div>
  );
};
