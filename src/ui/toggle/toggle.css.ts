// /src/ui/toggle/toggle.css.ts
// Styles for Toggle component using vanilla-extract
// Defines variants, sizes, and interaction states for the switch
// RELEVANT FILES: toggle.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base container styles for the toggle wrapper
 * Handles layout and label positioning
 */
export const container = style({
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
 * Controls whether label appears on left or right of toggle
 */
export const labelPositions = styleVariants({
  left: {
    flexDirection: 'row-reverse',
  },
  right: {
    flexDirection: 'row',
  },
});

/**
 * Base toggle track styles
 * The background track that the thumb slides within
 */
export const track = style({
  position: 'relative',
  backgroundColor: colors.background.tertiary,
  border: `2px solid ${colors.border.primary}`,
  transition: tokens.transition.fast,
  outline: 'none',

  // Focus styles - using data-focused from React Aria
  selectors: {
    '&[data-focused]': {
      boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
    },
  },
});

/**
 * Size variants for the toggle track
 * Controls the dimensions of the toggle switch
 */
export const trackSizes = styleVariants({
  small: {
    width: '36px',
    height: '20px',
    borderRadius: tokens.radius.full,
  },
  medium: {
    width: '44px',
    height: '24px',
    borderRadius: tokens.radius.full,
  },
  large: {
    width: '52px',
    height: '28px',
    borderRadius: tokens.radius.full,
  },
});

/**
 * Toggle thumb - the sliding indicator
 * The circular element that moves when toggled
 */
export const thumb = style({
  position: 'absolute',
  top: '50%',
  backgroundColor: colors.background.primary,
  borderRadius: tokens.radius.full,
  boxShadow: shadows.small,
  transform: 'translateY(-50%)',
  transition: tokens.transition.fast,

  // Position when unchecked (left side)
  left: '2px',
});

/**
 * Size variants for the toggle thumb
 * Matches the track size for consistency
 */
export const thumbSizes = styleVariants({
  small: {
    width: '14px',
    height: '14px',
  },
  medium: {
    width: '18px',
    height: '18px',
  },
  large: {
    width: '22px',
    height: '22px',
  },
});

/**
 * Checked state positions for thumb
 * Moves thumb to the right side when checked
 */
export const thumbCheckedPositions = styleVariants({
  small: {
    transform: 'translateY(-50%) translateX(16px)',
  },
  medium: {
    transform: 'translateY(-50%) translateX(20px)',
  },
  large: {
    transform: 'translateY(-50%) translateX(24px)',
  },
});

/**
 * Visual variants for checked state
 * Different color schemes based on variant prop
 */
export const checkedVariants = styleVariants({
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
    backgroundColor: colors.background.secondary,
    borderColor: colors.border.secondary,

    selectors: {
      '&:hover:not([data-disabled])': {
        backgroundColor: colors.background.tertiary,
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
 * Label text styles
 * Typography for the toggle label
 */
export const label = style({
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.normal,
  color: colors.foreground.primary,
});

/**
 * Label size variants
 * Adjusts font size based on toggle size
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
