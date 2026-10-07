'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Car,
  Search,
  Plus,
  Filter,
  Grid,
  List,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Tag,
  DollarSign,
  Shield,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Archive,
} from 'lucide-react';
import { AdminVehicle, VehicleStatus } from '../../types';

interface InventoryTabProps {
  vehicles: AdminVehicle[];
  onAddVehicle: (vehicle: Omit<AdminVehicle, 'id' | 'addedDate'>) => void;
  onUpdateVehicle: (vehicle: AdminVehicle) => void;
  onDeleteVehicle: (id: string) => void;
  currencySymbol: string;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  vehicles,
  onAddVehicle,
  onUpdateVehicle,
  onDeleteVehicle,
  currencySymbol,
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modals
  const [selectedVehicle, setSelectedVehicle] = useState<AdminVehicle | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // New vehicle form state
  const [formName, setFormName] = useState('');
  const [formMake, setFormMake] = useState('Toyota');
  const [formModel, setFormModel] = useState('');
  const [formTrim, setFormTrim] = useState('');
  const [formYear, setFormYear] = useState(2025);
  const [formCategory, setFormCategory] = useState<AdminVehicle['category']>('suv');
  const [formPrice, setFormPrice] = useState(1950000);
  const [formMinDp, setFormMinDp] = useState(20);
  const [formMileage, setFormMileage] = useState('15,000 KM');
  const [formFuel, setFormFuel] = useState('Diesel');
  const [formTransmission, setFormTransmission] = useState('Automatic');
  const [formColor, setFormColor] = useState('Pearl White');
  const [formVin, setFormVin] = useState('DFV-NEW-9981');
  const [formStock, setFormStock] = useState('STK-2026-99');
  const [formBranchId, setFormBranchId] = useState('main');
  const [formStatus, setFormStatus] = useState<VehicleStatus>('Available');
  const [formImages, setFormImages] = useState<string>('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80');

  // Filtering
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.vin.toLowerCase().includes(search.toLowerCase()) ||
        v.stockNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [vehicles, search, statusFilter, categoryFilter]);

  // Pagination State (Default 10 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Reset to first page when filtering or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, categoryFilter, pageSize]);

  const totalItems = filteredVehicles.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paginatedVehicles = useMemo(() => {
    const safePage = Math.min(Math.max(1, currentPage), totalPages);
    const start = (safePage - 1) * pageSize;
    return filteredVehicles.slice(start, start + pageSize);
  }, [filteredVehicles, currentPage, totalPages, pageSize]);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const monthly = Math.round((formPrice * (1 - formMinDp / 100)) / 48 * 1.15);
    onAddVehicle({
      name: formName || `${formYear} ${formMake} ${formModel} ${formTrim}`,
      make: formMake,
      model: formModel || 'Vehicle',
      trim: formTrim || 'Standard',
      year: Number(formYear),
      category: formCategory,
      categoryLabel: formCategory.toUpperCase(),
      priceNumeric: Number(formPrice),
      monthlyEstimate: monthly,
      minDownPaymentPct: Number(formMinDp),
      mileage: formMileage,
      transmission: formTransmission,
      fuel: formFuel,
      color: formColor,
      plateEnding: '8',
      vin: formVin,
      stockNumber: formStock,
      branchId: formBranchId,
      status: formStatus,
      isFeatured: false,
      isPublicListing: formStatus !== 'Draft',
      images: [formImages],
      features: ['Apple CarPlay', 'Leather Seats', 'Keyless Entry', 'Backup Camera'],
      inspectionScore: 96,
    });
    setIsAddModalOpen(false);
  };

  const getStatusBadge = (status: VehicleStatus) => {
    switch (status) {
      case 'Available':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Available</span>;
      case 'Reserved':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Reserved</span>;
      case 'Financing Pending':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Financing CI</span>;
      case 'Sold':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-700/50 text-slate-300 border border-slate-600">Sold</span>;
      case 'Archived':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30">Archived</span>;
      case 'Draft':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">Draft</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Vehicle Inventory & Fleet Control</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredVehicles.length} of {vehicles.length} units)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage stock catalog, pricing, financing down payments, and public marketplace listing status.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-none p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-none cursor-pointer ${viewMode === 'table' ? 'bg-[#e10600] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-none cursor-pointer ${viewMode === 'grid' ? 'bg-[#e10600] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              title="Grid Cards View"
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search make, model, VIN, stock #..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Inventory Statuses</option>
            <option value="Available">Available for Sale</option>
            <option value="Reserved">Reserved</option>
            <option value="Financing Pending">Financing Pending CI</option>
            <option value="Sold">Sold Units</option>
            <option value="Draft">Draft (Unpublished)</option>
            <option value="Archived">Archived</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Categories (SUV, Sedan, Truck)</option>
            <option value="suv">Family & Luxury SUVs</option>
            <option value="sedan">Executive Sedans</option>
            <option value="truck">Trucks & 4x4 Off-Road</option>
            <option value="premium">Premium Exotics</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table or Grid */}
      {viewMode === 'table' ? (
        <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Vehicle Details</th>
                  <th className="py-3 px-3">Selling Price</th>
                  <th className="py-3 px-3">Min DP / Est Monthly</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-center">Public Live</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <Car className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <span className="font-mono text-xs">No vehicles match your active search or filter criteria.</span>
                    </td>
                  </tr>
                ) : (
                  paginatedVehicles.map((vehicle) => {
                  return (
                    <tr key={vehicle.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={vehicle.images[0]}
                            alt={vehicle.name}
                            className="w-12 h-9 rounded-none object-cover border border-slate-800 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              {vehicle.name}
                              {vehicle.isFeatured && (
                                <span className="text-[9px] bg-red-600/20 text-red-400 border border-red-500/30 px-1 rounded-none">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {vehicle.mileage} • {vehicle.fuel} • {vehicle.transmission}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-white">
                        {currencySymbol}{vehicle.priceNumeric.toLocaleString()}
                      </td>

                      <td className="py-3 px-3 font-mono text-[11px]">
                        <span className="text-slate-300 block">{vehicle.minDownPaymentPct}% DP ({currencySymbol}{Math.round(vehicle.priceNumeric * (vehicle.minDownPaymentPct / 100)).toLocaleString()})</span>
                        <span className="text-red-500 font-bold">{currencySymbol}{vehicle.monthlyEstimate.toLocaleString()}/mo</span>
                      </td>

                      <td className="py-3 px-3">
                        {getStatusBadge(vehicle.status)}
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => {
                            onUpdateVehicle({
                              ...vehicle,
                              isPublicListing: !vehicle.isPublicListing,
                            });
                          }}
                          className={`w-7 h-4 rounded-none transition-colors relative cursor-pointer ${
                            vehicle.isPublicListing ? 'bg-emerald-600' : 'bg-slate-700'
                          }`}
                        >
                          <span
                            className={`block w-3 h-3 rounded-none bg-white transition-transform ${
                              vehicle.isPublicListing ? 'translate-x-3.5' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="p-1 rounded-none text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                            title="View Specs & Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingVehicle(vehicle)}
                            className="p-1 rounded-none text-slate-400 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                            title="Edit Vehicle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(vehicle.id)}
                            className="p-1 rounded-none text-slate-400 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                            title="Archive / Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVehicles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 bg-[#121624] border border-slate-800 p-8">
              <Car className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <span className="font-mono text-xs">No vehicles match your active search or filter criteria.</span>
            </div>
          ) : (
            paginatedVehicles.map((vehicle) => {
              return (
                <div
                  key={vehicle.id}
                  className="rounded-none bg-[#121624] border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <div className="relative h-44 w-full">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        {getStatusBadge(vehicle.status)}
                        {vehicle.isFeatured && (
                          <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-red-600 text-white">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-none bg-black/80 font-mono text-white text-xs font-bold">
                        {currencySymbol}{vehicle.priceNumeric.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{vehicle.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {vehicle.category.toUpperCase()} • {vehicle.mileage} • {vehicle.fuel}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-none bg-slate-900/80 border border-slate-800 text-[11px] grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-slate-400 block">Est Monthly:</span>
                          <span className="text-red-500 font-mono font-bold">{currencySymbol}{vehicle.monthlyEstimate.toLocaleString()}/mo</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Stock No:</span>
                          <span className="text-white font-mono">{vehicle.stockNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      {vehicle.isPublicListing ? 'Visible on Website' : 'Hidden from Website'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="px-2.5 py-1 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setEditingVehicle(vehicle)}
                        className="p-1 rounded-none text-slate-400 hover:text-red-400 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="bg-[#121624] border border-slate-800 p-3.5 rounded-none flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 text-slate-400">
          <span>
            Showing{' '}
            <strong className="text-white font-mono">
              {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </strong>
            –
            <strong className="text-white font-mono">
              {Math.min(currentPage * pageSize, totalItems)}
            </strong>{' '}
            of <strong className="text-white font-mono">{totalItems}</strong> units
          </span>

          <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
            <span className="text-[11px] text-slate-400">Display:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-900 border border-slate-700 rounded-none px-2 py-1 text-xs text-white focus:outline-hidden focus:border-red-500 font-mono cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className={`px-2.5 py-1.5 rounded-none border border-slate-800 text-xs font-medium flex items-center gap-1 transition ${
                currentPage <= 1
                  ? 'bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer'
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {getPageNumbers().map((item, idx) => {
              if (item === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-slate-600 font-mono text-xs select-none"
                  >
                    ...
                  </span>
                );
              }
              const pageNum = item as number;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`min-w-8 h-7 px-2 font-mono text-xs rounded-none border transition cursor-pointer ${
                    isActive
                      ? 'bg-[#e10600] border-[#e10600] text-white font-bold shadow-xs'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className={`px-2.5 py-1.5 rounded-none border border-slate-800 text-xs font-medium flex items-center gap-1 transition ${
                currentPage >= totalPages
                  ? 'bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer'
              }`}
              title="Next Page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedVehicle.name}</h3>
                <span className="text-xs font-mono text-slate-400">
                  VIN: {selectedVehicle.vin} • Stock: {selectedVehicle.stockNumber}
                </span>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img
                src={selectedVehicle.images[0]}
                alt={selectedVehicle.name}
                className="w-full h-48 object-cover rounded-none border border-slate-800"
              />
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-none bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Retail Selling Price</span>
                  <span className="text-lg font-black font-mono text-white">
                    {currencySymbol}{selectedVehicle.priceNumeric.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded-none bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Financing Calculator</span>
                  <span className="text-slate-200 block">Min DP: {selectedVehicle.minDownPaymentPct}%</span>
                  <span className="text-red-500 font-bold font-mono">
                    Est: {currencySymbol}{selectedVehicle.monthlyEstimate.toLocaleString()} / mo (48 Mos)
                  </span>
                </div>
                <div className="text-slate-300 space-y-1">
                  <div>Transmission: <strong className="text-white">{selectedVehicle.transmission}</strong></div>
                  <div>Engine / Fuel: <strong className="text-white">{selectedVehicle.fuel}</strong></div>
                  <div>Mileage: <strong className="text-white">{selectedVehicle.mileage}</strong></div>
                  <div>Color: <strong className="text-white">{selectedVehicle.color}</strong></div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Key Factory Features</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedVehicle.features.map((f, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-none bg-slate-800 text-slate-300 text-[11px]">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateVehicle}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add New Vehicle to Inventory</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Make</label>
                <input
                  type="text"
                  required
                  value={formMake}
                  onChange={(e) => setFormMake(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Model & Trim</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fortuner GR Sport"
                  value={formModel}
                  onChange={(e) => setFormModel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Year</label>
                <input
                  type="number"
                  required
                  value={formYear}
                  onChange={(e) => setFormYear(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as AdminVehicle['category'])}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="truck">Truck</option>
                  <option value="premium">Premium / Exotic</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Selling Price (₱)</label>
                <input
                  type="number"
                  required
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Min Down Payment (%)</label>
                <input
                  type="number"
                  required
                  value={formMinDp}
                  onChange={(e) => setFormMinDp(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">VIN / Chassis #</label>
                <input
                  type="text"
                  required
                  value={formVin}
                  onChange={(e) => setFormVin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Stock Number</label>
                <input
                  type="text"
                  required
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>
              <div className="col-span-2">
                <label className="text-slate-400 block mb-1">Initial Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as VehicleStatus)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  <option value="Available">Available</option>
                  <option value="Draft">Draft (Hold)</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Image URL</label>
              <input
                type="url"
                required
                value={formImages}
                onChange={(e) => setFormImages(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold shadow-sm shadow-red-950/40 cursor-pointer"
              >
                Save Vehicle
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Confirm Delete / Archive Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-sm w-full p-5 text-xs space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Confirm Vehicle Removal
            </h3>
            <p className="text-slate-300">
              Are you sure you want to remove or archive this unit? If there are active inquiries or pending loan applications attached, archiving is recommended to maintain audit records.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteVehicle(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-3 py-1.5 rounded-none bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

