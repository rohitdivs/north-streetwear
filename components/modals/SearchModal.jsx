'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../../context/ShopContext';

export default function SearchModal() {
  const { products, isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const searchResults = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gsm?.includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.colors?.some(c => c.name.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <div 
        className={`modal-backdrop ${isSearchOpen ? 'active' : ''}`}
        onClick={() => setIsSearchOpen(false)}
      ></div>

      <div className={`search-modal ${isSearchOpen ? 'open' : ''}`} id="searchModal">
        <div className="search-modal-container">
          <div className="search-header-row">
            <div className="search-input-box">
              <i className="fas fa-search search-input-icon"></i>
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 240 GSM Tees, Cargo Joggers, Boxy Hoodies..." 
                autoComplete="off"
              />
              {query && (
                <button className="search-clear-btn" onClick={() => setQuery('')}>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            <button className="search-close-btn" onClick={() => setIsSearchOpen(false)}>
              ESC / CLOSE
            </button>
          </div>

          {/* Quick search pills */}
          <div className="search-popular-tags">
            <span className="tag-title">QUICK SEARCH:</span>
            {['240 GSM', 'Cargo', 'Hoodie', 'Black', 'Sage', 'Bomber'].map(tag => (
              <span 
                key={tag} 
                className="quick-search-pill"
                onClick={() => setQuery(tag)}
                style={{ cursor: 'pointer' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live Search Results */}
          <div className="search-results-list" style={{ marginTop: '1.5rem', maxHeight: '50vh', overflowY: 'auto' }}>
            {query.trim() !== '' && searchResults.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>
                No drops found for &ldquo;{query}&rdquo;. Try another term.
              </p>
            )}

            {searchResults.map(p => (
              <div 
                key={p.id}
                onClick={() => {
                  setQuickViewProduct(p);
                  setIsSearchOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.8rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--border)',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <img 
                  src={p.colors?.[0]?.img || '/images/product-1.jpg'} 
                  alt={p.name} 
                  style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '4px' }} 
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{p.name}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    {p.gsm} GSM • {p.category.toUpperCase()} • {p.colors?.length} Colors Available
                  </span>
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                  ₹{p.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
