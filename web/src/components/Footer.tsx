'use client';

import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Palette,
} from 'lucide-react';
import { useShowroomTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { activeTheme, setIsThemeModalOpen } = useShowroomTheme();

  // ===================== THEME 2: NORDIC EDITORIAL ATELIER FOOTER =====================
  if (activeTheme === 'nordic-minimalist') {
    return (
      <footer className="px-4 sm:px-6 lg:px-12 py-16 bg-[#f1efe9] border-t border-stone-300/80 text-xs text-stone-600 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tighter">
                DF
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-[0.18em] text-sm text-slate-900 uppercase leading-none">
                  DRIVEFLOW
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-stone-500 mt-0.5">
                  ATELIER MANILA
                </span>
              </div>
            </Link>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Metro Manila&apos;s private automotive atelier for authenticated luxury, executive SUVs, and grand tourers. Every motorcar is 200-point certified with verified provenance.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] text-emerald-800 bg-emerald-950/5 border border-emerald-800/20 px-3.5 py-1.5 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-700" />
              <span>200-Point Inspected & Flood-Free Certified</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-900 font-bold uppercase text-[11px] tracking-[0.15em]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/vehicles" className="hover:text-slate-900 transition-colors">
                  Showroom Inventory
                </Link>
              </li>
              <li>
                <Link href="/#section-about" className="hover:text-slate-900 transition-colors">
                  About Our Dealership
                </Link>
              </li>
              <li>
                <Link href="/#section-testdrive" className="hover:text-slate-900 transition-colors">
                  Book A Test Drive
                </Link>
              </li>
              <li>
                <Link href="/#section-location" className="hover:text-slate-900 transition-colors">
                  Showroom Location
                </Link>
              </li>
              <li>
                <Link href="/#section-faq" className="hover:text-slate-900 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsThemeModalOpen(true)}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-slate-800 font-semibold group"
                >
                  <Palette className="w-3.5 h-3.5 text-slate-900 group-hover:scale-110 transition-transform" />
                  <span>Theme</span>
                  <span className="text-[9px] font-mono uppercase bg-slate-900 text-white px-2 py-0.2 rounded-full">
                    Nordic
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Operating Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-slate-900 font-bold uppercase text-[11px] tracking-[0.15em]">
              Private Salon & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                <span>Circuit Makati & Bonifacio Global City, Metro Manila</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-900 shrink-0" />
                <a href="tel:+63288772277" className="hover:text-slate-900 font-mono font-semibold transition">
                  +63 (2) 8877-CARS (2277)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-900 shrink-0" />
                <a href="mailto:sales@driveflow.ph" className="hover:text-slate-900 transition">
                  concierge@driveflow.ph
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-stone-500 pt-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Mon – Sun: 9:00 AM – 7:00 PM (By Appointment & Walk-In)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 DriveFlow Atelier Manila. All rights reserved.</p>
          <p className="flex items-center gap-4 text-[11px]">
            <span>Metro Manila, Philippines</span>
            <span>•</span>
            <span>Scandinavian Automotive Gallery</span>
          </p>
        </div>
      </footer>
    );
  }

  // ===================== THEME 1: MONACO GRAND PRIX FOOTER (DEFAULT) =====================
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
            <li>
              <button
                type="button"
                onClick={() => setIsThemeModalOpen(true)}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left text-slate-400 hover:text-white group"
              >
                <Palette className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                <span>Theme</span>
                <span className="text-[9px] font-mono uppercase bg-red-600/20 text-red-400 px-1.5 py-0.2 rounded-xs border border-red-500/30">
                  Preset
                </span>
              </button>
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
