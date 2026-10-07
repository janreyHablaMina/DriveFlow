'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Car,
  FileSpreadsheet,
  Receipt,
  Calendar,
  UserPlus,
  Shield,
  LogOut,
  Settings,
  X,
  FileCheck,
} from 'lucide-react';
import { UserRole, AdminTab } from '../types';

interface TopNavProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  setMobileOpen: (open: boolean) => void;
  onQuickAction: (action: string) => void;
  onGlobalSearch: (query: string) => void;
  searchQuery: string;
  notifications: {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'alert' | 'success' | 'info';
    targetTab: AdminTab;
    read: boolean;
  }[];
  onNotificationClick: (notifId: string, targetTab: AdminTab) => void;
  onMarkAllNotificationsRead: () => void;
  activeTabTitle: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentRole,
  setCurrentRole,
  setMobileOpen,
  onQuickAction,
  onGlobalSearch,
  searchQuery,
  notifications,
  onNotificationClick,
  onMarkAllNotificationsRead,
  activeTabTitle,
}) => {
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const quickActionRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (quickActionRef.current && !quickActionRef.current.contains(e.target as Node)) {
        setQuickActionOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleOptions: UserRole[] = [
    'Owner',
    'Administrator',
    'Financing Officer',
    'Sales Agent',
    'Accountant',
    'Manager',
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0e111a]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-7 flex items-center justify-between gap-4">
      
      {/* Left: Mobile hamburger & Global Search Input pinned to left edge */}
      <div className="flex items-center gap-3 flex-1 max-w-md sm:max-w-lg">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-none text-slate-400 hover:text-white hover:bg-slate-800/70 shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onGlobalSearch(e.target.value)}
            placeholder="Search fleet, VIN, customer, or loan app #..."
            className="w-full bg-[#121624] border border-slate-800 focus:border-red-500 rounded-none pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden transition"
          />
          {searchQuery && (
            <button
              onClick={() => onGlobalSearch('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Quick Actions, Notifications, Role Profile */}
      <div className="flex items-center gap-3 shrink-0">
        
        {/* Quick Action Dropdown */}
        <div className="relative" ref={quickActionRef}>
          <button
            onClick={() => setQuickActionOpen(!quickActionOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold shadow-sm shadow-red-950/40 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Action</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
          </button>

          {quickActionOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#121624] border border-slate-700 rounded-none shadow-2xl py-2 z-50">
              <div className="px-3 py-1 border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Instant Operations
              </div>
              <button
                onClick={() => {
                  onQuickAction('add-vehicle');
                  setQuickActionOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
              >
                <Car className="w-4 h-4 text-red-500" />
                <span>Add Vehicle to Fleet</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction('new-application');
                  setQuickActionOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>New Financing Application</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction('record-payment');
                  setQuickActionOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
              >
                <Receipt className="w-4 h-4 text-amber-400" />
                <span>Record Client Payment</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction('book-appointment');
                  setQuickActionOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Schedule Test Drive</span>
              </button>
              <button
                onClick={() => {
                  onQuickAction('add-lead');
                  setQuickActionOpen(false);
                }}
                className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5 text-slate-200 hover:bg-slate-800/80 transition cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-sky-400" />
                <span>Add Customer Lead</span>
              </button>
            </div>
          )}
        </div>

        {/* Notifications Center */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-none bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-none bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center border-2 border-[#0e111a]">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#121624] border border-slate-700 rounded-none shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                  <span className="text-[10px] font-mono text-slate-400">{unreadCount} unread alerts</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllNotificationsRead}
                    className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 custom-scrollbar">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onNotificationClick(n.id, n.targetTab);
                      setNotificationsOpen(false);
                    }}
                    className={`p-3 text-xs hover:bg-slate-800/60 transition cursor-pointer flex gap-3 ${
                      !n.read ? 'bg-red-950/20' : ''
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.type === 'alert' ? (
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                      ) : n.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{n.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-none bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer"
          >
            <div className="w-7 h-7 rounded-none bg-red-600/20 text-red-400 border border-red-500/30 font-black text-xs flex items-center justify-center">
              JM
            </div>
            <div className="text-left hidden lg:block">
              <span className="block text-xs font-semibold text-white leading-tight">
                Janrey Mina
              </span>
              <span className="block text-[10px] font-mono text-red-500">
                {currentRole}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#121624] border border-slate-700 rounded-none shadow-2xl py-2 z-50">
              <div className="px-4 py-2.5 border-b border-slate-800">
                <div className="font-bold text-xs text-white">Janrey Mina</div>
                <div className="text-[11px] text-slate-400">janrey@apexmotors.ph</div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Apex Motors Philippines (BGC HQ)
                </div>
              </div>

              {/* Role Switcher (Simulates RBAC testing) */}
              <div className="px-3 py-2 border-b border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Switch Active Role (RBAC)
                </span>
                <div className="grid grid-cols-2 gap-1">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setCurrentRole(role);
                        setProfileDropdownOpen(false);
                      }}
                      className={`text-left px-2 py-1 rounded-none text-[11px] font-medium transition cursor-pointer ${
                        currentRole === role
                          ? 'bg-[#e10600] text-white font-bold shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-1">
                <button
                  onClick={() => {
                    onQuickAction('go-settings');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-none flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Dealership Settings
                </button>
                <button
                  onClick={() => {
                    onQuickAction('sign-out');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-none flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

