'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Palette,
  X,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { DEALERSHIP_THEMES } from '../app/admin/mockData';

export default function Footer() {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState('monaco-grand-prix');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persisted theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('driveflow_theme');
      if (saved) {
        setActiveThemeId(saved);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleSelectTheme = (themeId: string, themeName: string) => {
    setActiveThemeId(themeId);
    try {
      localStorage.setItem('driveflow_theme', themeId);
    } catch {
      // Ignore storage errors
    }
    setToastMessage(`Theme applied: ${themeName}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
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

      {/* Theme Selection Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsThemeModalOpen(false)}
          />

          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0f17] border border-slate-800 rounded-none shadow-2xl flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#121624]">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-red-500" />
                  <span>Showroom Theme Presets</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                    Live Customizer
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose a styling aesthetic profile to customize the showroom presentation.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsThemeModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Theme Cards Grid */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEALERSHIP_THEMES.map((theme) => {
                  const isSelected = activeThemeId === theme.id;

                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id, theme.name)}
                      className={`group border rounded-none overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900/90 border-[#e10600] ring-1 ring-[#e10600]/80 shadow-lg shadow-red-950/50'
                          : 'bg-[#121624] border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      {/* Theme Preview Header Image */}
                      <div className="relative h-32 w-full overflow-hidden bg-slate-950">
                        <img
                          src={theme.previewImage}
                          alt={theme.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/40" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase font-bold text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 border border-white/10">
                            {theme.badgeText}
                          </span>

                          {isSelected && (
                            <span className="text-[10px] font-mono font-bold text-white bg-[#e10600] px-2 py-0.5 flex items-center gap-1 shadow-xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                              ACTIVE
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors flex items-center justify-between">
                            <span>{theme.name}</span>
                          </h4>
                          <p className="text-[11px] text-slate-300 font-medium leading-snug">
                            {theme.tagline}
                          </p>
                          <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed pt-0.5">
                            {theme.styleDescription}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 space-y-2">
                          {/* Audience & Color Swatches */}
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-400 truncate max-w-[140px]">
                              {theme.targetAudience.split(',')[0]}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <span
                                className="w-3 h-3 rounded-none inline-block border border-white/20"
                                style={{ backgroundColor: theme.primaryColor }}
                                title={`Primary: ${theme.primaryColor}`}
                              />
                              <span
                                className="w-3 h-3 rounded-none inline-block border border-white/20"
                                style={{ backgroundColor: theme.accentColor }}
                                title={`Accent: ${theme.accentColor}`}
                              />
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectTheme(theme.id, theme.name);
                            }}
                            className={`w-full py-1.5 px-3 text-xs font-bold rounded-none flex items-center justify-center gap-1.5 transition cursor-pointer ${
                              isSelected
                                ? 'bg-[#e10600] text-white shadow-xs'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Applied Theme</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                                <span>Apply Preset</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-[#121624] flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Active Profile: <strong className="text-white font-mono">{DEALERSHIP_THEMES.find(t => t.id === activeThemeId)?.name || 'Default'}</strong>
              </span>

              <button
                type="button"
                onClick={() => setIsThemeModalOpen(false)}
                className="px-4 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-white font-semibold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-[#121624] border border-red-500 text-white px-4 py-2.5 rounded-none shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}
