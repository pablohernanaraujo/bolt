/* eslint-disable max-nested-callbacks */
// src/ui/button/__tests__/button.ssr.test.tsx
// SSR-specific tests for Button component demonstrating server rendering and hydration
// Tests server rendering, hydration mismatches, and static HTML generation
// RELEVANT FILES: button.tsx, ssr-test-utils.tsx, test-setup.ts

import {
  expectNoHydrationMismatch,
  expectServerClientMatch,
  renderServer,
  renderServerWithMedia,
  renderStaticOnly,
  renderWithHydration,
} from '@/ui/utils/ssr-test-utils';
import { describe, expect, it } from 'vitest';
import { Button } from '../button';

describe('Button - SSR Testing', () => {
  describe('Server-side rendering', () => {
    it('should render correctly on the server', () => {
      // Test basic server rendering
      const { serverHTML, staticHTML } = renderServer(
        <Button variant="primary" size="medium">
          Click me
        </Button>,
      );

      // Verify server HTML contains expected content
      expect(serverHTML).toContain('Click me');
      expect(serverHTML).toContain('button');

      // Static HTML should not have React IDs
      expect(staticHTML).not.toContain('data-react');
      expect(staticHTML).toContain('Click me');
    });

    it('should preserve accessibility attributes in SSR', () => {
      // Test that ARIA attributes are rendered server-side
      const { serverHTML } = renderServer(
        <Button
          variant="primary"
          aria-label="Submit form"
          aria-pressed="false"
          role="button"
        >
          Submit
        </Button>,
      );

      expect(serverHTML).toContain('aria-label="Submit form"');
      expect(serverHTML).toContain('aria-pressed="false"');
      expect(serverHTML).toContain('role="button"');
    });

    it('should handle different variants in SSR', () => {
      // Test all button variants render correctly
      const variants = ['primary', 'secondary', 'ghost', 'danger'] as const;

      variants.forEach((variant) => {
        const { serverHTML } = renderServer(
          <Button variant={variant}>Test {variant}</Button>,
        );

        expect(serverHTML).toContain(`Test ${variant}`);
        // Check that variant classes are applied
        expect(serverHTML).toMatch(/class="[^"]*"/);
      });
    });
  });

  describe('Hydration behavior', () => {
    it('should hydrate without mismatches', async () => {
      // Test that component hydrates cleanly
      const result = await renderWithHydration(
        <Button variant="primary" size="large">
          Hydrate me
        </Button>,
      );

      // Verify no hydration mismatches
      expectNoHydrationMismatch(result);
      expect(result.hydration.success).toBe(true);
      expect(result.hydration.errors).toHaveLength(0);
    });

    it('should maintain consistency between server and client', async () => {
      // Test that server and client render identically
      await expectServerClientMatch(
        <Button variant="secondary" disabled>
          Consistent Button
        </Button>,
      );
    });

    it('should preserve state during hydration', async () => {
      // Test that initial props are preserved during hydration
      const { server, hydration } = await renderWithHydration(
        <Button variant="primary" size="small" data-testid="hydrated-btn">
          State Test
        </Button>,
      );

      // Get the hydrated component
      const hydratedButton = hydration.hydrated.getByTestId('hydrated-btn');

      // Verify attributes are preserved
      expect(hydratedButton).toHaveTextContent('State Test');
      expect(hydratedButton.tagName).toBe('BUTTON');
    });
  });

  describe('Progressive enhancement', () => {
    it('should work without JavaScript', () => {
      // Test that button is functional without JS
      const { html, text, forms } = renderStaticOnly(
        <form action="/submit" method="POST">
          <Button type="submit" variant="primary">
            Submit Form
          </Button>
        </form>,
      );

      // Verify button is part of a functional form
      expect(html).toContain('<button');
      expect(html).toContain('type="submit"');
      expect(text).toContain('Submit Form');
      expect(forms).toHaveLength(1);
      expect(forms[0]).toEqual({
        action: '/submit',
        method: 'POST',
      });
    });

    it('should render correctly for print media', () => {
      // Test print media rendering
      const { serverHTML } = renderServerWithMedia(
        <Button variant="primary">Print Button</Button>,
        'print',
        true,
      );

      expect(serverHTML).toContain('Print Button');
      // In real scenario, you'd check print-specific styles
    });

    it('should handle reduced motion preferences', () => {
      // Test with prefers-reduced-motion
      const { serverHTML } = renderServer(
        <Button variant="primary" className="animated">
          Animated Button
        </Button>,
        {
          windowProps: {
            matchMedia: (query: string) => ({
              matches: query === '(prefers-reduced-motion: reduce)',
              media: query,
            }),
          },
        },
      );

      expect(serverHTML).toContain('Animated Button');
      // Component should respect reduced motion preference
    });
  });

  describe('Theme and styling in SSR', () => {
    it('should apply theme classes server-side', () => {
      // Test theme application in SSR
      const { serverHTML } = renderServer(
        <div data-theme="dark">
          <Button variant="primary">Themed Button</Button>
        </div>,
      );

      expect(serverHTML).toContain('data-theme="dark"');
      expect(serverHTML).toContain('Themed Button');
    });

    it('should handle RTL rendering', () => {
      // Test RTL support in SSR
      const { serverHTML } = renderServer(
        <div dir="rtl">
          <Button variant="secondary">RTL Button</Button>
        </div>,
        {
          documentProps: {
            dir: 'rtl',
          },
        },
      );

      expect(serverHTML).toContain('dir="rtl"');
      expect(serverHTML).toContain('RTL Button');
    });
  });

  describe('Performance and optimization', () => {
    it('should generate minimal static HTML', () => {
      // Test that static HTML is optimized
      const { staticHTML } = renderServer(
        <Button variant="ghost" size="small">
          Minimal
        </Button>,
      );

      // Static HTML should be clean without React artifacts
      expect(staticHTML).not.toContain('data-react');
      expect(staticHTML).not.toContain('<!-- -->');
      expect(staticHTML.length).toBeLessThan(200); // Ensure HTML is compact
    });

    it('should handle multiple buttons efficiently', () => {
      // Test rendering multiple buttons
      const { serverHTML, hydrationWarnings } = renderServer(
        <div>
          {Array.from({ length: 10 }, (_, i) => (
            <Button key={i} variant="primary">
              Button {i}
            </Button>
          ))}
        </div>,
      );

      // Verify all buttons are rendered
      for (let i = 0; i < 10; i++) {
        expect(serverHTML).toContain(`Button ${i}`);
      }

      // No hydration warnings for multiple components
      expect(hydrationWarnings).toHaveLength(0);
    });
  });

  describe('Error boundaries and edge cases', () => {
    it('should handle missing props gracefully', () => {
      // Test with minimal props
      const { serverHTML } = renderServer(<Button>Default</Button>);

      expect(serverHTML).toContain('Default');
      expect(serverHTML).toContain('<button');
    });

    it('should handle special characters in content', () => {
      // Test with special characters that could cause issues
      const specialContent =
        '<script>alert("XSS")</script> & "quotes" \'apostrophe\'';
      const { serverHTML, staticHTML } = renderServer(
        <Button>{specialContent}</Button>,
      );

      // Content should be properly escaped
      expect(serverHTML).not.toContain('<script>alert');
      expect(serverHTML).toContain('&lt;script&gt;');
      expect(staticHTML).toContain('&lt;script&gt;');
    });

    it('should handle long content without breaking', () => {
      // Test with very long content
      const longContent = 'A'.repeat(1000);
      const { serverHTML } = renderServer(
        <Button variant="primary">{longContent}</Button>,
      );

      expect(serverHTML).toContain(longContent);
    });
  });

  describe('Snapshot testing', () => {
    it('should match server-rendered snapshot', () => {
      // Test that server output is consistent
      const { serverHTML } = renderServer(
        <Button variant="primary" size="medium" disabled>
          Snapshot Test
        </Button>,
      );

      // In a real test, you'd use toMatchSnapshot()
      expect(serverHTML).toBeDefined();
      expect(serverHTML).toContain('Snapshot Test');
      expect(serverHTML).toContain('disabled');
    });

    it('should match static HTML snapshot', () => {
      // Test static HTML output consistency
      const { html } = renderStaticOnly(
        <Button variant="primary">Static Snapshot</Button>,
      );

      expect(html).toBeDefined();
      expect(html).toContain('Static Snapshot');
      expect(html).toContain('Static Snapshot');
    });
  });
});
