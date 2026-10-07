'use client';

import React, { useState, useMemo } from 'react';
import {
  Receipt,
  Search,
  Plus,
  DollarSign,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  X,
  CreditCard,
  Banknote,
  FileText,
} from 'lucide-react';
import { SaleRecord, PaymentTransaction, DealershipBranch } from '../../types';

interface SalesTabProps {
  sales: SaleRecord[];
  branches: DealershipBranch[];
  onRecordPayment: (payment: Omit<PaymentTransaction, 'id'>, saleId: string) => void;
  currencySymbol: string;
}

export const SalesTab: React.FC<SalesTabProps> = ({
  sales,
  branches,
  onRecordPayment,
  currencySymbol,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [financingTypeFilter, setFinancingTypeFilter] = useState('all');

  // Modals
  const [selectedSale, setSelectedSale] = useState<SaleRecord | null>(null);
  const [isRecordPayOpen, setIsRecordPayOpen] = useState(false);
  const [activeReceiptTx, setActiveReceiptTx] = useState<PaymentTransaction | null>(null);

  // Form states for payment recording
  const [paySaleId, setPaySaleId] = useState(sales[0]?.id || '');
  const [payAmount, setPayAmount] = useState<number>(31200);
  const [payMethod, setPayMethod] = useState<PaymentTransaction['method']>('Auto-Debit Arrangement');
  const [payType, setPayType] = useState<PaymentTransaction['type']>('Monthly Amortization');
  const [payRef, setPayRef] = useState('ADA-BDO-OCT26');
  const [isGatewayVerified, setIsGatewayVerified] = useState(true);

  const filteredSales = useMemo(() => {
    return sales.filter((s) => {
      const matchSearch =
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.saleNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
        s.vin.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchFin = financingTypeFilter === 'all' || s.financingType === financingTypeFilter;
      return matchSearch && matchStatus && matchFin;
    });
  }, [sales, search, statusFilter, financingTypeFilter]);

  const handlePostPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSale = sales.find((s) => s.id === paySaleId) || sales[0];
    const newTx: Omit<PaymentTransaction, 'id'> = {
      orNumber: `OR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      time: '02:30 PM',
      customerName: targetSale.customerName,
      accountNumber: `ACC-${targetSale.saleNumber}`,
      vehicleName: targetSale.vehicleName,
      amount: Number(payAmount),
      method: payMethod,
      type: payType,
      refNumber: payRef || `TX-REF-${Date.now().toString().slice(-6)}`,
      receivedBy: 'Janrey Mina',
      installmentNumber: 'Amortization',
      isVerifiedGateway: isGatewayVerified,
      branchId: targetSale.branchId,
    };

    onRecordPayment(newTx, targetSale.id);
    setIsRecordPayOpen(false);
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sales Contracts & Payment Ledger</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredSales.length} contracts)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track financed accounts receivable, installment schedules, cashier deposits, and BIR official receipts.
          </p>
        </div>

        <button
          onClick={() => {
            setPaySaleId(sales[0]?.id || '');
            setIsRecordPayOpen(true);
          }}
          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Record Client Payment
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sale #, buyer, vehicle or VIN..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Account Statuses</option>
            <option value="Active / Current">Active / Current</option>
            <option value="Overdue">Overdue Past Due</option>
            <option value="Payment Due Soon">Payment Due Soon</option>
            <option value="Fully Paid">Fully Settled</option>
          </select>
        </div>

        <div>
          <select
            value={financingTypeFilter}
            onChange={(e) => setFinancingTypeFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Financing Structures</option>
            <option value="In-House Financing">In-House Dealership Financing</option>
            <option value="Bank Partner Financed">External Bank Financed</option>
            <option value="Full Cash Sale">Full Cash Transaction</option>
          </select>
        </div>
      </div>

      {/* Sales Contracts Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Sale # & Buyer</th>
                <th className="py-3 px-3">Vehicle Financed</th>
                <th className="py-3 px-3">Sale Price</th>
                <th className="py-3 px-3">Downpayment Paid</th>
                <th className="py-3 px-3">Remaining Balance</th>
                <th className="py-3 px-3">Monthly Amortization</th>
                <th className="py-3 px-3">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <span className="font-bold text-white block">{sale.saleNumber}</span>
                    <span className="text-[11px] text-slate-300">{sale.customerName}</span>
                    <span className="text-[10px] font-mono text-slate-500">{sale.saleDate}</span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-white font-medium truncate max-w-[180px]">{sale.vehicleName}</div>
                    <div className="text-[10px] font-mono text-slate-400">{sale.plate} • {sale.financingType}</div>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-white text-[11px]">
                    {currencySymbol}{sale.salePrice.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold text-[11px]">
                    {currencySymbol}{sale.downPaymentPaid.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 font-mono text-white text-[11px]">
                    {currencySymbol}{sale.remainingBalance.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 font-mono text-blue-400 font-bold text-[11px]">
                    {currencySymbol}{sale.monthlyAmortization.toLocaleString()} / mo
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold border ${
                        sale.status === 'Active / Current'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : sale.status === 'Overdue'
                          ? 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}
                    >
                      {sale.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-semibold"
                    >
                      Ledger & ORs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sale Detail & Amortization Modal */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-xl max-w-3xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedSale.saleNumber} — Account Ledger</h3>
                <span className="text-xs text-slate-400">
                  Buyer: {selectedSale.customerName} • {selectedSale.vehicleName}
                </span>
              </div>
              <button
                onClick={() => setSelectedSale(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Balances Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Contract Value</span>
                <span className="text-white font-bold">{currencySymbol}{selectedSale.salePrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Downpayment Paid</span>
                <span className="text-emerald-400 font-bold">{currencySymbol}{selectedSale.downPaymentPaid.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Financed Principal</span>
                <span className="text-white font-bold">{currencySymbol}{selectedSale.principalFinanced.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Remaining Balance</span>
                <span className="text-blue-400 font-bold">{currencySymbol}{selectedSale.remainingBalance.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment History & Receipts */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
                  Recorded Official Receipts (OR)
                </h4>
                <button
                  onClick={() => {
                    setPaySaleId(selectedSale.id);
                    setIsRecordPayOpen(true);
                  }}
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post New Payment
                </button>
              </div>

              <div className="space-y-2">
                {selectedSale.paymentHistory.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{tx.orNumber}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-sm bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          {tx.type}
                        </span>
                        {tx.isVerifiedGateway ? (
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1 rounded">Gateway Verified</span>
                        ) : (
                          <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1 rounded">Cashier Logged</span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {tx.date} • {tx.method} • Ref: {tx.refNumber}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {currencySymbol}{tx.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => setActiveReceiptTx(tx)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1"
                      >
                        <Printer className="w-3 h-3" />
                        Print OR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Installment Schedule */}
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">
                Installment Amortization Schedule
              </h4>
              <div className="border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-[10px] font-mono text-slate-400 uppercase">
                    <tr>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">Due Date</th>
                      <th className="py-2 px-3">Total Due</th>
                      <th className="py-2 px-3">Principal</th>
                      <th className="py-2 px-3">Interest</th>
                      <th className="py-2 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                    {selectedSale.amortizationSchedule.map((row) => (
                      <tr key={row.installmentNumber} className="hover:bg-slate-800/40">
                        <td className="py-2 px-3 text-slate-400">{row.installmentNumber}</td>
                        <td className="py-2 px-3 text-white">{row.dueDate}</td>
                        <td className="py-2 px-3 font-bold text-blue-400">{currencySymbol}{row.amount.toLocaleString()}</td>
                        <td className="py-2 px-3 text-slate-300">{currencySymbol}{row.principal.toLocaleString()}</td>
                        <td className="py-2 px-3 text-slate-400">{currencySymbol}{row.interest.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right">
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                              row.status === 'Paid'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : row.status === 'Overdue'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedSale(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Payment Dialog */}
      {isRecordPayOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handlePostPayment}
            className="bg-[#121624] border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record Client Payment / Issue OR</h3>
              <button
                type="button"
                onClick={() => setIsRecordPayOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Select Financed Account</label>
              <select
                value={paySaleId}
                onChange={(e) => setPaySaleId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              >
                {sales.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.saleNumber} - {s.customerName} ({s.vehicleName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Payment Amount (₱)</label>
                <input
                  type="number"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Payment Category</label>
                <select
                  value={payType}
                  onChange={(e) => setPayType(e.target.value as PaymentTransaction['type'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                >
                  <option value="Monthly Amortization">Monthly Amortization</option>
                  <option value="Down Payment Equity">Down Payment Equity</option>
                  <option value="Chattel & Insurance Fee">Chattel & Insurance Fee</option>
                  <option value="Full Principal Payoff">Full Principal Payoff</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Payment Method</label>
              <select
                value={payMethod}
                onChange={(e) => setPayMethod(e.target.value as PaymentTransaction['method'])}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
              >
                <option value="PDC Check Clearing (BPI)">PDC Check Clearing (BPI)</option>
                <option value="Bank Wire (BDO)">Bank Wire (BDO)</option>
                <option value="InstaPay / PESONet">InstaPay / PESONet</option>
                <option value="Showroom Cashier">Showroom Cashier</option>
                <option value="Auto-Debit Arrangement">Auto-Debit Arrangement</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Bank Reference / Check #</label>
              <input
                type="text"
                required
                value={payRef}
                onChange={(e) => setPayRef(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
              />
            </div>

            <div className="p-3 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">External Payment Gateway Verified</span>
                <span className="text-[10px] text-slate-400">Distinguishes verified bank wires from manual dealership cashier logs</span>
              </div>
              <input
                type="checkbox"
                checked={isGatewayVerified}
                onChange={(e) => setIsGatewayVerified(e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsRecordPayOpen(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
              >
                Generate OR & Post
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Official Receipt (OR) Modal */}
      {activeReceiptTx && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-lg w-full p-8 max-h-[92vh] overflow-y-auto space-y-5 text-xs shadow-2xl">
            {/* Printable Header */}
            <div className="text-center border-b pb-4 border-slate-300 space-y-1">
              <div className="font-black text-xl tracking-wider uppercase text-slate-950">
                APEX MOTORS PHILIPPINES
              </div>
              <div className="text-[11px] text-slate-600">
                BGC Flagship Showroom • 5th Ave cor 28th St, BGC, Taguig City
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                TIN: 009-841-209-000-VAT • SEC Reg: CS2023-091842
              </div>
              <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-widest border border-slate-300">
                OFFICIAL RECEIPT
              </div>
            </div>

            {/* Receipt Meta */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono border-b pb-3 border-slate-200">
              <div>
                <span className="text-slate-500 block">OR NUMBER:</span>
                <span className="font-bold text-slate-900 text-sm">{activeReceiptTx.orNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">DATE & TIME:</span>
                <span className="font-bold text-slate-900">{activeReceiptTx.date} {activeReceiptTx.time}</span>
              </div>
            </div>

            {/* Client & Vehicle Details */}
            <div className="space-y-1.5 py-1 text-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">RECEIVED FROM:</span>
                <span className="font-bold">{activeReceiptTx.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">VEHICLE UNIT:</span>
                <span className="font-bold">{activeReceiptTx.vehicleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PAYMENT TYPE:</span>
                <span className="font-bold">{activeReceiptTx.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PAYMENT METHOD:</span>
                <span className="font-bold">{activeReceiptTx.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">BANK REFERENCE:</span>
                <span className="font-mono">{activeReceiptTx.refNumber}</span>
              </div>
            </div>

            {/* Total Paid Amount */}
            <div className="p-3.5 bg-slate-100 rounded-lg border border-slate-300 text-center space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">Total Amount Cleared</span>
              <div className="text-2xl font-black font-mono text-emerald-700">
                {currencySymbol}{activeReceiptTx.amount.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {activeReceiptTx.isVerifiedGateway ? '✓ Verified by Financial Gateway' : 'Authorized Showroom Cashier Stamp'}
              </span>
            </div>

            {/* Signatures */}
            <div className="pt-6 grid grid-cols-2 gap-4 text-center text-[10px] text-slate-600 border-t border-slate-200">
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-800">{activeReceiptTx.receivedBy}</div>
                Authorized Representative
              </div>
              <div>
                <div className="border-b border-slate-400 pb-1 mb-1 font-bold text-slate-800">DriveFlow Enterprise</div>
                System Automated Cryptographic Stamp
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 no-print">
              <button
                onClick={printReceipt}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold flex items-center gap-1.5 hover:bg-slate-800"
              >
                <Printer className="w-4 h-4" />
                Print Official Receipt
              </button>
              <button
                onClick={() => setActiveReceiptTx(null)}
                className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold"
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

