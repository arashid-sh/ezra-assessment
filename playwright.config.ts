import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";

// Load environment variables
config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html"]],
  use: {
    baseURL: process.env.APP_URL || "https://app.sully.ai",
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
          args: [
            "--use-fake-device-for-media-stream",
            "--use-fake-ui-for-media-stream",
            "--use-file-for-fake-audio-capture=test_audio.wav",
          ],
        },
      },
    },
  ],
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
});
