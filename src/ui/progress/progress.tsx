// /src/ui/progress/progress.tsx
// Accessible progress component built with React Aria Components
// Provides determinate and indeterminate progress indicators with full accessibility
// RELEVANT FILES: progress.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import { ProgressBar } from 'react-aria-components';

import { buildProgressClassName, formatProgressValue } from './helpers';
import * as styles from './progress.css';
import { type ProgressProps } from './types';

/**
 * Progress component for showing task completion or loading states
 * Built on React Aria Components for robust accessibility
 *
 * Features:
 * - Determinate and indeterminate states
 * - Multiple color variants (primary, success, warning, error)
 * - Three sizes (small, medium, large)
 * - Optional labels and value display
 * - Striped and animated variants
 * - Complete keyboard navigation and screen reader support
 * - ARIA attributes handled automatically
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      label,
      showValue = false,
      formatValue = formatProgressValue,
      isStriped = false,
      isAnimated = false,
      className,
      value,
      maxValue = 100,
      ...props
    },
    ref,
  ): ReactElement => {
    // Determine if progress is indeterminate (no value provided)
    const isIndeterminate = value === undefined;

    // Calculate percentage for determinate progress
    const percentage = isIndeterminate
      ? 0
      : Math.min((value / maxValue) * 100, 100);

    // Format the display value
    const displayValue = isIndeterminate ? '' : formatValue(value, maxValue);

    return (
      <div className={label ? styles.progressWithLabel : undefined} ref={ref}>
        {/* Label row with optional value display */}
        {label && (
          <div className={styles.labelRow}>
            <span className={styles.progressLabel}>{label}</span>
            {showValue && !isIndeterminate && (
              <span className={styles.progressValue}>{displayValue}</span>
            )}
          </div>
        )}

        {/* Progress bar component */}
        <ProgressBar
          value={value}
          maxValue={maxValue}
          className={buildProgressClassName(
            variant,
            size,
            isStriped,
            isAnimated,
            isIndeterminate,
            className,
          )}
          {...props}
        >
          {({ percentage: ariaPercentage }) => (
            <>
              {/* Progress track (background) */}
              <div
                className={`${styles.progressTrack} ${styles.trackSizes[size]} ${
                  isIndeterminate ? styles.indeterminateTrack : ''
                }`}
              >
                {/* Progress bar (foreground) */}
                <div
                  className={`${styles.progressBar} ${styles.barVariants[variant]} ${
                    isIndeterminate ? styles.indeterminate : ''
                  }`}
                  style={{
                    width: isIndeterminate
                      ? '30%'
                      : `${ariaPercentage || percentage}%`,
                  }}
                >
                  {/* Striped overlay if enabled */}
                  {isStriped && (
                    <div
                      className={`${styles.stripedOverlay} ${
                        isAnimated ? styles.animatedStripes : ''
                      }`}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </ProgressBar>
      </div>
    );
  },
);

Progress.displayName = 'Progress';
