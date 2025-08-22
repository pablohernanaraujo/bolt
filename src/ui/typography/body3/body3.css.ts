// /src/ui/typography/body3/body3.css.ts
// Styles for Body3 text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: body3.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { body } from '@/tokens/typography.css';

/**
 * Base Body3 text styles
 * Uses predefined body.small token for consistent styling
 * Suitable for captions, labels, and secondary text
 */
export const body3 = style([
  body.small,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
