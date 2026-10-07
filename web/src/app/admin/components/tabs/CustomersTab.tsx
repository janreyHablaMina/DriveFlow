'use client';

import React, { useState, useMemo } from 'react';
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
  Receipt,
  UserCheck,
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

  // Selected customer for dossier view
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'overview' | 'financing' | 'appointments' | 'notes' | 'purchases'>('overview');
  const [newNoteText, setNewNoteText] = useState('');

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
  const [formBranchId, setFormBranchId] = useState('main');
  const [formAgent, setFormAgent] = useState('Janrey Mina');

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.employer.toLowerCase().includes(search.toLowerCase());
      const matchCredit = creditFilter === 'all' || c.creditTier.includes(creditFilter);
      return matchSearch && matchCredit;
    });
  }, [customers, search, creditFilter]);

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
      branchId: formBranchId,
      tags: ['New Lead', 'Showroom Prospect'],
      totalPurchases: 0,
      lastContactDate: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(false);
  };

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !newNoteText.trim()) return;
    onAddNote(selectedCustomer.id, newNoteText);
    // Update local selected customer notes
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

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Customer Relationship Management (CRM)</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredCustomers.length} clients)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain client KYC dossiers, credit investigation tiers, linked financing applications, and dealership touchpoints.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          Add Customer Record
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client name, phone, email, employer..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={creditFilter}
            onChange={(e) => setCreditFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Credit Tiers</option>
            <option value="Tier 1">Tier 1 - Excellent (750+)</option>
            <option value="Tier 2">Tier 2 - Good (680-749)</option>
            <option value="Tier 3">Tier 3 - Fair (600-679)</option>
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
                <th className="py-3 px-3">Credit Rating Tier</th>
                <th className="py-3 px-3">Assigned Agent</th>
                <th className="py-3 px-3">Total Purchases</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      {cust.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex flex-wrap gap-1">
                      {cust.tags.map((t, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-none text-[9px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[11px]">
                    <div className="text-slate-200">{cust.phone}</div>
                    <div className="text-slate-400">{cust.email}</div>
                  </td>

                  <td className="py-3 px-3 text-[11px]">
                    <div className="text-slate-200 font-medium truncate max-w-[180px]">{cust.employer}</div>
                    <div className="text-emerald-400 font-mono">
                      {currencySymbol}{cust.monthlyIncome.toLocaleString()} / mo
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border ${
                        cust.creditTier.includes('Tier 1')
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : cust.creditTier.includes('Tier 2')
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {cust.creditTier}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-slate-300 text-[11px]">
                    {cust.assignedAgent}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-white text-[11px]">
                    {cust.totalPurchases > 0 ? `${currencySymbol}${cust.totalPurchases.toLocaleString()}` : '—'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedCustomer(cust);
                        setActiveDossierTab('overview');
                      }}
                      className="px-2.5 py-1 rounded-none bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Dossier Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedCustomer.name}</h3>
                <span className="text-xs font-mono text-slate-400">
                  TIN: {selectedCustomer.tin} • Assigned: {selectedCustomer.assignedAgent}
                </span>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              {(['overview', 'financing', 'appointments', 'notes', 'purchases'] as const).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveDossierTab(tabKey)}
                  className={`px-3 py-1.5 rounded-none text-xs font-semibold capitalize transition cursor-pointer ${
                    activeDossierTab === tabKey
                      ? 'bg-[#e10600] text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tabKey}
                </button>
              ))}
            </div>

            {/* Dossier Content */}
            {activeDossierTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-none bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Contact Phone</span>
                    <span className="text-white font-bold">{selectedCustomer.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] font-mono block">Email Address</span>
                    <span className="text-white font-bold">{selectedCustomer.email}</span>
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
                {applications.filter((a) => a.customerId === selectedCustomer.id).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No active loan applications filed for this client.</div>
                ) : (
                  applications
                    .filter((a) => a.customerId === selectedCustomer.id)
                    .map((app) => (
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
                {appointments.filter((a) => a.customerName.includes(selectedCustomer.name)).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No scheduled test drives or handovers recorded.</div>
                ) : (
                  appointments
                    .filter((a) => a.customerName.includes(selectedCustomer.name))
                    .map((apt) => (
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
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-none px-3 py-2 text-white text-xs focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm shadow-red-950/40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post
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
                {sales.filter((s) => s.customerId === selectedCustomer.id).length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono">No closed sales contracts associated with this customer.</div>
                ) : (
                  sales
                    .filter((s) => s.customerId === selectedCustomer.id)
                    .map((sale) => (
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Declared Monthly Income (₱)</label>
                  <input
                    type="number"
                    required
                    value={formIncome}
                    onChange={(e) => setFormIncome(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Credit Tier Assessment</label>
                <select
                  value={formCreditTier}
                  onChange={(e) => setFormCreditTier(e.target.value as Customer['creditTier'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  <option value="Tier 1 - Excellent (750+)">Tier 1 - Excellent (750+)</option>
                  <option value="Tier 2 - Good (680-749)">Tier 2 - Good (680-749)</option>
                  <option value="Tier 3 - Fair (600-679)">Tier 3 - Fair (600-679)</option>
                  <option value="Under Review">Under Review</option>
                </select>
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

