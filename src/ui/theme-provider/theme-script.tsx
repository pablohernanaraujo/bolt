// /src/ui/theme-provider/theme-script.tsx
// Server-compatible script component for preventing theme flash
// Injects theme detection script in HTML head before hydration
// RELEVANT FILES: theme-provider.tsx, ../../theme/index.ts

import { type FC, type ReactElement } from 'react';

import { type ThemeVariant } from '@/tokens/themes';

import { type ThemeScriptProps } from './types';

/**
 * Theme script component for preventing flash of wrong theme
 * Must be placed in document head before any styled content
 * 
 * This component generates an inline script that:
 * 1. Reads theme preference from localStorage
 * 2. Falls back to system preference via media query
 * 3. Sets data-theme attribute on document element
 * 4. All happens synchronously before page paint
 */
export const ThemeScript: FC<ThemeScriptProps> = ({
  storageKey = 'theme-preference',
  defaultTheme = 'light',
  respectSystemTheme = true,
}): ReactElement => {
  // Generate the theme detection script
  const script = `
    (function() {
      try {
        // Try to get theme from localStorage first
        var stored = localStorage.getItem('${storageKey}');
        if (stored === 'light' || stored === 'dark') {
          document.documentElement.setAttribute('data-theme', stored);
          return;
        }
        
        // Fall back to system preference if enabled
        ${
          respectSystemTheme
            ? `
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        }
        `
            : `
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        `
        }
      } catch (e) {
        // Fallback for any errors (localStorage disabled, etc.)
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
      }
    })();
  `;

  // Return script element with minified code
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: script.replace(/\s+/g, ' ').trim(),
      }}
    />
  );
};

/**
 * Hook to generate theme script string for custom implementations
 * Useful when you need the script as a string rather than a component
 */
export function generateThemeScript(props: ThemeScriptProps = {}): string {
  const {
    storageKey = 'theme-preference',
    defaultTheme = 'light',
    respectSystemTheme = true,
  } = props;

  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('${storageKey}');
        if (stored === 'light' || stored === 'dark') {
          document.documentElement.setAttribute('data-theme', stored);
          return;
        }
        ${
          respectSystemTheme
            ? `
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        }
        `
            : `
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
        `
        }
      } catch (e) {
        document.documentElement.setAttribute('data-theme', '${defaultTheme}');
      }
    })();
  `;

  return script.replace(/\s+/g, ' ').trim();
}

/**
 * Server-side theme script for Next.js App Router
 * Can be used in layout.tsx or page.tsx files
 */
export function getThemeScriptForAppRouter(
  props: ThemeScriptProps = {},
): ReactElement {
  return <ThemeScript {...props} />;
}