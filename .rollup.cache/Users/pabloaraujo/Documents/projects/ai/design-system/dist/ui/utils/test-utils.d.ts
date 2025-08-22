import { type RenderOptions, type RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';
import { type ReactElement } from 'react';
import { type LocaleInfo } from '@/i18n/server-locale';
import { type TextDirection } from '@/theme/rtl-detection';
export interface TestEnvironmentConfig {
    locale?: string;
    direction?: TextDirection;
    simulateScreenReader?: boolean;
    simulateKeyboardNavigation?: boolean;
    accessibilityRulesToIgnore?: string[];
    mockLocaleInfo?: Partial<LocaleInfo>;
}
export declare function renderWithA11yAndRTL(ui: ReactElement, options?: RenderOptions & TestEnvironmentConfig): RenderResult;
export declare function renderRTL(ui: ReactElement, options?: RenderOptions & {
    locale?: string;
}): RenderResult;
export declare function renderLTR(ui: ReactElement, options?: RenderOptions & {
    locale?: string;
}): RenderResult;
export declare function renderWithScreenReader(ui: ReactElement, options?: RenderOptions): RenderResult;
export declare function renderWithKeyboardNavigation(ui: ReactElement, options?: RenderOptions): RenderResult;
export declare const a11yUtils: {
    testAccessibility(container: Element, options?: {
        rules?: string[];
        includedImpacts?: ("minor" | "moderate" | "serious" | "critical")[];
    }): Promise<Awaited<ReturnType<typeof axe>>>;
    expectNoA11yViolations(container: Element, customRules?: string[]): Promise<void>;
    testA11yFeatures(container: Element): Promise<{
        hasProperLabels: boolean;
        hasKeyboardSupport: boolean;
        hasAriaSupport: boolean;
        hasColorContrast: boolean;
    }>;
};
export declare const rtlUtils: {
    testBidirectional: (component: ReactElement, testFn: (container: Element, direction: TextDirection) => void) => void;
    expectTextDirection: (container: Element, expectedDirection: TextDirection) => void;
    expectLogicalProperties: (element: Element) => void;
    testWithLocales: (component: ReactElement, locales: string[], testFn: (container: Element, locale: string) => void) => void;
};
export declare const idUtils: {
    testDeterministicIds: (component: ReactElement, idSelector: string) => void;
    testAriaRelationships: (container: Element) => void;
};
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
export declare function setupTestEnvironment(): void;
export declare const testSuites: {
    runA11yTests: (component: ReactElement, componentName: string) => void;
    runRTLTests: (component: ReactElement, componentName: string) => void;
    runI18nTests: (component: ReactElement, componentName: string) => void;
};
//# sourceMappingURL=test-utils.d.ts.map