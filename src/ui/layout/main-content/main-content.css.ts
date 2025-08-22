// /src/ui/layout/main-content/main-content.css.ts
// Styles for main content area component
// Provides theme-aware background and consistent layout
// RELEVANT FILES: main-content.tsx, contracts.css.ts, tokens.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Main content area with theme support
 */
export const mainContent = style({
  flex: 1,
  padding: tokens.space[8],
  overflowY: 'auto',
  maxWidth: '1200px',
  width: '100%',
  backgroundColor: colors.background.primary,
  color: colors.foreground.primary,
});
