# SabziMitra (सब्ज़ी मित्र) - Product Requirements Document (PRD)

> **Version**: 1.0.0  
> **Status**: Approved / Ready for AI Developer & Engineering Implementation  
> **Target Audience**: AI Developers (Cursor, Claude Code, GitHub Copilot, Gemini), Full-Stack Engineers, Product Managers  
> **Domain**: Hyperlocal Fresh Produce & Agri-Commerce Marketplace

---

## 1. Executive Summary & Vision

**SabziMitra (सब्ज़ी मित्र)** is a hyper-local, farm-to-doorstep quick-commerce platform that connects local vegetable vendors, farmers (mandi traders), delivery partners, and consumers. The platform solves the problems of fresh produce supply chain inefficiencies, lack of price transparency, and delayed delivery by offering 15-30 minute hyper-local delivery or scheduled self-pickup with real-time farm-fresh quality grading and fair pricing.

---

## 2. Target Platforms & User Personas

### 2.1 Platforms
- **Customer App**: Progressive Web App (PWA) + iOS / Android Native (Flutter / React Native)
- **Vendor / Merchant App**: Web Portal & Android App (for street vendors & mandi shops)
- **Delivery Partner App**: Android / iOS Mobile Application (with GPS Tracking & Turn-by-Turn Routing)
- **Super Admin Command Center**: Desktop Web Portal (Next.js / React Dashboard)

### 2.2 User Personas & Roles

| Role | Primary Objectives | Key Capabilities |
|---|---|---|
| **Customer (ग्राहक)** | Buy fresh, hygienic vegetables & fruits at mandi rates with quick delivery. | Search/Voice search, Category browsing, Portion selection (250g, 500g, 1kg), Cart & Checkout, Razorpay/PhonePe UPI/COD, Live GPS tracking, Subscription boxes, Bilingual UI. |
| **Vendor / Farmer (दुकानदार / किसान)** | List daily fresh produce, manage inventory, accept orders, receive payouts. | Instant KYC onboarding, Daily price updater per kg, Stock toggle, Live order processing queue (Accept -> Pack -> Dispatch), Daily revenue analytics. |
| **Delivery Partner (डिलीवरी साथी)** | Earn per delivery with flexible hours and transparent payout tracking. | Duty toggle (Online/Offline), Route navigation simulation, OTP verification at doorstep, Tips & incentives tracker. |
| **Super Admin (एडमिन)** | Govern the ecosystem, monitor GMV, enforce quality, manage disputes. | Vendor KYC approvals, Commission rate configuration, Dynamic promo/coupons, Refund management, Platform health & GMV metrics. |

---

## 3. Core Functional Requirements

### 3.1 Authentication & Profile (Auth Module)
- **Mobile OTP Login**: 6-digit SMS OTP verification (Mock/Firebase Auth integration).
- **Role-Based Access Control (RBAC)**: Secure JWT tokens containing user role (`CUSTOMER`, `VENDOR`, `DELIVERY_PARTNER`, `ADMIN`).
- **Bilingual Interface**: Seamless switching between **English** and **Hindi (हिन्दी)** with persistent preference.

### 3.2 Customer Module
- **Catalog & Discovery**:
  - Categories: *Daily Essentials (आलू, प्याज, टमाटर)*, *Leafy Greens (हरी पत्तीदार सब्जियां)*, *Exotic & Salads (ब्रोकोली, शिमला मिर्च)*, *Organic & Hydroponic (ऑर्गेनिक)*, *Combos & Weekly Baskets (सब्जी बॉस्केट)*.
  - Portion Selectors: 250g, 500g, 1kg, 1 bunch, 1 piece with dynamic price calculation.
  - Farm-fresh grading badges (e.g., "Harvested 4 hours ago", "Mandi Direct").
- **Voice & Smart Search**: Instant fuzzy search by English & Hindi phonetic names (e.g., "Aloo", "Potato", "Bhindi", "Palak").
- **Cart & Dynamic Pricing**:
  - Itemized quantity changes with real-time tax, delivery fee calculation, and packaging charges.
  - Delivery mode selection: **15-30 Min Express Delivery** vs **Scheduled Slot** vs **Shop Self-Pickup (दुकान से उठाएं)**.
- **Discounts & Coupons**: Promo engine supporting percentage, flat discount, and minimum order validation (e.g., `FRESH50`, `KISAN10`, `SABZIMITRA`).
- **Payment Processing**:
  - Online Payment Gateway (Razorpay & PhonePe UPI simulation with QR code & Intent triggers).
  - Cash on Delivery (COD) with OTP confirmation.
- **Real-Time Order Tracking**:
  - Live milestone timeline: `Order Placed` ➔ `Vendor Accepted & Packed` ➔ `Rider Assigned` ➔ `Out for Delivery` ➔ `Delivered`.
  - Interactive Map simulation with moving delivery vehicle and ETA countdown.
- **Weekly Subscription Box**:
  - Build custom recurring weekly vegetable baskets (e.g., "Family Healthy Green Box" delivered every Sunday morning).

### 3.3 Vendor Module
- **KYC Onboarding**: Upload Aadhaar Card, Mandi Trade License / FSSAI, and Bank Account details with pending/approved status tracker.
- **Daily Price & Stock Manager**: One-click price updates per kg based on morning mandi rates; toggle items In-Stock / Out-of-Stock.
- **Live Order Board**: Audible chime & visual cards for incoming orders with action buttons: `Accept Order` ➔ `Start Packing` ➔ `Ready for Handover`.
- **Sales Analytics**: Today's revenue, weekly gross merchandise value (GMV), top 5 fast-moving vegetables.

### 3.4 Delivery Partner Module
- **Shift Toggle**: Online / Offline switch to receive delivery requests.
- **Order Radar**: View pickup vendor location, customer drop location, distance in km, and earnings payout.
- **Simulated Navigation**: Live step-by-step route simulation from Vendor Mandi to Customer doorstep.
- **Secure Handover**: Secure 4-digit Customer Delivery OTP verification before marking completed.
- **Earnings Wallet**: Daily earnings summary, base delivery fee, customer tips, and weekly payout balance.

### 3.5 Super Admin Module
- **Platform Overview**: Real-time KPI counters: Total GMV, Active Orders, Approved Vendors, Active Delivery Fleet, and Platform Commission earned.
- **KYC Review Portal**: Inspect vendor documents, approve or reject with reason notes.
- **Commission Configurator**: Set dynamic platform commission percentage (e.g., 5% to 15%).
- **Banner & Campaign Manager**: Create and activate promotional hero banners on the customer app.
- **Coupon Manager**: Create discount codes with start/end date, discount percentage, and max cap.
- **Dispute & Refund Console**: Process customer refund requests with instant audit log.

---

## 4. Non-Functional Requirements (NFRs)

1. **Performance**:
   - Sub-200ms API response times for catalog and search endpoints.
   - Initial page load / LCP < 1.5s on 4G mobile networks.
2. **Security**:
   - JWT token-based authentication with cryptographic expiration.
   - Encrypted data transmission (HTTPS/TLS) and input sanitization to prevent injection attacks.
3. **High Availability & Fault Tolerance**:
   - Graceful fallback for offline network states and simulated fallback gateways.
4. **Design & Aesthetics**:
   - **Theme**: Modern, farm-fresh emerald green (`#10B981`, `#059669`), organic accents, crisp white background, subtle dark mode palette (`#0F172A`).
   - **Styling**: Glassmorphism cards, soft drop shadows (`0 8px 30px rgba(0,0,0,0.06)`), smooth rounded radii (`16px - 24px`), micro-interactions.

---

## 5. Technology Stack

- **Frontend**: React (Vite) / Next.js, Vanilla CSS Design System with CSS Variables, Lucide Icons.
- **Backend**: Node.js, Express.js (Modular Route Controllers).
- **Database**: PostgreSQL with standard SQL schema & relational constraints (accompanied by zero-config operational JSON/SQLite adapter for instant plug-and-play).
- **Payment Gateways**: Razorpay & PhonePe Sandbox / SDK integrations.
- **Maps & Geo-Tracking**: Interactive Leaflet / Canvas GPS simulation engine.
- **Push & Notifications**: Firebase Cloud Messaging (FCM) / Web Push & In-App Toast Event Bus.

---

## 6. Database Entity Relationship (ER) Model

```
+----------------+       +------------------+       +------------------+
|     USERS      |       |     VENDORS      |       |     PRODUCTS     |
+----------------+       +------------------+       +------------------+
| id (PK)        |<----->| id (PK)          |<----->| id (PK)          |
| phone          | 1   1 | user_id (FK)     | 1   N | vendor_id (FK)   |
| name           |       | shop_name        |       | name_en          |
| role           |       | kyc_status       |       | name_hi          |
| created_at     |       | mandi_license    |       | category         |
+----------------+       +------------------+       | price_per_kg     |
        |                                           | stock_kg         |
        | 1                                         | image_url        |
        |                                           +------------------+
        | N                                                  | 1
+----------------+       +------------------+                |
|     ORDERS     |       |   ORDER_ITEMS    |                |
+----------------+       +------------------+                |
| id (PK)        | 1   N | id (PK)          |                |
| customer_id(FK)|<----->| order_id (FK)    |                |
| vendor_id (FK) |       | product_id (FK)  |<---------------+
| rider_id (FK)  |       | quantity_grams   |
| total_amount   |       | unit_price       |
| status         |       +------------------+
| payment_mode   |
| delivery_otp   |
+----------------+
```

---

## 7. Future Roadmap & Innovations

1. **AI Freshness Scanner**: Camera-based vegetable quality inspection using computer vision to detect spoilage.
2. **AI Recipe-to-Cart**: Recipe assistant suggesting ingredients (e.g. "Matar Paneer Recipe" auto-adds peas, paneer, tomatoes, ginger, and green chilies to cart).
3. **WhatsApp Conversational Commerce**: End-to-end ordering through WhatsApp chatbot in Hindi and regional dialects.
4. **IoT Mandi Weighing Scale Integration**: Direct Bluetooth sync with vendor digital weighing scales for automated inventory updates.

---

*Authored for SabziMitra Engineering & AI Development Workflow.*
