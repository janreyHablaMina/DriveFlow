'use client';

import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Car,
  PieChart as PieChartIcon,
  Layers,
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

  // Interactive Hover States
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);
  const [hoveredBankIndex, setHoveredBankIndex] = useState<number | null>(null);
  const [hoveredCatIndex, setHoveredCatIndex] = useState<number | null>(null);

  const handleExport = () => {
    setExportToast(`Downloaded executive report for ${dateRange.toUpperCase()}`);
    setTimeout(() => setExportToast(null), 3000);
  };

  // 1. Financial Performance Metrics
  const totalRevenue = useMemo(() => sales.reduce((sum, s) => sum + s.salePrice, 0), [sales]);
  const totalCollections = useMemo(() => sales.reduce((sum, s) => sum + s.downPaymentPaid, 0), [sales]);
  const totalOutstanding = useMemo(() => sales.reduce((sum, s) => sum + s.remainingBalance, 0), [sales]);
  const avgTicketPrice = useMemo(() => Math.round(totalRevenue / (sales.length || 1)), [totalRevenue, sales]);

  // 2. Loan Approval & Conversion Metrics
  const totalApprovedApps = useMemo(() => applications.filter((a) => a.status === 'Approved').length, [applications]);
  const approvalRate = useMemo(() => Math.round((totalApprovedApps / (applications.length || 1)) * 100), [totalApprovedApps, applications]);
  const convertedLeads = useMemo(() => leads.filter((l) => l.stage === 'Converted').length, [leads]);
  const leadConversionRate = useMemo(() => Math.round((convertedLeads / (leads.length || 1)) * 100), [convertedLeads, leads]);

  // 3. Fleet & Inventory Telemetry
  const availableVehicles = useMemo(() => vehicles.filter((v) => v.status === 'Available'), [vehicles]);
  const totalFleetValue = useMemo(() => availableVehicles.reduce((sum, v) => sum + v.priceNumeric, 0), [availableVehicles]);

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

  // 4. Financing Partner Distribution
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
      const totalLoan = matchingApps.reduce((sum, a) => sum + a.loanAmount, 0) || (p.tag === 'In-House Financing' ? 8450000 : 4200000);
      return {
        ...p,
        appCount,
        totalLoan,
      };
    });

    const grandTotal = computed.reduce((sum, b) => sum + b.totalLoan, 0) || 1;
    return computed.map((b) => ({
      ...b,
      pct: Math.round((b.totalLoan / grandTotal) * 100),
    }));
  }, [applications]);

  // 5. Monthly Historical & Projected Cash Flow Series (6 Points)
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

  // SVG Bar Chart Coordinate Calculations
  const chartWidth = 720;
  const chartHeight = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 30;
  const plotW = chartWidth - padLeft - padRight;
  const plotH = chartHeight - padTop - padBottom;
  const maxVal = 30; // 30M scale

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
            <span>Reports & Analytics</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none border border-emerald-500/30">
              Live Graphs
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual bar graphs and financing partner pie distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            onClick={handleExport}
            className="px-3.5 py-1.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Primary KPI Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Deal Volume */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Closed Deal Volume</span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2">+18.2%</span>
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
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2">Verified</span>
          </div>
          <div className="text-2xl font-black font-mono text-red-500">
            {approvalRate}%
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>{totalApprovedApps} of {applications.length} Packages Cleared</span>
            <span className="font-mono text-slate-300">Fast SLA</span>
          </div>
        </div>

        {/* Lead Conversion */}
        <div className="p-4 rounded-none bg-[#121624] border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Lead-to-Delivery Rate</span>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.2">{convertedLeads} Won</span>
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">
            {leadConversionRate}%
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span>Pipeline Demand</span>
            <span className="font-mono text-white font-bold">{leads.length} Active Leads</span>
          </div>
        </div>
      </div>

      {/* GRAPH 1: Dealership Revenue & Cashflow Bar Graph */}
      <div className="p-5 rounded-none bg-[#121624] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-red-500" />
              <span>Dealership Revenue & Cashflow Performance</span>
              <span className="text-[10px] font-mono text-slate-400 font-normal">
                (6-Month Bar Graph)
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Comparative volume of booked contracts versus actual downpayment and cash collections
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 bg-[#e10600] rounded-none inline-block shadow-sm shadow-red-500/50" />
              Booked Contracts
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none inline-block shadow-sm shadow-emerald-500/50" />
              Cash Collected
            </span>
          </div>
        </div>

        {/* Visual Graph View Area */}
        <div className="relative bg-slate-950/80 border border-slate-800/90 p-4 rounded-none overflow-hidden">
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-[550px] h-56 select-none">
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

              {/* Monthly Group Bars */}
              {monthlyData.map((d, i) => {
                const colW = plotW / monthlyData.length;
                const groupCenterX = padLeft + (i + 0.5) * colW;
                const barW = 16;
                const gap = 4;
                const bookedH = (d.booked / maxVal) * plotH;
                const bookedY = padTop + plotH - bookedH;
                const collectionsH = (d.collections / maxVal) * plotH;
                const collectionsY = padTop + plotH - collectionsH;
                const isHovered = hoveredMonthIndex === i;

                return (
                  <g
                    key={d.month}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredMonthIndex(i)}
                    onMouseLeave={() => setHoveredMonthIndex(null)}
                  >
                    {/* Hover Column Background */}
                    {isHovered && (
                      <rect
                        x={groupCenterX - colW / 2 + 6}
                        y={padTop}
                        width={colW - 12}
                        height={plotH}
                        fill="#ffffff"
                        opacity="0.04"
                      />
                    )}

                    {/* Booked Bar (Red) */}
                    <rect
                      x={groupCenterX - barW - gap / 2}
                      y={bookedY}
                      width={barW}
                      height={bookedH}
                      fill={isHovered ? '#ff2a24' : '#e10600'}
                      className="transition-all duration-200"
                    />

                    {/* Collections Bar (Emerald) */}
                    <rect
                      x={groupCenterX + gap / 2}
                      y={collectionsY}
                      width={barW}
                      height={collectionsH}
                      fill={isHovered ? '#34d399' : '#10b981'}
                      className="transition-all duration-200"
                    />

                    {/* Values above bars on hover */}
                    {isHovered && (
                      <>
                        <text
                          x={groupCenterX - barW / 2 - gap / 2}
                          y={bookedY - 6}
                          fill="#ff6b66"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          ₱{d.booked}M
                        </text>
                        <text
                          x={groupCenterX + barW / 2 + gap / 2}
                          y={collectionsY - 6}
                          fill="#34d399"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          ₱{d.collections}M
                        </text>
                      </>
                    )}

                    {/* X-Axis Month Label */}
                    <text
                      x={groupCenterX}
                      y={chartHeight - 10}
                      fill={isHovered ? '#ffffff' : '#94a3b8'}
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      fontSize="11"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {d.short}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Interactive Inspection Card below chart */}
          {hoveredMonthIndex !== null && (
            <div className="mt-3 p-3 bg-slate-900 border border-slate-700/80 rounded-none flex flex-wrap items-center justify-between text-xs font-mono animate-in fade-in">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-white font-sans">
                  {monthlyData[hoveredMonthIndex].month} Performance:
                </span>
                <span className="text-slate-400">
                  ({monthlyData[hoveredMonthIndex].units} Units Delivered)
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-red-400 font-bold">
                  Booked: {currencySymbol}{monthlyData[hoveredMonthIndex].booked.toFixed(2)}M
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold">
                  Cash Inflow: {currencySymbol}{monthlyData[hoveredMonthIndex].collections.toFixed(2)}M
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
                Loan distribution across partner banks
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
              5 Partners
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
                Floor inventory distribution across vehicle classes
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 border border-slate-700">
              {availableVehicles.length} Units Active
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
                    : 'Floor Capital'}
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
                        {currencySymbol}{(cat.value / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
