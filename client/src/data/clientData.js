export const initialCategories = [
  { id: 'all', nameEn: 'All Vegetables', nameHi: 'सभी सब्जियां', icon: 'Sparkles' },
  { id: 'essentials', nameEn: 'Daily Essentials', nameHi: 'दैनिक आवश्यकताएं', icon: 'Flame' },
  { id: 'leafy', nameEn: 'Leafy Greens', nameHi: 'हरी पत्तेदार सब्जियां', icon: 'Leaf' },
  { id: 'exotic', nameEn: 'Exotics & Salads', nameHi: 'विदेशी व सलाद', icon: 'Salad' },
  { id: 'organic', nameEn: '100% Organic', nameHi: 'जैविक व शुद्ध', icon: 'CheckCircle' },
  { id: 'combos', nameEn: 'Sabzi Baskets', nameHi: 'सब्जी बॉस्केट / कॉम्बो', icon: 'ShoppingBag' }
];

export const initialProducts = [
  {
    id: 'prod-tomato',
    nameEn: 'Desi Red Tomato (टमाटर)',
    nameHi: 'देसी लाल टमाटर',
    category: 'essentials',
    pricePerKg: 36,
    mandiRatePerKg: 45,
    stockKg: 180,
    unit: 'kg',
    freshness: 'Harvested 3h ago',
    origin: 'Jaipur Rural Mandi',
    rating: 4.8,
    reviewsCount: 142,
    organic: false,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    description: 'Juicy, farm-fresh desi red tomatoes rich in Lycopene and Vitamin C, picked directly from local farms at 5 AM.'
  },
  {
    id: 'prod-potato',
    nameEn: 'Pahari Agra Potato (आलू)',
    nameHi: 'पहाड़ी आगरा आलू',
    category: 'essentials',
    pricePerKg: 28,
    mandiRatePerKg: 35,
    stockKg: 250,
    unit: 'kg',
    freshness: 'New Crop Fresh',
    origin: 'Agra Potato Mandi',
    rating: 4.9,
    reviewsCount: 220,
    organic: false,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    description: 'Crisp, firm, thin-skinned mountain potatoes perfect for daily cooking, aloo parathas, and curries.'
  },
  {
    id: 'prod-onion',
    nameEn: 'Nashik Red Onion (प्याज)',
    nameHi: 'नासिक लाल प्याज',
    category: 'essentials',
    pricePerKg: 42,
    mandiRatePerKg: 50,
    stockKg: 200,
    unit: 'kg',
    freshness: 'Mandi Grade A',
    origin: 'Lasalgaon Mandi, Nashik',
    rating: 4.7,
    reviewsCount: 185,
    organic: false,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    description: 'Premium pungency and crunchy layers from Nashik. Dried properly to maintain optimal shelf life.'
  },
  {
    id: 'prod-palak',
    nameEn: 'Hydroponic Spinach (पालक)',
    nameHi: 'हरी ताज़ा पालक',
    category: 'leafy',
    pricePerKg: 40,
    mandiRatePerKg: 55,
    stockKg: 65,
    unit: 'bunch',
    freshness: 'Tender Leaves Harvested Morning',
    origin: 'GreenField Farms',
    rating: 4.9,
    reviewsCount: 96,
    organic: true,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    description: 'Soil-less grown tender spinach bunch, washed with ozone water. Zero pesticide residue, high iron & minerals.'
  },
  {
    id: 'prod-bhindi',
    nameEn: 'Tender Lady Finger / Okra (भिंडी)',
    nameHi: 'नरम हरी भिंडी',
    category: 'essentials',
    pricePerKg: 52,
    mandiRatePerKg: 65,
    stockKg: 75,
    unit: 'kg',
    freshness: 'Snappy Tender',
    origin: 'Local Mandi Shed 4',
    rating: 4.6,
    reviewsCount: 110,
    organic: false,
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?w=600&auto=format&fit=crop&q=80',
    description: 'Small, non-fibrous, snappy green lady fingers. Easy to chop and cooks in under 10 minutes.'
  },
  {
    id: 'prod-cauliflower',
    nameEn: 'White Snowball Cauliflower (फूलगोभी)',
    nameHi: 'सफेद फूलगोभी',
    category: 'essentials',
    pricePerKg: 45,
    mandiRatePerKg: 60,
    stockKg: 90,
    unit: 'piece',
    freshness: 'Dense & Spotless',
    origin: 'Himachal Cool Harvest',
    rating: 4.8,
    reviewsCount: 88,
    organic: false,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&auto=format&fit=crop&q=80',
    description: 'Tightly packed, milk-white florets with fresh green wrapping leaves protecting from sunlight.'
  },
  {
    id: 'prod-coriander',
    nameEn: 'Aromatic Desi Coriander (धनिया)',
    nameHi: 'देसी खुशबूदार हरा धनिया',
    category: 'leafy',
    pricePerKg: 60,
    mandiRatePerKg: 80,
    stockKg: 40,
    unit: 'bunch',
    freshness: 'Super Aromatic',
    origin: 'Mandi Fresh Roots',
    rating: 4.9,
    reviewsCount: 230,
    organic: true,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80',
    description: 'Small-leaf authentic desi coriander with intense fragrance and tender stalks that elevate any dish.'
  },
  {
    id: 'prod-methi',
    nameEn: 'Fresh Fenugreek Leaves (मेथी)',
    nameHi: 'ताज़ा कसूरी हरी मेथी',
    category: 'leafy',
    pricePerKg: 48,
    mandiRatePerKg: 65,
    stockKg: 50,
    unit: 'bunch',
    freshness: 'Tender Sprouts',
    origin: 'Nagaur Mandi',
    rating: 4.8,
    reviewsCount: 75,
    organic: true,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80',
    description: 'Rich, mildly bitter and intensely fragrant fenugreek leaves, perfect for Aloo Methi and crispy Theplas.'
  },
  {
    id: 'prod-capsicum',
    nameEn: 'Green Bell Pepper (शिमला मिर्च)',
    nameHi: 'कुरकुरी शिमला मिर्च',
    category: 'exotic',
    pricePerKg: 65,
    mandiRatePerKg: 85,
    stockKg: 60,
    unit: 'kg',
    freshness: 'Glossy & Crisp',
    origin: 'Polyhouse Green Valley',
    rating: 4.7,
    reviewsCount: 64,
    organic: false,
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80',
    description: 'Thick-walled, glossy green capsicum ideal for noodles, gravies, and stuffing.'
  },
  {
    id: 'prod-broccoli',
    nameEn: 'Exotic Organic Broccoli (ब्रोकोली)',
    nameHi: 'विदेशी जैविक ब्रोकोली',
    category: 'exotic',
    pricePerKg: 120,
    mandiRatePerKg: 160,
    stockKg: 35,
    unit: 'piece',
    freshness: 'Dark Green Florets',
    origin: 'Ooty Hydroponics',
    rating: 4.9,
    reviewsCount: 52,
    organic: true,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=600&auto=format&fit=crop&q=80',
    description: 'Nutrient-powerhouse broccoli with tight, deep-green crowns rich in Sulforaphane and Vitamin K.'
  },
  {
    id: 'prod-combo-daily',
    nameEn: 'Daily Indian Kitchen Essentials Box (5kg)',
    nameHi: 'दैनिक रसोई सब्जी बॉस्केट (5 किग्रा)',
    category: 'combos',
    pricePerKg: 189,
    mandiRatePerKg: 240,
    stockKg: 40,
    unit: 'box',
    freshness: 'Curated 6-Item Family Pack',
    origin: 'SabziMitra Mandi Hub',
    rating: 4.9,
    reviewsCount: 310,
    organic: false,
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80',
    description: 'Complete 3-day family basket containing: 1.5kg Agra Potato, 1.5kg Nashik Onion, 1kg Hybrid Tomato, 500g Bhindi, 250g Green Chillies & Free Fresh Coriander Bunch.'
  },
  {
    id: 'prod-combo-detox',
    nameEn: 'Green Detox & Salad Immunity Box',
    nameHi: 'ग्रीन डिटॉक्स व सलाद बॉस्केट',
    category: 'combos',
    pricePerKg: 249,
    mandiRatePerKg: 320,
    stockKg: 25,
    unit: 'box',
    freshness: '100% Pesticide Free Certified',
    origin: 'Vedic Organic Farms',
    rating: 5.0,
    reviewsCount: 140,
    organic: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    description: 'Includes 1 pc Broccoli, 1 bunch Baby Spinach, 500g English Cucumber, 250g Cherry Tomatoes, 250g Lemon & Fresh Mint.'
  }
];

export const initialCoupons = [
  {
    code: 'FRESH50',
    discountType: 'FLAT',
    discountValue: 50,
    minOrderValue: 199,
    description: '₹50 OFF on orders above ₹199'
  },
  {
    code: 'SABZIMITRA',
    discountType: 'PERCENT',
    discountValue: 20,
    minOrderValue: 149,
    maxCap: 80,
    description: '20% OFF on your fresh order'
  },
  {
    code: 'KISAN10',
    discountType: 'PERCENT',
    discountValue: 10,
    minOrderValue: 99,
    maxCap: 40,
    description: '10% Direct Farmer Support discount'
  },
  {
    code: 'HARABHARA',
    discountType: 'FLAT',
    discountValue: 75,
    minOrderValue: 349,
    description: '₹75 OFF on vegetable baskets & combos'
  }
];

export const initialVendors = [
  {
    id: 'vnd-01',
    shopName: 'Sharma Fresh Sabzi Bhandar',
    ownerName: 'Ramesh Sharma',
    phone: '+919829012345',
    mandiLocation: 'APMC Muhana Mandi, Gate 2, Jaipur',
    mandiLicense: 'MND-JPR-2024-88',
    aadhaarNumber: 'XXXX-XXXX-4589',
    kycStatus: 'APPROVED',
    rating: 4.8,
    todayOrders: 18,
    todayGmv: 4850,
    commissionPct: 8.0,
    isOpen: true
  },
  {
    id: 'vnd-02',
    shopName: 'Kisan Organic Produce Co-op',
    ownerName: 'Gurpreet Singh',
    phone: '+919876543211',
    mandiLocation: 'Kisan Bhawan Shed 9, Jaipur',
    mandiLicense: 'ORG-FSSAI-99120',
    aadhaarNumber: 'XXXX-XXXX-9912',
    kycStatus: 'APPROVED',
    rating: 4.9,
    todayOrders: 14,
    todayGmv: 5920,
    commissionPct: 7.5,
    isOpen: true
  },
  {
    id: 'vnd-03',
    shopName: 'Gupta Green Traders',
    ownerName: 'Anil Gupta',
    phone: '+919811223344',
    mandiLocation: 'Lal Kothi Sabzi Mandi, Shop 22',
    mandiLicense: 'MND-LK-2026-03',
    aadhaarNumber: 'XXXX-XXXX-1144',
    kycStatus: 'PENDING',
    rating: 4.5,
    todayOrders: 0,
    todayGmv: 0,
    commissionPct: 9.0,
    isOpen: false
  }
];

export const initialDeliveryPartners = [
  {
    id: 'dlv-01',
    name: 'Vikram Choudhary',
    phone: '+919887766554',
    vehicle: 'Hero Electric Nyx (RJ14-EV-9021)',
    rating: 4.9,
    isOnline: true,
    tripsToday: 9,
    earningsToday: 740,
    currentLocation: { lat: 26.8522, lng: 75.8055, area: 'Malviya Nagar, Jaipur' }
  },
  {
    id: 'dlv-02',
    name: 'Mohit Saini',
    phone: '+919776655443',
    vehicle: 'Honda Activa 6G (RJ14-BQ-3382)',
    rating: 4.8,
    isOnline: true,
    tripsToday: 7,
    earningsToday: 560,
    currentLocation: { lat: 26.8912, lng: 75.7621, area: 'Vaishali Nagar, Jaipur' }
  }
];

export const initialOrders = [
  {
    id: 'ORD-9821',
    orderNumber: 'SM-9821',
    customerId: 'cust-demo',
    customerName: 'Pooja Verma',
    customerPhone: '+919928123456',
    vendorId: 'vnd-01',
    vendorName: 'Sharma Fresh Sabzi Bhandar',
    deliveryPartnerId: 'dlv-01',
    deliveryPartnerName: 'Vikram Choudhary',
    items: [
      { id: 'prod-tomato', name: 'Desi Red Tomato', portion: '1 kg', qty: 1, unitPrice: 36 },
      { id: 'prod-palak', name: 'Hydroponic Spinach', portion: '500 g', qty: 1, unitPrice: 20 },
      { id: 'prod-coriander', name: 'Desi Coriander', portion: '1 bunch', qty: 1, unitPrice: 15 }
    ],
    subtotal: 71,
    discount: 0,
    deliveryFee: 15,
    packagingFee: 5,
    totalAmount: 91,
    status: 'OUT_FOR_DELIVERY', // PLACED, ACCEPTED, PACKED, PICKED_UP, OUT_FOR_DELIVERY, DELIVERED
    deliveryMode: 'EXPRESS_DELIVERY',
    deliveryAddress: 'Flat 304, Royal Palms, C-Scheme, Jaipur',
    paymentMode: 'PHONEPE_UPI',
    paymentStatus: 'PAID',
    deliveryOtp: '5819',
    estimatedMins: 12,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString()
  }
];

export const initialCustomers = [
  {
    id: 'cust-01',
    name: 'Pooja Verma',
    phone: '+919928123456',
    email: 'pooja.verma@example.com',
    address: 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur',
    totalOrders: 14,
    totalSpent: 3420,
    status: 'ACTIVE',
    joinedDate: '15 Jan 2024',
    walletBalance: 150
  },
  {
    id: 'cust-02',
    name: 'Amit Sharma',
    phone: '+919829099881',
    email: 'amit.sharma@gmail.com',
    address: 'Plot 45, Surya Nagar, Gopalpura Bypass, Jaipur',
    totalOrders: 8,
    totalSpent: 1980,
    status: 'ACTIVE',
    joinedDate: '10 Feb 2024',
    walletBalance: 0
  },
  {
    id: 'cust-03',
    name: 'Sunita Meena',
    phone: '+919414012987',
    email: 'sunita.meena@yahoo.in',
    address: 'B-12, Vaishali Nagar, Jaipur',
    totalOrders: 22,
    totalSpent: 5890,
    status: 'ACTIVE',
    joinedDate: '20 Nov 2023',
    walletBalance: 240
  },
  {
    id: 'cust-04',
    name: 'Rajesh Khandelwal',
    phone: '+919828876543',
    email: 'rajesh.k@rediffmail.com',
    address: 'House #88, Raja Park, Jaipur',
    totalOrders: 3,
    totalSpent: 620,
    status: 'ACTIVE',
    joinedDate: '01 Mar 2024',
    walletBalance: 50
  }
];
