'use client';

import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    bg: '/images/hero-banner.jpg',
    tag: 'NEW DROP 2026 • 240 GSM HEAVYWEIGHT',
    title: 'NORTH',
    tagline: 'ALWAYS MOVE FORWARD',
    desc: 'Luxury boxy silhouettes, French terry cotton, and engineered drape crafted for unapologetic individuality.',
    primaryBtn: { text: 'EXPLORE THE DROP', link: '#collection', badge: 'HOT' },
    secondaryBtn: { text: 'BUILD YOUR COMBO', link: '#combo' }
  },
  {
    id: 2,
    bg: '/images/look-tokyo-drift.jpg',
    tag: 'TACTICAL NOMAD SERIES',
    title: 'URBAN TRANSIT',
    tagline: 'BUILT FOR METROPOLITAN PACE',
    desc: 'Reinforced 6-pocket cargo joggers and water-repellent flight jackets engineered for all-weather exploration.',
    primaryBtn: { text: 'SHOP THE LOOK', link: '#lookbook' },
    secondaryBtn: { text: 'VIEW CARGO JOGGERS', link: '#collection' }
  },
  {
    id: 3,
    bg: '/images/look-midnight-nomad.jpg',
    tag: 'EXCLUSIVE STREETWEAR BUNDLES',
    title: 'CUSTOM COMBO',
    tagline: 'CURATE YOUR STREETWEAR DUO',
    desc: 'Pair your favorite Heavyweight Boxy Tee with tactical cargo joggers and save up to ₹500 instantly.',
    primaryBtn: { text: 'BUILD COMBO NOW', link: '#combo' },
    secondaryBtn: { text: 'BROWSE CATALOG', link: '#collection' }
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero-slider-section" id="home">
        <div className="hero-slider-track">
          {SLIDES.map((slide, idx) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <div className="hero-bg">
                <img src={slide.bg} alt={slide.title} />
              </div>
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <div className="hero-tag">{slide.tag}</div>
                <h1 className="hero-title">
                  <span className="hero-title-line">{slide.title}</span>
                </h1>
                <p className="hero-tagline">{slide.tagline}</p>
                <p className="hero-subdesc">{slide.desc}</p>
                <div className="hero-buttons">
                  <a href={slide.primaryBtn.link} className="btn btn-primary">
                    {slide.primaryBtn.text} {slide.primaryBtn.badge && <span className="badge-mini">{slide.primaryBtn.badge}</span>}
                  </a>
                  <a href={slide.secondaryBtn.link} className="btn btn-outline">
                    {slide.secondaryBtn.text}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button className="slider-arrow slider-prev" onClick={prevSlide} aria-label="Previous Slide">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-arrow slider-next" onClick={nextSlide} aria-label="Next Slide">
          <i className="fas fa-chevron-right"></i>
        </button>
      </section>

      {/* Marquee Ticker */}
      <div className="marquee-section">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>ALWAYS MOVE FORWARD</span>
            <span className="marquee-dot">◆</span>
            <span>240 GSM BIO-WASHED HEAVYWEIGHT</span>
            <span className="marquee-dot">◆</span>
            <span>OVERSIZED BOXY FIT</span>
            <span className="marquee-dot">◆</span>
            <span>FREE EXPRESS SHIPPING OVER ₹799</span>
            <span className="marquee-dot">◆</span>
            <span>ALWAYS MOVE FORWARD</span>
            <span className="marquee-dot">◆</span>
            <span>PREMIUM STREETWEAR INDIA</span>
            <span className="marquee-dot">◆</span>
            <span>NO SHORTCUTS ONLY ELEVATION</span>
            <span className="marquee-dot">◆</span>
          </div>
        </div>
      </div>
    </>
  );
}
