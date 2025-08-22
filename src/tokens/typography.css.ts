// /src/tokens/typography.css.ts
// Typography utility classes and text styles
// Provides consistent text styling throughout the design system
// RELEVANT FILES: tokens.css.ts, index.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { type KeyEmphasis } from './emphasis.css';
import { tokens } from './tokens.css';

/**
 * Text size variants
 * Usage: className={textSize.lg}
 */
export const textSize = styleVariants(tokens.fontSize, (size) => ({
  fontSize: size,
}));

/**
 * Font weight variants
 * Usage: className={fontWeight.semibold}
 */
export const fontWeight = styleVariants(tokens.fontWeight, (weight) => ({
  fontWeight: weight,
}));

/**
 * Line height variants
 * Usage: className={lineHeight.relaxed}
 */
export const lineHeight = styleVariants(tokens.lineHeight, (height) => ({
  lineHeight: height,
}));

/**
 * Letter spacing variants
 * Usage: className={letterSpacing.wide}
 */
export const letterSpacing = styleVariants(tokens.letterSpacing, (spacing) => ({
  letterSpacing: spacing,
}));

/**
 * Text emphasis variants
 * Controls text opacity for visual hierarchy
 * Usage: className={textEmphasis.high}
 */
export const textEmphasis = styleVariants(tokens.emphasis, (emphasis) => ({
  opacity: emphasis,
}));

/**
 * Pre-composed heading styles
 * Combines size, weight, and line height for consistency
 */
export const heading = {
  h1: style({
    fontSize: tokens.fontSize['4xl'],
    fontWeight: tokens.fontWeight.bold,
    lineHeight: tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  }),
  h2: style({
    fontSize: tokens.fontSize['3xl'],
    fontWeight: tokens.fontWeight.semibold,
    lineHeight: tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tight,
  }),
  h3: style({
    fontSize: tokens.fontSize['2xl'],
    fontWeight: tokens.fontWeight.semibold,
    lineHeight: tokens.lineHeight.normal,
  }),
  h4: style({
    fontSize: tokens.fontSize.xl,
    fontWeight: tokens.fontWeight.semibold,
    lineHeight: tokens.lineHeight.normal,
  }),
  h5: style({
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
  }),
  h6: style({
    fontSize: tokens.fontSize.base,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
  }),
};

/**
 * Body text styles
 */
export const body = {
  large: style({
    fontSize: tokens.fontSize.lg,
    lineHeight: tokens.lineHeight.relaxed,
  }),
  base: style({
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.normal,
  }),
  small: style({
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.normal,
  }),
  tiny: style({
    fontSize: tokens.fontSize.xs,
    lineHeight: tokens.lineHeight.normal,
  }),
};

/**
 * Specialized text styles for specific use cases
 */
export const specialized = {
  subtitle: style({
    fontSize: tokens.fontSize.subtitle,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
  }),
  overline: style({
    fontSize: tokens.fontSize.xxs,
    fontWeight: tokens.fontWeight.semibold,
    lineHeight: tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.wide,
    textTransform: 'uppercase',
  }),
  caption: style({
    fontSize: tokens.fontSize.caption,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
  }),
  giant: style({
    fontSize: tokens.fontSize.giant,
    fontWeight: tokens.fontWeight.bold,
    lineHeight: tokens.lineHeight.tight,
    letterSpacing: tokens.letterSpacing.tighter,
  }),
};
