import { expect, test } from '@playwright/test'

// Before running the tests make sure the Vite and Mock servers are running in separate processes (terminals).
// bun run mock
// bun run dev
test('test', async ({ page }) => {
    await page.goto('/')
    await expect(
        page.getByRole('heading', { name: 'Vite Build Tool' })
    ).toBeVisible()
    await expect(page.locator('#counter')).toContainText('Count is 0')
    await page.getByRole('button', { name: 'Count is' }).click()
    await expect(page.locator('#counter')).toContainText('Count is 1')
    await page.locator('#fetch-data').click()
    await expect(page.locator('#list-data')).toContainText('Val 1')
})
