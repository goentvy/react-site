import React, { useState } from 'react';
import SubMenu from './SubMenu';

const menuData = [
  { title: '탑', sub: ['블라우스', '티', '셔츠', '니트'] },
  { title: '아우터', sub: ['자켓', '코트', '가디건', '머플러'] },
  { title: '팬츠', sub: ['청바지', '짧은바지', '긴바지', '레깅스'] },
  { title: '악세사리', sub: ['귀고리', '목걸이', '반지', '팔찌'] },
];

export default function MainMenu() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="menu_container">
      <ul className="main_menu">
        {menuData.map((menu, idx) => (
          <li key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}>
            <p>{menu.title}</p>
            {hovered === idx && <SubMenu items={menu.sub} />}
          </li>
        ))}
      </ul>
    </div>
  );
}