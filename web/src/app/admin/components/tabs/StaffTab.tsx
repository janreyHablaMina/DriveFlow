'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  Check,
  X,
  Lock,
  UserCheck,
  Shield,
  Key,
} from 'lucide-react';
import { StaffMember, UserRole, DealershipBranch } from '../../types';

interface StaffTabProps {
  staff: StaffMember[];
  branches: DealershipBranch[];
  onInviteStaff: (member: Omit<StaffMember, 'id' | 'joinDate' | 'lastLogin' | 'avatar'>) => void;
  onToggleStatus: (id: string) => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({
  staff,
  branches,
  onInviteStaff,
  onToggleStatus,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Invite Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('Sales Agent');
  const [formBranchId, setFormBranchId] = useState(branches[0]?.id || 'bgc');

  const filteredStaff = useMemo(() => {
    return staff.filter((member) => {
      const matchSearch =
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || member.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [staff, search, roleFilter]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const branch = branches.find((b) => b.id === formBranchId);
    onInviteStaff({
      name: formName,
      email: formEmail,
      phone: formPhone,
      role: formRole,
      branchId: formBranchId,
      branchName: branch?.name || 'BGC Showroom',
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
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">Owner / Super</span>;
      case 'Administrator':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">Administrator</span>;
      case 'Financing Officer':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Financing Officer</span>;
      case 'Accountant':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Accountant</span>;
      case 'Manager':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">General Manager</span>;
      case 'Sales Agent':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-slate-700 text-slate-300">Sales Agent</span>;
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
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Invite Staff Member
        </button>
      </div>

      {/* Permissions Matrix Overview */}
      <div className="p-4 rounded-xl bg-[#121624] border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            Active Role-Based Permissions Policy Matrix
          </h3>
          <span className="text-[10px] font-mono text-slate-400">Multi-Tenant Isolation Enforced</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900 text-[10px] text-slate-400 uppercase">
              <tr>
                <th className="py-2 px-3">Role Tier</th>
                <th className="py-2 px-3 text-center">Approve Loans</th>
                <th className="py-2 px-3 text-center">Issue Receipts</th>
                <th className="py-2 px-3 text-center">Edit Fleet Prices</th>
                <th className="py-2 px-3 text-center">Manage Website</th>
                <th className="py-2 px-3 text-center">View Client Docs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[11px] text-slate-300">
              <tr>
                <td className="py-2 px-3 font-bold text-purple-400">Owner</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-emerald-400">Financing Officer</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-amber-400">Accountant</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-emerald-400">✓ Full</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-bold text-slate-400">Sales Agent</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">—</td>
                <td className="py-2 px-3 text-center text-slate-600">— Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-3">Role & Permissions</th>
                <th className="py-3 px-3">Assigned Branch</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block">{member.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{member.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {getRoleBadge(member.role)}
                  </td>

                  <td className="py-3 px-3 text-slate-200 text-[11px]">
                    {member.branchName}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                    {member.phone}
                  </td>

                  <td className="py-3 px-3">
                    <button
                      onClick={() => onToggleStatus(member.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                        member.active
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {member.active ? 'Active' : 'Deactivated'}
                    </button>
                  </td>

                  <td className="py-3 px-3 text-[11px] font-mono text-slate-400">
                    {member.lastLogin}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onToggleStatus(member.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    >
                      {member.active ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Staff Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleInvite}
            className="bg-[#121624] border border-slate-700 rounded-xl max-w-md w-full p-6 space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Invite Dealership Staff</h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
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
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Assigned Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as UserRole)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  >
                    <option value="Sales Agent">Sales Agent</option>
                    <option value="Financing Officer">Financing Officer</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Manager">General Manager</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Branch</label>
                  <select
                    value={formBranchId}
                    onChange={(e) => setFormBranchId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

