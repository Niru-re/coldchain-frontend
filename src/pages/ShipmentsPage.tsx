import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Edit,
  X,
  QrCode,
  ScanLine,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Smartphone,
  ShieldAlert,
  Thermometer,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

// ─── TYPES ──────────────────────────────────────────────────────────────────
export interface ColdChainShipment {
  id: string;
  customer: string;
  origin: string;
  destination: string;
  product: string;
  status: 'In Transit' | 'Delivered' | 'At Risk' | 'Pending';
  temp: string;
  tempStatus: 'normal' | 'warning' | 'critical';
  eta: string;
  weight: string;
  driver: string;
  vehicle: string;
  date: string;
}

export interface ColdChainOrder {
  orderId: string;
  customer: string;
  items: string;
  orderDate: string;
  status: 'Confirmed' | 'Fulfillment in Progress' | 'Ready for Dispatch' | 'Dispatched';
  linkedShipment: string;
  totalValue: string;
}

export interface CompletedShipmentHistory {
  id: string;
  date: string;
  route: string;
  product: string;
  outcome: 'On-Time' | 'Late' | 'Spoilage';
  compliance: string;
  duration: string;
}

// ─── INITIAL DEMO DATA (10 SHIPMENTS) ─────────────────────────────────────────
const INITIAL_SHIPMENTS: ColdChainShipment[] = [
  {
    id: 'SHP-8092',
    customer: 'Tata Consumer Agri',
    origin: 'Shimla Cold-Hub',
    destination: 'Mumbai Port CFS',
    product: 'Apples - 2T',
    status: 'At Risk',
    temp: '+9.2°C',
    tempStatus: 'critical',
    eta: 'Today · 21:30',
    weight: '2.0 Tons',
    driver: 'Rajesh Sharma',
    vehicle: 'CC-102 (Carrier Reefer)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8104',
    customer: 'Serum Institute of India',
    origin: 'Pune Biotech Cluster',
    destination: 'Delhi NCR Vaccine Depot',
    product: 'Vaccines - 50kg',
    status: 'In Transit',
    temp: '+3.8°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 06:00',
    weight: '50 kg',
    driver: 'Amit Verma',
    vehicle: 'CC-107 (Cryo Safe)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8119',
    customer: 'Amul Gujarat Dairy Fed',
    origin: 'Anand Mega Dairy',
    destination: 'Hyderabad Central Depot',
    product: 'Ice Cream - 1.5T',
    status: 'In Transit',
    temp: '-21.4°C',
    tempStatus: 'normal',
    eta: 'Today · 23:45',
    weight: '1.5 Tons',
    driver: 'Vikram Rathore',
    vehicle: 'CC-118 (Deep Freezer)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8125',
    customer: 'Mahyco Fresh Agri',
    origin: 'Mahabaleshwar Berry Farms',
    destination: 'Bengaluru Cold Hub',
    product: 'Strawberries - 800kg',
    status: 'In Transit',
    temp: '+2.9°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 09:15',
    weight: '800 kg',
    driver: 'Satish Patil',
    vehicle: 'CC-124 (Multi-Temp)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8138',
    customer: 'Biocon Biologics',
    origin: 'Bengaluru Electronic City',
    destination: 'Mumbai Nhava Sheva CFS',
    product: 'Plasma - 120L',
    status: 'In Transit',
    temp: '-28.0°C',
    tempStatus: 'normal',
    eta: 'Today · 18:20',
    weight: '120 Liters',
    driver: 'Harpreet Singh',
    vehicle: 'CC-131 (Cryo Bio)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8147',
    customer: 'Godrej Agrovet',
    origin: 'Nashik Hatchery Hub',
    destination: 'Goa Coastal Depot',
    product: 'Poultry - 3.2T',
    status: 'Delivered',
    temp: '+1.8°C',
    tempStatus: 'normal',
    eta: 'Delivered (14:30)',
    weight: '3.2 Tons',
    driver: 'Manoj Shinde',
    vehicle: 'CC-142 (Chilled Reefer)',
    date: '2026-10-20'
  },
  {
    id: 'SHP-8153',
    customer: 'Mother Dairy Foods',
    origin: 'Karnal Processing Plant',
    destination: 'Jaipur Regional Store',
    product: 'Milk & Butter - 4.5T',
    status: 'In Transit',
    temp: '+4.1°C',
    tempStatus: 'normal',
    eta: 'Today · 20:00',
    weight: '4.5 Tons',
    driver: 'Sandeep Rao',
    vehicle: 'CC-156 (Insulated Tanker)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8164',
    customer: 'Himalaya Wellness Corp',
    origin: 'Haridwar Herbal Complex',
    destination: 'Ahmedabad MIDC Zone',
    product: 'Herbal Extracts - 1.2T',
    status: 'Pending',
    temp: '+16.5°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 14:00',
    weight: '1.2 Tons',
    driver: 'Kuldeep Yadav',
    vehicle: 'CC-168 (Controlled Temp)',
    date: '2026-10-22'
  },
  {
    id: 'SHP-8172',
    customer: 'ITC Masterchef Seafood',
    origin: 'Kochi Deep Sea Harbor',
    destination: 'Chennai Distribution Bay',
    product: 'Prawns - 2.8T',
    status: 'In Transit',
    temp: '-19.2°C',
    tempStatus: 'normal',
    eta: 'Tomorrow · 08:30',
    weight: '2.8 Tons',
    driver: 'Dinesh Nair',
    vehicle: 'CC-175 (Reefer Box)',
    date: '2026-10-21'
  },
  {
    id: 'SHP-8185',
    customer: 'Cadbury Mondelez India',
    origin: 'Induri Chocolate Factory',
    destination: 'Kolkata East Hub',
    product: 'Confectionery - 3.5T',
    status: 'Delivered',
    temp: '+17.2°C',
    tempStatus: 'normal',
    eta: 'Delivered (Yesterday)',
    weight: '3.5 Tons',
    driver: 'Ramesh Kale',
    vehicle: 'CC-182 (Climate Safe)',
    date: '2026-10-19'
  }
];

// ─── INITIAL DEMO DATA: 5 ORDERS ─────────────────────────────────────────────
const INITIAL_ORDERS: ColdChainOrder[] = [
  {
    orderId: 'ORD-4101',
    customer: 'Reliance Retail Logistics',
    items: '40 crates Alphonso Mangoes (Export Grade)',
    orderDate: '2026-10-21',
    status: 'Dispatched',
    linkedShipment: 'SHP-8092',
    totalValue: '₹8,40,000'
  },
  {
    orderId: 'ORD-4102',
    customer: 'Apollo Central Pharmacies',
    items: '200 vials mRNA Immunization Doses',
    orderDate: '2026-10-21',
    status: 'Fulfillment in Progress',
    linkedShipment: 'SHP-8104',
    totalValue: '₹34,20,000'
  },
  {
    orderId: 'ORD-4103',
    customer: 'Vadilal Dairy Products',
    items: '120 tubs Gourmet Belgian Gelato',
    orderDate: '2026-10-20',
    status: 'Ready for Dispatch',
    linkedShipment: 'SHP-8119',
    totalValue: '₹5,60,000'
  },
  {
    orderId: 'ORD-4104',
    customer: 'BigBasket Fresh Express',
    items: '60 crates Hydroponic Strawberries',
    orderDate: '2026-10-21',
    status: 'Confirmed',
    linkedShipment: 'Unassigned',
    totalValue: '₹3,80,000'
  },
  {
    orderId: 'ORD-4105',
    customer: 'Pfizer India LifeSciences',
    items: '80 boxes Cold-Chain Bio-Enzymes',
    orderDate: '2026-10-19',
    status: 'Dispatched',
    linkedShipment: 'SHP-8125',
    totalValue: '₹18,90,000'
  }
];

// ─── INITIAL DEMO DATA: 8 SHIPMENT HISTORY ───────────────────────────────────
const INITIAL_HISTORY: CompletedShipmentHistory[] = [
  {
    id: 'SHP-7990',
    date: '2026-10-18',
    route: 'Nashik Agro → Mumbai Port',
    product: 'Table Grapes - 3T',
    outcome: 'On-Time',
    compliance: '100% Temp Compliance',
    duration: '8h 20m'
  },
  {
    id: 'SHP-7992',
    date: '2026-10-17',
    route: 'Anand Dairy → Delhi NCR',
    product: 'Amul Butter - 5T',
    outcome: 'On-Time',
    compliance: '99.8% Temp Compliance',
    duration: '18h 45m'
  },
  {
    id: 'SHP-7995',
    date: '2026-10-16',
    route: 'Solapur Farms → Hyderabad Hub',
    product: 'Pomegranates - 2.4T',
    outcome: 'Late',
    compliance: '98.2% Temp Compliance (+42m traffic delay)',
    duration: '11h 10m'
  },
  {
    id: 'SHP-7998',
    date: '2026-10-15',
    route: 'Pune Biotech → Bengaluru Depot',
    product: 'Insulin Cartridges - 80kg',
    outcome: 'On-Time',
    compliance: '100% Temp Compliance',
    duration: '14h 30m'
  },
  {
    id: 'SHP-8002',
    date: '2026-10-14',
    route: 'Ratnagiri Port → Mumbai CFS',
    product: 'Alphonso Pulp - 1.8T',
    outcome: 'Spoilage',
    compliance: '87.4% Spoilage Breach (Compressor failure, 12% loss)',
    duration: '13h 05m'
  },
  {
    id: 'SHP-8005',
    date: '2026-10-13',
    route: 'Surat SEZ → Indore Terminal',
    product: 'Frozen Vegetables - 4T',
    outcome: 'On-Time',
    compliance: '99.5% Temp Compliance',
    duration: '9h 50m'
  },
  {
    id: 'SHP-8011',
    date: '2026-10-12',
    route: 'Goa Harbor → Mumbai Port CFS',
    product: 'Marine Fish Fillets - 2T',
    outcome: 'On-Time',
    compliance: '100% Temp Compliance',
    duration: '12h 15m'
  },
  {
    id: 'SHP-8015',
    date: '2026-10-11',
    route: 'Nagpur Multi-Modal → Bhopal Hub',
    product: 'Nagpur Mandarins - 5T',
    outcome: 'Late',
    compliance: '97.9% Temp Compliance (+1h 15m detour)',
    duration: '7h 40m'
  }
];

export const ShipmentsPage: React.FC = () => {
  const navigate = useNavigate();

  // Tab state
  const [activeTab, setActiveTab] = useState<'shipments' | 'orders' | 'history'>('shipments');

  // Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All Time');

  // Data states
  const [shipments, setShipments] = useState<ColdChainShipment[]>(INITIAL_SHIPMENTS);
  const [orders] = useState<ColdChainOrder[]>(INITIAL_ORDERS);
  const [history] = useState<CompletedShipmentHistory[]>(INITIAL_HISTORY);

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string>('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit shipment modal/state
  const [editingShipment, setEditingShipment] = useState<ColdChainShipment | null>(null);

  // Create Shipment Form state
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    productType: '',
    weight: '',
    tempRange: '',
    scheduledDate: '',
    driverAssign: '',
    vehicleAssign: ''
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    api.getShipments({ limit: 50 })
      .then((res) => {
        if (res.items && res.items.length > 0) {
          const remoteShipments: ColdChainShipment[] = res.items.map((item) => ({
            id: item.id,
            customer: item.farmerProducer || 'Consignee Partner',
            origin: item.origin,
            destination: item.destination,
            product: `${item.commodity} - ${(item.co2SavedKg / 100).toFixed(1)}T`,
            status: (item.status === 'Critical Alert' ? 'At Risk' : item.status === 'In Transit' ? 'In Transit' : item.status === 'Delivered' ? 'Delivered' : 'Pending') as any,
            temp: `${item.temperature > 0 ? '+' : ''}${item.temperature.toFixed(1)}°C`,
            tempStatus: (item.status === 'Critical Alert' ? 'critical' : item.temperature > item.maxTemp ? 'warning' : 'normal') as any,
            eta: item.eta,
            weight: `${(item.co2SavedKg / 100).toFixed(1)} Tons`,
            driver: 'Rajesh Sharma',
            vehicle: item.truckId || 'CC-102 (Reefer Box)',
            date: '2026-10-21'
          }));
          setShipments((prev) => {
            const existingIds = new Set(remoteShipments.map((r) => r.id));
            const remaining = prev.filter((p) => !existingIds.has(p.id));
            return [...remoteShipments, ...remaining];
          });
        }
      })
      .catch((err) => console.log('Offline/Mock Shipments Active:', err));
  }, []);

  // Trigger brief toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // ─── FILTER LOGIC ──────────────────────────────────────────────────────────
  const filteredShipments = useMemo(() => {
    return shipments.filter((item) => {
      // Status filter
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.id.toLowerCase().includes(q) ||
          item.customer.toLowerCase().includes(q) ||
          item.origin.toLowerCase().includes(q) ||
          item.destination.toLowerCase().includes(q) ||
          item.product.toLowerCase().includes(q) ||
          item.driver.toLowerCase().includes(q) ||
          item.vehicle.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [shipments, statusFilter, searchQuery]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        o.orderId.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.items.toLowerCase().includes(q) ||
        o.linkedShipment.toLowerCase().includes(q)
      );
    });
  }, [orders, searchQuery]);

  const filteredHistory = useMemo(() => {
    return history.filter((h) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        h.id.toLowerCase().includes(q) ||
        h.route.toLowerCase().includes(q) ||
        h.product.toLowerCase().includes(q) ||
        h.outcome.toLowerCase().includes(q)
      );
    });
  }, [history, searchQuery]);

  // ─── FORM VALIDATION & SUBMISSION ──────────────────────────────────────────
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.origin.trim()) errors.origin = 'Origin terminal is required';
    if (!formData.destination.trim()) errors.destination = 'Destination terminal is required';
    if (!formData.productType.trim()) errors.productType = 'Product description is required';
    if (!formData.weight.trim()) errors.weight = 'Consignment weight is required';
    if (!formData.tempRange.trim()) errors.tempRange = 'Required temp range is required';
    if (!formData.scheduledDate.trim()) errors.scheduledDate = 'Scheduled date is required';
    if (!formData.driverAssign.trim()) errors.driverAssign = 'Driver must be selected';
    if (!formData.vehicleAssign.trim()) errors.vehicleAssign = 'Reefer vehicle must be assigned';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Success: Create new shipment
    const newId = `SHP-${8200 + Math.floor(Math.random() * 90)}`;
    const newShipment: ColdChainShipment = {
      id: newId,
      customer: 'Self Dispatch / FMCG Partner',
      origin: formData.origin,
      destination: formData.destination,
      product: `${formData.productType} - ${formData.weight}`,
      status: 'Pending',
      temp: '+4.0°C (Pre-cool)',
      tempStatus: 'normal',
      eta: `Scheduled: ${formData.scheduledDate}`,
      weight: formData.weight,
      driver: formData.driverAssign,
      vehicle: formData.vehicleAssign,
      date: formData.scheduledDate
    };

    setShipments([newShipment, ...shipments]);

    // Asynchronously sync new consignment to Supabase backend
    api.createShipment({
      id: newId,
      trackingNumber: `CC360-IND-${Math.floor(1000 + Math.random() * 9000)}-MH`,
      commodity: formData.productType,
      category: 'Fresh Produce',
      origin: formData.origin,
      destination: formData.destination,
      currentLocation: formData.origin,
      carrier: 'ColdChain 360 Express',
      mode: 'Road',
      temperature: 4.0,
      minTemp: 2.0,
      maxTemp: 8.0,
      humidity: 85,
      batteryLevel: 100,
      reeferStatus: 'Active & Optimal',
      doorStatus: 'Sealed & Locked',
      gpsSignal: 'Strong (5G/LEO)',
      riskScore: 5,
      riskLevel: 'Nominal',
      remainingShelfLifeHours: 120,
      initialShelfLifeHours: 120,
      eta: `Scheduled: ${formData.scheduledDate}`,
      originalEta: `Scheduled: ${formData.scheduledDate}`,
      farmerProducer: 'Self Dispatch / FMCG Partner',
      economicValue: '$25,000',
      co2SavedKg: 150,
      status: 'Pending',
      truckId: formData.vehicleAssign,
    }).catch((err) => console.log('Created locally:', err));

    setIsCreateModalOpen(false);
    setFormData({
      origin: '',
      destination: '',
      productType: '',
      weight: '',
      tempRange: '',
      scheduledDate: '',
      driverAssign: '',
      vehicleAssign: ''
    });
    setFormErrors({});
    setActiveTab('shipments');
    showToast(`✓ Shipment ${newId} created successfully! Assigned to ${newShipment.vehicle}.`);
  };

  // ─── EDIT SHIPMENT SUBMISSION ──────────────────────────────────────────────
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShipment) return;

    setShipments((prev) =>
      prev.map((s) => (s.id === editingShipment.id ? editingShipment : s))
    );
    showToast(`✓ Updated shipment ${editingShipment.id} records.`);
    setEditingShipment(null);
  };

  // ─── BARCODE & QR SCANNING HANDLER ─────────────────────────────────────────
  const handleScanCode = (code: string) => {
    setScannedCode(code);
    const cleanCode = code.trim().toUpperCase();
    const found = shipments.find((s) => s.id.toUpperCase() === cleanCode);
    if (found) {
      setScanResult({
        type: 'shipment',
        title: `Shipment Manifest: ${found.id}`,
        customer: found.customer,
        product: found.product,
        temp: found.temp,
        tempStatus: found.tempStatus,
        route: `${found.origin} → ${found.destination}`,
        vehicle: found.vehicle,
        driver: found.driver,
        id: found.id
      });
      showToast(`✓ Scanned QR Code: ${found.id} matched active manifest.`);
    } else if (cleanCode.startsWith('PLT-')) {
      setScanResult({
        type: 'pallet',
        title: `Inbound Cold-Chamber Pallet: ${cleanCode}`,
        customer: 'Serum Institute / Tata Consumer',
        product: 'Cryo-Preserved Biologicals',
        temp: '+3.4°C (Optimal)',
        tempStatus: 'normal',
        route: 'Bhiwandi Hub · Chamber #02',
        vehicle: 'Dock Door #04',
        driver: 'Ramesh Kale (Cold Supervisor)',
        id: cleanCode
      });
      showToast(`✓ Scanned Pallet Barcode: ${cleanCode} verified.`);
    } else {
      setScanResult({
        type: 'unknown',
        title: `Unrecognized Code: ${cleanCode}`,
        message: 'No matching active shipment or pallet found in active manifest database.'
      });
    }
  };

  // ─── EXPORT FUNCTION ───────────────────────────────────────────────────────
  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Customer,Origin,Destination,Product,Status,Current Temp,ETA\n' +
      filteredShipments
        .map(
          (s) =>
            `"${s.id}","${s.customer}","${s.origin}","${s.destination}","${s.product}","${s.status}","${s.temp}","${s.eta}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `coldchain360_shipments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✓ Export completed! Downloaded CSV manifest.');
  };

  return (
    <div className="min-h-screen bg-[#F0EEEA] font-sans py-6 px-4 lg:px-6 space-y-6">
      
      {/* ─── TOAST NOTIFICATION ───────────────────────────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#06383D] text-white px-5 py-3 rounded-xl shadow-lg border border-[#F2AE32] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 font-mono text-xs">
          <CheckCircle2 className="w-5 h-5 text-[#F2AE32] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ─── PAGE HEADER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              COLDCHAIN 360 AI · FLEET MANIFEST ENGINE
            </span>
            <span className="bg-[#06383D]/10 text-[#06383D] text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              DEMO DATA
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#292D2F] tracking-tight">
            Shipments & Orders
          </h1>
          <p className="text-xs text-[#A5A5A4] mt-0.5">
            Real-time cold-chain cargo tracking, customer booking orders, and temperature compliance history.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-4 py-2 hover:bg-[#F2AE32]/85 flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Shipment</span>
          </button>
        </div>
      </div>

      {/* ─── QR / BARCODE SCANNING INTEGRATION NOTE ───────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#06383D]/5">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#06383D] flex items-center justify-center text-[#F2AE32] shrink-0">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold font-mono text-[#06383D] flex items-center gap-2">
              <span>Barcode scanning available via mobile app integration</span>
              <span className="bg-[#F2AE32]/20 text-[#292D2F] text-[9px] font-bold px-1.5 py-0.2 rounded">
                GS1-128 READY
              </span>
            </div>
            <div className="text-xs text-[#A5A5A4] mt-0.5">
              Scan cold-store gate e-Waybills, temperature datalogger barcodes, and cryptographic pallet tags directly on mobile devices.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsScannerModalOpen(true);
            setScannedCode('');
            setScanResult(null);
          }}
          className="border border-[#06383D] text-[#06383D] hover:bg-[#06383D] hover:text-white font-bold rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 bg-white shrink-0 self-start sm:self-auto cursor-pointer transition-colors shadow-xs"
        >
          <QrCode className="w-3.5 h-3.5 text-[#F2AE32]" />
          <span>Launch Barcode Scanner</span>
        </button>
      </div>

      {/* ─── TAB BAR ──────────────────────────────────────────────────────────── */}
      <div className="flex border-b border-[#D0CEC9] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('shipments')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'shipments'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Shipments ({shipments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'orders'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 font-mono text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'history'
              ? 'border-[#F2AE32] text-[#06383D]'
              : 'border-transparent text-[#A5A5A4] hover:text-[#292D2F]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Shipment History ({history.length})</span>
        </button>
      </div>

      {/* ─── FILTER BAR ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#D0CEC9] p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-2 bg-white border border-[#D0CEC9] rounded-lg px-3 py-1.5 text-sm w-full sm:w-72 focus-within:border-[#F2AE32]">
            <Search className="w-4 h-4 text-[#A5A5A4]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, client, product, route..."
              className="bg-transparent border-none text-xs text-[#292D2F] placeholder-[#A5A5A4] focus:outline-none w-full font-sans"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#A5A5A4] hover:text-[#292D2F]">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter (Shipments tab) */}
          {activeTab === 'shipments' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-[#A5A5A4] uppercase font-bold hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-[#D0CEC9] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#292D2F] focus:outline-none focus:border-[#F2AE32] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="At Risk">At Risk</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          )}

          {/* Date Range Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#A5A5A4] uppercase font-bold hidden sm:inline">Date:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-white border border-[#D0CEC9] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#292D2F] focus:outline-none focus:border-[#F2AE32] cursor-pointer"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="border border-[#D0CEC9] text-[#A5A5A4] hover:border-[#06383D]/40 hover:text-[#292D2F] font-bold rounded-lg px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 bg-white transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#06383D]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* ─── TAB CONTENT: SHIPMENTS (10 ROWS) ─────────────────────────────────── */}
      {activeTab === 'shipments' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Active Cold-Chain Shipments Manifest ({filteredShipments.length})
            </span>
            <span className="text-[10px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Shipment ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Origin</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Temp (Current)</th>
                  <th className="py-2.5 px-3">ETA</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CEC9]/60">
                {filteredShipments.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-[#F0EEEA] transition-colors group cursor-pointer"
                    onClick={() => navigate(`/shipments/${s.id}`)}
                  >
                    <td className="py-3.5 px-3 font-bold text-[#292D2F] group-hover:text-[#F2AE32] transition-colors">
                      {s.id}
                    </td>
                    <td className="py-3.5 px-3 font-sans font-semibold text-[#292D2F]">
                      {s.customer}
                    </td>
                    <td className="py-3.5 px-3 text-[#A5A5A4]">
                      {s.origin}
                    </td>
                    <td className="py-3.5 px-3 text-[#A5A5A4]">
                      {s.destination}
                    </td>
                    <td className="py-3.5 px-3 text-[#292D2F] font-sans font-medium">
                      {s.product}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.status === 'Delivered'
                            ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                            : s.status === 'At Risk'
                            ? 'bg-[#F2AE32]/15 text-[#F2AE32] border border-[#F2AE32]/30'
                            : s.status === 'Pending'
                            ? 'bg-gray-100 text-[#A5A5A4] border border-[#D0CEC9]'
                            : 'bg-[#06383D]/10 text-[#06383D] border border-[#06383D]/20'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          s.tempStatus === 'critical'
                            ? 'bg-red-50 text-[#DC2626] border border-red-200'
                            : 'bg-[#06383D]/10 text-[#06383D]'
                        }`}
                      >
                        {s.temp}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#06383D] font-bold whitespace-nowrap">
                      {s.eta}
                    </td>
                    <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/shipments/${s.id}`}
                          className="p-1.5 rounded-lg border border-[#D0CEC9] text-[#06383D] hover:bg-[#06383D] hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setEditingShipment(s)}
                          className="p-1.5 rounded-lg border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] hover:bg-white transition-colors cursor-pointer"
                          title="Edit Shipment"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredShipments.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-xs text-[#A5A5A4]">
                      <Package className="w-9 h-9 mx-auto text-[#A5A5A4]/40 mb-2" />
                      <div className="font-bold text-sm text-[#292D2F]">No matching consignments found</div>
                      <div className="text-xs text-[#A5A5A4] mt-1">
                        Zero shipments match query "{searchQuery}" with status "{statusFilter}".
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('All');
                        }}
                        className="mt-3 px-3.5 py-1.5 rounded-lg bg-[#06383D] text-white font-bold text-xs hover:bg-[#06383D]/85 cursor-pointer shadow-xs"
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: ORDERS (5 ORDERS) ───────────────────────────────────── */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Cold-Chain Commercial Orders ({filteredOrders.length})
            </span>
            <span className="text-[10px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Items Ordered</th>
                  <th className="py-2.5 px-3">Order Date</th>
                  <th className="py-2.5 px-3">Order Value</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Linked Shipment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CEC9]/60">
                {filteredOrders.map((o) => (
                  <tr key={o.orderId} className="hover:bg-[#F0EEEA] transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#292D2F]">
                      {o.orderId}
                    </td>
                    <td className="py-3.5 px-3 font-sans font-semibold text-[#292D2F]">
                      {o.customer}
                    </td>
                    <td className="py-3.5 px-3 text-[#292D2F] font-sans">
                      {o.items}
                    </td>
                    <td className="py-3.5 px-3 text-[#A5A5A4]">
                      {o.orderDate}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-[#06383D]">
                      {o.totalValue}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          o.status === 'Dispatched'
                            ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                            : o.status === 'Ready for Dispatch'
                            ? 'bg-[#F2AE32]/15 text-[#F2AE32] border border-[#F2AE32]/30'
                            : 'bg-[#06383D]/10 text-[#06383D] border border-[#06383D]/20'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold">
                      {o.linkedShipment !== 'Unassigned' ? (
                        <Link
                          to={`/shipments/${o.linkedShipment}`}
                          className="text-[#06383D] hover:text-[#F2AE32] underline"
                        >
                          {o.linkedShipment}
                        </Link>
                      ) : (
                        <span className="text-[#A5A5A4] italic">Unassigned</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB CONTENT: SHIPMENT HISTORY (8 COMPLETED) ──────────────────────── */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-[#D0CEC9] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#A5A5A4]">
              Completed Delivery Archive ({filteredHistory.length})
            </span>
            <span className="text-[10px] font-mono text-[#A5A5A4]">DEMO DATA</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-[#D0CEC9] text-[#A5A5A4] uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Shipment ID</th>
                  <th className="py-2.5 px-3">Completed Date</th>
                  <th className="py-2.5 px-3">Corridor Route</th>
                  <th className="py-2.5 px-3">Product Cargo</th>
                  <th className="py-2.5 px-3 text-center">Outcome</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3 text-right">Audit Compliance Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D0CEC9]/60">
                {filteredHistory.map((h) => (
                  <tr key={h.id} className="hover:bg-[#F0EEEA] transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#292D2F]">
                      {h.id}
                    </td>
                    <td className="py-3.5 px-3 text-[#A5A5A4]">
                      {h.date}
                    </td>
                    <td className="py-3.5 px-3 text-[#292D2F] font-sans">
                      {h.route}
                    </td>
                    <td className="py-3.5 px-3 text-[#292D2F] font-sans font-medium">
                      {h.product}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          h.outcome === 'On-Time'
                            ? 'bg-emerald-50 text-[#16803C] border border-emerald-200'
                            : h.outcome === 'Spoilage'
                            ? 'bg-red-50 text-[#DC2626] border border-red-200'
                            : 'bg-amber-50 text-[#F2AE32] border border-amber-200'
                        }`}
                      >
                        {h.outcome}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[#A5A5A4]">
                      {h.duration}
                    </td>
                    <td className="py-3.5 px-3 text-right text-xs font-sans text-[#A5A5A4]">
                      {h.compliance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── CREATE SHIPMENT MODAL ────────────────────────────────────────────── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] max-w-2xl w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F2AE32]">
                  CONSIGNMENT DISPATCH WIZARD
                </span>
                <h2 className="text-xl font-black text-[#292D2F] mt-0.5">
                  Create Cold-Chain Shipment
                </h2>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-[#A5A5A4] hover:text-[#292D2F] hover:bg-[#F0EEEA]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error summary if any */}
            {Object.keys(formErrors).length > 0 && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-[#DC2626] text-xs font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Please complete all required fields below before creating shipment.</span>
              </div>
            )}

            <form onSubmit={handleCreateShipment} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Origin */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Origin Terminal *
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    placeholder="e.g. Nagpur Cold Depot Bay 4"
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.origin ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  />
                  {formErrors.origin && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.origin}</span>}
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Destination Terminal *
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="e.g. Mumbai JNPT Port CFS"
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.destination ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  />
                  {formErrors.destination && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.destination}</span>}
                </div>

                {/* Product Type */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Product Cargo Type *
                  </label>
                  <input
                    type="text"
                    value={formData.productType}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    placeholder="e.g. Kinnow Mandarins & Fresh Apples"
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.productType ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  />
                  {formErrors.productType && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.productType}</span>}
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Gross Weight *
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="e.g. 2.4 Tons / 800 kg"
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.weight ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  />
                  {formErrors.weight && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.weight}</span>}
                </div>

                {/* Required Temp Range */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Required Temp Range *
                  </label>
                  <select
                    value={formData.tempRange}
                    onChange={(e) => handleInputChange('tempRange', e.target.value)}
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.tempRange ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  >
                    <option value="">Select temperature category...</option>
                    <option value="+2°C to +8°C (Chilled / Vaccines)">+2°C to +8°C (Chilled / Vaccines / Fresh)</option>
                    <option value="-25°C to -18°C (Deep Frozen / Ice Cream)">-25°C to -18°C (Deep Frozen / Ice Cream)</option>
                    <option value="-70°C (Ultra-Cold Cryo Plasma)">-70°C (Ultra-Cold Cryo Plasma)</option>
                    <option value="+15°C to +25°C (Controlled Ambient)">+15°C to +25°C (Controlled Ambient / Pharma)</option>
                    <option value="0°C to +4°C (Meat & Fresh Dairy)">0°C to +4°C (Meat & Fresh Dairy)</option>
                  </select>
                  {formErrors.tempRange && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.tempRange}</span>}
                </div>

                {/* Scheduled Date */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Scheduled Dispatch Date *
                  </label>
                  <input
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.scheduledDate ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  />
                  {formErrors.scheduledDate && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.scheduledDate}</span>}
                </div>

                {/* Driver Assign */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Assign Command Pilot (Driver) *
                  </label>
                  <select
                    value={formData.driverAssign}
                    onChange={(e) => handleInputChange('driverAssign', e.target.value)}
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.driverAssign ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  >
                    <option value="">Choose certified cold-chain driver...</option>
                    <option value="Rajesh Sharma">Rajesh Sharma (Safety Score: 97.4%)</option>
                    <option value="Amit Verma">Amit Verma (Safety Score: 94.2%)</option>
                    <option value="Vikram Rathore">Vikram Rathore (Safety Score: 91.8%)</option>
                    <option value="Satish Patil">Satish Patil (Safety Score: 99.1%)</option>
                    <option value="Harpreet Singh">Harpreet Singh (Safety Score: 96.0%)</option>
                  </select>
                  {formErrors.driverAssign && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.driverAssign}</span>}
                </div>

                {/* Vehicle Assign */}
                <div>
                  <label className="block text-[#292D2F] font-bold mb-1">
                    Assign Reefer Vehicle *
                  </label>
                  <select
                    value={formData.vehicleAssign}
                    onChange={(e) => handleInputChange('vehicleAssign', e.target.value)}
                    className={`w-full bg-white border rounded-lg px-3 py-2 text-xs focus:outline-none ${
                      formErrors.vehicleAssign ? 'border-[#DC2626]' : 'border-[#D0CEC9] focus:border-[#F2AE32]'
                    }`}
                  >
                    <option value="">Select calibrated reefer vehicle...</option>
                    <option value="CC-102 (Carrier Vector 1550)">CC-102 (Carrier Vector 1550 Reefer)</option>
                    <option value="CC-107 (Thermo King Multi-Zone)">CC-107 (Thermo King Multi-Zone)</option>
                    <option value="CC-118 (BharatBenz Deep Freeze)">CC-118 (BharatBenz Deep Freeze)</option>
                    <option value="CC-124 (Cryogenic Reefer Unit)">CC-124 (Cryogenic Reefer Unit)</option>
                    <option value="CC-131 (Tata Prima Insulated Reefer)">CC-131 (Tata Prima Insulated Reefer)</option>
                  </select>
                  {formErrors.vehicleAssign && <span className="text-[#DC2626] text-[10px] mt-0.5 block">{formErrors.vehicleAssign}</span>}
                </div>

              </div>

              <div className="pt-4 border-t border-[#D0CEC9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] font-bold rounded-lg px-4 py-2 hover:bg-[#F0EEEA] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F2AE32] text-[#292D2F] font-bold rounded-lg px-5 py-2 hover:bg-[#F2AE32]/85 transition-colors shadow-sm cursor-pointer"
                >
                  Confirm & Dispatch Shipment
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ─── EDIT SHIPMENT DRAWER/MODAL ───────────────────────────────────────── */}
      {editingShipment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#06383D]">
                  EDIT MANIFEST
                </span>
                <h2 className="text-lg font-black text-[#292D2F]">
                  Update {editingShipment.id}
                </h2>
              </div>
              <button
                onClick={() => setEditingShipment(null)}
                className="text-[#A5A5A4] hover:text-[#292D2F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block font-bold text-[#292D2F] mb-1">Status</label>
                <select
                  value={editingShipment.status}
                  onChange={(e) =>
                    setEditingShipment({
                      ...editingShipment,
                      status: e.target.value as any
                    })
                  }
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F2AE32]"
                >
                  <option value="In Transit">In Transit</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#292D2F] mb-1">Current Temperature</label>
                <input
                  type="text"
                  value={editingShipment.temp}
                  onChange={(e) =>
                    setEditingShipment({
                      ...editingShipment,
                      temp: e.target.value
                    })
                  }
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F2AE32]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#292D2F] mb-1">ETA Horizon</label>
                <input
                  type="text"
                  value={editingShipment.eta}
                  onChange={(e) =>
                    setEditingShipment({
                      ...editingShipment,
                      eta: e.target.value
                    })
                  }
                  className="w-full bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 focus:outline-none focus:border-[#F2AE32]"
                />
              </div>

              <div className="pt-3 border-t border-[#D0CEC9] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingShipment(null)}
                  className="border border-[#D0CEC9] text-[#A5A5A4] hover:text-[#292D2F] font-bold rounded-lg px-4 py-2 hover:bg-[#F0EEEA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#06383D] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#06383D]/85"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── INTERACTIVE BARCODE / QR SCANNER MODAL ───────────────────────── */}
      {isScannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#D0CEC9] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#D0CEC9] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#06383D] flex items-center justify-center text-[#F2AE32]">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#06383D]">
                    GS1-128 & QR SCANNER
                  </div>
                  <h2 className="text-base font-black text-[#292D2F]">
                    Scan Cold-Chain Cargo / Pallet
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsScannerModalOpen(false)}
                className="text-[#A5A5A4] hover:text-[#292D2F] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewfinder simulation */}
            <div className="relative bg-[#292D2F] rounded-lg h-44 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
              {/* Corner targeting brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#F2AE32]"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#F2AE32]"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#F2AE32]"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#F2AE32]"></div>

              {/* Animated laser scan line */}
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#F2AE32] shadow-[0_0_8px_#F2AE32] animate-pulse"></div>

              <ScanLine className="w-8 h-8 text-[#F2AE32]/70 mb-2" />
              <p className="text-white text-xs font-mono">
                Position 2D QR Code or GS1 Pallet Barcode inside frame
              </p>
              <span className="text-[#A5A5A4] text-[10px] font-mono mt-1">
                Optical sensor auto-detect active &bull; Handheld Terminal #HH-094
              </span>
            </div>

            {/* Quick Demo Scan Triggers */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#A5A5A4] mb-1.5">
                Quick Scan Sample Barcode / Pallet Tag:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleScanCode('SHP-8092')}
                  className="px-2 py-1.5 rounded border border-[#D0CEC9] hover:border-[#06383D] bg-[#F0EEEA] text-[#06383D] font-mono text-[11px] font-bold text-center cursor-pointer transition-colors"
                >
                  SHP-8092 (Apples)
                </button>
                <button
                  type="button"
                  onClick={() => handleScanCode('SHP-8104')}
                  className="px-2 py-1.5 rounded border border-[#D0CEC9] hover:border-[#06383D] bg-[#F0EEEA] text-[#06383D] font-mono text-[11px] font-bold text-center cursor-pointer transition-colors"
                >
                  SHP-8104 (Vaccines)
                </button>
                <button
                  type="button"
                  onClick={() => handleScanCode('PLT-8092-01')}
                  className="px-2 py-1.5 rounded border border-[#D0CEC9] hover:border-[#06383D] bg-[#F0EEEA] text-[#06383D] font-mono text-[11px] font-bold text-center cursor-pointer transition-colors"
                >
                  PLT-8092-01 (Pallet)
                </button>
              </div>
            </div>

            {/* Manual input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or enter barcode string (e.g. SHP-8119)..."
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (scannedCode) handleScanCode(scannedCode);
                  }
                }}
                className="flex-1 bg-white border border-[#D0CEC9] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#F2AE32]"
              />
              <button
                type="button"
                onClick={() => {
                  if (scannedCode) handleScanCode(scannedCode);
                }}
                className="px-4 py-2 bg-[#06383D] text-white font-mono text-xs font-bold rounded-lg hover:bg-[#06383D]/85 cursor-pointer"
              >
                Scan
              </button>
            </div>

            {/* Scan Result Card */}
            {scanResult && (
              <div className="p-3.5 rounded-lg border border-[#D0CEC9] bg-[#F0EEEA] space-y-2 animate-in fade-in text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#06383D] text-sm">
                    {scanResult.title}
                  </span>
                  {scanResult.type !== 'unknown' && (
                    <span className="px-2 py-0.5 rounded bg-[#06383D] text-white text-[10px] font-bold">
                      VERIFIED
                    </span>
                  )}
                </div>

                {scanResult.type === 'shipment' && (
                  <div className="space-y-1 text-[#292D2F]">
                    <div><span className="text-[#A5A5A4]">Consignee:</span> {scanResult.customer}</div>
                    <div><span className="text-[#A5A5A4]">Product:</span> {scanResult.product}</div>
                    <div><span className="text-[#A5A5A4]">Corridor:</span> {scanResult.route}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#A5A5A4]">Sensor Temp:</span>
                      <span className="font-bold text-[#06383D]">{scanResult.temp}</span>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsScannerModalOpen(false);
                          navigate(`/shipments/${scanResult.id}`);
                        }}
                        className="w-full py-2 rounded bg-[#F2AE32] text-[#292D2F] font-bold text-center text-xs uppercase cursor-pointer hover:bg-[#F2AE32]/85"
                      >
                        Open Shipment Dossier ({scanResult.id}) →
                      </button>
                    </div>
                  </div>
                )}

                {scanResult.type === 'pallet' && (
                  <div className="space-y-1 text-[#292D2F]">
                    <div><span className="text-[#A5A5A4]">Assigned Chamber:</span> {scanResult.route}</div>
                    <div><span className="text-[#A5A5A4]">Pre-cool Temp:</span> {scanResult.temp}</div>
                    <div><span className="text-[#A5A5A4]">Supervisor:</span> {scanResult.driver}</div>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setIsScannerModalOpen(false);
                          navigate('/warehouse');
                        }}
                        className="w-full py-2 rounded bg-[#06383D] text-white font-bold text-center text-xs uppercase cursor-pointer hover:bg-[#06383D]/85"
                      >
                        Inspect in Warehouse Chambers →
                      </button>
                    </div>
                  </div>
                )}

                {scanResult.type === 'unknown' && (
                  <div className="text-amber-800 text-xs">
                    {scanResult.message}
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsScannerModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[#D0CEC9] text-[#292D2F] text-xs font-mono font-bold hover:bg-[#F0EEEA] cursor-pointer"
              >
                Close Scanner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FOOTER NOTE ──────────────────────────────────────────────────────── */}
      <div className="text-center py-2 text-xs font-mono text-[#A5A5A4]">
        ColdChain 360 AI · Consignments & Orders Console · ALL METRICS MARKED AS DEMO DATA
      </div>

    </div>
  );
};
