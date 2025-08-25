# Vue Start

Vue 2 지원은 2023년 12월 31일 종료되었기에 Vue 3를 사용하겠습니다.

기본적인 셋팅은 npm create vite@latest를 이용해 vue, javascript를 이용해 간단한 셋팅을 진행했습니다.

## 싱글파일 컴포넌트

싱글 파일 컴포넌트(`*.vue`파일, SFC로 약칭)라는 HTML 유사 파일 형식을 사용해 Vue 컴포넌트를 작성해야합니다. Vue SFC는 이름 그대로 컴포넌트 로직(JavaScript), 템플릿(HTML), 스타일(CSS)을 하나의 파일에 캡슐화 합니다.

예시

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC는 Vue의 대표적인 기능이고, 빌드 설정이 필요할 경우엔 Vue 컴포넌트를 작성하는 권장 방식입니다.

## API 스타일

Vue 컴포넌트는 옵션 API와 컴포지션 API라는 두 가지 다른 API 스타일로 작성할 수 있습니다.

### 옵션 API

옵션 API에서는 data, methods, mounted와 같은 옵션 객체를 사용하여 컴포넌트의 로직을 정의합니다. 옵션으로 정의된 속성들은 함수 내부에서 this로 노출되며, 이는 컴포넌트 인스턴스를 가리킵니다.

```vue
<script>
export default {
  // data()에서 반환된 속성들은 반응형 상태가 되며
  // `this`로 노출됩니다.
  data() {
    return {
      count: 0
    }
  },

  // methods는 상태를 변경하고 업데이트를 트리거하는 함수입니다.
  // 템플릿에서 이벤트 핸들러로 바인딩할 수 있습니다.
  methods: {
    increment() {
      this.count++
    }
  },

  // 라이프사이클 훅은 컴포넌트의 생명주기
  // 각 단계에서 호출됩니다.
  // 이 함수는 컴포넌트가 마운트될 때 호출됩니다.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

data, method, mounted가 예전 react와 비슷하다고 느껴집니다.

`this.count`로 data의 count에 접근할수있고 

button의 `@click` 이벤트핸들러를 이용해 methods `increment`를 바인딩할수 있습니다.

`mounted()` 함수는 컴포넌트가 마운트 될 때 호출합니다.

### 컴포지션 API

컴포지션 API에서는 가져온 API 함수들을 사용하여 컴포너틑의 로직을 정의합니다.

SFC에서는 컴포지션 API를 `<script setup>`과 함께 사용하는것이 일반적입니다.
setup 속성은 Vue가 컴파일 타임 변환을 수행하도록 힌트를 주어, 컴포지션 API를 더 적은 보일러플레이트로 사용할 수 있게 해줍니다.

예를들어, `<script setup>` 에서 선언된 import와 최상위 변수/함수는 템플릿에서 바로 사용할 수 있습니다.

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 반응형 상태
const count = ref(0)

// 상태를 변경하고 업데이트를 트리거하는 함수
function increment() {
  count.value++
}

// 라이프사이클 훅
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

옵션 API 와 컴포지션 API 중 개인 프로젝트라면 본인에게 편한 스타일에 맞추거나 팀 프로젝트에서 결정된 부분에 맞춰 사용하시면 될것 같습니다.

개인적으로 저는 컴포지션 API가 친숙합니다.