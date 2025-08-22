import { render, } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { vi } from 'vitest';
export function renderServer(component, options = {}) {
    const { testHydration = false, validateMismatches = true, windowProps = {}, documentProps = {}, userAgent = 'Mozilla/5.0 (compatible; SSR Testing)', cookies = {}, headers = {}, ...renderOptions } = options;
    const originalWindow = global.window;
    const originalDocument = global.document;
    const hydrationWarnings = [];
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
        url: 'http://localhost',
        pretendToBeVisual: false,
        resources: 'usable',
        userAgent,
    });
    global.window = {
        ...dom.window,
        ...windowProps,
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
    };
    global.document = {
        ...dom.window.document,
        ...documentProps,
        cookie: Object.entries(cookies)
            .map(([key, value]) => `${key}=${value}`)
            .join('; '),
    };
    const originalConsoleError = console.error;
    const consoleErrorSpy = vi.fn((message, ...args) => {
        if (typeof message === 'string' &&
            (message.includes('hydration') ||
                message.includes('Hydration') ||
                message.includes('Text content does not match') ||
                message.includes('did not match'))) {
            hydrationWarnings.push(message);
        }
        originalConsoleError(message, ...args);
    });
    console.error = consoleErrorSpy;
    const serverHTML = renderToString(component);
    const staticHTML = renderToStaticMarkup(component);
    const container = document.createElement('div');
    container.innerHTML = serverHTML;
    document.body.appendChild(container);
    const renderResult = render(component, {
        ...renderOptions,
        container,
        hydrate: false,
    });
    const hydrate = async () => {
        const startTime = performance.now();
        const hydrationErrors = [];
        const hydrationWarningsLocal = [];
        try {
            const hydrateContainer = document.createElement('div');
            hydrateContainer.innerHTML = serverHTML;
            document.body.appendChild(hydrateContainer);
            const hydrateConsoleError = vi.fn((message, ...args) => {
                if (typeof message === 'string' &&
                    (message.includes('hydration') || message.includes('Hydration'))) {
                    hydrationWarningsLocal.push(message);
                }
            });
            console.error = hydrateConsoleError;
            const hydrated = render(component, {
                ...renderOptions,
                container: hydrateContainer,
                hydrate: true,
            });
            const hydrationTime = performance.now() - startTime;
            return {
                success: hydrationErrors.length === 0 && hydrationWarningsLocal.length === 0,
                errors: hydrationErrors,
                warnings: hydrationWarningsLocal,
                hydrated,
                hydrationTime,
            };
        }
        catch (error) {
            hydrationErrors.push(error);
            return {
                success: false,
                errors: hydrationErrors,
                warnings: hydrationWarningsLocal,
                hydrated: renderResult,
                hydrationTime: performance.now() - startTime,
            };
        }
        finally {
            console.error = originalConsoleError;
        }
    };
    const getServerSnapshot = () => {
        return container.innerHTML;
    };
    const compareHydration = () => {
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
    const cleanup = renderResult.unmount;
    renderResult.unmount = () => {
        cleanup();
        global.window = originalWindow;
        global.document = originalDocument;
        console.error = originalConsoleError;
    };
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
export async function renderWithHydration(component, options = {}) {
    const server = renderServer(component, {
        ...options,
        testHydration: true,
    });
    const hydration = await server.hydrate();
    const mismatches = [];
    if (!hydration.success) {
        mismatches.push(...hydration.warnings);
        hydration.errors.forEach((error) => {
            mismatches.push(error.message);
        });
    }
    const comparison = server.compareHydration();
    if (!comparison.matches) {
        comparison.differences.forEach((diff) => {
            mismatches.push(`Mismatch at ${diff.path}: server="${diff.server}" client="${diff.client}"`);
        });
    }
    return {
        server,
        hydration,
        mismatches,
    };
}
function normalizeHTML(html) {
    return html
        .replace(/data-react[a-z-]*="[^"]*"/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}
function findHTMLDifferences(serverHTML, clientHTML) {
    const differences = [];
    if (serverHTML !== clientHTML) {
        const maxLength = Math.max(serverHTML.length, clientHTML.length);
        for (let i = 0; i < maxLength; i++) {
            if (serverHTML[i] !== clientHTML[i]) {
                differences.push({
                    path: `char[${i}]`,
                    server: serverHTML.substring(i, i + 20),
                    client: clientHTML.substring(i, i + 20),
                });
                break;
            }
        }
    }
    return differences;
}
export function expectNoHydrationMismatch(result) {
    if (result.mismatches.length > 0) {
        throw new Error(`Hydration mismatches detected:\n${result.mismatches.join('\n')}`);
    }
}
export function renderServerWithMedia(component, mediaQuery, matches) {
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
export async function expectServerClientMatch(component, options) {
    const result = await renderWithHydration(component, options);
    expectNoHydrationMismatch(result);
}
export function extractMetaTags(serverHTML) {
    const metaTags = {};
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
export function renderStaticOnly(component) {
    const html = renderToStaticMarkup(component);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const text = document.body.textContent || '';
    const links = Array.from(document.querySelectorAll('a'))
        .map((link) => link.getAttribute('href'))
        .filter(Boolean);
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
export function mockNextRouter(pathname = '/', query = {}) {
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
    };
}
