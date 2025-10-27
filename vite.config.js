import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from 'url';
import mdPlugin from 'vite-plugin-markdown';

// 현재 파일의 디렉토리 이름을 얻기 위한 변수 정의

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    base: '/react-site/',
    plugins: [react(), tailwindcss(), mdPlugin],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    /* 프록시 설정 */
    server: {
        proxy: {
            '/v1': {
                target: 'https://openapi.naver.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    },
});