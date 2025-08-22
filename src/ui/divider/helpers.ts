/* eslint-disable max-params */
// /src/ui/divider/helpers.ts
// Helper functions for Divider component className composition
// Combines orientation, variant, size, and spacing styles based on props
// RELEVANT FILES: divider.css.ts, types.ts, divider.tsx

import { clsx } from 'clsx';

import * as styles from './divider.css';
import {
  type DividerOrientation,
  type DividerSize,
  type DividerSpacing,
  type DividerVariant,
} from './types';

/**
 * Build the complete className for the Divider component
 * Combines base styles with orientation, variant, size, and spacing modifiers
 *
 * @param orientation - Horizontal or vertical orientation
 * @param variant - Visual style variant (solid, dashed, dotted)
 * @param size - Thickness size (thin, medium, thick)
 * @param spacing - Margin spacing around the divider
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildDividerClassName = (
  orientation: DividerOrientation,
  variant: DividerVariant,
  size: DividerSize,
  spacing: DividerSpacing,
  className?: string,
): string =>
  clsx(
    // Base divider styles
    styles.divider,

    // Orientation styles (horizontal/vertical base dimensions)
    styles.orientations[orientation],

    // Variant styles based on orientation
    // Vertical dividers need different pattern handling
    orientation === 'vertical'
      ? styles.verticalVariants[variant]
      : styles.variants[variant],

    // Size styles based on orientation
    // Different dimension control for horizontal vs vertical
    orientation === 'vertical'
      ? styles.verticalSizes[size]
      : styles.horizontalSizes[size],

    // Spacing styles based on orientation
    // Vertical margins for horizontal dividers, horizontal margins for vertical
    orientation === 'vertical'
      ? styles.verticalSpacing[spacing]
      : styles.horizontalSpacing[spacing],

    // Custom className
    className,
  );

/**
 * Get appropriate ARIA role for the divider
 * Returns 'separator' for semantic separation
 *
 * @param orientation - Horizontal or vertical orientation
 * @returns ARIA role value
 */
export const getDividerRole = (orientation: DividerOrientation): string =>
  'separator';

/**
 * Get appropriate ARIA orientation attribute
 * Important for screen readers to understand divider direction
 *
 * @param orientation - Horizontal or vertical orientation
 * @returns ARIA orientation value
 */
export const getDividerAriaOrientation = (
  orientation: DividerOrientation,
): DividerOrientation => orientation;
