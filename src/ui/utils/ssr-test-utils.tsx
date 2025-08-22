/* eslint-disable max-statements */
// src/ui/utils/ssr-test-utils.tsx
// SSR-specific testing utilities for server-side rendering and hydration testing
// Provides utilities to test components in server-only context and validate SSR/CSR consistency
// RELEVANT FILES: hydration-test-utils.tsx, rsc-test-utils.tsx, test-setup.ts

import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { Router } from 'next/router';
import { type ReactElement } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { vi } from 'vitest';

/**
 * Configuration options for SSR testing
 */
export interface SSRTestOptions extends Omit<RenderOptions, 'hydrate'> {
  /** Whether to test hydration after SSR */
  testHydration?: boolean;
  /** Custom window properties for SSR context */
  windowProps?: Record<string, unknown>;
  /** Custom document properties for SSR context */
  documentProps?: Record<string, unknown>;
  /** Whether to validate for hydration mismatches */
  validateMismatches?: boolean;
  /** Mock user agent for SSR */
  userAgent?: string;
  /** Mock cookies for SSR */
  cookies?: Record<string, string>;
  /** Mock headers for SSR */
  headers?: Record<string, string>;
}

/**
 * Result of SSR rendering with additional SSR-specific properties
 */
export interface SSRRenderResult extends RenderResult {
  /** The server-rendered HTML string */
  serverHTML: string;
  /** The static HTML without React IDs */
  staticHTML: string;
  /** Any hydration warnings detected */
  hydrationWarnings: string[];
  /** Hydrate the component and return hydration result */
  hydrate: () => Promise<HydrationResult>;
  /** Get a snapshot of the server HTML */
  getServerSnapshot: () => string;
  /** Compare server and client HTML */
  compareHydration: () => HydrationComparison;
}

/**
 * Result of hydration testing
 */
export interface HydrationResult {
  /** Whether hydration succeeded without errors */
  success: boolean;
  /** Any errors that occurred during hydration */
  errors: Error[];
  /** Any warnings that occurred during hydration */
  warnings: string[];
  /** The hydrated render result */
  hydrated: RenderResult;
  /** Time taken for hydration in milliseconds */
  hydrationTime: number;
}

/**
 * Comparison between server and client rendered HTML
 */
export interface HydrationComparison {
  /** Whether server and client HTML match */
  matches: boolean;
  /** Differences found between server and client */
  differences: Array<{
    path: string;
    server: string;
    client: string;
  }>;
  /** Server HTML */
  serverHTML: string;
  /** Client HTML */
  clientHTML: string;
}

/**
 * Render a component server-side only without client hydration
 * Tests pure SSR output and validates server rendering
 */
export function renderServer(
  component: ReactElement,
  options: SSRTestOptions = {},
): SSRRenderResult {
  const {
    testHydration = false,
    validateMismatches = true,
    windowProps = {},
    documentProps = {},
    userAgent = 'Mozilla/5.0 (compatible; SSR Testing)',
    cookies = {},
    headers = {},
    ...renderOptions
  } = options;

  // Setup SSR environment
  const originalWindow = global.window;
  const originalDocument = global.document;
  const hydrationWarnings: string[] = [];

  // Create SSR-specific DOM environment
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: false,
    resources: 'usable',
    userAgent,
  });

  // Mock SSR-specific globals
  global.window = {
    ...dom.window,
    ...windowProps,
    // SSR-specific properties
    __SSR__: true,
    matchMedia: vi.fn(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  } as unknown as Window & typeof globalThis;

  global.document = {
    ...dom.window.document,
    ...documentProps,
    cookie: Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; '),
  } as unknown as Document;

  // Mock console to capture hydration warnings
  const originalConsoleError = console.error;
  const consoleErrorSpy = vi.fn((message: string, ...args: unknown[]) => {
    if (
      typeof message === 'string' &&
      (message.includes('hydration') ||
        message.includes('Hydration') ||
        message.includes('Text content does not match') ||
        message.includes('did not match'))
    ) {
      hydrationWarnings.push(message);
    }
    originalConsoleError(message, ...args);
  });
  console.error = consoleErrorSpy as unknown as typeof console.error;

  // Render component to string (SSR)
  const serverHTML = renderToString(component);
  const staticHTML = renderToStaticMarkup(component);

  // Create container with server HTML
  const container = document.createElement('div');
  container.innerHTML = serverHTML;
  document.body.appendChild(container);

  // Render for testing (client-side for comparison)
  const renderResult = render(component, {
    ...renderOptions,
    container,
    hydrate: false,
  });

  // Hydration function for deferred hydration testing
  const hydrate = async (): Promise<HydrationResult> => {
    const startTime = performance.now();
    const hydrationErrors: Error[] = [];
    const hydrationWarningsLocal: string[] = [];

    try {
      // Create fresh container with server HTML
      const hydrateContainer = document.createElement('div');
      hydrateContainer.innerHTML = serverHTML;
      document.body.appendChild(hydrateContainer);

      // Mock console for hydration-specific warnings
      const hydrateConsoleError = vi.fn(
        (message: string, ...args: unknown[]) => {
          if (
            typeof message === 'string' &&
            (message.includes('hydration') || message.includes('Hydration'))
          ) {
            hydrationWarningsLocal.push(message);
          }
        },
      );
      console.error = hydrateConsoleError as unknown as typeof console.error;

      // Perform hydration
      const hydrated = render(component, {
        ...renderOptions,
        container: hydrateContainer,
        hydrate: true,
      });

      const hydrationTime = performance.now() - startTime;

      return {
        success:
          hydrationErrors.length === 0 && hydrationWarningsLocal.length === 0,
        errors: hydrationErrors,
        warnings: hydrationWarningsLocal,
        hydrated,
        hydrationTime,
      };
    } catch (error) {
      hydrationErrors.push(error as Error);
      return {
        success: false,
        errors: hydrationErrors,
        warnings: hydrationWarningsLocal,
        hydrated: renderResult,
        hydrationTime: performance.now() - startTime,
      };
    } finally {
      // Restore console
      console.error = originalConsoleError;
    }
  };

  // Get server snapshot for testing
  const getServerSnapshot = (): string => {
    return container.innerHTML;
  };

  // Compare server and client HTML
  const compareHydration = (): HydrationComparison => {
    const clientContainer = document.createElement('div');
    const clientResult = render(component, {
      ...renderOptions,
      container: clientContainer,
    });

    const serverHTMLClean = normalizeHTML(serverHTML);
    const clientHTMLClean = normalizeHTML(clientContainer.innerHTML);

    const differences = findHTMLDifferences(serverHTMLClean, clientHTMLClean);

    return {
      matches: differences.length === 0,
      differences,
      serverHTML: serverHTMLClean,
      clientHTML: clientHTMLClean,
    };
  };

  // Cleanup function
  const cleanup = renderResult.unmount;
  renderResult.unmount = () => {
    cleanup();
    // Restore globals
    global.window = originalWindow;
    global.document = originalDocument;
    console.error = originalConsoleError;
  };

  // Return SSR-specific render result
  return {
    ...renderResult,
    serverHTML,
    staticHTML,
    hydrationWarnings,
    hydrate,
    getServerSnapshot,
    compareHydration,
  };
}

/**
 * Test hydration behavior with automatic mismatch detection
 */
export async function renderWithHydration(
  component: ReactElement,
  options: SSRTestOptions = {},
): Promise<{
  server: SSRRenderResult;
  hydration: HydrationResult;
  mismatches: string[];
}> {
  const server = renderServer(component, {
    ...options,
    testHydration: true,
  });
  const hydration = await server.hydrate();

  // Detect hydration mismatches
  const mismatches: string[] = [];

  if (!hydration.success) {
    mismatches.push(...hydration.warnings);
    hydration.errors.forEach((error) => {
      mismatches.push(error.message);
    });
  }

  const comparison = server.compareHydration();
  if (!comparison.matches) {
    comparison.differences.forEach((diff) => {
      mismatches.push(
        `Mismatch at ${diff.path}: server="${diff.server}" client="${diff.client}"`,
      );
    });
  }

  return {
    server,
    hydration,
    mismatches,
  };
}

/**
 * Normalize HTML for comparison by removing React-specific attributes
 */
function normalizeHTML(html: string): string {
  return html
    .replace(/data-react[a-z-]*="[^"]*"/g, '') // Remove React internal attributes
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Find differences between server and client HTML
 */
function findHTMLDifferences(
  serverHTML: string,
  clientHTML: string,
): Array<{ path: string; server: string; client: string }> {
  const differences: Array<{ path: string; server: string; client: string }> =
    [];

  // Simple character-by-character comparison for now
  // In production, you'd want a more sophisticated HTML diff algorithm
  if (serverHTML !== clientHTML) {
    const maxLength = Math.max(serverHTML.length, clientHTML.length);
    for (let i = 0; i < maxLength; i++) {
      if (serverHTML[i] !== clientHTML[i]) {
        differences.push({
          path: `char[${i}]`,
          server: serverHTML.substring(i, i + 20),
          client: clientHTML.substring(i, i + 20),
        });
        break; // Only report first difference for simplicity
      }
    }
  }

  return differences;
}

/**
 * Custom matcher to assert no hydration mismatches
 */
export function expectNoHydrationMismatch(result: {
  mismatches: string[];
}): void {
  if (result.mismatches.length > 0) {
    throw new Error(
      `Hydration mismatches detected:\n${result.mismatches.join('\n')}`,
    );
  }
}

/**
 * Test server-side rendering with specific viewport/media queries
 */
export function renderServerWithMedia(
  component: ReactElement,
  mediaQuery: string,
  matches: boolean,
): SSRRenderResult {
  const matchMediaMock = vi.fn(() => ({
    matches,
    media: mediaQuery,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  return renderServer(component, {
    windowProps: {
      matchMedia: matchMediaMock,
    },
  });
}

/**
 * Test component renders the same on server and client
 */
export async function expectServerClientMatch(
  component: ReactElement,
  options?: SSRTestOptions,
): Promise<void> {
  const result = await renderWithHydration(component, options);
  expectNoHydrationMismatch(result);
}

/**
 * Extract and validate meta tags from SSR output
 */
export function extractMetaTags(serverHTML: string): Record<string, string> {
  const metaTags: Record<string, string> = {};
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match;

  while ((match = metaRegex.exec(serverHTML)) !== null) {
    const attributes = match[1];
    const nameMatch = /name="([^"]+)"/.exec(attributes);
    const contentMatch = /content="([^"]+)"/.exec(attributes);

    if (nameMatch && contentMatch) {
      metaTags[nameMatch[1]] = contentMatch[1];
    }
  }

  return metaTags;
}

/**
 * Test that component works without JavaScript (progressive enhancement)
 */
export function renderStaticOnly(component: ReactElement): {
  html: string;
  text: string;
  links: string[];
  forms: Array<{ action: string; method: string }>;
} {
  const html = renderToStaticMarkup(component);

  // Parse the static HTML
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Extract text content
  const text = document.body.textContent || '';

  // Extract links
  const links = Array.from(document.querySelectorAll('a'))
    .map((link) => link.getAttribute('href'))
    .filter(Boolean) as string[];

  // Extract forms
  const forms = Array.from(document.querySelectorAll('form')).map((form) => ({
    action: form.getAttribute('action') || '',
    method: form.getAttribute('method') || 'GET',
  }));

  return {
    html,
    text,
    links,
    forms,
  };
}

/**
 * Mock Next.js router for SSR testing
 */
export function mockNextRouter(
  pathname: string = '/',
  query: Record<string, string> = {},
): Router {
  return {
    pathname,
    query,
    asPath: pathname,
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  } as unknown as Router;
}
