# React useRef Hook

## 1. useRef란?

useRef는 React에서 DOM 요소에 직접 접근하거나, 리렌더링과 무관하게 값을 기억하고 관리할 수 있는 Hook입니다​. 클래스 컴포넌트의 createRef와 비슷하지만, 함수 컴포넌트에서 간편하게 사용할 수 있습니다. 사용법은 `const ref = useRef(initialValue)`처럼 객체를 생성하고, 반환값은 `{ current: 초기값 }` 구조를 가집니다

## 2. 주요 용도 및 개념

#### DOM 접근 및 조작

input 등 특정 요소에 포커스를 주거나 스크롤 위치 조작 등 직접적인 명령을 내릴 때 사용합니다.  

#### 렌더링과 무관한 값 저장

상태 값(state)처럼 변경에 따라 렌더링을 트리거하지 않고 값을 보관하는 용도로 활용할 수 있습니다.  

#### 이전 값 추적

이전 렌더링의 값을 저장해 컴포넌트 로직에서 활용하거나, 커스텀 Hook 등에서도 많이 사용됩니다.  

#### 타이머, 인터벌 관리

setInterval, setTimeout의 ID를 저장해 정지/초기화하는 등 다양한 이벤트 관리에 쓸 수 있습니다.

## 3. useRef vs useState

useState는 값이 변경되면 컴포넌트가 리렌더링되고 UI도 업데이트됩니다.  

useRef는 값을 변경해도 리렌더링되지 않으므로, 렌더링과 무관한 값을 저장하는 데 적합합니다.  

즉, 화면에 표현되는 값은 useState, 추적 용도나 DOM 조작은 useRef를 사용하는 것이 원칙입니다.

## 4. 기본 사용법 및 코드 예시

```jsx
import React, { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null); // 초기값 null

  const handleFocus = () => {
    inputRef.current.focus(); // input 요소에 직접 포커스
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus the input</button>
    </>
  );
}
```

위 예시처럼 ref 객체를 만들고, 원하는 JSX 요소의 ref 속성에 할당하면, ref.current로 실제 DOM에 접근할 수 있습니다.

## 5. 값 저장 및 추적 예시

```jsx
import React, { useRef } from "react";

function Counter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    console.log("Count:", countRef.current); // 값만 변경되고 리렌더링 없음
  };

  return <button onClick={increment}>Click me</button>;
}
```

## 6. DOM 조작 및 고급 활용

input 이외에도 div, textarea 등 다양한 요소의 스타일, 스크롤, 위치 등도 직접 변경할 수 있습니다.

커스텀 컴포넌트에 ref를 넘길 때는 forwardRef를 같이 활용해야 합니다.  

예외적으로 초기화 로직에서만 render 중 ref를 안전하게 다룰 수 있습니다.

## 7. 주의사항 및 팁

ref에 저장한 값을 직접 변경해도 화면(UI)에 바로 적용되지 않으니, 화면에 표현되는 값은 반드시 state로 관리하세요.

렌더링 중 (즉 함수 컴포넌트 실행 중)에는 ref를 읽거나 쓰는 코드는 예측 불가한 문제를 일으킬 수 있으므로 피해야 합니다.

Strict Mode 개발 환경에서는 ref 객체가 두 번 생성될 수 있으나, 실제 로직에는 영향이 없습니다.

불필요하게 남용하면 코드 가독성·유지보수성이 떨어질 수 있으니, 꼭 필요한 용도에만 사용하세요.

## 8. 실제 활용 사례 (Redux, TypeScript, UI 라이브러리 등)

Redux 기반 앱에서도 DOM 접근 또는 값 추적이 필요한 부분에는 그대로 사용 가능합니다.

TypeScript에서는 ref 객체의 타입을 명확히 지정할 수 있으니, 타입 안정성을 확보할 때 유리합니다.

Toast UI Editor, react-markdown 등 마크다운 에디터를 사용할 때도 ref를 활용해 DOM 접근 및 고급 기능을 구현할 수 있습니다.

TailwindCSS와 함께 ref로 동적으로 클래스나 스타일을 조작하는 응용도 가능합니다.

## 정리용 한줄 요약

React useRef는 렌더링과 무관하게 값을 저장하거나 DOM에 직접 접근·조작하는 용도로 사용하는 Hook입니다.

값 변경 시 리렌더링이 발생하지 않고, Redux, TypeScript, 마크다운 에디터 및 UI 최적화에도 폭넓게 활용할 수 있습니다.