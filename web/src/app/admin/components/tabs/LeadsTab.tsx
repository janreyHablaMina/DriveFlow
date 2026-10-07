'use client';

import React, { useState, useMemo } from 'react';
import {
  Target,
  Search,
  Plus,
  Phone,
  Mail,
  User,
  ArrowRight,
  TrendingUp,
  Filter,
  DollarSign,
  Clock,
  Sparkles,
  X,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Lead, LeadStage, DealershipBranch, StaffMember } from '../../types';

interface LeadsTabProps {
  leads: Lead[];
  branches: DealershipBranch[];
  staff: StaffMember[];
  onAddLead: (lead: Omit<Lead, 'id' | 'createdDate' | 'lastActivity'>) => void;
  onUpdateLeadStage: (id: string, stage: LeadStage) => void;
  currencySymbol: string;
}

const STAGES: LeadStage[] = ['New Lead', 'Contacted', 'Interested', 'Negotiation', 'Converted', 'Lost'];

export const LeadsTab: React.FC<LeadsTabProps> = ({
  leads,
  branches,
  staff,
  onAddLead,
  onUpdateLeadStage,
  currencySymbol,
}) => {
  const [search, setSearch] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Modals
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formVehicle, setFormVehicle] = useState('2024 Ford Everest Titanium+ 4x4');
  const [formBudget, setFormBudget] = useState(2500000);
  const [formSource, setFormSource] = useState<Lead['source']>('Website Calculator');
  const [formAgent, setFormAgent] = useState('Janrey Mina');
  const [formBranchId, setFormBranchId] = useState(branches[0]?.id || 'bgc');
  const [formNotes, setFormNotes] = useState('');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.interestedVehicle.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);
      const matchBranch = branchFilter === 'all' || lead.branchId === branchFilter;
      const matchSource = sourceFilter === 'all' || lead.source === sourceFilter;
      return matchSearch && matchBranch && matchSource;
    });
  }, [leads, search, branchFilter, sourceFilter]);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead({
      name: formName,
      phone: formPhone,
      email: formEmail,
      interestedVehicle: formVehicle,
      budget: Number(formBudget),
      source: formSource,
      assignedRep: formAgent,
      stage: 'New Lead',
      branchId: formBranchId,
      notes: formNotes || 'Direct digital inquiry via DriveFlow portal.',
    });
    setIsAddLeadModalOpen(false);
  };

  const advanceStage = (leadId: string, currentStage: LeadStage) => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex < STAGES.length - 2) {
      onUpdateLeadStage(leadId, STAGES[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sales Inquiries & Lead Pipeline</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredLeads.length} active leads)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual CRM Kanban tracking digital showroom traffic, website calculator submissions, and sales conversions.
          </p>
        </div>

        <button
          onClick={() => setIsAddLeadModalOpen(true)}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          Create New Lead
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prospect name, car interest, phone..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Lead Sources</option>
            <option value="Website Calculator">Website Financing Calculator</option>
            <option value="Facebook Ads">Facebook & Meta Ads</option>
            <option value="Walk-In Showroom">Walk-In Showroom</option>
            <option value="Referral">VIP Client Referral</option>
          </select>
        </div>

        <div>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === stage);
          return (
            <div
              key={stage}
              className="bg-[#121624] border border-slate-800 rounded-none p-3 flex flex-col justify-between min-h-[480px]"
            >
              <div>
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-none ${
                        stage === 'Converted'
                          ? 'bg-emerald-400'
                          : stage === 'Lost'
                          ? 'bg-slate-500'
                          : stage === 'Negotiation'
                          ? 'bg-purple-400'
                          : stage === 'New Lead'
                          ? 'bg-red-500'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span className="font-bold text-xs text-white">{stage}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded-none">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-2.5">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 rounded-none bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-white text-xs">{lead.name}</span>
                        <span className="text-[9px] font-mono text-red-400 bg-red-500/10 px-1 py-0.2 rounded-none border border-red-500/20 shrink-0">
                          {lead.source}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 font-medium line-clamp-1">
                        {lead.interestedVehicle}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                        <span>Budget: <strong className="text-white">{currencySymbol}{(lead.budget / 1000000).toFixed(1)}M</strong></span>
                        <span>{lead.assignedRep.split(' ')[0]}</span>
                      </div>

                      <p className="text-[10px] text-slate-400 italic line-clamp-2">
                        &quot;{lead.notes}&quot;
                      </p>

                      {/* Advance Stage button if not converted or lost */}
                      {stage !== 'Converted' && stage !== 'Lost' && (
                        <button
                          onClick={() => advanceStage(lead.id, lead.stage)}
                          className="w-full mt-1.5 py-1 rounded-none bg-slate-800 hover:bg-[#e10600] hover:text-white text-slate-300 text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                        >
                          <span>Move Forward</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateLead}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Capture New Inquiring Lead</h3>
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Prospect Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gov. Juan Carlos Romualdez"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+63 917 000 0000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="prospect@mail.ph"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Vehicle Interested</label>
                  <input
                    type="text"
                    required
                    value={formVehicle}
                    onChange={(e) => setFormVehicle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Approx Budget (₱)</label>
                  <input
                    type="number"
                    required
                    value={formBudget}
                    onChange={(e) => setFormBudget(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Lead Source</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as Lead['source'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  >
                    <option value="Website Calculator">Website Calculator</option>
                    <option value="Facebook Ads">Facebook Ads</option>
                    <option value="Walk-In Showroom">Walk-In Showroom</option>
                    <option value="Referral">VIP Referral</option>
                    <option value="Google Search">Google Search</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Assigned Agent</label>
                  <select
                    value={formAgent}
                    onChange={(e) => setFormAgent(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Initial Inquiry Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Inquired about low down payment terms and delivery timing."
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white h-16 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddLeadModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold transition shadow-sm shadow-red-950/40 cursor-pointer"
              >
                Save Lead
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

