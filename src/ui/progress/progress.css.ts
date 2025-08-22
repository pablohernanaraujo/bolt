// /src/ui/progress/progress.css.ts
// Styles for Progress component using vanilla-extract
// Provides visual variants, sizes, and animation styles with design tokens
// RELEVANT FILES: types.ts, progress.tsx, helpers.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base progress container styles
 * Provides the foundation for all progress bars
 */
export const progressBase = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[2],
  width: '100%',
});

/**
 * Progress track (background) styles
 * The container that holds the progress bar
 */
export const progressTrack = style({
  position: 'relative',
  flex: 1,
  backgroundColor: colors.background.secondary,
  borderRadius: tokens.radius.full,
  overflow: 'hidden',
});

/**
 * Progress bar (foreground) styles
 * The filled portion indicating progress
 */
export const progressBar = style({
  height: '100%',
  borderRadius: 'inherit',
  transition: 'width 0.3s ease, background-color 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
});

/**
 * Progress label styles
 * For displaying progress description or percentage
 */
export const progressLabel = style({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: colors.foreground.primary,
  whiteSpace: 'nowrap',
});

/**
 * Progress value display styles
 * For showing numerical progress values
 */
export const progressValue = style({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: colors.foreground.primary,
  minWidth: '3rem',
  textAlign: 'right',
});

/**
 * Size variants for progress tracks
 * Controls height and visual prominence
 */
export const trackSizes = styleVariants({
  small: {
    height: tokens.space[1],
  },
  medium: {
    height: tokens.space[2],
  },
  large: {
    height: tokens.space[3],
  },
});

/**
 * Color variants for progress bars
 * Semantic colors for different states and meanings
 */
export const barVariants = styleVariants({
  primary: {
    backgroundColor: colors.brand.primary,
  },
  success: {
    backgroundColor: colors.semantic.success,
  },
  warning: {
    backgroundColor: colors.semantic.warning,
  },
  error: {
    backgroundColor: colors.semantic.error,
  },
});

/**
 * Striped pattern overlay
 * Adds visual texture to progress bars
 */
export const stripedOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  )`,
  backgroundSize: `${tokens.space[4]} ${tokens.space[4]}`,
});

/**
 * Animated stripes effect
 * Creates moving stripe animation
 */
const progressStripesAnimation = keyframes({
  '0%': {
    backgroundPosition: `${tokens.space[4]} 0`,
  },
  '100%': {
    backgroundPosition: '0 0',
  },
});

export const animatedStripes = style({
  animation: `${progressStripesAnimation} 1s linear infinite`,
});

/**
 * Indeterminate progress animation
 * For loading states without specific progress
 */
const indeterminateAnimation = keyframes({
  '0%': {
    transform: 'translateX(-100%)',
  },
  '100%': {
    transform: 'translateX(100%)',
  },
});

export const indeterminate = style({
  width: '30%',
  animation: `${indeterminateAnimation} 1.5s ease-in-out infinite`,
});

/**
 * Indeterminate track styling
 * Special background for indeterminate state
 */
export const indeterminateTrack = style({
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    animation: 'indeterminate 1.5s ease-in-out infinite',
  },
});

/**
 * Progress component recipe
 * Combines all variants and states
 */
export const progress = recipe({
  base: [progressBase],
  variants: {
    variant: {
      primary: {},
      success: {},
      warning: {},
      error: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    isStriped: {
      true: {},
      false: {},
    },
    isAnimated: {
      true: {},
      false: {},
    },
    isIndeterminate: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    isStriped: false,
    isAnimated: false,
    isIndeterminate: false,
  },
});

/**
 * Wrapper for progress with label
 * When label is present, adds proper spacing
 */
export const progressWithLabel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space[1],
  width: '100%',
});

/**
 * Label row container
 * Contains label and optional value display
 */
export const labelRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});
