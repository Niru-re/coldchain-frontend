import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Fuel, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Download,
  FileSpreadsheet,
  Calendar,
  Filter,
  Thermometer,
  Layers
} from 'lucide-react';
import { 
  ANALYTICS_ON_TIME_TREND, 
  ANALYTICS_FLEET_UTILIZATION, 
  ANALYTICS_CORRIDOR_VOLUME,
  ANALYTICS_EFFICIENCY 
} from '../data/ftlData';

const DONUT_DATA = [
  { name: 'Pharmaceuticals & Biologics', value: 42, color: '#06383D' },
  { name: 'Specialty Dairy & Butter', value: 28, color: '#F2AE32' },
  { name: 'Marine Export & Seafood', value: 18, color: '#16803C' },
  { name: 'High-Value Agro & Berries', value: 12, color: '#A5A5A4' },
];

const COST_BREAKDOWN = [
  { category: 'Main Engine Diesel (CAN-Bus)', amount: '₹48,20,000', pct: 58 },
  { category: 'Auxiliary Reefer Generator Diesel', amount: '₹14,50,000', pct: 18 },
  { category: 'Expressway & FASTag Tolls', amount: '₹9,80,000', pct: 12 },
  { category: 'Depot Pre-Cooling & Plug-In Energy', amount: '₹5,40,000', pct: 7 },
  { category: 'Preventative Compressor Maintenance', amount: '₹4,10,000', pct: 5 },
];

export const AnalyticsPage: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [reportRange, setReportRange] = useState<'30d' | '90d' | 'ytd'>('30d');

  const handleExportCSV = () => {
    const csvContent = [
      'ColdChain 360 - Operational & Financial Audit Report',
      `Generated: ${new Date().toISOString()}`,
      '',
      'Metric,Value,Status,Benchmark',
      'On-Time Delivery SLA,94.7%,Optimal,94.0% SLA Target',
      'Cold-Chain Temperature Compliance,99.2%,Compliant,98.5% Target',
      'Total Fleet Reefer Volume,3850 Tons,Optimal,+14.2% MoM',
      'Average Deadhead Mileage,-34.2%,Savings,Industry Avg: 18%',
      '',
      'Cost Category,Amount (INR),Budget Percentage',
      ...COST_BREAKDOWN.map((c) => `"${c.category}",${c.amount},${c.pct}%`),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ColdChain360-Audit-Report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto font-sans bg-[#F0EEEA]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              Reports & Analytics
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              OPERATIONAL AUDIT
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Delivery performance reports &bull; Cold-chain temperature compliance &bull; Transportation cost audits &bull; Export data
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center bg-white rounded-xl border border-[#D0CEC9] p-1">
            {(['30d', '90d', 'ytd'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setReportRange(range)}
                className={`px-3 py-1 rounded-lg uppercase cursor-pointer ${
                  reportRange === range ? 'bg-[#06383D] text-white font-bold' : 'text-[#A5A5A4] hover:text-[#292D2F]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 font-mono text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F2AE32]" />
            <span>EXPORT CSV REPORT</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono text-[#16803C] font-bold flex items-center justify-between">
          <span>✓ ColdChain 360 Comprehensive Audit CSV generated and downloaded successfully.</span>
        </div>
      )}

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">MONTHLY TONNAGE</div>
          <div className="text-3xl font-black text-[#292D2F] mt-1 font-sans">3,850 T</div>
          <div className="text-[#16803C] text-[11px] mt-1 font-semibold">+14.2% MoM Expansion</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">TEMP COMPLIANCE</div>
          <div className="text-3xl font-black text-[#06383D] mt-1 font-sans">99.2%</div>
          <div className="text-[#16803C] text-[11px] mt-1 font-semibold">Exceeds Pharma GDP Spec</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">ON-TIME SLA RATE</div>
          <div className="text-3xl font-black text-[#F2AE32] mt-1 font-sans">94.7%</div>
          <div className="text-[#A5A5A4] text-[11px] mt-1 font-semibold">Exceeds 94% Contract SLA</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#D0CEC9] shadow-xs">
          <div className="text-[10px] text-[#A5A5A4] uppercase font-bold">AVG TURNAROUND</div>
          <div className="text-3xl font-black text-[#292D2F] mt-1 font-sans">13.6h</div>
          <div className="text-[#06383D] text-[11px] mt-1 font-semibold">-4.2h faster vs industry</div>
        </div>
      </div>

      {/* Chart Rows: On-Time Delivery Performance + Commodity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
        
        {/* On-Time SLA Trend (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#292D2F]">
                ON-TIME DELIVERY SLA PERFORMANCE
              </span>
              <p className="text-xs text-[#A5A5A4] mt-0.5">Weekly completion percentage vs 94.0% contractual benchmark</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-[#16803C] text-xs font-bold border border-emerald-200">
              TARGET EXCEEDED
            </span>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_ON_TIME_TREND}>
                <defs>
                  <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06383D" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#06383D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0DED9" />
                <XAxis dataKey="week" stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis domain={[85, 100]} stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D0CEC9', borderRadius: '10px', fontFamily: 'monospace', fontSize: '11px' }} 
                  itemStyle={{ color: '#06383D', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sla" stroke="#06383D" strokeWidth={2.5} fillOpacity={1} fill="url(#colorOnTime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Commodity Distribution (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-[#D0CEC9] bg-white p-6 space-y-4 shadow-xs flex flex-col justify-between">
          <div className="border-b border-[#D0CEC9] pb-3">
            <span className="text-xs uppercase font-bold text-[#292D2F]">
              CARGO SENSITIVITY BREAKDOWN
            </span>
            <p className="text-xs text-[#A5A5A4] mt-0.5">Consignment category share</p>
          </div>

          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DONUT_DATA} innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {DONUT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D0CEC9', borderRadius: '10px', fontFamily: 'monospace', fontSize: '11px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {DONUT_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#A5A5A4]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="truncate max-w-[170px]">{item.name}</span>
                </div>
                <span className="font-bold text-[#292D2F]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Transportation Cost Reports Breakdown */}
      <div className="rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-8 space-y-4 shadow-xs font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-4">
          <div>
            <h2 className="text-base font-black text-[#292D2F] uppercase font-sans">
              TRANSPORTATION & COLD-ENERGY COST AUDIT REPORT
            </h2>
            <p className="text-xs text-[#A5A5A4]">Aggregated expenditures across propulsion diesel, reefer compressor fuel, and express tolls.</p>
          </div>
          <span className="text-xs font-bold text-[#06383D]">TOTAL BUDGET: ₹81,90,000 / MO</span>
        </div>

        <div className="space-y-3">
          {COST_BREAKDOWN.map((cost, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs text-[#292D2F]">
                <span>{cost.category}</span>
                <span className="font-bold">{cost.amount} ({cost.pct}%)</span>
              </div>
              <div className="w-full bg-[#F0EEEA] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#06383D] h-full rounded-full"
                  style={{ width: `${cost.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corridor Freight Volume Bar Chart */}
      <div className="rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-8 space-y-4 shadow-xs font-mono">
        <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-[#292D2F]">
              MONTHLY TONNAGE BY PRIMARY COLD CORRIDOR
            </span>
            <p className="text-xs text-[#A5A5A4] mt-0.5">West-Central, Golden Quadrilateral, and Northern industrial corridors</p>
          </div>
          <span className="text-xs font-bold text-[#06383D]">METRIC TONS</span>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ANALYTICS_CORRIDOR_VOLUME}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0DED9" />
              <XAxis dataKey="corridor" stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
              <YAxis stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D0CEC9', borderRadius: '10px', fontFamily: 'monospace', fontSize: '11px' }} 
                itemStyle={{ color: '#06383D', fontWeight: 'bold' }}
              />
              <Bar dataKey="volumeTons" fill="#06383D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
