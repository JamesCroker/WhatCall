import { test, expect } from '@playwright/test';
import { HomePage } from './HomePage';

test.describe('HomePage', () => {

  test('has welcome message', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(homePage.welcomeMessage)
      .toContainText('Explore our scenarios and test your responses.');
  });

  test('has title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Whatcall/);
  });

});
