'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function AnnouncementBar() {
  const { showToast, setIsNotificationOpen, unreadNotificationsCount } = useShop();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const copyCode = (code, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    showToast(`Coupon code '${code}' copied to clipboard!`);
  };

  const tickerItems = [
    {
      icon: 'fa-bolt',
      text: 'FREE EXPRESS SHIPPING ON ALL ORDERS OVER ₹799'
    },
    {
      icon: 'fa-shield-alt',
      text: '100% REFUND GUARANTEE — 7 DAYS HASSLE-FREE RETURNS'
    },
    {
      icon: 'fa-tag',
      text: (
        <>
          USE CODE{' '}
          <strong 
            onClick={(e) => copyCode('NORTH300', e)}
            style={{ 
              color: 'var(--accent, #eab308)', 
              cursor: 'pointer', 
              textDecoration: 'underline',
              padding: '1px 4px',
              borderRadius: '3px',
              background: 'rgba(234, 179, 8, 0.15)'
            }}
            title="Click to copy code"
          >
            NORTH300
          </strong>{' '}
          FOR FLAT ₹300 OFF ON ₹1,999+
        </>
      )
    },
    {
      icon: 'fa-tshirt',
      text: '240 GSM HEAVYWEIGHT TERRY COTTON DROPS LIVE'
    },
    {
      icon: 'fa-envelope',
      text: (
        <>
          OFFICIAL 24/7 SUPPORT: <strong>rohit@wearnorth.com</strong>
        </>
      )
    },
    {
      icon: 'fa-fire',
      text: 'STREET DROP 04: TOKYO DRIFT & MIDNIGHT NOMAD IN STOCK'
    }
  ];

  return (
    <aside 
      className="top-announcement-bar" 
      aria-label="Store Announcement Ticker"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        background: '#0a0a0d',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div 
        className="announcement-track"
        style={{ cursor: 'pointer', flex: 1, overflow: 'hidden' }}
        onClick={() => setIsNotificationOpen(true)}
        title="Click to view all announcements & updates"
      >
        {/* Render twice for continuous infinite marquee looping */}
        {[0, 1].map((copyIndex) => (
          <div className="announcement-content" key={copyIndex}>
            {tickerItems.map((item, idx) => (
              <React.Fragment key={idx}>
                <span>
                  <i className={`fas ${item.icon}`}></i> {item.text}
                </span>
                <span className="ticker-dot">◆</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {/* Right controls: View Announcements Modal & Dismiss */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          paddingRight: '1rem', 
          paddingLeft: '0.75rem',
          background: 'linear-gradient(90deg, transparent, #0a0a0d 25%)',
          zIndex: 2,
          flexShrink: 0
        }}
      >
        <button
          type="button"
          onClick={() => setIsNotificationOpen(true)}
          style={{
            background: 'rgba(234, 179, 8, 0.12)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '12px',
            color: 'var(--accent, #eab308)',
            fontSize: '0.62rem',
            fontWeight: 800,
            padding: '2px 8px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            letterSpacing: '0.5px'
          }}
          title="Open Announcement Center"
        >
          <i className="fas fa-bullhorn" style={{ fontSize: '0.6rem' }}></i>
          ANNOUNCEMENTS
          {unreadNotificationsCount > 0 && (
            <span style={{
              background: 'var(--accent, #eab308)',
              color: '#000',
              borderRadius: '50%',
              width: '14px',
              height: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.55rem',
              fontWeight: 900
            }}>
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.45)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}
          title="Dismiss top bar"
          aria-label="Dismiss Announcement Bar"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </aside>
  );
}
