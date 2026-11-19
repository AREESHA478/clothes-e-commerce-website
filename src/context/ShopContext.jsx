import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/products';

const ShopContext = createContext();

// Sample Demo Orders
const defaultInitialOrders = [
  {
    id: 'OLV-849201',
    date: '2026-10-25',
    status: 'In Transit', // 'Processing', 'Quality Check', 'In Transit', 'Delivered'
    deliveryEta: 'Today by 6:00 PM',
    courier: 'TCS Express Premier',
    courierTrackingNumber: 'TCS-9948210492',
    courierRider: 'Ahsan Ali (+92 300 4819201)',
    recipient: {
      fullName: 'Fatima Zahra',
      phone: '0321-9876543',
      address: 'House 42, Street 7, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000'
    },
    paymentMethod: 'Credit Card (Visa •••• 4242)',
    paymentStatus: 'Paid Online',
    subtotal: 14500,
    shippingCost: 0,
    discountAmount: 1450,
    total: 13050,
    timeline: [
      { title: 'Order Confirmed & Payment Verified', time: 'Oct 25, 10:30 AM', completed: true },
      { title: 'Bespoke Atelier Inspection & Gold Seal', time: 'Oct 25, 03:15 PM', completed: true },
      { title: 'Dispatched via TCS Express Central Hub', time: 'Oct 26, 09:00 AM', completed: true },
      { title: 'Out for Delivery with Courier Rider', time: 'Oct 27, 08:30 AM', completed: true, current: true },
      { title: 'Package Delivered & Signed', time: 'Expected Today', completed: false }
    ],
    items: [
      {
        id: 'olv-001',
        name: 'Atelier French Linen Trench Coat',
        size: 'M',
        color: 'Olive Green',
        quantity: 1,
        price: 14500,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'OLV-712390',
    date: '2026-10-10',
    status: 'Delivered',
    deliveryEta: 'Delivered on Oct 13',
    courier: 'Leopards Courier Luxury Dispatch',
    courierTrackingNumber: 'LEO-4820194821',
    courierRider: 'Waqas Khan',
    recipient: {
      fullName: 'Fatima Zahra',
      phone: '0321-9876543',
      address: 'House 42, Street 7, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000'
    },
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'Paid on Delivery',
    subtotal: 12200,
    shippingCost: 450,
    discountAmount: 0,
    total: 12650,
    timeline: [
      { title: 'Order Confirmed', time: 'Oct 10, 02:20 PM', completed: true },
      { title: 'Atelier Packaging Complete', time: 'Oct 11, 11:00 AM', completed: true },
      { title: 'Dispatched via Leopards Courier', time: 'Oct 11, 04:45 PM', completed: true },
      { title: 'Out for Courier Delivery', time: 'Oct 13, 09:15 AM', completed: true },
      { title: 'Package Handed Over to Client', time: 'Oct 13, 01:40 PM', completed: true, current: true }
    ],
    items: [
      {
        id: 'olv-002',
        name: 'Raw Silk & Linen Kurta Co-ord',
        size: 'S',
        color: 'Cream Ivory',
        quantity: 1,
        price: 12200,
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

// Sample Initial User Profile
const defaultDemoUser = {
  id: 'usr-991',
  name: 'Fatima Zahra',
  email: 'fatima.zahra@example.com',
  phone: '0321-9876543',
  tier: 'Atelier Client',
  stylePreference: 'Relaxed Tailoring & Pure Linens',
  memberSince: '2024',
  addresses: [
    {
      id: 'addr-1',
      isDefault: true,
      title: 'Home (DHA)',
      fullName: 'Fatima Zahra',
      address: 'House 42, Street 7, Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000',
      phone: '0321-9876543'
    },
    {
      id: 'addr-2',
      isDefault: false,
      title: 'Design Studio / Office',
      fullName: 'Fatima Zahra',
      address: 'Suite 401, Gulberg Galleria, Main Boulevard',
      city: 'Lahore',
      postalCode: '54660',
      phone: '0300-1234567'
    }
  ],
  savedCards: [
    {
      id: 'card-1',
      brand: 'Visa',
      last4: '4242',
      expiry: '09/28',
      holder: 'FATIMA ZAHRA',
      isDefault: true
    },
    {
      id: 'card-2',
      brand: 'Mastercard',
      last4: '8831',
      expiry: '11/27',
      holder: 'FATIMA ZAHRA',
      isDefault: false
    }
  ]
};

export const ShopProvider = ({ children }) => {
  // Products state (allows searching/filtering)
  const [products] = useState(initialProducts);

  // Currency State: PKR (default) or USD
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('olivera_currency') || 'PKR';
  });

  const exchangeRate = 0.0036; // 1 PKR ~ 0.0036 USD (or $1 ~ 280 PKR)

  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('olivera_user');
      return savedUser ? JSON.parse(savedUser) : defaultDemoUser;
    } catch {
      return defaultDemoUser;
    }
  });

  // Orders State with LocalStorage
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('olivera_orders');
      return savedOrders ? JSON.parse(savedOrders) : defaultInitialOrders;
    } catch {
      return defaultInitialOrders;
    }
  });

  // Cart State with LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('olivera_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('olivera_wishlist');
      return saved ? JSON.parse(saved) : ['olv-001', 'olv-006'];
    } catch {
      return ['olv-001', 'olv-006'];
    }
  });

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals / Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // New Modals: Auth Modal, Account Modal, Order Tracking Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login', 'register', 'forgot'
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeAccountTab, setActiveAccountTab] = useState('orders'); // 'orders', 'profile', 'addresses', 'savedCards'
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);

  // Product Reviews State
  const [productReviews, setProductReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('olivera_reviews');
      return saved ? JSON.parse(saved) : {
        'olv-001': [
          {
            id: 'rev-1',
            author: 'Ayesha Malik',
            rating: 5,
            date: '2 days ago',
            verified: true,
            comment: 'The drape and texture of this French Linen trench coat is simply world-class. Worth every single rupee!'
          },
          {
            id: 'rev-2',
            author: 'Mariam K.',
            rating: 5,
            date: '1 week ago',
            verified: true,
            comment: 'Such a timeless piece. Packaging was luxurious with gold wax seal. Ordered another for my sister.'
          }
        ]
      };
    } catch {
      return {};
    }
  });

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('olivera_cart', JSON.stringify(cart));
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('olivera_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save Currency
  useEffect(() => {
    localStorage.setItem('olivera_currency', currency);
  }, [currency]);

  // Save Orders
  useEffect(() => {
    localStorage.setItem('olivera_orders', JSON.stringify(orders));
  }, [orders]);

  // Save User
  useEffect(() => {
    if (user) {
      localStorage.setItem('olivera_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('olivera_user');
    }
  }, [user]);

  // Save Reviews
  useEffect(() => {
    localStorage.setItem('olivera_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  // Trigger Toast Alert
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Format Price Helper
  const formatPrice = (amountInPkr) => {
    if (currency === 'USD') {
      const usd = Math.round(amountInPkr * exchangeRate);
      return `$${usd.toLocaleString()}`;
    }
    return `Rs. ${amountInPkr.toLocaleString()}`;
  };

  // User Auth functions
  const login = (email) => {
    // Demo login simulator
    const nameFromEmail = email.split('@')[0];
    const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const loggedInUser = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: email === 'fatima.zahra@example.com' ? 'Fatima Zahra' : capitalizedName,
      email: email,
      phone: '0321-9876543',
      tier: 'Atelier Client',
      stylePreference: 'Relaxed Tailoring & Pure Linens',
      memberSince: '2024',
      addresses: defaultDemoUser.addresses,
      savedCards: defaultDemoUser.savedCards
    };
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${loggedInUser.name}!`, 'success');
  };

  const register = ({ name, email, phone }) => {
    const newUser = {
      id: 'usr-' + Date.now().toString().slice(-4),
      name: name.trim(),
      email: email.trim(),
      phone: phone || '0300-0000000',
      tier: 'Atelier Client',
      stylePreference: 'Classic Sartorial',
      memberSince: '2026',
      addresses: [],
      savedCards: []
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Welcome to OLIVÉRA Atelier, ${newUser.name}!`, 'success');
  };

  const updateUserProfile = (updatedFields) => {
    if (!user) return;
    setUser((prev) => ({
      ...prev,
      ...updatedFields
    }));
    showToast('Client profile updated successfully.', 'success');
  };

  const logout = () => {
    setUser(null);
    setIsAccountOpen(false);
    showToast('Signed out of your atelier account.', 'info');
  };

  const addSavedAddress = (newAddress) => {
    if (!user) return;
    const addressObj = {
      id: 'addr-' + Date.now(),
      isDefault: user.addresses.length === 0,
      ...newAddress
    };
    setUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, addressObj]
    }));
    showToast('New shipping address saved!', 'success');
  };

  const addSavedCard = (newCard) => {
    if (!user) return;
    const cardObj = {
      id: 'card-' + Date.now(),
      isDefault: user.savedCards.length === 0,
      ...newCard
    };
    setUser((prev) => ({
      ...prev,
      savedCards: [...prev.savedCards, cardObj]
    }));
    showToast('Payment card securely saved to your atelier profile!', 'success');
  };

  // Order Management
  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      status: 'Processing',
      deliveryEta: '3-4 Business Days',
      courier: 'TCS Express Gold Service',
      courierTrackingNumber: 'TCS-' + Math.floor(1000000000 + Math.random() * 9000000000),
      timeline: [
        { title: 'Order Confirmed & Placed', time: 'Just now', completed: true, current: true },
        { title: 'Atelier Inspection & Gift Box Packing', time: 'Pending', completed: false },
        { title: 'Courier Dispatch (TCS Express)', time: 'Pending', completed: false },
        { title: 'Out for Delivery', time: 'Pending', completed: false },
        { title: 'Delivered', time: 'Pending', completed: false }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);

    return newOrder;
  };

  const trackOrderById = (orderId) => {
    const cleanId = orderId ? orderId.trim().toUpperCase() : '';
    const found = orders.find((o) => o.id.toUpperCase() === cleanId);
    if (found) {
      setActiveTrackingOrder(found);
      setIsOrderTrackingOpen(true);
      return { success: true, order: found };
    } else {
      // Create live dynamic simulation if unknown order entered
      const simulatedOrder = {
        id: cleanId.startsWith('OLV-') ? cleanId : 'OLV-' + (cleanId || '924182'),
        date: 'Today',
        status: 'In Transit',
        deliveryEta: 'Tomorrow by 5:00 PM',
        courier: 'TCS Express Express Courier',
        courierTrackingNumber: 'TCS-8392019482',
        courierRider: 'Farhan Tariq (+92 321 8829102)',
        recipient: {
          fullName: user ? user.name : 'Valued Patron',
          phone: user ? user.phone : '0321-9876543',
          address: 'Phase 6, DHA',
          city: 'Lahore',
          postalCode: '54000'
        },
        paymentMethod: 'Verified Payment',
        paymentStatus: 'Settled',
        subtotal: 14500,
        shippingCost: 0,
        discountAmount: 0,
        total: 14500,
        timeline: [
          { title: 'Order Confirmed', time: 'Yesterday 11:00 AM', completed: true },
          { title: 'Dispatched from Lahore Atelier Hub', time: 'Today 09:30 AM', completed: true },
          { title: 'In Transit to Destination Hub', time: 'Today 01:15 PM', completed: true, current: true },
          { title: 'Out for Delivery', time: 'Tomorrow 09:00 AM', completed: false },
          { title: 'Delivered', time: 'Pending', completed: false }
        ],
        items: [
          {
            id: 'olv-001',
            name: 'Atelier French Linen Garment',
            size: 'Standard',
            color: 'Olive Green',
            quantity: 1,
            price: 14500,
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
          }
        ]
      };
      setActiveTrackingOrder(simulatedOrder);
      setIsOrderTrackingOpen(true);
      return { success: true, order: simulatedOrder };
    }
  };

  // Add review for product
  const addProductReview = (productId, review) => {
    const newRev = {
      id: 'rev-' + Date.now(),
      author: review.author || (user ? user.name : 'Verified Patron'),
      rating: review.rating || 5,
      date: 'Just now',
      verified: true,
      comment: review.comment
    };
    setProductReviews((prev) => ({
      ...prev,
      [productId]: [newRev, ...(prev[productId] || [])]
    }));
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  // Add to Cart
  const addToCart = (product, size = null, color = null, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const itemKey = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            itemKey,
            productId: product.id,
            product,
            size: chosenSize,
            color: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${chosenSize}) to cart!`, 'cart');
  };

  // Update Cart Quantity
  const updateCartQuantity = (itemKey, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove single item from cart
  const removeFromCart = (itemKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.itemKey !== itemKey));
    showToast('Item removed from cart', 'info');
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Toggle Wishlist
  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const prod = products.find((p) => p.id === productId);

    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed "${prod ? prod.name : 'Item'}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved "${prod ? prod.name : 'Item'}" to wishlist!`, 'heart');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Apply Coupon code
  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'OLIVE10') {
      setAppliedCoupon({ code: 'OLIVE10', discountPercent: 10, label: '10% Welcome Discount' });
      showToast('Coupon OLIVE10 applied! 10% discount added.', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (normalized === 'CREAM20') {
      setAppliedCoupon({ code: 'CREAM20', discountPercent: 20, label: '20% VIP Autumn Sale' });
      showToast('Coupon CREAM20 applied! 20% discount added.', 'success');
      return { success: true, message: '20% discount applied!' };
    } else {
      showToast('Invalid coupon. Try OLIVE10 or CREAM20', 'error');
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 10000; // Free shipping on Rs 10,000+
  const standardShippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 450;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + standardShippingCost);
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
        cartSubtotal,
        discountAmount,
        standardShippingCost,
        cartTotal,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isWishlisted,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        // Modal states
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        // Auth & User
        user,
        setUser,
        login,
        register,
        logout,
        updateUserProfile,
        addSavedAddress,
        addSavedCard,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        isAccountOpen,
        setIsAccountOpen,
        activeAccountTab,
        setActiveAccountTab,
        // Orders & Tracking
        orders,
        addOrder,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        activeTrackingOrder,
        setActiveTrackingOrder,
        trackOrderById,
        // Reviews
        productReviews,
        addProductReview,
        // Toast
        toast,
        setToast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

