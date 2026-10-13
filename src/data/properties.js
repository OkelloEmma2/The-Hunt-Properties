// ============================================================
// SEED LISTINGS — replace picsum placeholder images with real
// property photos (local files in /public/images or hosted URLs)
// ============================================================
export const DISTRICTS = ['Kampala', 'Wakiso', 'Entebbe', 'Mukono', 'Jinja']

export const seedProperties = [
  {
    id: 'thp-001', title: 'Modern 4-Bedroom Villa with Paved Compound', category: 'Residential',
    dealType: 'Buy', price: 950000000, period: 'total', location: 'Muyenga', district: 'Kampala',
    beds: 4, baths: 4, sizeLabel: '25 decimals', featured: true, status: 'approved', datePosted: '2026-09-02',
    description: 'A stunning contemporary villa in the heart of Muyenga featuring a spacious sitting and dining area, modern fitted kitchen, master bedroom with walk-in closet, servant quarters and a paved compound with ample parking.',
    features: ['Tarmac road access', 'Borehole + NWSC water', 'Solar backup', 'Servant quarters', 'Wall fence', 'Title ready'],
    images: ['https://picsum.photos/seed/hunt-villa-1/800/560', 'https://picsum.photos/seed/hunt-villa-2/800/560', 'https://picsum.photos/seed/hunt-villa-3/800/560'],
    lat: 0.283, lng: 32.617, agent: 'Sarah Nabukenya', agentPhone: '+256 700 000 001',
  },
  {
    id: 'thp-002', title: 'Luxury 3-Bedroom Apartment, Naalya', category: 'Residential',
    dealType: 'Rent', price: 2800000, period: 'month', location: 'Naalya', district: 'Wakiso',
    beds: 3, baths: 3, sizeLabel: '180 sqm', featured: true, status: 'approved', datePosted: '2026-09-10',
    description: 'Fully furnished executive apartment in a gated complex with swimming pool, gym, 24/7 security and backup generator. Ideal for expatriates and corporate tenants.',
    features: ['Swimming pool', 'Gym', '24/7 security', 'Backup generator', 'Furnished', 'Balcony'],
    images: ['https://picsum.photos/seed/hunt-apt-1/800/560', 'https://picsum.photos/seed/hunt-apt-2/800/560', 'https://picsum.photos/seed/hunt-apt-3/800/560'],
    lat: 0.353, lng: 32.640, agent: 'Daniel Okello', agentPhone: '+256 700 000 002',
  },
  {
    id: 'thp-003', title: 'Prime Commercial Plot on Main Road', category: 'Land',
    dealType: 'Buy', price: 180000000, period: 'total', location: 'Najjera', district: 'Wakiso',
    beds: null, baths: null, sizeLabel: '50 decimals', featured: true, status: 'approved', datePosted: '2026-09-14',
    description: 'Ideal commercial plot fronting a busy tarmac road in fast-growing Najjera. Perfect for a plaza, apartments or fuel station. Mailo title, ready for transfer.',
    features: ['Tarmac frontage', 'Mailo title', 'Commercial zone', 'Water & power on site'],
    images: ['https://picsum.photos/seed/hunt-plot-1/800/560', 'https://picsum.photos/seed/hunt-plot-2/800/560'],
    lat: 0.367, lng: 32.592, agent: 'Grace Atim', agentPhone: '+256 700 000 003',
  },
  {
    id: 'thp-004', title: 'Executive Office Space, Kampala Road', category: 'Commercial',
    dealType: 'Rent', price: 6500000, period: 'month', location: 'Kampala CBD', district: 'Kampala',
    beds: null, baths: 2, sizeLabel: '220 sqm', featured: true, status: 'approved', datePosted: '2026-09-18',
    description: 'Grade-A open-plan office floor in the CBD with boardroom, kitchenette, dedicated parking bays, standby generator and lift access.',
    features: ['Lift access', 'Standby generator', 'Parking bays', 'Boardroom', 'Fibre internet ready'],
    images: ['https://picsum.photos/seed/hunt-office-1/800/560', 'https://picsum.photos/seed/hunt-office-2/800/560'],
    lat: 0.314, lng: 32.581, agent: 'The Hunt Team', agentPhone: '+256 700 000 000',
  },
  {
    id: 'thp-005', title: 'Lakeview Residential Land, Entebbe', category: 'Land',
    dealType: 'Buy', price: 120000000, period: 'total', location: 'Katabi', district: 'Entebbe',
    beds: null, baths: null, sizeLabel: '40 decimals', featured: false, status: 'approved', datePosted: '2026-09-22',
    description: 'Gently sloping plot with partial Lake Victoria views, 10 minutes from Entebbe town. Located in an established neighbourhood with water and power available.',
    features: ['Partial lake view', 'Power & water nearby', 'Freehold title', 'Gated neighbourhood'],
    images: ['https://picsum.photos/seed/hunt-ebb-1/800/560', 'https://picsum.photos/seed/hunt-ebb-2/800/560'],
    lat: 0.051, lng: 32.463, agent: 'Grace Atim', agentPhone: '+256 700 000 003',
  },
  {
    id: 'thp-006', title: 'Family Bungalow in Gated Estate, Kira', category: 'Residential',
    dealType: 'Rent', price: 1800000, period: 'month', location: 'Kira', district: 'Wakiso',
    beds: 3, baths: 2, sizeLabel: '140 sqm', featured: false, status: 'approved', datePosted: '2026-09-25',
    description: 'Neat 3-bedroom bungalow with private compound in a family-friendly gated estate. Tarmacked access, children playground and community security.',
    features: ['Gated estate', 'Playground', 'Paved driveway', 'Water tank'],
    images: ['https://picsum.photos/seed/hunt-bung-1/800/560', 'https://picsum.photos/seed/hunt-bung-2/800/560'],
    lat: 0.396, lng: 32.637, agent: 'Daniel Okello', agentPhone: '+256 700 000 002',
  },
  {
    id: 'thp-007', title: 'Serviced 2-Bedroom Apartment, Kyanja', category: 'Residential',
    dealType: 'Rent', price: 1500000, period: 'month', location: 'Kyanja', district: 'Kampala',
    beds: 2, baths: 2, sizeLabel: '95 sqm', featured: false, status: 'approved', datePosted: '2026-09-28',
    description: 'Bright serviced apartment with DSTV, WiFi, weekly cleaning and secure parking. Walking distance to Kyanja trading centre.',
    features: ['Serviced', 'WiFi included', 'DSTV', 'Secure parking', 'Water included'],
    images: ['https://picsum.photos/seed/hunt-kyan-1/800/560', 'https://picsum.photos/seed/hunt-kyan-2/800/560'],
    lat: 0.352, lng: 32.604, agent: 'Sarah Nabukenya', agentPhone: '+256 700 000 001',
  },
  {
    id: 'thp-008', title: 'Commercial Building with Rentals, Ntinda', category: 'Commercial',
    dealType: 'Buy', price: 1200000000, period: 'total', location: 'Ntinda', district: 'Kampala',
    beds: null, baths: 6, sizeLabel: '3 floors, 12 units', featured: true, status: 'approved', datePosted: '2026-10-01',
    description: 'Income-generating commercial block with 12 occupied rental units on three floors plus a shop on the ground floor. Currently yielding UGX 9M monthly.',
    features: ['12 rental units', 'Fully occupied', '9M/month income', 'Private mailo title'],
    images: ['https://picsum.photos/seed/hunt-ntinda-1/800/560', 'https://picsum.photos/seed/hunt-ntinda-2/800/560'],
    lat: 0.344, lng: 32.612, agent: 'The Hunt Team', agentPhone: '+256 700 000 000',
  },
  {
    id: 'thp-009', title: 'Garden Plot with Mature Trees, Bugolobi', category: 'Land',
    dealType: 'Buy', price: 320000000, period: 'total', location: 'Bugolobi', district: 'Kampala',
    beds: null, baths: null, sizeLabel: '18 decimals', featured: false, status: 'approved', datePosted: '2026-10-05',
    description: 'Rare leafy residential plot in quiet Bugolobi cul-de-sac, ready for immediate construction of a dream home. All utilities at the boundary.',
    features: ['Cul-de-sac', 'All utilities at boundary', 'Freehold title', 'Mature trees'],
    images: ['https://picsum.photos/seed/hunt-bug-1/800/560'],
    lat: 0.322, lng: 32.602, agent: 'Grace Atim', agentPhone: '+256 700 000 003',
  },
]