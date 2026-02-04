import { test as base } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { BookingPage } from "../src/pages/BookingPage";
import { CreditCards } from "../src/datafactory/creditCards";
import { CheckoutPage } from "../src/pages/CheckoutPage";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  bookingPage: BookingPage;
  creditCards: CreditCards;
  checkoutPage: CheckoutPage;
};

// Extend the base test with our custom fixtures
export const test = base.extend<MyFixtures>({
  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // DashboardPage fixture
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  // ScribeVoiceFlowPage fixture
  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    await use(bookingPage);
  },

  // eslint-disable-next-line no-empty-pattern
  creditCards: async ({}, use) => {
    await use(new CreditCards());
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

export { expect } from "@playwright/test";
