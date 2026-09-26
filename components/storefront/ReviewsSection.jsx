'use client';

import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';

export default function ReviewsSection() {
  const { reviews, addReview, showToast } = useShop();
  const [filter, setFilter] = useState('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [authorCity, setAuthorCity] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState('North 240 GSM Oversized Heavyweight Tee');
  const [fitFeedback, setFitFeedback] = useState('True to Boxy Oversized');
  const [comment, setComment] = useState('');

  const filteredReviews = reviews.filter(r => {
    if (filter === '5star') return r.rating === 5;
    if (filter === 'tshirts') return r.productName.toLowerCase().includes('tee');
    if (filter === 'pants') return r.productName.toLowerCase().includes('cargo') || r.productName.toLowerCase().includes('pant');
    if (filter === 'hoodies') return r.productName.toLowerCase().includes('hoodie');
    return true;
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) {
      showToast('Please fill in your name and review', 'error');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName,
      city: authorCity || 'Verified City',
      productName: selectedProduct,
      rating,
      size: 'L',
      height: "5'10\"",
      fit: fitFeedback,
      comment,
      date: 'Just Now',
      helpful: 1,
      isVerified: true
    };

    addReview(newRev);
    setIsWriteModalOpen(false);
    setAuthorName('');
    setAuthorCity('');
    setComment('');
  };

  return (
    <>
      <section className="testimonials-section" id="reviews">
        <div className="container">
          <div className="section-header">
            <span className="section-label">
              <i className="fas fa-star" style={{ color: '#eab308', marginRight: '4px' }}></i> 100% VERIFIED COMMUNITY
            </span>
            <h2 className="section-title">Streetwear Community Reviews</h2>
            <p className="section-subtitle">
              Real feedback from 10,000+ fashion-forward thinkers across Delhi, Mumbai, Bengaluru, Pune, and Hyderabad.
            </p>
          </div>

          <div className="reviews-summary-bar">
            <div className="reviews-rating-score-box">
              <div className="big-rating-number">4.9</div>
              <div className="rating-stars-col">
                <div className="stars-gold">★★★★★</div>
                <span className="rating-count-sub">Based on 640+ Verified Drops</span>
              </div>
            </div>

            <div className="reviews-trust-pills">
              <div className="trust-pill">
                <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i> 98.4% True-to-Oversized Fit
              </div>
              <div className="trust-pill">
                <i className="fas fa-tshirt" style={{ color: 'var(--accent)' }}></i> Zero Bacon Collar Guarantee
              </div>
            </div>

            <button 
              type="button" 
              className="btn btn-primary write-review-trigger-btn"
              onClick={() => setIsWriteModalOpen(true)}
            >
              <i className="fas fa-pen-nib"></i> WRITE A REVIEW
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="reviews-filter-tabs">
            {[
              { key: 'all', label: `All Reviews (${reviews.length})` },
              { key: '5star', label: '5 Stars (★ 5.0)' },
              { key: 'tshirts', label: '240 GSM Tees' },
              { key: 'pants', label: 'Cargo Joggers' },
              { key: 'hoodies', label: 'Boxy Hoodies' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`review-filter-btn ${filter === tab.key ? 'active' : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="testimonials-grid">
            {filteredReviews.map(r => (
              <div key={r.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="user-avatar-circle">
                    {r.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="reviewer-name-row">
                      <span className="reviewer-name">{r.author}</span>
                      {r.isVerified && (
                        <span className="verified-buyer-badge">
                          <i className="fas fa-check-circle"></i> VERIFIED
                        </span>
                      )}
                    </div>
                    <span className="reviewer-city">{r.city}</span>
                  </div>
                </div>

                <div className="testimonial-rating">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>

                <div className="testimonial-product-tag">
                  {r.productName} • {r.fit}
                </div>

                <p className="testimonial-text">&ldquo;{r.comment}&rdquo;</p>

                <div className="testimonial-footer">
                  <span className="review-date">{r.date}</span>
                  <span className="helpful-counter">
                    <i className="far fa-thumbs-up"></i> Helpful ({r.helpful})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <>
          <div className="modal-backdrop active" onClick={() => setIsWriteModalOpen(false)}></div>
          <div className="write-review-modal open">
            <button 
              className="modal-close-icon" 
              onClick={() => setIsWriteModalOpen(false)}
              aria-label="Close Review Form"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="write-review-header" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div className="write-review-icon" style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,169,110,0.15)', color: 'var(--accent-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', margin: '0 auto 0.8rem' }}>
                <i className="fas fa-pen-nib"></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Write a Verified Review</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Share your drape, sizing, and cotton feedback with the North movement.</p>
            </div>

            <form onSubmit={handleSubmitReview}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="review-label">Product Dropped</label>
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              >
                <option value="North 240 GSM Oversized Heavyweight Tee">North 240 GSM Oversized Heavyweight Tee</option>
                <option value="Heavyweight Loop-Knit Boxy Hoodie">Heavyweight Loop-Knit Boxy Hoodie</option>
                <option value="Tactical 6-Pocket Cargo Joggers">Tactical 6-Pocket Cargo Joggers</option>
                <option value="Tokyo Drift Flight Bomber Jacket">Tokyo Drift Flight Bomber Jacket</option>
              </select>
            </div>

            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group">
                <label className="review-label">Your Name *</label>
                <input 
                  type="text" 
                  value={authorName} 
                  onChange={(e) => setAuthorName(e.target.value)} 
                  placeholder="e.g. Aryan Sharma" 
                  required 
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
              <div className="form-group">
                <label className="review-label">City *</label>
                <input 
                  type="text" 
                  value={authorCity} 
                  onChange={(e) => setAuthorCity(e.target.value)} 
                  placeholder="e.g. Mumbai / Delhi" 
                  required 
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="review-label">Rating</label>
              <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.4rem', color: '#eab308', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} onClick={() => setRating(star)}>
                    {star <= rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.2rem' }}>
              <label className="review-label">Streetwear Feedback *</label>
              <textarea 
                rows="3" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="Tell us how the collar, cotton density, and silhouette held up..." 
                required 
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              <i className="fas fa-check-circle"></i> SUBMIT VERIFIED REVIEW
            </button>
          </form>
        </div>
        </>
      )}
    </>
  );
}
