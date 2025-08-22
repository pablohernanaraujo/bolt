// /src/ui/layout/flex/flex.css.ts
// Vanilla-extract styles for the Flex component
// Provides flexbox layout styling with design system integration
// RELEVANT FILES: flex.tsx, types.ts, helpers.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base flex container styles
 * Establishes flexbox context with common defaults
 */
export const flexBase = style({
  display: 'flex',
  // Default values are set via component props, not CSS
  // This ensures proper React prop control
});

/**
 * Flex direction variants
 * Controls the main axis direction and order of flex items
 */
export const flexDirection = styleVariants({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  'row-reverse': {
    flexDirection: 'row-reverse',
  },
  'column-reverse': {
    flexDirection: 'column-reverse',
  },
});

/**
 * Flex wrap variants
 * Controls whether flex items are forced onto one line or wrap
 */
export const flexWrap = styleVariants({
  nowrap: {
    flexWrap: 'nowrap',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  'wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
});

/**
 * Align items variants (cross-axis alignment)
 * Controls how flex items are aligned perpendicular to main axis
 */
export const alignItems = styleVariants({
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  stretch: {
    alignItems: 'stretch',
  },
  baseline: {
    alignItems: 'baseline',
  },
});

/**
 * Justify content variants (main-axis distribution)
 * Controls how flex items are distributed along main axis
 */
export const justifyContent = styleVariants({
  start: {
    justifyContent: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  between: {
    justifyContent: 'space-between',
  },
  around: {
    justifyContent: 'space-around',
  },
  evenly: {
    justifyContent: 'space-evenly',
  },
});

/**
 * Gap variants using design system spacing tokens
 * Provides consistent spacing between flex items
 */
export const flexGap = styleVariants({
  '0': {
    gap: tokens.space[0],
  },
  '1': {
    gap: tokens.space[1],
  },
  '2': {
    gap: tokens.space[2],
  },
  '3': {
    gap: tokens.space[3],
  },
  '4': {
    gap: tokens.space[4],
  },
  '5': {
    gap: tokens.space[5],
  },
  '6': {
    gap: tokens.space[6],
  },
  '8': {
    gap: tokens.space[8],
  },
  '10': {
    gap: tokens.space[10],
  },
  '12': {
    gap: tokens.space[12],
  },
  '16': {
    gap: tokens.space[16],
  },
  '20': {
    gap: tokens.space[20],
  },
  '24': {
    gap: tokens.space[24],
  },
});
