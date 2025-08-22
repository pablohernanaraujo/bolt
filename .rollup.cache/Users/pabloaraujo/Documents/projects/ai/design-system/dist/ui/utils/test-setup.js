import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';
global.React = React;
expect.extend(toHaveNoViolations);
afterEach(() => {
    cleanup();
});
beforeAll(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'test',
        writable: true,
    });
    process.env.__NEXT_TEST_MODE = 'true';
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
    global.IntersectionObserver = vi.fn().mockImplementation(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
    }));
    const localStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
    const sessionStorageMock = {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
    };
    global.sessionStorage = sessionStorageMock;
    global.URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
    global.URL.revokeObjectURL = vi.fn();
    global.fetch = vi.fn();
    Object.defineProperty(document, 'fonts', {
        value: { ready: Promise.resolve() },
        writable: true,
    });
    Object.defineProperty(global, 'crypto', {
        value: {
            randomUUID: vi.fn().mockReturnValue('test-uuid'),
            getRandomValues: vi.fn().mockReturnValue(new Uint32Array(10)),
        },
        writable: true,
    });
    vi.mock('next/headers', () => ({
        cookies: vi.fn(() => ({
            get: vi.fn(),
            getAll: vi.fn(() => []),
            has: vi.fn(() => false),
            set: vi.fn(),
            delete: vi.fn(),
        })),
        headers: vi.fn(() => ({
            get: vi.fn(),
            has: vi.fn(() => false),
            entries: vi.fn(() => []),
            forEach: vi.fn(),
        })),
    }));
    vi.mock('next/navigation', () => ({
        redirect: vi.fn(),
        notFound: vi.fn(),
        revalidatePath: vi.fn(),
        revalidateTag: vi.fn(),
        useRouter: vi.fn(() => ({
            push: vi.fn(),
            replace: vi.fn(),
            prefetch: vi.fn(),
            back: vi.fn(),
            refresh: vi.fn(),
        })),
        usePathname: vi.fn(() => '/'),
        useSearchParams: vi.fn(() => new URLSearchParams()),
    }));
    vi.mock('react-dom/server', async () => {
        const actual = await vi.importActual('react-dom/server');
        return {
            ...actual,
            renderToString: vi.fn((element) => {
                return actual.renderToString(element);
            }),
            renderToStaticMarkup: vi.fn((element) => {
                return actual.renderToStaticMarkup(element);
            }),
        };
    });
    Object.defineProperty(navigator, 'connection', {
        value: {
            effectiveType: '4g',
            saveData: false,
            downlink: 10,
            rtt: 50,
        },
        writable: true,
        configurable: true,
    });
    Object.defineProperty(document.documentElement, 'lang', {
        value: 'en',
        writable: true,
        configurable: true,
    });
    Object.defineProperty(document.documentElement, 'dir', {
        value: 'ltr',
        writable: true,
        configurable: true,
    });
    document.documentElement.setAttribute('data-theme', 'light');
});
afterAll(() => {
    vi.restoreAllMocks();
});
expect.extend({
    toHaveNoHydrationMismatch(result) {
        const pass = result.mismatches.length === 0;
        return {
            pass,
            message: () => pass
                ? 'Expected hydration mismatches but found none'
                : `Found hydration mismatches:\n${result.mismatches.join('\n')}`,
        };
    },
    toBeServerComponent(component) {
        const componentString = component.toString();
        const hasUseClient = componentString.includes('use client');
        const pass = !hasUseClient;
        return {
            pass,
            message: () => pass
                ? 'Expected component to be a client component'
                : 'Expected component to be a server component but found "use client" directive',
        };
    },
    toBeClientComponent(component) {
        const componentString = component.toString();
        const hasUseClient = componentString.includes('use client');
        const pass = hasUseClient;
        return {
            pass,
            message: () => pass
                ? 'Expected component to be a server component'
                : 'Expected component to be a client component but missing "use client" directive',
        };
    },
    toRenderStatically(html) {
        const hasInteractiveElements = html.includes('onClick') ||
            html.includes('onChange') ||
            html.includes('onSubmit');
        const pass = !hasInteractiveElements;
        return {
            pass,
            message: () => pass
                ? 'Expected component to have interactive elements'
                : 'Expected component to render statically but found interactive event handlers',
        };
    },
});
