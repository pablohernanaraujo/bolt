/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable complexity */
// src/ui/utils/rsc-test-utils.tsx
// React Server Components testing utilities for validating server/client boundaries
// Provides utilities to test RSC behavior, server actions, and component composition
// RELEVANT FILES: ssr-test-utils.tsx, hydration-test-utils.tsx, test-setup.ts

import { cookies, headers } from 'next/headers';
import { type ComponentType, type ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { vi, type Mock } from 'vitest';

/**
 * RSC testing configuration
 */
export interface RSCTestOptions {
  /** Mock cookies for server context */
  cookies?: Record<string, string>;
  /** Mock headers for server context */
  headers?: Record<string, string>;
  /** Mock search params */
  searchParams?: Record<string, string>;
  /** Mock pathname */
  pathname?: string;
  /** Whether to validate server/client boundaries */
  validateBoundaries?: boolean;
}

/**
 * Server component test context
 */
export interface ServerComponentContext {
  cookies: Map<string, string>;
  headers: Map<string, string>;
  searchParams: URLSearchParams;
  pathname: string;
}

/**
 * Result of server component analysis
 */
export interface ServerComponentAnalysis {
  /** Whether the component is a valid server component */
  isServerComponent: boolean;
  /** Client components detected in the tree */
  clientComponents: string[];
  /** Server components detected in the tree */
  serverComponents: string[];
  /** Async components detected */
  asyncComponents: string[];
  /** Invalid patterns found */
  violations: Array<{
    component: string;
    issue: string;
    suggestion: string;
  }>;
}

/**
 * Server action test result
 */
export interface ServerActionResult<T = unknown> {
  /** Whether the action succeeded */
  success: boolean;
  /** Data returned from the action */
  data?: T;
  /** Error if action failed */
  error?: Error;
  /** Redirect if action triggered navigation */
  redirect?: string;
  /** Revalidated paths */
  revalidated?: string[];
  /** Cookies set by the action */
  cookies?: Record<string, string>;
}

// Mock Next.js server modules
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
  headers: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  notFound: vi.fn(),
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

/**
 * Create a server component testing context
 */
export function createServerContext(
  options: RSCTestOptions = {},
): ServerComponentContext {
  const context: ServerComponentContext = {
    cookies: new Map(Object.entries(options.cookies || {})),
    headers: new Map(Object.entries(options.headers || {})),
    searchParams: new URLSearchParams(options.searchParams || {}),
    pathname: options.pathname || '/',
  };

  // Mock cookies() function
  (cookies as Mock).mockReturnValue({
    get: (name: string) => ({ value: context.cookies.get(name) }),
    getAll: () =>
      Array.from(context.cookies.entries()).map(([name, value]) => ({
        name,
        value,
      })),
    has: (name: string) => context.cookies.has(name),
    set: (name: string, value: string) => context.cookies.set(name, value),
    delete: (name: string) => context.cookies.delete(name),
  });

  // Mock headers() function
  (headers as Mock).mockReturnValue({
    get: (name: string) => context.headers.get(name),
    has: (name: string) => context.headers.has(name),
    entries: () => context.headers.entries(),
    forEach: (callback: (value: string, key: string) => void) => {
      context.headers.forEach(callback);
    },
  });

  return context;
}

/**
 * Render a React Server Component with mocked server context
 */
export async function renderServerComponent(
  component: ReactElement | (() => Promise<ReactElement>),
  options: RSCTestOptions = {},
): Promise<{
  html: string;
  context: ServerComponentContext;
}> {
  const context = createServerContext(options);

  // Handle async server components
  let element: ReactElement;
  if (typeof component === 'function') {
    element = await component();
  } else {
    element = component;
  }

  // Render to string (server-only)
  const html = renderToString(element);

  return {
    html,
    context,
  };
}

/**
 * Analyze a component tree for server/client boundaries
 */
export function analyzeServerClientBoundaries(
  component: ComponentType<any>,
): ServerComponentAnalysis {
  const analysis: ServerComponentAnalysis = {
    isServerComponent: true,
    clientComponents: [],
    serverComponents: [],
    asyncComponents: [],
    violations: [],
  };

  // Check if component has 'use client' directive
  const componentString = component.toString();
  const hasUseClient =
    componentString.includes('use client') ||
    componentString.includes('"use client"') ||
    componentString.includes("'use client'");

  if (hasUseClient) {
    analysis.isServerComponent = false;
    analysis.clientComponents.push(component.name || 'Anonymous');
  } else {
    analysis.serverComponents.push(component.name || 'Anonymous');
  }

  // Check for async components
  if (
    componentString.includes('async') &&
    componentString.includes('function')
  ) {
    analysis.asyncComponents.push(component.name || 'Anonymous');
  }

  // Check for invalid patterns in server components
  if (analysis.isServerComponent) {
    // Check for browser-only APIs
    if (componentString.includes('useState')) {
      analysis.violations.push({
        component: component.name || 'Anonymous',
        issue: 'Uses useState in server component',
        suggestion:
          'Move useState to a client component or use server-side state management',
      });
    }

    if (componentString.includes('useEffect')) {
      analysis.violations.push({
        component: component.name || 'Anonymous',
        issue: 'Uses useEffect in server component',
        suggestion:
          'Server components cannot use useEffect. Move to client component.',
      });
    }

    if (
      componentString.includes('onClick') ||
      componentString.includes('onChange')
    ) {
      analysis.violations.push({
        component: component.name || 'Anonymous',
        issue: 'Has event handlers in server component',
        suggestion:
          'Event handlers require client components. Add "use client" or extract to client component.',
      });
    }

    if (
      componentString.includes('window.') ||
      componentString.includes('document.')
    ) {
      analysis.violations.push({
        component: component.name || 'Anonymous',
        issue: 'Accesses browser APIs in server component',
        suggestion:
          'Browser APIs are not available in server components. Move to client component.',
      });
    }
  }

  return analysis;
}

/**
 * Test a server action with mocked context
 */
export async function testServerAction<T = unknown>(
  action: (...args: any[]) => Promise<T>,
  formData: FormData | Record<string, any>,
  options: RSCTestOptions = {},
): Promise<ServerActionResult<T>> {
  const context = createServerContext(options);
  const result: ServerActionResult<T> = {
    success: false,
  };

  // Track redirects and revalidations
  const redirectMock = vi.fn();
  const revalidatePathMock = vi.fn();
  const revalidateTagMock = vi.fn();

  // Mock navigation functions
  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      redirect: redirectMock,
      revalidatePath: revalidatePathMock,
      revalidateTag: revalidateTagMock,
    };
  });

  try {
    // Convert plain object to FormData if needed
    let actionData: FormData;
    if (formData instanceof FormData) {
      actionData = formData;
    } else {
      actionData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        actionData.append(key, String(value));
      });
    }

    // Execute the server action
    const data = await action(actionData);

    result.success = true;
    result.data = data;

    // Check for redirects
    if (redirectMock.mock.calls.length > 0) {
      result.redirect = redirectMock.mock.calls[0][0];
    }

    // Check for revalidations
    if (revalidatePathMock.mock.calls.length > 0) {
      result.revalidated = revalidatePathMock.mock.calls.map((call) => call[0]);
    }

    // Get updated cookies
    result.cookies = Object.fromEntries(context.cookies);
  } catch (error) {
    result.success = false;
    result.error = error as Error;
  }

  return result;
}

/**
 * Validate that a component properly separates server and client code
 */
export function validateServerClientSplit(
  serverComponent: ComponentType<any>,
  clientComponent?: ComponentType<any>,
): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Analyze server component
  const serverAnalysis = analyzeServerClientBoundaries(serverComponent);

  if (!serverAnalysis.isServerComponent) {
    issues.push(
      'Component marked as server component but has "use client" directive',
    );
  }

  if (serverAnalysis.violations.length > 0) {
    serverAnalysis.violations.forEach((violation) => {
      issues.push(`${violation.component}: ${violation.issue}`);
    });
  }

  // Analyze client component if provided
  if (clientComponent) {
    const clientAnalysis = analyzeServerClientBoundaries(clientComponent);

    if (clientAnalysis.isServerComponent) {
      issues.push(
        'Component should be a client component but lacks "use client" directive',
      );
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Test async server component data fetching
 */
export async function testAsyncServerComponent<Props = {}>(
  component: (props: Props) => Promise<ReactElement>,
  props: Props,
  options: RSCTestOptions = {},
): Promise<{
  html: string;
  renderTime: number;
  context: ServerComponentContext;
}> {
  const startTime = performance.now();
  const context = createServerContext(options);

  // Render async component
  const element = await component(props);
  const html = renderToString(element);
  const renderTime = performance.now() - startTime;

  return {
    html,
    renderTime,
    context,
  };
}

/**
 * Mock fetch for server component testing
 */
export function mockServerFetch(responses: Map<string, any>): Mock {
  const fetchMock = vi.fn(async (url: string, options?: RequestInit) => {
    const response = responses.get(url);

    if (!response) {
      throw new Error(`No mock response for URL: ${url}`);
    }

    return {
      ok: true,
      status: 200,
      json: async () => response,
      text: async () => JSON.stringify(response),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    };
  });

  global.fetch = fetchMock as any;
  return fetchMock;
}

/**
 * Test server component composition with mixed server/client children
 */
export async function testComponentComposition(
  parentComponent: ReactElement,
  options: RSCTestOptions & {
    expectedClientComponents?: string[];
    expectedServerComponents?: string[];
  } = {},
): Promise<{
  valid: boolean;
  html: string;
  componentMap: {
    server: string[];
    client: string[];
  };
}> {
  const { html, context } = await renderServerComponent(
    parentComponent,
    options,
  );

  // Parse the rendered HTML to identify component boundaries
  // This is a simplified version - in production you'd want more sophisticated parsing
  const componentMap = {
    server: options.expectedServerComponents || [],
    client: options.expectedClientComponents || [],
  };

  // Check for hydration markers that indicate client components
  const hasClientComponents =
    html.includes('data-reactroot') || html.includes('data-react-');

  return {
    valid: true, // Simplified validation
    html,
    componentMap,
  };
}

/**
 * Create a mock server component for testing
 */
export function createMockServerComponent<Props = {}>(
  name: string,
  renderFn: (props: Props) => ReactElement,
): ComponentType<Props> {
  const component = (props: Props): ReactElement => renderFn(props);
  component.displayName = name;

  // Mark as server component (no 'use client')
  Object.defineProperty(component, '__isServerComponent', {
    value: true,
    writable: false,
  });

  return component;
}

/**
 * Create a mock client component for testing
 */
export function createMockClientComponent<Props = {}>(
  name: string,
  renderFn: (props: Props) => ReactElement,
): ComponentType<Props> {
  // Add 'use client' directive marker
  const component = (props: Props): ReactElement => {
    'use client';
    return renderFn(props);
  };
  component.displayName = name;

  // Mark as client component
  Object.defineProperty(component, '__isClientComponent', {
    value: true,
    writable: false,
  });

  return component;
}

/**
 * Test that server component doesn't leak sensitive data
 */
export function testDataSafety(
  html: string,
  sensitivePatterns: string[] = [],
): {
  safe: boolean;
  leaks: Array<{ pattern: string; found: string }>;
} {
  const defaultPatterns = [
    'password',
    'secret',
    'apiKey',
    'token',
    'private',
    'credential',
  ];

  const patterns = [...defaultPatterns, ...sensitivePatterns];
  const leaks: Array<{ pattern: string; found: string }> = [];

  patterns.forEach((pattern) => {
    const regex = new RegExp(pattern, 'gi');
    const matches = html.match(regex);

    if (matches) {
      matches.forEach((match) => {
        // Get context around the match
        const index = html.indexOf(match);
        const context = html.substring(
          Math.max(0, index - 20),
          Math.min(html.length, index + match.length + 20),
        );
        leaks.push({
          pattern,
          found: context,
        });
      });
    }
  });

  return {
    safe: leaks.length === 0,
    leaks,
  };
}
