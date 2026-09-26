'use client';

import React from 'react';

export default function FabricLab() {
  return (
    <section className="fabric-lab-section" id="fabric">
      <div className="container">
        <div className="section-header">
          <span className="section-label">TEXTILE SCIENCE</span>
          <h2 className="section-title">Engineered For The Streets</h2>
          <p className="section-subtitle">
            No synthetic thin blends. Every North garment is built on high-density structural cotton that maintains its shape wash after wash.
          </p>
        </div>

        <div className="fabric-grid">
          <div className="fabric-card">
            <div className="fabric-icon"><i className="fas fa-weight-hanging"></i></div>
            <h3>240 GSM Heavyweight</h3>
            <p>
              Heavy single-jersey construction gives the boxy silhouette its crisp, sculpted streetwear drop without clinging to the body.
            </p>
            <span className="fabric-stat">STRUCTURAL DRAPE</span>
          </div>

          <div className="fabric-card">
            <div className="fabric-icon"><i className="fas fa-leaf"></i></div>
            <h3>100% Combed Cotton</h3>
            <p>
              Long-staple ring-spun cotton fibers combed to eliminate short, prickling threads, yielding ultra-soft hand feel with extreme durability.
            </p>
            <span className="fabric-stat">PURE RING-SPUN</span>
          </div>

          <div className="fabric-card">
            <div className="fabric-icon"><i className="fas fa-tint"></i></div>
            <h3>Bio-Washed & Pre-Shrunk</h3>
            <p>
              Enzyme bio-washing treatment removes surface fuzz to eliminate pilling, and thermal pre-shrinking guarantees zero shape alteration.
            </p>
            <span className="fabric-stat">ZERO SHRINKAGE</span>
          </div>

          <div className="fabric-card">
            <div className="fabric-icon"><i className="fas fa-shield-virus"></i></div>
            <h3>Color-Lock Reactive Dyes</h3>
            <p>
              High-affinity molecular reactive dyeing ensures deep pitch blacks and earthy mineral hues remain vibrant after 50+ machine washes.
            </p>
            <span className="fabric-stat">FADE-PROOF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
