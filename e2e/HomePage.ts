import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = this.page.getByTestId('start-page-welcome-message');
  }

  async goto() {
    await this.page.goto('/');
  }

}
