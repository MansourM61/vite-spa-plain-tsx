import { HttpResponse, http } from 'msw'
import data from './data.json'

export const handlers = [
    http.get('http://localhost:3000/par_1', () => {
        console.log('Par_1 is requested!')
        return HttpResponse.text(data.par_1)
    }),
    http.get('http://localhost:3000/par_2', () => {
        console.log('Par_2 is requested!')
        return HttpResponse.text(data.par_2)
    }),
]
