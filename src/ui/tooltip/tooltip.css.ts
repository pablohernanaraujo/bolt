// /src/ui/tooltip/tooltip.css.ts
// Styles for Tooltip component using vanilla-extract
// Defines variants, sizes, and positioning styles
// RELEVANT FILES: tooltip.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base tooltip styles
 * Common styles shared by all tooltip variants
 */
export const tooltip = style({
  // Layout and positioning
  position: 'relative',
  display: 'inline-block',
  maxWidth: '300px',
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.normal,
  textAlign: 'left',

  // Visual appearance
  borderRadius: tokens.radius.md,
  boxShadow: shadows.large,

  // Animation and interaction
  transition: tokens.transition.fast,
  zIndex: 1000,

  // Accessibility
  outline: 'none',

  // Ensure tooltip doesn't interfere with pointer events when not hovered
  selectors: {
    '&[data-entering]': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '&[data-exiting]': {
      opacity: 0,
      transform: 'scale(0.96)',
    },
  },
});

/**
 * Size variants
 * Controls padding and font size
 */
export const sizes = styleVariants({
  small: {
    padding: `${tokens.space[1]} ${tokens.space[2]}`,
    fontSize: tokens.fontSize.xs,
    borderRadius: tokens.radius.base,
  },
  medium: {
    padding: `${tokens.space[2]} ${tokens.space[3]}`,
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.md,
  },
  large: {
    padding: `${tokens.space[3]} ${tokens.space[4]}`,
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Visual variants
 * Different color schemes for different purposes
 */
export const variants = styleVariants({
  default: {
    backgroundColor: colors.background.inverse,
    color: colors.foreground.inverse,
    border: `1px solid ${colors.border.secondary}`,
  },
  inverse: {
    backgroundColor: colors.background.primary,
    color: colors.foreground.primary,
    border: `1px solid ${colors.border.primary}`,
  },
  accent: {
    backgroundColor: colors.brand.primary,
    color: colors.foreground.inverse,
    border: `1px solid ${colors.brand.primary}`,
  },
});

/**
 * Arrow base styles
 * Common styles for the tooltip arrow/pointer
 */
export const arrow = style({
  position: 'absolute',
  width: '8px',
  height: '8px',
  transform: 'rotate(45deg)',
  border: `1px solid`,
  zIndex: -1,

  // Position arrow based on tooltip placement
  selectors: {
    '[data-placement^="top"] &': {
      bottom: '-5px',
      left: '50%',
      marginLeft: '-4px',
      borderTop: 'none',
      borderLeft: 'none',
    },
    '[data-placement^="bottom"] &': {
      top: '-5px',
      left: '50%',
      marginLeft: '-4px',
      borderBottom: 'none',
      borderRight: 'none',
    },
    '[data-placement^="left"] &': {
      right: '-5px',
      top: '50%',
      marginTop: '-4px',
      borderLeft: 'none',
      borderBottom: 'none',
    },
    '[data-placement^="right"] &': {
      left: '-5px',
      top: '50%',
      marginTop: '-4px',
      borderRight: 'none',
      borderTop: 'none',
    },
  },
});

/**
 * Arrow color variants
 * Different arrow colors to match tooltip variants
 */
export const arrowVariants = styleVariants({
  default: {
    backgroundColor: colors.background.inverse,
    borderColor: colors.border.secondary,
  },
  inverse: {
    backgroundColor: colors.background.primary,
    borderColor: colors.border.primary,
  },
  accent: {
    backgroundColor: colors.brand.primary,
    borderColor: colors.brand.primary,
  },
});
