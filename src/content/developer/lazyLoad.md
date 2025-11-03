# Lazy Loading

# 🐢 Lazy Loading으로 성능 최적화하기

## 개요

**Lazy Loading(지연 로딩)**은 웹 페이지의 리소스를 **사용자가 실제로 필요할 때까지 로딩을 미루는 기술**입니다. 초기 페이지 로딩 속도를 개선하고, 불필요한 네트워크 사용을 줄이며, 사용자 경험을 향상시키는 데 효과적입니다.


## 🚀 Lazy Loading의 장점

- **초기 로딩 속도 향상**: Core Web Vitals 지표 개선 (FCP, LCP 등)
- **네트워크 사용 최적화**: 보이지 않는 리소스를 미리 불러오지 않음
- **서버 부하 감소**: 동시에 많은 리소스를 요청하지 않음
- **모바일 데이터 절약**: 이미지가 많은 페이지에서 특히 유용


## 🧩 Lazy Loading 적용 대상

| 리소스 유형     | 적용 가능 여부 | 비고 |
|----------------|----------------|------|
| 이미지 (`<img>`) | ✅ 가능         | 가장 일반적인 적용 대상 |
| iframe          | ✅ 가능         | 유튜브, 지도 등 외부 콘텐츠 |
| 컴포넌트        | ✅ 가능         | React, Vue 등에서 동적 import |
| 폰트            | ⚠️ 제한적       | preload로 대체 가능 |
| JS 모듈         | ✅ 가능         | `type="module"`은 기본적으로 lazy |


## 🛠️ 구현 방법

### 1. HTML Native 방식

```html
<img src="image.jpg" alt="설명" loading="lazy" />
<iframe src="video.html" loading="lazy"></iframe>
```

- 장점: 간단하고 브라우저가 자동 처리
- 단점: 세밀한 제어 어려움, 일부 브라우저 미지원

## 2. JavaScript 방식 (Intersection Observer API)

```html
<img class="lazyload" data-src="real-image.jpg" alt="..." />
```
```js
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazyload");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        obs.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => observer.observe(img));
});
```
- 장점: 로딩 타이밍, 임계값 등 세밀한 제어 가능
- 단점: 코드 작성 필요, 브라우저 지원 확인 필요

## 3. React에서의 Lazy 컴포넌트 로딩

React.lazy 함수를 사용하면 동적 import를 사용해서 컴포넌트를 렌더링 할 수 있습니다.

Before
```jsx
import MyComponent from './MyComponent';
```
After
```jsx
const LazyComponent = React.lazy(() => import('./MyComponent'));
```
**App** 컴포넌트가 처음 렌더링 될 때 **MyComponent**를 포함한 번들을 자동으로 불러옵니다.

**React.lazy**는 동적 **import()**를 호출하는 함수를 인자로 가집니다. 이 함수는 컴포넌트를

**default** export로 가진 모듈 객체가 이행되는 **Promise**를 반환해야 합니다.

lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 해줍니다.

```jsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```
**fallback** prop은 컴포넌트가 로드될 때까지 기다리는 동안 렌더링하려는 React 엘리먼트를 받아들입니다. **Suspense** 컴포넌트는 lazy 컴포넌트를 감쌉니다. 하나의 Suspense 컴포넌트로 여러 lazy 컴포넌트를 감쌀수도 있습니다.
```jsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = React.lazy(() => import('./MyComponent'));
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function App() {
  return (
    <>
        <Suspense fallback={<div>로딩 중...</div>}>
            <div>
                <LazyComponent />
                <OtherComponent />
            </div>
        </Suspense>
    </>
  );
}
```


- 사용 예시: 페이지 단위 컴포넌트, 무거운 UI 요소
- 장점: 코드 스플리팅으로 번들 크기 감소

## 📌 팁 & 주의사항
• 	이미지 크기와 ,  속성을 명시하면 레이아웃 시프트 방지에 도움
• 	너무 많은 Lazy Loading은 UX에 부정적 영향을 줄 수 있음
• 	SEO가 중요한 경우, Lazy Loading된 콘텐츠가 검색엔진에 노출되지 않을 수 있으므로 SSR 고려 필요

## 📊 Lazy Loading 효과가 체감되는 규모

✅ 이미지가 많은 페이지
- 예: 쇼핑몰, 블로그, 포트폴리오 갤러리
- 기준: 이미지가 10개 이상이고, 한 번에 모두 보이지 않는 경우
- 체감 효과: 초기 로딩 속도 최대 50% 이상 개선 가능

✅ 스크롤 기반 콘텐츠 로딩
- 예: 무한 스크롤 뉴스피드, SNS, 댓글 목록
- 기준: DOM 요소가 100개 이상 렌더링될 경우
- 체감 효과: 렌더링 지연 감소, 메모리 사용량 절감

✅ 모듈/컴포넌트가 많은 SPA
- 예: 대시보드, 관리자 페이지
- 기준: 페이지당 5개 이상의 무거운 컴포넌트 (차트, 지도 등)
- 체감 효과: 번들 크기 감소 → 초기 로딩 시간 단축

✅ 모바일 사용자 비중이 높은 경우
- 모바일 네트워크 환경에서는 Lazy Loading이 데이터 절약과 UX 향상에 직접적인 영향을 줍니다.
- 특히 이미지나 iframe을 lazy하게 처리하면 데이터 사용량 최대 30~40% 감소 가능