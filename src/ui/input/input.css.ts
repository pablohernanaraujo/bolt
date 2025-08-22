// /src/ui/input/input.css.ts
// Styles for the Input component using vanilla-extract
// Provides variant styles, sizes, and states with design tokens
// RELEVANT FILES: input.tsx, types.ts, ../../tokens/index.ts

import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base input field styles
 * Common styles shared across all variants and sizes
 */
export const inputBase = style({
  // Reset and base styles
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,
  width: '100%',

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.normal,
  color: colors.foreground.primary,

  // Transitions
  transition: tokens.transition.fast,

  // Placeholder styles
  selectors: {
    '&::placeholder': {
      color: colors.foreground.secondary,
      opacity: 1,
    },
    '&::-webkit-input-placeholder': {
      color: colors.foreground.secondary,
    },
    '&::-moz-placeholder': {
      color: colors.foreground.secondary,
      opacity: 1,
    },
    '&:-ms-input-placeholder': {
      color: colors.foreground.secondary,
    },
  },
});

/**
 * Input container styles based on variant
 */
export const inputVariants = styleVariants({
  outline: {
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.primary}`,

    selectors: {
      '&:hover': {
        borderColor: colors.border.secondary,
      },
      '&:focus-within': {
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        borderColor: colors.border.secondary,
        cursor: 'not-allowed',
      },
      '&[data-invalid]': {
        borderColor: colors.semantic.error,
      },
      '&[data-invalid]:focus-within': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },

  filled: {
    backgroundColor: colors.background.secondary,
    border: `1px solid transparent`,

    selectors: {
      '&:hover': {
        backgroundColor: colors.background.tertiary,
      },
      '&:focus-within': {
        backgroundColor: colors.background.primary,
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        cursor: 'not-allowed',
      },
      '&[data-invalid]': {
        borderColor: colors.semantic.error,
        backgroundColor: colors.background.primary,
      },
      '&[data-invalid]:focus-within': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },
});

/**
 * Input size variants using logical properties for RTL support
 */
export const inputSizes = styleVariants({
  small: {
    height: tokens.space[8],
    paddingBlock: 0,
    paddingInline: tokens.space[3],
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },

  medium: {
    height: tokens.space[10],
    paddingBlock: 0,
    paddingInline: tokens.space[4],
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.md,
  },

  large: {
    height: tokens.space[12],
    paddingBlock: 0,
    paddingInline: tokens.space[5],
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Disabled input styles
 */
export const inputDisabled = style({
  selectors: {
    '&[data-disabled]': {
      color: colors.foreground.tertiary,
      cursor: 'not-allowed',
    },
    '&[data-disabled]::placeholder': {
      color: colors.foreground.tertiary,
    },
  },
});

/**
 * Input recipe combining all variants
 */
export const inputRecipe = recipe({
  base: [inputBase, inputDisabled],

  variants: {
    variant: inputVariants,
    size: inputSizes,
  },

  defaultVariants: {
    variant: 'outline',
    size: 'medium',
  },
});

/**
 * Wrapper for input with clear button
 */
export const inputWrapper = style({
  position: 'relative',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'stretch',
});

/**
 * Clear button styles
 */
export const clearButton = style({
  background: 'none',
  border: 'none',
  padding: tokens.space[1],
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.base,
  color: colors.foreground.secondary,
  transition: tokens.transition.fast,

  selectors: {
    '&:hover': {
      backgroundColor: colors.background.secondary,
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.brand.primary}`,
      outlineOffset: '2px',
    },
  },
});
