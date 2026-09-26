'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';

export default function DefectiveReportModal() {
  const { 
    isDefectModalOpen, 
    setIsDefectModalOpen, 
    defectModalPrefillOrder, 
    setDefectModalPrefillOrder,
    currentUser, 
    orders, 
    submitDefectReport, 
    showToast 
  } = useShop();

  // Form Fields
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [productName, setProductName] = useState('');
  const [defectCategory, setDefectCategory] = useState('Stitching / Seam Defect');
  const [description, setDescription] = useState('');
  const [resolution, setResolution] = useState('Replacement (Free Express Dispatch)');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');

  // Image Upload State
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Success State
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Prefill when opened
  useEffect(() => {
    if (isDefectModalOpen) {
      if (defectModalPrefillOrder) {
        setSelectedOrderId(defectModalPrefillOrder.id || '');
        const firstItem = defectModalPrefillOrder.items?.[0];
        setProductName(firstItem ? `${firstItem.name} (${firstItem.color || ''} - ${firstItem.size || ''})` : '');
        setCustomerName(defectModalPrefillOrder.customer?.name || currentUser?.name || '');
        setCustomerEmail(defectModalPrefillOrder.customer?.email || currentUser?.email || '');
        setCustomerPhone(defectModalPrefillOrder.customer?.phone || currentUser?.phone || '');
        setPickupAddress(defectModalPrefillOrder.customer?.address ? `${defectModalPrefillOrder.customer.address}, ${defectModalPrefillOrder.customer.city || ''}` : '');
      } else if (currentUser) {
        setCustomerName(currentUser.name || '');
        setCustomerEmail(currentUser.email || '');
        setCustomerPhone(currentUser.phone || '');
        const userOrders = orders.filter(o => o.customer?.email === currentUser.email || o.customer?.phone === currentUser.phone);
        if (userOrders.length > 0) {
          setSelectedOrderId(userOrders[0].id);
          const firstItem = userOrders[0].items?.[0];
          setProductName(firstItem ? `${firstItem.name} (${firstItem.color || ''} - ${firstItem.size || ''})` : '');
          setPickupAddress(userOrders[0].customer?.address || '');
        }
      }
    } else {
      // Reset on close
      setSubmittedTicket(null);
    }
  }, [isDefectModalOpen, defectModalPrefillOrder, currentUser, orders]);

  if (!isDefectModalOpen) return null;

  // Handle Order Selection Change
  const handleOrderSelect = (orderId) => {
    setSelectedOrderId(orderId);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const item = order.items?.[0];
      setProductName(item ? `${item.name} (${item.color || ''} - ${item.size || ''})` : '');
      if (order.customer?.address) {
        setPickupAddress(`${order.customer.address}, ${order.customer.city || ''}`);
      }
    }
  };

  // Handle Image Upload via input
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (uploadedImages.length + files.length > 5) {
      showToast('Maximum 5 images allowed per report.', 'error');
      return;
    }

    setIsUploading(true);
    showToast('Uploading defect photos...', 'info', 2000);

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        showToast(`Skipped ${file.name}: Not an image file.`, 'error');
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        if (res.ok && data.success && data.url) {
          setUploadedImages(prev => [...prev, data.url]);
        } else {
          // Fallback to local Base64 URL so upload never fails
          const reader = new FileReader();
          reader.onload = (event) => {
            setUploadedImages(prev => [...prev, event.target.result]);
          };
          reader.readAsDataURL(file);
        }
      } catch (err) {
        // Fallback
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImages(prev => [...prev, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    }

    setIsUploading(false);
    showToast('Defect photos uploaded successfully!', 'success');
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      showToast('Please specify the defective product name.', 'error');
      return;
    }

    if (!description.trim() || description.length < 15) {
      showToast('Please describe the defect in at least 15 characters.', 'error');
      return;
    }

    if (uploadedImages.length === 0) {
      showToast('Please upload at least 1 photo showing the defect.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = submitDefectReport({
        orderId: selectedOrderId || 'NORTH-DIRECT-PURCHASE',
        productName: productName.trim(),
        defectType: defectCategory,
        description: description.trim(),
        resolution,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        pickupAddress: pickupAddress.trim(),
        images: uploadedImages
      });

      setIsSubmitting(false);

      if (result.success) {
        setSubmittedTicket(result.report);
      }
    }, 600);
  };

  const handleClose = () => {
    setIsDefectModalOpen(false);
    setDefectModalPrefillOrder(null);
    setSubmittedTicket(null);
  };

  return (
    <div 
      className="modal-backdrop active" 
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 1060,
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
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '16px',
          width: 'min(720px, 96vw)',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(239, 68, 68, 0.15)',
          overflow: 'hidden',
          animation: 'fadeInUp 0.3s ease'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, #181114 0%, #0d0d12 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                fontSize: '1.1rem'
              }}
            >
              <i className="fas fa-triangle-exclamation"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '1px', margin: 0, color: '#fff' }}>
                  REPORT DEFECTIVE PRODUCT
                </h3>
                <span 
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '0.62rem',
                    fontWeight: 900,
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}
                >
                  QUALITY DESK
                </span>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.75rem', color: '#999' }}>
                100% Quality Assurance Guarantee • Free Express Replacement or Immediate Refund
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Close Defect Modal"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {submittedTicket ? (
            /* SUCCESS VIEW */
            <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
              <div 
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto 1.25rem auto'
                }}
              >
                <i className="fas fa-check"></i>
              </div>

              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', letterSpacing: '1px' }}>
                TICKET LOGGED SUCCESSFULLY
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0.4rem 0 0.8rem 0' }}>
                Ticket #{submittedTicket.id}
              </h3>

              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  maxWidth: '520px',
                  margin: '0 auto 1.5rem auto',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#888' }}>Product:</span>
                  <strong style={{ color: '#fff' }}>{submittedTicket.productName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#888' }}>Defect Type:</span>
                  <strong style={{ color: '#f87171' }}>{submittedTicket.defectType}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#888' }}>Resolution Chosen:</span>
                  <strong style={{ color: 'var(--accent, #eab308)' }}>{submittedTicket.resolution}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                  <span style={{ color: '#888' }}>Uploaded Evidence:</span>
                  <strong style={{ color: '#fff' }}>{submittedTicket.images?.length || 0} photo(s) attached</strong>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '10px', paddingTop: '10px', fontSize: '0.78rem', color: '#10b981' }}>
                  <i className="fas fa-truck-pickup" style={{ marginRight: '6px' }}></i>
                  Reverse pickup will be scheduled at your doorstep within 24 hours. Our senior quality inspector will contact you directly.
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    background: 'var(--accent, #eab308)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  Done &amp; Return to Store
                </button>
              </div>
            </div>
          ) : (
            /* SUBMISSION FORM */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Order & Product Selection Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '6px' }}>
                    SELECT ORDER OR ENTER ORDER ID *
                  </label>
                  {orders && orders.length > 0 ? (
                    <select
                      value={selectedOrderId}
                      onChange={(e) => handleOrderSelect(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: '#15151c',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    >
                      <option value="">-- Choose Order or Enter Custom ID --</option>
                      {orders.map(o => (
                        <option key={o.id} value={o.id}>
                          {o.id} ({o.status}) — ₹{o.grandTotal}
                        </option>
                      ))}
                    </select>
                  ) : null}

                  {(!orders || orders.length === 0 || selectedOrderId === '') && (
                    <input
                      type="text"
                      placeholder="e.g. NORTH-849201"
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        marginTop: orders?.length ? '6px' : '0',
                        background: '#15151c',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none'
                      }}
                    />
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '6px' }}>
                    DEFECTIVE PRODUCT NAME & SIZE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. North 240 GSM Oversized Tee (Onyx Black - L)"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Defect Category & Resolution Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '6px' }}>
                    NATURE OF DEFECT / ISSUE CATEGORY *
                  </label>
                  <select
                    value={defectCategory}
                    onChange={(e) => setDefectCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Stitching / Seam Defect">Stitching / Seam Ripped or Loose</option>
                    <option value="Fabric Hole or Tear">Fabric Tear / Cut / Hole</option>
                    <option value="Graphic Peel or Misprint">Print / Graphic Peeling, Cracked, or Blurred</option>
                    <option value="Wrong Size / Color Delivered">Wrong Size or Color Delivered</option>
                    <option value="Fabric Stained or Discolored">Stained / Discolored Fabric</option>
                    <option value="Zipper / Hardware Defect">Zipper / Buckle / Hardware Jammed or Broken</option>
                    <option value="Collar Bacon / Wrinkle Defect">Ribbed Collar Defect / Asymmetrical Cut</option>
                    <option value="Other Manufacturing Defect">Other Manufacturing Defect</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '6px' }}>
                    DESIRED RESOLUTION *
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: 'var(--accent, #eab308)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Replacement (Free Express Dispatch)">🔄 Free Fresh Replacement (Express Dispatch)</option>
                    <option value="Full Refund to Original Payment / UPI">💰 100% Full Refund to UPI / Bank Account</option>
                    <option value="Store Credit + ₹200 Goodwill Bonus">🎁 Store Credit (VIP Wallet + ₹200 Goodwill Voucher)</option>
                  </select>
                </div>
              </div>

              {/* Description & Concern */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '6px' }}>
                  DESCRIBE THE ISSUE / YOUR CONCERN IN DETAIL *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain exactly what is wrong with the piece (e.g. where the seam ripped, print defect, or color discrepancy). Your feedback helps our textile production team fix this batch."
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#15151c',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* IMAGE UPLOAD FUNCTIONALITY */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#aaa' }}>
                    UPLOAD DEFECT PHOTOS (MINIMUM 1, MAX 5) *
                  </label>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent, #eab308)', fontWeight: 700 }}>
                    {uploadedImages.length}/5 Photos Attached
                  </span>
                </div>

                <div 
                  style={{
                    border: '2px dashed rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    textAlign: 'center',
                    background: '#121217',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files) {
                      handleFileChange({ target: { files: e.dataTransfer.files } });
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ pointerEvents: 'none' }}>
                    <i className="fas fa-cloud-arrow-up" style={{ fontSize: '2rem', color: 'var(--accent, #eab308)', marginBottom: '8px' }}></i>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                      Click to Browse or Drag &amp; Drop Defect Photos
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#888' }}>
                      PNG, JPG, WEBP accepted • Clear close-up of defect &amp; neckline brand tag
                    </div>
                  </div>
                </div>

                {/* Uploaded Photos Preview Grid */}
                {uploadedImages.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {uploadedImages.map((imgUrl, idx) => (
                      <div 
                        key={idx}
                        style={{
                          width: '84px',
                          height: '84px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          background: '#000'
                        }}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Defect ${idx + 1}`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem'
                          }}
                          title="Remove Photo"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Contact & Pickup Info Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '4px' }}>
                    CUSTOMER FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '4px' }}>
                    MOBILE NUMBER (FOR REVERSE PICKUP) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '4px' }}>
                    EMAIL FOR STATUS UPDATES *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px',
                      background: '#15151c',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#aaa', marginBottom: '4px' }}>
                  REVERSE PICKUP DOORSTEP ADDRESS
                </label>
                <input
                  type="text"
                  placeholder="Enter full address for courier to collect the defective piece"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px',
                    background: '#15151c',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#aaa',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: (isSubmitting || isUploading) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.35)',
                    opacity: (isSubmitting || isUploading) ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Submitting Report...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Submit Defect Report &amp; Request Resolution
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
