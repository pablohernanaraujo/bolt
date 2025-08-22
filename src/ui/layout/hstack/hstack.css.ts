// /src/ui/layout/hstack/hstack.css.ts
// Styles for HStack component using vanilla-extract
// Defines flexbox layout styles with spacing and alignment variants
// RELEVANT FILES: hstack.tsx, types.ts, ../../../tokens/tokens.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base HStack styles
 * Sets up horizontal flex container with default properties
 */
export const hstack = style({
  // Flexbox setup
  display: 'flex',
  flexDirection: 'row',

  // Reset margins
  margin: 0,
  padding: 0,

  // Ensure full width by default
  width: '100%',

  // Box sizing for predictable sizing
  boxSizing: 'border-box',
});

/**
 * Spacing variants using gap
 * Maps to design system space tokens for consistent spacing
 */
export const space = styleVariants(tokens.space, (spaceValue) => ({
  gap: spaceValue,
}));

/**
 * Alignment variants for vertical axis
 * Controls how children align perpendicular to main axis
 */
export const align = styleVariants({
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
 * Justification variants for horizontal axis
 * Controls distribution of children along main axis
 */
export const justify = styleVariants({
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
 * Wrap modifier
 * Allows children to wrap to new lines when needed
 */
export const wrap = style({
  flexWrap: 'wrap',
});

/**
 * Reversed modifier
 * Reverses the order of children visually
 */
export const reversed = style({
  flexDirection: 'row-reverse',
});
