// /src/ui/layout/app-layout/app-layout.css.ts
// Styles for main application layout component
// Defines layout structure with theme-aware backgrounds
// RELEVANT FILES: app-layout.tsx, contracts.css.ts, tokens.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Main application layout container
 * Uses theme-aware background colors
 */
export const appLayout = style({
  minHeight: '100vh',
  backgroundColor: colors.background.primary,
  color: colors.foreground.primary,
  fontFamily: tokens.fonts.body,
});

/**
 * Main content area (right side of sidebar)
 */
export const appContent = style({
  backgroundColor: colors.background.primary,
  color: colors.foreground.primary,
});
