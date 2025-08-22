// /src/ui/radio-group/radio-group.css.ts
// Styles for RadioGroup component using vanilla-extract
// Defines layout orientations and label styling for the radio group
// RELEVANT FILES: radio-group.tsx, ../../tokens/contracts.css, ../../tokens/tokens.css

import { style, styleVariants } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';

/**
 * Base radio group container styles
 * Handles layout and spacing for the radio group
 */
export const radioGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space[3],
});

/**
 * Vertical orientation for radio group
 * Default layout with radios stacked vertically
 */
export const radioGroupVertical = style({
  flexDirection: 'column',
  gap: tokens.space[3],
});

/**
 * Horizontal orientation for radio group
 * Layout with radios arranged horizontally
 */
export const radioGroupHorizontal = style({
  flexDirection: 'row',
  gap: tokens.space[4],
  flexWrap: 'wrap',
});

/**
 * Base radio group label styles
 * Typography for the group label/legend
 */
export const radioGroupLabel = style({
  fontFamily: tokens.fonts.body,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.normal,
  color: colors.foreground.primary,
  marginBottom: tokens.space[2],
});

/**
 * Label size variants for radio group
 * Adjusts font size based on group size
 */
export const groupLabelSizes = styleVariants({
  small: {
    fontSize: tokens.fontSize.sm,
  },
  medium: {
    fontSize: tokens.fontSize.base,
  },
  large: {
    fontSize: tokens.fontSize.lg,
  },
});
