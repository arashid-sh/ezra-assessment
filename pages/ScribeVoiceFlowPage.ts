import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class ScribeVoiceFlowPage extends BasePage {
  readonly flowNameInput: Locator;
  readonly flowDescriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly flowItems: Locator;
  readonly startInPersonVisitButton: Locator;
  readonly saveAndExitButton: Locator;
  readonly saveAndExitModalConfirmButton: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmDeleteButton = this.page.getByRole("button", {
      name: /confirm/i,
    });
    this.startInPersonVisitButton = this.page.getByRole("button", { name: "Start In-Person Visit" });
    this.saveAndExitButton = this.page.getByRole("button", { name: "Save & Exit" });
    this.saveAndExitModalConfirmButton = this.page.getByRole("button", { name: "Confirm" });
  }

  async createVoiceFlow(): Promise<void> {
    // logic for creating a voice flow
  }

  async editVoiceFlow(name: string): Promise<void> {
    // logic for editing a voice flow
  }

  async deleteVoiceFlow(): Promise<void> {
    // logic for deleting a flow
  }
}
