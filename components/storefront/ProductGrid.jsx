'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { products, activeCategory, setActiveCategory } = useShop();
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterTrayOpen, setIsFilterTrayOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedGsm, setSelectedGsm] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory === 'bestseller') {
      result = result.filter(p => p.isBestSeller);
    } else if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price filter
    result = result.filter(p => p.price <= maxPrice);

    // GSM filter
    if (selectedGsm !== 'all') {
      result = result.filter(p => p.gsm === selectedGsm);
    }

    // Color filter
    if (selectedColor !== 'all') {
      result = result.filter(p => p.colors?.some(c => c.colorKey === selectedColor));
    }

    // Size filter
    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes?.includes(selectedSize));
    }

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'popular') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [products, activeCategory, sortOption, maxPrice, selectedGsm, selectedColor, selectedSize]);

  const resetFilters = () => {
    setActiveCategory('all');
    setMaxPrice(5000);
    setSelectedGsm('all');
    setSelectedColor('all');
    setSelectedSize('all');
    setSortOption('featured');
  };

  const activeFiltersCount = (activeCategory !== 'all' ? 1 : 0) +
    (maxPrice < 5000 ? 1 : 0) +
    (selectedGsm !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0);

  return (
    <section className="products-section" id="collection">
      <div className="container">
        <div className="section-header">
          <span className="section-label">SEASON 2026 DROPS</span>
          <h2 className="section-title">Engineered Heavyweight Silhouettes</h2>
          <p className="section-subtitle">
            Authentic 240+ GSM cotton, sculpted boxy cuts, and drop-shoulder architecture. Every piece is built to endure.
          </p>
        </div>

        {/* Filter Tabs & Bar */}
        <div className="catalog-toolbar">
          <div className="filter-tabs" id="categoryFilterTabs">
            {[
              { key: 'all', label: 'All Drops' },
              { key: 'tshirts', label: '240 GSM Tees' },
              { key: 'hoodies', label: 'Boxy Hoodies' },
              { key: 'pants', label: 'Cargo Joggers' },
              { key: 'jackets', label: 'Flight Jackets' },
              { key: 'bestseller', label: '★ Bestsellers' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${activeCategory === tab.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="catalog-controls-right">
            <button 
              className={`filter-tray-toggle-btn ${isFilterTrayOpen ? 'active' : ''}`}
              onClick={() => setIsFilterTrayOpen(prev => !prev)}
            >
              <i className="fas fa-sliders"></i>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="filter-badge-count">{activeFiltersCount}</span>
              )}
            </button>

            <div className="sort-dropdown-wrap">
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-dropdown"
              >
                <option value="featured">Featured Drops</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Tray */}
        {isFilterTrayOpen && (
          <div className="filter-tray-container" style={{ display: 'block', marginBottom: '2rem' }}>
            <div className="filter-tray-header">
              <h4>Filter Streetwear By:</h4>
              <button className="clear-filters-btn" onClick={resetFilters}>
                <i className="fas fa-undo"></i> Reset All
              </button>
            </div>

            <div className="filter-tray-grid">
              {/* Max Price */}
              <div className="filter-group">
                <label className="filter-label">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</label>
                <input 
                  type="range" 
                  min="800" 
                  max="5000" 
                  step="100" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))} 
                  className="filter-range-slider"
                />
              </div>

              {/* GSM */}
              <div className="filter-group">
                <label className="filter-label">Fabric GSM</label>
                <div className="filter-chips-row">
                  {['all', '240', '260', '280', '320', '360'].map(gsm => (
                    <button
                      key={gsm}
                      className={`filter-chip ${selectedGsm === gsm ? 'active' : ''}`}
                      onClick={() => setSelectedGsm(gsm)}
                    >
                      {gsm === 'all' ? 'All GSM' : `${gsm} GSM`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="filter-group">
                <label className="filter-label">Colorway</label>
                <div className="filter-chips-row">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'black', label: 'Black' },
                    { key: 'white', label: 'White / Cream' },
                    { key: 'olive', label: 'Olive' },
                    { key: 'sage', label: 'Sage' },
                    { key: 'blue', label: 'Cobalt Blue' }
                  ].map(c => (
                    <button
                      key={c.key}
                      className={`filter-chip ${selectedColor === c.key ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c.key)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="filter-group">
                <label className="filter-label">Size</label>
                <div className="filter-chips-row">
                  {['all', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                    <button
                      key={sz}
                      className={`filter-chip ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid" id="mainProductGrid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-catalog-state" style={{ display: 'block', textAlign: 'center', padding: '3rem 1rem' }}>
            <i className="fas fa-search" style={{ fontSize: '2.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}></i>
            <h3>No streetwear drops match your criteria</h3>
            <p>Try clearing your price slider, GSM, or color filters.</p>
            <button className="btn btn-primary" onClick={resetFilters} style={{ marginTop: '1rem' }}>
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
