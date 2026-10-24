import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Thermometer, 
  Radio, 
  Compass, 
  RefreshCw,
  Zap,
  Lock,
  Battery,
  Layers
} from 'lucide-react';
import { Shipment } from '../types';

interface DigitalTwinProps {
  shipment: Shipment;
}

export const DigitalTwin: React.FC<DigitalTwinProps> = ({ shipment }) => {
  const [activeZone, setActiveZone] = useState<'front' | 'middle' | 'rear'>('rear');
  const [telemetrySimMode, setTelemetrySimMode] = useState<boolean>(false);

  // Sensor reading checks
  const isTempExcursion = shipment.temperature > shipment.maxTemp;

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-[#0a0e17] p-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0CEC9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-[#F2AE32]/10 border border-[#F2AE32]/30 text-[#F2AE32]">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">Active Cargo Digital Twin</h3>
            <p className="text-[11px] text-[#A5A5A4]">Real-time biothermal model mapped to IoT multi-sensor array</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono bg-[#06383D] border border-[#D0CEC9] px-2.5 py-1 rounded">
            <span className="h-2 w-2 rounded-full bg-[#F2AE32] animate-ping" />
            <span className="text-[#F2AE32]">BLE 5.2 MESH SYNCED</span>
          </div>
          <button 
            onClick={() => setTelemetrySimMode(!telemetrySimMode)}
            className="text-[11px] font-mono text-[#A5A5A4] hover:text-white px-2 py-1 rounded border border-[#D0CEC9]"
          >
            {telemetrySimMode ? 'Mode: Telemetry Stress' : 'Mode: Live Telemetry'}
          </button>
        </div>
      </div>

      {/* Main 2.5D Reefer Box Visualization */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Visual Diagram: Cross section of reefer container */}
        <div className="lg:col-span-7 bg-[#05070c] border border-[#D0CEC9] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <span>Container Model: Carrier Vector 1550 Multitemp</span>
            <span>·</span>
            <span>ID: ISO-RF-8890</span>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            {/* Visual Reefer Container Shell */}
            <div className="relative border-2 border-[#D0CEC9] rounded-lg p-3 bg-[#06383D]/90 shadow-2xl">
              
              {/* Front Cooling Unit Evaporator */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-24 bg-[#06383D] rounded-l border border-[#F2AE32]/30 flex items-center justify-center">
                <div className="text-[8px] font-mono -rotate-90 text-white tracking-widest uppercase font-bold">REEFER</div>
              </div>

              {/* Airflow Circulation Arrow indicators */}
              <div className="flex items-center justify-between px-4 pb-2 border-b border-dashed border-[#D0CEC9] text-[10px] font-mono text-[#F2AE32]/70">
                <span>◀ Cold Air Delivery Chute (4.2°C)</span>
                <span className="animate-pulse">Air Velocity: 3.2 m/s</span>
                <span>Return Air Bulkhead ▶</span>
              </div>

              {/* Three Thermal Compartments */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2">
                
                {/* Front Bay */}
                <div 
                  onClick={() => setActiveZone('front')}
                  className={`p-3 rounded border text-left cursor-pointer transition-all ${
                    activeZone === 'front' 
                      ? 'border-[#F2AE32] bg-[#06383D]/20 ring-1 ring-[#F2AE32]/30' 
                      : 'border-[#D0CEC9] bg-[#06383D]/90 hover:border-[#D0CEC9]'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#A5A5A4]">
                    <span>ZONE A (FRONT)</span>
                    <span className="text-[#16803C]">4.8°C</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#292D2F]">12 Pallets</div>
                  <p className="text-[10px] text-[#A5A5A4] mt-1">Direct airflow inlet. Uniform temperature distribution.</p>
                </div>

                {/* Middle Bay */}
                <div 
                  onClick={() => setActiveZone('middle')}
                  className={`p-3 rounded border text-left cursor-pointer transition-all ${
                    activeZone === 'middle' 
                      ? 'border-[#F2AE32] bg-[#06383D]/20 ring-1 ring-[#F2AE32]/30' 
                      : 'border-[#D0CEC9] bg-[#06383D]/90 hover:border-[#D0CEC9]'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#A5A5A4]">
                    <span>ZONE B (CENTER)</span>
                    <span className="text-[#16803C]">5.4°C</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#292D2F]">14 Pallets</div>
                  <p className="text-[10px] text-[#A5A5A4] mt-1">Core payload. Stable humidity at 88%.</p>
                </div>

                {/* Rear Bay (Affected Zone) */}
                <div 
                  onClick={() => setActiveZone('rear')}
                  className={`p-3 rounded border text-left cursor-pointer transition-all ${
                    activeZone === 'rear' 
                      ? 'border-rose-500 bg-rose-950/40 ring-1 ring-rose-500/50' 
                      : 'border-rose-900/50 bg-rose-950/20 hover:border-rose-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-rose-400 font-semibold">
                    <span>ZONE C (REAR)</span>
                    <span className="text-rose-400 animate-pulse">{shipment.temperature}°C</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-rose-200">10 Pallets (HOTSPOT)</div>
                  <p className="text-[10px] text-rose-300 mt-1">Rear door seal thermal bypass detected.</p>
                </div>

              </div>

              {/* Rear Door Seal Sensor */}
              <div className="mt-3 pt-2 border-t border-[#D0CEC9] flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <Lock className="h-3 w-3 text-[#F2AE32]" />
                  <span className="text-[#A5A5A4]">Electronic Cargo Seal:</span>
                  <span className="text-[#16803C] font-semibold">{shipment.doorStatus}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="h-3 w-3 text-[#A5A5A4]" />
                  <span className="text-[#A5A5A4]">IoT Battery:</span>
                  <span className="text-[#F2AE32] font-semibold">{shipment.batteryLevel}%</span>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[#A5A5A4] font-mono">
            <span>Dynamic Biothermal Enthalpy Model: <strong>Active</strong></span>
            <span className="text-[#F2AE32]">32 Sub-lot RFID tags tracked</span>
          </div>
        </div>

        {/* Right Telemetry Truth Engine */}
        <div className="lg:col-span-5 space-y-3">
          
          <div className="p-4 rounded-xl bg-[#06383D]/90 border border-[#D0CEC9]">
            <div className="flex items-center justify-between pb-2 border-b border-[#D0CEC9]">
              <span className="text-xs font-semibold text-[#292D2F]">Multi-Sensor Validation</span>
              <span className="text-[10px] font-mono text-[#F2AE32] bg-[#06383D] px-2 py-0.5 rounded border border-[#06383D]/30">
                CONFIDENCE: 98.7%
              </span>
            </div>

            <div className="mt-3 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] flex items-center gap-1.5">
                  <Thermometer className="h-3.5 w-3.5 text-[#F2AE32]" /> Core Flesh Temp Probe
                </span>
                <span className="text-[#292D2F] font-semibold">{shipment.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] flex items-center gap-1.5">
                  <Radio className="h-3.5 w-3.5 text-indigo-400" /> Relative Humidity
                </span>
                <span className="text-[#292D2F] font-semibold">{shipment.humidity}% RH</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5 text-[#16803C]" /> 3-Axis Shock & Vibration
                </span>
                <span className="text-[#16803C] font-semibold">{shipment.shockG} G (Nominal)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#F2AE32]" /> Photometric Light Exposure
                </span>
                <span className="text-[#292D2F] font-semibold">{shipment.lightLux} Lux (Zero Ingress)</span>
              </div>
            </div>
          </div>

          {/* Sensor Truth Engine Rationale */}
          <div className="p-3.5 rounded-xl bg-[#06383D]/20 border border-[#F2AE32]/30 text-xs">
            <div className="flex items-center gap-2 text-[#F2AE32] font-semibold mb-1">
              <ShieldCheck className="h-4 w-4 text-[#F2AE32]" />
              Sensor Truth Engine: Verified Genuine
            </div>
            <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
              Cross-checked against CAN-bus engine RPM, alternator load, and 5G cell-tower ambient climate data. Anomaly is genuine reefer thermal excursion, not a sensor calibration drift.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
