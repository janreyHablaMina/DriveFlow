'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ShieldCheck,
  FileCheck,
  Building2,
  Percent,
  Plus,
  Eye,
  X,
  History,
  Send,
  HelpCircle,
  Car,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  MoreVertical,
  Edit3,
} from 'lucide-react';
import { FinancingApplication, FinancingStatus, AdminVehicle } from '../../types';

interface FinancingTabProps {
  applications: FinancingApplication[];
  vehicles: AdminVehicle[];
  onApproveApplication: (id: string, notes: string) => void;
  onRejectApplication: (id: string, reason: string) => void;
  onRequestDocs: (id: string, docName: string) => void;
  onNewApplication: (app: Omit<FinancingApplication, 'id' | 'auditTrail' | 'submittedDate'>) => void;
  onUpdateStatus?: (id: string, status: FinancingStatus) => void;
  onUpdateApplication?: (app: FinancingApplication) => void;
  currencySymbol: string;
}

export const FinancingTab: React.FC<FinancingTabProps> = ({
  applications,
  vehicles,
  onApproveApplication,
  onRejectApplication,
  onRequestDocs,
  onNewApplication,
  onUpdateStatus,
  onUpdateApplication,
  currencySymbol,
}) => {
  const [search, setSearch] = useState('');
  const [activeStatusTab, setActiveStatusTab] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState('all');

  // Modals
  const [selectedApp, setSelectedApp] = useState<FinancingApplication | null>(null);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isRequestDocOpen, setIsRequestDocOpen] = useState(false);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);

  // Form states for approval/rejection
  const [approvalNotes, setApprovalNotes] = useState('Credit score and employment confirmed with employer. Cleared for vehicle release.');
  const [rejectionReason, setRejectionReason] = useState('Unsatisfactory CMAP / Credit Bureau adverse findings.');
  const [requestedDocName, setRequestedDocName] = useState('Latest 3 Months Stamped Bank Statements');

  // New Application Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formEmployment, setFormEmployment] = useState<FinancingApplication['employmentType']>('Corporate Executive');
  const [formIncome, setFormIncome] = useState(250000);
  const [formScore, setFormScore] = useState(740);
  const [formVehicleId, setFormVehicleId] = useState(vehicles[0]?.id || '');
  const [formDpPct, setFormDpPct] = useState(20);
  const [formTerm, setFormTerm] = useState(48);
  const [formChannel, setFormChannel] = useState<FinancingApplication['financingChannel']>('BDO Unibank Auto Loan');
  const [formBranchId, setFormBranchId] = useState('main');

  const selectedVehicleObj = vehicles.find((v) => v.id === formVehicleId) || vehicles[0];

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
        app.appNumber.toLowerCase().includes(search.toLowerCase()) ||
        app.vehicleName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = activeStatusTab === 'all' || app.status === activeStatusTab;
      const matchChannel = channelFilter === 'all' || app.financingChannel === channelFilter;
      return matchSearch && matchStatus && matchChannel;
    });
  }, [applications, search, activeStatusTab, channelFilter]);

  // Pagination for table view
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeStatusTab, channelFilter]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage) || 1;
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApps.slice(start, start + itemsPerPage);
  }, [filteredApps, currentPage, itemsPerPage]);

  const getInitials = (name: string) => {
    const clean = name.replace(/^(Arch\.|Dr\.|Capt\.|Atty\.|Mr\.|Ms\.|Mrs\.|Engr\.)\s+/i, '');
    const parts = clean.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  // Mount state for portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dropdown portal state
  const [dropdownMenu, setDropdownMenu] = useState<{
    id: string;
    top: number;
    right: number;
    app: FinancingApplication;
  } | null>(null);

  // Close dropdown on click outside, scroll, resize
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.financing-portal-dropdown') && !target.closest('.financing-action-trigger')) {
        setDropdownMenu(null);
      }
    };
    const handleClose = () => {
      setDropdownMenu(null);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, []);

  // Edit Application Modal State
  const [editingApp, setEditingApp] = useState<FinancingApplication | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editVehicleName, setEditVehicleName] = useState('');
  const [editVehiclePrice, setEditVehiclePrice] = useState(0);
  const [editDpPct, setEditDpPct] = useState(20);
  const [editTerm, setEditTerm] = useState(48);
  const [editIncome, setEditIncome] = useState(0);
  const [editScore, setEditScore] = useState(700);
  const [editStatus, setEditStatus] = useState<FinancingStatus>('Under Review');

  const handleOpenEdit = (app: FinancingApplication) => {
    setEditingApp(app);
    setEditName(app.applicantName);
    setEditPhone(app.phone);
    setEditEmail(app.email);
    setEditVehicleName(app.vehicleName);
    setEditVehiclePrice(app.vehiclePrice);
    setEditDpPct(app.downPaymentPercent);
    setEditTerm(app.termMonths);
    setEditIncome(app.monthlyIncome);
    setEditScore(app.creditScore);
    setEditStatus(app.status);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;
    const dpAmount = Math.round(editVehiclePrice * (editDpPct / 100));
    const loanAmount = editVehiclePrice - dpAmount;
    const rate = editingApp.interestRatePa || 6.8;
    const monthly = Math.round((loanAmount * (1 + (rate * (editTerm / 12)) / 100)) / editTerm);

    const updated: FinancingApplication = {
      ...editingApp,
      applicantName: editName,
      phone: editPhone,
      email: editEmail,
      vehicleName: editVehicleName,
      vehiclePrice: editVehiclePrice,
      downPaymentPercent: editDpPct,
      downPaymentAmount: dpAmount,
      loanAmount,
      termMonths: editTerm,
      monthlyAmortization: monthly,
      monthlyIncome: editIncome,
      creditScore: editScore,
      status: editStatus,
    };

    if (onUpdateApplication) {
      onUpdateApplication(updated);
    }
    setEditingApp(null);
  };

  const handleApprove = () => {
    if (!selectedApp) return;
    onApproveApplication(selectedApp.id, approvalNotes);
    setIsApproveOpen(false);
    setSelectedApp(null);
  };

  const handleReject = () => {
    if (!selectedApp) return;
    onRejectApplication(selectedApp.id, rejectionReason);
    setIsRejectOpen(false);
    setSelectedApp(null);
  };

  const handleRequestDoc = () => {
    if (!selectedApp) return;
    onRequestDocs(selectedApp.id, requestedDocName);
    setIsRequestDocOpen(false);
    setSelectedApp(null);
  };

  const handleCreateApp = (e: React.FormEvent) => {
    e.preventDefault();
    const price = selectedVehicleObj?.priceNumeric || 2000000;
    const dpAmount = Math.round(price * (formDpPct / 100));
    const loanAmount = price - dpAmount;
    const rate = formChannel.includes('In-House') ? 8.5 : 6.8;
    const monthly = Math.round((loanAmount * (1 + (rate * (formTerm / 12)) / 100)) / formTerm);

    onNewApplication({
      appNumber: `LN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: `cust-${Date.now()}`,
      applicantName: formName,
      phone: formPhone,
      email: formEmail,
      vehicleId: selectedVehicleObj?.id || '',
      vehicleName: selectedVehicleObj?.name || 'Selected Vehicle',
      vehiclePrice: price,
      downPaymentPercent: formDpPct,
      downPaymentAmount: dpAmount,
      loanAmount: loanAmount,
      termMonths: formTerm,
      interestRatePa: rate,
      monthlyAmortization: monthly,
      financingChannel: formChannel,
      employmentType: formEmployment,
      monthlyIncome: Number(formIncome),
      creditScore: Number(formScore),
      cmapStatus: 'Cleared',
      assignedOfficer: 'Janrey Mina',
      branchId: formBranchId,
      status: 'Submitted',
      docsSubmitted: {
        validIds: true,
        incomeProof: true,
        bankStatements: true,
        proofOfBilling: true,
      },
    });
    setIsNewAppModalOpen(false);
  };

  const getStatusBadge = (status: FinancingStatus) => {
    switch (status) {
      case 'Approved':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Approved</span>;
      case 'Under Review':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Under Review</span>;
      case 'Assessment':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">CI Assessment</span>;
      case 'Documents Required':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Docs Required</span>;
      case 'Submitted':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">Submitted</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">Rejected</span>;
      case 'Completed':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-500/15 text-slate-300 border border-slate-500/30">Completed</span>;
      case 'Cancelled':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-700 text-slate-400 border border-slate-600">Cancelled</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Car Financing & Loan Underwriting Pipeline</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredApps.length} applications)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review loan applications, verify CMAP credit scores, manage partner bank submissions, and approve vehicle releases.
          </p>
        </div>

        <button
          onClick={() => setIsNewAppModalOpen(true)}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          New Loan Application
        </button>
      </div>

      {/* Underwriting Disclaimer Banner */}
      <div className="p-3 rounded-none bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
        <span>
          <strong className="text-slate-200">Compliance Notice:</strong> Installment estimates are indicative until final bank underwriting approval and promissory note execution by the authorized financing officer.
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'all', label: 'All Applications' },
          { id: 'Under Review', label: 'Under Review' },
          { id: 'Approved', label: 'Approved (Ready)' },
          { id: 'Documents Required', label: 'Docs Required' },
          { id: 'Assessment', label: 'CI Assessment' },
          { id: 'Rejected', label: 'Declined' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatusTab(tab.id)}
            className={`px-3 py-1.5 rounded-none text-xs font-semibold transition cursor-pointer ${
              activeStatusTab === tab.id
                ? 'bg-[#e10600] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Channel Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by loan app #, applicant name, or vehicle..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Financing Channels</option>
            <option value="BDO Unibank Auto Loan">BDO Unibank Auto Loan</option>
            <option value="BPI Auto Loan">BPI Auto Loan</option>
            <option value="Security Bank">Security Bank</option>
            <option value="EastWest Bank">EastWest Bank</option>
            <option value="DriveFlow In-House Financing">DriveFlow In-House Financing</option>
          </select>
        </div>
      </div>

      {/* Applications Table - High-Level Essentials */}
      <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Applicant & App #</th>
                <th className="py-3 px-3">Vehicle Financed</th>
                <th className="py-3 px-3">Loan & Monthly Terms</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No financing applications match your filters.
                  </td>
                </tr>
              ) : (
                paginatedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition">
                    {/* Applicant & App # */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {app.avatar ? (
                          <img
                            src={app.avatar}
                            alt={app.applicantName}
                            className="w-8 h-8 rounded-none object-cover border border-slate-700 shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {getInitials(app.applicantName)}
                          </div>
                        )}
                        <div>
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            className="font-bold text-white hover:text-red-400 transition text-left cursor-pointer text-xs block"
                          >
                            {app.applicantName}
                          </button>
                          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span className="text-red-400 font-semibold">{app.appNumber}</span>
                            <span className="text-slate-600">•</span>
                            <span>{app.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Vehicle Financed */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Car className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate max-w-[240px]" title={app.vehicleName}>
                          {app.vehicleName}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        SRP: <strong className="text-slate-300">{currencySymbol}{app.vehiclePrice.toLocaleString()}</strong>
                      </div>
                    </td>

                    {/* Loan & Monthly Terms */}
                    <td className="py-3.5 px-3 font-mono">
                      <div className="text-red-400 font-bold text-xs">
                        {currencySymbol}{app.monthlyAmortization.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Loan: <strong className="text-slate-300">{currencySymbol}{app.loanAmount.toLocaleString()}</strong> • {app.termMonths} mos
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      {getStatusBadge(app.status)}
                    </td>

                    {/* Actions Triple-dot Menu */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dropdownMenu?.id === app.id) {
                            setDropdownMenu(null);
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const menuHeight = 295;
                            const spaceBelow = window.innerHeight - rect.bottom;
                            const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
                            const top = openUpward
                              ? Math.max(10, rect.top - menuHeight - 4)
                              : Math.min(window.innerHeight - menuHeight - 10, rect.bottom + 4);
                            const right = Math.max(10, window.innerWidth - rect.right);
                            setDropdownMenu({ id: app.id, top, right, app });
                          }
                        }}
                        className={`financing-action-trigger p-1.5 rounded-none border transition cursor-pointer inline-flex items-center justify-center ${
                          dropdownMenu?.id === app.id
                            ? 'bg-slate-800 text-white border-slate-600'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Actions"
                        aria-label="Financing Application Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination footer */}
        <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 font-mono text-[11px]">
            Showing <strong className="text-white">{filteredApps.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-white">
              {Math.min(currentPage * itemsPerPage, filteredApps.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredApps.length}</strong> applications
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

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                {selectedApp.avatar ? (
                  <img
                    src={selectedApp.avatar}
                    alt={selectedApp.applicantName}
                    className="w-10 h-10 rounded-none object-cover border border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    {getInitials(selectedApp.applicantName)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{selectedApp.applicantName}</h3>
                    <span className="text-xs font-mono font-semibold text-red-400 bg-red-950/40 border border-red-800/60 px-2 py-0.5">
                      {selectedApp.appNumber}
                    </span>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                    <span>Partner: <strong className="text-slate-200">{selectedApp.financingChannel}</strong></span>
                    <span>•</span>
                    <span>Submitted: {selectedApp.submittedDate}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vehicle Financed Banner */}
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-none flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-red-500 shrink-0" />
                <span className="font-bold text-white text-sm">{selectedApp.vehicleName}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Dealer SRP: <strong className="text-white">{currencySymbol}{selectedApp.vehiclePrice.toLocaleString()}</strong>
              </div>
            </div>

            {/* Financial Summary Breakdown (6 KPI Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3.5 rounded-none bg-slate-900 border border-slate-800 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Vehicle SRP</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.vehiclePrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Down Payment</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.downPaymentAmount.toLocaleString()} ({selectedApp.downPaymentPercent}%)</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Loan Amount</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.loanAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Interest Rate</span>
                <span className="text-white font-bold">{selectedApp.interestRatePa}% p.a.</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Tenor</span>
                <span className="text-white font-bold">{selectedApp.termMonths} Months</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Monthly Payment</span>
                <span className="text-red-500 font-bold">
                  {currencySymbol}{selectedApp.monthlyAmortization.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Applicant KYC & Credit Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-none bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Applicant Employment & Income</h4>
                <div className="text-slate-300 space-y-1">
                  <div>Type: <strong className="text-white">{selectedApp.employmentType}</strong></div>
                  <div>Monthly Income: <strong className="text-emerald-400 font-mono">{currencySymbol}{selectedApp.monthlyIncome.toLocaleString()}</strong></div>
                  <div>Phone: <strong className="text-white">{selectedApp.phone}</strong></div>
                  <div>Email: <strong className="text-white">{selectedApp.email}</strong></div>
                </div>
              </div>

              <div className="p-3.5 rounded-none bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">Credit Bureau & CMAP Audit</h4>
                <div className="text-slate-300 space-y-1">
                  <div>Credit Score: <strong className="text-white font-mono">{selectedApp.creditScore}</strong> (FICO Equifax Standard)</div>
                  <div>CMAP Adverse Record: <strong className="text-emerald-400">{selectedApp.cmapStatus}</strong></div>
                  <div>Assigned Officer: <strong className="text-white">{selectedApp.assignedOfficer}</strong></div>
                  <div>Submitted Date: <strong className="text-slate-400">{selectedApp.submittedDate}</strong></div>
                </div>
              </div>
            </div>

            {/* Documents Verification Checklist */}
            <div className="p-3.5 rounded-none bg-slate-900/80 border border-slate-800">
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2.5">
                Required Regulatory Documents Checklist
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-none bg-slate-950/60">
                  <CheckCircle2 className={`w-4 h-4 ${selectedApp.docsSubmitted.validIds ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={selectedApp.docsSubmitted.validIds ? 'text-white' : 'text-slate-500'}>2 Valid IDs</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-none bg-slate-950/60">
                  <CheckCircle2 className={`w-4 h-4 ${selectedApp.docsSubmitted.incomeProof ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={selectedApp.docsSubmitted.incomeProof ? 'text-white' : 'text-slate-500'}>Proof of Income</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-none bg-slate-950/60">
                  <CheckCircle2 className={`w-4 h-4 ${selectedApp.docsSubmitted.bankStatements ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={selectedApp.docsSubmitted.bankStatements ? 'text-white' : 'text-slate-500'}>Bank Statements</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-none bg-slate-950/60">
                  <CheckCircle2 className={`w-4 h-4 ${selectedApp.docsSubmitted.proofOfBilling ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className={selectedApp.docsSubmitted.proofOfBilling ? 'text-white' : 'text-slate-500'}>Proof of Billing</span>
                </div>
              </div>
            </div>

            {/* Audit Trail */}
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">Audit Decision Trail</h4>
              <div className="space-y-1.5">
                {selectedApp.auditTrail.map((audit) => (
                  <div key={audit.id} className="p-2 rounded-none bg-slate-900 border border-slate-800/70 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="font-bold text-white">{audit.actor}:</span>{' '}
                      <span className="text-slate-300">{audit.action}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px]">{audit.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Actions Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {selectedApp.status !== 'Approved' && (
                  <button
                    onClick={() => setIsApproveOpen(true)}
                    className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Loan
                  </button>
                )}
                {selectedApp.status !== 'Rejected' && (
                  <button
                    onClick={() => setIsRejectOpen(true)}
                    className="px-3 py-1.5 rounded-none bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject Application
                  </button>
                )}
                <button
                  onClick={() => setIsRequestDocOpen(true)}
                  className="px-3 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
                >
                  Request Docs
                </button>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Approve Loan */}
      {isApproveOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Confirm Loan Approval
            </h3>
            <p className="text-slate-300">
              Approve loan application <strong>{selectedApp.appNumber}</strong> for {selectedApp.applicantName} with financing channel <strong>{selectedApp.financingChannel}</strong>?
            </p>
            <div>
              <label className="text-slate-400 block mb-1">Approval Internal Notes</label>
              <textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white h-20 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsApproveOpen(false)}
                className="px-3 py-1.5 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              >
                Authorize & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Reject Loan */}
      {isRejectOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Confirm Loan Application Rejection
            </h3>
            <p className="text-slate-300">
              Please record the formal reason for declining application <strong>{selectedApp.appNumber}</strong>. This decision will be logged permanently in the multi-tenant audit trail.
            </p>
            <div>
              <label className="text-slate-400 block mb-1">Recorded Reason for Denial</label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white text-xs mb-2"
              >
                <option value="Unsatisfactory CMAP / Credit Bureau adverse findings.">CMAP Adverse Findings</option>
                <option value="Debt-to-Income (DTI) ratio exceeds maximum permissible threshold.">High Debt-to-Income (DTI)</option>
                <option value="Unverifiable employer or dividend cash flow documentation.">Unverifiable Income</option>
                <option value="Down payment equity funds unverified within required timeframe.">Unverified Equity Funds</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsRejectOpen(false)}
                className="px-3 py-1.5 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-3 py-1.5 rounded-none bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Docs Dialog */}
      {isRequestDocOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              Request Additional Documents
            </h3>
            <div>
              <label className="text-slate-400 block mb-1">Document Required</label>
              <input
                type="text"
                value={requestedDocName}
                onChange={(e) => setRequestedDocName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsRequestDocOpen(false)}
                className="px-3 py-1.5 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestDoc}
                className="px-3 py-1.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Application Creation Modal */}
      {isNewAppModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateApp}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">New Loan Application</h3>
              <button
                type="button"
                onClick={() => setIsNewAppModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Applicant Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Camille Alcantara-Sy"
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
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Select Vehicle from Fleet</label>
                <select
                  value={formVehicleId}
                  onChange={(e) => setFormVehicleId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({currencySymbol}{v.priceNumeric.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Down Payment (%)</label>
                  <select
                    value={formDpPct}
                    onChange={(e) => setFormDpPct(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  >
                    <option value={20}>20% Down Payment</option>
                    <option value={25}>25% Down Payment</option>
                    <option value={30}>30% Down Payment</option>
                    <option value={40}>40% Down Payment</option>
                    <option value={50}>50% Down Payment</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Term (Months)</label>
                  <select
                    value={formTerm}
                    onChange={(e) => setFormTerm(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  >
                    <option value={24}>24 Months (2 Yrs)</option>
                    <option value={36}>36 Months (3 Yrs)</option>
                    <option value={48}>48 Months (4 Yrs)</option>
                    <option value={60}>60 Months (5 Yrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Financing Channel</label>
                <select
                  value={formChannel}
                  onChange={(e) => setFormChannel(e.target.value as FinancingApplication['financingChannel'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  <option value="BDO Unibank Auto Loan">BDO Unibank Auto Loan</option>
                  <option value="BPI Auto Loan">BPI Auto Loan</option>
                  <option value="Security Bank">Security Bank</option>
                  <option value="EastWest Bank">EastWest Bank</option>
                  <option value="DriveFlow In-House Financing">DriveFlow In-House Financing</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Monthly Income (₱)</label>
                  <input
                    type="number"
                    required
                    value={formIncome}
                    onChange={(e) => setFormIncome(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Credit Score</label>
                  <input
                    type="number"
                    required
                    value={formScore}
                    onChange={(e) => setFormScore(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsNewAppModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Application Modal */}
      {editingApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Edit Application Terms</h3>
                <span className="text-[11px] font-mono text-red-400">{editingApp.appNumber}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingApp(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Applicant Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    required
                    value={editVehicleName}
                    onChange={(e) => setEditVehicleName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Vehicle Price (₱)</label>
                  <input
                    type="number"
                    required
                    value={editVehiclePrice}
                    onChange={(e) => setEditVehiclePrice(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Down Payment (%)</label>
                  <select
                    value={editDpPct}
                    onChange={(e) => setEditDpPct(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  >
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={25}>25%</option>
                    <option value={30}>30%</option>
                    <option value={40}>40%</option>
                    <option value={50}>50%</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Term (Months)</label>
                  <select
                    value={editTerm}
                    onChange={(e) => setEditTerm(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  >
                    <option value={12}>12 Mos</option>
                    <option value={24}>24 Mos</option>
                    <option value={36}>36 Mos</option>
                    <option value={48}>48 Mos</option>
                    <option value={60}>60 Mos</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as FinancingStatus)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Documents Required">Docs Required</option>
                    <option value="Assessment">CI Assessment</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Declared Monthly Income (₱)</label>
                  <input
                    type="number"
                    value={editIncome}
                    onChange={(e) => setEditIncome(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Credit Score</label>
                  <input
                    type="number"
                    value={editScore}
                    onChange={(e) => setEditScore(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingApp(null)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Dropdown Menu via Portal - never cropped by table or footer */}
      {mounted && dropdownMenu && createPortal(
        <div
          className="financing-portal-dropdown w-56 bg-[#0d111d] border border-slate-700 shadow-2xl rounded-none py-1 text-xs text-left"
          style={{
            position: 'fixed',
            top: dropdownMenu.top,
            right: dropdownMenu.right,
            zIndex: 99999,
          }}
        >
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Actions</span>
            <span className="text-red-400 font-semibold">{dropdownMenu.app.appNumber}</span>
          </div>

          {/* View Detailed Dossier */}
          <button
            type="button"
            onClick={() => {
              setSelectedApp(dropdownMenu.app);
              setDropdownMenu(null);
            }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer font-medium"
          >
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span>View Detailed Dossier</span>
          </button>

          {/* Edit Application */}
          <button
            type="button"
            onClick={() => {
              handleOpenEdit(dropdownMenu.app);
              setDropdownMenu(null);
            }}
            className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-sky-400" />
            <span>Edit Application Terms</span>
          </button>

          {/* Change Status Section */}
          <div className="px-3 py-1 border-t border-slate-800 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
            Change Underwriting Status
          </div>
          <div className="grid grid-cols-2 gap-1 px-2 py-1">
            {(['Under Review', 'Approved', 'Documents Required', 'Assessment', 'Rejected', 'Completed'] as FinancingStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  if (onUpdateStatus) {
                    onUpdateStatus(dropdownMenu.app.id, s);
                  }
                  setDropdownMenu(null);
                }}
                className={`px-1.5 py-1 text-[10px] font-mono rounded-none text-left truncate transition cursor-pointer ${
                  dropdownMenu.app.status === s
                    ? 'bg-slate-800 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {s === 'Documents Required' ? 'Docs Req.' : s === 'Under Review' ? 'Review' : s}
              </button>
            ))}
          </div>

          {/* Request Docs */}
          <button
            type="button"
            onClick={() => {
              setSelectedApp(dropdownMenu.app);
              setIsRequestDocOpen(true);
              setDropdownMenu(null);
            }}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-amber-400 hover:bg-slate-800 transition cursor-pointer border-t border-slate-800/80"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Request Regulatory Docs</span>
          </button>

          {/* Quick Contact Applicant */}
          <a
            href={`tel:${dropdownMenu.app.phone}`}
            onClick={() => setDropdownMenu(null)}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer border-t border-slate-800/80"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {dropdownMenu.app.phone}</span>
          </a>

          <a
            href={`mailto:${dropdownMenu.app.email}`}
            onClick={() => setDropdownMenu(null)}
            className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition cursor-pointer"
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

