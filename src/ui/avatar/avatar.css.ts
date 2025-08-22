// /src/ui/avatar/avatar.css.ts
// Styles for Avatar component using vanilla-extract
// Defines sizes, variants, and status indicators for the avatar
// RELEVANT FILES: avatar.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base avatar container styles
 * Handles positioning and general layout
 */
export const avatarContainer = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background.secondary,
  border: `2px solid ${colors.background.primary}`,
  overflow: 'hidden',
  flexShrink: 0,
  userSelect: 'none',
});

/**
 * Size variants for the avatar
 * Controls the dimensions of the avatar container
 */
export const avatarSizes = styleVariants({
  xs: {
    width: '24px',
    height: '24px',
  },
  sm: {
    width: '32px',
    height: '32px',
  },
  md: {
    width: '40px',
    height: '40px',
  },
  lg: {
    width: '48px',
    height: '48px',
  },
  xl: {
    width: '64px',
    height: '64px',
  },
  '2xl': {
    width: '80px',
    height: '80px',
  },
});

/**
 * Shape variants for the avatar
 * Controls the border radius
 */
export const avatarVariants = styleVariants({
  circle: {
    borderRadius: '50%',
  },
  rounded: {
    borderRadius: tokens.radius.md,
  },
  square: {
    borderRadius: tokens.radius.sm,
  },
});

/**
 * Avatar image styles
 * Styles for the image element inside the avatar
 */
export const avatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

/**
 * Image variant styles
 * Matches the container's border radius
 */
export const avatarImageVariants = styleVariants({
  circle: {
    borderRadius: '50%',
  },
  rounded: {
    borderRadius: `calc(${tokens.radius.md} - 2px)`,
  },
  square: {
    borderRadius: `calc(${tokens.radius.sm} - 2px)`,
  },
});

/**
 * Avatar initials styles
 * Typography for the initials text
 */
export const avatarInitials = style({
  color: colors.foreground.primary,
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: 1,
  textAlign: 'center',
});

/**
 * Initials size variants
 * Font sizes for different avatar sizes
 */
export const avatarInitialsSizes = styleVariants({
  xs: {
    fontSize: '8px',
  },
  sm: {
    fontSize: '10px',
  },
  md: {
    fontSize: '14px',
  },
  lg: {
    fontSize: '16px',
  },
  xl: {
    fontSize: '20px',
  },
  '2xl': {
    fontSize: '24px',
  },
});

/**
 * Avatar icon styles
 * Styles for the fallback icon
 */
export const avatarIcon = style({
  color: colors.foreground.secondary,
  flexShrink: 0,
});

/**
 * Icon size variants
 * Icon sizes for different avatar sizes
 */
export const avatarIconSizes = styleVariants({
  xs: {
    width: '12px',
    height: '12px',
  },
  sm: {
    width: '14px',
    height: '14px',
  },
  md: {
    width: '18px',
    height: '18px',
  },
  lg: {
    width: '22px',
    height: '22px',
  },
  xl: {
    width: '28px',
    height: '28px',
  },
  '2xl': {
    width: '36px',
    height: '36px',
  },
});

/**
 * Status indicator styles
 * Base styles for the status dot
 */
export const statusIndicator = style({
  position: 'absolute',
  borderRadius: '50%',
  border: `2px solid ${colors.background.primary}`,
  bottom: 0,
  right: 0,
  transform: 'translate(25%, 25%)',
});

/**
 * Status indicator size variants
 * Sizes for different avatar sizes
 */
export const statusIndicatorSizes = styleVariants({
  xs: {
    width: '8px',
    height: '8px',
    borderWidth: '1px',
  },
  sm: {
    width: '10px',
    height: '10px',
    borderWidth: '1px',
  },
  md: {
    width: '12px',
    height: '12px',
    borderWidth: '2px',
  },
  lg: {
    width: '14px',
    height: '14px',
    borderWidth: '2px',
  },
  xl: {
    width: '18px',
    height: '18px',
    borderWidth: '2px',
  },
  '2xl': {
    width: '22px',
    height: '22px',
    borderWidth: '2px',
  },
});

/**
 * Status indicator color variants
 * Different colors for different status types
 */
export const statusIndicatorVariants = styleVariants({
  online: {
    backgroundColor: colors.semantic.success,
  },
  offline: {
    backgroundColor: colors.foreground.tertiary,
  },
  away: {
    backgroundColor: colors.semantic.warning,
  },
  busy: {
    backgroundColor: colors.semantic.error,
  },
});
