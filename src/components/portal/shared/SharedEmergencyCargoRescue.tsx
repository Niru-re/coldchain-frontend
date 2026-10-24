import React, { useState } from 'react';
import { AlertOctagon, MapPin, Phone, Truck, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface ColdHubOption {
  name: string;
  distanceKm: number;
  driveTimeMins: number;
  availablePalletSlots: number;
  phone: string;
  facilityType: string;
}

interface Props {
  cargoAssetId?: string;
  assetDescription?: string;
  currentRiskReason?: string;
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse' | string;
}

const NEARBY_RESCUE_HUBS: ColdHubOption[] = [
  {
    name: 'Apex Bhiwandi Cold Logistics Park',
    distanceKm: 14.2,
    driveTimeMins: 22,
    availablePalletSlots: 180,
    phone: '+91 98200 88771',
    facilityType: 'Multi-Commodity CA Storage (-25°C to +15°C)'
  },
  {
    name: 'Mahad Agro Emergency Cold Hub',
    distanceKm: 28.5,
    driveTimeMins: 38,
    availablePalletSlots: 94,
    phone: '+91 94220 33412',
    facilityType: 'Horticulture Pre-Cooling & Chilled Chambers'
  },
  {
    name: 'CONCOR JNPT Rail Cold Transshipment Yard',
    distanceKm: 42.0,
    driveTimeMins: 55,
    availablePalletSlots: 320,
    phone: '+91 22 2724 5000',
    facilityType: 'Intermodal Container Reefer Terminal'
  }
];

export const SharedEmergencyCargoRescue: React.FC<Props> = ({
  cargoAssetId = 'CC-REEFER-04',
  assetDescription = '24 MT Export Table Grapes (Grade A)',
  currentRiskReason = 'Secondary refrigeration circulation pump failure',
  role = 'truck',
}) => {
  const [selectedHub, setSelectedHub] = useState<ColdHubOption>(NEARBY_RESCUE_HUBS[0]);
  const [rescueDispatched, setRescueDispatched] = useState<boolean>(false);

  const handleTriggerRescue = () => {
    setRescueDispatched(true);
  };

  return (
    <div className="rounded-xl border-2 border-red-200 bg-white p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
            <AlertOctagon className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-red-700">EMERGENCY PROTOCOL</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-300 font-bold uppercase">
                ONE-CLICK CARGO SALVAGE
              </span>
            </div>
            <h3 className="text-base font-bold text-[#292D2F] mt-0.5">
              Emergency Cargo Recovery & Hub Diversion
            </h3>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-[10px] text-[#A5A5A4] block">ASSET IN DISTRESS</span>
          <span className="text-sm font-black text-[#06383D]">{cargoAssetId}</span>
        </div>
      </div>

      {/* Distress Summary */}
      <div className="p-3.5 rounded-lg bg-red-50/80 border border-red-200 text-xs font-mono space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-red-900">Cargo: {assetDescription}</span>
          <span className="text-red-700 font-bold">Threat: {currentRiskReason}</span>
        </div>
        <p className="text-[#292D2F] text-[11px] leading-relaxed">
          AI Survival Clock indicates maximum 120 minutes before perishable core temperature reaches irreversible spoilage threshold. Diversion required immediately.
        </p>
      </div>

      {/* Select Destination Cold Hub */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#292D2F] font-mono block">
          Select Nearest Available Emergency Cold Hub:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {NEARBY_RESCUE_HUBS.map((hub, idx) => {
            const isSelected = selectedHub.name === hub.name;
            return (
              <div
                key={idx}
                onClick={() => setSelectedHub(hub)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#06383D] text-white border-[#06383D] shadow-sm'
                    : 'bg-[#F0EEEA]/60 border-[#D0CEC9] text-[#292D2F] hover:border-[#06383D]'
                } space-y-2 font-mono text-xs`}
              >
                <div className="flex items-start justify-between">
                  <span className={`font-bold ${isSelected ? 'text-[#F2AE32]' : 'text-[#06383D]'}`}>
                    {hub.name}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-white text-[#A5A5A4] border border-[#D0CEC9]'
                  }`}>
                    {hub.distanceKm} KM
                  </span>
                </div>
                <div className="text-[11px] opacity-80">{hub.facilityType}</div>
                <div className="flex items-center justify-between pt-1 border-t border-white/20 text-[10px]">
                  <span>Drive: <strong>~{hub.driveTimeMins} mins</strong></span>
                  <span className="text-[#16803C] font-bold">
                    {hub.availablePalletSlots} Slots Vacant
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Trigger Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E0DED9]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#A5A5A4]">
          <Phone className="w-3.5 h-3.5 text-[#06383D]" />
          <span>Hub Dispatch Hotline: <strong>{selectedHub.phone}</strong></span>
        </div>

        {rescueDispatched ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>DIVERSION DISPATCHED TO {selectedHub.name.toUpperCase()} (ETA: {selectedHub.driveTimeMins} MINS)</span>
          </div>
        ) : (
          <button
            onClick={handleTriggerRescue}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-md cursor-pointer"
          >
            <Truck className="w-4 h-4 text-white" />
            <span>DISPATCH RESCUE DIVERSION NOW</span>
          </button>
        )}
      </div>
    </div>
  );
};
