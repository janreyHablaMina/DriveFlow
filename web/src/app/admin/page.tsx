'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  CreditCard, 
  Repeat, 
  Search, 
  Plus, 
  ExternalLink, 
  X, 
  Menu, 
  Check, 
  Receipt, 
  Clock, 
  Printer, 
  TrendingUp, 
  DollarSign, 
  Trash2, 
  Edit3,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Phone,
  Eye,
  CheckCircle
} from 'lucide-react';
import { VEHICLES, Vehicle } from '@/data/vehicles';

// Vehicle with admin tracking
interface AdminVehicle extends Vehicle {
  status: 'in-stock' | 'reserved' | 'sold';
  stockNumber: string;
}

// Payment transaction log
interface PaymentTransaction {
  id: string;
  orNumber: string;
  date: string;
  time: string;
  amount: number;
  method: 'Bank Wire (BDO)' | 'Post-Dated Check (BPI)' | 'Online Transfer' | 'Showroom Cashier' | 'Direct Debit';
  type: 'Down Payment' | 'Monthly Amortization' | 'Principal Prepayment' | 'Lump Sum Settlement';
  refNumber: string;
  receivedBy: string;
  notes?: string;
}

// Customer Account with full financing and balance details
interface CustomerAccount {
  id: string;
  accountNumber: string;
  clientName: string;
  phone: string;
  email: string;
  tinOrId: string;
  billingAddress: string;
  
  // Vehicle details
  vehicleName: string;
  vinNumber: string;
  plateNumber: string;
  contractDate: string;
  dealershipBranch: string;
  
  // Financial breakdown
  contractPrice: number;
  downPaymentPaid: number;
  totalFinanced: number;
  totalAmountPaid: number;
  remainingBalance: number;
  monthlyAmortization: number;
  termMonths: number;
  nextDueDate: string;
  status: 'current' | 'overdue' | 'paid-in-full';
  
  // Complete payment ledger history
  paymentHistory: PaymentTransaction[];
}

// Test Drive Booking
interface TestDriveBooking {
  id: string;
  clientName: string;
  phone: string;
  vehicleName: string;
  branch: string;
  dateTime: string;
  advisor: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

// Financing Lead
interface FinancingLead {
  id: string;
  applicantName: string;
  phone: string;
  vehicleName: string;
  vehiclePrice: number;
  downPayment: number;
  termMonths: number;
  monthlyEstimate: number;
  bankPartner: string;
  status: 'pre-approved' | 'under-review' | 'approved';
}

// Trade-In Request
interface TradeInLead {
  id: string;
  clientName: string;
  phone: string;
  clientCar: string;
  year: number;
  mileage: string;
  targetCar: string;
  estimatedValue: number;
  status: 'appraisal-sent' | 'inspection-pending';
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'inventory' | 'bookings' | 'financing' | 'tradeins'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initial Vehicles
  const [inventory, setInventory] = useState<AdminVehicle[]>(() => 
    VEHICLES.map((v, i) => ({
      ...v,
      status: i === 1 ? 'reserved' : i === 4 ? 'sold' : 'in-stock',
      stockNumber: `DFM-${1001 + i}`,
    }))
  );

  // Initial Customer Accounts with rich details & payment ledgers
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>([
    {
      id: 'cust-1',
      accountNumber: 'ACC-DFM-2026-081',
      clientName: 'Gov. Ferdinand Romualdez',
      phone: '+63 917 554 1234',
      email: 'f.romualdez@gov.ph',
      tinOrId: 'TIN: 241-890-123-000',
      billingAddress: 'Forbes Park, Makati City, Metro Manila',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      vinNumber: 'MNB24EVR8849012',
      plateNumber: 'NGB-8818',
      contractDate: 'March 15, 2026',
      dealershipBranch: 'BGC Flagship Showroom',
      contractPrice: 2350000,
      downPaymentPaid: 470000,
      totalFinanced: 2580000,
      totalAmountPaid: 739500, // 470,000 DP + 7 monthly payments of 38,500
      remainingBalance: 1610500,
      monthlyAmortization: 38500,
      termMonths: 36,
      nextDueDate: 'Nov 15, 2026',
      status: 'current',
      paymentHistory: [
        { id: 'tx-1', orNumber: 'OR-2026-9680', date: 'Oct 15, 2026', time: '10:15 AM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004424', receivedBy: 'Marc Santos', notes: 'Amortization 07/36' },
        { id: 'tx-2', orNumber: 'OR-2026-9533', date: 'Sep 15, 2026', time: '01:30 PM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004423', receivedBy: 'Marc Santos', notes: 'Amortization 06/36' },
        { id: 'tx-3', orNumber: 'OR-2026-9401', date: 'Aug 15, 2026', time: '04:10 PM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004422', receivedBy: 'Marc Santos', notes: 'Amortization 05/36' },
        { id: 'tx-4', orNumber: 'OR-2026-9289', date: 'Jul 15, 2026', time: '11:20 AM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004421', receivedBy: 'Marc Santos', notes: 'Amortization 04/36' },
        { id: 'tx-5', orNumber: 'OR-2026-9155', date: 'Jun 15, 2026', time: '02:45 PM', amount: 38500, method: 'Online Transfer', type: 'Monthly Amortization', refNumber: 'INSTA-8829104', receivedBy: 'Janrey Mina', notes: 'Amortization 03/36' },
        { id: 'tx-6', orNumber: 'OR-2026-9044', date: 'May 15, 2026', time: '10:00 AM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004420', receivedBy: 'Marc Santos', notes: 'Amortization 02/36' },
        { id: 'tx-7', orNumber: 'OR-2026-8912', date: 'Apr 15, 2026', time: '09:15 AM', amount: 38500, method: 'Post-Dated Check (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004419', receivedBy: 'Marc Santos', notes: 'Amortization 01/36' },
        { id: 'tx-8', orNumber: 'OR-2026-8801', date: 'Mar 15, 2026', time: '11:30 AM', amount: 470000, method: 'Bank Wire (BDO)', type: 'Down Payment', refNumber: 'WIRE-BDO-992100', receivedBy: 'Janrey Mina', notes: 'Initial 20% equity down payment' },
      ],
    },
    {
      id: 'cust-2',
      accountNumber: 'ACC-DFM-2026-094',
      clientName: 'Atty. Patricia Beatrice Lim',
      phone: '+63 917 888 7711',
      email: 'pblim@limpartners.ph',
      tinOrId: 'TIN: 312-990-445-000',
      billingAddress: 'Dasmariñas Village, Makati City, Metro Manila',
      vehicleName: '2026 Porsche 718 Cayman GT4 RS',
      vinNumber: 'WP0AF2A82PS29910',
      plateNumber: 'PBL-718',
      contractDate: 'January 10, 2026',
      dealershipBranch: 'Circuit Makati Studio',
      contractPrice: 6400000,
      downPaymentPaid: 1920000,
      totalFinanced: 7100000,
      totalAmountPaid: 2892000, // 1,920,000 DP + 9 monthly payments of 108,000
      remainingBalance: 3508000,
      monthlyAmortization: 108000,
      termMonths: 48,
      nextDueDate: 'Nov 10, 2026',
      status: 'current',
      paymentHistory: [
        { id: 'tx-9', orNumber: 'OR-2026-9705', date: 'Oct 10, 2026', time: '02:00 PM', amount: 108000, method: 'Bank Wire (BDO)', type: 'Monthly Amortization', refNumber: 'WIRE-BDO-49102', receivedBy: 'Janrey Mina', notes: 'Amortization 09/48' },
        { id: 'tx-10', orNumber: 'OR-2026-9410', date: 'Sep 10, 2026', time: '11:15 AM', amount: 108000, method: 'Bank Wire (BDO)', type: 'Monthly Amortization', refNumber: 'WIRE-BDO-48091', receivedBy: 'Janrey Mina', notes: 'Amortization 08/48' },
        { id: 'tx-11', orNumber: 'OR-2026-8102', date: 'Mar 10, 2026', time: '10:30 AM', amount: 108000, method: 'Bank Wire (BDO)', type: 'Monthly Amortization', refNumber: 'WIRE-BDO-10294', receivedBy: 'Marc Santos', notes: 'Amortization 02/48' },
        { id: 'tx-12', orNumber: 'OR-2026-7840', date: 'Feb 10, 2026', time: '11:00 AM', amount: 108000, method: 'Bank Wire (BDO)', type: 'Monthly Amortization', refNumber: 'WIRE-BDO-09921', receivedBy: 'Marc Santos', notes: 'Amortization 01/48' },
        { id: 'tx-13', orNumber: 'OR-2026-7719', date: 'Jan 10, 2026', time: '03:15 PM', amount: 1920000, method: 'Bank Wire (BDO)', type: 'Down Payment', refNumber: 'WIRE-BDO-PVT-01', receivedBy: 'Janrey Mina', notes: '30% Equity Down Payment' },
      ],
    },
    {
      id: 'cust-3',
      accountNumber: 'ACC-DFM-2026-105',
      clientName: 'Engr. Mateo De Leon',
      phone: '+63 920 445 6789',
      email: 'mdeleon@apexconstruction.ph',
      tinOrId: 'TIN: 189-402-331-000',
      billingAddress: 'Ayala Alabang Village, Muntinlupa City',
      vehicleName: '2023 Toyota Hilux GR Sport 4x4',
      vinNumber: 'MR0FZ22G8001923',
      plateNumber: 'NEB-4921',
      contractDate: 'May 04, 2026',
      dealershipBranch: 'BGC Flagship Showroom',
      contractPrice: 1980000,
      downPaymentPaid: 396000,
      totalFinanced: 2268000,
      totalAmountPaid: 520800, // 396k DP + 4 monthly payments of 31,200
      remainingBalance: 1459200,
      monthlyAmortization: 31200,
      termMonths: 60,
      nextDueDate: 'Oct 04, 2026', // Overdue
      status: 'overdue',
      paymentHistory: [
        { id: 'tx-14', orNumber: 'OR-2026-9611', date: 'Sep 04, 2026', time: '09:40 AM', amount: 31200, method: 'Online Transfer', type: 'Monthly Amortization', refNumber: 'INSTA-998821', receivedBy: 'Marc Santos', notes: 'Amortization 04/60' },
        { id: 'tx-15', orNumber: 'OR-2026-9502', date: 'Aug 04, 2026', time: '02:00 PM', amount: 31200, method: 'Online Transfer', type: 'Monthly Amortization', refNumber: 'INSTA-994192', receivedBy: 'Marc Santos', notes: 'Amortization 03/60' },
        { id: 'tx-16', orNumber: 'OR-2026-9388', date: 'Jul 04, 2026', time: '03:10 PM', amount: 31200, method: 'Online Transfer', type: 'Monthly Amortization', refNumber: 'INSTA-992150', receivedBy: 'Marc Santos', notes: 'Amortization 02/60' },
        { id: 'tx-17', orNumber: 'OR-2026-9210', date: 'Jun 04, 2026', time: '04:20 PM', amount: 31200, method: 'Online Transfer', type: 'Monthly Amortization', refNumber: 'INSTA-990142', receivedBy: 'Marc Santos', notes: 'Amortization 01/60' },
        { id: 'tx-18', orNumber: 'OR-2026-9050', date: 'May 04, 2026', time: '01:00 PM', amount: 396000, method: 'Bank Wire (BDO)', type: 'Down Payment', refNumber: 'WIRE-BDO-44102', receivedBy: 'Janrey Mina', notes: '20% Equity Down Payment' },
      ],
    },
    {
      id: 'cust-4',
      accountNumber: 'ACC-DFM-2026-118',
      clientName: 'Dr. Roberto Tan',
      phone: '+63 918 222 3344',
      email: 'dr.tan@asianhospital.com',
      tinOrId: 'TIN: 104-551-892-000',
      billingAddress: 'Corinthian Gardens, Quezon City',
      vehicleName: '2023 BMW M3 Competition xDrive',
      vinNumber: 'WBS33AY08PFP4921',
      plateNumber: 'DOC-888',
      contractDate: 'Feb 18, 2026',
      dealershipBranch: 'Circuit Makati Studio',
      contractPrice: 6950000,
      downPaymentPaid: 3500000,
      totalFinanced: 6950000,
      totalAmountPaid: 6950000,
      remainingBalance: 0,
      monthlyAmortization: 0,
      termMonths: 24,
      nextDueDate: 'Fully Paid & Cleared',
      status: 'paid-in-full',
      paymentHistory: [
        { id: 'tx-19', orNumber: 'OR-2026-9480', date: 'Aug 28, 2026', time: '02:30 PM', amount: 3450000, method: 'Bank Wire (BDO)', type: 'Lump Sum Settlement', refNumber: 'WIRE-BDO-99412', receivedBy: 'Janrey Mina', notes: 'Full Early Payoff & LTO Original OR/CR Title Released' },
        { id: 'tx-20', orNumber: 'OR-2026-7901', date: 'Feb 18, 2026', time: '10:00 AM', amount: 3500000, method: 'Bank Wire (BDO)', type: 'Down Payment', refNumber: 'WIRE-BDO-66210', receivedBy: 'Janrey Mina', notes: 'Initial 50% Equity Wire' },
      ],
    },
  ]);

  // Initial Test Drive Bookings
  const [bookings, setBookings] = useState<TestDriveBooking[]>([
    { id: 'BK-901', clientName: 'Atty. Rafael Mercado', phone: '+63 917 554 8921', vehicleName: '2026 Porsche 718 Cayman GT4 RS', branch: 'Circuit Makati Studio', dateTime: 'Oct 18, 2026 • 10:30 AM', advisor: 'Carlos Mendoza', status: 'pending' },
    { id: 'BK-902', clientName: 'Dr. Maria Santos-Cruz', phone: '+63 918 902 4411', vehicleName: '2024 Ford Everest Titanium+ 4x4', branch: 'BGC Flagship Showroom', dateTime: 'Oct 17, 2026 • 2:00 PM', advisor: 'Janrey Mina', status: 'confirmed' },
    { id: 'BK-903', clientName: 'Eduardo Tan', phone: '+63 920 332 9900', vehicleName: '2023 Toyota Land Cruiser 300 ZX', branch: 'BGC Flagship Showroom', dateTime: 'Oct 19, 2026 • 4:00 PM', advisor: 'Carlos Mendoza', status: 'pending' },
    { id: 'BK-904', clientName: 'Vicente Sy', phone: '+63 917 111 8888', vehicleName: '2023 BMW M3 Competition xDrive', branch: 'Circuit Makati Studio', dateTime: 'Oct 16, 2026 • 11:00 AM', advisor: 'Janrey Mina', status: 'completed' },
  ]);

  // Initial Financing Applications
  const [financingLeads] = useState<FinancingLead[]>([
    { id: 'FN-401', applicantName: 'Enrique Lopez', phone: '+63 917 882 1200', vehicleName: '2024 Ford Everest Titanium+ 4x4', vehiclePrice: 2350000, downPayment: 470000, termMonths: 48, monthlyEstimate: 38500, bankPartner: 'BDO Private Bank', status: 'pre-approved' },
    { id: 'FN-402', applicantName: 'Samantha Nicole Ong', phone: '+63 928 440 9182', vehicleName: '2023 BMW M3 Competition xDrive', vehiclePrice: 6950000, downPayment: 2085000, termMonths: 36, monthlyEstimate: 118200, bankPartner: 'BPI Family Savings', status: 'under-review' },
    { id: 'FN-403', applicantName: 'Capt. Gerald Bautista', phone: '+63 905 667 2234', vehicleName: '2023 Toyota Hilux GR Sport 4x4', vehiclePrice: 1980000, downPayment: 396000, termMonths: 60, monthlyEstimate: 31200, bankPartner: 'Security Bank Auto Loans', status: 'approved' },
  ]);

  // Initial Trade-In Requests
  const [tradeInLeads] = useState<TradeInLead[]>([
    { id: 'TI-201', clientName: 'Alexander Yu', phone: '+63 917 992 0011', clientCar: '2021 Toyota Fortuner LTD 4x4', year: 2021, mileage: '38,000 KM', targetCar: '2023 Toyota Land Cruiser 300 ZX', estimatedValue: 1750000, status: 'appraisal-sent' },
    { id: 'TI-202', clientName: 'Kenneth Co', phone: '+63 918 333 4455', clientCar: '2020 Ford Ranger Raptor 2.0 Bi-Turbo', year: 2020, mileage: '42,500 KM', targetCar: '2024 Ford Everest Titanium+ 4x4', estimatedValue: 1380000, status: 'inspection-pending' },
  ]);

  // Active customer for ledger & payment modal
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isSOAOpen, setIsSOAOpen] = useState(false);

  // New Payment Form
  const [newAmount, setNewAmount] = useState<number>(38500);
  const [newMethod, setNewMethod] = useState<PaymentTransaction['method']>('Bank Wire (BDO)');
  const [newType, setNewType] = useState<PaymentTransaction['type']>('Monthly Amortization');
  const [newRef, setNewRef] = useState('');

  // Global search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // KPI calculations
  const totalFleetValue = useMemo(() => inventory.reduce((acc, c) => acc + (c.priceNumeric || 0), 0), [inventory]);
  const totalContractPortfolio = useMemo(() => customerAccounts.reduce((acc, c) => acc + c.contractPrice, 0), [customerAccounts]);
  const totalCollected = useMemo(() => customerAccounts.reduce((acc, c) => acc + c.totalAmountPaid, 0), [customerAccounts]);
  const totalOutstanding = useMemo(() => customerAccounts.reduce((acc, c) => acc + c.remainingBalance, 0), [customerAccounts]);

  // Filtered customer accounts
  const filteredCustomers = useMemo(() => {
    return customerAccounts.filter(c => 
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
    );
  }, [customerAccounts, searchQuery]);

  // Filtered inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.stockNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.make.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [inventory, searchQuery]);

  // Handle Recording New Payment
  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || newAmount <= 0) return;

    const newTxn: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      orNumber: `OR-2026-${Math.floor(8000 + Math.random() * 1999)}`,
      date: new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date()),
      time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()),
      amount: newAmount,
      method: newMethod,
      type: newType,
      refNumber: newRef || `REF-${Math.floor(100000 + Math.random() * 899999)}`,
      receivedBy: 'Janrey Mina',
      notes: 'Customer payment recorded via admin console',
    };

    setCustomerAccounts(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        const updatedPaid = c.totalAmountPaid + newAmount;
        const updatedBalance = Math.max(0, c.remainingBalance - newAmount);
        const updatedStatus = updatedBalance === 0 ? 'paid-in-full' : 'current';

        const updatedCustomer = {
          ...c,
          totalAmountPaid: updatedPaid,
          remainingBalance: updatedBalance,
          status: updatedStatus as CustomerAccount['status'],
          paymentHistory: [newTxn, ...c.paymentHistory],
        };

        setSelectedCustomer(updatedCustomer);
        return updatedCustomer;
      }
      return c;
    }));

    setIsRecordPaymentOpen(false);
    showToast(`Payment of ₱${newAmount.toLocaleString()} posted! Balance updated.`);
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-slate-200 flex font-sans">
      
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#14141e] border border-emerald-500/50 text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>{toast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden" />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#0c0c14] border-r border-white/5 z-50 
        flex flex-col justify-between p-4 transition-transform duration-200 ease-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* Logo & Close */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-red-600 px-2 py-0.5 text-white font-extrabold text-xs tracking-tight rounded">
                DRIVEFLOW
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                ADMIN CONSOLE
              </span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Clean Navigation Links with All Details */}
          <nav className="space-y-1 text-xs font-medium">
            <button
              onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'overview' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Dealership Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab('accounts'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'accounts' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Customer Balances & Ledger</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'accounts' ? 'bg-black/30 text-white' : 'bg-emerald-500/15 text-emerald-400'
              }`}>
                {customerAccounts.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('inventory'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'inventory' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 shrink-0" />
                <span>Vehicle Fleet</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeTab === 'inventory' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
              }`}>
                {inventory.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('bookings'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'bookings' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Test Drive Bookings</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400">
                {bookings.filter(b => b.status === 'pending').length} new
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('financing'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'financing' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Bank Financing</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                {financingLeads.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('tradeins'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition cursor-pointer ${
                activeTab === 'tradeins' ? 'bg-red-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Repeat className="w-4 h-4 shrink-0" />
                <span>Trade-In Valuations</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
                {tradeInLeads.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white transition rounded-md hover:bg-white/5"
          >
            <span>View Live Showroom</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2.5 px-3 py-1">
            <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs border border-red-500/30">
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
        
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-[#0a0a10]/80 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">DriveFlow Motors Manila</div>
              <h1 className="text-sm sm:text-base font-bold text-white capitalize leading-tight">
                {activeTab === 'overview' && 'Dealership Overview & Operations'}
                {activeTab === 'accounts' && 'Customer Balances & Payment Ledgers'}
                {activeTab === 'inventory' && 'Vehicle Fleet Inventory'}
                {activeTab === 'bookings' && 'VIP Test Drive Appointments'}
                {activeTab === 'financing' && 'Bank Financing & Underwriting'}
                {activeTab === 'tradeins' && 'Trade-In Vehicle Valuations'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (customerAccounts.length > 0) {
                  setSelectedCustomer(customerAccounts[0]);
                  setIsRecordPaymentOpen(true);
                }
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 sm:px-4 py-2 rounded-md transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>

            <Link
              href="/vehicles"
              target="_blank"
              className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs px-3 py-2 rounded-md border border-white/5 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Public Catalog</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl w-full mx-auto">
          
          {/* ================================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 4 Clean Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-4.5">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Showroom Fleet</span>
                  <div className="text-2xl font-black text-white tracking-tight mt-1">
                    ₱{(totalFleetValue / 1000000).toFixed(1)}M
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-1">
                    {inventory.length} total vehicles listed
                  </span>
                </div>

                <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-4.5">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Total Amount Collected</span>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight mt-1">
                    ₱{(totalCollected / 1000000).toFixed(2)}M
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400/80 block mt-1">
                    {((totalCollected / totalContractPortfolio) * 100).toFixed(1)}% portfolio recovered
                  </span>
                </div>

                <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-4.5">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Outstanding Balances Due</span>
                  <div className="text-2xl font-black text-amber-400 tracking-tight mt-1">
                    ₱{(totalOutstanding / 1000000).toFixed(2)}M
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-1">
                    {customerAccounts.filter(c => c.status !== 'paid-in-full').length} active amortizing clients
                  </span>
                </div>

                <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-4.5">
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">Scheduled Test Drives</span>
                  <div className="text-2xl font-black text-white tracking-tight mt-1">
                    {bookings.length} Sessions
                  </div>
                  <span className="text-[11px] font-mono text-amber-400 block mt-1">
                    {bookings.filter(b => b.status === 'pending').length} pending confirmation
                  </span>
                </div>

              </div>

              {/* Customer Accounts Quick Section */}
              <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Customer Balances Snapshot</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Summary of client balances, paid amounts, and next payment schedules.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('accounts')}
                    className="text-xs text-red-400 hover:text-red-300 transition flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <span>Full Ledger ({customerAccounts.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {customerAccounts.map((acc) => (
                    <div 
                      key={acc.id}
                      onClick={() => { setSelectedCustomer(acc); setActiveTab('accounts'); }}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{acc.clientName}</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            acc.status === 'current' ? 'bg-emerald-500/15 text-emerald-400' :
                            acc.status === 'overdue' ? 'bg-red-500/15 text-red-400 animate-pulse' :
                            'bg-blue-500/15 text-blue-400'
                          }`}>
                            {acc.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">
                          {acc.vehicleName} • Plate {acc.plateNumber}
                        </p>
                      </div>

                      <div className="flex items-center gap-5 text-xs font-mono">
                        <div className="text-left sm:text-right">
                          <span className="text-slate-500 block text-[10px]">TOTAL PAID</span>
                          <span className="font-bold text-emerald-400">₱{acc.totalAmountPaid.toLocaleString()}</span>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-slate-500 block text-[10px]">REMAINING BALANCE</span>
                          <span className="font-bold text-white">₱{acc.remainingBalance.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showroom Appointments Quick Section */}
              <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>Upcoming Showroom Test Drives</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-red-400 hover:text-red-300 transition font-mono cursor-pointer"
                  >
                    View All ({bookings.length})
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {bookings.slice(0, 3).map((b) => (
                    <div key={b.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-white block">{b.clientName} ({b.phone})</span>
                        <span className="text-xs text-slate-400">{b.vehicleName}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        {b.dateTime} • {b.branch}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: CUSTOMER BALANCES & PAYMENT LEDGER */}
          {/* ================================================================= */}
          {activeTab === 'accounts' && (
            <div className="space-y-5">
              
              {/* Search & Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer name, vehicle, plate, or account #..."
                    className="w-full bg-[#0f0f18] border border-white/10 text-xs text-white pl-9 pr-4 py-2.5 rounded-lg outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (customerAccounts.length > 0) {
                        setSelectedCustomer(customerAccounts[0]);
                        setIsRecordPaymentOpen(true);
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-md transition flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Payment</span>
                  </button>
                </div>
              </div>

              {/* Complete Customer Accounts Table */}
              <div className="bg-[#0f0f18] border border-white/5 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141420] text-[10px] font-mono text-slate-400 uppercase border-b border-white/5">
                      <tr>
                        <th className="px-4 py-3.5">Customer & Account</th>
                        <th className="px-4 py-3.5">Assigned Vehicle</th>
                        <th className="px-4 py-3.5 font-mono">Contract Value</th>
                        <th className="px-4 py-3.5 font-mono">Paid to Date</th>
                        <th className="px-4 py-3.5 font-mono">Remaining Balance</th>
                        <th className="px-4 py-3.5">Next Due</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Ledger</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-slate-500 font-mono text-xs">
                            No customer accounts matching your query.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((acc) => {
                          const percent = Math.round((acc.totalAmountPaid / (acc.contractPrice || 1)) * 100);

                          return (
                            <tr key={acc.id} className="hover:bg-white/[0.02] transition">
                              
                              {/* Customer */}
                              <td className="px-4 py-3.5">
                                <span className="font-bold text-white block text-sm">{acc.clientName}</span>
                                <span className="text-[11px] font-mono text-slate-400">{acc.accountNumber} • {acc.phone}</span>
                              </td>

                              {/* Vehicle */}
                              <td className="px-4 py-3.5">
                                <span className="text-slate-200 block font-medium truncate max-w-[210px]">{acc.vehicleName}</span>
                                <span className="text-[11px] font-mono text-slate-400">Plate: <strong className="text-white">{acc.plateNumber}</strong></span>
                              </td>

                              {/* Contract Price */}
                              <td className="px-4 py-3.5 font-mono">
                                <span className="font-bold text-white">₱{acc.contractPrice.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-500 block">DP: ₱{acc.downPaymentPaid.toLocaleString()}</span>
                              </td>

                              {/* Paid to Date */}
                              <td className="px-4 py-3.5 font-mono">
                                <span className="font-bold text-emerald-400">₱{acc.totalAmountPaid.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-500 block">{percent}% settled</span>
                              </td>

                              {/* Remaining Balance */}
                              <td className="px-4 py-3.5 font-mono">
                                <span className={`font-bold ${acc.remainingBalance === 0 ? 'text-slate-500' : 'text-amber-400'}`}>
                                  ₱{acc.remainingBalance.toLocaleString()}
                                </span>
                                {acc.monthlyAmortization > 0 && (
                                  <span className="text-[10px] text-slate-500 block">₱{acc.monthlyAmortization.toLocaleString()}/mo</span>
                                )}
                              </td>

                              {/* Next Due */}
                              <td className="px-4 py-3.5 font-mono text-[11px]">
                                <span className={acc.status === 'overdue' ? 'text-red-400 font-bold' : 'text-slate-300'}>
                                  {acc.nextDueDate}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="px-4 py-3.5">
                                <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                                  acc.status === 'current' ? 'bg-emerald-500/15 text-emerald-400' :
                                  acc.status === 'overdue' ? 'bg-red-500/15 text-red-400 animate-pulse' :
                                  'bg-blue-500/15 text-blue-400'
                                }`}>
                                  {acc.status}
                                </span>
                              </td>

                              {/* Open Ledger Button */}
                              <td className="px-4 py-3.5 text-right">
                                <button
                                  onClick={() => setSelectedCustomer(acc)}
                                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-3 py-1.5 rounded text-xs font-semibold transition border border-white/5 cursor-pointer"
                                >
                                  View History
                                </button>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#141420] border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DriveFlow Client Accounts Engine</span>
                  <span>{customerAccounts.length} Active Records</span>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: VEHICLE FLEET INVENTORY */}
          {/* ================================================================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              
              {/* Search Bar */}
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fleet by car name, make, model, stock #..."
                    className="w-full bg-[#0f0f18] border border-white/10 text-xs text-white pl-9 pr-4 py-2.5 rounded-lg outline-none focus:border-red-500"
                  />
                </div>
                <span className="text-xs font-mono text-slate-400">{filteredInventory.length} vehicles</span>
              </div>

              {/* Inventory Table */}
              <div className="bg-[#0f0f18] border border-white/5 rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#141420] text-[10px] font-mono text-slate-400 uppercase border-b border-white/5">
                      <tr>
                        <th className="px-4 py-3">Vehicle Details</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3 font-mono">Engine & Specs</th>
                        <th className="px-4 py-3 font-mono">Cash Price</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filteredInventory.map((car) => (
                        <tr key={car.id} className="hover:bg-white/[0.02]">
                          
                          <td className="px-4 py-3 flex items-center gap-3">
                            <img src={car.images[0]} alt={car.name} className="w-14 h-10 object-cover rounded bg-slate-900 shrink-0" />
                            <div>
                              <span className="text-[10px] font-mono text-slate-500 uppercase">{car.stockNumber}</span>
                              <span className="font-bold text-white block truncate max-w-[220px]">{car.name}</span>
                              <span className="text-[10px] font-mono text-slate-400">{car.year} • {car.color}</span>
                            </div>
                          </td>

                          <td className="px-4 py-3 text-slate-300">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/5 border border-white/10">
                              {car.categoryLabel}
                            </span>
                          </td>

                          <td className="px-4 py-3 font-mono text-[11px] text-slate-400">
                            <div>{car.engine}</div>
                            <div className="text-slate-500">{car.mileage} • Plate {car.plateEnding.split(' ')[0]}</div>
                          </td>

                          <td className="px-4 py-3 font-mono">
                            <span className="font-bold text-white text-sm">{car.price}</span>
                            <span className="text-[10px] text-slate-500 block">{car.monthly}</span>
                          </td>

                          <td className="px-4 py-3">
                            <select
                              value={car.status}
                              onChange={(e: any) => {
                                const s = e.target.value;
                                setInventory(prev => prev.map(c => c.id === car.id ? { ...c, status: s } : c));
                                showToast(`Vehicle status updated to ${s.toUpperCase()}`);
                              }}
                              className="bg-[#141420] text-[11px] font-mono text-slate-300 border border-white/10 rounded px-2.5 py-1 outline-none cursor-pointer"
                            >
                              <option value="in-stock">In Stock</option>
                              <option value="reserved">Reserved</option>
                              <option value="sold">Sold</option>
                            </select>
                          </td>

                          <td className="px-4 py-3 text-right">
                            <Link 
                              href={`/vehicles/${car.id}`} 
                              target="_blank" 
                              className="inline-flex items-center gap-1 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded transition text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </Link>
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
          {/* TAB 4: TEST DRIVES */}
          {/* ================================================================= */}
          {activeTab === 'bookings' && (
            <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">VIP Private Viewing & Test Drive Appointments</h2>
                  <p className="text-xs text-slate-400">Scheduled client test drive sessions across BGC and Makati showrooms.</p>
                </div>
                <span className="text-xs font-mono text-slate-400">{bookings.length} Total Bookings</span>
              </div>

              <div className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <div key={b.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{b.clientName}</span>
                        <span className="text-[11px] font-mono text-slate-400">({b.phone})</span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          b.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' :
                          b.status === 'pending' ? 'bg-amber-500/15 text-amber-400' :
                          'bg-blue-500/15 text-blue-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 mt-1 font-medium">{b.vehicleName}</p>
                      <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                        {b.dateTime} • {b.branch} • Advisor: {b.advisor}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      {b.status === 'pending' && (
                        <button
                          onClick={() => {
                            setBookings(prev => prev.map(item => item.id === b.id ? { ...item, status: 'confirmed' } : item));
                            showToast('Test drive booking confirmed!');
                          }}
                          className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded transition cursor-pointer"
                        >
                          Confirm
                        </button>
                      )}
                      <a 
                        href={`tel:${b.phone}`}
                        className="bg-white/5 hover:bg-white/10 text-slate-300 text-xs px-3 py-1.5 rounded transition border border-white/5"
                      >
                        Call Client
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: BANK FINANCING */}
          {/* ================================================================= */}
          {activeTab === 'financing' && (
            <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-5 space-y-4">
              <div>
                <h2 className="text-sm font-bold text-white">Bank Financing Applications</h2>
                <p className="text-xs text-slate-400">Client auto loan applications through BDO, BPI, and Security Bank.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#141420] text-[10px] font-mono text-slate-400 uppercase border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3">Applicant & Ref</th>
                      <th className="px-4 py-3">Vehicle Requested</th>
                      <th className="px-4 py-3 font-mono">Down Payment</th>
                      <th className="px-4 py-3 font-mono">Monthly Rate</th>
                      <th className="px-4 py-3">Bank Partner</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {financingLeads.map((fn) => (
                      <tr key={fn.id} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-white block">{fn.applicantName}</span>
                          <span className="text-[11px] font-mono text-slate-400">{fn.id} • {fn.phone}</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          {fn.vehicleName}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-300">
                          ₱{fn.downPayment.toLocaleString()}
                        </td>
                        <td className="px-4 py-3.5 font-mono">
                          <span className="font-bold text-white">₱{fn.monthlyEstimate.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-500 block">({fn.termMonths} mos)</span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-300">
                          {fn.bankPartner}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                            fn.status === 'approved' ? 'bg-emerald-500/15 text-emerald-400' :
                            fn.status === 'pre-approved' ? 'bg-blue-500/15 text-blue-400' :
                            'bg-amber-500/15 text-amber-400'
                          }`}>
                            {fn.status.replace('-', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: TRADE-IN VALUATIONS */}
          {/* ================================================================= */}
          {activeTab === 'tradeins' && (
            <div className="bg-[#0f0f18] border border-white/5 rounded-xl p-5 space-y-4">
              <div>
                <h2 className="text-sm font-bold text-white">Trade-In Vehicle Valuations</h2>
                <p className="text-xs text-slate-400">Client trade-in appraisals against certified DriveFlow inventory.</p>
              </div>

              <div className="divide-y divide-white/5">
                {tradeInLeads.map((ti) => (
                  <div key={ti.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-white block">{ti.clientName} ({ti.phone})</span>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Trade Unit: <strong className="text-white">{ti.clientCar}</strong> ({ti.year} • {ti.mileage})
                      </p>
                      <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                        Targeting: <span className="text-red-400">{ti.targetCar}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left sm:text-right font-mono">
                        <span className="text-[10px] text-slate-500 uppercase block">Appraised Valuation</span>
                        <span className="text-sm font-bold text-white">₱{ti.estimatedValue.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => showToast(`Appraisal report sent to ${ti.clientName}`)}
                        className="bg-white/5 hover:bg-white/10 text-white text-xs px-3 py-1.5 rounded transition border border-white/5 cursor-pointer"
                      >
                        Send Offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: CUSTOMER PAYMENT HISTORY & LEDGER DOSSIER */}
      {/* ========================================================================= */}
      {selectedCustomer && !isSOAOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#101018] border border-white/10 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">{selectedCustomer.clientName}</h2>
                  <span className="text-xs font-mono text-red-400">({selectedCustomer.accountNumber})</span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedCustomer.vehicleName} • Plate: <strong className="text-white">{selectedCustomer.plateNumber}</strong>
                </p>
                <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                  {selectedCustomer.phone} • {selectedCustomer.email} • {selectedCustomer.billingAddress}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSOAOpen(true)}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs px-3 py-1.5 rounded-md transition flex items-center gap-1.5 border border-white/5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Statement of Account</span>
                </button>
                <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Financial Overview 3-Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#141420] rounded-lg text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-bold">Total Contract Price</span>
                <span className="text-base font-black text-white block mt-0.5">₱{selectedCustomer.contractPrice.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500">DP Paid: ₱{selectedCustomer.downPaymentPaid.toLocaleString()}</span>
              </div>

              <div>
                <span className="text-[10px] text-emerald-400 uppercase block font-bold">Total Amount Paid</span>
                <span className="text-base font-black text-emerald-400 block mt-0.5">₱{selectedCustomer.totalAmountPaid.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-400/80">
                  {Math.round((selectedCustomer.totalAmountPaid / selectedCustomer.contractPrice) * 100)}% of Contract Paid
                </span>
              </div>

              <div>
                <span className="text-[10px] text-amber-400 uppercase block font-bold">Remaining Balance</span>
                <span className="text-base font-black text-amber-400 block mt-0.5">₱{selectedCustomer.remainingBalance.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500">Monthly: ₱{selectedCustomer.monthlyAmortization.toLocaleString()}</span>
              </div>
            </div>

            {/* Itemized Payment History Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Receipt className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Payment History & Official Receipts</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">Every payment made by this client is logged and tracked below.</span>
                </div>

                <button
                  onClick={() => {
                    setNewAmount(selectedCustomer.monthlyAmortization || 38500);
                    setIsRecordPaymentOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Payment</span>
                </button>
              </div>

              <div className="border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#141420] text-[10px] text-slate-400 uppercase border-b border-white/5">
                    <tr>
                      <th className="px-3.5 py-2.5">Date & Time</th>
                      <th className="px-3.5 py-2.5">OR Number</th>
                      <th className="px-3.5 py-2.5">Amount Paid</th>
                      <th className="px-3.5 py-2.5">Method & Type</th>
                      <th className="px-3.5 py-2.5">Reference #</th>
                      <th className="px-3.5 py-2.5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedCustomer.paymentHistory.map((txn) => (
                      <tr key={txn.id} className="hover:bg-white/[0.02]">
                        <td className="px-3.5 py-2.5 text-slate-300">
                          <div>{txn.date}</div>
                          <div className="text-[10px] text-slate-500">{txn.time}</div>
                        </td>
                        <td className="px-3.5 py-2.5 text-red-400 font-bold">
                          {txn.orNumber}
                        </td>
                        <td className="px-3.5 py-2.5 font-bold text-emerald-400 text-sm">
                          ₱{txn.amount.toLocaleString()}
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-300 text-[11px]">
                          <div>{txn.type}</div>
                          <div className="text-slate-500 text-[10px]">{txn.method}</div>
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-400 text-[11px]">
                          {txn.refNumber}
                        </td>
                        <td className="px-3.5 py-2.5 text-right">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                            Posted
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: POST / RECORD PAYMENT */}
      {/* ========================================================================= */}
      {isRecordPaymentOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101018] border border-emerald-500/40 rounded-xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
              <div>
                <h3 className="text-sm font-bold text-white">Record Customer Payment</h3>
                <span className="text-xs font-mono text-slate-400">{selectedCustomer.clientName}</span>
              </div>
              <button onClick={() => setIsRecordPaymentOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3.5 text-xs">
              <div className="p-3 bg-[#141420] rounded border border-white/5 flex items-center justify-between font-mono">
                <span className="text-slate-400">Current Balance:</span>
                <span className="text-amber-400 font-bold">₱{selectedCustomer.remainingBalance.toLocaleString()}</span>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Amount to Post (PHP)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newAmount}
                  onChange={(e) => setNewAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#141420] border border-white/10 p-2.5 rounded text-white font-mono font-bold text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Payment Method</label>
                <select
                  value={newMethod}
                  onChange={(e: any) => setNewMethod(e.target.value)}
                  className="w-full bg-[#141420] border border-white/10 p-2 rounded text-white outline-none cursor-pointer"
                >
                  <option value="Bank Wire (BDO)">Bank Wire (BDO)</option>
                  <option value="Post-Dated Check (BPI)">Post-Dated Check (BPI)</option>
                  <option value="Online Transfer">Online Transfer</option>
                  <option value="Showroom Cashier">Showroom Cashier</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Payment Classification</label>
                <select
                  value={newType}
                  onChange={(e: any) => setNewType(e.target.value)}
                  className="w-full bg-[#141420] border border-white/10 p-2 rounded text-white outline-none cursor-pointer"
                >
                  <option value="Monthly Amortization">Monthly Amortization</option>
                  <option value="Principal Prepayment">Principal Prepayment</option>
                  <option value="Lump Sum Settlement">Lump Sum Settlement</option>
                  <option value="Down Payment">Down Payment</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Bank Reference / Check #</label>
                <input
                  type="text"
                  placeholder="e.g. CHK-BPI-004425 or WIRE-BDO-8921"
                  value={newRef}
                  onChange={(e) => setNewRef(e.target.value)}
                  className="w-full bg-[#141420] border border-white/10 p-2 rounded text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecordPaymentOpen(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded transition cursor-pointer"
                >
                  Post Payment & Update Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRINTABLE STATEMENT OF ACCOUNT */}
      {/* ========================================================================= */}
      {isSOAOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0e0e15] text-slate-200 border border-white/10 rounded-xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs font-mono text-slate-400">STATEMENT OF ACCOUNT</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button onClick={() => setIsSOAOpen(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between">
                <div>
                  <strong className="text-white text-sm block">DRIVEFLOW MOTORS MANILA</strong>
                  <span className="text-slate-400 text-[11px]">BGC & Makati Showrooms • (02) 8877-CARS</span>
                </div>
                <div className="text-right text-slate-400 text-[11px]">
                  <span>Account Ref: {selectedCustomer.accountNumber}</span>
                  <span className="block">Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="p-3 bg-[#141420] rounded space-y-1">
                <div className="text-white font-bold">{selectedCustomer.clientName}</div>
                <div className="text-slate-400">{selectedCustomer.vehicleName} (Plate: {selectedCustomer.plateNumber})</div>
                <div className="text-[11px] text-slate-500">{selectedCustomer.billingAddress}</div>
              </div>

              <div className="space-y-1.5 border-t border-b border-white/5 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Contract Agreed Price:</span>
                  <span className="text-white font-bold">₱{selectedCustomer.contractPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Down Payment Paid:</span>
                  <span className="text-emerald-400 font-bold">- ₱{selectedCustomer.downPaymentPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Remitted to Date:</span>
                  <span className="text-emerald-400 font-bold">- ₱{selectedCustomer.totalAmountPaid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/5 text-sm font-bold">
                  <span className="text-white">REMAINING OUTSTANDING BALANCE:</span>
                  <span className="text-amber-400">₱{selectedCustomer.remainingBalance.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block mb-1.5 font-bold">Payment History Receipts</span>
                <div className="space-y-1 text-[11px]">
                  {selectedCustomer.paymentHistory.map(t => (
                    <div key={t.id} className="flex justify-between text-slate-300">
                      <span>{t.date} • {t.orNumber} ({t.type})</span>
                      <span className="text-emerald-400 font-bold">₱{t.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
