# Outdated_Optimize_Dep & net::ERR_ABORTED 504

```bash
GET http://localhost:5173/node_modules/.vite/deps/@hookform_resolvers_zod.js?v=5b845f10 net::ERR_ABORTED 504 (Outdated Optimize Dep)

index.tsx:20  GET http://localhost:5173/node_modules/.vite/deps/zod.js?v=8c14a17e net::ERR_ABORTED 504 (Outdated Optimize Dep)
```

큰 문제없이 작동하던 사이트에 해당 Error 메시지와 함께 사이트 작동이 멈춰 해당 에러를 확인해보고자 한다.

해당 에러는 Vite 개발 서버에서 의존성 파일을 불러오려고 했는데, 

net::ERR_ABORTED 504 - 서버가 요청을 처리하지 못하고 중단되었고 ( 504는 Gateway Time out )

Outdated Optimize Dep - Vite가 node_modules 안의 특정 라이브러리를 최적화(Pre-bundling)하려 했지만,

그 캐시가 오래되었거나 깨졌다는 뜻

### 해결방법

(1). Vite 캐시 삭제

` Bash `
```bash
rm -rf node_modules/.vite
```

(2). 의존성 재설치

` Bash `
```bash
rm -rf node_modules
rm package-lock.json # 또는 yarn.lock
npm install
```

(3). Vite 서버 재시작

` Bash `
```bash
npm run dev
```

(4). zod와 @hookform/resolvers 버전 확인

혹시 zod나 @hookform/resolvers의 버전이 서로 호환되지 않는경우 해당 문제가 생길수 있기에 최신버전으로 설치

` Bash `
```bash
npm install zod @hookform/resolvers
```

해당 오류를 만날때는 특별히 문제가 있지 않는 한 캐시 삭제와 의존성 재설치로 해결이 되었다.