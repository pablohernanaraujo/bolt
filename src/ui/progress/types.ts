// /src/ui/progress/types.ts
// TypeScript definitions for Progress component
// Defines props interfaces, variants, and helper types for progress indicators
// RELEVANT FILES: progress.tsx, helpers.ts, progress.css.ts

import { type ComponentProps } from 'react';
import { type ProgressBar } from 'react-aria-components';

/**
 * Size variants for the Progress component
 * Controls the height and visual prominence of the progress bar
 */
export type ProgressSize = 'small' | 'medium' | 'large';

/**
 * Color variants for the Progress component
 * Determines the semantic meaning and visual appearance
 */
export type ProgressVariant = 'primary' | 'success' | 'warning' | 'error';

/**
 * Progress component state
 * Determines if the progress is determinate (with value) or indeterminate (loading)
 */
export type ProgressState = 'determinate' | 'indeterminate';

/**
 * Base props for the Progress component
 * Extends React Aria ProgressBar with design system specific props
 */
export interface ProgressProps extends ComponentProps<typeof ProgressBar> {
  /**
   * Visual variant that determines color and semantic meaning
   * @default 'primary'
   */
  variant?: ProgressVariant;

  /**
   * Size of the progress bar
   * @default 'medium'
   */
  size?: ProgressSize;

  /**
   * Optional label for the progress bar
   * Provides accessible description of what is loading/progressing
   */
  label?: string;

  /**
   * Whether to show the percentage value
   * Only applicable for determinate progress
   * @default false
   */
  showValue?: boolean;

  /**
   * Custom format function for the value display
   * Allows customization of how the progress value is presented
   */
  formatValue?: (value: number, maxValue: number) => string;

  /**
   * Whether the progress bar should be striped
   * Adds visual texture to the progress bar
   * @default false
   */
  isStriped?: boolean;

  /**
   * Whether the striped progress should be animated
   * Only works when isStriped is true
   * @default false
   */
  isAnimated?: boolean;

  /**
   * Additional CSS class name for custom styling
   */
  className?: string;
}

/**
 * Props for individual progress segments
 * Used internally for rendering progress track and fill
 */
export interface ProgressSegmentProps {
  variant: ProgressVariant;
  size: ProgressSize;
  isStriped?: boolean;
  isAnimated?: boolean;
  className?: string;
}
