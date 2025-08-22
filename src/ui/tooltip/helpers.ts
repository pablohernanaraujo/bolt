// /src/ui/tooltip/helpers.ts
// Utility functions and helpers for the Tooltip component
// Provides className builders and positioning logic
// RELEVANT FILES: tooltip.tsx, types.ts, tooltip.css.ts

import clsx from 'clsx';

import * as styles from './tooltip.css';
import { type TooltipSize, type TooltipVariant } from './types';

/**
 * Builds the className for the tooltip container
 * Combines base styles with size and variant modifiers
 */
export const buildTooltipClassName = (
  size: TooltipSize = 'medium',
  variant: TooltipVariant = 'default',
  className?: string,
): string =>
  clsx(styles.tooltip, styles.sizes[size], styles.variants[variant], className);

/**
 * Builds the className for the tooltip arrow
 * Combines base arrow styles with variant-specific arrow colors
 */
export const buildTooltipArrowClassName = (
  variant: TooltipVariant = 'default',
): string => clsx(styles.arrow, styles.arrowVariants[variant]);

/**
 * Converts tooltip placement to React Aria placement prop
 * Handles the translation between our design system placement names
 * and React Aria's placement system
 */
export const getAriaPlacement = (placement: string = 'top'): string => {
  // Map our placement names to React Aria placement values
  const placementMap: Record<string, string> = {
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    start: 'start',
    end: 'end',
    'top start': 'top start',
    'top end': 'top end',
    'bottom start': 'bottom start',
    'bottom end': 'bottom end',
    'left top': 'left top',
    'left bottom': 'left bottom',
    'right top': 'right top',
    'right bottom': 'right bottom',
  };

  return placementMap[placement] || 'top';
};

/**
 * Calculates the appropriate offset value based on size
 * Larger tooltips need more spacing from their trigger elements
 */
export const getOffsetForSize = (
  size: TooltipSize = 'medium',
  customOffset?: number,
): number => {
  if (customOffset !== undefined) {
    return customOffset;
  }

  const offsetMap: Record<TooltipSize, number> = {
    small: 6,
    medium: 8,
    large: 10,
  };

  return offsetMap[size];
};

/**
 * Determines if the tooltip content should wrap
 * Based on content length and maxWidth settings
 */
export const shouldWrapContent = (
  content: string,
  maxWidth: number = 300,
): boolean =>
  // Simple heuristic: if content is longer than ~40 characters, enable wrapping
  // This helps prevent very wide tooltips with long text
  content.length > 40 || maxWidth < 200;
