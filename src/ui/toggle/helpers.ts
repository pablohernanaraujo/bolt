// /src/ui/toggle/helpers.ts
// Helper functions for the Toggle component
// Provides className building utilities for state management
// RELEVANT FILES: toggle.tsx, toggle.css.ts, types.ts

import { clsx } from 'clsx';

import * as styles from './toggle.css';
import { type ToggleProps } from './types';

/**
 * Builds the className for the toggle container
 * Combines base styles with label position variant
 *
 * @param labelPosition - Position of label relative to toggle
 * @param className - Additional custom className
 * @returns Combined className string for container
 */
export const buildContainerClassName = (
  labelPosition: ToggleProps['labelPosition'] = 'right',
  className?: string,
): string =>
  clsx(styles.container, styles.labelPositions[labelPosition], className);

/**
 * Builds the className for the toggle track
 * Combines base track styles with size and checked state variants
 *
 * @param size - Size of the toggle
 * @param variant - Visual variant for checked state
 * @param isSelected - Whether toggle is checked/selected
 * @returns Combined className string for track
 */
export const buildTrackClassName = (
  size: ToggleProps['size'] = 'medium',
  variant: ToggleProps['variant'] = 'primary',
  isSelected: boolean,
): string => {
  // Build array of classes to combine
  const classes = [styles.track, styles.trackSizes[size]];

  // Add checked variant styles when selected
  if (isSelected) {
    classes.push(styles.checkedVariants[variant]);
  }

  return clsx(...classes);
};

/**
 * Builds the className for the toggle thumb
 * Combines base thumb styles with size and position based on state
 *
 * @param size - Size of the toggle
 * @param isSelected - Whether toggle is checked/selected
 * @returns Combined className string for thumb
 */
export const buildThumbClassName = (
  size: ToggleProps['size'] = 'medium',
  isSelected: boolean,
): string => {
  const classes = [styles.thumb, styles.thumbSizes[size]];

  // Apply checked position transform when selected
  if (isSelected) {
    classes.push(styles.thumbCheckedPositions[size]);
  }

  return clsx(...classes);
};

/**
 * Builds the className for the toggle label
 * Applies appropriate font size based on toggle size
 *
 * @param size - Size of the toggle
 * @returns Combined className string for label
 */
export const buildLabelClassName = (
  size: ToggleProps['size'] = 'medium',
): string => clsx(styles.label, styles.labelSizes[size]);
