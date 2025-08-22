// /src/ui/layout/center/center.css.ts
// Styles for Center layout component using vanilla-extract
// Provides flexbox-based centering utilities with design system integration
// RELEVANT FILES: center.tsx, types.ts, ../../../tokens/contracts.css

import { style } from '@vanilla-extract/css';

/**
 * Base center class
 * Uses flexbox to center content both horizontally and vertically
 *
 * CSS Properties:
 * - display: flex - Creates flex container
 * - align-items: center - Centers content vertically
 * - justify-content: center - Centers content horizontally
 */
export const center = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Styles object for export
 * Provides named access to all center styles
 */
export const styles = {
  center,
} as const;
