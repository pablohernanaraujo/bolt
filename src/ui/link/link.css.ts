// /src/ui/link/link.css.ts
// Vanilla Extract styles for Link component with design tokens
// Provides accessible link styling with variants, states and typography integration
// RELEVANT FILES: types.ts, link.tsx, ../../tokens/contracts.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base link styles
 * Provides foundation styling for all link variants
 */
export const linkBase = style({
  // Typography and layout
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space[1],
  fontFamily: 'inherit',
  lineHeight: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'left',

  // Reset default styles
  textDecoration: 'none',
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',

  // Accessibility and interaction
  outline: 'none',
  borderRadius: tokens.radius.sm,
  transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',

  // Focus styles for accessibility
  ':focus-visible': {
    outline: `2px solid ${colors.border.focus}`,
    outlineOffset: '2px',
  },

  // Word wrapping for long links
  wordBreak: 'break-word',
  hyphens: 'auto',

  // Ensure proper line height for inline links
  verticalAlign: 'baseline',
});

/**
 * Link variant styles
 * Different visual treatments for various link types
 */
export const linkVariants = styleVariants({
  primary: {
    color: colors.brand.primary,

    ':hover': {
      color: colors.brand.primaryHover,
    },

    ':active': {
      color: colors.brand.primaryActive,
    },

    ':visited': {
      color: colors.brand.primary,
    },
  },

  secondary: {
    color: colors.foreground.secondary,

    ':hover': {
      color: colors.foreground.primary,
    },

    ':active': {
      color: colors.brand.primary,
    },

    ':visited': {
      color: colors.foreground.secondary,
    },
  },

  external: {
    color: colors.brand.primary,

    ':hover': {
      color: colors.brand.primaryHover,
    },

    ':active': {
      color: colors.brand.primaryActive,
    },

    ':visited': {
      color: colors.brand.primary,
    },
  },

  disabled: {
    color: colors.foreground.tertiary,
    cursor: 'not-allowed',
    pointerEvents: 'none',
    opacity: 0.6,

    ':hover': {
      color: colors.foreground.tertiary,
    },

    ':active': {
      color: colors.foreground.tertiary,
    },
  },
});

/**
 * Underline variant styles
 * Controls when and how underlines are displayed
 */
export const underlineVariants = styleVariants({
  none: {
    textDecoration: 'none',

    ':hover': {
      textDecoration: 'none',
    },
  },

  hover: {
    textDecoration: 'none',

    ':hover': {
      textDecoration: 'underline',
      textDecorationThickness: '1px',
      textUnderlineOffset: '2px',
    },

    ':focus-visible': {
      textDecoration: 'underline',
      textDecorationThickness: '1px',
      textUnderlineOffset: '2px',
    },
  },

  always: {
    textDecoration: 'underline',
    textDecorationThickness: '1px',
    textUnderlineOffset: '2px',

    ':hover': {
      textDecorationThickness: '2px',
    },
  },
});

/**
 * Typography size styles
 * Links inherit typography sizes from the design system
 */
export const sizeVariants = styleVariants({
  caption: {
    fontSize: tokens.fontSize.caption,
    lineHeight: tokens.lineHeight.normal,
  },

  body3: {
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.normal,
  },

  body2: {
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.normal,
  },

  body1: {
    fontSize: tokens.fontSize.lg,
    lineHeight: tokens.lineHeight.relaxed,
  },

  h5: {
    fontSize: tokens.fontSize.lg,
    lineHeight: tokens.lineHeight.normal,
    fontWeight: tokens.fontWeight.medium,
  },

  h4: {
    fontSize: tokens.fontSize.xl,
    lineHeight: tokens.lineHeight.normal,
    fontWeight: tokens.fontWeight.semibold,
  },

  h3: {
    fontSize: tokens.fontSize['2xl'],
    lineHeight: tokens.lineHeight.normal,
    fontWeight: tokens.fontWeight.semibold,
  },

  h2: {
    fontSize: tokens.fontSize['3xl'],
    lineHeight: tokens.lineHeight.tight,
    fontWeight: tokens.fontWeight.semibold,
  },

  h1: {
    fontSize: tokens.fontSize['4xl'],
    lineHeight: tokens.lineHeight.tight,
    fontWeight: tokens.fontWeight.bold,
  },
});

/**
 * Icon styles
 * Styling for icons within links
 */
export const linkIcon = style({
  flexShrink: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * External link icon styles
 * Special styling for external link indicators
 */
export const externalIcon = style({
  opacity: 0.7,
  transition: 'opacity 150ms ease',

  ':hover': {
    opacity: 1,
  },
});

/**
 * Text content wrapper
 * Wraps the link text content
 */
export const linkText = style({
  display: 'inline',
});

/**
 * Icon position variants
 * Controls the positioning of icons relative to text
 */
export const iconPositionVariants = styleVariants({
  left: {
    flexDirection: 'row',
  },

  right: {
    flexDirection: 'row',
  },
});
