import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from "./components/theme-provider.tsx";

import "./index.css";
import RootLayout from "./pages/layout.tsx"; // 전역 레이아웃 컴포넌트
import App from "./pages"; // 메인 페이지
import HtmlPage from "./pages/htmlcss";
import JsPage from "./pages/js";
import ReactJsPage from "./pages/react";
import TailwindcssPage from "./pages/tailwindcss";
import DeveloperPage from "./pages/developer";
import ErrorPage from "./pages/error";
import ZodPage from "./pages/zod";
import SupabasePage from "./pages/supabase";
import VuePage from "./pages/vue";
import ProjectPage from "./pages/project";
import GithubPage from "./pages/github";
import PostDetail from "./components/common/PostDetail.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <HashRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<App />} />
                        <Route path="/htmlcss/:id" element={<HtmlPage />} />
                        <Route path="/js/:id" element={<JsPage />} />
                        <Route path="/react/:id" element={<ReactJsPage />} />
                        <Route path="/tailwindcss/:id" element={<TailwindcssPage />} />
                        <Route path="/developer/:id" element={<DeveloperPage />} />
                        <Route path="/error/:id" element={<ErrorPage />} />
                        <Route path="/zod/:id" element={<ZodPage />} />
                        <Route path="/supabase/:id" element={<SupabasePage />} />
                        <Route path="/vue/:id" element={<VuePage />} />
                        <Route path="/project/:id" element={<ProjectPage />} />
                        <Route path="/github/:id" element={<GithubPage />} />
                        <Route path="/posts/:slug" element={<PostDetail />} />
                    </Route>
                        <Route path="*" element={<div>404 Not Found</div>} /> {/* 모든 불일치 경로 처리 */}
                </Routes>
            </HashRouter>
        </ThemeProvider>
    </StrictMode>
);
