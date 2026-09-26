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
    loginUser,
    pendingUserOtp,
    setPendingUserOtp,
    notifications,
    addNotification,
    deleteNotification,
    defectReports,
    updateDefectReportStatus
  } = useShop();

  // Admin Gate Login Form State
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'password'
  const [loginIdInput, setLoginIdInput] = useState('admin');
  const [loginPasswordInput, setLoginPasswordInput] = useState('NorthAdmin#2026');
  const [otpInput, setOtpInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard State
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'pricing', 'orders', 'inventory', 'defects'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [defectFilter, setDefectFilter] = useState('all');
  const [selectedDefectPhoto, setSelectedDefectPhoto] = useState(null);

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

  // Handler: Request OTP for Admin Gate
  const handleAdminRequestOtp = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    setTimeout(() => {
      const res = sendLoginOtp(loginIdInput);
      setAuthLoading(false);
      if (!res.success) {
        setAuthError(res.error);
      } else {
        setOtpInput('');
      }
    }, 400);
  };

  // Handler: Verify OTP for Admin Gate
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
          setAuthError(`Access Denied: Account "${res.user.name}" is registered as a Customer. Please sign in with an Administrator account.`);
        }
      }
    }, 400);
  };

  // Handler: Password Login for Admin Gate
  const handleAdminPasswordLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    setTimeout(() => {
      const res = loginUser({
        identifier: loginIdInput,
        password: loginPasswordInput
      });
      setAuthLoading(false);
      if (!res.success) {
        setAuthError(res.error);
      } else {
        if (res.user && res.user.role !== 'admin') {
          setAuthError(`Access Denied: Account "${res.user.name}" is a Customer account. Admin credentials required.`);
        }
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
     GATE 1: USER IS NOT LOGGED IN AT ALL
  ══════════════════════════════════════════════════════════════════════ */
  if (!currentUser) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 50% 20%, #17171d 0%, #09090c 100%)',
        color: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'var(--font-primary, sans-serif)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '460px',
          background: 'rgba(20, 20, 25, 0.96)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              color: 'var(--accent, #eab308)',
              fontSize: '1.5rem',
              marginBottom: '1rem'
            }}>
              <i className="fas fa-shield-halved"></i>
            </div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
              Admin Portal Login
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '6px' }}>
              Pehle user login karein (Username / Email / Mobile number + OTP)
            </p>
          </div>

          {/* Toggle Login Method */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              type="button"
              onClick={() => { setLoginMethod('otp'); setAuthError(''); }}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.82rem',
                background: loginMethod === 'otp' ? '#ffffff' : 'transparent',
                color: loginMethod === 'otp' ? '#0a0a0c' : '#9ca3af'
              }}
            >
              Direct OTP Login
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod('password'); setAuthError(''); setPendingUserOtp(null); }}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.82rem',
                background: loginMethod === 'password' ? '#ffffff' : 'transparent',
                color: loginMethod === 'password' ? '#0a0a0c' : '#9ca3af'
              }}
            >
              Password Login
            </button>
          </div>

          {/* Error Banner */}
          {authError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#f87171',
              fontSize: '0.82rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>⚠️</span>
              <span>{authError}</span>
            </div>
          )}

          {/* METHOD 1: DIRECT OTP LOGIN */}
          {loginMethod === 'otp' && (
            <div>
              {!pendingUserOtp ? (
                <form onSubmit={handleAdminRequestOtp}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Admin Username, Email, or Mobile Number
                    </label>
                    <input
                      type="text"
                      value={loginIdInput}
                      onChange={(e) => setLoginIdInput(e.target.value)}
                      placeholder="e.g. admin, admin@wearnorth.com, or 9820149201"
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
                      padding: '12px',
                      background: 'var(--accent, #eab308)',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: authLoading ? 'not-allowed' : 'pointer',
                      opacity: authLoading ? 0.7 : 1
                    }}
                  >
                    {authLoading ? 'Transmitting OTP...' : 'Send Login OTP →'}
                  </button>
                </form>
              ) : (
                /* OTP CODE VERIFICATION */
                <form onSubmit={handleAdminVerifyOtp}>
                  <div style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    marginBottom: '1.2rem',
                    fontSize: '0.78rem',
                    color: '#86efac'
                  }}>
                    OTP sent to: <strong>{pendingUserOtp.targetUser?.email}</strong> & <strong>+91 {pendingUserOtp.targetUser?.phone}</strong>
                  </div>

                  {/* Auto-Fill Banner */}
                  <div style={{
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#fef08a', display: 'block' }}>GENERATED OTP</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '4px', color: '#fff' }}>
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
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Auto-Fill Code
                    </button>
                  </div>

                  <div style={{ marginBottom: '1.4rem' }}>
                    <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 800,
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
                      padding: '12px',
                      background: '#22c55e',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      cursor: (authLoading || otpInput.length < 6) ? 'not-allowed' : 'pointer',
                      opacity: (authLoading || otpInput.length < 6) ? 0.6 : 1
                    }}
                  >
                    {authLoading ? 'Verifying OTP...' : 'Verify OTP & Enter Command Center ✓'}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => sendLoginOtp(loginIdInput)}
                      style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Resend OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingUserOtp(null)}
                      style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Change Username
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: PASSWORD LOGIN */}
          {loginMethod === 'password' && (
            <form onSubmit={handleAdminPasswordLogin}>
              <div style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Admin Username, Email, or Mobile Number
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
                <label style={{ display: 'block', fontSize: '0.76rem', color: '#9ca3af', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Admin Password
                </label>
                <input
                  type="password"
                  value={loginPasswordInput}
                  onChange={(e) => setLoginPasswordInput(e.target.value)}
                  placeholder="Enter administrator password"
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
                  padding: '12px',
                  background: 'var(--accent, #eab308)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: authLoading ? 'not-allowed' : 'pointer',
                  opacity: authLoading ? 0.7 : 1
                }}
              >
                {authLoading ? 'Verifying...' : 'Sign In to Command Center'}
              </button>
            </form>
          )}

          {/* Quick Demo Helper */}
          <div style={{
            marginTop: '1.5rem',
            padding: '10px 12px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            border: '1px dashed rgba(255, 255, 255, 0.15)',
            fontSize: '0.75rem',
            color: '#9ca3af'
          }}>
            <div style={{ fontWeight: 600, color: '#e5e7eb', marginBottom: '4px' }}>Authorized Admin Credentials:</div>
            <div>Username: <code style={{ color: 'var(--accent, #eab308)' }}>admin</code> | Pass: <code style={{ color: 'var(--accent, #eab308)' }}>NorthAdmin#2026</code></div>
            <div>Mobile: <code style={{ color: 'var(--accent, #eab308)' }}>9820149201</code> (Direct OTP)</div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
            <Link href="/" style={{ color: '#9ca3af', fontSize: '0.78rem', textDecoration: 'none' }}>
              ← Return to NORTH Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════════
     GATE 2: USER IS LOGGED IN, BUT IS NOT AN ADMIN
  ══════════════════════════════════════════════════════════════════════ */
  if (!isUserAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#09090c',
        color: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        fontFamily: 'var(--font-primary, sans-serif)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          background: '#141418',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          padding: '2.5rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            fontSize: '1.75rem',
            marginBottom: '1.25rem'
          }}>
            <i className="fas fa-lock"></i>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.5rem' }}>
            Access Denied: Admin Privileges Required
          </h2>

          <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            Aap abhi <strong>{currentUser.name}</strong> (@{currentUser.username || 'customer'}) ke account se logged in hain, jo ki ek <strong>Customer Account</strong> hai.
            <br />
            Admin portal me enter karne ke liye Admin account se login karna mandatory hai.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                logoutUser();
                setLoginIdInput('admin');
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: 'var(--accent, #eab308)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              Sign In with Admin Account (OTP / Password)
            </button>

            <Link
              href="/"
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              Return to Storefront
            </Link>
          </div>
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
            { key: 'notifications', label: `Notifications Center (${notifications?.length || 0})`, icon: 'fa-bell' },
            { key: 'defects', label: `Defect Reports (${defectReports?.length || 0})`, icon: 'fa-triangle-exclamation' }
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

        {/* ═════════════════════════════════════════════════════════════════
            TAB 6: DEFECTIVE PRODUCT REPORTS & QC AUDIT
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'defects' && (
          <div>
            {/* Header + Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Total Defect Tickets</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '4px' }}>{defectReports?.length || 0}</div>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Customer grievance claims</span>
              </div>
              <div style={{ background: '#141418', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 700, textTransform: 'uppercase' }}>Pending QC / Review</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#ef4444', marginTop: '4px' }}>
                  {(defectReports || []).filter(r => r.status === 'Pending Review' || r.status === 'Under QC Inspection').length}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#fca5a5' }}>Requires urgent inspection</span>
              </div>
              <div style={{ background: '#141418', border: '1px solid rgba(59, 130, 246, 0.25)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, textTransform: 'uppercase' }}>Replacements Dispatched</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#3b82f6', marginTop: '4px' }}>
                  {(defectReports || []).filter(r => r.status === 'Approved Replacement').length}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#93c5fd' }}>Fresh pieces shipped</span>
              </div>
              <div style={{ background: '#141418', border: '1px solid rgba(34, 197, 94, 0.25)', padding: '1.25rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase' }}>Resolved / Refunded</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#22c55e', marginTop: '4px' }}>
                  {(defectReports || []).filter(r => r.status === 'Resolved' || r.status === 'Approved Refund').length}
                </div>
                <span style={{ fontSize: '0.72rem', color: '#86efac' }}>Full customer satisfaction</span>
              </div>
            </div>

            {/* Filter Pill Row */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {[
                { id: 'all', label: `All Reports (${defectReports?.length || 0})` },
                { id: 'Pending Review', label: 'Pending Review' },
                { id: 'Under QC Inspection', label: 'Under QC' },
                { id: 'Approved Replacement', label: 'Approved Replacement' },
                { id: 'Approved Refund', label: 'Approved Refund' },
                { id: 'Resolved', label: 'Resolved' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setDefectFilter(f.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: defectFilter === f.id ? '1px solid var(--accent, #eab308)' : '1px solid rgba(255,255,255,0.1)',
                    background: defectFilter === f.id ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255,255,255,0.04)',
                    color: defectFilter === f.id ? 'var(--accent, #eab308)' : '#9ca3af',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Reports List */}
            {(!defectReports || defectReports.length === 0) ? (
              <div style={{ background: '#141418', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '3rem', textAlign: 'center' }}>
                <i className="fas fa-circle-check" style={{ fontSize: '2.5rem', color: '#22c55e', marginBottom: '1rem' }}></i>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px' }}>Zero Defective Reports</h3>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: 0 }}>Every shipped streetwear parcel currently passes 100% Quality Inspection.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {defectReports
                  .filter(r => defectFilter === 'all' || r.status === defectFilter)
                  .map(report => (
                    <div
                      key={report.id}
                      style={{
                        background: '#141418',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
                      }}
                    >
                      {/* Ticket Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--accent, #eab308)', letterSpacing: '0.05em' }}>
                              #{report.id}
                            </span>
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: report.status === 'Pending Review' ? 'rgba(239, 68, 68, 0.15)' :
                                report.status === 'Under QC Inspection' ? 'rgba(234, 179, 8, 0.15)' :
                                report.status === 'Approved Replacement' ? 'rgba(59, 130, 246, 0.15)' :
                                report.status === 'Approved Refund' ? 'rgba(168, 85, 247, 0.15)' :
                                'rgba(34, 197, 94, 0.15)',
                              color: report.status === 'Pending Review' ? '#ef4444' :
                                report.status === 'Under QC Inspection' ? '#eab308' :
                                report.status === 'Approved Replacement' ? '#60a5fa' :
                                report.status === 'Approved Refund' ? '#c084fc' :
                                '#22c55e',
                              border: '1px solid currentColor'
                            }}>
                              {report.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: '4px' }}>
                            Reported on {new Date(report.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        {/* Customer & Order pills */}
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: '#d1d5db' }}>
                            <i className="fas fa-receipt" style={{ marginRight: '6px', color: 'var(--accent)' }}></i>
                            Order: <strong>{report.orderId}</strong>
                          </span>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', color: '#d1d5db' }}>
                            <i className="fas fa-user" style={{ marginRight: '6px', color: 'var(--accent)' }}></i>
                            {report.customerName}
                          </span>
                        </div>
                      </div>

                      {/* Main details grid: Info + Uploaded Images */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1.4fr) minmax(240px, 1fr)', gap: '1.5rem', marginBottom: '1.25rem' }}>
                        <div>
                          <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700 }}>Damaged Item & Defect Type</div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                              {report.productName} {report.productColor && <span style={{ color: '#9ca3af', fontWeight: 500 }}>({report.productColor})</span>}
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '0.75rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.2)' }}>
                              <i className="fas fa-triangle-exclamation"></i>
                              {report.defectCategoryLabel || report.defectCategory}
                            </div>
                          </div>

                          <div style={{ marginBottom: '0.75rem' }}>
                            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700 }}>Customer's Concern / Feedback:</div>
                            <div style={{ fontSize: '0.84rem', color: '#e5e7eb', background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', marginTop: '4px', lineHeight: 1.5 }}>
                              "{report.description}"
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.75rem' }}>
                            <div>
                              <span style={{ color: '#9ca3af', display: 'block' }}>Customer Request:</span>
                              <span style={{ fontWeight: 800, color: report.resolutionPreference === 'replacement' ? '#60a5fa' : report.resolutionPreference === 'refund' ? '#c084fc' : '#eab308' }}>
                                {report.resolutionPreference === 'replacement' ? '🔄 Free Replacement' :
                                 report.resolutionPreference === 'refund' ? '💸 Full Refund to Source' :
                                 '🎁 Store Credit + ₹200 Goodwill'}
                              </span>
                            </div>
                            <div>
                              <span style={{ color: '#9ca3af', display: 'block' }}>Contact Details:</span>
                              <span style={{ color: '#fff' }}>📱 {report.customerPhone} • {report.customerEmail}</span>
                            </div>
                          </div>

                          {report.pickupAddress && (
                            <div style={{ marginTop: '8px', fontSize: '0.74rem', color: '#9ca3af' }}>
                              📍 Reverse Pickup: <span style={{ color: '#e5e7eb' }}>{report.pickupAddress}</span>
                            </div>
                          )}

                          {report.statusNote && (
                            <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--accent, #eab308)', background: 'rgba(234,179,8,0.08)', padding: '6px 10px', borderRadius: '6px' }}>
                              ⚡ Note: {report.statusNote}
                            </div>
                          )}
                        </div>

                        {/* Customer Uploaded Defect Photos */}
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#9ca3af', fontWeight: 700 }}>
                              <i className="fas fa-camera" style={{ marginRight: '6px', color: 'var(--accent)' }}></i>
                              Uploaded Defect Evidence ({report.images?.length || 0})
                            </div>
                            <span style={{ fontSize: '0.68rem', color: '#666' }}>Click to zoom</span>
                          </div>

                          {(!report.images || report.images.length === 0) ? (
                            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#666', fontSize: '0.76rem' }}>
                              No defect photos attached by customer
                            </div>
                          ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '8px' }}>
                              {report.images.map((imgUrl, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => setSelectedDefectPhoto({ url: imgUrl, reportId: report.id, index: idx + 1 })}
                                  style={{
                                    padding: 0,
                                    background: '#000',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '6px',
                                    overflow: 'hidden',
                                    aspectRatio: '1',
                                    cursor: 'pointer',
                                    position: 'relative'
                                  }}
                                  title="Click to zoom inspect"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`Defect ${idx + 1}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.currentTarget.src = '/images/product-1.jpg';
                                    }}
                                  />
                                  <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'rgba(0,0,0,0.7)',
                                    color: '#fff',
                                    fontSize: '0.6rem',
                                    textAlign: 'center',
                                    padding: '2px 0'
                                  }}>
                                    Photo #{idx + 1}
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Admin Decision & Status Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                        <span style={{ fontSize: '0.74rem', color: '#9ca3af', fontWeight: 600 }}>
                          Admin Actions & Resolution:
                        </span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => updateDefectReportStatus(report.id, 'Under QC Inspection', 'Reverse pickup scheduled for inspection')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              background: 'rgba(234, 179, 8, 0.1)',
                              border: '1px solid rgba(234, 179, 8, 0.3)',
                              color: 'var(--accent, #eab308)',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-magnifying-glass" style={{ marginRight: '4px' }}></i> Move to QC
                          </button>

                          <button
                            type="button"
                            onClick={() => updateDefectReportStatus(report.id, 'Approved Replacement', 'Express replacement parcel dispatched')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              background: 'rgba(59, 130, 246, 0.15)',
                              border: '1px solid rgba(59, 130, 246, 0.4)',
                              color: '#60a5fa',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-box-check" style={{ marginRight: '4px' }}></i> Approve Replacement
                          </button>

                          <button
                            type="button"
                            onClick={() => updateDefectReportStatus(report.id, 'Approved Refund', 'Full refund initiated to original payment source')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              background: 'rgba(168, 85, 247, 0.15)',
                              border: '1px solid rgba(168, 85, 247, 0.4)',
                              color: '#c084fc',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-indian-rupee-sign" style={{ marginRight: '4px' }}></i> Approve Refund
                          </button>

                          <button
                            type="button"
                            onClick={() => updateDefectReportStatus(report.id, 'Resolved', 'Ticket resolved with customer satisfaction')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              background: 'rgba(34, 197, 94, 0.15)',
                              border: '1px solid rgba(34, 197, 94, 0.4)',
                              color: '#4ade80',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-check-double" style={{ marginRight: '4px' }}></i> Mark Resolved
                          </button>

                          <button
                            type="button"
                            onClick={() => updateDefectReportStatus(report.id, 'Rejected', 'Defect not verified against quality criteria')}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#f87171',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <i className="fas fa-ban" style={{ marginRight: '4px' }}></i> Reject Claim
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
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

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: HIGH-RES DEFECT PHOTO INSPECTOR
      ══════════════════════════════════════════════════════════════════ */}
      {selectedDefectPhoto && (
        <div
          onClick={() => setSelectedDefectPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '850px',
              width: '100%',
              background: '#16161b',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>
                  Defect Photo Evidence Inspection
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent, #eab308)', marginLeft: '10px' }}>
                  Ticket #{selectedDefectPhoto.reportId}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDefectPhoto(null)}
                style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: '1rem', background: '#0a0a0c', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '70vh' }}>
              <img
                src={selectedDefectPhoto.url}
                alt="Defect evidence zoom"
                style={{ maxWidth: '100%', maxHeight: '68vh', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <div style={{ padding: '10px 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: '#9ca3af' }}>
              <span>Customer photo #{selectedDefectPhoto.index} attached during defect report</span>
              <button
                type="button"
                onClick={() => setSelectedDefectPhoto(null)}
                style={{ padding: '6px 14px', borderRadius: '6px', background: 'var(--accent, #eab308)', color: '#000', border: 'none', fontWeight: 800, cursor: 'pointer' }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
