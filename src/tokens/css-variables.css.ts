// /src/tokens/css-variables.css.ts
// Static CSS variables at :root level to prevent FOUC
// Provides fallback theme values that work without JavaScript
// RELEVANT FILES: contracts.css.ts, themes/light.css.ts, themes/dark.css.ts, reset.css.ts

import { globalStyle } from '@vanilla-extract/css';

/**
 * Static CSS variables at :root level
 * These provide immediate fallbacks before theme classes are applied
 * Prevents FOUC by ensuring themed properties have values from the start
 */
globalStyle(':root', {
  // Light theme defaults at root level
  vars: {
    // Background colors
    '--colors-background-primary': '#ffffff',
    '--colors-background-secondary': '#f8f9fa',
    '--colors-background-tertiary': '#e9ecef',
    '--colors-background-inverse': '#283238',

    // Foreground/text colors
    '--colors-foreground-primary': '#283238',
    '--colors-foreground-secondary': '#495057',
    '--colors-foreground-tertiary': '#6c757d',
    '--colors-foreground-inverse': '#ffffff',

    // Brand colors
    '--colors-brand-primary': '#FF4628',
    '--colors-brand-primaryHover': '#E63E22',
    '--colors-brand-primaryActive': '#CC361E',
    '--colors-brand-secondary': '#6c47ff',
    '--colors-brand-secondaryHover': '#5835db',
    '--colors-brand-secondaryActive': '#4527b8',

    // Semantic colors
    '--colors-semantic-error': '#dc3545',
    '--colors-semantic-errorBackground': '#f8d7da',
    '--colors-semantic-warning': '#ffc107',
    '--colors-semantic-warningBackground': '#fff3cd',
    '--colors-semantic-success': '#28a745',
    '--colors-semantic-successBackground': '#d4edda',
    '--colors-semantic-info': '#17a2b8',
    '--colors-semantic-infoBackground': '#d1ecf1',

    // Border colors
    '--colors-border-primary': '#dee2e6',
    '--colors-border-secondary': '#e9ecef',
    '--colors-border-focus': '#FF4628',

    // Toast colors
    '--colors-toast-background': '#ffffff',
    '--colors-toast-border': '#dee2e6',
    '--colors-toast-shadow': 'rgb(0 0 0 / 0.1)',
    '--colors-toast-successBackground': '#d4edda',
    '--colors-toast-successBorder': '#c3e6cb',
    '--colors-toast-successIcon': '#28a745',
    '--colors-toast-errorBackground': '#f8d7da',
    '--colors-toast-errorBorder': '#f5c6cb',
    '--colors-toast-errorIcon': '#dc3545',
    '--colors-toast-warningBackground': '#fff3cd',
    '--colors-toast-warningBorder': '#ffeaa7',
    '--colors-toast-warningIcon': '#ffc107',
    '--colors-toast-infoBackground': '#d1ecf1',
    '--colors-toast-infoBorder': '#bee5eb',
    '--colors-toast-infoIcon': '#17a2b8',

    // Shadows
    '--shadows-small': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '--shadows-medium':
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '--shadows-large':
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '--shadows-focus': '0 0 0 3px rgb(255 70 40 / 0.15)',
    '--shadows-toast':
      '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
  },
});

/**
 * Dark theme overrides using [data-theme="dark"]
 * These override the root variables when dark theme is active
 * CSS-only approach ensures no JavaScript flash
 */
globalStyle('[data-theme="dark"]', {
  vars: {
    // Background colors
    '--colors-background-primary': '#1a1b1e',
    '--colors-background-secondary': '#25262b',
    '--colors-background-tertiary': '#2c2e33',
    '--colors-background-inverse': '#f8f9fa',

    // Foreground/text colors
    '--colors-foreground-primary': '#ffffff',
    '--colors-foreground-secondary': '#c1c2c5',
    '--colors-foreground-tertiary': '#909296',
    '--colors-foreground-inverse': '#1a1b1e',

    // Brand colors
    '--colors-brand-primary': '#FF6B4F',
    '--colors-brand-primaryHover': '#FF4628',
    '--colors-brand-primaryActive': '#E63E22',
    '--colors-brand-secondary': '#9775fa',
    '--colors-brand-secondaryHover': '#845ef7',
    '--colors-brand-secondaryActive': '#7048e8',

    // Semantic colors
    '--colors-semantic-error': '#fa5252',
    '--colors-semantic-errorBackground': '#2e1a1a',
    '--colors-semantic-warning': '#fab005',
    '--colors-semantic-warningBackground': '#2e2a1a',
    '--colors-semantic-success': '#51cf66',
    '--colors-semantic-successBackground': '#1a2e1e',
    '--colors-semantic-info': '#22b8cf',
    '--colors-semantic-infoBackground': '#1a2a2e',

    // Border colors
    '--colors-border-primary': '#373a40',
    '--colors-border-secondary': '#2c2e33',
    '--colors-border-focus': '#FF6B4F',

    // Toast colors
    '--colors-toast-background': '#25262b',
    '--colors-toast-border': '#373a40',
    '--colors-toast-shadow': 'rgb(0 0 0 / 0.5)',
    '--colors-toast-successBackground': '#1a2e1e',
    '--colors-toast-successBorder': '#1e3a22',
    '--colors-toast-successIcon': '#51cf66',
    '--colors-toast-errorBackground': '#2e1a1a',
    '--colors-toast-errorBorder': '#3a1e1e',
    '--colors-toast-errorIcon': '#fa5252',
    '--colors-toast-warningBackground': '#2e2a1a',
    '--colors-toast-warningBorder': '#3a331e',
    '--colors-toast-warningIcon': '#fab005',
    '--colors-toast-infoBackground': '#1a2a2e',
    '--colors-toast-infoBorder': '#1e333a',
    '--colors-toast-infoIcon': '#22b8cf',

    // Shadows
    '--shadows-small': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    '--shadows-medium':
      '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    '--shadows-large':
      '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
    '--shadows-focus': '0 0 0 3px rgb(255 107 79 / 0.25)',
    '--shadows-toast':
      '0 10px 25px -5px rgb(0 0 0 / 0.5), 0 10px 10px -5px rgb(0 0 0 / 0.2)',
  },
});

/**
 * Smooth theme transitions
 * Respects user's motion preferences
 */
globalStyle(':root', {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition: 'background-color 250ms ease-in-out, color 250ms ease-in-out',
    },
  },
});

/**
 * Additional selectors for theme transition smoothness
 * Apply transitions to commonly themed properties
 */
globalStyle('*, *::before, *::after', {
  '@media': {
    '(prefers-reduced-motion: no-preference)': {
      transition:
        'background-color 250ms ease-in-out, border-color 250ms ease-in-out, color 250ms ease-in-out, box-shadow 250ms ease-in-out',
    },
  },
});
