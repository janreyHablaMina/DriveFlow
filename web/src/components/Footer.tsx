export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-10 bg-[#07070a] border-t border-red-600/30 text-xs text-slate-500 font-body">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 font-mono">
        <div>
          <span className="text-lg font-black text-white block mb-2 font-sans">DRIVEFLOW MOTORS</span>
          <p className="text-[11px] text-slate-400">Manila&apos;s premier luxury & performance car dealership. Authenticated inventory, dealer warranty, and seamless bank financing.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Showroom Inventory</h4>
          <ul className="space-y-1 text-[11px]">
            <li><a href="#section-grid" className="hover:text-red-500">Sports & Coupés</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Executive Sedans</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Luxury SUVs</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Electric & Hybrid</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Dealership Services</h4>
          <ul className="space-y-1 text-[11px]">
            <li><a href="#section-calculator" className="hover:text-red-500">Auto Financing Solutions</a></li>
            <li><a href="#section-search" className="hover:text-red-500">Trade-In Appraisals</a></li>
            <li><a href="#section-showcase" className="hover:text-red-500">Ceramic & Detailing Studio</a></li>
            <li><a href="#section-cta" className="hover:text-red-500">VIP Showroom Viewing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Showroom Contact</h4>
          <p className="text-[11px] text-slate-400">Circuit Makati & BGC, Metro Manila</p>
          <p className="text-[11px] text-red-500 mt-1">+63 (2) 8877-CARS (2277)</p>
          <p className="text-[11px] text-slate-400 mt-0.5">sales@driveflow.ph</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 text-center text-[10px] text-slate-600">
        © 2026 DriveFlow Motors Manila. All rights reserved. Precision Automotive Dealership Platform.
      </div>
    </footer>
  );
}
