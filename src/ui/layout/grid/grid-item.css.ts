// /src/ui/layout/grid/grid-item.css.ts
// Vanilla-extract styles for GridItem component
// Provides base styles for grid items following design system patterns
// RELEVANT FILES: grid-item.tsx, helpers.ts, types.ts

import { style } from '@vanilla-extract/css';

/**
 * Base GridItem component styles
 * Establishes basic grid item styling with sensible defaults
 *
 * Key features:
 * - Box-sizing border-box for predictable sizing
 * - Min-width and min-height 0 to prevent overflow
 * - Default positioning allows CSS Grid to handle placement
 */
export const gridItem = style({
  // Ensure predictable box sizing
  boxSizing: 'border-box',

  // Prevent grid item from overflowing
  minWidth: 0,
  minHeight: 0,

  // Reset default margin and padding
  margin: 0,
  padding: 0,
});
