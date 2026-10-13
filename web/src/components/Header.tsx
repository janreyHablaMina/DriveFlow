'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Vehicles For Sale', href: '/#section-inventory' },
    { label: 'Categories', href: '/#section-categories' },
    { label: 'About Us', href: '/#section-about' },
    { label: 'Schedule Test Drive', href: '/#section-testdrive' },
    { label: 'Showroom Location', href: '/#section-location' },
    { label: 'FAQ', href: '/#section-faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 shadow-lg">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-red-600 px-3 py-1 text-white font-extrabold tracking-tight text-lg rounded-sm group-hover:bg-red-500 transition shadow-sm">
            DRIVEFLOW
          </div>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 hidden sm:inline-block">
            MOTORS <span className="text-red-500 font-light">MANILA</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-red-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions: Phone + Book CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+63288772277"
            className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <div className="text-left font-mono">
              <span className="text-[9px] text-slate-500 uppercase block tracking-wider leading-none">HOTLINE</span>
              <span className="font-bold text-slate-200 text-xs">(02) 8877-CARS</span>
            </div>
          </a>

          <Link
            href="/#section-testdrive"
            className="bg-red-600 hover:bg-red-500 text-white font-semibold text-xs px-4 py-2.5 rounded transition shadow-sm flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Test Drive</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded transition border border-white/5"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0d0d14] px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-medium text-slate-300 hover:text-red-400 py-1 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="tel:+63288772277"
              className="flex items-center gap-2 text-xs text-slate-300 font-mono py-1"
            >
              <Phone className="w-4 h-4 text-red-500" />
              <span>Hotline: +63 (2) 8877-CARS</span>
            </a>

            <Link
              href="/#section-testdrive"
              onClick={handleLinkClick}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs py-3 rounded text-center transition flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Test Drive</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
