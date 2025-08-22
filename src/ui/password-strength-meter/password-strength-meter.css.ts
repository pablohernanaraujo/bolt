// /src/ui/password-strength-meter/password-strength-meter.css.ts
// Styles for the PasswordStrengthMeter component using vanilla-extract
// Provides strength level colors, sizes, and animations
// RELEVANT FILES: password-strength-meter.tsx, types.ts, ../../tokens/index.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Progress bar fill animation
 */
const progressFillAnimation = keyframes({
  '0%': { width: '0%' },
  '100%': { width: 'var(--progress-width)' },
});

/**
 * Base container for the password strength meter
 */
export const strengthMeterContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space[2],
});

/**
 * Progress bar container
 */
export const progressBarContainer = style({
  width: '100%',
  backgroundColor: colors.background.secondary,
  borderRadius: tokens.radius.full,
  overflow: 'hidden',
  position: 'relative',
});

/**
 * Progress bar fill element
 */
export const progressBarFill = style({
  height: '100%',
  borderRadius: tokens.radius.full,
  transition: `all ${tokens.transition.base}`,
  animation: `${progressFillAnimation} 0.6s ease-out`,

  // Use CSS custom property for dynamic width
  width: 'var(--progress-width)',
});

/**
 * Size variants for the progress bar
 */
export const progressBarSizes = styleVariants({
  small: {
    height: tokens.space[1], // 4px
  },
  medium: {
    height: tokens.space[2], // 8px (was 6px but using available token)
  },
  large: {
    height: tokens.space[3], // 12px (adjusted to maintain hierarchy)
  },
});

/**
 * Strength level color variants for progress bar
 */
export const progressBarColors = styleVariants({
  weak: {
    backgroundColor: colors.semantic.error,
  },
  fair: {
    backgroundColor: colors.semantic.warning,
  },
  good: {
    backgroundColor: colors.semantic.info,
  },
  strong: {
    backgroundColor: colors.semantic.success,
  },
});

/**
 * Strength label container
 */
export const strengthLabel = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
});

/**
 * Strength label text
 */
export const strengthLabelText = style({
  fontWeight: tokens.fontWeight.semibold,
});

/**
 * Strength label color variants
 */
export const strengthLabelColors = styleVariants({
  weak: {
    color: colors.semantic.error,
  },
  fair: {
    color: colors.semantic.warning,
  },
  good: {
    color: colors.semantic.info,
  },
  strong: {
    color: colors.semantic.success,
  },
});

/**
 * Feedback list container
 */
export const feedbackContainer = style({
  marginTop: tokens.space[2],
});

/**
 * Feedback list
 */
export const feedbackList = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
  fontSize: tokens.fontSize.xs,
  color: colors.foreground.secondary,
});

/**
 * Feedback list item
 */
export const feedbackItem = style({
  position: 'relative',
  paddingLeft: tokens.space[4],
  marginBottom: tokens.space[1],

  // Bullet point
  '::before': {
    content: '•',
    position: 'absolute',
    left: tokens.space[2],
    color: colors.foreground.tertiary,
  },
});

/**
 * Progress bar recipe combining all variants
 */
export const progressBarRecipe = recipe({
  base: [progressBarContainer],
  variants: {
    size: progressBarSizes,
  },
  defaultVariants: {
    size: 'medium',
  },
});

/**
 * Progress fill recipe with colors
 */
export const progressFillRecipe = recipe({
  base: [progressBarFill],
  variants: {
    strength: progressBarColors,
  },
  defaultVariants: {
    strength: 'weak',
  },
});

/**
 * Label recipe with colors
 */
export const labelRecipe = recipe({
  base: [strengthLabel],
  variants: {
    strength: strengthLabelColors,
  },
  defaultVariants: {
    strength: 'weak',
  },
});
