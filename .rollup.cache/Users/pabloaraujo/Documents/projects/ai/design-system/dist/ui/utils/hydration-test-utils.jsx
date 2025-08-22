import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
export class MockIntersectionObserver {
    callbacks = new Map();
    observations = new Map();
    options;
    constructor(callback, options = {}) {
        this.options = options;
        this.observe = this.observe.bind(this);
        this.unobserve = this.unobserve.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.triggerIntersection = this.triggerIntersection.bind(this);
    }
    observe(element) {
        this.callbacks.set(element, this.callbacks.values().next().value || (() => { }));
        this.observations.set(element, false);
    }
    unobserve(element) {
        this.callbacks.delete(element);
        this.observations.delete(element);
    }
    disconnect() {
        this.callbacks.clear();
        this.observations.clear();
    }
    triggerIntersection(element, isIntersecting) {
        const callback = this.callbacks.get(element);
        if (callback) {
            const entry = {
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
            callback([entry], this);
            this.observations.set(element, isIntersecting);
        }
    }
    isObserving(element) {
        return this.callbacks.has(element);
    }
    getIntersectionState(element) {
        return this.observations.get(element);
    }
}
const mockObservers = [];
export function setupIntersectionObserverMock() {
    global.IntersectionObserver = vi.fn((callback, options) => {
        const observer = new MockIntersectionObserver(callback, options);
        mockObservers.push(observer);
        return observer;
    });
}
export function cleanupIntersectionObserverMock() {
    mockObservers.length = 0;
    if ('IntersectionObserver' in global) {
        delete global.IntersectionObserver;
    }
}
export function renderWithDeferredHydration(component, options = {}) {
    const { initiallyVisible = false, userPreferences = {}, intersectionDelay = 0, } = options;
    setupIntersectionObserverMock();
    mockUserPreferences(userPreferences);
    const metrics = {
        hydrationAttempts: 0,
        hydrationSuccess: false,
    };
    const startTime = performance.now();
    const renderResult = render(component);
    const observer = mockObservers[mockObservers.length - 1];
    const triggerIntersection = async () => {
        if (intersectionDelay > 0) {
            await new Promise((resolve) => setTimeout(resolve, intersectionDelay));
        }
        metrics.timeToIntersection = performance.now() - startTime;
        metrics.hydrationAttempts++;
        const elements = renderResult.container.querySelectorAll('[data-hydration-pending]');
        elements.forEach((element) => {
            if (observer && observer.isObserving(element)) {
                observer.triggerIntersection(element, true);
            }
        });
        await waitFor(() => {
            const hydrated = renderResult.container.querySelector('[data-hydrated="true"]');
            if (hydrated) {
                metrics.timeToHydration = performance.now() - startTime;
                metrics.hydrationSuccess = true;
            }
        });
    };
    const triggerExit = async () => {
        const elements = renderResult.container.querySelectorAll('[data-hydrated="true"]');
        elements.forEach((element) => {
            if (observer && observer.isObserving(element)) {
                observer.triggerIntersection(element, false);
            }
        });
    };
    const isHydrated = () => {
        const hydrated = renderResult.container.querySelector('[data-hydrated="true"]');
        return hydrated !== null;
    };
    const getMetrics = () => {
        if (metrics.hydrationSuccess) {
            const element = renderResult.container.firstElementChild;
            if (element) {
                const rect = element.getBoundingClientRect();
                metrics.componentSize = rect.width * rect.height;
            }
        }
        return { ...metrics };
    };
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
export function mockUserPreferences(preferences) {
    if (preferences.reducedMotion !== undefined) {
        window.matchMedia = vi.fn((query) => {
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
                };
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
            };
        });
    }
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
    if (preferences.jsEnabled !== undefined) {
        Object.defineProperty(document.documentElement, 'classList', {
            value: {
                contains: (className) => {
                    if (className === 'no-js')
                        return !preferences.jsEnabled;
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
export async function testProgressiveEnhancement(component, options) {
    mockUserPreferences({ jsEnabled: false });
    const { container } = render(component);
    const beforeEnhancement = container.textContent || '';
    mockUserPreferences({ jsEnabled: true });
    if (options.userInteraction) {
        options.userInteraction();
    }
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
export async function testResponsiveHydration(component, viewports) {
    const results = new Map();
    for (const viewport of viewports) {
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
        const { triggerIntersection, isHydrated } = renderWithDeferredHydration(component);
        if (viewport.shouldHydrate) {
            await triggerIntersection();
        }
        const key = `${viewport.width}x${viewport.height}`;
        results.set(key, isHydrated());
    }
    return results;
}
export async function testHydrationPerformance(component, strategies) {
    const results = new Map();
    for (const strategy of strategies) {
        const wrappedComponent = (<div data-enhancement-strategy={strategy.name}>{component}</div>);
        const { triggerIntersection, getMetrics } = renderWithDeferredHydration(wrappedComponent);
        await triggerIntersection();
        results.set(strategy.name, getMetrics());
    }
    return results;
}
export function validateDeferredHydration(component) {
    const issues = [];
    const { container } = render(component);
    const element = container.firstElementChild;
    if (!element) {
        issues.push('No root element found');
        return {
            valid: false,
            issues,
        };
    }
    if (!element.hasAttribute('data-hydration-pending') &&
        !element.hasAttribute('data-hydrated')) {
        issues.push('Missing hydration status attributes');
    }
    const fallback = container.querySelector('[data-hydration-fallback]');
    if (!fallback) {
        issues.push('No fallback content provided for deferred hydration');
    }
    if (!mockObservers.length) {
        issues.push('IntersectionObserver not initialized');
    }
    return {
        valid: issues.length === 0,
        issues,
    };
}
export async function testNetworkAwareHydration(component, conditions) {
    const results = new Map();
    for (const condition of conditions) {
        Object.defineProperty(navigator, 'connection', {
            value: {
                effectiveType: condition.type,
                saveData: condition.type === '2g' || condition.type === 'slow-2g',
                downlink: condition.type === '4g' ? 10 : condition.type === '3g' ? 1.5 : 0.5,
            },
            writable: true,
            configurable: true,
        });
        const { triggerIntersection, isHydrated } = renderWithDeferredHydration(component, { intersectionDelay: condition.delay });
        if (condition.shouldHydrate) {
            await triggerIntersection();
        }
        results.set(condition.type, isHydrated());
    }
    return results;
}
export function createHydrationTestWrapper(options = {}) {
    const HydrationTestWrapper = ({ children, }) => {
        mockUserPreferences(options.userPreferences || {});
        return (<div data-test-hydration="true" data-test-options={JSON.stringify(options)}>
        {children}
      </div>);
    };
    HydrationTestWrapper.displayName = 'HydrationTestWrapper';
    return HydrationTestWrapper;
}
