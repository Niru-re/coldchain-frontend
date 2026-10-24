import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Settings, 
  FileText, 
  Database, 
  Key, 
  Activity, 
  Server, 
  Bell, 
  CheckCircle2, 
  Sliders,
  Radio,
  FileCheck2,
  Lock,
  Cpu,
  Layers
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'rules' | 'users' | 'iot' | 'compliance' | 'audit'>('rules');

  return (
    <div className="min-h-screen bg-[#06383D] text-[#F0EEEA] flex flex-col">
      
      {/* Top Administration Nav */}
      <div className="border-b border-[#D0CEC9] bg-[#06383D] px-4 py-3 sm:px-6">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#06383D]/20 border border-[#F2AE32]/30 text-[#F2AE32]">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">ColdChain 360 Enterprise Administration</span>
                <span className="rounded bg-[#06383D]/20 px-2 py-0.5 text-[10px] font-mono text-[#F2AE32] border border-[#F2AE32]/30">
                  Root Admin
                </span>
              </div>
              <p className="text-[11px] text-[#A5A5A4]">System Governance, Risk Engine Policies, IoT Mesh & Audit Logs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-[#16803C] animate-pulse" />
            <span className="text-[#A5A5A4]">API GATEWAYS: 99.99% HEALTHY</span>
          </div>
        </div>
      </div>

      {/* Main Admin layout */}
      <div className="mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Navigation Links */}
        <div className="lg:col-span-3 space-y-1 bg-[#06383D] border border-[#D0CEC9] p-3 rounded-xl h-fit">
          <button
            onClick={() => setActiveSection('rules')}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'rules' ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#F2AE32]/40' : 'text-[#A5A5A4] hover:text-white hover:bg-[#E8E6E2]/50'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Risk Rules & Temperature Thresholds
          </button>
          <button
            onClick={() => setActiveSection('iot')}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'iot' ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#F2AE32]/40' : 'text-[#A5A5A4] hover:text-white hover:bg-[#E8E6E2]/50'
            }`}
          >
            <Radio className="h-4 w-4" />
            IoT Gateway & Sensor Calibration
          </button>
          <button
            onClick={() => setActiveSection('compliance')}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'compliance' ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#F2AE32]/40' : 'text-[#A5A5A4] hover:text-white hover:bg-[#E8E6E2]/50'
            }`}
          >
            <FileCheck2 className="h-4 w-4" />
            GDP & FDA 21 CFR Part 11 Compliance
          </button>
          <button
            onClick={() => setActiveSection('users')}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'users' ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#F2AE32]/40' : 'text-[#A5A5A4] hover:text-white hover:bg-[#E8E6E2]/50'
            }`}
          >
            <Users className="h-4 w-4" />
            RBAC & Role Permissions
          </button>
          <button
            onClick={() => setActiveSection('audit')}
            className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeSection === 'audit' ? 'bg-[#06383D]/90 text-[#F2AE32] border border-[#F2AE32]/40' : 'text-[#A5A5A4] hover:text-white hover:bg-[#E8E6E2]/50'
            }`}
          >
            <Database className="h-4 w-4" />
            Immutable Audit Trail Logs
          </button>
        </div>

        {/* Right Side: Section Details */}
        <div className="lg:col-span-9 bg-[#06383D] border border-[#D0CEC9] p-6 rounded-xl shadow-xl">
          
          {activeSection === 'rules' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
                <div>
                  <h2 className="text-base font-semibold text-white">Dynamic AI Risk Engine Configurations</h2>
                  <p className="text-xs text-[#A5A5A4]">Configure excursion trigger limits and automatic AI rescue dispatch protocols</p>
                </div>
                <button className="px-3 py-1.5 rounded bg-[#F2AE32] hover:bg-[#F2AE32]/85 text-xs font-medium text-[#292D2F] transition-colors">
                  Save Policy
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#06383D]/60 border border-[#D0CEC9] space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium text-white">
                    <span>Pharma & Biologics Tolerance Envelope</span>
                    <span className="font-mono text-[#F2AE32]">-70°C Cryo / +2°C to +8°C</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="text-[#A5A5A4] block">Excursion Time Limit before Emergency Escalation</label>
                    <input type="text" defaultValue="15 minutes continuous" className="w-full bg-[#06383D] border border-[#D0CEC9] rounded px-2.5 py-1.5 text-white text-xs" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A5A5A4]">
                    <input type="checkbox" defaultChecked className="rounded bg-[#E8E6E2]" />
                    <span>Auto-dispatch backup cryo-carrier if compressor drops below -65°C</span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#06383D]/60 border border-[#D0CEC9] space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium text-white">
                    <span>Fresh Horticultural Produce Envelope</span>
                    <span className="font-mono text-[#F2AE32]">+2.0°C to +7.0°C</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <label className="text-[#A5A5A4] block">Arrhenius Shelf-Life Depletion Ratio Limit</label>
                    <input type="text" defaultValue="2.5x standard decay rate" className="w-full bg-[#06383D] border border-[#D0CEC9] rounded px-2.5 py-1.5 text-white text-xs" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#A5A5A4]">
                    <input type="checkbox" defaultChecked className="rounded bg-[#E8E6E2]" />
                    <span>Trigger 'Sell-Before-Spoil' auction when remaining shelf life &lt; 24h</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'compliance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
                <h2 className="text-base font-semibold text-white">Global Regulatory Compliance Verification</h2>
                <span className="text-xs font-mono text-[#16803C] bg-[#06383D]/20 border border-[#16803C]/30 px-2 py-0.5 rounded">
                  100% AUDIT READY
                </span>
              </div>
              <p className="text-xs text-[#A5A5A4]">
                ColdChain 360 generates cryptographically sealed electronic signatures and temperature records meeting strict international standards:
              </p>

              <div className="space-y-2 mt-3 text-xs">
                <div className="p-3 rounded-lg bg-[#06383D]/50 border border-[#D0CEC9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#16803C]" />
                    <div>
                      <span className="font-semibold text-white">FDA 21 CFR Part 11</span>
                      <p className="text-[11px] text-[#A5A5A4]">Electronic records, digital signatures, and audit trail retention</p>
                    </div>
                  </div>
                  <span className="text-[#16803C] font-mono text-[11px]">CERTIFIED VALIDATED</span>
                </div>

                <div className="p-3 rounded-lg bg-[#06383D]/50 border border-[#D0CEC9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#16803C]" />
                    <div>
                      <span className="font-semibold text-white">EU GDP (Good Distribution Practice 2013/C 343/01)</span>
                      <p className="text-[11px] text-[#A5A5A4]">Continuous temperature mapping in vehicles and pharmaceutical distribution hubs</p>
                    </div>
                  </div>
                  <span className="text-[#16803C] font-mono text-[11px]">CERTIFIED VALIDATED</span>
                </div>

                <div className="p-3 rounded-lg bg-[#06383D]/50 border border-[#D0CEC9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#16803C]" />
                    <div>
                      <span className="font-semibold text-white">HACCP & Codex Alimentarius</span>
                      <p className="text-[11px] text-[#A5A5A4]">Hazard Analysis Critical Control Point monitoring for perishable foodstuffs</p>
                    </div>
                  </div>
                  <span className="text-[#16803C] font-mono text-[11px]">ACTIVE COMPLIANCE</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'iot' && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-white border-b border-[#D0CEC9] pb-3">IoT Telematics & Device Mesh</h2>
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-3 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">CONNECTED SENSORS</span>
                  <span className="text-lg font-bold text-[#F2AE32]">4,812</span>
                </div>
                <div className="p-3 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">PACKET LOSS RATE</span>
                  <span className="text-lg font-bold text-[#16803C]">0.003%</span>
                </div>
                <div className="p-3 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">BATTERY CRITICAL (&lt;10%)</span>
                  <span className="text-lg font-bold text-[#A5A5A4]">0 devices</span>
                </div>
              </div>
              <p className="text-xs text-[#A5A5A4] mt-2">
                All sensory streams authenticated using asymmetric elliptic curve cryptography (ECDSA P-256) at the hardware secure element layer.
              </p>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-white border-b border-[#D0CEC9] pb-3">Enterprise Access & RBAC Directory</h2>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-[#06383D] border border-[#D0CEC9] flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">Aditya Kulkarni (VP Operations)</span>
                    <span className="text-[10px] text-[#A5A5A4] block">Global Control Tower Orchestrator · Full Override Permission</span>
                  </div>
                  <span className="font-mono text-[#F2AE32] text-[11px]">Super Admin</span>
                </div>
                <div className="p-2.5 rounded bg-[#06383D] border border-[#D0CEC9] flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white">Dr. Elena Rostova (Chief Quality Officer)</span>
                    <span className="text-[10px] text-[#A5A5A4] block">Biologics & GDP Release Officer · Excursion Sign-off</span>
                  </div>
                  <span className="font-mono text-[#A5A5A4] text-[11px]">Quality Lead</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'audit' && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-white border-b border-[#D0CEC9] pb-3">Immutable Audit Trail (SHA-256 Log)</h2>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 rounded bg-[#06383D] border border-[#D0CEC9] flex items-center justify-between text-[#A5A5A4]">
                  <span>[14:32:01 IST] AI_RESCUE_RECOMMENDED: Shipment #CC-1048 Divert to Mahad</span>
                  <span className="text-[#A5A5A4]">hash: 9a7b...4e1d</span>
                </div>
                <div className="p-2.5 rounded bg-[#06383D] border border-[#D0CEC9] flex items-center justify-between text-[#A5A5A4]">
                  <span>[13:30:19 IST] EXCURSION_FLAGGED: Sensor S-889 Core Temp +7.8°C</span>
                  <span className="text-[#A5A5A4]">hash: 2c1f...98b2</span>
                </div>
                <div className="p-2.5 rounded bg-[#06383D] border border-[#D0CEC9] flex items-center justify-between text-[#A5A5A4]">
                  <span>[12:00:00 IST] CRYOLINK_NOMINAL: Rail corridor Basel-Berlin -71.4°C</span>
                  <span className="text-[#A5A5A4]">hash: ff41...391a</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
