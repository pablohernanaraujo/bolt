/* eslint-disable max-params */
// /src/ui/progress/helpers.ts
// Helper functions for Progress component
// Provides className building and value formatting utilities
// RELEVANT FILES: progress.tsx, types.ts, progress.css.ts

import * as styles from './progress.css';
import { type ProgressSize, type ProgressVariant } from './types';

/**
 * Builds className string for Progress component
 * Combines base styles with variant, size, and state modifiers
 *
 * @param variant - Color variant of the progress bar
 * @param size - Size variant of the progress bar
 * @param isStriped - Whether the progress bar should have stripes
 * @param isAnimated - Whether stripes should be animated
 * @param isIndeterminate - Whether progress is in indeterminate state
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildProgressClassName = (
  variant: ProgressVariant,
  size: ProgressSize,
  isStriped: boolean,
  isAnimated: boolean,
  isIndeterminate: boolean,
  className?: string,
): string => {
  const classes = [
    styles.progress({
      variant,
      size,
      isStriped,
      isAnimated,
      isIndeterminate,
    }),
  ];

  if (className) {
    classes.push(className);
  }

  return classes.filter(Boolean).join(' ');
};

/**
 * Default progress value formatter
 * Converts progress value to percentage string
 *
 * @param value - Current progress value
 * @param maxValue - Maximum possible value
 * @returns Formatted percentage string
 */
export const formatProgressValue = (
  value: number,
  maxValue: number,
): string => {
  const percentage = Math.round((value / maxValue) * 100);
  return `${percentage}%`;
};

/**
 * Custom formatter for file upload progress
 * Shows progress as "completed / total" format
 *
 * @param value - Current progress value
 * @param maxValue - Maximum possible value
 * @returns Formatted "value / maxValue" string
 */
export const formatFileProgressValue = (
  value: number,
  maxValue: number,
): string => `${value} / ${maxValue}`;

/**
 * Custom formatter for time-based progress
 * Shows progress with time units
 *
 * @param value - Current progress value in seconds
 * @param maxValue - Maximum possible value in seconds
 * @returns Formatted time string
 */
export const formatTimeProgressValue = (
  value: number,
  maxValue: number,
): string => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return `${formatTime(value)} / ${formatTime(maxValue)}`;
};

/**
 * Custom formatter for data transfer progress
 * Shows progress with appropriate data units (KB, MB, GB)
 *
 * @param value - Current progress value in bytes
 * @param maxValue - Maximum possible value in bytes
 * @returns Formatted data size string
 */
export const formatDataProgressValue = (
  value: number,
  maxValue: number,
): string => {
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return `${formatBytes(value)} / ${formatBytes(maxValue)}`;
};

/**
 * Determines the appropriate variant based on progress value
 * Useful for dynamic color changes based on completion
 *
 * @param value - Current progress value
 * @param maxValue - Maximum possible value
 * @returns Progress variant based on completion percentage
 */
export const getProgressVariantByValue = (
  value: number,
  maxValue: number,
): ProgressVariant => {
  const percentage = (value / maxValue) * 100;

  if (percentage >= 100) return 'success';
  if (percentage >= 75) return 'primary';
  if (percentage >= 50) return 'warning';
  return 'error';
};

/**
 * Calculates the progress percentage
 * Ensures value is within bounds and handles edge cases
 *
 * @param value - Current progress value
 * @param maxValue - Maximum possible value
 * @returns Clamped percentage between 0 and 100
 */
export const calculateProgressPercentage = (
  value: number,
  maxValue: number,
): number => {
  if (maxValue <= 0) return 0;
  return Math.min(Math.max((value / maxValue) * 100, 0), 100);
};

/**
 * Type guard to check if progress is indeterminate
 * Useful for conditional rendering and logic
 *
 * @param value - Progress value to check
 * @returns True if progress is indeterminate (value is undefined)
 */
export const isIndeterminateProgress = (
  value: number | undefined,
): value is undefined => value === undefined;
