// /src/ui/radio/helpers.ts
// Utility functions and helpers for the Radio component
// Contains className builders and composition logic
// RELEVANT FILES: radio.tsx, radio.css.ts, types.ts

import * as styles from './radio.css';
import { type RadioProps } from './types';

/**
 * Build radio input className based on size and variant
 * Applies size-specific and variant-specific styles
 */
export const buildRadioClassName = (
  size: RadioProps['size'] = 'medium',
  variant: RadioProps['variant'] = 'primary',
  isSelected: boolean,
): string => {
  const sizeClass = styles.radioSizes[size];
  const variantClass = isSelected
    ? styles.radioVariants[variant]
    : styles.radioBase;

  return `${styles.radioInput} ${sizeClass} ${variantClass}`.trim();
};

/**
 * Build radio dot className
 * Applies size-specific and variant-specific styles for the inner dot
 */
export const buildRadioDotClassName = (
  size: RadioProps['size'] = 'medium',
  variant: RadioProps['variant'] = 'primary',
): string =>
  `${styles.radioDot} ${styles.radioDotSizes[size]} ${styles.radioDotVariants[variant]}`.trim();

/**
 * Build label className based on size
 * Applies appropriate text sizing for the radio label
 */
export const buildRadioLabelClassName = (
  size: RadioProps['size'] = 'medium',
): string => `${styles.radioLabel} ${styles.radioLabelSizes[size]}`.trim();
