import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe2, 
  MapPin, 
  Truck, 
  Share2, 
  CheckCircle2, 
  Radio, 
  ArrowUpRight 
} from 'lucide-react';

export const ScrollNetworkTransition: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<'corridor' | 'regional' | 'national'>('national');

  // National nodes for pan-India inland representation
  const nationalNodes = [
    { name: 'DELHI NCR', x: 42, y: 20, active: 42, color: '#06383D' },
    { name: 'JAIPUR', x: 33, y: 30, active: 19, color: '#A5A5A4' },
    { name: 'AHMEDABAD', x: 22, y: 46, active: 34, color: '#06383D' },
    { name: 'BHOPAL', x: 50, y: 44, active: 26, color: '#A5A5A4' },
    { name: 'INDORE', x: 40, y: 47, active: 31, color: '#A5A5A4' },
    { name: 'NAGPUR', x: 54, y: 56, active: 58, color: '#F2AE32' },
    { name: 'MUMBAI', x: 26, y: 64, active: 65, color: '#F2AE32' },
    { name: 'PUNE', x: 30, y: 70, active: 47, color: '#06383D' },
    { name: 'HYDERABAD', x: 52, y: 72, active: 38, color: '#06383D' },
    { name: 'BENGALURU', x: 44, y: 86, active: 44, color: '#16803C' },
    { name: 'KOLKATA', x: 82, y: 46, active: 29, color: '#06383D' },
  ];

  // Active national arteries
  const routes = [
    { from: 'delhi', to: 'mumbai', d: 'M 42 20 Q 35 42 26 64' },
    { from: 'nagpur', to: 'mumbai', d: 'M 54 56 Q 40 58 26 64' },
    { from: 'delhi', to: 'nagpur', d: 'M 42 20 Q 48 38 54 56' },
    { from: 'mumbai', to: 'bengaluru', d: 'M 26 64 Q 35 75 44 86' },
    { from: 'nagpur', to: 'hyderabad', d: 'M 54 56 Q 53 64 52 72' },
    { from: 'hyderabad', to: 'bengaluru', d: 'M 52 72 Q 48 79 44 86' },
    { from: 'ahmedabad', to: 'mumbai', d: 'M 22 46 Q 24 55 26 64' },
    { from: 'nagpur', to: 'kolkata', d: 'M 54 56 Q 68 50 82 46' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#E8E6E2] py-24 px-6 lg:px-8 border-b border-[#D0CEC9] flex flex-col justify-center overflow-hidden">
      {/* Seamless dark dissolve bridge from hero video into network map */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0a0b0c] via-[#0a0b0c]/40 to-transparent pointer-events-none z-20" />

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-industrial-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Typography: Bold Editorial Transition */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D0CEC9] text-[#A5A5A4] text-xs font-mono uppercase tracking-widest shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#F2AE32]" />
            <span>Scale & Synthesis · National Network Expansion</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#292D2F] tracking-tight uppercase font-sans"
          >
            FROM SINGLE CORRIDOR<br />
            <span className="text-[#F2AE32]">
              TO PAN-INDIA HIGHWAY MATRIX.
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#A5A5A4] max-w-2xl mx-auto leading-relaxed"
          >
            What begins on the Nagpur-Mumbai expressway expands across India’s industrial arteries. Every regional interchange and hub linked into a continuous physical transit stream.
          </motion.p>
        </div>

        {/* Visual Map Canvas & Interactive Scale Switcher */}
        <div className="relative w-full rounded-2xl border border-[#D0CEC9] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(6,56,61,0.06)] overflow-hidden">
          
          {/* Top Layer Controller */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E0DED9] pb-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#292D2F] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#F2AE32]" />
                PAN-INDIA LOGISTICS ARTERY TOPOLOGY
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#F0EEEA] border border-[#D0CEC9] text-[10px] font-mono text-[#06383D] font-bold">
                11 HUBS ACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#F0EEEA] p-1 rounded-xl border border-[#D0CEC9] font-mono text-xs">
              <button
                onClick={() => setZoomLevel('corridor')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  zoomLevel === 'corridor' ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
                }`}
              >
                Trunk Corridors
              </button>
              <button
                onClick={() => setZoomLevel('regional')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  zoomLevel === 'regional' ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
                }`}
              >
                Cross-Dock Hubs
              </button>
              <button
                onClick={() => setZoomLevel('national')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  zoomLevel === 'national' ? 'bg-white text-[#292D2F] font-bold shadow-2xs border border-[#D0CEC9]' : 'text-[#A5A5A4] hover:text-[#292D2F]'
                }`}
              >
                Full National Mesh
              </button>
            </div>
          </div>

          {/* Stylized Light Map Diagram */}
          <div className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center my-6 bg-[#F0EEEA]/50 rounded-xl border border-[#E0DED9]">
            <svg 
              viewBox="15 10 75 85" 
              className="w-full h-full object-contain"
            >
              {/* Background Grid Lines */}
              <g stroke="#E0DED9" strokeWidth="0.5" strokeDasharray="2 2">
                <line x1="15" y1="30" x2="90" y2="30" />
                <line x1="15" y1="50" x2="90" y2="50" />
                <line x1="15" y1="70" x2="90" y2="70" />
                <line x1="30" y1="10" x2="30" y2="95" />
                <line x1="50" y1="10" x2="50" y2="95" />
                <line x1="70" y1="10" x2="70" y2="95" />
              </g>

              {/* Highway Arteries */}
              {routes.map((route, idx) => (
                <path
                  key={idx}
                  d={route.d}
                  fill="none"
                  stroke={idx === 1 ? '#F2AE32' : '#94A3B8'}
                  strokeWidth={idx === 1 ? '1.8' : '1'}
                  strokeDasharray={idx === 1 ? 'none' : '3 2'}
                  opacity={idx === 1 ? 1 : 0.7}
                />
              ))}

              {/* National Node Points */}
              {nationalNodes.map((node) => (
                <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
                  <circle r="2.2" fill="#FFFFFF" stroke="#D0CEC9" strokeWidth="0.6" />
                  <circle r="1.2" fill={node.color} />
                  <text 
                    x="2.4" 
                    y="0.8" 
                    fill="#292D2F" 
                    fontSize="2.2" 
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {node.name}
                  </text>
                  <text 
                    x="2.4" 
                    y="3" 
                    fill="#A5A5A4" 
                    fontSize="1.5" 
                    fontFamily="monospace"
                  >
                    {node.active} TRUCKS
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Bottom Telemetry Row */}
          <div className="pt-6 border-t border-[#E0DED9] grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
            <div>
              <div className="text-[#A5A5A4] text-[10px] uppercase">TOTAL CONNECTED NODES</div>
              <div className="text-xl font-bold text-[#292D2F] mt-1">48 CITIES</div>
            </div>
            <div>
              <div className="text-[#A5A5A4] text-[10px] uppercase">ACTIVE FREIGHT HAULS</div>
              <div className="text-xl font-bold text-[#F2AE32] mt-1">128 VEHICLES</div>
            </div>
            <div>
              <div className="text-[#A5A5A4] text-[10px] uppercase">DAILY CARGO VOLUME</div>
              <div className="text-xl font-bold text-[#06383D] mt-1">3,850 TONS</div>
            </div>
            <div>
              <div className="text-[#A5A5A4] text-[10px] uppercase">CORRIDOR RECONFIG TIME</div>
              <div className="text-xl font-bold text-[#16803C] mt-1">&lt; 3 MINUTES</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
