# AI Scribe Voice Flow Automation Framework

This project contains a Playwright automation framework for testing Sully Scribe voice flows using the Page Object Model (POM) pattern.

## Project Structure

```
sully-assessment/
├── pages/                       # Page Object classes
│   ├── BasePage.ts              # Base page with common methods
│   ├── LoginPage.ts             # Login page functionality
│   ├── DashboardPage.ts         # Dashboard navigation
│   └── ScribeVoiceFlowPage.ts   # Voice flow management
├── fixtures/                    # Test fixtures
│   └── fixtures.ts              # Custom test fixtures
├── tests/                       # Test files
│   └── voice-flow.spec.ts       # Main test file
├── .env                         # Environment variables
├── playwright.config.ts         # Playwright configuration
└── package.json                 # Project dependencies
```

## Framework Features

- **Page Object Model (POM)**: Clean separation of page logic and test logic
- **Environment Configuration**: Secure credential management using .env file
- **Base Page Class**: Common methods (waitForElement, getPageTitle)
- **Robust Selectors**: Multiple selector strategies for better reliability
- **Direct Environment Access**: Uses process.env for configuration
- **Code Quality Tools**: ESLint and Prettier for consistent code style

## Setup Instructions

1. **How To Run Locally**:

Assumptions: Mac with VSCode installed. We also use YARN in this repo.

- [Install NodeJS](https://nodejs.org/en/download) or type `brew install node` in terminal if you have homebrew installed
  - To check if node and npm is installed run `node -v` and
    `npm -v` in your terminal
- Clone this repo to your local machine and navigate to the root of the folder
- Type `npx playwright install` to install playwright browsers
- Type `npm i` to install dependencies

2. **Environment Configuration**:
   - Copy `.env.example` to `.env`
   - Update credentials in `.env` file:
     ```
     APP_URL=https://app.sully.ai
     LOGIN_EMAIL=your-email@example.com
     LOGIN_PASSWORD=your-password
     ```
   - The framework automatically loads these variables using `process.env`

3. **Code Quality Tools**:

   ```bash
   # Run ESLint to check for code issues
   npm run lint

   # Fix auto-fixable ESLint issues
   npm run lint:fix

   # Check Prettier formatting
   npm run prettier

   # Fix Prettier formatting issues
   npm run prettier:fix
   ```

4. **Run Tests**:

   ```bash
   # Run all tests
   npx playwright test

   # Run specific test file
   npx playwright test voice-flow.spec.ts

   # Run with UI
   npx playwright test --ui

   # Run with headed browser
   npx playwright test --headed
   ```

## Best Practices Implemented

- **No Visibility Waits**: Tests focus on functional behavior, not visual elements
- **Clean Test Structure**: Each test step is clearly defined and verifiable
- **Error Handling**: Graceful handling of invalid scenarios
- **Resource Cleanup**: Automatic cleanup of test data
- **Unique Test Data**: Generated unique names to avoid conflicts

## Configuration

- **Browser**: Chrome only (as requested)
- **Timeout**: 30 seconds for tests, 10 seconds for assertions
- **Screenshots**: Captured on test failure
- **Parallel Execution**: Enabled for faster test runs

## Troubleshooting

- **Element Not Found**: Check if selectors need updating based on actual app structure
- **Timeout Issues**: Increase timeout values in config if needed
- **Login Failures**: Verify credentials in .env file
- **Network Issues**: Check if app is accessible from test environment

## Extending the Framework

To add new tests:

1. Create new page objects in `tests/pages/`
2. Extend `BasePage` for common functionality
3. Add new test files in `tests/` directory
4. Update selectors based on actual app elements

## Notes

- The framework uses flexible selectors to handle potential UI changes
- Tests are designed to be end-to-end and focus on business functionality
- The structure prioritizes maintainability and reliability over broad coverage
