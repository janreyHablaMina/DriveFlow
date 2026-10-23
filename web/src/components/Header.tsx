'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Menu, X, Palette, ArrowUpRight } from 'lucide-react';
import { useShowroomTheme } from '@/context/ThemeContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeTheme, setIsThemeModalOpen } = useShowroomTheme();

  const navLinks = [
    { label: 'Inventory', href: '/vehicles' },
    { label: 'About Us', href: '/#section-about' },
    { label: 'Location', href: '/#section-location' },
    { label: 'FAQ', href: '/#section-faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // ===================== THEME 2: NORDIC EDITORIAL ATELIER HEADER =====================
  if (activeTheme === 'nordic-minimalist') {
    return (
      <header className="sticky top-0 z-50 bg-[#f8f7f4]/95 backdrop-blur-md border-b border-stone-200/90 text-slate-900 transition-colors duration-300">
        {/* Top Architectural Ribbon */}
        <div className="bg-slate-900 text-stone-200 text-[10px] tracking-[0.2em] uppercase py-1.5 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span>Scandinavian Automotive Gallery • Bonifacio Global City & Makati</span>
            <div className="hidden sm:flex items-center gap-4">
              <span>200-Point Certified</span>
              <span>•</span>
              <button
                type="button"
                onClick={() => setIsThemeModalOpen(true)}
                className="text-amber-300 hover:text-white underline underline-offset-2 cursor-pointer flex items-center gap-1"
              >
                <Palette className="w-3 h-3" />
                <span>Theme: Nordic Editorial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto h-20 flex items-center justify-between">
            {/* Editorial Brand Mark */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tighter group-hover:bg-slate-700 transition">
                DF
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-[0.18em] text-sm text-slate-900 uppercase leading-none">
                  DRIVEFLOW
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-stone-500 mt-1">
                  ATELIER MANILA
                </span>
              </div>
            </Link>

            {/* Centered Minimalist Links */}
            <nav className="hidden lg:flex items-center gap-10 text-xs font-medium text-stone-600">
              <Link href="/vehicles" className="hover:text-slate-900 transition-colors tracking-wide">
                Curated Collection
              </Link>
              <Link href="/#section-about" className="hover:text-slate-900 transition-colors tracking-wide">
                Our Provenance
              </Link>
              <Link href="/#section-location" className="hover:text-slate-900 transition-colors tracking-wide">
                Private Studios
              </Link>
              <Link href="/#section-faq" className="hover:text-slate-900 transition-colors tracking-wide">
                Client Advisory
              </Link>
            </nav>

            {/* Right Concierge Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+63288772277"
                className="px-3.5 py-2 rounded-full border border-stone-300 hover:border-slate-900 text-xs font-medium text-slate-700 hover:text-slate-900 transition flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-mono text-[11px]">(02) 8877-CARS</span>
              </a>

              <Link
                href="/#section-testdrive"
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-5 py-2.5 rounded-full transition flex items-center gap-1.5 shadow-xs"
              >
                <span>Private Viewing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-stone-200/60 rounded-full transition border border-stone-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#f8f7f4] px-6 py-5 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-sm font-medium text-slate-800 hover:text-slate-950 py-2 border-b border-stone-200/70"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsThemeModalOpen(true);
                }}
                className="text-sm font-medium text-slate-800 py-2 flex items-center gap-2 text-left"
              >
                <Palette className="w-4 h-4" />
                <span>Switch Website Theme</span>
              </button>
            </nav>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/#section-testdrive"
                onClick={handleLinkClick}
                className="w-full bg-slate-900 text-white font-semibold text-xs py-3 rounded-full flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Viewing</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  // ===================== THEME 1: MONACO GRAND PRIX HEADER (DEFAULT) =====================
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-12 shadow-lg">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="bg-red-600 px-2.5 sm:px-3 py-1 text-white font-extrabold tracking-tight text-base sm:text-lg rounded-sm group-hover:bg-red-500 transition shadow-sm">
            DRIVEFLOW
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 hidden xs:inline-block sm:inline-block">
            MOTORS <span className="text-red-500 font-light">MANILA</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-red-400 transition-colors uppercase tracking-wider text-[11px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          <a
            href="tel:+63288772277"
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left font-mono hidden md:block">
              <span className="text-[9px] text-slate-500 uppercase block tracking-wider leading-none">
                HOTLINE
              </span>
              <span className="font-bold text-slate-200 text-xs">(02) 8877-CARS</span>
            </div>
          </a>

          <Link
            href="/#section-testdrive"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs px-3.5 sm:px-4 py-2.5 rounded transition shadow-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Test Drive</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-11 h-11 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded transition border border-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-red-500" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d0d14]/98 backdrop-blur-xl px-4 sm:px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-semibold text-slate-200 hover:text-red-400 active:bg-white/5 px-3 py-2.5 rounded transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="tel:+63288772277"
              className="flex items-center justify-center gap-2 py-2.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Hotline: (02) 8877-CARS</span>
            </a>

            <Link
              href="/#section-testdrive"
              onClick={handleLinkClick}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs py-3 rounded shadow flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Test Drive</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
