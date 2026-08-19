# 🥬 SabziMitra (सब्ज़ी मित्र) - 15-Minute Farm-to-Kitchen Produce Platform

> **AI-Ready PRD & Full-Stack Platform**  
> Complete Hyperlocal Fresh Produce & Agri-Commerce Marketplace connecting Customers, Mandi Vendors, EV Delivery Riders, and Platform Administrators.

---

## 📁 Repository Structure

```
SabjiWala/
├── PRD.md                  # Comprehensive AI-ready Product Requirements Document
├── API_SPEC.md             # REST API Contracts with request/response schemas
├── schema.sql              # Production PostgreSQL DDL Schema with tables & constraints
├── package.json            # Root workspace scripts
│
├── server/                 # Express.js REST API Backend
│   ├── package.json
│   └── src/
│       ├── index.js        # Main Express server entry point
│       ├── data/           # Pre-seeded Mandi produce dataset & DB layer
│       └── routes/         # Modular APIs (auth, products, orders, vendors, delivery, admin, analytics)
│
└── client/                 # Modern React + Vite Frontend (Emerald Theme + Glassmorphism)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── index.css       # Design tokens, emerald-green palette & dark mode
        ├── context/        # Global state, bilingual dictionary (EN / हिन्दी), cart & order state
        └── components/     # Customer, Vendor, Delivery Partner & Admin interfaces
```

---

## 🚀 Quick Start Instructions

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Start Backend API Server
```bash
npm run server
```
*API running at `http://localhost:5001/api`*

### 3. Start Frontend Client (in a separate terminal)
```bash
npm run client
```
*Web App running at `http://localhost:3000`*

---

## 🌟 Key Features & Roles

1. **🛒 Customer Experience (ग्राहक)**:
   - Browse fresh vegetables & fruits with farm-fresh harvest badges.
   - Portion selectors (250g, 500g, 1kg) with live rate comparisons against market prices.
   - Smart Cart, address selection & discount coupons (`FRESH50`, `SABZIMITRA`, `KISAN10`).
   - Simulated **PhonePe UPI** (QR code) & **Razorpay** checkout with celebratory confetti.
   - **Interactive Live Order Tracking** with turn-by-turn route simulation, driver details, and 4-digit doorstep delivery OTP.
   - **Weekly Subscription Box** builder for customized recurring vegetable baskets.
   - **Bilingual Switch**: Seamless toggle between **English** and **हिन्दी (Hindi)**.

2. **🏪 Mandi Vendor / Farmer Dashboard (दुकानदार / किसान)**:
   - Onboarding with KYC document verification & status.
   - Live incoming order queue (Accept ➔ Pack ➔ Handover to Rider).
   - Daily Mandi Rate & stock updater (inline price/kg and availability updates).
   - Today's sales GMV and order counters.

3. **🛵 Delivery Partner Portal (डिलीवरी साथी)**:
   - Duty status switch (Online / Offline).
   - Route simulation from Mandi vendor to customer doorstep.
   - Customer Delivery OTP verification input to complete deliveries.
   - Daily earnings ledger and tip tracker.

4. **🛡️ Super Admin Command Center (एडमिन)**:
   - Platform GMV, total volume, active fleet and commission counters.
   - Vendor KYC review & one-click approval / rejection.
   - Dynamic platform take-rate / commission percentage slider.
   - Promotional banner and coupon code generator.

---

## 🎨 Design System

- **Primary Colors**: Emerald Green (`#059669`, `#10B981`), Harvest Gold (`#F59E0B`), Deep Slate (`#0F172A`).
- **Aesthetics**: Glassmorphic panels, soft drop shadows, rounded corners (`16px-24px`), micro-interactions.
- **Theme**: Automatic & manual Dark / Light theme toggle.

---

*SabziMitra (सब्ज़ी मित्र) - Built with ❤️ for Indian Mandis, Farmers, and Households.*
