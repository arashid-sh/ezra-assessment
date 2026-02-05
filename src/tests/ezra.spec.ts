import { test, expect } from "../../fixtures/fixtures";

test.describe("Ezra Assessment", { tag: "@Smoke" }, () => {
  test.beforeEach(async ({ page, loginPage }) => {
    // Navigate to the app before each test
    await page.goto(process.env.APP_URL || "https://myezra-staging.ezra.com/");
    await loginPage.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
    await page.getByRole("button", { name: "Accept" }).click();
  });

  test("should complete a scan booking and payment process", async ({
    page,
    dashboardPage,
    bookingPage,
    creditCards,
    checkoutPage,
  }) => {
    await dashboardPage.bookAScanButton.click();
    await bookingPage.bookAScan();
    await checkoutPage.fillAndSubmitPaymentDetails(await creditCards.createCreditCard());
    await expect(page.locator(".scan-confirm__details-container")).toBeVisible();
  });

  test("should show error for declined card", async ({
    page,
    dashboardPage,
    bookingPage,
    creditCards,
    checkoutPage,
  }) => {
    await dashboardPage.bookAScanButton.click();
    await bookingPage.bookAScan();
    const declinedCard = await creditCards.getSpecificInvalidCard("declined");
    await checkoutPage.fillAndSubmitPaymentDetails(declinedCard);
    const errorMessage = page
      .frameLocator('iframe[title="Secure payment input frame"]:not([aria-hidden="true"])')
      .getByText("Your card was declined");
    await expect(errorMessage).toBeVisible();
  });
});
