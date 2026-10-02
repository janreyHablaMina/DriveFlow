'use client';

import { Building2, CheckCircle2, Clock, Percent, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function BankFinancing() {
  const [selectedBank, setSelectedBank] = useState('BDO Unibank');

  const bankPartners = [
    { name: 'BDO Unibank', rate: '3.1% p.a.', terms: 'Up to 60 Months', feature: 'Lowest Downpayment Option' },
    { name: 'BPI Auto Loan', rate: '2.9% p.a.', terms: 'Up to 60 Months', feature: 'Express 1-Day Approval' },
    { name: 'Metrobank', rate: '3.2% p.a.', terms: 'Up to 48 Months', feature: 'Special Luxury Vehicle Desk' },
    { name: 'Security Bank', rate: '3.0% p.a.', terms: 'Up to 60 Months', feature: 'Minimal Document Requirements' },
    { name: 'RCBC Auto Loans', rate: '3.3% p.a.', terms: 'Up to 48 Months', feature: 'Corporate & Executive Lease' },
  ];

  const handlePreApproval = () => {
    alert(`[Financing Pre-Approval Selected]\nBank Partner: ${selectedBank}\n\nA dedicated DriveFlow loan officer will contact you with customized interest rate computations and requirements.`);
  };

  return (
    <section id="section-calculator" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-[#0e0e14]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-red-500 uppercase tracking-widest">// AUTO LOAN SOLUTIONS</span>
          <h2 className="text-3xl sm:text-4xl font-black italic uppercase mt-1">Bank Partners & Financing Benefits</h2>
          <p className="font-body text-xs sm:text-sm text-slate-400 mt-3">
            We partner with the Philippines&apos; premier commercial banking institutions to deliver bespoke automotive credit lines, flexible repayment tenures, and expedited approvals.
          </p>
        </div>

        {/* 4 Core Financing Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm uppercase text-white mb-1">15-Min Fast Check</h4>
            <p className="font-body text-xs text-slate-400">Quick eligibility pre-screening with basic identification before credit endorsement.</p>
          </div>

          <div className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Percent className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm uppercase text-white mb-1">From 20% Down</h4>
            <p className="font-body text-xs text-slate-400">Low capital outlay packages available with structured amortizations up to 5 years.</p>
          </div>

          <div className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm uppercase text-white mb-1">Zero Hidden Fees</h4>
            <p className="font-body text-xs text-slate-400">All chattel mortgage, registration, and comprehensive insurance bundled transparently.</p>
          </div>

          <div className="p-5 bg-black/60 border border-white/10 hover:border-red-600 transition">
            <div className="w-10 h-10 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-black text-sm uppercase text-white mb-1">Hassle-Free Filing</h4>
            <p className="font-body text-xs text-slate-400">Our in-house finance desk prepares and coordinates all bank documentation for you.</p>
          </div>
        </div>

        {/* Bank Partner Selection & Fast Pre-Approval Card */}
        <div className="p-6 sm:p-8 bg-black/80 border-2 border-red-600/50 rounded grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Accredited Banking Desks</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white mb-4">
              Select Your Preferred Lending Partner
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bankPartners.map((bank) => (
                <div
                  key={bank.name}
                  onClick={() => setSelectedBank(bank.name)}
                  className={`p-3.5 border cursor-pointer transition ${
                    selectedBank === bank.name 
                      ? 'border-red-600 bg-red-600/10' 
                      : 'border-white/10 bg-[#14141c] hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-sm text-white flex items-center gap-1.5">
                      {selectedBank === bank.name && <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />}
                      {bank.name}
                    </span>
                    <span className="text-[11px] font-mono text-red-500 font-bold">{bank.rate}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{bank.terms}</span>
                    <span className="text-slate-300">{bank.feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-[#161622] border-l-4 border-red-600 text-center flex flex-col justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">PRE-APPROVAL DESK</span>
            <h4 className="text-lg font-black text-white uppercase mb-2">Selected: {selectedBank}</h4>
            <p className="font-body text-xs text-slate-400 mb-6">
              Connect with our dedicated automotive finance manager to lock in special dealer incentive rates.
            </p>
            <button 
              onClick={handlePreApproval}
              className="w-full bg-racing-red hover:bg-red-500 py-3 text-xs font-black uppercase text-white skew-12 transition glow-red-sm"
            >
              <span className="unskew-12 flex items-center justify-center gap-2">
                Apply With {selectedBank} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
