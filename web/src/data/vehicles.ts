export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  category: 'suv' | 'sedan' | 'truck' | 'premium';
  categoryLabel: string;
  price: string;
  priceNumeric: number;
  monthly: string;
  badge: string;
  mileage: string;
  fuel: string;
  transmission: string;
  engine: string;
  drivetrain: string;
  power: string;
  torque: string;
  seating: string;
  color: string;
  plateEnding: string;
  orCrStatus: string;
  images: string[];
  description: string;
  features: string[];
  inspectionHighlights: { name: string; score: string }[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'everest-2024',
    name: '2024 Ford Everest Titanium+ 4x4',
    make: 'Ford',
    model: 'Everest',
    trim: 'Titanium+ 4x4',
    year: 2024,
    category: 'suv',
    categoryLabel: 'Family SUV',
    price: '₱2,350,000',
    priceNumeric: 2350000,
    monthly: '₱38,500/mo',
    badge: 'Featured',
    mileage: '12,400 KM',
    fuel: 'Diesel',
    transmission: '10-Speed Electronic Automatic',
    engine: '2.0L Bi-Turbo Diesel',
    drivetrain: '4WD with Terrain Management System',
    power: '210 PS @ 3,750 rpm',
    torque: '500 Nm @ 1,750-2,000 rpm',
    seating: '7 Passengers',
    color: 'Absolute Black Metallic',
    plateEnding: '8 (Thursday Coding)',
    orCrStatus: 'Clean LTO Documents, 1st Owner, Casa Maintained',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ford Everest Titanium+ in Absolute Black. Equipped with panoramic moonroof, 12-inch touchscreen with wireless Apple CarPlay/Android Auto, Bang & Olufsen sound, and 360-degree cameras. Casa maintained with complete records.',
    features: [
      'Panoramic Dual-Panel Moonroof',
      '12-inch Sync 4A Touchscreen with Wireless CarPlay',
      'Bang & Olufsen 12-Speaker Sound System',
      '360-Degree Surround High-Definition Camera',
      'Blind Spot Information System with Trailer Coverage',
      'Adaptive Cruise Control with Stop-and-Go',
      'Power Folding 3rd Row Seats with Hands-Free Tailgate',
      'Under Active Ford Casa Warranty & Complete Service Booklet'
    ],
    inspectionHighlights: [
      { name: 'Engine Compression & Turbocharger', score: 'Pass (Factory Spec)' },
      { name: '10-Speed Transmission & Shift Dynamics', score: 'Pass (Smooth)' },
      { name: 'Electronic 4WD Transfer Case & Locking Diff', score: 'Pass (Functional)' },
      { name: 'Suspension, Bushings & Wheel Alignment', score: 'Pass (Verified)' },
      { name: 'Frame & Underchassis Integrity Check', score: 'Pass (Clean / Flood-Free)' }
    ]
  },
  {
    id: 'civic-2023',
    name: '2023 Honda Civic RS Turbo',
    make: 'Honda',
    model: 'Civic',
    trim: 'RS Turbo',
    year: 2023,
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    price: '₱1,450,000',
    priceNumeric: 1450000,
    monthly: '₱23,800/mo',
    badge: 'Low Mileage',
    mileage: '14,000 KM',
    fuel: 'Gasoline',
    transmission: 'CVT with Steering Wheel Paddle Shifters',
    engine: '1.5L DOHC VTEC Turbo',
    drivetrain: 'Front-Wheel Drive',
    power: '178 PS @ 6,000 rpm',
    torque: '240 Nm @ 1,700-4,500 rpm',
    seating: '5 Passengers',
    color: 'Ignite Red Metallic',
    plateEnding: '4 (Tuesday Coding)',
    orCrStatus: 'Original OR/CR on Hand, No Encumbrance',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The pinnacle of sport compact sedans. Featuring Ignite Red Metallic with gloss black RS aero kit, dual exhaust tailpipe finishers, red contrast stitching throughout suede/leather bolstered seats, 10.2-inch full digital instrument cluster, and the industry-lauded Honda SENSING driver-assist safety suite. Driven solely in Bonifacio Global City and Makati with full Honda service stamps.',
    features: [
      'Full Honda SENSING Active Safety Suite',
      '10.2-inch Full Digital Driver Display',
      'Bose 12-Speaker Premium Sound System',
      'Wireless Apple CarPlay & Qi Wireless Charging Pad',
      'RS Exclusive Gloss Black Trunk Spoiler & Mirrors',
      'Dual Exhaust Chrome Tailpipes',
      'Leather/Suede Combo Seats with Red Ambient Lighting',
      'Ceramic Coated Paint Protection with 3-Year Guarantee'
    ],
    inspectionHighlights: [
      { name: '1.5L VTEC Turbo Pressure & Leak Check', score: 'Pass (Factory Spec)' },
      { name: 'Brake Rotor Thickness & ABS Sensors', score: 'Pass (95% Life)' },
      { name: 'Steering Rack & Electronic Power Assist', score: 'Pass (Factory Calibration)' },
      { name: 'Diagnostic OBD-II Computer Scan', score: 'Pass (0 Fault Codes)' },
      { name: 'LTO Verification & Anti-Flood Guarantee', score: 'Pass (Certified Clean)' }
    ]
  },
  {
    id: 'hilux-2023',
    name: '2023 Toyota Hilux Conquest 4x4',
    make: 'Toyota',
    model: 'Hilux',
    trim: 'Conquest 4x4 AT',
    year: 2023,
    category: 'truck',
    categoryLabel: 'Work & Utility',
    price: '₱1,750,000',
    priceNumeric: 1750000,
    monthly: '₱28,600/mo',
    badge: '1st Owner',
    mileage: '18,500 KM',
    fuel: 'Diesel',
    transmission: '6-Speed Automatic with Sequential Shift',
    engine: '2.8L 1GD-FTV Turbo Diesel',
    drivetrain: 'Part-Time 4WD with Rear Auto-Disconnect Diff',
    power: '204 PS @ 3,400 rpm',
    torque: '500 Nm @ 1,600-2,800 rpm',
    seating: '5 Passengers',
    color: 'Emotional Red II',
    plateEnding: '6 (Wednesday Coding)',
    orCrStatus: 'Clean Title, Private Use, Never Used for Hauling',
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Toyota Hilux Conquest 4x4 in Emotional Red. Factory overfenders, sports bar, heavy-duty bedliner, and powerful 2.8L turbo diesel engine. Strictly city driven with zero off-road abuse.',
    features: [
      '2.8L 1GD-FTV High-Output Turbo Diesel',
      'Conquest Signature Overfenders & Dark Chrome Grille',
      'Rear Differential Lock & Downhill Assist Control',
      'Panoramic View Monitor (360 Camera)',
      'Smart Keyless Entry with Engine Start/Stop',
      'Bedliner with Integrated 12V Cargo Outlet',
      'All-Weather Deep Dish Mats Included',
      'Comprehensive Insurance Valid Until Late 2027'
    ],
    inspectionHighlights: [
      { name: 'Common Rail Diesel Injectors & Fuel Rail', score: 'Pass (Excellent)' },
      { name: '4x4 High / Low Transfer Actuators', score: 'Pass (Instant Engage)' },
      { name: 'Leaf Springs, Shocks & Heavy Duty Bushings', score: 'Pass (Optimal)' },
      { name: 'Chassis Frame Rails & Crossmembers', score: 'Pass (Zero Rust / Structural)' },
      { name: 'Original Paint Gauge Depth Analysis', score: 'Pass (100% Factory Panels)' }
    ]
  },
  {
    id: 'fortuner-2023',
    name: '2023 Toyota Fortuner LTD 4x2',
    make: 'Toyota',
    model: 'Fortuner',
    trim: 'LTD 4x2 AT Two-Tone',
    year: 2023,
    category: 'suv',
    categoryLabel: 'Family SUV',
    price: '₱2,180,000',
    priceNumeric: 2180000,
    monthly: '₱35,700/mo',
    badge: 'Top Condition',
    mileage: '19,200 KM',
    fuel: 'Diesel',
    transmission: '6-Speed Automatic',
    engine: '2.8L 4-Cylinder D-4D Diesel',
    drivetrain: 'Rear-Wheel Drive',
    power: '204 PS @ 3,400 rpm',
    torque: '500 Nm @ 1,600-2,800 rpm',
    seating: '7 Passengers',
    color: 'Platinum White Pearl with Black Roof',
    plateEnding: '1 (Monday Coding)',
    orCrStatus: 'Clean Title, Complete Manuals & 2 Keys',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Toyota Fortuner LTD in factory Two-Tone Platinum White Pearl with contrast black roof. Features ventilated front leather cooling seats, JBL audio, Toyota Safety Sense, and power tailgate with kick sensor.',
    features: [
      'Two-Tone Platinum White Pearl with Contrast Black Roof',
      'Front Ventilated Leather Bucket Seats (Cooling)',
      'JBL 9-Speaker Audio System with Subwoofer',
      'Toyota Safety Sense (Pre-Collision, Lane Departure, Radar Cruise)',
      'Power Tailgate with Hands-Free Foot Kick Sensor',
      'Sequential LED Signal Lamps Front & Rear',
      '3-Row Digital Auto Climate Control',
      'Includes 2 Smart Keys, Complete Booklet, and Tools'
    ],
    inspectionHighlights: [
      { name: 'Turbo Diesel Boost & Intercooler Seal', score: 'Pass (Factory Performance)' },
      { name: 'Transmission Fluid Quality & Shifts', score: 'Pass (Pristine)' },
      { name: 'Brake Pads & Electronic Parking Brake', score: 'Pass (90% Remaining)' },
      { name: 'Air Conditioning Dual Evaporator Cooling', score: 'Pass (Cold @ 16°C)' },
      { name: 'Full Underhood Electrical Harness Test', score: 'Pass (Untouched Factory Wire)' }
    ]
  },
  {
    id: 'altis-2022',
    name: '2022 Toyota Corolla Altis Hybrid',
    make: 'Toyota',
    model: 'Corolla Altis',
    trim: '1.8V Hybrid',
    year: 2022,
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    price: '₱1,180,000',
    priceNumeric: 1180000,
    monthly: '₱19,300/mo',
    badge: 'Hybrid / Coding-Free',
    mileage: '22,500 KM',
    fuel: 'Hybrid Electric (Self-Charging)',
    transmission: 'Electronically Controlled CVT (e-CVT)',
    engine: '1.8L 2ZR-FXE Atkinson Cycle + Electric Motor',
    drivetrain: 'Front-Wheel Drive',
    power: '122 PS Total System Output',
    torque: '142 Nm Engine + 163 Nm Motor',
    seating: '5 Passengers',
    color: 'Celestite Gray Metallic',
    plateEnding: '7 (Thursday Coding - Number Coding Exempt!)',
    orCrStatus: 'Clean LTO Documents, EV/Hybrid Coding Exempt Badge',
    images: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Beat Metro Manila traffic and fuel prices. This Altis Hybrid delivers up to 24+ km/L in city conditions and is completely EXEMPT from MMDA Number Coding under the Electric Vehicle Industry Development Act (EVIDA Law). Whisper-quiet EV mode drive, TNGA platform high-stability chassis, and 8-year official Toyota hybrid battery warranty.',
    features: [
      '100% Number Coding Exempt Nationwide (EVIDA Law)',
      '24+ km/L Real-World Manila City Fuel Mileage',
      'Self-Charging Hybrid (No Plugs or Charging Stations Needed)',
      'Toyota Safety Sense 2.0 with Full Speed Adaptive Cruise',
      '7-inch Digital Multi-Info Display',
      'EV Mode, Eco Mode, Normal & Power Drive Modes',
      '8-Year Toyota Manufacturer Hybrid Battery Warranty',
      'Fresh 4x Michelin Primacy Tires'
    ],
    inspectionHighlights: [
      { name: 'Hybrid High-Voltage Battery Cell Health', score: 'Pass (100% SOH)' },
      { name: 'Inverter Cooling System & Regenerative Braking', score: 'Pass (Factory Spec)' },
      { name: 'Atkinson Engine Oil & Spark Ignition', score: 'Pass (Clean)' },
      { name: 'Cabin Air Filter & Nanoe Air Purification', score: 'Pass (Sanitized)' },
      { name: 'Suspension Struts & Rear Double Wishbone', score: 'Pass (Compliant & Smooth)' }
    ]
  },
  {
    id: 'bmw-2023',
    name: '2023 BMW 320i M Sport',
    make: 'BMW',
    model: '3 Series',
    trim: '320i M Sport LCI',
    year: 2023,
    category: 'premium',
    categoryLabel: 'Premium Collection',
    price: '₱3,150,000',
    priceNumeric: 3150000,
    monthly: '₱51,600/mo',
    badge: 'EXECUTIVE LUXURY',
    mileage: '9,800 KM',
    fuel: 'Gasoline',
    transmission: '8-Speed Steptronic Sport Automatic',
    engine: '2.0L BMW TwinPower Turbo 4-Cylinder',
    drivetrain: 'Rear-Wheel Drive (50:50 Axle Balance)',
    power: '184 HP @ 5,000-6,500 rpm',
    torque: '300 Nm @ 1,350-4,000 rpm',
    seating: '5 Passengers',
    color: 'Portimao Blue Metallic',
    plateEnding: '9 (Friday Coding)',
    orCrStatus: 'Casa Official Philippine Unit, BMW BSI Warranty Active',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The undisputed benchmark of the executive sports sedan segment. Facelifted LCI model featuring BMW’s state-of-the-art Curved Display running iDrive 8 operating system, M Sport body styling with high-gloss Shadowline package, M leather steering wheel, Alcantara/Sensatec sport seating, and 18-inch M Double-spoke bicolour wheels. Only 9,800 pampered kilometers and covered by BMW Service Inclusive (BSI).',
    features: [
      'BMW Curved Display (12.3" Cluster + 14.9" Central Screen)',
      'iDrive 8 Operating System with Intelligent Voice Assistant',
      'M Sport Aerodynamics Package & Shadowline Trim',
      'M Sport Suspension with Variable Sport Steering',
      'Ambient Interior Lighting with 11 Selectable Colors',
      'Park Distance Control with Reversing Assist Memory',
      'Wireless Apple CarPlay & Android Auto Integration',
      'Active BMW Service Inclusive (BSI) Comprehensive Warranty'
    ],
    inspectionHighlights: [
      { name: 'TwinPower Turbo Boost & Valvetronic Check', score: 'Pass (Faultless)' },
      { name: '8-Speed ZF Transmission Shift Dynamics', score: 'Pass (Crisp & Instant)' },
      { name: 'M Sport Disc Rotors & Performance Calipers', score: 'Pass (95% Life)' },
      { name: 'BMW Diagnostic ISTA Computer Scan', score: 'Pass (0 Stored Errors)' },
      { name: 'Paint Thickness Meter (Factory Original Paint)', score: 'Pass (Verified)' }
    ]
  },
  {
    id: 'montero-2022',
    name: '2022 Mitsubishi Montero Sport GT',
    make: 'Mitsubishi',
    model: 'Montero Sport',
    trim: 'GT 4x2 AT',
    year: 2022,
    category: 'suv',
    categoryLabel: 'Family SUV',
    price: '₱1,650,000',
    priceNumeric: 1650000,
    monthly: '₱27,000/mo',
    badge: 'GREAT VALUE',
    mileage: '28,000 KM',
    fuel: 'Diesel',
    transmission: '8-Speed Automatic with Sport Mode',
    engine: '2.4L 4N15 MIVEC Clean Diesel',
    drivetrain: 'Rear-Wheel Drive',
    power: '181 PS @ 3,500 rpm',
    torque: '430 Nm @ 2,500 rpm',
    seating: '7 Passengers',
    color: 'White Diamond Pearl',
    plateEnding: '3 (Tuesday Coding)',
    orCrStatus: 'Clean Title, 1st Owner, Casa Recorded',
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Smooth riding 7-seater SUV with electronic tailgate, power sunroof, and active stability and traction control. Perfect for families looking for maximum utility and low maintenance cost.',
    features: [
      'Power Tilt & Slide Sunroof',
      '8-inch Digital Color LCD Instrument Meter',
      'Electric Tailgate with Hands-Free Kick Motion',
      'Forward Collision Mitigation & Blind Spot Warning',
      'Dual-Zone Automatic Climate Control with Rear Vents',
      'Nanoe Air Purification System',
      'Leather Upholstery with 8-Way Power Driver Seat',
      'Zero Flood & Accident Warranty Guarantee'
    ],
    inspectionHighlights: [
      { name: 'MIVEC Variable Valve Timing & Turbo Unit', score: 'Pass (Optimal)' },
      { name: 'Aisin 8-Speed Automatic Gearbox', score: 'Pass (Smooth Transitions)' },
      { name: 'Suspension Bushings & Ball Joints', score: 'Pass (Tight)' },
      { name: 'Electrical Window Regulators & Sunroof Seal', score: 'Pass (Water-Tight)' },
      { name: 'Original Title & Verified Clean Records', score: 'Pass (Verified)' }
    ]
  },
  {
    id: 'ranger-2022',
    name: '2022 Ford Ranger Wildtrak 4x4',
    make: 'Ford',
    model: 'Ranger',
    trim: 'Wildtrak 4x4 AT',
    year: 2022,
    category: 'truck',
    categoryLabel: 'Work & Utility',
    price: '₱1,580,000',
    priceNumeric: 1580000,
    monthly: '₱25,900/mo',
    badge: 'OFF-ROAD READY',
    mileage: '24,000 KM',
    fuel: 'Diesel',
    transmission: '10-Speed Automatic',
    engine: '2.0L Bi-Turbo Diesel',
    drivetrain: '4WD with Electronic Shift-on-the-Fly',
    power: '213 PS @ 3,750 rpm',
    torque: '500 Nm @ 1,750-2,000 rpm',
    seating: '5 Passengers',
    color: 'Saber Orange Metallic',
    plateEnding: '5 (Wednesday Coding)',
    orCrStatus: 'Clean Title, Privately Owned',
    images: [
      'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic Saber Orange Wildtrak with power roller shutter, cyber orange interior stitching, terrain management system, and legendary 500 Nm pulling power. Complete with factory roll bar and 18-inch wheels.',
    features: [
      'Power Roller Bed Shutter with Keyfob Remote',
      'Terrain Management System with Lockable Rear Diff',
      'Sync 3 with Apple CarPlay and Android Auto',
      'Wildtrak Embossed Leather Seats with Orange Accents',
      'Active Park Assist (Semi-Autonomous Parking)',
      'Autonomous Emergency Braking with Pedestrian Detection',
      'Heavy Duty Tow Hitch Receiver Included',
      'Fresh Fluids & Fully Inspected Mechanics'
    ],
    inspectionHighlights: [
      { name: 'Bi-Turbo Seals & Intercooler Hoses', score: 'Pass (Inspected & Dry)' },
      { name: '10-Speed Shift Solenoids & Fluid Level', score: 'Pass (Excellent)' },
      { name: 'Driveshafts & CV Boots', score: 'Pass (No Tears or Play)' },
      { name: 'Brake Disc Runout & Friction Material', score: 'Pass (90% Remaining)' },
      { name: 'Clean Title & Registration Validity', score: 'Pass (Registered)' }
    ]
  },
  {
    id: 'mazda3-2023',
    name: '2023 Mazda 3 Fastback Sport',
    make: 'Mazda',
    model: 'Mazda 3',
    trim: 'Fastback 2.0 Sport',
    year: 2023,
    category: 'sedan',
    categoryLabel: 'Daily Commuter',
    price: '₱1,320,000',
    priceNumeric: 1320000,
    monthly: '₱21,600/mo',
    badge: 'PREMIUM INTERIOR',
    mileage: '16,800 KM',
    fuel: 'Gasoline',
    transmission: '6-Speed SkyActiv-Drive AT with Sport Mode',
    engine: '2.0L SkyActiv-G High-Compression Petrol',
    drivetrain: 'Front-Wheel Drive',
    power: '155 PS @ 6,000 rpm',
    torque: '200 Nm @ 4,000 rpm',
    seating: '5 Passengers',
    color: 'Soul Red Crystal Metallic',
    plateEnding: '2 (Monday Coding)',
    orCrStatus: 'Free 5-Year Yojin Service Plan Active at Casa',
    images: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Winner of the World Car Design of the Year. Sculptural Soul Red Crystal paintwork with red leather interior, 12-speaker Bose acoustic system, full color active driving display (HUD), and G-Vectoring Control Plus for supreme cornering agility.',
    features: [
      'Soul Red Crystal Multi-Coat Signature Finish',
      'Burgundy Red Leather Interior with Contrast Stitching',
      'Windshield-Projected Full Color Active Head-Up Display',
      'Bose 12-Speaker Sound System with Centerpoint',
      '360-Degree View Monitor with Dynamic Guidelines',
      'Free 5-Year Mazda Yojin Maintenance (Zero Cost Service)',
      'Radar Cruise Control & Smart City Brake Support',
      'Frameless Auto-Dimming Rearview Mirror'
    ],
    inspectionHighlights: [
      { name: 'SkyActiv-G Compression & Ignition', score: 'Pass (100% Factory Spec)' },
      { name: 'G-Vectoring Chassis Stability Electronics', score: 'Pass (Fully Functional)' },
      { name: 'HUD Alignment & Optical Clarity', score: 'Pass (Calibrated)' },
      { name: 'Full Exterior Paint Meter Readings', score: 'Pass (Factory Original Paint)' },
      { name: 'Service Record & Maintenance Logs', score: 'Pass (Up to Date)' }
    ]
  },
  {
    id: 'mercedes-2022',
    name: '2022 Mercedes-Benz GLA 200 AMG Line',
    make: 'Mercedes-Benz',
    model: 'GLA-Class',
    trim: 'GLA 200 AMG Line',
    year: 2022,
    category: 'premium',
    categoryLabel: 'Premium Collection',
    price: '₱2,850,000',
    priceNumeric: 2850000,
    monthly: '₱46,700/mo',
    badge: 'AMG STYLING',
    mileage: '15,200 KM',
    fuel: 'Gasoline',
    transmission: '7G-DCT 7-Speed Dual Clutch Automatic',
    engine: '1.3L Turbocharged 4-Cylinder',
    drivetrain: 'Front-Wheel Drive',
    power: '163 HP @ 5,500 rpm',
    torque: '250 Nm @ 1,620-4,000 rpm',
    seating: '5 Passengers',
    color: 'Iridium Silver Metallic',
    plateEnding: '0 (Friday Coding)',
    orCrStatus: 'Clean LTO Records, Dealer Sourced Unit',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Compact luxury SUV with undeniable presence. AMG Line body styling with diamond radiator grille with chrome pins, 19-inch 5-twin-spoke AMG alloys, dual 10.25-inch high-resolution MBUX screens, 64-color customizable ambient lighting, and artico/dinamica microfibre sport upholstery.',
    features: [
      'AMG Line Exterior & Interior Aerodynamics Pack',
      'Diamond Grille with Chrome Pins & AMG Sport Bumpers',
      'Dual 10.25-inch Widescreen Cockpit Display with MBUX',
      '64-Color Ambient Lighting with Illuminated Air Vents',
      'Dynamic Select with Individual Driving Modes',
      'Active Brake Assist & Attention Assist',
      'Keyless-Go Convenience Package with Hands-Free Boot',
      'Complete Dealer Service Records & Extra Key'
    ],
    inspectionHighlights: [
      { name: '1.3L Turbo Boost & Dual Clutch Actuators', score: 'Pass (Smooth & Fast)' },
      { name: 'MBUX Dual 10.25" Screens & Ambient LEDs', score: 'Pass (100% Operational)' },
      { name: 'AMG Ventilated Braking Hardware', score: 'Pass (85% Thickness)' },
      { name: 'Suspension Comfort & Dynamic Dampers', score: 'Pass (No Leaks)' },
      { name: 'Accident, Flood & Odometer Tamper Check', score: 'Pass (100% Certified)' }
    ]
  },
  {
    id: 'navara-2022',
    name: '2022 Nissan Navara PRO-4X 4x4',
    make: 'Nissan',
    model: 'Navara',
    trim: 'PRO-4X 4x4 AT',
    year: 2022,
    category: 'truck',
    categoryLabel: 'Work & Utility',
    price: '₱1,490,000',
    priceNumeric: 1490000,
    monthly: '₱24,400/mo',
    badge: 'MULTI-LINK SUSPENSION',
    mileage: '29,100 KM',
    fuel: 'Diesel',
    transmission: '7-Speed Automatic with Manual Mode',
    engine: '2.5L YD25 High-Output Twin-Turbo Diesel',
    drivetrain: '4WD with Electronic Locking Rear Differential',
    power: '190 PS @ 3,600 rpm',
    torque: '450 Nm @ 2,000 rpm',
    seating: '5 Passengers',
    color: 'Stealth Gray',
    plateEnding: '6 (Wednesday Coding)',
    orCrStatus: 'Clean Title, 1st Owner, Private Daily Vehicle',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The smoothest riding pickup truck in the class thanks to its exclusive rear multi-link coil spring suspension. Finished in sought-after Stealth Gray with black emblem styling, lava orange accents, Nissan Zero Gravity seats, and intelligent around-view monitor with off-road monitor mode.',
    features: [
      'Exclusive Rear Multi-Link Coil Spring Suspension',
      'Intelligent Around View Monitor (360 Camera) with Off-Road Mode',
      'PRO-4X Exclusive Black Badging with Lava Orange Accents',
      'NASA-Inspired Zero Gravity Front Seats',
      'Electronic Locking Rear Differential',
      'Nissan Intelligent Mobility Safety Shield',
      'Factory Drop-In Bedliner & Utili-Track Tie Downs',
      'Clean Documents and Direct Bank Financing Assistance'
    ],
    inspectionHighlights: [
      { name: 'Twin Turbo Wastegate & Intercooler Core', score: 'Pass (Optimal Pressure)' },
      { name: '7-Speed Transmission Valve Body', score: 'Pass (Pristine)' },
      { name: 'Rear Multi-Link Coil Springs & Bushings', score: 'Pass (Zero Play / Squeaks)' },
      { name: 'Transfer Case 4H/4L Engagement Speed', score: 'Pass (Immediate)' },
      { name: 'Vehicle History & Anti-Flood Guarantee', score: 'Pass (Certified Safe)' }
    ]
  },
  {
    id: 'lexus-2021',
    name: '2021 Lexus NX 300 F-Sport',
    make: 'Lexus',
    model: 'NX',
    trim: 'NX 300 F-Sport AWD',
    year: 2021,
    category: 'premium',
    categoryLabel: 'Premium Collection',
    price: '₱2,650,000',
    priceNumeric: 2650000,
    monthly: '₱43,400/mo',
    badge: 'JAPANESE LUXURY',
    mileage: '21,000 KM',
    fuel: 'Gasoline',
    transmission: '6-Speed Multi-Mode Automatic',
    engine: '2.0L Twin-Scroll Turbocharged 4-Cylinder',
    drivetrain: 'All-Weather All-Wheel Drive (AWD)',
    power: '235 HP @ 4,800-5,600 rpm',
    torque: '350 Nm @ 1,650-4,000 rpm',
    seating: '5 Passengers',
    color: 'Ultra White with Flare Red Leather',
    plateEnding: '8 (Thursday Coding)',
    orCrStatus: 'Casa Maintained at Lexus Manila BGC, Complete Records',
    images: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Impeccable Takumi Japanese craftsmanship. Featuring the iconic F-Sport Spindle Grille, Adaptive Variable Suspension (AVS), Flare Red perforated sport leather seats with integrated foam construction, Mark Levinson premium surround sound system, and panoramic moonroof. Full documented service records exclusively at Lexus Manila in Bonifacio Global City.',
    features: [
      'F-Sport Tuned Adaptive Variable Suspension (AVS)',
      'Mark Levinson 14-Speaker High-Resolution Sound System',
      'Panoramic Glass Moonroof with Electric Sunshade',
      'Flare Red & Black Perforated Leather F-Sport Seats',
      'Triple-Beam LED Headlamps with Adaptive High Beam',
      'Hands-Free Power Liftgate with Kick Sensor',
      'Lexus Safety System+ with Dynamic Radar Cruise',
      'Freshly Ceramic Coated & Full Lexus Manila Casa Records'
    ],
    inspectionHighlights: [
      { name: 'Twin-Scroll Turbocharger & Wastegate', score: 'Pass (100% Factory Output)' },
      { name: 'Adaptive Variable Suspension Actuators', score: 'Pass (Flawless Response)' },
      { name: 'AWD Rear Differential & Coupler', score: 'Pass (Smooth Engagement)' },
      { name: 'Exhaust System & Catalytic Converters', score: 'Pass (Clean Emissions)' },
      { name: 'Complete Certified Anti-Flood & Title Audit', score: 'Pass (100% Certified)' }
    ]
  }
];

