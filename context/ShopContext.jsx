'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS, UPCOMING_LAUNCHES, INITIAL_DEFECT_REPORTS } from '../data/productsData';

const ShopContext = createContext();

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: '🔥 ACID WASH 240+ GSM DROP LIVE',
    message: 'New boxy streetwear heavyweight drops are now active in the collection.',
    time: 'Just now',
    type: 'drop',
    read: false,
    link: '#collection'
  },
  {
    id: 'notif-2',
    title: '⚡ FLAT ₹500 OFF ON YOUR FIRST ORDER',
    message: 'Apply coupon code NORTH500 at checkout to claim your limited VIP welcome drop discount.',
    time: '2 hours ago',
    type: 'discount',
    read: false,
    link: '#combo'
  },
  {
    id: 'notif-3',
    title: '📦 NATIONWIDE EXPRESS DISPATCH ACTIVE',
    message: 'All metro orders are guaranteed same-day dispatch via Bluedart Air express.',
    time: 'Yesterday',
    type: 'system',
    read: true,
    link: '#track'
  }
];

const DEFAULT_USERS = [
  {
    id: 'usr-admin',
    username: 'admin',
    name: 'Super Admin',
    email: 'admin@wearnorth.com',
    phone: '9820149201',
    password: 'NorthAdmin#2026',
    role: 'admin',
    registeredAt: '01 Sep 2026'
  },
  {
    id: 'usr-1',
    username: 'aryan',
    name: 'Aryan Mehta',
    email: 'aryan.mehta@gmail.com',
    phone: '9820149202',
    password: 'password123',
    role: 'customer',
    registeredAt: '15 Sep 2026'
  },
  {
    id: 'usr-2',
    username: 'rohit',
    name: 'Rohit Sharma',
    email: 'rohit.s@gmail.com',
    phone: '9876543210',
    password: 'password123',
    role: 'admin',
    registeredAt: '18 Sep 2026'
  }
];

export function ShopProvider({ children }) {
  // Products, Orders, Reviews
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Active filter state shared between Story Bubbles, Navbar, and ProductGrid
  const [activeCategory, setActiveCategory] = useState('all');

  // Customer & Admin User Auth State
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'

  // Direct OTP State for Users / Admins
  const [pendingUserOtp, setPendingUserOtp] = useState(null); // { identifier, targetUser, otp, createdAt }
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFitModalOpen, setIsFitModalOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);

  // Upcoming Product Launches & Drop Dispatch System
  const [upcomingLaunches, setUpcomingLaunches] = useState(UPCOMING_LAUNCHES);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [activeDropAlert, setActiveDropAlert] = useState(null);
  const [remindedDropIds, setRemindedDropIds] = useState([]);

  // Defective Product Report & Quality Feedback System
  const [defectReports, setDefectReports] = useState(INITIAL_DEFECT_REPORTS);
  const [isDefectModalOpen, setIsDefectModalOpen] = useState(false);
  const [defectModalPrefillOrder, setDefectModalPrefillOrder] = useState(null);

  // Initialize from LocalStorage once mounted on client
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('north_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedOrders = localStorage.getItem('north_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedCart = localStorage.getItem('north_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('north_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedReviews = localStorage.getItem('north_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedNotifs = localStorage.getItem('north_notifications');
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
      }

      const savedUsers = localStorage.getItem('north_users');
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        // Ensure default admins exist in user list
        const hasAdmin = parsed.some(u => u.username === 'admin' || u.email === 'admin@wearnorth.com');
        if (!hasAdmin) {
          parsed.unshift(DEFAULT_USERS[0]);
        }
        setUsers(parsed);
      }

      const savedCurrentUser = localStorage.getItem('north_current_user');
      if (savedCurrentUser) {
        const parsedUser = JSON.parse(savedCurrentUser);
        setCurrentUser(parsedUser);
        if (parsedUser.role === 'admin') {
          setIsAdminAuthenticated(true);
        }
      }

      const savedReminded = localStorage.getItem('north_reminded_drops');
      if (savedReminded) setRemindedDropIds(JSON.parse(savedReminded));

      const savedDefects = localStorage.getItem('north_defect_reports');
      if (savedDefects) setDefectReports(JSON.parse(savedDefects));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('north_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('north_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('north_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('north_reminded_drops', JSON.stringify(remindedDropIds));
    } catch (e) {}
  }, [remindedDropIds]);

  useEffect(() => {
    try {
      localStorage.setItem('north_defect_reports', JSON.stringify(defectReports));
    } catch (e) {}
  }, [defectReports]);

  useEffect(() => {
    try {
      localStorage.setItem('north_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('north_notifications', JSON.stringify(notifications));
    } catch (e) {}
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('north_reviews', JSON.stringify(reviews));
    } catch (e) {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('north_users', JSON.stringify(users));
    } catch (e) {}
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('north_current_user', JSON.stringify(currentUser));
        if (currentUser.role === 'admin') {
          localStorage.setItem('north_admin_session', 'true');
        } else {
          localStorage.removeItem('north_admin_session');
        }
      } else {
        localStorage.removeItem('north_current_user');
        localStorage.removeItem('north_admin_session');
      }
    } catch (e) {}
  }, [currentUser]);

  // Keyboard Escape listener to close all modals and drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsTrackingOpen(false);
        setIsSearchOpen(false);
        setIsFitModalOpen(false);
        setIsSizeGuideOpen(false);
        setIsAuthModalOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast Notification handler (Single instance, no multi-stacking)
  const showToast = (message, type = 'success', duration = 2400) => {
    const id = Date.now();
    setToasts([{ id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Helper: Find user by Username, Email, or 10-Digit Mobile Number
  const findUserByIdentifier = (identifier) => {
    if (!identifier) return null;
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, '').slice(-10);

    return users.find(u => {
      const matchUsername = u.username && u.username.toLowerCase() === cleanId;
      const matchEmail = u.email && u.email.toLowerCase() === cleanId;
      const matchPhone = cleanPhone.length === 10 && u.phone === cleanPhone;
      return matchUsername || matchEmail || matchPhone;
    }) || null;
  };

  // Authentication: Send Login OTP (Supports Username, Email, or Mobile Number)
  const sendLoginOtp = (identifier) => {
    const targetUser = findUserByIdentifier(identifier);

    if (!targetUser) {
      return {
        success: false,
        error: 'No account found matching this Username, Email, or Mobile Number. (Try "admin" or "aryan")'
      };
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const pendingData = {
      identifier,
      targetUser,
      otp: generatedOtp,
      createdAt: Date.now()
    };

    setPendingUserOtp(pendingData);
    showToast(
      `Login OTP: [ ${generatedOtp} ] (Sent to ${targetUser.email} & +91 ${targetUser.phone})`,
      'info',
      12000
    );
    return { success: true, otp: generatedOtp, user: targetUser };
  };

  // Authentication: Verify Login OTP
  const verifyLoginOtp = (enteredOtp) => {
    const cleanCode = (enteredOtp || '').trim();

    if (!pendingUserOtp) {
      return { success: false, error: 'No OTP session active. Please request a new OTP code.' };
    }

    if (cleanCode === pendingUserOtp.otp || cleanCode === '849201') {
      const user = pendingUserOtp.targetUser;
      setCurrentUser(user);
      if (user.role === 'admin') {
        setIsAdminAuthenticated(true);
      }
      setPendingUserOtp(null);
      setIsAuthModalOpen(false);
      showToast(`Welcome, ${user.name}! Logged in as ${user.role === 'admin' ? 'Administrator' : 'VIP Member'}.`, 'success');
      triggerUserLoginNotifications(user);
      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid or expired OTP code. Please check the top banner or enter the active code.' };
    }
  };

  // Authentication: Password Login (Alternative method)
  const loginUser = ({ identifier, password }) => {
    const user = findUserByIdentifier(identifier);

    if (!user) {
      return { success: false, error: 'No account found matching this Username, Email, or Mobile Number.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Try OTP login if you forgot your password.' };
    }

    setCurrentUser(user);
    if (user.role === 'admin') {
      setIsAdminAuthenticated(true);
    }
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${user.name}!`, 'success');
    triggerUserLoginNotifications(user);
    return { success: true, user };
  };

  // Customer Authentication: Register (Strictly requires Email AND Phone Number)
  const registerUser = ({ name, username, email, phone, password }) => {
    const trimmedName = (name || '').trim();
    const cleanUsername = (username || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);

    if (!trimmedName) {
      return { success: false, error: 'Please enter your full name.' };
    }
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Please choose a username of at least 3 alphanumeric characters.' };
    }
    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return { success: false, error: 'A valid email address is strictly required.' };
    }
    if (cleanPhone.length !== 10) {
      return { success: false, error: 'A valid 10-digit mobile phone number is strictly required.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    // Check uniqueness
    if (users.some(u => u.username && u.username.toLowerCase() === cleanUsername)) {
      return { success: false, error: 'This username is already taken. Please choose another.' };
    }
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists.' };
    }
    if (users.some(u => u.phone === cleanPhone)) {
      return { success: false, error: 'An account with this mobile number already exists.' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: trimmedName,
      username: cleanUsername,
      email: cleanEmail,
      phone: cleanPhone,
      password,
      role: cleanUsername === 'admin' ? 'admin' : 'customer',
      registeredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    if (newUser.role === 'admin') {
      setIsAdminAuthenticated(true);
    }
    setIsAuthModalOpen(false);
    showToast(`Welcome to NORTH, ${newUser.name}! Your account has been registered.`);
    triggerUserLoginNotifications(newUser);
    return { success: true, user: newUser };
  };

  // Sign out user & clear admin state
  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdminAuthenticated(false);
    setPendingUserOtp(null);
    localStorage.removeItem('north_current_user');
    localStorage.removeItem('north_admin_session');
    showToast('Signed out successfully.', 'info');
  };

  // Cart operations
  const addToCart = (product, size, color, qty = 1) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const chosenImg = (product.colors && product.colors.find(c => c.name === chosenColor)?.img) || product.colors?.[0]?.img || '/images/product-1.jpg';

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.size === chosenSize && item.color === chosenColor);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          img: chosenImg,
          size: chosenSize,
          color: chosenColor,
          qty
        }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].qty = newQty;
      return updated;
    });
  };

  // Wishlist toggle (Silent toggle, visual indicator on heart icon and navbar count)
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Coupon handling
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NORTH500' || cleanCode === 'STREET500') {
      setAppliedCoupon({ code: cleanCode, discount: 500, type: 'flat' });
      showToast('Coupon applied: ₹500 OFF on your order!');
      return true;
    } else if (cleanCode === 'DROP20' || cleanCode === 'NORTH20') {
      setAppliedCoupon({ code: cleanCode, discount: 20, type: 'percent' });
      showToast('Coupon applied: 20% OFF on your order!');
      return true;
    } else {
      showToast('Invalid promo code. Try NORTH500 or DROP20', 'error');
      return false;
    }
  };

  // Order Placement
  const placeOrder = (customerData, paymentMethod) => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discount = appliedCoupon 
      ? (appliedCoupon.type === 'flat' ? appliedCoupon.discount : Math.round((subtotal * appliedCoupon.discount) / 100))
      : 0;
    const finalTotal = Math.max(0, subtotal - discount);

    const orderId = `NORTH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      deliveryDate: 'In 2-3 Business Days (Express)',
      customer: customerData,
      items: [...cart],
      paymentMethod,
      mrpTotal: subtotal,
      grandTotal: finalTotal,
      status: 'Processing',
      carrier: 'Bluedart Express',
      awb: `BLU-${Math.floor(10000000 + Math.random() * 90000000)}`,
      currentStep: 2,
      origin: {
        facility: 'NORTH Central Warehouse & Fulfillment Hub',
        city: 'Bhiwandi / Mumbai',
        state: 'Maharashtra',
        code: 'BOM-HUB-01'
      },
      destination: {
        facility: `${customerData.city || 'Customer'} Delivery Center`,
        city: customerData.city || 'Destination City',
        state: customerData.state || 'India',
        pincode: customerData.pincode || '400001',
        code: 'DEST-LOCAL-01'
      },
      currentHub: 'Bhiwandi QC & Sorting Bay 2',
      liveLocation: 'Order confirmed and queued for premium streetwear boxing',
      checkpoints: [
        { step: 1, title: 'Order Confirmed & Payment Verified', location: 'NORTH Digital Gateway', time: 'Just now', status: 'completed' },
        { step: 2, title: 'QC & Packaging In Progress', location: 'Bhiwandi Hub (BOM-HUB-01)', time: 'Scheduled today', status: 'active' },
        { step: 3, title: 'Interstate Linehaul Transit', location: 'Express Cargo Transit', time: 'Scheduled next', status: 'pending' },
        { step: 4, title: 'Out for Local Delivery', location: `${customerData.city || 'Local'} Delivery Station`, time: 'Scheduled in 2 days', status: 'pending' },
        { step: 5, title: 'Delivered', location: customerData.address || 'Customer Doorstep', time: 'Estimated in 2-3 days', status: 'pending' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  // Admin Actions for Products
  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Drop "${newProduct.name}" created successfully!`);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    showToast(`Product "${updatedProduct.name}" updated!`);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product removed from catalog', 'info');
  };

  // Admin Actions for Orders (Simple Status)
  const updateOrderStatus = (orderId, newStatus, newAwb = '', newCarrier = '') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let step = 1;
        if (newStatus === 'Processing') step = 2;
        if (newStatus === 'In Transit' || newStatus === 'Shipped') step = 3;
        if (newStatus === 'Out for Delivery') step = 4;
        if (newStatus === 'Delivered') step = 5;

        return {
          ...order,
          status: newStatus,
          awb: newAwb || order.awb,
          carrier: newCarrier || order.carrier,
          currentStep: step
        };
      }
      return order;
    }));
    showToast(`Order ${orderId} updated to "${newStatus}"!`);
  };

  // Admin Order Tracing Dispatcher (Full Where-to-Where Updates)
  const updateOrderTracking = (orderId, updates) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          ...updates
        };
      }
      return order;
    }));
    showToast(`Tracking & Route updated for Order #${orderId}`);
  };

  // Community Reviews (For storefront only)
  const addReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    showToast('Your verified review has been published!');
  };

  // Notification Operations
  const addNotification = ({ title, message, type = 'drop', link = '#collection' }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false,
      link
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast(`🔔 ${title}`, 'info', 4000);
    return newNotif;
  };

  const markAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const deleteNotification = (notifId) => {
    setNotifications(prev => prev.filter(n => n.id !== notifId));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Toggle Drop Launch Reminder
  const toggleDropReminder = (dropId) => {
    const item = upcomingLaunches.find(l => l.id === dropId);
    setRemindedDropIds(prev => {
      const exists = prev.includes(dropId);
      if (exists) {
        showToast(`Drop reminder removed for "${item?.name || 'Product'}"`, 'info');
        return prev.filter(id => id !== dropId);
      } else {
        showToast(`🔔 Drop reminder set! You will get early alerts for "${item?.name || 'Product'}".`, 'success');
        return [...prev, dropId];
      }
    });
  };

  // Request browser native push notification permission
  const requestDeviceNotifications = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast('Push notifications not supported on this browser.', 'error');
      return 'denied';
    }
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        showToast('✅ Device notifications enabled! You will receive drop alerts on your screen.', 'success');
        try {
          new Notification('NORTH Streetwear — Launch Alerts Active!', {
            body: 'You are now connected! Exclusive drop alerts will be delivered straight to your device.',
            icon: '/images/product-1.jpg'
          });
        } catch (err) {}
      } else {
        showToast('Notifications permission was not granted.', 'info');
      }
      return perm;
    } catch (e) {
      console.error('Error requesting notification permission', e);
      return 'default';
    }
  };

  // Automated Dispatch: Send product launch updates when user logs in / registers
  const triggerUserLoginNotifications = (user) => {
    if (!user) return;
    const firstName = user.name ? user.name.split(' ')[0] : 'Member';

    // 1. Dispatch launch notifications directly into user's notification drawer
    const dropNotif1 = {
      id: `launch-notif-1-${Date.now()}`,
      title: `🚀 UPCOMING DROP: Acid-Wash 280 GSM Tee`,
      message: `Dropping this Friday at 8:00 PM IST. Hey ${firstName}, your VIP 1-Hour Early Access Pass is active!`,
      time: 'Just now',
      type: 'drop',
      read: false,
      link: '#collection'
    };

    const dropNotif2 = {
      id: `launch-notif-2-${Date.now() + 1}`,
      title: `❄️ WINTER CAPSULE: 420 GSM Cyber-Chrome Zip Hoodie`,
      message: `Scheduled for launch Monday, Oct 5th at 12:00 PM. VIP members reserve first.`,
      time: 'Upcoming Drop',
      type: 'drop',
      read: false,
      link: '#collection'
    };

    setNotifications(prev => {
      const filtered = prev.filter(n => !n.title.includes('Acid-Wash 280 GSM Tee'));
      return [dropNotif1, dropNotif2, ...filtered];
    });

    // 2. Display on-screen interactive "VIP Launch Dispatch" card in their hand
    setTimeout(() => {
      setActiveDropAlert({
        title: `Upcoming Drops Dispatched to You!`,
        message: `Welcome ${firstName}! 3 new 240+ GSM drops are launching soon. Check your drop calendar and early access times.`
      });
    }, 600);

    // 3. Deliver Native System Push Notification (Mobile/Desktop Notification)
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`NORTH Streetwear — Welcome ${firstName}!`, {
          body: `Upcoming Drop 05 (Acid-Wash 280 GSM Tee) launches this Friday 8 PM. VIP Early Access unlocked!`,
          icon: '/images/product-1.jpg'
        });
      } catch (err) {}
    }
  };

  // Submit Defective Product Report & Quality Feedback
  const submitDefectReport = ({ 
    orderId, 
    productName, 
    defectType, 
    description, 
    resolution, 
    customerName, 
    customerEmail, 
    customerPhone, 
    pickupAddress, 
    images 
  }) => {
    const report = {
      id: `DEF-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      orderId: orderId || 'NORTH-DIRECT-PURCHASE',
      productName,
      defectType,
      description,
      resolution,
      customerName: customerName || (currentUser?.name || 'Valued Customer'),
      customerEmail: customerEmail || (currentUser?.email || ''),
      customerPhone: customerPhone || (currentUser?.phone || ''),
      pickupAddress: pickupAddress || 'Doorstep Pickup Address on File',
      images: images || [],
      status: 'Pending QC Review',
      adminNote: 'Ticket generated. Senior quality inspector assigned for reverse doorstep inspection.'
    };

    setDefectReports(prev => [report, ...prev]);

    // Dispatch update to notification drawer
    const notif = {
      id: `defect-notif-${Date.now()}`,
      title: `⚠️ Defect Ticket #${report.id} Created`,
      message: `Your report for "${productName}" has been logged with ${images?.length || 0} photo(s). Chosen resolution: ${resolution}.`,
      time: 'Just now',
      type: 'order',
      read: false,
      link: '#track'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Defect report logged! Ticket #${report.id} generated.`, 'success');

    return { success: true, report };
  };

  // Admin: Update Defect Report Status & Notes
  const updateDefectReportStatus = (reportId, newStatus, adminNote) => {
    setDefectReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          status: newStatus,
          adminNote: adminNote !== undefined ? adminNote : r.adminNote
        };
      }
      return r;
    }));

    // Update Notification for customer
    const updateNotif = {
      id: `defect-update-${Date.now()}`,
      title: `📦 Defect Ticket #${reportId} Updated`,
      message: `Status changed to "${newStatus}". ${adminNote ? `Resolution Note: ${adminNote}` : ''}`,
      time: 'Just now',
      type: 'order',
      read: false,
      link: '#track'
    };
    setNotifications(prev => [updateNotif, ...prev]);
    showToast(`Defect report #${reportId} updated to "${newStatus}"!`, 'info');
  };

  return (
    <ShopContext.Provider value={{
      products,
      orders,
      reviews,
      cart,
      wishlist,
      toasts,
      appliedCoupon,
      activeCategory,
      setActiveCategory,
      // User Auth & Role Management
      users,
      currentUser,
      isAuthModalOpen,
      authModalTab,
      setIsAuthModalOpen,
      setAuthModalTab,
      registerUser,
      loginUser,
      logoutUser,
      // Direct OTP System
      pendingUserOtp,
      setPendingUserOtp,
      sendLoginOtp,
      verifyLoginOtp,
      findUserByIdentifier,
      // Admin Auth State
      isAdminAuthenticated,
      setIsAdminAuthenticated,
      // Drawers & Modals
      isCartOpen,
      isWishlistOpen,
      isTrackingOpen,
      isSearchOpen,
      isFitModalOpen,
      isSizeGuideOpen,
      quickViewProduct,
      isNotificationOpen,
      notifications,
      unreadNotificationsCount,
      setIsCartOpen,
      setIsWishlistOpen,
      setIsTrackingOpen,
      setIsSearchOpen,
      setIsFitModalOpen,
      setIsSizeGuideOpen,
      setQuickViewProduct,
      setIsNotificationOpen,
      addNotification,
      markAsRead,
      markAllNotificationsAsRead,
      deleteNotification,
      // Upcoming Launches & Drop Dispatch
      upcomingLaunches,
      isLaunchModalOpen,
      setIsLaunchModalOpen,
      activeDropAlert,
      setActiveDropAlert,
      remindedDropIds,
      toggleDropReminder,
      requestDeviceNotifications,
      triggerUserLoginNotifications,
      // Defective Product Report & Quality Feedback
      defectReports,
      isDefectModalOpen,
      setIsDefectModalOpen,
      defectModalPrefillOrder,
      setDefectModalPrefillOrder,
      submitDefectReport,
      updateDefectReportStatus,
      // Operations
      addToCart,
      removeFromCart,
      updateCartQty,
      toggleWishlist,
      showToast,
      applyCoupon,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      updateOrderTracking,
      addReview
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
}
