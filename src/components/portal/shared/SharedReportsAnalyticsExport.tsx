import React, { useState } from 'react';
import { BarChart3, Download, FileSpreadsheet, FileText, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

interface MetricStat {
  label: string;
  value: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
}

export const DEFAULT_STATS: MetricStat[] = [
  { label: 'Thermal Integrity Rate', value: '99.4%', subtext: '+0.3% vs benchmark', trend: 'up' },
  { label: 'Total Tonnes Dispatched', value: '1,420 MT', subtext: '94 consignments', trend: 'up' },
  { label: 'Avg Spoilage Index', value: '0.08%', subtext: '-0.12% reduction', trend: 'down' },
  { label: 'e-POD Compliance', value: '100%', subtext: 'Zero unresolved disputes', trend: 'up' },
];

export const DEFAULT_LOGS = [
  { timestamp: '14:20:12 IST', event: 'Cold chain compliance certificate #CC-AUD-8802 signed', status: 'Compliant' },
  { timestamp: '11:05:44 IST', event: 'Automatic temperature drift correction acknowledged', status: 'Resolved' },
  { timestamp: '08:45:10 IST', event: 'Dispatch thermal baseline check passed for Unit CC-04', status: 'Verified' },
];

interface Props {
  portalTitle?: string;
  portalName?: string;
  portalType?: string;
  periodLabel?: string;
  stats?: MetricStat[];
  recentLogs?: { timestamp: string; event: string; status: string }[];
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse' | string;
}

export const SharedReportsAnalyticsExport: React.FC<Props> = ({
  portalTitle,
  portalName,
  portalType,
  periodLabel = 'Current Month (MTD)',
  stats = DEFAULT_STATS,
  recentLogs = DEFAULT_LOGS,
  role = 'truck',
}) => {
  const title = portalTitle || portalName || (portalType ? `${portalType.charAt(0).toUpperCase() + portalType.slice(1)} Operations` : 'Operations');
  const activeStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const activeLogs = recentLogs && recentLogs.length > 0 ? recentLogs : DEFAULT_LOGS;
  const [downloading, setDownloading] = useState<'pdf' | 'csv' | null>(null);

  const handleDownload = (format: 'pdf' | 'csv') => {
    setDownloading(format);
    setTimeout(() => {
      setDownloading(null);
      alert(`Export Complete: ${title} ${periodLabel} summary downloaded in .${format.toUpperCase()} format.`);
    }, 1000);
  };

  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            <BarChart3 className="w-4 h-4 text-[#F2AE32]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#292D2F]">{title} · Analytics & Regulatory Audit</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                AUDIT COMPLIANT
              </span>
            </div>
            <p className="text-xs text-[#A5A5A4] font-mono">
              Period: {periodLabel} · National Perishable Logistics Standards (NPLS) Certified
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload('csv')}
            disabled={downloading !== null}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D0CEC9] bg-white hover:bg-[#F0EEEA] text-[#292D2F] text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#16803C]" />
            <span>{downloading === 'csv' ? 'Exporting...' : 'Export CSV'}</span>
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            disabled={downloading !== null}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>{downloading === 'pdf' ? 'Generating...' : 'Export PDF Dossier'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeStats.map((stat, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-[#F0EEEA]/60 border border-[#D0CEC9] space-y-1 font-mono">
            <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">{stat.label}</span>
            <div className="text-2xl font-black text-[#06383D]">{stat.value}</div>
            <div className="text-[11px] text-[#16803C] flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>{stat.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#292D2F] font-mono block">Recent Immutable Audit Events:</span>
        <div className="rounded-lg border border-[#D0CEC9] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F0EEEA] text-[#292D2F] border-b border-[#D0CEC9]">
              <tr>
                <th className="py-2 px-3 font-bold">TIMESTAMP</th>
                <th className="py-2 px-3 font-bold">LOGGED EVENT</th>
                <th className="py-2 px-3 font-bold text-right">REGULATORY STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0DED9] bg-white">
              {activeLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-[#F0EEEA]/40 transition-colors">
                  <td className="py-2 px-3 text-[#A5A5A4]">{log.timestamp}</td>
                  <td className="py-2 px-3 font-medium text-[#292D2F]">{log.event}</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
