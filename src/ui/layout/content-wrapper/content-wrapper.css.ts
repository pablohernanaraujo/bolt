// /src/ui/layout/content-wrapper/content-wrapper.css.ts
// CSS styles for Content Wrapper layout component using vanilla-extract
// Provides horizontal padding variations and variant-specific styles
// RELEVANT FILES: content-wrapper.tsx, helpers.ts, ../../tokens/tokens.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base content wrapper styles
 * Full width with proper box-sizing and no margins
 */
export const base = style({
  // Full width within parent container
  width: '100%',

  // Ensure consistent box model
  boxSizing: 'border-box',

  // Remove default margins
  margin: 0,

  // Allow content to flow naturally
  display: 'block',
});

/**
 * Variant-specific styles for different semantic uses
 * Currently minimal but allows for future customization per variant
 */
export const variantStyles = styleVariants({
  screen: {
    // Full-screen content variant
    // Could add specific styles like min-height if needed
  },
  header: {
    // Header/navigation variant
    // Could add specific styles like sticky positioning
  },
  body: {
    // Main content variant
    // Default styles, most common use case
  },
  footer: {
    // Footer/actions variant
    // Could add specific styles like border-top
  },
});

/**
 * Horizontal padding variations using design system space tokens
 * Each variant applies padding-left and padding-right
 */
export const paddingVariants = styleVariants({
  '0': {
    paddingLeft: tokens.space['0'],
    paddingRight: tokens.space['0'],
  },
  '1': {
    paddingLeft: tokens.space['1'],
    paddingRight: tokens.space['1'],
  },
  '2': {
    paddingLeft: tokens.space['2'],
    paddingRight: tokens.space['2'],
  },
  '3': {
    paddingLeft: tokens.space['3'],
    paddingRight: tokens.space['3'],
  },
  '4': {
    paddingLeft: tokens.space['4'],
    paddingRight: tokens.space['4'],
  },
  '5': {
    paddingLeft: tokens.space['5'],
    paddingRight: tokens.space['5'],
  },
  '6': {
    paddingLeft: tokens.space['6'],
    paddingRight: tokens.space['6'],
  },
  '8': {
    paddingLeft: tokens.space['8'],
    paddingRight: tokens.space['8'],
  },
  '10': {
    paddingLeft: tokens.space['10'],
    paddingRight: tokens.space['10'],
  },
  '12': {
    paddingLeft: tokens.space['12'],
    paddingRight: tokens.space['12'],
  },
  '16': {
    paddingLeft: tokens.space['16'],
    paddingRight: tokens.space['16'],
  },
  '20': {
    paddingLeft: tokens.space['20'],
    paddingRight: tokens.space['20'],
  },
  '24': {
    paddingLeft: tokens.space['24'],
    paddingRight: tokens.space['24'],
  },
});
