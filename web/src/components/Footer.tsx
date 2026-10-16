export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-12 py-8 sm:py-10 bg-[#07070a] border-t border-red-600/30 text-xs text-slate-500 font-body">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 font-mono">
        <div>
          <span className="text-base sm:text-lg font-black text-white block mb-2 font-sans tracking-tight">DRIVEFLOW MOTORS</span>
          <p className="text-[11px] text-slate-400 leading-relaxed">Manila&apos;s premier luxury & performance car dealership. Authenticated inventory, dealer warranty, and seamless bank financing.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Showroom Inventory</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="/#section-inventory" className="hover:text-red-500 transition py-0.5 inline-block">Sports & Coupés</a></li>
            <li><a href="/#section-inventory" className="hover:text-red-500 transition py-0.5 inline-block">Executive Sedans</a></li>
            <li><a href="/#section-inventory" className="hover:text-red-500 transition py-0.5 inline-block">Luxury SUVs</a></li>
            <li><a href="/#section-inventory" className="hover:text-red-500 transition py-0.5 inline-block">Work & Pickup Trucks</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Dealership Services</h4>
          <ul className="space-y-1.5 text-[11px]">
            <li><a href="/#section-inventory" className="hover:text-red-500 transition py-0.5 inline-block">Auto Financing Solutions</a></li>
            <li><a href="/#section-search" className="hover:text-red-500 transition py-0.5 inline-block">Trade-In Appraisals</a></li>
            <li><a href="/#section-showcase" className="hover:text-red-500 transition py-0.5 inline-block">Ceramic & Detailing Studio</a></li>
            <li><a href="/#section-cta" className="hover:text-red-500 transition py-0.5 inline-block">VIP Showroom Viewing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">Showroom Contact</h4>
          <p className="text-[11px] text-slate-400">Circuit Makati & BGC, Metro Manila</p>
          <p className="text-[11px] text-red-500 mt-1 font-semibold">+63 (2) 8877-CARS (2277)</p>
          <p className="text-[11px] text-slate-400 mt-0.5">sales@driveflow.ph</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 text-center text-[10px] text-slate-500 leading-normal">
        © 2026 DriveFlow Motors Manila. All rights reserved. Precision Automotive Dealership Platform.
      </div>
    </footer>
  );
}
