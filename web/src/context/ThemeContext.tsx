'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Palette, X, Check, CheckCircle2, Sparkles, Layout, Sun, Moon } from 'lucide-react';

export type ShowroomThemeId = 'monaco-grand-prix' | 'nordic-minimalist';

export interface ShowroomThemeConfig {
  id: ShowroomThemeId;
  name: string;
  tagline: string;
  styleDescription: string;
  layoutArchitecture: string;
  primaryColor: string;
  accentColor: string;
  badgeText: string;
  previewImage: string;
  features: string[];
}

export const SHOWROOM_THEMES: ShowroomThemeConfig[] = [
  {
    id: 'monaco-grand-prix',
    name: 'Monaco Grand Prix',
    tagline: 'High-Octane Carbon & Racing Red Precision',
    styleDescription:
      'Dark carbon surfaces with scarlet racing accents, motorsport telemetry panels, and high-contrast showroom cards.',
    layoutArchitecture: 'Full-Bleed Motorsport Hero + Dark Telemetry Grid',
    primaryColor: '#e10600',
    accentColor: '#0a0a0e',
    badgeText: 'Motorsport Dark',
    previewImage:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features: [
      'Deep Carbon & Racing Scarlet Palette',
      'Full-Bleed Cinema Hero & Spotlight Slider',
      'Motorsport Telemetry & Dark Showroom Cards',
    ],
  },
  {
    id: 'nordic-minimalist',
    name: 'Nordic Editorial Atelier',
    tagline: 'Architectural Alabaster, Warm Stone & Minimalist Luxury',
    styleDescription:
      'Hyper-clean Scandinavian gallery aesthetic with warm alabaster backgrounds, asymmetric editorial layouts, and refined charcoal typography.',
    layoutArchitecture: 'Asymmetric Magazine Split + Sticky Sidebar Catalog',
    primaryColor: '#0f172a',
    accentColor: '#f8f7f4',
    badgeText: 'Editorial Light',
    previewImage:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    features: [
      'Warm Alabaster, Stone & Deep Slate Palette',
      'Asymmetric Editorial Hero & Bento Categories',
      'Sticky Sidebar Catalog & Mosaic Vehicle Dossier',
    ],
  },
];

interface ThemeContextType {
  activeTheme: ShowroomThemeId;
  setActiveTheme: (theme: ShowroomThemeId) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  activeTheme: 'monaco-grand-prix',
  setActiveTheme: () => {},
  isThemeModalOpen: false,
  setIsThemeModalOpen: () => {},
});

export const useShowroomTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveThemeState] = useState<ShowroomThemeId>('monaco-grand-prix');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('driveflow_theme') as ShowroomThemeId | null;
      if (saved === 'monaco-grand-prix' || saved === 'nordic-minimalist') {
        setActiveThemeState(saved);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const setActiveTheme = (themeId: ShowroomThemeId) => {
    setActiveThemeState(themeId);
    try {
      localStorage.setItem('driveflow_theme', themeId);
    } catch {
      // Ignore storage errors
    }
    const found = SHOWROOM_THEMES.find((t) => t.id === themeId);
    if (found) {
      setToastMessage(`Switched website theme to ${found.name}`);
      setTimeout(() => setToastMessage(null), 3200);
    }
  };

  const isLight = activeTheme === 'nordic-minimalist';

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        isThemeModalOpen,
        setIsThemeModalOpen,
      }}
    >
      {children}

      {/* Global Theme Switcher Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsThemeModalOpen(false)}
          />

          <div
            className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden z-10 shadow-2xl transition-colors duration-300 ${
              isLight
                ? 'bg-[#f8f7f4] border border-stone-300 text-slate-900 rounded-2xl'
                : 'bg-[#0c0f17] border border-slate-800 text-white rounded-none'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-5 sm:p-6 border-b flex items-center justify-between ${
                isLight
                  ? 'bg-white border-stone-200'
                  : 'bg-[#121624] border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <Palette className={`w-5 h-5 ${isLight ? 'text-slate-900' : 'text-red-500'}`} />
                  <h3 className="text-base sm:text-lg font-bold tracking-tight">
                    Website Theme & Architecture Switcher
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 font-semibold ${
                      isLight
                        ? 'bg-slate-900 text-white rounded-full'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    Full Layout Transform
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isLight ? 'text-stone-500' : 'text-slate-400'}`}>
                  Select a complete design system to transform the website&apos;s layout, typography, and color palette.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsThemeModalOpen(false)}
                className={`p-2 transition cursor-pointer ${
                  isLight
                    ? 'text-stone-500 hover:text-slate-900 hover:bg-stone-100 rounded-full'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - 2 Complete Themes Side-by-Side */}
            <div className="p-5 sm:p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SHOWROOM_THEMES.map((theme) => {
                  const isSelected = activeTheme === theme.id;
                  const isNordicCard = theme.id === 'nordic-minimalist';

                  return (
                    <div
                      key={theme.id}
                      onClick={() => setActiveTheme(theme.id)}
                      className={`group border overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isLight ? 'rounded-xl' : 'rounded-none'
                      } ${
                        isSelected
                          ? isLight
                            ? 'bg-white border-slate-900 ring-2 ring-slate-900 shadow-xl'
                            : 'bg-slate-900/95 border-[#e10600] ring-1 ring-[#e10600] shadow-xl shadow-red-950/40'
                          : isLight
                          ? 'bg-white/80 border-stone-200 hover:border-stone-400 hover:shadow-md'
                          : 'bg-[#121624] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {/* Preview Banner */}
                      <div className="relative h-40 w-full overflow-hidden bg-slate-950">
                        <img
                          src={theme.previewImage}
                          alt={theme.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div
                          className={`absolute inset-0 ${
                            isNordicCard
                              ? 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                              : 'bg-gradient-to-t from-[#121624] via-black/30 to-black/40'
                          }`}
                        />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 border border-white/15 flex items-center gap-1.5">
                            {isNordicCard ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-red-400" />}
                            {theme.badgeText}
                          </span>

                          {isSelected && (
                            <span
                              className={`text-[10px] font-mono font-bold text-white px-2.5 py-1 flex items-center gap-1 shadow-md ${
                                isLight ? 'bg-slate-900 rounded-full' : 'bg-[#e10600]'
                              }`}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                              ACTIVE
                            </span>
                          )}
                        </div>

                        {/* Color Swatches Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-white drop-shadow">
                            {theme.name}
                          </span>
                          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-full border border-white/15">
                            <span
                              className="w-3.5 h-3.5 rounded-full inline-block border border-white/40"
                              style={{ backgroundColor: theme.primaryColor }}
                              title={`Primary: ${theme.primaryColor}`}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full inline-block border border-white/40"
                              style={{ backgroundColor: theme.accentColor }}
                              title={`Surface: ${theme.accentColor}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider opacity-75">
                            <Layout className="w-3.5 h-3.5" />
                            <span>{theme.layoutArchitecture}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-slate-300'}`}>
                            {theme.styleDescription}
                          </p>

                          <ul className="space-y-1.5 pt-2">
                            {theme.features.map((feat, i) => (
                              <li
                                key={i}
                                className={`text-[11px] flex items-center gap-2 ${
                                  isLight ? 'text-stone-700' : 'text-slate-400'
                                }`}
                              >
                                <Check className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-t border-current/10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTheme(theme.id);
                            }}
                            className={`w-full py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                              isLight ? 'rounded-lg' : 'rounded-none'
                            } ${
                              isSelected
                                ? isLight
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-[#e10600] text-white'
                                : isLight
                                ? 'bg-stone-100 hover:bg-stone-200 text-slate-900'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Currently Active Theme</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Activate {theme.name}</span>
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
            <div
              className={`p-4 sm:px-6 border-t flex items-center justify-between text-xs ${
                isLight
                  ? 'bg-white border-stone-200 text-stone-600'
                  : 'bg-[#121624] border-slate-800 text-slate-400'
              }`}
            >
              <span>
                Active Experience:{' '}
                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                  {SHOWROOM_THEMES.find((t) => t.id === activeTheme)?.name}
                </strong>
              </span>

              <button
                type="button"
                onClick={() => setIsThemeModalOpen(false)}
                className={`px-5 py-2 font-semibold transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-900 hover:bg-slate-800 text-white rounded-lg'
                    : 'bg-slate-800 hover:bg-slate-700 text-white rounded-none'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-120 px-4 py-3 shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 ${
            isLight
              ? 'bg-slate-900 text-white rounded-xl border border-slate-700'
              : 'bg-[#121624] border border-red-500 text-white rounded-none'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </ThemeContext.Provider>
  );
}

