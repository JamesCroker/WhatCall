import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Screenshots', () => {

  test('home page', async ({ page }, testInfo) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

});