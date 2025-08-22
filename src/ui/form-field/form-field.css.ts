// /src/ui/form-field/form-field.css.ts
// Styles for the FormField component using vanilla-extract
// Provides layout and spacing for form field elements
// RELEVANT FILES: form-field.tsx, types.ts, ../../tokens/index.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Form field container styles
 * Provides spacing and layout for the complete form field
 */
export const formField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space[2],
  width: '100%',
});

/**
 * Label styles with required indicator support
 */
export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[1],

  // Typography
  fontFamily: tokens.fonts.body,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.tight,
  color: colors.foreground.primary,

  // Cursor interaction
  cursor: 'pointer',

  selectors: {
    '&[data-disabled]': {
      color: colors.foreground.tertiary,
      cursor: 'not-allowed',
    },
  },
});

/**
 * Required indicator styles
 */
export const requiredIndicator = style({
  color: colors.semantic.error,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: '1',
});

/**
 * Help text styles for hint and error messages
 */
export const helpText = style({
  fontSize: tokens.fontSize.xs,
  lineHeight: tokens.lineHeight.tight,
  fontFamily: tokens.fonts.body,
  margin: 0,
});

/**
 * Hint text styles
 */
export const hint = style([
  helpText,
  {
    color: colors.foreground.secondary,
  },
]);

/**
 * Error text styles
 */
export const error = style([
  helpText,
  {
    color: colors.semantic.error,
    fontWeight: tokens.fontWeight.medium,
  },
]);
