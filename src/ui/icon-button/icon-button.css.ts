// /src/ui/icon-button/icon-button.css.ts
// Styles for IconButton component using vanilla-extract
// Defines variants, sizes, and interaction states for icon-only buttons
// RELEVANT FILES: icon-button.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base icon button styles
 * Common styles shared by all icon button variants
 */
export const iconButton = style({
  // Reset and base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,

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

  // Square aspect ratio for icon buttons
  aspectRatio: '1',

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
 * Controls padding and dimensions for square icon buttons
 */
export const sizes = styleVariants({
  small: {
    width: tokens.space[8], // 32px
    height: tokens.space[8],
    padding: tokens.space[2],
    borderRadius: tokens.radius.base,
  },
  medium: {
    width: tokens.space[10], // 40px
    height: tokens.space[10],
    padding: tokens.space[3],
    borderRadius: tokens.radius.md,
  },
  large: {
    width: tokens.space[12], // 48px
    height: tokens.space[12],
    padding: tokens.space[4],
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Visual variants
 * Different icon button styles for different purposes
 * Reuses the same color scheme as regular buttons
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
