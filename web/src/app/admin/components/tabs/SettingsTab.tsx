'use client';

import React, { useState, useMemo } from 'react';
import {
  Settings,
  Percent,
  Bell,
  Clock,
  Save,
  CheckCircle2,
  Sliders,
  DollarSign,
  Building2,
  Copy,
  Check,
  Search,
  ShieldCheck,
  Mail,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Calculator,
  ExternalLink,
} from 'lucide-react';
import { DealershipSettings, AuditLogItem } from '../../types';

interface SettingsTabProps {
  settings: DealershipSettings;
  auditLogs: AuditLogItem[];
  onUpdateSettings: (settings: DealershipSettings) => void;
  currencySymbol: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  auditLogs,
  onUpdateSettings,
  currencySymbol,
}) => {
  const [activeTab, setActiveTab] = useState<'financing' | 'general' | 'notifications' | 'audit'>('financing');
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 1. Financing Underwriting Parameters
  const [baseInterest, setBaseInterest] = useState<number>(settings.defaultBaseInterestPa);
  const [minDp, setMinDp] = useState<number>(settings.minimumDownPaymentPercent);
  const [maxTerm, setMaxTerm] = useState<number>(settings.maxLoanTermMonths);
  const [chattelRate, setChattelRate] = useState<number>(settings.chattelMortgageRate);
  const [banks, setBanks] = useState(settings.partnerBanks);

  // 2. Notification Triggers
  const [smsAlerts, setSmsAlerts] = useState<boolean>(settings.enableSmsNotifications);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(settings.enableEmailAlerts);

  // 3. Corporate & Tagline
  const [dealershipTagline, setDealershipTagline] = useState<string>(settings.tagline || 'Premier Automotive Showroom & Financing');

  // 4. Audit Log Filtering & Pagination
  const [auditSearch, setAuditSearch] = useState('');
  const [auditFilter, setAuditFilter] = useState('all');
  const [auditPage, setAuditPage] = useState(1);
  const logsPerPage = 8;

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    triggerToast(`Copied ${key} to clipboard`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveFinancingSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      tagline: dealershipTagline,
      defaultBaseInterestPa: Number(baseInterest),
      minimumDownPaymentPercent: Number(minDp),
      maxLoanTermMonths: Number(maxTerm),
      chattelMortgageRate: Number(chattelRate),
      partnerBanks: banks,
      enableSmsNotifications: smsAlerts,
      enableEmailAlerts: emailAlerts,
    });
    triggerToast('Dealership settings and underwriting parameters saved!');
  };

  const toggleBank = (code: string) => {
    setBanks(
      banks.map((b) => (b.code === code ? { ...b, enabled: !b.enabled } : b))
    );
  };

  // Interactive Live Loan Estimator for benchmark ₱1.5M vehicle
  const benchmarkVehiclePrice = 1500000;
  const benchmarkDownPayment = (benchmarkVehiclePrice * minDp) / 100;
  const benchmarkLoanPrincipal = benchmarkVehiclePrice - benchmarkDownPayment;
  const benchmarkMonthlyInterestRate = baseInterest / 100 / 12;
  const benchmarkAmortization =
    benchmarkMonthlyInterestRate > 0
      ? Math.round(
          (benchmarkLoanPrincipal *
            (benchmarkMonthlyInterestRate *
              Math.pow(1 + benchmarkMonthlyInterestRate, maxTerm))) /
            (Math.pow(1 + benchmarkMonthlyInterestRate, maxTerm) - 1)
        )
      : Math.round(benchmarkLoanPrincipal / maxTerm);
  const benchmarkChattelFee = Math.round((benchmarkVehiclePrice * chattelRate) / 100);

  // Audit Log Filtering
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const matchesSearch =
        log.actor.toLowerCase().includes(auditSearch.toLowerCase()) ||
        log.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
        log.target.toLowerCase().includes(auditSearch.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(auditSearch.toLowerCase());

      if (auditFilter === 'all') return matchesSearch;
      if (auditFilter === 'settings') return matchesSearch && log.action.toLowerCase().includes('setting');
      if (auditFilter === 'financing') return matchesSearch && (log.action.toLowerCase().includes('loan') || log.action.toLowerCase().includes('financ'));
      if (auditFilter === 'staff') return matchesSearch && (log.action.toLowerCase().includes('staff') || log.action.toLowerCase().includes('invit'));
      return matchesSearch;
    });
  }, [auditLogs, auditSearch, auditFilter]);

  const totalAuditPages = Math.ceil(filteredAuditLogs.length / logsPerPage) || 1;
  const paginatedAuditLogs = filteredAuditLogs.slice(
    (auditPage - 1) * logsPerPage,
    auditPage * logsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-[#e10600] text-white px-4 py-2.5 rounded-none shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Settings & System Governance</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none border border-emerald-500/30">
              Enterprise v2.4
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure dealership underwriting assumptions, banking gateway switches, corporate credentials, and view immutable audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tenant: <strong className="text-white">DFL-PH-0941</strong></span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">BSP Encrypted</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'financing', label: 'Financing & Underwriting', icon: Percent },
          { id: 'general', label: 'Dealership & Legal Entity', icon: Building2 },
          { id: 'notifications', label: 'Automated Notifications', icon: Bell },
          { id: 'audit', label: 'Immutable Audit Trail', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setAuditPage(1);
              }}
              className={`px-3.5 py-2 rounded-none text-xs font-semibold flex items-center gap-2 transition cursor-pointer border ${
                isActive
                  ? 'bg-[#e10600] border-[#e10600] text-white shadow-sm shadow-red-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================== TAB 1: FINANCING & UNDERWRITING ===================== */}
      {activeTab === 'financing' && (
        <form onSubmit={handleSaveFinancingSettings} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Form Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Card 1: Core Formula Parameters */}
              <div className="bg-[#121624] border border-slate-800 rounded-none p-5 space-y-4">
                <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-red-500" />
                      <span>Underwriting Formula Parameters</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Base rates applied across public calculators and in-house loan assessments
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                    Active Algorithm
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Base Interest Rate */}
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5">
                      In-House Base Interest (% p.a.)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="30"
                        required
                        value={baseInterest}
                        onChange={(e) => setBaseInterest(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-none px-3 py-2 pr-8 text-white font-mono text-xs focus:outline-hidden focus:border-red-500"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-slate-400">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Standard annual rate on remaining balance
                    </span>
                  </div>

                  {/* Minimum Down Payment */}
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5">
                      Minimum Down Payment (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="5"
                        max="80"
                        required
                        value={minDp}
                        onChange={(e) => setMinDp(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-none px-3 py-2 pr-8 text-white font-mono text-xs focus:outline-hidden focus:border-red-500"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-slate-400">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Minimum equity required for deal submission
                    </span>
                  </div>

                  {/* Maximum Loan Term */}
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5">
                      Maximum Amortization Term
                    </label>
                    <select
                      value={maxTerm}
                      onChange={(e) => setMaxTerm(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-none px-3 py-2 text-white font-mono text-xs focus:outline-hidden focus:border-red-500 cursor-pointer"
                    >
                      <option value={24}>24 Months (2 Years)</option>
                      <option value={36}>36 Months (3 Years)</option>
                      <option value={48}>48 Months (4 Years)</option>
                      <option value={60}>60 Months (5 Years)</option>
                      <option value={72}>72 Months (6 Years)</option>
                    </select>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Ceiling limit for repayment schedule
                    </span>
                  </div>

                  {/* Chattel Mortgage Rate */}
                  <div>
                    <label className="text-xs text-slate-300 font-medium block mb-1.5">
                      Chattel Mortgage & Registry Fee (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="10"
                        required
                        value={chattelRate}
                        onChange={(e) => setChattelRate(Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-none px-3 py-2 pr-8 text-white font-mono text-xs focus:outline-hidden focus:border-red-500"
                      />
                      <span className="absolute right-3 top-2 text-xs font-mono text-slate-400">%</span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Registry of Deeds encumbrance fee
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Partner Bank Rails & Gateways */}
              <div className="bg-[#121624] border border-slate-800 rounded-none p-5 space-y-4">
                <div className="border-b border-slate-800/80 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Landmark className="w-4 h-4 text-emerald-400" />
                      <span>Partner Lending Rails & Banking Gateways</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Toggle active underwriter submission channels for financing applications
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {banks.filter((b) => b.enabled).length} of {banks.length} Online
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  {banks.map((bank) => (
                    <div
                      key={bank.code}
                      onClick={() => toggleBank(bank.code)}
                      className={`p-3 border rounded-none flex items-center justify-between cursor-pointer transition select-none ${
                        bank.enabled
                          ? 'bg-slate-900/90 border-slate-700 hover:border-slate-600'
                          : 'bg-slate-950 border-slate-900 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-xs font-mono ${
                            bank.enabled ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {bank.code.substring(0, 3).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-white text-xs block">
                            {bank.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Channel ID: {bank.code}
                          </span>
                        </div>
                      </div>

                      {/* Custom Sleek Switch */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[10px] font-mono uppercase font-bold ${
                            bank.enabled ? 'text-emerald-400' : 'text-slate-500'
                          }`}
                        >
                          {bank.enabled ? 'Connected' : 'Disabled'}
                        </span>
                        <div
                          className={`w-11 h-6 flex items-center rounded-none p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                            bank.enabled ? 'bg-[#e10600]' : 'bg-slate-800'
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-none shadow-md transform transition-transform duration-200 ease-in-out ${
                              bank.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Modifications trigger an audit entry in enterprise logs.
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-bold flex items-center gap-2 transition shadow-sm shadow-red-950/40 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Parameters
                </button>
              </div>
            </div>

            {/* Right Column: Live Estimator & Formula Telemetry (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Benchmark Estimator Card */}
              <div className="bg-[#121624] border border-slate-800 rounded-none p-5 space-y-4">
                <div className="border-b border-slate-800/80 pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-emerald-400" />
                      <span>Live Calculator Telemetry</span>
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400">
                      Real-time Preview
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Simulated customer quote on standard benchmark vehicle ({currencySymbol}1,500,000)
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-slate-900 border border-slate-800/90 rounded-none space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Benchmark Asset Value:</span>
                      <span className="font-mono text-white font-bold">{currencySymbol}1,500,000</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Required Downpayment ({minDp}%):</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {currencySymbol}{benchmarkDownPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Principal Financed:</span>
                      <span className="font-mono text-slate-200">
                        {currencySymbol}{benchmarkLoanPrincipal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Chattel & Encumbrance ({chattelRate}%):</span>
                      <span className="font-mono text-purple-400">
                        {currencySymbol}{benchmarkChattelFee.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Monthly Amortization Highlight Box */}
                  <div className="p-4 bg-gradient-to-br from-red-950/30 to-slate-900 border border-red-500/40 rounded-none space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 block font-semibold">
                      Estimated Monthly Amortization ({maxTerm} Mo @ {baseInterest}%)
                    </span>
                    <div className="text-2xl font-black font-mono text-white tracking-tight">
                      {currencySymbol}{benchmarkAmortization.toLocaleString()}
                      <span className="text-xs font-normal text-slate-400 font-sans ml-1">/month</span>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                      Formulated using standard diminishing balance amortization.
                    </p>
                  </div>

                  {/* Quick Underwriting Rules Summary */}
                  <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-none space-y-2 text-xs">
                    <span className="text-[11px] font-bold text-slate-300 block uppercase font-mono tracking-wider">
                      Policy Enforcement Rules
                    </span>
                    <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4">
                      <li>Applications with down payment below <strong className="text-white">{minDp}%</strong> require Branch Manager sign-off.</li>
                      <li>Terms over <strong className="text-white">48 months</strong> require proof of income ratio below 35% DTI.</li>
                      <li>CMAP negative records bypass in-house financing directly to security verification.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ===================== TAB 2: DEALERSHIP & LEGAL ENTITY ===================== */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Enterprise Legal Dossier */}
            <div className="lg:col-span-8 bg-[#121624] border border-slate-800 rounded-none p-6 space-y-5">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-red-500" />
                    <span>Dealership Corporate & Legal Profile</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Official enterprise credentials, tax certificates, and regulatory registration
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/30 font-semibold">
                  SEC & BIR Verified
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Registered Name */}
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Registered Business Name</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled
                      value={settings.dealershipName}
                      className="w-full bg-slate-900 border border-slate-800 rounded-none px-3 py-2 text-white font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.dealershipName, 'Dealership Name')}
                      className="px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-none flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'Dealership Name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Tagline / Commercial Slogan */}
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Commercial Tagline & Brand Heading</label>
                  <input
                    type="text"
                    value={dealershipTagline}
                    onChange={(e) => setDealershipTagline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none px-3 py-2 text-white focus:outline-hidden focus:border-red-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Rendered in customer loan receipts, booking vouchers, and quotation sheets
                  </span>
                </div>

                {/* TIN and SEC Reg */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">BIR Taxpayer ID Number (TIN)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled
                        value={settings.taxIdentificationNumber}
                        className="w-full bg-slate-900 border border-slate-800 rounded-none px-3 py-2 text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.taxIdentificationNumber, 'TIN')}
                        className="px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-none flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'TIN' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Bureau of Internal Revenue Registered</span>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">SEC Registration Number</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled
                        value={settings.secRegistration}
                        className="w-full bg-slate-900 border border-slate-800 rounded-none px-3 py-2 text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.secRegistration, 'SEC Reg')}
                        className="px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-none flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'SEC Reg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Securities & Exchange Commission Philippines</span>
                  </div>
                </div>

                {/* Currency & Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">System Operating Currency</label>
                    <input
                      type="text"
                      disabled
                      value={`${settings.currency} (${currencySymbol} Philippine Peso)`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-none px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">System Timezone</label>
                    <input
                      type="text"
                      disabled
                      value={`${settings.timezone} (UTC+08:00)`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-none px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance & Governance Right Column */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-[#121624] border border-slate-800 rounded-none p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Compliance & Safeguards</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                    <span className="text-emerald-400 font-bold block mb-1 font-mono">
                      ✓ Anti-Money Laundering (AMLC)
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Transactions exceeding ₱500,000 cash equivalent automatically catalogued for covered transaction reporting.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                    <span className="text-emerald-400 font-bold block mb-1 font-mono">
                      ✓ Data Privacy Act (RA 10173)
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Customer government IDs and financial statements encrypted in transit and rest.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-none">
                    <span className="text-emerald-400 font-bold block mb-1 font-mono">
                      ✓ In-House Registry Encumbrance
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Automated Chattel Mortgage annotation with LTO-accredited financial institution code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: NOTIFICATIONS ===================== */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-[#121624] border border-slate-800 rounded-none p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-red-500" />
                  <span>Automated Event Alerts & Messaging Rails</span>
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Configure multi-channel alerts for customers, underwriter approvals, and collections
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                Live Dispatch
              </span>
            </div>

            <div className="space-y-4">
              {/* SMS Toggle */}
              <div
                onClick={() => setSmsAlerts(!smsAlerts)}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-none flex items-center justify-between cursor-pointer transition select-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-none mt-0.5">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">SMS Client Notifications</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Send automated SMS alerts to borrowers for loan approval decisions, payment due reminders, and official receipt vouchers.
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      Carrier: Globe / Smart Direct Telco Gateway
                    </span>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 flex items-center rounded-none p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ml-4 ${
                    smsAlerts ? 'bg-[#e10600]' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-none shadow-md transform transition-transform duration-200 ease-in-out ${
                      smsAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Email Toggle */}
              <div
                onClick={() => setEmailAlerts(!emailAlerts)}
                className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-none flex items-center justify-between cursor-pointer transition select-none"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-none mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Executive Email Digest & Anomaly Alerts</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Receive daily morning pipeline summaries, deal closure notifications, and system permission modification warnings.
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      Destination: Dealership Owner & Finance Officers
                    </span>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 flex items-center rounded-none p-1 transition-colors duration-200 ease-in-out cursor-pointer shrink-0 ml-4 ${
                    emailAlerts ? 'bg-[#e10600]' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-none shadow-md transform transition-transform duration-200 ease-in-out ${
                      emailAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveFinancingSettings}
                className="px-5 py-2.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-bold flex items-center gap-2 transition shadow-sm shadow-red-950/40 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Save Notification Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: IMMUTABLE AUDIT TRAIL ===================== */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-[#121624] border border-slate-800 rounded-none p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by actor, action, target entity, or IP..."
                  value={auditSearch}
                  onChange={(e) => {
                    setAuditSearch(e.target.value);
                    setAuditPage(1);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
                />
              </div>

              {/* Action Filter */}
              <select
                value={auditFilter}
                onChange={(e) => {
                  setAuditFilter(e.target.value);
                  setAuditPage(1);
                }}
                className="bg-slate-900 border border-slate-700 rounded-none px-3 py-2 text-xs text-white focus:outline-hidden focus:border-red-500 cursor-pointer font-mono"
              >
                <option value="all">All Events ({auditLogs.length})</option>
                <option value="financing">Financing & Underwriting</option>
                <option value="settings">Settings Changes</option>
                <option value="staff">Staff Management</option>
              </select>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SHA-256 Ledger Verified</span>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Timestamp (PHT)</th>
                    <th className="py-3 px-3">Actor & Identity</th>
                    <th className="py-3 px-3">System Action</th>
                    <th className="py-3 px-3">Target Entity</th>
                    <th className="py-3 px-3">IP Address</th>
                    <th className="py-3 px-4 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {paginatedAuditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No audit events match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedAuditLogs.map((log) => {
                      const isDanger =
                        log.action.toLowerCase().includes('deactivat') ||
                        log.action.toLowerCase().includes('reject');
                      const isSuccess =
                        log.action.toLowerCase().includes('approv') ||
                        log.action.toLowerCase().includes('creat') ||
                        log.action.toLowerCase().includes('record');

                      return (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition">
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            {log.timestamp}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="font-semibold text-white block">{log.actor}</span>
                            <span className="text-[10px] font-mono text-slate-400">{log.role}</span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  isDanger
                                    ? 'bg-red-500'
                                    : isSuccess
                                    ? 'bg-emerald-400'
                                    : 'bg-blue-400'
                                }`}
                              />
                              <span className="text-white font-medium">{log.action}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                            {log.target}
                          </td>
                          <td className="py-3 px-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">
                            {log.ipAddress}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <span className="inline-block px-1.5 py-0.5 rounded-none text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              VERIFIED
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing {Math.min(filteredAuditLogs.length, (auditPage - 1) * logsPerPage + 1)} to{' '}
                {Math.min(filteredAuditLogs.length, auditPage * logsPerPage)} of {filteredAuditLogs.length} events
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={auditPage <= 1}
                  onClick={() => setAuditPage((p) => Math.max(1, p - 1))}
                  className="p-1.5 rounded-none border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-mono text-xs text-white">
                  Page {auditPage} of {totalAuditPages}
                </span>
                <button
                  type="button"
                  disabled={auditPage >= totalAuditPages}
                  onClick={() => setAuditPage((p) => Math.min(totalAuditPages, p + 1))}
                  className="p-1.5 rounded-none border border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
