# Nexus Agent - Playwright Test Suite

This directory contains comprehensive end-to-end tests for the Nexus Agent application using Playwright.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Playwright browsers installed

### Installation
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install browser binaries
npx playwright install
```

### Running Tests

#### Basic Test Execution
```bash
# Run all tests
npm test

# Run tests with UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

#### Environment-Specific Testing
```bash
# Run with navigation as mandatory (staging/prod)
EXPECT_NAV=true npm test

# Run with navigation as optional (development)
npm test
```

#### Test Reports
```bash
# View HTML test report
npm run test:report
```

## 📁 Test Structure

### `navigation.spec.ts`
Core navigation smoke tests that verify:
- ✅ Navigation elements rendering
- ✅ Route accessibility (Dashboard, Ask Dara, Partners, etc.)
- ✅ 404 handling
- ✅ Navigation link functionality
- ✅ Mobile responsiveness

### `sfdr-navigator.spec.ts`
Specialized tests for SFDR (Sustainable Finance Disclosure Regulation) functionality:
- ✅ SFDR Navigator route testing
- ✅ SFDR content verification on dashboard
- ✅ SFDR API endpoint handling
- ✅ Compliance features detection
- ✅ Mobile SFDR navigation

## 🎯 Testing Strategy

### 1. **Conditional Assertions**
The tests use environment variables to adapt to different deployment stages:

```bash
# Development (navigation optional)
npm test

# Production (navigation mandatory)
EXPECT_NAV=true npm test
```

### 2. **API Mocking**
Tests mock backend APIs to isolate frontend testing:
- `/api/navigation` - Navigation structure
- `/api/sfdr/**` - SFDR-specific endpoints

### 3. **Hydration Handling**
Tests wait for React hydration to complete:
```typescript
await page.waitForSelector('body', { state: 'visible', timeout: 10000 });
```

### 4. **Traceability**
All tests include annotations for debugging:
```typescript
test.info().annotations.push({
  type: 'note',
  description: 'Detailed test information'
});
```

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- **Base URL**: `http://localhost:5173` (Vite dev server)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Web Server**: Auto-starts `npm run dev`
- **Reporting**: HTML reports with screenshots and videos on failure

### Environment Variables
- `EXPECT_NAV`: Set to `true` to make navigation elements mandatory
- `CI`: Automatically set in CI environments

## 🐛 Debugging

### View Test Reports
```bash
npm run test:report
```

### Debug Mode
```bash
npm run test:debug
```

### UI Mode (Interactive)
```bash
npm run test:ui
```

### Screenshots and Videos
- Screenshots: `test-results/` directory
- Videos: `test-results/` directory (on failure)
- Traces: `test-results/` directory (on retry)

## 📊 Test Coverage

### Navigation Coverage
- [x] Main navigation elements
- [x] Route accessibility
- [x] Mobile navigation
- [x] 404 handling
- [x] Link functionality

### SFDR Coverage
- [x] SFDR Navigator route
- [x] Dashboard SFDR content
- [x] API endpoint handling
- [x] Compliance features
- [x] Mobile SFDR navigation

### Cross-Browser Coverage
- [x] Chromium (Chrome/Edge)
- [x] Firefox
- [x] WebKit (Safari)
- [x] Mobile Chrome
- [x] Mobile Safari

## 🚨 Common Issues

### 1. **Hydration Issues**
If tests fail with "body not visible":
- Increase timeout in `waitForSelector`
- Check for JavaScript errors in browser console

### 2. **Navigation Not Found**
If navigation elements aren't detected:
- Check if `EXPECT_NAV=true` is needed
- Verify navigation components are rendered
- Check for CSS visibility issues

### 3. **API Mocking Issues**
If API mocks aren't working:
- Verify route patterns match actual API calls
- Check network tab for actual API endpoints
- Update mock responses to match real schema

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📈 Best Practices

1. **Keep Tests Fast**: Use `waitUntil: 'domcontentloaded'` when possible
2. **Isolate Tests**: Each test should be independent
3. **Use Meaningful Selectors**: Prefer data-testid attributes
4. **Handle Async Operations**: Always wait for elements to be ready
5. **Mock External Dependencies**: Don't rely on external APIs
6. **Add Annotations**: Include detailed test information
7. **Test Mobile**: Always include mobile viewport tests

## 🤝 Contributing

When adding new tests:
1. Follow the existing naming convention
2. Include proper annotations
3. Add to appropriate test file
4. Update this README if needed
5. Test across multiple browsers

## 📞 Support

For test-related issues:
1. Check the test reports first
2. Run in debug mode for detailed logs
3. Verify browser compatibility
4. Check for environment-specific issues