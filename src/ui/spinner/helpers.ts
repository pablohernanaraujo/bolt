// /src/ui/spinner/helpers.ts
// Helper functions for Spinner component
// Provides utility functions for className building and style composition
// RELEVANT FILES: spinner.tsx, types.ts, spinner.css.ts

import * as styles from './spinner.css';
import type { SpinnerColorScheme, SpinnerSize } from './types';

/**
 * Builds the complete className for the Spinner component
 * Combines base styles with variant-specific styles
 *
 * @param size - Size variant of the spinner
 * @param colorScheme - Color scheme of the spinner
 * @param showTrack - Whether to show the background track
 * @param className - Additional custom classes
 * @returns Combined className string
 */
export const buildSpinnerClassName = (
  size: SpinnerSize,
  colorScheme: SpinnerColorScheme,
  showTrack: boolean,
  className?: string,
): string => {
  // Start with base styles
  const classes = [styles.spinner];

  // Add size styles
  classes.push(styles.sizes[size]);

  // Add color scheme styles
  classes.push(styles.colorSchemes[colorScheme]);

  // Add track visibility styles
  if (showTrack) {
    classes.push(styles.withTrack);
  }

  // Add custom className if provided
  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Gets the appropriate aria-valuetext based on the label
 * Provides better screen reader experience
 *
 * @param label - The loading label
 * @returns Formatted aria-valuetext
 */
export const getAriaValueText = (label: string): string => `${label}...`;
