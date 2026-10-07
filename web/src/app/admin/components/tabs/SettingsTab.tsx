'use client';

import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Percent,
  Bell,
  ShieldAlert,
  Clock,
  Save,
  Plus,
  CheckCircle2,
  Globe,
  Sliders,
  DollarSign,
  X,
} from 'lucide-react';
import { DealershipSettings, DealershipBranch, AuditLogItem } from '../../types';

interface SettingsTabProps {
  settings: DealershipSettings;
  branches: DealershipBranch[];
  auditLogs: AuditLogItem[];
  onUpdateSettings: (settings: DealershipSettings) => void;
  onAddBranch: (branch: DealershipBranch) => void;
  currencySymbol: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  branches,
  auditLogs,
  onUpdateSettings,
  onAddBranch,
  currencySymbol,
}) => {
  const [activeTab, setActiveTab] = useState<'financing' | 'branches' | 'general' | 'audit'>('financing');
  const [toast, setToast] = useState<string | null>(null);

  // Financing Assumptions
  const [baseInterest, setBaseInterest] = useState(settings.defaultBaseInterestPa);
  const [minDp, setMinDp] = useState(settings.minimumDownPaymentPercent);
  const [maxTerm, setMaxTerm] = useState(settings.maxLoanTermMonths);
  const [chattelRate, setChattelRate] = useState(settings.chattelMortgageRate);
  const [banks, setBanks] = useState(settings.partnerBanks);

  // New Branch Modal
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [bName, setBName] = useState('');
  const [bCode, setBCode] = useState('');
  const [bAddress, setBAddress] = useState('');
  const [bCity, setBCity] = useState('');
  const [bPhone, setBPhone] = useState('');
  const [bEmail, setBEmail] = useState('');

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveFinancingSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      defaultBaseInterestPa: Number(baseInterest),
      minimumDownPaymentPercent: Number(minDp),
      maxLoanTermMonths: Number(maxTerm),
      chattelMortgageRate: Number(chattelRate),
      partnerBanks: banks,
    });
    triggerToast('Dealership loan underwriting parameters saved!');
  };

  const toggleBank = (code: string) => {
    setBanks(
      banks.map((b) => (b.code === code ? { ...b, enabled: !b.enabled } : b))
    );
  };

  const handleCreateBranch = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBranch({
      id: `br-${Date.now()}`,
      name: bName,
      code: bCode.toUpperCase(),
      address: bAddress,
      city: bCity,
      phone: bPhone,
      email: bEmail,
      isHeadquarters: false,
      activeInventoryCount: 0,
    });
    setIsAddBranchOpen(false);
    triggerToast(`Added branch: ${bName}`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-emerald-500 text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Dealership Settings & Enterprise Governance</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              Tenant ID: DFL-PH-0941
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure dealership loan calculation formulas, branch networks, bank integrations, and view immutable audit trails.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'financing', label: 'Financing & Interest Rates', icon: Percent },
          { id: 'branches', label: 'Multi-Branch Network', icon: Building2 },
          { id: 'general', label: 'Dealership Entity & Tax Details', icon: Settings },
          { id: 'audit', label: 'Immutable Audit Log', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#e10600] text-white shadow-[0_0_20px_rgba(225,6,0,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: FINANCING ASSUMPTIONS */}
      {activeTab === 'financing' && (
        <form
          onSubmit={handleSaveFinancingSettings}
          className="bg-[#121624] border border-slate-800 rounded-xl p-6 space-y-5 text-xs max-w-3xl"
        >
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Financing Calculation Assumptions</h3>
            <p className="text-slate-400 text-[11px] mt-0.5">
              These default interest rates and downpayment parameters drive the customer-facing loan calculator and loan underwriting engine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 block mb-1">Base In-House Annual Interest Rate (% p.a.)</label>
              <input
                type="number"
                step="0.1"
                required
                value={baseInterest}
                onChange={(e) => setBaseInterest(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Applied when in-house financing is selected</span>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Minimum Down Payment Threshold (%)</label>
              <input
                type="number"
                required
                value={minDp}
                onChange={(e) => setMinDp(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Minimum equity required before loan submission</span>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Maximum Amortization Term (Months)</label>
              <select
                value={maxTerm}
                onChange={(e) => setMaxTerm(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
              >
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
                <option value={72}>72 Months (6 Years)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Chattel Mortgage & Registry Fee (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={chattelRate}
                onChange={(e) => setChattelRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Standard Registry of Deeds encumbrance fee</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2 font-mono">
              Enabled Banking & Lending Channels
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {banks.map((b) => (
                <div
                  key={b.code}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
                >
                  <span className="font-semibold text-white">{b.name}</span>
                  <input
                    type="checkbox"
                    checked={b.enabled}
                    onChange={() => toggleBank(b.code)}
                    className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white font-bold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40"
            >
              <Save className="w-4 h-4" />
              Save Financing Parameters
            </button>
          </div>
        </form>
      )}

      {/* SECTION 2: BRANCH NETWORK */}
      {activeTab === 'branches' && (
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Dealership Branch Locations</h3>
            <button
              onClick={() => setIsAddBranchOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1 transition shadow-sm shadow-red-950/40"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Branch
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[#121624] border border-slate-800 space-y-2.5 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                      {b.name}
                      {b.isHeadquarters && (
                        <span className="text-[9px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 px-1 rounded">
                          HQ
                        </span>
                      )}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Code: {b.code}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-300 text-[10px]">
                    {b.activeInventoryCount} Active Cars
                  </span>
                </div>

                <div className="text-slate-300 space-y-0.5 text-[11px]">
                  <div>{b.address}</div>
                  <div className="text-slate-400">{b.city}</div>
                  <div className="font-mono text-slate-400 pt-1">{b.phone} • {b.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: GENERAL & ENTITY */}
      {activeTab === 'general' && (
        <div className="bg-[#121624] border border-slate-800 rounded-xl p-6 space-y-4 text-xs max-w-2xl">
          <h3 className="text-base font-bold text-white">Dealership Corporate Profile</h3>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1">Registered Entity Name</label>
              <input
                type="text"
                disabled
                value={settings.dealershipName}
                className="w-full bg-slate-900/60 border border-slate-800 rounded p-2 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">BIR Tax ID (TIN)</label>
                <input
                  type="text"
                  disabled
                  value={settings.taxIdentificationNumber}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">SEC Registration #</label>
                <input
                  type="text"
                  disabled
                  value={settings.secRegistration}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded p-2 text-white font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Base Currency</label>
                <input
                  type="text"
                  disabled
                  value="PHP (₱ Philippine Peso)"
                  className="w-full bg-slate-900/60 border border-slate-800 rounded p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">System Timezone</label>
                <input
                  type="text"
                  disabled
                  value={settings.timezone}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded p-2 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-[#121624] border border-slate-800 rounded-xl overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Real-time Immutable Audit Trail</h3>
            <span className="text-[10px] font-mono text-slate-400">SHA-256 Verified Records</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-900 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-3">Actor & Role</th>
                <th className="py-3 px-3">Action Description</th>
                <th className="py-3 px-3">Affected Entity</th>
                <th className="py-3 px-3">Branch & IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{log.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {log.actor} <span className="text-slate-400 text-[10px] font-normal">({log.role})</span>
                  </td>
                  <td className="py-3 px-3 text-slate-200">{log.action}</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{log.target}</td>
                  <td className="py-3 px-3 text-[10px] font-mono text-slate-500">
                    {log.branchName} • {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Branch Modal */}
      {isAddBranchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateBranch}
            className="bg-[#121624] border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Dealership Branch</h3>
              <button
                type="button"
                onClick={() => setIsAddBranchOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Branch Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Davao Luxury Pavilion"
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Branch Code</label>
                  <input
                    type="text"
                    required
                    placeholder="DVO-05"
                    value={bCode}
                    onChange={(e) => setBCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+63 (82) 222-1900"
                    value={bPhone}
                    onChange={(e) => setBPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="Lanang Business Park"
                  value={bAddress}
                  onChange={(e) => setBAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">City / Region</label>
                  <input
                    type="text"
                    required
                    placeholder="Davao City"
                    value={bCity}
                    onChange={(e) => setBCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="davao@apexmotors.ph"
                    value={bEmail}
                    onChange={(e) => setBEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddBranchOpen(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#e10600] hover:bg-[#c00500] text-white font-bold transition shadow-sm shadow-red-950/40"
              >
                Register Branch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

