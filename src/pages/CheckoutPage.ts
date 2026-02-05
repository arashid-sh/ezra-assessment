import { CreditCard } from "../types/creditCard";
import { BasePage } from "./BasePage";
import { Locator, Page, FrameLocator } from "@playwright/test";

/**
 * Page object for the Ezra checkout/payment step.
 * Fills and submits payment details within the Stripe iframe.
 */
export class CheckoutPage extends BasePage {
  readonly cardNumberField: Locator;
  readonly expiryField: Locator;
  readonly securityCodeField: Locator;
  readonly postalCodeField: Locator;
  readonly submitButton: Locator;
  readonly stripeFrame: FrameLocator;

  /**
   * Creates a CheckoutPage instance and initializes payment form locators
   * and the Stripe secure payment iframe reference.
   * @param page - Playwright Page instance for browser interactions
   */
  constructor(page: Page) {
    super(page);
    // this.stripeFrame = this.page.frameLocator(
    //   'iframe[name^="__privateStripeFrame"][title="Secure payment input frame"]'
    // );
    this.stripeFrame = this.page.frameLocator('iframe[title="Secure payment input frame"]:not([aria-hidden="true"])');

    this.cardNumberField = this.page.locator("input[name='number']");
    this.expiryField = this.page.locator("input[name='expiry']");
    this.securityCodeField = this.page.locator("div.p-CardCvcInput input");
    this.postalCodeField = this.page.locator("input[name='postalCode']");
    this.submitButton = this.page.locator('[data-test="submit"]');
  }

  /**
   * Fills all payment fields inside the Stripe iframe with the given card details
   * and submits the form.
   * @param creditCard - Object containing number, expDate, securityCode, and postalCode
   */
  async fillAndSubmitPaymentDetails(creditCard: CreditCard): Promise<void> {
    // Fill the card number field inside the iframe
    await this.stripeFrame.locator(this.cardNumberField).fill(creditCard.number);
    await this.stripeFrame.locator(this.expiryField).fill(creditCard.expDate);
    await this.stripeFrame.locator(this.securityCodeField).fill(creditCard.securityCode);
    await this.stripeFrame.locator(this.postalCodeField).fill(creditCard.postalCode);
    await this.submitButton.click();
  }

  /**
   * Checks whether the card declined error message is visible in the payment iframe.
   * @returns True if the declined message is visible, false otherwise
   */
  async verifyDeclinedMessage(): Promise<boolean> {
    const declinedMessage = this.stripeFrame.locator("#Field-numberError");
    console.log("Declined message visibility:", await declinedMessage.isVisible());
    return await declinedMessage.isVisible();
  }
}
