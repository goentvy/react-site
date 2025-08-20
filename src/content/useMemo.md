# React useMemo Hook

## 1. useMemo란?

useMemo는 React에서 컴포넌트의 성능을 최적화하는 데 사용되는 훅이며,

memo는 memoization(메모이제이션)이라는 개념에서 유래되었다​.

메모이제이션은 이전에 계산한 값을 메모리에 저장해 동일한 계산을 반복하지 않도록 하여,

불필요한 재계산을 막는 효율적인 기술이다. 

즉, useMemo는 상태(state)나 props 등 의존성 배열에 명시한 값이 변경될 때만 내부 함수를 다시 실행해서 결과 값을 메모리에서 반환한다

## 2. 기본 사용법
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b),);
```
첫 번째 인자로 순수한 계산 함수를 넣고, 두 번째 인자로 해당 값이 변할 때만 함수를 실행하도록 하는 의존성 배열을 전달한다. 의존성 배열을 누락하면 컴포넌트가 리렌더링될 때마다 함수가 다시 실행된다. 주로 비용이 많이 드는 작업(복잡한 계산, 대용량 배열의 필터링 등)에 적용하면 좋다

## 3. 동작 원리

컴포넌트가 렌더링될 때마다 useMemo는 현재 의존성과 이전 의존성(Object.is로 비교) 값을 확인한다. 만약 변경이 없으면, 기존에 메모해둔 값을 반환하여 추가 계산을 건너뛴다. 변경이 있다면, 함수를 다시 실행해서 값도 메모에 덮어쓴 뒤, 새 값을 반환한다. 이때 내부적으로는 useMemo마다 캐시(저장소)가 유지되어 효과적으로 값의 재사용을 관리한다

## 4. 사용 예시
비용이 큰 함수를 최적화할 때 주로 사용한다. 예를 들어 복잡한 수학 계산, 대용량 배열 데이터의 변환, 필터링 등에서 리렌더링 시 불필요한 연산을 방지하는 용도로 활용된다. 의존성 배열에는 상태(state), props, 혹은 컴포넌트 내부에서 선언한 값 등을 넣는다.  

아래는 간단한 예시이다.

```jsx
import React, { useState, useMemo } from 'react';

function hardCalculate(number) {
  console.log('어려운 계산!');
  for (let i = 0; i < 99999999; i++) {} // 시간 소모
  return number + 10000;
}

function App() {
  const [ hardNumber, setHardNumber ] = useState(1);
  const [ easyNumber, setEasyNumber ] = useState(1);

  // 비용이 큰 계산은 useMemo로 감싼다
  const hardSum = useMemo(() => hardCalculate(hardNumber),);
  // 쉬운 계산은 메모이제이션 필요 없음
  const easySum = easyCalculate(easyNumber);

  return (
    <>
      <input value={hardNumber} onChange={e => setHardNumber(parseInt(e.target.value))} />
      <div>어려운 계산 결과: {hardSum}</div>
      <input value={easyNumber} onChange={e => setEasyNumber(parseInt(e.target.value))} />
      <div>쉬운 계산 결과: {easySum}</div>
    </>
  );
}
```

## 5. useMemo와 useCallback 차이

useMemo는 값(함수의 실행 결과)을 메모이제이션하며, useCallback은 함수 자체를 메모이제이션한다. 이벤트 핸들러 함수나 자식 컴포넌트에 함수를 props로 넘길 때 useCallback을 권장하고, 비용이 큰 계산의 결과 값은 useMemo가 적합하다. 둘 다 두 번째 인자로 의존성 배열을 명시해 사용한다.

## 6. 주의사항 및 팁

useMemo를 과도하게 쓰면 코드 복잡도가 높아지고 가독성이 떨어질 수 있다.

불필요하게 많은 값을 메모하면 메모리 점유율이 올라가 오히려 성능 저하를 유발할 수 있으니 꼭 필요한 곳만 사용해야 한다.

useMemo 내부 함수는 반드시 순수 함수(부수 효과 없음)이어야 하며, prop이나 상태 값을 변경하면 안 된다.

반복문(예: map) 또는 조건문 안에서는 useMemo를 사용할 수 없으므로, 반복되는 항목은 개별 컴포넌트로 분리해 최상위에서 useMemo를 활용한다.

React의 Strict Mode에서는 개발 중 계산 함수를 두 번 실행하니 주의한다(프로덕션 환경에는 영향 없음)

## 7. 성능 최적화 사례

리렌더링 시 불필요한 고비용 계산을 줄여 렌더링 시간을 단축할 수 있다.

자식 컴포넌트에 동일한 props(예: 배열 데이터)를 전달해 불필요한 재렌더링을 방지할 수 있다.

useMemo로 객체나 배열을 메모이제이션하면 참조가 유지되어 최적화에 도움이 된다.

여러 Hook의 종속성을 효율적으로 관리할 때도 활용 가능하다

## 8. 예제 코드

```jsx
import { useState, useMemo } from 'react';

function hardCalculate(number) {
  console.log('어려운 계산!');
  for (let i = 0; i < 99999999; i++) {}
  return number + 10000;
}

function App() {
  const [ hardNumber, setHardNumber ] = useState(1);
  const [ easyNumber, setEasyNumber ] = useState(1);

  const hardSum = useMemo(() => hardCalculate(hardNumber),);
  const easySum = easyCalculate(easyNumber); // 쉬운 계산은 메모이제이션 필요 없음

  return (
    <>
      <input value={hardNumber} onChange={e => setHardNumber(parseInt(e.target.value))} />
      <div>어려운 계산 결과: {hardSum}</div>
      <input value={easyNumber} onChange={e => setEasyNumber(parseInt(e.target.value))} />
      <div>쉬운 계산 결과: {easySum}</div>
    </>
  );
}
```