// /src/ui/checkbox/checkbox.css.ts
// Styles for Checkbox component using vanilla-extract
// Defines variants, sizes, and interaction states for the checkbox
// RELEVANT FILES: checkbox.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base container styles for the checkbox wrapper
 * Handles layout and label positioning
 */
export const checkboxContainer = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space[3],
  cursor: 'pointer',
  userSelect: 'none',

  // Disabled state for the entire container
  selectors: {
    '&[data-disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

/**
 * Label position variants
 * Controls whether label appears on left or right of checkbox
 */
export const checkboxContainerLabelLeft = style({
  flexDirection: 'row-reverse',
});

export const checkboxContainerLabelRight = style({
  flexDirection: 'row',
});

/**
 * Base checkbox input styles
 * The actual checkbox input element
 */
export const checkboxInput = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background.primary,
  border: `2px solid ${colors.border.primary}`,
  transition: tokens.transition.fast,
  outline: 'none',
  cursor: 'pointer',

  // Focus styles - using data-focused from React Aria
  selectors: {
    '&[data-focused]': {
      boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
    },
    '&[data-disabled]': {
      cursor: 'not-allowed',
      backgroundColor: colors.background.secondary,
    },
  },
});

/**
 * Base unchecked checkbox styles
 */
export const checkboxBase = style({
  backgroundColor: colors.background.primary,
  borderColor: colors.border.primary,

  selectors: {
    '&:hover:not([data-disabled])': {
      borderColor: colors.border.secondary,
      backgroundColor: colors.background.secondary,
    },
  },
});

/**
 * Size variants for the checkbox
 * Controls the dimensions of the checkbox
 */
export const checkboxSizes = styleVariants({
  small: {
    width: '16px',
    height: '16px',
    borderRadius: tokens.radius.sm,
  },
  medium: {
    width: '20px',
    height: '20px',
    borderRadius: tokens.radius.sm,
  },
  large: {
    width: '24px',
    height: '24px',
    borderRadius: tokens.radius.md,
  },
});

/**
 * Visual variants for checked state
 * Different color schemes based on variant prop
 */
export const checkboxVariants = styleVariants({
  primary: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.brand.primaryHover,
        borderColor: colors.brand.primaryHover,
      },
    },
  },
  secondary: {
    backgroundColor: colors.background.tertiary,
    borderColor: colors.border.secondary,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.background.secondary,
      },
    },
  },
  success: {
    backgroundColor: colors.semantic.success,
    borderColor: colors.semantic.success,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.semantic.success,
        opacity: 0.9,
      },
    },
  },
  danger: {
    backgroundColor: colors.semantic.error,
    borderColor: colors.semantic.error,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.semantic.error,
        opacity: 0.9,
      },
    },
  },
});

/**
 * Checkmark icon styles
 * The check icon that appears when selected
 */
export const checkboxCheckmark = style({
  color: colors.foreground.inverse,
  opacity: 0,
  transform: 'scale(0.8)',
  transition: tokens.transition.fast,

  // Show checkmark when checkbox is selected
  selectors: {
    '[data-selected] &': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
});

/**
 * Size variants for the checkmark icon
 * Matches the checkbox size for proper proportion
 */
export const checkmarkSizes = styleVariants({
  small: {
    width: '10px',
    height: '10px',
  },
  medium: {
    width: '12px',
    height: '12px',
  },
  large: {
    width: '14px',
    height: '14px',
  },
});

/**
 * Label text styles
 * Typography for the checkbox label
 */
export const checkboxLabel = style({
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.normal,
  color: colors.foreground.primary,
});

/**
 * Label size variants
 * Adjusts font size based on checkbox size
 */
export const labelSizes = styleVariants({
  small: {
    fontSize: tokens.fontSize.sm,
  },
  medium: {
    fontSize: tokens.fontSize.base,
  },
  large: {
    fontSize: tokens.fontSize.lg,
  },
});
