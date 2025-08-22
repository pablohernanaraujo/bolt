// /src/ui/pagination/pagination.css.ts
// Vanilla-extract styles for Pagination component with design tokens
// Defines layouts, variants, sizes, and interactive states for pagination controls
// RELEVANT FILES: pagination.tsx, types.ts, ../../tokens/contracts.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base pagination container styles
 * Provides layout and structure for pagination controls
 */
export const pagination = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space[1],
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontFamily: tokens.fonts.body,
});

/**
 * Individual pagination item wrapper styles
 * Contains buttons and other pagination elements
 */
export const paginationItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Base styles for pagination buttons
 * Shared by all interactive pagination elements
 */
export const paginationButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '40px',

  // Typography
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.normal,
  textDecoration: 'none',

  // Interaction
  cursor: 'pointer',
  userSelect: 'none',
  transition: tokens.transition.fast,

  // Reset
  border: '1px solid transparent',
  background: 'transparent',
  color: colors.foreground.primary,

  // Focus styles handled by React Aria
  outline: 'none',

  // States
  selectors: {
    '&:hover:not([disabled]):not([aria-current="page"])': {
      backgroundColor: colors.background.secondary,
      color: colors.brand.primary,
    },
    '&:active:not([disabled]):not([aria-current="page"])': {
      backgroundColor: colors.background.tertiary,
    },
    '&[data-focused]': {
      boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
    '&[aria-current="page"]': {
      backgroundColor: colors.brand.primary,
      color: colors.foreground.inverse,
      fontWeight: tokens.fontWeight.semibold,
    },
  },
});

/**
 * Size variants for pagination buttons
 * Controls padding, font size, and dimensions
 */
export const sizes = styleVariants({
  small: {
    height: '32px',
    minWidth: '32px',
    padding: `0 ${tokens.space[2]}`,
    fontSize: tokens.fontSize.sm,
    borderRadius: tokens.radius.base,
  },
  medium: {
    height: '40px',
    minWidth: '40px',
    padding: `0 ${tokens.space[3]}`,
    fontSize: tokens.fontSize.base,
    borderRadius: tokens.radius.md,
  },
  large: {
    height: '48px',
    minWidth: '48px',
    padding: `0 ${tokens.space[4]}`,
    fontSize: tokens.fontSize.lg,
    borderRadius: tokens.radius.lg,
  },
});

/**
 * Visual variants for different pagination styles
 */
export const variants = styleVariants({
  default: {
    // Default styling already applied in base button
  },
  simple: {
    selectors: {
      '&:not([aria-current="page"])': {
        border: `1px solid ${colors.border.primary}`,
      },
      '&:hover:not([disabled]):not([aria-current="page"])': {
        borderColor: colors.brand.primary,
      },
    },
  },
});

/**
 * Ellipsis indicator styles
 * Non-interactive element showing truncated pages
 */
export const ellipsis = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.foreground.tertiary,
  fontSize: tokens.fontSize.base,
  lineHeight: tokens.lineHeight.normal,
  padding: `0 ${tokens.space[2]}`,
  userSelect: 'none',
  cursor: 'default',
});

/**
 * Navigation button styles for first/previous/next/last
 * Slightly different styling for action buttons
 */
export const navigationButton = style([
  paginationButton,
  {
    gap: tokens.space[1],

    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: colors.background.secondary,
        color: colors.brand.primary,
      },
      '&:active:not([disabled])': {
        backgroundColor: colors.background.tertiary,
      },
    },
  },
]);

/**
 * Icon styles within navigation buttons
 */
export const buttonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

/**
 * Button text styles
 * Controls text truncation and alignment
 */
export const buttonText = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/**
 * Responsive styles for mobile devices
 * Hides text on smaller screens, shows only icons
 */
export const responsiveText = style({
  '@media': {
    '(max-width: 480px)': {
      display: 'none',
    },
  },
});

/**
 * Screen reader only text for accessibility
 * Provides additional context for assistive technologies
 */
export const srOnly = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

/**
 * Gap styles between pagination groups
 * Provides visual separation between different pagination sections
 */
export const paginationGap = styleVariants({
  small: {
    gap: tokens.space[0],
  },
  medium: {
    gap: tokens.space[1],
  },
  large: {
    gap: tokens.space[2],
  },
});

/**
 * Container for different sections of pagination
 * Groups related pagination elements together
 */
export const paginationSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'inherit',
});

/**
 * Compact mode styles for simple variant
 * Reduces spacing and simplifies appearance
 */
export const compact = style({
  gap: 0,
});
