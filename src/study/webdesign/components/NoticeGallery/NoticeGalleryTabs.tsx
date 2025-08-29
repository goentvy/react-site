import React, { useState } from 'react';
import NoticeList from './NoticeList';
import GalleryList from './GalleryList';
import Popup from './Popup';

export default function NoticeGalleryTabs() {
  const [active, setActive] = useState('notice');
  const [popupTitle, setPopupTitle] = useState(null);

  return (
    <div className="notice_gallery">
      <div className="notice_gallery_box">
        <div
          id="noticeBox"
          className={active === 'notice' ? 'active' : ''}
          onClick={() => setActive('notice')}
        >공지사항</div>
        <div
          id="galleryBox"
          className={active === 'gallery' ? 'active' : ''}
          onClick={() => setActive('gallery')}
        >갤러리</div>
      </div>

      {active === 'notice' && (
        <NoticeList onItemClick={title => setPopupTitle(title)} />
      )}
      {active === 'gallery' && <GalleryList />}

      {popupTitle && <Popup title={popupTitle} onClose={() => setPopupTitle(null)} />}
    </div>
  );
}