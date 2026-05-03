import { Locator, Page, Response } from '@playwright/test';
import { AppPage } from './AppPage';

export class HomePage extends AppPage {
  welcomeMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = this.page.getByTestId('start-page-welcome-message');
  }

  goto(): Promise<Response | null> {
    return this.page.goto('/');
  }

}