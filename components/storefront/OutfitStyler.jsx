'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function OutfitStyler() {
  const { addToCart, showToast } = useShop();

  // Active wardrobe tab: 'top', 'bottom', 'cap'
  const [activeTab, setActiveTab] = useState('top');

  // Styler choices
  const [topProduct, setTopProduct] = useState({
    id: 'p1',
    name: 'North 240 GSM Oversized Tee',
    price: 1499,
    mrp: 2799,
    gsm: 240,
    color: 'Vintage Onyx Black',
    img: '/images/product-1.jpg',
    size: 'L'
  });

  const [bottomProduct, setBottomProduct] = useState({
    id: 'p3',
    name: 'Tactical 6-Pocket Cargo Joggers',
    price: 2499,
    mrp: 3999,
    gsm: 280,
    color: 'Olive Green',
    img: '/images/product-olive-cargo.jpg',
    size: '32(M)'
  });

  const [capProduct, setCapProduct] = useState({
    id: 'p6',
    name: 'Embroidered Dad Cap',
    price: 899,
    mrp: 1499,
    gsm: 280,
    color: 'Pitch Black',
    img: '/images/product-6.jpg',
    size: 'Free Size'
  });

  const totalGsm = topProduct.gsm + bottomProduct.gsm + capProduct.gsm;
  const totalMrp = topProduct.mrp + bottomProduct.mrp + capProduct.mrp;
  const outfitPrice = (topProduct.price + bottomProduct.price + capProduct.price) - 800;

  const handleShuffleDrip = () => {
    // Shuffle top colors
    const topColors = [
      { name: 'Vintage Onyx Black', img: '/images/product-1.jpg' },
      { name: 'Vintage Sage', img: '/images/product-sage-tee.jpg' },
      { name: 'Bone Cream Graphic', img: '/images/product-white-tee.jpg' },
      { name: 'Cobalt Blue', img: '/images/product-blue-tee.jpg' }
    ];
    const randTop = topColors[Math.floor(Math.random() * topColors.length)];
    setTopProduct(prev => ({ ...prev, color: randTop.name, img: randTop.img }));

    // Shuffle bottom colors
    const bottomColors = [
      { name: 'Olive Green', img: '/images/product-olive-cargo.jpg' },
      { name: 'Navy Blue', img: '/images/product-3.jpg' }
    ];
    const randBottom = bottomColors[Math.floor(Math.random() * bottomColors.length)];
    setBottomProduct(prev => ({ ...prev, color: randBottom.name, img: randBottom.img }));
  };

  const handleAddOutfitToBag = () => {
    // Add all 3 items to cart with special bundled notes
    addToCart({
      id: topProduct.id,
      name: `${topProduct.name} (Outfit Builder)`,
      price: topProduct.price,
      originalPrice: topProduct.mrp,
      colors: [{ name: topProduct.color, img: topProduct.img }]
    }, topProduct.size, topProduct.color, 1);

    addToCart({
      id: bottomProduct.id,
      name: `${bottomProduct.name} (Outfit Builder)`,
      price: bottomProduct.price,
      originalPrice: bottomProduct.mrp,
      colors: [{ name: bottomProduct.color, img: bottomProduct.img }]
    }, bottomProduct.size, bottomProduct.color, 1);

    addToCart({
      id: capProduct.id,
      name: `${capProduct.name} (Outfit Builder - Save ₹800)`,
      price: Math.max(99, capProduct.price - 800),
      originalPrice: capProduct.mrp,
      colors: [{ name: capProduct.color, img: capProduct.img }]
    }, capProduct.size, capProduct.color, 1);

    showToast('Complete 3-Piece Fit added with Flat ₹800 Bundle Saving!');
  };

  return (
    <section className="styler-section" id="styler">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <i className="fas fa-magic" style={{ color: 'var(--accent)', marginRight: '4px' }}></i> VIRTUAL DRESSING ROOM
          </span>
          <h2 className="section-title">Mix &amp; Match Outfit Builder</h2>
          <p className="section-subtitle">
            Stack your personalized streetwear silhouette. Choose Headwear, Topwear &amp; Bottomwear to engineer your complete fit with an instant <strong>Flat ₹800 Bundle Saving</strong>.
          </p>
        </div>

        <div className="styler-grid">
          {/* Left Canvas / Mannequin Stack */}
          <div className="styler-canvas-card">
            <div className="styler-canvas-header">
              <span className="styler-canvas-badge">
                <i className="fas fa-certificate"></i> DRIP RATIO: OPTIMAL
              </span>
              <button 
                type="button" 
                className="styler-random-btn" 
                onClick={handleShuffleDrip}
                title="Shuffle Random Match"
              >
                <i className="fas fa-random"></i> Shuffle Drip
              </button>
            </div>

            <div className="styler-mannequin-stack" id="stylerMannequinStack">
              {/* Cap Slot */}
              <div className={`styler-layer-slot styler-slot-cap ${activeTab === 'cap' ? 'active' : ''}`} onClick={() => setActiveTab('cap')}>
                <div className="styler-slot-tag">HEADWEAR</div>
                <img src={capProduct.img} alt={capProduct.name} />
                <div className="styler-slot-info">
                  <span className="styler-slot-name">{capProduct.name}</span>
                  <span className="styler-slot-meta">{capProduct.color} • {capProduct.size}</span>
                </div>
              </div>

              {/* Top Slot */}
              <div className={`styler-layer-slot styler-slot-top ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>
                <div className="styler-slot-tag">TOPWEAR</div>
                <img src={topProduct.img} alt={topProduct.name} />
                <div className="styler-slot-info">
                  <span className="styler-slot-name">{topProduct.name}</span>
                  <span className="styler-slot-meta">{topProduct.color} • Size {topProduct.size} ({topProduct.gsm} GSM)</span>
                </div>
              </div>

              {/* Bottom Slot */}
              <div className={`styler-layer-slot styler-slot-bottom ${activeTab === 'bottom' ? 'active' : ''}`} onClick={() => setActiveTab('bottom')}>
                <div className="styler-slot-tag">BOTTOMWEAR</div>
                <img src={bottomProduct.img} alt={bottomProduct.name} />
                <div className="styler-slot-info">
                  <span className="styler-slot-name">{bottomProduct.name}</span>
                  <span className="styler-slot-meta">{bottomProduct.color} • Size {bottomProduct.size} ({bottomProduct.gsm} GSM)</span>
                </div>
              </div>
            </div>

            <div className="styler-canvas-footer">
              <div className="canvas-spec-pill">
                <i className="fas fa-layer-group"></i> Stack: <strong>{totalGsm} GSM Total</strong>
              </div>
              <div className="canvas-spec-pill">
                <i className="fas fa-shield-alt"></i> Bio-Washed Cotton
              </div>
              <div className="canvas-spec-pill">
                <i className="fas fa-truck-fast"></i> Free Priority Shipping
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="styler-controls-card">
            <div className="styler-slot-tabs">
              <button 
                className={`styler-tab ${activeTab === 'top' ? 'active' : ''}`}
                onClick={() => setActiveTab('top')}
              >
                <i className="fas fa-tshirt"></i>
                <span>1. Topwear</span>
              </button>
              <button 
                className={`styler-tab ${activeTab === 'bottom' ? 'active' : ''}`}
                onClick={() => setActiveTab('bottom')}
              >
                <i className="fas fa-running"></i>
                <span>2. Bottoms</span>
              </button>
              <button 
                className={`styler-tab ${activeTab === 'cap' ? 'active' : ''}`}
                onClick={() => setActiveTab('cap')}
              >
                <i className="fas fa-hat-cowboy"></i>
                <span>3. Headwear</span>
              </button>
            </div>

            {/* Pane 1: Topwear */}
            {activeTab === 'top' && (
              <div className="styler-pane active">
                <h4 className="styler-pane-title">Choose Your Heavyweight Silhouette</h4>
                <div className="styler-option-block">
                  <label className="styler-option-label">Select Color: <strong>{topProduct.color}</strong></label>
                  <div className="styler-swatches-row">
                    {[
                      { name: 'Vintage Onyx Black', img: '/images/product-1.jpg', hex: '#111' },
                      { name: 'Vintage Sage', img: '/images/product-sage-tee.jpg', hex: '#657b64' },
                      { name: 'Bone Cream Graphic', img: '/images/product-white-tee.jpg', hex: '#f4f2ec' },
                      { name: 'Cobalt Blue', img: '/images/product-blue-tee.jpg', hex: '#1d4ed8' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`styler-swatch ${topProduct.color === c.name ? 'active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#f4f2ec' ? '1px solid #ddd' : 'none' }}
                        onClick={() => setTopProduct(prev => ({ ...prev, color: c.name, img: c.img }))}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="styler-option-block">
                  <label className="styler-option-label">Select Size: <strong>{topProduct.size}</strong></label>
                  <div className="styler-sizes-row">
                    {['S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                      <button
                        key={sz}
                        className={`styler-size-btn ${topProduct.size === sz ? 'active' : ''}`}
                        onClick={() => setTopProduct(prev => ({ ...prev, size: sz }))}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pane 2: Bottomwear */}
            {activeTab === 'bottom' && (
              <div className="styler-pane active">
                <h4 className="styler-pane-title">Choose Tactical Cargo or Track Pant</h4>
                <div className="styler-option-block">
                  <label className="styler-option-label">Select Color: <strong>{bottomProduct.color}</strong></label>
                  <div className="styler-swatches-row">
                    {[
                      { name: 'Olive Green', img: '/images/product-olive-cargo.jpg', hex: '#556b2f' },
                      { name: 'Navy Blue', img: '/images/product-3.jpg', hex: '#0d1b2a' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`styler-swatch ${bottomProduct.color === c.name ? 'active' : ''}`}
                        style={{ background: c.hex }}
                        onClick={() => setBottomProduct(prev => ({ ...prev, color: c.name, img: c.img }))}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="styler-option-block">
                  <label className="styler-option-label">Select Size: <strong>{bottomProduct.size}</strong></label>
                  <div className="styler-sizes-row">
                    {['30(S)', '32(M)', '34(L)', '36(XL)'].map(sz => (
                      <button
                        key={sz}
                        className={`styler-size-btn ${bottomProduct.size === sz ? 'active' : ''}`}
                        onClick={() => setBottomProduct(prev => ({ ...prev, size: sz }))}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pane 3: Headwear */}
            {activeTab === 'cap' && (
              <div className="styler-pane active">
                <h4 className="styler-pane-title">Crown The Fit With An Embroidered Cap</h4>
                <div className="styler-option-block">
                  <label className="styler-option-label">Select Color: <strong>{capProduct.color}</strong></label>
                  <div className="styler-swatches-row">
                    {[
                      { name: 'Pitch Black', img: '/images/product-6.jpg', hex: '#111' },
                      { name: 'Chalk White', img: '/images/product-white-tee.jpg', hex: '#fff' }
                    ].map(c => (
                      <span 
                        key={c.name}
                        className={`styler-swatch ${capProduct.color === c.name ? 'active' : ''}`}
                        style={{ background: c.hex, border: c.hex === '#fff' ? '1px solid #ddd' : 'none' }}
                        onClick={() => setCapProduct(prev => ({ ...prev, color: c.name, img: c.img }))}
                      ></span>
                    ))}
                  </div>
                </div>
                <div className="styler-option-block">
                  <label className="styler-option-label">Size: <strong>Free Size (Adjustable Brass Clasp)</strong></label>
                </div>
              </div>
            )}

            {/* Pricing Strip */}
            <div className="styler-pricing-box">
              <div className="styler-price-row">
                <span>Individual MRP Total:</span>
                <span className="styler-mrp-val">₹{totalMrp.toLocaleString('en-IN')}</span>
              </div>
              <div className="styler-price-row bundle-discount-row">
                <span><i className="fas fa-tag"></i> NORTH 3-Piece Outfit Bundle Discount:</span>
                <span className="styler-saving-val">-₹800</span>
              </div>
              <div className="styler-price-row total-row">
                <div>
                  <span className="styler-final-label">Complete Outfit Price:</span>
                  <div className="styler-net-price">₹{outfitPrice.toLocaleString('en-IN')}</div>
                </div>
                <span className="styler-save-tag">SAVE ₹800 TODAY</span>
              </div>
              <button 
                className="btn btn-primary btn-lg styler-add-all-btn"
                onClick={handleAddOutfitToBag}
              >
                <i className="fas fa-layer-group"></i> ADD COMPLETE 3-PIECE FIT TO BAG
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
