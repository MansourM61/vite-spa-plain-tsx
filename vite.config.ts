import Inspect from 'vite-plugin-inspect'
import TurboConsole from 'unplugin-turbo-console/vite'

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
        })

    ],
}