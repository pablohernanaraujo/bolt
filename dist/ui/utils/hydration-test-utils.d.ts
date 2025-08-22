import { type RenderResult } from '@testing-library/react';
import { ReactNode, type ReactElement } from 'react';
import type { ProgressiveEnhancementOptions } from './progressive-enhancement';
export interface HydrationTestOptions {
    initiallyVisible?: boolean;
    rootMargin?: string;
    threshold?: number | number[];
    userPreferences?: {
        reducedMotion?: boolean;
        dataSaver?: boolean;
        jsEnabled?: boolean;
    };
    intersectionDelay?: number;
    testProgressive?: boolean;
}
export interface DeferredHydrationTestResult {
    container: RenderResult;
    triggerIntersection: () => Promise<void>;
    triggerExit: () => Promise<void>;
    isHydrated: () => boolean;
    getMetrics: () => HydrationMetrics;
    observer: MockIntersectionObserver;
}
export interface HydrationMetrics {
    timeToIntersection?: number;
    timeToHydration?: number;
    hydrationAttempts: number;
    hydrationSuccess: boolean;
    componentSize?: number;
}
export declare class MockIntersectionObserver {
    private callbacks;
    private observations;
    private options;
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit);
    observe(element: Element): void;
    unobserve(element: Element): void;
    disconnect(): void;
    triggerIntersection(element: Element, isIntersecting: boolean): void;
    isObserving(element: Element): boolean;
    getIntersectionState(element: Element): boolean | undefined;
}
export declare function setupIntersectionObserverMock(): void;
export declare function cleanupIntersectionObserverMock(): void;
export declare function renderWithDeferredHydration(component: ReactElement, options?: HydrationTestOptions): DeferredHydrationTestResult;
export declare function mockUserPreferences(preferences: {
    reducedMotion?: boolean;
    dataSaver?: boolean;
    jsEnabled?: boolean;
}): void;
export declare function testProgressiveEnhancement(component: ReactElement, options: {
    noJsContent: string;
    enhancedContent: string;
    userInteraction?: () => void;
}): Promise<{
    beforeEnhancement: string;
    afterEnhancement: string;
    enhancementSuccessful: boolean;
}>;
export declare function testResponsiveHydration(component: ReactElement, viewports: Array<{
    width: number;
    height: number;
    shouldHydrate: boolean;
}>): Promise<Map<string, boolean>>;
export declare function testHydrationPerformance(component: ReactElement, strategies: Array<{
    name: string;
    config: ProgressiveEnhancementOptions;
}>): Promise<Map<string, HydrationMetrics>>;
export declare function validateDeferredHydration(component: ReactElement): {
    valid: boolean;
    issues: string[];
};
export declare function testNetworkAwareHydration(component: ReactElement, conditions: Array<{
    type: '4g' | '3g' | '2g' | 'slow-2g';
    shouldHydrate: boolean;
    delay?: number;
}>): Promise<Map<string, boolean>>;
export declare function createHydrationTestWrapper(options?: HydrationTestOptions): React.FC<{
    children: ReactNode;
}>;
