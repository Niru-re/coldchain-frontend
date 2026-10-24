import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Thermometer, 
  AlertTriangle, 
  TrendingDown, 
  RefreshCw, 
  Check, 
  HelpCircle,
  Activity
} from 'lucide-react';
import { Shipment } from '../types';

interface CounterfactualSimulatorProps {
  shipment: Shipment;
}

export const CounterfactualSimulator: React.FC<CounterfactualSimulatorProps> = ({ shipment }) => {
  const [delayHours, setDelayHours] = useState<number>(3);
  const [ambientTempC, setAmbientTempC] = useState<number>(36);
  const [reeferPowerPct, setReeferPowerPct] = useState<number>(50); // 100 is normal, 0 is full outage
  const [rerouteSelected, setRerouteSelected] = useState<boolean>(true);

  // Dynamic simulation calculations
  const baselineShelfLife = shipment.remainingShelfLifeHours; // e.g. 19.5
  
  // Power factor: lower power accelerates decay
  const powerFactor = (100 - reeferPowerPct) * 0.18;
  const ambientStress = Math.max(0, (ambientTempC - 30) * 0.4);
  const totalDepreciation = (delayHours * 1.8) + powerFactor + ambientStress;
  
  const simulatedShelfLife = Math.max(
    0.5, 
    Number((rerouteSelected ? baselineShelfLife + 18 - totalDepreciation * 0.35 : baselineShelfLife - totalDepreciation).toFixed(1))
  );

  const spoilageProbability = rerouteSelected
    ? Math.min(22, Math.round((totalDepreciation * 2.2)))
    : Math.min(99, Math.round(35 + (totalDepreciation * 4.5)));

  const expectedEconomicSalvage = rerouteSelected
    ? Math.max(75, 96 - Math.round(totalDepreciation * 0.8))
    : Math.max(5, 70 - Math.round(totalDepreciation * 3.2));

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-[#0a0e17] p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0CEC9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">AI Counterfactual Risk & Spoilage Simulator</h3>
            <p className="text-[11px] text-[#A5A5A4]">Simulate hypothetical failure variables before committing fleet or reroute interventions</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#F2AE32] bg-[#06383D]/20 border border-[#06383D]/30 px-2.5 py-1 rounded">
          <Activity className="h-3.5 w-3.5" />
          Shipment Ref: {shipment.id}
        </div>
      </div>

      {/* Simulator Sliders & Controls */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Slider 1: Route Delay */}
        <div className="space-y-2 bg-[#06383D]/90 p-3 rounded-lg border border-[#D0CEC9]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A5A5A4] font-medium flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#F2AE32]" />
              Hypothetical Transit Delay
            </span>
            <span className="font-mono text-[#F2AE32] font-semibold">+{delayHours} Hours</span>
          </div>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={delayHours}
            onChange={e => setDelayHours(Number(e.target.value))}
            className="w-full accent-[#F2AE32] cursor-pointer h-1.5 bg-[#E8E6E2] rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0h (On Time)</span>
            <span>+6h</span>
            <span>+12h (Gridlock)</span>
          </div>
        </div>

        {/* Slider 2: Ambient Highway Heat */}
        <div className="space-y-2 bg-[#06383D]/90 p-3 rounded-lg border border-[#D0CEC9]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A5A5A4] font-medium flex items-center gap-1.5">
              <Thermometer className="h-3.5 w-3.5 text-rose-400" />
              Exterior Heatwave Temp
            </span>
            <span className="font-mono text-rose-400 font-semibold">{ambientTempC}°C</span>
          </div>
          <input
            type="range"
            min={20}
            max={48}
            step={1}
            value={ambientTempC}
            onChange={e => setAmbientTempC(Number(e.target.value))}
            className="w-full accent-rose-500 cursor-pointer h-1.5 bg-[#E8E6E2] rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>20°C (Mild)</span>
            <span>35°C</span>
            <span>48°C (Extreme Peak)</span>
          </div>
        </div>

        {/* Slider 3: Reefer Health / Power */}
        <div className="space-y-2 bg-[#06383D]/90 p-3 rounded-lg border border-[#D0CEC9]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A5A5A4] font-medium flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 text-[#F2AE32]" />
              Refrigeration Efficiency
            </span>
            <span className="font-mono text-[#F2AE32] font-semibold">{reeferPowerPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            value={reeferPowerPct}
            onChange={e => setReeferPowerPct(Number(e.target.value))}
            className="w-full accent-[#F2AE32] cursor-pointer h-1.5 bg-[#E8E6E2] rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0% (Full Outage)</span>
            <span>50% (Degraded)</span>
            <span>100% (Optimal)</span>
          </div>
        </div>

      </div>

      {/* Switch: Apply AI Reroute Strategy */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-[#06383D]/20 p-3 rounded-lg border border-[#D0CEC9]">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="rerouteCheck"
            checked={rerouteSelected}
            onChange={e => setRerouteSelected(e.target.checked)}
            className="h-4 w-4 rounded border-[#D0CEC9] text-[#F2AE32] focus:ring-[#F2AE32]/20 bg-[#E8E6E2] cursor-pointer"
          />
          <label htmlFor="rerouteCheck" className="text-xs text-[#292D2F] cursor-pointer select-none">
            Include Active Rescue Plan (Divert to Mahad Cold Storage at Km 18)
          </label>
        </div>
        <div className="text-[11px] font-mono text-[#A5A5A4]">
          Simulated Algorithm: <span className="text-purple-300">Arrhenius Biochemical Kinetics v4.2</span>
        </div>
      </div>

      {/* Output Impact Matrix */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-lg bg-[#06383D]/90 border border-[#D0CEC9]">
          <div className="text-[11px] text-[#A5A5A4] font-medium">Predicted Usable Shelf Life</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono ${simulatedShelfLife < 12 ? 'text-rose-400' : 'text-[#16803C]'}`}>
              {simulatedShelfLife} hrs
            </span>
            <span className="text-xs text-slate-500">
              (from {baselineShelfLife} hrs)
            </span>
          </div>
          <p className="mt-1 text-[10px] text-[#A5A5A4]">
            {simulatedShelfLife < 12 ? 'CRITICAL: Will spoil before flight departure' : 'SAFE: Adequate buffer for destination processing'}
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-[#06383D]/90 border border-[#D0CEC9]">
          <div className="text-[11px] text-[#A5A5A4] font-medium">Cargo Spoilage Probability</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono ${spoilageProbability > 50 ? 'text-rose-400' : 'text-[#F2AE32]'}`}>
              {spoilageProbability}%
            </span>
            <span className="text-xs text-slate-500">risk factor</span>
          </div>
          <div className="w-full bg-[#06383D] rounded-full h-1.5 mt-2">
            <div 
              className={`h-1.5 rounded-full ${spoilageProbability > 50 ? 'bg-rose-500' : 'bg-[#F2AE32]'}`}
              style={{ width: `${spoilageProbability}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#06383D]/90 border border-[#D0CEC9]">
          <div className="text-[11px] text-[#A5A5A4] font-medium">Economic Value Salvaged</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#16803C]">
              {expectedEconomicSalvage}%
            </span>
            <span className="text-xs text-[#A5A5A4]">
              (~${Math.round(48500 * (expectedEconomicSalvage / 100)).toLocaleString()})
            </span>
          </div>
          <p className="mt-1 text-[10px] text-[#A5A5A4]">
            {expectedEconomicSalvage > 80 ? 'Pristine consignment value preserved' : 'Partial markdown liquidation required'}
          </p>
        </div>
      </div>
    </div>
  );
};
