// /src/app/components/sidebar.css.ts
// Styles for the sidebar navigation component
// Defines layout, interactions, and responsive behavior
// RELEVANT FILES: sidebar.tsx, ../page.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Main sidebar container
 * Fixed width with full height
 */
export const sidebar = style({
  width: '280px',
  height: '100vh',
  backgroundColor: colors.background.secondary,
  borderRight: `1px solid ${colors.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
});

/**
 * Collapsed sidebar for mobile/responsive
 */
export const sidebarCollapsed = style({
  width: '60px',
  height: '100vh',
  backgroundColor: colors.background.secondary,
  borderRight: `1px solid ${colors.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: tokens.space[2],
  gap: tokens.space[1],
  position: 'sticky',
  top: 0,
  overflowY: 'auto',
});

/**
 * Sidebar header with title
 */
export const sidebarHeader = style({
  padding: tokens.space[6],
  borderBottom: `1px solid ${colors.border.primary}`,
});

export const sidebarTitle = style({
  fontSize: tokens.fontSize.lg,
  fontWeight: tokens.fontWeight.semibold,
  color: colors.foreground.primary,
  margin: 0,
});

/**
 * Scrollable content area
 */
export const sidebarContent = style({
  flex: 1,
  padding: tokens.space[2],
  overflowY: 'auto',
});

/**
 * Individual sidebar item button
 */
export const sidebarItem = style({
  width: '100%',
  padding: `${tokens.space[2]} ${tokens.space[3]}`,
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: tokens.radius.base,
  color: colors.foreground.secondary,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  textAlign: 'left',
  cursor: 'pointer',
  transition: tokens.transition.fast,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: tokens.space[1],

  selectors: {
    '&:hover': {
      backgroundColor: colors.background.tertiary,
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

/**
 * Selected sidebar item state
 */
export const sidebarItemSelected = style({
  backgroundColor: colors.brand.primary,
  color: colors.foreground.inverse,

  selectors: {
    '&:hover': {
      backgroundColor: colors.brand.primaryHover,
      color: colors.foreground.inverse,
    },
  },
});

/**
 * Child/nested sidebar items
 */
export const sidebarItemChild = style({
  paddingLeft: tokens.space[8],
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.normal,
});

/**
 * Content wrapper for sidebar item
 */
export const sidebarItemContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space[3],
});

/**
 * Icon within sidebar item
 */
export const sidebarItemIcon = style({
  flexShrink: 0,
});

/**
 * Label text within sidebar item
 */
export const sidebarItemLabel = style({
  flexGrow: 1,
  lineHeight: tokens.lineHeight.tight,
});

/**
 * Chevron icon for expandable items
 */
export const sidebarItemChevron = style({
  flexShrink: 0,
  transition: tokens.transition.fast,
  opacity: 0.6,
});

/**
 * Expanded state for chevron
 */
export const sidebarItemChevronExpanded = style({
  transform: 'rotate(90deg)',
});

/**
 * Container for child items
 */
export const sidebarChildren = style({
  marginLeft: tokens.space[2],
  borderLeft: `1px solid ${colors.border.secondary}`,
  paddingLeft: tokens.space[2],
});

/**
 * Icon-only button for collapsed sidebar
 */
export const sidebarIconButton = style({
  width: '44px',
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: tokens.radius.base,
  color: colors.foreground.secondary,
  cursor: 'pointer',
  transition: tokens.transition.fast,

  selectors: {
    '&:hover': {
      backgroundColor: colors.background.tertiary,
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.border.focus}`,
      outlineOffset: '2px',
    },
  },
});

/**
 * Selected state for icon button
 */
export const sidebarIconButtonSelected = style({
  backgroundColor: colors.brand.primary,
  color: colors.foreground.inverse,

  selectors: {
    '&:hover': {
      backgroundColor: colors.brand.primaryHover,
      color: colors.foreground.inverse,
    },
  },
});
