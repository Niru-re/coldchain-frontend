import React, { useState } from 'react';
import { 
  Warehouse, 
  Thermometer, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Maximize2
} from 'lucide-react';

export const WarehouseIntelligenceSection: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string>('Z-A');

  const zones = [
    {
      id: 'Z-A',
      name: 'Cold Room Alpha (Horticulture & Fresh Fruits)',
      targetTemp: '+3.5°C',
      currentTemp: '+3.8°C',
      occupancy: '78% (1,240 / 1,600 Pallets)',
      status: 'NORMAL',
      statusColor: 'text-[#16803C] bg-[#06383D]/20 border-[#16803C]/30',
      airVelocity: '3.2 m/s uniform circulation',
      priorityInventory: 'Lot #APEDA-9011 (Alphonso Mangoes) · FEFO Expedited to BOM flight',
      expiringCount: '2 Batches < 36h',
      incoming: 'Consignment #CC-1048 (Rescue Divert in 45m)',
      outgoing: '4 Trucks dispatched for JNPT port',
    },
    {
      id: 'Z-B',
      name: 'Ultra-Low Cryo Vault (mRNA & Biologics)',
      targetTemp: '-80.0°C',
      currentTemp: '-78.4°C',
      occupancy: '89% (445 / 500 Pallets)',
      status: 'NORMAL',
      statusColor: 'text-[#16803C] bg-[#06383D]/20 border-[#16803C]/30',
      airVelocity: 'Liquid Nitrogen Closed Circulation',
      priorityInventory: 'Lot #BIO-4412 (Pediatric Oncology) · Liquid Nitrogen Reserve at 99%',
      expiringCount: '0 Batches',
      incoming: 'Basel Cryo-Link Rail Shuttle',
      outgoing: 'Hospital Express Cryo-Vans',
    },
    {
      id: 'Z-C',
      name: 'Super-Chilled Marine Brine (Seafood & Sashimi)',
      targetTemp: '-1.5°C',
      currentTemp: '+0.4°C',
      occupancy: '94% (2,200 / 2,400 Pallets)',
      status: 'CAPACITY RISK',
      statusColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
      airVelocity: 'High humidity brine circulation (96% RH)',
      priorityInventory: 'Lot #NOR-882 (Atlantic Salmon) · Near dock bay 3 bottleneck',
      expiringCount: '6 Batches < 18h',
      incoming: 'Nordic Blue Fjord Air Cargo',
      outgoing: 'Wholesale Tsukiji Direct',
    },
    {
      id: 'Z-D',
      name: 'Dairy & Cultured Cheeses Chilled Room',
      targetTemp: '+2.0°C',
      currentTemp: '+2.1°C',
      occupancy: '52% (620 / 1,200 Pallets)',
      status: 'NORMAL',
      statusColor: 'text-[#16803C] bg-[#06383D]/20 border-[#16803C]/30',
      airVelocity: 'Gentle laminar airflow (1.4 m/s)',
      priorityInventory: 'Organic Artisan Cheeses · Maturation aging in progress',
      expiringCount: '0 Batches',
      incoming: 'Sonoma Dairy Co-op Truck',
      outgoing: 'Regional Supermarkets',
    },
  ];

  const curr = zones.find(z => z.id === selectedZone) || zones[0];

  return (
    <section className="py-24 border-b border-subtle bg-[#070b10] text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-[#F2AE32]">
            STRATEGIC NODE OPTIMIZATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
            Warehouse intelligence from dock to rack.
          </h2>
          <p className="text-base sm:text-lg text-[#A5A5A4] leading-relaxed font-normal">
            ColdChain 360 connects in-transit telematics directly with storage hub automation. Dock doors pre-cool, pallets auto-route by FEFO urgency, and capacity bottlenecks are predicted hours in advance.
          </p>
        </div>

        {/* Top-Down Facility Blueprint & Zone Inspector */}
        <div className="border border-subtle bg-[#05070a] rounded-lg p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-500">FACILITY TELEMETRY: PANVEL MULTI-MODAL LOGISTICS HUB ALPHA</span>
              <h3 className="text-base font-medium text-white">4 Storage Zones · Automated FEFO Inventory Management</h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#A5A5A4]">TOTAL CAPACITY:</span>
              <span className="text-slate-100 font-bold">4,505 / 5,700 PALLETS (79%)</span>
            </div>
          </div>

          {/* Top-Down Schematic Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {zones.map((zone) => {
              const isSelected = selectedZone === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone.id)}
                  className={`cursor-pointer p-4 rounded border text-left transition-all relative ${
                    isSelected
                      ? 'border-[#F2AE32] bg-[#0d1624]'
                      : 'border-subtle bg-[#080d14] hover:border-[#D0CEC9]'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#A5A5A4] mb-2">
                    <span>{zone.id}</span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${zone.statusColor}`}>
                      {zone.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-medium text-[#292D2F] line-clamp-2 leading-snug">{zone.name}</h4>

                  <div className="mt-4 pt-2 border-t border-subtle flex justify-between items-baseline font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">TEMP</span>
                      <span className="text-sm font-bold text-white">{zone.currentTemp}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">OCCUPANCY</span>
                      <span className="text-xs text-[#A5A5A4]">{zone.occupancy.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Zone Operational Rationale */}
          <div className="hairline-t pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono uppercase text-slate-500">INSPECTING: {curr.id} · {curr.name}</div>
              <h4 className="text-xl font-medium text-white">Priority Inventory: {curr.priorityInventory}</h4>
              <p className="text-xs text-[#A5A5A4] leading-relaxed font-normal">
                Airflow dynamic: <span className="text-slate-100 font-mono">{curr.airVelocity}</span>. Dynamic rack temperature sensors confirm zero thermal stratification across heights 1m to 8m.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">INBOUND LOGISTICS STREAM</span>
                <p className="text-[#292D2F] font-sans text-xs mt-1">{curr.incoming}</p>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">OUTBOUND CROSS-DOCK DISPATCH</span>
                <p className="text-[#292D2F] font-sans text-xs mt-1">{curr.outgoing}</p>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">EXPIRING LOTS MONITOR (&lt;36H)</span>
                <span className="text-amber-400 font-bold block mt-1">{curr.expiringCount}</span>
              </div>

              <div className="p-3 bg-[#080d14] rounded border border-subtle">
                <span className="text-slate-500 text-[10px] block uppercase">TARGET THERMAL ENVELOPE</span>
                <span className="text-[#F2AE32] font-bold block mt-1">{curr.targetTemp}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
