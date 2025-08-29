function ImagePopup({src, onClose }) {
    if(!src) return null;
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt="img" />
            </div>
        </div>
    );
}

export default ImagePopup;