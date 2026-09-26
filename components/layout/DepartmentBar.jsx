'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

export default function DepartmentBar() {
  const { setIsNotificationOpen, unreadNotificationsCount } = useShop();

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
          <button
            type="button"
            onClick={() => setIsNotificationOpen(true)}
            className="dept-tab"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              letterSpacing: 'inherit',
              color: 'inherit'
            }}
            title="Open Announcements & Updates"
          >
            <i className="fas fa-bullhorn" style={{ color: '#eab308' }}></i>
            ANNOUNCEMENTS
            {unreadNotificationsCount > 0 ? (
              <span style={{
                background: '#eab308',
                color: '#000',
                fontSize: '0.6rem',
                fontWeight: 900,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {unreadNotificationsCount} NEW
              </span>
            ) : (
              <span style={{
                background: 'rgba(0,0,0,0.06)',
                color: '#666',
                fontSize: '0.6rem',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                UPDATES
              </span>
            )}
          </button>
        </div>
        <div className="department-meta" style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '1px' }}>
          <i className="fas fa-certificate"></i> AUTHENTIC HEAVYWEIGHT QUALITY
        </div>
      </div>
    </div>
  );
}
