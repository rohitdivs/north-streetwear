'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQty, 
    removeFromCart, 
    appliedCoupon, 
    applyCoupon,
    placeOrder,
    showToast,
    currentUser,
    setIsAuthModalOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [placedOrder, setPlacedOrder] = useState(null);

  // Form State
  const [name, setName] = useState('Aryan Mehta');
  const [phone, setPhone] = useState('9820149201');
  const [email, setEmail] = useState('aryan.mehta@gmail.com');
  const [address, setAddress] = useState('Flat 402, Sea Green Apts, Linking Road');
  const [city, setCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [paymentMethod, setPaymentMethod] = useState('Instant UPI (GPay)');

  // Synchronize when currentUser is logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.phone) setPhone(currentUser.phone);
      if (currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = appliedCoupon 
    ? (appliedCoupon.type === 'flat' ? appliedCoupon.discount : Math.round((subtotal * appliedCoupon.discount) / 100))
    : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  // Free shipping progress meter (Tier 1: ₹799 Free delivery, Tier 2: ₹2999 Free cap)
  const shippingPercent = Math.min(100, Math.round((subtotal / 799) * 100));
  const amountNeeded = Math.max(0, 799 - subtotal);

  const handleApplyCoupon = (codeToApply) => {
    const target = codeToApply || couponInput;
    if (applyCoupon(target)) {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !city || !pincode) {
      showToast('Please fill all required shipping fields', 'error');
      return;
    }
    const newOrd = placeOrder({
      name,
      phone,
      email,
      address,
      city,
      pincode
    }, paymentMethod);
    setPlacedOrder(newOrd);
    setCheckoutStep(3);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isCartOpen ? 'active' : ''}`}
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Slide Drawer */}
      <aside className={`slide-drawer ${isCartOpen ? 'open' : ''}`} id="cartDrawer" aria-label="Shopping Bag Drawer">
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <i className="fas fa-shopping-bag"></i>
            <h3>YOUR BAG</h3>
            <span className="drawer-count-badge">
              {cart.reduce((t, i) => t + i.qty, 0)} ITEMS
            </span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Bag">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* 2-Tier Dynamic Free Shipping Meter */}
        <div className="shipping-meter-box">
          <div className="shipping-meter-text">
            {amountNeeded === 0 ? (
              <span style={{ color: '#22c55e', fontWeight: 700 }}>
                🎉 You unlocked <strong>FREE Express Delivery</strong> across India!
              </span>
            ) : (
              <span>
                Add <strong>₹{amountNeeded.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE Express Delivery</strong>!
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div className="shipping-progress-bar" style={{ width: `${shippingPercent}%` }}></div>
          </div>
          <div className="shipping-tiers-milestones">
            <span>₹0</span>
            <span className={`milestone-step ${subtotal >= 799 ? 'achieved' : ''}`}>FREE DELIVERY (₹799)</span>
            <span className={`milestone-step ${subtotal >= 2999 ? 'achieved' : ''}`}>FREE CAP (₹2,999)</span>
          </div>
        </div>

        {/* Cart Items List Container */}
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <i className="fas fa-shopping-bag empty-icon"></i>
              <h4>Your Bag is Empty</h4>
              <p>Looks like you haven't added any heavyweight drops yet.</p>
              <button className="btn btn-primary btn-sm" onClick={() => setIsCartOpen(false)}>
                EXPLORE 2026 DROPS
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="cart-item-card">
                <img src={item.img} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-title">{item.name}</div>
                  <div className="cart-item-variants">
                    <span>Color: {item.color}</span>
                    <span>•</span>
                    <span>Size: {item.size}</span>
                  </div>
                  <div className="cart-item-price-row">
                    <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                    <div className="cart-qty-adjuster">
                      <button className="cart-qty-btn" onClick={() => updateCartQty(idx, item.qty - 1)}>-</button>
                      <span className="cart-qty-num">{item.qty}</span>
                      <button className="cart-qty-btn" onClick={() => updateCartQty(idx, item.qty + 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button 
                  className="cart-item-remove-btn" 
                  onClick={() => removeFromCart(idx)}
                  title="Remove piece"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Promo Code Box */}
            <div className="coupon-box">
              <div className="coupon-input-group">
                <i className="fas fa-tag coupon-icon"></i>
                <input 
                  type="text" 
                  placeholder="PROMO CODE" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                />
                <button className="coupon-apply-btn" onClick={() => handleApplyCoupon()}>
                  APPLY
                </button>
              </div>
              <div className="coupon-tags-pills">
                <span className="coupon-quick-pill" onClick={() => handleApplyCoupon('NORTH500')}>NORTH500 (-₹500)</span>
                <span className="coupon-quick-pill" onClick={() => handleApplyCoupon('DROP20')}>DROP20 (-20%)</span>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bill-summary-list">
              <div className="bill-row">
                <span>Bag Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedCoupon && (
                <div className="bill-row discount-row">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="bill-row">
                <span>Express Shipping</span>
                <span>{amountNeeded === 0 ? 'FREE' : '₹99'}</span>
              </div>
              <div className="bill-row total-row">
                <span>Grand Total</span>
                <span className="bill-grand-total">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary btn-lg checkout-trigger-btn" 
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutModalOpen(true);
                setCheckoutStep(1);
              }}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <i className="fas fa-lock"></i> PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </aside>

      {/* Complete Checkout Modal */}
      {isCheckoutModalOpen && (
        <>
          <div className="modal-backdrop active" onClick={() => setIsCheckoutModalOpen(false)}></div>
          <div className="checkout-modal open">
            <button className="modal-close-icon" onClick={() => setIsCheckoutModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>

            {checkoutStep < 3 && (
              <div className="checkout-stepper-bar">
                <div className={`checkout-step-node ${checkoutStep >= 1 ? 'active' : ''}`}>
                  <span className="step-num">1</span>
                  <span className="step-txt">Shipping Address</span>
                </div>
                <div className="step-divider-line"></div>
                <div className={`checkout-step-node ${checkoutStep >= 2 ? 'active' : ''}`}>
                  <span className="step-num">2</span>
                  <span className="step-txt">Payment Method</span>
                </div>
              </div>
            )}

            {/* Step 1: Shipping Address Form */}
            {checkoutStep === 1 && (
              <div className="checkout-step-pane active" style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: currentUser ? 'rgba(34, 197, 94, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                  border: currentUser ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  marginBottom: '1rem',
                  fontSize: '0.78rem'
                }}>
                  {currentUser ? (
                    <div>
                      <span style={{ color: '#4ade80', fontWeight: 600 }}>✓ VIP Member:</span> {currentUser.name} ({currentUser.email})
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <span style={{ color: '#9ca3af' }}>Checking out as Guest</span>
                      <button
                        type="button"
                        onClick={() => setIsAuthModalOpen(true)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent)',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontSize: '0.76rem'
                        }}
                      >
                        Sign in to autofill
                      </button>
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem' }}>Doorstep Delivery Address</h3>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Phone Number *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>House / Flat / Street *</label>
                  <input type="text" required value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>City *</label>
                    <input type="text" required value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>PIN Code *</label>
                    <input type="text" required value={pincode} onChange={e => setPincode(e.target.value)} style={{ width: '100%', padding: '0.7rem', border: '1px solid var(--border)', borderRadius: '4px' }} />
                  </div>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={() => setCheckoutStep(2)}
                  style={{ width: '100%', padding: '0.9rem' }}
                >
                  CONTINUE TO PAYMENT (₹{finalTotal.toLocaleString('en-IN')})
                </button>
              </div>
            )}

            {/* Step 2: Payment Selection */}
            {checkoutStep === 2 && (
              <form onSubmit={handlePlaceOrder} style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem' }}>Select Payment Mode</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  {[
                    { key: 'Instant UPI (GPay)', title: 'Instant UPI (Google Pay, PhonePe, Paytm)', tag: 'FASTEST' },
                    { key: 'Cash On Delivery (COD)', title: 'Cash on Delivery (COD)', tag: 'VERIFIED' },
                    { key: 'Debit / Credit Card', title: 'Debit / Credit Card & NetBanking', tag: 'ALL BANKS' }
                  ].map(m => (
                    <label 
                      key={m.key} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '1rem', 
                        border: '1px solid var(--border)', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        background: paymentMethod === m.key ? 'var(--bg-alt)' : 'transparent' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <input type="radio" name="checkoutPay" checked={paymentMethod === m.key} onChange={() => setPaymentMethod(m.key)} />
                        <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{m.title}</span>
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent)', background: 'rgba(201,169,110,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                        {m.tag}
                      </span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setCheckoutStep(1)} style={{ flex: 1 }}>
                    BACK
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                    CONFIRM & PLACE DROP (₹{finalTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Order Confirmation */}
            {checkoutStep === 3 && placedOrder && (
              <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ width: '65px', height: '65px', borderRadius: '50%', background: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.2rem' }}>
                  <i className="fas fa-check"></i>
                </div>
                <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem' }}>Payment & Order Confirmed!</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', margin: '0 0 1.5rem' }}>
                  Your order <strong>{placedOrder.id}</strong> has been received and scheduled for packaging.
                </p>

                <div style={{ background: 'var(--bg-alt)', borderRadius: '8px', padding: '1.2rem', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>AWB Tracking:</span>
                    <strong style={{ color: 'var(--accent)' }}>{placedOrder.awb}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Courier:</span>
                    <strong>{placedOrder.carrier}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Payment Mode:</span>
                    <strong>{placedOrder.paymentMethod}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Delivering To:</span>
                    <strong>{placedOrder.customer?.city} ({placedOrder.customer?.pincode})</strong>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  style={{ width: '100%' }}
                >
                  CONTINUE EXPLORING NORTH
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
