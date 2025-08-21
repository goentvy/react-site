import React from 'react';

export default function GalleryList() {
  const galleryImages = [
    './assets/images/gallery1.jpg',
    './assets/images/gallery2.jpg',
    './assets/images/gallery3.jpg'
  ];

  return (
    <ul className="gallery" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {galleryImages.map((src, idx) => (
        <img key={idx} src={src} alt={`gallery_${idx}`} width={100} height={100} />
      ))}
    </ul>
  );
}