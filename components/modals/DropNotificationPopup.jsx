'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

export default function DropNotificationPopup() {
  const { activeDropAlert, setActiveDropAlert, setIsLaunchModalOpen, currentUser } = useShop();

  if (!activeDropAlert) return null;

  const handleOpenCalendar = () => {
    setActiveDropAlert(null);
    setIsLaunchModalOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1040,
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        background: '#121218',
        border: '1px solid rgba(234, 179, 8, 0.45)',
        borderRadius: '14px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.85), 0 0 25px rgba(234, 179, 8, 0.2)',
        overflow: 'hidden',
        animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Top Accent Strip */}
      <div 
        style={{ 
          height: '3px', 
          background: 'linear-gradient(90deg, #eab308, #f59e0b, #ef4444)' 
        }} 
      />

      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(234, 179, 8, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent, #eab308)',
                fontSize: '0.85rem',
                flexShrink: 0
              }}
            >
              <i className="fas fa-bullhorn"></i>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--accent, #eab308)', letterSpacing: '1px' }}>
                VIP LAUNCH DISPATCH
              </span>
              <h4 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>
                {activeDropAlert.title || 'Upcoming Product Launches'}
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveDropAlert(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '2px 4px'
            }}
            aria-label="Dismiss alert"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <p style={{ margin: '8px 0 12px 0', fontSize: '0.78rem', color: '#b3b3b3', lineHeight: 1.45 }}>
          {activeDropAlert.message || 'New heavyweight silhouettes scheduled! View drop dates and claim your VIP pass.'}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={handleOpenCalendar}
            style={{
              flex: 1,
              background: 'var(--accent, #eab308)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <i className="fas fa-calendar-alt"></i> VIEW DROP DATES
          </button>

          <button
            type="button"
            onClick={() => setActiveDropAlert(null)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: '#aaa',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
