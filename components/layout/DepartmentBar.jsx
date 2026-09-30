'use client';

import React from 'react';

export default function DepartmentBar() {
  return (
    <div className="department-tabs-bar">
      <div className="container department-tabs-container">
        <div className="department-tabs">
          <a href="#collection" className="dept-tab active">STREETWEAR DROPS</a>
          <a href="#combo" className="dept-tab">
            <i className="fas fa-fire" style={{ color: '#ef4444', marginRight: '4px' }}></i> COMBO BUNDLER (SAVE ₹500)
          </a>
          <a href="#styler" className="dept-tab">
            <i className="fas fa-layer-group" style={{ color: 'var(--accent)', marginRight: '4px' }}></i> OUTFIT BUILDER
          </a>
          <a href="#lookbook" className="dept-tab">SHOP THE LOOK</a>
          <a href="#fabric" className="dept-tab">240 GSM LAB</a>
        </div>
        <div className="department-meta" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '1px' }}>
          <i className="fas fa-certificate"></i> AUTHENTIC HEAVYWEIGHT QUALITY
        </div>
      </div>
    </div>
  );
}
