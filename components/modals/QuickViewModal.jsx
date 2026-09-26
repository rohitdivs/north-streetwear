'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist } = useShop();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColorIdx(quickViewProduct.initialColorIdx !== undefined ? quickViewProduct.initialColorIdx : 0);
      setSelectedSize(quickViewProduct.sizes?.[0] || 'L');
      setQty(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = wishlist.includes(product.id);
  const currentColor = product.colors?.[selectedColorIdx] || product.colors?.[0] || { img: '/images/product-1.jpg', name: 'Default', hex: '#111' };

  const handleAdd = () => {
    addToCart(product, selectedSize, currentColor.name, qty);
    setQuickViewProduct(null);
  };

  return (
    <>
      <div 
        className={`modal-backdrop ${quickViewProduct ? 'active' : ''}`}
        onClick={() => setQuickViewProduct(null)}
      ></div>

      <div className={`product-quick-view-modal ${quickViewProduct ? 'open' : ''}`} id="quickViewModal">
        <button 
          className="modal-close-icon" 
          onClick={() => setQuickViewProduct(null)} 
          aria-label="Close Quick View"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="quick-view-grid">
          {/* Gallery Column */}
          <div className="quick-view-gallery">
            <div className="quick-view-main-image">
              <img src={currentColor.img} alt={product.name} />
              {product.badge && <span className="qv-badge">{product.badge}</span>}
            </div>

            <div className="quick-view-thumbnails">
              {product.colors?.map((c, idx) => (
                <img 
                  key={c.name}
                  src={c.img} 
                  alt={c.name}
                  className={`qv-thumb ${idx === selectedColorIdx ? 'active' : ''}`}
                  onClick={() => setSelectedColorIdx(idx)}
                  style={{ border: idx === selectedColorIdx ? '2px solid var(--primary)' : '2px solid transparent' }}
                />
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div className="quick-view-info">
            <div className="qv-category">{product.category.toUpperCase()} • {product.gsm} GSM HEAVYWEIGHT</div>
            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-rating-row">
              <div className="qv-stars" style={{ color: '#eab308' }}>
                {'★'.repeat(Math.round(product.rating || 5))}
              </div>
              <span className="qv-rating-val">{product.rating}</span>
              <span className="qv-reviews-count">({product.reviewCount || 120} Verified Drops)</span>
            </div>

            <div className="qv-price-row">
              <span className="qv-price-current">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="qv-price-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
              <span className="price-discount-tag">{product.discountPercent}</span>
            </div>

            <p className="qv-desc">{product.description}</p>

            {/* Colors */}
            <div className="qv-options-block">
              <label className="qv-label">
                Color: <strong style={{ color: 'var(--primary)' }}>{currentColor.name}</strong>
              </label>
              <div className="qv-colors-list">
                {product.colors?.map((c, i) => (
                  <span
                    key={c.name}
                    className={`card-swatch-dot ${i === selectedColorIdx ? 'active' : ''}`}
                    style={{ 
                      background: c.hex, 
                      width: '26px', 
                      height: '26px', 
                      borderRadius: '50%', 
                      cursor: 'pointer',
                      display: 'inline-block',
                      border: c.hex === '#ffffff' || c.hex === '#f4f2ec' ? '1px solid #ddd' : 'none',
                      boxShadow: i === selectedColorIdx ? '0 0 0 2px var(--primary)' : 'none'
                    }}
                    onClick={() => setSelectedColorIdx(i)}
                    title={c.name}
                  ></span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="qv-options-block">
              <label className="qv-label">
                Size: <strong style={{ color: 'var(--primary)' }}>{selectedSize}</strong>
              </label>
              <div className="qv-sizes-list" style={{ display: 'flex', gap: '0.5rem' }}>
                {product.sizes?.map(sz => (
                  <button
                    key={sz}
                    type="button"
                    className={`quick-size-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: selectedSize === sz ? 'var(--primary)' : 'transparent',
                      color: selectedSize === sz ? '#fff' : 'inherit',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="qv-actions-row" style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem' }}>
              <button 
                type="button" 
                className="btn btn-primary qv-add-btn"
                onClick={handleAdd}
                style={{ flex: 1, padding: '0.85rem' }}
              >
                <i className="fas fa-shopping-bag"></i> ADD TO BAG
              </button>
              <button 
                type="button" 
                className={`btn btn-outline qv-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                style={{ padding: '0.85rem 1rem' }}
                title="Save to Wishlist"
              >
                <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`} style={{ color: isWishlisted ? '#ef4444' : 'inherit' }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
