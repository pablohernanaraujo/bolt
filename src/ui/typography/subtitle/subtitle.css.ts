// /src/ui/typography/subtitle/subtitle.css.ts
// Styles for Subtitle text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: subtitle.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';

/**
 * Base Subtitle text styles
 * Uses predefined specialized.subtitle token for consistent styling
 * Suitable for secondary headings, descriptions, and supporting text
 */
export const subtitle = style([
  specialized.subtitle,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.secondary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
