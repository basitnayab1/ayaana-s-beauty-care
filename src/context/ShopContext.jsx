import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, BRAND_CONFIG } from '../data/products';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Products state (auto-merges new official products & preserves admin changes)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('ayaana_products');
    if (!saved) return PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map((p) => p.id));
      const missingFromOfficial = PRODUCTS.filter((p) => !existingIds.has(p.id));
      return [...missingFromOfficial, ...parsed];
    } catch {
      return PRODUCTS;
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('ayaana_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('ayaana_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Currency: 'PKR' or 'USD'
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('ayaana_currency') || 'PKR';
  });

  // Active discount code
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null); // { code, percent, label }

  // Modal / Drawer visibility
  const [activeProduct, setActiveProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Admin authentication state
  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('ayaana_admin_creds');
    return saved ? JSON.parse(saved) : { email: "admin@ayaanas.com", password: "ayaana123" };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('ayaana_admin_logged_in') === 'true';
  });

  // Recent order state for tracking & confirmation
  const [recentOrders, setRecentOrders] = useState(() => {
    const saved = localStorage.getItem('ayaana_orders');
    return saved ? JSON.parse(saved) : [
      {
        orderId: "AY-89241",
        customerName: "Ayesha Malik",
        phone: "+92 300 1234567",
        city: "Lahore",
        address: "Gulberg III, Lahore",
        paymentMethod: "Cash on Delivery (COD)",
        items: [
          { name: "Radiance Skin Repair Cream", volume: "50ml", quantity: 1, pricePKR: 2850, priceUSD: 18 }
        ],
        total: 2850,
        currency: "PKR",
        status: "In Transit",
        date: "2026-09-18",
        courier: "TCS Express",
        trackingNo: "TCS992014881"
      }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ayaana_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ayaana_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ayaana_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('ayaana_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ayaana_orders', JSON.stringify(recentOrders));
  }, [recentOrders]);

  useEffect(() => {
    localStorage.setItem('ayaana_admin_creds', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  useEffect(() => {
    localStorage.setItem('ayaana_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Lock background body scroll when any modal or drawer is active
  useEffect(() => {
    const isAnyModalOpen = Boolean(
      activeProduct || isCartOpen || isWishlistOpen || isCheckoutOpen || isTrackingOpen || isAdminOpen
    );
    if (isAnyModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [activeProduct, isCartOpen, isWishlistOpen, isCheckoutOpen, isTrackingOpen, isAdminOpen]);

  // Admin Auth Methods
  const adminLogin = (emailOrUser, password) => {
    const inputClean = (emailOrUser || '').trim().toLowerCase();
    const credEmail = (adminCredentials.email || '').toLowerCase();
    if (
      (inputClean === credEmail || inputClean === 'admin' || inputClean === 'ayaana') &&
      password === adminCredentials.password
    ) {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password. Default: admin@ayaanas.com / ayaana123" };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const updateAdminPassword = (newPassword) => {
    setAdminCredentials((prev) => ({ ...prev, password: newPassword }));
    return { success: true };
  };

  // Admin Product Management
  const addNewProduct = (newProd) => {
    const id = (newProd.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const productToAdd = {
      id,
      name: newProd.name,
      tagline: newProd.tagline || "Artisanal botanical beauty formulation",
      category: newProd.category || "repair-creams",
      categoryName: newProd.categoryName || "Repair Creams",
      volume: newProd.volume || "50ml",
      pricePKR: Number(newProd.pricePKR) || 2500,
      originalPricePKR: Number(newProd.originalPricePKR) || Math.round(Number(newProd.pricePKR) * 1.2),
      priceUSD: Number((Number(newProd.pricePKR) * 0.0036).toFixed(2)) || 15.00,
      originalPriceUSD: Number((Number(newProd.pricePKR) * 0.0036 * 1.2).toFixed(2)) || 18.00,
      rating: 5.0,
      reviewsCount: 1,
      badge: newProd.badge || "New Arrival",
      isHero: false,
      image: newProd.image || "/assets/hero_cream.jpg",
      description: newProd.description || "Crafted with pure botanicals and calibrated active brighteners for radiant daily skin renewal.",
      howToUse: newProd.howToUse || "Apply evenly on clean face morning and evening.",
      ingredients: newProd.ingredients || "Organic Rose Water, Niacinamide, Ceramides, Herbal Extracts.",
      benefits: ["Restores skin barrier", "Promotes natural luminous glow", "Deep 72h moisture"],
      clinicalResults: "100% agreed skin felt smoother and brighter.",
      stock: Number(newProd.stock) || 50
    };

    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setRecentOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Price formatting helper for dual currency (amountPKR, amountUSD)
  const formatPrice = (amountPKR, amountUSD) => {
    if (currency === 'USD') {
      const val = amountUSD !== undefined ? amountUSD : (amountPKR * BRAND_CONFIG.currency.USD.rate);
      return `$${Number(val).toFixed(2)}`;
    }
    return `Rs. ${Math.round(Number(amountPKR)).toLocaleString()}`;
  };

  // Helper when value is already in the currently active currency
  const formatCurrency = (val) => {
    if (currency === 'USD') {
      return `$${Number(val).toFixed(2)}`;
    }
    return `Rs. ${Math.round(Number(val)).toLocaleString()}`;
  };

  const getNumericPrice = (product) => {
    return currency === 'USD' ? product.priceUSD : product.pricePKR;
  };

  // Cart operations
  const addToCart = (product, quantity = 1, volume = null) => {
    const selectedVolume = volume || product.volume;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.volume === selectedVolume
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, volume: selectedVolume }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, volume) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.volume === volume)));
  };

  const updateCartQuantity = (productId, volume, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, volume);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.volume === volume
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Cart financial calculations
  const cartSubtotalPKR = cart.reduce((sum, item) => sum + item.pricePKR * item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

  const cartSubtotal = currency === 'USD' ? cartSubtotalUSD : cartSubtotalPKR;

  // Discount calculation
  const discountAmount = appliedDiscount
    ? (cartSubtotal * (appliedDiscount.percent / 100))
    : 0;

  // Shipping calculation
  const isFreeShipping = currency === 'USD'
    ? cartSubtotal >= BRAND_CONFIG.shippingThresholdUSD
    : cartSubtotal >= BRAND_CONFIG.shippingThresholdPKR;

  const shippingFee = cart.length === 0 || isFreeShipping
    ? 0
    : (currency === 'USD' ? BRAND_CONFIG.expressDeliveryFeeUSD : BRAND_CONFIG.expressDeliveryFeePKR);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const totalCartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Apply promo code
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (BRAND_CONFIG.promoCodes[cleanCode]) {
      const promo = BRAND_CONFIG.promoCodes[cleanCode];
      setAppliedDiscount({
        code: cleanCode,
        percent: promo.discountPercent,
        label: promo.label
      });
      return { success: true, message: `${promo.label} applied!` };
    }
    return { success: false, message: "Invalid promo code. Try 'GLOW10' or 'AYAANA20'" };
  };

  const removeCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode('');
  };

  // WhatsApp Order Link Generator
  const generateWhatsAppOrderUrl = (customerDetails = null) => {
    if (cart.length === 0) return `https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}`;

    let message = `*🌸 NEW ORDER - AYAANA'S LUXURY SKINCARE* 🌸\n\n`;
    message += `*Items Ordered:*\n`;
    cart.forEach((item, idx) => {
      const itemPrice = currency === 'USD' ? `$${item.priceUSD}` : `Rs. ${item.pricePKR}`;
      message += `${idx + 1}. *${item.name}* (${item.volume}) x ${item.quantity} = ${itemPrice}\n`;
    });

    message += `\n*Subtotal:* ${formatPrice(cartSubtotalPKR, cartSubtotalUSD)}`;
    if (appliedDiscount) {
      message += `\n*Discount (${appliedDiscount.code}):* -${formatPrice(cartSubtotalPKR * (appliedDiscount.percent / 100), cartSubtotalUSD * (appliedDiscount.percent / 100))}`;
    }
    message += `\n*Shipping:* ${isFreeShipping ? "FREE Delivery" : formatPrice(BRAND_CONFIG.expressDeliveryFeePKR, BRAND_CONFIG.expressDeliveryFeeUSD)}`;
    message += `\n*Grand Total:* *${formatPrice(cartTotal, cartTotal)}*\n`;

    if (customerDetails) {
      message += `\n*Customer Shipping Details:*`;
      message += `\n• *Name:* ${customerDetails.name}`;
      message += `\n• *Phone:* ${customerDetails.phone}`;
      message += `\n• *City:* ${customerDetails.city}`;
      message += `\n• *Delivery Address:* ${customerDetails.address}`;
      if (customerDetails.paymentMethod) {
        message += `\n• *Payment:* ${customerDetails.paymentMethod}`;
      }
    } else {
      message += `\n_Please confirm my order and share estimated dispatch details!_`;
    }

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encoded}`;
  };

  // Quick single product WhatsApp order URL
  const generateSingleProductWhatsAppUrl = (product, volume = null) => {
    const selectedVolume = volume || product.volume;
    const priceStr = formatPrice(product.pricePKR, product.priceUSD);
    const text = `*Hello Ayaana's Team!* 🌸\n\nI want to order:\n*Product:* ${product.name} (${selectedVolume})\n*Price:* ${priceStr}\n\nPlease confirm availability and dispatch timeline. Thank you!`;
    return `https://wa.me/${BRAND_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
  };

  // Place online order (creates mock order with tracking)
  const placeOrder = (orderData) => {
    const newOrderId = `AY-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId: newOrderId,
      customerName: orderData.name,
      phone: orderData.phone,
      city: orderData.city,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod || "Cash on Delivery (COD)",
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: cartTotal,
      currency,
      status: "Processing Order",
      date: new Date().toISOString().split('T')[0],
      courier: "TCS Express & Trax",
      trackingNo: `TRX${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setRecentOrders([newOrder, ...recentOrders]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        addNewProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currency,
        setCurrency,
        formatPrice,
        formatCurrency,
        getNumericPrice,
        cartSubtotalPKR,
        cartSubtotalUSD,
        cartSubtotal,
        discountAmount,
        appliedDiscount,
        applyCoupon,
        removeCoupon,
        couponCode,
        setCouponCode,
        isFreeShipping,
        shippingFee,
        cartTotal,
        totalCartCount,
        activeProduct,
        setActiveProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isTrackingOpen,
        setIsTrackingOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        adminCredentials,
        updateAdminPassword,
        recentOrders,
        updateOrderStatus,
        placeOrder,
        generateWhatsAppOrderUrl,
        generateSingleProductWhatsAppUrl
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
