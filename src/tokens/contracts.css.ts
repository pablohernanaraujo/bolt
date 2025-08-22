// /src/tokens/contracts.css.ts
// Theme contract definitions using vanilla-extract
// Defines the shape of theme variables that each theme must implement
// RELEVANT FILES: themes/light.css.ts, themes/dark.css.ts, tokens.css.ts

import { createThemeContract } from '@vanilla-extract/css';

/**
 * Theme contract for colors
 * Each theme must provide values for these color tokens
 */
export const colors = createThemeContract({
  // Background colors
  background: {
    primary: null,
    secondary: null,
    tertiary: null,
    inverse: null,
  },

  // Foreground/text colors
  foreground: {
    primary: null,
    secondary: null,
    tertiary: null,
    inverse: null,
  },

  // Brand colors
  brand: {
    primary: null,
    primaryHover: null,
    primaryActive: null,
    secondary: null,
    secondaryHover: null,
    secondaryActive: null,
  },

  // Semantic colors
  semantic: {
    error: null,
    errorBackground: null,
    warning: null,
    warningBackground: null,
    success: null,
    successBackground: null,
    info: null,
    infoBackground: null,
  },

  // Border colors
  border: {
    primary: null,
    secondary: null,
    focus: null,
  },

  // Toast-specific colors
  toast: {
    background: null,
    border: null,
    shadow: null,
    // Success variant
    successBackground: null,
    successBorder: null,
    successIcon: null,
    // Error variant
    errorBackground: null,
    errorBorder: null,
    errorIcon: null,
    // Warning variant
    warningBackground: null,
    warningBorder: null,
    warningIcon: null,
    // Info variant
    infoBackground: null,
    infoBorder: null,
    infoIcon: null,
  },
});

/**
 * Theme contract for shadows
 * Dynamic shadows that can change per theme
 */
export const shadows = createThemeContract({
  small: null,
  medium: null,
  large: null,
  focus: null,
  toast: null,
});
