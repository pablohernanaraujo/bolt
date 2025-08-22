// /src/tokens/typography-helpers.ts
// Typography helper functions for building class names
// Provides utilities for combining typography styles with emphasis
// RELEVANT FILES: typography.css.ts, emphasis.css.ts, index.ts

import * as sharedStyles from '../ui/typography/shared-styles.css';
import { type SharedTypographyProps } from '../ui/typography/shared-types';
import { type KeyEmphasis } from './emphasis.css';
import { textEmphasis } from './typography.css';

/**
 * Helper function to build typography class names with emphasis
 * Combines base typography styles with emphasis opacity
 *
 * @param baseClass - The base typography class name (e.g., h1, body1, etc.)
 * @param emphasis - The emphasis level to apply (high, medium, low, pure)
 * @returns Combined class name string with emphasis applied
 *
 * @example
 * buildTypographyClass(h1, 'high') // Returns "h1-class emphasis-high-class"
 * buildTypographyClass(body1, 'medium') // Returns "body1-class emphasis-medium-class"
 */
export const buildTypographyClass = (
  baseClass: string,
  emphasis: KeyEmphasis = 'high',
): string => `${baseClass} ${textEmphasis[emphasis]}`;

/**
 * Helper function to build complete typography class names with all modifiers
 * Combines base typography styles, emphasis, and text styling modifiers
 *
 * @param baseClass - The base typography class name (e.g., h1, body1, etc.)
 * @param emphasis - The emphasis level to apply (high, medium, low, pure)
 * @param modifiers - Object containing text styling modifiers
 * @param customClass - Optional custom class name to append
 * @returns Combined class name string with all modifiers applied
 *
 * @example
 * buildCompleteTypographyClass(h1, 'high', { bold: true })
 * // Returns "h1-class emphasis-high-class bold-class"
 *
 * buildCompleteTypographyClass(body1, 'medium', { italic: true, underline: true })
 * // Returns "body1-class emphasis-medium-class italic-class underline-class"
 */
export const buildCompleteTypographyClass = (
  baseClass: string,
  emphasis: KeyEmphasis = 'high',
  modifiers: Omit<SharedTypographyProps, 'className'> = {},
  customClass?: string,
): string => {
  // Start with base class and emphasis
  const classes = [baseClass, textEmphasis[emphasis]];

  // Add modifier classes based on props
  if (modifiers.bold) classes.push(sharedStyles.bold);
  if (modifiers.isTruncated) classes.push(sharedStyles.truncated);
  if (modifiers.italic) classes.push(sharedStyles.italic);
  if (modifiers.highlight) classes.push(sharedStyles.highlight);

  // Handle text decoration combinations
  if (modifiers.underline && modifiers.strikeThrough) {
    classes.push(sharedStyles.underlineStrikeThrough);
  } else if (modifiers.underline) {
    classes.push(sharedStyles.underline);
  } else if (modifiers.strikeThrough) {
    classes.push(sharedStyles.strikeThrough);
  }

  // Add custom class if provided
  if (customClass) classes.push(customClass);

  return classes.join(' ');
};
