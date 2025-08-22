// /src/theme/index.ts
// Theme helper utilities for zero-JS theme switching
// Provides functions to manage data-theme and data-brand attributes
// RELEVANT FILES: ../tokens/themes

import type { ThemeVariant } from '@/tokens/themes';

/**
 * Get the current theme from an element or document
 * Falls back to system preference if no theme is set
 */
export function getCurrentTheme(
  element: HTMLElement = document.documentElement,
): ThemeVariant {
  const dataTheme = element.getAttribute('data-theme') as ThemeVariant | null;

  if (dataTheme) {
    return dataTheme;
  }

  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }

  return 'light';
}

/**
 * Set theme on an element using data attribute
 * This enables CSS-only theme switching
 */
export function setTheme(
  theme: ThemeVariant,
  element: HTMLElement = document.documentElement,
): void {
  element.setAttribute('data-theme', theme);

  // Store preference in localStorage for persistence
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem('theme-preference', theme);
    } catch (e) {
      // Handle quota exceeded or security errors
      console.warn('Failed to save theme preference:', e);
    }
  }
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(
  element: HTMLElement = document.documentElement,
): ThemeVariant {
  const current = getCurrentTheme(element);
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next, element);
  return next;
}

/**
 * Initialize theme from localStorage or system preference
 * Should be called early in the app lifecycle
 */
export function initTheme(
  element: HTMLElement = document.documentElement,
): ThemeVariant {
  if (typeof window === 'undefined') {
    return 'light';
  }

  // Check localStorage first
  try {
    const stored = window.localStorage.getItem(
      'theme-preference',
    ) as ThemeVariant | null;
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored, element);
      return stored;
    }
  } catch {
    // Ignore localStorage errors
  }

  // Fall back to system preference
  const systemTheme = getCurrentTheme(element);
  setTheme(systemTheme, element);
  return systemTheme;
}

/**
 * Watch for system theme changes
 * Returns cleanup function to stop watching
 */
export function watchSystemTheme(
  callback: (theme: ThemeVariant) => void,
): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent): void => {
    callback(e.matches ? 'dark' : 'light');
  };

  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }

  // Legacy browsers
  mediaQuery.addListener(handler);
  return () => mediaQuery.removeListener(handler);
}

/**
 * Script to inject in <head> for flash-free theme loading
 * Prevents flash of wrong theme on page load
 */
export function getThemeScript(): string {
  return `(function(){try{var t=localStorage.getItem('theme-preference');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}})();`;
}

/**
 * Brand variant support for multi-brand theming
 */
export type BrandVariant = string;

export function setBrand(
  brand: BrandVariant,
  element: HTMLElement = document.documentElement,
): void {
  element.setAttribute('data-brand', brand);
}

export function getBrand(
  element: HTMLElement = document.documentElement,
): BrandVariant | null {
  return element.getAttribute('data-brand');
}
