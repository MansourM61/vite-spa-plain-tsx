import { fetchData } from '@lib/fetchData'
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import data from './mocks/data.json'
import { server } from './mocks/node.js'

// framework route test
describe('Framework Routes', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('Fetch data from API is working', async () => {
        const mockData = Object.values(data)

        expect(await fetchData()).toStrictEqual(mockData)
    })
})
