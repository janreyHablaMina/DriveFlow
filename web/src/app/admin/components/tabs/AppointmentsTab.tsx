'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  Search,
  Plus,
  Clock,
  Car,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Building,
  Filter,
  Check,
  X,
  CalendarCheck,
  MoreVertical,
} from 'lucide-react';
import { Appointment, AppointmentStatus, AppointmentType, AdminVehicle, StaffMember } from '../../types';

interface AppointmentsTabProps {
  appointments: Appointment[];
  vehicles: AdminVehicle[];
  staff: StaffMember[];
  onAddAppointment: (apt: Omit<Appointment, 'id' | 'createdDate'>) => void;
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}

export const AppointmentsTab: React.FC<AppointmentsTabProps> = ({
  appointments,
  vehicles,
  staff,
  onAddAppointment,
  onUpdateStatus,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dropdown portal state
  const [dropdownMenu, setDropdownMenu] = useState<{
    id: string;
    top: number;
    right: number;
    apt: Appointment;
  } | null>(null);

  // Close dropdown on click outside, scroll, or resize
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.appointment-portal-dropdown') && !target.closest('.appointment-action-trigger')) {
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

  // Booking Modal
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [formCustName, setFormCustName] = useState('');
  const [formCustPhone, setFormCustPhone] = useState('');
  const [formCustEmail, setFormCustEmail] = useState('');
  const [formVehicle, setFormVehicle] = useState(vehicles[0]?.name || '');
  const [formType, setFormType] = useState<AppointmentType>('Showroom Visit & Consultation');
  const [formDate, setFormDate] = useState('2026-10-18');
  const [formSlot, setFormSlot] = useState('02:00 PM - 03:00 PM');
  const [formStaff, setFormStaff] = useState(staff[0]?.name || 'Janrey Mina');
  const [formBranchId, setFormBranchId] = useState('main');
  const [formNotes, setFormNotes] = useState('');

  // Conflict Checking
  const conflictDetected = useMemo(() => {
    return appointments.some(
      (a) =>
        a.date === formDate &&
        a.timeSlot === formSlot &&
        a.vehicleName === formVehicle &&
        a.status !== 'Cancelled'
    );
  }, [appointments, formDate, formSlot, formVehicle]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchSearch =
        apt.customerName.toLowerCase().includes(search.toLowerCase()) ||
        apt.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
        apt.assignedStaff.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchType = typeFilter === 'all' || apt.appointmentType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [appointments, search, statusFilter, typeFilter]);

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (conflictDetected) {
      alert('A booking conflict already exists for this vehicle and timeslot.');
      return;
    }
    onAddAppointment({
      customerName: formCustName,
      customerPhone: formCustPhone,
      customerEmail: formCustEmail,
      vehicleName: formVehicle,
      appointmentType: formType,
      date: formDate,
      timeSlot: formSlot,
      assignedStaff: formStaff,
      branchId: formBranchId,
      status: 'Confirmed',
      notes: formNotes || 'Showroom consultation and vehicle inspection appointment.',
    });
    setIsBookModalOpen(false);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Confirmed</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending</span>;
      case 'Completed':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Completed</span>;
      case 'Cancelled':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">Cancelled</span>;
      case 'No-show':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-700 text-slate-400">No-Show</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Appointments & Customer Scheduling</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredAppointments.length} bookings)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Coordinate showroom visits, vehicle inspections, financing signings, and vehicle handovers without slot clashes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-none p-0.5">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs font-semibold rounded-none transition cursor-pointer ${viewMode === 'list' ? 'bg-[#e10600] text-white shadow-sm shadow-red-950/40' : 'text-slate-400 hover:text-white'}`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 text-xs font-semibold rounded-none transition cursor-pointer ${viewMode === 'calendar' ? 'bg-[#e10600] text-white shadow-sm shadow-red-950/40' : 'text-slate-400 hover:text-white'}`}
            >
              Calendar Schedule
            </button>
          </div>

          <button
            onClick={() => setIsBookModalOpen(true)}
            className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-red-950/40"
          >
            <Plus className="w-4 h-4" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, vehicle or consultant..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Booking Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending Confirmation</option>
            <option value="Completed">Completed Handovers</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Appointment Types</option>
            <option value="Showroom Visit & Consultation">Showroom Visit & Consultation</option>
            <option value="Vehicle Viewing & Inspection">Vehicle Viewing & Inspection</option>
            <option value="Vehicle Unit Handover">Vehicle Unit Handover</option>
            <option value="Financing Contract Signing">Financing Contract Signing</option>
            <option value="Appraisal & Trade-In">Appraisal & Trade-In</option>
          </select>
        </div>
      </div>

      {/* Content View */}
      {viewMode === 'list' ? (
        <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-3">Vehicle</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Date & Slot</th>
                  <th className="py-3 px-3">Assigned Staff</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredAppointments.map((apt) => {
                  return (
                    <tr key={apt.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <span className="font-bold text-white block">{apt.customerName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{apt.customerPhone}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="text-white font-medium block truncate max-w-[170px]">{apt.vehicleName}</span>
                        <span className="text-[10px] text-slate-500">{apt.notes}</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-none bg-slate-800 text-slate-300 text-[10px] font-mono">
                          {apt.appointmentType}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono text-[11px]">
                        <span className="text-white font-bold block">{apt.date}</span>
                        <span className="text-red-400 text-[10px]">{apt.timeSlot}</span>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-slate-200">
                        {apt.assignedStaff}
                      </td>

                      <td className="py-3 px-3">
                        {getStatusBadge(apt.status)}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (dropdownMenu?.id === apt.id) {
                              setDropdownMenu(null);
                            } else {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const menuHeight = 220;
                              const spaceBelow = window.innerHeight - rect.bottom;
                              const openUpward = spaceBelow < menuHeight && rect.top > menuHeight;
                              const top = openUpward
                                ? Math.max(10, rect.top - menuHeight - 4)
                                : Math.min(window.innerHeight - menuHeight - 10, rect.bottom + 4);
                              const right = Math.max(10, window.innerWidth - rect.right);
                              setDropdownMenu({ id: apt.id, top, right, apt });
                            }
                          }}
                          className={`appointment-action-trigger p-1.5 rounded-none border transition cursor-pointer inline-flex items-center justify-center ${
                            dropdownMenu?.id === apt.id
                              ? 'bg-slate-800 text-white border-slate-600'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                          title="Actions"
                          aria-label="Appointment Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar Week View Grid */
        <div className="bg-[#121624] border border-slate-800 rounded-none p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-red-500" />
              Schedule Grid: October 15 – October 21, 2026
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-none">
              Conflict Engine Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {['2026-10-17', '2026-10-18', '2026-10-19', '2026-10-20'].map((day) => {
              const dayApts = appointments.filter((a) => a.date === day);
              return (
                <div key={day} className="p-3.5 rounded-none bg-slate-900 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 font-mono">
                    <span className="text-xs font-bold text-white">{day}</span>
                    <span className="text-[10px] text-slate-400">{dayApts.length} Slots</span>
                  </div>

                  {dayApts.length === 0 ? (
                    <div className="py-8 text-center text-slate-600 font-mono text-[11px]">
                      No Bookings
                    </div>
                  ) : (
                    dayApts.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-2.5 rounded-none bg-slate-950/80 border border-slate-800/90 text-[11px] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">{apt.customerName}</span>
                          {getStatusBadge(apt.status)}
                        </div>
                        <div className="text-slate-400 text-[10px]">{apt.timeSlot}</div>
                        <div className="text-slate-300 font-medium text-[10px] truncate">{apt.vehicleName}</div>
                        <div className="text-slate-500 text-[10px]">Staff: {apt.assignedStaff}</div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Book Appointment Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateAppointment}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Schedule Client Appointment</h3>
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {conflictDetected && (
              <div className="p-3 rounded-none bg-red-950/40 border border-red-500/50 text-red-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>
                  <strong>Schedule Clash Detected:</strong> The selected vehicle is already booked for this specific time slot. Please choose another time.
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Roberto Tan"
                  value={formCustName}
                  onChange={(e) => setFormCustName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Customer Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+63 917 000 0000"
                    value={formCustPhone}
                    onChange={(e) => setFormCustPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="client@mail.com"
                    value={formCustEmail}
                    onChange={(e) => setFormCustEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Vehicle Unit</label>
                <select
                  value={formVehicle}
                  onChange={(e) => setFormVehicle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.name}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Appointment Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as AppointmentType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  >
                    <option value="Showroom Visit & Consultation">Showroom Visit & Consultation</option>
                    <option value="Vehicle Viewing & Inspection">Vehicle Viewing & Inspection</option>
                    <option value="Vehicle Unit Handover">Vehicle Unit Handover</option>
                    <option value="Financing Contract Signing">Financing Contract Signing</option>
                    <option value="Appraisal & Trade-In">Appraisal & Trade-In</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Assigned Consultant</label>
                  <select
                    value={formStaff}
                    onChange={(e) => setFormStaff(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                  >
                    {staff.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Time Slot</label>
                  <select
                    value={formSlot}
                    onChange={(e) => setFormSlot(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                  >
                    <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                    <option value="11:30 AM - 01:00 PM">11:30 AM - 01:00 PM</option>
                    <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                    <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Internal Instructions & Route Notes</label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Bring trade-in appraisal checklist and insurance binder."
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white h-16 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={conflictDetected}
                className={`px-4 py-2 rounded-none font-bold transition shadow-sm cursor-pointer ${
                  conflictDetected
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-[#e10600] hover:bg-[#c00500] text-white shadow-red-950/40'
                }`}
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Dropdown Menu via Portal - never cropped by overflow or footer */}
      {mounted && dropdownMenu && createPortal(
        <div
          className="appointment-portal-dropdown w-48 bg-[#0d111d] border border-slate-700 shadow-2xl rounded-none py-1 text-xs text-left"
          style={{
            position: 'fixed',
            top: dropdownMenu.top,
            right: dropdownMenu.right,
            zIndex: 99999,
          }}
        >
          <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Appointment Actions
          </div>

          {dropdownMenu.apt.status === 'Pending' && (
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(dropdownMenu.apt.id, 'Confirmed');
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-emerald-400 hover:bg-slate-800 transition cursor-pointer font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm Booking</span>
            </button>
          )}

          {dropdownMenu.apt.status === 'Confirmed' && (
            <>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(dropdownMenu.apt.id, 'Completed');
                  setDropdownMenu(null);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-emerald-400 hover:bg-slate-800 transition cursor-pointer font-medium"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark as Completed</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateStatus(dropdownMenu.apt.id, 'No-show');
                  setDropdownMenu(null);
                }}
                className="w-full text-left px-3 py-2 flex items-center gap-2 text-amber-400 hover:bg-slate-800 transition cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Mark as No-Show</span>
              </button>
            </>
          )}

          {(dropdownMenu.apt.status === 'Completed' || dropdownMenu.apt.status === 'No-show') && (
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(dropdownMenu.apt.id, 'Confirmed');
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Re-open as Confirmed</span>
            </button>
          )}

          {dropdownMenu.apt.status === 'Cancelled' ? (
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(dropdownMenu.apt.id, 'Pending');
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-sky-400 hover:bg-slate-800 transition cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Restore to Pending</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(dropdownMenu.apt.id, 'Cancelled');
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-red-400 hover:bg-red-950/30 transition cursor-pointer border-t border-slate-800/80 mt-1"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Appointment</span>
            </button>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

