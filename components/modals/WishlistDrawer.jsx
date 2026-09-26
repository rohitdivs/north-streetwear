'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

export default function WishlistDrawer() {
  const { wishlist, products, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  const wishlistedItems = products.filter(p => wishlist.includes(p.id));

  return (
    <>
      <div 
        className={`drawer-backdrop ${isWishlistOpen ? 'active' : ''}`}
        onClick={() => setIsWishlistOpen(false)}
      ></div>

      <aside className={`slide-drawer ${isWishlistOpen ? 'open' : ''}`} id="wishlistDrawer" aria-label="Saved Items Drawer">
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <i className="fas fa-heart" style={{ color: '#ef4444' }}></i>
            <h3>WISHLIST</h3>
            <span className="drawer-count-badge">{wishlist.length} SAVED</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsWishlistOpen(false)} aria-label="Close Wishlist">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="wishlist-items-container">
          {wishlistedItems.length === 0 ? (
            <div className="empty-cart-state">
              <i className="far fa-heart empty-icon"></i>
              <h4>Your Wishlist is Empty</h4>
              <p>Save pieces you love by tapping the heart icon on any drop.</p>
              <button className="btn btn-primary btn-sm" onClick={() => setIsWishlistOpen(false)}>
                EXPLORE DROPS
              </button>
            </div>
          ) : (
            wishlistedItems.map(p => (
              <div key={p.id} className="wishlist-item-card">
                <img src={p.colors?.[0]?.img || '/images/product-1.jpg'} alt={p.name} className="wishlist-item-img" />
                <div className="wishlist-item-info">
                  <div className="wishlist-item-title">{p.name}</div>
                  <div className="cart-item-variants">
                    <span>{p.gsm} GSM</span>
                    <span>•</span>
                    <span>{p.badge}</span>
                  </div>
                  <div className="cart-item-price-row">
                    <div className="cart-item-price">₹{p.price.toLocaleString('en-IN')}</div>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        addToCart(p, p.sizes?.[0] || 'L', p.colors?.[0]?.name, 1);
                        toggleWishlist(p.id);
                      }}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.68rem' }}
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove-btn"
                  onClick={() => toggleWishlist(p.id)}
                  title="Remove from wishlist"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
