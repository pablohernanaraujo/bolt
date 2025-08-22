// /src/ui/spinner/spinner.tsx
// Spinner component for loading states
// Provides visual feedback during asynchronous operations
// RELEVANT FILES: spinner.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { buildSpinnerClassName, getAriaValueText } from './helpers';
import * as styles from './spinner.css';
import { type SpinnerProps } from './types';

/**
 * Spinner component for indicating loading states
 * Used to provide visual feedback during data fetching or processing
 *
 * Features:
 * - Multiple sizes (small, medium, large)
 * - Six color schemes matching the design system
 * - Optional background track for better visibility
 * - Fully accessible with ARIA attributes
 * - Smooth rotation animation
 * - Lightweight SVG-based implementation
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'medium',
      colorScheme = 'brand',
      showTrack = true,
      label = 'Loading',
      className,
      style,
      ...props
    },
    ref,
  ): ReactElement => {
    // Get size dimensions for SVG viewBox
    const sizeMap = {
      small: 16,
      medium: 24,
      large: 32,
    };
    const svgSize = sizeMap[size];
    const strokeWidth = size === 'small' ? 2 : size === 'medium' ? 2.5 : 3;
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${circumference * 0.75} ${circumference * 0.25}`;

    return (
      <div
        ref={ref}
        className={buildSpinnerClassName(
          size,
          colorScheme,
          showTrack,
          className,
        )}
        style={style}
        role="status"
        aria-label={label}
        aria-valuetext={getAriaValueText(label)}
        aria-busy="true"
        aria-live="polite"
        {...props}
      >
        {/* SVG spinner */}
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background track circle */}
          {showTrack && (
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className={styles.track}
            />
          )}

          {/* Animated spinner circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset="0"
            className={styles.spinnerElement}
          />
        </svg>

        {/* Visually hidden text for screen readers */}
        <span className={styles.visuallyHidden}>{label}</span>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';
