'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function FitRecommenderModal() {
  const { isFitModalOpen, setIsFitModalOpen } = useShop();

  const [height, setHeight] = useState("5'10\" (178 cm)");
  const [weight, setWeight] = useState('70-75 kg');
  const [fitPreference, setFitPreference] = useState('boxy'); // 'boxy' or 'clean'

  if (!isFitModalOpen) return null;

  const getRecommendedSize = () => {
    if (weight.includes('55') || weight.includes('60')) {
      return fitPreference === 'boxy' ? 'M' : 'S';
    }
    if (weight.includes('65') || weight.includes('75')) {
      return fitPreference === 'boxy' ? 'L' : 'M';
    }
    return fitPreference === 'boxy' ? 'XL' : 'L';
  };

  const recSize = getRecommendedSize();

  return (
    <>
      <div 
        className={`modal-backdrop ${isFitModalOpen ? 'active' : ''}`}
        onClick={() => setIsFitModalOpen(false)}
      ></div>

      <div className={`fit-modal ${isFitModalOpen ? 'open' : ''}`} id="fitModal">
        <button 
          className="modal-close-icon" 
          onClick={() => setIsFitModalOpen(false)}
          aria-label="Close Recommender"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="fit-modal-header">
          <div className="fit-modal-icon">
            <i className="fas fa-ruler-combined"></i>
          </div>
          <h3>Find Your Streetwear Fit</h3>
          <p>Streetwear is all about the drape. Answer 3 quick questions to get our tailored size recommendation.</p>
        </div>

        <div className="fit-step-block">
          <label className="fit-block-label">1. YOUR HEIGHT APPROX:</label>
          <select 
            className="fit-select"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          >
            <option value="5'6&quot; (168 cm)">5'5" - 5'7" (165 - 170 cm)</option>
            <option value="5'10&quot; (178 cm)">5'8" - 5'11" (172 - 180 cm)</option>
            <option value="6'1&quot; (185 cm)">6'0" - 6'3" (182 - 190 cm)</option>
          </select>
        </div>

        <div className="fit-step-block">
          <label className="fit-block-label">2. YOUR BODY WEIGHT:</label>
          <select 
            className="fit-select"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          >
            <option value="55-60 kg">55 - 65 kg (Lean Build)</option>
            <option value="70-75 kg">66 - 78 kg (Regular / Athletic)</option>
            <option value="80-90 kg">79 - 95 kg (Heavy / Broad)</option>
          </select>
        </div>

        <div className="fit-step-block">
          <label className="fit-block-label">3. DESIRED STREETWEAR SILHOUETTE:</label>
          <div className="fit-options-grid">
            <button 
              type="button"
              className={`fit-opt-btn ${fitPreference === 'boxy' ? 'active' : ''}`}
              onClick={() => setFitPreference('boxy')}
            >
              AUTHENTIC BOXY OVERSIZED (RECOMMENDED)
            </button>
            <button 
              type="button"
              className={`fit-opt-btn ${fitPreference === 'clean' ? 'active' : ''}`}
              onClick={() => setFitPreference('clean')}
            >
              RELAXED REGULAR FIT
            </button>
          </div>
        </div>

        <div className="fit-result-card">
          <span className="fit-result-badge">AI RECOMMENDED SIZE</span>
          <div className="fit-recommended-size">SIZE {recSize}</div>
          <p className="fit-rationale">
            Based on your {height} frame and {weight}, <strong>Size {recSize}</strong> will give you the sculpted 240 GSM drop shoulder drape without looking messy.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={() => setIsFitModalOpen(false)}
          style={{ width: '100%' }}
        >
          APPLY SIZE {recSize} TO SHOPPING
        </button>
      </div>
    </>
  );
}
