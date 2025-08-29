
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function Mini_Blog() {
  return (
    <div className="flex flex-col w-full">
      <MainTitleText>소플의 미니 블로그</MainTitleText>
      <Outlet /> {/* 자식 라우트가 여기 렌더링됨 */}
    </div>
  );
}

export default Mini_Blog;
