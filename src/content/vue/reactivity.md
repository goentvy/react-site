# Vue Reactivity Fundamentals ( 반응성 기본 )

## 반응형 상태 선언하기

### `ref()`

Composition API에서는 ref() 함수를 사용해 반응형 상태를 선언하는 것이 권장됩니다.

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()`는 인자를 받아 `.value` 속성이 있는 ref 객체로 감싸 반환합니다.

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

컴포넌트의 템플릿에서 ref에 접근하려면, 컴포넌트의 `setup()` 함수에서 선언하고 반환해야 합니다.

```js
import { ref } from 'vue'

export default {
  // `setup`은 Composition API를 위한 특별한 훅입니다.
  setup() {
    const count = ref(0)

    // ref를 템플릿에 노출
    return {
      count
    }
  }
}
```

```html
<div>{{ count }}</div>
```

ref를 템플릿에서 사용할 때는 `.value`를 붙일 필요가 없습니다.

ref는 템플릿 내부에서 자동으로 언래핑됩니다.

이벤트 핸들러에서 ref를 직접 변경할 수 있습니다.

```html
<button @click="count++">
  {{ count }}
</button>
```

더 복잡한 로직의 경우, 같은 스코프에서 ref를 변경하는 함수를 선언하고 상태와 함께 메서드로 노출할 수 있습니다.

```js
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // JavaScript에서는 .value가 필요합니다
      count.value++
    }

    // 함수도 반드시 노출해야 합니다.
    return {
      count,
      increment
    }
  }
}
```

노출된 메서드는 이벤트 핸들러로 사용할 수 있습니다.

```html
<button @click="increment">
  {{ count }}
</button>
```

### `<script setup>`

`setup()`을 통해 상태와 메서드를 수동으로 노출하는 것은 다소 장황할 수 있습니다. 

다행히 **싱글 파일 컴포넌트(SFC)**를 사용할 때는 이를 피할 수 있습니다. 

`<script setup>`을 사용하면 더 간단하게 작성할 수 있습니다

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

`<script setup>`에서 선언된 최상위 import, 변수, 함수는 해당 컴포넌트의 템플릿에서 자동으로 사용할 수 있습니다. 

템플릿을 같은 스코프에 선언된 JavaScript 함수라고 생각하면, 

자연스럽게 함께 선언된 모든 것에 접근할 수 있습니다.