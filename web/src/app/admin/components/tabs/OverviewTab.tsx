'use client';

import React from 'react';
import {
  Car,
  Receipt,
  FileSpreadsheet,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  DollarSign,
} from 'lucide-react';
import {
  AdminVehicle,
  FinancingApplication,
  Customer,
  SaleRecord,
  Appointment,
  AuditLogItem,
  AdminTab,
} from '../../types';

interface OverviewTabProps {
  vehicles: AdminVehicle[];
  applications: FinancingApplication[];
  customers: Customer[];
  sales: SaleRecord[];
  appointments: Appointment[];
  auditLogs: AuditLogItem[];
  setActiveTab: (tab: AdminTab) => void;
  onOpenAppDetails: (app: FinancingApplication) => void;
  currencySymbol: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  vehicles,
  applications,
  customers,
  sales,
  appointments,
  auditLogs,
  setActiveTab,
  onOpenAppDetails,
  currencySymbol,
}) => {
  // Compute Key Metrics
  const availableVehicles = vehicles.filter((v) => v.status === 'Available').length;
  const reservedVehicles = vehicles.filter((v) => v.status === 'Reserved').length;
  const soldVehicles = vehicles.filter((v) => v.status === 'Sold').length;

  const pendingApps = applications.filter(
    (a) => a.status === 'Submitted' || a.status === 'Under Review' || a.status === 'Assessment'
  );
  const approvedApps = applications.filter((a) => a.status === 'Approved');

  const totalSalesRevenue = sales.reduce((acc, s) => acc + s.salePrice, 0);
  const totalDownPaymentCollected = sales.reduce((acc, s) => acc + s.downPaymentPaid, 0);
  const totalFinancedPrincipal = sales.reduce((acc, s) => acc + s.principalFinanced, 0);

  const overdueAccounts = sales.filter((s) => s.status === 'Overdue');
  const upcomingAppointments = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending');

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span>Dealership Executive Overview</span>
            <span className="text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-sm">
              Live Telemetry
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-branch inventory, loan underwriting pipeline, and payment collection tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('financing')}
            className="px-3 py-1.5 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-red-950/40"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Review Applications ({pendingApps.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Car className="w-3.5 h-3.5 text-red-500" />
            Manage Fleet
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fleet Inventory Card */}
        <div
          onClick={() => setActiveTab('inventory')}
          className="p-4 rounded-xl bg-[#121624] border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Fleet Inventory</span>
            <Car className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{vehicles.length}</span>
            <span className="text-xs text-emerald-400 font-medium">{availableVehicles} Available</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{reservedVehicles} Reserved</span>
            <span>{soldVehicles} Units Sold</span>
          </div>
        </div>

        {/* Financing Pipeline Card */}
        <div
          onClick={() => setActiveTab('financing')}
          className="p-4 rounded-xl bg-[#121624] border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Loan Applications</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{applications.length}</span>
            <span className="text-xs text-amber-400 font-medium">{pendingApps.length} In Review</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="text-emerald-400">{approvedApps.length} Approved</span>
            <span>Avg Turnaround: 24h</span>
          </div>
        </div>

        {/* Total Sales & Revenue Card */}
        <div
          onClick={() => setActiveTab('sales')}
          className="p-4 rounded-xl bg-[#121624] border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Revenue Recorded</span>
            <TrendingUp className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {currencySymbol}{(totalSalesRevenue / 1000000).toFixed(2)}M
            </span>
            <span className="text-xs text-emerald-400 font-medium">Q4 High</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>DP: {currencySymbol}{(totalDownPaymentCollected / 1000000).toFixed(2)}M</span>
            <span>Loan: {currencySymbol}{(totalFinancedPrincipal / 1000000).toFixed(2)}M</span>
          </div>
        </div>

        {/* CRM Customers & Follow-ups */}
        <div
          onClick={() => setActiveTab('customers')}
          className="p-4 rounded-xl bg-[#121624] border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Active CRM Clients</span>
            <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{customers.length}</span>
            <span className="text-xs text-red-400 font-medium">Tier 1 Majority</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{upcomingAppointments.length} Booked Meetings</span>
            <span className="text-red-400 flex items-center">
              View CRM <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Overdue Alert Banner if Any */}
      {overdueAccounts.length > 0 && (
        <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <span className="font-bold text-red-200">Payment Collection Alert:</span>{' '}
              <span className="text-slate-300">
                {overdueAccounts.length} client account(s) have overdue installment amortizations requiring immediate follow-up.
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('sales')}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-semibold text-[11px] shrink-0"
          >
            Review Collections
          </button>
        </div>
      )}

      {/* Middle Row: Monthly Sales & Underwriting Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Monthly Sales & Collections Chart Simulation */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#121624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">Monthly Sales & Revenue Trajectory</h3>
              <p className="text-[11px] text-slate-400">Historical performance across 2026 quarters (in ₱ Millions)</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-sm">
              +18.4% YoY Growth
            </span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800/80">
            {[
              { month: 'May', height: '40%', val: '₱5.2M', units: 3 },
              { month: 'Jun', height: '55%', val: '₱7.8M', units: 4 },
              { month: 'Jul', height: '50%', val: '₱6.9M', units: 4 },
              { month: 'Aug', height: '70%', val: '₱9.4M', units: 5 },
              { month: 'Sep', height: '85%', val: '₱11.2M', units: 6 },
              { month: 'Oct (MTD)', height: '100%', val: '₱13.8M', units: 7, current: true },
            ].map((bar) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.val}
                </span>
                <div
                  style={{ height: bar.height }}
                  className={`w-full max-w-[42px] rounded-t-md transition-all group-hover:brightness-125 ${
                    bar.current
                      ? 'bg-gradient-to-t from-red-700 to-red-500 shadow-lg shadow-red-900/40'
                      : 'bg-slate-700/70 hover:bg-slate-600'
                  }`}
                />
                <span className={`text-[11px] font-mono ${bar.current ? 'text-red-400 font-bold' : 'text-slate-400'}`}>
                  {bar.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-red-600" /> Current Quarter
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-700" /> Historical Performance
              </span>
            </div>
            <span className="font-mono text-slate-300">Total Units Delivered: 29</span>
          </div>
        </div>

        {/* Financing Pipeline Breakdown */}
        <div className="p-5 rounded-xl bg-[#121624] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-wide">Underwriting Funnel</h3>
              <span className="text-[10px] font-mono text-slate-400">{applications.length} Total</span>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Loan Approved (Ready)', count: approvedApps.length, pct: '40%', color: 'bg-emerald-500', text: 'text-emerald-400' },
                { label: 'Under Review / CI Audit', count: pendingApps.length, pct: '40%', color: 'bg-amber-500', text: 'text-amber-400' },
                { label: 'Documents Required', count: applications.filter(a => a.status === 'Documents Required').length, pct: '20%', color: 'bg-sky-500', text: 'text-sky-400' },
                { label: 'Declined / Withdrawn', count: applications.filter(a => a.status === 'Rejected').length, pct: '0%', color: 'bg-slate-600', text: 'text-slate-400' },
              ].map((stage) => (
                <div key={stage.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{stage.label}</span>
                    <span className={`font-mono font-bold ${stage.text}`}>{stage.count} ({stage.pct})</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div style={{ width: stage.pct }} className={`h-full ${stage.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] space-y-1.5">
              <div className="font-semibold text-slate-200">Active Lending Channels</div>
              <div className="text-slate-400 flex justify-between">
                <span>BDO Unibank & BPI</span>
                <span className="text-white font-mono font-bold">65% of Portfolio</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span>DriveFlow In-House</span>
                <span className="text-white font-mono font-bold">25% (9.5% p.a.)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('financing')}
            className="w-full mt-4 py-2 text-xs font-semibold text-red-400 hover:text-white hover:bg-slate-800/80 rounded-lg border border-slate-700/60 transition"
          >
            Open Loan Processing Pipeline →
          </button>
        </div>
      </div>

      {/* Bottom Row: Upcoming Appointments & Real-time Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Appointments & Handover */}
        <div className="p-5 rounded-xl bg-[#121624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              Upcoming Test Drives & Unit Handovers
            </h3>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs text-red-400 hover:underline"
            >
              View Calendar
            </button>
          </div>

          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt) => (
              <div
                key={apt.id}
                className="p-3 rounded-lg bg-slate-900/70 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{apt.customerName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-red-500/10 text-red-300 border border-red-500/20">
                      {apt.appointmentType}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {apt.vehicleName} • <span className="text-slate-300">{apt.timeSlot}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                    {apt.date}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Staff: {apt.assignedStaff}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Dealership Audit Feed */}
        <div className="p-5 rounded-xl bg-[#121624] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Live Dealership Audit Feed
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Immutable Log</span>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="text-xs pb-2.5 border-b border-slate-800/60 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="font-semibold text-slate-200">{log.actor} ({log.role})</span>
                  <span className="font-mono text-slate-500">{log.timestamp.split(' ')[1]}</span>
                </div>
                <div className="text-white mt-0.5 font-medium">{log.action}</div>
                <div className="text-[11px] text-slate-400 truncate">{log.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

