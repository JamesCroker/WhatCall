import { Locator, Page, Response } from '@playwright/test';
import { AppPage } from './AppPage';

export class ScenarioPage extends AppPage {
  video: Locator;
  yourSelection: Locator;

  constructor(page: Page) {
    super(page);
    this.video = this.page.locator('#video video');
    this.yourSelection = this.page.getByTestId('your-selection');
  }

  goto(id?: string): Promise<Response | null> {
    if (id) {
      return this.page.goto(`/scenario/${id}`);
    } else {
      return this.page.goto('/scenario');
    }
  }

  waitForVideoLoad(): Promise<void> {
    return this.video.evaluate(
      (element) =>
        new Promise((resolve) =>
          element.addEventListener('loadeddata', () => {
            console.log('resolve')
            return resolve()
          }, { once: true })
        )
    );
  }

  optionButtonLocator(index: number): Locator {
    return this.page.getByTestId(`scenario-option-${index}`)
  }

}