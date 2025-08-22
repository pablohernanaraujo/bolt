// /src/ui/layout/container/container.css.ts
// CSS styles for Container layout component using vanilla-extract
// Provides full-width container with configurable vertical padding
// RELEVANT FILES: container.tsx, helpers.ts, ../../tokens/tokens.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base container styles
 * Always full width with proper box-sizing
 */
export const base = style({
  // Full width container
  width: '100%',

  // Ensure consistent box model
  boxSizing: 'border-box',

  // Remove default margins
  margin: 0,
});

/**
 * Vertical padding variations using design system space tokens
 * Each variant applies padding-top and padding-bottom
 */
export const paddingVariants = styleVariants({
  '0': {
    paddingTop: tokens.space['0'],
    paddingBottom: tokens.space['0'],
  },
  '1': {
    paddingTop: tokens.space['1'],
    paddingBottom: tokens.space['1'],
  },
  '2': {
    paddingTop: tokens.space['2'],
    paddingBottom: tokens.space['2'],
  },
  '3': {
    paddingTop: tokens.space['3'],
    paddingBottom: tokens.space['3'],
  },
  '4': {
    paddingTop: tokens.space['4'],
    paddingBottom: tokens.space['4'],
  },
  '5': {
    paddingTop: tokens.space['5'],
    paddingBottom: tokens.space['5'],
  },
  '6': {
    paddingTop: tokens.space['6'],
    paddingBottom: tokens.space['6'],
  },
  '8': {
    paddingTop: tokens.space['8'],
    paddingBottom: tokens.space['8'],
  },
  '10': {
    paddingTop: tokens.space['10'],
    paddingBottom: tokens.space['10'],
  },
  '12': {
    paddingTop: tokens.space['12'],
    paddingBottom: tokens.space['12'],
  },
  '16': {
    paddingTop: tokens.space['16'],
    paddingBottom: tokens.space['16'],
  },
  '20': {
    paddingTop: tokens.space['20'],
    paddingBottom: tokens.space['20'],
  },
  '24': {
    paddingTop: tokens.space['24'],
    paddingBottom: tokens.space['24'],
  },
});
