// /src/ui/typography/body2/body2.css.ts
// Styles for Body2 text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: body2.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { body } from '@/tokens/typography.css';

/**
 * Base Body2 text styles
 * Uses predefined body.base token for consistent styling
 * Standard body text size for most content
 */
export const body2 = style([
  body.base,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
