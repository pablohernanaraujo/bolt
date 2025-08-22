// /src/ui/typography/body1/body1.css.ts
// Styles for Body1 text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: body1.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { body } from '@/tokens/typography.css';

/**
 * Base Body1 text styles
 * Uses predefined body.large token for consistent styling
 * Suitable for prominent body text and introductory paragraphs
 */
export const body1 = style([
  body.large,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
