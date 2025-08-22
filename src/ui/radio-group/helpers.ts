// /src/ui/radio-group/helpers.ts
// Utility functions and helpers for the RadioGroup component
// Contains className builders and composition logic
// RELEVANT FILES: radio-group.tsx, radio-group.css.ts, types.ts

import * as styles from './radio-group.css';
import { type RadioGroupProps } from './types';

/**
 * Build radio group container className
 * Combines orientation and custom className
 */
export const buildRadioGroupClassName = (
  orientation: RadioGroupProps['orientation'] = 'vertical',
  className?: string,
): string => {
  const orientationClass =
    orientation === 'horizontal'
      ? styles.radioGroupHorizontal
      : styles.radioGroupVertical;

  return `${styles.radioGroup} ${orientationClass} ${className ?? ''}`.trim();
};

/**
 * Build label className based on size
 * Applies appropriate text sizing for the group label
 */
export const buildGroupLabelClassName = (
  size: RadioGroupProps['size'] = 'medium',
): string => `${styles.radioGroupLabel} ${styles.groupLabelSizes[size]}`.trim();
