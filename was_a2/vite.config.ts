import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        // 👇 Only include Wayfinder when not on Vercel (no PHP in build env)
        ...(process.env.VERCEL
            ? []
            : [
                  wayfinder({
                      formVariants: true,
                  }),
              ]),
    ],
    resolve: {
        alias: {
            // ✅ Use absolute path resolution for @ to fix ENOENT errors on Vercel
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        // optional: helps Vercel build faster & reduces noise
        outDir: 'public/build',
        emptyOutDir: true,
    },
});
