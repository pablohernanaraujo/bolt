// /src/ui/typography/h3/h3.css.ts
// Styles for H3 heading component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: h3.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { heading } from '@/tokens/typography.css';

/**
 * Base H3 heading styles
 * Uses predefined heading.h3 token for consistent styling
 * Includes semantic color and spacing
 */
export const h3 = style([
  heading.h3,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.heading,
  },
]);
