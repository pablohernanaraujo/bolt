// /src/ui/modal/modal.css.ts
// Styles for Modal component using vanilla-extract
// Provides backdrop, dialog positioning, sizes, and animations
// RELEVANT FILES: modal.tsx, types.ts, helpers.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Animation keyframes for modal entry/exit
 * Smooth fade and scale transitions
 */
const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const scaleIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

const scaleOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
});

/**
 * Base modal overlay that covers the full screen
 * Provides backdrop and centers the modal dialog
 */
export const modalOverlay = style({
  // Positioning
  position: 'fixed',
  inset: 0,
  zIndex: 1000,

  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: tokens.space[4],

  // Background
  backgroundColor: 'rgba(0, 0, 0, 0.5)',

  // Animations
  animationDuration: '200ms',
  animationTimingFunction: 'ease-out',
  animationFillMode: 'both',

  // Entry/exit states
  selectors: {
    '&[data-entering]': {
      animationName: fadeIn,
    },
    '&[data-exiting]': {
      animationName: fadeOut,
    },
  },
});

/**
 * Base modal dialog container
 * Contains the actual modal content with proper styling
 */
export const modalDialog = style({
  // Positioning and dimensions
  position: 'relative',
  maxHeight: `calc(100vh - ${tokens.space[8]})`,
  width: '100%',

  // Appearance
  backgroundColor: colors.background.primary,
  borderRadius: tokens.radius.lg,
  boxShadow: shadows.large,

  // Layout
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  // Animations
  animationDuration: '200ms',
  animationTimingFunction: 'ease-out',
  animationFillMode: 'both',

  // Entry/exit states
  selectors: {
    '&[data-entering]': {
      animationName: scaleIn,
    },
    '&[data-exiting]': {
      animationName: scaleOut,
    },
  },
});

/**
 * Modal size variants
 * Controls the maximum width of the modal dialog
 */
export const modalSizes = styleVariants({
  small: {
    maxWidth: '400px',
  },
  medium: {
    maxWidth: '600px',
  },
  large: {
    maxWidth: '800px',
  },
  full: {
    // Full screen modal - takes up entire viewport
    maxWidth: '100vw',
    maxHeight: '100vh',
    width: '100vw',
    height: '100vh',
    margin: 0,
    borderRadius: 0,
    // Override the default dialog styles for full screen
    position: 'fixed',
    inset: 0,
  },
});

/**
 * Modal header styles
 * Contains title and close button
 */
export const modalHeader = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  // Spacing
  padding: tokens.space[6],
  paddingBottom: tokens.space[4],

  // Border
  borderBottom: `1px solid ${colors.border.secondary}`,

  // Typography
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
});

/**
 * Modal title styles
 */
export const modalTitle = style({
  margin: 0,
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
  lineHeight: tokens.lineHeight.tight,
});

/**
 * Close button in modal header
 */
export const modalCloseButton = style({
  // Reset button styles
  border: 'none',
  background: 'none',
  padding: tokens.space[2],
  margin: `calc(-1 * ${tokens.space[2]})`,
  cursor: 'pointer',

  // Appearance
  color: colors.foreground.secondary,
  borderRadius: tokens.radius.md,

  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // Interactions
  transition: 'all 150ms ease',

  selectors: {
    '&:hover': {
      backgroundColor: colors.background.secondary,
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

/**
 * Modal body styles
 * Contains the main content of the modal
 */
export const modalBody = style({
  // Layout
  flex: 1,
  overflow: 'auto',

  // Spacing
  padding: tokens.space[6],
  paddingTop: tokens.space[4],
  paddingBottom: tokens.space[4],

  // Typography
  color: colors.foreground.primary,
  fontSize: tokens.fontSize.base,
  lineHeight: tokens.lineHeight.relaxed,
});

/**
 * Modal footer styles
 * Contains action buttons
 */
export const modalFooter = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.space[3],

  // Spacing
  padding: tokens.space[6],
  paddingTop: tokens.space[4],

  // Border
  borderTop: `1px solid ${colors.border.secondary}`,

  // Responsive stacking on small screens
  '@media': {
    '(max-width: 640px)': {
      flexDirection: 'column-reverse',
      gap: tokens.space[2],
    },
  },
});

/**
 * Modifier for modal without header
 */
export const modalBodyNoHeader = style({
  paddingTop: tokens.space[6],
});

/**
 * Modifier for modal without footer
 */
export const modalBodyNoFooter = style({
  paddingBottom: tokens.space[6],
});

/**
 * Scroll lock styles
 * Applied to body when modal is open
 */
export const scrollLock = style({
  overflow: 'hidden',
});
