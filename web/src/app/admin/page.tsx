'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  CreditCard, 
  Repeat, 
  Settings, 
  Plus, 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  ChevronRight, 
  X, 
  Bell, 
  Menu,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { VEHICLES, Vehicle } from '@/data/vehicles';

// Extended Vehicle Type with editable dealership status
interface AdminVehicle extends Vehicle {
  status: 'in-stock' | 'reserved' | 'sold';
  stockNumber: string;
  viewsCount: number;
}

interface TestDriveBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  vehicleId: string;
  vehicleName: string;
  scheduledDate: string;
  scheduledTime: string;
  showroomBranch: string;
  advisor: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

interface FinancingApplication {
  id: string;
  applicantName: string;
  applicantPhone: string;
  vehicleName: string;
  vehiclePrice: string;
  downPayment: string;
  termMonths: number;
  monthlyEstimate: string;
  bankPartner: string;
  status: 'under-review' | 'pre-approved' | 'approved' | 'declined';
  appliedDate: string;
}

interface TradeInItem {
  id: string;
  clientName: string;
  clientPhone: string;
  clientCar: string;
  year: number;
  mileage: string;
  desiredCar: string;
  estimatedValue: string;
  status: 'inspection-pending' | 'appraisal-sent' | 'deal-closed';
  date: string;
}

export default function AdminDashboardPage() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'bookings' | 'financing' | 'tradeins' | 'settings'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Initial Vehicles mapped with Admin fields
  const [inventory, setInventory] = useState<AdminVehicle[]>(() => 
    VEHICLES.map((v, i) => ({
      ...v,
      status: i === 1 ? 'reserved' : i === 4 ? 'sold' : 'in-stock',
      stockNumber: `DFM-${1000 + i}`,
      viewsCount: 240 + (i * 35),
    }))
  );

  // Test Drive Bookings State
  const [bookings, setBookings] = useState<TestDriveBooking[]>([
    {
      id: 'BK-901',
      clientName: 'Atty. Rafael Mercado',
      clientPhone: '+63 917 554 8921',
      clientEmail: 'rmercado@lawfirm.ph',
      vehicleId: 'porsche-gt4rs',
      vehicleName: '2026 Porsche 718 Cayman GT4 RS',
      scheduledDate: 'Oct 18, 2026',
      scheduledTime: '10:30 AM',
      showroomBranch: 'Circuit Makati Studio',
      advisor: 'Carlos Mendoza',
      status: 'pending',
      createdAt: '2 hours ago',
    },
    {
      id: 'BK-902',
      clientName: 'Dr. Maria Santos-Cruz',
      clientPhone: '+63 918 902 4411',
      clientEmail: 'dr.cruz@medcenter.ph',
      vehicleId: 'everest-2024',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      scheduledDate: 'Oct 17, 2026',
      scheduledTime: '2:00 PM',
      showroomBranch: 'BGC Flagship Showroom',
      advisor: 'Janrey Mina',
      status: 'confirmed',
      createdAt: '5 hours ago',
    },
    {
      id: 'BK-903',
      clientName: 'Eduardo Tan',
      clientPhone: '+63 920 332 9900',
      clientEmail: 'ed.tan@apexholdings.com',
      vehicleId: 'lc300-2023',
      vehicleName: '2023 Toyota Land Cruiser 300 ZX',
      scheduledDate: 'Oct 19, 2026',
      scheduledTime: '4:00 PM',
      showroomBranch: 'BGC Flagship Showroom',
      advisor: 'Carlos Mendoza',
      status: 'pending',
      createdAt: 'Yesterday',
    },
    {
      id: 'BK-904',
      clientName: 'Vicente Sy',
      clientPhone: '+63 917 111 8888',
      clientEmail: 'vsy@primex.com',
      vehicleId: 'bmw-m3-2023',
      vehicleName: '2023 BMW M3 Competition xDrive',
      scheduledDate: 'Oct 16, 2026',
      scheduledTime: '11:00 AM',
      showroomBranch: 'Circuit Makati Studio',
      advisor: 'Janrey Mina',
      status: 'completed',
      createdAt: '2 days ago',
    },
  ]);

  // Financing Applications State
  const [financingApps, setFinancingApps] = useState<FinancingApplication[]>([
    {
      id: 'FN-401',
      applicantName: 'Enrique Lopez',
      applicantPhone: '+63 917 882 1200',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      vehiclePrice: '₱2,350,000',
      downPayment: '₱470,000 (20%)',
      termMonths: 48,
      monthlyEstimate: '₱38,500',
      bankPartner: 'BDO Private Bank',
      status: 'pre-approved',
      appliedDate: 'Oct 15, 2026',
    },
    {
      id: 'FN-402',
      applicantName: 'Samantha Nicole Ong',
      applicantPhone: '+63 928 440 9182',
      vehicleName: '2023 BMW M3 Competition xDrive',
      vehiclePrice: '₱6,950,000',
      downPayment: '₱2,085,000 (30%)',
      termMonths: 36,
      monthlyEstimate: '₱118,200',
      bankPartner: 'BPI Family Savings',
      status: 'under-review',
      appliedDate: 'Oct 16, 2026',
    },
    {
      id: 'FN-403',
      applicantName: 'Capt. Gerald Bautista',
      applicantPhone: '+63 905 667 2234',
      vehicleName: '2023 Toyota Hilux GR Sport 4x4',
      vehiclePrice: '₱1,980,000',
      downPayment: '₱396,000 (20%)',
      termMonths: 60,
      monthlyEstimate: '₱31,200',
      bankPartner: 'Security Bank Auto Loans',
      status: 'approved',
      appliedDate: 'Oct 14, 2026',
    },
  ]);

  // Trade-In Leads State
  const [tradeIns, setTradeIns] = useState<TradeInItem[]>([
    {
      id: 'TI-201',
      clientName: 'Alexander Yu',
      clientPhone: '+63 917 992 0011',
      clientCar: '2021 Toyota Fortuner LTD 4x4',
      year: 2021,
      mileage: '38,000 KM',
      desiredCar: '2023 Toyota Land Cruiser 300 ZX',
      estimatedValue: '₱1,750,000',
      status: 'appraisal-sent',
      date: 'Oct 15, 2026',
    },
    {
      id: 'TI-202',
      clientName: 'Kenneth Co',
      clientPhone: '+63 918 333 4455',
      clientCar: '2020 Ford Ranger Raptor 2.0 Bi-Turbo',
      year: 2020,
      mileage: '42,500 KM',
      desiredCar: '2024 Ford Everest Titanium+ 4x4',
      estimatedValue: '₱1,380,000',
      status: 'inspection-pending',
      date: 'Oct 16, 2026',
    },
  ]);

  // Filter & Search states for inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'in-stock' | 'reserved' | 'sold'>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'suv' | 'sedan' | 'truck' | 'premium'>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);

  // New Vehicle Form State
  const [formData, setFormData] = useState({
    name: '',
    make: 'Ford',
    model: '',
    trim: '',
    year: 2024,
    category: 'suv' as 'suv' | 'sedan' | 'truck' | 'premium',
    categoryLabel: 'Family SUV',
    price: '',
    priceNumeric: 0,
    monthly: '₱35,000/mo',
    mileage: '10,000 KM',
    fuel: 'Diesel',
    transmission: 'Automatic',
    engine: '2.0L Turbo',
    drivetrain: '4x4',
    power: '210 PS',
    torque: '500 Nm',
    seating: '7 Passengers',
    color: 'Obsidian Black',
    plateEnding: '8',
    orCrStatus: 'Clean LTO Documents, 1st Owner',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    description: 'Dealer certified pre-owned showroom unit in immaculate condition.',
  });

  // Notifications Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered Inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter((car) => {
      const matchesSearch = 
        car.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        car.stockNumber.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        car.make.toLowerCase().includes(inventorySearch.toLowerCase());
      
      const matchesStatus = selectedStatusFilter === 'all' || car.status === selectedStatusFilter;
      const matchesCategory = selectedCategoryFilter === 'all' || car.category === selectedCategoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [inventory, inventorySearch, selectedStatusFilter, selectedCategoryFilter]);

  // Aggregate KPI metrics
  const totalFleetValue = useMemo(() => {
    return inventory.reduce((acc, car) => acc + (car.priceNumeric || 0), 0);
  }, [inventory]);

  const inStockCount = useMemo(() => inventory.filter(v => v.status === 'in-stock').length, [inventory]);
  const reservedCount = useMemo(() => inventory.filter(v => v.status === 'reserved').length, [inventory]);
  const soldCount = useMemo(() => inventory.filter(v => v.status === 'sold').length, [inventory]);

  // Handlers for Vehicle CRUD
  const handleStatusChange = (carId: string, newStatus: 'in-stock' | 'reserved' | 'sold') => {
    setInventory(prev => prev.map(car => car.id === carId ? { ...car, status: newStatus } : car));
    showToast(`Vehicle status updated to ${newStatus.toUpperCase()}`);
  };

  const handleDeleteVehicle = (carId: string) => {
    if (confirm('Are you sure you want to delete this vehicle from inventory?')) {
      setInventory(prev => prev.filter(c => c.id !== carId));
      showToast('Vehicle removed from dealership catalog.');
    }
  };

  const handleOpenEdit = (car: AdminVehicle) => {
    setEditingVehicle(car);
    setFormData({
      name: car.name,
      make: car.make,
      model: car.model,
      trim: car.trim,
      year: car.year,
      category: car.category,
      categoryLabel: car.categoryLabel,
      price: car.price,
      priceNumeric: car.priceNumeric,
      monthly: car.monthly,
      mileage: car.mileage,
      fuel: car.fuel,
      transmission: car.transmission,
      engine: car.engine,
      drivetrain: car.drivetrain,
      power: car.power,
      torque: car.torque,
      seating: car.seating,
      color: car.color,
      plateEnding: car.plateEnding,
      orCrStatus: car.orCrStatus,
      imageUrl: car.images[0] || '',
      description: car.description,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setInventory(prev => prev.map(car => {
      if (car.id === editingVehicle.id) {
        return {
          ...car,
          ...formData,
          images: [formData.imageUrl, ...car.images.slice(1)],
        };
      }
      return car;
    }));

    setIsEditModalOpen(false);
    setEditingVehicle(null);
    showToast('Vehicle specification saved successfully.');
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newCar: AdminVehicle = {
      id: `car-${Date.now()}`,
      name: formData.name,
      make: formData.make,
      model: formData.model,
      trim: formData.trim,
      year: formData.year,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      price: formData.price,
      priceNumeric: formData.priceNumeric || parseInt(formData.price.replace(/\D/g, ''), 10) || 0,
      monthly: formData.monthly,
      badge: 'New Arrival',
      mileage: formData.mileage,
      fuel: formData.fuel,
      transmission: formData.transmission,
      engine: formData.engine,
      drivetrain: formData.drivetrain,
      power: formData.power,
      torque: formData.torque,
      seating: formData.seating,
      color: formData.color,
      plateEnding: formData.plateEnding,
      orCrStatus: formData.orCrStatus,
      images: [formData.imageUrl],
      description: formData.description,
      features: ['200-Point Inspected', 'Dealer Warranty', 'Full Casa Records'],
      inspectionHighlights: [
        { name: 'Engine Compression', score: '99%' },
        { name: 'Transmission Fluid Quality', score: '100%' },
      ],
      status: 'in-stock',
      stockNumber: `DFM-${1000 + inventory.length + 1}`,
      viewsCount: 1,
    };

    setInventory([newCar, ...inventory]);
    setIsAddModalOpen(false);
    showToast(`${formData.name} published to inventory catalog!`);
  };

  // Handlers for Booking Status
  const handleBookingStatus = (id: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Test drive booking ${id} marked as ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 flex font-sans selection:bg-red-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14141e] border border-red-500/80 text-white px-5 py-3 rounded shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)} 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0a0a0f] border-r border-white/10 z-50 
        flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div>
          <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="bg-red-600 px-2 py-0.5 text-white font-extrabold text-sm tracking-tight rounded-sm">
                DRIVEFLOW
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                ADMIN // OPS
              </span>
            </Link>

            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick System Telemetry Pill */}
          <div className="px-5 py-3 border-b border-white/5 bg-[#0e0e16]/60">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Showroom Cloud
              </span>
              <span className="text-slate-200 font-bold">{inStockCount} Units Live</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dealership Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab('inventory'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 shrink-0" />
                <span>Vehicle Inventory</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'inventory' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'
              }`}>
                {inventory.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('bookings'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Test Drive Bookings</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                {bookings.filter(b => b.status === 'pending').length} new
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('financing'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'financing'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Bank Financing</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'financing' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'
              }`}>
                {financingApps.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('tradeins'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'tradeins'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Repeat className="w-4 h-4 shrink-0" />
                <span>Trade-In Appraisals</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'tradeins' ? 'bg-black/40 text-white' : 'bg-white/10 text-slate-300'
              }`}>
                {tradeIns.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Dealership Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium rounded transition border border-white/5"
          >
            <span>View Live Showroom</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold text-xs">
              JM
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">Janrey Mina</span>
              <span className="text-[10px] font-mono text-slate-400 block truncate">Dealership GM</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span>DriveFlow Motors</span>
                <span>/</span>
                <span className="text-white capitalize">{activeTab}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white capitalize leading-tight">
                {activeTab === 'overview' && 'Dealership Command Center'}
                {activeTab === 'inventory' && 'Vehicle Fleet Management'}
                {activeTab === 'bookings' && 'VIP Test Drive Appointments'}
                {activeTab === 'financing' && 'Auto Loan & Financing Applications'}
                {activeTab === 'tradeins' && 'Trade-In Vehicle Valuations'}
                {activeTab === 'settings' && 'Dealership Operating Settings'}
              </h1>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 sm:px-4 py-2 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Vehicle</span>
            </button>

            <Link
              href="/vehicles"
              target="_blank"
              className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs px-3 py-2 rounded border border-white/10 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Public Catalog</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* ================================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg relative overflow-hidden group hover:border-red-600/50 transition">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">TOTAL FLEET VALUE</span>
                    <DollarSign className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    ₱{(totalFleetValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+8.4% inventory turnover</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg relative overflow-hidden group hover:border-red-600/50 transition">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">SHOWROOM FLEET</span>
                    <Car className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {inventory.length} <span className="text-sm font-normal text-slate-400">UNITS</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-300 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{inStockCount} In Stock</span>
                    <span>•</span>
                    <span className="text-amber-400 font-bold">{reservedCount} Reserved</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg relative overflow-hidden group hover:border-red-600/50 transition">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">TEST DRIVES SCHEDULED</span>
                    <Calendar className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {bookings.length} <span className="text-sm font-normal text-slate-400">SESSIONS</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-red-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{bookings.filter(b => b.status === 'pending').length} pending confirmation</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg relative overflow-hidden group hover:border-red-600/50 transition">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">LOAN APPROVAL RATE</span>
                    <CreditCard className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    94.2%
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Avg 15-min underwriting</span>
                  </div>
                </div>

              </div>

              {/* Middle Section: Recent Activity & Fleet Category Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 cols: Test Drive VIP Queue */}
                <div className="lg:col-span-7 bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>Upcoming VIP Test Drive Appointments</span>
                    </h2>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-red-400 hover:text-red-300 transition font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({bookings.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((booking) => (
                      <div 
                        key={booking.id}
                        className="bg-[#14141e] border border-white/5 p-3.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/20 transition"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{booking.clientName}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                              booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-slate-500/20 text-slate-400'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-semibold mt-1">
                            {booking.vehicleName}
                          </p>
                          <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                            <span>{booking.scheduledDate} @ {booking.scheduledTime}</span>
                            <span>•</span>
                            <span>{booking.showroomBranch.split(' ')[0]}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleBookingStatus(booking.id, 'confirmed')}
                              className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded transition cursor-pointer"
                            >
                              Confirm
                            </button>
                          )}
                          <a
                            href={`tel:${booking.clientPhone}`}
                            className="bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] px-3 py-1.5 rounded transition border border-white/10"
                          >
                            Call Client
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 cols: Inventory Breakdown & Quick Action */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Category Breakdown */}
                  <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                    <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Car className="w-4 h-4 text-red-500" />
                      <span>Fleet Category Composition</span>
                    </h2>

                    <div className="space-y-3">
                      {[
                        { label: 'Family SUVs', count: inventory.filter(v => v.category === 'suv').length, color: 'bg-red-600' },
                        { label: 'Daily Commuters (Sedans)', count: inventory.filter(v => v.category === 'sedan').length, color: 'bg-blue-600' },
                        { label: 'Work & Utility Trucks', count: inventory.filter(v => v.category === 'truck').length, color: 'bg-amber-600' },
                        { label: 'Flagship & Premium GT', count: inventory.filter(v => v.category === 'premium').length, color: 'bg-purple-600' },
                      ].map((cat) => (
                        <div key={cat.label} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-300">{cat.label}</span>
                            <span className="font-mono text-slate-400 font-bold">{cat.count} units</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${cat.color} rounded-full`}
                              style={{ width: `${(cat.count / inventory.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dealership Broadcast Box */}
                  <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-600/30 rounded p-4.5">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                      // MANILA DEALERSHIP BULLETIN
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Upcoming bank rate adjustment on Oct 20. Ensure all pending financing applications are processed with BDO & BPI partners prior to cutoff.
                    </p>
                  </div>

                </div>

              </div>

              {/* Bottom Row: Recent Inventory Additions */}
              <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Car className="w-4 h-4 text-red-500" />
                    <span>Recently Added Showroom Inventory</span>
                  </h2>
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className="text-xs text-red-400 hover:text-red-300 font-mono transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage Full Fleet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {inventory.slice(0, 3).map((car) => (
                    <div 
                      key={car.id}
                      className="bg-[#14141e] border border-white/10 rounded overflow-hidden flex flex-col group hover:border-red-600/50 transition"
                    >
                      <div className="h-36 relative overflow-hidden bg-slate-900">
                        <img 
                          src={car.images[0]} 
                          alt={car.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-2 left-2 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold shadow ${
                          car.status === 'in-stock' ? 'bg-emerald-600 text-white' :
                          car.status === 'reserved' ? 'bg-amber-600 text-white' :
                          'bg-red-700 text-white'
                        }`}>
                          {car.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">{car.stockNumber}</span>
                          <h3 className="text-xs font-bold text-white truncate">{car.name}</h3>
                          <div className="text-[11px] font-mono text-slate-400 mt-1">
                            {car.engine} • {car.mileage}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/10 mt-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-white">{car.price}</span>
                          <button
                            onClick={() => handleOpenEdit(car)}
                            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: INVENTORY MANAGEMENT */}
          {/* ================================================================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-5">
              
              {/* Controls & Filter Bar */}
              <div className="bg-[#101017] border border-white/10 rounded p-4 shadow-lg space-y-3">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  
                  {/* Search Bar */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      placeholder="Search by stock number, car name, make, model..."
                      className="w-full bg-[#161622] border border-white/10 text-xs text-white pl-10 pr-4 py-2.5 rounded outline-none focus:border-red-500 transition"
                    />
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedStatusFilter}
                      onChange={(e: any) => setSelectedStatusFilter(e.target.value)}
                      className="bg-[#161622] border border-white/10 text-xs text-white px-3 py-2.5 rounded outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="in-stock">In Stock ({inStockCount})</option>
                      <option value="reserved">Reserved ({reservedCount})</option>
                      <option value="sold">Sold ({soldCount})</option>
                    </select>

                    <select
                      value={selectedCategoryFilter}
                      onChange={(e: any) => setSelectedCategoryFilter(e.target.value)}
                      className="bg-[#161622] border border-white/10 text-xs text-white px-3 py-2.5 rounded outline-none cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      <option value="suv">Family SUVs</option>
                      <option value="sedan">Daily Commuters</option>
                      <option value="truck">Work & Utility</option>
                      <option value="premium">Flagship & Premium</option>
                    </select>

                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer ml-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Vehicle</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Inventory Table */}
              <div className="bg-[#101017] border border-white/10 rounded overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#14141e] text-[11px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5">Vehicle Details</th>
                        <th className="px-4 py-3.5">Category</th>
                        <th className="px-4 py-3.5">Specs & Plate</th>
                        <th className="px-4 py-3.5">Cash Price</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filteredInventory.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-slate-400 font-mono text-xs">
                            No vehicles matching your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredInventory.map((car) => (
                          <tr key={car.id} className="hover:bg-white/[0.02] transition">
                            
                            {/* Vehicle Details */}
                            <td className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={car.images[0]}
                                  alt={car.name}
                                  className="w-14 h-10 object-cover rounded bg-slate-900 border border-white/10 shrink-0"
                                />
                                <div>
                                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                                    {car.stockNumber}
                                  </span>
                                  <span className="font-bold text-white block hover:text-red-400 transition cursor-pointer">
                                    {car.name}
                                  </span>
                                  <span className="text-[11px] text-slate-400 font-mono">
                                    {car.year} • {car.color}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="px-4 py-3.5">
                              <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-slate-300">
                                {car.categoryLabel}
                              </span>
                            </td>

                            {/* Specs */}
                            <td className="px-4 py-3.5 font-mono text-[11px] text-slate-300">
                              <div>{car.engine}</div>
                              <div className="text-slate-500">{car.mileage} • Plate {car.plateEnding.split(' ')[0]}</div>
                            </td>

                            {/* Price */}
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-white text-sm">{car.price}</div>
                              <div className="text-[10px] font-mono text-red-400">{car.monthly}</div>
                            </td>

                            {/* Status Selector */}
                            <td className="px-4 py-3.5">
                              <select
                                value={car.status}
                                onChange={(e: any) => handleStatusChange(car.id, e.target.value)}
                                className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded font-bold outline-none cursor-pointer border ${
                                  car.status === 'in-stock' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                                  car.status === 'reserved' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                  'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}
                              >
                                <option value="in-stock" className="bg-[#161622] text-white">In Stock</option>
                                <option value="reserved" className="bg-[#161622] text-white">Reserved</option>
                                <option value="sold" className="bg-[#161622] text-white">Sold</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3.5 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <Link
                                  href={`/vehicles/${car.id}`}
                                  target="_blank"
                                  className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition border border-white/5"
                                  title="View Public Page"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </Link>

                                <button
                                  onClick={() => handleOpenEdit(car)}
                                  className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition border border-white/5 cursor-pointer"
                                  title="Edit Vehicle"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => handleDeleteVehicle(car.id)}
                                  className="w-7 h-7 rounded bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition border border-red-500/20 cursor-pointer"
                                  title="Delete Vehicle"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="p-3.5 bg-[#14141e] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Showing {filteredInventory.length} of {inventory.length} total fleet units</span>
                  <span>DriveFlow Dealership Management System v2.6</span>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: TEST DRIVE BOOKINGS */}
          {/* ================================================================= */}
          {activeTab === 'bookings' && (
            <div className="space-y-5">
              
              <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-white">VIP Private Viewing & Test Drive Schedule</h2>
                    <p className="text-xs text-slate-400">Appointments submitted through the showroom portal and booking hotline.</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded">
                      {bookings.filter(b => b.status === 'pending').length} Pending Review
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded">
                      {bookings.filter(b => b.status === 'confirmed').length} Confirmed
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="bg-[#14141e] border border-white/10 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono text-red-500 font-bold">{booking.id}</span>
                          <span className="text-sm font-bold text-white">{booking.clientName}</span>
                          <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded font-bold ${
                            booking.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-200 font-semibold">
                          Target Vehicle: <span className="text-white">{booking.vehicleName}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400">
                          <span>📅 {booking.scheduledDate} ({booking.scheduledTime})</span>
                          <span>🏢 {booking.showroomBranch}</span>
                          <span>👤 Advisor: {booking.advisor}</span>
                          <span>📞 {booking.clientPhone}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-start md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-white/10 w-full md:w-auto">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleBookingStatus(booking.id, 'confirmed')}
                            className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded transition cursor-pointer flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm Booking</span>
                          </button>
                        )}

                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => handleBookingStatus(booking.id, 'completed')}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded transition cursor-pointer flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleBookingStatus(booking.id, 'cancelled')}
                          className="bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs px-3 py-2 rounded transition border border-white/10 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: BANK FINANCING */}
          {/* ================================================================= */}
          {activeTab === 'financing' && (
            <div className="space-y-5">
              
              <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-white">Bank Financing & Loan Pre-Approvals</h2>
                    <p className="text-xs text-slate-400">Originated applications through BDO, BPI, Security Bank, and Metrobank partnerships.</p>
                  </div>
                  <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded">
                    Tier-1 Priority Lending Active
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#14141e] text-[11px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5">Ref No. & Applicant</th>
                        <th className="px-4 py-3.5">Target Vehicle</th>
                        <th className="px-4 py-3.5">Down Payment</th>
                        <th className="px-4 py-3.5">Monthly Amortization</th>
                        <th className="px-4 py-3.5">Lending Partner</th>
                        <th className="px-4 py-3.5">Underwriting Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {financingApps.map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-4 py-3.5">
                            <span className="text-[10px] font-mono text-red-500 font-bold block">{app.id}</span>
                            <span className="font-bold text-white block">{app.applicantName}</span>
                            <span className="text-[11px] font-mono text-slate-400">{app.applicantPhone}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-semibold text-white block">{app.vehicleName}</span>
                            <span className="text-[11px] font-mono text-slate-400">{app.vehiclePrice}</span>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-slate-300">
                            {app.downPayment}
                          </td>
                          <td className="px-4 py-3.5 font-mono">
                            <span className="font-bold text-white">{app.monthlyEstimate}</span>
                            <span className="text-slate-400 block text-[10px]">({app.termMonths} mos)</span>
                          </td>
                          <td className="px-4 py-3.5 font-mono text-slate-300">
                            {app.bankPartner}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                              app.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              app.status === 'pre-approved' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                              {app.status.replace('-', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: TRADE-IN VALUATIONS */}
          {/* ================================================================= */}
          {activeTab === 'tradeins' && (
            <div className="space-y-5">
              
              <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                <div className="mb-6">
                  <h2 className="text-base font-bold text-white">Client Trade-In Valuation Requests</h2>
                  <p className="text-xs text-slate-400">Appraise existing client vehicles against current DriveFlow certified showroom stock.</p>
                </div>

                <div className="space-y-3">
                  {tradeIns.map((ti) => (
                    <div 
                      key={ti.id}
                      className="bg-[#14141e] border border-white/10 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-red-500 font-bold">{ti.id}</span>
                          <span className="text-sm font-bold text-white">{ti.clientName}</span>
                          <span className="text-[10px] font-mono text-slate-400">({ti.clientPhone})</span>
                        </div>
                        <div className="text-xs text-slate-300">
                          Trade-In Unit: <strong className="text-white">{ti.clientCar}</strong> ({ti.year} • {ti.mileage})
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          Target Vehicle: <span className="text-red-400">{ti.desiredCar}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Estimated Offer</span>
                          <span className="text-base font-bold text-white font-mono">{ti.estimatedValue}</span>
                        </div>
                        <button
                          onClick={() => showToast(`Inspection docket generated for ${ti.clientCar}`)}
                          className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded transition cursor-pointer"
                        >
                          Send Appraisal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: SETTINGS & DEALERSHIP SPECS */}
          {/* ================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-5">
              
              <div className="bg-[#101017] border border-white/10 rounded p-5 shadow-lg space-y-6">
                <div>
                  <h2 className="text-base font-bold text-white">Dealership Headquarters & Operating Configuration</h2>
                  <p className="text-xs text-slate-400">Manage showroom contact, hotline, operating hours, and inventory publication flags.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono text-[11px] block uppercase">Showroom Name</label>
                    <input 
                      type="text" 
                      defaultValue="DriveFlow Motors Manila" 
                      className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono text-[11px] block uppercase">Showroom VIP Hotline</label>
                    <input 
                      type="text" 
                      defaultValue="+63 (2) 8877-CARS (2277)" 
                      className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono text-[11px] block uppercase">Main Dealership Address</label>
                    <input 
                      type="text" 
                      defaultValue="Circuit Makati & BGC, Metro Manila, Philippines" 
                      className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 font-mono text-[11px] block uppercase">Sales Inquiries Email</label>
                    <input 
                      type="email" 
                      defaultValue="sales@driveflow.ph" 
                      className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Last configuration backup: Today 10:30 AM</span>
                  <button 
                    onClick={() => showToast('Dealership settings saved successfully.')}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded transition shadow-md cursor-pointer"
                  >
                    Save Settings
                  </button>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD NEW VEHICLE */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-white/15 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#14141e] px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-red-500" />
                  <span>Add Vehicle to Showroom Fleet</span>
                </h2>
                <span className="text-[11px] font-mono text-slate-400">Publish fresh verified inventory to DriveFlow catalog</span>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateVehicle} className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Vehicle Display Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2024 Ford Everest Titanium+ 4x4"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Make / Manufacturer</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ford, BMW, Toyota"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Year</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) || 2024 })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e: any) => {
                      const cat = e.target.value;
                      const labels: Record<string, string> = {
                        suv: 'Family SUV',
                        sedan: 'Daily Commuter',
                        truck: 'Work & Utility',
                        premium: 'Flagship & Premium',
                      };
                      setFormData({ ...formData, category: cat, categoryLabel: labels[cat] });
                    }}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none cursor-pointer"
                  >
                    <option value="suv">Family SUV</option>
                    <option value="sedan">Daily Commuter</option>
                    <option value="truck">Work & Utility Truck</option>
                    <option value="premium">Flagship & Premium</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Cash Price</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₱2,350,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Estimated Monthly</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₱38,500/mo"
                    value={formData.monthly}
                    onChange={(e) => setFormData({ ...formData, monthly: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Odometer Mileage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 12,400 KM"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Engine Specs</label>
                  <input
                    type="text"
                    placeholder="e.g. 2.0L Bi-Turbo Diesel"
                    value={formData.engine}
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Color & Finish</label>
                  <input
                    type="text"
                    placeholder="e.g. Absolute Black Metallic"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Primary Vehicle Photo URL</label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Description / Condition Summary</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500 resize-none"
                  />
                </div>

              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded transition shadow-lg cursor-pointer"
                >
                  Publish Vehicle
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT VEHICLE */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-white/15 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#14141e] px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-red-500" />
                  <span>Edit Vehicle Specifications</span>
                </h2>
                <span className="text-[11px] font-mono text-slate-400">{editingVehicle?.stockNumber}</span>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Vehicle Display Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Cash Price</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Estimated Monthly</label>
                  <input
                    type="text"
                    required
                    value={formData.monthly}
                    onChange={(e) => setFormData({ ...formData, monthly: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Odometer Mileage</label>
                  <input
                    type="text"
                    required
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Engine Specs</label>
                  <input
                    type="text"
                    value={formData.engine}
                    onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Primary Vehicle Photo URL</label>
                  <input
                    type="url"
                    required
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-red-500"
                  />
                </div>

              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-2.5 rounded transition shadow-lg cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
