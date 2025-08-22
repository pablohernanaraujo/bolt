// /src/tokens/emphasis.css.ts
// Emphasis tokens for text opacity and visual hierarchy
// Provides consistent emphasis levels across all typography components
// RELEVANT FILES: tokens.css.ts, typography.css.ts, index.ts

/**
 * Emphasis levels for text components
 * Controls the visual importance and hierarchy of text elements
 */
export type KeyEmphasis = 'high' | 'medium' | 'low' | 'pure';

/**
 * Emphasis values mapped to opacity levels
 * These values control text opacity for different emphasis levels
 *
 * - pure: 1.0 - Maximum emphasis, full opacity (100%)
 * - high: 0.87 - High emphasis, primary text content (87%)
 * - medium: 0.6 - Medium emphasis, secondary text content (60%)
 * - low: 0.38 - Low emphasis, tertiary/disabled content (38%)
 */
export interface EmphasisTypes {
  high: number;
  medium: number;
  low: number;
  pure: number;
}

export const Emphasis: EmphasisTypes = {
  high: 0.87,
  medium: 0.6,
  low: 0.38,
  pure: 1,
};
