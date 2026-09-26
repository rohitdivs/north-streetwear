'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        left: 'auto',
        bottom: 'auto',
        zIndex: 10010,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      }}
    >
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast ${t.type === 'error' ? 'toast-error' : t.type === 'info' ? 'toast-info' : ''}`}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <i className={`fas ${t.type === 'error' ? 'fa-exclamation-circle' : t.type === 'info' ? 'fa-info-circle' : 'fa-check'}`}></i>
          <span style={{ flex: 1 }}>{t.message}</span>
          {dismissToast && (
            <button
              onClick={() => dismissToast(t.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                padding: '0 4px',
                fontSize: '1.1rem',
                lineHeight: 1,
                marginLeft: '6px'
              }}
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
