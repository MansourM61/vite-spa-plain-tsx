import Inspect from 'vite-plugin-inspect'
import TurboConsole from 'unplugin-turbo-console/vite'
import tailwindcss from '@tailwindcss/vite'

export default {
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
        tailwindcss()
    ],
}