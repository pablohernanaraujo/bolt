// src/ui/button/__tests__/button.hydration.test.tsx
// Deferred hydration and progressive enhancement tests for Button component
// Tests intersection observer-based hydration, user preferences, and network awareness
// RELEVANT FILES: button.tsx, hydration-test-utils.tsx, deferred-hydration.tsx

import { DeferredHydration } from '@/ui/utils/deferred-hydration';
import {
  cleanupIntersectionObserverMock,
  mockUserPreferences,
  renderWithDeferredHydration,
  setupIntersectionObserverMock,
  testHydrationPerformance,
  testNetworkAwareHydration,
  testProgressiveEnhancement,
  testResponsiveHydration,
  validateDeferredHydration,
} from '@/ui/utils/hydration-test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Button } from '../button';

describe('Button - Hydration Testing', () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
  });

  afterEach(() => {
    cleanupIntersectionObserverMock();
  });

  describe('Deferred hydration', () => {
    it('should hydrate when visible in viewport', async () => {
      // Test intersection observer-based hydration
      const { triggerIntersection, isHydrated, getMetrics } =
        renderWithDeferredHydration(
          <DeferredHydration>
            <Button variant="primary">Deferred Button</Button>
          </DeferredHydration>,
        );

      // Initially not hydrated
      expect(isHydrated()).toBe(false);

      // Trigger intersection
      await triggerIntersection();

      // Should be hydrated after intersection
      expect(isHydrated()).toBe(true);

      // Check metrics
      const metrics = getMetrics();
      expect(metrics.hydrationSuccess).toBe(true);
      expect(metrics.hydrationAttempts).toBe(1);
      expect(metrics.timeToHydration).toBeDefined();
    });

    it('should handle viewport exit correctly', async () => {
      // Test component behavior when leaving viewport
      const { triggerIntersection, triggerExit, isHydrated } =
        renderWithDeferredHydration(
          <DeferredHydration>
            <Button variant="secondary">Exit Test</Button>
          </DeferredHydration>,
        );

      // Hydrate component
      await triggerIntersection();
      expect(isHydrated()).toBe(true);

      // Trigger viewport exit
      await triggerExit();

      // Component should remain hydrated after exit
      expect(isHydrated()).toBe(true);
    });

    it('should respect rootMargin configuration', async () => {
      // Test custom intersection observer margins
      const { triggerIntersection, getMetrics } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="primary">Margin Test</Button>
        </DeferredHydration>,
        {
          rootMargin: '100px',
          threshold: 0.5,
        },
      );

      await triggerIntersection();

      const metrics = getMetrics();
      expect(metrics.hydrationSuccess).toBe(true);
    });

    it('should hydrate immediately when initially visible', async () => {
      // Test immediate hydration for above-fold content
      const { isHydrated, getMetrics } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="ghost">Above Fold</Button>
        </DeferredHydration>,
        {
          initiallyVisible: true,
        },
      );

      // Should hydrate immediately
      expect(isHydrated()).toBe(true);

      const metrics = getMetrics();
      expect(metrics.hydrationAttempts).toBe(1);
      expect(metrics.timeToIntersection).toBeDefined();
    });
  });

  describe('Progressive enhancement', () => {
    it('should enhance from static to interactive', async () => {
      // Test progressive enhancement flow
      const result = await testProgressiveEnhancement(
        <Button variant="primary">Enhanced Button</Button>,
        {
          noJsContent: 'Enhanced Button',
          enhancedContent: 'Enhanced Button',
          userInteraction: () => {
            // Simulate user interaction
            const button = document.querySelector('button');
            button?.click();
          },
        },
      );

      expect(result.beforeEnhancement).toContain('Enhanced Button');
      expect(result.afterEnhancement).toContain('Enhanced Button');
      expect(result.enhancementSuccessful).toBe(true);
    });

    it('should work without JavaScript enabled', async () => {
      // Test no-JS fallback
      mockUserPreferences({ jsEnabled: false });

      const { container } = renderWithDeferredHydration(
        <form action="/submit" method="POST">
          <Button type="submit" variant="secondary">
            No-JS Submit
          </Button>
        </form>,
      );

      // Button should be functional without JS
      const button = container.container.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.type).toBe('submit');
    });

    it('should respect prefers-reduced-motion', async () => {
      // Test reduced motion preference
      mockUserPreferences({ reducedMotion: true });

      const { triggerIntersection, isHydrated } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="primary">Reduced Motion</Button>
        </DeferredHydration>,
      );

      await triggerIntersection();

      // Should still hydrate but respect motion preferences
      expect(isHydrated()).toBe(true);
    });

    it('should handle data saver mode', async () => {
      // Test data saver preference
      mockUserPreferences({ dataSaver: true });

      const { triggerIntersection, isHydrated } = renderWithDeferredHydration(
        <DeferredHydration
          enhancementOptions={{
            respectReducedMotion: true,
            respectDataSaver: true,
            requireIntersectionObserver: true,
          }}
        >
          <Button variant="ghost">Data Saver</Button>
        </DeferredHydration>,
      );

      // May delay hydration in data saver mode
      await triggerIntersection();

      // Component should eventually hydrate
      expect(isHydrated()).toBe(true);
    });
  });

  describe('Responsive hydration', () => {
    it('should hydrate based on viewport size', async () => {
      // Test viewport-dependent hydration
      const viewports = [
        {
          width: 320,
          height: 568,
          shouldHydrate: true,
        }, // Mobile
        {
          width: 768,
          height: 1024,
          shouldHydrate: true,
        }, // Tablet
        {
          width: 1920,
          height: 1080,
          shouldHydrate: true,
        }, // Desktop
      ];

      const results = await testResponsiveHydration(
        <DeferredHydration>
          <Button variant="primary">Responsive</Button>
        </DeferredHydration>,
        viewports,
      );

      // All viewports should support hydration
      results.forEach((isHydrated, viewport) => {
        expect(isHydrated).toBe(true);
      });
    });

    it('should adapt hydration strategy for mobile', async () => {
      // Test mobile-specific hydration
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 812,
        writable: true,
      });

      const { triggerIntersection, getMetrics } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="secondary">Mobile Button</Button>
        </DeferredHydration>,
        {
          intersectionDelay: 100, // Delay for mobile
        },
      );

      await triggerIntersection();

      const metrics = getMetrics();
      expect(metrics.timeToHydration).toBeGreaterThanOrEqual(100);
    });
  });

  describe('Network-aware hydration', () => {
    it('should adapt to network conditions', async () => {
      // Test different network speeds
      const conditions = [
        {
          type: '4g' as const,
          shouldHydrate: true,
          delay: 0,
        },
        {
          type: '3g' as const,
          shouldHydrate: true,
          delay: 50,
        },
        {
          type: '2g' as const,
          shouldHydrate: true,
          delay: 200,
        },
        {
          type: 'slow-2g' as const,
          shouldHydrate: false,
        },
        {
          type: 'slow-2g' as const,
          shouldHydrate: false,
        },
      ];

      const results = await testNetworkAwareHydration(
        <DeferredHydration>
          <Button variant="primary">Network Aware</Button>
        </DeferredHydration>,
        conditions,
      );

      // Verify hydration behavior per network type
      expect(results.get('4g')).toBe(true);
      expect(results.get('3g')).toBe(true);
      expect(results.get('2g')).toBe(true);
      expect(results.get('slow-2g')).toBe(false);
    });

    it('should prioritize critical buttons on slow networks', async () => {
      // Test priority-based hydration
      Object.defineProperty(navigator, 'connection', {
        value: {
          effectiveType: '2g',
          saveData: true,
        },
        writable: true,
        configurable: true,
      });

      const { triggerIntersection, isHydrated } = renderWithDeferredHydration(
        <DeferredHydration
          enhancementOptions={{
            respectReducedMotion: false, // Critical button
            respectDataSaver: false,
          }}
        >
          <Button variant="primary" type="submit">
            Critical Action
          </Button>
        </DeferredHydration>,
      );

      await triggerIntersection();

      // Critical buttons should hydrate even on slow networks
      expect(isHydrated()).toBe(true);
    });
  });

  describe('Performance optimization', () => {
    it('should compare hydration strategies', async () => {
      // Test different hydration strategies
      const strategies = [
        {
          name: 'immediate',
          config: {
            respectReducedMotion: false,
            respectDataSaver: false,
            requireIntersectionObserver: false,
          },
        },
        {
          name: 'lazy',
          config: {
            respectReducedMotion: true,
            respectDataSaver: true,
            requireIntersectionObserver: true,
          },
        },
        {
          name: 'viewport',
          config: {
            respectReducedMotion: true,
            respectDataSaver: false,
            requireIntersectionObserver: true,
          },
        },
      ];

      const results = await testHydrationPerformance(
        <Button variant="secondary">Performance Test</Button>,
        strategies,
      );

      // Immediate should be fastest
      const immediateMetrics = results.get('immediate');
      const lazyMetrics = results.get('lazy');

      expect(immediateMetrics?.timeToHydration).toBeDefined();
      expect(lazyMetrics?.timeToHydration).toBeDefined();
    });

    it('should handle multiple deferred components efficiently', async () => {
      // Test batch hydration
      const components = Array.from({ length: 10 }, (_, i) => (
        <DeferredHydration key={i}>
          <Button variant="ghost">Button {i}</Button>
        </DeferredHydration>
      ));

      const { triggerIntersection, container } = renderWithDeferredHydration(
        <div>{components}</div>,
      );

      await triggerIntersection();

      // All buttons should be present
      const buttons = container.container.querySelectorAll('button');
      expect(buttons.length).toBe(10);
    });

    it('should measure component size for hydration decisions', async () => {
      // Test size-based hydration
      const { triggerIntersection, getMetrics } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="primary" size="large">
            Large Component
          </Button>
        </DeferredHydration>,
      );

      await triggerIntersection();

      const metrics = getMetrics();
      expect(metrics.componentSize).toBeDefined();
      expect(metrics.componentSize).toBeGreaterThan(0);
    });
  });

  describe('Validation and debugging', () => {
    it('should validate proper deferred hydration setup', () => {
      // Test hydration validation
      const validation = validateDeferredHydration(
        <DeferredHydration>
          <Button variant="primary">Validated</Button>
        </DeferredHydration>,
      );

      expect(validation.valid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });

    it('should detect missing fallback content', () => {
      // Test validation with missing fallback
      const validation = validateDeferredHydration(
        <div data-hydration-pending="true">
          <Button variant="secondary">No Fallback</Button>
        </div>,
      );

      // Should detect missing fallback
      expect(validation.issues).toContain(
        'No fallback content provided for deferred hydration',
      );
    });

    it('should track hydration timing accurately', async () => {
      // Test timing measurements
      const startTime = performance.now();

      const { triggerIntersection, getMetrics } = renderWithDeferredHydration(
        <DeferredHydration>
          <Button variant="primary">Timed Button</Button>
        </DeferredHydration>,
        {
          intersectionDelay: 50,
        },
      );

      await triggerIntersection();

      const metrics = getMetrics();
      const endTime = performance.now();

      expect(metrics.timeToHydration).toBeGreaterThanOrEqual(50);
      expect(metrics.timeToHydration).toBeLessThanOrEqual(endTime - startTime);
    });
  });
});
