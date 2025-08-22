// /src/ui/theme-provider/theme-provider.tsx
// React context provider for theme management with SSR support
// Provides theme context to child components with server-client hydration sync
// RELEVANT FILES: ../theme-toggle/theme-toggle.tsx, ../../theme/index.ts, ../../theme/server-theme.ts

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactElement,
  type ReactNode,
} from 'react';

import { type ThemeVariant } from '@/tokens/themes';
import {
  getCurrentTheme,
  initTheme,
  setTheme,
  toggleTheme,
  watchSystemTheme,
} from '@/theme';

/**
 * Theme context value interface
 * Provides theme state and actions for consuming components
 */
interface ThemeContextValue {
  /** Current theme variant (light or dark) */
  theme: ThemeVariant;
  /** Function to set specific theme */
  setTheme: (theme: ThemeVariant) => void;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Whether the theme system is fully hydrated on client */
  isHydrated: boolean;
  /** Whether to follow system theme preference automatically */
  followSystemTheme: boolean;
  /** Function to toggle system theme following */
  setFollowSystemTheme: (follow: boolean) => void;
}

/**
 * Theme provider props interface
 */
interface ThemeProviderProps {
  /** Child components that will have access to theme context */
  children: ReactNode;
  /** Initial theme (overrides server-detected theme) */
  defaultTheme?: ThemeVariant;
  /** Whether to automatically follow system theme changes */
  followSystemTheme?: boolean;
  /** Storage key for theme preference (defaults to 'theme-preference') */
  storageKey?: string;
  /** Whether to disable transitions during theme changes */
  disableTransitions?: boolean;
}

/**
 * Theme context for accessing theme state and actions
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Custom hook to access theme context
 * Throws error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Theme provider component
 * Manages global theme state with SSR support and system preference detection
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  defaultTheme,
  followSystemTheme: initialFollowSystemTheme = false,
  storageKey = 'theme-preference',
  disableTransitions = false,
}): ReactElement => {
  // Initialize theme state - start with server-provided theme to prevent hydration mismatch
  const [theme, setThemeState] = useState<ThemeVariant>(
    defaultTheme || 'light',
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [followSystemTheme, setFollowSystemTheme] = useState(
    initialFollowSystemTheme,
  );

  // Handle theme changes with proper DOM updates and storage
  const handleSetTheme = (newTheme: ThemeVariant): void => {
    setThemeState(newTheme);
    setTheme(newTheme);

    // Optionally disable transitions during theme change to prevent flash
    if (disableTransitions && typeof document !== 'undefined') {
      const css = document.createElement('style');
      css.type = 'text/css';
      css.appendChild(
        document.createTextNode(
          `* { transition: none !important; animation: none !important; }`,
        ),
      );
      document.head.appendChild(css);

      // Re-enable transitions after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.head.removeChild(css);
        });
      });
    }

    // Save to localStorage with custom storage key
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(storageKey, newTheme);
      } catch (error) {
        console.warn('Failed to save theme preference:', error);
      }
    }
  };

  // Handle theme toggle
  const handleToggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    handleSetTheme(newTheme);
  };

  // Handle system theme following toggle
  const handleSetFollowSystemTheme = (follow: boolean): void => {
    setFollowSystemTheme(follow);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(
          `${storageKey}-follow-system`,
          follow.toString(),
        );
      } catch (error) {
        console.warn('Failed to save system theme preference:', error);
      }
    }

    // If enabling system theme following, immediately apply system theme
    if (follow) {
      const systemTheme = getCurrentTheme();
      handleSetTheme(systemTheme);
    }
  };

  // Client-side hydration and initialization
  useEffect(() => {
    // Initialize theme from localStorage and system preference
    const initializedTheme = initTheme();
    setThemeState(initializedTheme);

    // Check if user has system theme following preference
    try {
      const followSystemPreference = window.localStorage.getItem(
        `${storageKey}-follow-system`,
      );
      if (followSystemPreference === 'true') {
        setFollowSystemTheme(true);
      }
    } catch {
      // Ignore localStorage errors
    }

    setIsHydrated(true);
  }, [storageKey]);

  // Watch for system theme changes when following system theme
  useEffect(() => {
    if (!followSystemTheme) return;

    const cleanup = watchSystemTheme((systemTheme) => {
      handleSetTheme(systemTheme);
    });

    return cleanup;
  }, [followSystemTheme]);

  // Create context value
  const contextValue: ThemeContextValue = {
    theme,
    setTheme: handleSetTheme,
    toggleTheme: handleToggleTheme,
    isHydrated,
    followSystemTheme,
    setFollowSystemTheme: handleSetFollowSystemTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Optional hook for theme preference without throwing
 * Returns undefined if used outside ThemeProvider
 */
export function useThemeOptional(): ThemeContextValue | undefined {
  return useContext(ThemeContext);
}

/**
 * Hook to get only the current theme value
 * Useful when you only need the theme and not the setter functions
 */
export function useCurrentTheme(): ThemeVariant {
  const context = useTheme();
  return context.theme;
}

/**
 * Hook to check if theme system is hydrated
 * Useful for preventing hydration mismatches in SSR
 */
export function useThemeHydrated(): boolean {
  const context = useThemeOptional();
  return context?.isHydrated ?? false;
}