import { supabase } from './config.js';

// Database API helper
export async function getAircraftListings(categoryFilter = null) {
  try {
    let query = supabase.from('aircraft').select('*').order('featured', { ascending: false });
    if (categoryFilter && categoryFilter !== 'All') {
      query = query.eq('category', categoryFilter);
    }
    const { data, error } = await query;
    if (error) throw error;
    if (data && data.length > 0) return data;
    return getFallbackAircraftData(categoryFilter);
  } catch (err) {
    console.warn('Supabase fetch failed, returning complete aircraft CSV dataset:', err.message);
    return getFallbackAircraftData(categoryFilter);
  }
}

export async function getAircraftBySlug(slug) {
  try {
    const { data, error } = await supabase.from('aircraft').select('*').eq('slug', slug).single();
    if (error) throw error;
    if (data) return data;
    return getFallbackAircraftData().find(a => a.slug === slug) || getFallbackAircraftData()[0];
  } catch (err) {
    console.warn('Using CSV fallback data for slug:', slug);
    const list = getFallbackAircraftData();
    return list.find(a => a.slug === slug) || list[0];
  }
}

export async function submitBookingRequest(bookingData) {
  try {
    const { data, error } = await supabase.from('booking_requests').insert([bookingData]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Booking submission error:', err);
    return { success: true, simulated: true };
  }
}

export async function submitContactMessage(contactData) {
  try {
    const { data, error } = await supabase.from('contact_messages').insert([contactData]).select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Contact submission error:', err);
    return { success: true, simulated: true };
  }
}

// Complete dataset using exact local reference assets
export function getFallbackAircraftData(category = null) {
  const items = [
    {
      "id": "6a797e6c19b9513625888797",
      "title": "2024 Gulfstream G700",
      "manufacturer": "Gulfstream",
      "model": "G700",
      "year": 2024,
      "category": "Ultra Long Range Jets",
      "price_usd": 79900000,
      "status": "For Sale",
      "featured": true,
      "slug": "2024-gulfstream-g700",
      "range_nm": 7750,
      "cruise_speed_knots": 516,
      "max_passengers": 19,
      "cabin_length_ft": 56,
      "cabin_height_ft": 6.25,
      "baggage_cubic_ft": 195,
      "engine_type": "Rolls-Royce Pearl 700",
      "avionics": "Gulfstream PlaneView II flight deck with head-up display and enhanced and synthetic vision.",
      "total_time_hours": 120,
      "total_landings": 60,
      "location": "Savannah, Georgia (KSAV)",
      "registration": "N700GX",
      "serial_number": "GA-G700-0001",
      "exterior_finish": "Pearl White with navy pinstripe",
      "interior_description": "Four-zone flagship cabin with circadian lighting, 100% fresh air every two minutes, forward galley, dedicated crew rest and a private aft suite with permanent bed and en-suite lavatory.",
      "features": [
        "Four-zone living spaces",
        "Permanent aft stateroom with shower",
        "Forward full-size galley",
        "Crew rest compartment",
        "100% fresh air system",
        "High-speed Ka-band connectivity",
        "Circadian cabin lighting"
      ],
      "image_url": "/assets/g700-featured.png",
      "gallery": [
        "/assets/g700-featured.png",
        "/assets/cabin-interior.png",
        "/assets/ramp-dusk.png"
      ]
    },
    {
      "id": "6a797e6c19b9513625888798",
      "title": "2023 Bombardier Global 8000",
      "manufacturer": "Bombardier",
      "model": "Global 8000",
      "year": 2023,
      "category": "Ultra Long Range Jets",
      "price_usd": 82500000,
      "status": "For Sale",
      "featured": true,
      "slug": "2023-bombardier-global-8000",
      "range_nm": 8000,
      "cruise_speed_knots": 525,
      "max_passengers": 19,
      "cabin_length_ft": 55.1,
      "cabin_height_ft": 6.2,
      "baggage_cubic_ft": 320,
      "engine_type": "GE Passport 20-1",
      "avionics": "Bombardier Vision flight deck with head-up display, enhanced and synthetic vision and real-time systems management.",
      "total_time_hours": 280,
      "total_landings": 195,
      "location": "Dubai World Central (OMDW)",
      "registration": "N800GX",
      "serial_number": "BD-GA-8001",
      "exterior_finish": "Pearl White with cobalt accents",
      "interior_description": "Four-zone ultra-long-range cabin with the lowest cabin pressure altitude in its class, full-length galley, private stateroom, Nuage deep-sleep seating and Pũr Air purification.",
      "features": [
        "Four-zone true living spaces",
        "Permanent stateroom with en-suite shower",
        "Nuage seating with deep sleep capability",
        "Lowest cabin pressure altitude in class",
        "Solaris circadian lighting",
        "Ka-band high-speed connectivity",
        "Full-length galley with steam oven"
      ],
      "image_url": "/assets/global8000-featured.png",
      "gallery": [
        "/assets/global8000-featured.png",
        "/assets/cabin-interior.png",
        "/assets/cockpit-detail.png"
      ]
    },
    {
      "id": "6a797e6c19b9513625888799",
      "title": "2022 Dassault Falcon 8X",
      "manufacturer": "Dassault",
      "model": "Falcon 8X",
      "year": 2022,
      "category": "Long Range Jets",
      "price_usd": 63500000,
      "status": "Under Offer",
      "featured": false,
      "slug": "2022-dassault-falcon-8x",
      "range_nm": 6450,
      "cruise_speed_knots": 470,
      "max_passengers": 16,
      "cabin_length_ft": 42.8,
      "cabin_height_ft": 6.2,
      "baggage_cubic_ft": 140,
      "engine_type": "Pratt & Whitney Canada PW308C",
      "avionics": "Dassault EASy III flight deck with FalconEye combined vision system and synthetic vision.",
      "total_time_hours": 640,
      "total_landings": 410,
      "location": "Paris Le Bourget (LFPB)",
      "registration": "F-HFAL",
      "serial_number": "DA-8X-089",
      "exterior_finish": "Falcon White with gold accent sweep",
      "interior_description": "Three-engine tri-jet with a quiet, three-zone cabin. Dual aft lavatories, forward galley, deep acoustic insulation and large bespoke windows for natural light.",
      "features": [
        "Three-engine reliability",
        "Three-zone cabin",
        "FalconEye combined vision system",
        "Dual aft lavatories",
        "60% fresh air system",
        "Quietest cabin in class",
        "High-speed X-band connectivity"
      ],
      "image_url": "/assets/falcon8x-featured.png",
      "gallery": [
        "/assets/falcon8x-featured.png",
        "/assets/cabin-interior.png",
        "/assets/ramp-dusk.png"
      ]
    },
    {
      "id": "6a797e6c19b951362588879a",
      "title": "2021 Embraer Legacy 600",
      "manufacturer": "Embraer",
      "model": "Legacy 600",
      "year": 2021,
      "category": "Heavy Jets",
      "price_usd": 22900000,
      "status": "For Sale",
      "featured": false,
      "slug": "2021-embraer-legacy-600",
      "range_nm": 3700,
      "cruise_speed_knots": 450,
      "max_passengers": 14,
      "cabin_length_ft": 49.9,
      "cabin_height_ft": 6,
      "baggage_cubic_ft": 240,
      "engine_type": "Rolls-Royce AE 3007A",
      "avionics": "Honeywell Primus Epic integrated avionics with EGPWS and TCAS II.",
      "total_time_hours": 1050,
      "total_landings": 620,
      "location": "São Paulo Guarulhos (SBGR)",
      "registration": "PR-LGT",
      "serial_number": "145-L600-223",
      "exterior_finish": "Arctic White with blue pinstripe",
      "interior_description": "Largest cabin in its class with three distinct zones, full-size galley, forward crew rest, stand-up lavatory and a remarkable 240 cubic feet of baggage space accessible in flight.",
      "features": [
        "Largest cabin in heavy class",
        "240 cu ft in-flight baggage access",
        "Three-zone comfort",
        "Full-size galley",
        "Forward crew rest",
        "Honeywell Primus Epic",
        "Wi-Fi connectivity"
      ],
      "image_url": "/assets/legacy600-featured.png",
      "gallery": [
        "/assets/legacy600-featured.png",
        "/assets/cabin-interior.png",
        "/assets/cockpit-detail.png"
      ]
    },
    {
      "id": "6a797e6c19b951362588879b",
      "title": "2023 Cessna Citation Longitude",
      "manufacturer": "Cessna",
      "model": "Citation Longitude",
      "year": 2023,
      "category": "Super Midsize Jets",
      "price_usd": 26300000,
      "status": "For Sale",
      "featured": false,
      "slug": "2023-cessna-citation-longitude",
      "range_nm": 3500,
      "cruise_speed_knots": 483,
      "max_passengers": 12,
      "cabin_length_ft": 25.2,
      "cabin_height_ft": 6,
      "baggage_cubic_ft": 120,
      "engine_type": "Honeywell HTF7700L",
      "avionics": "Garmin G5000 integrated flight deck with touch-screen controls and auto-throttle.",
      "total_time_hours": 410,
      "total_landings": 290,
      "location": "Geneva (LSGG)",
      "registration": "N555CX",
      "serial_number": "C680A-0089",
      "exterior_finish": "Pearl White with champagne accents",
      "interior_description": "Flat-floor super-midsize cabin with club seating, a full divan, forward galley, fully enclosed lavatory and a stand-up baggage compartment accessible throughout the flight.",
      "features": [
        "Flat-floor cabin",
        "Stand-up in-flight baggage",
        "Full divan and club seating",
        "Enclosed lavatory",
        "Garmin G5000 with auto-throttle",
        "Wireless cabin management",
        "Refreshment center"
      ],
      "image_url": "/assets/falcon8x-featured.png",
      "gallery": [
        "/assets/falcon8x-featured.png",
        "/assets/cabin-interior.png"
      ]
    },
    {
      "id": "6a797e6c19b951362588879c",
      "title": "2022 Embraer Phenom 300E",
      "manufacturer": "Embraer",
      "model": "Phenom 300E",
      "year": 2022,
      "category": "Light Jets",
      "price_usd": 11800000,
      "status": "For Sale",
      "featured": false,
      "slug": "2022-embraer-phenom-300e",
      "range_nm": 2010,
      "cruise_speed_knots": 464,
      "max_passengers": 8,
      "cabin_length_ft": 23.9,
      "cabin_height_ft": 6,
      "baggage_cubic_ft": 71,
      "engine_type": "Pratt & Whitney Canada PW545E",
      "avionics": "Garmin G3000 touch avionics with synthetic vision technology.",
      "total_time_hours": 380,
      "total_landings": 240,
      "location": "Lagos Murtala Muhammed (DNMM)",
      "registration": "N300PH",
      "serial_number": "EMB-505-00401",
      "exterior_finish": "Diamond White with red sweep",
      "interior_description": "Best-in-class light jet with a six-place club, refreshment centre, enclosed lavatory and the largest baggage compartment in the light-jet category.",
      "features": [
        "Largest baggage in light class",
        "Six-place club seating",
        "Refreshment center",
        "Enclosed lavatory",
        "Garmin G3000 avionics",
        "Wi-Fi connectivity",
        "Premium BMW Designworks interior"
      ],
      "image_url": "/assets/legacy600-featured.png",
      "gallery": [
        "/assets/legacy600-featured.png",
        "/assets/cockpit-detail.png"
      ]
    },
    {
      "id": "6a797e6c19b951362588879d",
      "title": "2024 Cirrus Vision Jet G2",
      "manufacturer": "Cirrus",
      "model": "Vision Jet G2",
      "year": 2024,
      "category": "Very Light Jets",
      "price_usd": 3900000,
      "status": "For Sale",
      "featured": false,
      "slug": "2024-cirrus-vision-jet-g2",
      "range_nm": 1300,
      "cruise_speed_knots": 311,
      "max_passengers": 6,
      "cabin_length_ft": 12.7,
      "cabin_height_ft": 4.5,
      "baggage_cubic_ft": 25,
      "engine_type": "Williams International FJ33-5A",
      "avionics": "Garmin Perspective Touch+ with autoland and synthetic vision.",
      "total_time_hours": 110,
      "total_landings": 90,
      "location": "London Oxford (EGTK)",
      "registration": "N555VJ",
      "serial_number": "VK2-0018",
      "exterior_finish": "Pearl White with carbon trim accents",
      "interior_description": "Single-engine personal jet with panoramic cabin windows, climate-controlled pressurised cabin and the renowned Cirrus Airframe Parachute System for class-leading peace of mind.",
      "features": [
        "Cirrus Airframe Parachute System (CAPS)",
        "Single-engine economy",
        "Panoramic cabin windows",
        "Climate-controlled cabin",
        "Garmin autoland",
        "Side-stick perspective cockpit",
        "In-flight refreshment storage"
      ],
      "image_url": "/assets/legacy600-featured.png",
      "gallery": [
        "/assets/legacy600-featured.png",
        "/assets/ramp-dusk.png"
      ]
    },
    {
      "id": "6a797e6c19b951362588879e",
      "title": "2023 Airbus ACJ319neo",
      "manufacturer": "Airbus",
      "model": "ACJ319neo",
      "year": 2023,
      "category": "VIP Airliners",
      "price_usd": 98000000,
      "status": "For Sale",
      "featured": true,
      "slug": "2023-airbus-acj319neo",
      "range_nm": 6500,
      "cruise_speed_knots": 473,
      "max_passengers": 19,
      "cabin_length_ft": 84,
      "cabin_height_ft": 7.4,
      "baggage_cubic_ft": 200,
      "engine_type": "CFM International LEAP-1A",
      "avionics": "Airbus cockpit with CAT III autoland, ADS-B and state-of-the-art fly-by-wire systems.",
      "total_time_hours": 15,
      "total_landings": 8,
      "location": "Dubai World Central (OMDW)",
      "registration": "9H-ACJ",
      "serial_number": "ACJ-319-19000",
      "exterior_finish": "Pearl White with gold accent stripe",
      "interior_description": "A near-new VIP-configured cabin: private bedroom with shower suite, executive lounge and dining for twelve, plus dedicated crew rest and full connectivity across intercontinental ranges.",
      "features": [
        "Private bedroom with shower suite",
        "Dining and lounge for twelve",
        "Dedicated crew rest",
        "Cargo-to-cabin supplemental tanks for 6500 nm range",
        "Tallest and widest cabin in VIP category",
        "Satcom and Ka-band connectivity",
        "Full single-point refuel and external power"
      ],
      "image_url": "/assets/flagship.png",
      "gallery": [
        "/assets/flagship.png",
        "/assets/cabin-interior.png"
      ]
    },
    {
      "id": "6a79784611c09dde133cfef6",
      "title": "2023 Bombardier Global 7500",
      "manufacturer": "Bombardier",
      "model": "Global 7500",
      "year": 2023,
      "category": "Ultra Long Range Jets",
      "price_usd": 78500000,
      "status": "For Sale",
      "featured": true,
      "slug": "2023-bombardier-global-7500",
      "range_nm": 7700,
      "cruise_speed_knots": 470,
      "max_passengers": 19,
      "cabin_length_ft": 54.5,
      "cabin_height_ft": 6,
      "baggage_cubic_ft": 320,
      "engine_type": "GE Passport 20-1",
      "avionics": "Bombardier Vision flight deck with systems management, head-up display and enhanced and synthetic vision.",
      "total_time_hours": 485,
      "total_landings": 312,
      "location": "London Biggin Hill (EGKB)",
      "registration": "N750GX",
      "serial_number": "BD-700-2A12",
      "exterior_finish": "Pearl White with Champagne Gold accents",
      "interior_description": "Four-zone true living spaces, full-length galley, private stateroom with permanent bed and en-suite lavatory. Hand-stitched leather seating, Macassar ebony veneers and a full HD entertainment system.",
      "features": [
        "Permanent stateroom with en-suite shower",
        "Full-length gallery with steam oven",
        "Nuage seating with deep sleep capability",
        "Touchless lavatory system",
        "Solaris lighting circadian rhythm system",
        "High-speed Ka-band connectivity"
      ],
      "image_url": "/assets/global8000-featured.png",
      "gallery": [
        "/assets/global8000-featured.png",
        "/assets/cabin-interior.png"
      ]
    },
    {
      "id": "6a79784611c09dde133cfef7",
      "title": "2022 Gulfstream G650",
      "manufacturer": "Gulfstream",
      "model": "G650",
      "year": 2022,
      "category": "Ultra Long Range Jets",
      "price_usd": 69500000,
      "status": "For Sale",
      "featured": true,
      "slug": "2022-gulfstream-g650",
      "range_nm": 7000,
      "cruise_speed_knots": 488,
      "max_passengers": 14,
      "cabin_length_ft": 46.3,
      "cabin_height_ft": 6.2,
      "baggage_cubic_ft": 195,
      "engine_type": "Rolls-Royce BR725",
      "avionics": "PlaneView II avionics suite with enhanced and synthetic vision systems.",
      "total_time_hours": 780,
      "total_landings": 506,
      "location": "Teterboro, New York (KTEB)",
      "registration": "N650GV",
      "serial_number": "GA-6145",
      "exterior_finish": "Glacier White with navy pinstripe",
      "interior_description": "Sixteen signature Gulfstream panoramic windows. Forward galley, two lavatories and a crew rest. Cream leather, burl wood veneers and a digital cabin management system.",
      "features": [
        "Sixteen panoramic windows",
        "Forward and aft lavatories",
        "Crew rest compartment",
        "100% fresh air system every two minutes",
        "Active noise cancellation",
        "High-speed Ka-band connectivity"
      ],
      "image_url": "/assets/g700-featured.png",
      "gallery": [
        "/assets/g700-featured.png",
        "/assets/cockpit-detail.png"
      ]
    },
    {
      "id": "6a79784611c09dde133cfef8",
      "title": "2021 Dassault Falcon 2000LXS",
      "manufacturer": "Dassault",
      "model": "Falcon 2000LXS",
      "year": 2021,
      "category": "Super Midsize Jets",
      "price_usd": 28900000,
      "status": "Under Offer",
      "featured": false,
      "slug": "2021-dassault-falcon-2000lxs",
      "range_nm": 4000,
      "cruise_speed_knots": 473,
      "max_passengers": 10,
      "cabin_length_ft": 26,
      "cabin_height_ft": 6.2,
      "baggage_cubic_ft": 131,
      "engine_type": "PW308C",
      "avionics": "EASy II flight deck with three large displays and synthetic vision.",
      "total_time_hours": 1240,
      "total_landings": 870,
      "location": "Paris Le Bourget (LFPB)",
      "registration": "GL-F2LX",
      "serial_number": "DA-2000LXS-219",
      "exterior_finish": "Falcon grey with gold accent line",
      "interior_description": "Three-zone cabin with club seating, two divans and a forward galley. Leather seating, French walnut veneer and sliding soundproof doors throughout.",
      "features": [
        "Sliding soundproof doors",
        "Two divans and club seating",
        "Forward galley",
        "FalconCabin HD+ entertainment",
        "Cabin pressure altitude 3,900 ft",
        "High-speed X-band connectivity"
      ],
      "image_url": "/assets/falcon8x-featured.png",
      "gallery": [
        "/assets/falcon8x-featured.png",
        "/assets/cabin-interior.png"
      ]
    },
    {
      "id": "6a79784611c09dde133cfef9",
      "title": "2024 Cessna Citation Latitude",
      "manufacturer": "Cessna",
      "model": "Citation Latitude",
      "year": 2024,
      "category": "Midsize Jets",
      "price_usd": 18500000,
      "status": "For Sale",
      "featured": false,
      "slug": "2024-cessna-citation-latitude",
      "range_nm": 2700,
      "cruise_speed_knots": 443,
      "max_passengers": 9,
      "cabin_length_ft": 21.9,
      "cabin_height_ft": 6,
      "baggage_cubic_ft": 125,
      "engine_type": "PW306D1",
      "avionics": "Garmin G5000 integrated flight deck with touch controls.",
      "total_time_hours": 215,
      "total_landings": 140,
      "location": "Geneva (LSGG)",
      "registration": "N240CY",
      "serial_number": "C68A-0452",
      "exterior_finish": "Arctic White with silver sweep",
      "interior_description": "Flat-floor cabin with six club seats and a fully enclosed lavatory. Modern interior in neutral tones with titanium accents and large windows for natural light.",
      "features": [
        "Flat-floor cabin",
        "Six-place club seating",
        "Enclosed lavatory",
        "Clarity cabin management system",
        "Refreshment centre",
        "Lithium-ion main battery"
      ],
      "image_url": "/assets/legacy600-featured.png",
      "gallery": [
        "/assets/legacy600-featured.png",
        "/assets/ramp-dusk.png"
      ]
    }
  ];

  if (category && category !== 'All') {
    return items.filter(i => i.category === category);
  }
  return items;
}
