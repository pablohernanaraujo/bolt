/* eslint-disable max-statements */
// /src/ui/theme-toggle/theme-toggle-progressive.tsx
// Progressive enhancement theme toggle
// Starts with CSS-only form submission, enhances with JavaScript
// RELEVANT FILES: theme-toggle-server.tsx, theme-toggle.tsx, types.ts

'use client';

import { Settings } from 'lucide-react';
import { type FC, type ReactElement, useEffect, useRef, useState } from 'react';

import { Icon } from '@/icons';
import { type ThemeVariant } from '@/tokens/themes';
import { Button } from '@/ui/button';

import { buildThemeToggleClassName } from './helpers';
import { type ThemeToggleProps } from './types';

interface ThemeToggleProgressiveProps
  extends Omit<ThemeToggleProps, 'onClick'> {
  initialTheme: ThemeVariant;
}

/**
 * Progressive enhancement theme toggle component
 *
 * Progressive Enhancement Strategy:
 * 1. Server renders a form with POST action - works without JS
 * 2. Client-side JS intercepts form submission for instant feedback
 * 3. Falls back to form submission if JS fails or is disabled
 *
 * Benefits:
 * - Works without JavaScript (accessibility)
 * - Enhanced UX with JavaScript enabled
 * - No hydration mismatches
 * - Resilient to JavaScript errors
 */
export const ThemeToggleProgressive: FC<ThemeToggleProgressiveProps> = ({
  initialTheme,
  showLabel = true,
  size = 'small',
  variant = 'secondary',
  className,
  ...props
}): ReactElement => {
  const [currentTheme, setCurrentTheme] = useState<ThemeVariant>(initialTheme);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Progressive enhancement: intercept form submission with JavaScript
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = (event: SubmitEvent): void => {
      // Prevent default form submission
      event.preventDefault();

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
      const { lightTheme, darkTheme } = require('@/tokens/themes');
      const oldThemeClass =
        currentDocTheme === 'light' ? lightTheme : darkTheme;
      const newThemeClass = newTheme === 'light' ? lightTheme : darkTheme;

      // Remove old theme class if it exists
      if (document.body.classList.contains(oldThemeClass)) {
        document.body.classList.remove(oldThemeClass);
      }
      // Add new theme class
      document.body.classList.add(newThemeClass);

      // Persist theme preference in cookie
      document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

      // Update hidden input for form consistency
      const hiddenInput = form.querySelector(
        'input[name="theme"]',
      ) as HTMLInputElement;
      if (hiddenInput) {
        const nextTheme = newTheme === 'light' ? 'dark' : 'light';
        hiddenInput.value = nextTheme;
      }

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent('themechange', {
          detail: { theme: newTheme },
        }),
      );
    };

    // Add event listener
    form.addEventListener('submit', handleSubmit);
    setIsEnhanced(true);

    // Cleanup
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [currentTheme]);

  // Sync with document theme on mount (hydration safety)
  useEffect(() => {
    const documentTheme = document.documentElement.getAttribute(
      'data-theme',
    ) as ThemeVariant;
    if (documentTheme && documentTheme !== initialTheme) {
      setCurrentTheme(documentTheme);
    }
  }, [initialTheme]);

  // Determine next theme for form action
  const nextTheme: ThemeVariant = currentTheme === 'light' ? 'dark' : 'light';

  // Button text based on current theme and label preference
  const buttonText = showLabel
    ? currentTheme === 'light'
      ? 'Tema Oscuro'
      : 'Tema Claro'
    : '';

  // Build className for the theme toggle button
  const themeToggleClassName = buildThemeToggleClassName(className);

  return (
    <form
      ref={formRef}
      method="POST"
      action="/api/theme"
      style={{ display: 'inline' }}
    >
      <input type="hidden" name="theme" value={nextTheme} />
      <Button
        type="submit"
        variant={variant}
        size={size}
        className={themeToggleClassName}
        aria-label={`Switch to ${nextTheme} theme`}
        data-enhanced={isEnhanced}
        {...props}
      >
        <Icon icon={Settings} size="sm" />
        {buttonText}
      </Button>
    </form>
  );
};
