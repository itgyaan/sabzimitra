-- SabziMitra (सब्ज़ी मित्र) - PostgreSQL Production Database Schema
-- Version: 1.1.0 (Neon.tech & Supabase Native Postgres Compatible)

-- 1. ENUMS (Safe creation)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CUSTOMER', 'VENDOR', 'DELIVERY_PARTNER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE kyc_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PLACED', 'ACCEPTED', 'PACKED', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_mode AS ENUM ('RAZORPAY', 'PHONEPE_UPI', 'CASH_ON_DELIVERY');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE delivery_mode AS ENUM ('EXPRESS_DELIVERY', 'SCHEDULED_SLOT', 'SHOP_PICKUP');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    role user_role DEFAULT 'CUSTOMER',
    avatar_url TEXT,
    preferred_lang VARCHAR(5) DEFAULT 'hi',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. VENDORS TABLE
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_name VARCHAR(150) NOT NULL,
    mandi_location VARCHAR(200) NOT NULL,
    mandi_license_no VARCHAR(50),
    aadhaar_number_masked VARCHAR(20),
    bank_account_no VARCHAR(50),
    bank_ifsc VARCHAR(20),
    kyc_status kyc_status DEFAULT 'PENDING',
    kyc_rejection_reason TEXT,
    rating_avg DECIMAL(3,2) DEFAULT 4.8,
    is_open BOOLEAN DEFAULT TRUE,
    commission_override_pct DECIMAL(4,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. DELIVERY PARTNERS TABLE
CREATE TABLE IF NOT EXISTS delivery_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_type VARCHAR(50) DEFAULT 'Two-Wheeler EV',
    vehicle_number VARCHAR(30),
    driving_license_no VARCHAR(50),
    is_online BOOLEAN DEFAULT FALSE,
    current_lat DECIMAL(10,8),
    current_lng DECIMAL(11,8),
    total_trips_completed INT DEFAULT 0,
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    rating_avg DECIMAL(3,2) DEFAULT 4.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0
);

-- 6. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    category_id VARCHAR(50) REFERENCES categories(id),
    name_en VARCHAR(150) NOT NULL,
    name_hi VARCHAR(150) NOT NULL,
    description_en TEXT,
    description_hi TEXT,
    price_per_kg DECIMAL(10,2) NOT NULL,
    mandi_rate_per_kg DECIMAL(10,2) NOT NULL,
    stock_kg DECIMAL(10,2) DEFAULT 50.0,
    unit_type VARCHAR(20) DEFAULT 'kg',
    image_url TEXT,
    freshness_tag VARCHAR(100) DEFAULT 'Mandi Fresh Today',
    is_organic BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. COUPONS TABLE
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(30) UNIQUE NOT NULL,
    discount_type VARCHAR(20) DEFAULT 'FLAT',
    discount_value DECIMAL(10,2) NOT NULL,
    min_order_value DECIMAL(10,2) DEFAULT 0,
    max_discount_cap DECIMAL(10,2),
    valid_from TIMESTAMP WITH TIME ZONE,
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

-- 8. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    delivery_partner_id UUID REFERENCES delivery_partners(id),
    status order_status DEFAULT 'PLACED',
    delivery_mode delivery_mode DEFAULT 'EXPRESS_DELIVERY',
    delivery_address JSONB,
    subtotal DECIMAL(10,2) NOT NULL,
    coupon_id UUID REFERENCES coupons(id),
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    delivery_fee DECIMAL(10,2) DEFAULT 15.00,
    packaging_fee DECIMAL(10,2) DEFAULT 5.00,
    platform_commission_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_mode payment_mode DEFAULT 'PHONEPE_UPI',
    payment_status payment_status DEFAULT 'PENDING',
    payment_reference_id VARCHAR(100),
    delivery_otp VARCHAR(6) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP WITH TIME ZONE
);

-- 9. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity_grams INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- 10. REVIEWS & RATINGS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id),
    customer_id UUID NOT NULL REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. PLATFORM CONFIG / ADMIN SETTINGS
CREATE TABLE IF NOT EXISTS platform_settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_vendor ON orders(vendor_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
