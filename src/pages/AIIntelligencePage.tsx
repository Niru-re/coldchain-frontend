import React, { useState } from 'react';
import {
  Clock,
  ShieldAlert,
  Calculator,
  RotateCcw,
  Landmark,
  Leaf,
  Recycle,
  Users,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Info,
  DollarSign,
  Thermometer,
  Truck,
  ExternalLink,
  ChevronRight,
  Zap,
  Navigation
} from 'lucide-react';

export const AIIntelligencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'survival-clock' | 
    'rescue-engine' | 
    'loss-calculator' | 
    'reverse-logistics' | 
    'govt-benefits' | 
    'green-fleet' | 
    'waste-fertilizer' | 
    'driver-relay'
  >('survival-clock');

  // Interactive Survival Clock State
  const [cargoType, setCargoType] = useState<'vaccines' | 'dairy' | 'seafood' | 'berries'>('vaccines');
  const [currentTempInput, setCurrentTempInput] = useState<number>(4.2);

  // Interactive Loss Calculator State
  const [cargoValueInr, setCargoValueInr] = useState<number>(2400000);
  const [riskFactorPct, setRiskFactorPct] = useState<number>(65);

  // Rescue Engine Action Trigger State
  const [appliedRescue, setAppliedRescue] = useState<string | null>(null);

  // Reverse Logistics Triage State
  const [rejectedBatchCond, setRejectedBatchCond] = useState<'minor_excursion' | 'severe_spoilage' | 'damaged_packaging'>('minor_excursion');

  // Green Fleet Option
  const [fleetDistanceKm, setFleetDistanceKm] = useState<number>(450);

  // Driver Relay Route Option
  const [relayCorridor, setRelayCorridor] = useState<'delhi-mumbai' | 'mumbai-chennai' | 'nagpur-kolkata'>('delhi-mumbai');

  // Feature 5: Govt Benefit Optimizer State
  const [govtCapexLakhs, setGovtCapexLakhs] = useState<number>(120);
  const [govtCategory, setGovtCategory] = useState<'reefer_fleet' | 'cold_storage' | 'solar_packhouse'>('reefer_fleet');
  const [govtRegion, setGovtRegion] = useState<'general' | 'hilly'>('general');
  const [govtResult, setGovtResult] = useState<any>({
    subsidyPct: 35,
    grantLakhs: 42.0,
    aifSubventionLakhs: 6.0,
    depreciationLakhs: 30.0,
    totalBenefitLakhs: 78.0,
    recommendedScheme: 'PM Kisan SAMPADA Yojana (MOFPI Cold Chain)',
    turnaroundDays: 45
  });

  // Feature 7: Organic Waste-to-Fertilizer State
  const [wasteWeightTons, setWasteWeightTons] = useState<number>(8.4);
  const [wasteType, setWasteType] = useState<'vegetables' | 'citrus' | 'dairy'>('vegetables');
  const [wasteResult, setWasteResult] = useState<any>({
    compostKg: 3528,
    biogasM3: 1512,
    feedstockCreditInr: 31920,
    co2PreventedTons: 15.5,
    matchedFacility: 'Godavari Agri-Bio Composting & Organic Fertilizer Unit, Niphad'
  });
  const [wasteDispatched, setWasteDispatched] = useState<boolean>(false);

  // Feature 8: Driver Relay Fleet State
  const [relayDistanceKm, setRelayDistanceKm] = useState<number>(1420);
  const [leadDriverHours, setLeadDriverHours] = useState<number>(7.5);
  const [relayResult, setRelayResult] = useState<any>({
    relaysNeeded: 3,
    handoversPlanned: 2,
    fatigueRiskMitigated: 92,
    coolingUptimePct: 100
  });
  const [relayDispatched, setRelayDispatched] = useState<boolean>(false);

  // Survival Clock Calculations based on Arrhenius Kinetics
  const cargoLimits = {
    vaccines: { name: 'Active Biologics & Vaccines', min: 2.0, max: 8.0, baseHours: 72, criticalTemp: 10.0 },
    dairy: { name: 'Specialty Probiotic Dairy', min: 0.0, max: 4.0, baseHours: 96, criticalTemp: 7.0 },
    seafood: { name: 'Fresh Marine Salmon & Fillets', min: -2.0, max: 2.0, baseHours: 48, criticalTemp: 5.0 },
    berries: { name: 'High-Value Strawberries & Berries', min: 1.0, max: 5.0, baseHours: 120, criticalTemp: 9.0 },
  };

  const selectedCargo = cargoLimits[cargoType];
  const isTempHigh = currentTempInput > selectedCargo.max;
  const isTempLow = currentTempInput < selectedCargo.min;
  const isExcursion = isTempHigh || isTempLow;

  const tempDelta = isTempHigh 
    ? currentTempInput - selectedCargo.max 
    : isTempLow 
    ? selectedCargo.min - currentTempInput 
    : 0;

  // Exponential shelf life decay when exceeding threshold
  const remainingHours = Math.max(
    0.5,
    Number(
      (
        selectedCargo.baseHours * 
        (isExcursion ? Math.exp(-0.45 * tempDelta) : 1)
      ).toFixed(1)
    )
  );

  const riskLevel = !isExcursion ? 'Low' : tempDelta > 3.0 ? 'Critical' : 'Moderate';

  // Loss Calculator Values
  const estimatedPotentialLoss = Math.round(cargoValueInr * (riskFactorPct / 100));
  const estimatedRescueCost = 48500;
  const estimatedNetBenefit = Math.max(0, estimatedPotentialLoss - estimatedRescueCost);

  // Relay Corridor Configuration
  const relayCorridorData = {
    'delhi-mumbai': {
      totalDistanceKm: 1420,
      handovers: [
        { km: 480, point: 'Jaipur Outer Ring Logistics Bay', driverIn: 'Rajesh Sharma', driverOut: 'Mahesh Solanki', status: 'Confirmed' },
        { km: 960, point: 'Godhra Express Reefer Staging', driverIn: 'Mahesh Solanki', driverOut: 'Sunil Jadhav', status: 'Scheduled' },
        { km: 1420, point: 'Bhiwandi Central Cold Hub (Final Delivery)', driverIn: 'Sunil Jadhav', driverOut: 'Local Dock Lead', status: 'Planned' },
      ],
    },
    'mumbai-chennai': {
      totalDistanceKm: 1340,
      handovers: [
        { km: 510, point: 'Hubballi Multi-Modal Junction', driverIn: 'Vikram Rathore', driverOut: 'K. Venkatesh', status: 'Confirmed' },
        { km: 1020, point: 'Bengaluru Electronic City Bypass', driverIn: 'K. Venkatesh', driverOut: 'Suresh Kumar', status: 'Scheduled' },
        { km: 1340, point: 'Chennai Port Cold Terminal', driverIn: 'Suresh Kumar', driverOut: 'Port Inbound Lead', status: 'Planned' },
      ],
    },
    'nagpur-kolkata': {
      totalDistanceKm: 1180,
      handovers: [
        { km: 490, point: 'Raipur Express Freight Yard', driverIn: 'Amit Verma', driverOut: 'Bikram Das', status: 'Confirmed' },
        { km: 980, point: 'Kharagpur Cold Terminal Gate 4', driverIn: 'Bikram Das', driverOut: 'Manoj Shinde', status: 'Scheduled' },
        { km: 1180, point: 'Dankuni Warehousing Complex', driverIn: 'Manoj Shinde', driverOut: 'Consignee Receiver', status: 'Planned' },
      ],
    },
  };

  const currentRelay = relayCorridorData[relayCorridor];

  // Feature 5 Calculation Handler
  const handleCalculateGovtBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    const subPct = govtRegion === 'hilly' ? 50 : 35;
    const grant = Number((govtCapexLakhs * (subPct / 100)).toFixed(1));
    const aif = Number(Math.min(12.0, (govtCapexLakhs * 0.03 * 7) / 2).toFixed(1));
    const depr = Number((govtCapexLakhs * 0.25).toFixed(1));
    const scheme = govtCategory === 'reefer_fleet'
      ? 'FAME-II / PMKSY Integrated Reefer Subsidy'
      : govtCategory === 'solar_packhouse'
      ? 'MIDH Solar Pack-House Scheme'
      : 'PM Kisan SAMPADA Integrated Cold Chain Scheme';

    setGovtResult({
      subsidyPct: subPct,
      grantLakhs: grant,
      aifSubventionLakhs: aif,
      depreciationLakhs: depr,
      totalBenefitLakhs: Number((grant + aif + depr).toFixed(1)),
      recommendedScheme: scheme,
      turnaroundDays: 45
    });
  };

  // Feature 7 Calculation Handler
  const handleCalculateWasteBiomass = (e: React.FormEvent) => {
    e.preventDefault();
    const compost = Math.round(wasteWeightTons * 1000 * 0.42);
    const biogas = Math.round(wasteWeightTons * 180);
    const credit = Math.round(wasteWeightTons * (wasteType === 'citrus' ? 3800 : wasteType === 'dairy' ? 4200 : 3500));
    const co2 = Number((wasteWeightTons * 1.85).toFixed(1));
    const plant = wasteType === 'citrus'
      ? 'Vidarbha Bio-Manure & Vermicompost Hub, Butibori MIDC'
      : wasteType === 'dairy'
      ? 'Baramati Agro Anaerobic Digester Complex'
      : 'Godavari Agri-Bio Composting & Organic Fertilizer Unit, Niphad';

    setWasteResult({
      compostKg: compost,
      biogasM3: biogas,
      feedstockCreditInr: credit,
      co2PreventedTons: co2,
      matchedFacility: plant
    });
    setWasteDispatched(false);
  };

  // Feature 8 Calculation Handler
  const handleCalculateRelay = (e: React.FormEvent) => {
    e.preventDefault();
    const needed = Math.max(1, Math.ceil(relayDistanceKm / 500));
    const handovers = Math.max(1, needed - 1);
    const mitigated = Math.min(96, Math.round(75 + (leadDriverHours * 2.8)));

    setRelayResult({
      relaysNeeded: needed,
      handoversPlanned: handovers,
      fatigueRiskMitigated: mitigated,
      coolingUptimePct: 100
    });
    setRelayDispatched(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-8 px-4 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              AI Intelligence
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              8 AUTONOMOUS COLD-CHAIN MODULES
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            ColdChain 360 Predictive Analytics &bull; Arrhenius Thermal Kinetics &bull; Fleet Optimization Suite
          </p>
        </div>

        {/* Demo / Mathematical Modeling Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#D0CEC9] text-[11px] font-mono text-[#292D2F] shadow-xs">
          <Info className="w-3.5 h-3.5 text-[#F2AE32]" />
          <span>Mathematical Kinetic Model (Predictions &bull; Integration Ready)</span>
        </div>
      </div>

      {/* Grid of the Exact 8 AI Features Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {[
          { id: 'survival-clock', title: '1. Survival Clock', icon: Clock },
          { id: 'rescue-engine', title: '2. Rescue Engine', icon: ShieldAlert },
          { id: 'loss-calculator', title: '3. Loss Calculator', icon: Calculator },
          { id: 'reverse-logistics', title: '4. Reverse Logistics', icon: RotateCcw },
          { id: 'govt-benefits', title: '5. Govt Benefits', icon: Landmark },
          { id: 'green-fleet', title: '6. Green Fleet', icon: Leaf },
          { id: 'waste-fertilizer', title: '7. Waste-to-Bio', icon: Recycle },
          { id: 'driver-relay', title: '8. Driver Relay', icon: Users },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer font-mono text-xs ${
                isActive
                  ? 'bg-[#06383D] text-white border-[#06383D] font-bold shadow-sm'
                  : 'bg-white text-[#292D2F] border-[#D0CEC9] hover:border-[#06383D]/40 hover:bg-[#F0EEEA]'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1.5 ${isActive ? 'text-[#F2AE32]' : 'text-[#06383D]'}`} />
              <span className="text-[11px] leading-tight truncate w-full">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE AI FEATURE WORKBENCH */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 lg:p-8 shadow-sm space-y-6">

        {/* ============================================================== */}
        {/* FEATURE 1: AI CARGO SURVIVAL CLOCK */}
        {/* ============================================================== */}
        {activeTab === 'survival-clock' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Clock className="w-4 h-4" />
                  <span>Feature 01 · Kinetic Thermal Degradation</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Cargo Survival Clock
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Estimates the remaining safe time for temperature-sensitive cargo using Arrhenius biochemical reaction rates.
                </p>
              </div>

              <div className="bg-[#F0EEEA] px-3 py-1.5 rounded-lg border border-[#D0CEC9] text-[10px] font-mono text-[#A5A5A4]">
                DISCLAIMER: Predicted estimates based on kinetic decay formulas, not absolute guarantees.
              </div>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9]">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#292D2F] mb-2">
                  Select Cargo Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(cargoLimits) as (keyof typeof cargoLimits)[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setCargoType(key)}
                      className={`p-2.5 rounded-lg text-xs font-mono font-bold border transition-all text-left cursor-pointer ${
                        cargoType === key
                          ? 'bg-[#06383D] text-white border-[#06383D]'
                          : 'bg-white text-[#292D2F] border-[#D0CEC9] hover:bg-white/80'
                      }`}
                    >
                      {cargoLimits[key].name.split('&')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#292D2F] mb-2">
                  Simulated Core Sensor Temperature: <span className="text-[#06383D] font-black">{currentTempInput > 0 ? `+${currentTempInput}` : currentTempInput}°C</span>
                </label>
                <input
                  type="range"
                  min="-25"
                  max="20"
                  step="0.2"
                  value={currentTempInput}
                  onChange={(e) => setCurrentTempInput(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#A5A5A4] mt-2">
                  <span>-25°C (Deep Frozen)</span>
                  <span className="text-[#06383D] font-bold">Safe Envelope: {selectedCargo.min}°C to {selectedCargo.max}°C</span>
                  <span>+20°C (Ambient Solar Soak)</span>
                </div>
              </div>
            </div>

            {/* Prediction Output Card */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">CARGO TEMPERATURE</span>
                <div className="text-2xl font-black text-[#292D2F] mt-1">
                  {currentTempInput > 0 ? `+${currentTempInput}` : currentTempInput}°C
                </div>
                <div className="text-[10px] text-[#A5A5A4] mt-1">Required: {selectedCargo.min}°C to {selectedCargo.max}°C</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">THERMAL RISK LEVEL</span>
                <div className={`text-2xl font-black mt-1 ${
                  riskLevel === 'Critical' ? 'text-[#DC2626]' : riskLevel === 'Moderate' ? 'text-[#F2AE32]' : 'text-[#16803C]'
                }`}>
                  {riskLevel}
                </div>
                <div className="text-[10px] text-[#A5A5A4] mt-1">{isExcursion ? `${tempDelta.toFixed(1)}°C excursion above limit` : 'Within safe envelope'}</div>
              </div>

              <div className="p-4 rounded-xl bg-[#06383D] text-white shadow-xs">
                <span className="text-[10px] text-[#F2AE32] uppercase font-bold">ESTIMATED SAFE TIME</span>
                <div className="text-3xl font-black text-white mt-1">
                  {remainingHours} <span className="text-sm font-normal text-[#F0EEEA]">Hours</span>
                </div>
                <div className="text-[10px] text-[#A5A5A4] mt-1">Prior to irreversible biochemical decay</div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">SPOILAGE WARNING</span>
                  <div className="text-xs font-bold text-[#292D2F] mt-1">
                    {riskLevel === 'Critical' 
                      ? 'IMMINENT LOSS: Arrhenius protein denaturation in progress.'
                      : riskLevel === 'Moderate'
                      ? 'ELEVATED RISK: Active enzyme breakdown accelerated 2.4x.'
                      : 'NOMINAL: Molecular stability compliant.'}
                  </div>
                </div>
                {riskLevel !== 'Low' && (
                  <button 
                    onClick={() => setActiveTab('rescue-engine')}
                    className="text-[10px] font-bold text-[#06383D] hover:text-[#F2AE32] flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    <span>Trigger AI Rescue Engine</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 2: AI CARGO RESCUE ENGINE */}
        {/* ============================================================== */}
        {activeTab === 'rescue-engine' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Feature 02 · Autonomous Intervention</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Cargo Rescue Engine
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Recommends feasible rescue actions such as route changes, backup refrigerated vehicles, or emergency cold-storage facilities.
                </p>
              </div>
            </div>

            {/* Candidate Rescue Actions */}
            <div className="space-y-4">
              {[
                {
                  id: 'RESCUE-01',
                  type: 'COLD STORAGE DIVERT',
                  title: 'Emergency Offload to Bhiwandi Agro Cold Terminal (Bay 4)',
                  reason: 'Secondary compressor micro-leakage detected. Temperature at +5.6°C (safe limit: +2.0°C). 18 km diversion.',
                  eta: '34 Minutes Divert ETA',
                  cost: '₹14,500 (Pre-cooling & Dock Fee)',
                  impact: 'Preserves 100% of ₹24.0L Active Biologics batch.',
                  badge: 'Highest Recommendation',
                },
                {
                  id: 'RESCUE-02',
                  type: 'BACKUP REEFER DISPATCH',
                  title: 'Dispatch Standby Reefer Unit CC-REEFER-07 from Thane Dock',
                  reason: 'Cross-dock cargo transfer on NH-48 Khopoli Service Lane. Transfer time 22 mins.',
                  eta: '52 Minutes Intercept ETA',
                  cost: '₹28,000 (Dispatch & Cross-Dock Labor)',
                  impact: 'Maintains uninterrupted transit to Pune Bio-Cluster.',
                  badge: 'Alternative Option',
                },
                {
                  id: 'RESCUE-03',
                  type: 'FAST-TRACK CORRIDOR REROUTE',
                  title: 'Priority Toll & Green Corridor Reroute via Mumbai-Pune Expressway',
                  reason: 'Bypasses 45m Kasara Ghat congestion. Reduces solar soak duration by 1.2 hours.',
                  eta: '1h 10m Direct Arrival',
                  cost: '₹6,000 (Express Toll & Green Wave Fee)',
                  impact: 'Arrives before critical Arrhenius threshold is breached.',
                  badge: 'Fastest Route Action',
                },
              ].map((rescue) => (
                <div
                  key={rescue.id}
                  className="p-5 rounded-xl border border-[#D0CEC9] bg-white hover:border-[#06383D]/60 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#06383D] text-[#F2AE32] text-[10px] font-bold">
                        {rescue.type}
                      </span>
                      <span className="text-xs text-[#A5A5A4] font-semibold">{rescue.badge}</span>
                    </div>
                    <div className="text-sm font-black text-[#292D2F]">{rescue.title}</div>
                    <div className="text-xs text-[#A5A5A4]">{rescue.reason}</div>
                    <div className="text-xs text-[#06383D] font-bold pt-1">{rescue.impact}</div>
                  </div>

                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[#D0CEC9] pt-3 md:pt-0 md:pl-6 text-right">
                    <div>
                      <div className="text-xs font-bold text-[#292D2F]">{rescue.eta}</div>
                      <div className="text-xs text-[#F2AE32] font-black">{rescue.cost}</div>
                    </div>
                    <button
                      onClick={() => setAppliedRescue(rescue.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        appliedRescue === rescue.id
                          ? 'bg-[#16803C] text-white'
                          : 'bg-[#06383D] text-white hover:bg-[#06383D]/85'
                      }`}
                    >
                      {appliedRescue === rescue.id ? '✓ RESCUE DISPATCHED' : 'AUTHORIZE ACTION'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 3: AI LOSS CALCULATOR */}
        {/* ============================================================== */}
        {activeTab === 'loss-calculator' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Calculator className="w-4 h-4" />
                  <span>Feature 03 · Financial Risk Modeling</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Loss Calculator
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Estimates potential financial losses from cargo spoilage or delivery failure against rescue costs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9] font-mono">
              <div>
                <label className="block text-xs font-bold uppercase text-[#292D2F] mb-1">
                  Total Cargo Consignment Value (INR): ₹{(cargoValueInr / 100000).toFixed(1)} Lakhs
                </label>
                <input
                  type="range"
                  min="200000"
                  max="10000000"
                  step="100000"
                  value={cargoValueInr}
                  onChange={(e) => setCargoValueInr(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#292D2F] mb-1">
                  Spoilage Risk Probability: {riskFactorPct}%
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={riskFactorPct}
                  onChange={(e) => setRiskFactorPct(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                />
              </div>
            </div>

            {/* Financial Analysis Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-5 rounded-xl bg-white border border-red-200 shadow-xs">
                <span className="text-[10px] text-[#DC2626] font-bold uppercase">POTENTIAL CARGO LOSS</span>
                <div className="text-3xl font-black text-[#DC2626] mt-1">
                  ₹{(estimatedPotentialLoss / 100000).toFixed(2)} L
                </div>
                <div className="text-xs text-[#A5A5A4] mt-1">Direct invoice write-off risk</div>
              </div>

              <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                <span className="text-[10px] text-[#A5A5A4] font-bold uppercase">INTERVENTION / RESCUE COST</span>
                <div className="text-3xl font-black text-[#292D2F] mt-1">
                  ₹{(estimatedRescueCost / 1000).toFixed(1)} K
                </div>
                <div className="text-xs text-[#A5A5A4] mt-1">Backup hauler + pre-cooling bay</div>
              </div>

              <div className="p-5 rounded-xl bg-[#06383D] text-white shadow-xs">
                <span className="text-[10px] text-[#F2AE32] font-bold uppercase">NET BENEFIT OF INTERVENTION</span>
                <div className="text-3xl font-black text-[#F2AE32] mt-1">
                  ₹{(estimatedNetBenefit / 100000).toFixed(2)} L
                </div>
                <div className="text-xs text-[#F0EEEA] mt-1">ROI: {(estimatedNetBenefit / estimatedRescueCost).toFixed(1)}x saved</div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 4: AI REVERSE LOGISTICS OPTIMIZER */}
        {/* ============================================================== */}
        {activeTab === 'reverse-logistics' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <RotateCcw className="w-4 h-4" />
                  <span>Feature 04 · Return & Rejection Management</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Reverse Logistics Optimizer
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Manages returned or rejected shipments and recommends return transport, inspection, recovery, reuse, or safe disposal.
                </p>
              </div>
            </div>

            {/* Select Rejection Condition */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: 'minor_excursion', label: '1. Mild Excursion (Within Shelf-Life Tolerance)' },
                { id: 'damaged_packaging', label: '2. Compromised Outer Seal / Physical Damage' },
                { id: 'severe_spoilage', label: '3. Complete Thermal Breakdown (Spoiled)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setRejectedBatchCond(item.id as any)}
                  className={`px-3 py-2 rounded-lg border font-bold transition-all cursor-pointer ${
                    rejectedBatchCond === item.id
                      ? 'bg-[#06383D] text-white border-[#06383D]'
                      : 'bg-white text-[#292D2F] border-[#D0CEC9] hover:bg-[#F0EEEA]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Triage Decision Card */}
            <div className="p-6 rounded-xl bg-[#F0EEEA] border border-[#D0CEC9] font-mono space-y-4">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
                <span className="text-xs font-bold uppercase text-[#06383D]">
                  RECOMMENDED DISPOSITION PROTOCOL
                </span>
                <span className="px-2 py-0.5 rounded bg-white text-[#292D2F] text-[10px] font-bold border border-[#D0CEC9]">
                  FSSAI & WHO GDP COMPLIANT
                </span>
              </div>

              {rejectedBatchCond === 'minor_excursion' && (
                <div className="space-y-2">
                  <h3 className="text-base font-black text-[#292D2F]">
                    ACTION: Secondary Quality Re-Inspection & Secondary Channel Sale
                  </h3>
                  <p className="text-xs text-[#A5A5A4]">
                    The batch was rejected at consignee dock due to minor delivery slot delay, but thermal core logging confirms zero Arrhenius microbial threshold breaches. 
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">TRANSPORT</span>
                      <strong className="text-[#06383D]">Re-route to Bhiwandi Secondary Cold Hub</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">ESTIMATED RECOVERY</span>
                      <strong className="text-[#16803C]">82% Value (Institutional Buyer)</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">DISPOSAL REQUIREMENT</span>
                      <strong className="text-[#292D2F]">None (Fit for Consumption)</strong>
                    </div>
                  </div>
                </div>
              )}

              {rejectedBatchCond === 'damaged_packaging' && (
                <div className="space-y-2">
                  <h3 className="text-base font-black text-[#292D2F]">
                    ACTION: Return to Manufacturer Staging Bay for Re-Packing
                  </h3>
                  <p className="text-xs text-[#A5A5A4]">
                    Outer corrugated shipper box torn in transit, but inner sterile blister barrier and continuous -20°C temperature intact.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">TRANSPORT</span>
                      <strong className="text-[#06383D]">Return to Baddi Pharma Park via reverse relay</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">RECOVERY ACTION</span>
                      <strong className="text-[#F2AE32]">Re-label and replace secondary packaging</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">COST SAVED</span>
                      <strong className="text-[#16803C]">₹18.4 Lakhs vs Total Write-off</strong>
                    </div>
                  </div>
                </div>
              )}

              {rejectedBatchCond === 'severe_spoilage' && (
                <div className="space-y-2">
                  <h3 className="text-base font-black text-[#DC2626]">
                    ACTION: Safe Bio-Hazard / Organic Composting Diversion
                  </h3>
                  <p className="text-xs text-[#A5A5A4]">
                    Critical temperature breach for over 6 hours resulted in irreversible spoilage. Human or animal consumption is strictly prohibited under health safety guidelines.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">TRANSPORT</span>
                      <strong className="text-[#DC2626]">Direct transfer to certified bio-degradation plant</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">SUSTAINABLE OUTCOME</span>
                      <strong className="text-[#16803C]">Link with AI Organic Waste-to-Fertilizer</strong>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-[#D0CEC9]">
                      <span className="text-[10px] text-[#A5A5A4] block">CERTIFICATE</span>
                      <strong className="text-[#292D2F]">Automated Destruction Certificate for Insurance</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 5: AI GOVERNMENT BENEFIT OPTIMIZER */}
        {/* ============================================================== */}
        {activeTab === 'govt-benefits' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Landmark className="w-4 h-4" />
                  <span>Feature 05 · Regulatory & Subsidy Assistance</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Government Benefit Optimizer
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Helps users discover potentially applicable cold-chain government schemes, eligibility criteria, and official links.
                </p>
              </div>

              <div className="bg-[#F0EEEA] px-3 py-1.5 rounded-lg border border-[#D0CEC9] text-[10px] font-mono text-[#A5A5A4]">
                DISCLAIMER: Scheme information provided for guidance. Eligibility requires official government verification.
              </div>
            </div>

            {/* Interactive Subsidy Grant Calculator Form */}
            <form onSubmit={handleCalculateGovtBenefit} className="bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9] font-mono space-y-4">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                <span className="text-xs font-bold text-[#06383D] uppercase">
                  SIMULATE CAPITAL SUBSIDY & SCHEME QUALIFICATION
                </span>
                <span className="text-[10px] text-[#A5A5A4]">DEMO CALCULATION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Project Capex: ₹{govtCapexLakhs} Lakhs
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="500"
                    step="5"
                    value={govtCapexLakhs}
                    onChange={(e) => setGovtCapexLakhs(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                  />
                  <div className="flex justify-between text-[10px] text-[#A5A5A4] mt-1">
                    <span>₹25 Lakhs</span>
                    <span>₹500 Lakhs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">Asset Category</label>
                  <select
                    value={govtCategory}
                    onChange={(e) => setGovtCategory(e.target.value as any)}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg p-2 font-bold text-[#292D2F]"
                  >
                    <option value="reefer_fleet">Refrigerated Vehicle Fleet (OEM Reefers)</option>
                    <option value="cold_storage">Integrated Cold Hub / Packhouse (CA Store)</option>
                    <option value="solar_packhouse">Solar-Powered Cold Staging Unit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">State / Geographic Category</label>
                  <select
                    value={govtRegion}
                    onChange={(e) => setGovtRegion(e.target.value as any)}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg p-2 font-bold text-[#292D2F]"
                  >
                    <option value="general">General Area (35% Base Capital Subsidy)</option>
                    <option value="hilly">Hilly / Himalayan / NE States (50% Subsidy)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#A5A5A4]">Click below to run automated scheme matching & subsidy modeling</span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#06383D] text-white font-bold text-xs uppercase hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                >
                  Calculate Eligible Subsidies
                </button>
              </div>
            </form>

            {/* Structured Results Card */}
            {govtResult && (
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                  <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">CAPITAL GRANT ({govtResult.subsidyPct}%)</span>
                  <div className="text-2xl font-black text-[#16803C] mt-1">
                    ₹{govtResult.grantLakhs} L
                  </div>
                  <div className="text-[10px] text-[#A5A5A4] mt-1">Non-repayable central grant</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                  <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">AIF INTEREST SUBVENTION</span>
                  <div className="text-2xl font-black text-[#06383D] mt-1">
                    ₹{govtResult.aifSubventionLakhs} L
                  </div>
                  <div className="text-[10px] text-[#A5A5A4] mt-1">3% per annum for 7 years</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#D0CEC9] shadow-xs">
                  <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">SEC 35AD TAX RELIEF</span>
                  <div className="text-2xl font-black text-[#292D2F] mt-1">
                    ₹{govtResult.depreciationLakhs} L
                  </div>
                  <div className="text-[10px] text-[#A5A5A4] mt-1">100% first-year tax write-off</div>
                </div>

                <div className="p-4 rounded-xl bg-[#06383D] text-white shadow-xs">
                  <span className="text-[10px] text-[#F2AE32] uppercase font-bold">TOTAL BENEFIT ENVELOPE</span>
                  <div className="text-2xl font-black text-[#F2AE32] mt-1">
                    ₹{govtResult.totalBenefitLakhs} L
                  </div>
                  <div className="text-[10px] text-[#F0EEEA]/80 mt-1">{govtResult.recommendedScheme}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'PM Kisan SAMPADA Yojana (Integrated Cold Chain Scheme)',
                  ministry: 'Ministry of Food Processing Industries (MOFPI)',
                  subsidy: 'Up to 35% to 50% capital grant on Reefer Vehicles and Cold Hubs',
                  eligibility: 'Cold-chain operators, FPOs, Cooperatives, Private Logistics Entities investing in integrated cold chain infrastructure.',
                  docs: 'DPR, Bank Sanction Letter, Land Ownership / Long Lease, GST & PAN, Quotations from Reefer OEMs.',
                  link: 'https://mofpi.gov.in',
                },
                {
                  title: 'Agriculture Infrastructure Fund (AIF)',
                  ministry: 'Ministry of Agriculture & Farmers Welfare',
                  subsidy: '3% interest subvention per annum up to ₹2 Crore for 7 years',
                  eligibility: 'Agri-entrepreneurs, Primary Agricultural Credit Societies, Logistics startups building farm-gate post-harvest cold facilities.',
                  docs: 'Project report, KYC, Land records, Bank feasibility report, Audited financials.',
                  link: 'https://agriinfra.dac.gov.in',
                },
                {
                  title: 'Mission for Integrated Development of Horticulture (MIDH)',
                  ministry: 'National Horticulture Board (NHB)',
                  subsidy: 'Credit-linked back-ended subsidy at 35% of total project cost (50% in hilly states)',
                  eligibility: 'Reefer container trucks, solar-powered pack-houses, ripening chambers, controlled atmosphere stores.',
                  docs: 'NHB In-principle approval, Term loan sanction, Civil & mechanical cost estimates.',
                  link: 'https://nhb.gov.in',
                },
                {
                  title: 'FAME-II / PM E-DRIVE Scheme for Commercial Cold Haulers',
                  ministry: 'Ministry of Heavy Industries',
                  subsidy: 'Demand incentive on commercial electric reefer chassis up to ₹5 Lakhs',
                  eligibility: 'Registered fleet operators acquiring Type-Approved EV commercial goods vehicles with active battery cooling.',
                  docs: 'Vehicle Registration Certificate, ARAI Type Approval, GST Invoice from OEM.',
                  link: 'https://fame2.heavyindustries.gov.in',
                },
              ].map((scheme, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-[#D0CEC9] bg-white font-mono space-y-3 shadow-xs">
                  <div className="flex items-start justify-between gap-2 border-b border-[#D0CEC9] pb-2.5">
                    <div>
                      <h3 className="text-sm font-bold text-[#292D2F]">{scheme.title}</h3>
                      <span className="text-[10px] text-[#A5A5A4]">{scheme.ministry}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#F2AE32]/15 text-[#292D2F] text-[10px] font-bold shrink-0">
                      SUBSIDY
                    </span>
                  </div>

                  <div className="text-xs text-[#06383D] font-bold bg-[#F0EEEA] p-2.5 rounded-lg border border-[#D0CEC9]">
                    {scheme.subsidy}
                  </div>

                  <div className="text-xs text-[#292D2F] space-y-1">
                    <div><strong>Eligibility:</strong> <span className="text-[#A5A5A4]">{scheme.eligibility}</span></div>
                    <div><strong>Required Documents:</strong> <span className="text-[#A5A5A4]">{scheme.docs}</span></div>
                  </div>

                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06383D] hover:text-[#F2AE32] pt-1"
                  >
                    <span>View Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 6: GREEN FLEET OPTIMIZER */}
        {/* ============================================================== */}
        {activeTab === 'green-fleet' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Leaf className="w-4 h-4" />
                  <span>Feature 06 · Eco-Routing & EV Fleet Transition</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  Green Fleet Optimizer
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Recommends suitable electric or fuel-efficient refrigerated vehicles, and estimates energy use, operating costs, and carbon emissions.
                </p>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9] font-mono">
              <label className="block text-xs font-bold uppercase text-[#292D2F] mb-1">
                Route Distance: <span className="text-[#06383D] font-black">{fleetDistanceKm} km</span> (e.g. Mumbai to Pune return transit)
              </label>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={fleetDistanceKm}
                onChange={(e) => setFleetDistanceKm(parseInt(e.target.value))}
                className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
              />
            </div>

            {/* Comparison Cards: EV Reefer vs Conventional Diesel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
              <div className="p-6 rounded-xl bg-white border border-[#D0CEC9] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                  <div className="text-sm font-black text-[#292D2F]">CONVENTIONAL DIESEL REEFER</div>
                  <span className="text-[10px] text-[#A5A5A4]">Euro VI Heavy Carrier</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Diesel Fuel Burn:</span>
                    <strong className="text-[#292D2F]">{(fleetDistanceKm * 0.28).toFixed(1)} Liters</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Reefer Unit Fuel Burn:</span>
                    <strong className="text-[#292D2F]">{(fleetDistanceKm * 0.05).toFixed(1)} Liters</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Fuel Cost (@ ₹92/L):</span>
                    <strong className="text-[#292D2F]">₹{Math.round((fleetDistanceKm * 0.33) * 92).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A5A5A4]">Tailpipe CO2 Emissions:</span>
                    <strong className="text-[#DC2626]">{(fleetDistanceKm * 0.88).toFixed(1)} kg CO2</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-[#06383D] text-white shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F2AE32]/40 pb-2">
                  <div className="text-sm font-black text-[#F2AE32]">AI RECOMMENDED: EV REEFER (E-TRUCK)</div>
                  <span className="px-2 py-0.5 rounded bg-[#F2AE32] text-[#292D2F] text-[10px] font-bold">OPTIMAL</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#F0EEEA]/70">Energy Consumption:</span>
                    <strong className="text-white">{(fleetDistanceKm * 1.15).toFixed(1)} kWh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F0EEEA]/70">Electric Charging Cost:</span>
                    <strong className="text-[#F2AE32]">₹{Math.round((fleetDistanceKm * 1.15) * 8.5).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F0EEEA]/70">Net Operating Savings:</span>
                    <strong className="text-emerald-400">
                      ₹{Math.round(((fleetDistanceKm * 0.33) * 92) - ((fleetDistanceKm * 1.15) * 8.5)).toLocaleString()} (68% Reduction)
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F0EEEA]/70">Emissions Prevented:</span>
                    <strong className="text-emerald-400">{(fleetDistanceKm * 0.62).toFixed(1)} kg CO2 Saved</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 7: AI ORGANIC WASTE-TO-FERTILIZER SYSTEM */}
        {/* ============================================================== */}
        {activeTab === 'waste-fertilizer' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Recycle className="w-4 h-4" />
                  <span>Feature 07 · Circular Cold-Chain Bio-Economy</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Organic Waste-to-Fertilizer System
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Connects spoiled vegetables and organic agricultural waste with certified composting or bio-fertilizer production facilities.
                </p>
              </div>

              <div className="bg-[#F0EEEA] px-3 py-1.5 rounded-lg border border-[#D0CEC9] text-[10px] font-mono text-[#A5A5A4]">
                CIRCULAR ECONOMY: Diverts spoiled cargo from landfills into bio-nutrients.
              </div>
            </div>

            {/* Interactive Biomass Calculator Form */}
            <form onSubmit={handleCalculateWasteBiomass} className="bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9] font-mono space-y-4">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                <span className="text-xs font-bold text-[#06383D] uppercase">
                  SIMULATE ORGANIC SPOILAGE CONVERSION & MATCH FACILITY
                </span>
                <span className="text-[10px] text-[#A5A5A4]">SIMULATED MODEL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Spoiled Consignment Weight: {wasteWeightTons} Tons
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="25.0"
                    step="0.5"
                    value={wasteWeightTons}
                    onChange={(e) => setWasteWeightTons(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                  />
                  <div className="flex justify-between text-[10px] text-[#A5A5A4] mt-1">
                    <span>1.0 Ton</span>
                    <span>25.0 Tons</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">Biomass Crop Category</label>
                  <select
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value as any)}
                    className="w-full bg-white border border-[#D0CEC9] rounded-lg p-2 font-bold text-[#292D2F]"
                  >
                    <option value="vegetables">Overripe Tomatoes, Capsicum & Leafy Greens</option>
                    <option value="citrus">Citrus Peels & Acidic Fruit Biomass</option>
                    <option value="dairy">Sour Milk & Probiotic Whey Slurry</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#A5A5A4]">Calculates fertilizer yield, biogas output and matches certified facility</span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#06383D] text-white font-bold text-xs uppercase hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                >
                  Compute Bio-Fertilizer Yield
                </button>
              </div>
            </form>

            {/* Structured Results Card */}
            {wasteResult && (
              <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
                  <div>
                    <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">MATCHED BIO-CONVERSION FACILITY</span>
                    <div className="text-sm font-bold text-[#06383D] mt-0.5">{wasteResult.matchedFacility}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWasteDispatched(true)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer transition-colors ${
                      wasteDispatched
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F2AE32] text-[#292D2F] hover:bg-[#F2AE32]/85'
                    }`}
                  >
                    {wasteDispatched ? '✓ Bio-Lot Dispatched to Plant' : 'Authorize Waste Dispatch →'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">COMPOST FERTILIZER</span>
                    <strong className="text-lg text-[#16803C]">{wasteResult.compostKg} kg</strong>
                    <div className="text-[10px] text-[#A5A5A4]">High N-P-K Organic Manure</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">BIOGAS METHANE</span>
                    <strong className="text-lg text-[#06383D]">{wasteResult.biogasM3} m³</strong>
                    <div className="text-[10px] text-[#A5A5A4]">Clean Electricity Generation</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">FEEDSTOCK CREDIT</span>
                    <strong className="text-lg text-[#F2AE32]">₹{wasteResult.feedstockCreditInr.toLocaleString()}</strong>
                    <div className="text-[10px] text-[#A5A5A4]">Recovered Value to Farmer/Shipper</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">CO2e PREVENTED</span>
                    <strong className="text-lg text-emerald-600">{wasteResult.co2PreventedTons} Tons</strong>
                    <div className="text-[10px] text-[#A5A5A4]">Zero Methane Landfill Emissions</div>
                  </div>
                </div>
              </div>
            )}

            {/* Waste Lots Available for Diversion */}
            <div className="space-y-4 font-mono">
              {[
                {
                  id: 'BIO-LOT-881',
                  cargo: 'Overripe Tomatoes & Capsicum (Rejected Consignment)',
                  quantity: '8.4 Metric Tons',
                  condition: 'Degraded / Fermenting Organic Matter (High Nitrogen)',
                  originHub: 'Nashik Agro Terminal Staging Dock 2',
                  destinationFacility: 'Godavari Agri-Bio Composting & Organic Fertilizer Unit, Niphad',
                  transportDistance: '24 km via rural connector',
                  valueRecovered: '₹32,000 (Composting Feedstock Credit)',
                  status: 'Ready for Dispatch',
                },
                {
                  id: 'BIO-LOT-884',
                  cargo: 'Bruised Citrus & Sweet Lime Peels',
                  quantity: '14.2 Metric Tons',
                  condition: 'Acidic Fruit Biomass (Ideal for Bio-Enzyme and Soil Acidification)',
                  originHub: 'Nagpur Multi-Modal Cold Park Dock 7',
                  destinationFacility: 'Vidarbha Bio-Manure & Vermicompost Hub, Butibori MIDC',
                  transportDistance: '38 km via NH-44',
                  valueRecovered: '₹54,000 (Organic Carbon Credit)',
                  status: 'Scheduled',
                },
              ].map((waste) => (
                <div key={waste.id} className="p-5 rounded-xl border border-[#D0CEC9] bg-white shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D0CEC9] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <strong className="text-sm text-[#292D2F]">{waste.id}: {waste.cargo}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 text-xs font-bold">
                      {waste.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-[#A5A5A4] uppercase block">QUANTITY & CONDITION</span>
                      <strong className="text-[#292D2F]">{waste.quantity}</strong>
                      <div className="text-[10px] text-[#A5A5A4] truncate">{waste.condition}</div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#A5A5A4] uppercase block">PICKUP LOCATION</span>
                      <strong className="text-[#06383D]">{waste.originHub}</strong>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#A5A5A4] uppercase block">DESTINATION BIO-FACILITY</span>
                      <strong className="text-[#292D2F]">{waste.destinationFacility}</strong>
                      <div className="text-[10px] text-[#A5A5A4]">{waste.transportDistance}</div>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#A5A5A4] uppercase block">FEEDSTOCK CREDIT VALUE</span>
                      <strong className="text-[#16803C]">{waste.valueRecovered}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* FEATURE 8: AI DRIVER ROTATION AND RELAY FLEET SYSTEM */}
        {/* ============================================================== */}
        {activeTab === 'driver-relay' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F2AE32] uppercase">
                  <Users className="w-4 h-4" />
                  <span>Feature 08 · 500-KM Relay & Driver Safety</span>
                </div>
                <h2 className="text-2xl font-black text-[#292D2F] uppercase mt-1">
                  AI Driver Rotation and Relay Fleet System
                </h2>
                <p className="text-xs text-[#A5A5A4] mt-0.5">
                  Plans driver handovers approximately every 500 km while maintaining continuous cargo temperature monitoring.
                </p>
              </div>

              <div className="bg-[#F0EEEA] px-3 py-1.5 rounded-lg border border-[#D0CEC9] text-[10px] font-mono text-[#A5A5A4]">
                HOS REGULATION: Prevents driver fatigue breaches by swapping pilots at fixed corridor hubs.
              </div>
            </div>

            {/* Interactive Relay Planner Form */}
            <form onSubmit={handleCalculateRelay} className="bg-[#F0EEEA] p-5 rounded-xl border border-[#D0CEC9] font-mono space-y-4">
              <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-2">
                <span className="text-xs font-bold text-[#06383D] uppercase">
                  SIMULATE 500-KM RELAY STATIONS & FATIGUE MITIGATION
                </span>
                <span className="text-[10px] text-[#A5A5A4]">SIMULATED MODEL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Corridor Distance: {relayDistanceKm} km
                  </label>
                  <input
                    type="range"
                    min="500"
                    max="2200"
                    step="50"
                    value={relayDistanceKm}
                    onChange={(e) => setRelayDistanceKm(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                  />
                  <div className="flex justify-between text-[10px] text-[#A5A5A4] mt-1">
                    <span>500 km</span>
                    <span>2,200 km</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Lead Pilot Shift Hours: {leadDriverHours}h (Max HOS: 8.0h)
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="0.5"
                    value={leadDriverHours}
                    onChange={(e) => setLeadDriverHours(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#D0CEC9] rounded-lg appearance-none cursor-pointer accent-[#06383D]"
                  />
                  <div className="flex justify-between text-[10px] text-[#A5A5A4] mt-1">
                    <span>2 Hours</span>
                    <span>10 Hours (Over-limit)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#A5A5A4]">Calculates required handover bays to eliminate driver fatigue without stopping cooling</span>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#06383D] text-white font-bold text-xs uppercase hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                >
                  Compute 500-KM Relay Plan
                </button>
              </div>
            </form>

            {/* Structured Results Card */}
            {relayResult && (
              <div className="p-5 rounded-xl bg-white border border-[#D0CEC9] shadow-xs space-y-4 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D0CEC9] pb-3">
                  <div>
                    <span className="text-[10px] text-[#A5A5A4] uppercase font-bold">RELAY FLEET ROSTER STATUS</span>
                    <div className="text-sm font-bold text-[#06383D] mt-0.5">
                      {relayResult.handoversPlanned} Staged Pilot Handovers on Active Haul Corridor
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRelayDispatched(true)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase cursor-pointer transition-colors ${
                      relayDispatched
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#F2AE32] text-[#292D2F] hover:bg-[#F2AE32]/85'
                    }`}
                  >
                    {relayDispatched ? '✓ Relay Handover Schedule Locked' : 'Authorize Relay Dispatch Roster →'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">RELAYS REQUIRED</span>
                    <strong className="text-lg text-[#06383D]">{relayResult.relaysNeeded} Driver Legs</strong>
                    <div className="text-[10px] text-[#A5A5A4]">~500 km per pilot segment</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">STAGED HANDOVERS</span>
                    <strong className="text-lg text-[#F2AE32]">{relayResult.handoversPlanned} Safe Bays</strong>
                    <div className="text-[10px] text-[#A5A5A4]">15-min driver swap protocol</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">FATIGUE MITIGATION</span>
                    <strong className="text-lg text-[#16803C]">{relayResult.fatigueRiskMitigated}% Risk Prevented</strong>
                    <div className="text-[10px] text-[#A5A5A4]">Zero micro-sleep probability</div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F0EEEA]">
                    <span className="text-[10px] text-[#A5A5A4] uppercase block">COLD REEFER UPTIME</span>
                    <strong className="text-lg text-emerald-600">{relayResult.coolingUptimePct}% Continuous</strong>
                    <div className="text-[10px] text-[#A5A5A4]">Compressor never shuts down</div>
                  </div>
                </div>
              </div>
            )}

            {/* Corridor Selector */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {[
                { id: 'delhi-mumbai', label: 'Delhi to Mumbai Corridor (1,420 KM)' },
                { id: 'mumbai-chennai', label: 'Mumbai to Chennai Corridor (1,340 KM)' },
                { id: 'nagpur-kolkata', label: 'Nagpur to Kolkata Corridor (1,180 KM)' },
              ].map((corridor) => (
                <button
                  key={corridor.id}
                  onClick={() => setRelayCorridor(corridor.id as any)}
                  className={`px-3 py-2 rounded-lg border font-bold transition-all cursor-pointer ${
                    relayCorridor === corridor.id
                      ? 'bg-[#06383D] text-white border-[#06383D]'
                      : 'bg-white text-[#292D2F] border-[#D0CEC9] hover:bg-[#F0EEEA]'
                  }`}
                >
                  {corridor.label}
                </button>
              ))}
            </div>

            {/* Relay Sequence Timeline */}
            <div className="space-y-3 font-mono">
              {currentRelay.handovers.map((handover, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#D0CEC9] bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#06383D] text-[#F2AE32] flex items-center justify-center font-bold text-xs shrink-0">
                      R{idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#292D2F]">{handover.point}</strong>
                        <span className="text-[10px] text-[#A5A5A4]">@ KM {handover.km}</span>
                      </div>
                      <div className="text-xs text-[#A5A5A4] mt-0.5">
                        Relaying Driver: <strong className="text-[#292D2F]">{handover.driverIn}</strong> ➔ Next On-Duty: <strong className="text-[#06383D]">{handover.driverOut}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-[#A5A5A4] block">COLD REEFER SENSORS</span>
                      <strong className="text-[#16803C]">Continuous Telemetry Active</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 text-xs font-bold">
                      {handover.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
