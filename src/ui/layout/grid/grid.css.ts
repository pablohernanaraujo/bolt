// /src/ui/layout/grid/grid.css.ts
// Vanilla-extract styles for Grid component
// Provides base CSS Grid layout styles following design system patterns
// RELEVANT FILES: grid.tsx, helpers.ts, types.ts

import { style } from '@vanilla-extract/css';

/**
 * Base Grid component styles
 * Establishes CSS Grid container with sensible defaults
 *
 * Key features:
 * - CSS Grid display
 * - Box-sizing border-box for predictable sizing
 * - Min-width 0 to prevent grid items from overflowing
 */
export const grid = style({
  // Core CSS Grid properties
  display: 'grid',

  // Ensure predictable box sizing
  boxSizing: 'border-box',

  // Prevent grid items from overflowing their container
  minWidth: 0,

  // Reset default margin and padding
  margin: 0,
  padding: 0,
});
