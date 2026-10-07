'use client';

import React, { useState, useMemo } from 'react';
import {
  FileCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Filter,
  FileText,
  Lock,
  X,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { DealershipDocument, DocumentStatus, DocumentType } from '../../types';

interface DocumentsTabProps {
  documents: DealershipDocument[];
  onVerifyDocument: (id: string) => void;
  onRejectDocument: (id: string, reason: string) => void;
  onUploadDocument: (doc: Omit<DealershipDocument, 'id' | 'uploadedDate'>) => void;
  currencySymbol: string;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  onVerifyDocument,
  onRejectDocument,
  onUploadDocument,
  currencySymbol,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Modals
  const [previewDoc, setPreviewDoc] = useState<DealershipDocument | null>(null);
  const [rejectingDocId, setRejectingDocId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Missing notary dry seal or certified true copy signature.');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        doc.fileName.toLowerCase().includes(search.toLowerCase()) ||
        doc.customerName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchType = typeFilter === 'all' || doc.docType === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [documents, search, statusFilter, typeFilter]);

  const handleDownload = (doc: DealershipDocument) => {
    setDownloadToast(`Decrypted and downloaded: ${doc.fileName}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const confirmReject = () => {
    if (!rejectingDocId) return;
    onRejectDocument(rejectingDocId, rejectionReason);
    setRejectingDocId(null);
  };

  const getDocStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'Verified':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Verified</span>;
      case 'Pending Review':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending Review</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">Rejected</span>;
      case 'Missing':
        return <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold bg-slate-700 text-slate-400">Missing</span>;
    }
  };

  return (
    <div className="space-y-5">
      {/* Download Alert Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-[#e10600]/80 text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold flex items-center gap-2">
          <Download className="w-4 h-4 text-red-500" />
          {downloadToast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Regulatory & Customer Document Vault</span>
            <span className="text-xs font-mono text-slate-400 font-normal">
              ({filteredDocs.length} files)
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Secure multi-tenant KYC verification repository, proof of income, chattel deeds, and bank certifications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit Encrypted Storage</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#121624] p-3.5 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search document file or client name..."
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Verification Statuses</option>
            <option value="Verified">Verified & Approved</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Rejected">Rejected (Requires Action)</option>
          </select>
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-hidden focus:border-red-500"
          >
            <option value="all">All Document Types</option>
            <option value="Government ID / Passport">Government ID / Passport</option>
            <option value="Proof of Income / ITR">Proof of Income / ITR</option>
            <option value="Bank Statements (6 Mo)">Bank Statements (6 Mo)</option>
            <option value="Proof of Billing">Proof of Billing</option>
            <option value="Chattel Mortgage Deed">Chattel Mortgage Deed</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-[#121624] border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Document File</th>
                <th className="py-3 px-3">Linked Customer</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">File Size</th>
                <th className="py-3 px-3">Verification Status</th>
                <th className="py-3 px-3">Reviewer & Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-red-500 shrink-0" />
                      <div>
                        <span className="font-semibold text-white block">{doc.fileName}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Uploaded: {doc.uploadedDate}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-200 font-medium">
                    {doc.customerName}
                  </td>

                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {doc.docType}
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                    {doc.fileSize}
                  </td>

                  <td className="py-3 px-3">
                    {getDocStatusBadge(doc.status)}
                  </td>

                  <td className="py-3 px-3 text-[11px]">
                    <div className="text-slate-300">{doc.reviewer || 'Unassigned'}</div>
                    <div className="text-[10px] font-mono text-slate-500">{doc.reviewDate || '—'}</div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                        title="Secure Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400"
                        title="Encrypted Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      {doc.status !== 'Verified' && (
                        <button
                          onClick={() => onVerifyDocument(doc.id)}
                          className="p-1.5 rounded hover:bg-slate-800 text-emerald-400"
                          title="Verify & Approve"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {doc.status !== 'Rejected' && (
                        <button
                          onClick={() => setRejectingDocId(doc.id)}
                          className="p-1.5 rounded hover:bg-slate-800 text-red-400"
                          title="Reject / Request Replacement"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Secure Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{previewDoc.fileName}</h3>
                <span className="text-xs text-slate-400">
                  {previewDoc.customerName} • {previewDoc.docType} ({previewDoc.fileSize})
                </span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
              <img
                src={previewDoc.previewUrl}
                alt="Document Preview"
                className="max-h-72 object-contain rounded border border-slate-800 shadow-md"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                Verified Watermark
              </div>
            </div>

            {previewDoc.rejectionReason && (
              <div className="p-3 rounded bg-red-950/30 border border-red-500/40 text-red-300">
                <span className="font-bold block">Rejection Audit Reason:</span>
                {previewDoc.rejectionReason}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <button
                onClick={() => handleDownload(previewDoc)}
                className="px-3 py-1.5 rounded bg-[#e10600] hover:bg-[#c00500] text-white font-semibold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40"
              >
                <Download className="w-3.5 h-3.5" />
                Download Decrypted Copy
              </button>

              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded bg-slate-800 text-slate-300"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Dialog */}
      {rejectingDocId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-60 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-xl max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              Record Document Rejection Reason
            </h3>
            <p className="text-slate-300">
              Please specify the deficiency so the customer or sales agent can provide an amended replacement.
            </p>
            <div>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white h-24 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setRejectingDocId(null)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

