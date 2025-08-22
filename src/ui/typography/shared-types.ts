// /src/ui/typography/shared-types.ts
// Shared type definitions for all typography components
// Provides common props interface for text styling modifiers
// RELEVANT FILES: h1/types.ts, body1/types.ts, shared-styles.css.ts

/**
 * Common text styling props for all typography components
 * These props provide consistent text modification options across the design system
 */
export interface SharedTypographyProps {
  /**
   * Makes the text bold
   * @default false
   */
  bold?: boolean;

  /**
   * Truncates text with ellipsis when it overflows
   * Text will be limited to one line with "..." at the end
   * @default false
   */
  isTruncated?: boolean;

  /**
   * Makes the text italic
   * @default false
   */
  italic?: boolean;

  /**
   * Adds underline decoration to the text
   * @default false
   */
  underline?: boolean;

  /**
   * Adds strikethrough decoration to the text
   * @default false
   */
  strikeThrough?: boolean;

  /**
   * Highlights the text with a primary color background
   * Uses primary brand color with light opacity
   * @default false
   */
  highlight?: boolean;
}
