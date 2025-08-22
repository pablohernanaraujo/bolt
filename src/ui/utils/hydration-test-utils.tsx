/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/ui/utils/hydration-test-utils.tsx
// Deferred hydration and progressive enhancement testing utilities
// Provides utilities to test intersection observer-based hydration and user preference handling
// RELEVANT FILES: ssr-test-utils.tsx, rsc-test-utils.tsx, deferred-hydration.tsx

import { render, waitFor, type RenderResult } from '@testing-library/react';
import { ReactNode, type ReactElement } from 'react';
import { vi } from 'vitest';
import type { ProgressiveEnhancementOptions } from './progressive-enhancement';

/**
 * Options for deferred hydration testing
 */
export interface HydrationTestOptions {
  /** Initial visibility of the component */
  initiallyVisible?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for intersection observer */
  threshold?: number | number[];
  /** Mock user preferences */
  userPreferences?: {
    reducedMotion?: boolean;
    dataSaver?: boolean;
    jsEnabled?: boolean;
  };
  /** Delay before triggering intersection */
  intersectionDelay?: number;
  /** Whether to test progressive enhancement */
  testProgressive?: boolean;
}

/**
 * Result of deferred hydration test
 */
export interface DeferredHydrationTestResult {
  /** The render result */
  container: RenderResult;
  /** Trigger intersection for the component */
  triggerIntersection: () => Promise<void>;
  /** Trigger viewport exit */
  triggerExit: () => Promise<void>;
  /** Check if component is hydrated */
  isHydrated: () => boolean;
  /** Get hydration timing metrics */
  getMetrics: () => HydrationMetrics;
  /** Mock IntersectionObserver instance */
  observer: MockIntersectionObserver;
}

/**
 * Hydration timing metrics
 */
export interface HydrationMetrics {
  /** Time to first intersection */
  timeToIntersection?: number;
  /** Time to hydration complete */
  timeToHydration?: number;
  /** Number of hydration attempts */
  hydrationAttempts: number;
  /** Whether hydration was successful */
  hydrationSuccess: boolean;
  /** Size of hydrated component */
  componentSize?: number;
}

/**
 * Mock IntersectionObserver for testing
 */
export class MockIntersectionObserver {
  private callbacks: Map<Element, IntersectionObserverCallback> = new Map();
  private observations: Map<Element, boolean> = new Map();
  private options: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.options = options;
    // Store callback for each observed element
    this.observe = this.observe.bind(this);
    this.unobserve = this.unobserve.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.triggerIntersection = this.triggerIntersection.bind(this);
  }

  observe(element: Element): void {
    this.callbacks.set(
      element,
      this.callbacks.values().next().value || (() => {}),
    );
    this.observations.set(element, false);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observations.delete(element);
  }

  disconnect(): void {
    this.callbacks.clear();
    this.observations.clear();
  }

  triggerIntersection(element: Element, isIntersecting: boolean): void {
    const callback = this.callbacks.get(element);
    if (callback) {
      const entry: IntersectionObserverEntry = {
        target: element,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRect: isIntersecting
          ? element.getBoundingClientRect()
          : new DOMRect(),
        rootBounds: null,
        time: performance.now(),
      };
      callback([entry], this as any);
      this.observations.set(element, isIntersecting);
    }
  }

  isObserving(element: Element): boolean {
    return this.callbacks.has(element);
  }

  getIntersectionState(element: Element): boolean | undefined {
    return this.observations.get(element);
  }
}

// Global storage for mock observers
const mockObservers: MockIntersectionObserver[] = [];

/**
 * Setup mock IntersectionObserver for testing
 */
export function setupIntersectionObserverMock(): void {
  global.IntersectionObserver = vi.fn((callback, options) => {
    const observer = new MockIntersectionObserver(callback, options);
    mockObservers.push(observer);
    return observer as any;
  }) as any;
}

/**
 * Cleanup mock IntersectionObserver
 */
export function cleanupIntersectionObserverMock(): void {
  mockObservers.length = 0;
  if ('IntersectionObserver' in global) {
    delete (global as any).IntersectionObserver;
  }
}

/**
 * Test a component with deferred hydration
 */
export function renderWithDeferredHydration(
  component: ReactElement,
  options: HydrationTestOptions = {},
): DeferredHydrationTestResult {
  const {
    initiallyVisible = false,
    userPreferences = {},
    intersectionDelay = 0,
  } = options;

  // Setup intersection observer mock
  setupIntersectionObserverMock();

  // Setup user preferences
  mockUserPreferences(userPreferences);

  // Track metrics
  const metrics: HydrationMetrics = {
    hydrationAttempts: 0,
    hydrationSuccess: false,
  };

  const startTime = performance.now();

  // Render the component
  const renderResult = render(component);

  // Get the most recent mock observer
  const observer = mockObservers[mockObservers.length - 1];

  // Trigger intersection for component
  const triggerIntersection = async (): Promise<void> => {
    if (intersectionDelay > 0) {
      await new Promise((resolve) => setTimeout(resolve, intersectionDelay));
    }

    metrics.timeToIntersection = performance.now() - startTime;
    metrics.hydrationAttempts++;

    // Find observed elements and trigger intersection
    const elements = renderResult.container.querySelectorAll(
      '[data-hydration-pending]',
    );
    elements.forEach((element) => {
      if (observer && observer.isObserving(element)) {
        observer.triggerIntersection(element, true);
      }
    });

    // Wait for hydration to complete
    await waitFor(() => {
      const hydrated = renderResult.container.querySelector(
        '[data-hydrated="true"]',
      );
      if (hydrated) {
        metrics.timeToHydration = performance.now() - startTime;
        metrics.hydrationSuccess = true;
      }
    });
  };

  // Trigger viewport exit
  const triggerExit = async (): Promise<void> => {
    const elements = renderResult.container.querySelectorAll(
      '[data-hydrated="true"]',
    );
    elements.forEach((element) => {
      if (observer && observer.isObserving(element)) {
        observer.triggerIntersection(element, false);
      }
    });
  };

  // Check if component is hydrated
  const isHydrated = (): boolean => {
    const hydrated = renderResult.container.querySelector(
      '[data-hydrated="true"]',
    );
    return hydrated !== null;
  };

  // Get metrics
  const getMetrics = (): HydrationMetrics => {
    // Calculate component size if hydrated
    if (metrics.hydrationSuccess) {
      const element = renderResult.container.firstElementChild;
      if (element) {
        const rect = element.getBoundingClientRect();
        metrics.componentSize = rect.width * rect.height;
      }
    }
    return { ...metrics };
  };

  // Trigger initial intersection if specified
  if (initiallyVisible) {
    triggerIntersection();
  }

  return {
    container: renderResult,
    triggerIntersection,
    triggerExit,
    isHydrated,
    getMetrics,
    observer,
  };
}

/**
 * Mock user preferences for testing
 */
export function mockUserPreferences(preferences: {
  reducedMotion?: boolean;
  dataSaver?: boolean;
  jsEnabled?: boolean;
}): void {
  // Mock matchMedia for prefers-reduced-motion
  if (preferences.reducedMotion !== undefined) {
    window.matchMedia = vi.fn((query: string) => {
      if (query === '(prefers-reduced-motion: reduce)') {
        return {
          matches: preferences.reducedMotion,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        } as MediaQueryList;
      }
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      } as MediaQueryList;
    }) as any;
  }

  // Mock navigator.connection for data saver
  if (preferences.dataSaver !== undefined) {
    Object.defineProperty(navigator, 'connection', {
      value: {
        saveData: preferences.dataSaver,
        effectiveType: preferences.dataSaver ? '2g' : '4g',
      },
      writable: true,
      configurable: true,
    });
  }

  // Mock JavaScript enabled state
  if (preferences.jsEnabled !== undefined) {
    Object.defineProperty(document.documentElement, 'classList', {
      value: {
        contains: (className: string) => {
          if (className === 'no-js') return !preferences.jsEnabled;
          return false;
        },
        add: vi.fn(),
        remove: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
  }
}

/**
 * Test progressive enhancement behavior
 */
export async function testProgressiveEnhancement(
  component: ReactElement,
  options: {
    noJsContent: string;
    enhancedContent: string;
    userInteraction?: () => void;
  },
): Promise<{
  beforeEnhancement: string;
  afterEnhancement: string;
  enhancementSuccessful: boolean;
}> {
  // First render without JS (simulate SSR)
  mockUserPreferences({ jsEnabled: false });
  const { container } = render(component);
  const beforeEnhancement = container.textContent || '';

  // Enable JS and trigger enhancement
  mockUserPreferences({ jsEnabled: true });

  // Trigger user interaction if provided
  if (options.userInteraction) {
    options.userInteraction();
  }

  // Wait for enhancement
  await waitFor(() => {
    const enhanced = container.textContent || '';
    return enhanced !== beforeEnhancement;
  });

  const afterEnhancement = container.textContent || '';

  return {
    beforeEnhancement,
    afterEnhancement,
    enhancementSuccessful: afterEnhancement.includes(options.enhancedContent),
  };
}

/**
 * Test hydration with different viewport sizes
 */
export async function testResponsiveHydration(
  component: ReactElement,
  viewports: Array<{ width: number; height: number; shouldHydrate: boolean }>,
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();

  for (const viewport of viewports) {
    // Mock viewport size
    Object.defineProperty(window, 'innerWidth', {
      value: viewport.width,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: viewport.height,
      writable: true,
      configurable: true,
    });

    // Test hydration
    const { triggerIntersection, isHydrated } =
      renderWithDeferredHydration(component);

    if (viewport.shouldHydrate) {
      await triggerIntersection();
    }

    const key = `${viewport.width}x${viewport.height}`;
    results.set(key, isHydrated());
  }

  return results;
}

/**
 * Test hydration performance with different strategies
 */
export async function testHydrationPerformance(
  component: ReactElement,
  strategies: Array<{
    name: string;
    config: ProgressiveEnhancementOptions;
  }>,
): Promise<Map<string, HydrationMetrics>> {
  const results = new Map<string, HydrationMetrics>();

  for (const strategy of strategies) {
    // Apply strategy configuration
    const wrappedComponent = (
      <div data-enhancement-strategy={strategy.name}>{component}</div>
    );

    const { triggerIntersection, getMetrics } =
      renderWithDeferredHydration(wrappedComponent);
    await triggerIntersection();

    results.set(strategy.name, getMetrics());
  }

  return results;
}

/**
 * Validate that a component properly implements deferred hydration
 */
export function validateDeferredHydration(component: ReactElement): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Render component
  const { container } = render(component);

  // Check for required attributes
  const element = container.firstElementChild;
  if (!element) {
    issues.push('No root element found');
    return {
      valid: false,
      issues,
    };
  }

  // Check for hydration markers
  if (
    !element.hasAttribute('data-hydration-pending') &&
    !element.hasAttribute('data-hydrated')
  ) {
    issues.push('Missing hydration status attributes');
  }

  // Check for fallback content
  const fallback = container.querySelector('[data-hydration-fallback]');
  if (!fallback) {
    issues.push('No fallback content provided for deferred hydration');
  }

  // Check for intersection observer setup
  if (!mockObservers.length) {
    issues.push('IntersectionObserver not initialized');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Test hydration with network conditions
 */
export async function testNetworkAwareHydration(
  component: ReactElement,
  conditions: Array<{
    type: '4g' | '3g' | '2g' | 'slow-2g';
    shouldHydrate: boolean;
    delay?: number;
  }>,
): Promise<Map<string, boolean>> {
  const results = new Map<string, boolean>();

  for (const condition of conditions) {
    // Mock network conditions
    Object.defineProperty(navigator, 'connection', {
      value: {
        effectiveType: condition.type,
        saveData: condition.type === '2g' || condition.type === 'slow-2g',
        downlink:
          condition.type === '4g' ? 10 : condition.type === '3g' ? 1.5 : 0.5,
      },
      writable: true,
      configurable: true,
    });

    const { triggerIntersection, isHydrated } = renderWithDeferredHydration(
      component,
      { intersectionDelay: condition.delay },
    );

    if (condition.shouldHydrate) {
      await triggerIntersection();
    }

    results.set(condition.type, isHydrated());
  }

  return results;
}

/**
 * Create a test wrapper for deferred hydration components
 */
export function createHydrationTestWrapper(
  options: HydrationTestOptions = {},
): React.FC<{ children: ReactNode }> {
  const HydrationTestWrapper = ({
    children,
  }: {
    children: ReactNode;
  }): ReactElement => {
    // Apply test-specific configuration
    mockUserPreferences(options.userPreferences || {});

    return (
      <div
        data-test-hydration="true"
        data-test-options={JSON.stringify(options)}
      >
        {children}
      </div>
    );
  };

  HydrationTestWrapper.displayName = 'HydrationTestWrapper';
  return HydrationTestWrapper;
}
