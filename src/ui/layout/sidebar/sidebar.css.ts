// /src/ui/layout/sidebar/sidebar.css.ts
// Styles for sidebar layout wrapper component
// Provides responsive behavior and consistent positioning
// RELEVANT FILES: sidebar.tsx, contracts.css.ts, tokens.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base sidebar container styles
 */
export const sidebar = style({
  width: '280px',
  backgroundColor: colors.background.secondary,
  borderRight: `1px solid ${colors.border.primary}`,
  padding: tokens.space[4],
  overflowY: 'auto',

  '@media': {
    '(max-width: 768px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: tokens.zIndex.modal,
      transform: 'translateX(0)',
      transition: 'transform 0.2s ease-in-out',
    },
  },
});

/**
 * Collapsed sidebar state for mobile
 */
export const sidebarCollapsed = style({
  '@media': {
    '(max-width: 768px)': {
      transform: 'translateX(-100%)',
    },
  },
});
