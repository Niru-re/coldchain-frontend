import React, { useState } from 'react';
import { 
  Sprout, 
  Warehouse, 
  Truck, 
  Train, 
  Plane, 
  Building, 
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const MultimodalJourneySection: React.FC = () => {
  const [selectedHop, setSelectedHop] = useState<number>(2); // Default on Truck transit

  const hops = [
    {
      id: 'HOP-01',
      title: 'Farm Harvest',
      mode: 'Horticulture Orchard',
      icon: Sprout,
      temp: '+4.2°C',
      telemetry: 'Hydro-cooling blast to +4°C within 90 minutes of plucking.',
      handshake: 'APEDA digital phytosanitary certificate generated.',
      risk: 'Enzymatic heat',
      status: 'Nominal',
    },
    {
      id: 'HOP-02',
      title: 'Regional Cold Storage',
      mode: 'Pre-cooling Facility',
      icon: Warehouse,
      temp: '+3.8°C',
      telemetry: 'Nitrogen atmospheric balance. 88% Relative Humidity.',
      handshake: 'Pallet barcode paired to multi-sensor BLE tags.',
      risk: 'Dock thermal door leak',
      status: 'Nominal',
    },
    {
      id: 'HOP-03',
      title: 'Highway Reefer Truck',
      mode: 'Road Logistics (NH-66)',
      icon: Truck,
      temp: '+9.8°C → +3.9°C (Diverted)',
      telemetry: 'Carrier Vector 1550 multi-temp. Real-time CAN-bus engine load.',
      handshake: 'AI Rescue Divert executed to Mahad cold storage.',
      risk: 'Asphalt radiant heat',
      status: 'Rescue Active',
    },
    {
      id: 'HOP-04',
      title: 'Intermodal Rail Cryo-Link',
      mode: 'High-Speed Rail Corridor',
      icon: Train,
      temp: '+4.0°C',
      telemetry: 'Independent diesel generator telemetry with LEO satellite failover.',
      handshake: 'Wagon coupling shock sensors remain < 0.2G.',
      risk: 'Rail siding power drop',
      status: 'Nominal',
    },
    {
      id: 'HOP-05',
      title: 'Air Cargo Tarmac',
      mode: 'Air Freight Transfer',
      icon: Plane,
      temp: '+4.5°C',
      telemetry: 'Thermal reflective thermal blankets + tarmac dwell timer.',
      handshake: 'Customs pre-clearance reduces tarmac exposure to 18 mins.',
      risk: 'Tarmac solar exposure',
      status: 'Nominal',
    },
    {
      id: 'HOP-06',
      title: 'Destination Cold Hub',
      mode: 'International Distribution',
      icon: Building,
      temp: '+3.5°C',
      telemetry: 'Automated dock seals engage before reefer doors unlock.',
      handshake: 'FDA/EU GDP electronic inspection sign-off verified.',
      risk: 'Cross-dock bottleneck',
      status: 'Nominal',
    },
    {
      id: 'HOP-07',
      title: 'Retailer / Buyer',
      mode: 'Direct Delivery',
      icon: ShoppingBag,
      temp: '+4.0°C',
      telemetry: 'Smart contract escrow released to farmer cooperative upon scan.',
      handshake: 'Zero consignment rejection. Pristine shelf life.',
      risk: 'Last-mile exposure',
      status: 'Protected',
    },
  ];

  const current = hops[selectedHop];
  const IconComponent = current.icon;

  return (
    <section className="py-24 border-b border-subtle bg-[#070b10] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            CONTINUOUS MULTIMODAL CUSTODY
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            No blind spots between modes.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            Traditional cold-chain visibility breaks every time cargo changes hands. ColdChain 360 maintains an unbroken telemetry thread from farm harvest to retail shelves.
          </p>
        </div>

        {/* Continuous Horizontal Journey Tracker */}
        <div className="border border-subtle bg-[#05070a] rounded-lg p-6 sm:p-8 space-y-8">
          
          {/* Unbroken Horizontal Chain */}
          <div className="relative">
            <div className="text-[10px] font-mono uppercase text-slate-500 mb-3">
              SELECT ANY HOP TO INSPECT SENSOR CUSTODY & HANDSHAKE PROTOCOLS:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {hops.map((hop, idx) => {
                const HopIcon = hop.icon;
                const isSelected = selectedHop === idx;
                return (
                  <div
                    key={hop.id}
                    onClick={() => setSelectedHop(idx)}
                    className={`cursor-pointer p-3 rounded border text-left transition-all ${
                      isSelected
                        ? 'border-[#F2AE32] bg-[#0d1624]'
                        : 'border-subtle bg-[#080d14] hover:border-[#D0CEC9]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#A5A5A4] mb-2">
                      <span>{hop.id}</span>
                      <span className={hop.status === 'Rescue Active' ? 'text-amber-400' : 'text-[#16803C]'}>
                        {hop.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded ${isSelected ? 'bg-[#F2AE32] text-[#292D2F]' : 'bg-[#06383D] text-[#A5A5A4]'}`}>
                        <HopIcon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium text-[#292D2F] truncate">{hop.title}</span>
                    </div>

                    <div className="text-[10px] font-mono text-[#A5A5A4] mt-1">
                      Temp: <span className="text-white">{hop.temp.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep Hop Inspection Detail */}
          <div className="hairline-t pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-4 flex items-start gap-4">
              <div className="p-3 bg-[#06383D]/20 border border-[#F2AE32]/30 text-[#F2AE32] rounded">
                <IconComponent className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500">{current.id} CUSTODY CHECKPOINT</span>
                <h3 className="text-lg font-medium text-white">{current.title}</h3>
                <span className="text-xs text-[#A5A5A4] font-mono block mt-0.5">{current.mode}</span>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">CONTINUOUS TELEMETRY PROTOCOL</span>
                <p className="text-[#292D2F] font-sans text-xs mt-1 leading-relaxed">{current.telemetry}</p>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">INTERMODAL HANDSHAKE & COMPLIANCE</span>
                <p className="text-[#292D2F] font-sans text-xs mt-1 leading-relaxed">{current.handshake}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
