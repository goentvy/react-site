# Tailwindcss Setting

## Vite 설치

### 1. 프로젝트를 생성하세요. ( my-project -> 편한 프로젝트명으로 변경 )

아직 Vite 프로젝트가 설정되어 있지 않다면 새 Vite 프로젝트를 만들어 보세요. 가장 일반적인 방법은 Create Vite를 사용하는 것입니다.

```sh
npm create vite@latest my-project
cd my-project
```

### 2. Tailwind CSS 설치

npm을 통해 설치합니다. **tailwindcss @tailwindcss/vite**
```sh
npm install tailwindcss @tailwindcss/vite
```

### 3. Vite 플러그인 구성

**@tailwindcss/viteVite** 구성에 플러그인을 추가합니다.

```jsx
vite.config.ts

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

### 4. Tailwind CSS 가져오기

**@import "tailwindcss"**를 불러오는 style.css 파일을 src 폴더 내부에 생성하여 내용을 추가합니다.

```jsx
@import "tailwindcss";
```

### 5. 빌드 프로세스를 시작하세요

**npm run dev** 파일 에서 구성된 명령을 사용하여 터미널에 빌드 프로세스를 실행하세요. 

**package.json**
```sh
npm run dev
```

### 6. HTML에서 Tailwind를 사용해보세요

컴파일된 CSS가 포함되어 있는지 확인하세요 **<head>** (프레임워크에서 처리할 수도 있습니다).

그런 다음 Tailwind의 유틸리티 클래스를 사용하여 콘텐츠에 스타일을 지정하세요.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {/* import "tailwindcss" style.css index.html head 태그 내부에 적용 */}
  <link href="/src/style.css" rel="stylesheet"> 
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```