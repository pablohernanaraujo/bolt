import { type ComponentType, type ReactElement } from 'react';
import { type Mock } from 'vitest';
export interface RSCTestOptions {
    cookies?: Record<string, string>;
    headers?: Record<string, string>;
    searchParams?: Record<string, string>;
    pathname?: string;
    validateBoundaries?: boolean;
}
export interface ServerComponentContext {
    cookies: Map<string, string>;
    headers: Map<string, string>;
    searchParams: URLSearchParams;
    pathname: string;
}
export interface ServerComponentAnalysis {
    isServerComponent: boolean;
    clientComponents: string[];
    serverComponents: string[];
    asyncComponents: string[];
    violations: Array<{
        component: string;
        issue: string;
        suggestion: string;
    }>;
}
export interface ServerActionResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: Error;
    redirect?: string;
    revalidated?: string[];
    cookies?: Record<string, string>;
}
export declare function createServerContext(options?: RSCTestOptions): ServerComponentContext;
export declare function renderServerComponent(component: ReactElement | (() => Promise<ReactElement>), options?: RSCTestOptions): Promise<{
    html: string;
    context: ServerComponentContext;
}>;
export declare function analyzeServerClientBoundaries(component: ComponentType<any>): ServerComponentAnalysis;
export declare function testServerAction<T = unknown>(action: (...args: any[]) => Promise<T>, formData: FormData | Record<string, any>, options?: RSCTestOptions): Promise<ServerActionResult<T>>;
export declare function validateServerClientSplit(serverComponent: ComponentType<any>, clientComponent?: ComponentType<any>): {
    valid: boolean;
    issues: string[];
};
export declare function testAsyncServerComponent<Props = {}>(component: (props: Props) => Promise<ReactElement>, props: Props, options?: RSCTestOptions): Promise<{
    html: string;
    renderTime: number;
    context: ServerComponentContext;
}>;
export declare function mockServerFetch(responses: Map<string, any>): Mock;
export declare function testComponentComposition(parentComponent: ReactElement, options?: RSCTestOptions & {
    expectedClientComponents?: string[];
    expectedServerComponents?: string[];
}): Promise<{
    valid: boolean;
    html: string;
    componentMap: {
        server: string[];
        client: string[];
    };
}>;
export declare function createMockServerComponent<Props = {}>(name: string, renderFn: (props: Props) => ReactElement): ComponentType<Props>;
export declare function createMockClientComponent<Props = {}>(name: string, renderFn: (props: Props) => ReactElement): ComponentType<Props>;
export declare function testDataSafety(html: string, sensitivePatterns?: string[]): {
    safe: boolean;
    leaks: Array<{
        pattern: string;
        found: string;
    }>;
};
