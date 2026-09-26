'use client';

import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // Smooth exit sequence
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1300);

    const doneTimer = setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = '';
    }, 2100);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      id="preloader"
      className={`north-preloader ${isExiting ? 'preloader-exiting' : ''}`}
      aria-hidden={isExiting}
    >
      <div className="preloader-content">
        <h1 className="preloader-brand-title">NORTH</h1>
      </div>
    </div>
  );
}

