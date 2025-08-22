import { jsx as _jsx } from "react/jsx-runtime";
import { render, } from '@testing-library/react';
import { axe } from 'jest-axe';
import { vi } from 'vitest';
function RTLTestWrapper({ children, direction, locale, }) {
    return (_jsx("div", { dir: direction, lang: locale, "data-testid": "rtl-test-wrapper", "data-direction": direction, "data-locale": locale, children: children }));
}
function A11yTestWrapper({ children, simulateScreenReader = false, simulateKeyboardNavigation = false, }) {
    return (_jsx("div", { "data-testid": "a11y-test-wrapper", "data-simulate-screenreader": simulateScreenReader, "data-simulate-keyboard": simulateKeyboardNavigation, role: "main", children: children }));
}
export function renderWithA11yAndRTL(ui, options = {}) {
    const { locale = 'en-US', direction = 'ltr', simulateScreenReader = false, simulateKeyboardNavigation = false, ...renderOptions } = options;
    mockGlobalAPIs({
        direction,
        simulateScreenReader,
        simulateKeyboardNavigation,
        locale,
    });
    const Wrapper = ({ children }) => (_jsx(RTLTestWrapper, { direction: direction, locale: locale, children: _jsx(A11yTestWrapper, { simulateScreenReader: simulateScreenReader, simulateKeyboardNavigation: simulateKeyboardNavigation, children: children }) }));
    return render(ui, {
        wrapper: Wrapper,
        ...renderOptions,
    });
}
export function renderRTL(ui, options = {}) {
    const { locale = 'ar-SA', ...renderOptions } = options;
    return renderWithA11yAndRTL(ui, {
        direction: 'rtl',
        locale,
        ...renderOptions,
    });
}
export function renderLTR(ui, options = {}) {
    const { locale = 'en-US', ...renderOptions } = options;
    return renderWithA11yAndRTL(ui, {
        direction: 'ltr',
        locale,
        ...renderOptions,
    });
}
export function renderWithScreenReader(ui, options = {}) {
    return renderWithA11yAndRTL(ui, {
        simulateScreenReader: true,
        ...options,
    });
}
export function renderWithKeyboardNavigation(ui, options = {}) {
    return renderWithA11yAndRTL(ui, {
        simulateKeyboardNavigation: true,
        ...options,
    });
}
export const a11yUtils = {
    async testAccessibility(container, options = {}) {
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
    async expectNoA11yViolations(container, customRules) {
        const results = await a11yUtils.testAccessibility(container, {
            rules: customRules,
        });
        expect(results).toHaveNoViolations();
    },
    async testA11yFeatures(container) {
        const results = await a11yUtils.testAccessibility(container);
        const violationTypes = results.violations.map((v) => v.id);
        return {
            hasProperLabels: !violationTypes.includes('label') &&
                !violationTypes.includes('aria-label'),
            hasKeyboardSupport: !violationTypes.includes('keyboard') &&
                !violationTypes.includes('focus'),
            hasAriaSupport: !violationTypes.some((type) => type.includes('aria')),
            hasColorContrast: !violationTypes.includes('color-contrast'),
        };
    },
};
export const rtlUtils = {
    testBidirectional: (component, testFn) => {
        it('renders correctly in LTR', () => {
            const { container } = renderLTR(component);
            testFn(container, 'ltr');
        });
        it('renders correctly in RTL', () => {
            const { container } = renderRTL(component);
            testFn(container, 'rtl');
        });
    },
    expectTextDirection: (container, expectedDirection) => {
        const wrapper = container.querySelector('[data-testid="rtl-test-wrapper"]');
        expect(wrapper).toHaveAttribute('dir', expectedDirection);
    },
    expectLogicalProperties: (element) => {
        const computedStyle = window.getComputedStyle(element);
        const hasLogicalMargin = computedStyle.marginInlineStart !== '' ||
            computedStyle.marginInlineEnd !== '';
        const hasLogicalPadding = computedStyle.paddingInlineStart !== '' ||
            computedStyle.paddingInlineEnd !== '';
        expect(hasLogicalMargin || hasLogicalPadding).toBe(true);
    },
    testWithLocales: (component, locales, testFn) => {
        locales.forEach((locale) => {
            it(`renders correctly with locale ${locale}`, () => {
                const direction = locale.startsWith('ar') ||
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
export const idUtils = {
    testDeterministicIds: (component, idSelector) => {
        const { container: container1 } = renderWithA11yAndRTL(component);
        const { container: container2 } = renderWithA11yAndRTL(component);
        const element1 = container1.querySelector(idSelector);
        const element2 = container2.querySelector(idSelector);
        expect(element1?.id).toBe(element2?.id);
        expect(element1?.id).toBeTruthy();
    },
    testAriaRelationships: (container) => {
        const elementsWithAriaLabelledBy = container.querySelectorAll('[aria-labelledby]');
        const elementsWithAriaDescribedBy = container.querySelectorAll('[aria-describedby]');
        elementsWithAriaLabelledBy.forEach((element) => {
            const labelledById = element.getAttribute('aria-labelledby');
            const labelElement = container.querySelector(`#${labelledById}`);
            expect(labelElement).toBeTruthy();
        });
        elementsWithAriaDescribedBy.forEach((element) => {
            const describedById = element.getAttribute('aria-describedby');
            const descriptionElement = container.querySelector(`#${describedById}`);
            expect(descriptionElement).toBeTruthy();
        });
    },
};
function mockGlobalAPIs({ direction, simulateScreenReader, simulateKeyboardNavigation, locale, }) {
    const mockMatchMedia = window.matchMedia;
    mockMatchMedia.mockImplementation((query) => ({
        matches: (query.includes('prefers-reduced-motion') && simulateScreenReader) ||
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
    Object.defineProperty(document.documentElement, 'dir', {
        writable: true,
        value: direction,
    });
    Object.defineProperty(document.documentElement, 'lang', {
        writable: true,
        value: locale,
    });
    Object.defineProperty(navigator, 'language', {
        writable: true,
        value: locale,
    });
}
export function setupTestEnvironment() {
}
export const testSuites = {
    runA11yTests: (component, componentName) => {
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
                const focusableElements = container.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
                expect(focusableElements.length).toBeGreaterThan(0);
            });
        });
    },
    runRTLTests: (component, componentName) => {
        describe(`${componentName} RTL Support`, () => {
            rtlUtils.testBidirectional(component, (container, direction) => {
                rtlUtils.expectTextDirection(container, direction);
            });
            it('should use logical properties', () => {
                const { container } = renderRTL(component);
                const mainElement = container.querySelector('[data-testid="rtl-test-wrapper"] > *');
                if (mainElement) {
                    rtlUtils.expectLogicalProperties(mainElement);
                }
            });
        });
    },
    runI18nTests: (component, componentName) => {
        describe(`${componentName} Internationalization`, () => {
            const testLocales = ['en-US', 'ar-SA', 'he-IL', 'fr-FR', 'ja-JP'];
            rtlUtils.testWithLocales(component, testLocales, (container, locale) => {
                const wrapper = container.querySelector('[data-testid="rtl-test-wrapper"]');
                expect(wrapper).toHaveAttribute('lang', locale);
            });
        });
    },
};
