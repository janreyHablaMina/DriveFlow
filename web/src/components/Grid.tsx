'use client';

import { useState, useEffect } from 'react';
import { Car, Fuel, Gauge, Cog, CheckCircle2, Calendar, ShieldCheck, ArrowRight, Eye, X } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  category: 'suv' | 'sedan' | 'truck' | 'premium';
  categoryLabel: string;
  year: number;
  price: string;
  monthly: string;
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  badge: string;
  image: string;
  description: string;
  features: string[];
}

const VEHICLES: Vehicle[] = [
  // SUVs
  {
    id: 'everest-2024',
    name: '2024 Ford Everest Titanium+ 4x4',
    category: 'suv',
    categoryLabel: 'Family SUV',
    year: 2024,
    price: '₱2,350,000',
    monthly: '₱38,500/mo',
    mileage: '12,400 KM',
    fuel: 'Diesel',
    transmission: '10-Speed AT',
    engine: '2.0L Bi-Turbo',
    badge: 'DEAL OF THE WEEK',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate 7-seater family SUV with panoramic sunroof, Bang & Olufsen sound system, and full ADAS safety suite.',
    features: ['Panoramic Moonroof', '12" Sync 4A Touchscreen', '360-Degree Camera', 'First Owner / Casa Maintained']
  },
  {
    id: 'fortuner-2023',
    name: '2023 Toyota Fortuner LTD 4x2',
    category: 'suv',
    categoryLabel: 'Family SUV',
    year: 2023,
    price: '₱2,180,000',
    monthly: '₱35,700/mo',
    mileage: '19,200 KM',
    fuel: 'Diesel',
    transmission: '6-Speed AT',
    engine: '2.8L D-4D Diesel',
    badge: 'POPULAR CHOICE',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    description: 'Top-of-the-line 2-tone White Pearl & Black roof Fortuner LTD. JBL 9-speaker audio, ventilated front seats, Toyota Safety Sense.',
    features: ['JBL Premium Audio', 'Ventilated Leather Seats', 'Toyota Safety Sense', 'Complete LTO Papers']
  },
  {
    id: 'montero-2022',
    name: '2022 Mitsubishi Montero Sport GT',
    category: 'suv',
    categoryLabel: 'Family SUV',
    year: 2022,
    price: '₱1,650,000',
    monthly: '₱27,000/mo',
    mileage: '28,000 KM',
    fuel: 'Diesel',
    transmission: '8-Speed AT',
    engine: '2.4L MIVEC Clean Diesel',
    badge: 'GREAT VALUE',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    description: 'Smooth riding 7-seater SUV with electronic tailgate, power sunroof, and active stability and traction control.',
    features: ['Power Sunroof', 'Dual-Zone Auto Climate', 'Blind Spot Warning', 'Zero Accident Record']
  },

  // Daily Commuters (Sedans & Hatchbacks)
  {
    id: 'civic-2023',
    name: '2023 Honda Civic RS Turbo',
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    year: 2023,
    price: '₱1,450,000',
    monthly: '₱23,800/mo',
    mileage: '14,000 KM',
    fuel: 'Gasoline',
    transmission: 'CVT with Paddle Shifters',
    engine: '1.5L VTEC Turbo',
    badge: 'SPORT SEDAN',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
    description: 'Ignite Red Metallic Civic RS Turbo. Red-accented suede/leather interior, Honda SENSING, and legendary turbo punch.',
    features: ['Honda SENSING Suite', 'Wireless Apple CarPlay', 'Bose 12-Speaker Sound', 'Under Factory Warranty']
  },
  {
    id: 'altis-2022',
    name: '2022 Toyota Corolla Altis Hybrid',
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    year: 2022,
    price: '₱1,180,000',
    monthly: '₱19,300/mo',
    mileage: '22,500 KM',
    fuel: 'Hybrid Electric',
    transmission: 'e-CVT',
    engine: '1.8L Hybrid',
    badge: 'ECO & HYBRID',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
    description: 'Up to 24 km/L fuel efficiency. Coding-exempt under EV law, whisper-quiet cabin, and bulletproof Toyota hybrid reliability.',
    features: ['Number Coding Exempt', '24+ km/L Fuel Economy', 'Push-Button Start', 'Battery Warranty Active']
  },
  {
    id: 'mazda3-2023',
    name: '2023 Mazda 3 Fastback Sport',
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    year: 2023,
    price: '₱1,320,000',
    monthly: '₱21,600/mo',
    mileage: '16,800 KM',
    fuel: 'Gasoline',
    transmission: '6-Speed AT with Sport Mode',
    engine: '2.0L SkyActiv-G',
    badge: 'PREMIUM INTERIOR',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning Kodo design finished in Soul Red Crystal. German-rivaling luxury cockpit with HUD and 360 camera.',
    features: ['Soul Red Crystal Paint', 'Head-Up Display', 'Bose Surround Audio', 'Free 5-Yr Service Plan']
  },

  // Work & Utility (Pickups)
  {
    id: 'hilux-2023',
    name: '2023 Toyota Hilux Conquest 4x4',
    category: 'truck',
    categoryLabel: 'Work & Utility',
    year: 2023,
    price: '₱1,750,000',
    monthly: '₱28,600/mo',
    mileage: '18,500 KM',
    fuel: 'Diesel',
    transmission: '6-Speed AT',
    engine: '2.8L Turbo Diesel (500 Nm)',
    badge: 'INDES-TRUCTIBLE',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80',
    description: 'Emotional Red Conquest with factory sports bar, deck garnish, all-terrain tires, and off-road crawl assist.',
    features: ['Conquest Body Styling', 'Heavy-Duty Bedliner', 'Differential Lock', 'Zero Flood Guarantee']
  },
  {
    id: 'ranger-2022',
    name: '2022 Ford Ranger Wildtrak 4x4',
    category: 'truck',
    categoryLabel: 'Work & Utility',
    year: 2022,
    price: '₱1,580,000',
    monthly: '₱25,900/mo',
    mileage: '24,000 KM',
    fuel: 'Diesel',
    transmission: '10-Speed AT',
    engine: '2.0L Bi-Turbo',
    badge: 'OFF-ROAD READY',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&q=80',
    description: 'Luxe Yellow Wildtrak with power roller shutter, cyber orange stitching, and selectable terrain drive modes.',
    features: ['Electric Roller Shutter', 'Terrain Management System', 'Leather Accented Seats', 'Dealer Verified']
  },
  {
    id: 'navara-2022',
    name: '2022 Nissan Navara PRO-4X 4x4',
    category: 'truck',
    categoryLabel: 'Work & Utility',
    year: 2022,
    price: '₱1,490,000',
    monthly: '₱24,400/mo',
    mileage: '29,100 KM',
    fuel: 'Diesel',
    transmission: '7-Speed AT',
    engine: '2.5L Twin-Turbo Diesel',
    badge: 'MULTI-LINK SUSPENSION',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    description: 'Stealth Grey Pro-4X featuring coil-spring multi-link rear suspension for class-leading passenger comfort.',
    features: ['Zero Gravity Seats', 'Multi-Link Coil Suspension', 'Nissan Intelligent Mobility', 'Direct Bank Financing']
  },

  // Premium Collection
  {
    id: 'bmw-2023',
    name: '2023 BMW 320i M Sport',
    category: 'premium',
    categoryLabel: 'Premium Collection',
    year: 2023,
    price: '₱3,150,000',
    monthly: '₱51,600/mo',
    mileage: '9,800 KM',
    fuel: 'Gasoline',
    transmission: '8-Speed Steptronic Sport',
    engine: '2.0L TwinPower Turbo',
    badge: 'EXECUTIVE LUXURY',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    description: 'Portimao Blue Metallic with M Aerodynamics package, curved dual-display iDrive 8, and ambient lighting.',
    features: ['BMW Curved Display', 'M Sport Aerodynamics', 'Variable Sport Steering', 'Under BMW BSI Warranty']
  },
  {
    id: 'mercedes-2022',
    name: '2022 Mercedes-Benz GLA 200 AMG Line',
    category: 'premium',
    categoryLabel: 'Premium Collection',
    year: 2022,
    price: '₱2,850,000',
    monthly: '₱46,700/mo',
    mileage: '15,200 KM',
    fuel: 'Gasoline',
    transmission: '7G-DCT Dual Clutch',
    engine: '1.3L Turbocharged',
    badge: 'AMG STYLING',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    description: 'Compact luxury SUV with AMG diamond grille, 19-inch AMG alloys, dual 10.25-inch MBUX cockpit screens.',
    features: ['AMG Line Bodykit', 'Dual MBUX Cockpit', '64-Color Ambient Lights', '100% Clean LTO Title']
  },
  {
    id: 'lexus-2021',
    name: '2021 Lexus NX 300 F-Sport',
    category: 'premium',
    categoryLabel: 'Premium Collection',
    year: 2021,
    price: '₱2,650,000',
    monthly: '₱43,400/mo',
    mileage: '21,000 KM',
    fuel: 'Gasoline',
    transmission: '6-Speed AT',
    engine: '2.0L Turbo (235 HP)',
    badge: 'JAPANESE LUXURY',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra White with flare red sport bolstered seats. Adaptive variable suspension, panoramic roof, Mark Levinson audio.',
    features: ['Mark Levinson Audio', 'F-Sport Bolstered Seats', 'Adaptive Suspension', 'Complete Service Records']
  }
];

export default function Grid() {
  const [activeTab, setActiveTab] = useState<'all' | 'suv' | 'sedan' | 'truck' | 'premium'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Listen for category selection events from CategoryBrowser or external triggers
  useEffect(() => {
    const handleCategoryFilter = (e: any) => {
      const cat = e.detail?.toLowerCase();
      if (cat?.includes('suv')) setActiveTab('suv');
      else if (cat?.includes('commuter') || cat?.includes('sedan')) setActiveTab('sedan');
      else if (cat?.includes('utility') || cat?.includes('truck') || cat?.includes('work')) setActiveTab('truck');
      else if (cat?.includes('premium') || cat?.includes('luxury')) setActiveTab('premium');
      else setActiveTab('all');
    };

    window.addEventListener('filter-inventory', handleCategoryFilter);
    return () => window.removeEventListener('filter-inventory', handleCategoryFilter);
  }, []);

  const filteredVehicles = activeTab === 'all' 
    ? VEHICLES 
    : VEHICLES.filter((v) => v.category === activeTab);

  const handleBookTestDrive = (vehicleName: string) => {
    // If modal is open, close it
    setSelectedVehicle(null);
    
    // Smooth scroll to the Test Drive section
    const testDriveSection = document.getElementById('section-testdrive');
    if (testDriveSection) {
      testDriveSection.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill input if found
      setTimeout(() => {
        const carInput = testDriveSection.querySelector('input[placeholder*="Ford Everest"]') as HTMLInputElement;
        if (carInput) {
          carInput.value = vehicleName;
          carInput.focus();
        }
      }, 500);
    }
  };

  return (
    <section id="section-inventory" className="px-6 lg:px-16 py-16 border-b border-white/10 bg-[#08080c] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-black uppercase text-red-500 tracking-widest block mb-1">
              // VERIFIED DEALERSHIP INVENTORY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase text-white">
              Vehicles For Sale
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 bg-red-600/10 border border-red-600/30 text-red-400 font-bold rounded-full">
              {filteredVehicles.length} Units Available Now
            </span>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              100% LTO Certified & Clean Title
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'all'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            All Vehicles ({VEHICLES.length})
          </button>
          <button
            onClick={() => setActiveTab('suv')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'suv'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Family SUVs ({VEHICLES.filter(v => v.category === 'suv').length})
          </button>
          <button
            onClick={() => setActiveTab('sedan')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'sedan'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Daily Commuters ({VEHICLES.filter(v => v.category === 'sedan').length})
          </button>
          <button
            onClick={() => setActiveTab('truck')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'truck'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Work & Utility ({VEHICLES.filter(v => v.category === 'truck').length})
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all rounded-sm ${
              activeTab === 'premium'
                ? 'bg-racing-red text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                : 'bg-black/60 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            Premium Collection ({VEHICLES.filter(v => v.category === 'premium').length})
          </button>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((car) => (
            <div 
              key={car.id} 
              className="bg-[#101017] border border-white/10 hover:border-red-600/80 transition-all duration-300 rounded-sm overflow-hidden flex flex-col group shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              {/* Image & Badges */}
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101017] via-transparent to-black/30"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="bg-racing-red text-white text-[9px] font-black uppercase px-2.5 py-1 tracking-wider rounded-sm shadow-md">
                    {car.badge}
                  </span>
                </div>
                
                <span className="absolute bottom-3 right-3 text-[10px] font-mono font-bold bg-black/80 backdrop-blur-sm text-slate-300 px-2.5 py-1 rounded border border-white/10">
                  {car.categoryLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-lg text-white uppercase group-hover:text-red-500 transition-colors leading-snug line-clamp-1">
                    {car.name}
                  </h3>
                  <p className="text-slate-400 text-xs font-body mt-2 line-clamp-2 leading-relaxed">
                    {car.description}
                  </p>

                  {/* Quick Specs Pills */}
                  <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/5 font-mono text-center">
                    <div className="bg-black/50 p-2 rounded border border-white/5">
                      <Gauge className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block font-bold">{car.mileage}</span>
                    </div>
                    <div className="bg-black/50 p-2 rounded border border-white/5">
                      <Fuel className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block font-bold">{car.fuel}</span>
                    </div>
                    <div className="bg-black/50 p-2 rounded border border-white/5">
                      <Cog className="w-3.5 h-3.5 text-red-500 mx-auto mb-1" />
                      <span className="text-[10px] text-slate-400 block font-bold truncate">{car.engine}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 border-t border-white/10 mt-2">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Outright Cash Price</span>
                      <span className="text-2xl font-black text-red-500 tracking-tight">{car.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Est. Loan</span>
                      <span className="text-xs font-bold text-slate-300 font-mono">{car.monthly}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setSelectedVehicle(car)}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-bold uppercase transition rounded-sm border border-white/10 flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                    <button 
                      onClick={() => handleBookTestDrive(car.name)}
                      className="w-full py-2.5 bg-racing-red hover:bg-white hover:text-black text-white text-xs font-black uppercase transition rounded-sm shadow-md flex items-center justify-center gap-1"
                    >
                      Book Drive <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12121a] border border-white/15 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-72 bg-slate-900">
              <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-sm">
                  {selectedVehicle.badge}
                </span>
                <h3 className="text-2xl font-black italic uppercase text-white mt-1">
                  {selectedVehicle.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm text-slate-300 leading-relaxed font-body">
                {selectedVehicle.description}
              </p>

              {/* Detailed specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/60 p-4 border border-white/10 rounded font-mono text-center">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Odometer</span>
                  <span className="text-xs font-bold text-white">{selectedVehicle.mileage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Transmission</span>
                  <span className="text-xs font-bold text-white truncate block">{selectedVehicle.transmission}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Fuel Type</span>
                  <span className="text-xs font-bold text-white">{selectedVehicle.fuel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Engine</span>
                  <span className="text-xs font-bold text-red-500">{selectedVehicle.engine}</span>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-black uppercase text-slate-300 mb-3 tracking-wider">
                  Vehicle Highlights & Inspection
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-body">
                  {selectedVehicle.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 rounded border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Outright Cash Price</span>
                  <span className="text-3xl font-black text-red-500">{selectedVehicle.price}</span>
                  <span className="text-[10px] font-mono text-slate-400 block">or approx. {selectedVehicle.monthly} financing</span>
                </div>
                <button
                  onClick={() => handleBookTestDrive(selectedVehicle.name)}
                  className="w-full sm:w-auto bg-racing-red hover:bg-white hover:text-black text-white font-black text-xs px-8 py-3.5 uppercase transition shadow-[0_0_15px_rgba(220,38,38,0.4)] rounded-sm flex items-center justify-center gap-2"
                >
                  Schedule Test Drive <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
