// /src/ui/typography/caption/caption.css.ts
// Styles for Caption text component using vanilla-extract
// Uses design tokens for consistent typography across the design system
// RELEVANT FILES: caption.tsx, types.ts, ../../../tokens/typography.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';

/**
 * Base Caption text styles
 * Uses predefined specialized.caption token for consistent styling
 * Suitable for photo captions, footnotes, disclaimers, and very small text
 */
export const caption = style([
  specialized.caption,
  {
    // Reset default margins for consistent spacing control
    margin: 0,

    // Use design system color tokens for theming support
    color: colors.foreground.tertiary,

    // Default font family from design tokens
    fontFamily: tokens.fonts.body,
  },
]);
