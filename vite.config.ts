import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import * as _ from 'lodash-es'
import TurboConsole from 'unplugin-turbo-console/vite'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import defConfigs from './vite.default.json'

// set up the configuration for Vite during development and build
export default defineConfig(({ command, mode }) => {
    const projFolder = process.cwd()
    const rootDir = join(projFolder, '.')
    const publicDir = join(projFolder, defConfigs.publicDir)
    const envDir = join(projFolder, '.')

    // load all environment variables from `.env` files because `import.meta.env` is not available here
    const env = loadEnv(mode, envDir, defConfigs.envPrefix)
    const WEB_HOST = env['VITE_WEB_HOST'] ?? defConfigs.webHost
    const WEB_PORT = parseInt(env['VITE_WEB_PORT'] ?? defConfigs.webPort, 10)
    const API_HOST = env['VITE_API_HOST'] ?? defConfigs.apiHost
    const API_PORT = parseInt(env['VITE_API_PORT'] ?? defConfigs.apiPort, 10)

    // common configuration shared all environment
    const sharedConfig = {
        base: '/', // change it to "/xxx" an then the landing page will be "http://localhost:port/xxx"
        root: rootDir, // directory where "index.html" is placed.
        publicDir: publicDir, // public assets directory
        envDir: envDir, // .env files and all imported environment variables directory
        devtools: true,
        plugins: [
            Inspect(), // for inspecting what happens inside Vite
            TurboConsole({
                // a fancy console at client/server
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
            tsconfigPaths: true, // resolve imports using TypeScript's path definition (replaces resolve.alias). If you want to directly run `vite build` in the commandline, you must manually resolve the path aliases here:
            // alias: {
            //      "@": path.resolve(__dirname, "./src"),
            //      ...
            // }
        },
        appType: 'spa', // all requests to all routes will be directed to "index.html".
        build: {
            outDir: 'dist', // build directory
        },
        preview: {
            allowedHosts: true, // to allow all incoming request from all addresses
        },
        server: {
            host: WEB_HOST,
            port: WEB_PORT,
            proxy: {
                // define a proxy to avoid CORS for the trusted API
                '/api': `http://${API_HOST}:${API_PORT}`,
            },
            fs: {
                strict: true, // restrict serving files outside of workspace root.
            },
            middlewareMode: false, // use Vite as a built tool rather than middleware
        },
        oxc: {
            jsx: {
                // use Vite to transform any JSX syntax
                runtime: 'automatic', // automatically add import JSX package for JSX/TSX files
                development: true, // enable development specific transforms ??
                throwIfNamespace: true, // throw error if the XML namespaced tag names (e.g. <foo:bar baz:qux="foobar" />) are used.
                pure: false, // enable pure annotation (annotation comments that can be safely removed) for JSX elements
                importSource: 'jsx-dom', // the package to be automatically imported for JSX/TSX file
                pragma: 'React.createElement', // h factory function
                pragmaFrag: 'React.Fragment', // fragment element
            },
            // When transforming TSX files:
            typescript: {
                jsxPragma: 'React.createElement', // same value with `jsx.pragma`
                jsxPragmaFrag: 'React.Fragment', // same value with `jsx.pragmaFrag`
            },
        },
    } satisfies UserConfig

    // environment-specific configuration
    let envConfig: UserConfig
    if (command === 'serve') {
        // dev specific config
        envConfig = {
            server: {
                // avoid CORS during development
                cors: true, // enable CORS for all incoming IP addresses
            },
        } satisfies UserConfig
    } else {
        // command === 'build'
        envConfig = {
            server: {
                cors: {
                    // apply cors for specific IP addresses
                    origin: /^https?:\/\/(?:10\.10\.100\.\d{1,3}|localhost|127\.0\.0\.1|\[::1\])(?::\d+)?/, // To be replaced with patterns of all IP addresses/domains that need CORS
                },
            },
        } satisfies UserConfig
    }

    return _.merge(sharedConfig, envConfig)
})
