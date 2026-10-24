import React, { useState } from 'react';
import {
  Warehouse,
  Thermometer,
  Droplets,
  Package,
  Layers,
  Search,
  Plus,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
  DoorClosed,
  Activity
} from 'lucide-react';

interface ColdChamber {
  id: string;
  name: string;
  zone: 'Deep Frozen (-25°C)' | 'Vaccine Chiller (2°C to 8°C)' | 'Dairy & Fresh (0°C to 4°C)' | 'Controlled Ambient (15°C to 25°C)';
  targetTemp: string;
  currentTemp: number;
  humidityPct: number;
  capacityPallets: number;
  occupiedPallets: number;
  status: 'Compliant' | 'Warning' | 'Maintenance';
  doorStatus: 'Sealed' | 'Loading Dock Active';
}

interface ColdInventoryLot {
  id: string;
  commodity: string;
  category: 'Pharmaceuticals' | 'Dairy & Probiotics' | 'Marine & Meat' | 'Fresh Agro';
  chamberId: string;
  palletCount: number;
  batchNumber: string;
  client: string;
  entryDate: string;
  expiryDate: string;
  qualityStatus: 'Optimal' | 'Quarantine Inspection' | 'Expiring Soon';
}

const WAREHOUSE_FACILITIES = [
  {
    id: 'WH-MUM-01',
    name: 'Bhiwandi Central Cold Hub',
    location: 'Bhiwandi Logistics Park, Gate 3, Maharashtra',
    totalCapacityPallets: 4500,
    currentOccupied: 3820,
    activeChambers: 6,
    telemetryHealth: '100% Online',
  },
  {
    id: 'WH-JNPT-02',
    name: 'JNPT Maritime Cold Terminal',
    location: 'Nhava Sheva Port Dock Area, Navi Mumbai',
    totalCapacityPallets: 2800,
    currentOccupied: 2150,
    activeChambers: 4,
    telemetryHealth: '100% Online',
  },
  {
    id: 'WH-NGP-03',
    name: 'Nagpur Multi-Modal Cold Park',
    location: 'MIHAN Industrial SEZ, Nagpur',
    totalCapacityPallets: 6200,
    currentOccupied: 5100,
    activeChambers: 8,
    telemetryHealth: '100% Online',
  },
  {
    id: 'WH-BDD-04',
    name: 'Baddi Pharma Manufacturing Staging',
    location: 'Baddi Industrial Area, Himachal Pradesh',
    totalCapacityPallets: 1900,
    currentOccupied: 1640,
    activeChambers: 3,
    telemetryHealth: '100% Online',
  },
];

const INITIAL_CHAMBERS: ColdChamber[] = [
  {
    id: 'CH-01',
    name: 'Chamber Alpha (Cryo-Biologics)',
    zone: 'Deep Frozen (-25°C)',
    targetTemp: '-25°C to -18°C',
    currentTemp: -22.4,
    humidityPct: 45,
    capacityPallets: 800,
    occupiedPallets: 720,
    status: 'Compliant',
    doorStatus: 'Sealed',
  },
  {
    id: 'CH-02',
    name: 'Chamber Beta (Vaccine Cold Envelope)',
    zone: 'Vaccine Chiller (2°C to 8°C)',
    targetTemp: '2.0°C to 8.0°C',
    currentTemp: 4.1,
    humidityPct: 52,
    capacityPallets: 1200,
    occupiedPallets: 1050,
    status: 'Compliant',
    doorStatus: 'Sealed',
  },
  {
    id: 'CH-03',
    name: 'Chamber Gamma (Specialty Dairy & Butter)',
    zone: 'Dairy & Fresh (0°C to 4°C)',
    targetTemp: '0.0°C to 4.0°C',
    currentTemp: 2.3,
    humidityPct: 68,
    capacityPallets: 1000,
    occupiedPallets: 890,
    status: 'Compliant',
    doorStatus: 'Loading Dock Active',
  },
  {
    id: 'CH-04',
    name: 'Chamber Delta (Controlled Agro Ambient)',
    zone: 'Controlled Ambient (15°C to 25°C)',
    targetTemp: '15.0°C to 20.0°C',
    currentTemp: 17.8,
    humidityPct: 60,
    capacityPallets: 1500,
    occupiedPallets: 1160,
    status: 'Compliant',
    doorStatus: 'Sealed',
  },
];

const INITIAL_LOTS: ColdInventoryLot[] = [
  {
    id: 'LOT-901',
    commodity: 'Active Biologics & Vaccines',
    category: 'Pharmaceuticals',
    chamberId: 'CH-02',
    palletCount: 140,
    batchNumber: 'VAC-2026-X9',
    client: 'Serum BioPharma India',
    entryDate: '2026-10-18',
    expiryDate: '2027-04-18',
    qualityStatus: 'Optimal',
  },
  {
    id: 'LOT-904',
    commodity: 'Probiotic Butter & Cultures',
    category: 'Dairy & Probiotics',
    chamberId: 'CH-03',
    palletCount: 220,
    batchNumber: 'DAI-MH-881',
    client: 'Amul Specialty Foods',
    entryDate: '2026-10-19',
    expiryDate: '2026-11-30',
    qualityStatus: 'Optimal',
  },
  {
    id: 'LOT-908',
    commodity: 'Salmon & King Prawn Fillets',
    category: 'Marine & Meat',
    chamberId: 'CH-01',
    palletCount: 95,
    batchNumber: 'SEA-DHJ-401',
    client: 'West Coast Marine Export',
    entryDate: '2026-10-20',
    expiryDate: '2027-01-15',
    qualityStatus: 'Optimal',
  },
  {
    id: 'LOT-912',
    commodity: 'Strawberries & Seed Fruit',
    category: 'Fresh Agro',
    chamberId: 'CH-04',
    palletCount: 180,
    batchNumber: 'AGR-MAH-104',
    client: 'Mahabaleshwar Growers Co-op',
    entryDate: '2026-10-20',
    expiryDate: '2026-10-28',
    qualityStatus: 'Expiring Soon',
  },
];

export const WarehousePage: React.FC = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>('WH-MUM-01');
  const [chambers] = useState<ColdChamber[]>(INITIAL_CHAMBERS);
  const [inventoryLots, setInventoryLots] = useState<ColdInventoryLot[]>(INITIAL_LOTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Pallet Form State
  const [newCommodity, setNewCommodity] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ColdInventoryLot['category']>('Pharmaceuticals');
  const [newChamberId, setNewChamberId] = useState<string>('CH-02');
  const [newPalletCount, setNewPalletCount] = useState<number>(50);
  const [newClient, setNewClient] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const currentFacility = WAREHOUSE_FACILITIES.find((f) => f.id === selectedFacility) || WAREHOUSE_FACILITIES[0];

  const filteredLots = inventoryLots.filter((lot) => {
    if (categoryFilter !== 'All' && lot.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lot.commodity.toLowerCase().includes(q) ||
        lot.client.toLowerCase().includes(q) ||
        lot.batchNumber.toLowerCase().includes(q) ||
        lot.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommodity.trim() || !newClient.trim() || newPalletCount <= 0) {
      setFormError('Please enter valid commodity, client name, and pallet count.');
      return;
    }

    const createdLot: ColdInventoryLot = {
      id: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      commodity: newCommodity.trim(),
      category: newCategory,
      chamberId: newChamberId,
      palletCount: newPalletCount,
      batchNumber: `BATCH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      client: newClient.trim(),
      entryDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      qualityStatus: 'Optimal',
    };

    setInventoryLots([createdLot, ...inventoryLots]);
    setNewCommodity('');
    setNewClient('');
    setFormError('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-8 px-4 lg:px-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D0CEC9] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-[#292D2F] tracking-tight uppercase">
              Warehouse & Inventory
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#06383D] text-[#F2AE32] text-xs font-mono font-bold tracking-wider">
              COLD-STORAGE MANAGEMENT
            </span>
          </div>
          <p className="text-xs text-[#A5A5A4] font-medium mt-1">
            Real-time multi-chamber telemetry &bull; Pallet lot tracking &bull; Relative Humidity (RH) compliance
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06383D] text-white hover:bg-[#06383D]/85 font-mono text-xs font-bold transition-all shadow-xs cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#F2AE32]" />
          <span>INBOUND PALLET ENTRY</span>
        </button>
      </div>

      {/* Facility Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WAREHOUSE_FACILITIES.map((fac) => {
          const isSelected = fac.id === selectedFacility;
          const occupancyPct = Math.round((fac.currentOccupied / fac.totalCapacityPallets) * 100);
          return (
            <button
              key={fac.id}
              onClick={() => setSelectedFacility(fac.id)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer font-mono shadow-xs ${
                isSelected
                  ? 'bg-white border-[#06383D] ring-2 ring-[#06383D]/20 shadow-sm'
                  : 'bg-white/70 border-[#D0CEC9] hover:bg-white hover:border-[#06383D]/40'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-[#06383D]">{fac.id}</span>
                <span className="text-[10px] text-[#16803C] font-semibold">{fac.telemetryHealth}</span>
              </div>
              <h3 className="font-sans font-black text-sm text-[#292D2F] truncate">{fac.name}</h3>
              <p className="text-[11px] text-[#A5A5A4] truncate mb-3">{fac.location}</p>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#292D2F]">
                  <span>Capacity: {fac.currentOccupied} / {fac.totalCapacityPallets} Pallets</span>
                  <span className="font-bold">{occupancyPct}%</span>
                </div>
                <div className="w-full bg-[#F0EEEA] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${occupancyPct > 90 ? 'bg-[#DC2626]' : 'bg-[#06383D]'}`}
                    style={{ width: `${occupancyPct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Cold Chambers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans">
            ACTIVE COLD CHAMBERS ({currentFacility.name})
          </h2>
          <span className="text-xs font-mono text-[#A5A5A4]">Continuous NIST-calibrated sensors</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {chambers.map((ch) => (
            <div key={ch.id} className="p-5 rounded-xl border border-[#D0CEC9] bg-white shadow-xs space-y-4">
              <div className="flex items-start justify-between border-b border-[#D0CEC9] pb-3">
                <div>
                  <div className="text-xs font-bold text-[#06383D]">{ch.id}</div>
                  <div className="text-sm font-black text-[#292D2F] font-sans truncate">{ch.name}</div>
                  <span className="text-[10px] text-[#A5A5A4]">{ch.zone}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 text-[10px] font-bold">
                  {ch.status}
                </span>
              </div>

              {/* Temperature & Humidity Sensors */}
              <div className="grid grid-cols-2 gap-2 bg-[#F0EEEA] p-3 rounded-lg text-xs">
                <div>
                  <span className="text-[10px] text-[#A5A5A4] flex items-center gap-1 uppercase font-bold">
                    <Thermometer className="w-3 h-3 text-[#06383D]" />
                    CHAMBER TEMP
                  </span>
                  <div className="text-lg font-black text-[#06383D] mt-0.5">
                    {ch.currentTemp > 0 ? `+${ch.currentTemp}` : ch.currentTemp}°C
                  </div>
                  <div className="text-[9px] text-[#A5A5A4]">{ch.targetTemp}</div>
                </div>

                <div>
                  <span className="text-[10px] text-[#A5A5A4] flex items-center gap-1 uppercase font-bold">
                    <Droplets className="w-3 h-3 text-[#06383D]" />
                    HUMIDITY (RH)
                  </span>
                  <div className="text-lg font-black text-[#292D2F] mt-0.5">
                    {ch.humidityPct}%
                  </div>
                  <div className="text-[9px] text-[#16803C]">Optimal range</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#A5A5A4] pt-1">
                <span className="flex items-center gap-1.5">
                  <DoorClosed className="w-3.5 h-3.5 text-[#292D2F]" />
                  <span>{ch.doorStatus}</span>
                </span>
                <span>{ch.occupiedPallets}/{ch.capacityPallets} Pallets</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cold Storage Pallet Inventory Table */}
      <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 shadow-sm space-y-4 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D0CEC9] pb-4">
          <div>
            <h2 className="text-lg font-black text-[#292D2F] uppercase font-sans">
              COLD-STORAGE PALLET INVENTORY ({filteredLots.length} ACTIVE LOTS)
            </h2>
            <p className="text-xs text-[#A5A5A4]">Traceability down to batch number and designated cold chamber.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#A5A5A4] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lot, client, batch..."
                className="bg-white border border-[#D0CEC9] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none focus:border-[#F2AE32]"
              />
            </div>

            {/* Filter Pills */}
            {['All', 'Pharmaceuticals', 'Dairy & Probiotics', 'Marine & Meat', 'Fresh Agro'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-[#06383D] text-white border-[#06383D] font-bold'
                    : 'bg-white text-[#A5A5A4] border-[#D0CEC9] hover:text-[#292D2F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] font-bold uppercase text-[10px]">
                <th className="py-3 px-3">LOT ID</th>
                <th className="py-3 px-3">COMMODITY & CLIENT</th>
                <th className="py-3 px-3">CHAMBER</th>
                <th className="py-3 px-3">PALLETS</th>
                <th className="py-3 px-3">BATCH NUMBER</th>
                <th className="py-3 px-3">ENTRY DATE</th>
                <th className="py-3 px-3">EXPIRY</th>
                <th className="py-3 px-3 text-right">QUALITY STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D0CEC9]">
              {filteredLots.map((lot) => (
                <tr key={lot.id} className="hover:bg-[#F0EEEA]/50 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#06383D]">{lot.id}</td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#292D2F]">{lot.commodity}</div>
                    <div className="text-[10px] text-[#A5A5A4]">{lot.client} &bull; {lot.category}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#F0EEEA] border border-[#D0CEC9] text-[10px] font-bold">
                      {lot.chamberId}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#292D2F]">{lot.palletCount} Pallets</td>
                  <td className="py-3 px-3 text-[#A5A5A4]">{lot.batchNumber}</td>
                  <td className="py-3 px-3 text-[#292D2F]">{lot.entryDate}</td>
                  <td className="py-3 px-3 text-[#292D2F]">{lot.expiryDate}</td>
                  <td className="py-3 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      lot.qualityStatus === 'Optimal'
                        ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                        : 'bg-[#F2AE32]/15 text-[#292D2F] border border-[#F2AE32]/40'
                    }`}>
                      {lot.qualityStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLots.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#A5A5A4]">
                    <Warehouse className="w-9 h-9 mx-auto text-[#A5A5A4]/40 mb-2" />
                    <div className="font-bold text-sm text-[#292D2F]">No inventory lots found</div>
                    <div className="text-xs text-[#A5A5A4] mt-1">
                      No pallet matches query with active filters.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setCategoryFilter('All');
                      }}
                      className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#06383D] text-white font-bold text-xs hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                    >
                      Reset Inventory Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inbound Pallet Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-[#D0CEC9] p-6 max-w-lg w-full shadow-2xl font-mono space-y-4">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <h3 className="text-base font-black text-[#292D2F] uppercase">
                INBOUND COLD PALLET ENTRY
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-[#DC2626]">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateLot} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Commodity Name</label>
                <input
                  type="text"
                  required
                  value={newCommodity}
                  onChange={(e) => setNewCommodity(e.target.value)}
                  placeholder="e.g. Hepatitis B Vaccines or Probiotic Curd"
                  className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  >
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Dairy & Probiotics">Dairy & Probiotics</option>
                    <option value="Marine & Meat">Marine & Meat</option>
                    <option value="Fresh Agro">Fresh Agro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Target Chamber</label>
                  <select
                    value={newChamberId}
                    onChange={(e) => setNewChamberId(e.target.value)}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  >
                    <option value="CH-01">CH-01 (Deep Frozen -25°C)</option>
                    <option value="CH-02">CH-02 (Vaccine 2°C to 8°C)</option>
                    <option value="CH-03">CH-03 (Dairy 0°C to 4°C)</option>
                    <option value="CH-04">CH-04 (Ambient 15°C to 20°C)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Pallet Count</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={newPalletCount}
                    onChange={(e) => setNewPalletCount(parseInt(e.target.value))}
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  />
                </div>

                <div>
                  <label className="block text-[#A5A5A4] uppercase font-bold mb-1">Client / Consignor</label>
                  <input
                    type="text"
                    required
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Serum BioPharma"
                    className="w-full bg-[#F0EEEA] border border-[#D0CEC9] rounded-lg px-3 py-2 text-[#292D2F] focus:outline-none focus:border-[#06383D]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#D0CEC9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D0CEC9] text-[#292D2F] hover:bg-[#F0EEEA] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#06383D] text-white hover:bg-[#06383D]/85 font-bold cursor-pointer"
                >
                  Register Inbound Pallets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
