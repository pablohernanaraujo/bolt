// /src/ui/theme-toggle/theme-toggle.tsx
// Client-side theme toggle component with surgical interactivity
// Provides theme switching functionality while maintaining server-first architecture
// RELEVANT FILES: theme-toggle.css.ts, types.ts, server-theme.ts

'use client';

import { Settings } from 'lucide-react';
import { type FC, type ReactElement, useEffect, useState } from 'react';

import { Icon } from '@/icons';
import { type ThemeVariant } from '@/tokens/themes';
import { Button } from '@/ui/button';

import { buildThemeToggleClassName } from './helpers';
import { type ThemeToggleProps } from './types';

/**
 * Client-side theme toggle component
 * Uses surgical "use client" boundary for optimal server-first architecture
 *
 * Features:
 * - Minimal client-side JavaScript for theme switching
 * - Cookie-based persistence for server-side detection
 * - Hydration-safe with server theme detection
 * - No layout shift during theme changes
 */
export const ThemeToggle: FC<ThemeToggleProps> = ({
  initialTheme = 'light',
  showLabel = true,
  size = 'small',
  variant = 'secondary',
  className,
  ...props
}): ReactElement => {
  // Initialize with server-detected theme to prevent hydration mismatch
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(initialTheme);
  const [isClient, setIsClient] = useState(false);

  // Mark as client-side after hydration to prevent SSR/client mismatch
  useEffect(() => {
    setIsClient(true);

    // Sync with document theme attribute if different from initial
    const documentTheme = document.documentElement.getAttribute(
      'data-theme',
    ) as ThemeVariant;
    if (documentTheme && documentTheme !== initialTheme) {
      setCurrentTheme(documentTheme);
    }
  }, [initialTheme]);

  /**
   * Toggle theme and persist preference
   * Updates document attribute and saves to cookie for server-side detection
   */
  const toggleTheme = (): void => {
    // Get the current theme from document (most reliable source)
    const currentDocTheme =
      (document.documentElement.getAttribute('data-theme') as ThemeVariant) ||
      currentTheme;
    const newTheme: ThemeVariant =
      currentDocTheme === 'light' ? 'dark' : 'light';

    // Update state immediately for responsive UI
    setCurrentTheme(newTheme);

    // Update document theme attribute for CSS theme switching
    document.documentElement.setAttribute('data-theme', newTheme);

    // Update body class for vanilla-extract theme switching
    // Import theme classes dynamically to avoid circular dependencies
    const { lightTheme, darkTheme } = require('@/tokens/themes');
    const oldThemeClass = currentDocTheme === 'light' ? lightTheme : darkTheme;
    const newThemeClass = newTheme === 'light' ? lightTheme : darkTheme;

    // Remove old theme class if it exists
    if (document.body.classList.contains(oldThemeClass)) {
      document.body.classList.remove(oldThemeClass);
    }
    // Add new theme class
    document.body.classList.add(newThemeClass);

    // Persist theme preference in cookie for server-side detection
    document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Dispatch custom event for other components that might need to react
    window.dispatchEvent(
      new CustomEvent('themechange', {
        detail: { theme: newTheme },
      }),
    );
  };

  // Determine button text based on current theme and show label preference
  const buttonText = showLabel
    ? currentTheme === 'light'
      ? 'Tema Oscuro'
      : 'Tema Claro'
    : '';

  // Build className for the theme toggle button
  const themeToggleClassName = buildThemeToggleClassName(className);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={themeToggleClassName}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
      suppressHydrationWarning // Prevent hydration warnings for theme-dependent content
      {...props}
    >
      <Icon icon={Settings} size="sm" />
      {isClient && buttonText}
    </Button>
  );
};
