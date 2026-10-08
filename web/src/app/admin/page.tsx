'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Users,
  Receipt,
  Calculator,
  Car,
  Search,
  Plus,
  ExternalLink,
  X,
  Menu,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Building2,
  FileCheck,
  Wallet,
  Percent,
  Phone,
  Eye,
  Check,
  CreditCard,
  Banknote,
} from 'lucide-react';
import { VEHICLES, Vehicle } from '@/data/vehicles';

// ============================================================================
// TYPES & INTERFACES FOR CAR FINANCING ADMIN DASHBOARD
// ============================================================================

type TabType = 'overview' | 'applications' | 'contracts' | 'collections' | 'calculator' | 'fleet';

interface LoanApplication {
  id: string;
  appNumber: string;
  applicantName: string;
  phone: string;
  email: string;
  employmentType: 'Corporate Executive' | 'Business Owner' | 'OFW / Remittance' | 'Medical / Legal Professional';
  monthlyIncome: number;
  creditScore: number; // e.g. 740
  cmapStatus: 'Cleared' | 'Pending Verification' | 'With Record';
  vehicleName: string;
  vehiclePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  termMonths: number;
  interestRatePa: number;
  monthlyAmortization: number;
  financingChannel: 'BDO Unibank Auto Loan' | 'BPI Auto Loan' | 'Security Bank' | 'EastWest Bank' | 'DriveFlow In-House';
  submittedDate: string;
  assignedOfficer: string;
  status: 'credit-investigation' | 'bank-endorsed' | 'approved' | 'for-release' | 'declined';
  docsSubmitted: {
    validIds: boolean;
    incomeProof: boolean;
    bankStatements: boolean;
    proofOfBilling: boolean;
  };
}

interface PaymentTransaction {
  id: string;
  orNumber: string;
  date: string;
  time: string;
  clientName: string;
  accountNumber: string;
  vehicleName: string;
  amount: number;
  method: 'PDC Check Clearing (BPI)' | 'Bank Wire (BDO)' | 'InstaPay / PESONet' | 'Showroom Cashier' | 'Auto-Debit Arrangement';
  type: 'Monthly Amortization' | 'Down Payment Equity' | 'Chattel & Insurance Fee' | 'Late Penalty Settlement' | 'Full Principal Payoff';
  refNumber: string;
  receivedBy: string;
  installmentNumber?: string;
}

interface LoanContract {
  id: string;
  accountNumber: string;
  clientName: string;
  phone: string;
  email: string;
  tinNumber: string;
  billingAddress: string;
  vehicleName: string;
  vinNumber: string;
  plateNumber: string;
  chattelStatus: 'Registered & Encumbered' | 'Processing Registry of Deeds' | 'Released / Cancellation Issued';
  financingBank: string;
  interestRatePa: number;
  contractDate: string;
  unitPrice: number;
  downPaymentPaid: number;
  principalFinanced: number;
  totalPayableWithInterest: number;
  totalAmountPaid: number;
  remainingBalance: number;
  monthlyAmortization: number;
  termMonths: number;
  monthsPaid: number;
  nextDueDate: string;
  pdcVaultCount: number;
  status: 'good-standing' | 'due-soon' | 'overdue' | 'fully-settled';
  paymentHistory: PaymentTransaction[];
}

interface AdminVehicle extends Vehicle {
  financingStatus: 'available' | 'under-ci' | 'encumbered';
  stockNumber: string;
  minDownPaymentPct: number;
}

export default function CarFinancingAdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [contractStatusFilter, setContractStatusFilter] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // ==========================================================================
  // 1. INITIAL LOAN APPLICATIONS (CREDIT & UNDERWRITING PIPELINE)
  // ==========================================================================
  const [applications, setApplications] = useState<LoanApplication[]>([
    {
      id: 'app-1',
      appNumber: 'LN-2026-8841',
      applicantName: 'Arch. Lorenzo Villavicencio',
      phone: '+63 917 810 4429',
      email: 'l.villavicencio@vstudio.ph',
      employmentType: 'Business Owner',
      monthlyIncome: 420000,
      creditScore: 785,
      cmapStatus: 'Cleared',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      vehiclePrice: 2350000,
      downPaymentPercent: 20,
      downPaymentAmount: 470000,
      loanAmount: 1880000,
      termMonths: 48,
      interestRatePa: 6.5,
      monthlyAmortization: 44780,
      financingChannel: 'BDO Unibank Auto Loan',
      submittedDate: 'Oct 15, 2026',
      assignedOfficer: 'Janrey Mina',
      status: 'approved',
      docsSubmitted: { validIds: true, incomeProof: true, bankStatements: true, proofOfBilling: true },
    },
    {
      id: 'app-2',
      appNumber: 'LN-2026-8842',
      applicantName: 'Dr. Camille Alcantara-Sy',
      phone: '+63 918 552 9011',
      email: 'camille.sy@stlukes.com.ph',
      employmentType: 'Medical / Legal Professional',
      monthlyIncome: 580000,
      creditScore: 810,
      cmapStatus: 'Cleared',
      vehicleName: '2023 BMW M3 Competition xDrive',
      vehiclePrice: 6950000,
      downPaymentPercent: 30,
      downPaymentAmount: 2085000,
      loanAmount: 4865000,
      termMonths: 36,
      interestRatePa: 6.2,
      monthlyAmortization: 148420,
      financingChannel: 'BPI Auto Loan',
      submittedDate: 'Oct 15, 2026',
      assignedOfficer: 'Marc Santos',
      status: 'for-release',
      docsSubmitted: { validIds: true, incomeProof: true, bankStatements: true, proofOfBilling: true },
    },
    {
      id: 'app-3',
      appNumber: 'LN-2026-8845',
      applicantName: 'Capt. Marco Antonio Reyes',
      phone: '+63 920 991 3340',
      email: 'm.reyes@philippineairlines.com',
      employmentType: 'Corporate Executive',
      monthlyIncome: 350000,
      creditScore: 730,
      cmapStatus: 'Cleared',
      vehicleName: '2023 Toyota Hilux GR Sport 4x4',
      vehiclePrice: 1980000,
      downPaymentPercent: 20,
      downPaymentAmount: 396000,
      loanAmount: 1584000,
      termMonths: 60,
      interestRatePa: 7.0,
      monthlyAmortization: 31415,
      financingChannel: 'Security Bank',
      submittedDate: 'Oct 16, 2026',
      assignedOfficer: 'Janrey Mina',
      status: 'bank-endorsed',
      docsSubmitted: { validIds: true, incomeProof: true, bankStatements: true, proofOfBilling: false },
    },
    {
      id: 'app-4',
      appNumber: 'LN-2026-8849',
      applicantName: 'Vincent Chiong',
      phone: '+63 917 302 1188',
      email: 'vchiong@pacificlogistics.ph',
      employmentType: 'Business Owner',
      monthlyIncome: 290000,
      creditScore: 685,
      cmapStatus: 'Pending Verification',
      vehicleName: '2024 Honda Civic RS Turbo CVT',
      vehiclePrice: 1620000,
      downPaymentPercent: 25,
      downPaymentAmount: 405000,
      loanAmount: 1215000,
      termMonths: 48,
      interestRatePa: 8.5,
      monthlyAmortization: 29950,
      financingChannel: 'DriveFlow In-House',
      submittedDate: 'Oct 16, 2026',
      assignedOfficer: 'Carlos Mendoza',
      status: 'credit-investigation',
      docsSubmitted: { validIds: true, incomeProof: true, bankStatements: false, proofOfBilling: true },
    },
    {
      id: 'app-5',
      appNumber: 'LN-2026-8851',
      applicantName: 'Engr. Paolo Montemayor',
      phone: '+63 908 771 2049',
      email: 'paolo.m@dmci.com',
      employmentType: 'Corporate Executive',
      monthlyIncome: 195000,
      creditScore: 715,
      cmapStatus: 'Cleared',
      vehicleName: '2022 Montero Sport Black Series',
      vehiclePrice: 1680000,
      downPaymentPercent: 20,
      downPaymentAmount: 336000,
      loanAmount: 1344000,
      termMonths: 60,
      interestRatePa: 6.8,
      monthlyAmortization: 26480,
      financingChannel: 'EastWest Bank',
      submittedDate: 'Oct 16, 2026',
      assignedOfficer: 'Marc Santos',
      status: 'credit-investigation',
      docsSubmitted: { validIds: true, incomeProof: false, bankStatements: true, proofOfBilling: true },
    },
  ]);

  // ==========================================================================
  // 2. ACTIVE LOAN CONTRACTS & AMORTIZATION LEDGERS
  // ==========================================================================
  const [contracts, setContracts] = useState<LoanContract[]>([
    {
      id: 'con-1',
      accountNumber: 'ACC-DFM-2026-081',
      clientName: 'Gov. Ferdinand Romualdez',
      phone: '+63 917 554 1234',
      email: 'f.romualdez@gov.ph',
      tinNumber: '241-890-123-000',
      billingAddress: 'Forbes Park, Makati City, Metro Manila',
      vehicleName: '2024 Ford Everest Titanium+ 4x4',
      vinNumber: 'MNB24EVR8849012',
      plateNumber: 'NGB-8818',
      chattelStatus: 'Registered & Encumbered',
      financingBank: 'BPI Auto Loan',
      interestRatePa: 6.5,
      contractDate: 'Mar 15, 2026',
      unitPrice: 2350000,
      downPaymentPaid: 470000,
      principalFinanced: 1880000,
      totalPayableWithInterest: 2346000,
      totalAmountPaid: 739500,
      remainingBalance: 1606500,
      monthlyAmortization: 38500,
      termMonths: 36,
      monthsPaid: 7,
      nextDueDate: 'Nov 15, 2026',
      pdcVaultCount: 29,
      status: 'good-standing',
      paymentHistory: [
        { id: 'tx-101', orNumber: 'OR-2026-9680', date: 'Oct 15, 2026', time: '10:15 AM', clientName: 'Gov. Ferdinand Romualdez', accountNumber: 'ACC-DFM-2026-081', vehicleName: '2024 Ford Everest Titanium+ 4x4', amount: 38500, method: 'PDC Check Clearing (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004424', receivedBy: 'Marc Santos', installmentNumber: '07 / 36' },
        { id: 'tx-102', orNumber: 'OR-2026-9533', date: 'Sep 15, 2026', time: '01:30 PM', clientName: 'Gov. Ferdinand Romualdez', accountNumber: 'ACC-DFM-2026-081', vehicleName: '2024 Ford Everest Titanium+ 4x4', amount: 38500, method: 'PDC Check Clearing (BPI)', type: 'Monthly Amortization', refNumber: 'CHK-BPI-004423', receivedBy: 'Marc Santos', installmentNumber: '06 / 36' },
        { id: 'tx-103', orNumber: 'OR-2026-8801', date: 'Mar 15, 2026', time: '11:30 AM', clientName: 'Gov. Ferdinand Romualdez', accountNumber: 'ACC-DFM-2026-081', vehicleName: '2024 Ford Everest Titanium+ 4x4', amount: 470000, method: 'Bank Wire (BDO)', type: 'Down Payment Equity', refNumber: 'WIRE-BDO-992100', receivedBy: 'Janrey Mina', installmentNumber: 'DP 20%' },
      ],
    },
    {
      id: 'con-2',
      accountNumber: 'ACC-DFM-2026-094',
      clientName: 'Atty. Patricia Beatrice Lim',
      phone: '+63 917 888 7711',
      email: 'pblim@limpartners.ph',
      tinNumber: '312-990-445-000',
      billingAddress: 'Dasmariñas Village, Makati City',
      vehicleName: '2026 Porsche 718 Cayman GT4 RS',
      vinNumber: 'WP0AF2A82PS29910',
      plateNumber: 'PBL-718',
      chattelStatus: 'Registered & Encumbered',
      financingBank: 'BDO Unibank Private',
      interestRatePa: 6.0,
      contractDate: 'Jan 10, 2026',
      unitPrice: 6400000,
      downPaymentPaid: 1920000,
      principalFinanced: 4480000,
      totalPayableWithInterest: 5568000,
      totalAmountPaid: 2892000,
      remainingBalance: 2676000,
      monthlyAmortization: 108000,
      termMonths: 48,
      monthsPaid: 9,
      nextDueDate: 'Nov 10, 2026',
      pdcVaultCount: 39,
      status: 'good-standing',
      paymentHistory: [
        { id: 'tx-201', orNumber: 'OR-2026-9705', date: 'Oct 10, 2026', time: '02:00 PM', clientName: 'Atty. Patricia Beatrice Lim', accountNumber: 'ACC-DFM-2026-094', vehicleName: '2026 Porsche 718 Cayman GT4 RS', amount: 108000, method: 'Auto-Debit Arrangement', type: 'Monthly Amortization', refNumber: 'ADA-BDO-49102', receivedBy: 'Janrey Mina', installmentNumber: '09 / 48' },
        { id: 'tx-202', orNumber: 'OR-2026-7719', date: 'Jan 10, 2026', time: '03:15 PM', clientName: 'Atty. Patricia Beatrice Lim', accountNumber: 'ACC-DFM-2026-094', vehicleName: '2026 Porsche 718 Cayman GT4 RS', amount: 1920000, method: 'Bank Wire (BDO)', type: 'Down Payment Equity', refNumber: 'WIRE-BDO-PVT-01', receivedBy: 'Janrey Mina', installmentNumber: 'DP 30%' },
      ],
    },
    {
      id: 'con-3',
      accountNumber: 'ACC-DFM-2026-105',
      clientName: 'Engr. Mateo De Leon',
      phone: '+63 920 445 6789',
      email: 'mdeleon@apexconstruction.ph',
      tinNumber: '189-402-331-000',
      billingAddress: 'Ayala Alabang Village, Muntinlupa City',
      vehicleName: '2023 Toyota Hilux GR Sport 4x4',
      vinNumber: 'MR0FZ22G8001923',
      plateNumber: 'NEB-4921',
      chattelStatus: 'Registered & Encumbered',
      financingBank: 'DriveFlow In-House',
      interestRatePa: 9.5,
      contractDate: 'May 04, 2026',
      unitPrice: 1980000,
      downPaymentPaid: 396000,
      principalFinanced: 1584000,
      totalPayableWithInterest: 2268000,
      totalAmountPaid: 520800,
      remainingBalance: 1747200,
      monthlyAmortization: 31200,
      termMonths: 60,
      monthsPaid: 4,
      nextDueDate: 'Oct 04, 2026 (12 Days Past Due)',
      pdcVaultCount: 55,
      status: 'overdue',
      paymentHistory: [
        { id: 'tx-301', orNumber: 'OR-2026-9611', date: 'Sep 04, 2026', time: '09:40 AM', clientName: 'Engr. Mateo De Leon', accountNumber: 'ACC-DFM-2026-105', vehicleName: '2023 Toyota Hilux GR Sport 4x4', amount: 31200, method: 'InstaPay / PESONet', type: 'Monthly Amortization', refNumber: 'INSTA-998821', receivedBy: 'Marc Santos', installmentNumber: '04 / 60' },
        { id: 'tx-302', orNumber: 'OR-2026-9050', date: 'May 04, 2026', time: '01:00 PM', clientName: 'Engr. Mateo De Leon', accountNumber: 'ACC-DFM-2026-105', vehicleName: '2023 Toyota Hilux GR Sport 4x4', amount: 396000, method: 'Bank Wire (BDO)', type: 'Down Payment Equity', refNumber: 'WIRE-BDO-44102', receivedBy: 'Janrey Mina', installmentNumber: 'DP 20%' },
      ],
    },
    {
      id: 'con-4',
      accountNumber: 'ACC-DFM-2026-118',
      clientName: 'Dr. Roberto Tan',
      phone: '+63 918 222 3344',
      email: 'dr.tan@asianhospital.com',
      tinNumber: '104-551-892-000',
      billingAddress: 'Corinthian Gardens, Quezon City',
      vehicleName: '2023 BMW M3 Competition xDrive',
      vinNumber: 'WBS33AY08PFP4921',
      plateNumber: 'DOC-888',
      chattelStatus: 'Released / Cancellation Issued',
      financingBank: 'Security Bank Auto Loan',
      interestRatePa: 6.2,
      contractDate: 'Feb 18, 2026',
      unitPrice: 6950000,
      downPaymentPaid: 3500000,
      principalFinanced: 3450000,
      totalPayableWithInterest: 6950000,
      totalAmountPaid: 6950000,
      remainingBalance: 0,
      monthlyAmortization: 0,
      termMonths: 24,
      monthsPaid: 24,
      nextDueDate: 'FULLY SETTLED',
      pdcVaultCount: 0,
      status: 'fully-settled',
      paymentHistory: [
        { id: 'tx-401', orNumber: 'OR-2026-9480', date: 'Aug 28, 2026', time: '02:30 PM', clientName: 'Dr. Roberto Tan', accountNumber: 'ACC-DFM-2026-118', vehicleName: '2023 BMW M3 Competition xDrive', amount: 3450000, method: 'Bank Wire (BDO)', type: 'Full Principal Payoff', refNumber: 'WIRE-BDO-99412', receivedBy: 'Janrey Mina', installmentNumber: 'FULL PAYOFF' },
      ],
    },
  ]);

  // ==========================================================================
  // 3. FINANCED FLEET & COLLATERAL REGISTRY
  // ==========================================================================
  const [fleet, setFleet] = useState<AdminVehicle[]>(() =>
    VEHICLES.map((v, i) => ({
      ...v,
      financingStatus: i === 1 ? 'under-ci' : i === 4 ? 'encumbered' : 'available',
      stockNumber: `DFM-${1001 + i}`,
      minDownPaymentPct: v.category === 'premium' ? 30 : 20,
    }))
  );

  // ==========================================================================
  // 4. MODALS & INTERACTIVE STATES
  // ==========================================================================
  const [selectedContract, setSelectedContract] = useState<LoanContract | null>(null);
  const [selectedApp, setSelectedApp] = useState<LoanApplication | null>(null);
  const [isPostPaymentOpen, setIsPostPaymentOpen] = useState(false);
  const [isSOAOpen, setIsSOAOpen] = useState(false);
  const [isNewAppOpen, setIsNewAppOpen] = useState(false);

  // Payment Posting Form State
  const [payAmount, setPayAmount] = useState<number>(38500);
  const [payMethod, setPayMethod] = useState<PaymentTransaction['method']>('PDC Check Clearing (BPI)');
  const [payType, setPayType] = useState<PaymentTransaction['type']>('Monthly Amortization');
  const [payRef, setPayRef] = useState('');

  // New Loan Application Form State
  const [newAppClient, setNewAppClient] = useState('');
  const [newAppPhone, setNewAppPhone] = useState('');
  const [newAppIncome, setNewAppIncome] = useState(250000);
  const [newAppVehicleId, setNewAppVehicleId] = useState(VEHICLES[0].id);
  const [newAppDpPct, setNewAppDpPct] = useState(20);
  const [newAppTerm, setNewAppTerm] = useState(48);
  const [newAppChannel, setNewAppChannel] = useState<LoanApplication['financingChannel']>('BDO Unibank Auto Loan');

  // Financing Calculator State
  const [calcVehicleId, setCalcVehicleId] = useState<string>(VEHICLES[0].id);
  const [calcDpPercent, setCalcDpPercent] = useState<number>(20);
  const [calcTermMonths, setCalcTermMonths] = useState<number>(48);
  const [calcRatePa, setCalcRatePa] = useState<number>(6.8);
  const [calcChannel, setCalcChannel] = useState<'Bank Partner' | 'In-House Financing'>('Bank Partner');

  // ==========================================================================
  // COMPUTED METRICS & FILTERS
  // ==========================================================================
  const totalFinancedPortfolio = useMemo(
    () => contracts.reduce((sum, c) => sum + c.totalPayableWithInterest, 0),
    [contracts]
  );
  const totalCollected = useMemo(
    () => contracts.reduce((sum, c) => sum + c.totalAmountPaid, 0),
    [contracts]
  );
  const totalReceivables = useMemo(
    () => contracts.reduce((sum, c) => sum + c.remainingBalance, 0),
    [contracts]
  );
  const overdueContracts = useMemo(
    () => contracts.filter((c) => c.status === 'overdue'),
    [contracts]
  );

  const allTransactions = useMemo(() => {
    return contracts.flatMap((c) => c.paymentHistory);
  }, [contracts]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        app.applicantName.toLowerCase().includes(q) ||
        app.appNumber.toLowerCase().includes(q) ||
        app.vehicleName.toLowerCase().includes(q) ||
        app.financingChannel.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [applications, appStatusFilter, searchQuery]);

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchesStatus = contractStatusFilter === 'all' || c.status === contractStatusFilter;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        !q ||
        c.clientName.toLowerCase().includes(q) ||
        c.accountNumber.toLowerCase().includes(q) ||
        c.vehicleName.toLowerCase().includes(q) ||
        c.plateNumber.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [contracts, contractStatusFilter, searchQuery]);

  // Calculator Computations
  const selectedCalcVehicle = useMemo(
    () => VEHICLES.find((v) => v.id === calcVehicleId) || VEHICLES[0],
    [calcVehicleId]
  );
  const calcDpAmount = Math.round(selectedCalcVehicle.priceNumeric * (calcDpPercent / 100));
  const calcLoanPrincipal = selectedCalcVehicle.priceNumeric - calcDpAmount;
  const calcChattelFee = Math.round(calcLoanPrincipal * 0.022); // ~2.2% chattel mortgage
  const calcInsurance = Math.round(selectedCalcVehicle.priceNumeric * 0.018); // ~1.8% comprehensive insurance
  const calcTotalCashOutlay = calcDpAmount + calcChattelFee + calcInsurance;
  const calcTotalInterest = Math.round(calcLoanPrincipal * ((calcRatePa / 100) * (calcTermMonths / 12)));
  const calcMonthlyAmort = Math.round((calcLoanPrincipal + calcTotalInterest) / calcTermMonths);

  // ==========================================================================
  // HANDLERS
  // ==========================================================================
  const handleAdvanceAppStatus = (appId: string, nextStatus: LoanApplication['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: nextStatus } : a))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: nextStatus });
    }
    triggerToast(`Application status updated to ${nextStatus.replace('-', ' ').toUpperCase()}`);
  };

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const v = VEHICLES.find((car) => car.id === newAppVehicleId) || VEHICLES[0];
    const dpAmt = Math.round(v.priceNumeric * (newAppDpPct / 100));
    const loanAmt = v.priceNumeric - dpAmt;
    const rate = newAppChannel === 'DriveFlow In-House' ? 9.5 : 6.5;
    const totalInt = loanAmt * ((rate / 100) * (newAppTerm / 12));
    const monthly = Math.round((loanAmt + totalInt) / newAppTerm);

    const newEntry: LoanApplication = {
      id: `app-${Date.now()}`,
      appNumber: `LN-2026-${Math.floor(8855 + Math.random() * 140)}`,
      applicantName: newAppClient,
      phone: newAppPhone,
      email: `${newAppClient.toLowerCase().replace(/[^a-z]/g, '')}@client.ph`,
      employmentType: 'Corporate Executive',
      monthlyIncome: newAppIncome,
      creditScore: 745,
      cmapStatus: 'Cleared',
      vehicleName: v.name,
      vehiclePrice: v.priceNumeric,
      downPaymentPercent: newAppDpPct,
      downPaymentAmount: dpAmt,
      loanAmount: loanAmt,
      termMonths: newAppTerm,
      interestRatePa: rate,
      monthlyAmortization: monthly,
      financingChannel: newAppChannel,
      submittedDate: 'Oct 16, 2026',
      assignedOfficer: 'Janrey Mina',
      status: 'credit-investigation',
      docsSubmitted: { validIds: true, incomeProof: true, bankStatements: false, proofOfBilling: true },
    };

    setApplications((prev) => [newEntry, ...prev]);
    setIsNewAppOpen(false);
    setNewAppClient('');
    setNewAppPhone('');
    triggerToast(`New Financing Application ${newEntry.appNumber} created.`);
  };

  const handlePostPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContract || payAmount <= 0) return;

    const nextInstallment = selectedContract.monthsPaid + 1;
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      orNumber: `OR-2026-${Math.floor(9710 + Math.random() * 280)}`,
      date: 'Oct 16, 2026',
      time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date()),
      clientName: selectedContract.clientName,
      accountNumber: selectedContract.accountNumber,
      vehicleName: selectedContract.vehicleName,
      amount: payAmount,
      method: payMethod,
      type: payType,
      refNumber: payRef || `REF-${Math.floor(100000 + Math.random() * 899999)}`,
      receivedBy: 'Janrey Mina',
      installmentNumber:
        payType === 'Monthly Amortization'
          ? `${String(nextInstallment).padStart(2, '0')} / ${selectedContract.termMonths}`
          : 'SETTLEMENT',
    };

    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === selectedContract.id) {
          const updatedPaid = c.totalAmountPaid + payAmount;
          const updatedBal = Math.max(0, c.remainingBalance - payAmount);
          const updatedMonths = payType === 'Monthly Amortization' ? c.monthsPaid + 1 : c.monthsPaid;
          const updatedStatus: LoanContract['status'] =
            updatedBal === 0 ? 'fully-settled' : 'good-standing';

          const updated: LoanContract = {
            ...c,
            totalAmountPaid: updatedPaid,
            remainingBalance: updatedBal,
            monthsPaid: updatedMonths,
            status: updatedStatus,
            nextDueDate: updatedBal === 0 ? 'FULLY SETTLED' : 'Nov 16, 2026',
            paymentHistory: [newTx, ...c.paymentHistory],
          };
          setSelectedContract(updated);
          return updated;
        }
        return c;
      })
    );

    setIsPostPaymentOpen(false);
    setPayRef('');
    triggerToast(`Official Receipt ${newTx.orNumber} issued for ₱${payAmount.toLocaleString()}`);
  };

  // ==========================================================================
  // STATUS BADGE HELPER (DRIVEFLOW CARBON & RACING RED THEME)
  // ==========================================================================
  const renderAppStatusBadge = (status: LoanApplication['status']) => {
    switch (status) {
      case 'credit-investigation':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-sm">
            Under CI Audit
          </span>
        );
      case 'bank-endorsed':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-sm">
            Bank Endorsed
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-sm">
            Loan Approved
          </span>
        );
      case 'for-release':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/40 rounded-sm">
            Ready For Release
          </span>
        );
      case 'declined':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-slate-500 border border-white/10 rounded-sm">
            Declined
          </span>
        );
    }
  };

  const renderContractStatusBadge = (status: LoanContract['status']) => {
    switch (status) {
      case 'good-standing':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-sm">
            Current / Active
          </span>
        );
      case 'due-soon':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-sm">
            Due This Week
          </span>
        );
      case 'overdue':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/50 rounded-sm animate-pulse">
            Past Due Alert
          </span>
        );
      case 'fully-settled':
        return (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 rounded-sm">
            Fully Settled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0e] text-slate-100 flex font-sans selection:bg-[#e10600] selection:text-white">
      
      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#101017] border-l-4 border-l-[#e10600] border border-white/15 text-white px-5 py-3.5 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-xs font-bold uppercase tracking-wider flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* ========================================================================= */}
      {/* SIDEBAR NAVIGATION (DRIVEFLOW CARBON & RACING RED THEME)                  */}
      {/* ========================================================================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-68 bg-carbon border-r border-white/10 z-50 flex flex-col justify-between p-5 transition-transform duration-200 ease-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="space-y-7">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-racing-red px-2.5 py-1 text-white font-black tracking-tight text-sm rounded-sm shadow-sm">
                DRIVEFLOW
              </div>
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white block leading-none">
                  FINANCE OPS
                </span>
                <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest">
                  // ADMIN PORTAL
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 block mb-2">
              // AUTO FINANCING MODULES
            </span>

            <button
              onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Executive Overview</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => { setActiveTab('applications'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-4 h-4 shrink-0" />
                <span>Loan Applications</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold ${
                  activeTab === 'applications'
                    ? 'bg-black/40 text-white'
                    : 'bg-red-600/20 text-red-400 border border-red-500/30'
                }`}
              >
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('contracts'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'contracts'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 shrink-0" />
                <span>Active Contracts</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold ${
                  activeTab === 'contracts'
                    ? 'bg-black/40 text-white'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {contracts.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('collections'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'collections'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Receipt className="w-4 h-4 shrink-0" />
                <span>Collections & PDCs</span>
              </div>
              {overdueContracts.length > 0 && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold ${
                    activeTab === 'collections'
                      ? 'bg-black/40 text-white'
                      : 'bg-red-600/25 text-red-400 border border-red-500/40'
                  }`}
                >
                  {overdueContracts.length} Due
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('calculator'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4 shrink-0" />
                <span>Loan Desk & Rates</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => { setActiveTab('fleet'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-racing-red text-white shadow-[0_0_20px_rgba(225,6,0,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 shrink-0" />
                <span>Collateral Fleet</span>
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-sm font-bold ${
                  activeTab === 'fleet'
                    ? 'bg-black/40 text-white'
                    : 'bg-white/10 text-slate-300'
                }`}
              >
                {fleet.length}
              </span>
            </button>
          </div>

          {/* Partner Bank Status Box */}
          <div className="p-3.5 bg-[#0a0a0e] border border-white/10 rounded-sm space-y-2.5">
            <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest block">
              // CREDIT LINE PARTNERS
            </span>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>BDO Unibank</span>
                <span className="text-emerald-400">6.5% p.a.</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>BPI Auto Loans</span>
                <span className="text-emerald-400">6.2% p.a.</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Security Bank</span>
                <span className="text-emerald-400">6.8% p.a.</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>In-House Credit</span>
                <span className="text-red-400">9.5% p.a.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Officer Profile & Showroom Link */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition"
          >
            <span>Return to Showroom</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-500" />
          </Link>

          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-9 h-9 rounded-sm bg-racing-red text-white flex items-center justify-center font-black text-xs italic shadow-sm">
              JM
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate uppercase tracking-wide">
                Janrey Mina
              </span>
              <span className="text-[10px] font-mono text-slate-400 block truncate">
                VP — Auto Finance & Credit
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Control Bar */}
        <header className="h-18 border-b border-white/10 px-4 sm:px-6 lg:px-10 flex items-center justify-between bg-[#0a0a0f]/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white p-2 border border-white/10 rounded-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block">
                // DRIVEFLOW FINANCIAL SERVICES MANILA
              </span>
              <h1 className="text-base sm:text-xl font-black italic uppercase tracking-tight text-white">
                {activeTab === 'overview' && 'Auto Financing & Portfolio Command'}
                {activeTab === 'applications' && 'Loan Applications & Credit Underwriting'}
                {activeTab === 'contracts' && 'Active Auto Loan Contracts & Ledgers'}
                {activeTab === 'collections' && 'Amortization Collections & PDC Vault'}
                {activeTab === 'calculator' && 'Financing Desk & Interest Rate Matrix'}
                {activeTab === 'fleet' && 'Financed Fleet & Collateral Registry'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNewAppOpen(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-red-500 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2.5 rounded-sm transition hidden sm:flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-red-500" />
              <span>New Loan Application</span>
            </button>

            <button
              onClick={() => {
                if (contracts.length > 0) {
                  setSelectedContract(contracts[0]);
                  setPayAmount(contracts[0].monthlyAmortization || 38500);
                  setIsPostPaymentOpen(true);
                }
              }}
              className="button-shimmer bg-racing-red hover:bg-white hover:text-black text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-sm transition flex items-center gap-2 shadow-[0_0_15px_rgba(225,6,0,0.3)] cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Post Payment</span>
            </button>
          </div>
        </header>

        {/* Main Workspace Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* ================================================================= */}
          {/* TAB 1: EXECUTIVE FINANCING OVERVIEW                               */}
          {/* ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Top 4 Financing KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#101017] border border-white/10 hover:border-red-600/50 transition p-5 rounded-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      ACTIVE LOAN PORTFOLIO
                    </span>
                    <Wallet className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-3xl font-black italic text-white tracking-tight">
                    ₱{(totalFinancedPortfolio / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">
                    Across <strong className="text-white">{contracts.length}</strong> active chattel contracts
                  </p>
                </div>

                <div className="bg-[#101017] border border-white/10 hover:border-red-600/50 transition p-5 rounded-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      TOTAL COLLECTED TO DATE
                    </span>
                    <Banknote className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-3xl font-black italic text-emerald-400 tracking-tight">
                    ₱{(totalCollected / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">
                    <strong className="text-emerald-400">
                      {Math.round((totalCollected / totalFinancedPortfolio) * 100)}%
                    </strong>{' '}
                    principal & interest realized
                  </p>
                </div>

                <div className="bg-[#101017] border border-white/10 hover:border-red-600/50 transition p-5 rounded-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      OUTSTANDING RECEIVABLES
                    </span>
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-3xl font-black italic text-white tracking-tight">
                    ₱{(totalReceivables / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">
                    Backed by <strong className="text-white">123</strong> warehoused PDC checks
                  </p>
                </div>

                <div className="bg-[#101017] border border-red-600/40 hover:border-red-500 transition p-5 rounded-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                      UNDERWRITING QUEUE
                    </span>
                    <FileCheck className="w-4 h-4 text-red-500" />
                  </div>
                  <p className="text-3xl font-black italic text-red-500 tracking-tight">
                    {applications.length} APPS
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-2">
                    <strong className="text-white">
                      {applications.filter((a) => a.status === 'credit-investigation').length}
                    </strong>{' '}
                    under CI •{' '}
                    <strong className="text-emerald-400">
                      {applications.filter((a) => a.status === 'approved' || a.status === 'for-release').length}
                    </strong>{' '}
                    approved
                  </p>
                </div>
              </div>

              {/* Underwriting Pipeline Snapshot */}
              <div className="bg-[#101017] border border-white/10 rounded-sm p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                      // CREDIT & UNDERWRITING PIPELINE
                    </span>
                    <h2 className="text-lg font-black italic uppercase text-white mt-0.5">
                      Recent Auto Loan Applications
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('applications')}
                    className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Manage All Applications ({applications.length})</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0a0a0e] text-[10px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Ref / Applicant</th>
                        <th className="py-3 px-4">Vehicle Unit</th>
                        <th className="py-3 px-4 font-mono">Equity (DP)</th>
                        <th className="py-3 px-4 font-mono">Loan Principal</th>
                        <th className="py-3 px-4 font-mono">Est. Monthly</th>
                        <th className="py-3 px-4">Financing Partner</th>
                        <th className="py-3 px-4">Stage</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applications.slice(0, 4).map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-white block">{app.applicantName}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {app.appNumber} • Credit Score: <strong className="text-white">{app.creditScore}</strong>
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-slate-200 font-medium block">{app.vehicleName}</span>
                            <span className="text-[10px] font-mono text-slate-500">
                              SRP: ₱{app.vehiclePrice.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-white font-bold">₱{app.downPaymentAmount.toLocaleString()}</span>
                            <span className="text-[10px] text-red-400 block">{app.downPaymentPercent}% Down</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-300">
                            ₱{app.loanAmount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-white font-bold">₱{app.monthlyAmortization.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-500 block">
                              {app.termMonths} mos @ {app.interestRatePa}%
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-medium">
                            {app.financingChannel}
                          </td>
                          <td className="py-3.5 px-4">{renderAppStatusBadge(app.status)}</td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="bg-white/5 hover:bg-racing-red text-slate-200 hover:text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-white/10 transition cursor-pointer"
                            >
                              Evaluate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Active Loan Portfolio & Overdue Watchlist Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Active Loan Accounts (7 cols) */}
                <div className="lg:col-span-7 bg-[#101017] border border-white/10 rounded-sm p-6 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                        // CHATTEL MORTGAGE PORTFOLIO
                      </span>
                      <h3 className="text-base font-black italic uppercase text-white mt-0.5">
                        Active Client Amortization Accounts
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('contracts')}
                      className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-white cursor-pointer"
                    >
                      Full Ledger →
                    </button>
                  </div>

                  <div className="divide-y divide-white/5">
                    {contracts.map((c) => {
                      const pct = Math.round((c.totalAmountPaid / c.totalPayableWithInterest) * 100);
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedContract(c)}
                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 -mx-2 rounded-sm transition cursor-pointer"
                        >
                          <div>
                            <div className="flex items-center gap-2.5">
                              <span className="text-xs font-bold text-white uppercase">{c.clientName}</span>
                              {renderContractStatusBadge(c.status)}
                            </div>
                            <p className="text-xs text-slate-400 font-mono mt-1">
                              {c.vehicleName} • Plate: <strong className="text-white">{c.plateNumber}</strong> ({c.monthsPaid}/{c.termMonths} mos)
                            </p>
                          </div>

                          <div className="flex items-center gap-6 font-mono text-xs">
                            <div className="text-left sm:text-right">
                              <span className="text-[9px] text-slate-500 block uppercase">PAID ({pct}%)</span>
                              <span className="font-bold text-emerald-400">
                                ₱{c.totalAmountPaid.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-left sm:text-right">
                              <span className="text-[9px] text-slate-500 block uppercase">BALANCE</span>
                              <span className="font-bold text-white">
                                ₱{c.remainingBalance.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Partner Bank & Credit Line Breakdown (5 cols) */}
                <div className="lg:col-span-5 bg-[#101017] border border-white/10 rounded-sm p-6 space-y-4">
                  <div className="pb-3 border-b border-white/10">
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                      // FINANCING CHANNELS
                    </span>
                    <h3 className="text-base font-black italic uppercase text-white mt-0.5">
                      Bank Partner Facility Volume
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs">
                    {[
                      { bank: 'BDO Unibank Auto Loans', rate: '6.5% p.a.', share: 38, volume: '₱10.8M', Turnaround: '24 Hours' },
                      { bank: 'BPI Family Auto Loan', rate: '6.2% p.a.', share: 32, volume: '₱9.1M', Turnaround: '24-48 Hours' },
                      { bank: 'Security Bank Fast Track', rate: '6.8% p.a.', share: 18, volume: '₱5.1M', Turnaround: '15 Min Pre-App' },
                      { bank: 'DriveFlow In-House Credit', rate: '9.5% p.a.', share: 12, volume: '₱3.4M', Turnaround: 'Same-Day Release' },
                    ].map((b) => (
                      <div key={b.bank} className="p-3 bg-[#0a0a0e] border border-white/5 rounded-sm space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white uppercase">{b.bank}</span>
                          <span className="font-mono text-red-400 font-bold">{b.volume}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-sm overflow-hidden">
                          <div
                            className="h-full bg-racing-red"
                            style={{ width: `${b.share}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>Base Rate: {b.rate}</span>
                          <span>SLA: {b.Turnaround}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: LOAN APPLICATIONS & CREDIT UNDERWRITING                    */}
          {/* ================================================================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="bg-[#101017] border border-white/10 p-4 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applicant name, loan ref #, vehicle, or bank..."
                    className="w-full bg-[#0a0a0e] border border-white/10 text-xs text-white pl-10 pr-4 py-2.5 rounded-sm outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: 'All Applications' },
                    { id: 'credit-investigation', label: 'Under CI Audit' },
                    { id: 'bank-endorsed', label: 'Bank Endorsed' },
                    { id: 'approved', label: 'Approved' },
                    { id: 'for-release', label: 'For Release' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAppStatusFilter(tab.id)}
                      className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm transition cursor-pointer ${
                        appStatusFilter === tab.id
                          ? 'bg-racing-red text-white'
                          : 'bg-[#0a0a0e] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications Table */}
              <div className="bg-[#101017] border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0a0a0e] text-[10px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Loan Ref & Applicant</th>
                        <th className="py-3.5 px-4">Income & Credit</th>
                        <th className="py-3.5 px-4">Financed Vehicle</th>
                        <th className="py-3.5 px-4 font-mono">Down Payment</th>
                        <th className="py-3.5 px-4 font-mono">Loan & Monthly</th>
                        <th className="py-3.5 px-4">Bank Channel</th>
                        <th className="py-3.5 px-4">Underwriting Status</th>
                        <th className="py-3.5 px-4 text-right">Dossier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-4 px-4">
                            <span className="font-bold text-white block text-sm">{app.applicantName}</span>
                            <span className="text-[11px] font-mono text-red-400">{app.appNumber}</span>
                            <span className="text-[10px] font-mono text-slate-500 block">{app.phone}</span>
                          </td>
                          <td className="py-4 px-4 font-mono">
                            <span className="text-white font-bold block">
                              ₱{app.monthlyIncome.toLocaleString()}/mo
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Score: <strong className="text-emerald-400">{app.creditScore}</strong> • CMAP: {app.cmapStatus}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-white font-medium block">{app.vehicleName}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Unit Price: ₱{app.vehiclePrice.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono">
                            <span className="text-white font-bold block">
                              ₱{app.downPaymentAmount.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-red-400">{app.downPaymentPercent}% Equity</span>
                          </td>
                          <td className="py-4 px-4 font-mono">
                            <span className="text-emerald-400 font-bold block">
                              ₱{app.monthlyAmortization.toLocaleString()}/mo
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {app.termMonths} mos • {app.interestRatePa}% p.a.
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-200 font-medium block">{app.financingChannel}</span>
                            <span className="text-[10px] font-mono text-slate-500">
                              Officer: {app.assignedOfficer}
                            </span>
                          </td>
                          <td className="py-4 px-4">{renderAppStatusBadge(app.status)}</td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="bg-white/5 hover:bg-racing-red text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm border border-white/10 transition cursor-pointer"
                            >
                              Open File
                            </button>
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
          {/* TAB 3: ACTIVE CONTRACTS & AMORTIZATION LEDGERS                    */}
          {/* ================================================================= */}
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              
              {/* Search & Status Filters */}
              <div className="bg-[#101017] border border-white/10 p-4 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search borrower, account #, plate #, or vehicle..."
                    className="w-full bg-[#0a0a0e] border border-white/10 text-xs text-white pl-10 pr-4 py-2.5 rounded-sm outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: 'All Contracts' },
                    { id: 'good-standing', label: 'Good Standing' },
                    { id: 'overdue', label: 'Past Due / Overdue' },
                    { id: 'fully-settled', label: 'Fully Settled' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setContractStatusFilter(t.id)}
                      className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-sm transition cursor-pointer ${
                        contractStatusFilter === t.id
                          ? 'bg-racing-red text-white'
                          : 'bg-[#0a0a0e] text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Contracts Table */}
              <div className="bg-[#101017] border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0a0a0e] text-[10px] font-mono text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Borrower & Contract #</th>
                        <th className="py-3.5 px-4">Collateral Vehicle</th>
                        <th className="py-3.5 px-4 font-mono">Total Payable</th>
                        <th className="py-3.5 px-4 font-mono">Paid To Date</th>
                        <th className="py-3.5 px-4 font-mono">Remaining Balance</th>
                        <th className="py-3.5 px-4 font-mono">Term Progress</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredContracts.map((c) => {
                        const pct = Math.round((c.totalAmountPaid / c.totalPayableWithInterest) * 100);
                        return (
                          <tr key={c.id} className="hover:bg-white/[0.02] transition">
                            <td className="py-4 px-4">
                              <span className="font-bold text-white block text-sm">{c.clientName}</span>
                              <span className="text-[11px] font-mono text-red-400">{c.accountNumber}</span>
                              <span className="text-[10px] font-mono text-slate-500 block">{c.financingBank}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-white font-medium block">{c.vehicleName}</span>
                              <span className="text-[10px] font-mono text-slate-400">
                                Plate: <strong className="text-white">{c.plateNumber}</strong> • VIN: {c.vinNumber}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-mono">
                              <span className="font-bold text-white block">
                                ₱{c.totalPayableWithInterest.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                DP: ₱{c.downPaymentPaid.toLocaleString()}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-mono">
                              <span className="font-bold text-emerald-400 block">
                                ₱{c.totalAmountPaid.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400">{pct}% settled</span>
                            </td>
                            <td className="py-4 px-4 font-mono">
                              <span className="font-bold text-white block">
                                ₱{c.remainingBalance.toLocaleString()}
                              </span>
                              {c.monthlyAmortization > 0 && (
                                <span className="text-[10px] text-red-400">
                                  ₱{c.monthlyAmortization.toLocaleString()}/mo
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 font-mono">
                              <span className="text-white font-bold block">
                                {c.monthsPaid} / {c.termMonths} Mos
                              </span>
                              <span className="text-[10px] text-slate-400 block">
                                Next: {c.nextDueDate}
                              </span>
                            </td>
                            <td className="py-4 px-4">{renderContractStatusBadge(c.status)}</td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedContract(c)}
                                  className="bg-white/5 hover:bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-white/10 transition cursor-pointer"
                                >
                                  Ledger
                                </button>
                                {c.remainingBalance > 0 && (
                                  <button
                                    onClick={() => {
                                      setSelectedContract(c);
                                      setPayAmount(c.monthlyAmortization);
                                      setIsPostPaymentOpen(true);
                                    }}
                                    className="bg-racing-red hover:bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm transition cursor-pointer"
                                  >
                                    Pay
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: COLLECTIONS, PDC VAULT & OFFICIAL RECEIPTS                 */}
          {/* ================================================================= */}
          {activeTab === 'collections' && (
            <div className="space-y-6">
              
              {/* Delinquency & PDC Summary Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#101017] border border-white/10 p-5 rounded-sm">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    WAREHOUSED PDC CHECKS IN VAULT
                  </span>
                  <p className="text-2xl font-black italic text-white mt-1">
                    {contracts.reduce((s, c) => s + c.pdcVaultCount, 0)} Post-Dated Checks
                  </p>
                  <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                    Next batch clearing: Nov 10 – Nov 15, 2026
                  </span>
                </div>

                <div className="bg-[#101017] border border-red-600/40 p-5 rounded-sm">
                  <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block">
                    PAST DUE / DELINQUENT ACCOUNTS
                  </span>
                  <p className="text-2xl font-black italic text-red-500 mt-1">
                    {overdueContracts.length} Account Past Due
                  </p>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    Engr. Mateo De Leon — ₱31,200 (Oct 04 Due)
                  </span>
                </div>

                <div className="bg-[#101017] border border-white/10 p-5 rounded-sm">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                    OFFICIAL RECEIPTS ISSUED
                  </span>
                  <p className="text-2xl font-black italic text-emerald-400 mt-1">
                    {allTransactions.length} Verified OR Logs
                  </p>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    100% reconciled with BDO & BPI settlement accounts
                  </span>
                </div>
              </div>

              {/* Master Official Receipt Transaction Log */}
              <div className="bg-[#101017] border border-white/10 rounded-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                      // CASHIER & SETTLEMENT LEDGER
                    </span>
                    <h2 className="text-lg font-black italic uppercase text-white mt-0.5">
                      Official Receipt (OR) Collection Logs
                    </h2>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#0a0a0e] text-[10px] text-slate-400 uppercase border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">OR Number</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Borrower & Account</th>
                        <th className="py-3 px-4">Payment Classification</th>
                        <th className="py-3 px-4">Clearing Channel</th>
                        <th className="py-3 px-4">Amount Remitted</th>
                        <th className="py-3 px-4 text-right">Installment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-bold text-red-400">{tx.orNumber}</td>
                          <td className="py-3.5 px-4 text-slate-300">
                            <div>{tx.date}</div>
                            <div className="text-[10px] text-slate-500">{tx.time}</div>
                          </td>
                          <td className="py-3.5 px-4 font-sans">
                            <span className="font-bold text-white block">{tx.clientName}</span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {tx.accountNumber} • {tx.vehicleName}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-200">{tx.type}</td>
                          <td className="py-3.5 px-4">
                            <span className="text-slate-300 block">{tx.method}</span>
                            <span className="text-[10px] text-slate-500">Ref: {tx.refNumber}</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400 text-sm">
                            ₱{tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm text-[10px] text-slate-300">
                              {tx.installmentNumber || 'POSTED'}
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
          {/* TAB 5: FINANCING DESK CALCULATOR & INTEREST RATE MATRIX           */}
          {/* ================================================================= */}
          {activeTab === 'calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left: Interactive Loan Structuring Desk (7 cols) */}
              <div className="lg:col-span-7 bg-[#101017] border border-white/10 rounded-sm p-6 space-y-6">
                <div className="pb-4 border-b border-white/10">
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    // DEALERSHIP LOAN DESK
                  </span>
                  <h2 className="text-xl font-black italic uppercase text-white mt-0.5">
                    Auto Loan Computation & Quotation Builder
                  </h2>
                </div>

                <div className="space-y-5 text-xs">
                  {/* Vehicle Selector */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                      1. Select Showroom Vehicle Unit
                    </label>
                    <select
                      value={calcVehicleId}
                      onChange={(e) => setCalcVehicleId(e.target.value)}
                      className="w-full bg-[#0a0a0e] border border-white/15 text-white font-bold p-3.5 rounded-sm outline-none focus:border-red-500 cursor-pointer"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} — {v.price} ({v.categoryLabel})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Financing Type Toggle */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
                      2. Financing Facility Program
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCalcChannel('Bank Partner');
                          setCalcRatePa(6.5);
                        }}
                        className={`p-3.5 rounded-sm border text-left transition cursor-pointer ${
                          calcChannel === 'Bank Partner'
                            ? 'bg-racing-red/15 border-red-500 text-white'
                            : 'bg-[#0a0a0e] border-white/10 text-slate-400'
                        }`}
                      >
                        <span className="font-black uppercase block text-xs">Partner Bank Auto Loan</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          BDO / BPI / Security Bank (6.2% – 7.0% p.a.)
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCalcChannel('In-House Financing');
                          setCalcRatePa(9.5);
                        }}
                        className={`p-3.5 rounded-sm border text-left transition cursor-pointer ${
                          calcChannel === 'In-House Financing'
                            ? 'bg-racing-red/15 border-red-500 text-white'
                            : 'bg-[#0a0a0e] border-white/10 text-slate-400'
                        }`}
                      >
                        <span className="font-black uppercase block text-xs">DriveFlow In-House Credit</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          Fast Same-Day Approval (9.5% p.a.)
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Down Payment Equity Pills */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase mb-2">
                      <span className="text-slate-400 font-bold">3. Down Payment Equity ({calcDpPercent}%)</span>
                      <span className="text-white font-bold">₱{calcDpAmount.toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[15, 20, 30, 40, 50].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setCalcDpPercent(pct)}
                          className={`py-2.5 font-mono font-bold rounded-sm transition cursor-pointer ${
                            calcDpPercent === pct
                              ? 'bg-racing-red text-white'
                              : 'bg-[#0a0a0e] text-slate-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Loan Term Months */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono uppercase mb-2">
                      <span className="text-slate-400 font-bold">4. Amortization Term Tenor</span>
                      <span className="text-white font-bold">{calcTermMonths} Months ({calcTermMonths / 12} Years)</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[12, 24, 36, 48, 60].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setCalcTermMonths(m)}
                          className={`py-2.5 font-mono font-bold rounded-sm transition cursor-pointer ${
                            calcTermMonths === m
                              ? 'bg-racing-red text-white'
                              : 'bg-[#0a0a0e] text-slate-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {m} mos
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Official Computation Output Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#101017] border border-red-600/40 rounded-sm p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="pb-4 border-b border-white/10">
                    <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                      // FORMAL FINANCING QUOTATION
                    </span>
                    <h3 className="text-lg font-black italic uppercase text-white mt-0.5">
                      {selectedCalcVehicle.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      Unit Cash Price: <strong className="text-white">{selectedCalcVehicle.price}</strong>
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Down Payment ({calcDpPercent}%):</span>
                      <span className="text-white font-bold">₱{calcDpAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Chattel Mortgage Fee (Est. 2.2%):</span>
                      <span className="text-slate-200">₱{calcChattelFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">1-Yr Comprehensive Insurance:</span>
                      <span className="text-slate-200">₱{calcInsurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-white/5 px-3 rounded-sm">
                      <span className="text-white font-bold uppercase">Total All-In Cash Outlay:</span>
                      <span className="text-red-400 font-black">₱{calcTotalCashOutlay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 pt-3">
                      <span className="text-slate-400">Amount Financed (Principal):</span>
                      <span className="text-white font-bold">₱{calcLoanPrincipal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Interest Rate Applied:</span>
                      <span className="text-emerald-400 font-bold">{calcRatePa}% p.a. ({calcChannel})</span>
                    </div>
                  </div>

                  <div className="p-5 bg-[#0a0a0e] border border-red-600/40 rounded-sm text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      ESTIMATED MONTHLY AMORTIZATION ({calcTermMonths} MOS)
                    </span>
                    <p className="text-3xl sm:text-4xl font-black italic text-red-500 tracking-tight mt-1">
                      ₱{calcMonthlyAmort.toLocaleString()}
                      <span className="text-xs font-mono text-slate-400 not-italic"> /mo</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setNewAppVehicleId(selectedCalcVehicle.id);
                    setNewAppDpPct(calcDpPercent);
                    setNewAppTerm(calcTermMonths);
                    setIsNewAppOpen(true);
                  }}
                  className="button-shimmer w-full bg-racing-red hover:bg-white hover:text-black text-white font-black uppercase tracking-wider text-xs py-4 rounded-sm transition cursor-pointer"
                >
                  Convert Quote to Loan Application →
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: FINANCED FLEET & COLLATERAL REGISTRY                       */}
          {/* ================================================================= */}
          {activeTab === 'fleet' && (
            <div className="bg-[#101017] border border-white/10 rounded-sm overflow-hidden">
              <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                    // SHOWROOM COLLATERAL UNITS
                  </span>
                  <h2 className="text-lg font-black italic uppercase text-white mt-0.5">
                    Eligible Vehicles for Auto Financing
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {fleet.length} Certified Units in Registry
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0a0a0e] text-[10px] font-mono text-slate-400 uppercase border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4">Stock # & Vehicle</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 font-mono">Unit Cash SRP</th>
                      <th className="py-3.5 px-4 font-mono">Min. Down Payment</th>
                      <th className="py-3.5 px-4 font-mono">Base Monthly</th>
                      <th className="py-3.5 px-4">Financing Status</th>
                      <th className="py-3.5 px-4 text-right">Spec Sheet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {fleet.map((car) => {
                      const minDp = Math.round(car.priceNumeric * (car.minDownPaymentPct / 100));
                      return (
                        <tr key={car.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <img
                              src={car.images[0]}
                              alt={car.name}
                              className="w-16 h-11 object-cover rounded-sm border border-white/10 shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-mono text-red-400 font-bold">{car.stockNumber}</span>
                              <span className="font-bold text-white block">{car.name}</span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {car.year} • {car.mileage}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm text-[10px] font-mono uppercase text-slate-300">
                              {car.categoryLabel}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {car.price}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-white font-bold block">₱{minDp.toLocaleString()}</span>
                            <span className="text-[10px] text-slate-500">({car.minDownPaymentPct}% Min Equity)</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-red-400 font-bold">
                            {car.monthly}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={car.financingStatus}
                              onChange={(e: any) => {
                                const val = e.target.value;
                                setFleet((prev) =>
                                  prev.map((item) =>
                                    item.id === car.id ? { ...item, financingStatus: val } : item
                                  )
                                );
                                triggerToast(`${car.stockNumber} collateral status updated.`);
                              }}
                              className="bg-[#0a0a0e] border border-white/15 text-[11px] font-mono text-white px-2.5 py-1.5 rounded-sm outline-none cursor-pointer"
                            >
                              <option value="available">Available for Loan</option>
                              <option value="under-ci">Reserved / Under CI</option>
                              <option value="encumbered">Released / Encumbered</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Link
                              href={`/vehicles/${car.id}`}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/15 text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-sm border border-white/10 transition"
                            >
                              <Eye className="w-3.5 h-3.5 text-red-500" />
                              <span>View</span>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: LOAN APPLICATION UNDERWRITING DOSSIER                            */}
      {/* ========================================================================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-white/15 rounded-sm max-w-2xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  // CREDIT UNDERWRITING FILE • {selectedApp.appNumber}
                </span>
                <h2 className="text-xl font-black italic uppercase text-white mt-0.5">
                  {selectedApp.applicantName}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {selectedApp.employmentType} • Gross Income: ₱{selectedApp.monthlyIncome.toLocaleString()}/mo
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Loan Structure Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0a0a0e] p-4 border border-white/10 rounded-sm font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">UNIT APPLIED</span>
                <span className="text-white font-bold block mt-0.5 truncate">{selectedApp.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">DOWN PAYMENT ({selectedApp.downPaymentPercent}%)</span>
                <span className="text-red-400 font-bold block mt-0.5">₱{selectedApp.downPaymentAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">AMOUNT FINANCED</span>
                <span className="text-white font-bold block mt-0.5">₱{selectedApp.loanAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">MONTHLY ({selectedApp.termMonths}M)</span>
                <span className="text-emerald-400 font-bold block mt-0.5">₱{selectedApp.monthlyAmortization.toLocaleString()}</span>
              </div>
            </div>

            {/* Credit & Document Checklist */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                DOCUMENTARY & KYC COMPLIANCE CHECKLIST
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { label: '2 Valid Gov IDs & TIN Verification', ok: selectedApp.docsSubmitted.validIds },
                  { label: 'ITR Form 2316 / Latest 3 Mos Payslips', ok: selectedApp.docsSubmitted.incomeProof },
                  { label: '3 Months Certified Bank Statements', ok: selectedApp.docsSubmitted.bankStatements },
                  { label: 'Proof of Billing & Residence Sketch', ok: selectedApp.docsSubmitted.proofOfBilling },
                ].map((doc) => (
                  <div
                    key={doc.label}
                    className="p-3 bg-[#0a0a0e] border border-white/10 rounded-sm flex items-center justify-between"
                  >
                    <span className="text-slate-200">{doc.label}</span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm ${
                        doc.ok ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {doc.ok ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Underwriting Decision Controls */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAdvanceAppStatus(selectedApp.id, 'bank-endorsed')}
                  className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase px-3.5 py-2.5 rounded-sm border border-white/10 transition cursor-pointer"
                >
                  Endorse to Bank
                </button>
                <button
                  onClick={() => handleAdvanceAppStatus(selectedApp.id, 'approved')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-sm transition cursor-pointer"
                >
                  Approve Credit Line
                </button>
                <button
                  onClick={() => handleAdvanceAppStatus(selectedApp.id, 'for-release')}
                  className="bg-racing-red hover:bg-red-500 text-white text-xs font-black uppercase px-4 py-2.5 rounded-sm transition cursor-pointer"
                >
                  Clear For Release
                </button>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ACTIVE CONTRACT AMORTIZATION LEDGER                              */}
      {/* ========================================================================= */}
      {selectedContract && !isSOAOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#101017] border border-white/15 rounded-sm max-w-3xl w-full p-6 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  // CHATTEL MORTGAGE CONTRACT • {selectedContract.accountNumber}
                </span>
                <h2 className="text-xl font-black italic uppercase text-white mt-0.5">
                  {selectedContract.clientName}
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  {selectedContract.vehicleName} • Plate: <strong className="text-white">{selectedContract.plateNumber}</strong> • {selectedContract.financingBank}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSOAOpen(true)}
                  className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm border border-white/15 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-red-500" />
                  <span>Print SOA</span>
                </button>
                <button
                  onClick={() => setSelectedContract(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3-Pillar Financial Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0a0a0e] p-4 border border-white/10 rounded-sm font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">TOTAL CONTRACT PAYABLE</span>
                <span className="text-lg font-black text-white block mt-0.5">
                  ₱{selectedContract.totalPayableWithInterest.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">
                  DP Paid: ₱{selectedContract.downPaymentPaid.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 uppercase block">TOTAL AMOUNT REMITTED</span>
                <span className="text-lg font-black text-emerald-400 block mt-0.5">
                  ₱{selectedContract.totalAmountPaid.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400">
                  {selectedContract.monthsPaid} of {selectedContract.termMonths} installments paid
                </span>
              </div>
              <div>
                <span className="text-[10px] text-red-400 uppercase block">REMAINING LOAN BALANCE</span>
                <span className="text-lg font-black text-white block mt-0.5">
                  ₱{selectedContract.remainingBalance.toLocaleString()}
                </span>
                <span className="text-[10px] text-red-400">
                  Monthly: ₱{selectedContract.monthlyAmortization.toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Payment Ledger Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black italic uppercase text-white">
                  Official Receipt (OR) Amortization History
                </span>
                {selectedContract.remainingBalance > 0 && (
                  <button
                    onClick={() => {
                      setPayAmount(selectedContract.monthlyAmortization);
                      setIsPostPaymentOpen(true);
                    }}
                    className="bg-racing-red hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-sm transition cursor-pointer"
                  >
                    + Post Payment
                  </button>
                )}
              </div>

              <div className="border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0a0a0e] text-[10px] text-slate-400 uppercase border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3.5">OR #</th>
                      <th className="py-2.5 px-3.5">Date</th>
                      <th className="py-2.5 px-3.5">Installment</th>
                      <th className="py-2.5 px-3.5">Channel & Ref</th>
                      <th className="py-2.5 px-3.5 text-right">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {selectedContract.paymentHistory.map((tx) => (
                      <tr key={tx.id}>
                        <td className="py-2.5 px-3.5 font-bold text-red-400">{tx.orNumber}</td>
                        <td className="py-2.5 px-3.5 text-slate-300">{tx.date}</td>
                        <td className="py-2.5 px-3.5 text-white">{tx.installmentNumber || tx.type}</td>
                        <td className="py-2.5 px-3.5 text-slate-400">
                          {tx.method} ({tx.refNumber})
                        </td>
                        <td className="py-2.5 px-3.5 text-right font-bold text-emerald-400">
                          ₱{tx.amount.toLocaleString()}
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
      {/* MODAL 3: POST AMORTIZATION PAYMENT                                        */}
      {/* ========================================================================= */}
      {isPostPaymentOpen && selectedContract && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101017] border border-red-600/50 rounded-sm max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  // OFFICIAL RECEIPT ISSUANCE
                </span>
                <h3 className="text-base font-black italic uppercase text-white">
                  Post Amortization Payment
                </h3>
              </div>
              <button onClick={() => setIsPostPaymentOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostPayment} className="space-y-4 text-xs">
              <div className="p-3 bg-[#0a0a0e] border border-white/10 rounded-sm font-mono space-y-1">
                <div className="text-white font-bold">{selectedContract.clientName}</div>
                <div className="text-slate-400 text-[11px]">{selectedContract.vehicleName}</div>
                <div className="text-red-400 text-[11px]">
                  Remaining Balance: ₱{selectedContract.remainingBalance.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Amount Remitted (PHP)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white font-mono font-bold text-sm outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Settlement Channel
                </label>
                <select
                  value={payMethod}
                  onChange={(e: any) => setPayMethod(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white outline-none cursor-pointer"
                >
                  <option value="PDC Check Clearing (BPI)">PDC Check Clearing (BPI)</option>
                  <option value="Bank Wire (BDO)">Bank Wire (BDO)</option>
                  <option value="InstaPay / PESONet">InstaPay / PESONet</option>
                  <option value="Auto-Debit Arrangement">Auto-Debit Arrangement</option>
                  <option value="Showroom Cashier">Showroom Cashier</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Check # / Bank Reference #
                </label>
                <input
                  type="text"
                  placeholder="e.g. CHK-BPI-004425"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white font-mono outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPostPaymentOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-racing-red hover:bg-white hover:text-black text-white font-black uppercase tracking-wider px-5 py-2.5 rounded-sm transition cursor-pointer"
                >
                  Issue OR & Update Balance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: NEW LOAN APPLICATION                                             */}
      {/* ========================================================================= */}
      {isNewAppOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101017] border border-white/15 rounded-sm max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  // CREDIT ORIGINATION
                </span>
                <h3 className="text-lg font-black italic uppercase text-white">
                  Encode Auto Loan Application
                </h3>
              </div>
              <button onClick={() => setIsNewAppOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Applicant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Atty. Marco Villareal"
                    value={newAppClient}
                    onChange={(e) => setNewAppClient(e.target.value)}
                    className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Mobile Contact
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+63 917 000 0000"
                    value={newAppPhone}
                    onChange={(e) => setNewAppPhone(e.target.value)}
                    className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Vehicle Unit to Finance
                </label>
                <select
                  value={newAppVehicleId}
                  onChange={(e) => setNewAppVehicleId(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white outline-none cursor-pointer"
                >
                  {VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} — {v.price}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Down Payment %
                  </label>
                  <select
                    value={newAppDpPct}
                    onChange={(e) => setNewAppDpPct(Number(e.target.value))}
                    className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white font-mono"
                  >
                    {[15, 20, 25, 30, 40, 50].map((p) => (
                      <option key={p} value={p}>{p}% Equity</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Term Tenor
                  </label>
                  <select
                    value={newAppTerm}
                    onChange={(e) => setNewAppTerm(Number(e.target.value))}
                    className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white font-mono"
                  >
                    {[12, 24, 36, 48, 60].map((t) => (
                      <option key={t} value={t}>{t} Months</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                    Monthly Income
                  </label>
                  <input
                    type="number"
                    value={newAppIncome}
                    onChange={(e) => setNewAppIncome(Number(e.target.value))}
                    className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
                  Financing Channel
                </label>
                <select
                  value={newAppChannel}
                  onChange={(e: any) => setNewAppChannel(e.target.value)}
                  className="w-full bg-[#0a0a0e] border border-white/15 p-3 rounded-sm text-white"
                >
                  <option value="BDO Unibank Auto Loan">BDO Unibank Auto Loan</option>
                  <option value="BPI Auto Loan">BPI Auto Loan</option>
                  <option value="Security Bank">Security Bank</option>
                  <option value="EastWest Bank">EastWest Bank</option>
                  <option value="DriveFlow In-House">DriveFlow In-House Financing</option>
                </select>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewAppOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-racing-red hover:bg-white hover:text-black text-white font-black uppercase tracking-wider px-5 py-2.5 rounded-sm transition cursor-pointer"
                >
                  Submit to Underwriting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: PRINTABLE STATEMENT OF ACCOUNT (SOA)                             */}
      {/* ========================================================================= */}
      {isSOAOpen && selectedContract && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101017] border border-white/15 rounded-sm max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                // OFFICIAL STATEMENT OF ACCOUNT (SOA)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-racing-red hover:bg-red-500 text-white text-xs font-black uppercase px-3.5 py-1.5 rounded-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print SOA</span>
                </button>
                <button onClick={() => setIsSOAOpen(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between">
                <div>
                  <strong className="text-white text-sm block font-sans font-black italic uppercase">
                    DRIVEFLOW FINANCIAL SERVICES MANILA
                  </strong>
                  <span className="text-slate-400 text-[11px]">
                    BGC & Circuit Makati • Chattel Mortgage Division
                  </span>
                </div>
                <div className="text-right text-slate-400 text-[11px]">
                  <span>Contract: {selectedContract.accountNumber}</span>
                  <span className="block">Date: Oct 16, 2026</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#0a0a0e] border border-white/10 rounded-sm space-y-1">
                <div className="text-white font-bold">{selectedContract.clientName}</div>
                <div className="text-slate-300">
                  {selectedContract.vehicleName} (Plate: {selectedContract.plateNumber} • VIN: {selectedContract.vinNumber})
                </div>
                <div className="text-[11px] text-slate-500">{selectedContract.billingAddress}</div>
              </div>

              <div className="space-y-2 border-y border-white/10 py-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Contract Financed Payable:</span>
                  <span className="text-white font-bold">
                    ₱{selectedContract.totalPayableWithInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Payments Credited to Date:</span>
                  <span className="text-emerald-400 font-bold">
                    - ₱{selectedContract.totalAmountPaid.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                  <span className="text-white">OUTSTANDING PAYOFF BALANCE:</span>
                  <span className="text-red-400">₱{selectedContract.remainingBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
