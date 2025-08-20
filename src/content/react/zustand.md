# Zustand

## 1. Zustand란?

Zustand(‘상태’라는 독일어)는 React에서 간결하게 전역 상태를 관리할 수 있게 해주는 경량 상태 관리 라이브러리로, Context API 및 Hooks를 기반으로 동작하며 별도 Provider 없이도 store 중심으로 상태와 액션을 한데 모아 관리합니다​

Redux의 복잡한 구조와 비교해 API가 직관적이고 보일러플레이트가 거의 없어 개발이 매우 간편합니다

React, React Native, Next.js 등 다양한 환경에서 사용할 수 있으며 타입 안정성(TS), 미들웨어, 심지어 비동기처리까지 지원해 다양한 현대 웹/앱 개발에 최적화되어 있습니다

## 2. 주요 특징 및 장점

**단순&빠름**: create 함수를 통해 커스텀 훅 형태의 store를 만들고 필요에 따라 원하는 상태만 선택해서 구독, 업데이트합니다

**선택적 구독(Selector)**: useStore(state => state.count)와 같이 필요한 부분만 선택해 리렌더링을 최소화할 수 있습니다

**액션과 비동기 지원**: 상태 변경 함수(액션)를 자유롭게 store 내에 정의할 수 있고, 액션 내에 비동기 함수(async/await)도 자연스럽게 활용할 수 있습니다

**미들웨어 풍부**: persist(상태 지속), logging 등 다양한 미들웨어가 기본 지원되어 로컬스토리지 연동, 디버깅에 용이합니다

**TypeScript 친화**: 상태와 액션 타입을 명확하게 지정할 수 있어 타입 오류 방지가 쉬우며, 안정적인 대규모 개발에 적합합니다

**불필요한 리렌더링 최소화**: store의 특정 slice만 구독할 경우 해당 상태 변경에만 컴포넌트가 리렌더링되어 성능이 뛰어납니다

## 3. 기본 사용법

### 설치
`npm install zustand`

### store 생성 예시 (TypeScript)
```jsx
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### 컴포넌트에서 사용
```jsx
import useCounterStore from './useCounterStore';

function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### 4. 고급 활용법
**선택적 구독**: 필요 slice만 가져오면 불필요한 리렌더링을 방지(예: `useStore(state => state.count)`)

**비동기 액션**: store 내에 async 함수로 API 호출 후 set으로 갱신하는 패턴이 자연스럽게 지원됨

**상태 지속화(Persist)**: zustand/middleware의 persist 사용시 로컬스토리지 자동 연동이 가능함

**store 여러개 분할 관리**: 큰 앱에서 store를 여러 개로 분리 관리하며 필요하면 조합할 수 있음

### 5. To-Do 앱 예제
```jsx
import { create } from 'zustand';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const useTodoStore = create<TodoState>((set) => ({
  todos:,
  addTodo: (text) => set((state) => ({
    todos:,
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  })),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter(todo => todo.id !== id),
  })),
}));
```

### 6. 주요 개발 기술 연동

**TypeScript**: store 인터페이스로 상태 및 액션 타입을 정의해 안정성과 생산성을 높인다

**TailwindCSS**: Zustand 상태값 변화에 따라 동적으로 클래스명이나 스타일을 변경할 수 있어 UI/UX 연동이 자연스럽다

**Supabase**: 인증/DB 데이터 등의 상태를 store에서 전역 관리, 여러 컴포넌트가 효율적으로 참조할 수 있다

### 7. Redux와 비교/장점

훨씬 적은 보일러플레이트(Provider, reducer, action 만들 필요 없음)

전역적으로 상태 관리하면서 필요 slice만 구독해서 리렌더링 최소화(성능 이점 큼)

비동기 액션, 미들웨어, TS 타입 등은 기본 지원되어 대규모/복잡앱에도 무리 없이 확장함

React Native, Next.js 등 다양한 환경에서 바로 적용 가능

### 8. 사용 시 주의점

대형 앱에서는 store 구조를 잘 설계하고, 상태 불변성 원칙을 지키는 습관 필요

모든 상태를 한 store에 몰아넣지 말고, 주제별로 분리하여 관리하면 유지보수가 편하다

구독(Selector) 실수로 불필요하게 많은 상태를 한꺼번에 구독하지 않게 주의

상태 구조나 액션을 흔히 타입으로 명확하게 관리하는 게 좋다

### 9. 한줄 요약

Zustand는 React와 TypeScript 환경에서 간결하고, 확장성/성능에 강점을 가진 현대적인 전역 상태 관리 솔루션입니다. 사용이 쉽고, TailwindCSS·Supabase 등 다양한 기술과 자연스럽게 결합할 수 있습니다.