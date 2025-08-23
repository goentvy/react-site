import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider.tsx";

import RootLayout from "./pages/layout.tsx"; // 전역 레이아웃 컴포넌트
import App from "./pages"; // 메인 페이지
import "./index.css";
import Html from "./pages/htmlcss";
import Js from "./pages/js";
import ReactJs from "./pages/react";
import Tailwindcss from "./pages/tailwindcss";
import Mini_Blog from "./study/mini/Mini_Blog.jsx";
import MainPage from "./study/mini/pages/MainPage.jsx";
import PostWritePage from "./study/mini/pages/PostWritePage.jsx";
import PostViewPage from "./study/mini/pages/PostViewPage.jsx";
import Developer from "./pages/developer";
import ErrorPage from "./pages/error";
import ZodPage from "./pages/zod";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HashRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<App />} />
                        <Route path="/htmlcss/:id" element={<Html />} />
                        <Route path="/js/:id" element={<Js />} />
                        <Route path="/react/:id" element={<ReactJs />} />
                        <Route path="/tailwindcss/:id" element={<Tailwindcss />} />
                        <Route path="/developer/:id" element={<Developer />} />
                        <Route path="/error/:id" element={<ErrorPage />} />
                        <Route path="/zod/:id" element={<ZodPage />} />
                        {/* 소플 미니 블로그 */}
                        <Route path="/react/Mini-blog" element={<Mini_Blog />}>
                            <Route index element={<MainPage />} />
                            <Route path="post-write" element={<PostWritePage />} />
                            <Route path="post/:postId" element={<PostViewPage />} />
                        </Route>
                    </Route>
                        <Route path="*" element={<div>404 Not Found</div>} /> {/* 모든 불일치 경로 처리 */}
                </Routes>
            </HashRouter>
        </ThemeProvider>
    </StrictMode>
);
