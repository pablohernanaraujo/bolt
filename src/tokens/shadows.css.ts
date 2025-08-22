// /src/tokens/shadows.css.ts
// Shadow utility classes and elevation styles
// Provides consistent elevation and depth throughout the design system
// RELEVANT FILES: contracts.css.ts, themes/light.css.ts, themes/dark.css.ts

import { style } from '@vanilla-extract/css';

import { shadows } from './contracts.css';

/**
 * Elevation levels using theme contract shadows
 * These will adapt based on the current theme
 */
export const elevation = {
  small: style({
    boxShadow: shadows.small,
  }),
  medium: style({
    boxShadow: shadows.medium,
  }),
  large: style({
    boxShadow: shadows.large,
  }),
  focus: style({
    boxShadow: shadows.focus,
  }),
};
