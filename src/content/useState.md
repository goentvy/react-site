# React useState Hook

## 1. 기본 사용법 및 원리

useState는 상태 변수와 해당 상태를 갱시할 함수를 배열 형태로 반환합니다.

초기값을 전달하여 선언하고, 상태 변경 시 set함수를 호출해서 값을 업데이트 합니다.

아래와 같은 형태가 가장 대표적입니다.

```jsx
import React, { useState } from 'react';

function Counter() {
    const [ count, setCount ] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

이렇게 선언하면 count가 상태값, setCount가 상태 갱신 함수입니다.

## 2. 이전 상태 기반 업데이트 예시

```jsx
function StepTracker() {
    const [ steps, setSteps ] = useState(0);

    function increment() {
        setSteps(prevSteps => prevSteps + 1);
    }
}
```

이처럼 이전 상태 값을 안전하게 참조해 변경하면 비동기적 상태 갱신에서도 문제가 없습니다.

## 3. 배열 상태 관리 예시

배열 상태는 불변성을 유지하며 전체를 복사해서 새로운 데이터를 넣는 방식으로 관리해야 합니다.

```jsx
function ListOfThings() {
    const [ items, setItems ] = useState();
    const [ itemName, setItemName ] = useState('');
    const addItem = e => {
        e.preventDefault();
        setItems();
        setItemName('');
    };
    // ...
}
```

배열을 그대로 수정하지 않고 spread 문법`()`을 사용해 새로운 배열을 만들어 업데이트 합니다.

## 4. 객체 상태 관리 예시

객체 역시 상태를 직접 변경하지 않고, 복사한 뒤 일부 필드만 덮어써야 합니다.

```jsx
function LoginForm() {
    const [ form, setForm ] = seState({ usename: '', password: '' });

    const updateField = e => {
        setForm(prevForm => ({
            ...prevForm,
            : e.target.value
        }));
    };
};
```

이와 같이 기존 객체를 복사 한 뒤(e.g. ...prevForm) 원하는 속성만 변경해야 다른 상태가 손상되지 않습니다.

## 5. 다양한 타입의 상태 변수 선언

숫자, 문자열, 배열, 객체 등 거의 모든 데이터 타입을 `useState`로 관리할 수 있으며,

독립적인 상태가 필요하면 각각 선언하면 됩니다.

## 6. 상태 관리와 Redux, TypeScript 연계

- Redux 기반 대형 프로젝트에서는 useState는 로컬 UI 상태(예: 입력값, 임시 토글 등)에 주로 사용됩니다.

- TypeScript를 쓸 때는 useState에 제네릭 타입을 명시해 타입 안정성을 높일 수 있습니다.

## 7. 주의할 점 및 활용 팁

- 상태 갱신 함수(set함수)는 비동기적으로 동작하며, 상태가 바뀌면 컴포넌트가 재렌더링됩니다.

- 직접 상태를 변경하지 말고 항상 새로운 객체/배열을 만들어 할당하세요.

- 복잡한 상태나 여러 상태 변수의 관계가 얽힌 케이스는 useReducer로 커버할 수 있습니다.

## 강의에서 추천할 예시

- **카운터**: 가장 기본적인 숫자 상태 관리 (위 1번 코드)

- **할 일 목록 또는 입력 폼**: 배열과 객체 상태 관리 (위 3,4번 코드)

- **토글 버튼 또는 show/hide**: boolean 상태 관리

- **이전값 기반 증가/감소 버튼**: 함수형 업데이트