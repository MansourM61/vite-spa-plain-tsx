import tailwindcss from '@tailwindcss/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Inspect from 'vite-plugin-inspect'

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
        tailwindcss(),
    ],
}
