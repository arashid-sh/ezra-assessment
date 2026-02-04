import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class DashboardPage extends BasePage {
  readonly bookAScanButton: Locator;
  readonly startNewVisitButton: Locator;
  readonly sidebarMenu: Locator;
  readonly patientNameInputField: Locator;
  readonly patientNameModalContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.bookAScanButton = this.page.getByRole("button", { name: "Book a scan" });
    this.startNewVisitButton = this.page.getByRole("button", { name: "Start New Visit" });
    this.sidebarMenu = this.page.getByText("HomeHomePatientsPatientsVisitsVisitsAI");
    this.patientNameInputField = this.page.locator("#patientName");
    this.patientNameModalContinueButton = this.page.getByRole("button", { name: "Continue" });
  }

  async createNewPatient(name: string): Promise<void> {
    await this.patientNameInputField.fill(name);
    await this.patientNameModalContinueButton.click();
  }
}
