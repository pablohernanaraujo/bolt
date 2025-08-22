// /src/ui/drawer/drawer.css.ts
// Styles for Drawer component using vanilla-extract
// Provides backdrop, drawer positioning, sizes, placements, and animations
// RELEVANT FILES: drawer.tsx, types.ts, helpers.ts

import { keyframes, style, styleVariants } from '@vanilla-extract/css';

import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Animation keyframes for drawer entry/exit
 * Enhanced slide animations with scale and better timing for dynamic effect
 */
const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

// Clean slide animations for left placement
const slideInLeft = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

// Clean slide animations for right placement
const slideInRight = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

// Clean slide animations for top placement
const slideInTop = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

// Clean slide animations for bottom placement
const slideInBottom = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

/**
 * Base drawer overlay that covers the full screen
 * Provides backdrop for the drawer with enhanced animations
 * IMPORTANT: Animations MUST be defined properly for React Aria to work
 */
export const drawerOverlay = style({
  // Positioning
  position: 'fixed',
  inset: 0,
  zIndex: 1000,

  // Background
  backgroundColor: 'rgba(0, 0, 0, 0.5)',

  // Container for absolute positioned drawers
  display: 'block',

  // Enhanced animations with better timing and CSS custom properties support
  animationDuration: 'var(--drawer-animation-duration-enter, 300ms)',
  animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)', // Material Design easing
  animationFillMode: 'both',

  // Entry/exit states for backdrop
  selectors: {
    '&[data-entering]': {
      animationName: fadeIn,
    },
    '&[data-exiting]': {
      animationName: fadeOut,
      animationDuration: 'var(--drawer-animation-duration-exit, 200ms)', // Faster exit
    },
  },

  // Respect user preferences for reduced motion
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0ms',
      animationName: 'none',
    },
  },
});

/**
 * Base drawer container
 * Contains the actual drawer content with direct animation application
 * Strategy: Apply slide-in animation immediately on mount
 */
export const drawerDialog = style({
  // Positioning - absolute within the overlay container
  position: 'absolute',

  // Appearance
  backgroundColor: colors.background.primary,
  boxShadow: shadows.large,

  // Layout
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',

  // Direct animation application - slide in immediately
  animationDuration: 'var(--drawer-animation-duration-enter, 300ms)',
  animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth easeOutQuad
  animationFillMode: 'both',

  // Focus outline
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },
  },

  // Respect user preferences for reduced motion
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animationDuration: '0ms',
      animationName: 'none',
    },
  },
});

/**
 * Drawer placement variants with enhanced animations
 * Controls which side of the screen the drawer appears on
 */
export const drawerPlacements = styleVariants({
  left: {
    top: 0,
    left: 0,
    height: '100vh',
    borderTopRightRadius: tokens.radius.lg,
    borderBottomRightRadius: tokens.radius.lg,

    // Apply slide-in animation directly on mount
    animationName: slideInLeft,
  },
  right: {
    top: 0,
    right: 0,
    height: '100vh',
    borderTopLeftRadius: tokens.radius.lg,
    borderBottomLeftRadius: tokens.radius.lg,

    // Apply slide-in animation directly on mount
    animationName: slideInRight,
  },
  top: {
    top: 0,
    left: 0,
    right: 0,
    width: '100vw',
    borderBottomLeftRadius: tokens.radius.lg,
    borderBottomRightRadius: tokens.radius.lg,

    // Apply slide-in animation directly on mount
    animationName: slideInTop,
  },
  bottom: {
    bottom: 0,
    left: 0,
    right: 0,
    width: '100vw',
    borderTopLeftRadius: tokens.radius.lg,
    borderTopRightRadius: tokens.radius.lg,

    // Apply slide-in animation directly on mount
    animationName: slideInBottom,
  },
});

/**
 * Drawer size variants for left/right placements
 * Controls the width of the drawer
 */
export const drawerSizesHorizontal = styleVariants({
  small: {
    width: '320px',
    maxWidth: '80vw',
  },
  medium: {
    width: '400px',
    maxWidth: '80vw',
  },
  large: {
    width: '500px',
    maxWidth: '80vw',
  },
  full: {
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
    position: 'fixed',
    inset: 0,
  },
});

/**
 * Drawer size variants for top/bottom placements
 * Controls the height of the drawer
 */
export const drawerSizesVertical = styleVariants({
  small: {
    height: '320px',
    maxHeight: '80vh',
  },
  medium: {
    height: '400px',
    maxHeight: '80vh',
  },
  large: {
    height: '500px',
    maxHeight: '80vh',
  },
  full: {
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
    position: 'fixed',
    inset: 0,
  },
});

/**
 * Drawer header styles
 * Contains title and close button
 */
export const drawerHeader = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,

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
 * Drawer title styles
 */
export const drawerTitle = style({
  margin: 0,
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
  lineHeight: tokens.lineHeight.tight,
});

/**
 * Close button in drawer header
 */
export const drawerCloseButton = style({
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
 * Drawer body styles
 * Contains the main content of the drawer
 */
export const drawerBody = style({
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
 * Drawer footer styles
 * Contains action buttons
 */
export const drawerFooter = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.space[3],
  flexShrink: 0,

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
 * Modifier for drawer without header
 */
export const drawerBodyNoHeader = style({
  paddingTop: tokens.space[6],
});

/**
 * Modifier for drawer without footer
 */
export const drawerBodyNoFooter = style({
  paddingBottom: tokens.space[6],
});
