// /src/ui/divider/types.ts
// Type definitions for Divider component
// Defines orientation, variant, size, and spacing options for visual separation
// RELEVANT FILES: divider.tsx, helpers.ts, divider.css.ts

import { type ComponentProps } from 'react';

/**
 * Divider orientation options
 * Controls whether the divider is horizontal or vertical
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider visual style variants
 * Different line styles for various design needs
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Divider thickness size options
 * Controls the width/height of the divider line
 */
export type DividerSize = 'thin' | 'medium' | 'thick';

/**
 * Divider spacing options
 * Controls margin around the divider for separation
 */
export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';

/**
 * Props for the Divider component
 * Extends HTML div element props with design system properties
 */
export interface DividerProps extends ComponentProps<'div'> {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Visual style variant of the divider
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Thickness size of the divider
   * @default 'thin'
   */
  size?: DividerSize;

  /**
   * Spacing around the divider
   * @default 'medium'
   */
  spacing?: DividerSpacing;

  /**
   * Custom CSS class name
   */
  className?: string;
}
