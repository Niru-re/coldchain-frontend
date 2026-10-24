import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Settings, 
  Database, 
  Key, 
  Activity, 
  Server, 
  CheckCircle2, 
  Sliders,
  Radio,
  FileCheck2,
  Lock,
  Search,
  Filter,
  Download,
  Terminal
} from 'lucide-react';

export const DenseAdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'sensors' | 'compliance' | 'audit' | 'fleet'>('rules');
  const [searchQuery, setSearchQuery] = useState('');

  const rulesData = [
    {
      id: 'POL-01',
      category: 'Biologics & mRNA',
      trigger: 'Temperature > -65.0°C for > 15m',
      action: 'Emergency hospital courier dispatch + cryo-refrigerant dump',
      compliance: 'WHO GDP / 21 CFR Part 11',
      status: 'Active',
    },
    {
      id: 'POL-02',
      category: 'Horticulture & Produce',
      trigger: 'Temperature > 7.0°C for > 45m',
      action: 'Trigger Pareto Rescue Solver (Divert to nearest pre-chilled hub)',
      compliance: 'APEDA / GlobalGAP',
      status: 'Active',
    },
    {
      id: 'POL-03',
      category: 'Seafood Brine',
      trigger: 'Temperature > 1.0°C for > 30m',
      action: 'Air freight tarmac prioritization + direct market auction',
      compliance: 'FDA Seafood HACCP',
      status: 'Active',
    },
    {
      id: 'POL-04',
      category: 'Sensor Telemetry',
      trigger: 'Core temp spike with normal engine load',
      action: 'Trigger Sensor Truth Engine validation before driver alert',
      compliance: 'Hardware ECDSA P-256',
      status: 'Active',
    },
  ];

  const auditLogs = [
    {
      timestamp: '2026-10-05 14:32:01 IST',
      actor: 'AI_RESCUE_BRAIN (Pareto Solver)',
      event: 'AUTONOMOUS_DIVERT_RECOMMENDED',
      target: 'Consignment #CC-1048 (Ratnagiri Mangoes)',
      sha256: '9a7b8e1f0c2a...4e1d90f2',
      status: 'EXECUTED',
    },
    {
      timestamp: '2026-10-05 13:18:44 IST',
      actor: 'ARRHENIUS_KINETICS_MODEL',
      event: 'DYNAMIC_SHELF_LIFE_EXCURSION',
      target: 'Consignment #CC-1048 (Temp +7.2°C)',
      sha256: '2c1f98b2aa10...33e4501a',
      status: 'CONFIRMED',
    },
    {
      timestamp: '2026-10-05 12:00:00 IST',
      actor: 'CRYOLINK_TELEMATICS_NODE',
      event: 'HIGH_SPEED_RAIL_CHECKPOINT',
      target: 'Consignment #CC-2210 (Frankfurt Rail Yard)',
      sha256: 'ff41391a998c...77b102ce',
      status: 'NOMINAL',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#06383D] text-[#F0EEEA] flex flex-col font-mono text-xs">
      
      {/* Top Admin Header */}
      <div className="hairline-b bg-[#06383D] px-4 py-3 sm:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Server className="h-5 w-5 text-[#F2AE32]" />
          <div>
            <h1 className="text-sm font-semibold text-white">ColdChain 360 Enterprise Governance & Telematics Root</h1>
            <p className="text-[11px] text-[#A5A5A4]">Policy Rules, Hardware Cryptography, GDP Audits & API Gateways</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-[#16803C] font-bold bg-[#06383D]/20 border border-[#16803C]/30 px-2 py-0.5 rounded">
            API SYSTEM HEALTH: 99.99%
          </span>
          <span className="text-[#A5A5A4]">ACTIVE RULES: <strong>24 POLICIES</strong></span>
        </div>
      </div>

      {/* Main Admin Two-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <div className="w-64 hairline-r bg-[#06383D] p-3 space-y-1 shrink-0">
          <div className="text-[10px] text-[#A5A5A4] uppercase px-3 py-1">ADMINISTRATION DIRECTORY</div>
          
          <button
            onClick={() => setActiveTab('rules')}
            className={`w-full text-left p-2.5 rounded transition-colors flex items-center gap-2.5 ${
              activeTab === 'rules' ? 'bg-[#06383D]/90 text-[#F2AE32] font-semibold border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-white'
            }`}
          >
            <Sliders className="h-4 w-4" />
            Risk Rules & Policies
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`w-full text-left p-2.5 rounded transition-colors flex items-center gap-2.5 ${
              activeTab === 'compliance' ? 'bg-[#06383D]/90 text-[#F2AE32] font-semibold border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-white'
            }`}
          >
            <FileCheck2 className="h-4 w-4" />
            GDP & FDA Validation
          </button>

          <button
            onClick={() => setActiveTab('sensors')}
            className={`w-full text-left p-2.5 rounded transition-colors flex items-center gap-2.5 ${
              activeTab === 'sensors' ? 'bg-[#06383D]/90 text-[#F2AE32] font-semibold border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-white'
            }`}
          >
            <Radio className="h-4 w-4" />
            IoT Mesh Gateways
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full text-left p-2.5 rounded transition-colors flex items-center gap-2.5 ${
              activeTab === 'audit' ? 'bg-[#06383D]/90 text-[#F2AE32] font-semibold border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-white'
            }`}
          >
            <Database className="h-4 w-4" />
            SHA-256 Audit Trails
          </button>
        </div>

        {/* Right Content Area: Dense Enterprise Tables & Filters */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#D0CEC9] pb-3">
                <div>
                  <h2 className="text-base font-medium text-white">Dynamic AI Risk Engine Configurations</h2>
                  <p className="text-[#A5A5A4] text-[11px] mt-0.5">Automated excursion detection limits and rescue trigger protocols</p>
                </div>
                <button className="px-3 py-1.5 rounded bg-[#F2AE32] text-[#292D2F] font-bold hover:bg-[#F2AE32]/85 transition-colors">
                  + Add New Rule Policy
                </button>
              </div>

              {/* Data Table */}
              <div className="border border-[#D0CEC9] rounded overflow-hidden bg-[#06383D]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#D0CEC9] bg-[#06383D] text-[10px] text-[#A5A5A4]">
                      <th className="p-3">RULE ID</th>
                      <th className="p-3">CATEGORY</th>
                      <th className="p-3">THERMAL TRIGGER CONDITION</th>
                      <th className="p-3">AUTONOMOUS ACTION</th>
                      <th className="p-3">COMPLIANCE</th>
                      <th className="p-3">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0CEC9]/20 text-[11px]">
                    {rulesData.map(r => (
                      <tr key={r.id} className="hover:bg-[#E8E6E2]/10">
                        <td className="p-3 font-bold text-[#F2AE32]">{r.id}</td>
                        <td className="p-3 text-white">{r.category}</td>
                        <td className="p-3 text-rose-300 font-semibold">{r.trigger}</td>
                        <td className="p-3 text-[#A5A5A4]">{r.action}</td>
                        <td className="p-3 text-[#A5A5A4]">{r.compliance}</td>
                        <td className="p-3">
                          <span className="text-[#16803C] bg-[#06383D] px-2 py-0.5 rounded border border-[#16803C]/40 text-[10px]">
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="border-b border-[#D0CEC9] pb-3">
                <h2 className="text-base font-medium text-white">Global Regulatory Compliance Verification</h2>
                <p className="text-[#A5A5A4] text-[11px] mt-0.5">Certifications and digital signatures validating ColdChain 360 telemetry integrity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded bg-[#06383D] border border-[#D0CEC9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">FDA 21 CFR Part 11</span>
                    <span className="text-[#16803C] text-[10px] font-bold">VALIDATED</span>
                  </div>
                  <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
                    Electronic records and digital signatures with audit trail protection. Retained for 7 years on WORM storage.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#06383D] border border-[#D0CEC9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">EU GDP (2013/C 343/01)</span>
                    <span className="text-[#16803C] text-[10px] font-bold">COMPLIANT</span>
                  </div>
                  <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
                    Good Distribution Practice continuous temperature mapping during road and rail transits across Europe.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#06383D] border border-[#D0CEC9] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">HACCP & Codex</span>
                    <span className="text-[#16803C] text-[10px] font-bold">CERTIFIED</span>
                  </div>
                  <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
                    Hazard Analysis Critical Control Point monitoring for high-value agricultural perishables and seafood.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sensors' && (
            <div className="space-y-4">
              <div className="border-b border-[#D0CEC9] pb-3">
                <h2 className="text-base font-semibold text-white">IoT Mesh & Telematics Gateways</h2>
                <p className="text-[#A5A5A4] text-[11px]">4,812 connected BLE probes, CAN-bus transmitters, and LEO satellite uplinks</p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">TOTAL HARDWARE NODES</span>
                  <span className="text-2xl font-bold text-[#F2AE32]">4,812</span>
                </div>
                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">PACKET LOSS RATE</span>
                  <span className="text-2xl font-bold text-[#16803C]">0.003%</span>
                </div>
                <div className="p-4 bg-[#06383D] rounded border border-[#D0CEC9]">
                  <span className="text-[#A5A5A4] block text-[10px]">BATTERY CRITICAL (&lt;10%)</span>
                  <span className="text-2xl font-bold text-white">0 Units</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="border-b border-[#D0CEC9] pb-3">
                <h2 className="text-base font-semibold text-white">Immutable SHA-256 Audit Logs</h2>
                <p className="text-[#A5A5A4] text-[11px]">Cryptographic execution trail proving non-tampered decision provenance</p>
              </div>

              <div className="border border-[#D0CEC9] rounded overflow-hidden bg-[#06383D]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#D0CEC9] bg-[#06383D] text-[10px] text-[#A5A5A4]">
                      <th className="p-3">TIMESTAMP</th>
                      <th className="p-3">ACTOR / ENGINE</th>
                      <th className="p-3">EVENT TYPE</th>
                      <th className="p-3">TARGET OBJECT</th>
                      <th className="p-3">SHA-256 HASH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D0CEC9]/20 text-[11px]">
                    {auditLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#E8E6E2]/10">
                        <td className="p-3 text-[#A5A5A4]">{log.timestamp}</td>
                        <td className="p-3 text-[#F2AE32] font-bold">{log.actor}</td>
                        <td className="p-3 text-white">{log.event}</td>
                        <td className="p-3 text-[#A5A5A4]">{log.target}</td>
                        <td className="p-3 text-[#A5A5A4]">{log.sha256}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
