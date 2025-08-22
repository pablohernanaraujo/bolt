// /src/ui/typography/overline/overline.css.ts
// Styles for Overline text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: overline.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';

/**
 * Base Overline text styles
 * Uses predefined specialized.overline token for consistent styling
 * Suitable for labels, categories, metadata, and small text elements
 */
export const overline = style([
  specialized.overline,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.tertiary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
