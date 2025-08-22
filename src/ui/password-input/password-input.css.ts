// /src/ui/password-input/password-input.css.ts
// Styles for the PasswordInput component using vanilla-extract
// Extends input styles with container and toggle button styling
// RELEVANT FILES: password-input.tsx, ../input/input.css.ts, types.ts

import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Container wrapper for password input with toggle button
 * Positions toggle button relative to input field
 */
export const passwordInputContainer = style({
  position: 'relative',
  width: '100%',
  display: 'inline-flex',
  alignItems: 'stretch',
});

/**
 * Password input field base styles
 * Extends input styles with right padding for toggle button
 */
export const passwordInputBase = style({
  // Base input styling (inherits from input component)
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  margin: 0,
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
 * Input container styles based on variant
 * Extends input variant styles to include toggle button space
 */
export const passwordInputVariants = styleVariants({
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
 * Size variants for password input container
 * Includes padding adjustments for toggle button positioning
 */
export const passwordInputSizes = styleVariants({
  small: {
    height: tokens.space[8],
    paddingLeft: tokens.space[3],
    paddingRight: tokens.space[8], // Extra space for toggle button
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },

  medium: {
    height: tokens.space[10],
    paddingLeft: tokens.space[4],
    paddingRight: tokens.space[10], // Extra space for toggle button
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.md,
  },

  large: {
    height: tokens.space[12],
    paddingLeft: tokens.space[5],
    paddingRight: tokens.space[12], // Extra space for toggle button
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Password input recipe combining all variants
 */
export const passwordInputRecipe = recipe({
  base: [passwordInputBase],

  variants: {
    variant: passwordInputVariants,
    size: passwordInputSizes,
  },

  defaultVariants: {
    variant: 'outline',
    size: 'medium',
  },
});

/**
 * Toggle button base styles
 * Positioned absolutely within the input container
 */
export const toggleButtonBase = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.foreground.secondary,
  transition: tokens.transition.fast,

  selectors: {
    '&:hover': {
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.brand.primary}`,
      outlineOffset: '2px',
      borderRadius: tokens.radius.base,
    },
    '&[data-disabled]': {
      color: colors.foreground.tertiary,
      cursor: 'not-allowed',
    },
  },
});

/**
 * Toggle button size variants
 * Positioned and sized according to parent input size
 */
export const toggleButtonSizes = styleVariants({
  small: {
    right: tokens.space[2],
    width: tokens.space[4],
    height: tokens.space[4],
  },

  medium: {
    right: tokens.space[3],
    width: tokens.space[5],
    height: tokens.space[5],
  },

  large: {
    right: tokens.space[4],
    width: tokens.space[6],
    height: tokens.space[6],
  },
});

/**
 * Toggle button state variants
 * Visual feedback for current visibility state
 */
export const toggleButtonStates = styleVariants({
  visible: {
    // When password is visible (showing hide icon)
  },
  hidden: {
    // When password is hidden (showing show icon)
  },
});

/**
 * Toggle button recipe
 */
export const toggleButtonRecipe = recipe({
  base: [toggleButtonBase],

  variants: {
    size: toggleButtonSizes,
    state: toggleButtonStates,
  },

  defaultVariants: {
    size: 'medium',
    state: 'hidden',
  },
});

/**
 * Input field styles when inside password input
 * Removes default padding-right to prevent overlap with button
 */
export const passwordInput = style({
  paddingRight: '0 !important',
});
