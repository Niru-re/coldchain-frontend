import React, { useState } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileCheck, 
  PhoneCall, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { mockFarmerShipments } from '../data/mockData';
import { FarmerShipmentSummary } from '../types';

export const StreamlinedFarmerPortal: React.FC = () => {
  const [selectedLot, setSelectedLot] = useState<FarmerShipmentSummary>(mockFarmerShipments[0]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#06383D] text-[#F0EEEA] flex flex-col font-sans">
      
      {/* Top Header */}
      <div className="border-b border-[#D0CEC9] bg-[#06383D] px-4 py-4 sm:px-8">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#16803C]/20 border border-[#16803C]/30 text-[#16803C]">
              <Sprout className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-medium text-white">Deshmukh Agro Producer Cooperative</h1>
              <p className="text-xs text-[#A5A5A4] font-mono">Verified Producer #F-4412 · Ratnagiri, Maharashtra</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#D0CEC9] text-xs text-[#A5A5A4] hover:text-white bg-[#06383D] font-mono">
              <PhoneCall className="h-3.5 w-3.5 text-[#F2AE32]" />
              24/7 Agro Support Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: High-contrast, Simple Operational Layout */}
      <div className="mx-auto max-w-6xl w-full p-4 sm:p-8 flex-1 space-y-8">
        
        {/* Large Status Display Banner */}
        <div className="border border-[#D0CEC9] bg-[#06383D] rounded-lg p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#A5A5A4]">SHIPMENT IN TRANSIT</span>
              <h2 className="text-2xl sm:text-3xl font-medium text-white mt-0.5">
                {selectedLot.crop} — {selectedLot.variety}
              </h2>
              <span className="text-xs text-[#A5A5A4] font-mono">Consignment #{selectedLot.id} · {selectedLot.quantityTons} Metric Tonnes</span>
            </div>

            <div className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-[#16803C]/40 bg-[#06383D] text-[#16803C] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              PROTECTED BY AI RESCUE
            </div>
          </div>

          {/* Three Giant Visual Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
            <div className="p-5 rounded bg-[#06383D] border border-[#D0CEC9] space-y-1">
              <span className="text-xs text-[#A5A5A4] block">CORE TEMPERATURE</span>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                +{selectedLot.currentTemp}°C
              </div>
              <span className="text-xs text-[#F2AE32] block pt-1">Restoring to +4.0°C at Mahad Hub</span>
            </div>

            <div className="p-5 rounded bg-[#06383D] border border-[#D0CEC9] space-y-1">
              <span className="text-xs text-[#A5A5A4] block">CARGO HEALTH SCORE</span>
              <div className="text-3xl sm:text-4xl font-bold text-[#16803C]">
                {selectedLot.cargoHealthScore}%
              </div>
              <span className="text-xs text-[#A5A5A4] block pt-1">Export Grade-A Verified</span>
            </div>

            <div className="p-5 rounded bg-[#06383D] border border-[#D0CEC9] space-y-1">
              <span className="text-xs text-[#A5A5A4] block">PAYOUT ESCROW SECURED</span>
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {selectedLot.payoutAmount.split('(')[0]}
              </div>
              <span className="text-xs text-[#16803C] block pt-1">{selectedLot.payoutStatus} in Smart Contract</span>
            </div>
          </div>

          {/* Operational Update Message */}
          <div className="p-4 rounded bg-[#06383D] border border-[#D0CEC9] text-xs space-y-1">
            <span className="font-mono text-[#F2AE32] font-bold block">LIVE COLD-CHAIN UPDATE:</span>
            <p className="text-[#A5A5A4] leading-relaxed font-sans text-sm">
              {selectedLot.liveStatusText}
            </p>
          </div>

          {/* Simple Four Primary Actions */}
          <div className="border-t border-[#D0CEC9] pt-4 flex flex-wrap gap-3 font-mono text-xs">
            <button className="px-4 py-2.5 rounded bg-[#F2AE32] text-[#292D2F] font-bold hover:bg-[#F2AE32]/85 transition-colors cursor-pointer">
              Track Live Location
            </button>
            <button className="px-4 py-2.5 rounded border border-[#D0CEC9] bg-[#06383D] text-white hover:bg-[#E8E6E2]/20 transition-colors cursor-pointer">
              View APEDA Export Certificate
            </button>
            <button className="px-4 py-2.5 rounded border border-[#D0CEC9] bg-[#06383D] text-white hover:bg-[#E8E6E2]/20 transition-colors cursor-pointer">
              Escrow Payout Ledger
            </button>
            <button className="px-4 py-2.5 rounded border border-[#D0CEC9] bg-[#06383D] text-white hover:bg-[#E8E6E2]/20 transition-colors cursor-pointer">
              Contact Dispatcher
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
