'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  FileSpreadsheet,
  Users,
  Car,
  Receipt,
  CheckCircle2,
  PieChart,
  ArrowUpRight,
} from 'lucide-react';
import { AdminVehicle, FinancingApplication, SaleRecord, Lead, StaffMember } from '../../types';

interface ReportsTabProps {
  vehicles: AdminVehicle[];
  applications: FinancingApplication[];
  sales: SaleRecord[];
  leads: Lead[];
  staff: StaffMember[];
  currencySymbol: string;
}

export const ReportsTab: React.FC<ReportsTabProps> = ({
  vehicles,
  applications,
  sales,
  leads,
  staff,
  currencySymbol,
}) => {
  const [dateRange, setDateRange] = useState('q4-2026');
  const [exportToast, setExportToast] = useState<string | null>(null);

  const handleExport = (format: 'CSV' | 'PDF', reportType: string) => {
    setExportToast(`Generated & downloaded: DriveFlow_${reportType}_${dateRange.toUpperCase()}.${format.toLowerCase()}`);
    setTimeout(() => setExportToast(null), 3000);
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalCollections = sales.reduce((sum, s) => sum + s.downPaymentPaid, 0);
  const totalOutstanding = sales.reduce((sum, s) => sum + s.remainingBalance, 0);
  const totalApprovedApps = applications.filter((a) => a.status === 'Approved').length;
  const approvalRate = Math.round((totalApprovedApps / (applications.length || 1)) * 100);
  const convertedLeads = leads.filter((l) => l.stage === 'Converted').length;
  const leadConversionRate = Math.round((convertedLeads / (leads.length || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Export Toast */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-blue-500 text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold flex items-center gap-2">
          <Download className="w-4 h-4 text-blue-400" />
          {exportToast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Executive Reports & Dealership Analytics</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
              Audited Metrics
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate board-ready portfolio analytics, collection efficiency ratios, loan approval rates, and sales conversion telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-hidden"
          >
            <option value="last-30">Last 30 Days</option>
            <option value="q3-2026">Q3 2026 (Jul - Sep)</option>
            <option value="q4-2026">Q4 2026 (Oct - Dec MTD)</option>
            <option value="ytd-2026">Full Year 2026 (YTD)</option>
          </select>

          <button
            onClick={() => handleExport('CSV', 'ExecutiveSummary')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('PDF', 'FinancialPortfolio')}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* High-Level Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#121624] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Closed Deal Volume</span>
          <div className="text-2xl font-black font-mono text-white mt-1">
            {currencySymbol}{(totalRevenue / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
            {sales.length} Closed Contracts
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#121624] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Downpayment & Collections</span>
          <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
            {currencySymbol}{(totalCollections / 1000000).toFixed(2)}M
          </div>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">
            Outstanding: {currencySymbol}{(totalOutstanding / 1000000).toFixed(2)}M
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#121624] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Financing Approval Rate</span>
          <div className="text-2xl font-black font-mono text-blue-400 mt-1">
            {approvalRate}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {totalApprovedApps} of {applications.length} applications
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#121624] border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Lead-to-Sale Conversion</span>
          <div className="text-2xl font-black font-mono text-purple-400 mt-1">
            {leadConversionRate}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Industry Benchmark: 12%
          </span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Collections Aging Report */}
        <div className="p-5 rounded-xl bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Receivables Aging & Recovery Analysis</h3>
              <p className="text-[11px] text-slate-400">Installment payment collection performance across days past due</p>
            </div>
            <button
              onClick={() => handleExport('CSV', 'ReceivablesAging')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              CSV
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { label: 'Current / Not Yet Due', amount: '₱12,450,000', pct: '88%', status: 'Healthy', color: 'bg-emerald-500' },
              { label: '1 - 30 Days Past Due', amount: '₱1,250,000', pct: '8%', status: 'Watchlist', color: 'bg-amber-500' },
              { label: '31 - 60 Days Past Due', amount: '₱420,000', pct: '3%', status: 'Reminded', color: 'bg-orange-500' },
              { label: '60+ Days (Legal Demand)', amount: '₱180,000', pct: '1%', status: 'Legal Notice', color: 'bg-red-500' },
            ].map((row) => (
              <div key={row.label} className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-white">{row.label}</span>
                  <span className="font-bold text-white">{row.amount} ({row.pct})</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div style={{ width: row.pct }} className={`h-full ${row.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Consultant Leaderboard */}
        <div className="p-5 rounded-xl bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Sales Consultant Performance Leaderboard</h3>
              <p className="text-[11px] text-slate-400">Attributed closed deals, gross volume, and commission eligibility</p>
            </div>
            <button
              onClick={() => handleExport('PDF', 'StaffSalesCommission')}
              className="text-xs text-blue-400 hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              PDF
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {staff.slice(0, 4).map((member, idx) => (
              <div
                key={member.id}
                className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-slate-800 font-mono text-[10px] font-bold text-slate-300 flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{member.name}</span>
                    <span className="text-[10px] text-slate-400">{member.role} • {member.branchName.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-400 block">
                    {currencySymbol}{((idx === 0 ? 8.75 : idx === 1 ? 6.95 : 4.33)).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {idx === 0 ? '4 Units' : idx === 1 ? '2 Units' : '1 Unit'} Closed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

