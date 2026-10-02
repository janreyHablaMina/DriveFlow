export default function Footer() {
  return (
    <footer className="px-6 lg:px-16 py-10 bg-[#07070a] border-t border-red-600/30 text-xs text-slate-500 font-body">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 font-mono">
        <div>
          <span className="text-lg font-black text-white block mb-2 font-sans">SCUDERIA CORSE</span>
          <p className="text-[11px] text-slate-400">Track-certified homologation supercar dealer powered by OmniDrive 2026 SaaS.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Grid Divisions</h4>
          <ul className="space-y-1 text-[11px]">
            <li><a href="#section-grid" className="hover:text-red-500">GT3 Homologations</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Clubsport Racers</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Competition SUVs</a></li>
            <li><a href="#section-grid" className="hover:text-red-500">Formula EV Torque</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Paddock System</h4>
          <ul className="space-y-1 text-[11px]">
            <li><span className="text-red-500">Paddock:</span> SCUDERIA-MNL-2026</li>
            <li><span>Lap Sync:</span> Clark International Speedway</li>
            <li><span>Telemetry:</span> Active 100Hz</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-2">Pit Wall</h4>
          <p className="text-[11px] text-slate-400">Circuit Makati Tarmac, Makati City</p>
          <p className="text-[11px] text-red-500 mt-1">+63 (2) 8877-RACE</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 text-center text-[10px] text-slate-600">
        © 2026 Scuderia Corse Manila. All rights reserved. Motorsport Dealership SaaS Prototype.
      </div>
    </footer>
  );
}
