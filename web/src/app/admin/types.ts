export type AdminTab =
  | 'overview'
  | 'inventory'
  | 'customers'
  | 'financing'
  | 'documents'
  | 'sales'
  | 'appointments'
  | 'leads'
  | 'staff'
  | 'reports'
  | 'website'
  | 'settings';

export type UserRole =
  | 'Owner'
  | 'Administrator'
  | 'Sales Agent'
  | 'Financing Officer'
  | 'Accountant'
  | 'Manager';

export interface DealershipBranch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  isHeadquarters: boolean;
  activeInventoryCount: number;
}

export type VehicleStatus =
  | 'Available'
  | 'Reserved'
  | 'Financing Pending'
  | 'Sold'
  | 'Archived'
  | 'Draft';

export interface AdminVehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  category: 'suv' | 'sedan' | 'truck' | 'premium';
  categoryLabel: string;
  priceNumeric: number;
  monthlyEstimate: number;
  minDownPaymentPct: number;
  mileage: string;
  transmission: string;
  fuel: string;
  color: string;
  plateEnding: string;
  vin: string;
  stockNumber: string;
  branchId: string;
  status: VehicleStatus;
  isFeatured: boolean;
  isPublicListing: boolean;
  images: string[];
  features: string[];
  inspectionScore: number;
  addedDate: string;
}

export interface CustomerNote {
  id: string;
  author: string;
  role: string;
  date: string;
  content: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tin: string;
  address: string;
  city: string;
  employer: string;
  monthlyIncome: number;
  creditTier: 'Tier 1 - Excellent (750+)' | 'Tier 2 - Good (680-749)' | 'Tier 3 - Fair (600-679)' | 'Under Review';
  assignedAgent: string;
  branchId: string;
  interestedVehicleId?: string;
  interestedVehicleName?: string;
  tags: string[];
  totalPurchases: number;
  notes: CustomerNote[];
  createdDate: string;
  lastContactDate: string;
}

export type FinancingStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Documents Required'
  | 'Assessment'
  | 'Approved'
  | 'Rejected'
  | 'Cancelled'
  | 'Completed';

export interface FinancingAuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  note?: string;
}

export interface FinancingApplication {
  id: string;
  appNumber: string;
  customerId: string;
  applicantName: string;
  phone: string;
  email: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  termMonths: number;
  interestRatePa: number;
  monthlyAmortization: number;
  financingChannel:
    | 'BDO Unibank Auto Loan'
    | 'BPI Auto Loan'
    | 'Security Bank'
    | 'EastWest Bank'
    | 'DriveFlow In-House Financing';
  employmentType: 'Corporate Executive' | 'Business Owner' | 'OFW / Remittance' | 'Medical / Legal Professional';
  monthlyIncome: number;
  creditScore: number;
  cmapStatus: 'Cleared' | 'Pending Verification' | 'With Record';
  assignedOfficer: string;
  branchId: string;
  status: FinancingStatus;
  submittedDate: string;
  decisionDate?: string;
  decisionReason?: string;
  docsSubmitted: {
    validIds: boolean;
    incomeProof: boolean;
    bankStatements: boolean;
    proofOfBilling: boolean;
  };
  auditTrail: FinancingAuditRecord[];
}

export type DocumentType =
  | 'Government ID / Passport'
  | 'Proof of Income / ITR'
  | 'Bank Statements (6 Mo)'
  | 'Proof of Billing'
  | 'Certificate of Employment'
  | 'Chattel Mortgage Deed'
  | 'Vehicle LTO OR/CR';

export type DocumentStatus = 'Verified' | 'Pending Review' | 'Rejected' | 'Missing';

export interface DealershipDocument {
  id: string;
  customerId: string;
  customerName: string;
  applicationId?: string;
  docType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadedDate: string;
  status: DocumentStatus;
  reviewer?: string;
  reviewDate?: string;
  rejectionReason?: string;
  previewUrl: string;
}

export interface PaymentTransaction {
  id: string;
  orNumber: string;
  date: string;
  time: string;
  customerName: string;
  accountNumber: string;
  vehicleName: string;
  amount: number;
  method:
    | 'PDC Check Clearing (BPI)'
    | 'Bank Wire (BDO)'
    | 'InstaPay / PESONet'
    | 'Showroom Cashier'
    | 'Auto-Debit Arrangement';
  type:
    | 'Monthly Amortization'
    | 'Down Payment Equity'
    | 'Chattel & Insurance Fee'
    | 'Late Penalty Settlement'
    | 'Full Principal Payoff';
  refNumber: string;
  receivedBy: string;
  installmentNumber?: string;
  isVerifiedGateway: boolean;
  branchId: string;
}

export interface AmortizationRow {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  principal: number;
  interest: number;
  status: 'Paid' | 'Upcoming' | 'Overdue';
  paidDate?: string;
  orNumber?: string;
}

export interface SaleRecord {
  id: string;
  saleNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleId: string;
  vehicleName: string;
  vin: string;
  plate: string;
  saleDate: string;
  salePrice: number;
  downPaymentPaid: number;
  principalFinanced: number;
  remainingBalance: number;
  financingType: 'In-House Financing' | 'Bank Partner Financed' | 'Full Cash Sale';
  financingBank?: string;
  termMonths: number;
  monthlyAmortization: number;
  nextDueDate: string;
  salesRep: string;
  branchId: string;
  status: 'Active / Current' | 'Payment Due Soon' | 'Overdue' | 'Fully Paid';
  amortizationSchedule: AmortizationRow[];
  paymentHistory: PaymentTransaction[];
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
export type AppointmentType =
  | 'Showroom Visit & Consultation'
  | 'Vehicle Viewing & Inspection'
  | 'Financing Contract Signing'
  | 'Vehicle Unit Handover'
  | 'Appraisal & Trade-In'
  | 'Showroom Test Drive'
  | 'VIP Home Test Drive';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleName: string;
  appointmentType: AppointmentType;
  date: string;
  timeSlot: string;
  assignedStaff: string;
  branchId: string;
  status: AppointmentStatus;
  notes: string;
  createdDate: string;
}

export type LeadStage = 'New Lead' | 'Contacted' | 'Interested' | 'Negotiation' | 'Converted' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  interestedVehicle: string;
  budget: number;
  source: 'Website Calculator' | 'Facebook Ads' | 'Walk-In Showroom' | 'Referral' | 'Google Search';
  assignedRep: string;
  stage: LeadStage;
  branchId: string;
  createdDate: string;
  lastActivity: string;
  notes: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  branchId: string;
  branchName: string;
  avatar: string;
  active: boolean;
  joinDate: string;
  lastLogin: string;
  permissions: {
    canApproveFinancing: boolean;
    canIssueReceipts: boolean;
    canEditPricing: boolean;
    canManageWebsite: boolean;
    canViewSensitiveDocs: boolean;
    canExportReports: boolean;
  };
}

export interface DealershipTheme {
  id: string;
  name: string;
  tagline: string;
  styleDescription: string;
  primaryColor: string;
  accentColor: string;
  badgeText: string;
  previewImage: string;
  targetAudience: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ipAddress: string;
  branchName: string;
}

export interface DealershipSettings {
  dealershipName: string;
  tagline: string;
  taxIdentificationNumber: string;
  secRegistration: string;
  currency: string;
  currencySymbol: string;
  timezone: string;
  defaultBaseInterestPa: number;
  minimumDownPaymentPercent: number;
  maxLoanTermMonths: number;
  chattelMortgageRate: number;
  enableSmsNotifications: boolean;
  enableEmailAlerts: boolean;
  partnerBanks: { name: string; enabled: boolean; code: string }[];
  activeThemeId: string;
}

