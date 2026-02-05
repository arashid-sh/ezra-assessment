import { Page } from "@playwright/test";

/**
 * Base page class providing common functionality for all page objects.
 * Extended by specific page classes to share wait and title utilities.
 */
export class BasePage {
  readonly page: Page;

  /**
   * Creates a BasePage instance.
   * @param page - Playwright Page instance for browser interactions
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Waits for an element matching the given selector to be present in the DOM.
   * @param selector - CSS or other Playwright-supported selector string
   * @throws Throws if the element is not found within the timeout (10 seconds)
   */
  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, {
      timeout: 10000,
    });
  }

  /**
   * Returns the title of the current page.
   * @returns The document title string
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
