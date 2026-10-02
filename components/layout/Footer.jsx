'use client';

import React from 'react';
import Link from 'next/link';
import { useShop } from '../../context/ShopContext';

export default function Footer() {
  const { setIsTrackingOpen, setIsSizeGuideOpen, setIsFitModalOpen } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2 className="footer-logo">NORTH</h2>
              <p className="footer-tagline">Always Move Forward</p>
              <p className="footer-desc">
                High-density heavyweight streetwear crafted for forward thinkers. Superior 240 GSM cotton, thoughtful tailoring, and zero compromises.
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--accent)', marginTop: '0.6rem' }}>
                <i className="fas fa-envelope"></i> rohit@wearnorth.com
              </p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/north.always/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://x.com/ArmanCodeLab" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a href="https://in.pinterest.com/wearnorth/" target="_blank" rel="noreferrer" aria-label="Pinterest">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            <div className="footer-links-group">
              <h3>Collections</h3>
              <ul>
                <li><a href="#collection">240 GSM Oversized Tees</a></li>
                <li><a href="#collection">Tactical Cargo Joggers</a></li>
                <li><a href="#collection">Heavyweight Hoodies</a></li>
                <li><a href="#combo">Streetwear Combo Builder</a></li>
                <li><a href="#lookbook">Curated Lookbook</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h3>Customer Care</h3>
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    Size &amp; Fit Guide
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsFitModalOpen(true)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    Find My Fit (AI Size)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsTrackingOpen(true)}
                    style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit' }}
                  >
                    Track Order Live
                  </button>
                </li>
                <li><a href="#contact">Contact Support</a></li>
                <li><a href="/admin" style={{ color: 'var(--accent)', fontWeight: 600 }}><i className="fas fa-lock" style={{ fontSize: '0.75rem' }}></i> Admin Portal</a></li>
                <li><a href="mailto:rohit@wearnorth.com">rohit@wearnorth.com</a></li>
              </ul>
            </div>

            <div className="footer-links-group">
              <h3>Brand Promise</h3>
              <ul>
                <li><a href="#fabric">Textile Lab (240 GSM)</a></li>
                <li><a href="#about">About North Mindset</a></li>
                <li><a href="#about">7-Day Return Policy</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 NORTH. All rights reserved. | Always Move Forward • Official Contact: rohit@wearnorth.com</p>
            <div className="payment-methods">
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-light)', marginRight: '8px' }}>
                SECURE PAYMENTS:
              </span>
              <i className="fab fa-google-pay" title="Google Pay"></i>
              <i className="fab fa-cc-visa" title="Visa"></i>
              <i className="fab fa-cc-mastercard" title="Mastercard"></i>
              <i className="fas fa-qrcode" title="Instant UPI"></i>
              <i className="fas fa-money-bill-wave" title="Cash on Delivery"></i>
            </div>
          </div>
        </div>
      </footer>

      {/* Back To Top Button */}
      <button className="back-to-top visible" onClick={scrollToTop} aria-label="Back to Top">
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
