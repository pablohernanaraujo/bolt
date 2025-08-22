// /src/ui/theme-provider/theme-provider-server.tsx
// Server-compatible theme provider that renders children without client context
// Provides theme structure for server-side rendering without requiring client JavaScript
// RELEVANT FILES: theme-provider.tsx, layout-server.tsx, server-theme.ts

import { type FC, type ReactElement, type ReactNode } from 'react';

import { type ThemeVariant } from '@/tokens/themes';

/**
 * Server-side theme provider props interface
 */
interface ThemeProviderServerProps {
  /** Child components to render with theme structure */
  children: ReactNode;
  /** Server-detected theme (for styling only, no state management) */
  defaultTheme?: ThemeVariant;
  /** Storage key for theme preference (used in hydration) */
  storageKey?: string;
  /** Whether to disable transitions during theme changes */
  disableTransitions?: boolean;
  /** Whether to follow system theme (server can't detect, but useful for hydration) */
  followSystemTheme?: boolean;
}

/**
 * Server-compatible theme provider component
 *
 * This component provides the structure for themes in server components
 * without any client-side state management or JavaScript requirements.
 *
 * Features:
 * - Server-side rendering compatible
 * - No JavaScript requirements
 * - Provides theme structure for CSS-only styling
 * - Compatible with progressive enhancement
 *
 * The actual theme management will be handled by:
 * 1. CSS variables set by ThemeScript in document head
 * 2. Client-side ThemeProvider for interactive theme switching
 * 3. Server-side theme detection for initial render
 */
export const ThemeProviderServer: FC<ThemeProviderServerProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'theme-preference',
  disableTransitions = false,
  followSystemTheme = false,
}): ReactElement => {
  // Server component simply renders children with theme data attributes
  // The actual theme styling is handled by CSS variables from ThemeScript
  // and theme classes applied at the document level

  return (
    <div
      data-theme-provider="server"
      data-default-theme={defaultTheme}
      data-storage-key={storageKey}
      data-disable-transitions={disableTransitions}
      data-follow-system-theme={followSystemTheme}
      style={{
        // Ensure full height inheritance for layout
        minHeight: 'inherit',
        height: 'inherit',
      }}
    >
      {children}
    </div>
  );
};

/**
 * Type alias for consistency with client ThemeProvider
 */
export type { ThemeProviderServerProps as ThemeProviderProps };