// /src/ui/theme-toggle/theme-toggle-server.tsx
// Server-compatible theme toggle with progressive enhancement
// Works without JavaScript using form submission and CSS-only styling
// RELEVANT FILES: theme-toggle.tsx, server-theme.ts, helpers.ts

import { type FC, type ReactElement } from 'react';
import { Settings } from 'lucide-react';

import { Icon } from '@/icons';
import { type ThemeVariant } from '@/tokens/themes';
import { Button } from '@/ui/button';

import { buildThemeToggleClassName } from './helpers';
import { type ThemeToggleProps } from './types';

interface ThemeToggleServerProps extends Omit<ThemeToggleProps, 'onClick'> {
  currentTheme: ThemeVariant;
}

/**
 * Server-side theme toggle component
 * Uses form submission for CSS-only theme switching
 *
 * Features:
 * - Works without JavaScript using form submission
 * - Progressive enhancement ready
 * - Server-side rendering compatible
 * - Accessible keyboard navigation
 */
export const ThemeToggleServer: FC<ThemeToggleServerProps> = ({
  currentTheme,
  showLabel = true,
  size = 'small',
  variant = 'secondary',
  className,
  ...props
}): ReactElement => {
  // Determine next theme for toggle action
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
    <form method="POST" action="/api/theme" style={{ display: 'inline' }}>
      <input type="hidden" name="theme" value={nextTheme} />
      <Button
        type="submit"
        variant={variant}
        size={size}
        className={themeToggleClassName}
        aria-label={`Switch to ${nextTheme} theme`}
        {...props}
      >
        <Icon icon={Settings} size="sm" />
        {buttonText}
      </Button>
    </form>
  );
};
