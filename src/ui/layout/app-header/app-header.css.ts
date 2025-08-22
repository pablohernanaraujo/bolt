// /src/ui/layout/app-header/app-header.css.ts
// Styles for application header component
// Provides consistent header styling with theme support
// RELEVANT FILES: app-header.tsx, contracts.css.ts, tokens.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Header container with theme-aware background
 */
export const appHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: colors.background.primary,
  borderBottom: `1px solid ${colors.border.primary}`,
  position: 'sticky',
  top: 0,
  zIndex: tokens.zIndex.sticky,
});
