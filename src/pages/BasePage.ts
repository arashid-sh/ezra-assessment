import { Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector, {
      timeout: 10000,
    });
  }

  async getPageTitle() {
    return this.page.title();
  }
}
