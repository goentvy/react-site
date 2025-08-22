# 프라미스 체이닝

콜백 챕터에서 언급한 문제를 다시 집어봅시다. 

스크립트를 불러오는 것과 같이 순차적으로 처리해야 하는 비동기 작업이 여러 개 있다고 가정해 봅시다. 

어떻게 해야 이런 상황을 코드로 풀어낼 수 있을까요?

프라미스를 사용하면 여러 가지 해결책을 만들 수 있습니다.

이번 챕터에선 프라미스 체이닝(promise chaining)을 이용한 비동기 처리에 대해 다루도록 하겠습니다.

프라미스 체이닝은 아래와 같이 생겼습니다.

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

프라미스 체이닝은 `result`가 `.then` 핸들러의 체인(사슬)을 통해 전달된다는 점에서 착안한 아이디어입니다.

위 예시는 아래와 같은 순서로 실행됩니다.

1초 후 최초 프라미스가 이행됩니다. – `(*)`

이후 첫번째 `.then` 핸들러가 호출됩니다. – `(**)`

2에서 반환한 값은 다음 `.then` 핸들러에 전달됩니다. – `(***)`

이런 과정이 계속 이어집니다.

`result`가 핸들러 체인을 따라 전달되므로, `alert` 창엔 `1`, `2`, `4`가 순서대로 출력됩니다.

프라미스 체이닝이 가능한 이유는 promise.then을 호출하면 프라미스가 반환되기 때문입니다. 

반환된 프라미스엔 당연히 .then을 호출할 수 있습니다.

한편 핸들러가 값을 반환할 때엔 이 값이 프라미스의 result가 됩니다. 

따라서 다음 .then은 이 값을 이용해 호출됩니다.

**초보자는 프라미스 하나에 .then을 여러 개 추가한 후, 이를 체이닝이라고 착각하는 경우가 있습니다. 하지만 이는 체이닝이 아닙니다.**

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

예시의 프라미스는 하나인데 여기에 등록된 핸들러는 여러 개 입니다. 

이 핸들러들은 result를 순차적으로 전달하지 않고 독립적으로 처리합니다.

동일한 프라미스에 등록된 .then 모두는 동일한 결과(프라미스의 result)를 받습니다. 

따라서 위 예시를 실행하면 얼럿 창엔 전부 1이 출력됩니다.

이런 식으로 한 프라미스에 여러 개의 핸들러를 등록해서 사용하는 경우는 거의 없습니다. 

프라미스는 주로 체이닝을 해서 씁니다.

## 프라미스 반환하기

.then(handler)에 사용된 핸들러가 프라미스를 생성하거나 반환하는 경우도 있습니다.

이 경우 이어지는 핸들러는 프라미스가 처리될 때까지 기다리다가 처리가 완료되면 그 결과를 받습니다.

예시:

```js
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

예시에서 첫 번째 .then은 1을 출력하고 new Promise(…)를 반환((*))합니다.

1초 후 이 프라미스가 이행되고 그 결과(resolve의 인수인 result * 2)는 두 번째 .then으로 전달됩니다. 

두 번째 핸들러((**))는 2를 출력하고 동일한 과정이 반복됩니다.

따라서 얼럿 창엔 이전 예시와 동일하게 1, 2, 4가 차례대로 출력됩니다.

다만 얼럿 창 사이에 1초의 딜레이가 생깁니다.

이렇게 핸들러 안에서 프라미스를 반환하는 것도 비동기 작업 체이닝을 가능하게 해줍니다.

## loadScript 예시 개선하기
지금까지 배운 기능을 사용해 이전 챕터에서 프라미스를 사용해 정의한 loadScript(스크립트를 순차적으로 불러줌)를 개선해 봅시다.

```js
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // 불러온 스크립트 안에 정의된 함수를 호출해
    // 실제로 스크립트들이 정상적으로 로드되었는지 확인합니다.
    one();
    two();
    three();
  });
```

화살표 함수를 사용하면 다음과 같이 코드를 줄일수도 있습니다.

```js
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // 스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있습니다.
    one();
    two();
    three();
  });
```

`loadScript를` 호출할 때마다 프라미스가 반환되고 다음 `.then`은 이 프라미스가 이행되었을 때 실행됩니다. 이후에 다음 스크립트를 로딩하기 위한 초기화가 진행됩니다. 스크립트는 이런 과정을 거쳐 순차적으로 로드됩니다.

체인에 더 많은 비동기 동작을 추가할 수도 있는데, 추가 작업이 많아져도 코드가 오른쪽으로 길어지지 않고 아래로만 증가해서 '멸망’의 피라미드가 만들어지지 않습니다.

한편, 아래와 같이 각 `loadScript`에 `.then`을 바로 붙일 수도 있습니다.

```js
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // 여기서 script1, script2, script3에 정의된 함수를 사용할 수 있습니다.
      one();
      two();
      three();
    });
  });
});
```

이렇게 .then을 바로 붙여도 동일한 동작(스크립트 세 개를 순차적으로 불러오는 작업)을 수행합니다. 

하지만 코드가 ‘오른쪽으로’ 길어졌네요. 

콜백에서 언급한 문제와 동일한 문제가 발생했습니다.

프라미스를 이제 막 배우기 시작해 체이닝에 대해 잘 모른다면 위와같이 코드를 작성할 수 있습니다. 

그러나 대개 체이닝이 선호됩니다.

중첩 함수에서 외부 스코프에 접근할 수 있기 때문에 .then을 바로 쓰는 게 괜찮은 경우도 있습니다. 

위 예제에서 가장 깊은 곳에 있는 중첩 콜백은 script1, script2, script3 안에 있는 변수 모두에 접근할 수 있습니다. 

이런 예외 상황이 있다는 정도만 알아두도록 합시다.

