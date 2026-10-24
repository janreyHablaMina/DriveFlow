'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ShieldCheck,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  Check,
  X,
  UserCheck,
  UserX,
  Shield,
  Key,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
} from 'lucide-react';
import { StaffMember, UserRole } from '../../types';

interface StaffTabProps {
  staff: StaffMember[];
  onInviteStaff: (member: Omit<StaffMember, 'id' | 'joinDate' | 'lastLogin' | 'avatar'>) => void;
  onToggleStatus: (id: string) => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({
  staff,
  onInviteStaff,
  onToggleStatus,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Mount state for portal hydration safety
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dropdown portal state
  const [dropdownMenu, setDropdownMenu] = useState<{
    id: string;
    top: number;
    right: number;
    member: StaffMember;
  } | null>(null);

  // Close dropdown on outside click, scroll, resize
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.staff-portal-dropdown') && !target.closest('.staff-action-trigger')) {
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

  // Invite Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('Sales Agent');
  const [formBranchId, setFormBranchId] = useState('main');

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || member.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [staff, search, roleFilter]);

  // Pagination for staff table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage) || 1;
  const paginatedStaff = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStaff.slice(start, start + itemsPerPage);
  }, [filteredStaff, currentPage, itemsPerPage]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    onInviteStaff({
      name: formName,
      email: formEmail,
      phone: formPhone,
      role: formRole,
      branchId: 'main',
      branchName: 'Main Dealership',
      active: true,
      permissions: {
        canApproveFinancing: formRole === 'Owner' || formRole === 'Administrator' || formRole === 'Financing Officer',
        canIssueReceipts: formRole === 'Owner' || formRole === 'Administrator' || formRole === 'Accountant',
        canEditPricing: formRole === 'Owner' || formRole === 'Administrator' || formRole === 'Manager',
        canManageWebsite: formRole === 'Owner' || formRole === 'Administrator',
        canViewSensitiveDocs: formRole !== 'Sales Agent',
        canExportReports: formRole !== 'Sales Agent',
      },
    });
    setIsInviteModalOpen(false);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Owner':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">Owner / Super</span>;
      case 'Administrator':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">Administrator</span>;
      case 'Financing Officer':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Financing Officer</span>;
      case 'Accountant':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Accountant</span>;
      case 'Manager':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-700 text-slate-200 border border-slate-600">General Manager</span>;
      case 'Sales Agent':
        return <span className="px-2 py-0.5 rounded-none text-[10px] font-mono font-bold bg-slate-800 text-slate-300">Sales Agent</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Staff Directory & Access Control (RBAC)</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredStaff.length} team members)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enforce role-based security policies for financing approvals, official receipt issuance, and sensitive document access.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-3.5 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <Plus className="w-4 h-4" />
          Invite Staff Member
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#121624] p-3.5 rounded-none border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team member by name or email..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-none px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Role Tiers</option>
            <option value="Owner">Owner / Superadmin</option>
            <option value="Administrator">Administrator</option>
            <option value="Financing Officer">Financing Officer</option>
            <option value="Accountant">Accountant</option>
            <option value="Manager">General Manager</option>
            <option value="Sales Agent">Sales Agent</option>
          </select>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-3">Role & Permissions</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-400">No staff members found</p>
                    <p className="text-xs text-slate-600 mt-0.5">Try adjusting your search criteria or role filter</p>
                  </td>
                </tr>
              ) : (
                paginatedStaff.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedStaff(member)}
                    className="hover:bg-slate-800/40 transition cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-none object-cover border border-slate-700 shrink-0 group-hover:border-slate-500 transition"
                        />
                        <div>
                          <span className="font-bold text-white block group-hover:text-red-400 transition">
                            {member.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{member.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      {getRoleBadge(member.role)}
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                      {member.phone}
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-none text-[10px] font-mono font-bold inline-block ${
                          member.active
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {member.active ? 'Active' : 'Deactivated'}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-[11px] font-mono text-slate-400">
                      {member.lastLogin}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (dropdownMenu?.id === member.id) {
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
                            setDropdownMenu({ id: member.id, top, right, member });
                          }
                        }}
                        className={`staff-action-trigger p-1.5 rounded-none border transition cursor-pointer inline-flex items-center justify-center ${
                          dropdownMenu?.id === member.id
                            ? 'bg-slate-800 text-white border-slate-600'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Actions"
                        aria-label="Staff Actions"
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
            Showing <strong className="text-white">{filteredStaff.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to{' '}
            <strong className="text-white">
              {Math.min(currentPage * itemsPerPage, filteredStaff.length)}
            </strong>{' '}
            of <strong className="text-white">{filteredStaff.length}</strong> team members
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

      {/* Staff Profile & Permissions Dossier Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-none max-w-xl w-full p-6 space-y-5 text-xs shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedStaff.avatar}
                  alt={selectedStaff.name}
                  className="w-12 h-12 rounded-none object-cover border border-slate-700 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{selectedStaff.name}</h3>
                    {getRoleBadge(selectedStaff.role)}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                    <span>{selectedStaff.email}</span>
                    <span>•</span>
                    <span>{selectedStaff.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedStaff(null)}
                className="p-1.5 border border-slate-700 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-900 border border-slate-800 font-mono text-[11px]">
              <div>
                <span className="text-slate-500 uppercase text-[9px] block">Branch Location</span>
                <span className="text-white font-medium">{selectedStaff.branchName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px] block">Account Status</span>
                <span className={selectedStaff.active ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {selectedStaff.active ? 'Active Account' : 'Deactivated Access'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px] block">Joined Team</span>
                <span className="text-slate-300">{selectedStaff.joinDate}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px] block">Last Activity</span>
                <span className="text-slate-300">{selectedStaff.lastLogin}</span>
              </div>
            </div>

            {/* Effective Permissions Checklist */}
            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase text-[10px] tracking-wider font-mono">
                Granted System Permissions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: 'Approve Financing', granted: selectedStaff.permissions.canApproveFinancing },
                  { label: 'Issue Official Receipts', granted: selectedStaff.permissions.canIssueReceipts },
                  { label: 'Edit Inventory Pricing', granted: selectedStaff.permissions.canEditPricing },
                  { label: 'View Sensitive Client Dossiers', granted: selectedStaff.permissions.canViewSensitiveDocs },
                  { label: 'Export Analytics Reports', granted: selectedStaff.permissions.canExportReports },
                ].map((perm) => (
                  <div
                    key={perm.label}
                    className={`p-2 rounded-none border flex items-center justify-between text-[11px] font-mono ${
                      perm.granted
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span>{perm.label}</span>
                    <span className="font-bold">{perm.granted ? '✓ Allowed' : '— Denied'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  onToggleStatus(selectedStaff.id);
                  setSelectedStaff({ ...selectedStaff, active: !selectedStaff.active });
                }}
                className={`px-3 py-1.5 rounded-none font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition ${
                  selectedStaff.active
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40'
                }`}
              >
                {selectedStaff.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                {selectedStaff.active ? 'Deactivate Access' : 'Reactivate Access'}
              </button>

              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Staff Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInvite}
            className="bg-[#121624] border border-slate-700 rounded-none max-w-md w-full p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Invite Dealership Staff</h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marc Santos"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="staff@apexmotors.ph"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  placeholder="+63 917 000 0000"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Assigned Role</label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as UserRole)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-none p-2 text-white"
                >
                  <option value="Sales Agent">Sales Agent</option>
                  <option value="Financing Officer">Financing Officer</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Manager">General Manager</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 rounded-none bg-slate-800 text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white font-bold cursor-pointer shadow-sm shadow-red-950/40"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Action Menu Portal */}
      {mounted && dropdownMenu && createPortal(
        <div
          className="staff-portal-dropdown fixed z-9999 w-60 bg-[#121624] border border-slate-700 shadow-2xl py-1 text-xs divide-y divide-slate-800 animate-in fade-in zoom-in-95 duration-100"
          style={{
            top: `${dropdownMenu.top}px`,
            right: `${dropdownMenu.right}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-3 py-2 bg-slate-900/90 flex items-center justify-between">
            <span className="font-bold text-white truncate max-w-[130px]">
              {dropdownMenu.member.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {dropdownMenu.member.role}
            </span>
          </div>

          {/* Primary Action Items */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setSelectedStaff(dropdownMenu.member);
                setDropdownMenu(null);
              }}
              className="w-full text-left px-3 py-2 flex items-center gap-2 text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <Shield className="w-4 h-4 text-slate-400" />
              <div>
                <span className="font-semibold block leading-tight">View Profile & Permissions</span>
                <span className="text-[10px] text-slate-500">RBAC policy & details</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleStatus(dropdownMenu.member.id);
                setDropdownMenu(null);
              }}
              className={`w-full text-left px-3 py-2 flex items-center gap-2 transition cursor-pointer ${
                dropdownMenu.member.active
                  ? 'text-red-400 hover:bg-slate-800'
                  : 'text-emerald-400 hover:bg-slate-800'
              }`}
            >
              {dropdownMenu.member.active ? (
                <UserX className="w-4 h-4" />
              ) : (
                <UserCheck className="w-4 h-4" />
              )}
              <div>
                <span className="font-semibold block leading-tight">
                  {dropdownMenu.member.active ? 'Deactivate Access' : 'Reactivate Access'}
                </span>
                <span className="text-[10px] text-slate-500">
                  {dropdownMenu.member.active ? 'Revoke system login' : 'Restore active privileges'}
                </span>
              </div>
            </button>
          </div>

          {/* Direct Contact */}
          <div className="py-1">
            <a
              href={`tel:${dropdownMenu.member.phone}`}
              onClick={() => setDropdownMenu(null)}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {dropdownMenu.member.phone}</span>
            </a>

            <a
              href={`mailto:${dropdownMenu.member.email}`}
              onClick={() => setDropdownMenu(null)}
              className="w-full text-left px-3 py-1.5 flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-sky-400 transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </a>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
