// /src/ui/pin-input/pin-input.css.ts
// Styles for the PinInput component using vanilla-extract
// Provides variant styles, sizes, and states with design tokens
// RELEVANT FILES: pin-input.tsx, pin-input-field.tsx, ../../tokens/index.ts

import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Container for the entire PIN input component
 */
export const pinInputContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[2],
});

/**
 * Group container for PIN input fields
 */
export const pinInputGroup = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[2],
});

/**
 * Separator element between PIN input groups
 */
export const pinInputSeparator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.foreground.secondary,
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.medium,
  userSelect: 'none',
  margin: `0 ${tokens.space[1]}`,
});

/**
 * Base styles for individual PIN input fields
 */
export const pinInputFieldBase = style({
  // Reset and base styles
  appearance: 'none',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: 0,

  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '1',

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.tight,
  textAlign: 'center',
  color: colors.foreground.primary,

  // Interactions
  cursor: 'text',
  transition: tokens.transition.fast,

  // Focus styles
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${colors.brand.primary}`,
      outlineOffset: '2px',
    },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      color: colors.foreground.tertiary,
    },
    '&::selection': {
      backgroundColor: colors.brand.primary,
      color: colors.background.primary,
    },
  },
});

/**
 * Variant styles for PIN input fields
 */
export const pinInputFieldVariants = styleVariants({
  outline: {
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.primary}`,

    selectors: {
      '&:hover:not([data-disabled])': {
        borderColor: colors.border.secondary,
      },
      '&:focus': {
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        borderColor: colors.border.secondary,
      },
      '&[data-error]': {
        borderColor: colors.semantic.error,
      },
      '&[data-error]:focus': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },

  filled: {
    backgroundColor: colors.background.secondary,
    border: `1px solid transparent`,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.background.tertiary,
      },
      '&:focus': {
        backgroundColor: colors.background.primary,
        borderColor: colors.brand.primary,
        boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
      },
      '&[data-disabled]': {
        backgroundColor: colors.background.secondary,
        opacity: 0.5,
      },
      '&[data-error]': {
        borderColor: colors.semantic.error,
        backgroundColor: colors.background.primary,
      },
      '&[data-error]:focus': {
        borderColor: colors.semantic.error,
        boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
      },
    },
  },
});

/**
 * Size variants for PIN input fields
 */
export const pinInputFieldSizes = styleVariants({
  small: {
    width: tokens.space[8], // 32px
    height: tokens.space[8], // 32px
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },

  medium: {
    width: tokens.space[12], // 48px
    height: tokens.space[12], // 48px
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.md,
  },

  large: {
    width: tokens.space[16], // 64px
    height: tokens.space[16], // 64px
    fontSize: tokens.fontSize.xl,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * PIN input field recipe combining all variants
 */
export const pinInputFieldRecipe = recipe({
  base: [pinInputFieldBase],

  variants: {
    variant: pinInputFieldVariants,
    size: pinInputFieldSizes,
  },

  defaultVariants: {
    variant: 'outline',
    size: 'medium',
  },
});

/**
 * Hidden input for screen readers and form submission
 */
export const hiddenInput = style({
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  overflow: 'hidden',
});

/**
 * Container styles with gap variants for different sizes
 */
export const containerGapVariants = styleVariants({
  small: {
    gap: tokens.space[1], // 4px (was 6px but using available token)
  },

  medium: {
    gap: tokens.space[2], // 8px
  },

  large: {
    gap: tokens.space[3], // 12px
  },
});

/**
 * PIN input container recipe with size-based gaps
 */
export const pinInputContainerRecipe = recipe({
  base: [pinInputContainer],

  variants: {
    size: containerGapVariants,
  },

  defaultVariants: {
    size: 'medium',
  },
});

/**
 * Group container recipe with size-based gaps
 */
export const pinInputGroupRecipe = recipe({
  base: [pinInputGroup],

  variants: {
    size: containerGapVariants,
  },

  defaultVariants: {
    size: 'medium',
  },
});

/**
 * Error state styles for the container
 */
export const errorContainer = style({
  selectors: {
    '&[data-error]': {
      // Error styles are handled individually on each field
    },
  },
});

/**
 * Focus within styles for better visual feedback
 */
export const focusWithinContainer = style({
  selectors: {
    '&:focus-within': {
      // Optional: Add container-level focus styles
    },
  },
});
