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
  Menu,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Check,
  FileText,
  Printer,
  Receipt,
  ArrowDownRight,
  Filter,
  Download,
  AlertTriangle,
  BadgeCheck
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

// =========================================================================
// CUSTOMER BILLING & PAYMENT LEDGER TYPES
// =========================================================================
export interface PaymentTransaction {
  id: string;
  orNumber: string;
  date: string;
  time: string;
  amount: number;
  paymentMethod: 'Bank Wire (BDO)' | 'Post-Dated Check (BPI)' | 'Online Transfer' | 'Showroom Cashier' | 'Direct Debit';
  type: 'Down Payment' | 'Monthly Amortization' | 'Principal Prepayment' | 'Lump Sum Settlement';
  referenceNo: string;
  status: 'Verified & Posted' | 'Pending Clearance';
  receivedBy: string;
  notes?: string;
}

export interface CustomerAccount {
  id: string;
  accountNumber: string;
  clientName: string;
  phone: string;
  email: string;
  tinOrId: string;
  billingAddress: string;
  
  // Vehicle & Purchase details
  vehicleId: string;
  vehicleName: string;
  vinNumber: string;
  plateNumber: string;
  contractDate: string;
  dealershipBranch: string;
  
  // Financial metrics
  contractPrice: number;
  downPaymentPaid: number;
  totalFinancedWithInterest: number;
  totalAmountPaid: number;
  remainingBalance: number;
  monthlyAmortization: number;
  termMonths: number;
  nextDueDate: string;
  status: 'current' | 'grace-period' | 'overdue' | 'paid-in-full';
  
  // Itemized transaction ledger
  ledger: PaymentTransaction[];
}

export default function AdminDashboardPage() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'accounts' | 'bookings' | 'financing' | 'tradeins' | 'settings'>('overview');
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
  const [financingApps] = useState<FinancingApplication[]>([
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
  const [tradeIns] = useState<TradeInItem[]>([
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

  // =========================================================================
  // CUSTOMER BILLING & PAYMENT LEDGER STATE
  // =========================================================================
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>([
    {
      id: 'CUST-001',
      accountNumber: 'ACC-DFM-2026-081',
      clientName: 'Gov. Ferdinand Romualdez',
      phone: '+63 917 554 1234',
      email: 'f.romualdez@gov.ph',
      tinOrId: 'TIN: 241-890-123-000',
      billingAddress: 'Forbes Park, Makati City, Metro Manila',
      vehicleId: 'everest-2024',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      vinNumber: 'MNB24EVR8849012',
      plateNumber: 'NGB-8818',
      contractDate: 'March 15, 2026',
      dealershipBranch: 'BGC Flagship Showroom',
      contractPrice: 2350000,
      downPaymentPaid: 470000,
      totalFinancedWithInterest: 2580000,
      totalAmountPaid: 739500, // 470,000 DP + (38,500 * 7 mos)
      remainingBalance: 1840500,
      monthlyAmortization: 38500,
      termMonths: 36,
      nextDueDate: 'Nov 15, 2026',
      status: 'current',
      ledger: [
        {
          id: 'TXN-101',
          orNumber: 'OR-2026-8801',
          date: 'March 15, 2026',
          time: '11:30 AM',
          amount: 470000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Down Payment',
          referenceNo: 'WIRE-BDO-992100',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: '20% Down Payment settlement upon vehicle release',
        },
        {
          id: 'TXN-102',
          orNumber: 'OR-2026-8912',
          date: 'April 15, 2026',
          time: '09:15 AM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004419',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 01/36',
        },
        {
          id: 'TXN-103',
          orNumber: 'OR-2026-9044',
          date: 'May 15, 2026',
          time: '10:00 AM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004420',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 02/36',
        },
        {
          id: 'TXN-104',
          orNumber: 'OR-2026-9155',
          date: 'June 15, 2026',
          time: '02:45 PM',
          amount: 38500,
          paymentMethod: 'Online Transfer',
          type: 'Monthly Amortization',
          referenceNo: 'INSTA-8829104',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: 'Amortization 03/36',
        },
        {
          id: 'TXN-105',
          orNumber: 'OR-2026-9289',
          date: 'July 15, 2026',
          time: '11:20 AM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004421',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 04/36',
        },
        {
          id: 'TXN-106',
          orNumber: 'OR-2026-9401',
          date: 'August 15, 2026',
          time: '04:10 PM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004422',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 05/36',
        },
        {
          id: 'TXN-107',
          orNumber: 'OR-2026-9533',
          date: 'September 15, 2026',
          time: '01:30 PM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004423',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 06/36',
        },
        {
          id: 'TXN-108',
          orNumber: 'OR-2026-9680',
          date: 'October 15, 2026',
          time: '10:15 AM',
          amount: 38500,
          paymentMethod: 'Post-Dated Check (BPI)',
          type: 'Monthly Amortization',
          referenceNo: 'CHK-BPI-004424',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 07/36',
        },
      ],
    },
    {
      id: 'CUST-002',
      accountNumber: 'ACC-DFM-2026-094',
      clientName: 'Atty. Patricia Beatrice Lim',
      phone: '+63 917 888 7711',
      email: 'pblim@limpartners.ph',
      tinOrId: 'TIN: 312-990-445-000',
      billingAddress: 'Dasmariñas Village, Makati City, Metro Manila',
      vehicleId: 'porsche-gt4rs',
      vehicleName: '2026 Porsche 718 Cayman GT4 RS',
      vinNumber: 'WP0AF2A82PS29910',
      plateNumber: 'PBL-718',
      contractDate: 'January 10, 2026',
      dealershipBranch: 'Circuit Makati Studio',
      contractPrice: 6400000,
      downPaymentPaid: 1920000,
      totalFinancedWithInterest: 7100000,
      totalAmountPaid: 2892000, // 1,920,000 DP + (108,000 * 9 mos)
      remainingBalance: 4208000,
      monthlyAmortization: 108000,
      termMonths: 48,
      nextDueDate: 'Nov 10, 2026',
      status: 'current',
      ledger: [
        {
          id: 'TXN-201',
          orNumber: 'OR-2026-7719',
          date: 'January 10, 2026',
          time: '03:15 PM',
          amount: 1920000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Down Payment',
          referenceNo: 'WIRE-BDO-PRIVATE-01',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: '30% Equity Down Payment settlement',
        },
        {
          id: 'TXN-202',
          orNumber: 'OR-2026-7840',
          date: 'February 10, 2026',
          time: '11:00 AM',
          amount: 108000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Monthly Amortization',
          referenceNo: 'WIRE-BDO-09921',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 01/48',
        },
        {
          id: 'TXN-203',
          orNumber: 'OR-2026-8102',
          date: 'March 10, 2026',
          time: '10:30 AM',
          amount: 108000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Monthly Amortization',
          referenceNo: 'WIRE-BDO-10294',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 02/48',
        },
        {
          id: 'TXN-204',
          orNumber: 'OR-2026-9705',
          date: 'October 10, 2026',
          time: '02:00 PM',
          amount: 108000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Monthly Amortization',
          referenceNo: 'WIRE-BDO-49102',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: 'Amortization 09/48',
        },
      ],
    },
    {
      id: 'CUST-003',
      accountNumber: 'ACC-DFM-2026-105',
      clientName: 'Engr. Mateo De Leon',
      phone: '+63 920 445 6789',
      email: 'mdeleon@apexconstruction.ph',
      tinOrId: 'TIN: 189-402-331-000',
      billingAddress: 'Ayala Alabang Village, Muntinlupa City',
      vehicleId: 'hilux-grs',
      vehicleName: '2023 Toyota Hilux GR Sport 4x4',
      vinNumber: 'MR0FZ22G8001923',
      plateNumber: 'NEB-4921',
      contractDate: 'May 04, 2026',
      dealershipBranch: 'BGC Flagship Showroom',
      contractPrice: 1980000,
      downPaymentPaid: 396000,
      totalFinancedWithInterest: 2268000,
      totalAmountPaid: 520800, // 396k DP + 4 payments of 31,200
      remainingBalance: 1747200,
      monthlyAmortization: 31200,
      termMonths: 60,
      nextDueDate: 'Oct 04, 2026', // Overdue by 12 days
      status: 'overdue',
      ledger: [
        {
          id: 'TXN-301',
          orNumber: 'OR-2026-9050',
          date: 'May 04, 2026',
          time: '01:00 PM',
          amount: 396000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Down Payment',
          referenceNo: 'WIRE-BDO-44102',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: '20% Down Payment',
        },
        {
          id: 'TXN-302',
          orNumber: 'OR-2026-9210',
          date: 'June 04, 2026',
          time: '04:20 PM',
          amount: 31200,
          paymentMethod: 'Online Transfer',
          type: 'Monthly Amortization',
          referenceNo: 'INSTA-990142',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 01/60',
        },
        {
          id: 'TXN-303',
          orNumber: 'OR-2026-9388',
          date: 'July 04, 2026',
          time: '03:10 PM',
          amount: 31200,
          paymentMethod: 'Online Transfer',
          type: 'Monthly Amortization',
          referenceNo: 'INSTA-992150',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 02/60',
        },
        {
          id: 'TXN-304',
          orNumber: 'OR-2026-9502',
          date: 'August 04, 2026',
          time: '02:00 PM',
          amount: 31200,
          paymentMethod: 'Online Transfer',
          type: 'Monthly Amortization',
          referenceNo: 'INSTA-994192',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 03/60',
        },
        {
          id: 'TXN-305',
          orNumber: 'OR-2026-9611',
          date: 'September 04, 2026',
          time: '09:40 AM',
          amount: 31200,
          paymentMethod: 'Online Transfer',
          type: 'Monthly Amortization',
          referenceNo: 'INSTA-998821',
          status: 'Verified & Posted',
          receivedBy: 'Marc Santos',
          notes: 'Amortization 04/60',
        },
      ],
    },
    {
      id: 'CUST-004',
      accountNumber: 'ACC-DFM-2026-118',
      clientName: 'Dr. Roberto Tan',
      phone: '+63 918 222 3344',
      email: 'dr.tan@asianhospital.com',
      tinOrId: 'TIN: 104-551-892-000',
      billingAddress: 'Corinthian Gardens, Quezon City',
      vehicleId: 'bmw-m3-2023',
      vehicleName: '2023 BMW M3 Competition xDrive',
      vinNumber: 'WBS33AY08PFP4921',
      plateNumber: 'DOC-888',
      contractDate: 'Feb 18, 2026',
      dealershipBranch: 'Circuit Makati Studio',
      contractPrice: 6950000,
      downPaymentPaid: 3500000,
      totalFinancedWithInterest: 6950000,
      totalAmountPaid: 6950000, // Fully Paid!
      remainingBalance: 0,
      monthlyAmortization: 0,
      termMonths: 24,
      nextDueDate: 'Settled & Closed',
      status: 'paid-in-full',
      ledger: [
        {
          id: 'TXN-401',
          orNumber: 'OR-2026-7901',
          date: 'February 18, 2026',
          time: '10:00 AM',
          amount: 3500000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Down Payment',
          referenceNo: 'WIRE-BDO-66210',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: 'Initial 50% Equity Wire',
        },
        {
          id: 'TXN-402',
          orNumber: 'OR-2026-9480',
          date: 'August 28, 2026',
          time: '02:30 PM',
          amount: 3450000,
          paymentMethod: 'Bank Wire (BDO)',
          type: 'Lump Sum Settlement',
          referenceNo: 'WIRE-BDO-99412',
          status: 'Verified & Posted',
          receivedBy: 'Janrey Mina',
          notes: 'Full Early Payoff & LTO Original OR/CR Title Released to Owner',
        },
      ],
    },
  ]);

  // Selected customer for Ledger & Dossier Modal
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);

  // Record Payment Modal State
  const [isPostPaymentModalOpen, setIsPostPaymentModalOpen] = useState(false);
  const [isSOAModalOpen, setIsSOAModalOpen] = useState(false);

  // New Payment Form
  const [paymentForm, setPaymentForm] = useState({
    amount: 38500,
    paymentMethod: 'Bank Wire (BDO)' as PaymentTransaction['paymentMethod'],
    type: 'Monthly Amortization' as PaymentTransaction['type'],
    orNumber: `OR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
    notes: 'Regular monthly amortization payment',
  });

  // Filter & Search states for inventory
  const [inventorySearch, setInventorySearch] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'in-stock' | 'reserved' | 'sold'>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'all' | 'suv' | 'sedan' | 'truck' | 'premium'>('all');

  // Customer Ledger Search & Filter
  const [accountSearch, setAccountSearch] = useState('');
  const [accountStatusFilter, setAccountStatusFilter] = useState<'all' | 'current' | 'overdue' | 'paid-in-full'>('all');

  // Modal states for vehicle CRUD
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
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Customer Accounts
  const filteredAccounts = useMemo(() => {
    return customerAccounts.filter((acc) => {
      const matchesSearch = 
        acc.clientName.toLowerCase().includes(accountSearch.toLowerCase()) ||
        acc.accountNumber.toLowerCase().includes(accountSearch.toLowerCase()) ||
        acc.vehicleName.toLowerCase().includes(accountSearch.toLowerCase()) ||
        acc.plateNumber.toLowerCase().includes(accountSearch.toLowerCase()) ||
        acc.phone.includes(accountSearch);

      const matchesStatus = accountStatusFilter === 'all' || acc.status === accountStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customerAccounts, accountSearch, accountStatusFilter]);

  // Aggregate Customer Ledger KPI metrics
  const ledgerMetrics = useMemo(() => {
    const totalContractValue = customerAccounts.reduce((acc, c) => acc + c.contractPrice, 0);
    const totalCollected = customerAccounts.reduce((acc, c) => acc + c.totalAmountPaid, 0);
    const totalOutstanding = customerAccounts.reduce((acc, c) => acc + c.remainingBalance, 0);
    const overdueCount = customerAccounts.filter(c => c.status === 'overdue').length;
    return {
      totalContractValue,
      totalCollected,
      totalOutstanding,
      overdueCount,
    };
  }, [customerAccounts]);

  // Handle Recording New Payment
  const handlePostPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    const amountNum = Number(paymentForm.amount);
    if (!amountNum || amountNum <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    const todayStr = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date());
    const timeStr = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date());

    const newTransaction: PaymentTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      orNumber: paymentForm.orNumber,
      date: todayStr,
      time: timeStr,
      amount: amountNum,
      paymentMethod: paymentForm.paymentMethod,
      type: paymentForm.type,
      referenceNo: paymentForm.referenceNo,
      status: 'Verified & Posted',
      receivedBy: 'Janrey Mina',
      notes: paymentForm.notes,
    };

    setCustomerAccounts(prev => prev.map(cust => {
      if (cust.id === selectedCustomer.id) {
        const newPaid = cust.totalAmountPaid + amountNum;
        const newBalance = Math.max(0, cust.remainingBalance - amountNum);
        const updatedStatus = newBalance === 0 ? 'paid-in-full' : 'current';
        
        const updatedCustomer = {
          ...cust,
          totalAmountPaid: newPaid,
          remainingBalance: newBalance,
          status: updatedStatus as CustomerAccount['status'],
          ledger: [newTransaction, ...cust.ledger],
        };

        // Also update the selected customer modal state
        setSelectedCustomer(updatedCustomer);
        return updatedCustomer;
      }
      return cust;
    }));

    setIsPostPaymentModalOpen(false);
    showToast(`Payment of ₱${amountNum.toLocaleString()} posted under ${paymentForm.orNumber}! Balance updated.`);
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

            {/* NEW: Customer Accounts & Payment Ledger */}
            <button
              onClick={() => { setActiveTab('accounts'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-semibold transition text-left cursor-pointer ${
                activeTab === 'accounts'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span>Customer Ledger & Balance</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {customerAccounts.length}
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
                <span className="text-white capitalize">{activeTab === 'accounts' ? 'Customer Accounts & Ledger' : activeTab}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white capitalize leading-tight">
                {activeTab === 'overview' && 'Dealership Command Center'}
                {activeTab === 'inventory' && 'Vehicle Fleet Management'}
                {activeTab === 'accounts' && 'Client Balances & Payment History Ledgers'}
                {activeTab === 'bookings' && 'VIP Test Drive Appointments'}
                {activeTab === 'financing' && 'Auto Loan & Financing Applications'}
                {activeTab === 'tradeins' && 'Trade-In Vehicle Valuations'}
                {activeTab === 'settings' && 'Dealership Operating Settings'}
              </h1>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {activeTab === 'accounts' ? (
              <button
                onClick={() => {
                  if (customerAccounts.length > 0) {
                    setSelectedCustomer(customerAccounts[0]);
                    setIsPostPaymentModalOpen(true);
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 sm:px-4 py-2 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Record Payment</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3 sm:px-4 py-2 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Vehicle</span>
              </button>
            )}

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
                    <span className="text-[10px] font-mono uppercase tracking-wider">CUSTOMER RECEIVABLES</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    ₱{(ledgerMetrics.totalOutstanding / 1000000).toFixed(2)}M
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-300 flex items-center gap-1">
                    <span className="text-emerald-400 font-bold">₱{(ledgerMetrics.totalCollected / 1000000).toFixed(1)}M</span>
                    <span>collected to date</span>
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

              {/* Middle Section: Customer Balances Snapshot & Test Drive Queue */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 cols: Customer Ledger Quick View */}
                <div className="lg:col-span-7 bg-[#101017] border border-white/10 rounded p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <span>Live Customer Accounts & Balances</span>
                    </h2>
                    <button 
                      onClick={() => setActiveTab('accounts')}
                      className="text-xs text-red-400 hover:text-red-300 transition font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Ledger ({customerAccounts.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {customerAccounts.map((acc) => (
                      <div 
                        key={acc.id}
                        onClick={() => { setSelectedCustomer(acc); setActiveTab('accounts'); }}
                        className="bg-[#14141e] border border-white/5 p-3.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-red-500/40 transition cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{acc.clientName}</span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                              acc.status === 'current' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              acc.status === 'overdue' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {acc.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-semibold mt-1">
                            {acc.vehicleName}
                          </p>
                          <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-2">
                            <span>Contract: ₱{acc.contractPrice.toLocaleString()}</span>
                            <span>•</span>
                            <span className="text-emerald-400">Paid: ₱{acc.totalAmountPaid.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Remaining Balance</span>
                          <span className="text-sm font-bold text-white font-mono">
                            ₱{acc.remainingBalance.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                            Due: {acc.nextDueDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 5 cols: Upcoming VIP Bookings */}
                <div className="lg:col-span-5 bg-[#101017] border border-white/10 rounded p-5 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>Test Drive Queue</span>
                    </h2>
                    <button 
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-red-400 hover:text-red-300 font-mono flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="p-3 bg-[#14141e] rounded border border-white/5 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{booking.clientName}</span>
                          <span className="text-[10px] font-mono text-amber-400">{booking.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 truncate">{booking.vehicleName}</p>
                        <div className="text-[10px] font-mono text-slate-500">
                          {booking.scheduledDate} @ {booking.scheduledTime}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Broadcast Bulletin */}
                  <div className="bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-600/30 rounded p-3.5">
                    <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block mb-1">
                      // BILLING BULLETIN
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Auto-generated monthly Statement of Accounts (SOA) will dispatch on the 25th. Verify all check clearings prior to month-end close.
                    </p>
                  </div>
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
          {/* TAB 3: CUSTOMER ACCOUNTS & PAYMENT LEDGER */}
          {/* ================================================================= */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              
              {/* 4 Financial KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">TOTAL CONTRACT PORTFOLIO</span>
                    <FileText className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    ₱{(ledgerMetrics.totalContractValue / 1000000).toFixed(2)}M
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Across {customerAccounts.length} financed client contracts
                  </div>
                </div>

                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">COLLECTED TO DATE</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">
                    ₱{(ledgerMetrics.totalCollected / 1000000).toFixed(2)}M
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{((ledgerMetrics.totalCollected / ledgerMetrics.totalContractValue) * 100).toFixed(1)}% recovery rate</span>
                  </div>
                </div>

                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">OUTSTANDING BALANCE</span>
                    <DollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-amber-400 tracking-tight">
                    ₱{(ledgerMetrics.totalOutstanding / 1000000).toFixed(2)}M
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    Remaining amortizations to collect
                  </div>
                </div>

                <div className="bg-[#101017] border border-white/10 p-5 rounded shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider">PORTFOLIO HEALTH</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {ledgerMetrics.overdueCount > 0 ? (
                      <span className="text-red-400">{ledgerMetrics.overdueCount} Past Due</span>
                    ) : (
                      <span className="text-emerald-400">100% Up to Date</span>
                    )}
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    12-day grace period applied
                  </div>
                </div>

              </div>

              {/* Accounts Table Controls */}
              <div className="bg-[#101017] border border-white/10 rounded p-4 shadow-lg space-y-3">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  
                  {/* Search input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={accountSearch}
                      onChange={(e) => setAccountSearch(e.target.value)}
                      placeholder="Search customer by name, vehicle, phone, account #, or plate..."
                      className="w-full bg-[#161622] border border-white/10 text-xs text-white pl-10 pr-4 py-2.5 rounded outline-none focus:border-red-500 transition"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-2">
                    <select
                      value={accountStatusFilter}
                      onChange={(e: any) => setAccountStatusFilter(e.target.value)}
                      className="bg-[#161622] border border-white/10 text-xs text-white px-3 py-2.5 rounded outline-none cursor-pointer"
                    >
                      <option value="all">All Account Statuses</option>
                      <option value="current">Current / Up to Date</option>
                      <option value="overdue">Overdue / Action Required</option>
                      <option value="paid-in-full">Paid in Full / Closed</option>
                    </select>

                    <button
                      onClick={() => {
                        if (customerAccounts.length > 0) {
                          setSelectedCustomer(customerAccounts[0]);
                          setIsPostPaymentModalOpen(true);
                        }
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <Receipt className="w-4 h-4" />
                      <span>Post Payment</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Customer Accounts Ledger Table */}
              <div className="bg-[#101017] border border-white/10 rounded overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#14141e] text-[11px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5">Customer & Account No.</th>
                        <th className="px-4 py-3.5">Assigned Vehicle</th>
                        <th className="px-4 py-3.5">Contract Value</th>
                        <th className="px-4 py-3.5">Total Paid (To Date)</th>
                        <th className="px-4 py-3.5">Remaining Balance</th>
                        <th className="px-4 py-3.5">Next Due Date</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {filteredAccounts.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-12 text-center text-slate-400 font-mono text-xs">
                            No customer accounts matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredAccounts.map((acc) => {
                          const percentPaid = Math.round((acc.totalAmountPaid / (acc.contractPrice || 1)) * 100);

                          return (
                            <tr key={acc.id} className="hover:bg-white/[0.02] transition">
                              
                              {/* Customer info */}
                              <td className="px-4 py-3.5">
                                <span className="text-[10px] font-mono text-red-500 font-bold block">{acc.accountNumber}</span>
                                <span className="font-bold text-white block text-sm">{acc.clientName}</span>
                                <span className="text-[11px] font-mono text-slate-400">{acc.phone}</span>
                              </td>

                              {/* Vehicle */}
                              <td className="px-4 py-3.5">
                                <span className="font-semibold text-white block">{acc.vehicleName}</span>
                                <span className="text-[11px] font-mono text-slate-400">
                                  Plate: <strong className="text-white">{acc.plateNumber}</strong>
                                </span>
                              </td>

                              {/* Contract Price */}
                              <td className="px-4 py-3.5 font-mono">
                                <span className="font-bold text-white text-sm">₱{acc.contractPrice.toLocaleString()}</span>
                                <span className="text-slate-500 block text-[10px]">DP: ₱{acc.downPaymentPaid.toLocaleString()}</span>
                              </td>

                              {/* Total Paid with Mini Progress Bar */}
                              <td className="px-4 py-3.5 font-mono">
                                <div className="text-emerald-400 font-bold text-sm">
                                  ₱{acc.totalAmountPaid.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-emerald-500 rounded-full"
                                      style={{ width: `${Math.min(100, percentPaid)}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-slate-400">{percentPaid}%</span>
                                </div>
                              </td>

                              {/* Remaining Balance */}
                              <td className="px-4 py-3.5 font-mono">
                                <span className={`font-bold text-sm ${
                                  acc.remainingBalance === 0 ? 'text-slate-400' : 'text-amber-400'
                                }`}>
                                  ₱{acc.remainingBalance.toLocaleString()}
                                </span>
                                {acc.monthlyAmortization > 0 && (
                                  <span className="text-slate-500 block text-[10px]">
                                    ₱{acc.monthlyAmortization.toLocaleString()}/mo
                                  </span>
                                )}
                              </td>

                              {/* Next Due Date */}
                              <td className="px-4 py-3.5 font-mono text-[11px]">
                                {acc.status === 'paid-in-full' ? (
                                  <span className="text-emerald-400 font-bold">Settled</span>
                                ) : (
                                  <span className={acc.status === 'overdue' ? 'text-red-400 font-bold flex items-center gap-1' : 'text-slate-300'}>
                                    {acc.status === 'overdue' && <AlertTriangle className="w-3.5 h-3.5 shrink-0" />}
                                    {acc.nextDueDate}
                                  </span>
                                )}
                              </td>

                              {/* Status Badge */}
                              <td className="px-4 py-3.5">
                                <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                                  acc.status === 'current' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                  acc.status === 'overdue' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                                  'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                }`}>
                                  {acc.status === 'paid-in-full' ? 'Paid In Full' : acc.status}
                                </span>
                              </td>

                              {/* Action: Open Customer Ledger Dossier */}
                              <td className="px-4 py-3.5 text-right">
                                <button
                                  onClick={() => setSelectedCustomer(acc)}
                                  className="bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white text-xs font-semibold px-3 py-1.5 rounded transition border border-white/10 hover:border-red-600 flex items-center gap-1.5 ml-auto cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Inspect Ledger</span>
                                </button>
                              </td>

                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 bg-[#14141e] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DriveFlow Automotive Financing & Client Accounts Ledger Engine</span>
                  <span>{customerAccounts.length} Active Portfolios</span>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: TEST DRIVE BOOKINGS */}
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
          {/* TAB 5: BANK FINANCING */}
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
          {/* TAB 6: TRADE-IN VALUATIONS */}
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
          {/* TAB 7: SETTINGS & DEALERSHIP SPECS */}
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
      {/* MODAL: FULL CUSTOMER DOSSIER & PAYMENT HISTORY LEDGER */}
      {/* ========================================================================= */}
      {selectedCustomer && !isSOAModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-white/15 rounded-lg max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Dossier Header */}
            <div className="sticky top-0 bg-[#14141e] px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold text-sm">
                  {selectedCustomer.clientName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{selectedCustomer.clientName}</h2>
                    <span className="text-xs font-mono text-red-400 font-bold">({selectedCustomer.accountNumber})</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedCustomer.phone} • {selectedCustomer.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSOAModalOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded transition flex items-center gap-1.5 border border-white/10 cursor-pointer"
                  title="Generate Official SOA"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Statement of Account</span>
                </button>

                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-white/5 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 text-xs font-sans">
              
              {/* Top Details Card: Vehicle & Delivery Info */}
              <div className="bg-[#14141e] border border-white/5 rounded p-4.5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Vehicle Assigned</span>
                  <span className="font-bold text-white text-sm block mt-0.5">{selectedCustomer.vehicleName}</span>
                  <span className="text-[11px] font-mono text-slate-400">VIN: {selectedCustomer.vinNumber}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Plate & Contract Date</span>
                  <span className="font-bold text-white text-sm block mt-0.5">Plate: {selectedCustomer.plateNumber}</span>
                  <span className="text-[11px] font-mono text-slate-400">Signed: {selectedCustomer.contractDate}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Registered Address</span>
                  <span className="text-xs text-slate-200 block mt-0.5 truncate">{selectedCustomer.billingAddress}</span>
                  <span className="text-[11px] font-mono text-slate-400">{selectedCustomer.tinOrId}</span>
                </div>
              </div>

              {/* 4 Financial Highlight Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#14141e] border border-white/10 p-3.5 rounded">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Contract</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono block mt-1">
                    ₱{selectedCustomer.contractPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">DP: ₱{selectedCustomer.downPaymentPaid.toLocaleString()}</span>
                </div>

                <div className="bg-[#14141e] border border-emerald-500/30 p-3.5 rounded bg-emerald-950/10">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Total Amount Paid</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono block mt-1">
                    ₱{selectedCustomer.totalAmountPaid.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/80">
                    {Math.round((selectedCustomer.totalAmountPaid / selectedCustomer.contractPrice) * 100)}% of Contract Settled
                  </span>
                </div>

                <div className="bg-[#14141e] border border-amber-500/30 p-3.5 rounded bg-amber-950/10">
                  <span className="text-[10px] font-mono text-amber-400 uppercase block">Remaining Balance</span>
                  <span className="text-base sm:text-lg font-black text-amber-400 font-mono block mt-1">
                    ₱{selectedCustomer.remainingBalance.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400/80">Outstanding Balance</span>
                </div>

                <div className="bg-[#14141e] border border-white/10 p-3.5 rounded">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Next Amortization</span>
                  <span className="text-base sm:text-lg font-black text-white font-mono block mt-1">
                    ₱{selectedCustomer.monthlyAmortization.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono text-red-400">Due: {selectedCustomer.nextDueDate}</span>
                </div>
              </div>

              {/* Visual Payment Progress Bar */}
              <div className="bg-[#14141e] border border-white/5 rounded p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    Contract Liquidation Progress: <strong className="text-emerald-400">{Math.round((selectedCustomer.totalAmountPaid / selectedCustomer.contractPrice) * 100)}% Complete</strong>
                  </span>
                  <span className="text-slate-400">
                    Remaining: ₱{selectedCustomer.remainingBalance.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/10">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((selectedCustomer.totalAmountPaid / selectedCustomer.contractPrice) * 100))}%` }}
                  />
                </div>
              </div>

              {/* Payment History Ledger Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      <span>Itemized Payment History & Receipt Ledger</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">Official receipts, wire transfers, and posted amortization checks.</p>
                  </div>

                  <button
                    onClick={() => {
                      setPaymentForm({
                        amount: selectedCustomer.monthlyAmortization || 38500,
                        paymentMethod: 'Bank Wire (BDO)',
                        type: 'Monthly Amortization',
                        orNumber: `OR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                        referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
                        notes: `Monthly amortization payment for ${selectedCustomer.vehicleName}`,
                      });
                      setIsPostPaymentModalOpen(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded transition flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post New Payment</span>
                  </button>
                </div>

                <div className="border border-white/10 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#14141e] text-[10px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="px-3.5 py-3">Date & Timestamp</th>
                        <th className="px-3.5 py-3">OR Number</th>
                        <th className="px-3.5 py-3">Amount Paid</th>
                        <th className="px-3.5 py-3">Payment Method</th>
                        <th className="px-3.5 py-3">Transaction Type</th>
                        <th className="px-3.5 py-3">Reference / Check</th>
                        <th className="px-3.5 py-3">Processed By</th>
                        <th className="px-3.5 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans">
                      {selectedCustomer.ledger.map((txn) => (
                        <tr key={txn.id} className="hover:bg-white/[0.02]">
                          <td className="px-3.5 py-3 font-mono text-[11px] text-slate-300">
                            <div>{txn.date}</div>
                            <div className="text-[10px] text-slate-500">{txn.time}</div>
                          </td>
                          <td className="px-3.5 py-3 font-mono text-red-400 font-bold">
                            {txn.orNumber}
                          </td>
                          <td className="px-3.5 py-3 font-mono text-sm font-bold text-emerald-400">
                            ₱{txn.amount.toLocaleString()}
                          </td>
                          <td className="px-3.5 py-3 text-slate-300">
                            {txn.paymentMethod}
                          </td>
                          <td className="px-3.5 py-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/5 border border-white/10 text-slate-300">
                              {txn.type}
                            </span>
                          </td>
                          <td className="px-3.5 py-3 font-mono text-[11px] text-slate-400">
                            {txn.referenceNo}
                          </td>
                          <td className="px-3.5 py-3 text-slate-400 text-[11px]">
                            {txn.receivedBy}
                          </td>
                          <td className="px-3.5 py-3 text-right">
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                              <Check className="w-3 h-3" />
                              <span>Posted</span>
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
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODAL: POST / RECORD NEW PAYMENT */}
      {/* ========================================================================= */}
      {isPostPaymentModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-emerald-500/40 rounded-lg max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>Post Payment to Account</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  {selectedCustomer.clientName} ({selectedCustomer.accountNumber})
                </span>
              </div>
              <button 
                onClick={() => setIsPostPaymentModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostPaymentSubmit} className="space-y-4 text-xs">
              
              <div className="bg-[#14141e] p-3 rounded border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Current Balance Before Payment:</span>
                <span className="font-mono text-amber-400 font-bold text-sm">₱{selectedCustomer.remainingBalance.toLocaleString()}</span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Payment Amount (PHP)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white text-base font-mono font-bold outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Official Receipt (OR) #</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.orNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, orNumber: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Payment Method</label>
                  <select
                    value={paymentForm.paymentMethod}
                    onChange={(e: any) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none cursor-pointer"
                  >
                    <option value="Bank Wire (BDO)">Bank Wire (BDO)</option>
                    <option value="Post-Dated Check (BPI)">Post-Dated Check (BPI)</option>
                    <option value="Online Transfer">Online Transfer</option>
                    <option value="Showroom Cashier">Showroom Cashier</option>
                    <option value="Direct Debit">Direct Debit</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Transaction Type</label>
                  <select
                    value={paymentForm.type}
                    onChange={(e: any) => setPaymentForm({ ...paymentForm, type: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none cursor-pointer"
                  >
                    <option value="Monthly Amortization">Monthly Amortization</option>
                    <option value="Principal Prepayment">Principal Prepayment</option>
                    <option value="Lump Sum Settlement">Lump Sum Settlement</option>
                    <option value="Down Payment">Down Payment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400 uppercase">Bank Ref / Check #</label>
                  <input
                    type="text"
                    required
                    value={paymentForm.referenceNo}
                    onChange={(e) => setPaymentForm({ ...paymentForm, referenceNo: e.target.value })}
                    className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400 uppercase">Internal Billing Notes</label>
                <input
                  type="text"
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                  className="w-full bg-[#161622] border border-white/10 p-2.5 rounded text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPostPaymentModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2 rounded transition shadow-lg cursor-pointer"
                >
                  Post Payment & Update Balance
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PRINTABLE STATEMENT OF ACCOUNT (SOA) */}
      {/* ========================================================================= */}
      {isSOAModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0e0e15] text-slate-100 border border-white/20 rounded-lg max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400 uppercase">OFFICIAL STATEMENT OF ACCOUNT // DRIVEFLOW MOTORS</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setIsSOAModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="inline-block bg-red-600 px-3 py-1 text-white font-black text-lg tracking-tight rounded-sm mb-2">
                  DRIVEFLOW MOTORS
                </div>
                <div className="text-xs text-slate-400 leading-relaxed font-mono">
                  Circuit Makati & BGC Showroom, Metro Manila<br />
                  Hotline: (02) 8877-CARS • billing@driveflow.ph<br />
                  VAT Reg TIN: 009-881-204-000
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs">
                <span className="text-red-400 font-bold text-sm block">STATEMENT OF ACCOUNT</span>
                <span className="text-slate-400 block">Statement Date: {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                <span className="text-white font-bold block mt-1">Account Ref: {selectedCustomer.accountNumber}</span>
              </div>
            </div>

            {/* Bill To & Unit Spec */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#14141e] rounded border border-white/5 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-bold mb-1">CLIENT INFORMATION</span>
                <strong className="text-white text-sm block">{selectedCustomer.clientName}</strong>
                <span className="text-slate-400 block">{selectedCustomer.billingAddress}</span>
                <span className="text-slate-400 block">{selectedCustomer.tinOrId}</span>
                <span className="text-slate-400 block">{selectedCustomer.phone}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-bold mb-1">VEHICLE CONTRACT SPECIFICATIONS</span>
                <strong className="text-white text-sm block">{selectedCustomer.vehicleName}</strong>
                <span className="text-slate-400 block">Plate: {selectedCustomer.plateNumber}</span>
                <span className="text-slate-400 block">VIN: {selectedCustomer.vinNumber}</span>
                <span className="text-slate-400 block">Contract Date: {selectedCustomer.contractDate}</span>
              </div>
            </div>

            {/* Financial Ledger Summary Box */}
            <div className="border border-white/10 rounded overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#14141e] text-[10px] text-slate-400 uppercase">
                  <tr>
                    <th className="p-3">Financial Obligation Item</th>
                    <th className="p-3 text-right">Amount (PHP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 text-slate-300">Total Vehicle Contract Agreed Price</td>
                    <td className="p-3 text-right font-bold text-white">₱{selectedCustomer.contractPrice.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">Initial Down Payment Equity Settled</td>
                    <td className="p-3 text-right font-bold text-emerald-400">- ₱{selectedCustomer.downPaymentPaid.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-300">Total Cumulative Payments Remitted to Date</td>
                    <td className="p-3 text-right font-bold text-emerald-400">- ₱{selectedCustomer.totalAmountPaid.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-[#14141e] font-bold text-sm">
                    <td className="p-3 text-white">CURRENT OUTSTANDING BALANCE</td>
                    <td className="p-3 text-right text-amber-400">₱{selectedCustomer.remainingBalance.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Recent Payments Breakdown in SOA */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-300 mb-2 uppercase">Verified Payment Transactions</h4>
              <div className="border border-white/5 rounded overflow-hidden">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-[#14141e] text-[9px] text-slate-400 uppercase">
                    <tr>
                      <th className="p-2.5">Date</th>
                      <th className="p-2.5">OR #</th>
                      <th className="p-2.5">Method & Reference</th>
                      <th className="p-2.5 text-right">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedCustomer.ledger.map((txn) => (
                      <tr key={txn.id}>
                        <td className="p-2.5 text-slate-300">{txn.date}</td>
                        <td className="p-2.5 text-red-400">{txn.orNumber}</td>
                        <td className="p-2.5 text-slate-400">{txn.paymentMethod} ({txn.referenceNo})</td>
                        <td className="p-2.5 text-right text-emerald-400 font-bold">₱{txn.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signature Block */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs font-mono text-slate-400">
              <div>
                <p className="text-[10px] text-slate-500 leading-normal max-w-sm">
                  This document serves as an official accounting statement certified by DriveFlow Motors Finance Department.
                </p>
              </div>
              <div className="text-right">
                <div className="w-48 border-b border-white/20 pb-1 mb-1 text-center font-bold text-white text-xs">
                  Janrey Mina
                </div>
                <span className="text-[10px] text-slate-500 block text-center">General Manager / Authorized Officer</span>
              </div>
            </div>

          </div>
        </div>
      )}

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
