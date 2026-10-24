import React from 'react';
import { Thermometer, Droplets, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export interface TempHumiditySensorData {
  title: string;
  locationOrZone: string;
  currentTemp: number;
  targetTemp: number;
  tempMin: number;
  tempMax: number;
  currentHumidity: number;
  targetHumidity: number;
  humidityMin: number;
  humidityMax: number;
  status: 'optimal' | 'warning' | 'breach';
  ambientTemp?: number;
  ambientHumidity?: number;
  lastUpdated?: string;
  unitLabel?: string; // e.g. "Chamber 1", "Reefer Zone A", "Wagon #12"
}

export const DEFAULT_SENSOR_DATA: TempHumiditySensorData = {
  title: 'Chamber Thermal Array',
  locationOrZone: 'Zone Alpha · Reefer Unit 01',
  currentTemp: 3.8,
  targetTemp: 4.0,
  tempMin: 2.0,
  tempMax: 6.0,
  currentHumidity: 88,
  targetHumidity: 90,
  humidityMin: 85,
  humidityMax: 95,
  status: 'optimal',
  ambientTemp: 32.4,
  ambientHumidity: 65,
  lastUpdated: 'Just now',
  unitLabel: 'Primary Sensor Cluster',
};

interface Props {
  data?: TempHumiditySensorData;
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse' | string;
  onAdjustSetpoint?: () => void;
}

export const SharedTemperatureHumidityMonitor: React.FC<Props> = ({
  data = DEFAULT_SENSOR_DATA,
  role = 'truck',
  onAdjustSetpoint,
}) => {
  const currentData = data || DEFAULT_SENSOR_DATA;
  const isTempBreached = currentData.currentTemp < currentData.tempMin || currentData.currentTemp > currentData.tempMax;
  const isHumidityBreached = currentData.currentHumidity < currentData.humidityMin || currentData.currentHumidity > currentData.humidityMax;

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A5A5A4] font-semibold">
              {currentData.unitLabel || 'Thermal Sensor'}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
              currentData.status === 'optimal'
                ? 'bg-[#16803C]/10 text-[#16803C] border border-[#16803C]/20'
                : currentData.status === 'warning'
                ? 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {currentData.status === 'optimal' ? '● THERMAL OPTIMAL' : currentData.status === 'warning' ? '▲ THERMAL WARN' : '✖ BREACH ALARM'}
            </span>
          </div>
          <h3 className="text-base font-bold text-[#292D2F] mt-0.5">{currentData.title}</h3>
          <p className="text-xs text-[#A5A5A4] font-mono">{currentData.locationOrZone}</p>
        </div>

        {onAdjustSetpoint && (
          <button
            onClick={onAdjustSetpoint}
            className="px-3 py-1.5 rounded-lg border border-[#06383D] text-[#06383D] hover:bg-[#06383D] hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Adjust Setpoint
          </button>
        )}
      </div>

      {/* Main Dual Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Temperature Card */}
        <div className={`p-4 rounded-xl border ${
          isTempBreached ? 'bg-red-50/50 border-red-300' : 'bg-[#F0EEEA]/60 border-[#D0CEC9]'
        } space-y-2`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#A5A5A4] font-medium flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-[#06383D]" />
              CORE TEMPERATURE
            </span>
            <span className="text-[11px] font-mono text-[#06383D] font-bold">
              Target: {currentData.targetTemp}°C
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-[#292D2F] font-mono tracking-tight">
              {currentData.currentTemp > 0 ? `+${currentData.currentTemp.toFixed(1)}` : currentData.currentTemp.toFixed(1)}°C
            </div>
            <div className="text-right text-[11px] font-mono text-[#A5A5A4]">
              <span>Safe: {currentData.tempMin}°C to {currentData.tempMax}°C</span>
            </div>
          </div>

          {/* Bar indicator */}
          <div className="w-full bg-[#D0CEC9] h-2 rounded-full overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-500 ${
                isTempBreached ? 'bg-red-500' : 'bg-[#06383D]'
              }`}
              style={{ width: `${Math.min(100, Math.max(10, ((currentData.currentTemp - currentData.tempMin) / (currentData.tempMax - currentData.tempMin || 1)) * 100))}%` }}
            />
          </div>
        </div>

        {/* Humidity Card */}
        <div className={`p-4 rounded-xl border ${
          isHumidityBreached ? 'bg-amber-50/50 border-amber-300' : 'bg-[#F0EEEA]/60 border-[#D0CEC9]'
        } space-y-2`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#A5A5A4] font-medium flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#0284C7]" />
              RELATIVE HUMIDITY
            </span>
            <span className="text-[11px] font-mono text-[#0284C7] font-bold">
              Target: {currentData.targetHumidity}%
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-black text-[#292D2F] font-mono tracking-tight">
              {currentData.currentHumidity.toFixed(1)}%
            </div>
            <div className="text-right text-[11px] font-mono text-[#A5A5A4]">
              <span>Safe: {currentData.humidityMin}% - {currentData.humidityMax}%</span>
            </div>
          </div>

          {/* Bar indicator */}
          <div className="w-full bg-[#D0CEC9] h-2 rounded-full overflow-hidden relative">
            <div 
              className={`h-full transition-all duration-500 ${
                isHumidityBreached ? 'bg-[#F2AE32]' : 'bg-[#0284C7]'
              }`}
              style={{ width: `${Math.min(100, Math.max(10, currentData.currentHumidity))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Ambient vs Cargo Delta Footer */}
      {currentData.ambientTemp !== undefined && (
        <div className="flex flex-wrap items-center justify-between text-xs font-mono bg-[#F0EEEA] p-2.5 rounded-lg border border-[#D0CEC9] text-[#292D2F]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>Outside Ambient: <strong>+{currentData.ambientTemp}°C</strong> ({(currentData.ambientTemp - currentData.currentTemp).toFixed(1)}°C Thermal Barrier)</span>
          </div>
          <span className="text-[#A5A5A4] text-[10px]">Telemetry Rate: 10s Ping · Modbus/BLE</span>
        </div>
      )}
    </div>
  );
};
