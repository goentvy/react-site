import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider.tsx";

import RootLayout from "./pages/layout.tsx"; // 전역 레이아웃 컴포넌트
import App from "./pages"; // 메인 페이지
import "./index.css";
import Html from "./pages/html.tsx";
import Css from "./pages/css.tsx";
import Js from "./pages/js.tsx";
import ReactJs from "./pages/reactjs.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route index element={<App />} />
                        <Route path="/html" element={<Html />} />
                        <Route path="/css" element={<Css />} />
                        <Route path="/js" element={<Js />} />
                        <Route path="/react" element={<ReactJs />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
);
