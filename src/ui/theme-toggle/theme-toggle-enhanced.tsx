// /src/ui/theme-toggle/theme-toggle-enhanced.tsx
// Enhanced theme toggle that integrates with ThemeProvider context
// Provides better UX with loading states and system theme following option
// RELEVANT FILES: theme-toggle.tsx, ../theme-provider/theme-provider.tsx

'use client';

import { Moon, Sun, Monitor } from '@/icons';
import { type FC, type ReactElement } from 'react';

import {
  useTheme,
  useThemeHydrated,
  useThemeOptional,
} from '@/ui/theme-provider';
import { Button } from '@/ui/button';
import { IconButton } from '@/ui/icon-button';

import { type ThemeToggleProps } from './types';
import { buildThemeToggleClassName } from './helpers';

/**
 * Enhanced theme toggle props extending base props
 */
interface EnhancedThemeToggleProps extends Omit<ThemeToggleProps, 'initialTheme'> {
  /** Show system theme following option */
  showSystemOption?: boolean;
  /** Show loading state during hydration */
  showLoadingState?: boolean;
  /** Custom loading text */
  loadingText?: string;
}

/**
 * Enhanced theme toggle component with ThemeProvider integration
 * Provides advanced theme management with system preference following
 */
export const ThemeToggleEnhanced: FC<EnhancedThemeToggleProps> = ({
  variant = 'secondary',
  size = 'medium',
  showLabel = false,
  showSystemOption = false,
  showLoadingState = true,
  loadingText = 'Loading theme...',
  className,
  ...props
}): ReactElement => {
  // Use optional hook to handle cases where component is used outside provider
  const themeContext = useThemeOptional();
  const isHydrated = useThemeHydrated();

  // Fallback behavior when used outside ThemeProvider
  if (!themeContext) {
    return (
      <IconButton
        variant={variant}
        size={size}
        className={buildThemeToggleClassName({ variant, size, className })}
        aria-label="Theme toggle (not connected)"
        title="Theme toggle requires ThemeProvider"
        disabled
        {...props}
      >
        <Sun />
      </IconButton>
    );
  }

  const { theme, toggleTheme, followSystemTheme, setFollowSystemTheme } = themeContext;

  // Show loading state during hydration if enabled
  if (!isHydrated && showLoadingState) {
    return showLabel ? (
      <Button
        variant={variant}
        size={size}
        className={buildThemeToggleClassName({ variant, size, className })}
        disabled
        {...props}
      >
        <Sun />
        {loadingText}
      </Button>
    ) : (
      <IconButton
        variant={variant}
        size={size}
        className={buildThemeToggleClassName({ variant, size, className })}
        aria-label={loadingText}
        disabled
        {...props}
      >
        <Sun />
      </IconButton>
    );
  }

  // Get appropriate icon based on current state
  const getIcon = (): ReactElement => {
    if (followSystemTheme) {
      return <Monitor />;
    }
    return theme === 'dark' ? <Moon /> : <Sun />;
  };

  // Get appropriate label based on current state
  const getLabel = (): string => {
    if (followSystemTheme) {
      return 'Using system theme';
    }
    return theme === 'dark' ? 'Switch to light' : 'Switch to dark';
  };

  // Handle click with system theme support
  const handleClick = (): void => {
    if (showSystemOption && followSystemTheme) {
      // If following system and system option is available, disable following
      setFollowSystemTheme(false);
      toggleTheme();
    } else if (showSystemOption && theme === 'light') {
      // If on light theme with system option, enable system following
      setFollowSystemTheme(true);
    } else {
      // Normal toggle behavior
      toggleTheme();
    }
  };

  // Get accessible description
  const getAriaDescription = (): string => {
    if (showSystemOption) {
      if (followSystemTheme) {
        return 'Currently following system theme. Click to use light theme.';
      }
      if (theme === 'light') {
        return 'Currently using light theme. Click to follow system theme.';
      }
      return 'Currently using dark theme. Click to use light theme.';
    }
    return `Currently using ${theme} theme. Click to switch to ${theme === 'dark' ? 'light' : 'dark'} theme.`;
  };

  return showLabel ? (
    <Button
      variant={variant}
      size={size}
      className={buildThemeToggleClassName({ variant, size, className })}
      onClick={handleClick}
      aria-label={getLabel()}
      aria-describedby="theme-toggle-description"
      title={getAriaDescription()}
      {...props}
    >
      {getIcon()}
      {followSystemTheme ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
      <span id="theme-toggle-description" className="sr-only">
        {getAriaDescription()}
      </span>
    </Button>
  ) : (
    <IconButton
      variant={variant}
      size={size}
      className={buildThemeToggleClassName({ variant, size, className })}
      onClick={handleClick}
      aria-label={getLabel()}
      aria-describedby="theme-toggle-description"
      title={getAriaDescription()}
      {...props}
    >
      {getIcon()}
      <span id="theme-toggle-description" className="sr-only">
        {getAriaDescription()}
      </span>
    </IconButton>
  );
};

/**
 * Hook to get current theme state for custom implementations
 * Returns safe defaults when used outside ThemeProvider
 */
export function useThemeToggleState() {
  const themeContext = useThemeOptional();
  const isHydrated = useThemeHydrated();

  return {
    theme: themeContext?.theme ?? 'light',
    toggleTheme: themeContext?.toggleTheme ?? (() => {}),
    followSystemTheme: themeContext?.followSystemTheme ?? false,
    setFollowSystemTheme: themeContext?.setFollowSystemTheme ?? (() => {}),
    isHydrated,
    isConnected: !!themeContext,
  };
}