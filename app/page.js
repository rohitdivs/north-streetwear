'use client';

import React, { useState } from 'react';
import DepartmentBar from '../components/layout/DepartmentBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSlider from '../components/storefront/HeroSlider';
import CategoryStoryBubbles from '../components/storefront/CategoryStoryBubbles';
import ProductGrid from '../components/storefront/ProductGrid';
import ComboBundler from '../components/storefront/ComboBundler';
import OutfitStyler from '../components/storefront/OutfitStyler';
import Lookbook from '../components/storefront/Lookbook';
import FabricLab from '../components/storefront/FabricLab';
import ReviewsSection from '../components/storefront/ReviewsSection';
import { useShop } from '../context/ShopContext';

export default function HomePage() {
  const { showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [contactStatus, setContactStatus] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Welcome to the NORTH movement! VIP drop code: NORTH500');
      setNewsletterEmail('');
    }
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContactStatus('Message dispatched! Our streetwear team will reply within 24 hours.');
    showToast('Your inquiry has been sent to our central desk.');
  };

  return (
    <main>
      {/* Top Department Switcher */}
      <DepartmentBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Hero Banner Slider */}
      <HeroSlider />

      {/* Interactive Instagram-style Category Stories */}
      <CategoryStoryBubbles />

      {/* Drops & Catalog Grid */}
      <ProductGrid />

      {/* Combo Bundler */}
      <ComboBundler />

      {/* Mix & Match Outfit Styler */}
      <OutfitStyler />

      {/* Shop The Look (Lookbook) */}
      <Lookbook />

      {/* 240 GSM Textile Lab */}
      <FabricLab />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* Features & Trust */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-truck-fast"></i></div>
              <h3>Free Shipping</h3>
              <p>On all orders above ₹799</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-undo"></i></div>
              <h3>7-Day Returns</h3>
              <p>Hassle-free doorstep exchanges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
              <h3>100% Cotton</h3>
              <p>Crafted with 240+ GSM fabrics</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><i className="fas fa-headset"></i></div>
              <h3>Dedicated Support</h3>
              <p>rohit@wearnorth.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Brand */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-label">OUR STORY</span>
              <h2 className="about-title">We Believe In<br /><em>Moving Forward</em></h2>
              <p className="about-text">
                North is more than a clothing brand — it's an unwavering commitment to forward momentum. Born from the hunger to craft authentic heavyweight streetwear without excessive luxury markups, we design for creators who refuse to stand still.
              </p>
              <p className="about-text">
                Every drop features carefully dialed silhouettes, heavy loop-knit cottons, and custom-dyed palettes inspired by metropolitan architecture. When you wear North, you wear intention.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">50</span><span className="stat-suffix">+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">10</span><span className="stat-suffix">K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">28</span><span className="stat-suffix">+</span>
                  <span className="stat-label">States Delivered</span>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image-wrapper">
                <div className="about-image-bg"></div>
                <img src="/images/hero-banner.jpg" alt="About North Brand" className="about-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <span className="section-label">JOIN THE MOVEMENT</span>
            <h2 className="newsletter-title">Unlock Flat ₹150 Off Your Drop</h2>
            <p className="newsletter-text">
              Subscribe to receive early VIP drop access, secret lookbook releases, and an instant discount on your initial streetwear bag.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <div className="input-group">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  required 
                />
                <button type="submit" className="btn btn-primary">SUBSCRIBE</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Social Community Grid */}
      <section className="social-section">
        <div className="section-header" style={{ padding: '0 2rem' }}>
          <span className="section-label">STREETWEAR COMMUNITY</span>
          <h2 className="section-title">@north.always</h2>
        </div>
        <div className="social-grid">
          {['/images/product-1.jpg', '/images/product-sage-tee.jpg', '/images/product-olive-cargo.jpg', '/images/product-2.jpg', '/images/look-urban-transit.jpg', '/images/look-tokyo-drift.jpg'].map((img, i) => (
            <div key={i} className="social-item">
              <img src={img} alt="Instagram Post" />
              <div className="social-overlay"><i className="fab fa-instagram"></i></div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">GET IN TOUCH</span>
            <h2 className="section-title">Official North Support</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info-cards">
              <div className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-envelope"></i></div>
                <h3>Official Email</h3>
                <a href="mailto:rohit@wearnorth.com">rohit@wearnorth.com</a>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-phone"></i></div>
                <h3>Customer Helpline</h3>
                <a href="tel:+919927345853">+91 9927345853 / 7082167660</a>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon"><i className="fas fa-map-marker-alt"></i></div>
                <h3>Headquarters</h3>
                <p>India • Dispatching Worldwide</p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContact}>
              <div className="form-row">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Order ID or Subject" />
              </div>
              <div className="form-group">
                <textarea placeholder="How can we assist you?" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg">SEND MESSAGE</button>
              {contactStatus && (
                <p style={{ marginTop: '1rem', color: '#22c55e', fontSize: '0.85rem', fontWeight: 600 }}>
                  {contactStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
