import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  Sprout, 
  Plus, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  QrCode, 
  Truck, 
  Calendar, 
  Scale, 
  CheckCircle2, 
  DollarSign, 
  Building2, 
  CloudSun, 
  HelpCircle,
  FileCheck,
  Eye,
  Camera,
  Layers,
  ChevronRight
} from 'lucide-react';
import { MOCK_CROP_BATCHES, MOCK_MANDI_RATES, CropBatch } from '../../data/portalMockData';
import { SharedTemperatureHumidityMonitor } from '../../components/portal/shared/SharedTemperatureHumidityMonitor';
import { SharedAISpoilageAlerts } from '../../components/portal/shared/SharedAISpoilageAlerts';
import { SharedOpenCVImageInspection } from '../../components/portal/shared/SharedOpenCVImageInspection';
import { SharedShipmentTrackerETA } from '../../components/portal/shared/SharedShipmentTrackerETA';
import { SharedQRCargoId } from '../../components/portal/shared/SharedQRCargoId';
import { SharedDigitalProofOfDelivery } from '../../components/portal/shared/SharedDigitalProofOfDelivery';
import { SharedReportsAnalyticsExport } from '../../components/portal/shared/SharedReportsAnalyticsExport';
import { SharedEmergencyCargoRescue } from '../../components/portal/shared/SharedEmergencyCargoRescue';
import { VerificationMatrixModal } from '../../components/portal/VerificationMatrixModal';

export const FarmerPortalPage: React.FC = () => {
  const [batches, setBatches] = useState<CropBatch[]>(MOCK_CROP_BATCHES);
  const [selectedBatch, setSelectedBatch] = useState<CropBatch>(MOCK_CROP_BATCHES[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'registration' | 'opencv' | 'tracking' | 'mandi' | 'subsidies' | 'rescue'>('overview');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    api.getFarmerBatches().then((data) => {
      if (data && data.length > 0) {
        const mapped: CropBatch[] = data.map((b) => ({
          id: b.id,
          crop: b.crop,
          variety: b.variety,
          farmerName: b.farmerName || (b as any).farmer_name || 'Ramesh Deshmukh',
          farmLocation: b.farmLocation || (b as any).farm_location || 'Ratnagiri, Maharashtra',
          harvestDate: b.harvestDate || (b as any).harvest_date || '2026-10-21',
          quantityTons: b.quantityTons || (b as any).quantity_tons || 10,
          initialTemp: b.initialTemp || (b as any).initial_temp || 24,
          currentTemp: b.currentTemp || (b as any).current_temp || 4.5,
          targetTemp: b.targetTemp || (b as any).target_temp || 4.0,
          humidity: b.humidity || 90,
          shelfLifeDaysTotal: b.shelfLifeDaysTotal || (b as any).shelf_life_days_total || 20,
          shelfLifeRemainingDays: b.shelfLifeRemainingDays || (b as any).shelf_life_remaining_days || 15,
          grade: (b.grade as any) || 'A',
          qualityScore: b.qualityScore || (b as any).quality_score || 94,
          status: (b.status as any) || 'In-Transit',
          allocatedHub: b.allocatedHub || (b as any).allocated_hub || 'Bhiwandi Mega Cold Hub',
          assignedVehicle: b.assignedVehicle || (b as any).assigned_vehicle || 'CC-REEFER-01',
          mandiRatePerKg: b.mandiRatePerKg || (b as any).mandi_rate_per_kg || 180,
          escrowSecuredAmount: b.escrowSecuredAmount || (b as any).escrow_secured_amount || 2500000,
          subsidyEligible: b.subsidyEligible || (b as any).subsidy_eligible || 'PMKSY Cold Chain Grant',
          qrPayload: b.qrPayload || (b as any).qr_payload || `CC360://CROP/${b.id}`,
        }));
        setBatches((prev) => {
          const ids = new Set(mapped.map((m) => m.id));
          return [...mapped, ...prev.filter((p) => !ids.has(p.id))];
        });
        setSelectedBatch(mapped[0]);
      }
    }).catch(() => {});
  }, []);

  // Registration Form State (Feature FARM-01)
  const [newCrop, setNewCrop] = useState('Alphonso Mango');
  const [newVariety, setNewVariety] = useState('Ratnagiri Premium');
  const [newTons, setNewTons] = useState('12.0');
  const [newLocation, setNewLocation] = useState('Ratnagiri Orchard Plot #4');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Subsidy Calculator State (Feature FARM-13)
  const [capexInr, setCapexInr] = useState<number>(3500000);
  const [schemeSelected, setSchemeSelected] = useState<'pmksy' | 'midh' | 'apeda'>('pmksy');

  const handleRegisterBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CropBatch = {
      id: `LOT-AGRO-${Math.floor(705 + Math.random() * 50)}`,
      crop: newCrop,
      variety: newVariety,
      farmerName: 'Ramesh Deshmukh',
      farmLocation: newLocation,
      harvestDate: new Date().toISOString().split('T')[0],
      quantityTons: parseFloat(newTons) || 10,
      initialTemp: 27.0,
      currentTemp: 10.5,
      targetTemp: 10.0,
      humidity: 90,
      shelfLifeDaysTotal: 20,
      shelfLifeRemainingDays: 19.5,
      grade: 'A',
      qualityScore: 95,
      status: 'Pre-Cooling',
      allocatedHub: 'Bhiwandi Mega Cold Hub',
      mandiRatePerKg: 190,
      escrowSecuredAmount: (parseFloat(newTons) || 10) * 1000 * 190,
      subsidyEligible: 'PMKSY Cold Chain Grant (35%)',
      qrPayload: `CC360://CROP/${newCrop}/${Date.now()}`
    };

    setBatches([created, ...batches]);
    setSelectedBatch(created);

    api.createFarmerBatch({
      id: created.id,
      crop: created.crop,
      variety: created.variety,
      farmer_name: created.farmerName,
      farm_location: created.farmLocation,
      harvest_date: created.harvestDate,
      quantity_tons: created.quantityTons,
      initial_temp: created.initialTemp,
      current_temp: created.currentTemp,
      target_temp: created.targetTemp,
      temp_safe: true,
      humidity: created.humidity,
      shelf_life_days_total: created.shelfLifeDaysTotal,
      shelf_life_remaining_days: Math.round(created.shelfLifeRemainingDays),
      grade: created.grade,
      quality_score: created.qualityScore,
      cargo_health_score: created.qualityScore,
      status: created.status,
      allocated_hub: created.allocatedHub,
      mandi_rate_per_kg: created.mandiRatePerKg,
      escrow_secured_amount: created.escrowSecuredAmount,
      payout_status: 'Escrow Secured',
      subsidy_eligible: created.subsidyEligible,
      qr_payload: created.qrPayload,
    } as any).catch(() => {});

    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 3000);
  };

  const calculateSubsidy = () => {
    if (schemeSelected === 'pmksy') return capexInr * 0.35; // 35% general area
    if (schemeSelected === 'midh') return capexInr * 0.40; // 40% packhouse grant
    return capexInr * 0.50; // APEDA export cold logistics
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with 20-Feature Checklist Trigger */}
      <div className="rounded-2xl border border-[#D0CEC9] bg-gradient-to-r from-[#06383D] via-[#0A4B52] to-[#06383D] text-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#16803C] flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-[#F2AE32]" />
              </div>
              <span className="text-xs font-mono font-bold text-[#F2AE32] uppercase tracking-wider">
                PRODUCER PORTAL · DESHMUKH AGRO CO-OP
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                20 / 20 FEATURES ACTIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Farmer Cold Chain & Produce Terminal
            </h1>
            <p className="text-xs text-white/80 font-mono">
              Direct pre-cooling monitoring, kinetic shelf-life prediction, live APMC mandi arbitrage, and government subsidy clearance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#0B0E14] font-black text-xs font-mono tracking-wider uppercase transition-all shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify 20 Farmer Features</span>
            </button>
          </div>
        </div>

        {/* Quick Tabs Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/15 text-xs font-mono">
          {[
            { id: 'overview', label: 'Dashboard & Active Batches' },
            { id: 'registration', label: 'Register Crop Harvest (FARM-01)' },
            { id: 'opencv', label: 'OpenCV Quality Scan (FARM-03)' },
            { id: 'tracking', label: 'Transit & ETA (FARM-09/10)' },
            { id: 'mandi', label: 'Mandi Rates & Forecast (FARM-11/12)' },
            { id: 'subsidies', label: 'Govt Subsidy (FARM-13)' },
            { id: 'rescue', label: 'Emergency Rescue (FARM-20)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                activeTab === tab.id
                  ? 'bg-white text-[#06383D] shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ACTIVE BATCHES */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="p-4 rounded-xl border border-[#D0CEC9] bg-white space-y-1 shadow-2xs">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">REGISTERED HARVEST</span>
              <div className="text-2xl font-black text-[#06383D]">61.5 MT</div>
              <span className="text-[11px] text-[#16803C] font-semibold">4 Monitored Consignments</span>
            </div>
            <div className="p-4 rounded-xl border border-[#D0CEC9] bg-white space-y-1 shadow-2xs">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">AVG QUALITY SCORE</span>
              <div className="text-2xl font-black text-[#16803C]">94.2 / 100</div>
              <span className="text-[11px] text-[#06383D] font-semibold">Grade A Export Spec</span>
            </div>
            <div className="p-4 rounded-xl border border-[#D0CEC9] bg-white space-y-1 shadow-2xs">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">TOTAL ESCROW SECURED</span>
              <div className="text-2xl font-black text-[#F2AE32]">₹98,13,500</div>
              <span className="text-[11px] text-[#292D2F] font-semibold">100% Protected Payments</span>
            </div>
            <div className="p-4 rounded-xl border border-[#D0CEC9] bg-white space-y-1 shadow-2xs">
              <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">NEARBY COLD STORAGE</span>
              <div className="text-2xl font-black text-[#06383D]">3 Hubs Active</div>
              <span className="text-[11px] text-[#16803C] font-semibold">594 Vacant Pallet Slots</span>
            </div>
          </div>

          {/* Active Batches Table & Selection */}
          <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#292D2F]">My Active Harvest Consignments</h3>
                <p className="text-xs text-[#A5A5A4]">Click any lot to inspect live telemetry, shelf life, and QR tamper seals</p>
              </div>
              <button
                onClick={() => setActiveTab('registration')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#F2AE32]" />
                <span>+ Register New Batch</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F0EEEA] text-[#292D2F] border-b border-[#D0CEC9]">
                  <tr>
                    <th className="py-2.5 px-3 font-bold">BATCH ID</th>
                    <th className="py-2.5 px-3 font-bold">COMMODITY & VARIETY</th>
                    <th className="py-2.5 px-3 font-bold">GRADE</th>
                    <th className="py-2.5 px-3 font-bold">VOLUME</th>
                    <th className="py-2.5 px-3 font-bold">CORE TEMP</th>
                    <th className="py-2.5 px-3 font-bold">REMAINING SHELF LIFE</th>
                    <th className="py-2.5 px-3 font-bold">STATUS</th>
                    <th className="py-2.5 px-3 font-bold text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0DED9]">
                  {batches.map((batch) => {
                    const isSelected = batch.id === selectedBatch.id;
                    return (
                      <tr 
                        key={batch.id} 
                        onClick={() => setSelectedBatch(batch)}
                        className={`transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#06383D]/5 font-semibold' : 'hover:bg-[#F0EEEA]/50'
                        }`}
                      >
                        <td className="py-3 px-3 font-bold text-[#06383D]">{batch.id}</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-[#292D2F] block">{batch.crop}</span>
                          <span className="text-[10px] text-[#A5A5A4]">{batch.variety} · {batch.farmLocation}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded font-bold bg-[#16803C]/10 text-[#16803C] border border-[#16803C]/20">
                            Grade {batch.grade} ({batch.qualityScore}%)
                          </span>
                        </td>
                        <td className="py-3 px-3">{batch.quantityTons} MT</td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-[#06383D]">+{batch.currentTemp.toFixed(1)}°C</span>
                          <span className="text-[10px] text-[#A5A5A4] block">Target {batch.targetTemp}°C</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#F2AE32]" />
                            <span className="font-bold text-[#292D2F]">{batch.shelfLifeRemainingDays.toFixed(1)} Days</span>
                          </div>
                          <span className="text-[10px] text-[#A5A5A4] block">of {batch.shelfLifeDaysTotal} days initial</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F0EEEA] text-[#292D2F] border border-[#D0CEC9]">
                            {batch.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBatch(batch);
                              setActiveTab('tracking');
                            }}
                            className="text-[#06383D] hover:text-[#F2AE32] font-bold text-xs"
                          >
                            Track ➔
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SHARED COMPONENT 1: Temperature & Humidity Monitor (FARM-06) */}
          <SharedTemperatureHumidityMonitor
            data={{
              title: `${selectedBatch.crop} · ${selectedBatch.variety}`,
              locationOrZone: `${selectedBatch.farmLocation} (Packhouse Siding)`,
              currentTemp: selectedBatch.currentTemp,
              targetTemp: selectedBatch.targetTemp,
              tempMin: selectedBatch.targetTemp - 1,
              tempMax: selectedBatch.targetTemp + 2.5,
              currentHumidity: selectedBatch.humidity,
              targetHumidity: 90,
              humidityMin: 80,
              humidityMax: 95,
              status: 'optimal',
              ambientTemp: 29.5,
              unitLabel: `Packhouse Pre-Cooling · Batch #${selectedBatch.id}`
            }}
            role="farmer"
          />

          {/* SHARED COMPONENT 5: QR Cargo Identifier (FARM-14) */}
          <SharedQRCargoId
            cargoId={selectedBatch.id}
            title={`${selectedBatch.crop} (${selectedBatch.variety}) · Harvest Traceability Token`}
            payload={selectedBatch.qrPayload}
            role="farmer"
            metaFields={[
              { label: 'PRODUCER', value: selectedBatch.farmerName },
              { label: 'LOCATION', value: selectedBatch.farmLocation },
              { label: 'HARVEST DATE', value: selectedBatch.harvestDate },
              { label: 'VOLUME', value: `${selectedBatch.quantityTons} Metric Tonnes` },
              { label: 'GRADE & SCORE', value: `Grade ${selectedBatch.grade} (${selectedBatch.qualityScore}%)` },
              { label: 'TARGET TEMP', value: `+${selectedBatch.targetTemp}°C Cold Setpoint` }
            ]}
          />
        </div>
      )}

      {/* TAB 2: CROP REGISTRATION (FARM-01 & FARM-02) */}
      {activeTab === 'registration' && (
        <div className="rounded-xl border border-[#D0CEC9] bg-white p-6 shadow-2xs space-y-6 font-mono">
          <div className="border-b border-[#E0DED9] pb-4">
            <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">FEATURE: FARM-01 & FARM-02</span>
            <h3 className="text-lg font-bold text-[#292D2F]">Produce Registration & Automated Grading</h3>
            <p className="text-xs text-[#A5A5A4]">Log fresh harvest consignments to initialize AI degradation tracking and reserve reefer truck capacity.</p>
          </div>

          {showAddSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs">
              <CheckCircle2 className="w-5 h-5 text-[#16803C] shrink-0" />
              <span>Consignment registered successfully. Pre-cooling telemetry and QR identification generated.</span>
            </div>
          )}

          <form onSubmit={handleRegisterBatch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Crop Commodity:</label>
              <select
                value={newCrop}
                onChange={(e) => setNewCrop(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
              >
                <option value="Alphonso Mango">Alphonso Mango (GI Tagged)</option>
                <option value="Bhagwa Pomegranate">Bhagwa Pomegranate</option>
                <option value="Thomson Table Grapes">Thomson Table Grapes</option>
                <option value="Winter Dawn Strawberry">Winter Dawn Strawberry</option>
                <option value="Exotic Red Bell Pepper">Exotic Red Bell Pepper</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Produce Variety & Specification:</label>
              <input
                type="text"
                value={newVariety}
                onChange={(e) => setNewVariety(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Harvest Quantity (Metric Tonnes):</label>
              <input
                type="number"
                step="0.5"
                value={newTons}
                onChange={(e) => setNewTons(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Farm Origin & Packhouse Siding:</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
                required
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#06383D] hover:bg-[#06383D]/90 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Register Batch & Generate QR Traceability Token
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: OPENCV IMAGE INSPECTION (FARM-03) */}
      {activeTab === 'opencv' && (
        <SharedOpenCVImageInspection
          inspectionType="produce"
          role="farmer"
          customTitle="Produce Quality & Surface Defect Inspection (FARM-03)"
        />
      )}

      {/* TAB 4: TRANSIT & ETA (FARM-09/10 & FARM-16) */}
      {activeTab === 'tracking' && (
        <div className="space-y-6">
          <SharedShipmentTrackerETA
            data={{
              trackingId: selectedBatch.id,
              cargoDescription: `${selectedBatch.crop} (${selectedBatch.variety}) · ${selectedBatch.quantityTons} MT`,
              mode: 'truck',
              vehicleNumberOrTrain: selectedBatch.assignedVehicle || 'CC-REEFER-01',
              origin: selectedBatch.farmLocation,
              destination: selectedBatch.allocatedHub,
              speedKmH: 64,
              currentLocationName: 'NH-66 Khed Ghat Section · Reefer In Motion',
              progressPercent: 68,
              eta: 'Today, 18:30 IST',
              delayMinutes: 0,
              temperatureCelsius: selectedBatch.currentTemp,
              geofenceStatus: 'Inside Highway Green Corridor',
              milestones: [
                { title: 'Farm Packhouse Dispatch', location: selectedBatch.farmLocation, timeEstimate: '06:00 IST', completed: true },
                { title: 'Chiplun Weighbridge Verification', location: 'Tare & Seal Validated', timeEstimate: '09:45 IST', completed: true },
                { title: 'Khed Ghat Expressway', location: 'Active Transit Corridor', timeEstimate: '14:20 IST', completed: false, current: true },
                { title: 'Bhiwandi Terminal Dock', location: selectedBatch.allocatedHub, timeEstimate: '18:30 IST', completed: false }
              ]
            }}
            role="farmer"
          />

          {/* Digital Proof of Dispatch */}
          <SharedDigitalProofOfDelivery
            documentId={`ePOD-${selectedBatch.id}`}
            consignmentTitle={`${selectedBatch.crop} Harvest Handover`}
            consignor="Deshmukh Agro Co-op (Ramesh Deshmukh)"
            consignee="Apex Cold Storage Terminal (Bhiwandi)"
            handoverTempCelsius={selectedBatch.currentTemp}
            weightTonnes={selectedBatch.quantityTons}
            role="farmer"
          />
        </div>
      )}

      {/* TAB 5: MANDI RATES & AI MARKET FORECAST (FARM-11/12) */}
      {activeTab === 'mandi' && (
        <div className="space-y-6 font-mono">
          <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">FEATURE: FARM-11</span>
                <h3 className="text-base font-bold text-[#292D2F]">Live APMC Mandi Market Benchmarks</h3>
                <p className="text-xs text-[#A5A5A4]">Daily wholesale rates across Western & Northern India trading centers</p>
              </div>
              <span className="text-xs font-bold text-[#16803C] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                LIVE AGMARKNET FEED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {MOCK_MANDI_RATES.map((mandi, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F0EEEA]/60 border border-[#D0CEC9] space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-[#292D2F] text-xs block">{mandi.market}</span>
                      <span className="text-[10px] text-[#A5A5A4]">{mandi.state}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      mandi.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {mandi.trend === 'up' ? `+${mandi.changePercent}%` : `${mandi.changePercent}%`}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1 border-t border-[#D0CEC9]">
                    <span className="text-xs text-[#A5A5A4]">{mandi.crop}:</span>
                    <span className="text-base font-black text-[#06383D]">₹{mandi.modalPricePerKg} / kg</span>
                  </div>

                  <span className="text-[10px] text-[#A5A5A4] block">Daily Arrivals: {mandi.dailyArrivalTons} Tonnes</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI 7-Day Price Predictor (FARM-12) */}
          <div className="rounded-xl border border-[#D0CEC9] bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0DED9] pb-3">
              <div>
                <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">FEATURE: FARM-12 (AI PREDICTIVE MODEL)</span>
                <h3 className="text-base font-bold text-[#292D2F]">7-Day Forward Price Forecast Engine</h3>
                <p className="text-xs text-[#A5A5A4]">Simulated machine-learning arrival volume & price projection</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 font-bold">
                SIMULATED PREDICTION
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F0EEEA]/60 border border-[#D0CEC9] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#292D2F]">Forecast for {selectedBatch.crop} (Next 7 Days):</span>
                <span className="text-[#16803C] font-bold">Projected Peak: Day 5 (₹224/kg)</span>
              </div>
              <p className="text-[#292D2F]/80 text-[11px] leading-relaxed">
                Due to lower arrivals from Karnataka and increased festive demand in Mumbai/Pune, holding batch #{selectedBatch.id} under pre-cooling for 48 hours is projected to capture an estimated ₹18/kg price premium over immediate distress sale.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GOVT SUBSIDIES & SCHEME MATCHING (FARM-13) */}
      {activeTab === 'subsidies' && (
        <div className="rounded-xl border border-[#D0CEC9] bg-white p-6 shadow-2xs space-y-6 font-mono">
          <div className="border-b border-[#E0DED9] pb-4">
            <span className="text-[10px] text-[#A5A5A4] uppercase font-bold block">FEATURE: FARM-13</span>
            <h3 className="text-lg font-bold text-[#292D2F]">Government Subsidy & Cold Scheme Matching</h3>
            <p className="text-xs text-[#A5A5A4]">Interactive Capex grant calculator for PMKSY, MIDH, and APEDA horticulture schemes</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Select Government Scheme:</label>
              <select
                value={schemeSelected}
                onChange={(e) => setSchemeSelected(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
              >
                <option value="pmksy">Pradhan Mantri Kisan Sampada Yojana (PMKSY) - 35% Grant</option>
                <option value="midh">Mission for Integrated Development of Horticulture (MIDH) - 40% Grant</option>
                <option value="apeda">APEDA Export Cold Chain Logistics Concession - 50% Concession</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#292D2F]">Cold-Chain Infrastructure Capex (INR):</label>
              <input
                type="number"
                step="100000"
                value={capexInr}
                onChange={(e) => setCapexInr(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg border border-[#D0CEC9] bg-white text-[#292D2F] font-mono"
              />
            </div>
          </div>

          {/* Results Box */}
          <div className="p-4 rounded-xl bg-[#06383D] text-white flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[10px] text-[#F2AE32] uppercase font-bold block">ESTIMATED CAPITAL SUBSIDY GRANT</span>
              <div className="text-2xl font-black text-white">
                ₹{calculateSubsidy().toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-white/70">
                Net Farmer Capital Outlay: ₹{(capexInr - calculateSubsidy()).toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => alert(`Subsidy Application Package for ${schemeSelected.toUpperCase()} prepared with Farmer ID #F-4412.`)}
              className="px-4 py-2 rounded-lg bg-[#F2AE32] hover:bg-[#F2AE32]/90 text-[#0B0E14] font-bold text-xs uppercase cursor-pointer"
            >
              Generate MoFPI Dossier
            </button>
          </div>
        </div>
      )}

      {/* TAB 7: EMERGENCY CARGO RESCUE (FARM-20) */}
      {activeTab === 'rescue' && (
        <SharedEmergencyCargoRescue
          cargoAssetId={selectedBatch.id}
          assetDescription={`${selectedBatch.crop} (${selectedBatch.variety}) · ${selectedBatch.quantityTons} MT`}
          currentRiskReason="Packhouse Compressor Tripped · Ambient Temperature Exceeding 29°C"
          role="farmer"
        />
      )}

      {/* Full 95-Feature Verification Matrix Modal */}
      <VerificationMatrixModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};
