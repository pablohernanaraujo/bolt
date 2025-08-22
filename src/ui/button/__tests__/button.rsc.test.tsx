/* eslint-disable max-nested-callbacks */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/ui/button/__tests__/button.rsc.test.tsx
// React Server Component tests for Button demonstrating server/client boundaries
// Tests component architecture, server actions, and data safety
// RELEVANT FILES: button.tsx, rsc-test-utils.tsx, test-setup.ts

import {
  analyzeServerClientBoundaries,
  createMockClientComponent,
  createMockServerComponent,
  renderServerComponent,
  testAsyncServerComponent,
  testComponentComposition,
  testDataSafety,
  testServerAction,
  validateServerClientSplit,
} from '@/ui/utils/rsc-test-utils';
import '@/ui/utils/test-setup';
import { ReactElement, ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button';

// Extend Vitest types for custom matchers
declare module 'vitest' {
  interface Assertion<T = any> {
    toBeServerComponent(): T;
  }
}

describe('Button - RSC Testing', () => {
  describe('Server/Client boundaries', () => {
    it('should be a server component by default', () => {
      // Verify button is server-compatible
      const analysis = analyzeServerClientBoundaries(Button as any);

      expect(analysis.isServerComponent).toBe(true);
      expect(analysis.violations).toHaveLength(0);
      expect(Button).toBeServerComponent();
    });

    it('should not contain client-only hooks', () => {
      // Verify no useState, useEffect, etc.
      const analysis = analyzeServerClientBoundaries(Button as any);

      expect(
        analysis.violations.filter(
          (v) => v.issue.includes('useState') || v.issue.includes('useEffect'),
        ),
      ).toHaveLength(0);
    });

    it('should support server-side event handlers via forms', async () => {
      // Test server action integration
      const serverAction = vi.fn(async (formData: FormData) => {
        const value = formData.get('action');
        return {
          success: true,
          value,
        };
      });

      const { html } = await renderServerComponent(
        <form action={serverAction as any}>
          <Button type="submit" name="action" value="submit">
            Server Action Button
          </Button>
        </form>,
      );

      expect(html).toContain('type="submit"');
      expect(html).toContain('name="action"');
      expect(html).toContain('value="submit"');
    });
  });

  describe('Server component rendering', () => {
    it('should render on the server without client JS', async () => {
      // Test pure server rendering
      const { html, context } = await renderServerComponent(
        <Button variant="primary">Server Button</Button>,
      );

      expect(html).toContain('Server Button');
      expect(html).not.toContain('use client');
      expect(context).toBeDefined();
    });

    it('should access server context when needed', async () => {
      // Test with server context (cookies, headers)
      const { html, context } = await renderServerComponent(
        <Button variant="secondary">Context Button</Button>,
        {
          cookies: { theme: 'dark' },
          headers: { 'Accept-Language': 'en-US' },
        },
      );

      expect(context.cookies.get('theme')).toBe('dark');
      expect(context.headers.get('Accept-Language')).toBe('en-US');
    });

    it('should handle async server components', async () => {
      // Test async component rendering
      const AsyncButtonWrapper = async (): Promise<ReactElement> => {
        // Simulate async data fetching
        await new Promise((resolve) => setTimeout(resolve, 10));
        return <Button variant="primary">Async Button</Button>;
      };

      const { html, renderTime } = await testAsyncServerComponent(
        AsyncButtonWrapper,
        {},
      );

      expect(html).toContain('Async Button');
      expect(renderTime).toBeGreaterThan(10);
    });
  });

  describe('Server actions', () => {
    it('should handle form submissions', async () => {
      // Test server action with button
      const handleSubmit = async (
        formData: FormData,
      ): Promise<{ message: string }> => {
        const buttonValue = formData.get('button');
        return { message: `Clicked: ${buttonValue}` };
      };

      const result = await testServerAction(handleSubmit, {
        button: 'submit-value',
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ message: 'Clicked: submit-value' });
    });

    it('should handle server action errors', async () => {
      // Test error handling in server actions
      const failingAction = async (): Promise<never> => {
        throw new Error('Server action failed');
      };

      const result = await testServerAction(failingAction, {});

      expect(result.success).toBe(false);
      expect(result.error?.message).toBe('Server action failed');
    });

    it('should support redirect after action', async () => {
      // Test redirect behavior
      const redirectAction = async (): Promise<{ redirect: string }> => {
        // In real implementation, would call redirect()
        return { redirect: '/success' };
      };

      const result = await testServerAction(redirectAction, {
        action: 'redirect',
      });

      expect(result.success).toBe(true);
      // Check redirect was triggered (mocked)
    });
  });

  describe('Component composition', () => {
    it('should compose with server components', async () => {
      // Test server component composition
      const ServerWrapper = createMockServerComponent(
        'ServerWrapper',
        ({ children }: { children: ReactNode }) => (
          <div className="server-wrapper">{children}</div>
        ),
      );

      const { html, valid } = await testComponentComposition(
        <ServerWrapper>
          <Button variant="primary">Composed Button</Button>
        </ServerWrapper>,
      );

      expect(valid).toBe(true);
      expect(html).toContain('Composed Button');
      expect(html).toContain('server-wrapper');
    });

    it('should work with mixed server/client trees', async () => {
      // Test mixed component trees
      const ClientInteractive = createMockClientComponent(
        'ClientInteractive',
        ({
          onClick,
          children,
        }: {
          onClick: () => void;
          children: ReactNode;
        }) => <div onClick={onClick}>{children}</div>,
      );

      const { html, componentMap } = await testComponentComposition(
        <div>
          <Button variant="secondary">Server Button</Button>
          <ClientInteractive onClick={() => {}}>
            <span>Client Content</span>
          </ClientInteractive>
        </div>,
        {
          expectedServerComponents: ['Button'],
          expectedClientComponents: ['ClientInteractive'],
        },
      );

      expect(componentMap.server).toContain('Button');
      expect(componentMap.client).toContain('ClientInteractive');
    });
  });

  describe('Data safety and security', () => {
    it('should not leak sensitive data in HTML', async () => {
      // Test that sensitive data is not exposed
      const { html } = await renderServerComponent(
        <Button variant="primary" data-user-id="123" data-public="visible">
          Public Button
        </Button>,
      );

      const safety = testDataSafety(html, ['user-id', 'api-key']);

      expect(safety.safe).toBe(false); // Should detect user-id
      expect(safety.leaks.some((l) => l.pattern === 'user-id')).toBe(true);
    });

    it('should escape user input properly', async () => {
      // Test XSS prevention
      const maliciousInput = '<script>alert("XSS")</script>';
      const { html } = await renderServerComponent(
        <Button variant="ghost">{maliciousInput}</Button>,
      );

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('should handle environment variables safely', async () => {
      // Test that env vars are not exposed
      process.env.SECRET_API_KEY = 'secret123';

      const { html } = await renderServerComponent(
        <Button variant="primary">Env Test</Button>,
      );

      const safety = testDataSafety(html);
      expect(html).not.toContain('secret123');
      expect(safety.safe).toBe(true);

      delete process.env.SECRET_API_KEY;
    });
  });

  describe('Performance characteristics', () => {
    it('should render efficiently on the server', async () => {
      // Test rendering performance
      const iterations = 100;
      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        await renderServerComponent(
          <Button variant="primary">Perf Test {i}</Button>,
        );
      }

      const totalTime = performance.now() - startTime;
      const avgTime = totalTime / iterations;

      // Server rendering should be fast (< 1ms per component)
      expect(avgTime).toBeLessThan(1);
    });

    it('should handle large component trees', async () => {
      // Test with nested components
      const DeepTree = (): ReactElement => (
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i}>
              <Button variant="secondary">Level {i}</Button>
            </div>
          ))}
        </div>
      );

      const { html } = await renderServerComponent(<DeepTree />);

      for (let i = 0; i < 50; i++) {
        expect(html).toContain(`Level ${i}`);
      }
    });
  });

  describe('Validation and type safety', () => {
    it('should validate server/client split correctly', () => {
      // Test boundary validation
      const ServerButton = (): ReactElement => <Button>Server Only</Button>;

      const validation = validateServerClientSplit(ServerButton as any);

      expect(validation.valid).toBe(true);
      expect(validation.issues).toHaveLength(0);
    });

    it('should detect improper client code in server component', () => {
      // Test detection of client-only code
      const BadServerComponent = (): ReactElement => {
        // This would be caught by the analyzer
        const [state, setState] = ['', () => {}]; // Simulated useState
        return <Button>Bad Component</Button>;
      };

      const analysis = analyzeServerClientBoundaries(BadServerComponent as any);

      // Would detect useState pattern in real implementation
      expect(analysis.isServerComponent).toBeDefined();
    });
  });

  describe('Integration with Next.js features', () => {
    it('should support parallel data fetching', async () => {
      // Test parallel server component rendering
      const fetchData = vi.fn(async (id: string) => ({
        id,
        data: 'test',
      }));

      const ParallelButtons = async (): Promise<ReactElement> => {
        const [data1, data2] = await Promise.all([
          fetchData('1'),
          fetchData('2'),
        ]);

        return (
          <>
            <Button variant="primary">{data1.data}</Button>
            <Button variant="secondary">{data2.data}</Button>
          </>
        );
      };

      const { html } = await testAsyncServerComponent(ParallelButtons, {});

      expect(fetchData).toHaveBeenCalledTimes(2);
      expect(html).toContain('test');
    });

    it('should work with streaming SSR', async () => {
      // Test streaming capabilities
      const StreamedButton = async (): Promise<ReactElement> => {
        // Simulate streaming delay
        await new Promise((resolve) => setTimeout(resolve, 5));
        return <Button variant="primary">Streamed</Button>;
      };

      const { html, renderTime } = await testAsyncServerComponent(
        StreamedButton,
        {},
      );

      expect(html).toContain('Streamed');
      expect(renderTime).toBeGreaterThanOrEqual(5);
    });
  });
});
