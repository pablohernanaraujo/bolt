// /src/ui/menu/menu.css.ts
// Vanilla-extract styles for Menu components
// Uses design tokens for consistent theming and spacing
// RELEVANT FILES: types.ts, helpers.ts, menu.tsx

import {
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css';

import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base menu container styles
 * Contains the menu items and handles overflow
 */
export const menuBase = style({
  // Layout
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',

  // Appearance
  background: colors.background.primary,
  border: `1px solid ${colors.border.primary}`,
  borderRadius: tokens.radius.md,
  boxShadow: shadows.medium,

  // Behavior
  outline: 'none',
  overflow: 'hidden',
  userSelect: 'none',

  // Animation
  transition: tokens.transition.fast,
  transformOrigin: 'var(--transform-origin)',

  // Z-index for overlay
  zIndex: tokens.zIndex.dropdown,

  // Focus styles
  selectors: {
    '&:focus-visible': {
      boxShadow: `${shadows.focus}, ${shadows.medium}`,
    },
  },
});

/**
 * Menu size variants
 * Controls padding and overall dimensions
 */
export const menuSize = styleVariants({
  small: {
    minWidth: '160px',
    maxWidth: '240px',
    padding: tokens.space[1],
  },
  medium: {
    minWidth: '200px',
    maxWidth: '320px',
    padding: tokens.space[2],
  },
  large: {
    minWidth: '240px',
    maxWidth: '400px',
    padding: tokens.space[3],
  },
});

/**
 * Menu visual variants
 * Different color schemes and appearances
 */
export const menuVariant = styleVariants({
  default: {
    background: colors.background.primary,
    border: `1px solid ${colors.border.primary}`,
  },
  accent: {
    background: colors.background.secondary,
    border: `1px solid ${colors.brand.primary}`,
  },
  inverse: {
    background: colors.background.inverse,
    border: `1px solid ${colors.border.secondary}`,
  },
});

/**
 * Base menu item styles
 * Individual selectable items within the menu
 */
export const menuItemBase = style({
  // Layout
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',

  // Typography
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.normal,
  textAlign: 'left',

  // Spacing
  gap: tokens.space[2],
  borderRadius: tokens.radius.sm,
  border: 'none',
  background: 'transparent',

  // Behavior
  cursor: 'pointer',
  outline: 'none',
  transition: tokens.transition.fast,
  textDecoration: 'none',

  // Default colors
  color: colors.foreground.primary,

  // Interactive states
  selectors: {
    '&:hover': {
      background: colors.background.secondary,
    },
    '&:focus-visible': {
      background: colors.background.secondary,
      boxShadow: shadows.focus,
    },
    '&[data-focused]': {
      background: colors.background.secondary,
    },
    '&[data-pressed]': {
      background: colors.background.tertiary,
    },
    '&[aria-disabled="true"]': {
      opacity: tokens.emphasis.low,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
});

/**
 * Menu item size variants
 * Different padding and typography sizes
 */
export const menuItemSize = styleVariants({
  small: {
    padding: `${tokens.space[1]} ${tokens.space[2]}`,
    fontSize: tokens.fontSize.xs,
    minHeight: '32px',
  },
  medium: {
    padding: `${tokens.space[2]} ${tokens.space[3]}`,
    fontSize: tokens.fontSize.sm,
    minHeight: '36px',
  },
  large: {
    padding: `${tokens.space[3]} ${tokens.space[4]}`,
    fontSize: tokens.fontSize.base,
    minHeight: '44px',
  },
});

/**
 * Menu item visual variants
 * Different color schemes for various item types
 */
export const menuItemVariant = styleVariants({
  default: {
    color: colors.foreground.primary,
  },
  danger: {
    color: colors.semantic.error,
    selectors: {
      '&:hover': {
        background: colors.semantic.errorBackground,
        color: colors.semantic.error,
      },
      '&:focus-visible': {
        background: colors.semantic.errorBackground,
        color: colors.semantic.error,
      },
      '&[data-focused]': {
        background: colors.semantic.errorBackground,
        color: colors.semantic.error,
      },
    },
  },
  success: {
    color: colors.semantic.success,
    selectors: {
      '&:hover': {
        background: colors.semantic.successBackground,
        color: colors.semantic.success,
      },
      '&:focus-visible': {
        background: colors.semantic.successBackground,
        color: colors.semantic.success,
      },
      '&[data-focused]': {
        background: colors.semantic.successBackground,
        color: colors.semantic.success,
      },
    },
  },
  warning: {
    color: colors.semantic.warning,
    selectors: {
      '&:hover': {
        background: colors.semantic.warningBackground,
        color: colors.semantic.warning,
      },
      '&:focus-visible': {
        background: colors.semantic.warningBackground,
        color: colors.semantic.warning,
      },
      '&[data-focused]': {
        background: colors.semantic.warningBackground,
        color: colors.semantic.warning,
      },
    },
  },
});

/**
 * Menu item content wrapper
 * Contains the main content (text, icons, etc.)
 */
export const menuItemContent = style({
  display: 'flex',
  alignItems: 'center',
  flex: '1',
  gap: tokens.space[2],
  minWidth: '0', // Allow text truncation
});

/**
 * Menu item text content
 * Main label text with overflow handling
 */
export const menuItemText = style({
  flex: '1',
  minWidth: '0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
});

/**
 * Menu item shortcut text
 * Keyboard shortcut or additional info display
 */
export const menuItemShortcut = style({
  fontSize: tokens.fontSize.xs,
  color: colors.foreground.secondary,
  marginLeft: 'auto',
  flexShrink: 0,
});

/**
 * Menu item icon wrapper
 * Container for start and end icons
 */
export const menuItemIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '16px',
  height: '16px',
});

/**
 * Menu section header
 * Title/heading for grouped menu items
 */
export const menuSectionHeader = style({
  // Typography
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.secondary,
  textTransform: 'uppercase',
  letterSpacing: tokens.letterSpacing.wide,

  // Spacing
  padding: `${tokens.space[2]} ${tokens.space[3]}`,
  paddingBottom: tokens.space[1],

  // Layout
  display: 'flex',
  alignItems: 'center',
});

/**
 * Menu section content
 * Container for items within a section
 */
export const menuSection = style({
  display: 'flex',
  flexDirection: 'column',
});

/**
 * Menu separator/divider
 * Visual separation between sections or items
 */
export const menuSeparator = style({
  height: '1px',
  background: colors.border.primary,
  margin: `${tokens.space[1]} 0`,
  flexShrink: 0,
});

/**
 * Popover container for menu overlay
 * Handles positioning and entry/exit animations
 */
export const menuPopover = style({
  // Entry animations
  selectors: {
    '&[data-entering]': {
      animation: 'menuFadeIn 150ms ease-out',
    },
    '&[data-exiting]': {
      animation: 'menuFadeOut 100ms ease-in',
    },
  },
});

/**
 * Animation keyframes for menu entry/exit
 */
export const menuFadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.95) translateY(-8px)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
  },
});

export const menuFadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'scale(0.95) translateY(-8px)',
  },
});

/**
 * Menu trigger button styles
 * Styling for buttons that open menus
 */
export const menuTrigger = style({
  // Ensure proper focus handling
  selectors: {
    '&[data-pressed]': {
      transform: 'scale(0.98)',
    },
  },
});

/**
 * Global styles for SVG icons within menu items
 * Ensures proper alignment when icons are passed as children
 */
globalStyle(`${menuItemContent} svg`, {
  flexShrink: 0,
  width: '16px',
  height: '16px',
  verticalAlign: 'middle',
});
