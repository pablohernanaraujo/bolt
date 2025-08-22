// /src/ui/list/list.css.ts
// Styling for the List component using vanilla-extract
// Defines variants, spacing options, and base list styles
// RELEVANT FILES: list.tsx, helpers.ts, tokens.css.ts

import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base list root styles
 * Common styles for all list variants
 */
export const listRoot = style({
  margin: 0,
  padding: 0,
  width: '100%',
});

/**
 * List variant styles
 * Different visual treatments for different list types
 */
export const variants = styleVariants({
  unordered: {
    listStyle: 'disc',
    paddingLeft: tokens.space['6'],
  },
  ordered: {
    listStyle: 'decimal',
    paddingLeft: tokens.space['6'],
  },
  basic: {
    listStyle: 'none',
    paddingLeft: 0,
  },
});

/**
 * Spacing between list items
 * Using individual classes for spacing
 */
export const spacing = styleVariants({
  sm: {},
  md: {},
  lg: {},
});

// Global styles for spacing - applied to list items within each spacing variant
globalStyle(`${spacing.sm} > li`, {
  marginBottom: tokens.space['2'],
});

globalStyle(`${spacing.sm} > li:last-child`, {
  marginBottom: 0,
});

globalStyle(`${spacing.md} > li`, {
  marginBottom: tokens.space['3'],
});

globalStyle(`${spacing.md} > li:last-child`, {
  marginBottom: 0,
});

globalStyle(`${spacing.lg} > li`, {
  marginBottom: tokens.space['4'],
});

globalStyle(`${spacing.lg} > li:last-child`, {
  marginBottom: 0,
});

/**
 * Base list item styles
 * Common styles for all list items - minimal styling to preserve markers
 */
export const listItem = style({
  fontSize: tokens.fontSize.base,
  lineHeight: tokens.lineHeight.normal,
  color: 'var(--colors-text-primary)',

  // Style the list markers
  '::marker': {
    color: 'var(--colors-text-secondary)',
  },
});

/**
 * List item with icon modifier
 * Additional styles when an icon is present
 */
export const listItemWithIcon = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: tokens.space['2'],
  paddingLeft: 0,
  position: 'relative',

  // Hide default marker when using custom icon
  listStyle: 'none',

  // Override parent list-style when icon is present
  '::marker': {
    content: 'none',
  },
});

/**
 * Icon container within list item
 * Styles for the icon wrapper
 */
export const listItemIcon = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--colors-text-secondary)',
  marginTop: tokens.space['1'], // Align with first line of text
});

/**
 * Content wrapper within list item
 * Ensures proper text wrapping and alignment
 */
export const listItemContent = style({
  flex: 1,
  minWidth: 0, // Allows content to shrink properly
});

/**
 * Text emphasis variants using design tokens
 * Controls color opacity and visual prominence
 */
export const emphasis = styleVariants({
  high: {
    opacity: tokens.emphasis.high,
  },
  medium: {
    opacity: tokens.emphasis.medium,
  },
  low: {
    opacity: tokens.emphasis.low,
  },
  pure: {
    opacity: tokens.emphasis.pure,
  },
});

/**
 * Font weight variants
 * Controls text weight for visual hierarchy
 */
export const weight = styleVariants({
  normal: {
    fontWeight: tokens.fontWeight.normal,
  },
  medium: {
    fontWeight: tokens.fontWeight.medium,
  },
  semibold: {
    fontWeight: tokens.fontWeight.semibold,
  },
  bold: {
    fontWeight: tokens.fontWeight.bold,
  },
});

/**
 * Text decoration styles
 * Additional text styling options
 */
export const decoration = styleVariants({
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecoration: 'underline',
  },
  'line-through': {
    textDecoration: 'line-through',
  },
});

/**
 * Size variants for list items
 * Controls font size using design tokens
 */
export const size = styleVariants({
  xs: {
    fontSize: tokens.fontSize.xs,
  },
  sm: {
    fontSize: tokens.fontSize.sm,
  },
  base: {
    fontSize: tokens.fontSize.base,
  },
  lg: {
    fontSize: tokens.fontSize.lg,
  },
  xl: {
    fontSize: tokens.fontSize.xl,
  },
});

/**
 * Color scheme variants for special emphasis
 * Semantic colors for different contexts
 */
export const colorScheme = styleVariants({
  default: {
    color: 'var(--colors-text-primary)',
  },
  brand: {
    color: 'var(--colors-accent-brand)',
  },
  success: {
    color: 'var(--colors-accent-success)',
  },
  warning: {
    color: 'var(--colors-accent-warning)',
  },
  error: {
    color: 'var(--colors-accent-error)',
  },
  info: {
    color: 'var(--colors-accent-info)',
  },
});
