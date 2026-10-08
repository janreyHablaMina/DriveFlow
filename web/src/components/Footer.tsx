import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 bg-[#07070a] border-t border-white/10 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
        
        {/* Brand & Mission Column */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="bg-red-600 px-2.5 py-1 text-white font-extrabold tracking-tight text-base rounded-sm group-hover:bg-red-500 transition shadow-sm">
              DRIVEFLOW
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">
              MOTORS <span className="text-red-500 font-light">MANILA</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Metro Manila&apos;s premier destination for authenticated luxury, sports, and executive automobiles. Every vehicle is 200-point inspected with verified legal documentation.
          </p>
          <div className="inline-flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-sm">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span>200-Point Inspected & Flood-Free Certified</span>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-white font-bold uppercase text-[11px] tracking-wider font-sans">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/vehicles" className="hover:text-red-400 transition-colors">
                Showroom Inventory
              </Link>
            </li>
            <li>
              <Link href="/#section-about" className="hover:text-red-400 transition-colors">
                About Our Dealership
              </Link>
            </li>
            <li>
              <Link href="/#section-testdrive" className="hover:text-red-400 transition-colors">
                Book A Test Drive
              </Link>
            </li>
            <li>
              <Link href="/#section-location" className="hover:text-red-400 transition-colors">
                Showroom Location
              </Link>
            </li>
            <li>
              <Link href="/#section-faq" className="hover:text-red-400 transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Operating Hours */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-white font-bold uppercase text-[11px] tracking-wider font-sans">
            Showroom & Contact
          </h4>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>Circuit Makati & Bonifacio Global City, Metro Manila</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <a href="tel:+63288772277" className="hover:text-white font-mono font-medium transition">
                +63 (2) 8877-CARS (2277)
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <a href="mailto:sales@driveflow.ph" className="hover:text-white transition">
                sales@driveflow.ph
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] text-slate-500 pt-1">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>Mon – Sun: 9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Location */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 DriveFlow Motors Manila. All rights reserved.</p>
        <p className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span>Metro Manila, Philippines</span>
          <span>•</span>
          <span>Premium Automotive Dealership</span>
        </p>
      </div>
    </footer>
  );
}
