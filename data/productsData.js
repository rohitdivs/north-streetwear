export const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'North 240 GSM Oversized Heavyweight Tee',
    category: 'tshirts',
    gsm: '240',
    price: 1499,
    originalPrice: 2799,
    discountPercent: '46% OFF',
    rating: 4.9,
    reviewCount: 148,
    badge: 'NEW',
    viewers: 26,
    stockLeft: 4,
    isBestSeller: true,
    colors: [
      { name: 'Vintage Onyx Black', hex: '#1a1a1a', colorKey: 'black', img: '/images/product-1.jpg' },
      { name: 'Bone Cream Graphic', hex: '#f4f2ec', colorKey: 'white', img: '/images/product-white-tee.jpg' },
      { name: 'Vintage Sage', hex: '#657b64', colorKey: 'sage', img: '/images/product-sage-tee.jpg' },
      { name: 'Cobalt Blue', hex: '#1d4ed8', colorKey: 'blue', img: '/images/product-blue-tee.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Engineered from 240 GSM combed ring-spun cotton. Features an authentic drop-shoulder boxy drape, thick 1.25" rib collar that never wrinkles or sags, and enzyme bio-wash for anti-pilling durability.',
    specs: '100% Combed Ring-Spun Cotton | 240 GSM Single Jersey | Enzyme Bio-Washed | Thermal Pre-Shrunk | Heavy Ribbed Collar | Made in India'
  },
  {
    id: 'p2',
    name: 'Heavyweight Loop-Knit Boxy Hoodie',
    category: 'hoodies',
    gsm: '360',
    price: 2999,
    originalPrice: 4999,
    discountPercent: '40% OFF',
    rating: 4.8,
    reviewCount: 92,
    badge: 'SALE',
    viewers: 19,
    stockLeft: 3,
    isBestSeller: true,
    colors: [
      { name: 'Cloud White', hex: '#ffffff', colorKey: 'white', img: '/images/product-2.jpg' },
      { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: '/images/look-midnight-nomad.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: '360 GSM French terry cotton with deep double-layer hood, hidden kangaroo pouch, and relaxed drop-shoulder cut. Engineered for harsh metropolitan chills.',
    specs: '100% French Terry Cotton | 360 GSM Heavyweight | Double-Layered Hood | No Drawstrings (Clean Street Aesthetic) | Heavy Lycra Ribbing'
  },
  {
    id: 'p3',
    name: 'Tactical 6-Pocket Cargo Joggers',
    category: 'pants',
    gsm: '280',
    price: 2499,
    originalPrice: 3999,
    discountPercent: '38% OFF',
    rating: 4.9,
    reviewCount: 214,
    badge: 'HOT',
    viewers: 32,
    stockLeft: 5,
    isBestSeller: true,
    colors: [
      { name: 'Olive Green', hex: '#556b2f', colorKey: 'olive', img: '/images/product-olive-cargo.jpg' },
      { name: 'Navy Blue', hex: '#0d1b2a', colorKey: 'blue', img: '/images/product-3.jpg' },
      { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: '/images/product-3.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeLabels: ['30(S)', '32(M)', '34(L)', '36(XL)', '38(XXL)'],
    description: 'Military-grade 280 GSM cotton twill with articulated knee panels, deep dual bellows cargo pockets with matte tactical hardware, and custom elasticized ankle cuffs.',
    specs: '98% Heavy Cotton Twill, 2% Spandex | 280 GSM | 6 Deep Utility Pockets | Heavy-Duty YKK Hardware | Reinforced Gusseted Crotch'
  },
  {
    id: 'p4',
    name: 'Tokyo Drift Flight Bomber Jacket',
    category: 'jackets',
    gsm: '320',
    price: 4999,
    originalPrice: 7999,
    discountPercent: '38% OFF',
    rating: 4.9,
    reviewCount: 67,
    badge: 'HOT',
    viewers: 14,
    stockLeft: 2,
    isBestSeller: false,
    colors: [
      { name: 'Olive Drab', hex: '#556b2f', colorKey: 'olive', img: '/images/product-4.jpg' },
      { name: 'Jet Black', hex: '#111111', colorKey: 'black', img: '/images/look-tokyo-drift.jpg' }
    ],
    sizes: ['M', 'L', 'XL'],
    description: 'Custom flight nylon shell with water-repellent DWR coating, utility sleeve pocket with pull ribbon, heavy brass zipper, and quilted orange diamond lining.',
    specs: '100% High-Density Flight Nylon | 320 GSM Construction | Diamond Quilted Polyfill Thermal Insulation | Utility Arm Pocket'
  },
  {
    id: 'p5',
    name: 'Minimalist Washed Crewneck Pullover',
    category: 'hoodies',
    gsm: '320',
    price: 2299,
    originalPrice: 3499,
    discountPercent: '34% OFF',
    rating: 4.7,
    reviewCount: 78,
    badge: 'NEW',
    viewers: 11,
    stockLeft: 6,
    isBestSeller: false,
    colors: [
      { name: 'Heather Grey', hex: '#9ca3af', colorKey: 'grey', img: '/images/product-5.jpg' },
      { name: 'Pitch Black', hex: '#111111', colorKey: 'black', img: '/images/product-1.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: '320 GSM combed loop-back cotton sweatshirt with ribbed collar triangle stitch, relaxed oversized drape, and vintage garment acid wash treatment.',
    specs: '100% Combed Cotton | 320 GSM Terry Loop | Garment Pigment-Dyed | Seamless Side Construction | Ribbed Cuffs and Hem'
  },
  {
    id: 'p6',
    name: 'Embroidered Heavyweight Dad Cap',
    category: 'accessories',
    gsm: '280',
    price: 899,
    originalPrice: 1499,
    discountPercent: '40% OFF',
    rating: 4.8,
    reviewCount: 165,
    badge: 'NEW',
    viewers: 22,
    stockLeft: 8,
    isBestSeller: true,
    colors: [
      { name: 'Pitch Black', hex: '#111111', colorKey: 'black', img: '/images/product-6.jpg' },
      { name: 'Chalk White', hex: '#ffffff', colorKey: 'white', img: '/images/product-white-tee.jpg' }
    ],
    sizes: ['Free Size'],
    description: 'Unstructured 6-panel low profile dad cap crafted from heavy washed cotton chino twill. Features high-density 3D tonal "NORTH" embroidery and brass buckle backstrap.',
    specs: '100% Washed Cotton Chino Twill | Custom Matte Brass Clasp | 6-Panel Low Profile | Moisture-Wicking Interior Sweatband'
  },
  {
    id: 'p7',
    name: 'Raw Edge Acid Wash Drop-Shoulder Tee',
    category: 'tshirts',
    gsm: '260',
    price: 1699,
    originalPrice: 2999,
    discountPercent: '43% OFF',
    rating: 4.9,
    reviewCount: 112,
    badge: 'SALE',
    viewers: 28,
    stockLeft: 3,
    isBestSeller: true,
    colors: [
      { name: 'Vintage Sage', hex: '#657b64', colorKey: 'sage', img: '/images/product-sage-tee.jpg' },
      { name: 'Cobalt Blue', hex: '#1d4ed8', colorKey: 'blue', img: '/images/product-blue-tee.jpg' },
      { name: 'Raw Off-White', hex: '#f4f2ec', colorKey: 'white', img: '/images/product-white-tee.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: '260 GSM extra-heavy single jersey subjected to individual hand-acid washing for unique one-of-one distress variations. Raw cut hemline with safety lock stitching.',
    specs: '100% Combed Cotton | 260 GSM Heavyweight | Hand Acid-Washed Treatment | Raw-Cut Hem with Reinforced Stitch | Made in India'
  },
  {
    id: 'p8',
    name: 'Tactical Relaxed Track Pant',
    category: 'pants',
    gsm: '320',
    price: 2699,
    originalPrice: 4299,
    discountPercent: '37% OFF',
    rating: 4.8,
    reviewCount: 84,
    badge: 'NEW',
    viewers: 17,
    stockLeft: 5,
    isBestSeller: false,
    colors: [
      { name: 'Midnight Black', hex: '#111111', colorKey: 'black', img: '/images/look-urban-transit.jpg' },
      { name: 'Olive Green', hex: '#556b2f', colorKey: 'olive', img: '/images/product-olive-cargo.jpg' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    sizeLabels: ['30(S)', '32(M)', '34(L)', '36(XL)'],
    description: 'Heavy loop-knit cotton track pants with nylon utility knee panels, concealed ankle zip expanders, and extra-long tonal drawstrings.',
    specs: '100% Heavy French Terry & Ripstop Nylon | 320 GSM | Ankle Zipper Expanders | Matte Black Hardware'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'NORTH-849201',
    date: '19 Sep 2026, 02:45 PM',
    deliveryDate: '23 Sep 2026 (Express)',
    customer: {
      name: 'Aryan Mehta',
      phone: '9820149201',
      email: 'aryan.mehta@gmail.com',
      address: 'Flat 402, Sea Green Apts, Linking Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        id: 'p1',
        name: 'North 240 GSM Oversized Heavyweight Tee',
        color: 'Midnight Black',
        size: 'L',
        qty: 1,
        price: 1499,
        originalPrice: 2799,
        img: '/images/product-1.jpg'
      },
      {
        id: 'p3',
        name: 'Tactical 6-Pocket Cargo Joggers',
        color: 'Olive Green',
        size: '32(M)',
        qty: 1,
        price: 2499,
        originalPrice: 3999,
        img: '/images/product-olive-cargo.jpg'
      }
    ],
    paymentMethod: 'Instant UPI (GPay)',
    mrpTotal: 6798,
    grandTotal: 3998,
    status: 'In Transit',
    carrier: 'Bluedart Express',
    awb: 'BLU-84920194',
    currentStep: 3,
    origin: {
      facility: 'NORTH Central Warehouse & Fulfillment Hub',
      city: 'Bhiwandi / Mumbai',
      state: 'Maharashtra',
      code: 'BOM-HUB-01'
    },
    destination: {
      facility: 'Customer Address / Bandra Station',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      code: 'BOM-BND-05'
    },
    currentHub: 'Kurla Logistics Sort Center, Mumbai',
    liveLocation: 'In transit on Express Feeder Truck towards Bandra Delivery Hub',
    checkpoints: [
      { step: 1, title: 'Order Confirmed & Payment Verified', location: 'NORTH Digital Gateway', time: '19 Sep 2026, 02:45 PM', status: 'completed' },
      { step: 2, title: 'Picked & Packed at Central Warehouse', location: 'Bhiwandi Hub (BOM-HUB-01)', time: '20 Sep 2026, 10:15 AM', status: 'completed' },
      { step: 3, title: 'Arrived at Regional Sort Hub', location: 'Kurla Logistics Sort Center, Mumbai', time: '21 Sep 2026, 08:30 AM', status: 'active' },
      { step: 4, title: 'Out for Local Street Delivery', location: 'Bandra West Last-Mile Hub', time: 'Expected 23 Sep 2026, 09:00 AM', status: 'pending' },
      { step: 5, title: 'Delivered to Customer Doorstep', location: 'Flat 402, Bandra West, Mumbai', time: 'Expected 23 Sep 2026, by 05:00 PM', status: 'pending' }
    ]
  },
  {
    id: 'NORTH-782104',
    date: '21 Sep 2026, 11:15 AM',
    deliveryDate: '25 Sep 2026 (Standard)',
    customer: {
      name: 'Rohit Sharma',
      phone: '9876543210',
      email: 'rohit.s@gmail.com',
      address: 'House 14, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    items: [
      {
        id: 'p2',
        name: 'Heavyweight Loop-Knit Boxy Hoodie',
        color: 'Cloud White',
        size: 'XL',
        qty: 1,
        price: 2999,
        originalPrice: 4999,
        img: '/images/product-2.jpg'
      }
    ],
    paymentMethod: 'Cash On Delivery (COD)',
    mrpTotal: 4999,
    grandTotal: 2999,
    status: 'Processing',
    carrier: 'Delhivery Surface',
    awb: 'DEL-99214820',
    currentStep: 2,
    origin: {
      facility: 'NORTH Central Warehouse & Fulfillment Hub',
      city: 'Bhiwandi / Mumbai',
      state: 'Maharashtra',
      code: 'BOM-HUB-01'
    },
    destination: {
      facility: 'South Delhi Distribution Center',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      code: 'DEL-DEF-11'
    },
    currentHub: 'Bhiwandi Quality Control & Packaging Bay 3',
    liveLocation: 'Barcode scanned & packed in tamper-proof streetwear box',
    checkpoints: [
      { step: 1, title: 'Order Placed (COD Verified)', location: 'NORTH System Gateway', time: '21 Sep 2026, 11:15 AM', status: 'completed' },
      { step: 2, title: 'QC & Packaging In Progress', location: 'Bhiwandi Hub (BOM-HUB-01)', time: '21 Sep 2026, 03:30 PM', status: 'active' },
      { step: 3, title: 'Inter-State Transit Linehaul (BOM -> DEL)', location: 'National Highway Express Route', time: 'Scheduled 22 Sep 2026', status: 'pending' },
      { step: 4, title: 'Arrived at Delhi Hub & Out for Delivery', location: 'Defence Colony Station, New Delhi', time: 'Scheduled 25 Sep 2026', status: 'pending' },
      { step: 5, title: 'Delivered', location: 'House 14, Defence Colony, New Delhi', time: 'Scheduled 25 Sep 2026', status: 'pending' }
    ]
  },
  {
    id: 'NORTH-650392',
    date: '17 Sep 2026, 04:10 PM',
    deliveryDate: '20 Sep 2026',
    customer: {
      name: 'Sahil Kapoor',
      phone: '9910234567',
      email: 'sahil.k@gmail.com',
      address: 'Plot 88, Sector 15, HSR Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102'
    },
    items: [
      {
        id: 'p4',
        name: 'Tokyo Drift Flight Bomber Jacket',
        color: 'Pitch Black',
        size: 'M',
        qty: 1,
        price: 4999,
        originalPrice: 8499,
        img: '/images/product-4.jpg'
      }
    ],
    paymentMethod: 'Instant UPI (PhonePe)',
    mrpTotal: 8499,
    grandTotal: 4999,
    status: 'Delivered',
    carrier: 'Bluedart Air Express',
    awb: 'BLU-65039210',
    currentStep: 5,
    origin: {
      facility: 'NORTH Central Warehouse & Fulfillment Hub',
      city: 'Bhiwandi / Mumbai',
      state: 'Maharashtra',
      code: 'BOM-HUB-01'
    },
    destination: {
      facility: 'HSR Layout Delivery Station',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102',
      code: 'BLR-HSR-02'
    },
    currentHub: 'Delivered to Customer Doorstep',
    liveLocation: 'Delivered and signed by Sahil Kapoor',
    checkpoints: [
      { step: 1, title: 'Order Confirmed', location: 'NORTH Digital Gateway', time: '17 Sep 2026, 04:10 PM', status: 'completed' },
      { step: 2, title: 'Dispatched via Air Cargo', location: 'Chhatrapati Shivaji Cargo Terminal', time: '18 Sep 2026, 02:00 AM', status: 'completed' },
      { step: 3, title: 'Arrived at Kempegowda Cargo Sort Hub', location: 'Bengaluru Airport Logistics Hub', time: '18 Sep 2026, 08:30 AM', status: 'completed' },
      { step: 4, title: 'Out for Local Delivery', location: 'HSR Hub Van #12', time: '20 Sep 2026, 09:15 AM', status: 'completed' },
      { step: 5, title: 'Delivered Successfully (OTP Verified)', location: 'HSR Layout, Bengaluru', time: '20 Sep 2026, 01:45 PM', status: 'completed' }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Aryan Mehta',
    city: 'Mumbai',
    productName: 'North 240 GSM Oversized Heavyweight Tee',
    rating: 5,
    size: 'L',
    height: "5'11\"",
    fit: 'True to Boxy Oversized',
    comment: 'The 240 GSM collar does NOT stretch out or bacon even after 8 machine washes. The boxy drop shoulder drape is exactly what I was looking for. Easily beats luxury brands charging 4x.',
    date: '18 Sep 2026',
    helpful: 24,
    isVerified: true
  },
  {
    id: 'rev-2',
    author: 'Sahil Kapoor',
    city: 'Delhi',
    productName: 'Tactical 6-Pocket Cargo Joggers',
    rating: 5,
    size: '32(M)',
    height: "6'0\"",
    fit: 'True to Boxy Oversized',
    comment: 'Built quality of the tactical cargo joggers is insane. Sturdy zippers, deep pockets, and tapers perfectly with high-top sneakers. Delivery to Delhi took just 2 days!',
    date: '15 Sep 2026',
    helpful: 19,
    isVerified: true
  },
  {
    id: 'rev-3',
    author: 'Varun Rao',
    city: 'Bengaluru',
    productName: 'Heavyweight Loop-Knit Boxy Hoodie',
    rating: 5,
    size: 'L',
    height: "5'10\"",
    fit: 'True to Boxy Oversized',
    comment: 'Used the "Find My Fit" tool and it recommended Size L for my 5\'10 athletic build. The fit is 10/10 boxy perfection. Customer support on email responded in 15 minutes.',
    date: '12 Sep 2026',
    helpful: 15,
    isVerified: true
  },
  {
    id: 'rev-4',
    author: 'Riya Sen',
    city: 'Kolkata',
    productName: 'Tokyo Drift Flight Bomber Jacket',
    rating: 5,
    size: 'M',
    height: "5'7\"",
    fit: 'True to Boxy Oversized',
    comment: 'Heavy nylon shell with the orange quilted interior feels authentic and luxurious. Perfect streetwear layering piece.',
    date: '10 Sep 2026',
    helpful: 11,
    isVerified: true
  }
];

export const UPCOMING_LAUNCHES = [
  {
    id: 'launch-1',
    name: 'Acid-Wash 280 GSM Mineral Heavyweight Tee',
    category: 'Drop 05: Midnight Tokyo',
    gsm: '280 GSM Single Jersey',
    launchDate: 'This Friday, 8:00 PM IST',
    dropDateObj: '2026-10-02T20:00:00',
    price: 1699,
    originalPrice: 2999,
    status: 'DROPPING SOON',
    tag: 'LIMITED RUN (200 UNITS)',
    img: '/images/product_vintage_black_tee.jpg',
    description: 'Enzyme acid mineral wash with heavy distressed micro-rib collar and high-density reflective silver puff print on back.',
    vipEarlyAccess: '1-Hour Early Access Drop Pass Unlocked for VIP Members',
    specs: '280 GSM 100% Combed Cotton | Hand-Acid Mineral Wash | Drop Shoulder Cut | Anti-Sag Ribbed Collar'
  },
  {
    id: 'launch-2',
    name: 'Cyber-Chrome Heavy Loopback Boxy Zip Hoodie',
    category: 'Drop 06: Winter Capsule',
    gsm: '420 GSM Heavyweight Fleece',
    launchDate: 'Monday, Oct 5, 2026 — 12:00 PM IST',
    dropDateObj: '2026-10-05T12:00:00',
    price: 3499,
    originalPrice: 5499,
    status: 'IN PRODUCTION',
    tag: 'WINTER DROP',
    img: '/images/look-tokyo-drift.jpg',
    description: '420 GSM deep loopback French terry featuring custom matte gunmetal YKK two-way zipper and double-layer storm hood.',
    vipEarlyAccess: 'VIP Members Reserve First Before Public Sellout',
    specs: '420 GSM French Terry | Double-Layer Hood | Matte Metal Two-Way Zipper | Heavy Ribbed Cuffs'
  },
  {
    id: 'launch-3',
    name: 'Tactical Modular Ripstop Parachute Cargos',
    category: 'Drop 07: Urban Techwear',
    gsm: '300 GSM Water-Repellent Ripstop',
    launchDate: 'Monday, Oct 12, 2026 — 8:00 PM IST',
    dropDateObj: '2026-10-12T20:00:00',
    price: 2799,
    originalPrice: 4299,
    status: 'FINAL SAMPLING',
    tag: 'METRO EXCLUSIVE',
    img: '/images/product-olive-cargo.jpg',
    description: '300 GSM water-repellent military grade ripstop with magnetic quick-release fidlock buckles and bungee ankle cinch cords.',
    vipEarlyAccess: 'VIP Members Get Free Streetwear Keychain & Early Link',
    specs: '300 GSM Tactical Ripstop | 8 Ergonomic Pockets | Magnetic Buckles | Bungee Drawcord Ankle Cinch'
  }
];

