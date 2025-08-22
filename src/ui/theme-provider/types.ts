// /src/ui/theme-provider/types.ts
// TypeScript type definitions for theme provider components
// Centralizes all theme provider related types and interfaces
// RELEVANT FILES: theme-provider.tsx, ../../tokens/themes/index.ts

import { type ReactNode } from 'react';

import { type ThemeVariant } from '@/tokens/themes';

/**
 * Theme context value interface
 * Provides theme state and actions for consuming components
 */
export interface ThemeContextValue {
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
export interface ThemeProviderProps {
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
 * Theme script injection props for preventing flash of wrong theme
 */
export interface ThemeScriptProps {
  /** Storage key to read theme preference from */
  storageKey?: string;
  /** Default theme if no preference is found */
  defaultTheme?: ThemeVariant;
  /** Whether to respect system theme preference */
  respectSystemTheme?: boolean;
}