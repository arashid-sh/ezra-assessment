import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByRole("textbox", { name: /email/i });
    this.passwordInput = this.page.getByRole("textbox", { name: /password/i });
    this.loginButton = this.page.getByRole("button", { name: "Submit" });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async forgotPassword(): Promise<void> {
    // logic for forgot password flow
  }

  async createAccount(): Promise<void> {
    // logic for creating an account
  }
}
