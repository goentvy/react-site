import React, { useState, useEffect } from 'react';

export default function ImageSlider({ images, delay = 2500, height = 300 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, delay);
    return () => clearInterval(timer);
  }, [images, delay]);

  return (
    <div className="slide_wrap" style={{ height }}>
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`slide_${idx}`}
          style={{
            top: idx === current ? 0 : height,
            transition: 'top 0.8s ease'
          }}
        />
      ))}
    </div>
  );
}