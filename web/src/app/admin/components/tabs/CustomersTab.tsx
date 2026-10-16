'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Building,
  CreditCard,
  Calendar,
  FileSpreadsheet,
  Clock,
  Send,
  X,
  Eye,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Receipt,
  UserCheck,
  MoreVertical,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import {
  Customer,
  FinancingApplication,
  Appointment,
  SaleRecord,
  CustomerNote,
} from '../../types';

interface CustomersTabProps {
  customers: Customer[];
  applications: FinancingApplication[];
  appointments: Appointment[];
  sales: SaleRecord[];
  onAddCustomer: (customer: Omit<Customer, 'id' | 'createdDate' | 'notes'>) => void;
  onAddNote: (customerId: string, noteText: string) => void;
  currencySymbol: string;
}

export const CustomersTab: React.FC<CustomersTabProps> = ({
  customers,
  applications,
  appointments,
  sales,
  onAddCustomer,
  onAddNote,
  currencySymbol,
}) => {
  const [search, setSearch] = useState('');
  const [creditFilter, setCreditFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'name' | 'purchases' | 'income'>('purchases');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected customer for dossier view
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'overview' | 'financing' | 'appointments' | 'notes' | 'purchases'>('overview');
  const [newNoteText, setNewNoteText] = useState('');

  // Dropdown actions state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.customer-action-menu')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Add customer modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTin, setFormTin] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formEmployer, setFormEmployer] = useState('');
  const [formIncome, setFormIncome] = useState(300000);
  const [formCreditTier, setFormCreditTier] = useState<Customer['creditTier']>('Tier 1 - Excellent (750+)');
  const [formAgent, setFormAgent] = useState('Janrey Mina');

  // Helper to extract customer initials
  const getInitials = (name: string) => {
    const clean = name.replace(/^(Arch\.|Dr\.|Capt\.|Atty\.|Mr\.|Ms\.|Mrs\.)\s+/i, '');
    const parts = clean.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  // Top KPI metrics calculations
  const totalClientsCount = customers.length;
  const totalPurchasesValue = useMemo(() => {
    return customers.reduce((acc, c) => acc + (c.totalPurchases || 0), 0);
  }, [customers]);

  const tier1Count = useMemo(() => {
    return customers.filter((c) => c.creditTier.includes('Tier 1')).length;
  }, [customers]);

  const activeTouchpointsCount = useMemo(() => {
    return applications.length + appointments.length;
  }, [applications, appointments]);

  // Unique tags for filter dropdown
  const allTags = useMemo(() => {
    const set = new Set<string>();
    customers.forEach((c) => c.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [customers]);

  // Filtered and sorted customers
  const filteredCustomers = useMemo(() => {
    let result = customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.employer.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchCredit = creditFilter === 'all' || c.creditTier.includes(creditFilter);
      const matchTag = tagFilter === 'all' || (c.tags && c.tags.includes(tagFilter));
      return matchSearch && matchCredit && matchTag;
    });

    if (sortBy === 'purchases') {
      result = [...result].sort((a, b) => (b.totalPurchases || 0) - (a.totalPurchases || 0));
    } else if (sortBy === 'income') {
      result = [...result].sort((a, b) => b.monthlyIncome - a.monthlyIncome);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [customers, search, creditFilter, tagFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomer({
      name: formName,
      email: formEmail,
      phone: formPhone,
      tin: formTin || '000-000-000-000',
      address: formAddress || 'Metro Manila',
      city: 'Metro Manila',
      employer: formEmployer,
      monthlyIncome: Number(formIncome),
      creditTier: formCreditTier,
      assignedAgent: formAgent,
      branchId: 'main',
      tags: ['New Lead', 'Showroom Prospect'],
      totalPurchases: 0,
      lastContactDate: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(false);
    // Reset form
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormTin('');
    setFormAddress('');
    setFormEmployer('');
    setFormIncome(300000);
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !newNoteText.trim()) return;
    onAddNote(selectedCustomer.id, newNoteText);
    setSelectedCustomer({
      ...selectedCustomer,
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Janrey Mina',
          role: 'Managing Director',
          date: new Date().toLocaleString(),
          content: newNoteText,
        },
        ...selectedCustomer.notes,
      ],
    });
    setNewNoteText('');
  };

  // Helper for customer linked items in dossier
  const getCustomerApplications = (customerId: string) => {
    return applications.filter((a) => a.customerId === customerId);
  };

  const getCustomerAppointments = (customerName: string) => {
    return appointments.filter((a) => a.customerName.toLowerCase().includes(customerName.toLowerCase()));
  };

  const getCustomerSales = (customerId: string) => {
    return sales.filter((s) => s.customerId === customerId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Customer Relationship Management (CRM)</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({totalClientsCount} clients)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain client KYC dossiers, credit investigation tiers, linked financing applications, and dealership touchpoints.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          Add Customer Record
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Total Clients
            </span>
            <div className="text-2xl font-bold text-white mt-1">
              {totalClientsCount}
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 inline-flex items-center gap-1">
              <UserCheck className="w-3 h-3" /> Active KYC Profiles
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <Users className="w-5 h-5 text-red-500" />
          </div>
        </div>

        {/* Lifetime Value */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Total Dealership Volume
            </span>
            <div className="text-2xl font-bold text-white mt-1 font-mono">
              {currencySymbol}{totalPurchasesValue.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> Cumulative Sales Value
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <Receipt className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Prime Tier 1 Clients */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Tier 1 Prime Buyers
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span>{tier1Count}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">
                ({totalClientsCount > 0 ? Math.round((tier1Count / totalClientsCount) * 100) : 0}%)
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> 750+ Credit Score
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Active Touchpoints */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Active Touchpoints
            </span>
            <div className="text-2xl font-bold text-white mt-1">
              {activeTouchpointsCount}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sky-400" /> Linked Loans & Appts
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <FileSpreadsheet className="w-5 h-5 text-sky-400" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121624] p-3.5 rounded-none border border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Left edge search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search client name, phone, email, employer, city..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Credit Tier Filter */}
          <select
            value={creditFilter}
            onChange={(e) => {
              setCreditFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Credit Tiers</option>
            <option value="Tier 1">Tier 1 - Excellent (750+)</option>
            <option value="Tier 2">Tier 2 - Good (680-749)</option>
            <option value="Tier 3">Tier 3 - Fair (600-679)</option>
          </select>

          {/* Tags Filter */}
          <select
            value={tagFilter}
            onChange={(e) => {
              setTagFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Segments / Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="purchases">Sort: Highest Purchases</option>
            <option value="income">Sort: Monthly Income</option>
            <option value="name">Sort: Client Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Client Dossier</th>
                <th className="py-3 px-3">Contact & Address</th>
                <th className="py-3 px-3">Employer / Monthly Income</th>
                <th className="py-3 px-3">Assigned Agent</th>
                <th className="py-3 px-3">Total Purchases</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No client records match your current filters.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust, idx) => {
                  const isNearBottom = idx >= paginatedCustomers.length - 2 && paginatedCustomers.length > 2;

                  return (
                    <tr key={cust.id} className="hover:bg-slate-800/40 transition">
                      {/* Client Dossier & Initials */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {getInitials(cust.name)}
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomer(cust);
                                setActiveDossierTab('overview');
                              }}
                              className="font-bold text-white hover:text-red-400 transition text-left cursor-pointer"
                            >
                              {cust.name}
                            </button>
                            <div className="text-[10px] text-slate-400 mt-1 flex flex-wrap gap-1">
                              {cust.tags.map((t, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="bg-slate-800/90 text-slate-300 border border-slate-700/60 px-1.5 py-0.5 rounded-none text-[9px] font-mono"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact & Address */}
                      <td className="py-3 px-3 text-[11px]">
                        <div className="flex items-center gap-1.5 text-slate-200">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <a
                            href={`tel:${cust.phone}`}
                            className="hover:text-red-400 transition font-mono"
                          >
                            {cust.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <a
                            href={`mailto:${cust.email}`}
                            className="hover:text-white transition truncate max-w-[160px]"
                          >
                            {cust.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="truncate max-w-[160px]">{cust.city}</span>
                        </div>
                      </td>

                      {/* Employer & Income */}
                      <td className="py-3 px-3 text-[11px]">
                        <div className="text-slate-200 font-medium truncate max-w-[180px]" title={cust.employer}>
                          {cust.employer}
                        </div>
                        <div className="text-emerald-400 font-mono font-medium mt-0.5">
                          {currencySymbol}{cust.monthlyIncome.toLocaleString()} / mo
                        </div>
                      </td>

                      {/* Assigned Agent */}
                      <td className="py-3 px-3 text-slate-300 text-[11px]">
                        <div className="font-medium text-slate-200">{cust.assignedAgent}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Lead Advisor</div>
                      </td>

                      {/* Total Purchases */}
                      <td className="py-3 px-3 font-mono font-bold text-white text-[11px]">
                        {cust.totalPurchases > 0 ? (
                          <span className="text-emerald-400">
                            {currencySymbol}{cust.totalPurchases.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* Actions Triple-dot Menu */}
                      <td className="py-3 px-4 text-right">
                        <div className="customer-action-menu relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === cust.id ? null : cust.id);
                            }}
                            className={`p-1.5 rounded-none border transition cursor-pointer flex items-center justify-center ${
                              openDropdownId === cust.id
                                ? 'bg-slate-800 text-white border-slate-600'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title="Actions"
                            aria-label="Customer Actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openDropdownId === cust.id && (
                            <div
                              className={`absolute right-0 w-48 bg-[#121624] border border-slate-700 shadow-2xl z-50 rounded-none py-1 text-xs text-left ${
                                isNearBottom ? 'bottom-full mb-1' : 'top-full mt-1'
                              }`}
                            >
                              <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                Client Actions
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCustomer(cust);
                                  setActiveDossierTab('overview');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer font-medium"
                              >
                                <Eye className="w-3.5 h-3.5 text-red-500" />
                                <span>View Full Dossier</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCustomer(cust);
                                  setActiveDossierTab('notes');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5 text-sky-400" />
                                <span>Add Interaction Note</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCustomer(cust);
                                  setActiveDossierTab('financing');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                              >
                                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                                <span>View Financing ({getCustomerApplications(cust.id).length})</span>
                              </button>

                              <a
                                href={`tel:${cust.phone}`}
                                onClick={() => setOpenDropdownId(null)}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer border-t border-slate-800/80"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>Call Phone</span>
                              </a>

                              <a
                                href={`mailto:${cust.email}`}
                                onClick={() => setOpenDropdownId(null)}
                                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Send Email</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 font-mono text-[11px]">
            Showing <strong className="text-white">{filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-white">
              {Math.min(currentPage * itemsPerPage, filteredCustomers.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredCustomers.length}</strong> clients
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`p-1.5 border rounded-none flex items-center justify-center ${
                currentPage <= 1
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer'
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 font-mono text-[11px] text-slate-400">
              Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`p-1.5 border rounded-none flex items-center justify-center ${
                currentPage >= totalPages
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer'
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Detail Dossier Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs">
            {/* Dossier Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-slate-900 border border-slate-700 text-red-500 font-bold font-mono text-base flex items-center justify-center">
                  {getInitials(selectedCustomer.name)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCustomer.name}</h3>
                  <span className="text-xs font-mono text-slate-400">
                    TIN: {selectedCustomer.tin} • Advisor: {selectedCustomer.assignedAgent}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs with Badges */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
              {[
                { key: 'overview', label: 'Overview', count: null },
                {
                  key: 'financing',
                  label: 'Financing',
                  count: getCustomerApplications(selectedCustomer.id).length,
                },
                {
                  key: 'appointments',
                  label: 'Appointments',
                  count: getCustomerAppointments(selectedCustomer.name).length,
                },
                {
                  key: 'notes',
                  label: 'Notes',
                  count: selectedCustomer.notes?.length || 0,
                },
                {
                  key: 'purchases',
                  label: 'Purchases',
                  count: getCustomerSales(selectedCustomer.id).length,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveDossierTab(tab.key as any)}
                  className={`px-3 py-1.5 rounded-none text-xs font-semibold capitalize transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeDossierTab === tab.key
                      ? 'bg-[#e10600] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span
                      className={`px-1.5 py-0.2 rounded-none text-[10px] font-mono ${
                        activeDossierTab === tab.key
                          ? 'bg-black/30 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Dossier Content */}
            {activeDossierTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-none bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Contact Phone</span>
                    <a
                      href={`tel:${selectedCustomer.phone}`}
                      className="text-white font-bold hover:text-red-400 transition"
                    >
                      {selectedCustomer.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Email Address</span>
                    <a
                      href={`mailto:${selectedCustomer.email}`}
                      className="text-white font-bold hover:text-red-400 transition truncate block"
                    >
                      {selectedCustomer.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Employer / Company</span>
                    <span className="text-slate-200">{selectedCustomer.employer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Declared Income</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {currencySymbol}{selectedCustomer.monthlyIncome.toLocaleString()} / mo
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Registered Address</span>
                    <span className="text-slate-300">{selectedCustomer.address}, {selectedCustomer.city}</span>
                  </div>
                </div>

                {selectedCustomer.interestedVehicleName && (
                  <div className="p-3.5 rounded-none bg-red-950/20 border border-red-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block">Interested Vehicle</span>
                      <span className="font-bold text-white text-sm">{selectedCustomer.interestedVehicleName}</span>
                    </div>
                    <span className="text-xs font-semibold text-red-300 bg-red-500/20 px-2 py-1 rounded-none">Active Inquiry</span>
                  </div>
                )}
              </div>
            )}

            {activeDossierTab === 'financing' && (
              <div className="space-y-3">
                {getCustomerApplications(selectedCustomer.id).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No active loan applications filed for this client.</div>
                ) : (
                  getCustomerApplications(selectedCustomer.id).map((app) => (
                    <div key={app.id} className="p-3.5 rounded-none bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{app.appNumber} - {app.vehicleName}</span>
                        <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                          {app.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                        <div>Loan Amount: <strong className="text-white">{currencySymbol}{app.loanAmount.toLocaleString()}</strong></div>
                        <div>Amortization: <strong className="text-red-500 font-mono">{currencySymbol}{app.monthlyAmortization.toLocaleString()}/mo</strong></div>
                        <div>Bank: <strong className="text-white">{app.financingChannel}</strong></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeDossierTab === 'appointments' && (
              <div className="space-y-3">
                {getCustomerAppointments(selectedCustomer.name).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No scheduled appointments or handovers recorded.</div>
                ) : (
                  getCustomerAppointments(selectedCustomer.name).map((apt) => (
                    <div key={apt.id} className="p-3 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{apt.appointmentType}</div>
                        <div className="text-slate-400 text-[11px]">{apt.vehicleName} • {apt.date} ({apt.timeSlot})</div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-none">
                        {apt.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeDossierTab === 'notes' && (
              <div className="space-y-4">
                {/* Add new note */}
                <form onSubmit={handlePostNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Log internal note, bank discussion, or client follow-up reminder..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-none px-3 py-2 text-white text-xs focus:outline-hidden focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm shadow-red-950/40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post Note
                  </button>
                </form>

                {/* Notes Feed */}
                <div className="space-y-2.5 max-h-60 overflow-y-auto">
                  {selectedCustomer.notes.map((note) => (
                    <div key={note.id} className="p-3 rounded-none bg-slate-900/80 border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[10px] font-mono mb-1">
                        <span className="font-bold text-slate-200">{note.author} ({note.role})</span>
                        <span>{note.date}</span>
                      </div>
                      <p className="text-slate-300">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeDossierTab === 'purchases' && (
              <div className="space-y-3">
                {getCustomerSales(selectedCustomer.id).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No closed sales contracts associated with this customer.</div>
                ) : (
                  getCustomerSales(selectedCustomer.id).map((sale) => (
                    <div key={sale.id} className="p-3.5 rounded-none bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{sale.saleNumber} - {sale.vehicleName}</span>
                        <span className="font-mono text-emerald-400 font-bold">{currencySymbol}{sale.salePrice.toLocaleString()}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex justify-between">
                        <span>Financing: {sale.financingType}</span>
                        <span>Downpayment Paid: {currencySymbol}{sale.downPaymentPaid.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustomer}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Customer Profile</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atty. Patricia Beatrice Lim"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+63 917 000 0000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.ph"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Employer / Business</label>
                  <input
                    type="text"
                    required
                    placeholder="Company or Medical Practice"
                    value={formEmployer}
                    onChange={(e) => setFormEmployer(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Declared Monthly Income (₱)</label>
                  <input
                    type="number"
                    required
                    value={formIncome}
                    onChange={(e) => setFormIncome(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Credit Tier Assessment</label>
                <select
                  value={formCreditTier}
                  onChange={(e) => setFormCreditTier(e.target.value as Customer['creditTier'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="Tier 1 - Excellent (750+)">Tier 1 - Excellent (750+)</option>
                  <option value="Tier 2 - Good (680-749)">Tier 2 - Good (680-749)</option>
                  <option value="Tier 3 - Fair (600-679)">Tier 3 - Fair (600-679)</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Assigned Lead Advisor</label>
                <input
                  type="text"
                  value={formAgent}
                  onChange={(e) => setFormAgent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
