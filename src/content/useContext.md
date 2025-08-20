# React useContext Hook

## 1. useContext란?

React의 useContext는 Context API를 함수형 컴포넌트에서 쉽게 사용할 수 있게 해주는 Hook입니다​. 주로 여러 단계의 props 전달(props drilling) 문제를 간단하게 해결하며, 상위 컴포넌트에서 만든 데이터를 하위 컴포넌트에서 바로 사용할 수 있습니다. 전역적으로 테마, 인증정보, 다국어 등 다양한 상태를 공유하는 데 흔히 활용됩니다.

## 2. Context 생성 및 Provider 설정

Context 객체는 createContext 함수를 통해 생성하며, 기본값(옵션)을 지정할 수 있습니다. Provider 컴포넌트가 Context의 값을 하위 트리로 전달해주며, value prop에 공유하고 싶은 데이터를 넣어줍니다.

```jsx
import { createContext, useState } from 'react';

const ThemeContext = createContext('light');

function App() {

  const [ theme, setTheme ] = useState('light');

  return (

    <ThemeContext.Provider value={theme}>

      {/* 하위 컴포넌트 */}

    </ThemeContext.Provider>

  );

}
```

이처럼 Provider로 하위 컴포넌트를 감싸면, 해당 트리 내 모든 컴포넌트에서 값을 쉽게 읽을 수 있습니다.

## 3. useContext 사용법 및 예시

함수형 컴포넌트 내에서 useContext(Context객체)를 호출하면 현재 Context 값을 직접 사용할 수 있습니다.

```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={`btn-${theme}`}>Click me</button>;
}
```

가장 가까운 상위 Provider의 value를 반환하고, Provider가 변하면 소비하는 컴포넌트도 자동으로 리렌더링됩니다.

## 4. Context 값 변경과 리렌더링

Provider의 value prop이 업데이트될 때마다 하위에서 해당 Context를 구독하는 컴포넌트들이 리렌더링됩니다. 불필요한 리렌더링을 막고 싶다면 React.memo, useMemo, useCallback 등 최적화 기술을 적용할 수 있습니다.

## 5. 여러 Context 병행 사용

여러 개의 Context를 중첩하여 사용할 수 있으며, 각각 필요한 Context에서 useContext를 호출합니다.

```jsx
const AgeContext = createContext(null);
const NameContext = createContext(null);

function App() {
  return (
    <AgeContext.Provider value="28">
      <NameContext.Provider value="홍길동">
        <Header />
      </NameContext.Provider>
    </AgeContext.Provider>
  );
}
```
Header 컴포넌트에서는 두 값을 동시에 읽을 수 있습니다:
```jsx
const age = useContext(AgeContext);
const user = useContext(NameContext);
```
## 6. 주의사항 및 팁

Context의 값이 자주 바뀌는 경우 전체 하위 트리가 리렌더될 수 있으므로, 규모가 크거나 복잡한 상태는 Redux 등 전문 상태관리 라이브러리와 함께 사용하는 것이 좋습니다.

useContext는 Provider 하위에서만 사용할 수 있고, 트리상 위치를 잘못 잡으면 에러나 기본값만 사용할 수 있습니다.

TypeScript 환경에선 Context 타입을 명확히 지정해 타입 안정성을 강화할 수 있습니다.

Context와 useContext는 상태를 '주입'할 뿐, 복잡한 파생 상태 관리/최적화 기능은 제공하지 않습니다.

Provider에 value prop을 빠뜨리면 undefined로 동작하며, 콘솔에 경고가 뜰 수 있습니다.

## 7. 활용 사례 (Redux, TypeScript, TailwindCSS, Supabase 등)

간단한 전역 상태(테마, 로그인 정보, 언어 등)는 Context로 관리하고, 복잡한 상태는 Redux로 분리하는 패턴이 좋습니다.

TypeScript로 개발 시 Context의 타입을 명확히 지정해 안전성을 높이고, 커스텀 훅에 활용할 수 있습니다.

TailwindCSS와 함께 배경/테마 등을 동적으로 관리하며, 여러 컴포넌트에서 스타일을 공유할 수 있습니다.

Supabase와 연계해서 인증 정보나 유저 데이터를 Context로 전파하면, 하위 컴포넌트에서 쉽게 사용할 수 있습니다.

## 8. 한줄 요약

React useContext는 컴포넌트 트리 전반에 걸쳐 데이터를 쉽게 공유하고 props drilling을 해소하는 핵심 Hook입니다. 전역 상태 관리가 필요한 부분엔 아주 편리하지만, 대형 상태나 빈번한 변경에는 Redux 등과 병행하는 것이 좋으니 상황에 따라 적절하게 선택해야 합니다.