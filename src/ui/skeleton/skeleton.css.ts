// /src/ui/skeleton/skeleton.css.ts
// Styles for Skeleton components with pulse animation and theme integration
// Uses vanilla-extract for type-safe CSS with design tokens
// RELEVANT FILES: types.ts, helpers.ts, ../../../tokens/contracts.css.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { radius, tokens } from '@/tokens';
import { colors } from '@/tokens/contracts.css';

const { space: spacing } = tokens;

/**
 * Pulse animation for skeleton loading effect
 * Creates a smooth shimmer effect
 */
const pulse = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.4,
  },
  '100%': {
    opacity: 1,
  },
});

/**
 * Shimmer animation for skeleton loading effect
 * Alternative animation with gradient movement
 */
const shimmer = keyframes({
  '0%': {
    backgroundPosition: '-200px 0',
  },
  '100%': {
    backgroundPosition: 'calc(200px + 100%) 0',
  },
});

/**
 * Base skeleton styles
 * Common styles shared across all skeleton variants
 */
export const skeletonBase = style({
  display: 'block',
  backgroundColor: colors.background.secondary,
  borderRadius: radius.md,
  position: 'relative',
  overflow: 'hidden',

  // Accessibility - announce loading state to screen readers
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(
      90deg,
      transparent,
      ${colors.background.tertiary},
      transparent
    )`,
    backgroundSize: '200px 100%',
    backgroundRepeat: 'no-repeat',
    animationName: shimmer,
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },

  // Ensure skeleton is visible in different themes
  selectors: {
    '&[data-theme="dark"]': {
      backgroundColor: colors.background.tertiary,
    },
  },
});

/**
 * Animation speed variants
 */
export const animationSpeed = styleVariants({
  slow: {
    animationDuration: '3s',
    selectors: {
      '&::before': {
        animationDuration: '3s',
      },
    },
  },
  normal: {
    animationDuration: '2s',
    selectors: {
      '&::before': {
        animationDuration: '2s',
      },
    },
  },
  fast: {
    animationDuration: '1s',
    selectors: {
      '&::before': {
        animationDuration: '1s',
      },
    },
  },
});

/**
 * Animation state variants
 */
export const animationState = styleVariants({
  animated: {
    animationName: pulse,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },
  static: {
    animation: 'none',
    selectors: {
      '&::before': {
        display: 'none',
      },
    },
  },
});

/**
 * High contrast mode support
 * Internal use only - integrated into recipes
 */
const highContrast = style({
  '@media': {
    '(prefers-contrast: high)': {
      backgroundColor: 'ButtonFace',
      border: '1px solid ButtonText',
      selectors: {
        '&::before': {
          backgroundImage: `linear-gradient(
            90deg,
            transparent,
            ButtonText,
            transparent
          )`,
        },
      },
    },
  },
});

/**
 * Reduced motion support
 * Internal use only - integrated into recipes
 */
const reducedMotion = style({
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
      selectors: {
        '&::before': {
          animation: 'none',
        },
      },
    },
  },
});

/**
 * Loaded state - hides skeleton and shows content
 * Internal use only - integrated into recipes
 */
const loaded = style({
  display: 'none',
});

const content = style({
  display: 'block',
});

/**
 * Focus indicator for accessibility - not currently used
 * Internal use only
 */
const focusable = style({
  selectors: {
    '&:focus': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

/**
 * Border radius variants
 */
export const borderRadiusVariants = styleVariants({
  none: {
    borderRadius: '0',
  },
  small: {
    borderRadius: radius.sm,
  },
  medium: {
    borderRadius: radius.md,
  },
  large: {
    borderRadius: radius.lg,
  },
  full: {
    borderRadius: '50%',
  },
});

/**
 * Skeleton size presets for common use cases
 * Only exported if needed, otherwise keep internal
 */
const skeletonSizePresets = styleVariants({
  text: {
    height: '1rem',
    width: '100%',
  },
  avatar: {
    height: '2.5rem',
    width: '2.5rem',
    borderRadius: '50%',
  },
  button: {
    height: '2.5rem',
    width: '5rem',
  },
  card: {
    height: '10rem',
    width: '100%',
  },
});

/**
 * Circle size variants for SkeletonCircle
 */
export const circleSizes = styleVariants({
  xs: {
    width: '1rem',
    height: '1rem',
  },
  sm: {
    width: '1.5rem',
    height: '1.5rem',
  },
  md: {
    width: '2rem',
    height: '2rem',
  },
  lg: {
    width: '2.5rem',
    height: '2.5rem',
  },
  xl: {
    width: '3rem',
    height: '3rem',
  },
  '2xl': {
    width: '4rem',
    height: '4rem',
  },
});

/**
 * Skeleton recipe for dynamic styling
 * Combines base styles with variants and accessibility styles
 */
export const skeleton = recipe({
  base: [skeletonBase, highContrast, reducedMotion],
  variants: {
    animation: animationState,
    speed: animationSpeed,
    borderRadius: borderRadiusVariants,
    preset: skeletonSizePresets,
    loaded: {
      true: loaded,
      false: {},
    },
  },
  defaultVariants: {
    animation: 'animated',
    speed: 'normal',
    borderRadius: 'medium',
    loaded: false,
  },
});

/**
 * Circle-specific styles
 * Includes accessibility and motion preferences
 */
export const skeletonCircle = recipe({
  base: [
    skeletonBase,
    highContrast,
    reducedMotion,
    {
      borderRadius: '50%',
      flexShrink: 0,
    },
  ],
  variants: {
    size: circleSizes,
    animation: animationState,
    speed: animationSpeed,
    loaded: {
      true: loaded,
      false: {},
    },
  },
  defaultVariants: {
    size: 'md',
    animation: 'animated',
    speed: 'normal',
    loaded: false,
  },
});

/**
 * Text skeleton styles for multi-line content
 */
export const skeletonText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing['2'],
});

export const skeletonTextLine = style([
  skeletonBase,
  {
    height: '1rem',
    width: '100%',
    selectors: {
      '&:last-child': {
        width: '80%', // Last line is typically shorter
      },
    },
  },
]);
