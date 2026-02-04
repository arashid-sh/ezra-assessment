import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

// Load environment variables
config();

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: process.env.APP_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          slowMo: 500,
        },
      },
    },
  ],
  timeout: 120000,
  expect: {
    timeout: 30000,
  },
});
