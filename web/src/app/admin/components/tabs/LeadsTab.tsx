'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  UserPlus,
  PhoneCall,
  Handshake,
  Trophy,
  XCircle,
  GripVertical,
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

const STAGE_CONFIG: Record<
  LeadStage,
  {
    label: string;
    description: string;
    tagColor: string;
    barColor: string;
    dotColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  'New Lead': {
    label: 'New Lead',
    description: 'Fresh digital & showroom inquiries',
    tagColor: 'bg-red-500/10 text-red-400 border-red-500/30',
    barColor: 'from-red-600 to-red-500',
    dotColor: 'bg-red-500',
    icon: UserPlus,
  },
  'Contacted': {
    label: 'Contacted',
    description: 'First response & discovery initiated',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    barColor: 'from-amber-600 to-amber-500',
    dotColor: 'bg-amber-500',
    icon: PhoneCall,
  },
  'Interested': {
    label: 'Interested',
    description: 'Vehicle spec & test-drive booking',
    tagColor: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    barColor: 'from-sky-600 to-sky-500',
    dotColor: 'bg-sky-400',
    icon: Target,
  },
  'Negotiation': {
    label: 'Negotiation',
    description: 'Priced quote, financing & trade-in',
    tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    barColor: 'from-purple-600 to-purple-500',
    dotColor: 'bg-purple-400',
    icon: Handshake,
  },
  'Converted': {
    label: 'Won / Converted',
    description: 'Deposit banked & unit reserved',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    barColor: 'from-emerald-600 to-emerald-500',
    dotColor: 'bg-emerald-400',
    icon: Trophy,
  },
  'Lost': {
    label: 'Lost / Closed',
    description: 'Disqualified or cold inquiries',
    tagColor: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    barColor: 'from-slate-600 to-slate-500',
    dotColor: 'bg-slate-500',
    icon: XCircle,
  },
};

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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Actions dropdown portal state
  const [dropdownMenu, setDropdownMenu] = useState<{
    id: string;
    top: number;
    right: number;
    lead: Lead;
  } | null>(null);

  // Selected lead for detail/notes modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Close dropdown on click outside or window scroll/resize
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lead-portal-dropdown') && !target.closest('.lead-action-trigger')) {
        setDropdownMenu(null);
      }
      if (!target.closest('.lead-stage-menu')) {
        setStageMenuLeadId(null);
      }
    };
    const handleClose = () => {
      setDropdownMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, []);

  // Add Lead Modal state
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [formStage, setFormStage] = useState<LeadStage>('New Lead');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formVehicle, setFormVehicle] = useState('2024 Ford Everest Titanium+ 4x4');
  const [formBudget, setFormBudget] = useState(2500000);
  const [formSource, setFormSource] = useState<Lead['source']>('Website Calculator');
  const [formAgent, setFormAgent] = useState('Janrey Mina');
  const [formNotes, setFormNotes] = useState('');

  // Drag and drop state for pipeline
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStage | null>(null);
  const [stageMenuLeadId, setStageMenuLeadId] = useState<string | null>(null);

  const openAddLeadForStage = (stage: LeadStage) => {
    setFormStage(stage);
    setIsAddLeadModalOpen(true);
  };

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
      stage: formStage,
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
    setFormStage('New Lead');
  };

  const advanceStage = (leadId: string, currentStage: LeadStage) => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex < STAGES.length - 2) {
      onUpdateLeadStage(leadId, STAGES[currentIndex + 1]);
    }
  };

  const regressStage = (leadId: string, currentStage: LeadStage) => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex > 0 && currentStage !== 'Lost') {
      onUpdateLeadStage(leadId, STAGES[currentIndex - 1]);
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
                  paginatedLeads.map((lead) => {
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
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (dropdownMenu?.id === lead.id) {
                                setDropdownMenu(null);
                              } else {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const menuHeight = 275;
                                const spaceBelow = window.innerHeight - rect.bottom;
                                const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
                                const top = openUpward
                                  ? Math.max(10, rect.top - menuHeight - 4)
                                  : Math.min(window.innerHeight - menuHeight - 10, rect.bottom + 4);
                                const right = Math.max(10, window.innerWidth - rect.right);
                                setDropdownMenu({ id: lead.id, top, right, lead });
                              }
                            }}
                            className={`lead-action-trigger p-1.5 rounded-none border transition cursor-pointer inline-flex items-center justify-center ${
                              dropdownMenu?.id === lead.id
                                ? 'bg-slate-800 text-white border-slate-600'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                            title="Actions"
                            aria-label="Lead Actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
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
        /* REDESIGNED KANBAN PIPELINE BOARD VIEW */
        <div className="flex gap-4 overflow-x-auto pb-6 pt-1 items-start scrollbar-thin">
          {STAGES.map((stage) => {
            const config = STAGE_CONFIG[stage];
            const StageIcon = config.icon;
            const stageLeads = filteredLeads.filter((l) => l.stage === stage);
            const stageBudgetSum = stageLeads.reduce((acc, l) => acc + (l.budget || 0), 0);
            const isDropTarget = dragOverStage === stage;

            return (
              <div
                key={stage}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverStage(stage);
                }}
                onDragLeave={() => {
                  if (dragOverStage === stage) setDragOverStage(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedId = e.dataTransfer.getData('text/plain') || draggingLeadId;
                  if (droppedId) {
                    onUpdateLeadStage(droppedId, stage);
                  }
                  setDraggingLeadId(null);
                  setDragOverStage(null);
                }}
                className={`w-[320px] min-w-[320px] shrink-0 bg-[#0f1422] border rounded-none flex flex-col transition duration-200 ${
                  isDropTarget
                    ? 'border-red-500/80 bg-red-950/20 ring-1 ring-red-500/40'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Colored Stage Accent Bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${config.barColor}`} />

                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-800/80 bg-[#121624]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-none flex items-center justify-center border ${config.tagColor}`}>
                        <StageIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white truncate">{config.label}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 border border-slate-700 text-slate-300">
                            {stageLeads.length}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => openAddLeadForStage(stage)}
                      className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 rounded-none transition cursor-pointer"
                      title={`Add lead to ${stage}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{config.description}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-2 border-t border-slate-800/60">
                    <span className="text-slate-500">Pipeline Value:</span>
                    <strong className="text-emerald-400 font-bold">
                      {currencySymbol}{(stageBudgetSum / 1000000).toFixed(1)}M
                    </strong>
                  </div>
                </div>

                {/* Card List Container */}
                <div className="p-3 space-y-3 min-h-[460px] flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="h-44 border border-dashed border-slate-800/80 rounded-none flex flex-col items-center justify-center text-center p-4 text-slate-500">
                      <p className="text-[11px] font-mono">No leads in {stage}</p>
                      <button
                        type="button"
                        onClick={() => openAddLeadForStage(stage)}
                        className="mt-2 text-[10px] text-red-400 hover:text-red-300 font-mono underline cursor-pointer"
                      >
                        + Add inquiry
                      </button>
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const isDragging = draggingLeadId === lead.id;

                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', lead.id);
                            setDraggingLeadId(lead.id);
                          }}
                          onDragEnd={() => {
                            setDraggingLeadId(null);
                            setDragOverStage(null);
                          }}
                          className={`group p-3 bg-[#131826] border rounded-none transition cursor-grab active:cursor-grabbing space-y-2.5 ${
                            isDragging
                              ? 'opacity-40 border-dashed border-red-500'
                              : 'border-slate-800/90 hover:border-slate-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {/* Card Header: Avatar, Name, Source, Grip */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {lead.avatar ? (
                                <img
                                  src={lead.avatar}
                                  alt={lead.name}
                                  className="w-7 h-7 rounded-none object-cover border border-slate-700 shrink-0"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-[10px] flex items-center justify-center shrink-0">
                                  {getInitials(lead.name)}
                                </div>
                              )}
                              <div className="min-w-0">
                                <button
                                  type="button"
                                  onClick={() => setSelectedLead(lead)}
                                  className="font-bold text-white text-xs hover:text-red-400 transition text-left cursor-pointer truncate block"
                                >
                                  {lead.name}
                                </button>
                                <span className={`text-[9px] font-mono px-1 py-0.2 rounded-none border inline-block mt-0.5 ${getSourceBadge(lead.source)}`}>
                                  {lead.source}
                                </span>
                              </div>
                            </div>
                            <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0 mt-0.5" />
                          </div>

                          {/* Interested Vehicle */}
                          <div className="p-2 bg-slate-900/80 border border-slate-800/70 rounded-none flex items-start gap-1.5">
                            <Car className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] font-semibold text-slate-200 line-clamp-1" title={lead.interestedVehicle}>
                              {lead.interestedVehicle}
                            </span>
                          </div>

                          {/* Budget & Advisor Row */}
                          <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-800/60">
                            <div>
                              <span className="text-slate-500">Valuation: </span>
                              <strong className="text-emerald-400 font-bold">
                                {currencySymbol}{lead.budget.toLocaleString()}
                              </strong>
                            </div>

                            <div className="flex items-center gap-1.5" title={`Assisted by: ${lead.assignedRep}`}>
                              {getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar) ? (
                                <img
                                  src={getAdvisorAvatar(lead.assignedRep, lead.advisorAvatar)}
                                  alt={lead.assignedRep}
                                  className="w-3.5 h-3.5 rounded-none object-cover border border-slate-700 shrink-0"
                                />
                              ) : (
                                <UserCheck className="w-3 h-3 text-red-500 shrink-0" />
                              )}
                              <span className="text-slate-400 truncate max-w-[80px]">
                                {lead.assignedRep.split(' ')[0]}
                              </span>
                            </div>
                          </div>

                          {/* Staff Interaction Quote */}
                          {lead.notes && (
                            <p className="text-[10px] text-slate-400 italic line-clamp-2 bg-slate-900/40 p-1.5 border border-slate-800/40">
                              &quot;{lead.notes}&quot;
                            </p>
                          )}

                          {/* Bottom Action Strip: Prev, Notes, Next */}
                          <div className="flex items-center gap-1 pt-1 border-t border-slate-800/60">
                            {stage !== 'New Lead' && stage !== 'Lost' && (
                              <button
                                type="button"
                                onClick={() => regressStage(lead.id, lead.stage)}
                                className="p-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-none text-[10px] transition cursor-pointer"
                                title="Move back one stage"
                              >
                                <ChevronLeft className="w-3 h-3" />
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="flex-1 py-1 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-none text-[10px] font-mono transition cursor-pointer text-center truncate"
                            >
                              Dossier Notes
                            </button>

                            {stage !== 'Converted' && stage !== 'Lost' && (
                              <button
                                type="button"
                                onClick={() => advanceStage(lead.id, lead.stage)}
                                className="py-1 px-2 bg-slate-900 hover:bg-[#e10600] text-slate-300 hover:text-white border border-slate-800 rounded-none text-[10px] font-semibold flex items-center gap-1 transition cursor-pointer"
                                title="Advance to next stage"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
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
                  <label className="text-slate-400 block mb-1">Pipeline Stage</label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as LeadStage)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white focus:outline-hidden focus:border-red-500"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
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

      {/* Floating Action Dropdown Menu via Portal - never cropped by table overflow or pagination footer */}
      {mounted && dropdownMenu && createPortal(
        <div
          className="lead-portal-dropdown w-52 bg-[#0d111d] border border-slate-700 shadow-2xl rounded-none py-1 text-xs text-left"
          style={{
            position: 'fixed',
            top: dropdownMenu.top,
            right: dropdownMenu.right,
            zIndex: 99999,
          }}
        >
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Lead Actions
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedLead(dropdownMenu.lead);
              setDropdownMenu(null);
            }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer font-medium"
          >
            <User className="w-3.5 h-3.5 text-red-500" />
            <span>View Inquiry Notes</span>
          </button>

          {dropdownMenu.lead.stage !== 'Converted' && dropdownMenu.lead.stage !== 'Lost' && (
            <button
              type="button"
              onClick={() => {
                advanceStage(dropdownMenu.lead.id, dropdownMenu.lead.stage);
                setDropdownMenu(null);
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
                  onUpdateLeadStage(dropdownMenu.lead.id, s);
                  setDropdownMenu(null);
                }}
                className={`px-1.5 py-1 text-[10px] font-mono rounded-none text-left truncate transition cursor-pointer ${
                  dropdownMenu.lead.stage === s
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <a
            href={`tel:${dropdownMenu.lead.phone}`}
            onClick={() => setDropdownMenu(null)}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer border-t border-slate-800/80"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Phone</span>
          </a>

          <a
            href={`mailto:${dropdownMenu.lead.email}`}
            onClick={() => setDropdownMenu(null)}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>
        </div>,
        document.body
      )}
    </div>
  );
};
