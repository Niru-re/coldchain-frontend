import React, { useState } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  DollarSign, 
  FileCheck, 
  AlertCircle, 
  PhoneCall, 
  TrendingUp, 
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { FarmerShipmentSummary } from '../types';
import { mockFarmerShipments } from '../data/mockData';

export const FarmerPortal: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<FarmerShipmentSummary>(mockFarmerShipments[0]);

  return (
    <div className="min-h-screen bg-[#06383D] text-[#F0EEEA] flex flex-col">
      
      {/* Producer Portal Top Bar */}
      <div className="border-b border-[#D0CEC9] bg-[#06383D] px-4 py-3 sm:px-6">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#16803C]/10 border border-[#16803C]/20 text-[#16803C]">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Deshmukh Agro Producer Cooperative</span>
                <span className="rounded bg-[#16803C]/10 px-2 py-0.5 text-[10px] font-mono text-[#16803C] border border-[#16803C]/20">
                  Verified Producer #F-4412
                </span>
              </div>
              <p className="text-[11px] text-[#A5A5A4]">Direct Cold-Chain Custody, Escrow Protection & Quality Assurance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[#A5A5A4] block text-[10px]">TOTAL ESCROW SECURED</span>
              <span className="text-[#16803C] font-bold">₹97,70,000 ($117,300)</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/85 text-[#292D2F] font-semibold text-xs transition-colors">
              <PhoneCall className="h-3.5 w-3.5" />
              24/7 Producer Helpline
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl w-full p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: My Produce Shipments */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4 shadow-lg">
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <span>My Active Harvest Consignments</span>
              <span className="text-xs font-mono text-[#16803C]">3 Batches Dispatched</span>
            </h2>

            <div className="mt-3 space-y-2.5">
              {mockFarmerShipments.map(lot => {
                const isSelected = lot.id === selectedLot.id;
                return (
                  <div
                    key={lot.id}
                    onClick={() => setSelectedLot(lot)}
                    className={`cursor-pointer rounded-lg p-3.5 border transition-all text-left ${
                      isSelected
                        ? 'border-[#F2AE32] bg-[#06383D]/90 shadow-md shadow-[#F2AE32]/20'
                        : 'border-[#D0CEC9]/60 bg-[#06383D]/40 hover:border-[#D0CEC9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-white">{lot.crop} ({lot.variety})</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        lot.tempSafe 
                          ? 'bg-[#16803C]/20 text-[#16803C] border border-[#16803C]/30' 
                          : 'bg-[#F2AE32]/20 text-[#F2AE32] border border-[#F2AE32]/30'
                      }`}>
                        {lot.tempSafe ? 'PRISTINE QUALITY' : 'AI RESCUE ACTIVE'}
                      </span>
                    </div>

                    <p className="text-xs text-[#A5A5A4] mt-1.5">
                      Destination: <strong className="text-white">{lot.targetBuyer}</strong> ({lot.buyerLocation})
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#D0CEC9]/40 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-[#A5A5A4] text-[10px] block">PAYOUT ESCROW</span>
                        <span className="text-[#16803C] font-semibold">{lot.payoutAmount}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#A5A5A4] text-[10px] block">QUALITY SCORE</span>
                        <span className="text-white font-bold">{lot.cargoHealthScore}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Producer Protection Guarantee Box */}
          <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-4 text-xs">
            <div className="flex items-center gap-2 text-[#16803C] font-semibold mb-1">
              <ShieldCheck className="h-4 w-4" />
              ColdChain 360 Zero-Spoilage Producer Guarantee
            </div>
            <p className="text-[#A5A5A4] text-[11px] leading-relaxed">
              If temperature rises due to transporter equipment failure, ColdChain 360 AI automatically redirects to secondary cold rooms and covers 100% of agreed spot contract value through smart contract escrow.
            </p>
          </div>
        </div>

        {/* Right: Selected Produce Detail & Visual Status */}
        <div className="lg:col-span-7 space-y-5">
          <div className="rounded-xl border border-[#D0CEC9] bg-[#06383D] p-5 shadow-lg">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D0CEC9] pb-4">
              <div>
                <span className="text-xs font-mono text-[#F2AE32] uppercase tracking-wider">Lot Identification: #{selectedLot.id}</span>
                <h1 className="text-xl font-bold text-white tracking-tight mt-0.5">
                  {selectedLot.crop} — {selectedLot.variety}
                </h1>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Harvested on {selectedLot.harvestDate} · {selectedLot.quantityTons} Metric Tons
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#A5A5A4] font-mono block">ESCROW RELEASE STATUS</span>
                <span className="text-xs font-mono font-bold text-[#16803C] bg-[#06383D]/60 border border-[#16803C]/40 px-2.5 py-1 rounded inline-block mt-0.5">
                  {selectedLot.payoutStatus}
                </span>
              </div>
            </div>

            {/* Live Cargo Status Banner */}
            <div className="mt-4 p-4 rounded-lg bg-[#06383D] border border-[#D0CEC9]">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Info className="h-4 w-4 text-[#F2AE32]" />
                Live Transit Condition
              </div>
              <p className="text-xs text-[#A5A5A4] mt-1 leading-relaxed">
                {selectedLot.liveStatusText}
              </p>
            </div>

            {/* Visual Indicators */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-lg bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] block text-[11px]">Current Cargo Temperature</span>
                <span className={`text-2xl font-bold font-mono mt-1 block ${selectedLot.tempSafe ? 'text-[#16803C]' : 'text-[#F2AE32]'}`}>
                  +{selectedLot.currentTemp}°C
                </span>
                <span className="text-[10px] text-[#A5A5A4] font-mono">
                  {selectedLot.tempSafe ? 'Within optimal range (+4°C)' : 'Slight thermal rise · AI managed'}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] block text-[11px]">Cargo Health & Firmness</span>
                <span className="text-2xl font-bold font-mono mt-1 text-[#16803C] block">
                  {selectedLot.cargoHealthScore}%
                </span>
                <span className="text-[10px] text-[#A5A5A4] font-mono">
                  Export Grade-A specifications verified
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#06383D] border border-[#D0CEC9]">
                <span className="text-[#A5A5A4] block text-[11px]">Expected Buyer Handover</span>
                <span className="text-base font-bold font-mono mt-2 text-white block truncate">
                  {selectedLot.eta}
                </span>
                <span className="text-[10px] text-[#A5A5A4] font-mono">
                  Direct to {selectedLot.targetBuyer}
                </span>
              </div>

            </div>

            {/* Smart Contract Documents & QR Verification */}
            <div className="mt-5 pt-4 border-t border-[#D0CEC9]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded bg-white p-1 flex items-center justify-center">
                  <div className="h-full w-full border border-[#292D2F] flex items-center justify-center font-mono text-[8px] font-bold text-[#292D2F] text-center leading-tight">
                    QR COLD VERIFIED
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Cryptographic Traceability Certificate</h4>
                  <p className="text-[11px] text-[#A5A5A4]">Compliant with APEDA Export & GlobalGAP standards</p>
                </div>
              </div>

              <button className="flex items-center gap-1.5 text-xs font-medium text-[#F2AE32] hover:text-[#F2AE32]/85 border border-[#F2AE32]/30 px-3 py-1.5 rounded-lg bg-[#06383D]">
                <FileCheck className="h-4 w-4" />
                View Blockchain Telemetry Audit
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
