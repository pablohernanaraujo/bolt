// /src/tokens/radius.css.ts
// Border radius utility classes
// Provides consistent rounded corners throughout the design system
// RELEVANT FILES: tokens.css.ts, index.ts

import { styleVariants } from '@vanilla-extract/css';

import { tokens } from './tokens.css';

/**
 * Border radius variants for all corners
 * Usage: className={radius.lg}
 */
export const radius = styleVariants(tokens.radius, (radius) => ({
  borderRadius: radius,
}));

/**
 * Border radius variants for specific corners
 */
export const radiusTop = styleVariants(tokens.radius, (radius) => ({
  borderTopLeftRadius: radius,
  borderTopRightRadius: radius,
}));

export const radiusBottom = styleVariants(tokens.radius, (radius) => ({
  borderBottomLeftRadius: radius,
  borderBottomRightRadius: radius,
}));

export const radiusLeft = styleVariants(tokens.radius, (radius) => ({
  borderTopLeftRadius: radius,
  borderBottomLeftRadius: radius,
}));

export const radiusRight = styleVariants(tokens.radius, (radius) => ({
  borderTopRightRadius: radius,
  borderBottomRightRadius: radius,
}));
