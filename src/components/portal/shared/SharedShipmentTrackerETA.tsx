import React from 'react';
import { MapPin, Navigation, Clock, Truck, Train, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export interface TransitMilestone {
  title: string;
  location: string;
  timeEstimate: string;
  completed: boolean;
  current?: boolean;
}

export interface TransitTrackingData {
  trackingId: string;
  cargoDescription: string;
  mode: 'truck' | 'train' | 'farm_pickup';
  vehicleNumberOrTrain: string;
  origin: string;
  destination: string;
  speedKmH: number;
  currentLocationName: string;
  progressPercent: number;
  eta: string;
  delayMinutes: number;
  temperatureCelsius: number;
  geofenceStatus: string;
  milestones: TransitMilestone[];
}

export const DEFAULT_TRACKING_DATA: TransitTrackingData = {
  trackingId: 'CC-8092',
  cargoDescription: 'Rabies Vaccine Consignment (Cold Box 4)',
  mode: 'truck',
  vehicleNumberOrTrain: 'CC-REEFER-01 (MH-12-AB-1234)',
  origin: 'Pune Biotech Park, Maharashtra',
  destination: 'Mumbai Port CFS Container Terminal',
  speedKmH: 68,
  currentLocationName: 'NH-48 Expressway (KM 142) · In Motion',
  progressPercent: 72,
  eta: 'Today · 16:30 IST',
  delayMinutes: 0,
  temperatureCelsius: 3.8,
  geofenceStatus: 'Inside Highway Green Corridor',
  milestones: [
    { title: 'Origin Lab Packhouse Dispatch', location: 'Pune Biotech Park', timeEstimate: '08:00 IST', completed: true },
    { title: 'Talegaon Expressway Toll Gate', location: 'Tare & Seal Validated', timeEstimate: '11:15 IST', completed: true },
    { title: 'Lonavala Transit Corridor', location: 'Active Highway Section', timeEstimate: '13:45 IST', completed: true, current: true },
    { title: 'Mumbai Port Terminal Receiving Bay', location: 'Dock Bay 4', timeEstimate: '16:30 IST', completed: false },
  ],
};

interface Props {
  data?: TransitTrackingData;
  role?: 'farmer' | 'truck' | 'railway' | 'warehouse';
}

export const SharedShipmentTrackerETA: React.FC<Props> = ({ data = DEFAULT_TRACKING_DATA, role = 'truck' }) => {
  const currentData = data || DEFAULT_TRACKING_DATA;
  return (
    <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0DED9] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-white">
            {currentData.mode === 'train' ? (
              <Train className="w-4 h-4 text-[#F2AE32]" />
            ) : (
              <Truck className="w-4 h-4 text-[#F2AE32]" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#06383D]">{currentData.trackingId}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold uppercase">
                {currentData.delayMinutes > 0 ? `DELAY +${currentData.delayMinutes} MIN` : 'ON TIME CORRIDOR'}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#292D2F] mt-0.5">{currentData.cargoDescription}</h3>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-[#A5A5A4] block">DYNAMIC ESTIMATED ARRIVAL</span>
          <span className="text-lg font-black font-mono text-[#06383D]">{currentData.eta}</span>
        </div>
      </div>

      {/* Progress Bar & Key Telemetry */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#292D2F] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#06383D]" />
            {currentData.origin}
          </span>
          <span className="text-xs font-bold text-[#F2AE32] bg-[#06383D] px-2 py-0.5 rounded">
            {currentData.progressPercent}% Transit Complete
          </span>
          <span className="font-bold text-[#292D2F] flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#F2AE32]" />
            {currentData.destination}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#D0CEC9] h-2.5 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-[#06383D] via-[#F2AE32] to-[#16803C] transition-all duration-500 rounded-full"
            style={{ width: `${currentData.progressPercent}%` }}
          />
        </div>

        {/* Real-Time Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
          <div className="p-2.5 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
            <span className="text-[10px] text-[#A5A5A4] block">LIVE POSITION</span>
            <span className="font-bold text-[#292D2F] truncate block">{currentData.currentLocationName}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
            <span className="text-[10px] text-[#A5A5A4] block">CURRENT SPEED</span>
            <span className="font-bold text-[#06383D]">{currentData.speedKmH} km/h</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
            <span className="text-[10px] text-[#A5A5A4] block">CARGO TEMP</span>
            <span className="font-bold text-[#16803C]">+{currentData.temperatureCelsius.toFixed(1)}°C (Safe)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F0EEEA]/60 border border-[#D0CEC9]">
            <span className="text-[10px] text-[#A5A5A4] block">GEOFENCE</span>
            <span className="font-bold text-[#292D2F] truncate block">{data.geofenceStatus}</span>
          </div>
        </div>
      </div>

      {/* Milestones Horizontal / Vertical Stepper */}
      <div className="border-t border-[#E0DED9] pt-4 space-y-2">
        <span className="text-xs font-bold text-[#292D2F] block font-mono">Corridor Waypoints & Gate Clearance:</span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          {data.milestones.map((ms, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg border text-xs font-mono ${
                ms.completed
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  : ms.current
                  ? 'bg-amber-50/70 border-amber-300 text-amber-900 shadow-2xs'
                  : 'bg-[#F0EEEA]/40 border-[#D0CEC9] text-[#A5A5A4]'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {ms.completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
                ) : ms.current ? (
                  <Clock className="w-3.5 h-3.5 text-[#F2AE32] animate-spin" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-[#D0CEC9]" />
                )}
                <span className="font-bold truncate">{ms.title}</span>
              </div>
              <div className="text-[11px] truncate">{ms.location}</div>
              <div className="text-[10px] opacity-75">{ms.timeEstimate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
