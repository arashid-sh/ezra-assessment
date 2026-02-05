import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
 * Page object for the Ezra login page.
 * Handles email/password authentication and related actions.
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  /**
   * Creates a LoginPage instance and initializes login form locators.
   * @param page - Playwright Page instance for browser interactions
   */
  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByRole("textbox", { name: /email/i });
    this.passwordInput = this.page.getByRole("textbox", { name: /password/i });
    this.loginButton = this.page.getByRole("button", { name: "Submit" });
  }

  /**
   * Logs in with the given email and password.
   * Fills the email and password fields and clicks the Submit button.
   * @param email - User's email address
   * @param password - User's password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Initiates the forgot password flow.
   * Reserved for future implementation.
   */
  async forgotPassword(): Promise<void> {
    // logic for forgot password flow
  }

  /**
   * Initiates the create account flow.
   * Reserved for future implementation.
   */
  async createAccount(): Promise<void> {
    // logic for creating an account
  }
}
