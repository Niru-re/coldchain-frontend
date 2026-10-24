import React from 'react';
import { 
  Cpu, 
  Database, 
  Activity, 
  Radio, 
  Cloud, 
  ShieldCheck, 
  Server, 
  ArrowDown, 
  Terminal,
  Zap
} from 'lucide-react';

export const PlatformArchitectureSection: React.FC = () => {
  return (
    <section className="py-24 border-b border-subtle bg-[#070b10] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-14">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            SYSTEMS TOPOLOGY
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            High-throughput cold telemetry data fabric.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            An end-to-end distributed architecture built to ingest millions of asynchronous IoT packets, establish sensor truth, compute dynamic shelf-life models, and trigger automated rescue actions.
          </p>
        </div>

        {/* Systems Diagram Flow */}
        <div className="border border-subtle bg-[#05070a] rounded-lg p-6 sm:p-10 space-y-8">
          
          {/* LAYER 1: SENSORY INGESTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A4] border-b border-subtle pb-2">
              <span className="flex items-center gap-2 text-[#F2AE32] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#F2AE32]" />
                LAYER 01: MULTI-STREAM SENSORY INGESTION & HARDWARE EDGE
              </span>
              <span>MQTT / CoAP / BLE 5.2 / LEO Satellite</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Core Flesh Probes</span>
                <span className="text-[10px] text-slate-500">±0.05°C accuracy</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">CAN-Bus Reefer</span>
                <span className="text-[10px] text-slate-500">Compressor & alternator</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">LEO Satellite Mesh</span>
                <span className="text-[10px] text-slate-500">Tarmac & high seas</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Electronic Seals</span>
                <span className="text-[10px] text-slate-500">Door tamper & lux</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Warehouse ERP</span>
                <span className="text-[10px] text-slate-500">FEFO dock allocation</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Highway Weather</span>
                <span className="text-[10px] text-slate-500">Asphalt radiant heat</span>
              </div>
            </div>
          </div>

          {/* CONNECTOR ARROW */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* LAYER 2: TELEMETRY DATA FABRIC & SENSOR TRUTH */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A4] border-b border-subtle pb-2">
              <span className="flex items-center gap-2 text-[#A5A5A4] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#A5A5A4]" />
                LAYER 02: TELEMETRY FABRIC & SENSOR TRUTH VERIFICATION
              </span>
              <span>Apache Kafka / TimescaleDB / ECDSA P-256 Signatures</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-[#080d14] rounded border border-subtle">
                <span className="text-[#292D2F] font-semibold block">Sensor Truth Engine</span>
                <p className="text-[11px] text-[#A5A5A4] font-sans mt-1">Cross-correlates thermal rise with engine RPM and door sensors to discard false drifts.</p>
              </div>
              <div className="p-3.5 bg-[#080d14] rounded border border-subtle">
                <span className="text-[#292D2F] font-semibold block">Immutable Telemetry Ledger</span>
                <p className="text-[11px] text-[#A5A5A4] font-sans mt-1">Cryptographically hashed sensor logs for FDA 21 CFR Part 11 and EU GDP validation.</p>
              </div>
              <div className="p-3.5 bg-[#080d14] rounded border border-subtle">
                <span className="text-[#292D2F] font-semibold block">Digital Twin State Sync</span>
                <p className="text-[11px] text-[#A5A5A4] font-sans mt-1">2.5D container compartment spatial temperature interpolation updated every 15s.</p>
              </div>
            </div>
          </div>

          {/* CONNECTOR ARROW */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* LAYER 3: PREDICTIVE & DECISION REASONING ENGINES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A4] border-b border-subtle pb-2">
              <span className="flex items-center gap-2 text-amber-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                LAYER 03: PREDICTIVE BIOCHEMICAL & RESCUE REASONING
              </span>
              <span>Arrhenius Kinetics Engine / Multi-Objective Pareto Solver</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-[#F2AE32] font-semibold block">Dynamic Shelf-Life</span>
                <span className="text-[10px] text-[#A5A5A4]">Continuous usable life decay</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-rose-400 font-semibold block">Future Failure Radar</span>
                <span className="text-[10px] text-[#A5A5A4]">90-min excursion forecast</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-amber-400 font-semibold block">AI Rescue Engine</span>
                <span className="text-[10px] text-[#A5A5A4]">Evaluates 5 diversion options</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-[#F2AE32] font-semibold block">Sell-Before-Spoil</span>
                <span className="text-[10px] text-[#A5A5A4]">Dynamic wholesale liquidation</span>
              </div>
            </div>
          </div>

          {/* CONNECTOR ARROW */}
          <div className="flex justify-center text-slate-600">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* LAYER 4: OPERATIONAL SURFACES */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#A5A5A4] border-b border-subtle pb-2">
              <span className="flex items-center gap-2 text-[#F2AE32] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#F2AE32]" />
                LAYER 04: OPERATIONAL COMMAND SURFACES
              </span>
              <span>Real-Time WebSockets / Dispatch Webhooks / Escrow Smart Contracts</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Global Control Tower</span>
                <span className="text-[10px] text-slate-500">24/7 Operations Room</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Producer Portal</span>
                <span className="text-[10px] text-slate-500">Direct farmer payout & escrow</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Vehicle Telematics API</span>
                <span className="text-[10px] text-slate-500">In-cab re-route dispatch</span>
              </div>
              <div className="p-3 bg-[#080d14] rounded border border-subtle text-center">
                <span className="text-[#292D2F] block font-semibold">Enterprise Admin</span>
                <span className="text-[10px] text-slate-500">RBAC, rules & compliance audit</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
