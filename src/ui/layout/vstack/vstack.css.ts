// /src/ui/layout/vstack/vstack.css.ts
// Styles for VStack component using vanilla-extract
// Defines flexbox layout styles with spacing and alignment variants for vertical layout
// RELEVANT FILES: vstack.tsx, types.ts, ../../../tokens/tokens.css.ts

import { style, styleVariants } from '@vanilla-extract/css';

import { tokens } from '@/tokens/tokens.css';

/**
 * Base VStack styles
 * Sets up vertical flex container with default properties
 */
export const vstack = style({
  // Flexbox setup for vertical layout
  display: 'flex',
  flexDirection: 'column',

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
 * Alignment variants for horizontal axis (cross-axis in column layout)
 * Controls how children align horizontally within the vertical stack
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
 * Justification variants for vertical axis (main-axis in column layout)
 * Controls vertical distribution of children along the stack
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
 * Allows children to wrap to new columns when needed
 */
export const wrap = style({
  flexWrap: 'wrap',
});

/**
 * Reversed modifier
 * Reverses the order of children visually (bottom to top)
 */
export const reversed = style({
  flexDirection: 'column-reverse',
});
