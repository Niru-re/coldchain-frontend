import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Database, ArrowUpRight } from 'lucide-react';

export const DataVisibilitySection: React.FC = () => {
  const metrics = [
    {
      value: '128',
      unit: '',
      label: 'ACTIVE TRUCKS',
      sub: 'Multi-axle & containerized haulers in active live dispatch across primary corridors',
      change: '+8.4% month-over-month capacity',
      color: 'text-[#292D2F]',
      barColor: 'bg-[#F2AE32]',
    },
    {
      value: '84',
      unit: '',
      label: 'SHIPMENTS IN TRANSIT',
      sub: 'Industrial cargo moving across national expressways without custody gaps',
      change: '100% continuous cellular & mesh telemetry',
      color: 'text-[#292D2F]',
      barColor: 'bg-[#06383D]',
    },
    {
      value: '94.7',
      unit: '%',
      label: 'ON-TIME DELIVERY',
      sub: 'Guaranteed customer SLA across complex multi-state transit routes',
      change: 'Calculated across 4,200+ monthly hauls',
      color: 'text-[#16803C]',
      barColor: 'bg-[#16803C]',
    },
    {
      value: '87.2',
      unit: '%',
      label: 'FLEET UTILIZATION',
      sub: 'Deadhead miles eliminated via dynamic return-load matching and multi-depot staging',
      change: '-34% empty haulage waste',
      color: 'text-[#F2AE32]',
      barColor: 'bg-[#F2AE32]',
    },
  ];

  return (
    <section className="relative w-full bg-white py-32 px-6 lg:px-8 border-b border-[#D0CEC9] flex flex-col justify-center overflow-hidden">
      {/* Background Subtle Industrial Lines */}
      <div className="absolute inset-0 bg-industrial-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-20">
        
        {/* Massive Editorial Lead-in Header */}
        <div className="space-y-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[#F2AE32] font-mono text-xs uppercase tracking-widest font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-[#F2AE32] animate-pulse" />
            SECTION 04 · PRECISION OPERATIONAL TELEMETRY
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-black text-[#292D2F] tracking-tighter uppercase leading-[0.88] font-sans"
          >
            VISIBILITY<br />
            <span className="text-[#F2AE32]">
              CHANGES
            </span><br />
            EVERYTHING.
          </motion.h2>
        </div>

        {/* Cinematic Kinetic Metric Rows with Clean Light Industrial Dividers */}
        <div className="space-y-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="relative group pt-8 pb-10 border-t border-[#D0CEC9] hover:border-[#06383D] transition-colors"
            >
              {/* Thin High-Tech Progress Wire */}
              <div className={`absolute top-0 left-0 w-0 group-hover:w-full h-[2px] ${m.barColor} transition-all duration-700`} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
                
                {/* Index & Micro Tag */}
                <div className="lg:col-span-2 font-mono text-xs text-[#A5A5A4] uppercase tracking-widest flex items-center gap-2">
                  <span className="text-[#F2AE32] font-bold">0{idx + 1}</span>
                  <span>/ INLAND METRIC</span>
                </div>

                {/* Massive Typography Number */}
                <div className="lg:col-span-5 flex items-baseline gap-2">
                  <span className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter ${m.color} font-sans`}>
                    {m.value}
                  </span>
                  {m.unit && (
                    <span className="text-3xl sm:text-5xl font-black text-[#A5A5A4] font-sans">
                      {m.unit}
                    </span>
                  )}
                </div>

                {/* Metric Label, Description & Delta */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="text-xl sm:text-2xl font-bold text-[#292D2F] tracking-wide uppercase font-sans">
                    {m.label}
                  </div>
                  <p className="text-sm sm:text-base text-[#A5A5A4] font-medium leading-relaxed">
                    {m.sub}
                  </p>
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-[#06383D] font-bold pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06383D]" />
                    <span>{m.change}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="p-8 rounded-2xl bg-[#F0EEEA] border border-[#D0CEC9] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-[#F2AE32] tracking-wider font-bold">
              REAL-TIME EDGE CORRELATION
            </div>
            <div className="text-lg text-[#292D2F] font-semibold">
              1,800,000+ data packets evaluated every second to eliminate cargo theft, detour fuel burn, and idle penalties.
            </div>
          </div>
          <div className="font-mono text-xs text-[#A5A5A4] flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-[#D0CEC9] text-[#292D2F] font-bold shadow-2xs">
              FASTAG FAST-PASS
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-[#D0CEC9] text-[#292D2F] font-bold shadow-2xs">
              E-WAY BILL AUTO-RECON
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
