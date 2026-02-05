import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
 * Page object for the Ezra scan booking flow.
 * Handles selecting a scan plan, location, date, time, and submitting the booking.
 */
export class BookingPage extends BasePage {
  readonly cancelButton: Locator;
  readonly selectPlanContinueButton: Locator;
  readonly firstScanInList: Locator;
  readonly firstAvailableDate: Locator;
  readonly firstAvailableLocation: Locator;
  readonly firstAvailableTime: Locator;
  readonly scheduleYourScanContinueButton: Locator;

  /**
   * Creates a BookingPage instance and initializes booking flow locators.
   * @param page - Playwright Page instance for browser interactions
   */
  constructor(page: Page) {
    super(page);
    this.cancelButton = this.page.getByTestId("select-plan-cancel-btn");
    this.selectPlanContinueButton = this.page.getByTestId("select-plan-submit-btn");
    this.firstScanInList = this.page.locator("li.encounter-list-item").locator("visible=true").first();
    this.firstAvailableLocation = this.page.locator("div.location-card").first();
    this.firstAvailableDate = this.page.locator("div.vuecal__cell:not(.vuecal__cell--disabled)").first();
    this.firstAvailableTime = this.page.locator("div.appointments__individual-appointment").first();
    this.scheduleYourScanContinueButton = this.page.locator('[data-test="submit"]');
  }

  /**
   * Completes the full scan booking flow by selecting the first available
   * scan, location, date, and time, then submitting the schedule.
   */
  async bookAScan(): Promise<void> {
    await this.firstScanInList.click();
    await this.selectPlanContinueButton.click();
    await this.firstAvailableLocation.click();
    await this.firstAvailableDate.click();
    await this.firstAvailableTime.click();
    await this.scheduleYourScanContinueButton.click();
  }
}
