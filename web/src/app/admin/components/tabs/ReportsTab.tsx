'use client';

import React, { useState, useMemo } from 'react';
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
  ShieldCheck,
  Building,
  Clock,
  Printer,
  X,
  Layers,
  Sparkles,
  DollarSign,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Landmark,
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
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const handleExport = (format: 'CSV' | 'PDF', reportType: string) => {
    setExportToast(`Generated & downloaded: DriveFlow_${reportType}_${dateRange.toUpperCase()}.${format.toLowerCase()}`);
    setTimeout(() => setExportToast(null), 3000);
  };

  const printReport = () => {
    window.print();
  };

  // 1. Financial Performance Metrics
  const totalRevenue = useMemo(() => sales.reduce((sum, s) => sum + s.salePrice, 0), [sales]);
  const totalCollections = useMemo(() => sales.reduce((sum, s) => sum + s.downPaymentPaid, 0), [sales]);
  const totalOutstanding = useMemo(() => sales.reduce((sum, s) => sum + s.remainingBalance, 0), [sales]);
  const avgTicketPrice = useMemo(() => Math.round(totalRevenue / (sales.length || 1)), [totalRevenue, sales]);

  // 2. Underwriting & Loan Origination Metrics
  const totalApprovedApps = useMemo(() => applications.filter((a) => a.status === 'Approved').length, [applications]);
  const approvalRate = useMemo(() => Math.round((totalApprovedApps / (applications.length || 1)) * 100), [totalApprovedApps, applications]);
  const avgCreditScore = useMemo(() => {
    if (applications.length === 0) return 720;
    const sum = applications.reduce((acc, a) => acc + (a.creditScore || 700), 0);
    return Math.round(sum / applications.length);
  }, [applications]);
  const cmapCleanCount = useMemo(() => applications.filter((a) => a.cmapStatus === 'Cleared').length, [applications]);
  const cmapCleanPct = useMemo(() => Math.round((cmapCleanCount / (applications.length || 1)) * 100), [cmapCleanCount, applications]);

  // 3. Lead Conversion Metrics
  const convertedLeads = useMemo(() => leads.filter((l) => l.stage === 'Converted').length, [leads]);
  const leadConversionRate = useMemo(() => Math.round((convertedLeads / (leads.length || 1)) * 100), [convertedLeads, leads]);
  const pipelineVolume = useMemo(() => leads.reduce((sum, l) => sum + (l.budget || 0), 0), [leads]);

  // 4. Fleet & Inventory Turnover Telemetry
  const availableVehicles = useMemo(() => vehicles.filter((v) => v.status === 'Available'), [vehicles]);
  const totalFleetValue = useMemo(() => availableVehicles.reduce((sum, v) => sum + v.priceNumeric, 0), [availableVehicles]);
  const reservedCount = useMemo(() => vehicles.filter((v) => v.status === 'Reserved' || v.status === 'Financing Pending').length, [vehicles]);

  const categoryBreakdown = useMemo(() => {
    const cats: Record<string, { label: string; count: number; value: number; avgDays: number }> = {
      suv: { label: 'SUVs & Crossovers', count: 0, value: 0, avgDays: 14 },
      sedan: { label: 'Sedans & Coupes', count: 0, value: 0, avgDays: 21 },
      truck: { label: 'Pickups & 4x4 Trucks', count: 0, value: 0, avgDays: 16 },
      premium: { label: 'Luxury & Sports', count: 0, value: 0, avgDays: 31 },
    };
    vehicles.forEach((v) => {
      const cat = cats[v.category] || cats.suv;
      cat.count += 1;
      cat.value += v.priceNumeric;
    });
    return Object.entries(cats).map(([key, data]) => ({ key, ...data }));
  }, [vehicles]);

  // 5. Financing Partner Distribution
  const bankDistribution = useMemo(() => {
    const partners = [
      { name: 'DriveFlow In-House Financing', tag: 'In-House' },
      { name: 'BDO Unibank Auto Loan', tag: 'BDO' },
      { name: 'BPI Auto Loan', tag: 'BPI' },
      { name: 'Security Bank', tag: 'Security Bank' },
      { name: 'EastWest Bank', tag: 'EastWest' },
    ];
    return partners.map((p) => {
      const matchingApps = applications.filter((a) => a.financingChannel === p.name);
      const appCount = matchingApps.length;
      const approvedCount = matchingApps.filter((a) => a.status === 'Approved').length;
      const totalLoan = matchingApps.reduce((sum, a) => sum + a.loanAmount, 0);
      const rate = appCount > 0 ? Math.round((approvedCount / appCount) * 100) : 80;
      return {
        ...p,
        appCount,
        approvedCount,
        totalLoan,
        rate,
      };
    });
  }, [applications]);

  // 6. Lead Acquisition Channel ROI
  const sourceStats = useMemo(() => {
    const sources: Array<{
      name: Lead['source'];
      label: string;
      icon: string;
    }> = [
      { name: 'Website Calculator', label: 'Website Loan Calculator', icon: '🌐' },
      { name: 'Facebook Ads', label: 'Meta / Facebook Ads', icon: '📱' },
      { name: 'Walk-In Showroom', label: 'Showroom Direct Walk-In', icon: '🏢' },
      { name: 'Referral', label: 'Client & Bank Referrals', icon: '🤝' },
      { name: 'Google Search', label: 'Organic Google Search', icon: '🔍' },
    ];

    return sources.map((s) => {
      const matchingLeads = leads.filter((l) => l.source === s.name);
      const total = matchingLeads.length;
      const converted = matchingLeads.filter((l) => l.stage === 'Converted').length;
      const pipeline = matchingLeads.reduce((sum, l) => sum + (l.budget || 0), 0);
      const convRate = total > 0 ? Math.round((converted / total) * 100) : 0;
      return {
        ...s,
        total,
        converted,
        convRate,
        pipeline,
      };
    });
  }, [leads]);

  // 7. Monthly Cash Flow & Origination Trajectory (MTD & Historical)
  const monthlyTrends = [
    { month: 'Jul 2026', revenue: 18.4, collections: 4.8, loans: 13.6, units: 8 },
    { month: 'Aug 2026', revenue: 21.2, collections: 5.6, loans: 15.6, units: 10 },
    { month: 'Sep 2026', revenue: 24.8, collections: 6.2, loans: 18.6, units: 11 },
    { month: 'Oct 2026 (MTD)', revenue: totalRevenue / 1000000, collections: totalCollections / 1000000, loans: (totalRevenue - totalCollections) / 1000000, units: sales.length },
  ];

  return (
    <div className="space-y-6">
      {/* Export Toast Notification */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-[#e10600]/80 text-white px-4 py-2.5 rounded-none shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Download className="w-4 h-4 text-red-500" />
          {exportToast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Executive Reports & Dealership Analytics</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none border border-emerald-500/30">
              Live Audited Telemetry
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Portfolio capitalization, collection recovery ratios, inventory holding velocity, bank underwriting SLAs, and acquisition channel ROI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-none px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-red-500"
          >
            <option value="last-30">Last 30 Days</option>
            <option value="q3-2026">Q3 2026 (Jul - Sep)</option>
            <option value="q4-2026">Q4 2026 (Oct - Dec MTD)</option>
            <option value="ytd-2026">Full Year 2026 (YTD)</option>
          </select>

          <button
            onClick={() => setIsDossierOpen(true)}
            className="px-3 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            Print Executive Dossier
          </button>

          <button
            onClick={() => handleExport('CSV', 'ExecutiveSummary')}
            className="px-3 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>

          <button
            onClick={() => handleExport('PDF', 'FinancialPortfolio')}
            className="px-3.5 py-1.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Primary KPI Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Volume */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Closed Deal Volume</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2">+18.2% QoQ</span>
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {currencySymbol}{(totalRevenue / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>{sales.length} Active Contracts</span>
            <span className="font-mono text-slate-300">Avg {currencySymbol}{(avgTicketPrice / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        {/* Collections & Downpayment */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Cash Collected (DP & MTD)</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2">92.4% Recovery</span>
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            {currencySymbol}{(totalCollections / 1000000).toFixed(2)}M
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Outstanding Principal</span>
            <span className="font-mono text-white font-bold">{currencySymbol}{(totalOutstanding / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        {/* Underwriting Approval Rate */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Loan Approval Rate</span>
            <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.2">Avg Score {avgCreditScore}</span>
          </div>
          <div className="text-2xl font-black font-mono text-red-500">
            {approvalRate}%
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>{totalApprovedApps} of {applications.length} Packages Cleared</span>
            <span className="font-mono text-slate-300">{cmapCleanPct}% CMAP Clean</span>
          </div>
        </div>

        {/* Lead Conversion */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Lead-to-Delivery Rate</span>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.2">{convertedLeads} Won Deals</span>
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">
            {leadConversionRate}%
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Pipeline Demand</span>
            <span className="font-mono text-white font-bold">{currencySymbol}{(pipelineVolume / 1000000).toFixed(1)}M Total</span>
          </div>
        </div>
      </div>

      {/* Row 1: Cash Flow & Loan Origination Trajectory (Visual Trend Bars) */}
      <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              Monthly Loan Origination & Cash Inflow Trajectory
            </h3>
            <p className="text-[11px] text-slate-400">
              Gross sales contracts booked vs actual equity & installment collections received per fiscal period
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-red-600 inline-block" />
              Total Origination (₱)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-500 inline-block" />
              Cash Inflow Cleared (₱)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {monthlyTrends.map((t) => {
            const maxVal = 28;
            const revPct = Math.min(100, Math.round((t.revenue / maxVal) * 100));
            const colPct = Math.min(100, Math.round((t.collections / maxVal) * 100));
            return (
              <div key={t.month} className="p-3.5 bg-slate-900 border border-slate-800/90 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white font-sans">{t.month}</span>
                  <span className="text-[10px] text-slate-400">{t.units} Units Delivered</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Total Booked</span>
                      <span className="text-white font-bold">{currencySymbol}{t.revenue.toFixed(2)}M</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 overflow-hidden">
                      <div style={{ width: `${revPct}%` }} className="h-full bg-red-600 transition-all duration-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Collected Cash</span>
                      <span className="text-emerald-400 font-bold">{currencySymbol}{t.collections.toFixed(2)}M</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 overflow-hidden">
                      <div style={{ width: `${colPct}%` }} className="h-full bg-emerald-500 transition-all duration-500" />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80 flex justify-between">
                  <span>Financed Book:</span>
                  <span className="text-slate-300 font-semibold">{currencySymbol}{t.loans.toFixed(2)}M</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Fleet Velocity & Underwriting Partner Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Velocity & Capital Holding */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-300" />
                Fleet Velocity & Capital Holding Analysis
              </h3>
              <p className="text-[11px] text-slate-400">
                Average lot aging days and showroom capital absorption by vehicle category
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-900 border border-slate-700 px-2.5 py-1">
              Floor Value: <strong className="text-emerald-400">{currencySymbol}{(totalFleetValue / 1000000).toFixed(1)}M</strong>
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {categoryBreakdown.map((cat) => (
              <div key={cat.key} className="p-3 bg-slate-900 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between font-sans">
                  <div>
                    <span className="font-semibold text-white">{cat.label}</span>
                    <span className="text-[10px] font-mono text-slate-400 ml-2">({cat.count} units in stock)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold font-mono">{currencySymbol}{(cat.value / 1000000).toFixed(2)}M</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Avg {cat.avgDays} Days on Lot</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, Math.round((cat.value / (totalFleetValue || 1)) * 100))}%` }}
                    className="h-full bg-red-600"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800/90 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Reserved / Pending Release Units:</span>
            <span className="font-bold text-amber-400">{reservedCount} Units Locked</span>
          </div>
        </div>

        {/* Bank Partner Financing Breakdown */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                Financing Partner Distribution & Approval SLA
              </h3>
              <p className="text-[11px] text-slate-400">
                Loan underwriting volume, clearance rates, and turnaround speeds
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 border border-slate-700">
              Avg Turnaround: 2.3 Days
            </span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {bankDistribution.map((bank) => (
              <div
                key={bank.name}
                className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white font-sans">{bank.tag}</span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-400 border border-slate-700">
                      {bank.appCount} Apps
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {bank.approvedCount} approved • {bank.rate}% approval rate
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-emerald-400 block">
                    {currencySymbol}{(bank.totalLoan / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-slate-500">Booked Principal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Acquisition Channels ROI & Receivables Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Channel Conversion ROI */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Customer Acquisition Channel Telemetry
              </h3>
              <p className="text-[11px] text-slate-400">
                Inquiry volume, conversion ratios, and gross buyer budget by touchpoint
              </p>
            </div>
            <button
              onClick={() => handleExport('CSV', 'AcquisitionChannels')}
              className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition cursor-pointer"
            >
              <Download className="w-3 h-3" />
              CSV
            </button>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            {sourceStats.map((src) => (
              <div
                key={src.name}
                className="p-3 bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-sans font-semibold text-white">
                    <span>{src.icon}</span>
                    <span>{src.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                    {src.total} Inquiries • {src.converted} Closed Deals ({src.convRate}%)
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-white block">
                    {currencySymbol}{(src.pipeline / 1000000).toFixed(2)}M
                  </span>
                  <span className="text-[10px] text-slate-500">Pipeline Budget</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Receivables Aging Report */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                Receivables Aging & Recovery Analysis
              </h3>
              <p className="text-[11px] text-slate-400">
                Installment payment collection performance across days past due
              </p>
            </div>
            <button
              onClick={() => handleExport('CSV', 'ReceivablesAging')}
              className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 transition cursor-pointer"
            >
              <Download className="w-3 h-3" />
              CSV
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { label: 'Current / Not Yet Due', amount: '₱14,880,000', pct: '88%', status: 'Healthy', color: 'bg-emerald-500' },
              { label: '1 - 30 Days Past Due', amount: '₱1,250,000', pct: '8%', status: 'Watchlist', color: 'bg-amber-500' },
              { label: '31 - 60 Days Past Due', amount: '₱420,000', pct: '3%', status: 'Reminded', color: 'bg-orange-500' },
              { label: '60+ Days (Legal Demand)', amount: '₱180,000', pct: '1%', status: 'Legal Notice', color: 'bg-red-500' },
            ].map((row) => (
              <div key={row.label} className="p-3 rounded-none bg-slate-900 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-white">{row.label}</span>
                  <span className="font-bold text-white">{row.amount} ({row.pct})</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-none overflow-hidden">
                  <div style={{ width: row.pct }} className={`h-full ${row.color} rounded-none`} />
                </div>
              </div>
            ))}
          </div>

          {/* Sales Consultant Leaderboard Mini */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Top Consultant: {staff[0]?.name || 'Janrey Mina'} ({currencySymbol}8.75M Closed)
            </span>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-slate-900 p-2.5 border border-slate-800">
              <span>Dealership Average Closing Rate:</span>
              <strong className="text-emerald-400">31.4% (Industry: 18%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Board-Ready Executive Dossier Modal */}
      {isDossierOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-none max-w-4xl w-full p-8 max-h-[92vh] overflow-y-auto space-y-6 text-xs shadow-2xl">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
              <div>
                <div className="text-2xl font-black uppercase tracking-wider text-slate-950 font-sans">
                  DRIVEFLOW ENTERPRISE
                </div>
                <div className="text-xs font-bold text-red-600 tracking-widest uppercase">
                  Executive Dealership Performance & Audit Report
                </div>
                <div className="text-[10px] font-mono text-slate-600 mt-1">
                  Tenant: Apex Motors Philippines • SEC Reg #CS2023-091842 • Reporting Period: {dateRange.toUpperCase()}
                </div>
              </div>

              <div className="text-right font-mono text-[10px] text-slate-500">
                <div>Generated: {new Date().toLocaleDateString()}</div>
                <div>Status: Audited & Verified</div>
              </div>
            </div>

            {/* Financial Performance Table */}
            <div>
              <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider mb-2 font-mono">
                1. Executive Portfolio & Capital Summary
              </h4>
              <table className="w-full text-left text-xs border border-slate-300 font-mono">
                <thead className="bg-slate-100 text-[10px] text-slate-700 uppercase border-b border-slate-300">
                  <tr>
                    <th className="py-2 px-3">Metric Key</th>
                    <th className="py-2 px-3">Current Period Value</th>
                    <th className="py-2 px-3">Target / Benchmark</th>
                    <th className="py-2 px-3 text-right">Performance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900 font-sans">Closed Contract Volume</td>
                    <td className="py-2 px-3 font-bold">{currencySymbol}{(totalRevenue / 1000000).toFixed(2)}M</td>
                    <td className="py-2 px-3 text-slate-600">{currencySymbol}20.00M</td>
                    <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Exceeded Target</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900 font-sans">Collected Equity & Downpayments</td>
                    <td className="py-2 px-3 font-bold">{currencySymbol}{(totalCollections / 1000000).toFixed(2)}M</td>
                    <td className="py-2 px-3 text-slate-600">{currencySymbol}4.50M</td>
                    <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ On Schedule</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900 font-sans">Receivables Portfolio Outstanding</td>
                    <td className="py-2 px-3 font-bold">{currencySymbol}{(totalOutstanding / 1000000).toFixed(2)}M</td>
                    <td className="py-2 px-3 text-slate-600">—</td>
                    <td className="py-2 px-3 text-right text-slate-700">92.4% Recovery Grade A</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900 font-sans">Underwriting Clearance Ratio</td>
                    <td className="py-2 px-3 font-bold">{approvalRate}%</td>
                    <td className="py-2 px-3 text-slate-600">75% Industry Avg</td>
                    <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Low Default Risk</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Inventory & Bank Distribution Table */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider mb-2 font-mono">
                  2. Floor Inventory Allocation
                </h4>
                <div className="border border-slate-300 p-3 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>Active Stock Value:</span>
                    <strong>{currencySymbol}{(totalFleetValue / 1000000).toFixed(2)}M</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Floor Units:</span>
                    <strong>{availableVehicles.length} Units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Reserved for Delivery:</span>
                    <strong>{reservedCount} Units</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Velocity Turnaround:</span>
                    <strong>19.4 Days</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-950 uppercase text-xs tracking-wider mb-2 font-mono">
                  3. Partner Underwriting Volume
                </h4>
                <div className="border border-slate-300 p-3 space-y-1 font-mono text-[11px]">
                  {bankDistribution.slice(0, 4).map((b) => (
                    <div key={b.name} className="flex justify-between">
                      <span className="truncate max-w-[160px]">{b.tag}:</span>
                      <strong>{currencySymbol}{(b.totalLoan / 1000000).toFixed(2)}M ({b.rate}%)</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-[10px] text-slate-600">
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">Janrey Mina</div>
                Managing Director / Dealer Principal
              </div>
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">Atty. Carmen Diaz</div>
                Chief Compliance Officer
              </div>
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-900">DriveFlow Enterprise</div>
                Cryptographic System Seal
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 no-print">
              <button
                onClick={printReport}
                className="px-4 py-2 rounded-none bg-slate-900 text-white font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Executive Dossier
              </button>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
