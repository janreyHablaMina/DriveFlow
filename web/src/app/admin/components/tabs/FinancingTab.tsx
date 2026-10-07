'use client';

import React, { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { FinancingApplication, FinancingStatus, DealershipBranch, AdminVehicle } from '../../types';

interface FinancingTabProps {
  applications: FinancingApplication[];
  branches: DealershipBranch[];
  vehicles: AdminVehicle[];
  onApproveApplication: (id: string, notes: string) => void;
  onRejectApplication: (id: string, reason: string) => void;
  onRequestDocs: (id: string, docName: string) => void;
  onNewApplication: (app: Omit<FinancingApplication, 'id' | 'auditTrail' | 'submittedDate'>) => void;
  currencySymbol: string;
}

export const FinancingTab: React.FC<FinancingTabProps> = ({
  applications,
  branches,
  vehicles,
  onApproveApplication,
  onRejectApplication,
  onRequestDocs,
  onNewApplication,
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
  const [formBranchId, setFormBranchId] = useState(branches[0]?.id || 'bgc');

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

      {/* Applications Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Application Details</th>
                <th className="py-3 px-3">Vehicle Financed</th>
                <th className="py-3 px-3">Income & Credit Score</th>
                <th className="py-3 px-3">Loan Amount & Term</th>
                <th className="py-3 px-3">Monthly Amortization</th>
                <th className="py-3 px-3">Lending Channel</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {app.appNumber}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium">{app.applicantName}</div>
                    <div className="text-[10px] font-mono text-slate-500">{app.phone}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-white font-medium truncate max-w-[170px]">{app.vehicleName}</div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Price: {currencySymbol}{app.vehiclePrice.toLocaleString()}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[11px]">
                    <div className="text-emerald-400 font-mono font-bold">
                      {currencySymbol}{app.monthlyIncome.toLocaleString()} / mo
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>Score: <strong className="text-white font-mono">{app.creditScore}</strong></span>
                      <span className="text-emerald-400">({app.cmapStatus})</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div className="text-white font-bold">{currencySymbol}{app.loanAmount.toLocaleString()}</div>
                    <div className="text-slate-400 text-[10px]">{app.termMonths} Months @ {app.interestRatePa}% p.a.</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-red-500 font-bold text-[11px]">
                    {currencySymbol}{app.monthlyAmortization.toLocaleString()} / mo
                  </td>

                  <td className="py-3 px-3 text-[11px] text-slate-300">
                    <span className="block truncate max-w-[130px]">{app.financingChannel}</span>
                  </td>

                  <td className="py-3 px-3">
                    {getStatusBadge(app.status)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-2.5 py-1 rounded-none bg-slate-800 hover:bg-slate-700 text-red-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedApp.appNumber}</h3>
                  {getStatusBadge(selectedApp.status)}
                </div>
                <span className="text-xs text-slate-400">
                  Applicant: {selectedApp.applicantName} • Channel: {selectedApp.financingChannel}
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Financial Summary Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-none bg-slate-900 border border-slate-800 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Vehicle Price</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.vehiclePrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Down Payment ({selectedApp.downPaymentPercent}%)</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.downPaymentAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Principal Financed</span>
                <span className="text-white font-bold">{currencySymbol}{selectedApp.loanAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Monthly Amortization</span>
                <span className="text-red-500 font-bold text-sm">
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
    </div>
  );
};

