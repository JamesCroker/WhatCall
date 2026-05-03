import { expect, test } from '@playwright/test';
import { ScenarioPage } from './pages/ScenarioPage';
import { SCENARIOS } from './testdata';

test.describe('Unathenticated Scenario View', () => {

  test('An unathenticated user can respond to a scenario.',
    {
      annotation: {
        type: 'requirement',
        description: 'SC5 - Any user should be able to respond to a video without having to log in',
      }
    },
    async ({ page }, testInfo) => {
      const scenarioPage = new ScenarioPage(page);
      await scenarioPage.goto(SCENARIOS.scen1.id);
      await scenarioPage.waitForVideoLoad();
      await scenarioPage.optionButtonLocator(0).click();
      expect(await scenarioPage.yourSelection.innerHTML()).toBe(SCENARIOS.scen1.options[0]);
      const screenshot = await page.screenshot();
      await testInfo.attach('responded screeshot', { body: screenshot, contentType: 'image/png' });
    });

});