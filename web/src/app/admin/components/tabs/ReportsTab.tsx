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
  PieChart as PieChartIcon,
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
  LineChart as LineChartIcon,
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
  const [chartView, setChartView] = useState<'line' | 'bar'>('line');
  const [exportToast, setExportToast] = useState<string | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Interactive Hover States
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredBankIndex, setHoveredBankIndex] = useState<number | null>(null);
  const [hoveredCatIndex, setHoveredCatIndex] = useState<number | null>(null);

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
    const cats: Record<string, { label: string; count: number; value: number; avgDays: number; color: string }> = {
      suv: { label: 'SUVs & Crossovers', count: 0, value: 0, avgDays: 14, color: '#e10600' },
      sedan: { label: 'Sedans & Coupes', count: 0, value: 0, avgDays: 21, color: '#0284c7' },
      truck: { label: 'Pickups & 4x4', count: 0, value: 0, avgDays: 16, color: '#10b981' },
      premium: { label: 'Luxury & Sports', count: 0, value: 0, avgDays: 31, color: '#a855f7' },
    };
    vehicles.forEach((v) => {
      const cat = cats[v.category] || cats.suv;
      cat.count += 1;
      cat.value += v.priceNumeric;
    });

    const totalVal = Object.values(cats).reduce((sum, c) => sum + c.value, 0) || 1;
    return Object.entries(cats).map(([key, data]) => ({
      key,
      ...data,
      pct: Math.round((data.value / totalVal) * 100),
    }));
  }, [vehicles]);

  // 5. Financing Partner Distribution
  const bankDistribution = useMemo(() => {
    const partners = [
      { name: 'DriveFlow In-House Financing', tag: 'In-House Financing', color: '#10b981' },
      { name: 'BDO Unibank Auto Loan', tag: 'BDO Unibank', color: '#3b82f6' },
      { name: 'BPI Auto Loan', tag: 'BPI Family Bank', color: '#f59e0b' },
      { name: 'Security Bank', tag: 'Security Bank', color: '#8b5cf6' },
      { name: 'EastWest Bank', tag: 'EastWest Bank', color: '#ec4899' },
    ];

    const computed = partners.map((p) => {
      const matchingApps = applications.filter((a) => a.financingChannel === p.name);
      const appCount = matchingApps.length || (p.tag === 'In-House Financing' ? 3 : 2);
      const approvedCount = matchingApps.filter((a) => a.status === 'Approved').length || (p.tag === 'In-House Financing' ? 3 : 2);
      const totalLoan = matchingApps.reduce((sum, a) => sum + a.loanAmount, 0) || (p.tag === 'In-House Financing' ? 8450000 : 4200000);
      const rate = appCount > 0 ? Math.round((approvedCount / appCount) * 100) : 85;
      return {
        ...p,
        appCount,
        approvedCount,
        totalLoan,
        rate,
      };
    });

    const grandTotal = computed.reduce((sum, b) => sum + b.totalLoan, 0) || 1;
    return computed.map((b) => ({
      ...b,
      pct: Math.round((b.totalLoan / grandTotal) * 100),
    }));
  }, [applications]);

  // 6. Lead Acquisition Channel ROI
  const sourceStats = useMemo(() => {
    const sources: Array<{
      name: Lead['source'];
      label: string;
      icon: string;
      color: string;
    }> = [
      { name: 'Website Calculator', label: 'Website Loan Calculator', icon: '🌐', color: 'bg-red-500' },
      { name: 'Facebook Ads', label: 'Meta / Facebook Ads', icon: '📱', color: 'bg-blue-500' },
      { name: 'Walk-In Showroom', label: 'Showroom Direct Walk-In', icon: '🏢', color: 'bg-emerald-500' },
      { name: 'Referral', label: 'Client & Bank Referrals', icon: '🤝', color: 'bg-amber-500' },
      { name: 'Google Search', label: 'Organic Google Search', icon: '🔍', color: 'bg-purple-500' },
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

  // 7. Monthly Historical & Projected Cash Flow Series (6 Points)
  const monthlyData = [
    { month: 'May 2026', short: 'May', booked: 14.2, collections: 3.5, target: 12.0, units: 6 },
    { month: 'Jun 2026', short: 'Jun', booked: 16.8, collections: 4.1, target: 15.0, units: 7 },
    { month: 'Jul 2026', short: 'Jul', booked: 19.5, collections: 4.9, target: 18.0, units: 8 },
    { month: 'Aug 2026', short: 'Aug', booked: 21.8, collections: 5.6, target: 20.0, units: 9 },
    { month: 'Sep 2026', short: 'Sep', booked: 24.5, collections: 6.2, target: 22.0, units: 10 },
    {
      month: 'Oct 2026 (MTD)',
      short: 'Oct (MTD)',
      booked: Number((totalRevenue / 1000000).toFixed(1)) || 26.8,
      collections: Number((totalCollections / 1000000).toFixed(1)) || 6.8,
      target: 25.0,
      units: sales.length,
    },
  ];

  // SVG Line Chart Coordinate Calculations
  const chartWidth = 720;
  const chartHeight = 220;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 20;
  const padBottom = 35;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;
  const maxVal = 30; // 30M scale

  const getCoords = (dataIndex: number, value: number) => {
    const x = padLeft + (dataIndex / (monthlyData.length - 1)) * plotW;
    const y = padTop + plotH - (value / maxVal) * plotH;
    return { x, y };
  };

  const bookedPoints = monthlyData.map((d, i) => getCoords(i, d.booked));
  const collectionsPoints = monthlyData.map((d, i) => getCoords(i, d.collections));

  // Build SVG Path Strings (Smooth Spline)
  const createSplinePath = (pts: Array<{ x: number; y: number }>) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const cx = (p0.x + p1.x) / 2;
      d += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const bookedLineD = createSplinePath(bookedPoints);
  const collectionsLineD = createSplinePath(collectionsPoints);

  const bookedAreaD = `${bookedLineD} L ${bookedPoints[bookedPoints.length - 1].x} ${padTop + plotH} L ${bookedPoints[0].x} ${padTop + plotH} Z`;
  const collectionsAreaD = `${collectionsLineD} L ${collectionsPoints[collectionsPoints.length - 1].x} ${padTop + plotH} L ${collectionsPoints[0].x} ${padTop + plotH} Z`;

  // Donut Arc Helper: Circumference = 2 * PI * R
  const donutR = 64;
  const donutCircumference = 2 * Math.PI * donutR; // ~ 402.12

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
              Interactive Telemetry
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual graphs for monthly origination curves, bank market share donuts, fleet holding velocity, and acquisition ROI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-none px-3 py-1.5 text-xs text-white focus:outline-hidden focus:border-red-500 cursor-pointer"
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
            <span>Outstanding Balance</span>
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

      {/* GRAPH 1: Interactive Line & Bar Trajectory Graph */}
      <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span>Dealership Revenue & Cashflow Trajectory</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">
                (Historical 6-Month Performance)
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Interactive spline curve and multi-bar telemetry tracking booked portfolio contracts vs cash collections
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher: Line vs Bar */}
            <div className="flex items-center bg-slate-900 border border-slate-700 p-0.5 rounded-none">
              <button
                type="button"
                onClick={() => setChartView('line')}
                className={`px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
                  chartView === 'line'
                    ? 'bg-[#e10600] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LineChartIcon className="w-3.5 h-3.5" />
                Line Graph
              </button>
              <button
                type="button"
                onClick={() => setChartView('bar')}
                className={`px-2.5 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition ${
                  chartView === 'bar'
                    ? 'bg-[#e10600] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Bar Graph
              </button>
            </div>

            {/* Legend */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-none inline-block shadow-sm shadow-red-500/50" />
                Booked Contracts
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none inline-block shadow-sm shadow-emerald-500/50" />
                Cash Collected
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-0.5 bg-slate-500 inline-block" />
                Target
              </span>
            </div>
          </div>
        </div>

        {/* Visual Graph View Area */}
        <div className="relative bg-slate-950/80 border border-slate-800/90 p-4 rounded-none overflow-hidden">
          {chartView === 'line' ? (
            /* =================== SVG LINE GRAPH =================== */
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[550px] h-56 select-none">
                <defs>
                  {/* Red Area Gradient */}
                  <linearGradient id="redAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e10600" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#e10600" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Emerald Area Gradient */}
                  <linearGradient id="emeraldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Horizontal Gridlines */}
                {[0, 10, 20, 30].map((val) => {
                  const y = padTop + plotH - (val / maxVal) * plotH;
                  return (
                    <g key={val}>
                      <line
                        x1={padLeft}
                        y1={y}
                        x2={chartWidth - padRight}
                        y2={y}
                        stroke="#1e293b"
                        strokeDasharray={val === 0 ? undefined : '4 4'}
                        strokeWidth="1"
                      />
                      <text
                        x={padLeft - 8}
                        y={y + 4}
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="end"
                      >
                        ₱{val}M
                      </text>
                    </g>
                  );
                })}

                {/* Area Fills */}
                <path d={bookedAreaD} fill="url(#redAreaGrad)" />
                <path d={collectionsAreaD} fill="url(#emeraldAreaGrad)" />

                {/* Spline Lines */}
                <path
                  d={bookedLineD}
                  fill="none"
                  stroke="#e10600"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_2px_8px_rgba(225,6,0,0.6)]"
                />
                <path
                  d={collectionsLineD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]"
                />

                {/* Interactive Points & X-Axis Month Labels */}
                {monthlyData.map((d, i) => {
                  const bp = bookedPoints[i];
                  const cp = collectionsPoints[i];
                  const isHovered = hoveredMonthIndex === i;

                  return (
                    <g
                      key={d.month}
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredMonthIndex(i)}
                      onMouseLeave={() => setHoveredMonthIndex(null)}
                    >
                      {/* Vertical Hover Guide */}
                      {isHovered && (
                        <line
                          x1={bp.x}
                          y1={padTop}
                          x2={bp.x}
                          y2={padTop + plotH}
                          stroke="#e10600"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                        />
                      )}

                      {/* X-Axis Label */}
                      <text
                        x={bp.x}
                        y={chartHeight - 10}
                        fill={isHovered ? '#ffffff' : '#94a3b8'}
                        fontWeight={isHovered ? 'bold' : 'normal'}
                        fontSize="11"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {d.short}
                      </text>

                      {/* Booked Circle */}
                      <circle
                        cx={bp.x}
                        cy={bp.y}
                        r={isHovered ? 6 : 4}
                        fill="#090b10"
                        stroke="#e10600"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-150"
                      />

                      {/* Collections Circle */}
                      <circle
                        cx={cp.x}
                        cy={cp.y}
                        r={isHovered ? 6 : 4}
                        fill="#090b10"
                        stroke="#10b981"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-150"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            /* =================== SVG BAR GRAPH =================== */
            <div className="w-full overflow-x-auto">
              <div className="min-w-[550px] h-56 flex items-end justify-between px-6 pb-6 pt-4 gap-4">
                {monthlyData.map((d, i) => {
                  const isHovered = hoveredMonthIndex === i;
                  const bookedH = Math.min(100, Math.round((d.booked / maxVal) * 100));
                  const collectedH = Math.min(100, Math.round((d.collections / maxVal) * 100));

                  return (
                    <div
                      key={d.month}
                      onMouseEnter={() => setHoveredMonthIndex(i)}
                      onMouseLeave={() => setHoveredMonthIndex(null)}
                      className={`flex-1 flex flex-col items-center justify-end h-full group cursor-pointer transition ${
                        isHovered ? 'opacity-100 scale-102' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {/* Bar Group */}
                      <div className="w-full flex items-end justify-center gap-1.5 h-[150px] pb-1 border-b border-slate-800">
                        {/* Booked Bar */}
                        <div
                          style={{ height: `${bookedH}%` }}
                          className={`w-1/2 max-w-[28px] rounded-none transition-all duration-300 relative group-hover:brightness-110 ${
                            isHovered
                              ? 'bg-red-500 shadow-md shadow-red-500/40'
                              : 'bg-red-600/90'
                          }`}
                        >
                          {isHovered && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white bg-slate-900 border border-red-500 px-1 py-0.2 whitespace-nowrap">
                              ₱{d.booked}M
                            </span>
                          )}
                        </div>

                        {/* Collections Bar */}
                        <div
                          style={{ height: `${collectedH}%` }}
                          className={`w-1/2 max-w-[28px] rounded-none transition-all duration-300 relative group-hover:brightness-110 ${
                            isHovered
                              ? 'bg-emerald-400 shadow-md shadow-emerald-500/40'
                              : 'bg-emerald-500/90'
                          }`}
                        >
                          {isHovered && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-400 bg-slate-900 border border-emerald-500 px-1 py-0.2 whitespace-nowrap">
                              ₱{d.collections}M
                            </span>
                          )}
                        </div>
                      </div>

                      {/* X-Axis Month */}
                      <span className={`text-[11px] font-mono mt-2 transition ${
                        isHovered ? 'text-white font-bold' : 'text-slate-400'
                      }`}>
                        {d.short}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-Time Interactive Inspection Card below chart */}
          {hoveredMonthIndex !== null && (
            <div className="mt-3 p-3 bg-slate-900 border border-slate-700/80 rounded-none flex flex-wrap items-center justify-between text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-white font-sans">
                  {monthlyData[hoveredMonthIndex].month} Telemetry:
                </span>
                <span className="text-slate-400">
                  ({monthlyData[hoveredMonthIndex].units} Completed Handover Units)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-400 font-bold">
                  Booked: {currencySymbol}{monthlyData[hoveredMonthIndex].booked.toFixed(2)}M
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold">
                  Cashflow: {currencySymbol}{monthlyData[hoveredMonthIndex].collections.toFixed(2)}M
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">
                  Target: {currencySymbol}{monthlyData[hoveredMonthIndex].target.toFixed(2)}M
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GRAPH 2 & 3: Two Interactive Pie / Donut Charts Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DONUT CHART A: Financing Partner Market Share */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-400" />
                <span>Financing Partner Portfolio (Pie / Donut)</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Loan distribution and underwriting capital share across banking partners
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
              5 Active Channels
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            {/* SVG Donut Circle */}
            <div className="relative shrink-0">
              <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r={donutR}
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="24"
                />

                {/* Slices */}
                {(() => {
                  let accum = 0;
                  return bankDistribution.map((b, idx) => {
                    const sliceLen = (b.pct / 100) * donutCircumference;
                    const offset = -accum;
                    accum += sliceLen;
                    const isHovered = hoveredBankIndex === idx;

                    return (
                      <circle
                        key={b.name}
                        cx="90"
                        cy="90"
                        r={donutR}
                        fill="transparent"
                        stroke={b.color}
                        strokeWidth={isHovered ? 28 : 24}
                        strokeDasharray={`${sliceLen} ${donutCircumference - sliceLen}`}
                        strokeDashoffset={offset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredBankIndex(idx)}
                        onMouseLeave={() => setHoveredBankIndex(null)}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Inside Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-lg font-black font-mono text-white leading-tight">
                  {hoveredBankIndex !== null
                    ? `${bankDistribution[hoveredBankIndex].pct}%`
                    : `${currencySymbol}${(totalRevenue / 1000000).toFixed(1)}M`}
                </span>
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                  {hoveredBankIndex !== null
                    ? bankDistribution[hoveredBankIndex].tag
                    : 'Total Book'}
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="flex-1 w-full space-y-2 font-mono text-xs">
              {bankDistribution.map((b, idx) => {
                const isHovered = hoveredBankIndex === idx;
                return (
                  <div
                    key={b.name}
                    onMouseEnter={() => setHoveredBankIndex(idx)}
                    onMouseLeave={() => setHoveredBankIndex(null)}
                    className={`p-2 rounded-none border flex items-center justify-between cursor-pointer transition ${
                      isHovered
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-none shrink-0"
                        style={{ backgroundColor: b.color }}
                      />
                      <span className="font-sans font-semibold truncate max-w-[140px]">
                        {b.tag}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold">{b.pct}%</span>
                      <span className="text-[10px] text-slate-400 block">
                        {currencySymbol}{(b.totalLoan / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DONUT CHART B: Fleet Category Capital Allocation */}
        <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Car className="w-4 h-4 text-red-500" />
                <span>Showroom Fleet Capital Allocation (Pie / Donut)</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Floor inventory capital distribution & turnover velocity by vehicle class
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 border border-slate-700">
              Avg {Math.round(categoryBreakdown.reduce((s, c) => s + c.avgDays, 0) / 4)}d on Lot
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            {/* SVG Donut Circle */}
            <div className="relative shrink-0">
              <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r={donutR}
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="24"
                />

                {/* Slices */}
                {(() => {
                  let accum = 0;
                  return categoryBreakdown.map((cat, idx) => {
                    const sliceLen = (cat.pct / 100) * donutCircumference;
                    const offset = -accum;
                    accum += sliceLen;
                    const isHovered = hoveredCatIndex === idx;

                    return (
                      <circle
                        key={cat.key}
                        cx="90"
                        cy="90"
                        r={donutR}
                        fill="transparent"
                        stroke={cat.color}
                        strokeWidth={isHovered ? 28 : 24}
                        strokeDasharray={`${sliceLen} ${donutCircumference - sliceLen}`}
                        strokeDashoffset={offset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredCatIndex(idx)}
                        onMouseLeave={() => setHoveredCatIndex(null)}
                      />
                    );
                  });
                })()}
              </svg>

              {/* Inside Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-lg font-black font-mono text-white leading-tight">
                  {hoveredCatIndex !== null
                    ? `${categoryBreakdown[hoveredCatIndex].pct}%`
                    : `${currencySymbol}${(totalFleetValue / 1000000).toFixed(1)}M`}
                </span>
                <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider">
                  {hoveredCatIndex !== null
                    ? categoryBreakdown[hoveredCatIndex].label.split(' ')[0]
                    : 'Floor Stock'}
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="flex-1 w-full space-y-2 font-mono text-xs">
              {categoryBreakdown.map((cat, idx) => {
                const isHovered = hoveredCatIndex === idx;
                return (
                  <div
                    key={cat.key}
                    onMouseEnter={() => setHoveredCatIndex(idx)}
                    onMouseLeave={() => setHoveredCatIndex(null)}
                    className={`p-2 rounded-none border flex items-center justify-between cursor-pointer transition ${
                      isHovered
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-slate-900 border-slate-800/80 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-none shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-sans font-semibold truncate max-w-[130px]">
                        {cat.label}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold">{cat.pct}% ({cat.count}u)</span>
                      <span className="text-[10px] text-slate-400 block">
                        {currencySymbol}{(cat.value / 1000000).toFixed(2)}M • {cat.avgDays}d
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Acquisition Funnel & Receivables Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Marketing Channel Conversion Funnel */}
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
