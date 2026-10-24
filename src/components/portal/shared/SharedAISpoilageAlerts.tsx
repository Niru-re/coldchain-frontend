import React from 'react';
import { AlertTriangle, Sparkles, Clock, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

export interface SpoilageAlertItem {
  id: string;
  severity: 'low' | 'medium' | 'critical';
  title: string;
  affectedItem: string; // e.g. "Batch LOT-AGRO-701", "Reefer CC-REEFER-01", "Wagon #14"
  timeRemainingHours: number;
  temperatureDrift: string;
  spoilageRiskPercent: number;
  recommendedAction: string;
  sourceModel: string;
}

export const DEFAULT_SPOILAGE_ALERTS: SpoilageAlertItem[] = [
  {
    id: 'ALT-701',
    severity: 'critical',
    title: 'Thermal Core Drift Detected (+4.2°C Above Setpoint)',
    affectedItem: 'Consignment LOT-AGRO-701',
    timeRemainingHours: 3.5,
    temperatureDrift: '+4.2°C',
    spoilageRiskPercent: 88,
    recommendedAction: 'Trigger Cold Hub Emergency Diversion (Apex Cold Hub - 14km)',
    sourceModel: 'Gemini Bio-Thermal Predictive v2.4',
  },
  {
    id: 'ALT-402',
    severity: 'medium',
    title: 'Humidity Elevation in Reefer Bay 2',
    affectedItem: 'Reefer Unit CC-REEFER-04',
    timeRemainingHours: 7.2,
    temperatureDrift: '+1.5°C',
    spoilageRiskPercent: 42,
    recommendedAction: 'Inspect secondary compressor airflow vents at next checkpoint',
    sourceModel: 'Gemini Bio-Thermal Predictive v2.4',
  },
];

interface Props {
  alerts?: SpoilageAlertItem[];
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse' | string;
  portalType?: string;
  onExecuteRescue?: (alertId: string) => void;
}

export const SharedAISpoilageAlerts: React.FC<Props> = ({
  alerts = DEFAULT_SPOILAGE_ALERTS,
  role = 'truck',
  onExecuteRescue,
}) => {
  const activeAlerts = alerts && alerts.length > 0 ? alerts : DEFAULT_SPOILAGE_ALERTS;
  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F2AE32]/20 flex items-center justify-center text-[#F2AE32]">
            <Sparkles className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#292D2F]">AI Spoilage & Thermal Risk Monitor</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                SIMULATED PREDICTIVE MODEL
              </span>
            </div>
            <p className="text-xs text-[#A5A5A4] font-mono">
              Real-time thermal decay curve modeling & preventive diversion alerts
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#06383D]">
          {activeAlerts.length} Active Monitored Assets
        </span>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {activeAlerts.map((alert) => {
          const isCritical = alert.severity === 'critical';
          const isMed = alert.severity === 'medium';

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all ${
                isCritical
                  ? 'bg-red-50/70 border-red-300 shadow-2xs'
                  : isMed
                  ? 'bg-amber-50/70 border-amber-300'
                  : 'bg-[#F0EEEA]/60 border-[#D0CEC9]'
              } space-y-3`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      isCritical
                        ? 'bg-red-600 text-white'
                        : isMed
                        ? 'bg-[#F2AE32] text-[#292D2F]'
                        : 'bg-[#06383D] text-white'
                    }`}>
                      {alert.severity} Risk
                    </span>
                    <span className="text-xs font-mono font-bold text-[#292D2F]">
                      {alert.affectedItem}
                    </span>
                    <span className="text-[10px] font-mono text-[#A5A5A4]">
                      ID: {alert.id}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#292D2F]">{alert.title}</h4>
                </div>

                {/* Spoilage Risk Gauge */}
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#A5A5A4] block">SPOILAGE PROBABILITY</span>
                  <span className={`text-xl font-black font-mono ${
                    isCritical ? 'text-red-600' : isMed ? 'text-amber-700' : 'text-[#16803C]'
                  }`}>
                    {alert.spoilageRiskPercent}%
                  </span>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono bg-white/80 p-2.5 rounded-lg border border-[#D0CEC9]/60">
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">SURVIVAL CLOCK</span>
                  <span className="font-bold text-[#292D2F] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#F2AE32]" />
                    {alert.timeRemainingHours}h Safe Window
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">TEMP DRIFT RATE</span>
                  <span className="font-bold text-[#06383D]">
                    {alert.temperatureDrift}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">PREDICTIVE ENGINE</span>
                  <span className="font-medium text-[#A5A5A4] truncate block">
                    {alert.sourceModel}
                  </span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-[#292D2F] font-medium flex items-center gap-1.5">
                  <span className="font-bold text-[#06383D]">AI Recommendation:</span>
                  {alert.recommendedAction}
                </p>

                {onExecuteRescue && (
                  <button
                    onClick={() => onExecuteRescue(alert.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>Execute Recovery Protocol</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
