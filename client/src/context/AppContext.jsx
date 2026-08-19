import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, initialCoupons, initialVendors, initialDeliveryPartners, initialOrders } from '../data/clientData';

const AppContext = createContext();

export const translations = {
  en: {
    appName: 'SabziMitra',
    tagline: 'Fresh Mandi Produce in 15 Minutes',
    roleCustomer: 'Customer',
    roleVendor: 'Vendor / Farmer',
    roleDelivery: 'Delivery Partner',
    roleAdmin: 'Admin Command',
    searchPlaceholder: 'Search fresh veggies (e.g. Potato, Palak, Tomato)...',
    categories: 'Categories',
    all: 'All Vegetables',
    essentials: 'Daily Essentials',
    leafy: 'Leafy Greens',
    exotic: 'Exotics & Salads',
    organic: '100% Organic',
    combos: 'Veggie Baskets',
    freshness: 'Freshness Guarantee',
    addToCart: 'Add to Cart',
    cart: 'Your Basket',
    emptyCart: 'Your basket is empty! Add fresh veggies.',
    deliveryExpress: '⚡ 15-30 Min Express Delivery',
    deliveryPickup: '🏪 Self Shop Pickup (Free)',
    mandiPrice: 'Mandi Rate',
    ourPrice: 'SabziMitra Rate',
    billDetails: 'Bill Summary',
    itemTotal: 'Item Total',
    deliveryFee: 'Delivery Fee',
    packagingFee: 'Eco-Packaging',
    couponDiscount: 'Coupon Discount',
    toPay: 'Total to Pay',
    applyCoupon: 'Apply Coupon',
    proceedToPay: 'Proceed to Checkout',
    trackOrder: 'Track Live Order',
    vendorPortal: 'Vendor Partner Dashboard',
    deliveryPortal: 'Delivery Partner App',
    adminPortal: 'Super Admin Command Center',
    otpShare: 'Share Delivery OTP with Rider',
    orderPlaced: 'Order Placed',
    orderPacked: 'Packed by Mandi Vendor',
    orderOnWay: 'Out for Delivery',
    orderDelivered: 'Delivered Fresh',
    mandiFresh: 'Mandi Fresh Today',
    viewDetails: 'View Details',
    weeklyBox: 'Weekly Subscription Box',
    buildBox: 'Customize Weekly Basket',
    login: 'Sign In / Register',
    logout: 'Sign Out',
    myAccount: 'My Account'
  },
  hi: {
    appName: 'सब्ज़ी मित्र',
    tagline: '15 मिनट में खेत से सीधे आपकी रसोई तक',
    roleCustomer: 'ग्राहक (Customer)',
    roleVendor: 'दुकानदार / किसान (Vendor)',
    roleDelivery: 'डिलीवरी साथी (Rider)',
    roleAdmin: 'एडमिन कंट्रोल (Admin)',
    searchPlaceholder: 'ताज़ा सब्जियां खोजें (जैसे आलू, पालक, टमाटर)...',
    categories: 'सब्जियों की श्रेणियां',
    all: 'सभी सब्जियां',
    essentials: 'दैनिक आवश्यकताएं (Daily)',
    leafy: 'हरी पत्तेदार सब्जियां',
    exotic: 'विदेशी व सलाद',
    organic: '100% जैविक व शुद्ध',
    combos: 'सब्जी बॉस्केट / कॉम्बो',
    freshness: 'ताज़गी की 100% गारंटी',
    addToCart: 'थैले में जोड़ें',
    cart: 'आपकी सब्जी की टोकरी',
    emptyCart: 'आपकी टोकरी खाली है! ताज़ा सब्जियां जोड़ें।',
    deliveryExpress: '⚡ 15-30 मिनट सुपरफास्ट डिलीवरी',
    deliveryPickup: '🏪 दुकान से खुद उठाएं (निःशुल्क)',
    mandiPrice: 'मंडी भाव',
    ourPrice: 'सब्ज़ी मित्र भाव',
    billDetails: 'बिल का विवरण',
    itemTotal: 'सब्जियों का कुल मूल्य',
    deliveryFee: 'डिलीवरी शुल्क',
    packagingFee: 'इको पैकेजिंग',
    couponDiscount: 'कूपन छूट',
    toPay: 'कुल भुगतान',
    applyCoupon: 'कूपन लागू करें',
    proceedToPay: 'भुगतान व ऑर्डर करें',
    trackOrder: 'लाइव ऑर्डर ट्रैक करें',
    vendorPortal: 'दुकानदार / विक्रेता डैशबोर्ड',
    deliveryPortal: 'डिलीवरी साथी ऐप',
    adminPortal: 'सुपर एडमिन कंट्रोल रूम',
    otpShare: 'डिलीवरी ओटीपी डिलीवरी साथी को बताएं',
    orderPlaced: 'ऑर्डर प्राप्त हुआ',
    orderPacked: 'दुकानदार ने पैक किया',
    orderOnWay: 'रास्ते में है (On the Way)',
    orderDelivered: 'सफलतापूर्वक पहुंच गया',
    mandiFresh: 'आज सुबह की ताज़ा फसल',
    viewDetails: 'विवरण देखें',
    weeklyBox: 'साप्ताहिक सब्जी सब्सक्रिप्शन',
    buildBox: 'अपना साप्ताहिक बॉक्स बनाएं',
    login: 'लॉगिन / खाता',
    logout: 'लॉगआउट',
    myAccount: 'मेरा खाता'
  }
};

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('sm_role') || 'CUSTOMER';
  });

  const [lang, setLang] = useState(() => {
    return localStorage.getItem('sm_lang') || 'hi';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('sm_theme') || 'light';
  });

  // User Auth State with LocalStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sm_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: 'usr-cust-1',
      name: 'Pooja Verma',
      contact: '+919928123456',
      email: 'pooja.verma@example.com',
      address: 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur',
      mandiLocation: 'APMC Muhana Mandi, Gate 2, Jaipur',
      role: 'CUSTOMER',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isAuthenticated: true
    };
  });

  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [coupons, setCoupons] = useState(initialCoupons);

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('sm_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialOrders;
  });

  const [activeOrderId, setActiveOrderId] = useState('ORD-9821');

  const [vendors, setVendors] = useState(initialVendors);
  const [deliveryPartners, setDeliveryPartners] = useState(initialDeliveryPartners);

  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('sm_user_loc');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      lat: 26.8525,
      lng: 75.8235,
      address: 'Malviya Nagar, Jaipur',
      isLiveGps: false
    };
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [commissionRate, setCommissionRate] = useState(8.5);

  const t = translations[lang] || translations.hi;

  // Request & Detect Accurate User Location (GPS)
  const requestUserLocation = (silent = false) => {
    if (!navigator.geolocation) {
      if (!silent) showToast('Location Error', 'Geolocation is not supported by your browser', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let detectedAddress = `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E (Jaipur)`;
        try {
          const res = await fetch(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=MsX5E5sG2GFTtK8L6GRT`);
          const data = await res.json();
          if (data && data.features && data.features.length > 0) {
            detectedAddress = data.features[0].place_name || data.features[0].text;
          }
        } catch (e) {}

        const loc = { lat: latitude, lng: longitude, address: detectedAddress, isLiveGps: true };
        setUserLocation(loc);
        localStorage.setItem('sm_user_loc', JSON.stringify(loc));
        updateUserProfile({ address: detectedAddress });

        showToast(
          lang === 'hi' ? '📍 लोकेशन प्राप्त हुई!' : '📍 Accurate GPS Detected!',
          `Doorstep tracking set to: ${detectedAddress.slice(0, 38)}...`,
          'success'
        );
      },
      (err) => {
        if (!silent) {
          showToast(
            'Location Permission Required',
            'Please allow browser location access for precise 15-min delivery tracking.',
            'warning'
          );
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sm_theme', theme);
  }, [theme]);

  // Persist language
  useEffect(() => {
    localStorage.setItem('sm_lang', lang);
  }, [lang]);

  // Persist role
  useEffect(() => {
    if (role !== 'PROFILE') {
      localStorage.setItem('sm_role', role);
    }
  }, [role]);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('sm_user', JSON.stringify(user));
    }
  }, [user]);

  // Persist orders
  useEffect(() => {
    if (orders) {
      localStorage.setItem('sm_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Update Profile
  const updateUserProfile = (updatedFields) => {
    setUser(prev => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('sm_user', JSON.stringify(updated));
      return updated;
    });
    showToast(
      lang === 'hi' ? 'प्रोफ़ाइल अपडेट हुई' : 'Profile Updated',
      lang === 'hi' ? 'आपकी जानकारी सफलतापूर्वक सुरक्षित कर ली गई है।' : 'Your details have been saved successfully.',
      'success'
    );
  };

  // Auth Operations
  const login = (userData) => {
    const fullUser = {
      ...userData,
      email: userData.email || `${userData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      address: userData.address || 'Flat 402, Green Valley Apartments, Jaipur',
      isAuthenticated: true
    };
    setUser(fullUser);
    setRole(userData.role || 'CUSTOMER');
  };

  const logout = () => {
    const guest = {
      id: null,
      name: 'Guest User',
      contact: '',
      email: '',
      address: '',
      role: 'CUSTOMER',
      avatar: null,
      isAuthenticated: false
    };
    setUser(guest);
    setRole('CUSTOMER');
    showToast(
      lang === 'hi' ? 'लॉगआउट हुआ' : 'Logged Out',
      'You have been logged out safely.'
    );
  };

  // Cart operations
  const addToCart = (product, portion = '1 kg', portionMultiplier = 1) => {
    const itemKey = `${product.id}-${portion}`;
    const unitPrice = Math.round(product.pricePerKg * portionMultiplier);

    setCart(prev => {
      const exists = prev.find(item => item.itemKey === itemKey);
      if (exists) {
        return prev.map(item =>
          item.itemKey === itemKey ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          itemKey,
          portion,
          portionMultiplier,
          unitPrice,
          qty: 1
        }
      ];
    });

    showToast(
      lang === 'hi' ? 'थैले में जोड़ा गया' : 'Added to Basket',
      `${lang === 'hi' ? product.nameHi : product.nameEn} (${portion})`
    );
  };

  const updateCartQty = (itemKey, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Coupon apply
  const applyCouponCode = (code) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

    if (!coupon) {
      showToast('Invalid Coupon', 'Please enter a valid coupon code like FRESH50 or SABZIMITRA', 'error');
      return false;
    }
    if (cartSubtotal < coupon.minOrderValue) {
      showToast(
        'Minimum Order Required',
        `Add items worth ₹${coupon.minOrderValue - cartSubtotal} more to use ${coupon.code}`,
        'warning'
      );
      return false;
    }

    let discount = coupon.discountType === 'FLAT'
      ? coupon.discountValue
      : (cartSubtotal * coupon.discountValue) / 100;
    if (coupon.maxCap && discount > coupon.maxCap) {
      discount = coupon.maxCap;
    }

    setAppliedCoupon({
      code: coupon.code,
      discount: Math.round(discount),
      description: coupon.description
    });

    showToast(
      lang === 'hi' ? 'कूपन लागू हुआ!' : 'Coupon Applied!',
      `Saved ₹${Math.round(discount)} with ${coupon.code}`
    );
    return true;
  };

  // Place Order
  const createOrder = (orderPayload) => {
    const orderNumber = `SM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ORD-${Date.now()}`,
      orderNumber,
      status: 'PLACED',
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      estimatedMins: 15,
      createdAt: new Date().toISOString(),
      vendorId: 'vnd-01',
      vendorName: 'Sharma Fresh Sabzi Bhandar',
      vendorAddress: 'Shop #14, APMC Muhana Mandi, Gate 2, Jaipur',
      vendorPhone: '+91 98290 11223',
      deliveryPartnerId: 'dlv-01',
      deliveryPartnerName: 'Vikram Choudhary',
      deliveryPartnerPhone: '+91 98877 66554',
      customerName: user.name || 'Pooja Verma',
      customerPhone: user.contact || user.phone || '+91 9928123456',
      deliveryAddress: orderPayload.deliveryAddress || user.address || 'Flat 402, Green Valley Apartments, Malviya Nagar, Jaipur',
      ...orderPayload
    };

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('sm_orders', JSON.stringify(updated));
      return updated;
    });
    setActiveOrderId(newOrder.id);
    clearCart();
    setIsCheckoutOpen(false);

    showToast(
      lang === 'hi' ? '🎉 ऑर्डर सफल!' : '🎉 Order Placed!',
      `Order #${orderNumber} placed. Preparing fresh vegetables.`
    );
    return newOrder;
  };

  // Order status advancement
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast('Order Update', `Order status changed to ${newStatus}`);
  };

  // Product price & stock updates
  const updateProductPrice = (id, newPrice, newStock) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, pricePerKg: Number(newPrice), stockKg: Number(newStock) } : p
      )
    );
    showToast('Price Updated', 'Produce pricing updated in live customer catalog');
  };

  // Vendor KYC status
  const updateVendorKyc = (vendorId, status) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, kycStatus: status } : v))
    );
    showToast('KYC Updated', `Vendor KYC status changed to ${status}`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        lang,
        setLang,
        theme,
        setTheme,
        user,
        updateUserProfile,
        userLocation,
        setUserLocation,
        requestUserLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        t,
        products,
        setProducts,
        cart,
        addToCart,
        updateCartQty,
        clearCart,
        coupons,
        appliedCoupon,
        applyCouponCode,
        orders,
        activeOrderId,
        setActiveOrderId,
        createOrder,
        updateOrderStatus,
        vendors,
        deliveryPartners,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSubscriptionOpen,
        setIsSubscriptionOpen,
        isKycModalOpen,
        setIsKycModalOpen,
        toastMessage,
        showToast,
        updateProductPrice,
        updateVendorKyc,
        commissionRate,
        setCommissionRate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
