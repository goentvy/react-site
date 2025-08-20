# React useCallback Hook

React의 `useCallback` 훅은 컴포넌트가 리렌더링 될 때 함수가 불필요하게 새로 생성되는 현상을 방지해 성능을 최적화하는 데 중요한 역할을 합니다.​

## 예시 1: 버튼 클릭 핸들러를 useCallback으로 최적화

```jsx
import { useState, useCallback } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  // useCallback으로 함수 메모이제이션
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  },[]); // 빈 배열: 컴포넌트 최초 마운트 시 한 번만 함수 생성

  return (
    <div className="p-4">
      <p className="text-lg font-semibold">Count: {count}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={increment}
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
```

이 방식은 increment 함수가 컴포넌트가 리렌더링될 때마다 다시 생성되는 것을 막아주며, props로 하위 컴포넌트에 전달할 때 특히 유용합니다.

## 예시 2: 자식 컴포넌트에게 콜백 함수 전달

```jsx
import { useState, useCallback } from 'react';

interface ButtonProps {
  onClick: () => void;
}

const ChildButton: React.FC<ButtonProps> = React.memo(({ onClick }) => {
  console.log('ChildButton 렌더링');
  return (
    <button
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      onClick={onClick}
    >
      Click me
    </button>
  );
});

const Parent = () => {
  const [ count, setCount ]= useState(0);

  // useCallback으로 handleClick 함수 고정
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  },);

  return (
    <div className="p-4">
      <p className="mb-2">Count: {count}</p>
      <ChildButton onClick={handleClick} />
    </div>
  );
};

export default Parent;
```

ChildButton은 React.memo로 감싸져, onClick 함수가 바뀌지 않는 한 리렌더링 되지 않습니다. 이렇게 useCallback으로 콜백을 고정하면 불필요한 렌더링을 방지할 수 있습니다.

## 참고
- useCallback은 주로 props로 함수(콜백)를 하위 컴포넌트에 전달할 때, 불필요한 함수 재생성 및 리렌더링을 막고자 사용할 수 있습니다.

- 의존성 배열(dependencies)에 컴포넌트의 state나 props를 추가하면, 해당 값이 변경될 때만 함수가 새로 만들어집니다.