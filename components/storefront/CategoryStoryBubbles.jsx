'use client';

import React from 'react';
import { useShop } from '../../context/ShopContext';

const BUBBLES = [
  { key: 'all', name: 'All Drops', icon: 'fa-th-large' },
  { key: 'tshirts', name: '240 GSM Tees', icon: 'fa-tshirt', special: true },
  { key: 'pants', name: 'Cargo & Joggers', icon: 'fa-running' },
  { key: 'hoodies', name: 'Boxy Hoodies', icon: 'fa-vest' },
  { key: 'jackets', name: 'Bomber Jackets', icon: 'fa-user-astronaut' },
  { key: 'accessories', name: 'Caps & Accs', icon: 'fa-hat-cowboy' },
  { key: 'bestseller', name: 'Best Sellers', icon: 'fa-fire', fire: true }
];

export default function CategoryStoryBubbles() {
  const { activeCategory, setActiveCategory } = useShop();

  const handleSelect = (key) => {
    setActiveCategory(key);
    const elem = document.getElementById('collection');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="story-bubbles-section">
      <div className="container">
        <div className="story-bubbles-track" id="storyBubblesTrack">
          {BUBBLES.map(b => (
            <div
              key={b.key}
              className={`story-bubble ${b.special ? 'special-bubble' : ''} ${activeCategory === b.key ? 'active' : ''}`}
              onClick={() => handleSelect(b.key)}
              style={{ cursor: 'pointer' }}
            >
              <div className="bubble-ring">
                <div className="bubble-avatar">
                  <i className={`fas ${b.icon}`} style={{ color: b.fire ? '#ef4444' : 'inherit' }}></i>
                </div>
              </div>
              <span className="bubble-name">{b.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
