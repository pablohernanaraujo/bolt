// /src/tokens/tokens.css.ts
// Core design tokens as CSS variables
// These are static tokens that don't change between themes
// RELEVANT FILES: contracts.css.ts, spacing.css.ts, typography.css.ts

import { createGlobalTheme } from '@vanilla-extract/css';

import { Emphasis } from './emphasis.css';

/**
 * Root selector for global tokens
 * These tokens are available everywhere in the app
 */
export const tokens = createGlobalTheme(':root', {
  // Font families
  fonts: {
    body: 'var(--font-roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
    heading:
      'var(--font-roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif)',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  },

  // Font sizes using modular scale
  fontSize: {
    xxs: '0.625rem', // 10px - for overline text
    caption: '0.6875rem', // 11px - for caption text
    xs: '0.75rem', // 12px
    subtitle: '0.8125rem', // 13px - for subtitle text
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    giant: '4rem', // 64px - for giant display text
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },

  // Spacing scale
  space: {
    '0': '0',
    '1': '0.25rem', // 4px
    '2': '0.5rem', // 8px
    '3': '0.75rem', // 12px
    '4': '1rem', // 16px
    '5': '1.25rem', // 20px
    '6': '1.5rem', // 24px
    '8': '2rem', // 32px
    '10': '2.5rem', // 40px
    '12': '3rem', // 48px
    '16': '4rem', // 64px
    '20': '5rem', // 80px
    '24': '6rem', // 96px
  },

  // Border radius
  radius: {
    none: '0',
    sm: '0.125rem', // 2px
    base: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Z-index scale
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1100',
    modal: '1200',
    popover: '1300',
    tooltip: '1400',
    toast: '1500',
  },

  // Transitions
  transition: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // Text emphasis levels
  emphasis: {
    high: Emphasis.high.toString(),
    medium: Emphasis.medium.toString(),
    low: Emphasis.low.toString(),
    pure: Emphasis.pure.toString(),
  },
});
