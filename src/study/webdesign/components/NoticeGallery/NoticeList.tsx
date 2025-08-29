import React from 'react';

export default function NoticeList({ onItemClick }) {
  const notices = ['공지사항 1', '공지사항 2', '공지사항 3', '공지사항 4'];

  return (
    <ul className="notice">
      {notices.map((title, idx) => (
        <li
          className="open-popup"
          key={idx}
          onClick={() => onItemClick(title)}
        >
          {title}
        </li>
      ))}
    </ul>
  );
}