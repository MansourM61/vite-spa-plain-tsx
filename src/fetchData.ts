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

export async function fetchData() {
    const par_1 = await (await fetch('http://localhost:3000/par_1')).text()
    const par_2 = await (await fetch('http://localhost:3000/par_2')).text()

    const data = [par_1, par_2]

    const element = document.getElementById('list-data')

    const fragment = document.createDocumentFragment()

    data.forEach((browser) => {
        const li = document.createElement('li')
        li.textContent = browser
        li.style.color = getRandomColor()
        fragment.appendChild(li)
    })

    element!.appendChild(fragment)
}
