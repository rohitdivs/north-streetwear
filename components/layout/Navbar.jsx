'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useShop } from '../../context/ShopContext';

export default function Navbar() {
  const { 
    cart, 
    wishlist, 
    currentUser,
    logoutUser,
    setIsAuthModalOpen,
    setAuthModalTab,
    setIsCartOpen, 
    setIsWishlistOpen, 
    setIsTrackingOpen, 
    setIsSearchOpen,
    setIsNotificationOpen,
    unreadNotificationsCount,
    setIsDefectModalOpen 
  } = useShop();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo" style={{ marginRight: '3rem', flexShrink: 0 }}>
          NORTH
        </Link>

        <ul className={`nav-links ${isMobileOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <Link href="/" className="active" onClick={() => setIsMobileOpen(false)}>Home</Link>
          </li>
          <li>
            <a href="#collection" onClick={() => setIsMobileOpen(false)}>Collection</a>
          </li>
          <li>
            <a href="#combo" onClick={() => setIsMobileOpen(false)}>Combo Builder</a>
          </li>
          <li>
            <a href="#styler" onClick={() => setIsMobileOpen(false)}>Outfit Styler</a>
          </li>
          <li>
            <a href="#lookbook" onClick={() => setIsMobileOpen(false)}>Lookbook</a>
          </li>
          <li>
            <a href="#fabric" onClick={() => setIsMobileOpen(false)}>Fabric Lab</a>
          </li>
          <li>
            <a href="#reviews" onClick={() => setIsMobileOpen(false)}>Reviews</a>
          </li>
          <li>
            <Link 
              href="/admin" 
              onClick={() => setIsMobileOpen(false)}
              style={{
                color: 'var(--accent)',
                fontWeight: 700,
                borderBottom: '1px dashed var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <i className="fas fa-shield-halved" style={{ fontSize: '0.8rem' }}></i> ADMIN
            </Link>
          </li>
        </ul>

        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Search Trigger Button */}
          <button 
            className="nav-icon search-icon" 
            onClick={() => setIsSearchOpen(true)} 
            aria-label="Search Drops" 
            title="Search Drops (Tees, Cargos, Hoodies)"
          >
            <i className="fas fa-search"></i>
          </button>

          {/* Order Tracking Quick Button */}
          <button 
            className="nav-icon" 
            onClick={() => setIsTrackingOpen(true)} 
            aria-label="Track Order" 
            title="Track Order & Live Shipment"
          >
            <i className="fas fa-truck-fast"></i>
          </button>

          {/* Notifications Center Bell Button */}
          <button 
            className="nav-icon notification-icon" 
            onClick={() => setIsNotificationOpen(true)} 
            aria-label="Notifications" 
            title="Notifications & Updates"
            style={{ position: 'relative' }}
          >
            <i className="fas fa-bell"></i>
            {unreadNotificationsCount > 0 && (
              <span 
                className="notification-count" 
                id="navNotificationCount"
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent, #eab308)',
                  color: '#000',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(234, 179, 8, 0.7)',
                  animation: 'notificationPulse 2s infinite'
                }}
              >
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button 
            className="nav-icon wishlist-icon" 
            onClick={() => setIsWishlistOpen(true)} 
            aria-label="Wishlist"
            title="Saved Items"
          >
            <i className="fas fa-heart"></i>
            <span className="wishlist-count" id="navWishlistCount">{wishlist.length}</span>
          </button>

          {/* Cart Bag Button */}
          <button 
            className="nav-icon cart-icon" 
            onClick={() => setIsCartOpen(true)} 
            aria-label="Cart" 
            title="Shopping Bag"
          >
            <i className="fas fa-shopping-bag"></i>
            <span className="cart-count" id="navCartCount">{totalCartCount}</span>
          </button>

          {/* Customer Profile / Auth Menu */}
          <div ref={userMenuRef} style={{ position: 'relative' }}>
            {currentUser ? (
              <button
                className="nav-icon user-icon"
                onClick={() => setIsUserMenuOpen(prev => !prev)}
                aria-label="User Account"
                title={`Logged in as ${currentUser.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-user-check" style={{ color: 'var(--accent)' }}></i>
                <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.name.split(' ')[0]}
                </span>
                <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', opacity: 0.6 }}></i>
              </button>
            ) : (
              <button
                className="nav-icon user-icon"
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                aria-label="Sign In or Register"
                title="Sign In / Register"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <i className="fas fa-user"></i>
                <span className="auth-btn-text">Sign In</span>
              </button>
            )}

            {/* Dropdown Menu for Logged In Customer */}
            {currentUser && isUserMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '230px',
                  background: '#141416',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                  zIndex: 100,
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>{currentUser.name}</span>
                    {currentUser.role === 'admin' && (
                      <span style={{ fontSize: '0.65rem', background: 'var(--accent)', color: '#000', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    @{currentUser.username || 'user'} • {currentUser.email}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '2px' }}>
                    📱 +91 {currentUser.phone}
                  </div>
                </div>

                {currentUser.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      textAlign: 'left',
                      background: 'rgba(234, 179, 8, 0.12)',
                      border: '1px solid rgba(234, 179, 8, 0.25)',
                      borderRadius: '6px',
                      color: 'var(--accent, #eab308)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'none',
                      marginBottom: '6px'
                    }}
                  >
                    <i className="fas fa-shield-halved" style={{ width: '16px' }}></i>
                    Admin Command Center →
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsTrackingOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#e5e7eb',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fas fa-box-open" style={{ width: '16px', color: '#9ca3af' }}></i>
                  My Orders & Tracking
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsDefectModalOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fca5a5',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fas fa-triangle-exclamation" style={{ width: '16px', color: '#ef4444' }}></i>
                  Report Defective Product
                </button>

                <button
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#e5e7eb',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <i className="fas fa-heart" style={{ width: '16px', color: '#9ca3af' }}></i>
                  My Wishlist ({wishlist.length})
                </button>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '8px', paddingTop: '8px' }}>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logoutUser();
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      textAlign: 'left',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '6px',
                      color: '#f87171',
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <i className="fas fa-arrow-right-from-bracket" style={{ width: '16px' }}></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className={`hamburger ${isMobileOpen ? 'active' : ''}`} 
            onClick={() => setIsMobileOpen(prev => !prev)} 
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
