'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function ComboBundler() {
  const { addToCart, showToast } = useShop();

  // Slot 1: Primary Tee
  const [slot1Product, setSlot1Product] = useState({
    id: 'p1',
    name: 'North 240 GSM Oversized Heavyweight Tee',
    price: 1499,
    mrp: 2799
  });
  const [slot1Color, setSlot1Color] = useState({
    name: 'Vintage Onyx Black',
    img: '/images/product-1.jpg',
    hex: '#111'
  });
  const [slot1Size, setSlot1Size] = useState('L');

  // Slot 2: Secondary Piece
  const [slot2Type, setSlot2Type] = useState('cargo'); // 'tee' or 'cargo'
  const [slot2Color, setSlot2Color] = useState({
    name: 'Olive Green',
    img: '/images/product-olive-cargo.jpg',
    hex: '#556b2f'
  });
  const [slot2Size, setSlot2Size] = useState('32(M)');

  const slot2Price = slot2Type === 'cargo' ? 2499 : 1499;
  const slot2Mrp = slot2Type === 'cargo' ? 3999 : 2799;
  const comboDiscount = slot2Type === 'cargo' ? 500 : 350;

  const totalMrp = slot1Product.mrp + slot2Mrp;
  const dealPrice = (slot1Product.price + slot2Price) - comboDiscount;

  const handleAddComboToBag = () => {
    // Add slot 1
    addToCart({
      id: slot1Product.id,
      name: `${slot1Product.name} (Combo Item 1)`,
      price: slot1Product.price,
      originalPrice: slot1Product.mrp,
      colors: [{ name: slot1Color.name, img: slot1Color.img }]
    }, slot1Size, slot1Color.name, 1);

    // Add slot 2 with the discount applied
    addToCart({
      id: slot2Type === 'cargo' ? 'p3' : 'p7',
      name: `${slot2Type === 'cargo' ? 'Tactical 6-Pocket Cargo Joggers' : 'Secondary 240 GSM Boxy Tee'} (Combo Item 2 - Save ₹${comboDiscount})`,
      price: slot2Price - comboDiscount,
      originalPrice: slot2Mrp,
      colors: [{ name: slot2Color.name, img: slot2Color.img }]
    }, slot2Size, slot2Color.name, 1);

    showToast(`Combo added to bag with ₹${comboDiscount} instant bundle discount!`);
  };

  return (
    <section className="combo-bundler-section" id="combo">
      <div className="container">
        <div className="section-header">
          <span className="section-label">CURATED STREETWEAR DUO</span>
          <h2 className="section-title">Build Your Streetwear Combo</h2>
          <p className="section-subtitle">
            Pick your Heavyweight Oversized Tee and pair it with a second tee or tactical cargo joggers to unlock up to ₹500 savings.
          </p>
        </div>

        <div className="combo-bundler-card">
          <div className="combo-builder-grid">
            {/* Slot 1: Primary Heavyweight Tee */}
            <div className="combo-slot-column">
              <div className="slot-header">
                <span className="slot-step-pill">SLOT 1</span>
                <h4>Primary Heavyweight Tee</h4>
              </div>

              <label className="slot-input-label">Select Style</label>
              <select 
                className="combo-dropdown"
                value={slot1Product.id}
                onChange={(e) => {
                  if (e.target.value === 'p1') {
                    setSlot1Product({ id: 'p1', name: 'North 240 GSM Oversized Heavyweight Tee', price: 1499, mrp: 2799 });
                  } else {
                    setSlot1Product({ id: 'p7', name: 'Raw Edge Acid Wash Drop Tee', price: 1699, mrp: 2999 });
                  }
                }}
              >
                <option value="p1">North 240 GSM Oversized Heavyweight Tee (₹1,499)</option>
                <option value="p7">Raw Edge Acid Wash Drop Tee (₹1,699)</option>
              </select>

              <div className="slot-options-row">
                <div>
                  <label className="slot-input-label">
                    Select Color: <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{slot1Color.name}</span>
                  </label>
                  <div className="combo-color-swatches">
                    {[
                      { name: 'Vintage Onyx Black', img: '/images/product-1.jpg', hex: '#111' },
                      { name: 'Vintage Sage', img: '/images/product-sage-tee.jpg', hex: '#657b64' },
                      { name: 'Bone Cream Graphic', img: '/images/product-white-tee.jpg', hex: '#f4f2ec' },
                      { name: 'Cobalt Blue', img: '/images/product-blue-tee.jpg', hex: '#1d4ed8' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`combo-color-dot ${slot1Color.name === c.name ? 'active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#f4f2ec' ? '1px solid #ddd' : 'none' }}
                        onClick={() => setSlot1Color(c)}
                      ></span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="slot-input-label">Select Size</label>
                  <div className="combo-size-chips">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button 
                        key={size}
                        className={`combo-size-btn ${slot1Size === size ? 'active' : ''}`}
                        onClick={() => setSlot1Size(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Live Visual Preview */}
            <div className="combo-preview-column">
              <div className="combo-duo-preview">
                <div className="combo-img-wrap">
                  <img src={slot1Color.img} alt="Selected Slot 1 Item" />
                  <span className="combo-img-tag">SLOT 1 • {slot1Size}</span>
                </div>
                <div className="combo-plus-badge"><i className="fas fa-plus"></i></div>
                <div className="combo-img-wrap">
                  <img src={slot2Color.img} alt="Selected Slot 2 Item" />
                  <span className="combo-img-tag">{slot2Type.toUpperCase()} • {slot2Size}</span>
                </div>
              </div>

              <div className="combo-pricing-summary">
                <div className="pricing-row">
                  <span>Combined MRP</span>
                  <span className="combo-strikethrough-price">₹{totalMrp.toLocaleString('en-IN')}</span>
                </div>
                <div className="pricing-row discount-row">
                  <span>Combo Discount Applied</span>
                  <span className="combo-saving-val">-₹{comboDiscount}</span>
                </div>
                <div className="pricing-row total-row">
                  <span>Combo Deal Price</span>
                  <span className="combo-final-price">₹{dealPrice.toLocaleString('en-IN')}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={handleAddComboToBag}
                  style={{ width: '100%' }}
                >
                  <i className="fas fa-shopping-bag"></i> ADD STREETWEAR COMBO TO BAG
                </button>
                <div className="combo-guarantee-note">
                  <i className="fas fa-truck"></i> Free Express Shipping & 7-Day Doorstep Exchanges
                </div>
              </div>
            </div>

            {/* Slot 2: Secondary Piece */}
            <div className="combo-slot-column">
              <div className="slot-header">
                <span className="slot-step-pill">SLOT 2</span>
                <h4>Choose Your Pairing</h4>
              </div>

              <div className="combo-pairing-type-tabs">
                <button 
                  className={`pairing-tab ${slot2Type === 'tee' ? 'active' : ''}`}
                  onClick={() => {
                    setSlot2Type('tee');
                    setSlot2Color({ name: 'Bone Cream Graphic', img: '/images/product-white-tee.jpg', hex: '#f4f2ec' });
                    setSlot2Size('L');
                  }}
                >
                  <span>Second Tee</span>
                  <span className="saving-badge">SAVE ₹350</span>
                </button>
                <button 
                  className={`pairing-tab ${slot2Type === 'cargo' ? 'active' : ''}`}
                  onClick={() => {
                    setSlot2Type('cargo');
                    setSlot2Color({ name: 'Olive Green', img: '/images/product-olive-cargo.jpg', hex: '#556b2f' });
                    setSlot2Size('32(M)');
                  }}
                >
                  <span>Cargo Joggers</span>
                  <span className="saving-badge">SAVE ₹500</span>
                </button>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <label className="slot-input-label">Selected Piece</label>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', padding: '0.5rem 0' }}>
                  {slot2Type === 'cargo' ? 'Tactical 6-Pocket Cargo Joggers (₹2,499)' : 'Raw Edge Drop Tee (₹1,499)'}
                </div>
              </div>

              <div className="slot-options-row">
                <div>
                  <label className="slot-input-label">
                    Color: <span style={{ color: 'var(--primary)', fontWeight: 800 }}>{slot2Color.name}</span>
                  </label>
                  <div className="combo-color-swatches">
                    {slot2Type === 'cargo' ? [
                      { name: 'Olive Green', img: '/images/product-olive-cargo.jpg', hex: '#556b2f' },
                      { name: 'Navy Blue', img: '/images/product-3.jpg', hex: '#0d1b2a' },
                      { name: 'Midnight Black', img: '/images/look-midnight-nomad.jpg', hex: '#111' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`combo-color-dot ${slot2Color.name === c.name ? 'active' : ''}`}
                        style={{ background: c.hex }}
                        onClick={() => setSlot2Color(c)}
                      ></span>
                    )) : [
                      { name: 'Bone Cream Graphic', img: '/images/product-white-tee.jpg', hex: '#f4f2ec' },
                      { name: 'Vintage Sage', img: '/images/product-sage-tee.jpg', hex: '#657b64' },
                      { name: 'Cobalt Blue', img: '/images/product-blue-tee.jpg', hex: '#1d4ed8' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`combo-color-dot ${slot2Color.name === c.name ? 'active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#f4f2ec' ? '1px solid #ddd' : 'none' }}
                        onClick={() => setSlot2Color(c)}
                      ></span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="slot-input-label">Size</label>
                  <div className="combo-size-chips">
                    {slot2Type === 'cargo' 
                      ? ['30(S)', '32(M)', '34(L)', '36(XL)'].map(sz => (
                        <button 
                          key={sz}
                          className={`combo-size-btn ${slot2Size === sz ? 'active' : ''}`}
                          onClick={() => setSlot2Size(sz)}
                        >
                          {sz.replace(/ *\([^)]*\) */g, "")}
                        </button>
                      ))
                      : ['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                        <button 
                          key={sz}
                          className={`combo-size-btn ${slot2Size === sz ? 'active' : ''}`}
                          onClick={() => setSlot2Size(sz)}
                        >
                          {sz}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
