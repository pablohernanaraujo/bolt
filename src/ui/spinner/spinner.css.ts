// /src/ui/spinner/spinner.css.ts
// Styles for Spinner component using vanilla-extract
// Defines animations, sizes, and color schemes for loading spinner
// RELEVANT FILES: spinner.tsx, types.ts, helpers.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Rotation animation for the spinner
 * Creates a continuous 360-degree rotation
 */
const rotate = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

/**
 * Base spinner styles
 * Sets up the SVG container and animation
 */
export const spinner = style({
  display: 'inline-block',
  animation: `${rotate} 0.75s linear infinite`,
  flexShrink: 0,
});

/**
 * Size variants for the spinner
 * Defines width and height for each size option
 */
export const sizes = styleVariants({
  small: {
    width: '16px',
    height: '16px',
  },
  medium: {
    width: '24px',
    height: '24px',
  },
  large: {
    width: '32px',
    height: '32px',
  },
});

/**
 * Color scheme variants for the spinner
 * Maps to design system color tokens
 */
export const colorSchemes = styleVariants({
  default: {
    color: colors.foreground.secondary,
  },
  brand: {
    color: colors.brand.primary,
  },
  success: {
    color: colors.semantic.success,
  },
  warning: {
    color: colors.semantic.warning,
  },
  error: {
    color: colors.semantic.error,
  },
  info: {
    color: colors.semantic.info,
  },
});

/**
 * Style for spinner with visible track
 * Adds opacity to create a track effect
 */
export const withTrack = style({
  position: 'relative',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: 'currentColor',
    opacity: 0.2,
  },
});

/**
 * Track element styles
 * Creates the background circle for the spinner
 */
export const track = style({
  opacity: 0.2,
});

/**
 * Spinner element styles
 * The rotating part of the spinner
 */
export const spinnerElement = style({
  strokeLinecap: 'round',
});

/**
 * Visually hidden text for screen readers
 * Provides accessible loading state information
 */
export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});
