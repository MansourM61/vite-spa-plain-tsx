import { fileURLToPath, resolve, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Inspect from 'vite-plugin-inspect'

export default {
    root: process.cwd(),
    base: '/',
    publicDir: 'public',
    envDir: process.cwd(),
    devtools: true,
    plugins: [
        Inspect(),
        TurboConsole({
            highlight: {
                themeDetect: true,
            },
            inspector: {
                printUrl: false,
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
    },
}
