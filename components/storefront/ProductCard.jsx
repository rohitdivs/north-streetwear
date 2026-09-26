'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct } = useShop();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isWishlisted = wishlist.includes(product.id);
  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0] || { img: '/images/product-1.jpg', name: 'Default', hex: '#111' };

  return (
    <div className="product-card" data-id={product.id}>
      <div 
        className="product-image-container" 
        onClick={() => setQuickViewProduct({ ...product, initialColorIdx: selectedColorIdx })} 
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={currentColor.img} 
          alt={product.name} 
          className="product-card-img" 
          id={`img-${product.id}`}
        />
        
        <div className="product-badge-group">
          {product.badge && <span className="card-badge badge-new">{product.badge}</span>}
          {product.discountPercent && <span className="card-badge badge-sale">{product.discountPercent}</span>}
        </div>

        <div className="card-floating-actions">
          <button 
            className="card-action-btn quick-view-btn" 
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct({ ...product, initialColorIdx: selectedColorIdx });
            }} 
            title="Quick View" 
            aria-label="Quick View"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            className={`card-action-btn wishlist-toggle-btn ${isWishlisted ? 'active-wishlist' : ''}`} 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }} 
            title="Wishlist" 
            aria-label="Save to Wishlist"
          >
            <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`} style={{ color: isWishlisted ? '#ef4444' : 'inherit' }}></i>
          </button>
        </div>

        {/* Quick Size Selector Bar on Card Hover */}
        <div className="card-quick-size-bar">
          <span className="quick-size-label">QUICK ADD:</span>
          {product.sizes?.map(size => (
            <button 
              key={size}
              className="quick-size-btn" 
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, size, currentColor.name, 1);
              }}
              title={`1-Click Add Size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="product-card-info">
        <div className="product-card-top-meta">
          <span className="product-card-category">{product.category.toUpperCase()} • {product.gsm} GSM</span>
          <div className="product-card-rating">
            <i className="fas fa-star" style={{ color: '#eab308' }}></i> {product.rating} <span>({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="product-card-title" onClick={() => setQuickViewProduct({ ...product, initialColorIdx: selectedColorIdx })} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>

        <div className="product-card-prices">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          <span className="price-discount-tag">{product.discountPercent}</span>
        </div>

        {/* Urgency / Scarcity Badge */}
        <div className="card-scarcity-alert">
          <i className="fas fa-fire" style={{ color: '#ef4444' }}></i> {product.viewers || 18} viewing • Only {product.stockLeft} left
        </div>

        {/* True-to-Color Swatches Bar */}
        <div className="product-card-swatches-wrap">
          <div className="card-swatches-list">
            {product.colors?.map((c, i) => (
              <span 
                key={c.name}
                className={`card-swatch-dot ${i === selectedColorIdx ? 'active' : ''}`} 
                style={{ 
                  background: c.hex, 
                  border: c.hex.toLowerCase() === '#ffffff' || c.hex.toLowerCase() === '#fff' ? '1px solid #ccc' : 'none' 
                }} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIdx(i);
                }}
                title={c.name}
              ></span>
            ))}
          </div>
          <span className="card-selected-color-label">{currentColor.name}</span>
        </div>
      </div>
    </div>
  );
}
