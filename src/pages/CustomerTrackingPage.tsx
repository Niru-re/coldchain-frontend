import React, { useState } from 'react';
import {
  Search,
  Truck,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Download,
  AlertTriangle,
  ArrowRight,
  Phone,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrackedShipment {
  id: string;
  waybillNumber: string;
  consignee: string;
  commodity: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Cold Excursion Alert';
  currentLocation: string;
  eta: string;
  temperature: {
    current: number;
    min: number;
    max: number;
    complianceStatus: '100% Certified Safe' | 'Minor Warning' | 'Thermal Risk';
  };
  humidityPct: number;
  vehiclePlate: string;
  driverName: string;
  driverPhone: string;
  proofOfDelivery?: {
    signedBy: string;
    timestamp: string;
    dockBay: string;
    certificateId: string;
  };
  journeyCheckpoints: {
    title: string;
    location: string;
    time: string;
    status: 'completed' | 'current' | 'upcoming';
    tempAtCheck: string;
  }[];
}

const DEMO_CUSTOMER_SHIPMENTS: Record<string, TrackedShipment> = {
  'CC-8092': {
    id: 'CC-8092',
    waybillNumber: 'WB-CC-2026-8092',
    consignee: 'Serum BioPharma India (Pune Facility)',
    commodity: 'Active Biologics & Vaccines (Multi-Dose Vials)',
    origin: 'Bhiwandi Central Cold Hub, Mumbai',
    destination: 'Pune Bio-Cluster MIDC, Pune',
    status: 'In Transit',
    currentLocation: 'Khopoli Expressway Section (KM 68)',
    eta: 'Today · 20:30 IST (1h 45m remaining)',
    temperature: {
      current: 3.8,
      min: 2.0,
      max: 8.0,
      complianceStatus: '100% Certified Safe',
    },
    humidityPct: 52,
    vehiclePlate: 'MH-12-AB-1234',
    driverName: 'Rajesh Sharma',
    driverPhone: '+91 98230 44102',
    journeyCheckpoints: [
      { title: 'Cold-Chain Dispatch & Pre-Cooling', location: 'Bhiwandi Central Hub', time: '14:30 IST', status: 'completed', tempAtCheck: '+3.2°C' },
      { title: 'Seal Verification & Security Exit', location: 'Bhiwandi Toll Gate', time: '15:10 IST', status: 'completed', tempAtCheck: '+3.5°C' },
      { title: 'Expressway Transit & Telemetry Ping', location: 'Khopoli KM 68', time: '18:45 IST', status: 'current', tempAtCheck: '+3.8°C' },
      { title: 'Khadki Outskirts Inbound Gate', location: 'Pune Entry Gate', time: '19:50 IST', status: 'upcoming', tempAtCheck: 'Projected +4.0°C' },
      { title: 'Delivery & Consignee Proof of Delivery', location: 'Pune Bio-Cluster Dock 4', time: '20:30 IST', status: 'upcoming', tempAtCheck: 'Projected +3.8°C' },
    ],
  },
  'CC-8104': {
    id: 'CC-8104',
    waybillNumber: 'WB-CC-2026-8104',
    consignee: 'Apollo Regional Distribution Hospital',
    commodity: 'Specialty Probiotic Dairy & Butter Cults',
    origin: 'Nagpur Multi-Modal Cold Park',
    destination: 'Nashik Agro Terminal',
    status: 'In Transit',
    currentLocation: 'Jalgaon Bypass (NH-53)',
    eta: 'Today · 22:15 IST (3h 10m remaining)',
    temperature: {
      current: 2.4,
      min: 0.0,
      max: 4.0,
      complianceStatus: '100% Certified Safe',
    },
    humidityPct: 65,
    vehiclePlate: 'MH-31-TR-4912',
    driverName: 'Amit Verma',
    driverPhone: '+91 94221 80107',
    journeyCheckpoints: [
      { title: 'Consignment Loading & Chill Bay Seal', location: 'Nagpur Multi-Modal', time: '11:00 IST', status: 'completed', tempAtCheck: '+1.8°C' },
      { title: 'NH-53 Jalgaon Bypass Telemetry Point', location: 'Jalgaon Corridor', time: '18:30 IST', status: 'current', tempAtCheck: '+2.4°C' },
      { title: 'Nashik Agro Inbound Terminal Delivery', location: 'Nashik Terminal', time: '22:15 IST', status: 'upcoming', tempAtCheck: 'Projected +2.5°C' },
    ],
  },
  'CC-8077': {
    id: 'CC-8077',
    waybillNumber: 'WB-CC-2026-8077',
    consignee: 'Fortis Healthcare Research Center',
    commodity: 'Insulin Pen Cartridges & Serums',
    origin: 'Dankuni Warehousing Complex',
    destination: 'Durgapur Regional Hospital Hub',
    status: 'Delivered',
    currentLocation: 'Delivered at Consignee Cold Dock',
    eta: 'Delivered Today 14:15 IST',
    temperature: {
      current: 4.2,
      min: 2.0,
      max: 8.0,
      complianceStatus: '100% Certified Safe',
    },
    humidityPct: 48,
    vehiclePlate: 'WB-23-CD-8812',
    driverName: 'Manoj Shinde',
    driverPhone: '+91 98220 99142',
    proofOfDelivery: {
      signedBy: 'Dr. Arindam Mukherjee (Chief Pharmacist)',
      timestamp: 'Today · 14:15 IST',
      dockBay: 'Cold Dock Bay 2 (Inspection Cleared)',
      certificateId: 'POD-CC-2026-99014-VERIFIED',
    },
    journeyCheckpoints: [
      { title: 'Dispatch Inspection', location: 'Dankuni Complex', time: '09:30 IST', status: 'completed', tempAtCheck: '+3.9°C' },
      { title: 'NH-19 Transit', location: 'Bardhaman Bypass', time: '12:00 IST', status: 'completed', tempAtCheck: '+4.1°C' },
      { title: 'Consignee Sign-Off & Delivery', location: 'Durgapur Hospital', time: '14:15 IST', status: 'completed', tempAtCheck: '+4.2°C' },
    ],
  },
};

export const CustomerTrackingPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('CC-8092');
  const [activeTrackingId, setActiveTrackingId] = useState<string>('CC-8092');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const shipment = DEMO_CUSTOMER_SHIPMENTS[activeTrackingId.toUpperCase()] || DEMO_CUSTOMER_SHIPMENTS['CC-8092'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveTrackingId(searchInput.trim());
    }
  };

  const handleDownloadCertificate = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-8 px-4 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              Customer Tracking
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              CLIENT PORTAL
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Real-time cold chain verification &bull; Proof of delivery &bull; Thermal custody certificate
          </p>
        </div>

        <Link
          to="/support"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#06383D] hover:text-[#F2AE32]"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Need Assistance? Contact Support</span>
        </Link>
      </div>

      {/* Shipment Search Bar */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm font-mono space-y-3">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#A5A5A4] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Tracking ID (e.g. CC-8092, CC-8104, CC-8077)..."
              className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none focus:border-[#06383D] font-bold uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <span>TRACK SHIPMENT</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2AE32]" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A5A5A4] pt-1">
          <span>Quick Demo Searches:</span>
          {['CC-8092', 'CC-8104', 'CC-8077'].map((id) => (
            <button
              key={id}
              onClick={() => {
                setSearchInput(id);
                setActiveTrackingId(id);
              }}
              className="text-[#06383D] font-bold hover:underline cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tracked Shipment Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
        
        {/* Left Column (8 cols): Main Shipment Overview & Checkpoints */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#06383D]">
                  <Truck className="w-4 h-4 text-[#F2AE32]" />
                  <span>SHIPMENT ID: {shipment.id}</span>
                  <span className="text-[#A5A5A4]">&bull; {shipment.waybillNumber}</span>
                </div>
                <h2 className="text-xl font-black text-[#292D2F] font-sans mt-1">
                  {shipment.commodity}
                </h2>
                <div className="text-xs text-[#A5A5A4]">Consignee: {shipment.consignee}</div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                shipment.status === 'Delivered'
                  ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                  : 'bg-[#06383D] text-[#F2AE32]'
              }`}>
                ● {shipment.status.toUpperCase()}
              </span>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F0EEEA] p-4 rounded-xl text-xs">
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase block">CURRENT LOCATION</span>
                <strong className="text-[#292D2F]">{shipment.currentLocation}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase block">ESTIMATED ARRIVAL</span>
                <strong className="text-[#F2AE32]">{shipment.eta}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase block">ORIGIN</span>
                <strong className="text-[#292D2F] truncate block">{shipment.origin.split(',')[0]}</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase block">DESTINATION</span>
                <strong className="text-[#292D2F] truncate block">{shipment.destination.split(',')[0]}</strong>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase text-[#292D2F] tracking-wider">
                CUSTODY & TELEMETRY PROGRESSION
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D0CEC9]">
                {shipment.journeyCheckpoints.map((cp, idx) => (
                  <div key={idx} className="relative text-xs">
                    <span className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white ${
                      cp.status === 'completed'
                        ? 'bg-[#16803C]'
                        : cp.status === 'current'
                        ? 'bg-[#F2AE32] animate-pulse ring-4 ring-[#F2AE32]/20'
                        : 'bg-[#D0CEC9]'
                    }`} />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <strong className="text-sm text-[#292D2F]">{cp.title}</strong>
                        <div className="text-[11px] text-[#A5A5A4]">{cp.location} &bull; {cp.time}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#F0EEEA] text-[#06383D] font-bold text-[10px] border border-[#D0CEC9] self-start sm:self-auto">
                        Temp: {cp.tempAtCheck}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Proof of Delivery Banner if Delivered */}
          {shipment.proofOfDelivery && (
            <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>OFFICIAL PROOF OF DELIVERY CLEARED</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">RECEIVED & SIGNED BY</span>
                  <strong className="text-[#292D2F]">{shipment.proofOfDelivery.signedBy}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">DOCK STAGING TIMESTAMP</span>
                  <strong className="text-[#292D2F]">{shipment.proofOfDelivery.timestamp}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#A5A5A4] block">CERTIFICATE ID</span>
                  <strong className="text-[#16803C]">{shipment.proofOfDelivery.certificateId}</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Thermal Compliance Certificate & Action Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Real-Time Cold Chain Verification Card */}
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#06383D] border-b border-[#D0CEC9] pb-3">
              <ShieldCheck className="w-4 h-4 text-[#16803C]" />
              <span>COLD-CHAIN INTEGRITY BADGE</span>
            </div>

            <div className="text-center p-4 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] space-y-1">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">CORE PROBE TEMPERATURE</span>
              <div className="text-3xl font-black text-[#06383D]">
                {shipment.temperature.current > 0 ? `+${shipment.temperature.current}` : shipment.temperature.current}°C
              </div>
              <div className="text-xs text-[#16803C] font-bold">
                ● {shipment.temperature.complianceStatus}
              </div>
              <div className="text-[10px] text-[#A5A5A4] pt-1">
                Prescribed Envelope: {shipment.temperature.min}°C to {shipment.temperature.max}°C
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#F0EEEA] pb-1.5">
                <span className="text-[#A5A5A4]">Relative Humidity:</span>
                <strong className="text-[#292D2F]">{shipment.humidityPct}% RH</strong>
              </div>
              <div className="flex justify-between border-b border-[#F0EEEA] pb-1.5">
                <span className="text-[#A5A5A4]">Assigned Reefer:</span>
                <strong className="text-[#06383D]">{shipment.vehiclePlate}</strong>
              </div>
              <div className="flex justify-between border-b border-[#F0EEEA] pb-1.5">
                <span className="text-[#A5A5A4]">Lead Driver:</span>
                <strong className="text-[#292D2F]">{shipment.driverName}</strong>
              </div>
            </div>

            <button
              onClick={handleDownloadCertificate}
              className="w-full py-2.5 px-4 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#F2AE32]" />
              <span>DOWNLOAD COLD CHAIN AUDIT PDF</span>
            </button>

            {downloadSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-center text-xs text-[#16803C] font-bold">
                ✓ Cryptographic Thermal Certificate Downloaded
              </div>
            )}
          </div>

          {/* Direct Driver Contact Box */}
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#292D2F] uppercase">
              DELIVERY COORDINATION
            </h4>
            <p className="text-xs text-[#A5A5A4]">
              For gate pass clearance, un-docking schedule adjustments, or receiving bay preparation:
            </p>
            <a
              href={`tel:${shipment.driverPhone}`}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#F0EEEA] hover:bg-[#E8E6E2] text-[#292D2F] border border-[#D0CEC9] text-xs font-bold transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#06383D]" />
              <span>CALL DRIVER ({shipment.driverPhone})</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
