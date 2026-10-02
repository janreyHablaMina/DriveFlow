'use client';

import { Download } from 'lucide-react';

export default function Header() {
  const downloadSelf = () => {
    // Dummy download function, in a real app this might download a PDF or similar
    alert('Download feature mock');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0e0e14]/95 backdrop-blur-md border-b border-red-600/30 px-6 lg:px-12 py-3 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="bg-racing-red px-3.5 py-1 font-black italic tracking-tighter text-xl text-white skew-12 shadow-[0_0_15px_rgba(225,6,0,0.5)]">
          <span className="unskew-12 inline-block">SCUDERIA</span>
        </div>
        <span className="font-extrabold tracking-widest text-xs uppercase text-slate-300 hidden sm:inline-block">
          CORSE <span className="text-red-500 font-light">MANILA</span>
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-xs font-black uppercase tracking-wider text-slate-300">
        <a href="#section-grid" className="hover:text-red-500 transition">Starting Grid</a>
        <a href="#section-search" className="hover:text-red-500 transition">Pit Telemetry Search</a>
        <a href="#section-calculator" className="hover:text-red-500 transition">Sprint Financing</a>
        <a href="#section-showcase" className="hover:text-red-500 transition">Aero Tunnel</a>
        <a href="#section-story" className="hover:text-red-500 transition">Paddock Creed</a>
        <a href="#section-faq" className="hover:text-red-500 transition">Track FAQ</a>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block font-mono mr-2">
          <p className="text-[9px] text-slate-500 uppercase tracking-widest">PIT WALL HOTLINE</p>
          <p className="text-xs font-bold text-red-500">+63 (2) 8877-RACE</p>
        </div>
        <a href="#section-cta" className="bg-racing-red px-4 py-2 text-xs font-black uppercase tracking-wider skew-12 hover:bg-white hover:text-black transition glow-red-sm inline-block">
          <span className="unskew-12 inline-block">Book Hot Lap</span>
        </a>
        <button onClick={downloadSelf} title="Save as standalone file" className="px-2.5 py-2 rounded bg-white/5 border border-white/10 hover:border-red-500 text-slate-300 hover:text-red-500 transition">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
