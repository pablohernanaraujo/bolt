/* eslint-disable max-nested-callbacks */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/utils/test-setup.ts
// Global test setup for Vitest environment with SSR/RSC support
// Configures testing-library, jest-axe, SSR/RSC mocks, and global test utilities
// RELEVANT FILES: vitest.config.ts, test-utils.tsx, ssr-test-utils.tsx, rsc-test-utils.tsx

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest';

// Make React available globally for JSX in tests
global.React = React;

// Extend Vitest's expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Extend Vitest's expect with jest-dom matchers
// (already done by importing '@testing-library/jest-dom')

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Global test environment setup
beforeAll(() => {
  // Setup SSR/RSC environment variables
  // Set test mode flag for Next.js
  process.env.__NEXT_TEST_MODE = 'true';

  // Note: NODE_ENV is typically set by Vitest automatically
  // If needed in components, use: import.meta.env.NODE_ENV or process.env.NODE_ENV

  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock window.ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock window.IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock MutationObserver for theme detection
  global.MutationObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
  }));

  // Mock localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock as any;

  // Mock sessionStorage
  const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.sessionStorage = sessionStorageMock as any;

  // Mock URL.createObjectURL
  global.URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
  global.URL.revokeObjectURL = vi.fn();

  // Mock fetch
  global.fetch = vi.fn();

  // Mock console methods to reduce test noise (can be enabled if needed)
  // vi.spyOn(console, 'warn').mockImplementation(() => {});
  // vi.spyOn(console, 'error').mockImplementation(() => {});

  // Setup document properties for testing
  Object.defineProperty(document, 'fonts', {
    value: { ready: Promise.resolve() },
    writable: true,
  });

  // Mock crypto.randomUUID for deterministic testing
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: vi.fn().mockReturnValue('test-uuid'),
      getRandomValues: vi.fn().mockReturnValue(new Uint32Array(10)),
    },
    writable: true,
  });

  // SSR/RSC specific mocks
  // Mock Next.js server modules
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

  // Mock React DOM Server for SSR testing
  vi.mock('react-dom/server', async () => {
    const actual = await vi.importActual('react-dom/server');
    return {
      ...actual,
      renderToString: vi.fn((element: any) => {
        // Use actual renderToString but allow spying
        return (actual as any).renderToString(element);
      }),
      renderToStaticMarkup: vi.fn((element: any) => {
        // Use actual renderToStaticMarkup but allow spying
        return (actual as any).renderToStaticMarkup(element);
      }),
    };
  });

  // Mock navigator.connection for network-aware testing
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

  // Mock document.documentElement.lang for i18n testing
  Object.defineProperty(document.documentElement, 'lang', {
    value: 'en',
    writable: true,
    configurable: true,
  });

  // Mock document.documentElement.dir for RTL testing
  Object.defineProperty(document.documentElement, 'dir', {
    value: 'ltr',
    writable: true,
    configurable: true,
  });

  // Mock theme detection attributes
  document.documentElement.setAttribute('data-theme', 'light');
});

// Clean up global mocks after all tests
afterAll(() => {
  vi.restoreAllMocks();
});

// Extend global types for Vitest + jest-axe + SSR/RSC
declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveNoViolations(): T;
      toHaveNoHydrationMismatch(): T;
      toBeServerComponent(): T;
      toBeClientComponent(): T;
      toRenderStatically(): T;
    }
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): any;
      toHaveNoHydrationMismatch(): any;
      toBeServerComponent(): any;
      toBeClientComponent(): any;
      toRenderStatically(): any;
    }
  }

  // SSR/RSC test environment flags
  var __SSR_TEST__: boolean;
  var __RSC_TEST__: boolean;
  var __NEXT_TEST_MODE: string;
}

// Custom matchers for SSR/RSC testing
expect.extend({
  // Check for hydration mismatches
  toHaveNoHydrationMismatch(result: { mismatches: string[] }) {
    const pass = result.mismatches.length === 0;
    return {
      pass,
      message: () =>
        pass
          ? 'Expected hydration mismatches but found none'
          : `Found hydration mismatches:\n${result.mismatches.join('\n')}`,
    };
  },

  // Check if component is a server component
  toBeServerComponent(component: any) {
    const componentString = component.toString();
    const hasUseClient = componentString.includes('use client');
    const pass = !hasUseClient;
    return {
      pass,
      message: () =>
        pass
          ? 'Expected component to be a client component'
          : 'Expected component to be a server component but found "use client" directive',
    };
  },

  // Check if component is a client component
  toBeClientComponent(component: any) {
    const componentString = component.toString();
    const hasUseClient = componentString.includes('use client');
    const pass = hasUseClient;
    return {
      pass,
      message: () =>
        pass
          ? 'Expected component to be a server component'
          : 'Expected component to be a client component but missing "use client" directive',
    };
  },

  // Check if component renders without JavaScript
  toRenderStatically(html: string) {
    const hasInteractiveElements =
      html.includes('onClick') ||
      html.includes('onChange') ||
      html.includes('onSubmit');
    const pass = !hasInteractiveElements;
    return {
      pass,
      message: () =>
        pass
          ? 'Expected component to have interactive elements'
          : 'Expected component to render statically but found interactive event handlers',
    };
  },
});
