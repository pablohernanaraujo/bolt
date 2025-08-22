// /src/ui/layout/container/helpers.ts
// Helper functions for Container component className building and utilities
// Handles CSS class composition for different container configurations
// RELEVANT FILES: container.tsx, types.ts, container.css.ts

import { clsx } from 'clsx';

import * as styles from './container.css';
import { type SpaceValue } from './types';

/**
 * Props for building Container className
 * Used internally by buildContainerClassName helper
 */
interface BuildContainerClassNameProps {
  /**
   * Vertical padding value from space tokens
   */
  paddingY?: SpaceValue;

  /**
   * Additional class names to merge
   */
  className?: string;
}

/**
 * Builds complete className string for Container component
 * Combines base styles with padding variations and custom classes
 *
 * @param props - Configuration for className building
 * @returns Complete className string for the container
 *
 * @example
 * ```tsx
 * buildContainerClassName({ paddingY: '6', className: 'custom-class' })
 * // Returns: 'base-container padding-6 custom-class'
 * ```
 */
export const buildContainerClassName = ({
  paddingY = '6',
  className,
}: BuildContainerClassNameProps): string =>
  clsx(
    // Base container styles (always full width)
    styles.base,

    // Vertical padding variation based on paddingY prop
    styles.paddingVariants[paddingY],

    // Custom classes passed from parent
    className,
  );
