// /src/ui/checkbox/helpers.ts
// Utility functions and helpers for the Checkbox component
// Contains className builders and composition logic
// RELEVANT FILES: checkbox.tsx, checkbox.css.ts, types.ts

import * as styles from './checkbox.css';
import { type CheckboxProps } from './types';

/**
 * Build container className for the checkbox wrapper
 * Combines label position and custom className
 */
export const buildContainerClassName = (
  labelPosition: CheckboxProps['labelPosition'] = 'right',
  className?: string,
): string => {
  const positionClass =
    labelPosition === 'left'
      ? styles.checkboxContainerLabelLeft
      : styles.checkboxContainerLabelRight;

  return `${styles.checkboxContainer} ${positionClass} ${className ?? ''}`.trim();
};

/**
 * Build checkbox input className based on size and variant
 * Applies size-specific and variant-specific styles
 */
export const buildCheckboxClassName = (
  size: CheckboxProps['size'] = 'medium',
  variant: CheckboxProps['variant'] = 'primary',
  isSelected: boolean,
): string => {
  const sizeClass = styles.checkboxSizes[size];
  const variantClass = isSelected
    ? styles.checkboxVariants[variant]
    : styles.checkboxBase;

  return `${styles.checkboxInput} ${sizeClass} ${variantClass}`.trim();
};

/**
 * Build checkmark icon className
 * Applies size-specific styles for the check icon
 */
export const buildCheckmarkClassName = (
  size: CheckboxProps['size'] = 'medium',
): string =>
  `${styles.checkboxCheckmark} ${styles.checkmarkSizes[size]}`.trim();

/**
 * Build label className based on size
 * Applies appropriate text sizing for the label
 */
export const buildLabelClassName = (
  size: CheckboxProps['size'] = 'medium',
): string => `${styles.checkboxLabel} ${styles.labelSizes[size]}`.trim();
