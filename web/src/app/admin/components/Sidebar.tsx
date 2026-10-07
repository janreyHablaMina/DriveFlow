'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Car,
  Users,
  FileSpreadsheet,
  FileCheck,
  Receipt,
  Calendar,
  Target,
  ShieldCheck,
  BarChart3,
  Globe,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { AdminTab } from '../types';

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  badgeCounts: {
    applications: number;
    documents: number;
    overduePayments: number;
    appointments: number;
    leads: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  badgeCounts,
}) => {
  const navItems: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
    group: 'Core Operations' | 'Finance & CRM' | 'Growth & Platform';
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      group: 'Core Operations',
    },
    {
      id: 'inventory',
      label: 'Vehicle Inventory',
      icon: Car,
      group: 'Core Operations',
    },
    {
      id: 'appointments',
      label: 'Appointments & Test Drives',
      icon: Calendar,
      badge: badgeCounts.appointments,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      group: 'Core Operations',
    },
    {
      id: 'customers',
      label: 'Customers / CRM',
      icon: Users,
      group: 'Finance & CRM',
    },
    {
      id: 'leads',
      label: 'Leads & Inquiries',
      icon: Target,
      badge: badgeCounts.leads,
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      group: 'Finance & CRM',
    },
    {
      id: 'financing',
      label: 'Financing Applications',
      icon: FileSpreadsheet,
      badge: badgeCounts.applications,
      badgeColor: 'bg-red-500/25 text-red-300 border-red-500/40',
      group: 'Finance & CRM',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileCheck,
      badge: badgeCounts.documents,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      group: 'Finance & CRM',
    },
    {
      id: 'sales',
      label: 'Sales & Payments',
      icon: Receipt,
      badge: badgeCounts.overduePayments > 0 ? badgeCounts.overduePayments : undefined,
      badgeColor: 'bg-red-600/30 text-red-300 border-red-500/50',
      group: 'Finance & CRM',
    },
    {
      id: 'staff',
      label: 'Staff & Permissions',
      icon: ShieldCheck,
      group: 'Growth & Platform',
    },
    {
      id: 'reports',
      label: 'Reports & Analytics',
      icon: BarChart3,
      group: 'Growth & Platform',
    },
    {
      id: 'website',
      label: 'Website & Promotions',
      icon: Globe,
      group: 'Growth & Platform',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      group: 'Growth & Platform',
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#0e111a] border-r border-slate-800/80 z-50 flex flex-col justify-between transition-all duration-200 ease-in-out shrink-0 ${
          collapsed ? 'w-20' : 'w-72'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center justify-between p-4 border-b border-slate-800/80 h-16 shrink-0">
            {!collapsed ? (
              <div className="flex items-center gap-2.5">
                <div className="bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-none tracking-wider uppercase shadow-md shadow-red-950/50 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-red-200" />
                  DRIVEFLOW
                </div>
              </div>
            ) : (
              <div className="mx-auto bg-red-600 text-white font-black text-xs p-1.5 rounded-none">
                DF
              </div>
            )}

            {/* Collapse toggle button on desktop */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="hidden lg:flex p-1.5 rounded-none text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links with Scroll */}
          <div className="p-2.5 overflow-y-auto flex-1 space-y-3.5 custom-scrollbar">
            {(['Core Operations', 'Finance & CRM', 'Growth & Platform'] as const).map((groupName) => {
              const items = navItems.filter((i) => i.group === groupName);
              return (
                <div key={groupName} className="space-y-0.5">
                  {!collapsed && (
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest px-3 block mb-1">
                      {groupName}
                    </span>
                  )}
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileOpen(false);
                        }}
                        title={collapsed ? item.label : undefined}
                        className={`w-full flex items-center ${
                          collapsed ? 'justify-center px-0 py-2' : 'justify-between px-3 py-2'
                        } rounded-none text-xs font-semibold tracking-wide transition-colors cursor-pointer group ${
                          isActive
                            ? 'bg-[#e10600] text-white shadow-[0_0_20px_rgba(225,6,0,0.35)]'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                            }`}
                          />
                          {!collapsed && <span className="truncate">{item.label}</span>}
                        </div>

                        {!collapsed && item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded-none font-bold border ${
                              item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}

                        {collapsed && item.badge !== undefined && item.badge > 0 && (
                          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-none bg-red-500 ring-2 ring-slate-900" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Area */}
        <div className="p-3 border-t border-slate-800/80 bg-[#0a0d14]/70">
          {!collapsed ? (
            <div className="space-y-2">
              <Link
                href="/"
                target="_blank"
                className="w-full flex items-center justify-between px-3 py-2 rounded-none text-xs text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/60 transition"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                  View Public Website
                </span>
                <span className="text-[10px] font-mono text-slate-500">Live</span>
              </Link>
              <div className="px-3 py-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Tenant DB Active
                </span>
                <span>PHP ₱</span>
              </div>
            </div>
          ) : (
            <Link
              href="/"
              target="_blank"
              title="View Public Website"
              className="flex justify-center p-2 rounded-none text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <ExternalLink className="w-4 h-4 text-red-500" />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

