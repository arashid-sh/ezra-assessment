import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
 * Page object for the Ezra dashboard.
 * Provides access to booking a scan, starting a visit, and creating patients.
 */
export class DashboardPage extends BasePage {
  readonly bookAScanButton: Locator;
  readonly startNewVisitButton: Locator;
  readonly sidebarMenu: Locator;
  readonly patientNameInputField: Locator;
  readonly patientNameModalContinueButton: Locator;

  /**
   * Creates a DashboardPage instance and initializes dashboard locators.
   * @param page - Playwright Page instance for browser interactions
   */
  constructor(page: Page) {
    super(page);
    this.bookAScanButton = this.page.getByRole("button", { name: "Book a scan" });
    this.startNewVisitButton = this.page.getByRole("button", { name: "Start New Visit" });
    this.sidebarMenu = this.page.getByText("HomeHomePatientsPatientsVisitsVisitsAI");
    this.patientNameInputField = this.page.locator("#patientName");
    this.patientNameModalContinueButton = this.page.getByRole("button", { name: "Continue" });
  }

  /**
   * Creates a new patient by filling the patient name and clicking Continue.
   * @param name - Display name for the new patient
   */
  async createNewPatient(name: string): Promise<void> {
    await this.patientNameInputField.fill(name);
    await this.patientNameModalContinueButton.click();
  }
}
