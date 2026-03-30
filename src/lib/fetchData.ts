import defConfigs from '@/vite.default.json'

// Source - https://stackoverflow.com/a/1484514
// Posted by Anatoliy, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-27, License - CC BY-SA 3.0
function getRandomColor() {
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

export const fetchData = async () => {
    const par_1 = await (
        await fetch(`http://${API_HOST}:${API_PORT}/par_1`)
    ).text()
    const par_2 = await (
        await fetch(`http://${API_HOST}:${API_PORT}/par_2`)
    ).text()

    return [par_1, par_2]
}

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
