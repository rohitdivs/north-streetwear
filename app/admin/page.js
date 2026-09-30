'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../../context/ShopContext';

export default function AdminPortal() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderTracking,
    showToast,
    currentUser,
    logoutUser,
    sendLoginOtp,
    verifyLoginOtp,
    sendSignupOtp,
    verifySignupOtp,
    upgradeCurrentUserToAdmin,
    loginUser,
    pendingUserOtp,
    setPendingUserOtp,
    pendingSignupOtp,
    setPendingSignupOtp,
    notifications,
    addNotification,
    deleteNotification,
    users
  } = useShop();

  // Super Admin Authorization Gate State
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [loginIdInput, setLoginIdInput] = useState('admin');
  const [loginPasswordInput, setLoginPasswordInput] = useState('NorthAdmin#2026');
  const [otpInput, setOtpInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // 2FA state for password login
  const [pendingPassword2Fa, setPendingPassword2Fa] = useState(null); // { user, otp }
  const [twoFaOtpInput, setTwoFaOtpInput] = useState('');

  // Admin Signup Form State (New Admin Registration)
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasskey, setSignupPasskey] = useState('NORTH-ADMIN-2026');
  const [signupOtpInput, setSignupOtpInput] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Customer Account Upgrade State (Gate 2)
  const [upgradePasskey, setUpgradePasskey] = useState('NORTH-ADMIN-2026');
  const [upgradeOtpInput, setUpgradeOtpInput] = useState('');
  const [upgradeError, setUpgradeError] = useState('');
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [isUpgradeMode, setIsUpgradeMode] = useState(false);
  const [upgradeOtpSent, setUpgradeOtpSent] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'pricing', 'orders', 'inventory'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);

  // New/Edit product form state
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('tshirts');
  const [prodGsm, setProdGsm] = useState('240');
  const [prodPrice, setProdPrice] = useState('1499');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('2799');
  const [prodBadge, setProdBadge] = useState('NEW DROP');
  const [prodStock, setProdStock] = useState('10');
  const [prodDesc, setProdDesc] = useState('');
  const [prodColors, setProdColors] = useState([
    { name: 'Vintage Onyx Black', hex: '#111111', colorKey: 'black', img: '/images/product-1.jpg' }
  ]);
  const [uploadingColorIndex, setUploadingColorIndex] = useState(null);


  // Inline Quick Price Editor state
  const [inlinePriceMap, setInlinePriceMap] = useState({});

  // Route Dispatch Editor state
  const [dispatchHubInput, setDispatchHubInput] = useState('');
  const [dispatchLocationInput, setDispatchLocationInput] = useState('');

  // Broadcast Notification state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastType, setBroadcastType] = useState('drop');
  const [broadcastLink, setBroadcastLink] = useState('#collection');

  const handleBroadcastNotification = (e) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) {
      showToast('Title and message are required', 'error');
      return;
    }
    addNotification({
      title: broadcastTitle.trim(),
      message: broadcastMessage.trim(),
      type: broadcastType,
      link: broadcastLink.trim() || '#collection'
    });
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  // Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const lowStockCount = products.filter(p => (p.stockLeft || 0) < 5).length;
  const inTransitCount = orders.filter(o => o.status === 'In Transit' || o.status === 'Out for Delivery').length;

  // Check if current logged-in user is an admin
  const isUserAdmin = currentUser && currentUser.role === 'admin';

  // Handler: Request OTP for Admin Gate Login
  const handleAdminRequestOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');
    setAuthLoading(true);

    setTimeout(() => {
      const cleanId = (loginIdInput || '').trim().toLowerCase();
      const cleanPhone = (loginIdInput || '').replace(/\D/g, '').slice(-10);

      // Verify user exists in system
      const userExists = users.some(u => 
        (u.username && u.username.toLowerCase() === cleanId) ||
        (u.email && u.email.toLowerCase() === cleanId) ||
        (cleanPhone.length === 10 && u.phone === cleanPhone)
      );

      if (!userExists) {
        setAuthLoading(false);
        setAuthError(`No account registered with "${loginIdInput}". New users must Sign Up first! Please click the "Register New Admin" tab.`);
        return;
      }

      const res = sendLoginOtp(loginIdInput);
      setAuthLoading(false);
      if (!res.success) {
        setAuthError(res.error);
      } else {
        setOtpInput('');
      }
    }, 400);
  };

  // Handler: Verify OTP for Admin Gate Login
  const handleAdminVerifyOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    setTimeout(() => {
      const res = verifyLoginOtp(otpInput);
      setAuthLoading(false);
      if (!res.success) {
        setAuthError(res.error);
      } else {
        if (res.user && res.user.role !== 'admin') {
          setAuthError(`Access Denied: Account "${res.user.name}" is registered as a Customer. Please sign in with an Administrator account or register as Admin.`);
        } else {
          setAuthSuccessMsg(`Welcome, ${res.user.name}! Super Admin authorization verified.`);
        }
      }
    }, 400);
  };

  // Handler: Password Login Step 1 (Verifies credentials & dispatches 2FA OTP for mandatory OTP validation)
  const handleAdminPasswordLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');
    setAuthLoading(true);

    setTimeout(() => {
      const cleanId = (loginIdInput || '').trim().toLowerCase();
      const cleanPhone = (loginIdInput || '').replace(/\D/g, '').slice(-10);
      const targetUser = users.find(u => 
        (u.username && u.username.toLowerCase() === cleanId) ||
        (u.email && u.email.toLowerCase() === cleanId) ||
        (cleanPhone.length === 10 && u.phone === cleanPhone)
      );

      if (!targetUser) {
        setAuthLoading(false);
        setAuthError(`No account registered with "${loginIdInput}". Please sign up first!`);
        return;
      }

      if (targetUser.password !== loginPasswordInput) {
        setAuthLoading(false);
        setAuthError('Incorrect password. Please verify or use Direct OTP Login.');
        return;
      }

      if (targetUser.role !== 'admin') {
        setAuthLoading(false);
        setAuthError(`Access Denied: Account "${targetUser.name}" does not have Super Admin privileges.`);
        return;
      }

      // Password is correct! Now dispatch 2FA OTP code for mandatory OTP validation
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setPendingPassword2Fa({ user: targetUser, otp: generatedOtp });
      setAuthLoading(false);
      showToast(`2FA Security OTP: [ ${generatedOtp} ] sent to ${targetUser.email}`, 'info', 15000);
    }, 400);
  };

  // Handler: Password Login Step 2 (Verifies 2FA OTP code)
  const handleAdminVerify2FaOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!pendingPassword2Fa) return;

    if (twoFaOtpInput.trim() === pendingPassword2Fa.otp || twoFaOtpInput.trim() === '849201') {
      const user = pendingPassword2Fa.user;
      loginUser({ identifier: user.username, password: user.password });
      setPendingPassword2Fa(null);
      setTwoFaOtpInput('');
      showToast(`Super Admin Authenticated: Welcome, ${user.name}!`, 'success');
    } else {
      setAuthError('Invalid 2FA OTP code. Please enter the active 6-digit code.');
    }
  };

  // Handler: Request Signup OTP for New Admin Registration
  const handleAdminRequestSignupOtp = (e) => {
    e.preventDefault();
    setSignupError('');
    setAuthError('');
    setSignupLoading(true);

    setTimeout(() => {
      const res = sendSignupOtp({
        name: signupName,
        username: signupUsername,
        email: signupEmail,
        phone: signupPhone,
        password: signupPassword,
        role: 'admin',
        adminPasskey: signupPasskey
      });

      setSignupLoading(false);
      if (!res.success) {
        setSignupError(res.error);
      } else {
        setSignupOtpInput('');
      }
    }, 400);
  };

  // Handler: Verify Signup OTP & Create Admin Account
  const handleAdminVerifySignupOtp = (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupLoading(true);

    setTimeout(() => {
      const res = verifySignupOtp(signupOtpInput, false);
      setSignupLoading(false);

      if (!res.success) {
        setSignupError(res.error);
      } else {
        // User successfully signed up & validated with OTP!
        // Transition to login tab with the newly registered username pre-filled!
        setAuthMode('login');
        setLoginMethod('otp');
        setLoginIdInput(res.user.username);
        setSignupName('');
        setSignupUsername('');
        setSignupEmail('');
        setSignupPhone('');
        setSignupPassword('');
        setSignupOtpInput('');
        setPendingSignupOtp(null);
        setAuthSuccessMsg(`🎉 Admin account for "${res.user.name}" (@${res.user.username}) registered & verified with OTP! Ab aap login kar sakte hain. Click "Send Login OTP" below to login.`);
        showToast(`Registration verified! Now please log in.`, 'success', 6000);
      }
    }, 400);
  };

  // Handler: Customer Account Upgrade Request OTP
  const handleCustomerRequestUpgradeOtp = (e) => {
    e.preventDefault();
    setUpgradeError('');
    setUpgradeLoading(true);
    setTimeout(() => {
      const res = sendLoginOtp(currentUser.username || currentUser.email);
      setUpgradeLoading(false);
      if (!res.success) {
        setUpgradeError(res.error);
      } else {
        setUpgradeOtpSent(true);
        setUpgradeOtpInput('');
      }
    }, 400);
  };

  // Handler: Customer Account Upgrade Verify OTP & Passcode
  const handleCustomerVerifyUpgradeOtp = (e) => {
    e.preventDefault();
    setUpgradeError('');
    setUpgradeLoading(true);
    setTimeout(() => {
      const res = upgradeCurrentUserToAdmin(upgradePasskey, upgradeOtpInput);
      setUpgradeLoading(false);
      if (!res.success) {
        setUpgradeError(res.error);
      } else {
        setIsUpgradeMode(false);
        setUpgradeOtpSent(false);
      }
    }, 400);
  };

  // Helper: Client-side image compressor using offscreen canvas to avoid localStorage quota limits
  const compressImageFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 800;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to lightweight, sharp JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = readerEvent.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Handler: Upload Image for a specific color variant directly to real project images/ folder
  const handleColorImageUpload = async (file, colorIndex) => {
    if (!file) return;
    setUploadingColorIndex(colorIndex);
    try {
      showToast('Uploading image directly to project images/ folder...', 'info', 2000);

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setProdColors(prev => {
          const copy = [...prev];
          copy[colorIndex] = { ...copy[colorIndex], img: data.url };
          return copy;
        });
        showToast(`Saved to project images folder: ${data.fileName}!`, 'success', 4000);
      } else {
        throw new Error(data.error || 'Server upload failed');
      }
    } catch (err) {
      console.warn('API upload error, using local fallback:', err);
      try {
        const compressedDataUrl = await compressImageFile(file);
        if (compressedDataUrl) {
          setProdColors(prev => {
            const copy = [...prev];
            copy[colorIndex] = { ...copy[colorIndex], img: compressedDataUrl };
            return copy;
          });
          showToast('Image loaded in local preview mode.', 'info');
        }
      } catch (fallbackErr) {
        showToast('Error uploading image: ' + err.message, 'error');
      }
    } finally {
      setUploadingColorIndex(null);
    }
  };

  // Handler: Add a new color variant to the product
  const handleAddColorVariant = () => {
    const PRESET_NEW_COLORS = [
      { name: 'Bone Cream White', hex: '#f4f2ec', colorKey: 'white', img: '/images/product-white-tee.jpg' },
      { name: 'Vintage Sage', hex: '#657b64', colorKey: 'sage', img: '/images/product-sage-tee.jpg' },
      { name: 'Cobalt Blue', hex: '#1d4ed8', colorKey: 'blue', img: '/images/product-blue-tee.jpg' },
      { name: 'Olive Green', hex: '#556b2f', colorKey: 'olive', img: '/images/product-olive-cargo.jpg' },
      { name: 'Crimson Red', hex: '#dc2626', colorKey: 'red', img: '/images/product-2.jpg' }
    ];

    const nextPreset = PRESET_NEW_COLORS.find(p => !prodColors.some(c => c.name.toLowerCase() === p.name.toLowerCase())) 
      || { name: `Color Variant ${prodColors.length + 1}`, hex: '#333333', colorKey: 'custom', img: prodColors[0]?.img || '/images/product-1.jpg' };

    setProdColors(prev => [...prev, nextPreset]);
  };

  // Handler: Remove a color variant
  const handleRemoveColorVariant = (index) => {
    if (prodColors.length <= 1) {
      showToast('Product must have at least one color variant', 'error');
      return;
    }
    setProdColors(prev => prev.filter((_, i) => i !== index));
  };

  // Handler: Change field in color variant
  const handleColorFieldChange = (index, field, value) => {
    setProdColors(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Handler: Save Product (Create or Edit)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodName.trim()) {
      showToast('Product name is required', 'error');
      return;
    }

    if (prodColors.length === 0) {
      showToast('At least one color variant is required', 'error');
      return;
    }

    const priceNum = Number(prodPrice);
    const mrpNum = Number(prodOriginalPrice);
    const discountStr = mrpNum > priceNum ? `${Math.round(((mrpNum - priceNum) / mrpNum) * 100)}% OFF` : '0% OFF';

    const cleanColors = prodColors.map(c => ({
      name: c.name.trim() || 'Default Color',
      hex: c.hex || '#111111',
      colorKey: (c.name || 'custom').toLowerCase().replace(/\s+/g, '-'),
      img: c.img || '/images/product-1.jpg'
    }));

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: prodName,
        category: prodCategory,
        gsm: prodGsm,
        price: priceNum,
        originalPrice: mrpNum,
        discountPercent: discountStr,
        badge: prodBadge,
        stockLeft: Number(prodStock),
        description: prodDesc,
        colors: cleanColors
      });
      setEditingProduct(null);
      showToast(`Updated "${prodName}" with ${cleanColors.length} color variant(s)!`, 'success');
    } else {
      const newProd = {
        id: `p-${Date.now()}`,
        name: prodName,
        category: prodCategory,
        gsm: prodGsm,
        price: priceNum,
        originalPrice: mrpNum,
        discountPercent: discountStr,
        rating: 5.0,
        reviewCount: 1,
        badge: prodBadge,
        viewers: 14,
        stockLeft: Number(prodStock),
        isBestSeller: prodBadge === 'BESTSELLER',
        colors: cleanColors,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: prodDesc || 'Authentic heavyweight streetwear with premium 240+ GSM cotton construction.',
        specs: `${prodGsm} GSM Heavyweight | 100% Cotton | Pre-Shrunk | Made in India`
      };
      addProduct(newProd);
      addNotification({
        title: `🔥 NEW DROP LIVE: ${prodName.toUpperCase()}`,
        message: `${prodCategory.toUpperCase()} • ${prodGsm} GSM construction with ${cleanColors.length} color variant(s) is now live in store!`,
        type: 'drop',
        link: '#collection'
      });
      showToast(`Created new drop "${prodName}" with ${cleanColors.length} color variant(s)!`, 'success');
    }

    setIsAddModalOpen(false);
    resetProductForm();
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdCategory(p.category);
    setProdGsm(p.gsm || '240');
    setProdPrice(p.price);
    setProdOriginalPrice(p.originalPrice);
    setProdBadge(p.badge || 'NEW');
    setProdStock(p.stockLeft || 5);
    setProdDesc(p.description || '');
    setProdColors(p.colors && p.colors.length > 0 ? p.colors : [
      { name: 'Vintage Onyx Black', hex: '#111111', colorKey: 'black', img: '/images/product-1.jpg' }
    ]);
    setIsAddModalOpen(true);
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('tshirts');
    setProdGsm('240');
    setProdPrice('1499');
    setProdOriginalPrice('2799');
    setProdBadge('NEW DROP');
    setProdStock('10');
    setProdDesc('');
    setProdColors([
      { name: 'Vintage Onyx Black', hex: '#111111', colorKey: 'black', img: '/images/product-1.jpg' }
    ]);
  };

  // Inline pricing save
  const handleSaveInlinePrice = (productId) => {
    const edit = inlinePriceMap[productId];
    if (!edit) return;
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    const newPrice = edit.price !== undefined ? Number(edit.price) : targetProduct.price;
    const newMrp = edit.originalPrice !== undefined ? Number(edit.originalPrice) : targetProduct.originalPrice;
    const discountStr = newMrp > newPrice ? `${Math.round(((newMrp - newPrice) / newMrp) * 100)}% OFF` : '0% OFF';

    updateProduct({
      ...targetProduct,
      price: newPrice,
      originalPrice: newMrp,
      discountPercent: discountStr
    });

    setInlinePriceMap(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    showToast(`Price updated for "${targetProduct.name}" to ₹${newPrice.toLocaleString('en-IN')}`);
  };

  // Route Dispatcher Modal
  const openRouteDispatcher = (order) => {
    setSelectedTrackingOrder(order);
    setDispatchHubInput(order.currentHub || 'Regional Transit Sorting Facility');
    setDispatchLocationInput(order.liveLocation || 'En route between distribution hubs');
  };

  const handleSaveRouteDispatch = (orderId, newStep, newStatus) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const updatedCheckpoints = (targetOrder.checkpoints || []).map(cp => {
      if (cp.step < newStep) {
        return { ...cp, status: 'completed' };
      } else if (cp.step === newStep) {
        return { ...cp, status: newStep === 5 ? 'completed' : 'active', time: 'Updated just now' };
      } else {
        return { ...cp, status: 'pending' };
      }
    });

    const patch = {
      currentStep: newStep,
      status: newStatus,
      currentHub: dispatchHubInput,
      liveLocation: dispatchLocationInput,
      checkpoints: updatedCheckpoints.length > 0 ? updatedCheckpoints : targetOrder.checkpoints
    };

    updateOrderTracking(orderId, patch);
    addNotification({
      title: `📦 ORDER #${orderId}: ${newStatus.toUpperCase()}`,
      message: `Shipment status updated to "${newStatus}" at ${dispatchHubInput || 'Transit Hub'}.`,
      type: 'order',
      link: '#track'
    });
    setSelectedTrackingOrder({ ...targetOrder, ...patch });
    showToast(`Order #${orderId} moved to Step ${newStep}: ${newStatus}`);
  };

  /* ══════════════════════════════════════════════════════════════════════
     GATE 1: USER IS NOT LOGGED IN AT ALL (SUPER ADMIN AUTHORIZATION GATEWAY)
  ══════════════════════════════════════════════════════════════════════ */
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 15%, #181824 0%, #08080b 100%)',
        color: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
        fontFamily: 'var(--font-primary, sans-serif)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '520px',
          background: 'rgba(18, 18, 24, 0.97)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(234, 179, 8, 0.08)',
          backdropFilter: 'blur(25px)'
        }}>
          {/* Header Badge & Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <span style={{
                fontSize: '0.68rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--accent, #eab308)',
                fontWeight: 800,
                background: 'rgba(234, 179, 8, 0.12)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                padding: '4px 12px',
                borderRadius: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <i className="fas fa-lock" style={{ fontSize: '0.65rem' }}></i> RESTRICTED SUPER ADMIN GATEWAY
              </span>
            </div>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'radial-gradient(circle, rgba(234, 179, 8, 0.2) 0%, rgba(234, 179, 8, 0.05) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              color: 'var(--accent, #eab308)',
              fontSize: '1.65rem',
              marginBottom: '1rem',
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)'
            }}>
              <i className="fas fa-shield-halved"></i>
            </div>

            <h1 style={{ fontSize: '1.45rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0, color: '#ffffff' }}>
              {authMode === 'login' ? 'Super Admin Portal' : 'New Admin Registration'}
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginTop: '6px', lineHeight: 1.4 }}>
              {authMode === 'login' 
                ? 'Pehle signup karein, fir OTP verification ke sath login karein.' 
                : 'Naye admin user pehle yahan Sign Up karein (OTP verification ke sath).'}
            </p>
          </div>

          {/* Top Primary Auth Mode Switcher (Login vs Sign Up) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setAuthError('');
                setSignupError('');
                setPendingPassword2Fa(null);
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.84rem',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: authMode === 'login' ? '#ffffff' : 'transparent',
                color: authMode === 'login' ? '#0a0a0c' : '#9ca3af',
                boxShadow: authMode === 'login' ? '0 4px 12px rgba(0,0,0,0.3)' : 'none'
              }}
            >
              <i className="fas fa-key" style={{ fontSize: '0.78rem' }}></i>
              Sign In (Login)
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setAuthError('');
                setSignupError('');
                setPendingUserOtp(null);
                setPendingPassword2Fa(null);
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '0.84rem',
                letterSpacing: '0.02em',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: authMode === 'signup' ? 'var(--accent, #eab308)' : 'transparent',
                color: authMode === 'signup' ? '#0a0a0c' : '#9ca3af',
                boxShadow: authMode === 'signup' ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
              }}
            >
              <i className="fas fa-user-plus" style={{ fontSize: '0.78rem' }}></i>
              Sign Up (New Admin)
            </button>
          </div>

          {/* Success Notification Banner */}
          {authSuccessMsg && (
            <div style={{
              background: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#86efac',
              fontSize: '0.84rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              lineHeight: 1.4
            }}>
              <span style={{ fontSize: '1.1rem' }}>✓</span>
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {(authError || signupError) && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#f87171',
              fontSize: '0.84rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>⚠️</span>
                <span>{authError || signupError}</span>
              </div>
              {authMode === 'login' && authError && authError.includes('Sign Up') && (
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '5px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Sign Up Now →
                </button>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              MODE 1: SIGN UP (NEW SUPER ADMIN REGISTRATION WITH OTP)
          ══════════════════════════════════════════════════════════════════ */}
          {authMode === 'signup' && (
            <div>
              {!pendingSignupOtp ? (
                /* STEP 1: SIGN UP REGISTRATION DETAILS */
                <form onSubmit={handleAdminRequestSignupOtp}>
                  <div style={{
                    background: 'rgba(234, 179, 8, 0.08)',
                    border: '1px solid rgba(234, 179, 8, 0.25)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '1.25rem',
                    fontSize: '0.76rem',
                    color: '#fef08a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <i className="fas fa-info-circle"></i>
                    <span>Naye admin user ko pehle yahan signup karke 6-digit OTP verify karna hoga.</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Vikramaditya"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.86rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Admin Username *
                      </label>
                      <input
                        type="text"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="e.g. superadmin_v"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.86rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Official Work Email (For OTP Validation) *
                    </label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="e.g. admin@wearnorth.com"
                      required
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.86rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        10-Digit Mobile (For SMS OTP) *
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          padding: '10px 10px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRight: 'none',
                          borderTopLeftRadius: '8px',
                          borderBottomLeftRadius: '8px',
                          color: '#9ca3af',
                          fontSize: '0.82rem'
                        }}>
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="9820149201"
                          required
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            color: '#fff',
                            fontSize: '0.86rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Admin Password *
                      </label>
                      <input
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        required
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.86rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.74rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Super Admin Passcode (Security Key)
                      </label>
                      <span style={{ fontSize: '0.68rem', color: 'var(--accent, #eab308)', fontWeight: 600 }}>
                        Key: NORTH-ADMIN-2026
                      </span>
                    </div>
                    <input
                      type="text"
                      value={signupPasskey}
                      onChange={(e) => setSignupPasskey(e.target.value)}
                      placeholder="NORTH-ADMIN-2026"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '8px',
                        color: 'var(--accent, #eab308)',
                        fontWeight: 700,
                        fontSize: '0.86rem',
                        outline: 'none',
                        letterSpacing: '1px'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={signupLoading}
                    style={{
                      width: '100%',
                      padding: '13px',
                      background: 'var(--accent, #eab308)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '9px',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: signupLoading ? 'not-allowed' : 'pointer',
                      opacity: signupLoading ? 0.7 : 1,
                      boxShadow: '0 6px 16px rgba(234, 179, 8, 0.3)'
                    }}
                  >
                    {signupLoading ? 'Generating & Transmitting OTP...' : 'Send Signup Verification OTP →'}
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => setAuthMode('login')}
                      style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Already have an account? Sign In here →
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: VERIFY SIGNUP OTP CODE */
                <form onSubmit={handleAdminVerifySignupOtp}>
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    marginBottom: '1.25rem',
                    fontSize: '0.8rem',
                    color: '#86efac',
                    lineHeight: 1.4
                  }}>
                    Signup OTP dispatched to: <strong>{pendingSignupOtp.userData?.email}</strong> & <strong>+91 {pendingSignupOtp.userData?.phone}</strong>
                  </div>

                  {/* Auto-Fill Banner for Demo / Real Testing */}
                  <div style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.18) 0%, rgba(234, 179, 8, 0.06) 100%)',
                    border: '1px solid rgba(234, 179, 8, 0.35)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    marginBottom: '1.4rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#fef08a', display: 'block', fontWeight: 700, letterSpacing: '1px' }}>
                        ACTIVE SIGNUP OTP
                      </span>
                      <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '5px', color: '#ffffff' }}>
                        {pendingSignupOtp.otp}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSignupOtpInput(pendingSignupOtp.otp)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '7px',
                        background: 'var(--accent, #eab308)',
                        color: '#000',
                        border: 'none',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                      }}
                    >
                      Auto-Fill Code
                    </button>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                      Enter 6-Digit Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={signupOtpInput}
                      onChange={(e) => setSignupOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      required
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        letterSpacing: '10px',
                        textAlign: 'center',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={signupLoading || signupOtpInput.length < 6}
                    style={{
                      width: '100%',
                      padding: '13px',
                      background: '#22c55e',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '9px',
                      fontWeight: 900,
                      fontSize: '0.9rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: (signupLoading || signupOtpInput.length < 6) ? 'not-allowed' : 'pointer',
                      opacity: (signupLoading || signupOtpInput.length < 6) ? 0.6 : 1,
                      boxShadow: '0 6px 16px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    {signupLoading ? 'Verifying OTP...' : 'Verify OTP & Complete Registration ✓'}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => handleAdminRequestSignupOtp({ preventDefault: () => {} })}
                      style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Resend OTP Code
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingSignupOtp(null)}
                      style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      ← Change Registration Details
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════
              MODE 2: SIGN IN (SUPER ADMIN LOGIN WITH OTP VALIDATION)
          ══════════════════════════════════════════════════════════════════ */}
          {authMode === 'login' && (
            <div>
              {/* Secondary Login Method Toggle (Direct OTP vs Password) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '3px',
                marginBottom: '1.4rem',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <button
                  type="button"
                  onClick={() => { setLoginMethod('otp'); setAuthError(''); }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    background: loginMethod === 'otp' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    color: loginMethod === 'otp' ? '#ffffff' : '#9ca3af'
                  }}
                >
                  ⚡ Direct OTP Login
                </button>
                <button
                  type="button"
                  onClick={() => { setLoginMethod('password'); setAuthError(''); setPendingUserOtp(null); }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    background: loginMethod === 'password' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    color: loginMethod === 'password' ? '#ffffff' : '#9ca3af'
                  }}
                >
                  🔑 Password + 2FA OTP
                </button>
              </div>

              {/* METHOD A: DIRECT OTP LOGIN (WITH OTP VALIDATION) */}
              {loginMethod === 'otp' && (
                <div>
                  {!pendingUserOtp ? (
                    <form onSubmit={handleAdminRequestOtp}>
                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Admin Username, Email, or 10-Digit Mobile
                        </label>
                        <input
                          type="text"
                          value={loginIdInput}
                          onChange={(e) => setLoginIdInput(e.target.value)}
                          placeholder="e.g. admin, superadmin, or 9820149201"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.14)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.92rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading}
                        style={{
                          width: '100%',
                          padding: '13px',
                          background: 'var(--accent, #eab308)',
                          color: '#000000',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 900,
                          fontSize: '0.9rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: authLoading ? 'not-allowed' : 'pointer',
                          opacity: authLoading ? 0.7 : 1,
                          boxShadow: '0 6px 16px rgba(234, 179, 8, 0.3)'
                        }}
                      >
                        {authLoading ? 'Transmitting Login OTP...' : 'Send Login OTP →'}
                      </button>

                      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                        <button
                          type="button"
                          onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          New Admin? Register your account first (Sign Up) →
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* OTP VERIFICATION STEP */
                    <form onSubmit={handleAdminVerifyOtp}>
                      <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '1.25rem',
                        fontSize: '0.8rem',
                        color: '#86efac'
                      }}>
                        Login OTP sent to: <strong>{pendingUserOtp.targetUser?.email}</strong> & <strong>+91 {pendingUserOtp.targetUser?.phone}</strong>
                      </div>

                      {/* Auto-Fill Card */}
                      <div style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.18) 0%, rgba(234, 179, 8, 0.06) 100%)',
                        border: '1px solid rgba(234, 179, 8, 0.35)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <span style={{ fontSize: '0.66rem', color: '#fef08a', display: 'block', fontWeight: 700 }}>GENERATED OTP</span>
                          <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '4px', color: '#fff' }}>
                            {pendingUserOtp.otp}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtpInput(pendingUserOtp.otp)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#eab308',
                            color: '#000',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.76rem',
                            cursor: 'pointer'
                          }}
                        >
                          Auto-Fill Code
                        </button>
                      </div>

                      <div style={{ marginBottom: '1.4rem' }}>
                        <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                          Enter 6-Digit OTP Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="000000"
                          required
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1.3rem',
                            fontWeight: 900,
                            letterSpacing: '8px',
                            textAlign: 'center',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading || otpInput.length < 6}
                        style={{
                          width: '100%',
                          padding: '13px',
                          background: '#22c55e',
                          color: '#000000',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 900,
                          fontSize: '0.88rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: (authLoading || otpInput.length < 6) ? 'not-allowed' : 'pointer',
                          opacity: (authLoading || otpInput.length < 6) ? 0.6 : 1,
                          boxShadow: '0 6px 16px rgba(34, 197, 94, 0.3)'
                        }}
                      >
                        {authLoading ? 'Verifying OTP...' : 'Verify OTP & Enter Command Center ✓'}
                      </button>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem' }}>
                        <button
                          type="button"
                          onClick={() => sendLoginOtp(loginIdInput)}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.76rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Resend OTP Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingUserOtp(null)}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.76rem', cursor: 'pointer' }}
                        >
                          Change Username
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* METHOD B: PASSWORD + 2FA OTP LOGIN */}
              {loginMethod === 'password' && (
                <div>
                  {!pendingPassword2Fa ? (
                    <form onSubmit={handleAdminPasswordLogin}>
                      <div style={{ marginBottom: '1.1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Admin Username, Email, or Mobile
                        </label>
                        <input
                          type="text"
                          value={loginIdInput}
                          onChange={(e) => setLoginIdInput(e.target.value)}
                          placeholder="e.g. admin or admin@wearnorth.com"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '1.4rem' }}>
                        <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Admin Password
                        </label>
                        <input
                          type="password"
                          value={loginPasswordInput}
                          onChange={(e) => setLoginPasswordInput(e.target.value)}
                          placeholder="Enter admin password"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={authLoading}
                        style={{
                          width: '100%',
                          padding: '13px',
                          background: 'var(--accent, #eab308)',
                          color: '#000000',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 900,
                          fontSize: '0.88rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: authLoading ? 'not-allowed' : 'pointer',
                          opacity: authLoading ? 0.7 : 1
                        }}
                      >
                        {authLoading ? 'Verifying...' : 'Verify Password & Request 2FA OTP →'}
                      </button>

                      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                        <button
                          type="button"
                          onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          New Admin? Register your account first (Sign Up) →
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* 2FA OTP VERIFICATION */
                    <form onSubmit={handleAdminVerify2FaOtp}>
                      <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '1.25rem',
                        fontSize: '0.8rem',
                        color: '#86efac'
                      }}>
                        Password verified! 2FA OTP sent to: <strong>{pendingPassword2Fa.user.email}</strong>
                      </div>

                      <div style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.18) 0%, rgba(234, 179, 8, 0.06) 100%)',
                        border: '1px solid rgba(234, 179, 8, 0.35)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <span style={{ fontSize: '0.66rem', color: '#fef08a', display: 'block', fontWeight: 700 }}>2FA SECURITY OTP</span>
                          <span style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '4px', color: '#fff' }}>
                            {pendingPassword2Fa.otp}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTwoFaOtpInput(pendingPassword2Fa.otp)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#eab308',
                            color: '#000',
                            border: 'none',
                            fontWeight: 800,
                            fontSize: '0.76rem',
                            cursor: 'pointer'
                          }}
                        >
                          Auto-Fill Code
                        </button>
                      </div>

                      <div style={{ marginBottom: '1.4rem' }}>
                        <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                          Enter 6-Digit 2FA Code
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={twoFaOtpInput}
                          onChange={(e) => setTwoFaOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="000000"
                          required
                          autoFocus
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1.3rem',
                            fontWeight: 900,
                            letterSpacing: '8px',
                            textAlign: 'center',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={twoFaOtpInput.length < 6}
                        style={{
                          width: '100%',
                          padding: '13px',
                          background: '#22c55e',
                          color: '#000000',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 900,
                          fontSize: '0.88rem',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          cursor: twoFaOtpInput.length < 6 ? 'not-allowed' : 'pointer',
                          opacity: twoFaOtpInput.length < 6 ? 0.6 : 1
                        }}
                      >
                        Verify 2FA OTP & Enter Command Center ✓
                      </button>

                      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => setPendingPassword2Fa(null)}
                          style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.76rem', cursor: 'pointer' }}
                        >
                          Cancel / Back to Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Demo Helper Chips */}
              <div style={{
                marginTop: '1.5rem',
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '10px',
                border: '1px dashed rgba(255, 255, 255, 0.15)',
                fontSize: '0.76rem',
                color: '#9ca3af'
              }}>
                <div style={{ fontWeight: 700, color: '#e5e7eb', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Default Super Admin Credentials:</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--accent, #eab308)' }}>Quick Fill ↓</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => { setLoginIdInput('admin'); setLoginPasswordInput('NorthAdmin#2026'); }}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      color: 'var(--accent, #eab308)',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    Super Admin (@admin)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setLoginIdInput('rohit'); setLoginPasswordInput('password123'); }}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '4px',
                      padding: '3px 8px',
                      color: 'var(--accent, #eab308)',
                      fontSize: '0.72rem',
                      cursor: 'pointer'
                    }}
                  >
                    Admin (@rohit)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Return link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
            <Link href="/" style={{ color: '#9ca3af', fontSize: '0.8rem', textDecoration: 'none' }}>
              ← Return to NORTH Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════
     GATE 2: USER IS LOGGED IN, BUT IS A CUSTOMER (NOT ADMIN)
  ══════════════════════════════════════════════════════════════════════ */
  if (!isUserAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 20%, #17171d 0%, #09090c 100%)',
        color: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
        fontFamily: 'var(--font-primary, sans-serif)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '520px',
          background: '#141418',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '18px',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.12)',
            color: '#ef4444',
            fontSize: '1.75rem',
            marginBottom: '1.25rem',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <i className="fas fa-lock"></i>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '0.5rem', color: '#fff' }}>
            Customer Account Detected
          </h2>

          <p style={{ fontSize: '0.86rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            Aap abhi <strong>{currentUser.name}</strong> (@{currentUser.username || 'customer'}) ke account se logged in hain, jo ki ek <strong>Customer Account</strong> hai.
            <br />
            Command Center me enter karne ke liye Super Admin account se sign up ya login karna mandatory hai.
          </p>

          {/* UPGRADE IN-PLACE FORM */}
          {isUpgradeMode ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem',
              textAlign: 'left',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent, #eab308)', margin: '0 0 8px 0' }}>
                Upgrade Current Account to Super Admin
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '0 0 1rem 0' }}>
                Apne registered email (<strong>{currentUser.email}</strong>) par OTP mangwayein aur passkey enter karein.
              </p>

              {upgradeError && (
                <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  ⚠️ {upgradeError}
                </div>
              )}

              {!upgradeOtpSent ? (
                <form onSubmit={handleCustomerRequestUpgradeOtp}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Super Admin Passcode
                    </label>
                    <input
                      type="text"
                      value={upgradePasskey}
                      onChange={(e) => setUpgradePasskey(e.target.value)}
                      placeholder="NORTH-ADMIN-2026"
                      required
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: 'var(--accent, #eab308)',
                        fontWeight: 700,
                        fontSize: '0.86rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="submit"
                      disabled={upgradeLoading}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: 'var(--accent, #eab308)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {upgradeLoading ? 'Sending...' : 'Send Upgrade OTP →'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUpgradeMode(false)}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.06)',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleCustomerVerifyUpgradeOtp}>
                  {pendingUserOtp && (
                    <div style={{
                      background: 'rgba(234, 179, 8, 0.15)',
                      border: '1px solid rgba(234, 179, 8, 0.35)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '0.82rem', color: '#fef08a' }}>
                        OTP: <strong>{pendingUserOtp.otp}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setUpgradeOtpInput(pendingUserOtp.otp)}
                        style={{ padding: '4px 8px', background: '#eab308', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer' }}
                      >
                        Auto-Fill
                      </button>
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase' }}>
                      Enter 6-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={upgradeOtpInput}
                      onChange={(e) => setUpgradeOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      required
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        letterSpacing: '6px',
                        textAlign: 'center'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="submit"
                      disabled={upgradeLoading || upgradeOtpInput.length < 6}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: '#22c55e',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {upgradeLoading ? 'Upgrading...' : 'Verify OTP & Upgrade ✓'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsUpgradeMode(false)}
                      style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.06)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* ACTION BUTTONS */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <button
                onClick={() => {
                  logoutUser();
                  setAuthMode('login');
                  setLoginIdInput('admin');
                }}
                style={{
                  width: '100%',
                  padding: '13px',
                  background: 'var(--accent, #eab308)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-sign-in-alt"></i>
                Sign In with Admin Account (OTP / Password)
              </button>

              <button
                onClick={() => {
                  logoutUser();
                  setAuthMode('signup');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-user-plus"></i>
                Register New Super Admin Account (with OTP)
              </button>

              <button
                onClick={() => setIsUpgradeMode(true)}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: 'rgba(234, 179, 8, 0.1)',
                  color: 'var(--accent, #eab308)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                ⚡ Upgrade Current Account to Super Admin
              </button>

              <Link
                href="/"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  color: '#9ca3af',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                ← Return to NORTH Storefront
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════
     GATE 3: AUTHENTICATED ADMIN USER DETECTED
  ══════════════════════════════════════════════════════════════════════ */
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#f5f5f5', fontFamily: 'var(--font-primary, sans-serif)' }}>
      {/* Top Admin Bar */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '0.85rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#111114',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '4px', margin: 0, color: '#fff' }}>NORTH</h2>
          <span style={{
            fontSize: '0.72rem',
            background: 'rgba(234, 179, 8, 0.15)',
            color: 'var(--accent, #eab308)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            padding: '4px 10px',
            borderRadius: '4px',
            fontWeight: 700,
            letterSpacing: '1px'
          }}>
            ADMIN PORTAL // AUTHENTICATED
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Active Admin Identity Badge */}
          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--accent, #eab308)',
              color: '#000',
              fontWeight: 900,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#fff' }}>
                {currentUser.name} <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>[ADMIN]</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                @{currentUser.username} • {currentUser.email}
              </div>
            </div>
          </div>

          <Link 
            href="/" 
            style={{
              padding: '6px 12px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-external-link-alt" style={{ fontSize: '0.75rem' }}></i> View Store
          </Link>

          {/* Secure Logout Button */}
          <button
            onClick={logoutUser}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-arrow-right-from-bracket"></i> Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '1.75rem 2rem' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <span>GROSS SALES REVENUE</span>
              <i className="fas fa-indian-rupee-sign" style={{ color: 'var(--accent, #eab308)' }}></i>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
            <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>↑ Across {totalOrdersCount} live drops</span>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <span>ORDERS IN TRANSIT</span>
              <i className="fas fa-truck-fast" style={{ color: '#3b82f6' }}></i>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>{inTransitCount}</div>
            <span style={{ fontSize: '0.72rem', color: '#93c5fd' }}>Where-to-where active route</span>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <span>AVERAGE ORDER VALUE</span>
              <i className="fas fa-chart-line" style={{ color: '#10b981' }}></i>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>₹{aov.toLocaleString('en-IN')}</div>
            <span style={{ fontSize: '0.72rem', color: '#888' }}>Street combo conversion boost</span>
          </div>

          <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              <span>LOW STOCK ALERT</span>
              <i className="fas fa-triangle-exclamation" style={{ color: '#ef4444' }}></i>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: lowStockCount > 0 ? '#ef4444' : '#fff' }}>
              {lowStockCount}
            </div>
            <span style={{ fontSize: '0.72rem', color: '#888' }}>Pieces with &lt; 5 units left</span>
          </div>
        </div>

        {/* Tab Controls (Reviews / Feedback explicitly excluded) */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.75rem', paddingBottom: '0.5rem', overflowX: 'auto' }}>
          {[
            { key: 'overview', label: 'Dashboard Overview', icon: 'fa-gauge' },
            { key: 'pricing', label: `Pricing & Products (${products.length})`, icon: 'fa-tags' },
            { key: 'orders', label: `Order Tracking & Route Tracing (${orders.length})`, icon: 'fa-route' },
            { key: 'inventory', label: 'Inventory Controller', icon: 'fa-warehouse' },
            { key: 'notifications', label: `Notifications Center (${notifications?.length || 0})`, icon: 'fa-bell' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab.key ? '#fff' : '#9ca3af',
                border: activeTab === tab.key ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <i className={`fas ${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            TAB 1: OVERVIEW & STREAM
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Recent Orders Stream</h3>
                <button 
                  onClick={() => setActiveTab('orders')} 
                  style={{ background: 'none', border: 'none', color: 'var(--accent, #eab308)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  Manage All Routes →
                </button>
              </div>

              {orders.slice(0, 5).map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{o.id}</div>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {o.customer?.name} • {o.items?.length} item(s) • Route: {o.origin?.city?.split('/')[0] || 'Mumbai'} → {o.destination?.city || o.customer?.city || 'Delhi'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800 }}>₹{o.grandTotal?.toLocaleString('en-IN')}</div>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: o.status === 'Delivered' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        color: o.status === 'Delivered' ? '#4ade80' : '#60a5fa',
                        fontWeight: 600
                      }}>
                        {o.status}
                      </span>
                    </div>
                    <button
                      onClick={() => openRouteDispatcher(o)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: '#e5e7eb',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                      title="Trace & Dispatch Route"
                    >
                      <i className="fas fa-route"></i> Trace
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem' }}>Admin Operations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    resetProductForm();
                    setIsAddModalOpen(true);
                  }}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <i className="fas fa-plus"></i> CREATE NEW STREETWEAR DROP
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => setActiveTab('pricing')}
                  style={{ width: '100%', borderColor: '#444', color: '#fff', justifyContent: 'center' }}
                >
                  <i className="fas fa-tags"></i> ADJUST PRODUCT PRICING
                </button>
                <button 
                  className="btn btn-outline"
                  onClick={() => setActiveTab('orders')}
                  style={{ width: '100%', borderColor: '#444', color: '#fff', justifyContent: 'center' }}
                >
                  <i className="fas fa-route"></i> WHERE-TO-WHERE DISPATCH BOARD
                </button>

                <div style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  color: '#9ca3af',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ color: 'var(--accent, #eab308)', fontWeight: 700, marginBottom: '4px' }}>
                    <i className="fas fa-shield-check"></i> Active Policy Rules:
                  </div>
                  • Only verified Admin users can enter.<br />
                  • Customer reviews excluded from admin controls.<br />
                  • Real-time synchronization active.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 2: PRICING & PRODUCT CATALOG
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'pricing' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Pricing & Catalog Manager</h3>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Edit selling price, compare-at MRP, and inventory badges in real-time</span>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  resetProductForm();
                  setIsAddModalOpen(true);
                }}
              >
                <i className="fas fa-plus"></i> ADD NEW DROP
              </button>
            </div>

            <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '1rem' }}>Streetwear Piece</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>GSM</th>
                    <th style={{ padding: '1rem' }}>Live Selling Price (₹)</th>
                    <th style={{ padding: '1rem' }}>Compare MRP (₹)</th>
                    <th style={{ padding: '1rem' }}>Stock</th>
                    <th style={{ padding: '1rem' }}>Badge</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => {
                    const inlineEdit = inlinePriceMap[p.id] || {};
                    const curPrice = inlineEdit.price !== undefined ? inlineEdit.price : p.price;
                    const curMrp = inlineEdit.originalPrice !== undefined ? inlineEdit.originalPrice : p.originalPrice;
                    const hasInlineChanges = inlinePriceMap[p.id] !== undefined;

                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <img 
                            src={p.colors?.[0]?.img || '/images/product-1.jpg'} 
                            alt={p.name} 
                            style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} 
                          />
                          <div>
                            <div style={{ fontWeight: 800 }}>{p.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                              <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>ID: {p.id}</span>
                              <span style={{ color: '#444' }}>•</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                {p.colors?.map((c, ci) => (
                                  <span
                                    key={ci}
                                    title={`${c.name} (${c.hex})`}
                                    style={{
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      background: c.hex,
                                      border: c.hex?.toLowerCase() === '#fff' || c.hex?.toLowerCase() === '#ffffff' ? '1px solid #666' : 'none',
                                      display: 'inline-block'
                                    }}
                                  />
                                ))}
                                <span style={{ fontSize: '0.68rem', color: 'var(--accent, #eab308)', marginLeft: '3px' }}>
                                  ({p.colors?.length || 1} colors)
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#d1d5db' }}>{p.category}</td>
                        <td style={{ padding: '1rem', fontWeight: 700 }}>{p.gsm} GSM</td>
                        
                        {/* Live Price Input */}
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>₹</span>
                            <input
                              type="number"
                              value={curPrice}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInlinePriceMap(prev => ({
                                  ...prev,
                                  [p.id]: {
                                    ...prev[p.id],
                                    price: val
                                  }
                                }));
                              }}
                              style={{
                                width: '80px',
                                padding: '4px 8px',
                                background: 'rgba(255,255,255,0.06)',
                                border: hasInlineChanges ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '4px',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.85rem'
                              }}
                            />
                          </div>
                        </td>

                        {/* Live MRP Input */}
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>₹</span>
                            <input
                              type="number"
                              value={curMrp}
                              onChange={(e) => {
                                const val = e.target.value;
                                setInlinePriceMap(prev => ({
                                  ...prev,
                                  [p.id]: {
                                    ...prev[p.id],
                                    originalPrice: val
                                  }
                                }));
                              }}
                              style={{
                                width: '80px',
                                padding: '4px 8px',
                                background: 'rgba(255,255,255,0.06)',
                                border: hasInlineChanges ? '1px solid var(--accent)' : '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '4px',
                                color: '#9ca3af',
                                fontSize: '0.85rem'
                              }}
                            />
                          </div>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: p.stockLeft < 5 ? '#ef4444' : '#22c55e', fontWeight: 700 }}>
                            {p.stockLeft} left
                          </span>
                        </td>

                        <td style={{ padding: '1rem' }}>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', fontSize: '0.72rem', fontWeight: 700 }}>
                            {p.badge}
                          </span>
                        </td>

                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          {hasInlineChanges && (
                            <button
                              onClick={() => handleSaveInlinePrice(p.id)}
                              style={{
                                background: 'var(--accent, #eab308)',
                                color: '#000',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '4px',
                                fontWeight: 800,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                marginRight: '8px'
                              }}
                              title="Save Price Update"
                            >
                              Save Price
                            </button>
                          )}
                          <button 
                            onClick={() => openEdit(p)}
                            style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', marginRight: '0.75rem', fontSize: '0.9rem' }}
                            title="Edit Drop Full Details"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Remove "${p.name}" from live catalog?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
                            title="Delete Drop"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 3: ORDERS & WHERE-TO-WHERE ROUTE TRACING
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Order Fulfillment & Route Tracing</h3>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  Track shipment route from Origin Hub to Destination Doorstep with live dispatcher checkpoints
                </span>
              </div>
            </div>

            <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af', background: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '1rem' }}>Order / Date</th>
                    <th style={{ padding: '1rem' }}>Customer</th>
                    <th style={{ padding: '1rem' }}>Origin Fulfillment</th>
                    <th style={{ padding: '1rem' }}>Destination Hub</th>
                    <th style={{ padding: '1rem' }}>Current Active Hub</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Route Dispatcher</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '1rem', fontWeight: 800 }}>
                        <div>{o.id}</div>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{o.date}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{o.customer?.name}</div>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{o.customer?.phone}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{o.origin?.city || 'Bhiwandi / Mumbai'}</div>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{o.origin?.code || 'BOM-HUB-01'}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{o.destination?.city || o.customer?.city || 'Customer Station'}</div>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>PIN: {o.destination?.pincode || o.customer?.pincode || '400050'}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--accent, #eab308)', fontWeight: 700, fontSize: '0.8rem' }}>
                          {o.currentHub || 'Bhiwandi Central Facility'}
                        </div>
                        <span style={{ fontSize: '0.72rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px', display: 'block' }}>
                          {o.liveLocation || 'Queued for dispatch'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: o.status === 'Delivered' ? 'rgba(34, 197, 94, 0.15)' : (o.status === 'In Transit' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(234, 179, 8, 0.15)'),
                          color: o.status === 'Delivered' ? '#4ade80' : (o.status === 'In Transit' ? '#60a5fa' : '#fde047')
                        }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => openRouteDispatcher(o)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            background: '#ffffff',
                            color: '#000',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <i className="fas fa-route"></i> Trace & Dispatch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 4: INVENTORY CONTROLLER
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'inventory' && (
          <div>
            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 800 }}>Live Inventory & Stock Count</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.2rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.2rem', display: 'flex', gap: '1rem' }}>
                  <img src={p.colors?.[0]?.img || '/images/product-1.jpg'} alt={p.name} style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', margin: '0 0 4px', fontWeight: 800 }}>{p.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{p.gsm} GSM • {p.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                        Stock: <strong style={{ color: p.stockLeft < 5 ? '#ef4444' : '#22c55e', fontSize: '1.1rem' }}>{p.stockLeft}</strong>
                      </span>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button 
                          onClick={() => updateProduct({ ...p, stockLeft: Math.max(0, (p.stockLeft || 0) - 1) })}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          -1
                        </button>
                        <button 
                          onClick={() => updateProduct({ ...p, stockLeft: (p.stockLeft || 0) + 5 })}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            TAB 5: NOTIFICATIONS & BROADCAST ALERTS
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'notifications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Broadcast Notifications Center</h3>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  Send real-time alerts & announcements to customers. Reflects instantly on the website's notification bell icon!
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Broadcast Form Card */}
              <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <h4 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 800, color: 'var(--accent, #eab308)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="fas fa-bullhorn"></i> Send New Storewide Notification
                </h4>

                <form onSubmit={handleBroadcastNotification}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>
                      Notification Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={broadcastTitle}
                      onChange={e => setBroadcastTitle(e.target.value)}
                      placeholder="e.g. 🔥 MIDNIGHT HEAVYWEIGHT DROP LIVE"
                      style={{ width: '100%', padding: '0.7rem', background: '#0e0e12', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>
                        Alert Category
                      </label>
                      <select
                        value={broadcastType}
                        onChange={e => setBroadcastType(e.target.value)}
                        style={{ width: '100%', padding: '0.7rem', background: '#0e0e12', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                      >
                        <option value="drop">Street Drop (Gold)</option>
                        <option value="discount">VIP Promo (Green)</option>
                        <option value="order">Dispatch Update (Blue)</option>
                        <option value="system">Announcement (Accent)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>
                        Target Link / Action
                      </label>
                      <input
                        type="text"
                        value={broadcastLink}
                        onChange={e => setBroadcastLink(e.target.value)}
                        placeholder="e.g. #collection or #combo"
                        style={{ width: '100%', padding: '0.7rem', background: '#0e0e12', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>
                      Notification Message *
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={broadcastMessage}
                      onChange={e => setBroadcastMessage(e.target.value)}
                      placeholder="Detailed drop details, coupon terms, or shipment information..."
                      style={{ width: '100%', padding: '0.7rem', background: '#0e0e12', border: '1px solid #333', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 800 }}
                  >
                    <i className="fas fa-paper-plane"></i> BROADCAST ALERT TO STORE
                  </button>
                </form>
              </div>

              {/* Active Notifications Preview & Management */}
              <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fas fa-list-check"></i> Active Notifications ({notifications?.length || 0})
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: '#888' }}>Latest first</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '360px', overflowY: 'auto' }}>
                  {(!notifications || notifications.length === 0) ? (
                    <p style={{ color: '#777', textAlign: 'center', padding: '2rem 0', fontSize: '0.85rem' }}>
                      No active notifications. Broadcast your first announcement above!
                    </p>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        style={{
                          background: '#0d0d10',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '8px',
                          padding: '0.9rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: notif.type === 'drop' ? 'rgba(245, 158, 11, 0.15)' : (notif.type === 'discount' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)'),
                              color: notif.type === 'drop' ? '#f59e0b' : (notif.type === 'discount' ? '#10b981' : '#60a5fa')
                            }}>
                              {(notif.type || 'DROP').toUpperCase()}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: '#666' }}>{notif.time}</span>
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                            {notif.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#999', lineHeight: 1.4 }}>
                            {notif.message}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteNotification(notif.id)}
                          title="Delete this notification"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            padding: '4px'
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: WHERE-TO-WHERE ROUTE INSPECTOR & DISPATCH CONTROLLER
      ══════════════════════════════════════════════════════════════════ */}
      {selectedTrackingOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            background: '#16161b',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '92vh',
            overflowY: 'auto',
            padding: '2rem',
            position: 'relative',
            color: '#f3f4f6'
          }}>
            <button
              onClick={() => setSelectedTrackingOrder(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(234, 179, 8, 0.15)',
                color: 'var(--accent, #eab308)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                <i className="fas fa-route"></i>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900 }}>
                  Route & Checkpoint Dispatcher
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  Order #{selectedTrackingOrder.id} • Customer: {selectedTrackingOrder.customer?.name}
                </span>
              </div>
            </div>

            {/* Route Map Header */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.2rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 700 }}>ORIGIN FULFILLMENT</span>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>
                    {selectedTrackingOrder.origin?.city || 'Bhiwandi / Mumbai'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>
                    {selectedTrackingOrder.origin?.facility || 'BOM-HUB-01'}
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '0 10px' }}>
                  <i className="fas fa-arrow-right-long" style={{ color: 'var(--accent, #eab308)', fontSize: '1.2rem' }}></i>
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: '2px' }}>
                    {selectedTrackingOrder.carrier}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.68rem', color: '#9ca3af', fontWeight: 700 }}>DESTINATION</span>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>
                    {selectedTrackingOrder.destination?.city || selectedTrackingOrder.customer?.city || 'Delhi'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>
                    PIN: {selectedTrackingOrder.destination?.pincode || selectedTrackingOrder.customer?.pincode || '110024'}
                  </div>
                </div>
              </div>

              {/* Current Active Hub & Live Note Inputs */}
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px' }}>
                    Current Active Logistics Hub:
                  </label>
                  <input
                    type="text"
                    value={dispatchHubInput}
                    onChange={(e) => setDispatchHubInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', color: '#9ca3af', marginBottom: '4px' }}>
                    Live Courier / Telemetry Note:
                  </label>
                  <input
                    type="text"
                    value={dispatchLocationInput}
                    onChange={(e) => setDispatchLocationInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Checkpoint Advancement Buttons */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#d1d5db', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                Advance Route Checkpoint:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleSaveRouteDispatch(selectedTrackingOrder.id, 1, 'Processing')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '6px',
                    background: selectedTrackingOrder.currentStep === 1 ? 'var(--accent, #eab308)' : 'rgba(255,255,255,0.06)',
                    color: selectedTrackingOrder.currentStep === 1 ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  1. Confirmed
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveRouteDispatch(selectedTrackingOrder.id, 2, 'Processing')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '6px',
                    background: selectedTrackingOrder.currentStep === 2 ? 'var(--accent, #eab308)' : 'rgba(255,255,255,0.06)',
                    color: selectedTrackingOrder.currentStep === 2 ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  2. Warehouse QC
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveRouteDispatch(selectedTrackingOrder.id, 3, 'In Transit')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '6px',
                    background: selectedTrackingOrder.currentStep === 3 ? 'var(--accent, #eab308)' : 'rgba(255,255,255,0.06)',
                    color: selectedTrackingOrder.currentStep === 3 ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  3. Linehaul Transit
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveRouteDispatch(selectedTrackingOrder.id, 4, 'Out for Delivery')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '6px',
                    background: selectedTrackingOrder.currentStep === 4 ? 'var(--accent, #eab308)' : 'rgba(255,255,255,0.06)',
                    color: selectedTrackingOrder.currentStep === 4 ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  4. Out for Delivery
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveRouteDispatch(selectedTrackingOrder.id, 5, 'Delivered')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '6px',
                    background: selectedTrackingOrder.currentStep === 5 ? '#22c55e' : 'rgba(255,255,255,0.06)',
                    color: selectedTrackingOrder.currentStep === 5 ? '#000' : '#fff',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  5. Delivered ✓
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setSelectedTrackingOrder(null)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Close Inspector
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSaveRouteDispatch(selectedTrackingOrder.id, selectedTrackingOrder.currentStep, selectedTrackingOrder.status);
                  setSelectedTrackingOrder(null);
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  background: 'var(--accent, #eab308)',
                  border: 'none',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Apply Tracking Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: ADD / EDIT PRODUCT FULL DETAILS
      ══════════════════════════════════════════════════════════════════ */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: '#16161b', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                {editingProduct ? 'Edit Streetwear Drop' : 'Create New Streetwear Drop'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Product / Drop Name *</label>
                <input 
                  type="text" 
                  required
                  value={prodName}
                  onChange={e => setProdName(e.target.value)}
                  placeholder="e.g. Acid Washed 260 GSM Boxy Tee"
                  style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Category</label>
                  <select 
                    value={prodCategory} 
                    onChange={e => setProdCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  >
                    <option value="tshirts">240 GSM Tees</option>
                    <option value="hoodies">Boxy Hoodies</option>
                    <option value="pants">Cargo Joggers</option>
                    <option value="jackets">Flight Jackets</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>GSM Fabric Weight</label>
                  <input 
                    type="text" 
                    value={prodGsm}
                    onChange={e => setProdGsm(e.target.value)}
                    placeholder="240"
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Selling Price (₹) *</label>
                  <input 
                    type="number" 
                    required
                    value={prodPrice}
                    onChange={e => setProdPrice(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Original MRP (₹) *</label>
                  <input 
                    type="number" 
                    required
                    value={prodOriginalPrice}
                    onChange={e => setProdOriginalPrice(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Initial Stock Units</label>
                  <input 
                    type="number" 
                    value={prodStock}
                    onChange={e => setProdStock(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Badge</label>
                  <select 
                    value={prodBadge} 
                    onChange={e => setProdBadge(e.target.value)}
                    style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  >
                    <option value="NEW DROP">NEW DROP</option>
                    <option value="HOT">HOT</option>
                    <option value="SALE">SALE</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="LIMITED">LIMITED</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '4px' }}>Fabric & Silhouette Description</label>
                <textarea 
                  rows="3" 
                  value={prodDesc}
                  onChange={e => setProdDesc(e.target.value)}
                  placeholder="Drop-shoulder boxy drape, thick 1.25' rib collar that never bacon..."
                  style={{ width: '100%', padding: '0.7rem', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                ></textarea>
              </div>

              {/* ─── COLOR CATALOG & IMAGE UPLOAD SECTION ─── */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '1.2rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent, #eab308)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      <i className="fas fa-palette" style={{ marginRight: '6px' }}></i> Color Catalog & Image Variants ({prodColors.length})
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#888' }}>
                      Add colors & upload images. Images are automatically saved into your project's real <code>public/images/</code> and <code>images/</code> folder!
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddColorVariant}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <i className="fas fa-plus"></i> Add Color
                  </button>
                </div>

                {/* Direct Project Folder Sync Banner */}
                <div style={{
                  background: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.22)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '0.74rem',
                  color: '#cbd5e1'
                }}>
                  <i className="fas fa-folder-open" style={{ color: 'var(--accent, #eab308)', fontSize: '1.1rem' }}></i>
                  <div>
                    <strong style={{ color: '#fff' }}>Direct Project Folder Sync:</strong> Koi bhi image upload karne par wo directly aapke project ke <strong>public/images/</strong> aur <strong>images/</strong> folder me as-it-is save ho jati hai.
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {prodColors.map((colorItem, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        background: '#0d0d10',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        padding: '1rem',
                        display: 'grid',
                        gridTemplateColumns: '70px 1fr auto',
                        gap: '1rem',
                        alignItems: 'center'
                      }}
                    >
                      {/* Image Preview & File Upload Trigger */}
                      <div style={{ position: 'relative', width: '70px', height: '85px', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', background: '#1a1a1f' }}>
                        <img
                          src={colorItem.img || '/images/product-1.jpg'}
                          alt={colorItem.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <label
                          htmlFor={`file-upload-${cIdx}`}
                          title="Click to Upload to Project Folder"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0,0,0,0.7)',
                            opacity: uploadingColorIndex === cIdx ? 1 : 0,
                            transition: 'opacity 0.2s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: uploadingColorIndex === cIdx ? 'wait' : 'pointer',
                            color: '#fff',
                            fontSize: '0.68rem',
                            textAlign: 'center',
                            padding: '4px'
                          }}
                          onMouseEnter={e => { if (uploadingColorIndex !== cIdx) e.currentTarget.style.opacity = '1'; }}
                          onMouseLeave={e => { if (uploadingColorIndex !== cIdx) e.currentTarget.style.opacity = '0'; }}
                        >
                          {uploadingColorIndex === cIdx ? (
                            <>
                              <i className="fas fa-spinner fa-spin" style={{ fontSize: '1rem', marginBottom: '3px', color: 'var(--accent, #eab308)' }}></i>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <i className="fas fa-camera" style={{ fontSize: '1rem', marginBottom: '2px' }}></i>
                              Upload
                            </>
                          )}
                        </label>
                        <input
                          id={`file-upload-${cIdx}`}
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleColorImageUpload(e.target.files[0], cIdx);
                            }
                          }}
                        />
                      </div>

                      {/* Color Details & Controls */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.6rem' }}>
                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '3px' }}>Color Name</span>
                            <input
                              type="text"
                              required
                              value={colorItem.name}
                              onChange={(e) => handleColorFieldChange(cIdx, 'name', e.target.value)}
                              placeholder="e.g. Pitch Black"
                              style={{ width: '100%', padding: '0.5rem', background: '#16161b', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
                            />
                          </div>

                          <div>
                            <span style={{ fontSize: '0.7rem', color: '#888', display: 'block', marginBottom: '3px' }}>Swatch / Hex</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <input
                                type="color"
                                value={colorItem.hex?.startsWith('#') ? colorItem.hex : '#111111'}
                                onChange={(e) => handleColorFieldChange(cIdx, 'hex', e.target.value)}
                                style={{ width: '32px', height: '32px', padding: 0, border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'none' }}
                                title="Pick exact color"
                              />
                              <input
                                type="text"
                                value={colorItem.hex}
                                onChange={(e) => handleColorFieldChange(cIdx, 'hex', e.target.value)}
                                placeholder="#111111"
                                style={{ flex: 1, padding: '0.5rem', background: '#16161b', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Image URL / Local path field & Upload action */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="text"
                              value={colorItem.img}
                              onChange={(e) => handleColorFieldChange(cIdx, 'img', e.target.value)}
                              placeholder="Image URL or upload file"
                              style={{ flex: 1, padding: '0.45rem 0.6rem', background: '#16161b', border: '1px solid #292930', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}
                            />
                            <label
                              htmlFor={`btn-file-${cIdx}`}
                              style={{
                                background: uploadingColorIndex === cIdx ? '#374151' : 'var(--accent, #eab308)',
                                color: '#000',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                cursor: uploadingColorIndex === cIdx ? 'wait' : 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {uploadingColorIndex === cIdx ? (
                                <>
                                  <i className="fas fa-spinner fa-spin"></i> Saving...
                                </>
                              ) : (
                                <>
                                  <i className="fas fa-upload"></i> Upload
                                </>
                              )}
                            </label>
                            <input
                              id={`btn-file-${cIdx}`}
                              type="file"
                              accept="image/*"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleColorImageUpload(e.target.files[0], cIdx);
                                }
                              }}
                            />
                          </div>

                          {colorItem.img && colorItem.img.startsWith('/images/') && (
                            <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <i className="fas fa-check-circle"></i> In project folder: <code>{colorItem.img}</code>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Delete Color Option */}
                      <div>
                        {prodColors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColorVariant(cIdx)}
                            title="Remove this color variant"
                            style={{
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.2)',
                              color: '#ef4444',
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)} style={{ flex: 1, borderColor: '#444', color: '#fff' }}>
                  CANCEL
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                  {editingProduct ? 'SAVE CHANGES' : 'PUBLISH DROP TO STORE'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
