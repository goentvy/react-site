# React Hook Error

```bash
React Hook "useForm" is called in function "index" that is neither a React function component nor a custom React Hook function. 

React component names must start with an uppercase letter. 

React Hook names must start with the word "use".eslintreact-hooks/rules-of-hooks
```

Shadcn UI를 사용하는 중 react-hook-form을 적용시키는 부분에서 만난 오류였다.

여러가지 component를 경유하며 작업을 하다보니 component의 네이밍을 파일명이 index.jsx라

function `index`() {} 에서 시작된 네이밍을 수정하지 않았던 문제였다.

해당 index는 react에서 규정한 첫글자 대문자 네이밍에 맞지않아 생긴거라고 보면 된다.

그렇기에 작업하는 컴포넌트는 로그인 페이지였기에 function `SignIn`() {} 로 네이밍을 수정하여 해결했다.