/**
 * Data fetching from API
 *
 * @module lib/fetchData
 */
import defConfigs from '@/vite.default.json'

/**
 * Generate a random colour
 *
 * The code is from {@link https://stackoverflow.com/a/1484514}
 * @returns {string} randomly generated colour
 */
function getRandomColor(): string {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

const API_HOST = import.meta.env['VITE_API_HOST'] ?? defConfigs.apiHost
const API_PORT = parseInt(
    import.meta.env['VITE_API_PORT'] ?? defConfigs.apiPort,
    10
)

/**
 * Fetches data from a mock API server
 *
 * @returns {Promise<string[]>} fetched data
 */
export const fetchData = async (): Promise<string[]> => {
    const par_1 = await (
        await fetch(`http://${API_HOST}:${API_PORT}/par_1`)
    ).text()
    const par_2 = await (
        await fetch(`http://${API_HOST}:${API_PORT}/par_2`)
    ).text()

    return [par_1, par_2]
}

/**
 * Fetch the date from mock API server and append it to the list
 */
export async function setData() {
    const data = await fetchData()

    const element = document.getElementById('list-data')

    const fragment = document.createDocumentFragment()
    data.forEach((item) => {
        const li = document.createElement('li')
        li.textContent = item
        li.style.color = getRandomColor()
        fragment.appendChild(li)
    })

    element!.appendChild(fragment)
}
