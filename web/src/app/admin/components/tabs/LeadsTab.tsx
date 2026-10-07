'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  ChevronLeft,
  CheckCircle2,
  LayoutList,
  LayoutGrid,
  MoreVertical,
  Calendar,
  Award,
  AlertCircle,
  UserCheck,
  Car,
  FileSpreadsheet,
} from 'lucide-react';
import { Lead, LeadStage, StaffMember } from '../../types';

interface LeadsTabProps {
  leads: Lead[];
  staff: StaffMember[];
  onAddLead: (lead: Omit<Lead, 'id' | 'createdDate' | 'lastActivity'>) => void;
  onUpdateLeadStage: (id: string, stage: LeadStage) => void;
  currencySymbol: string;
}

const STAGES: LeadStage[] = ['New Lead', 'Contacted', 'Interested', 'Negotiation', 'Converted', 'Lost'];

export const LeadsTab: React.FC<LeadsTabProps> = ({
  leads,
  staff,
  onAddLead,
  onUpdateLeadStage,
  currencySymbol,
}) => {
  // View Toggle: 'table' or 'kanban'
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Filters and Search
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [agentFilter, setAgentFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'activity' | 'budget' | 'name'>('activity');

  // Pagination for table view
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Actions dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Selected lead for detail/notes modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lead-action-menu')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Add Lead Modal state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formVehicle, setFormVehicle] = useState('2024 Ford Everest Titanium+ 4x4');
  const [formBudget, setFormBudget] = useState(2500000);
  const [formSource, setFormSource] = useState<Lead['source']>('Website Calculator');
  const [formAgent, setFormAgent] = useState('Janrey Mina');
  const [formNotes, setFormNotes] = useState('');

  // Helper for initials
  const getInitials = (name: string) => {
    const clean = name.replace(/^(Gov\.|Dr\.|Capt\.|Atty\.|Mr\.|Ms\.|Mrs\.|Engr\.)\s+/i, '');
    const parts = clean.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  // Helper for advisor avatar lookup
  const getAdvisorAvatar = (advisorName: string, leadAdvisorAvatar?: string) => {
    if (leadAdvisorAvatar) return leadAdvisorAvatar;
    const member = staff?.find((s) => s.name.toLowerCase() === advisorName.toLowerCase());
    return member?.avatar;
  };

  // Helper for stage styling
  const getStageBadge = (stage: LeadStage) => {
    switch (stage) {
      case 'New Lead':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'Contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Interested':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      case 'Negotiation':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Converted':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Lost':
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  // Source styling
  const getSourceBadge = (source: Lead['source']) => {
    switch (source) {
      case 'Website Calculator':
        return 'bg-sky-950/40 text-sky-300 border-sky-800/60';
      case 'Facebook Ads':
        return 'bg-blue-950/40 text-blue-300 border-blue-800/60';
      case 'Walk-In Showroom':
        return 'bg-amber-950/40 text-amber-300 border-amber-800/60';
      case 'Referral':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  // KPI calculations
  const totalLeadsCount = leads.length;
  const totalPipelineValue = useMemo(() => {
    return leads.reduce((acc, l) => acc + (l.budget || 0), 0);
  }, [leads]);

  const activeNegotiationsCount = useMemo(() => {
    return leads.filter((l) => l.stage === 'Negotiation' || l.stage === 'Interested').length;
  }, [leads]);

  const convertedCount = useMemo(() => {
    return leads.filter((l) => l.stage === 'Converted').length;
  }, [leads]);

  const conversionRate = totalLeadsCount > 0 ? Math.round((convertedCount / totalLeadsCount) * 100) : 0;

  // Filtered and sorted leads
  const filteredLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.interestedVehicle.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.assignedRep.toLowerCase().includes(search.toLowerCase());
      const matchStage = stageFilter === 'all' || lead.stage === stageFilter;
      const matchSource = sourceFilter === 'all' || lead.source === sourceFilter;
      const matchAgent = agentFilter === 'all' || lead.assignedRep === agentFilter;
      return matchSearch && matchStage && matchSource && matchAgent;
    });

    if (sortBy === 'activity') {
      result = [...result].sort((a, b) => b.lastActivity.localeCompare(a.lastActivity));
    } else if (sortBy === 'budget') {
      result = [...result].sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [leads, search, stageFilter, sourceFilter, agentFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage, itemsPerPage]);

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
      branchId: 'main',
      notes: formNotes || 'Direct inquiry via DriveFlow portal.',
    });
    setIsAddLeadModalOpen(false);
    // Reset form
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormNotes('');
    setFormBudget(2500000);
  };

  const advanceStage = (leadId: string, currentStage: LeadStage) => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex < STAGES.length - 2) {
      onUpdateLeadStage(leadId, STAGES[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sales Inquiries & Lead Pipeline</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({totalLeadsCount} active leads)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track website financing calculator submissions, digital showroom traffic, and sales conversion stages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* View Switcher Toggle */}
          <div className="bg-[#121624] border border-slate-800 p-0.5 rounded-none flex items-center">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-medium rounded-none flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 text-xs font-medium rounded-none flex items-center gap-1.5 transition cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddLeadModalOpen(true)}
            className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            Capture New Lead
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Total Inquiries
            </span>
            <div className="text-2xl font-bold text-white mt-1">
              {totalLeadsCount}
            </div>
            <span className="text-[11px] text-sky-400 mt-1 inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> Live Showroom Prospects
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <Target className="w-5 h-5 text-red-500" />
          </div>
        </div>

        {/* Pipeline Potential Value */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Pipeline Potential Value
            </span>
            <div className="text-2xl font-bold text-white mt-1 font-mono">
              {currencySymbol}{(totalPipelineValue / 1000000).toFixed(1)}M
            </div>
            <span className="text-[11px] text-slate-400 mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> Cumulative Buyer Budgets
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* Active Negotiations */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Hot Prospects
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-2">
              <span>{activeNegotiationsCount}</span>
              <span className="text-xs font-normal text-slate-400 font-mono">
                in Closing Stage
              </span>
            </div>
            <span className="text-[11px] text-purple-400 mt-1 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Interested & Negotiating
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-[#121624] border border-slate-800 p-4 rounded-none flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Conversion Win Rate
            </span>
            <div className="text-2xl font-bold text-white mt-1 flex items-baseline gap-2 font-mono">
              <span>{conversionRate}%</span>
              <span className="text-xs font-normal text-emerald-400 font-mono">
                ({convertedCount} Won)
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 inline-flex items-center gap-1">
              <Award className="w-3 h-3" /> Transferred to CRM
            </span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
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
            placeholder="Search by prospect name, vehicle of interest, phone, advisor..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Stage Filter */}
          <select
            value={stageFilter}
            onChange={(e) => {
              setStageFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Pipeline Stages</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Lead Sources</option>
            <option value="Website Calculator">Website Calculator</option>
            <option value="Facebook Ads">Facebook Ads</option>
            <option value="Walk-In Showroom">Walk-In Showroom</option>
            <option value="Referral">VIP Referral</option>
            <option value="Google Search">Google Search</option>
          </select>

          {/* Agent Filter */}
          <select
            value={agentFilter}
            onChange={(e) => {
              setAgentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Advisors</option>
            {staff.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="activity">Sort: Recent Activity</option>
            <option value="budget">Sort: Highest Budget</option>
            <option value="name">Sort: Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table View OR Kanban View */}
      {viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Prospect & Advisor</th>
                  <th className="py-3 px-3">Vehicle of Interest</th>
                  <th className="py-3 px-3">Budget Valuation</th>
                  <th className="py-3 px-3">Lead Source</th>
                  <th className="py-3 px-3">Pipeline Stage</th>
                  <th className="py-3 px-3">Quick Contact</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {paginatedLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-mono text-xs">
                      No sales inquiries match your current filters.
                    </td>
                  </tr>
                ) : (
                  paginatedLeads.map((lead, idx) => {
                    const isNearBottom = idx >= paginatedLeads.length - 2 && paginatedLeads.length > 2;

                    return (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                        {/* Prospect & Advisor */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {lead.avatar ? (
                              <img
                                src={lead.avatar}
                                alt={lead.name}
                                className="w-8 h-8 rounded-none object-cover border border-slate-700 shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                                {getInitials(lead.name)}
                              </div>
                            )}
                            <div>
                              <button
                                type="button"
                                onClick={() => setSelectedLead(lead)}
                                className="font-bold text-white hover:text-red-400 transition text-left cursor-pointer text-xs"
                              >
                                {lead.name}
                              </button>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                {getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar) ? (
                                  <img
                                    src={getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar)}
                                    alt={lead.assignedRep}
                                    className="w-3.5 h-3.5 rounded-none object-cover border border-slate-700 shrink-0"
                                  />
                                ) : (
                                  <UserCheck className="w-3 h-3 text-red-500 shrink-0" />
                                )}
                                <span>Assisted by: <strong className="text-slate-200 font-medium">{lead.assignedRep}</strong></span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Vehicle of Interest */}
                        <td className="py-3.5 px-3 text-[11px]">
                          <span className="font-semibold text-white truncate block max-w-[220px]" title={lead.interestedVehicle}>
                            {lead.interestedVehicle}
                          </span>
                        </td>

                        {/* Budget Valuation */}
                        <td className="py-3.5 px-3 font-mono text-[11px]">
                          <span className="font-bold text-emerald-400">
                            {currencySymbol}{lead.budget.toLocaleString()}
                          </span>
                        </td>

                        {/* Lead Source */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-none text-[10px] font-mono border inline-block ${getSourceBadge(lead.source)}`}>
                            {lead.source}
                          </span>
                        </td>

                        {/* Pipeline Stage */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border inline-block ${getStageBadge(lead.stage)}`}>
                            {lead.stage}
                          </span>
                        </td>

                        {/* Quick Contact */}
                        <td className="py-3.5 px-3 text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-200">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            <a href={`tel:${lead.phone}`} className="hover:text-red-400 transition font-mono">
                              {lead.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
                            <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                            <a href={`mailto:${lead.email}`} className="hover:text-white transition truncate max-w-[150px]">
                              {lead.email}
                            </a>
                          </div>
                        </td>

                        {/* Actions Triple-dot Menu */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="lead-action-menu relative inline-block text-left">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenDropdownId(openDropdownId === lead.id ? null : lead.id);
                              }}
                              className={`p-1.5 rounded-none border transition cursor-pointer flex items-center justify-center ${
                                openDropdownId === lead.id
                                  ? 'bg-slate-800 text-white border-slate-600'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                              }`}
                              title="Actions"
                              aria-label="Lead Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {openDropdownId === lead.id && (
                              <div
                                className={`absolute right-0 w-48 bg-[#121624] border border-slate-700 shadow-2xl z-50 rounded-none py-1 text-xs text-left ${
                                  isNearBottom ? 'bottom-full mb-1' : 'top-full mt-1'
                                }`}
                              >
                                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                                  Lead Actions
                                </div>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedLead(lead);
                                    setOpenDropdownId(null);
                                  }}
                                  className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer font-medium"
                                >
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-sky-400" />
                                  <span>View Inquiry Notes</span>
                                </button>

                                {lead.stage !== 'Converted' && lead.stage !== 'Lost' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      advanceStage(lead.id, lead.stage);
                                      setOpenDropdownId(null);
                                    }}
                                    className="w-full text-left px-3 py-2 flex items-center gap-2 text-emerald-400 hover:bg-slate-800 transition cursor-pointer font-medium"
                                  >
                                    <ChevronRight className="w-3.5 h-3.5" />
                                    <span>Advance Stage</span>
                                  </button>
                                )}

                                <div className="px-3 py-1 border-t border-slate-800 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                                  Set Stage
                                </div>
                                <div className="grid grid-cols-2 gap-1 px-2 py-1">
                                  {STAGES.map((s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      onClick={() => {
                                        onUpdateLeadStage(lead.id, s);
                                        setOpenDropdownId(null);
                                      }}
                                      className={`px-1.5 py-1 text-[10px] font-mono rounded-none text-left truncate transition ${
                                        lead.stage === s
                                          ? 'bg-slate-800 text-white font-bold'
                                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                      }`}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>

                                <a
                                  href={`tel:${lead.phone}`}
                                  onClick={() => setOpenDropdownId(null)}
                                  className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer border-t border-slate-800/80"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>Call Phone</span>
                                </a>

                                <a
                                  href={`mailto:${lead.email}`}
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

          {/* Table Pagination footer */}
          <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 font-mono text-[11px]">
              Showing <strong className="text-white">{filteredLeads.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
              <strong className="text-white">
                {Math.min(currentPage * itemsPerPage, filteredLeads.length)}
              </strong>{' '}
              of <strong className="text-white">{filteredLeads.length}</strong> inquiries
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
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            const stageBudgetSum = stageLeads.reduce((acc, l) => acc + (l.budget || 0), 0);

            return (
              <div
                key={stage}
                className="bg-[#121624] border border-slate-800 rounded-none p-3 flex flex-col justify-between min-h-[500px]"
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

                  {/* Subtotal header */}
                  {stageBudgetSum > 0 && (
                    <div className="text-[10px] font-mono text-slate-500 mb-2.5">
                      Subtotal: <strong className="text-slate-300">{currencySymbol}{(stageBudgetSum / 1000000).toFixed(1)}M</strong>
                    </div>
                  )}

                  {/* Cards Container */}
                  <div className="space-y-2.5">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3 rounded-none bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            {lead.avatar ? (
                              <img
                                src={lead.avatar}
                                alt={lead.name}
                                className="w-6 h-6 rounded-none object-cover border border-slate-700 shrink-0"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-[9px] flex items-center justify-center shrink-0">
                                {getInitials(lead.name)}
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="font-bold text-white text-xs hover:text-red-400 transition text-left cursor-pointer truncate"
                            >
                              {lead.name}
                            </button>
                          </div>
                          <span className={`text-[9px] font-mono px-1 py-0.2 rounded-none border shrink-0 ${getSourceBadge(lead.source)}`}>
                            {lead.source}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-200 font-medium line-clamp-1">
                          {lead.interestedVehicle}
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                          <span>Budget: <strong className="text-emerald-400">{currencySymbol}{(lead.budget / 1000000).toFixed(1)}M</strong></span>
                          <div className="flex items-center gap-1.5" title={`Assigned Advisor: ${lead.assignedRep}`}>
                            {getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar) && (
                              <img
                                src={getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar)}
                                alt={lead.assignedRep}
                                className="w-3.5 h-3.5 rounded-none object-cover border border-slate-700 shrink-0"
                              />
                            )}
                            <span className="text-slate-300 font-medium">{lead.assignedRep.split(' ')[0]}</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 italic line-clamp-2">
                          &quot;{lead.notes}&quot;
                        </p>

                        {/* Advance Stage button */}
                        {stage !== 'Converted' && stage !== 'Lost' && (
                          <button
                            type="button"
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
      )}

      {/* Detail / Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {selectedLead.avatar ? (
                  <img
                    src={selectedLead.avatar}
                    alt={selectedLead.name}
                    className="w-10 h-10 rounded-none object-cover border border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    {getInitials(selectedLead.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold text-white">{selectedLead.name}</h3>
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                    {getAdvisorAvatar(selectedLead.assignedRep, selectedLead.advisorAvatar) ? (
                      <img
                        src={getAdvisorAvatar(selectedLead.assignedRep, selectedLead.advisorAvatar)}
                        alt={selectedLead.assignedRep}
                        className="w-3.5 h-3.5 rounded-none object-cover border border-slate-700 shrink-0"
                      />
                    ) : (
                      <UserCheck className="w-3 h-3 text-red-500 shrink-0" />
                    )}
                    <span>Assigned Advisor: <strong className="text-slate-200 font-medium">{selectedLead.assignedRep}</strong> • Received: {selectedLead.createdDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-none space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Vehicle:</span>
                  <span className="text-white font-bold">{selectedLead.interestedVehicle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Declared Budget:</span>
                  <span className="text-emerald-400 font-mono font-bold">{currencySymbol}{selectedLead.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Inquiry Source:</span>
                  <span className="text-white">{selectedLead.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pipeline Stage:</span>
                  <span className={`px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border ${getStageBadge(selectedLead.stage)}`}>
                    {selectedLead.stage}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                <span className="text-slate-400 block mb-1 font-mono uppercase text-[10px]">Staff Interaction Notes:</span>
                <p className="text-slate-200 text-xs leading-relaxed">&quot;{selectedLead.notes}&quot;</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${selectedLead.phone}`} className="hover:text-red-400 font-mono font-bold">
                    {selectedLead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:text-white">
                    {selectedLead.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 font-mono mr-1">Update:</span>
                {STAGES.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      onUpdateLeadStage(selectedLead.id, s);
                      setSelectedLead({ ...selectedLead, stage: s });
                    }}
                    className={`px-2 py-1 text-[10px] font-mono rounded-none transition cursor-pointer ${
                      selectedLead.stage === s ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer rounded-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono focus:outline-hidden focus:border-red-500"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Approx Budget (₱)</label>
                  <input
                    type="number"
                    required
                    value={formBudget}
                    onChange={(e) => setFormBudget(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Lead Source</label>
                  <select
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value as Lead['source'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white h-16 text-xs focus:outline-hidden focus:border-red-500"
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
