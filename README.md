# Ezra Assessment - Automation Framework

This project contains a Playwright automation framework for testing Ezra's scan booking and payment processes using the Page Object Model (POM) pattern.

## Project Structure

```
ezra-assessment/
├── src/
│   ├── pages/                    # Page Object classes
│   │   ├── BasePage.ts           # Base page with common methods
│   │   ├── LoginPage.ts          # Login page functionality
│   │   ├── DashboardPage.ts      # Dashboard navigation
│   │   ├── BookingPage.ts        # Scan booking functionality
│   │   └── CheckoutPage.ts       # Payment checkout process
│   ├── datafactory/              # Test data factories
│   │   └── creditCards.tsx       # Credit card data generation
│   ├── types/                    # TypeScript type definitions
│   │   └── creditCard.ts         # Credit card type definitions
│   └── tests/                    # Test files
│       └── ezra.spec.ts          # Main test file
├── fixtures/                     # Test fixtures
│   └── fixtures.ts               # Custom test fixtures with page objects
├── .env                          # Environment variables (not committed)
├── .env.example                  # Environment variables template
├── playwright.config.ts          # Playwright configuration
└── package.json                  # Project dependencies
```

## Framework Features

- **Page Object Model (POM)**: Clean separation of page logic and test logic for maintainability
- **Custom Fixtures**: Reusable page object instances injected into tests
- **Environment Configuration**: Secure credential management using .env file
- **Base Page Class**: Common methods (waitForElement, getPageTitle) for code reuse
- **Data Factory Pattern**: Centralized test data generation for credit cards
- **TypeScript**: Type-safe code with proper type definitions
- **Code Quality Tools**: ESLint and Prettier for consistent code style

## Setup Instructions

### Prerequisites

**Important**: Before running the tests, ensure that:
- A user account has already been created in the Ezra staging environment
- The user's profile is complete with all required information, including:
  - **Birthday** (must be filled in)
  - Any other required profile fields

The tests assume a fully configured user account and will fail if required profile information is missing.

### Installation Steps

1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/en/download) or use Homebrew:
     ```bash
     brew install node
     ```
   - Verify installation:
     ```bash
     node -v
     npm -v
     ```

2. **Clone and Navigate**:
   ```bash
   git clone <repository-url>
   cd ezra-assessment
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Install Playwright Browsers**:
   ```bash
   npx playwright install
   ```

5. **Environment Configuration**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update credentials in `.env` file:
     ```
     APP_URL=https://myezra-staging.ezra.com/
     LOGIN_EMAIL=your-email@example.com
     LOGIN_PASSWORD=your-password
     ```
   - The framework automatically loads these variables using `dotenv`

6. **Code Quality Tools** (Optional):
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

### Running Tests

```bash
# Run all tests
npm test

# Run with UI mode (recommended for debugging)
npm run test:ui

# Run with headed browser (see browser actions)
npm run test:headed

# View test report
npm run report
```

## Assumptions, Trade-offs, and Design Decisions

### Assumptions

1. **Pre-configured User Account**: The tests assume a user account already exists with complete profile information (including birthday). The framework does not handle user registration or profile completion flows.

2. **Staging Environment**: Tests are designed for the Ezra staging environment (`myezra-staging.ezra.com`). Production URLs and configurations would need to be updated for production testing.

3. **Stable UI Elements**: The framework assumes relatively stable UI selectors. While using multiple selector strategies improves reliability, significant UI changes may require selector updates.

4. **Payment Gateway**: Tests assume the payment gateway (Stripe) iframe structure remains consistent. The framework handles iframe navigation for payment form interactions.

5. **Test Data**: Credit card test data is generated using a data factory pattern. The framework includes support for various card scenarios (valid, declined, etc.) using test card numbers.

### Trade-offs

1. **Browser Support**: Currently configured for Chromium only. While Playwright supports multiple browsers, focusing on one browser allows for faster test execution and simpler maintenance.

2. **Test Coverage**: The framework focuses on critical user journeys (booking and payment) rather than comprehensive UI coverage. This prioritizes business-critical functionality over exhaustive testing.

3. **Wait Strategies**: Uses explicit waits with reasonable timeouts (30 seconds for assertions, 120 seconds for tests). This balances reliability with execution speed.

4. **Parallel Execution**: Enabled in local development but limited to 1 worker in CI to reduce resource contention and improve stability.

5. **Slow Motion**: Configured with 500ms slowMo for better visibility during test execution, which slightly increases test duration but improves debugging capabilities.

### Scalability Considerations

1. **Page Object Model**: The POM pattern allows for easy extension. New pages can be added by:
   - Creating a new page class extending `BasePage`
   - Adding the page to fixtures for dependency injection
   - Using the page in tests through fixtures

2. **Fixture Pattern**: Custom fixtures provide reusable page object instances, reducing boilerplate and ensuring consistent initialization across tests.

3. **Data Factory**: Centralized test data generation makes it easy to add new test scenarios and maintain test data consistency.

4. **TypeScript**: Strong typing helps catch errors at compile time and improves IDE support, making the codebase more maintainable as it grows.

5. **Configuration Management**: Environment-based configuration allows easy switching between environments without code changes.

### Future Implementations

1. **Cross-Browser Testing**: Extend support to Firefox and WebKit for broader browser coverage.

2. **API Testing Integration**: Add API tests for backend validation and faster feedback loops, complementing E2E tests.

3. **Visual Regression Testing**: Implement screenshot comparison testing to catch unintended UI changes.

4. **Test Data Management**: 
   - Implement test data cleanup mechanisms
   - Add database seeding/teardown for isolated test runs
   - Create test user provisioning scripts

5. **Enhanced Reporting**: 
   - Integrate with test reporting tools (Allure, TestRail)
   - Add video recording for failed tests
   - Implement custom HTML reports with screenshots

6. **CI/CD Integration**: 
   - Optimize test execution for CI pipelines
   - Add test result notifications (Slack, email)
   - Implement test result trend analysis

7. **Accessibility Testing**: Add automated accessibility checks using Playwright's accessibility features.

8. **Performance Testing**: Integrate performance metrics collection (page load times, API response times).

9. **Mobile Testing**: Extend framework to support mobile viewport testing and responsive design validation.

10. **Test Maintenance**: 
    - Implement selector versioning/fallback strategies
    - Add automated selector health checks
    - Create maintenance scripts for common updates

## Configuration

- **Browser**: Chromium (Chrome)
- **Test Timeout**: 120 seconds
- **Assertion Timeout**: 30 seconds
- **Screenshots**: Captured on test failure
- **Traces**: Captured on first retry
- **Parallel Execution**: Enabled locally, limited in CI
- **Slow Motion**: 500ms delay between actions

## Troubleshooting

- **Element Not Found**: Check if selectors need updating based on actual app structure. Use Playwright's codegen tool (`npx playwright codegen`) to generate updated selectors.

- **Timeout Issues**: Increase timeout values in `playwright.config.ts` if needed, or check network connectivity.

- **Login Failures**: 
  - Verify credentials in `.env` file
  - Ensure user account exists and is active
  - Check if user profile is complete (birthday and other required fields)

- **Payment Form Issues**: Verify iframe selectors match current payment gateway implementation. Check browser console for JavaScript errors.

- **Network Issues**: Ensure the staging environment is accessible from your network and not behind a VPN requirement.

## Architecture Notes

The framework follows production-level best practices:

- **Separation of Concerns**: Page objects handle UI interactions, tests focus on business logic
- **Dependency Injection**: Fixtures provide clean test setup and teardown
- **Reusability**: Common functionality extracted to base classes
- **Maintainability**: Clear structure and naming conventions
- **Type Safety**: TypeScript ensures compile-time error detection
- **Error Handling**: Graceful handling of edge cases and failures
- **Documentation**: Inline comments and clear method names for self-documenting code
