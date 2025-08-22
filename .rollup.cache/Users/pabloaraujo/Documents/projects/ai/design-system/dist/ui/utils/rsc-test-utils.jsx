import { cookies, headers } from 'next/headers';
import { renderToString } from 'react-dom/server';
import { vi } from 'vitest';
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
export function createServerContext(options = {}) {
    const context = {
        cookies: new Map(Object.entries(options.cookies || {})),
        headers: new Map(Object.entries(options.headers || {})),
        searchParams: new URLSearchParams(options.searchParams || {}),
        pathname: options.pathname || '/',
    };
    cookies.mockReturnValue({
        get: (name) => ({ value: context.cookies.get(name) }),
        getAll: () => Array.from(context.cookies.entries()).map(([name, value]) => ({
            name,
            value,
        })),
        has: (name) => context.cookies.has(name),
        set: (name, value) => context.cookies.set(name, value),
        delete: (name) => context.cookies.delete(name),
    });
    headers.mockReturnValue({
        get: (name) => context.headers.get(name),
        has: (name) => context.headers.has(name),
        entries: () => context.headers.entries(),
        forEach: (callback) => {
            context.headers.forEach(callback);
        },
    });
    return context;
}
export async function renderServerComponent(component, options = {}) {
    const context = createServerContext(options);
    let element;
    if (typeof component === 'function') {
        element = await component();
    }
    else {
        element = component;
    }
    const html = renderToString(element);
    return {
        html,
        context,
    };
}
export function analyzeServerClientBoundaries(component) {
    const analysis = {
        isServerComponent: true,
        clientComponents: [],
        serverComponents: [],
        asyncComponents: [],
        violations: [],
    };
    const componentString = component.toString();
    const hasUseClient = componentString.includes('use client') ||
        componentString.includes('"use client"') ||
        componentString.includes("'use client'");
    if (hasUseClient) {
        analysis.isServerComponent = false;
        analysis.clientComponents.push(component.name || 'Anonymous');
    }
    else {
        analysis.serverComponents.push(component.name || 'Anonymous');
    }
    if (componentString.includes('async') &&
        componentString.includes('function')) {
        analysis.asyncComponents.push(component.name || 'Anonymous');
    }
    if (analysis.isServerComponent) {
        if (componentString.includes('useState')) {
            analysis.violations.push({
                component: component.name || 'Anonymous',
                issue: 'Uses useState in server component',
                suggestion: 'Move useState to a client component or use server-side state management',
            });
        }
        if (componentString.includes('useEffect')) {
            analysis.violations.push({
                component: component.name || 'Anonymous',
                issue: 'Uses useEffect in server component',
                suggestion: 'Server components cannot use useEffect. Move to client component.',
            });
        }
        if (componentString.includes('onClick') ||
            componentString.includes('onChange')) {
            analysis.violations.push({
                component: component.name || 'Anonymous',
                issue: 'Has event handlers in server component',
                suggestion: 'Event handlers require client components. Add "use client" or extract to client component.',
            });
        }
        if (componentString.includes('window.') ||
            componentString.includes('document.')) {
            analysis.violations.push({
                component: component.name || 'Anonymous',
                issue: 'Accesses browser APIs in server component',
                suggestion: 'Browser APIs are not available in server components. Move to client component.',
            });
        }
    }
    return analysis;
}
export async function testServerAction(action, formData, options = {}) {
    const context = createServerContext(options);
    const result = {
        success: false,
    };
    const redirectMock = vi.fn();
    const revalidatePathMock = vi.fn();
    const revalidateTagMock = vi.fn();
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
        let actionData;
        if (formData instanceof FormData) {
            actionData = formData;
        }
        else {
            actionData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                actionData.append(key, String(value));
            });
        }
        const data = await action(actionData);
        result.success = true;
        result.data = data;
        if (redirectMock.mock.calls.length > 0) {
            result.redirect = redirectMock.mock.calls[0][0];
        }
        if (revalidatePathMock.mock.calls.length > 0) {
            result.revalidated = revalidatePathMock.mock.calls.map((call) => call[0]);
        }
        result.cookies = Object.fromEntries(context.cookies);
    }
    catch (error) {
        result.success = false;
        result.error = error;
    }
    return result;
}
export function validateServerClientSplit(serverComponent, clientComponent) {
    const issues = [];
    const serverAnalysis = analyzeServerClientBoundaries(serverComponent);
    if (!serverAnalysis.isServerComponent) {
        issues.push('Component marked as server component but has "use client" directive');
    }
    if (serverAnalysis.violations.length > 0) {
        serverAnalysis.violations.forEach((violation) => {
            issues.push(`${violation.component}: ${violation.issue}`);
        });
    }
    if (clientComponent) {
        const clientAnalysis = analyzeServerClientBoundaries(clientComponent);
        if (clientAnalysis.isServerComponent) {
            issues.push('Component should be a client component but lacks "use client" directive');
        }
    }
    return {
        valid: issues.length === 0,
        issues,
    };
}
export async function testAsyncServerComponent(component, props, options = {}) {
    const startTime = performance.now();
    const context = createServerContext(options);
    const element = await component(props);
    const html = renderToString(element);
    const renderTime = performance.now() - startTime;
    return {
        html,
        renderTime,
        context,
    };
}
export function mockServerFetch(responses) {
    const fetchMock = vi.fn(async (url, options) => {
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
    global.fetch = fetchMock;
    return fetchMock;
}
export async function testComponentComposition(parentComponent, options = {}) {
    const { html, context } = await renderServerComponent(parentComponent, options);
    const componentMap = {
        server: options.expectedServerComponents || [],
        client: options.expectedClientComponents || [],
    };
    const hasClientComponents = html.includes('data-reactroot') || html.includes('data-react-');
    return {
        valid: true,
        html,
        componentMap,
    };
}
export function createMockServerComponent(name, renderFn) {
    const component = (props) => renderFn(props);
    component.displayName = name;
    Object.defineProperty(component, '__isServerComponent', {
        value: true,
        writable: false,
    });
    return component;
}
export function createMockClientComponent(name, renderFn) {
    const component = (props) => {
        'use client';
        return renderFn(props);
    };
    component.displayName = name;
    Object.defineProperty(component, '__isClientComponent', {
        value: true,
        writable: false,
    });
    return component;
}
export function testDataSafety(html, sensitivePatterns = []) {
    const defaultPatterns = [
        'password',
        'secret',
        'apiKey',
        'token',
        'private',
        'credential',
    ];
    const patterns = [...defaultPatterns, ...sensitivePatterns];
    const leaks = [];
    patterns.forEach((pattern) => {
        const regex = new RegExp(pattern, 'gi');
        const matches = html.match(regex);
        if (matches) {
            matches.forEach((match) => {
                const index = html.indexOf(match);
                const context = html.substring(Math.max(0, index - 20), Math.min(html.length, index + match.length + 20));
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
