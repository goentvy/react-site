# Zod Schema 기본설정

## 1. 설치방법
```bash
Bash
npm install zod
```

## 2. 기본 스키마 정의
```ts
import { z } from 'zod';

const userSchma = z.object({
    name: z.string(),
    age: z.number().min(18), // 최소 18세
});
```
이렇게 하면 name은 문자열, age는 숫자이며 18 이상이어야 한다는 조건을 만듭니다.

## 3. 데이터 검증
```ts
try {
    const user = userSchema.parse({ name: "홍길동", age: 25 });
    console.log("유효한 데이터: ", user);
} catch(error) {
    console.error("유효성 검사 실패:", error);
}
```
`parse()`는 유효하지 않으면 예외를 던집니다.

예외 없이 결과만 확인하고 싶다면 `safeParse()`를 사용하면 됩니다.

```ts
const result = userSchema.safeParse({ name: "홍길동", age: 15 });
if(result.success) {
    console.log("유효한 데이터: ", result.data);
} else {
    console.log("검증 실패: ", result.error);
}
```

## 4. 다양한 타입 지원
```ts
z.string() // 문자열
z.number() // 숫자
z.boolean() // 불리언
z.date() // 날짜
z.literal("hi") // 특정 값
z.union([z.string(), z.number()]) // 문자열 또는 숫자
```

## 5. 객체 조작
```ts
const userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(2).max(30),
    email: z.string().email(),
    website: z.string().url().optional(),
    age: z.number().min(18),
    createAt: z.date()
});

// 특정 필드만 선택
const profileSchema = userSchema.pick({ name: true, email: true });

// 특정 필드 제외
const noIdSchema = userSchema.omit({ id: true });
```

## 6. 타입 추론
```ts
type User = z.infer<typeof userSchema>;
```
이렇게 하면 따로 interface를 만들 필요 없이 타입을 바로 사용할 수 있습니다.

## 7. 배열과 조건
```ts
const stringArray = z.array(z.string()); // 문자열 배열
const limitedArray = z.array(z.string()).min(1).max(10); // 1 ~ 10개
```
