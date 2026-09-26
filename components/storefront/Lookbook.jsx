'use client';

import React, { useState } from 'react';
import { LOOKBOOK_DATA } from '../../data/lookbookData';
import { useShop } from '../../context/ShopContext';

export default function Lookbook() {
  const { addToCart, showToast } = useShop();
  const [activeLookKey, setActiveLookKey] = useState('urban');

  const look = LOOKBOOK_DATA[activeLookKey];

  const handleAddLookToBag = () => {
    look.items.forEach((item, idx) => {
      addToCart({
        id: `look-${look.id}-${idx}`,
        name: `${item.name} (${look.title})`,
        price: item.price,
        originalPrice: item.price + 500,
        colors: [{ name: item.spec, img: item.img }]
      }, 'L', item.spec, 1);
    });

    showToast(`Complete "${look.title}" added to bag with ₹${look.saving} direct savings!`);
  };

  return (
    <section className="lookbook-section" id="lookbook">
      <div className="container">
        <div className="section-header">
          <span className="section-label">CURATED STREETWEAR ENSEMBLES</span>
          <h2 className="section-title">Shop The Look</h2>
          <p className="section-subtitle">
            Pre-styled head-to-toe aesthetics designed by North stylists. Complete look bundled with an exclusive direct discount.
          </p>
        </div>

        {/* Look Tabs */}
        <div className="look-tabs-wrapper">
          {[
            { key: 'urban', label: 'URBAN TRANSIT LOOK' },
            { key: 'nomad', label: 'MIDNIGHT NOMAD LOOK' },
            { key: 'tokyo', label: 'TOKYO CYBER DRIFT LOOK' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`look-tab ${activeLookKey === tab.key ? 'active' : ''}`}
              onClick={() => setActiveLookKey(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Look Showcase Card */}
        <div className="look-showcase-card">
          {/* Left: Full Editorial Photo */}
          <div className="look-model-col">
            <div className="look-image-container">
              <img src={look.image} alt={look.title} />
              <span className="look-floating-badge">
                <i className="fas fa-camera"></i> {look.badge}
              </span>
            </div>
          </div>

          {/* Right: Breakdown & Price */}
          <div className="look-breakdown-col">
            <div>
              <span className="look-tag">{look.tag}</span>
              <h3 className="look-title">{look.title}</h3>
              <p className="look-desc">{look.desc}</p>

              <div className="look-items-list">
                {look.items.map((item, i) => (
                  <div key={i} className="look-item-row">
                    <img src={item.img} alt={item.name} className="look-item-thumb" />
                    <div className="look-item-meta">
                      <div className="look-item-name">{item.name}</div>
                      <div className="look-item-spec">{item.spec}</div>
                    </div>
                    <div className="look-item-price">₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="look-footer-action">
              <div className="look-price-block">
                <span className="look-mrp">Total MRP: ₹{look.mrp.toLocaleString('en-IN')}</span>
                <span className="look-bundled-price">₹{look.bundledPrice.toLocaleString('en-IN')}</span>
                <span className="look-save-pill">YOU SAVE ₹{look.saving} ON THIS LOOK</span>
              </div>
              <button className="btn btn-primary" onClick={handleAddLookToBag}>
                <i className="fas fa-shopping-bag"></i> ADD COMPLETE LOOK TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
