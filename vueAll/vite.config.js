import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path"

export default defineConfig({
    plugins: [
        vue()
    ],
    base: '/',
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
    build: {
        outDir: 'vdist',
        assetsDir: 'assets',
        sourcemap: true,
    },
    resolve: {
        extensions: [".js", ".css", ".ts", ".json"],
        alias: {
            '@': path.resolve(__dirname,"src"),
        },
    },
    css: {
        postcss: {
            plugins: [require('autoprefixer')],
        },
    },
    optimizeDeps: {
        include: ['axios', 'lodash'],
    },
});
