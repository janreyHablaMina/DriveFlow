'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronLeft,
  ShieldCheck,
  Calendar,
  X,
  CreditCard,
  Banknote,
  FileText,
  MoreVertical,
  Car,
  Phone,
  Mail,
  ArrowUpRight,
} from 'lucide-react';
import { SaleRecord, PaymentTransaction } from '../../types';

interface SalesTabProps {
  sales: SaleRecord[];
  onRecordPayment: (payment: Omit<PaymentTransaction, 'id'>, saleId: string) => void;
  onUpdateStatus?: (saleId: string, status: SaleRecord['status']) => void;
  currencySymbol: string;
}

export const SalesTab: React.FC<SalesTabProps> = ({
  sales,
  onRecordPayment,
  onUpdateStatus,
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

  // Mount state for portal hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dropdown portal state
  const [dropdownMenu, setDropdownMenu] = useState<{
    id: string;
    top: number;
    right: number;
    sale: SaleRecord;
  } | null>(null);

  // Close dropdown on click outside, scroll, resize
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.sales-portal-dropdown') && !target.closest('.sales-action-trigger')) {
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

  // Pagination for table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, financingTypeFilter]);

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage) || 1;
  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSales.slice(start, start + itemsPerPage);
  }, [filteredSales, currentPage, itemsPerPage]);

  const getInitials = (name: string) => {
    const clean = name.replace(/^(Arch\.|Dr\.|Capt\.|Atty\.|Mr\.|Ms\.|Mrs\.|Engr\.)\s+/i, '');
    const parts = clean.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

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

  const getStatusBadge = (status: SaleRecord['status']) => {
    switch (status) {
      case 'Active / Current':
        return (
          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
            Active / Current
          </span>
        );
      case 'Overdue':
        return (
          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border bg-red-500/10 text-red-400 border-red-500/30 animate-pulse">
            Overdue
          </span>
        );
      case 'Payment Due Soon':
        return (
          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border bg-amber-500/10 text-amber-400 border-amber-500/30">
            Due Soon
          </span>
        );
      case 'Fully Paid':
        return (
          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border bg-sky-500/10 text-sky-400 border-sky-500/30">
            Fully Settled
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold border bg-slate-800 text-slate-300 border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Sales & Payments</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredSales.length} contracts)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track financed accounts receivable, monthly amortization schedules, cashier logs, and BIR official receipts.
          </p>
        </div>

        <button
          onClick={() => {
            setPaySaleId(sales[0]?.id || '');
            setIsRecordPayOpen(true);
          }}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          Record Client Payment
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sale #, buyer, vehicle or VIN..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
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
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Financing Structures</option>
            <option value="In-House Financing">In-House Dealership Financing</option>
            <option value="Bank Partner Financed">External Bank Financed</option>
            <option value="Full Cash Sale">Full Cash Transaction</option>
          </select>
        </div>
      </div>

      {/* Simplified Sales Contracts Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Sale # & Buyer</th>
                <th className="py-3 px-3">Vehicle Financed</th>
                <th className="py-3 px-3">Balances & Terms</th>
                <th className="py-3 px-3">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedSales.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <Receipt className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">No sales contracts found</p>
                    <p className="text-xs text-slate-600 mt-0.5">Try adjusting your search criteria or filters</p>
                  </td>
                </tr>
              ) : (
                paginatedSales.map((sale) => (
                  <tr
                    key={sale.id}
                    onClick={() => setSelectedSale(sale)}
                    className="hover:bg-slate-800/50 transition cursor-pointer group"
                  >
                    {/* Buyer & Contract */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {sale.customerAvatar ? (
                          <img
                            src={sale.customerAvatar}
                            alt={sale.customerName}
                            className="w-9 h-9 rounded-none object-cover border border-slate-700 shrink-0 group-hover:border-slate-500 transition"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {getInitials(sale.customerName)}
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-white block text-xs leading-tight group-hover:text-red-400 transition">
                            {sale.customerName}
                          </span>
                          <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span className="text-red-400 font-semibold">{sale.saleNumber}</span>
                            <span className="text-slate-600">•</span>
                            <span>{sale.saleDate}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Vehicle */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-white font-medium truncate max-w-[200px]">
                          {sale.vehicleName}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="bg-slate-900 px-1.5 py-0.2 border border-slate-800 text-slate-300">
                          {sale.plate || 'No Plate'}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{sale.financingType}</span>
                      </div>
                    </td>

                    {/* Balances & Terms - Essential Only */}
                    <td className="py-3 px-3 font-mono">
                      <div className="flex items-baseline gap-1.5">
                        {sale.remainingBalance === 0 ? (
                          <span className="text-emerald-400 font-bold text-xs">Fully Settled</span>
                        ) : (
                          <>
                            <span className="text-white font-bold text-xs">
                              {currencySymbol}{sale.remainingBalance.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400">bal</span>
                          </>
                        )}
                      </div>
                      <div className="text-[11px] text-red-400 font-semibold mt-0.5">
                        {currencySymbol}{sale.monthlyAmortization.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/ mo</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      {getStatusBadge(sale.status)}
                    </td>

                    {/* Actions Menu Trigger */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dropdownMenu?.id === sale.id) {
                            setDropdownMenu(null);
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const menuHeight = 230;
                            const spaceBelow = window.innerHeight - rect.bottom;
                            const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
                            const top = openUpward
                              ? Math.max(10, rect.top - menuHeight - 4)
                              : Math.min(window.innerHeight - menuHeight - 10, rect.bottom + 4);
                            const right = Math.max(10, window.innerWidth - rect.right);
                            setDropdownMenu({ id: sale.id, top, right, sale });
                          }
                        }}
                        className={`sales-action-trigger p-1.5 rounded-none border transition cursor-pointer inline-flex items-center justify-center ${
                          dropdownMenu?.id === sale.id
                            ? 'bg-slate-800 text-white border-slate-600'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Actions"
                        aria-label="Contract Actions"
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
            Showing <strong className="text-white">{filteredSales.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-white">
              {Math.min(currentPage * itemsPerPage, filteredSales.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredSales.length}</strong> contracts
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

      {/* Detailed Sale Dossier & Amortization Modal */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-4xl w-full p-6 max-h-[92vh] overflow-y-auto space-y-5 text-xs shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3.5">
                {selectedSale.customerAvatar ? (
                  <img
                    src={selectedSale.customerAvatar}
                    alt={selectedSale.customerName}
                    className="w-12 h-12 rounded-none object-cover border border-slate-700 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-none bg-slate-900 border border-slate-700 text-slate-200 font-bold font-mono text-base flex items-center justify-center shrink-0">
                    {getInitials(selectedSale.customerName)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedSale.customerName}</h3>
                    <span className="text-xs font-mono font-semibold text-red-400 bg-red-950/40 border border-red-800/60 px-2 py-0.5">
                      {selectedSale.saleNumber}
                    </span>
                    {getStatusBadge(selectedSale.status)}
                  </div>
                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Car className="w-3.5 h-3.5 text-slate-400" />
                      {selectedSale.vehicleName}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span>Plate: <strong className="text-slate-200">{selectedSale.plate || 'N/A'}</strong></span>
                    <span className="text-slate-600">•</span>
                    <span>VIN: <strong className="text-slate-200">{selectedSale.vin}</strong></span>
                    <span className="text-slate-600">•</span>
                    <span>Structure: <strong className="text-slate-200">{selectedSale.financingType}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedSale.customerPhone}`}
                  className="p-2 border border-slate-700 bg-slate-900 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition"
                  title={`Call ${selectedSale.customerPhone}`}
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${selectedSale.customerEmail}`}
                  className="p-2 border border-slate-700 bg-slate-900 text-slate-300 hover:text-sky-400 hover:bg-slate-800 transition"
                  title={`Email ${selectedSale.customerEmail}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedSale(null)}
                  className="p-2 border border-slate-700 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Balances Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-none bg-slate-900 border border-slate-800 font-mono">
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Contract Value</span>
                <span className="text-white font-bold text-sm">{currencySymbol}{selectedSale.salePrice.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Sold on {selectedSale.saleDate}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Downpayment Paid</span>
                <span className="text-emerald-400 font-bold text-sm">{currencySymbol}{selectedSale.downPaymentPaid.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Equity Cleared</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Financed Principal</span>
                <span className="text-white font-bold text-sm">{currencySymbol}{selectedSale.principalFinanced.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">{selectedSale.termMonths} Months Term</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase block">Remaining Balance</span>
                <span className="text-red-400 font-bold text-sm">{currencySymbol}{selectedSale.remainingBalance.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{currencySymbol}{selectedSale.monthlyAmortization.toLocaleString()} / mo</span>
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
                  className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Post New Payment
                </button>
              </div>

              <div className="space-y-2">
                {selectedSale.paymentHistory.length === 0 ? (
                  <div className="p-4 bg-slate-900 border border-slate-800 text-center text-slate-500 font-mono text-[11px]">
                    No receipts recorded yet for this contract.
                  </div>
                ) : (
                  selectedSale.paymentHistory.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-3 rounded-none bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{tx.orNumber}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-none bg-red-500/10 text-red-400 border border-red-500/20">
                            {tx.type}
                          </span>
                          {tx.isVerifiedGateway ? (
                            <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1 rounded-none">Gateway Verified</span>
                          ) : (
                            <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1 rounded-none">Cashier Logged</span>
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
                          className="px-2.5 py-1 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3 h-3" />
                          Print OR
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Installment Schedule */}
            <div>
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono mb-2">
                Installment Amortization Schedule
              </h4>
              <div className="border border-slate-800 rounded-none overflow-hidden">
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
                        <td className="py-2 px-3 font-bold text-red-400">{currencySymbol}{row.amount.toLocaleString()}</td>
                        <td className="py-2 px-3 text-slate-300">{currencySymbol}{row.principal.toLocaleString()}</td>
                        <td className="py-2 px-3 text-slate-400">{currencySymbol}{row.interest.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right">
                          <span
                            className={`px-1.5 py-0.2 rounded-none text-[10px] font-bold ${
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

            <div className="flex justify-end items-center gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setPaySaleId(selectedSale.id);
                  setIsRecordPayOpen(true);
                }}
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-red-950/40"
              >
                <Plus className="w-4 h-4" />
                Record Payment
              </button>
              <button
                onClick={() => setSelectedSale(null)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
              >
                Close Dossier
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
            className="bg-[#121624] border border-slate-700 rounded-none max-w-md w-full p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record Client Payment / Issue OR</h3>
              <button
                type="button"
                onClick={() => setIsRecordPayOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Select Financed Account</label>
              <select
                value={paySaleId}
                onChange={(e) => setPaySaleId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Payment Category</label>
                <select
                  value={payType}
                  onChange={(e) => setPayType(e.target.value as PaymentTransaction['type'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
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
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
              />
            </div>

            <div className="p-3 rounded-none bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">External Payment Gateway Verified</span>
                <span className="text-[10px] text-slate-400">Distinguishes verified bank wires from manual dealership cashier logs</span>
              </div>
              <input
                type="checkbox"
                checked={isGatewayVerified}
                onChange={(e) => setIsGatewayVerified(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsRecordPayOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
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
          <div className="bg-white text-slate-900 rounded-none max-w-lg w-full p-8 max-h-[92vh] overflow-y-auto space-y-5 text-xs shadow-2xl">
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
              <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-none text-xs font-bold uppercase tracking-widest border border-slate-300">
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
            <div className="p-3.5 bg-slate-100 rounded-none border border-slate-300 text-center space-y-1">
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
                className="px-4 py-2 rounded-none bg-slate-900 text-white font-bold flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Official Receipt
              </button>
              <button
                onClick={() => setActiveReceiptTx(null)}
                className="px-4 py-2 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Menu Portal */}
      {mounted && dropdownMenu && createPortal(
        <div
          className="sales-portal-dropdown fixed z-9999 w-64 bg-[#121624] border border-slate-700 shadow-2xl py-1 text-xs divide-y divide-slate-800 animate-in fade-in zoom-in-95 duration-100"
          style={{
            top: `${dropdownMenu.top}px`,
            right: `${dropdownMenu.right}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div className="px-3 py-2 bg-slate-900/90 flex items-center justify-between">
            <span className="text-[10px] font-mono text-red-400 font-bold">
              {dropdownMenu.sale.saleNumber}
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[130px]">
              {dropdownMenu.sale.customerName}
            </span>
          </div>

          {/* Primary Actions */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setSelectedSale(dropdownMenu.sale);
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-semibold block leading-tight">View Ledger & ORs</span>
                <span className="text-[10px] text-slate-500">Amortization schedule & receipts</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPaySaleId(dropdownMenu.sale.id);
                setIsRecordPayOpen(true);
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-400 hover:bg-slate-800 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <div>
                <span className="font-semibold block leading-tight">Record Payment</span>
                <span className="text-[10px] text-slate-500">Post client payment & issue OR</span>
              </div>
            </button>

            {dropdownMenu.sale.paymentHistory.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setActiveReceiptTx(dropdownMenu.sale.paymentHistory[0]);
                  setDropdownMenu(null);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                <div>
                  <span className="font-semibold block leading-tight">Print Latest OR</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {dropdownMenu.sale.paymentHistory[0].orNumber}
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Quick Status Update */}
          {onUpdateStatus && (
            <div>
              <div className="px-3 pt-2 pb-1 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                Change Account Status
              </div>
              <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                {(['Active / Current', 'Payment Due Soon', 'Overdue', 'Fully Paid'] as SaleRecord['status'][]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      onUpdateStatus(dropdownMenu.sale.id, status);
                      setDropdownMenu(null);
                    }}
                    className={`px-1.5 py-1 text-[10px] font-mono rounded-none text-left truncate transition cursor-pointer ${
                      dropdownMenu.sale.status === status
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {status === 'Active / Current' ? 'Active' : status === 'Payment Due Soon' ? 'Due Soon' : status === 'Fully Paid' ? 'Fully Paid' : 'Overdue'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Buyer */}
          <div className="py-1">
            <a
              href={`tel:${dropdownMenu.sale.customerPhone}`}
              onClick={() => setDropdownMenu(null)}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {dropdownMenu.sale.customerPhone}</span>
            </a>

            <a
              href={`mailto:${dropdownMenu.sale.customerEmail}`}
              onClick={() => setDropdownMenu(null)}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Buyer</span>
            </a>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

