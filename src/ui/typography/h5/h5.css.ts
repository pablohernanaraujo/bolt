// /src/ui/typography/h5/h5.css.ts
// Styles for H5 heading component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: h5.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { heading } from '@/tokens/typography.css';

/**
 * Base H5 heading styles
 * Uses predefined heading.h5 token for consistent styling
 * Includes semantic color and spacing
 */
export const h5 = style([
  heading.h5,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.heading,
  },
]);
