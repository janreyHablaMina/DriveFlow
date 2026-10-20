'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  AdminTab,
  UserRole,
  AdminVehicle,
  Customer,
  FinancingApplication,
  FinancingStatus,
  DealershipDocument,
  SaleRecord,
  PaymentTransaction,
  Appointment,
  Lead,
  StaffMember,
  AuditLogItem,
  DealershipSettings,
} from './types';
import {
  INITIAL_VEHICLES,
  INITIAL_CUSTOMERS,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_SALES,
  INITIAL_APPOINTMENTS,
  INITIAL_LEADS,
  INITIAL_STAFF,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS,
} from './mockData';

// Layout Components
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';

// Tab Views
import { OverviewTab } from './components/tabs/OverviewTab';
import { InventoryTab } from './components/tabs/InventoryTab';
import { CustomersTab } from './components/tabs/CustomersTab';
import { FinancingTab } from './components/tabs/FinancingTab';
import { DocumentsTab } from './components/tabs/DocumentsTab';
import { SalesTab } from './components/tabs/SalesTab';
import { AppointmentsTab } from './components/tabs/AppointmentsTab';
import { LeadsTab } from './components/tabs/LeadsTab';
import { StaffTab } from './components/tabs/StaffTab';
import { ReportsTab } from './components/tabs/ReportsTab';
import { WebsiteTab } from './components/tabs/WebsiteTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { CheckCircle2, ChevronRight, Home } from 'lucide-react';

export default function DealershipAdminDashboard() {
  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('Owner');
  const [globalSearch, setGlobalSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Central Mock Data States
  const [vehicles, setVehicles] = useState<AdminVehicle[]>(INITIAL_VEHICLES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [applications, setApplications] = useState<FinancingApplication[]>(INITIAL_APPLICATIONS);
  const [documents, setDocuments] = useState<DealershipDocument[]>(INITIAL_DOCUMENTS);
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [settings, setSettings] = useState<DealershipSettings>(INITIAL_SETTINGS);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Overdue Installment Alert',
      description: 'Engr. Mateo De Leon is 12 days past due on Toyota Hilux amortization.',
      time: '15m ago',
      type: 'alert' as const,
      targetTab: 'sales' as AdminTab,
      read: false,
    },
    {
      id: 'notif-2',
      title: 'New Loan Application',
      description: 'Engr. Paolo Montemayor submitted EastWest Bank loan for Montero Sport.',
      time: '1h ago',
      type: 'info' as const,
      targetTab: 'financing' as AdminTab,
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Chattel Mortgage Verified',
      description: 'Dr. Camille Alcantara-Sy BMW M3 chattel paperwork cleared by notary.',
      time: '3h ago',
      type: 'success' as const,
      targetTab: 'documents' as AdminTab,
      read: false,
    },
    {
      id: 'notif-4',
      title: 'Appointment Scheduled Tomorrow',
      description: 'Arch. Lorenzo Villavicencio unit handover at BGC Showroom.',
      time: '5h ago',
      type: 'info' as const,
      targetTab: 'appointments' as AdminTab,
      read: false,
    },
  ]);

  // Badge Counts for Sidebar
  const badgeCounts = useMemo(() => {
    return {
      applications: applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review' || a.status === 'Assessment').length,
      documents: documents.filter((d) => d.status === 'Pending Review').length,
      overduePayments: sales.filter((s) => s.status === 'Overdue').length,
      appointments: appointments.filter((a) => a.status === 'Pending').length,
      leads: leads.filter((l) => l.stage === 'New Lead').length,
    };
  }, [applications, documents, sales, appointments, leads]);

  // Audit Logger Helper
  const logAction = (action: string, target: string) => {
    const newLog: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Janrey Mina',
      role: currentRole,
      action,
      target,
      ipAddress: '120.29.74.19 (Makati City)',
      branchName: 'Main Dealership',
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // Handlers for Inventory
  const handleAddVehicle = (vehicleData: Omit<AdminVehicle, 'id' | 'addedDate'>) => {
    const newVehicle: AdminVehicle = {
      ...vehicleData,
      id: `v-${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0],
    };
    setVehicles([newVehicle, ...vehicles]);
    logAction('Added Vehicle to Fleet', `${newVehicle.name} (${newVehicle.stockNumber})`);
    showToast(`Vehicle ${newVehicle.name} added to inventory.`);
  };

  const handleUpdateVehicle = (updated: AdminVehicle) => {
    setVehicles(vehicles.map((v) => (v.id === updated.id ? updated : v)));
    logAction('Updated Vehicle Listing', `${updated.name}`);
    showToast(`Vehicle ${updated.name} updated.`);
  };

  const handleDeleteVehicle = (id: string) => {
    const target = vehicles.find((v) => v.id === id);
    setVehicles(vehicles.filter((v) => v.id !== id));
    logAction('Archived / Removed Vehicle', `${target?.name || id}`);
    showToast(`Vehicle removed from inventory.`);
  };

  // Handlers for Customers
  const handleAddCustomer = (custData: Omit<Customer, 'id' | 'createdDate' | 'notes'>) => {
    const newCustomer: Customer = {
      ...custData,
      id: `cust-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      notes: [],
    };
    setCustomers([newCustomer, ...customers]);
    logAction('Created Customer Record', `${newCustomer.name}`);
    showToast(`Customer profile created for ${newCustomer.name}.`);
  };

  const handleAddCustomerNote = (customerId: string, noteText: string) => {
    const note = {
      id: `note-${Date.now()}`,
      author: 'Janrey Mina',
      role: currentRole,
      date: new Date().toLocaleString(),
      content: noteText,
    };
    setCustomers(
      customers.map((c) => (c.id === customerId ? { ...c, notes: [note, ...c.notes] } : c))
    );
    logAction('Added Customer Note', `Customer ID: ${customerId}`);
    showToast('Customer CRM note logged.');
  };

  // Handlers for Financing
  const handleApproveApplication = (id: string, notes: string) => {
    setApplications(
      applications.map((app) => {
        if (app.id === id) {
          const updatedAudit = [
            ...app.auditTrail,
            {
              id: `aud-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              actor: `Janrey Mina (${currentRole})`,
              action: `Approved with notes: ${notes}`,
            },
          ];
          return {
            ...app,
            status: 'Approved',
            decisionDate: new Date().toISOString().split('T')[0],
            auditTrail: updatedAudit,
          };
        }
        return app;
      })
    );
    const app = applications.find((a) => a.id === id);
    logAction('Approved Financing Application', `${app?.appNumber} - ${app?.applicantName}`);
    showToast(`Application ${app?.appNumber} Approved! Ready for vehicle release.`);
  };

  const handleRejectApplication = (id: string, reason: string) => {
    setApplications(
      applications.map((app) => {
        if (app.id === id) {
          const updatedAudit = [
            ...app.auditTrail,
            {
              id: `aud-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              actor: `Janrey Mina (${currentRole})`,
              action: `Rejected: ${reason}`,
            },
          ];
          return {
            ...app,
            status: 'Rejected',
            decisionDate: new Date().toISOString().split('T')[0],
            decisionReason: reason,
            auditTrail: updatedAudit,
          };
        }
        return app;
      })
    );
    const app = applications.find((a) => a.id === id);
    logAction('Declined Financing Application', `${app?.appNumber} - Reason: ${reason}`);
    showToast(`Application ${app?.appNumber} rejected.`);
  };

  const handleRequestDocs = (id: string, docName: string) => {
    setApplications(
      applications.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            status: 'Documents Required',
            auditTrail: [
              ...app.auditTrail,
              {
                id: `aud-${Date.now()}`,
                timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
                actor: `Janrey Mina (${currentRole})`,
                action: `Requested document: ${docName}`,
              },
            ],
          };
        }
        return app;
      })
    );
    showToast(`Requested "${docName}" from applicant.`);
  };

  const handleUpdateApplicationStatus = (id: string, status: FinancingStatus) => {
    setApplications(
      applications.map((app) => {
        if (app.id === id) {
          const updatedAudit = [
            ...app.auditTrail,
            {
              id: `aud-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              actor: `Janrey Mina (${currentRole})`,
              action: `Status changed to: ${status}`,
            },
          ];
          return {
            ...app,
            status,
            auditTrail: updatedAudit,
          };
        }
        return app;
      })
    );
    const app = applications.find((a) => a.id === id);
    logAction('Updated Financing Status', `${app?.appNumber} - Status: ${status}`);
    showToast(`Application ${app?.appNumber} status updated to ${status}.`);
  };

  const handleUpdateApplication = (updatedApp: FinancingApplication) => {
    setApplications(applications.map((a) => (a.id === updatedApp.id ? updatedApp : a)));
    logAction('Updated Financing Application', `${updatedApp.appNumber} - ${updatedApp.applicantName}`);
    showToast(`Application ${updatedApp.appNumber} updated successfully.`);
  };

  const handleNewApplication = (appData: Omit<FinancingApplication, 'id' | 'auditTrail' | 'submittedDate'>) => {
    const newApp: FinancingApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      submittedDate: new Date().toISOString().split('T')[0],
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
          actor: 'Janrey Mina',
          action: 'Application registered manually via Dealership Admin',
        },
      ],
    };
    setApplications([newApp, ...applications]);
    logAction('Submitted New Loan Application', `${newApp.appNumber} (${newApp.applicantName})`);
    showToast(`Loan application ${newApp.appNumber} submitted.`);
  };

  // Handlers for Documents
  const handleVerifyDocument = (id: string) => {
    setDocuments(
      documents.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'Verified',
              reviewer: 'Janrey Mina',
              reviewDate: new Date().toISOString().split('T')[0],
            }
          : d
      )
    );
    const doc = documents.find((d) => d.id === id);
    logAction('Verified Regulatory Document', `${doc?.fileName}`);
    showToast(`Document ${doc?.fileName} verified.`);
  };

  const handleRejectDocument = (id: string, reason: string) => {
    setDocuments(
      documents.map((d) =>
        d.id === id
          ? {
              ...d,
              status: 'Rejected',
              reviewer: 'Janrey Mina',
              reviewDate: new Date().toISOString().split('T')[0],
              rejectionReason: reason,
            }
          : d
      )
    );
    const doc = documents.find((d) => d.id === id);
    logAction('Rejected Document Deficiencies', `${doc?.fileName}`);
    showToast(`Document rejected. Replacement requested.`);
  };

  // Handlers for Sales & Payments
  const handleRecordPayment = (paymentData: Omit<PaymentTransaction, 'id'>, saleId: string) => {
    const newTx: PaymentTransaction = {
      ...paymentData,
      id: `tx-${Date.now()}`,
    };

    setSales(
      sales.map((sale) => {
        if (sale.id === saleId) {
          const updatedBalance = Math.max(0, sale.remainingBalance - newTx.amount);
          return {
            ...sale,
            remainingBalance: updatedBalance,
            paymentHistory: [newTx, ...sale.paymentHistory],
            status: updatedBalance === 0 ? 'Fully Paid' : 'Active / Current',
          };
        }
        return sale;
      })
    );

    logAction('Recorded Payment & Issued OR', `${newTx.orNumber} - ₱${newTx.amount.toLocaleString()}`);
    showToast(`Official Receipt ${newTx.orNumber} issued for ₱${newTx.amount.toLocaleString()}`);
  };

  // Handlers for Appointments
  const handleAddAppointment = (aptData: Omit<Appointment, 'id' | 'createdDate'>) => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
    };
    setAppointments([newApt, ...appointments]);
    logAction('Scheduled Appointment', `${newApt.customerName} - ${newApt.appointmentType}`);
    showToast(`Scheduled ${newApt.appointmentType} for ${newApt.customerName}.`);
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status } : a))
    );
    logAction('Updated Appointment Status', `ID: ${id} to ${status}`);
    showToast(`Appointment status updated to ${status}.`);
  };

  // Handlers for Leads
  const handleAddLead = (leadData: Omit<Lead, 'id' | 'createdDate' | 'lastActivity'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
    };
    setLeads([newLead, ...leads]);
    logAction('Created Inquiring Lead', `${newLead.name} (${newLead.interestedVehicle})`);
    showToast(`Lead ${newLead.name} added to pipeline.`);
  };

  const handleUpdateLeadStage = (id: string, stage: Lead['stage']) => {
    setLeads(
      leads.map((l) => (l.id === id ? { ...l, stage, lastActivity: 'Stage Advanced' } : l))
    );
    logAction('Advanced Lead Stage', `Lead ID: ${id} -> ${stage}`);
    showToast(`Lead advanced to "${stage}".`);
  };

  // Handlers for Staff
  const handleInviteStaff = (memberData: Omit<StaffMember, 'id' | 'joinDate' | 'lastLogin' | 'avatar'>) => {
    const newStaff: StaffMember = {
      ...memberData,
      id: `staff-${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Pending Invitation Accept',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };
    setStaff([...staff, newStaff]);
    logAction('Invited Staff Member', `${newStaff.name} (${newStaff.role})`);
    showToast(`Invitation sent to ${newStaff.email}.`);
  };

  const handleToggleStaffStatus = (id: string) => {
    setStaff(
      staff.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
    showToast(`Staff access status modified.`);
  };

  // Quick Action Handler from TopNav
  const handleQuickAction = (actionKey: string) => {
    switch (actionKey) {
      case 'add-vehicle':
        setActiveTab('inventory');
        showToast('Switched to Vehicle Inventory. Click "+ Add Vehicle" to register new unit.');
        break;
      case 'new-application':
        setActiveTab('financing');
        showToast('Switched to Financing. Click "+ New Loan Application" to submit underwriter package.');
        break;
      case 'record-payment':
        setActiveTab('sales');
        showToast('Switched to Sales. Click "+ Record Client Payment" to generate OR.');
        break;
      case 'book-appointment':
        setActiveTab('appointments');
        showToast('Switched to Appointments. Click "+ Book Appointment" to schedule visit.');
        break;
      case 'add-lead':
        setActiveTab('leads');
        showToast('Switched to Leads Pipeline. Click "+ Create New Lead" to log inquiry.');
        break;
      case 'go-settings':
        setActiveTab('settings');
        break;
      case 'sign-out':
        showToast('Demo Mode: Session signed out successfully.');
        break;
    }
  };

  const activeTabLabels: Record<AdminTab, string> = {
    overview: 'Executive Overview',
    inventory: 'Vehicle Inventory',
    customers: 'Customers / CRM',
    financing: 'Financing Applications',
    documents: 'Document Vault',
    sales: 'Sales & Payments',
    appointments: 'Appointments',
    leads: 'Leads & Inquiries',
    staff: 'Staff & Permissions',
    reports: 'Reports & Analytics',
    website: 'Website & CMS',
    settings: 'Dealership Settings',
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex font-sans selection:bg-[#e10600] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-70 bg-[#121624] border-l-4 border-l-[#e10600] border border-slate-700 text-white px-5 py-3.5 rounded-none shadow-2xl text-xs font-semibold flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reusable Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        badgeCounts={badgeCounts}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Reusable TopNav Bar */}
        <TopNav
          currentRole={currentRole}
          setCurrentRole={(r) => {
            setCurrentRole(r);
            showToast(`Switched active RBAC context to: ${r}`);
          }}
          setMobileOpen={setMobileSidebarOpen}
          onQuickAction={handleQuickAction}
          onGlobalSearch={setGlobalSearch}
          searchQuery={globalSearch}
          notifications={notifications}
          onNotificationClick={(notifId, targetTab) => {
            setNotifications(
              notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n))
            );
            setActiveTab(targetTab);
          }}
          onMarkAllNotificationsRead={() => {
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
            showToast('All notifications marked as read.');
          }}
          activeTabTitle={activeTabLabels[activeTab]}
        />

        {/* Breadcrumbs Bar */}
        <div className="px-6 py-2.5 bg-[#0b0e16] border-b border-slate-800/60 flex items-center gap-2 text-[11px] text-slate-400">
          <Link href="/admin" onClick={() => setActiveTab('overview')} className="hover:text-white flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Admin</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200 font-semibold">{activeTabLabels[activeTab]}</span>
        </div>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 lg:p-7 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              vehicles={vehicles}
              applications={applications}
              customers={customers}
              sales={sales}
              appointments={appointments}
              auditLogs={auditLogs}
              setActiveTab={setActiveTab}
              onOpenAppDetails={(app) => {
                setActiveTab('financing');
              }}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryTab
              vehicles={vehicles}
              onAddVehicle={handleAddVehicle}
              onUpdateVehicle={handleUpdateVehicle}
              onDeleteVehicle={handleDeleteVehicle}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersTab
              customers={customers}
              applications={applications}
              appointments={appointments}
              sales={sales}
              onAddCustomer={handleAddCustomer}
              onAddNote={handleAddCustomerNote}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'financing' && (
            <FinancingTab
              applications={applications}
              vehicles={vehicles}
              onApproveApplication={handleApproveApplication}
              onRejectApplication={handleRejectApplication}
              onRequestDocs={handleRequestDocs}
              onNewApplication={handleNewApplication}
              onUpdateStatus={handleUpdateApplicationStatus}
              onUpdateApplication={handleUpdateApplication}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'documents' && (
            <DocumentsTab
              documents={documents}
              onVerifyDocument={handleVerifyDocument}
              onRejectDocument={handleRejectDocument}
              onUploadDocument={(newDoc) => {
                setDocuments([
                  {
                    ...newDoc,
                    id: `doc-${Date.now()}`,
                    uploadedDate: new Date().toISOString().split('T')[0],
                  },
                  ...documents,
                ]);
                showToast('Uploaded document to vault.');
              }}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'sales' && (
            <SalesTab
              sales={sales}
              onRecordPayment={handleRecordPayment}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'appointments' && (
            <AppointmentsTab
              appointments={appointments}
              vehicles={vehicles}
              staff={staff}
              onAddAppointment={handleAddAppointment}
              onUpdateStatus={handleUpdateAppointmentStatus}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsTab
              leads={leads}
              staff={staff}
              onAddLead={handleAddLead}
              onUpdateLeadStage={handleUpdateLeadStage}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'staff' && (
            <StaffTab
              staff={staff}
              onInviteStaff={handleInviteStaff}
              onToggleStatus={handleToggleStaffStatus}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTab
              vehicles={vehicles}
              applications={applications}
              sales={sales}
              leads={leads}
              staff={staff}
              currencySymbol={settings.currencySymbol}
            />
          )}

          {activeTab === 'website' && (
            <WebsiteTab
              activeThemeId={settings.activeThemeId}
              onApplyTheme={(themeId) => {
                setSettings({ ...settings, activeThemeId: themeId });
                logAction('Updated Public Website Theme', `Theme: ${themeId}`);
              }}
              vehicles={vehicles}
              onToggleVehiclePublic={(id) => {
                setVehicles(
                  vehicles.map((v) => (v.id === id ? { ...v, isPublicListing: !v.isPublicListing } : v))
                );
              }}
              onToggleVehicleFeatured={(id) => {
                setVehicles(
                  vehicles.map((v) => (v.id === id ? { ...v, isFeatured: !v.isFeatured } : v))
                );
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              auditLogs={auditLogs}
              onUpdateSettings={(newSettings) => {
                setSettings(newSettings);
                logAction('Modified Dealership Settings', 'Financing Assumptions Updated');
              }}
              currencySymbol={settings.currencySymbol}
            />
          )}
        </main>
      </div>
    </div>
  );
}
