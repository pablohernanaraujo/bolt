/* eslint-disable max-statements */
// /src/theme/server-theme.ts
// Server-side theme detection and utilities for SSR compatibility
// Provides theme detection from headers and cookies without client-side JavaScript
// RELEVANT FILES: layout.tsx, theme-toggle.tsx, themes/index.ts

import { cookies, headers } from 'next/headers';

import { type ThemeVariant } from '@/tokens/themes';

/**
 * Server-side theme detection with enhanced preference detection
 * Reads theme preference from multiple sources with proper fallbacks
 * Provides robust SSR compatibility and user preference respect
 *
 * NOTE: This function prevents static generation. Use getStaticTheme() for static pages.
 */
export async function getServerTheme(): Promise<ThemeVariant> {
  try {
    // First try to get theme from cookies (explicit user preference)
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme')?.value;

    if (themeCookie === 'dark' || themeCookie === 'light') {
      return themeCookie as ThemeVariant;
    }

    // Fallback to system preference from headers
    const headersList = await headers();

    // Check Sec-CH-Prefers-Color-Scheme header (Client Hints)
    const colorSchemeHint = headersList.get('sec-ch-prefers-color-scheme');
    if (colorSchemeHint === 'dark') {
      return 'dark';
    }

    // Check User-Agent for dark mode indicators (less reliable but useful)
    const userAgent = headersList.get('user-agent') || '';
    const acceptHeader = headersList.get('accept') || '';

    // Some browsers include color scheme preference in Accept header
    if (
      acceptHeader.includes('prefers-color-scheme: dark') ||
      userAgent.toLowerCase().includes('dark')
    ) {
      return 'dark';
    }

    // Check if it's nighttime and user hasn't set preference (heuristic)
    const timeOfDay = getTimeOfDay(headersList);
    if (timeOfDay === 'night') {
      return 'dark';
    }

    // Default to light theme
    return 'light';
  } catch (error) {
    // Fallback for any server-side errors
    console.warn(
      'Server theme detection failed, defaulting to light theme:',
      error,
    );
    return 'light';
  }
}

/**
 * Static-compatible theme detection that defaults to light
 * Use this for static generation (documentation, design system demos)
 * Theme will be corrected on client-side hydration
 */
export function getStaticTheme(): ThemeVariant {
  return 'light';
}

/**
 * Get time of day based on timezone hint from headers
 * Used as heuristic for theme preference when no explicit preference is set
 */
function getTimeOfDay(headersList: Headers): 'day' | 'night' {
  try {
    // Try to get timezone from headers
    const timezoneHint =
      headersList.get('x-timezone') ||
      headersList.get('cf-timezone') || // Cloudflare
      'UTC';

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: timezoneHint,
      hour12: false,
    });

    const hour = Number.parseInt(timeString.split(':')[0], 10);

    // Consider 18:00-06:00 as night time
    return hour >= 18 || hour < 6 ? 'night' : 'day';
  } catch {
    // Fallback to day if timezone detection fails
    return 'day';
  }
}

/**
 * Theme class name resolver for server-side rendering
 * Maps theme variant to appropriate CSS class
 */
export function getThemeClassName(theme: ThemeVariant): string {
  // Import theme classes dynamically to avoid circular dependencies
  const { lightTheme, darkTheme } = require('@/tokens/themes');
  return theme === 'dark' ? darkTheme : lightTheme;
}

/**
 * Generate theme data attributes for HTML element
 * Used in root layout for consistent theme application
 */
export function getThemeDataAttributes(
  theme: ThemeVariant,
): Record<string, string> {
  return {
    'data-theme': theme,
  };
}
