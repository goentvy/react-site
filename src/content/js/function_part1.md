# 함수(Function) Part 1

## 함수선언

함수선언(funciton declaration) 방식을 이용하면 함수를 만들 수 있습니다.

함수 선언 방식은 함수 선언문이라고 부르기도 합니다.

함수 선언 방식은 아래와 같이 작성할 수 있습니다.

```js
function showMessage() {
    alert('안녕하세요!');
}
```

function 키워드, 함수 이름, 괄호로 둘러싼 매개변수를 차례로 써주면 함수를 선언할 수 있습니다. 

위 함수에는 매개변수가 없는데, 만약 매개변수가 여러개 있다면 각 매개변수를 콤마로 구분해 줍니다. 

이어서 함수를 구성하는 코드의 모임인 '함수 본문(body)'을 중괄호로 감싸 붙여줍시다.

```js
function name(parameter1, parameter2, ...parameter) {
    // 함수본문
}
```

새롭게 정의한 함수는 함수 이름 옆에 괄호를 붙여 호출할 수 있습니다.
`showMessage()` 같이 말이죠.

```js
function showMessage() {
    alert('안녕하세요!');
}

showMessage();
showMessage();
```

`showMessage()`로 함수를 호출하면 함수 본문이 실행됩니다. 

위 예시에선 showMessage를 두 번 호출했으므로 얼럿 창이 두번 뜹니다.

함수의 주요 용도 중 하나는 중복 코드 피하기입니다. 위 예시를 통해 이를 확인해 보았습니다.

얼럿 창에 보여줄 메시지를 바꾸거나 메시지를 보여주는 방식 자체를 변경하고싶다면, 

함수 본문 중 출력에 관여하는 코드 딱 하나만 수정해주면 됩니다.

## 지역 변수

함수 내에서 선언한 변수인 지역 변수(local variable)는 함수 안에서만 접근할 수 있습니다.

```js
function showMessage() {
  let message = "안녕하세요!"; // 지역 변수

  alert( message );
}

showMessage(); // 안녕하세요!

alert( message ); // ReferenceError: message is not defined (message는 함수 내 지역 변수이기 때문에 에러가 발생합니다.)
```

## 외부 변수

함수 내부에서 함수 외부의 변수인 외부 변수(outer variable)에 접근할 수 있습니다.

```js
let userName = 'John';

function showMessage() {
  let message = 'Hello, ' + userName;
  alert(message);
}

showMessage(); // Hello, John
```

함수에선 외부 변수에 접근하는 것뿐만 아니라, 수정도 할 수 있습니다.

```js
let userName = 'John';

function showMessage() {
  userName = "Bob"; // (1) 외부 변수를 수정함

  let message = 'Hello, ' + userName;
  alert(message);
}

alert( userName ); // 함수 호출 전이므로 John 이 출력됨

showMessage();

alert( userName ); // 함수에 의해 Bob 으로 값이 바뀜
```

외부 변수는 지역 변수가 없는 경우에만 사용할 수 있습니다.

함수 내부에 외부 변수와 동일한 이름을 가진 변수가 선언되었다면, 내부 변수는 외부 변수를 가립니다. 

예시를 살펴봅시다. 

함수 내부에 외부 변수와 동일한 이름을 가진 지역 변수 `userName`가 선언되어 있습니다. 

외부 변수는 내부 변수에 가려져 값이 수정되지 않았습니다.

```js
let userName = 'John';

function showMessage() {
  let userName = "Bob"; // 같은 이름을 가진 지역 변수를 선언합니다.

  let message = 'Hello, ' + userName; // Bob
  alert(message);
}

// 함수는 내부 변수인 userName만 사용합니다,
showMessage();

alert( userName ); // 함수는 외부 변수에 접근하지 않습니다. 따라서 값이 변경되지 않고, John이 출력됩니다.
```

## 전역 변수

위 예시의 userName처럼, 함수 외부에 선언된 변수는 전역 변수(global variable) 라고 부릅니다.

전역 변수는 같은 이름을 가진 지역 변수에 의해 가려지지만 않는다면 모든 함수에서 접근할 수 있습니다.

변수는 연관되는 함수 내에 선언하고, 전역 변수는 되도록 사용하지 않는 것이 좋습니다. 

비교적 근래에 작성된 코드들은 대부분 전역변수를 사용하지 않거나 최소한으로만 사용합니다. 

다만 프로젝트 전반에서 사용되는 데이터는 전역 변수에 저장하는 것이 유용한 경우도 있으니 이 점을 알아두시기 바랍니다.

## 매개 변수

매개변수(parameter)를 이용하면 임의의 데이터를 함수 안에 전달할 수 있습니다.

매개변수는 인자(parameter) 라고 불리기도 합니다.

아래 예시에서 함수 showMessage는 매개변수 from 과 text를 가집니다.

```js
function showMessage(from, text) { // 인자: from, text
  alert(from + ': ' + text);
}

showMessage('Ann', 'Hello!'); // Ann: Hello! (*)
showMessage('Ann', "What's up?"); // Ann: What's up? (**)
```

`(*)`, `(**)`로 표시한 줄에서 함수를 호출하면, 함수에 전달된 인자는 지역변수 `from`과 `text`에 복사됩니다. 

그 후 함수는 지역변수에 복사된 값을 사용합니다.

예시 하나를 더 살펴봅시다. 전역 변수 `from`이 있고, 이 변수를 함수에 전달하였습니다. 

함수가 `from`을 변경하지만, 변경 사항은 외부 변수 `from`에 반영되지 않았습니다. 

함수는 언제나 복사된 값을 사용하기 때문입니다.

```js
function showMessage(from, text) {

  from = '*' + from + '*'; // "from"을 좀 더 멋지게 꾸며줍니다.

  alert( from + ': ' + text );
}

let from = "Ann";

showMessage(from, "Hello"); // *Ann*: Hello

// 함수는 복사된 값을 사용하기 때문에 바깥의 "from"은 값이 변경되지 않습니다.
alert( from ); // Ann
```

함수의 매개변수에 전달된 값을 *인수(argument)*라고 부르기도 합니다.

더 정확한 이해를 돕기 위해 용어를 다시 한번 정리해볼까요?

매개변수는 함수 선언 방식 괄호 사이에 있는 변수입니다(선언 시 쓰이는 용어).

인수는 함수를 호출할 때 매개변수에 전달되는 값입니다(호출 시 쓰이는 용어).

즉, 함수 선언 시 매개변수를 나열하게 되고, 함수를 호출할 땐 인수를 전달해 호출합니다.

위 예에서 함수 `showMessage`는 `from`과 `text`라는 두 매개변수를 사용해 선언되었고, 

그 후 호출 시엔 `from`, `Hello`라는 두 인수를 사용해 호출되었습니다.

## 기본값

함수 호출 시 매개변수에 인수를 전달하지 않으면 그 값은 `undefined`가 됩니다.

예시를 통해 이에 대해 알아봅시다. 위에서 정의한 함수 `showMessage(from, text)`는 매개변수가 2개지만, 

아래와 같이 인수를 하나만 넣어서 호출할 수 있습니다.

```js
showMessage("Ann");
```

이렇게 코드를 작성해도 에러가 발생하지 않습니다. 

두 번째 매개변수에 값을 전달하지 않았기 때문에 text엔 undefined가 할당될 뿐입니다. 

따라서 에러 없이 "Ann: undefined"가 출력됩니다.

매개변수에 값을 전달하지 않아도 그 값이 undefined가 되지 않게 하려면 

함수를 선언할 때 =를 사용해 '기본값(default value)'을 설정해주면 됩니다.

```js
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

이젠 text가 값을 전달받지 못해도 undefined 대신 기본값 "no text given"이 할당됩니다.

매개변수에 값을 전달해도 그 값이 undefined와 엄격히 일치한다면 기본값이 할당됩니다.

```js
showMessage("Ann", undefined); // Ann: no text given
```

위 예시에선 문자열 "no text given"을 기본값으로 설정했습니다. 

하지만 아래와 같이 복잡한 표현식도 기본값으로 설정할 수도 있습니다.

```js
function showMessage(from, text = anotherFunction()) {
  // anotherFunction()은 text값이 없을 때만 호출됨
  // anotherFunction()의 반환 값이 text의 값이 됨
}
```

#### 매개변수 기본값 평가 시점
자바스크립트에선 함수를 호출할 때마다 매개변수 기본값을 평가합니다. 

물론 해당하는 매개변수가 없을 때만 기본값을 평가하죠.

위 예시에선 매개변수 text에 값이 전달되는 경우 anotherFunction()은 호출되지 않습니다.

반면 text에 값이 없는 경우 showMessage()를 호출할 때마다 anotherFunction()이 호출됩니다.

#### 구식 자바스크립트에서 매개변수 기본값 설정하는 방법
몇 년 전만 해도 자바스크립트엔 매개변수 기본값 관련 구문이 없었습니다. 

그래서 매개변수 기본값을 설정하려면 다른 방법을 사용해야만 했죠.

요즘에도 오래된 스크립트를 보다 보면 매개변수 기본값 설정 관련 코드를 접할 수 있습니다.

구식 코드에서는 매개변수 기본값 설정을 위해 먼저 매개변수 값이 undefined인지 명시적으로 확인하고, 

일치하는 경우엔 기본값을 설정합니다.

```js
function showMessage(from, text) {
  if (text === undefined) {
    text = 'no text given';
  }

  alert( from + ": " + text );
}
```
이 방법 말고도 논리 연산자 ||를 사용해 매개변수 기본값을 설정하는 방법도 있습니다.

```js
function showMessage(from, text) {
  // text의 값이 falsy면 기본값이 할당됨
  // 이 방식은 text == ""일 경우, text에 값이 전달되지 않은것과 같다고 간주합니다..
  text = text || 'no text given';
  ...
}
```

#### 매개변수 기본값을 설정할 수 있는 또 다른 방법
가끔은 함수를 선언할 때가 아닌 함수 선언 후에 매개변수 기본값을 설정하는 것이 적절한 경우도 있습니다.

이런 경우엔 함수를 호출할 때 매개변수를 undefined와 비교하여 매개변수가 전달되었는지를 확인합니다.

```js
function showMessage(text) {
  // ...

  if (text === undefined) { // 매개변수가 생략되었다면
    text = '빈 문자열';
  }

  alert(text);
}

showMessage(); // 빈 문자열
```
이렇게 if문을 쓰는 것 대신 논리 연산자 ||를 사용할 수도 있습니다.

```js
// 매개변수가 생략되었거나 빈 문자열("")이 넘어오면 변수에 '빈 문자열'이 할당됩니다.
function showMessage(text) {
  text = text || '빈 문자열';
  ...
}
```
이 외에도 모던 자바스크립트 엔진이 지원하는 nullish 병합 연산자(nullish coalescing operator) ??를 사용하면 0처럼 falsy로 평가되는 값들을 일반 값처럼 처리할 수 있어서 좋습니다.

```js
// 매개변수 'count'가 `undefined` 또는 `null`이면 'unknown'을 출력해주는 함수
function showCount(count) {
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

## 반환 값

함수를 호출했을 때 함수를 호출한 그곳에 특정 값을 반환하게 할 수 있습니다. 

이때 이 특정 값을 반환 값(return value)이라고 부릅니다.

인수로 받은 두 값을 더해주는 간단한 함수를 만들어 반환 값에 대해 알아보도록 하겠습니다.

```js
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

지시자 `return`은 함수 내 어디서든 사용할 수 있습니다. 

실행 흐름이 지시자 `return`을 만나면 함수 실행은 즉시 중단되고 함수를 호출한 곳에 값을 반환합니다. 

위 예시에선 반환 값을 result에 할당하였습니다.

아래와 같이 함수 하나에 여러 개의 `return`문이 올 수도 있습니다.

```js
function checkAge(age) {
  if (age >= 18) {
    return true;
  } else {
    return confirm('보호자의 동의를 받으셨나요?');
  }
}

let age = prompt('나이를 알려주세요', 18);

if ( checkAge(age) ) {
  alert( '접속 허용' );
} else {
  alert( '접속 차단' );
}
```

아래와 같이 지시자 `return`만 명시하는 것도 가능합니다. 이런 경우는 함수가 즉시 종료됩니다.

```js
function showMovie(age) {
  if ( !checkAge(age) ) {
    return;
  }

  alert( "영화 상영" ); // (*)
  // ...
}
```

위 예시에서, `checkAge(age)`가 `false`를 반환하면, `(*)`로 표시한 줄은 실행이 안 되기 때문에 

함수 `showMovie`는 얼럿 창을 보여주지 않습니다.

#### return문이 없거나 return 지시자만 있는 함수는 undefined를 반환합니다.
`return`문이 없는 함수도 무언가를 반환합니다. `undefined`를 반환하죠.

```js
function doNothing() { /* empty */ }

alert( doNothing() === undefined ); // true
```

return 지시자만 있는 경우도 undefined를 반환합니다. 

return은 return undefined와 동일하게 동작하죠.

```js
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

#### return과 값 사이에 절대 줄을 삽입하지 마세요.
반환하려는 값이 긴 표현식인 경우, 아래와 같이 지시자 return과 반환하려는 값 사이에

새 줄을 넣어 코드를 작성하고 싶을 수도 있습니다.

```js
return
 (some + long + expression + or + whatever * f(a) + f(b))
```

자바스크립트는 return문 끝에 세미콜론을 자동으로 넣기 때문에 이렇게 return문을 작성하면 안 됩니다.

위 코드는 아래 코드처럼 동작합니다.

```js
return;
 (some + long + expression + or + whatever * f(a) + f(b))
```

따라서 반환하고자 했던 표현식을 반환하지 못하고 아무것도 반환하지 않는 것처럼 되어버립니다.

표현식을 여러 줄에 걸쳐 작성하고 싶다면 표현식이 return 지시자가 있는 줄에서 시작하도록 작성해야 합니다. 

또는 아래와 같이 여는 괄호를 return 지시자와 같은 줄에 써줘도 괜찮습니다.

```js
return (
  some + long + expression
  + or +
  whatever * f(a) + f(b)
)
```
이렇게 하면 의도한 대로 표현식을 반환할 수 있습니다.