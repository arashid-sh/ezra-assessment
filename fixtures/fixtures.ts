import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ScribeVoiceFlowPage } from "../pages/ScribeVoiceFlowPage";

// Extend the base test with our custom fixtures
export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  scribeVoiceFlowPage: ScribeVoiceFlowPage;
}>({
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
  scribeVoiceFlowPage: async ({ page }, use) => {
    const scribeVoiceFlowPage = new ScribeVoiceFlowPage(page);
    await use(scribeVoiceFlowPage);
  },
});

export { expect } from "@playwright/test";
