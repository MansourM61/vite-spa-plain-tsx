import { x } from 'tinyexec'
import { loadEnv } from 'vite'
import defConfigs from '@/vite.default.json' with { type: 'json' }

const projFolder = process.cwd()
const env = loadEnv('development', projFolder, defConfigs.envPrefix)
const WEB_PORT = parseInt(env['VITE_API_PORT'] ?? defConfigs.webPort, 10)

console.info(
    `Starting mock server at http://localhost:${WEB_PORT} for test purposes...`
)
const result = await x('bunx', [
    'json-server',
    'test/mocks/data.json',
    '--port',
    `${WEB_PORT}`,
])

if (result.stderr !== '') {
    console.error(`${result.stderr}`)
} else {
    console.info(`${result.stdout}`)
}
