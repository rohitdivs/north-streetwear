'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

export default function NotificationDrawer() {
  const { 
    notifications, 
    unreadNotificationsCount, 
    isNotificationOpen, 
    setIsNotificationOpen, 
    markAsRead, 
    markAllNotificationsAsRead, 
    deleteNotification,
    setIsTrackingOpen,
    setIsLaunchModalOpen
  } = useShop();

  const handleActionClick = (notif) => {
    markAsRead(notif.id);
    setIsNotificationOpen(false);

    if (notif.link === '#track') {
      setIsTrackingOpen(true);
    } else if (notif.link === '#launch-calendar' || notif.type === 'drop') {
      setIsLaunchModalOpen(true);
    } else if (notif.link && notif.link.startsWith('#')) {
      const target = document.querySelector(notif.link);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'drop':
        return {
          label: 'STREET DROP',
          icon: 'fa-fire',
          color: '#f59e0b',
          bg: 'rgba(245, 158, 11, 0.12)',
          border: 'rgba(245, 158, 11, 0.25)'
        };
      case 'discount':
        return {
          label: 'VIP PROMO',
          icon: 'fa-tag',
          color: '#10b981',
          bg: 'rgba(16, 185, 129, 0.12)',
          border: 'rgba(16, 185, 129, 0.25)'
        };
      case 'order':
        return {
          label: 'DISPATCH',
          icon: 'fa-truck-fast',
          color: '#3b82f6',
          bg: 'rgba(59, 130, 246, 0.12)',
          border: 'rgba(59, 130, 246, 0.25)'
        };
      default:
        return {
          label: 'ANNOUNCEMENT',
          icon: 'fa-bullhorn',
          color: '#eab308',
          bg: 'rgba(234, 179, 8, 0.12)',
          border: 'rgba(234, 179, 8, 0.25)'
        };
    }
  };

  return (
    <>
      {/* Drawer Backdrop */}
      <div 
        className={`drawer-backdrop ${isNotificationOpen ? 'active' : ''}`}
        onClick={() => setIsNotificationOpen(false)}
      ></div>

      {/* Slide Drawer */}
      <aside 
        className={`slide-drawer ${isNotificationOpen ? 'open' : ''}`} 
        id="notificationDrawer" 
        aria-label="Notification Center"
        style={{ width: 'min(440px, 92vw)' }}
      >
        {/* Drawer Header */}
        <div className="drawer-header" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="drawer-title-wrap">
            <i className="fas fa-bell" style={{ color: 'var(--accent, #eab308)' }}></i>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '1px' }}>NOTIFICATIONS</h3>
            {unreadNotificationsCount > 0 ? (
              <span className="drawer-count-badge" style={{ background: 'var(--accent, #eab308)', color: '#000', fontWeight: 800 }}>
                {unreadNotificationsCount} NEW
              </span>
            ) : (
              <span className="drawer-count-badge" style={{ background: 'rgba(255,255,255,0.08)', color: '#888' }}>
                ALL CAUGHT UP
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {unreadNotificationsCount > 0 && (
              <button 
                type="button"
                onClick={markAllNotificationsAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent, #eab308)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                title="Mark all as read"
              >
                Mark Read
              </button>
            )}
            <button 
              className="drawer-close-btn" 
              onClick={() => setIsNotificationOpen(false)} 
              aria-label="Close Notifications"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Notifications List Body */}
        <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Quick Launch Calendar Banner */}
          <div
            onClick={() => {
              setIsNotificationOpen(false);
              setIsLaunchModalOpen(true);
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(245, 158, 11, 0.08) 100%)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              borderRadius: '8px',
              padding: '10px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            title="View Upcoming Product Launches & Drop Schedule"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fas fa-rocket" style={{ color: 'var(--accent, #eab308)', fontSize: '1rem' }}></i>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fff' }}>
                  UPCOMING PRODUCT LAUNCHES
                </div>
                <div style={{ fontSize: '0.68rem', color: '#ccc' }}>
                  3 new 240+ GSM drops scheduled. View dates & RSVP.
                </div>
              </div>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent, #eab308)', whiteSpace: 'nowrap' }}>
              VIEW &rarr;
            </span>
          </div>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', color: '#888' }}>
              <i className="far fa-bell-slash" style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.4 }}></i>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.4rem' }}>No Notifications Yet</h4>
              <p style={{ fontSize: '0.8rem', color: '#aaa', maxWidth: '240px', margin: '0 auto' }}>
                You're completely up to date with new drops, route tracking, and VIP promos.
              </p>
            </div>
          ) : (
            notifications.map((n) => {
              const badge = getTypeBadge(n.type);
              return (
                <div 
                  key={n.id}
                  style={{
                    background: n.read ? '#0e0e12' : '#141419',
                    border: n.read ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(234,179,8,0.3)',
                    borderRadius: '8px',
                    padding: '1rem',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    boxShadow: n.read ? 'none' : '0 2px 12px rgba(0,0,0,0.35)'
                  }}
                >
                  {/* Unread Glow Dot */}
                  {!n.read && (
                    <span 
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent, #eab308)',
                        boxShadow: '0 0 8px var(--accent, #eab308)'
                      }}
                      title="Unread Notification"
                    />
                  )}

                  {/* Header Row: Badge & Time */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', paddingRight: n.read ? '0' : '14px' }}>
                    <span 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '1px',
                        color: badge.color,
                        background: badge.bg,
                        border: `1px solid ${badge.border}`,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      <i className={`fas ${badge.icon}`}></i> {badge.label}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#777' }}>
                      {n.time}
                    </span>
                  </div>

                  {/* Title & Message */}
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, margin: '0 0 0.35rem 0', color: n.read ? '#ddd' : '#fff' }}>
                    {n.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#999', margin: '0 0 0.8rem 0', lineHeight: 1.45 }}>
                    {n.message}
                  </p>

                  {/* Action Link & Dismiss buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.6rem' }}>
                    {n.link ? (
                      <button
                        type="button"
                        onClick={() => handleActionClick(n)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent, #eab308)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: 0
                        }}
                      >
                        VIEW UPDATE <i className="fas fa-arrow-right" style={{ fontSize: '0.65rem' }}></i>
                      </button>
                    ) : (
                      <span />
                    )}

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!n.read && (
                        <button
                          type="button"
                          onClick={() => markAsRead(n.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#777',
                            fontSize: '0.7rem',
                            cursor: 'pointer'
                          }}
                          title="Mark as read"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteNotification(n.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#666',
                          fontSize: '0.7rem',
                          cursor: 'pointer'
                        }}
                        title="Dismiss notification"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
