// /packages/ui/src/components/Button/Button.css.ts
// Styles for Button component using vanilla-extract
// Defines variants, sizes, and interaction states
// RELEVANT FILES: index.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base button styles
 * Common styles shared by all button variants
 */
export const button = style({
  // Reset and base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space[2],

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.normal,

  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  transition: tokens.transition.fast,

  // Focus styles handled by React Aria
  outline: 'none',

  // Disabled state
  selectors: {
    '&[disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

/**
 * Size variants
 * Controls padding and font size using logical properties for RTL support
 */
export const sizes = styleVariants({
  small: {
    paddingBlock: tokens.space[2],
    paddingInline: tokens.space[3],
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },
  medium: {
    paddingBlock: tokens.space[3],
    paddingInline: tokens.space[4],
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.md,
  },
  large: {
    paddingBlock: tokens.space[4],
    paddingInline: tokens.space[6],
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Visual variants
 * Different button styles for different purposes
 */
export const variants = styleVariants({
  primary: {
    backgroundColor: colors.brand.primary,
    color: colors.foreground.inverse,
    border: '1px solid transparent',

    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: colors.brand.primaryHover,
      },
      '&:active:not([disabled])': {
        backgroundColor: colors.brand.primaryActive,
      },
      '&[data-focused]': {
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
    },
  },

  secondary: {
    backgroundColor: 'transparent',
    color: colors.brand.primary,
    border: `1px solid ${colors.border.primary}`,

    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: colors.background.secondary,
      },
      '&:active:not([disabled])': {
        backgroundColor: colors.background.tertiary,
      },
      '&[data-focused]': {
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
    },
  },

  ghost: {
    backgroundColor: 'transparent',
    color: colors.foreground.primary,
    border: '1px solid transparent',

    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: colors.background.secondary,
      },
      '&:active:not([disabled])': {
        backgroundColor: colors.background.tertiary,
      },
      '&[data-focused]': {
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
    },
  },

  danger: {
    backgroundColor: colors.semantic.error,
    color: colors.foreground.inverse,
    border: '1px solid transparent',

    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: colors.semantic.error,
        opacity: 0.9,
      },
      '&:active:not([disabled])': {
        backgroundColor: colors.semantic.error,
        opacity: 0.8,
      },
      '&[data-focused]': {
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },
});

/**
 * Full width modifier
 */
export const fullWidth = style({
  width: '100%',
});
