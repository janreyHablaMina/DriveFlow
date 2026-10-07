'use client';

import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Eye,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  Settings,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  Save,
  Check,
  ChevronRight,
  X,
} from 'lucide-react';
import { DealershipTheme, AdminVehicle } from '../../types';
import { DEALERSHIP_THEMES } from '../../mockData';

interface WebsiteTabProps {
  activeThemeId: string;
  onApplyTheme: (themeId: string) => void;
  vehicles: AdminVehicle[];
  onToggleVehiclePublic: (vehicleId: string) => void;
  onToggleVehicleFeatured: (vehicleId: string) => void;
}

export const WebsiteTab: React.FC<WebsiteTabProps> = ({
  activeThemeId,
  onApplyTheme,
  vehicles,
  onToggleVehiclePublic,
  onToggleVehicleFeatured,
}) => {
  const [activeSection, setActiveSection] = useState<'themes' | 'branding' | 'banners' | 'content'>('themes');
  const [previewTheme, setPreviewTheme] = useState<DealershipTheme | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Dealership Branding States
  const [brandName, setBrandName] = useState('Apex Motors Philippines');
  const [tagline, setTagline] = useState('Bespoke Automotive Sales & High-Velocity Financing');
  const [primaryColor, setPrimaryColor] = useState('#e10600');
  const [contactPhone, setContactPhone] = useState('+63 (2) 8888-2931');
  const [contactEmail, setContactEmail] = useState('sales@apexmotors.ph');
  const [showroomAddress, setShowroomAddress] = useState('5th Ave cor 28th St, Bonifacio Global City, Taguig City');

  // Promotional Banner State
  const [bannerTitle, setBannerTitle] = useState('Q4 Auto Financing Festival: Low 4.88% Bank Partner Promo');
  const [bannerSub, setBannerSub] = useState('Zero chattel fees and expedited 24-hour credit investigation approval for select SUVs & Sedans.');
  const [bannerEnabled, setBannerEnabled] = useState(true);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Dealership public storefront branding saved successfully!');
  };

  const currentTheme = DEALERSHIP_THEMES.find((t) => t.id === activeThemeId) || DEALERSHIP_THEMES[0];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-60 bg-[#121624] border border-emerald-500 text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Website CMS & Theme Customizer</span>
            <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-sm border border-red-500/20">
              10 Themes Available
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Choose from 10 production dealership storefront themes, manage promotional banners, and curate public fleet listings.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto shadow-sm shadow-red-950/40"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Preview Live Website
        </a>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: 'themes', label: '10 Dealership Themes', icon: Palette },
          { id: 'branding', label: 'Storefront Branding & Logo', icon: Settings },
          { id: 'banners', label: 'Homepage Banners & Promos', icon: ImageIcon },
          { id: 'content', label: 'Public Fleet Curation', icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as typeof activeSection)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-[#e10600] text-white shadow-[0_0_20px_rgba(225,6,0,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: 10 DISTINCT THEMES */}
      {activeSection === 'themes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Currently Applied Theme:{' '}
              <strong className="text-white font-mono">{currentTheme.name}</strong> ({currentTheme.tagline})
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Instant Real-Time Switch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEALERSHIP_THEMES.map((theme) => {
              const isActive = theme.id === activeThemeId;
              return (
                <div
                  key={theme.id}
                  className={`rounded-xl bg-[#121624] border transition flex flex-col justify-between overflow-hidden group ${
                    isActive
                      ? 'border-[#e10600] shadow-lg shadow-red-950/40'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white border border-white/20">
                          {theme.badgeText}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#e10600] text-white flex items-center gap-1 shadow-sm">
                            <Check className="w-3 h-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/80 px-2 py-1 rounded">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                        <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: theme.accentColor }} />
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-xs">
                      <h4 className="font-bold text-white text-sm">{theme.name}</h4>
                      <p className="text-[11px] text-red-400 font-medium">{theme.tagline}</p>
                      <p className="text-slate-400 text-[11px] line-clamp-2">{theme.styleDescription}</p>
                      <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                        Target: <span className="text-slate-300">{theme.targetAudience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewTheme(theme)}
                      className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect Spec
                    </button>

                    {isActive ? (
                      <span className="text-[11px] font-mono font-bold text-red-500 px-3 py-1.5">
                        Current Theme
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          onApplyTheme(theme.id);
                          triggerToast(`Activated "${theme.name}" theme for public showroom!`);
                        }}
                        className="px-3 py-1.5 rounded bg-[#e10600] hover:bg-[#c00500] text-white text-xs font-bold transition shadow-sm shadow-red-950/40"
                      >
                        Apply Theme
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: BRANDING & CONTACT */}
      {activeSection === 'branding' && (
        <form
          onSubmit={handleSaveBranding}
          className="bg-[#121624] border border-slate-800 rounded-xl p-6 space-y-5 text-xs max-w-2xl"
        >
          <h3 className="text-base font-bold text-white">Dealership Storefront Profile</h3>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 block mb-1">Dealership Public Trading Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Brand Tagline & Headline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Sales Hotline Phone</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Official Sales Email</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Showroom Flagship Address</label>
              <input
                type="text"
                required
                value={showroomAddress}
                onChange={(e) => setShowroomAddress(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white font-bold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40"
            >
              <Save className="w-4 h-4" />
              Save Brand Changes
            </button>
          </div>
        </form>
      )}

      {/* SECTION 3: PROMO BANNERS */}
      {activeSection === 'banners' && (
        <div className="bg-[#121624] border border-slate-800 rounded-xl p-6 space-y-5 text-xs max-w-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Homepage Promotional Announcement Bar</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-slate-400 text-xs">Display on Home:</span>
              <input
                type="checkbox"
                checked={bannerEnabled}
                onChange={(e) => setBannerEnabled(e.target.checked)}
                className="w-4 h-4 accent-red-600 rounded"
              />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-slate-400 block mb-1">Promo Headline</label>
              <input
                type="text"
                value={bannerTitle}
                onChange={(e) => setBannerTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Supporting Description & Terms</label>
              <textarea
                value={bannerSub}
                onChange={(e) => setBannerSub(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2.5 text-white h-20 text-xs"
              />
            </div>

            {/* Live Preview of Banner */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-500">Live Preview Container</span>
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-white">
                <span className="font-bold block text-sm">{bannerTitle}</span>
                <p className="text-xs text-slate-300 mt-0.5">{bannerSub}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => triggerToast('Promotional announcement updated!')}
              className="px-5 py-2 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white font-bold flex items-center gap-1.5 transition shadow-sm shadow-red-950/40"
            >
              <Save className="w-4 h-4" />
              Publish Banner
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: PUBLIC FLEET CURATION */}
      {activeSection === 'content' && (
        <div className="bg-[#121624] border border-slate-800 rounded-xl overflow-hidden text-xs">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-white text-sm">Storefront Inventory Visibility</h3>
              <p className="text-slate-400 text-[11px]">Toggle which vehicles are published or highlighted on the public website catalog.</p>
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-900 text-[10px] font-mono text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3 text-center">Featured on Homepage</th>
                <th className="py-3 px-3 text-center">Public Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">{v.name}</td>
                  <td className="py-3 px-3 text-slate-400 uppercase text-[10px] font-mono">{v.category}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">₱{v.priceNumeric.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onToggleVehicleFeatured(v.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition ${
                        v.isFeatured
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-800 text-slate-500 hover:text-white'
                      }`}
                    >
                      {v.isFeatured ? '★ Featured' : '☆ Standard'}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onToggleVehiclePublic(v.id)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition ${
                        v.isPublicListing
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {v.isPublicListing ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Theme Spec Modal */}
      {previewTheme && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-slate-700 rounded-xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">{previewTheme.name}</h3>
                <span className="text-red-400 text-xs font-mono">{previewTheme.tagline}</span>
              </div>
              <button
                onClick={() => setPreviewTheme(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={previewTheme.previewImage}
              alt={previewTheme.name}
              className="w-full h-44 object-cover rounded-lg border border-slate-800"
            />

            <div className="space-y-2 text-slate-300">
              <p>{previewTheme.styleDescription}</p>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 font-mono text-[11px]">
                <div>Target Market: <strong className="text-white">{previewTheme.targetAudience}</strong></div>
                <div>Primary Accent: <span className="text-white" style={{ color: previewTheme.primaryColor }}>{previewTheme.primaryColor}</span></div>
                <div>Background Base: <span className="text-white">{previewTheme.accentColor}</span></div>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  onApplyTheme(previewTheme.id);
                  setPreviewTheme(null);
                  triggerToast(`Theme switched to "${previewTheme.name}"`);
                }}
                className="px-4 py-2 rounded-lg bg-[#e10600] hover:bg-[#c00500] text-white font-bold transition shadow-sm shadow-red-950/40"
              >
                Activate This Theme
              </button>
              <button
                onClick={() => setPreviewTheme(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

