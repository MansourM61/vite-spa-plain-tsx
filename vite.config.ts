import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { defineConfig, type UserConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
    // common configuration shared all environment
    const sharedConfig = {
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
                '@assets': fileURLToPath(
                    new URL('./src/assets', import.meta.url)
                ),
            },
        },
        appType: 'spa', // all requests to all routes will be directed to "index.html".
        build: {
            outDir: 'dist',
        },
        preview: {
            allowedHosts: true, // to allow all incoming request from all addresses
        },
    } satisfies UserConfig

    if (command === 'serve') {
        return {
            // dev specific config
            ...sharedConfig,
        }
    } else {
        // command === 'build'
        return {
            // build specific config
            ...sharedConfig,
        }
    }
})
