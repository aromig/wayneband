import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [
        vue(),

    ],
    build: {},
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'lodash': 'lodash-es',
        }
    },
    base: '/',
    server: {
        historyApiFallback: true, 
    },
    appType: 'spa',
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            }
        }
    }
});