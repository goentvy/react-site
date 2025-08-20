# Redux

## 1. Redux란?

Redux는 JavaScript 애플리케이션의 전역 상태를 예측 가능하고 효율적으로 관리하기 위한 라이브러리로, 특히 React와 자주 함께 쓰입니다​

애플리케이션의 모든 상태를 하나의 중앙 저장소(store)에 관리하면서 props drilling 문제를 해결해주고, 복잡한 앱에서도 구조적이고 유지보수가 쉬운 상태 관리가 가능합니다.

**Single Source of Truth (단일 진실의 원천)**: 모든 상태가 단 하나의 store에 집중적으로 저장됩니다.

**State is Read-Only (상태는 읽기 전용)**: 상태의 직접적인 변경은 불가하며, 반드시 액션(action)을 통해서만 변경이 이루어집니다.

**Changes are Made with Pure Functions (순수 함수로 상태 변경)**: 상태 변경 로직은 리듀서(reducer)라는 순수 함수에서 처리하며, 동일 입력에 동일 결과를 보장합니다.

## 2. Redux 주요 구성 요소

**액션(Action)**: 상태 변화 및 이벤트를 알리는 객체로, 반드시 type 속성을 포함하며 필요에 따라 payload로 추가 데이터를 담을 수 있습니다.

**액션 생성자(Action Creator)**: 액션 객체를 생성해주는 함수로, 코드를 더욱 명확하고 재사용 가능하게 만듭니다.

**리듀서(Reducer)**: 현재 상태와 액션을 받아 새로운 상태를 반환하는 순수 함수이며, 상태 관리의 핵심 로직을 담당합니다.

**스토어(Store)**: 애플리케이션 전역 상태를 저장하는 객체로, 모든 컴포넌트에서 접근 가능한 중앙 저장소 역할을 합니다.

**디스패치(Dispatch)**: 액션을 스토어에 전달하여 상태 변경을 요청하는 함수입니다.

**구독(Subscribe)**: 상태 변경 시 특정 함수를 호출하도록 등록하는 기능으로, 상태 업데이트에 따라 UI가 자동으로 변경됩니다.

## 3. React와 Redux 연동

React에서 Redux를 활용하려면 react-redux 라이브러리의 Provider로 앱을 감싸고 store를 props로 전달합니다

```jsx
import { Provider } from 'react-redux';
import store from './store';

<Provider store={store}>
  <App />
</Provider>
```

컴포넌트에서 Redux 상태를 사용하려면 useSelector(상태 조회)와 useDispatch(액션 발생) 훅을 활용합니다

```jsx
import { useSelector, useDispatch } from 'react-redux';

const count = useSelector(state => state.counter.value);
const dispatch = useDispatch();

<button onClick={() => dispatch(increment())}>+</button>
```

Redux의 전역 상태는 여러 컴포넌트에서 공유되어 props를 여러 단계로 전달하는 불편을 해소해줍니다.

## 4. Redux Toolkit

Redux Toolkit은 Redux에서 반복되는 상용구(boilerplate) 코드를 줄이고, 불변성 관리(immutable update)를 쉽고 안전하게 지원하는 공식 도구입니다.

createSlice를 통해 액션과 리듀서를 한 번에 정의할 수 있으며, 내부적으로 immer 라이브러리를 통해 불변성 관리를 자동화합니다.

아래 예시처럼 간결하게 slice와 reducer, 액션생성자를 정의할 수 있습니다

```jsx
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

configureStore로 여러 slice reducer를 결합해서 앱의 최상위 store를 쉽게 생성하며, 미들웨어(예: thunk, saga)도 간단하게 통합할 수 있습니다.

## 5. Redux 사용 시 장점

전역 상태를 한 곳에서 관리하여 props 전달(props drilling) 문제 및 복잡한 상태 흐름을 해결할 수 있습니다.

단방향 데이터 흐름으로 인해 예측 가능성과 디버깅이 우수합니다.

DevTools를 통한 디버깅·상태 모니터링, 미들웨어(Thunk/Saga 등)를 통한 비동기 작업 관리가 용이합니다.

코드가 구조적으로 관리되어 유지보수성이 높아집니다.

## 6. Redux 사용 시 주의사항

소규모 프로젝트에서는 Redux가 오히려 복잡성을 높이고, 코드량이 증가할 수 있으므로 필요에 따라 선택해야 합니다.

상태 빈번 변경 또는 복잡한 앱에서 특히 유용하며, 단일 컴포넌트에 국한된 간단한 상태는 React 자체의 useState/useContext로 관리하는 것이 적합합니다.

Redux의 기본 구조를 정확히 이해하고, 상태를 직접 수정하지 않도록 불변성 원칙을 반드시 지켜야 합니다.

## 7. Redux와 함께 사용하는 기술

TypeScript: Redux를 함께 활용하면 상태와 액션에 대한 타입을 명확하게 지정하여 코드의 안정성과 가독성을 높일 수 있습니다.

TailwindCSS: Redux 상태값에 따라 UI 스타일을 동적으로 변화시키거나, 여러 컴포넌트가 스타일 정보를 전역적으로 공유할 수 있습니다.

Supabase: 인증정보나 DB에서 가져온 데이터 등을 Redux 전역 상태로 관리하면 여러 컴포넌트에서 효율적으로 해당 정보를 활용할 수 있습니다.

## 8. 한줄 요약

Redux는 React 애플리케이션에서 전역 상태를 예측 가능하고 효율적으로 관리할 수 있게 해주는 라이브러리이며, Redux Toolkit을 활용하면 개발 생산성을 크게 향상시킬 수 있습니다.