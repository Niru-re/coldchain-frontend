import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Fuel, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANALYTICS_ON_TIME_TREND, ANALYTICS_CORRIDOR_VOLUME } from '../../data/ftlData';

export const LogisticsAnalyticsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sla' | 'volume'>('sla');

  return (
    <section className="relative w-full bg-white py-28 px-6 lg:px-8 border-b border-[#D0CEC9] overflow-hidden">
      {/* Background Subtle Industrial Lines */}
      <div className="absolute inset-0 bg-industrial-grid opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D0CEC9] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#F2AE32] font-mono text-xs uppercase tracking-widest bg-[#F0EEEA] px-3 py-1.5 rounded-full border border-[#D0CEC9] font-bold shadow-2xs">
              <BarChart3 className="w-3.5 h-3.5 text-[#F2AE32]" />
              <span>PREDICTIVE DISPATCH ANALYTICS</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-[#292D2F] tracking-tight uppercase font-sans">
              ENTERPRISE<br />
              <span className="text-[#F2AE32]">
                VELOCITY INTELLIGENCE
              </span>
            </h2>

            <p className="text-[#A5A5A4] text-base leading-relaxed font-medium">
              Real-time statistical synthesis of turnaround cycles, empty haulage elimination, and corridor payload density across 4,200+ monthly hauls.
            </p>
          </div>

          {/* Interactive Switchers */}
          <div className="flex items-center gap-2 bg-[#F0EEEA] p-1.5 rounded-2xl border border-[#D0CEC9] font-mono text-xs">
            <button
              onClick={() => setActiveTab('sla')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'sla'
                  ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              On-Time SLA Rate (%)
            </button>
            <button
              onClick={() => setActiveTab('volume')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'volume'
                  ? 'bg-white text-[#06383D] font-bold shadow-2xs border border-[#D0CEC9]'
                  : 'text-[#A5A5A4] hover:text-[#292D2F]'
              }`}
            >
              Corridor Tonnage (Tons)
            </button>
          </div>
        </div>

        {/* Chart Viewport & Side Telemetry Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Visual Chart Viewport (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgba(6,56,61,0.06)] flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#A5A5A4] font-semibold">TELEMETRY BENCHMARK</span>
                <div className="text-xl font-bold text-[#292D2F] font-sans">
                  {activeTab === 'sla' ? '6-Month Consecutive SLA Progression' : 'Monthly Freight Volume by Major Corridor'}
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16803C] animate-pulse" />
                <span className="text-[#16803C] font-bold">AUDITED LIVE FEED</span>
              </div>
            </div>

            {/* Recharts Light Chart */}
            <div className="w-full h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'sla' ? (
                  <AreaChart data={ANALYTICS_ON_TIME_TREND}>
                    <defs>
                      <linearGradient id="slaGradientLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F2AE32" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#F2AE32" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0DED9" />
                    <XAxis dataKey="month" stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
                    <YAxis domain={[80, 100]} stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} unit="%" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D0CEC9', borderRadius: '12px', fontFamily: 'monospace', fontSize: '12px', boxShadow: '0 8px 24px rgba(6,56,61,0.1)' }}
                      itemStyle={{ color: '#F2AE32', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#F2AE32" strokeWidth={3} fillOpacity={1} fill="url(#slaGradientLight)" />
                  </AreaChart>
                ) : (
                  <BarChart data={ANALYTICS_CORRIDOR_VOLUME}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0DED9" />
                    <XAxis dataKey="corridor" stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
                    <YAxis stroke="#A5A5A4" tick={{ fill: '#A5A5A4', fontSize: 11, fontFamily: 'monospace' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D0CEC9', borderRadius: '12px', fontFamily: 'monospace', fontSize: '12px', boxShadow: '0 8px 24px rgba(6,56,61,0.1)' }}
                      itemStyle={{ color: '#06383D', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="volumeTons" fill="#06383D" radius={[6, 6, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Bottom Chart Footer */}
            <div className="pt-4 border-t border-[#E0DED9] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#A5A5A4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                <span>Audited via GPS timestamps and FASTag electronic toll records</span>
              </div>
              <span className="text-[#292D2F] font-bold">AVG CONFIDENCE: 99.4%</span>
            </div>
          </div>

          {/* Right Column: Key Economic Gains (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            
            <div className="rounded-2xl border border-[#D0CEC9] bg-white p-6 shadow-[0_4px_20px_rgba(6,56,61,0.05)] space-y-3">
              <div className="flex items-center gap-2 text-[#F2AE32] text-xs font-mono uppercase font-bold">
                <Fuel className="w-4 h-4" />
                <span>EMPTY HAULAGE REDUCTION</span>
              </div>
              <div className="text-3xl font-black text-[#292D2F] font-sans">
                -34.2% <span className="text-sm font-normal text-[#A5A5A4]">Deadhead Run</span>
              </div>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                Smart return-load triangulation links inward agricultural freight with outward industrial cargo.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D0CEC9] bg-white p-6 shadow-[0_4px_20px_rgba(6,56,61,0.05)] space-y-3">
              <div className="flex items-center gap-2 text-[#16803C] text-xs font-mono uppercase font-bold">
                <Clock className="w-4 h-4" />
                <span>TRANSIT TURNAROUND GAIN</span>
              </div>
              <div className="text-3xl font-black text-[#16803C] font-sans">
                +4.2 hrs <span className="text-sm font-normal text-[#A5A5A4]">Faster Turn</span>
              </div>
              <p className="text-xs text-[#A5A5A4] leading-relaxed">
                Autonomous dock pre-check-in eliminates gatehouse staging queues at JNPT & Nhava Sheva.
              </p>
            </div>

            <div className="rounded-2xl border border-[#D0CEC9] bg-[#F0EEEA] p-6 shadow-2xs flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#292D2F] font-bold uppercase">DEEP TELEMETRY SUITE</div>
                <div className="text-sm text-[#A5A5A4] mt-0.5">Explore fuel, route and hauler reports</div>
              </div>
              <Link
                to="/analytics"
                className="w-10 h-10 rounded-xl bg-white border border-[#D0CEC9] flex items-center justify-center text-[#292D2F] hover:bg-[#F2AE32] hover:text-[#292D2F] transition-colors shrink-0 shadow-2xs"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
