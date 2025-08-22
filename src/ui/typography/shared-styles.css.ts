// /src/ui/typography/shared-styles.css.ts
// Shared CSS styles for typography modifiers using vanilla-extract
// Provides reusable style classes for text styling options
// RELEVANT FILES: shared-types.ts, h1/h1.css.ts, ../../tokens/contracts.css.ts

import { style } from '@vanilla-extract/css';

import { colors } from '@/tokens/contracts.css';

/**
 * Bold text modifier
 * Increases font weight to 700 (bold)
 */
export const bold = style({
  fontWeight: 700,
});

/**
 * Truncated text modifier
 * Limits text to single line with ellipsis overflow
 */
export const truncated = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  // Ensure block display for truncation to work properly
  display: 'block',
});

/**
 * Italic text modifier
 * Applies italic font style
 */
export const italic = style({
  fontStyle: 'italic',
});

/**
 * Underline text modifier
 * Adds underline text decoration
 */
export const underline = style({
  textDecoration: 'underline',
  textDecorationLine: 'underline',
});

/**
 * Strikethrough text modifier
 * Adds line-through text decoration
 */
export const strikeThrough = style({
  textDecoration: 'line-through',
  textDecorationLine: 'line-through',
});

/**
 * Highlight text modifier
 * Adds primary brand color background with light opacity
 * Creates a highlighted effect while maintaining text readability
 */
export const highlight = style({
  backgroundColor: colors.brand.primary,
  // Add light opacity for subtle highlight effect
  opacity: 0.15,
  // Add small padding for better visual appearance
  paddingInline: '0.125em',
  // Round corners slightly for softer appearance
  borderRadius: '0.125em',
  // Ensure the highlight wraps inline with text
  display: 'inline',
});

/**
 * Combined underline and strikethrough modifier
 * When both decorations are needed simultaneously
 */
export const underlineStrikeThrough = style({
  textDecoration: 'underline line-through',
  textDecorationLine: 'underline line-through',
});
