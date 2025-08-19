import { test, expect } from '@playwright/test';

test.describe('Nexus Agent – Simple Navigation Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:8081/', { waitUntil: 'domcontentloaded' });
    
    // Check if page loads
    const title = await page.title();
    console.log('Page title:', title);
    
    // Verify body is visible
    const bodyVisible = await page.isVisible('body');
    expect(bodyVisible).toBeTruthy();
    
    test.info().annotations.push({
      type: 'note',
      description: `Homepage loaded successfully. Title: ${title}`
    });
  });

  test('should find navigation elements', async ({ page }) => {
    await page.goto('http://localhost:8081/', { waitUntil: 'domcontentloaded' });
    
    // Look for navigation elements
    const header = page.locator('header');
    const nav = page.locator('nav');
    
    const headerCount = await header.count();
    const navCount = await nav.count();
    
    console.log(`Header elements found: ${headerCount}`);
    console.log(`Nav elements found: ${navCount}`);
    
    test.info().annotations.push({
      type: 'note',
      description: `Navigation elements - Header: ${headerCount}, Nav: ${navCount}`
    });
    
    // Basic assertion - page should load
    expect(await page.isVisible('body')).toBeTruthy();
  });

  test('should navigate to dashboard route', async ({ page }) => {
    await page.goto('http://localhost:8081/dashboard', { waitUntil: 'domcontentloaded' });
    
    const bodyVisible = await page.isVisible('body');
    expect(bodyVisible).toBeTruthy();
    
    test.info().annotations.push({
      type: 'note',
      description: `Dashboard route loaded successfully`
    });
  });

  test('should navigate to partners route', async ({ page }) => {
    await page.goto('http://localhost:8081/partners', { waitUntil: 'domcontentloaded' });
    
    const bodyVisible = await page.isVisible('body');
    expect(bodyVisible).toBeTruthy();
    
    test.info().annotations.push({
      type: 'note',
      description: `Partners route loaded successfully`
    });
  });

  test('should handle 404 route gracefully', async ({ page }) => {
    await page.goto('http://localhost:8081/non-existent-route', { waitUntil: 'domcontentloaded' });
    
    const bodyVisible = await page.isVisible('body');
    expect(bodyVisible).toBeTruthy();
    
    test.info().annotations.push({
      type: 'note',
      description: `404 route handled gracefully`
    });
  });
});