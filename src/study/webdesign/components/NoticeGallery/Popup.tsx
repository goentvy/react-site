import React from 'react';

export default function Popup({ title, onClose }) {
  return (
    <div className="popup-layer" onClick={onClose}>
      <div className="popup" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>여기에 내용이 들어갑니다.</p>
        <button className="close" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}