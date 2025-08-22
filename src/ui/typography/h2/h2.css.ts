// /src/ui/typography/h2/h2.css.ts
// Styles for H2 heading component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: h2.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { heading } from '@/tokens/typography.css';

/**
 * Base H2 heading styles
 * Uses predefined heading.h2 token for consistent styling
 * Includes semantic color and spacing
 */
export const h2 = style([
  heading.h2,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.heading,
  },
]);
