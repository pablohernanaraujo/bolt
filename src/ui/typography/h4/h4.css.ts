// /src/ui/typography/h4/h4.css.ts
// Styles for H4 heading component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: h4.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { heading } from '@/tokens/typography.css';

/**
 * Base H4 heading styles
 * Uses predefined heading.h4 token for consistent styling
 * Includes semantic color and spacing
 */
export const h4 = style([
  heading.h4,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.heading,
  },
]);
