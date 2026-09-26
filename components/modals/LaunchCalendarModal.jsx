'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function LaunchCalendarModal() {
  const { 
    isLaunchModalOpen, 
    setIsLaunchModalOpen, 
    upcomingLaunches, 
    currentUser, 
    showToast,
    remindedDropIds,
    toggleDropReminder,
    requestDeviceNotifications
  } = useShop();

  const [deviceNotifStatus, setDeviceNotifStatus] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  if (!isLaunchModalOpen) return null;

  const handleEnablePush = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      showToast('Browser notifications are not supported on this browser.', 'error');
      return;
    }
    const perm = await requestDeviceNotifications();
    setDeviceNotifStatus(perm);
  };

  return (
    <div 
      className="modal-backdrop active" 
      onClick={() => setIsLaunchModalOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0d0d12',
          border: '1px solid rgba(234, 179, 8, 0.35)',
          borderRadius: '16px',
          width: 'min(760px, 96vw)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(234, 179, 8, 0.15)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease'
        }}
      >
        {/* Modal Header */}
        <div 
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #14141c 0%, #0d0d12 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent, #eab308)',
                fontSize: '1rem'
              }}
            >
              <i className="fas fa-rocket"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '1px', margin: 0, color: '#fff' }}>
                  UPCOMING PRODUCT LAUNCHES
                </h3>
                <span 
                  style={{
                    background: 'var(--accent, #eab308)',
                    color: '#000',
                    fontSize: '0.62rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}
                >
                  LIVE CALENDAR
                </span>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.75rem', color: '#999' }}>
                Official streetwear drop timeline & exclusive member launch access.
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={() => setIsLaunchModalOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '6px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
            aria-label="Close Launch Calendar"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Member Greeting & Push Notification Banner */}
        <div 
          style={{
            padding: '0.9rem 1.5rem',
            background: currentUser ? 'rgba(234, 179, 8, 0.08)' : '#121217',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i 
              className={currentUser ? 'fas fa-shield-halved' : 'fas fa-info-circle'} 
              style={{ color: 'var(--accent, #eab308)', fontSize: '0.9rem' }}
            ></i>
            <span style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              {currentUser ? (
                <>
                  VIP Pass Active for <strong>{currentUser.name}</strong> — You get <strong>1-Hour Early Access</strong> before public sellout!
                </>
              ) : (
                <>
                  Log in or register to automatically receive instant drop alerts & VIP early access!
                </>
              )}
            </span>
          </div>

          {/* Web Push Button */}
          {deviceNotifStatus !== 'granted' ? (
            <button
              type="button"
              onClick={handleEnablePush}
              style={{
                background: 'var(--accent, #eab308)',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <i className="fas fa-bell"></i> Send Alerts to My Device
            </button>
          ) : (
            <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 700 }}>
              <i className="fas fa-check-circle"></i> Device Notifications Enabled
            </span>
          )}
        </div>

        {/* Launch Cards List */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem', 
            overflowY: 'auto', 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem' 
          }}
        >
          {upcomingLaunches && upcomingLaunches.map((item) => {
            const isReminded = remindedDropIds?.includes(item.id);
            return (
              <div 
                key={item.id}
                style={{
                  background: '#121218',
                  border: isReminded ? '1px solid rgba(234, 179, 8, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'center',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  boxShadow: isReminded ? '0 4px 20px rgba(234, 179, 8, 0.12)' : 'none'
                }}
              >
                {/* Product Thumbnail */}
                <div 
                  style={{
                    width: '100px',
                    height: '110px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#1a1a22',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={item.img} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: '4px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--accent, #eab308)',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}
                  >
                    {item.gsm}
                  </span>
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  {/* Category & Status Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem', flexWrap: 'wrap', gap: '4px' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent, #eab308)', letterSpacing: '1px' }}>
                      {item.category.toUpperCase()}
                    </span>
                    <span 
                      style={{
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      <i className="fas fa-clock" style={{ marginRight: '4px' }}></i>
                      {item.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff', margin: '0 0 0.35rem 0' }}>
                    {item.name}
                  </h4>

                  <p style={{ fontSize: '0.78rem', color: '#aaa', margin: '0 0 0.5rem 0', lineHeight: 1.4 }}>
                    {item.description}
                  </p>

                  {/* Launch Date & VIP Access Banner */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      fontSize: '0.75rem', 
                      color: '#e5e7eb',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      marginBottom: '0.6rem'
                    }}
                  >
                    <i className="fas fa-calendar-check" style={{ color: 'var(--accent, #eab308)' }}></i>
                    <span>Launch Date: <strong style={{ color: '#fff' }}>{item.launchDate}</strong></span>
                  </div>

                  {/* Pricing and Action Button */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff' }}>
                        ₹{item.price}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#666', textDecoration: 'line-through' }}>
                        ₹{item.originalPrice}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#ef4444', fontWeight: 800 }}>
                        {item.tag}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleDropReminder(item.id)}
                      style={{
                        background: isReminded ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                        border: isReminded ? '1px solid #10b981' : '1px solid rgba(234, 179, 8, 0.4)',
                        color: isReminded ? '#10b981' : 'var(--accent, #eab308)',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <i className={isReminded ? 'fas fa-check' : 'fas fa-bell'}></i>
                      {isReminded ? 'DROP REMINDER SET' : 'NOTIFY ME ON LAUNCH'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div 
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#0a0a0e',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ fontSize: '0.72rem', color: '#888' }}>
            <i className="fas fa-check-double" style={{ color: 'var(--accent, #eab308)', marginRight: '5px' }}></i>
            Registered users receive direct launch drops in their Notifications & Device.
          </div>
          <button
            type="button"
            onClick={() => setIsLaunchModalOpen(false)}
            style={{
              background: '#222',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '6px 16px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Close Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
