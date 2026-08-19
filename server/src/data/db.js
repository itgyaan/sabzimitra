import {
  initialCategories,
  initialProducts,
  initialCoupons,
  initialVendors,
  initialDeliveryPartners,
  initialOrders
} from './seedData.js';

class InMemoryStore {
  constructor() {
    this.categories = [...initialCategories];
    this.products = [...initialProducts];
    this.coupons = [...initialCoupons];
    this.vendors = [...initialVendors];
    this.deliveryPartners = [...initialDeliveryPartners];
    this.orders = [...initialOrders];
    this.banners = [
      {
        id: 'ban-01',
        titleEn: '⚡ 15-Min Farm to Kitchen Delivery',
        titleHi: '⚡ 15 मिनट में खेत से सीधे आपकी रसोई तक',
        subtitleEn: 'Zero chemicals, sorted & ozone washed daily',
        subtitleHi: 'रसायन मुक्त, रोज़ सुबह ताज़ा छंटाई व सफाई',
        badge: 'FLAT ₹50 OFF',
        code: 'FRESH50',
        bgGradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        active: true
      },
      {
        id: 'ban-02',
        titleEn: '🌿 Weekly Organic Veggie Basket',
        titleHi: '🌿 साप्ताहिक ऑर्गेनिक सब्जी बॉस्केट',
        subtitleEn: 'Pre-planned weekly boxes with 100% certified organic veggies',
        subtitleHi: 'सप्ताह भर की ताज़ा हरी सब्जियों का सुरक्षित पैकेज',
        badge: 'SAVE 20%',
        code: 'SABZIMITRA',
        bgGradient: 'linear-gradient(135deg, #047857 0%, #065F46 100%)',
        active: true
      }
    ];
    this.settings = {
      platformCommissionPct: 8.5,
      deliveryFeeBase: 15,
      packagingFee: 5,
      freeDeliveryThreshold: 299,
      isEmergencyMode: false,
      systemHealth: 'OPERATIONAL'
    };
    this.notifications = [
      {
        id: 'notif-1',
        title: 'Morning Mandi Rates Updated',
        message: 'Fresh prices for Tomatoes and Onions updated according to today APMC auction.',
        timestamp: new Date().toISOString(),
        read: false
      }
    ];
  }

  // Helpers
  getProducts(filters = {}) {
    let result = [...this.products];
    if (filters.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        p => p.nameEn.toLowerCase().includes(q) ||
             p.nameHi.includes(q) ||
             p.origin.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q)
      );
    }
    if (filters.organic === 'true') {
      result = result.filter(p => p.organic);
    }
    return result;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  updateProductPrice(id, { pricePerKg, stockKg, isAvailable }) {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      if (pricePerKg !== undefined) this.products[idx].pricePerKg = Number(pricePerKg);
      if (stockKg !== undefined) this.products[idx].stockKg = Number(stockKg);
      if (isAvailable !== undefined) this.products[idx].isAvailable = Boolean(isAvailable);
      return this.products[idx];
    }
    return null;
  }

  addProduct(productData) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      rating: 4.8,
      reviewsCount: 1,
      stockKg: 50,
      unit: 'kg',
      ...productData
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  // Orders
  createOrder(orderData) {
    const orderNumber = `SM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber,
      status: 'PLACED',
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      estimatedMins: 20,
      createdAt: new Date().toISOString(),
      ...orderData
    };
    this.orders.unshift(newOrder);

    // Auto update vendor metrics
    if (newOrder.vendorId) {
      const v = this.vendors.find(item => item.id === newOrder.vendorId);
      if (v) {
        v.todayOrders += 1;
        v.todayGmv += newOrder.totalAmount;
      }
    }

    return newOrder;
  }

  updateOrderStatus(orderId, status, extra = {}) {
    const order = this.orders.find(o => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = status;
      Object.assign(order, extra);
      return order;
    }
    return null;
  }

  // Vendors
  registerKyc(vendorData) {
    const newVendor = {
      id: `vnd-${Date.now()}`,
      kycStatus: 'PENDING',
      rating: 5.0,
      todayOrders: 0,
      todayGmv: 0,
      commissionPct: this.settings.platformCommissionPct,
      isOpen: true,
      ...vendorData
    };
    this.vendors.unshift(newVendor);
    return newVendor;
  }

  updateVendorKyc(vendorId, { status, rejectionReason }) {
    const v = this.vendors.find(item => item.id === vendorId);
    if (v) {
      v.kycStatus = status;
      if (rejectionReason) v.kycRejectionReason = rejectionReason;
      return v;
    }
    return null;
  }

  // Coupons
  applyCoupon(code, cartTotal) {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (!coupon) {
      return { valid: false, message: 'Invalid coupon code' };
    }
    if (cartTotal < coupon.minOrderValue) {
      return { valid: false, message: `Minimum order of ₹${coupon.minOrderValue} required for ${coupon.code}` };
    }

    let discount = 0;
    if (coupon.discountType === 'FLAT') {
      discount = coupon.discountValue;
    } else if (coupon.discountType === 'PERCENT') {
      discount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxCap && discount > coupon.maxCap) {
        discount = coupon.maxCap;
      }
    }
    return {
      valid: true,
      code: coupon.code,
      discount: Math.round(discount),
      message: `Coupon ${coupon.code} applied! Saved ₹${Math.round(discount)}`
    };
  }
}

export const db = new InMemoryStore();
