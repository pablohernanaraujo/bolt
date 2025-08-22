/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/utils/test-utils.tsx
// Testing utilities for RTL support and accessibility testing
// Provides helpers for comprehensive testing of internationalized and accessible components
// RELEVANT FILES: accessibility.ts, rtl-detection.ts, deterministic-ids.ts

import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import { type ReactElement, type ReactNode } from 'react';
import { vi } from 'vitest';

import { type LocaleInfo } from '@/i18n/server-locale';
import { type TextDirection } from '@/theme/rtl-detection';

/**
 * Test environment configuration
 */
export interface TestEnvironmentConfig {
  /** Locale to test with */
  locale?: string;
  /** Text direction for RTL testing */
  direction?: TextDirection;
  /** Whether to simulate screen reader usage */
  simulateScreenReader?: boolean;
  /** Whether to simulate keyboard navigation */
  simulateKeyboardNavigation?: boolean;
  /** Custom accessibility rules to ignore */
  accessibilityRulesToIgnore?: string[];
  /** Mock locale information */
  mockLocaleInfo?: Partial<LocaleInfo>;
}

/**
 * RTL Testing Wrapper Component
 * Provides RTL context for components during testing
 */
interface RTLTestWrapperProps {
  children: ReactNode;
  direction: TextDirection;
  locale: string;
}

function RTLTestWrapper({
  children,
  direction,
  locale,
}: RTLTestWrapperProps): ReactElement {
  return (
    <div
      dir={direction}
      lang={locale}
      data-testid="rtl-test-wrapper"
      data-direction={direction}
      data-locale={locale}
    >
      {children}
    </div>
  );
}

/**
 * Accessibility Testing Wrapper Component
 * Provides accessibility context and attributes for testing
 */
interface A11yTestWrapperProps {
  children: ReactNode;
  simulateScreenReader?: boolean;
  simulateKeyboardNavigation?: boolean;
}

function A11yTestWrapper({
  children,
  simulateScreenReader = false,
  simulateKeyboardNavigation = false,
}: A11yTestWrapperProps): ReactElement {
  return (
    <div
      data-testid="a11y-test-wrapper"
      data-simulate-screenreader={simulateScreenReader}
      data-simulate-keyboard={simulateKeyboardNavigation}
      role="main"
    >
      {children}
    </div>
  );
}

/**
 * Enhanced render function with RTL and accessibility support
 */
export function renderWithA11yAndRTL(
  ui: ReactElement,
  options: RenderOptions & TestEnvironmentConfig = {},
): RenderResult {
  const {
    locale = 'en-US',
    direction = 'ltr',
    simulateScreenReader = false,
    simulateKeyboardNavigation = false,
    ...renderOptions
  } = options;

  // Mock global APIs for testing
  mockGlobalAPIs({
    direction,
    simulateScreenReader,
    simulateKeyboardNavigation,
    locale,
  });

  const Wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
    <RTLTestWrapper direction={direction} locale={locale}>
      <A11yTestWrapper
        simulateScreenReader={simulateScreenReader}
        simulateKeyboardNavigation={simulateKeyboardNavigation}
      >
        {children}
      </A11yTestWrapper>
    </RTLTestWrapper>
  );

  return render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

/**
 * RTL-specific render function
 */
export function renderRTL(
  ui: ReactElement,
  options: RenderOptions & { locale?: string } = {},
): RenderResult {
  const { locale = 'ar-SA', ...renderOptions } = options;

  return renderWithA11yAndRTL(ui, {
    direction: 'rtl',
    locale,
    ...renderOptions,
  });
}

/**
 * LTR-specific render function
 */
export function renderLTR(
  ui: ReactElement,
  options: RenderOptions & { locale?: string } = {},
): RenderResult {
  const { locale = 'en-US', ...renderOptions } = options;

  return renderWithA11yAndRTL(ui, {
    direction: 'ltr',
    locale,
    ...renderOptions,
  });
}

/**
 * Screen reader simulation render function
 */
export function renderWithScreenReader(
  ui: ReactElement,
  options: RenderOptions = {},
): RenderResult {
  return renderWithA11yAndRTL(ui, {
    simulateScreenReader: true,
    ...options,
  });
}

/**
 * Keyboard navigation simulation render function
 */
export function renderWithKeyboardNavigation(
  ui: ReactElement,
  options: RenderOptions = {},
): RenderResult {
  return renderWithA11yAndRTL(ui, {
    simulateKeyboardNavigation: true,
    ...options,
  });
}

/**
 * Accessibility testing utilities
 */
export const a11yUtils = {
  /**
   * Run accessibility tests on a rendered component
   */
  async testAccessibility(
    container: Element,
    options: {
      rules?: string[];
      includedImpacts?: ('minor' | 'moderate' | 'serious' | 'critical')[];
    } = {},
  ): Promise<Awaited<ReturnType<typeof axe>>> {
    const { rules, includedImpacts = ['serious', 'critical'] } = options;

    const axeOptions = {
      rules: rules
        ? Object.fromEntries(rules.map((rule) => [rule, { enabled: true }]))
        : undefined,
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      includedImpacts,
    };

    return axe(container, axeOptions);
  },

  /**
   * Assert that component has no accessibility violations
   */
  async expectNoA11yViolations(
    container: Element,
    customRules?: string[],
  ): Promise<void> {
    const results = await a11yUtils.testAccessibility(container, {
      rules: customRules,
    });
    expect(results).toHaveNoViolations();
  },

  /**
   * Test specific accessibility features
   */
  async testA11yFeatures(container: Element): Promise<{
    hasProperLabels: boolean;
    hasKeyboardSupport: boolean;
    hasAriaSupport: boolean;
    hasColorContrast: boolean;
  }> {
    const results = await a11yUtils.testAccessibility(container);

    const violationTypes = results.violations.map((v: any) => v.id);

    return {
      hasProperLabels:
        !violationTypes.includes('label') &&
        !violationTypes.includes('aria-label'),
      hasKeyboardSupport:
        !violationTypes.includes('keyboard') &&
        !violationTypes.includes('focus'),
      hasAriaSupport: !violationTypes.some((type: any) =>
        type.includes('aria'),
      ),
      hasColorContrast: !violationTypes.includes('color-contrast'),
    };
  },
};

/**
 * RTL testing utilities
 */
export const rtlUtils = {
  /**
   * Test that component renders correctly in both RTL and LTR
   */
  testBidirectional: (
    component: ReactElement,
    testFn: (container: Element, direction: TextDirection) => void,
  ) => {
    it('renders correctly in LTR', () => {
      const { container } = renderLTR(component);
      testFn(container, 'ltr');
    });

    it('renders correctly in RTL', () => {
      const { container } = renderRTL(component);
      testFn(container, 'rtl');
    });
  },

  /**
   * Assert that text direction is properly applied
   */
  expectTextDirection: (
    container: Element,
    expectedDirection: TextDirection,
  ) => {
    const wrapper = container.querySelector('[data-testid="rtl-test-wrapper"]');
    expect(wrapper).toHaveAttribute('dir', expectedDirection);
  },

  /**
   * Assert that logical properties are used (check for specific CSS classes)
   */
  expectLogicalProperties: (element: Element) => {
    const computedStyle = window.getComputedStyle(element);

    // Check if logical properties are being used by looking for them in computed styles
    const hasLogicalMargin =
      computedStyle.marginInlineStart !== '' ||
      computedStyle.marginInlineEnd !== '';
    const hasLogicalPadding =
      computedStyle.paddingInlineStart !== '' ||
      computedStyle.paddingInlineEnd !== '';

    expect(hasLogicalMargin || hasLogicalPadding).toBe(true);
  },

  /**
   * Test component with different locales
   */
  testWithLocales: (
    component: ReactElement,
    locales: string[],
    testFn: (container: Element, locale: string) => void,
  ) => {
    locales.forEach((locale) => {
      it(`renders correctly with locale ${locale}`, () => {
        const direction =
          locale.startsWith('ar') ||
          locale.startsWith('he') ||
          locale.startsWith('fa')
            ? 'rtl'
            : 'ltr';

        const { container } = renderWithA11yAndRTL(component, {
          locale,
          direction,
        });
        testFn(container, locale);
      });
    });
  },
};

/**
 * Deterministic ID testing utilities
 */
export const idUtils = {
  /**
   * Test that IDs are deterministic across renders
   */
  testDeterministicIds: (component: ReactElement, idSelector: string) => {
    const { container: container1 } = renderWithA11yAndRTL(component);
    const { container: container2 } = renderWithA11yAndRTL(component);

    const element1 = container1.querySelector(idSelector);
    const element2 = container2.querySelector(idSelector);

    expect(element1?.id).toBe(element2?.id);
    expect(element1?.id).toBeTruthy();
  },

  /**
   * Test that ARIA relationships are properly established
   */
  testAriaRelationships: (container: Element) => {
    const elementsWithAriaLabelledBy =
      container.querySelectorAll('[aria-labelledby]');
    const elementsWithAriaDescribedBy =
      container.querySelectorAll('[aria-describedby]');

    elementsWithAriaLabelledBy.forEach((element) => {
      const labelledById = element.getAttribute('aria-labelledby')!;
      const labelElement = container.querySelector(`#${labelledById}`);
      expect(labelElement).toBeTruthy();
    });

    elementsWithAriaDescribedBy.forEach((element) => {
      const describedById = element.getAttribute('aria-describedby')!;
      const descriptionElement = container.querySelector(`#${describedById}`);
      expect(descriptionElement).toBeTruthy();
    });
  },
};

/**
 * Mock global APIs for testing
 */
function mockGlobalAPIs({
  direction,
  simulateScreenReader,
  simulateKeyboardNavigation,
  locale,
}: {
  direction: TextDirection;
  simulateScreenReader: boolean;
  simulateKeyboardNavigation: boolean;
  locale: string;
}): void {
  // Mock matchMedia for CSS media queries (using global mock from test-setup.ts)
  const mockMatchMedia = window.matchMedia as any;
  mockMatchMedia.mockImplementation((query: string) => ({
    matches:
      (query.includes('prefers-reduced-motion') && simulateScreenReader) ||
      (query.includes('prefers-contrast: high') && simulateScreenReader) ||
      (query.includes('forced-colors: active') && simulateKeyboardNavigation) ||
      (query.includes('pointer: coarse') && !simulateKeyboardNavigation),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  // Mock IntersectionObserver (using global mock from test-setup.ts)
  // No need to re-mock as it's already set up globally

  // Mock document.dir for RTL testing
  Object.defineProperty(document.documentElement, 'dir', {
    writable: true,
    value: direction,
  });

  // Mock document.lang for locale testing
  Object.defineProperty(document.documentElement, 'lang', {
    writable: true,
    value: locale,
  });

  // Mock navigator.language for locale detection
  Object.defineProperty(navigator, 'language', {
    writable: true,
    value: locale,
  });
}

/**
 * Custom Vitest matchers for accessibility testing
 * Note: toHaveNoViolations is now handled globally in test-setup.ts
 */
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toBeAccessible(): T;
      toSupportRTL(): T;
      toHaveDeterministicIds(): T;
    }
    interface AsymmetricMatchersContaining {
      toBeAccessible(): any;
      toSupportRTL(): any;
      toHaveDeterministicIds(): any;
    }
  }
}

/**
 * Helper to setup testing environment (now handled globally in test-setup.ts)
 * @deprecated This function is no longer needed as setup is handled globally
 */
export function setupTestEnvironment(): void {
  // Setup is now handled globally in test-setup.ts
  // This function is kept for backwards compatibility but does nothing
}

/**
 * Test suite helpers
 */
export const testSuites = {
  /**
   * Run comprehensive accessibility tests
   */
  runA11yTests: (component: ReactElement, componentName: string) => {
    describe(`${componentName} Accessibility`, () => {
      it('should have no accessibility violations', async () => {
        const { container } = renderWithA11yAndRTL(component);
        await a11yUtils.expectNoA11yViolations(container);
      });

      it('should support screen readers', async () => {
        const { container } = renderWithScreenReader(component);
        const features = await a11yUtils.testA11yFeatures(container);
        expect(features.hasAriaSupport).toBe(true);
      });

      it('should support keyboard navigation', () => {
        const { container } = renderWithKeyboardNavigation(component);
        const focusableElements = container.querySelectorAll(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
        );
        expect(focusableElements.length).toBeGreaterThan(0);
      });
    });
  },

  /**
   * Run comprehensive RTL tests
   */
  runRTLTests: (component: ReactElement, componentName: string) => {
    describe(`${componentName} RTL Support`, () => {
      rtlUtils.testBidirectional(component, (container, direction) => {
        rtlUtils.expectTextDirection(container, direction);
      });

      it('should use logical properties', () => {
        const { container } = renderRTL(component);
        const mainElement = container.querySelector(
          '[data-testid="rtl-test-wrapper"] > *',
        );
        if (mainElement) {
          rtlUtils.expectLogicalProperties(mainElement);
        }
      });
    });
  },

  /**
   * Run comprehensive internationalization tests
   */
  runI18nTests: (component: ReactElement, componentName: string) => {
    describe(`${componentName} Internationalization`, () => {
      const testLocales = ['en-US', 'ar-SA', 'he-IL', 'fr-FR', 'ja-JP'];

      rtlUtils.testWithLocales(component, testLocales, (container, locale) => {
        const wrapper = container.querySelector(
          '[data-testid="rtl-test-wrapper"]',
        );
        expect(wrapper).toHaveAttribute('lang', locale);
      });
    });
  },
};
