'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function OrderTrackingModal() {
  const { orders, isTrackingOpen, setIsTrackingOpen, showToast, currentUser } = useShop();
  const [activeTab, setActiveTab] = useState('track'); // 'track' or 'history'
  const [searchQuery, setSearchQuery] = useState('NORTH-849201');
  const [foundOrder, setFoundOrder] = useState(orders[0] || null);

  if (!isTrackingOpen) return null;

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const q = searchQuery.trim().toUpperCase();
    const match = orders.find(o => 
      o.id.toUpperCase() === q || 
      (o.customer?.phone && o.customer.phone.includes(q)) ||
      (o.awb && o.awb.toUpperCase() === q)
    );
    if (match) {
      setFoundOrder(match);
      showToast(`Tracking telemetry loaded for ${match.id}`);
    } else {
      showToast('Order not found. Try demo ID: NORTH-849201 or NORTH-782104', 'error');
    }
  };

  const currentStep = foundOrder?.currentStep || 2;

  // Derive origin, destination, and checkpoints
  const originFacility = foundOrder?.origin?.facility || 'NORTH Central Fulfillment Hub (BOM-HUB-01)';
  const originCity = foundOrder?.origin?.city || 'Bhiwandi / Mumbai, MH';
  const destCity = foundOrder?.destination?.city || foundOrder?.customer?.city || 'Customer Destination';
  const destAddress = foundOrder?.customer?.address ? `${foundOrder.customer.address}, ${destCity}` : destCity;
  const currentHub = foundOrder?.currentHub || 'Regional Transit Sorting Facility';
  const liveLocation = foundOrder?.liveLocation || 'En route between distribution hubs';

  const defaultCheckpoints = [
    { step: 1, title: 'Order Verified & Dispatched', location: originFacility, time: foundOrder?.date || 'Confirmed', status: 'completed' },
    { step: 2, title: 'Central Hub Quality Passed', location: 'Bhiwandi Hub, Mumbai', time: 'Dispatched', status: currentStep >= 2 ? 'completed' : 'pending' },
    { step: 3, title: 'Regional Sort Hub', location: currentHub, time: foundOrder?.awb || 'In Transit', status: currentStep >= 3 ? (currentStep === 3 ? 'active' : 'completed') : 'pending' },
    { step: 4, title: 'Out for Doorstep Delivery', location: `${destCity} Station`, time: 'Scheduled Delivery', status: currentStep >= 4 ? (currentStep === 4 ? 'active' : 'completed') : 'pending' },
    { step: 5, title: 'Delivered to Customer', location: destAddress, time: foundOrder?.deliveryDate || 'Expected', status: currentStep >= 5 ? 'completed' : 'pending' }
  ];

  const checkpoints = foundOrder?.checkpoints || defaultCheckpoints;

  return (
    <>
      <div 
        className={`modal-backdrop ${isTrackingOpen ? 'active' : ''}`}
        onClick={() => setIsTrackingOpen(false)}
      ></div>

      <div className={`track-order-modal ${isTrackingOpen ? 'open' : ''}`} id="trackOrderModal" style={{ maxWidth: '680px' }}>
        <button 
          className="modal-close-icon" 
          onClick={() => setIsTrackingOpen(false)}
          aria-label="Close Tracking"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="track-modal-header">
          <div className="track-modal-icon">
            <i className="fas fa-truck-fast"></i>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Where-to-Where Tracking
          </h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
            Origin hub to destination doorstep tracing across India
          </p>
        </div>

        <div className="track-nav-tabs">
          <button 
            className={`track-tab ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => setActiveTab('track')}
          >
            <i className="fas fa-search-location"></i> Trace Order
          </button>
          <button 
            className={`track-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <i className="fas fa-history"></i> Orders Directory ({orders.length})
          </button>
        </div>

        {activeTab === 'track' && (
          <div>
            <form className="track-search-bar" onSubmit={handleTrackSubmit} style={{ marginBottom: '1.2rem' }}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ENTER ORDER ID (E.G. NORTH-849201)"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                TRACK
              </button>
            </form>

            {foundOrder ? (
              <div>
                {/* Visual "Where to Where" Route Banner */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Origin */}
                    <div style={{ maxWidth: '40%' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        ORIGIN FULFILLMENT
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{originCity}</div>
                      <div style={{ fontSize: '0.72rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {originFacility}
                      </div>
                    </div>

                    {/* Arrow Path & Status */}
                    <div style={{ textAlign: 'center', padding: '0 10px', flex: 1 }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--accent)',
                        marginBottom: '4px'
                      }}>
                        <i className="fas fa-arrow-right"></i>
                      </div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                        {foundOrder.status}
                      </div>
                    </div>

                    {/* Destination */}
                    <div style={{ maxWidth: '40%', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        DESTINATION
                      </span>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{destCity}</div>
                      <div style={{ fontSize: '0.72rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        PIN: {foundOrder.customer?.pincode || '400050'}
                      </div>
                    </div>
                  </div>

                  {/* Live Dispatch Ping */}
                  <div style={{
                    marginTop: '12px',
                    paddingTop: '10px',
                    borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: '#d1d5db'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      boxShadow: '0 0 8px #22c55e'
                    }}></span>
                    <strong>Current Active Hub:</strong> {currentHub} — <span style={{ color: '#9ca3af' }}>{liveLocation}</span>
                  </div>
                </div>

                {/* Dispatch Details Grid */}
                <div className="dispatch-meta-grid" style={{ marginBottom: '1.2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 800 }}>ORDER NUMBER</span>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{foundOrder.id}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 800 }}>CARRIER & AWB</span>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent)' }}>{foundOrder.carrier}</div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{foundOrder.awb}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 800 }}>ESTIMATED DELIVERY</span>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{foundOrder.deliveryDate}</div>
                  </div>
                </div>

                {/* Stepper Timeline */}
                <div className="track-stepper">
                  {checkpoints.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = step.status === 'completed' || stepNum < currentStep;
                    const isActive = step.status === 'active' || stepNum === currentStep;

                    return (
                      <div 
                        key={step.title || idx}
                        className={`stepper-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                      >
                        <div className="stepper-node">
                          {isCompleted ? <i className="fas fa-check"></i> : stepNum}
                        </div>
                        <div className="stepper-content">
                          <h5 style={{ fontSize: '0.86rem', fontWeight: 700 }}>{step.title}</h5>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{step.location}</p>
                          {step.time && <span className="stepper-time" style={{ fontSize: '0.7rem' }}>{step.time}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Items in Drop */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-light)', display: 'block', marginBottom: '0.6rem' }}>
                    PIECES IN THIS DROP:
                  </span>
                  {foundOrder.items?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span>{item.name} ({item.size} / {item.color}) x{item.qty}</span>
                      <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ textAlign: 'center', padding: '2rem' }}>No order found. Try NORTH-849201</p>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '420px', overflowY: 'auto' }}>
            {orders.map(o => (
              <div 
                key={o.id}
                onClick={() => {
                  setFoundOrder(o);
                  setSearchQuery(o.id);
                  setActiveTab('track');
                }}
                style={{
                  padding: '1rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{o.id}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    {o.date} • {o.items?.length} piece(s) • To: {o.customer?.city || 'India'}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800 }}>₹{o.grandTotal?.toLocaleString('en-IN')}</div>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    padding: '3px 8px', 
                    borderRadius: '4px', 
                    background: o.status === 'Delivered' ? '#166534' : 'rgba(255,255,255,0.12)', 
                    color: o.status === 'Delivered' ? '#4ade80' : '#fff',
                    fontWeight: 600
                  }}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
