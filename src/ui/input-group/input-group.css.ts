// /src/ui/input-group/input-group.css.ts
// Styles for InputGroup and related addon/element components
// Provides layout, positioning, and visual styles using design tokens
// RELEVANT FILES: input-group.tsx, types.ts, ../../tokens/index.ts

import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base InputGroup container styles
 * Uses flexbox for horizontal layout
 */
export const inputGroup = style({
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',
  width: '100%',
  isolation: 'isolate',
});

/**
 * InputGroup size variants
 * Controls the height of the entire group
 */
export const groupSizes = styleVariants({
  small: {
    minHeight: tokens.space[8],
  },
  medium: {
    minHeight: tokens.space[10],
  },
  large: {
    minHeight: tokens.space[12],
  },
});

/**
 * InputGroup variant styles
 * Applied to the container for consistent theming
 */
export const groupVariants = styleVariants({
  outline: {
    // Variant-specific styles handled by children
  },
  filled: {
    // Variant-specific styles handled by children
  },
});

/**
 * Error state for the group
 */
export const groupError = style({
  selectors: {
    '&': {
      // Error styles cascade to children
    },
  },
});

/**
 * Disabled state for the group
 */
export const groupDisabled = style({
  cursor: 'not-allowed',
  opacity: 0.6,
});

/**
 * Base addon styles
 * Static elements that extend the input
 */
export const addon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.normal,
  lineHeight: tokens.lineHeight.normal,
  transition: tokens.transition.fast,
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

/**
 * Left addon specific styles
 */
export const leftAddon = style({
  borderTopLeftRadius: 'inherit',
  borderBottomLeftRadius: 'inherit',
  borderRight: 'none',
  marginRight: '-1px',
});

/**
 * Right addon specific styles
 */
export const rightAddon = style({
  borderTopRightRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
  borderLeft: 'none',
  marginLeft: '-1px',
});

/**
 * Addon size variants
 */
export const addonSizes = styleVariants({
  small: {
    padding: `0 ${tokens.space[3]}`,
    fontSize: tokens.fontSize.sm,
    minHeight: tokens.space[8],
  },
  medium: {
    padding: `0 ${tokens.space[4]}`,
    fontSize: tokens.fontSize.base,
    minHeight: tokens.space[10],
  },
  large: {
    padding: `0 ${tokens.space[5]}`,
    fontSize: tokens.fontSize.lg,
    minHeight: tokens.space[12],
  },
});

/**
 * Addon variant styles
 */
export const addonVariants = styleVariants({
  outline: {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    color: colors.foreground.secondary,

    selectors: {
      [`${inputGroup}:hover &`]: {
        borderColor: colors.border.secondary,
      },
      [`${inputGroup}:focus-within &`]: {
        borderColor: colors.brand.primary,
      },
      [`${groupError} &`]: {
        borderColor: colors.semantic.error,
      },
    },
  },
  filled: {
    backgroundColor: colors.background.tertiary,
    border: `1px solid transparent`,
    color: colors.foreground.secondary,

    selectors: {
      [`${inputGroup}:hover &`]: {
        backgroundColor: colors.background.tertiary,
      },
      [`${inputGroup}:focus-within &`]: {
        backgroundColor: colors.background.secondary,
        borderColor: colors.brand.primary,
      },
      [`${groupError} &`]: {
        borderColor: colors.semantic.error,
      },
    },
  },
});

/**
 * Disabled addon styles
 */
export const addonDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
  color: colors.foreground.tertiary,
});

/**
 * Base element styles
 * Overlay elements positioned inside the input
 */
export const element = style({
  position: 'absolute',
  top: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  zIndex: 1,
  color: colors.foreground.secondary,
});

/**
 * Left element positioning
 */
export const leftElement = style({
  left: '0',
});

/**
 * Right element positioning
 */
export const rightElement = style({
  right: '0',
});

/**
 * Element size variants
 */
export const elementSizes = styleVariants({
  small: {
    width: tokens.space[8],
    fontSize: tokens.fontSize.sm,
  },
  medium: {
    width: tokens.space[10],
    fontSize: tokens.fontSize.base,
  },
  large: {
    width: tokens.space[12],
    fontSize: tokens.fontSize.lg,
  },
});

/**
 * Interactive element styles
 * For elements containing buttons or clickable items
 */
export const interactiveElement = style({
  pointerEvents: 'auto',
});

// Global styles for buttons within interactive elements
globalStyle(`${interactiveElement} button`, {
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: tokens.space[1],
  borderRadius: tokens.radius.base,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: tokens.transition.fast,
});

globalStyle(`${interactiveElement} button:hover`, {
  backgroundColor: colors.background.secondary,
  color: colors.foreground.primary,
});

globalStyle(`${interactiveElement} button:focus-visible`, {
  outline: `2px solid ${colors.brand.primary}`,
  outlineOffset: '2px',
});

/**
 * Disabled element styles
 */
export const elementDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
});

// Global styles for buttons within disabled elements
globalStyle(`${elementDisabled} button`, {
  cursor: 'not-allowed',
  pointerEvents: 'none',
});

/**
 * Modified input styles when used in a group
 */
export const groupedInput = style({
  flex: 1,
  minWidth: 0,
  borderRadius: 0,

  selectors: {
    // When it's the first child (no left addon)
    '&:first-child': {
      borderTopLeftRadius: 'inherit',
      borderBottomLeftRadius: 'inherit',
    },

    // When it's the last child (no right addon)
    '&:last-child': {
      borderTopRightRadius: 'inherit',
      borderBottomRightRadius: 'inherit',
    },
  },
});

/**
 * Input with left addon - no left border radius
 */
export const inputWithLeftAddon = style({
  borderTopLeftRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
});

/**
 * Input with right addon - no right border radius
 */
export const inputWithRightAddon = style({
  borderTopRightRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
});

/**
 * Input with left element - additional left padding
 */
export const inputWithLeftElement = style({});

// Apply padding based on size when there's a left element
globalStyle(`${inputWithLeftElement}`, {
  paddingLeft: tokens.space[10], // Default medium size
});

globalStyle(`${groupSizes.small} ${inputWithLeftElement}`, {
  paddingLeft: tokens.space[8],
});

globalStyle(`${groupSizes.large} ${inputWithLeftElement}`, {
  paddingLeft: tokens.space[12],
});

/**
 * Input with right element - additional right padding
 */
export const inputWithRightElement = style({});

// Apply padding based on size when there's a right element
globalStyle(`${inputWithRightElement}`, {
  paddingRight: tokens.space[10], // Default medium size
});

globalStyle(`${groupSizes.small} ${inputWithRightElement}`, {
  paddingRight: tokens.space[8],
});

globalStyle(`${groupSizes.large} ${inputWithRightElement}`, {
  paddingRight: tokens.space[12],
});

/**
 * Clear button specific styles
 */
export const clearButton = style({
  background: 'none',
  border: 'none',
  padding: tokens.space[1],
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radius.base,
  color: colors.foreground.secondary,
  transition: tokens.transition.fast,

  selectors: {
    '&:hover': {
      backgroundColor: colors.background.secondary,
      color: colors.foreground.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${colors.brand.primary}`,
      outlineOffset: '2px',
    },
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});
