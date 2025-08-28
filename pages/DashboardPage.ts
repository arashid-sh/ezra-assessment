import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class DashboardPage extends BasePage {
  readonly voiceFlowButton: Locator;
  readonly startNewVisitButton: Locator;
  readonly sidebarMenu: Locator;
  readonly patientNameInputField: Locator;
  readonly patientNameModalContinueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.startNewVisitButton = this.page.getByRole("button", { name: "Start New Visit" });
    this.sidebarMenu = this.page.getByText("HomeHomePatientsPatientsVisitsVisitsAI");
    this.patientNameInputField = this.page.locator("#patientName");
    this.patientNameModalContinueButton = this.page.getByRole("button", { name: "Continue" });
  }

  async createNewPatient(name: string): Promise<void> {
    await this.patientNameInputField.fill(name);
    await this.patientNameModalContinueButton.click();
  }

  async searchForPatient(name: string): Promise<void> {
    // logic for searching for a patient
  }

  async isDashboardLoaded(): Promise<boolean> {
    try {
      await this.sidebarMenu.first().waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
