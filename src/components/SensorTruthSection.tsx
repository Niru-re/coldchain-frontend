import React, { useState } from 'react';
import { 
  Cpu, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  Compass, 
  Lock, 
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export const SensorTruthSection: React.FC = () => {
  const [anomalyResolved, setAnomalyResolved] = useState<boolean>(false);

  return (
    <section className="py-24 border-b border-subtle bg-[#05070a] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            TELEMETRY REASONING ENGINE
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Separating true thermal failure from sensor glitch.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            A single faulty temperature probe can cause thousands in false alarms. ColdChain 360 cross-examines multiple independent telemetry streams to establish ground truth before triggering fleet action.
          </p>
        </div>

        {/* Anomaly Investigation Split Workspace */}
        <div className="border border-subtle bg-[#080d14] rounded-lg p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500">ENGINEERING DIAGNOSTIC WORKBENCH</span>
              <h3 className="text-base font-medium text-white">Sensor Inconsistency Incident #S-INC-9402</h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#A5A5A4]">AI CONFIDENCE:</span>
              <span className="text-[#F2AE32] font-bold bg-[#06383D]/20 border border-[#06383D]/30 px-2 py-0.5 rounded">
                87.4% TRUTH VERIFIED
              </span>
            </div>
          </div>

          {/* Telemetry Stream Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            
            {/* Stream 1: GPS */}
            <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-2">
              <div className="flex items-center justify-between text-[#A5A5A4]">
                <span>GPS TELEMATICS</span>
                <Compass className="h-4 w-4 text-[#F2AE32]" />
              </div>
              <div className="text-base font-bold text-slate-100">MOVING (68 km/h)</div>
              <p className="text-[11px] text-[#A5A5A4] font-sans">
                Corridor: NH-66 near Khed. Vehicle in active transit.
              </p>
            </div>

            {/* Stream 2: Temp Sensor Probe */}
            <div className="p-4 bg-[#05070a] rounded border border-rose-900/60 space-y-2">
              <div className="flex items-center justify-between text-[#A5A5A4]">
                <span>BLE TEMP SENSOR #3</span>
                <Thermometer className="h-4 w-4 text-rose-400" />
              </div>
              <div className="text-base font-bold text-rose-400">+18.2°C (ALARM)</div>
              <p className="text-[11px] text-[#A5A5A4] font-sans">
                Single probe reports severe heat spike. Expected 4–7°C.
              </p>
            </div>

            {/* Stream 3: CAN-Bus Engine Telemetry */}
            <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-2">
              <div className="flex items-center justify-between text-[#A5A5A4]">
                <span>CAN-BUS ENGINE TELEMETRY</span>
                <Activity className="h-4 w-4 text-[#16803C]" />
              </div>
              <div className="text-base font-bold text-[#16803C]">REEFER ACTIVE & CHILLING</div>
              <p className="text-[11px] text-[#A5A5A4] font-sans">
                Alternator load 85A. Compressor clutch engaged at 280 PSI.
              </p>
            </div>

            {/* Stream 4: Electronic Door Seal */}
            <div className="p-4 bg-[#05070a] rounded border border-subtle space-y-2">
              <div className="flex items-center justify-between text-[#A5A5A4]">
                <span>DOOR SEAL ELECTRONICS</span>
                <Lock className="h-4 w-4 text-[#16803C]" />
              </div>
              <div className="text-base font-bold text-[#16803C]">SEALED & LOCKED</div>
              <p className="text-[11px] text-[#A5A5A4] font-sans">
                Zero tamper signal. Zero light ingress detected (0 Lux).
              </p>
            </div>

          </div>

          {/* AI Truth Deduction Box */}
          <div className="hairline-t pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#F2AE32]" />
                <span className="text-xs font-mono uppercase text-[#A5A5A4]">SENSOR TRUTH ENGINE SYNTHESIS:</span>
              </div>
              <h4 className="text-lg font-medium text-white">
                Inconsistency Identified: Localized Probe Calibration Drift
              </h4>
              <p className="text-xs text-[#A5A5A4] leading-relaxed font-normal">
                While BLE Sensor #3 reports +18.2°C, probes #1 and #2 report +5.1°C and +5.4°C, consistent with refrigeration telemetry drawing 85A and sealed door locks. The algorithm isolates probe #3 as physically dislodged during highway vibration, preventing an unnecessary $1,200 emergency truck dispatch.
              </p>
            </div>

            <div className="md:col-span-4 bg-[#05070a] p-4 rounded border border-subtle space-y-3 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase">PROBABLE ROOT CAUSES</div>
              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">1. Dislodged Probe Placement:</span>
                <span className="text-[#F2AE32] font-bold">87%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-subtle">
                <span className="text-[#A5A5A4]">2. Cooling Unit Failure:</span>
                <span className="text-[#A5A5A4]">9%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#A5A5A4]">3. Door Thermal Bypass:</span>
                <span className="text-[#A5A5A4]">4%</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
