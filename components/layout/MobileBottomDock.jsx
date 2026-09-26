'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useShop } from '../../context/ShopContext';

export default function MobileBottomDock() {
  const pathname = usePathname();
  const { cart, wishlist, setIsCartOpen, setIsWishlistOpen } = useShop();

  if (pathname?.startsWith('/admin')) return null;

  const totalCartCount = cart.reduce((t, i) => t + i.qty, 0);

  return (
    <nav className="mobile-bottom-dock" id="mobileBottomDock" aria-label="Mobile Navigation Dock">
      <a href="#home" className="dock-item active">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </a>
      <a href="#collection" className="dock-item">
        <i className="fas fa-compass"></i>
        <span>Explore</span>
      </a>
      <a href="#combo" className="dock-item dock-highlight">
        <i className="fas fa-fire"></i>
        <span>Combo</span>
      </a>
      <button 
        type="button" 
        className="dock-item" 
        onClick={() => setIsWishlistOpen(true)}
      >
        <div className="dock-icon-wrap">
          <i className="fas fa-heart"></i>
          <span className="dock-badge">{wishlist.length}</span>
        </div>
        <span>Wishlist</span>
      </button>
      <button 
        type="button" 
        className="dock-item" 
        onClick={() => setIsCartOpen(true)}
      >
        <div className="dock-icon-wrap">
          <i className="fas fa-shopping-bag"></i>
          <span className="dock-badge">{totalCartCount}</span>
        </div>
        <span>Bag</span>
      </button>
    </nav>
  );
}
