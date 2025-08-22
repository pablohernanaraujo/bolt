// /src/ui/code/code.css.ts
// Styles for Code component using vanilla-extract
// Provides monospace typography with theme-aware styling
// RELEVANT FILES: code.tsx, types.ts, contracts.css.ts, tokens.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base code styling with monospace font and theme support
 * Inline display for use within text content
 */
export const code = style({
  // Typography
  fontFamily: tokens.fonts.mono,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,

  // Colors with theme support
  color: colors.foreground.primary,
  backgroundColor: colors.background.tertiary,

  // Layout and spacing
  display: 'inline',
  padding: `${tokens.space[1]} ${tokens.space[2]}`,
  borderRadius: tokens.radius.sm,

  // Prevent text selection for better UX
  userSelect: 'text',

  // Ensure proper line height
  lineHeight: tokens.lineHeight.normal,

  // Border for subtle definition
  border: `1px solid ${colors.border.secondary}`,

  // Ensure text wraps properly
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
});
