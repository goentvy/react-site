# React useEffect Hook

`useEffect`는 React 함수형 컴포넌트에서 부수 효과(side effect)를 처리하기 위한 Hook으로,

상태 변화나 컴포넌트 생명주기에서 필요한 로직을 안전하게 수행할 수 있습니다.

## 기본 사용법

```jsx
import { useState, useEffect } from 'react';

function useEffectExample() {
  const [ count, setCount ]= useState(0);

  useEffect(() => {
    // 브라우저 탭 타이틀을 업데이트
    document.title = `You clicked ${count} times`;
  },); // count가 변경될 때마다 실행

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default useEffectExample;
```

## 주요 특징

- 첫 번째 인자로 부수 효과가 담길 콜백 함수.
- 두 번째 인자인 의존성 배열의 값이 바뀔 때마다 콜백이 재실행됨.
- 의존성 배열을 [ ] 빈배열로 넘기면 마운트 시 한 번만 실행.
- 배열 생략 시, 렌더링마다 무조건 실행됨.

## Redux, TypeScript, TailwindCSS, Supabase와의 연동

- **Redux**: 전역 상태가 useEffect 의존성에 들어가면 상태 변화마다 원하는 부수 효과(예: fetch, 로그 등)를 실행할 수 있음.
- **TypeScript**: 변수와 함수의 타입을 명확하게 선언해 useEffect 내부 동작의 안전성을 높일 수 있음.
- **TailwindCSS**: 상태 변화를 감지해 테마·UI 클래스를 동적으로 할당하고, 반응형 UI를 간단히 구현 가능.
- **Supabase**: DB 데이터를 불러오는 fetch 작업을 useEffect에서 비동기적으로 처리하고, 상태 반영과 동시에 UI를 최신화.

## 실무 예시: Supabase 데이터 연동

```jsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function Profile() {
  const [ profile, setProfile ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('users').select('*').single();
      setProfile(data);
    };
    fetchData();
  }, []); // 빈배열로 마운트 시 한 번 실행

  return (
    <div>
      {profile && <span>{profile.username}</span>}
    </div>
  );
}
```