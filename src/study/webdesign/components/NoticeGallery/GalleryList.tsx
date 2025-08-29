import React, { useState } from 'react';
import ImagePopup from './ImagePopup';

export default function GalleryList() {
  const galleryImages = [
    './assets/images/gallery1.jpg',
    './assets/images/gallery2.jpg',
    './assets/images/gallery3.jpg'
  ];

  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ isPopupOpen, setIsPopupOpen ] = useState(false);

  return (
    <ul className="gallery" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {galleryImages.map((src, idx) => (
        <img 
          key={idx} 
          src={src} 
          alt={`gallery_${idx}`} 
          width={100} 
          height={100} 
          onClick={() => {
            setSelectedImage(src);
            setIsPopupOpen(true);
          }}
        />
      ))}
      {isPopupOpen && (
        <ImagePopup
          src={selectedImage}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </ul>
  );
}