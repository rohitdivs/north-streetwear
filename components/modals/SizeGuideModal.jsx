'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState('tees'); // 'tees' or 'cargos'

  if (!isSizeGuideOpen) return null;

  return (
    <>
      <div 
        className={`modal-backdrop ${isSizeGuideOpen ? 'active' : ''}`}
        onClick={() => setIsSizeGuideOpen(false)}
      ></div>

      <div className={`size-guide-modal ${isSizeGuideOpen ? 'open' : ''}`} id="sizeGuideModal">
        <button 
          className="modal-close-icon" 
          onClick={() => setIsSizeGuideOpen(false)}
          aria-label="Close Size Guide"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="size-guide-header">
          <h3>Official Streetwear Sizing Chart</h3>
          <p>All measurements are in inches. Crafted with an intentional boxy drop shoulder cut.</p>
        </div>

        <div className="size-guide-tabs">
          <button 
            className={`sg-tab ${activeTab === 'tees' ? 'active' : ''}`}
            onClick={() => setActiveTab('tees')}
          >
            240 GSM OVERSIZED TEES
          </button>
          <button 
            className={`sg-tab ${activeTab === 'cargos' ? 'active' : ''}`}
            onClick={() => setActiveTab('cargos')}
          >
            TACTICAL CARGO JOGGERS
          </button>
        </div>

        {activeTab === 'tees' ? (
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (Round)</th>
                <th>Length</th>
                <th>Shoulder Drop</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>S</strong></td><td>42"</td><td>28"</td><td>21"</td></tr>
              <tr><td><strong>M</strong></td><td>44"</td><td>29"</td><td>22"</td></tr>
              <tr><td><strong>L</strong></td><td>46"</td><td>30"</td><td>23"</td></tr>
              <tr><td><strong>XL</strong></td><td>48"</td><td>31"</td><td>24"</td></tr>
              <tr><td><strong>XXL</strong></td><td>50"</td><td>32"</td><td>25"</td></tr>
            </tbody>
          </table>
        ) : (
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Waist (Inches)</th>
                <th>Length</th>
                <th>Thigh Fit</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>30(S)</strong></td><td>28-30"</td><td>38"</td><td>Relaxed</td></tr>
              <tr><td><strong>32(M)</strong></td><td>31-33"</td><td>39"</td><td>Relaxed</td></tr>
              <tr><td><strong>34(L)</strong></td><td>34-36"</td><td>40"</td><td>Relaxed</td></tr>
              <tr><td><strong>36(XL)</strong></td><td>37-39"</td><td>41"</td><td>Relaxed</td></tr>
            </tbody>
          </table>
        )}

        <div className="how-to-measure-box">
          <h4>Fit Advice:</h4>
          <p>
            Our garments are engineered with a generous boxy silhouette. If you prefer a regular fit, consider sizing down one step. For authentic streetwear aesthetic, choose your regular true size.
          </p>
        </div>
      </div>
    </>
  );
}
