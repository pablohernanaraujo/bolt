// /src/ui/typography/giant/giant.css.ts
// Styles for Giant heading component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: giant.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';

/**
 * Base Giant heading styles
 * Uses predefined specialized.giant token for consistent styling
 * Suitable for hero titles, landing page headers, and prominent displays
 */
export const giant = style([
  specialized.giant,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.primary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.heading,
  },
]);
