import { test, expect } from "../fixtures/fixtures";

test.describe("ai scribe voice flow tests", { tag: "@Smoke" }, () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto(process.env.APP_URL || "https://app.sully.ai");
  });

  test("should create a voice flow after login", async ({ page, loginPage, dashboardPage, scribeVoiceFlowPage }) => {
    // Step 1: Login to the application
    await loginPage.login(
      process.env.LOGIN_EMAIL || "sullyqatest+7@gmail.com",
      process.env.LOGIN_PASSWORD || "Sully@321"
    );

    // Verify we're on the dashboard
    await expect(page).toHaveURL("https://app.sully.ai/");
    expect(await dashboardPage.isDashboardLoaded()).toBeTruthy();

    //  Create a new voice flow
    await dashboardPage.startNewVisitButton.click();

    const patientName = `TestFlow_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    // Create a new patient
    await dashboardPage.createNewPatient(patientName);

    // Soft assertion to verify we are on the scribe page.
    expect.soft(await scribeVoiceFlowPage.getPageTitle()).toBe("Sully.ai - AI Medical Assistant");

    // Start a new visit for the patient
    await scribeVoiceFlowPage.startInPersonVisitButton.click();
    await scribeVoiceFlowPage.saveAndExitButton.click();
    await scribeVoiceFlowPage.saveAndExitModalConfirmButton.click();

    //Step 4: Verify the flow was created
    await expect(page.getByRole("button", { name: patientName })).toBeVisible();
  });

  test("should handle login with invalid credentials gracefully", async ({ loginPage }) => {
    // Test with invalid credentials
    await loginPage.login("invalid@email.com", "wrongpassword");
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
