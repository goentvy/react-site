# 소비자: then, catch, finally

프라미스 객체는 executor(‘제작 코드’ 혹은 ‘가수’)와 결과나 에러를 받을 소비 함수(‘팬’)를 이어주는 역할을 합니다. 

소비함수는 .then, .catch, .finally 메서드를 사용해 등록(구독)됩니다.

## then

.then은 프라미스에서 가장 중요하고 기본이 되는 메서드입니다.

문법은 다음과 같습니다.

```js
promise.then(
  function(result) { /* 결과(result)를 다룹니다 */ },
  function(error) { /* 에러(error)를 다룹니다 */ }
);
```
.then의 첫 번째 인수는 프라미스가 이행되었을 때 실행되는 함수이고, 여기서 실행 결과를 받습니다.

.then의 두 번째 인수는 프라미스가 거부되었을 때 실행되는 함수이고, 여기서 에러를 받습니다.

아래 예시는 성공적으로 이행된 프라미스에 어떻게 반응하는지 보여줍니다.

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("완료!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  result => alert(result), // 1초 후 "완료!"를 출력
  error => alert(error) // 실행되지 않음
);
```

첫 번째 함수가 실행되었습니다.

프라미스가 거부된 경우에는 아래와 같이 두 번째 함수가 실행됩니다.

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// reject 함수는 .then의 두 번째 함수를 실행합니다.
promise.then(
  result => alert(result), // 실행되지 않음
  error => alert(error) // 1초 후 "Error: 에러 발생!"을 출력
);
```

작업이 성공적으로 처리된 경우만 다루고 싶다면 .then에 인수를 하나만 전달하면 됩니다.

```js
let promise = new Promise(resolve => {
  setTimeout(() => resolve("완료!"), 1000);
});

promise.then(alert); // 1초 뒤 "완료!" 출력
```

## catch

에러가 발생한 경우만 다루고 싶다면 .then(null, errorHandlingFunction)같이 null을 첫 번째 인수로 전달하면 됩니다. 

.catch(errorHandlingFunction)를 써도 되는데, .catch는 .then에 null을 전달하는 것과 동일하게 작동합니다.

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력
```

.catch(f)는 문법이 간결하다는 점만 빼고 .then(null,f)과 완벽하게 같습니다.

## finally

try {...} catch {...}에 finally 절이 있는 것처럼, 프라미스에도 finally가 있습니다.

프라미스가 처리되면(이행이나 거부) f가 항상 실행된다는 점에서 .finally(f) 호출은 .then(f, f)과 유사합니다.

쓸모가 없어진 로딩 인디케이터(loading indicator)를 멈추는 경우같이, 결과가 어떻든 마무리가 필요하면 finally가 유용합니다.

사용법은 아래와 같습니다.

```js
new Promise((resolve, reject) => {
  /* 시간이 걸리는 어떤 일을 수행하고, 그 후 resolve, reject를 호출함 */
})
  // 성공·실패 여부와 상관없이 프라미스가 처리되면 실행됨
  .finally(() => 로딩 인디케이터 중지)
  .then(result => result와 err 보여줌 => error 보여줌)
```

그런데 finally는 .then(f, f)과 완전히 같진 않습니다. 차이점은 다음과 같습니다.

1. finally 핸들러엔 인수가 없습니다. finally에선 프라미스가 이행되었는지, 거부되었는지 알 수 없습니다. finally에선 절차를 마무리하는 ‘보편적’ 동작을 수행하기 때문에 성공·실패 여부를 몰라도 됩니다.

2. finally 핸들러는 자동으로 다음 핸들러에 결과와 에러를 전달합니다. result가 finally를 거쳐 then까지 전달되는 것을 확인해봅시다.

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000)
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음
```

프라미스에서 에러가 발생하고 이 에러가 finally를 거쳐 catch까지 전달되는 것을 확인해봅시다.

```js
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음
```

finally는 프라미스 결과를 처리하기 위해 만들어 진 게 아닙니다. 

프라미스 결과는 finally를 통과해서 전달되죠. 

이런 특징은 아주 유용하게 사용되기도 합니다.

프라미스 체이닝과 핸들러 간 결과 전달에 대해선 다음 챕터에서 더 이야기 나누도록 하겠습니다.

3. .finally(f)는 함수 f를 중복해서 쓸 필요가 없기 때문에 .then(f, f)보다 문법 측면에서 더 편리합니다.

#### 처리된 프라미스의 핸들러는 즉각 실행됩니다.
프라미스가 대기 상태일 때, .then/catch/finally 핸들러는 프라미스가 처리되길 기다립니다. 

반면, 프라미스가 이미 처리상태라면 핸들러가 즉각 실행됩니다.

```js
// 아래 프라미스는 생성과 동시에 이행됩니다.
let promise = new Promise(resolve => resolve("완료!"));

promise.then(alert); // 완료! (바로 출력됨)
```

가수와 팬, 구독리스트 시나리오보다 프라미스가 더 복잡하다고 말한 이유가 바로 이런 기능 때문입니다. 

가수가 신곡을 발표한 이후에 구독 리스트에 이름을 올리는 팬은 신곡 발표 여부를 알 수 없습니다. 

구독 리스트에 이름을 올리는 것이 선행되어야 새로운 소식을 받을 수 있기 때문이죠.

그런데 프라미스는 핸들러를 언제든 추가할 수 있다는 점에서 구독리스트 시나리오보다 더 유연합니다. 

결과가 나와 있는 상태에서도 핸들러를 등록하면 결과를 바로 받을 수 있습니다.

이제 실제 동작하는 예시를 보며 프라미스로 어떻게 비동기 동작을 처리하는지 살펴봅시다.

## 예시: loadScript
이전 챕터에서 스크립트 로딩에 사용되는 함수 loadScript를 작성해 보았습니다.

복습 차원에서 콜백 기반으로 작성한 함수를 다시 살펴봅시다.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}
```

이제 프라미스를 이용해 함수를 다시 작성해 봅시다.

새로운 함수에선 콜백 함수 대신, 스크립트 로딩이 완전히 끝났을 때 이행되는 프라미스 객체를 만들고, 

이를 반환해 보겠습니다. 외부 코드에선 .then을 이용해 핸들러(구독 함수)를 더하겠습니다.

```js
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}
```
사용법은 다음과 같습니다.

```js
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src}을 불러왔습니다!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('또다른 핸들러...'));
```

프라미스를 사용한 코드가 콜백 기반 코드보다 더 나은 점을 정리하면 다음과 같습니다.


**프라미스**
프라미스를 이용하면 흐름이 자연스럽습니다. 

`loadScript(script)`로 스크립트를 읽고, 결과에 따라 그다음(`.then`)에 

무엇을 할지에 대한 코드를 작성하면 됩니다.

**콜백**
`loadScript(script, callback)`를 호출할 때, 함께 호출할 `callback` 함수가 준비되어 있어야 합니다. `loadScript`를 호출하기 이전에 호출 결과로 무엇을 할지 미리 알고 있어야 합니다.

프라미스에 원하는 만큼 `.then`을 호출할 수 있습니다. `.then`을 호출하는 것은 새로운 ‘팬’(새로운 구독 함수)을 '구독 리스트’에 추가하는 것과 같습니다. 자세한 내용은 **프라미스 체이닝**에서 다루겠습니다.

프라미스를 사용하면 흐름이 자연스럽고 유연한 코드를 작성할 수 있습니다. 

이 외에도 더 많은 장점이 있는데, 다음 챕터에서 더 살펴보겠습니다.