import { Locator, Page } from '@playwright/test';

export class AppPage {
  readonly page: Page;

  menuRandomScenario: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuRandomScenario = this.page.getByTestId('menu-randomscenario');
  }

}