import { type RenderOptions, type RenderResult } from '@testing-library/react';
import { Router } from 'next/router';
import { type ReactElement } from 'react';
export interface SSRTestOptions extends Omit<RenderOptions, 'hydrate'> {
    testHydration?: boolean;
    windowProps?: Record<string, unknown>;
    documentProps?: Record<string, unknown>;
    validateMismatches?: boolean;
    userAgent?: string;
    cookies?: Record<string, string>;
    headers?: Record<string, string>;
}
export interface SSRRenderResult extends RenderResult {
    serverHTML: string;
    staticHTML: string;
    hydrationWarnings: string[];
    hydrate: () => Promise<HydrationResult>;
    getServerSnapshot: () => string;
    compareHydration: () => HydrationComparison;
}
export interface HydrationResult {
    success: boolean;
    errors: Error[];
    warnings: string[];
    hydrated: RenderResult;
    hydrationTime: number;
}
export interface HydrationComparison {
    matches: boolean;
    differences: Array<{
        path: string;
        server: string;
        client: string;
    }>;
    serverHTML: string;
    clientHTML: string;
}
export declare function renderServer(component: ReactElement, options?: SSRTestOptions): SSRRenderResult;
export declare function renderWithHydration(component: ReactElement, options?: SSRTestOptions): Promise<{
    server: SSRRenderResult;
    hydration: HydrationResult;
    mismatches: string[];
}>;
export declare function expectNoHydrationMismatch(result: {
    mismatches: string[];
}): void;
export declare function renderServerWithMedia(component: ReactElement, mediaQuery: string, matches: boolean): SSRRenderResult;
export declare function expectServerClientMatch(component: ReactElement, options?: SSRTestOptions): Promise<void>;
export declare function extractMetaTags(serverHTML: string): Record<string, string>;
export declare function renderStaticOnly(component: ReactElement): {
    html: string;
    text: string;
    links: string[];
    forms: Array<{
        action: string;
        method: string;
    }>;
};
export declare function mockNextRouter(pathname?: string, query?: Record<string, string>): Router;
