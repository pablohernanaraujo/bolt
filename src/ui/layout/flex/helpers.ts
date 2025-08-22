// /src/ui/layout/flex/helpers.ts
// Helper functions and className composition utilities for the Flex component
// Handles building complete className strings from component props
// RELEVANT FILES: flex.tsx, flex.css.ts, types.ts

import * as styles from './flex.css';
import {
  type AlignValue,
  type FlexDirection,
  type FlexWrap,
  type JustifyValue,
  type SpaceValue,
} from './types';

/**
 * Parameters for building Flex className
 * All props that affect styling and CSS class composition
 */
export interface FlexClassNameProps {
  /**
   * Flex direction value
   */
  direction: FlexDirection;

  /**
   * Flex wrap value
   */
  wrap: FlexWrap;

  /**
   * Align items value
   */
  align: AlignValue;

  /**
   * Justify content value
   */
  justify: JustifyValue;

  /**
   * Gap value
   */
  gap: SpaceValue;

  /**
   * Additional className from props
   */
  className?: string;
}

/**
 * Builds the complete className string for the Flex component
 * Combines base styles with variant classes based on props
 *
 * @param props - The styling props for the Flex component
 * @returns Complete className string for the flex container
 *
 * @example
 * ```typescript
 * const className = buildFlexClassName({
 *   direction: 'row',
 *   wrap: 'nowrap',
 *   align: 'center',
 *   justify: 'between',
 *   gap: '4',
 *   className: 'custom-class'
 * });
 * // Returns: 'flex-base flex-direction-row flex-wrap-nowrap align-center justify-between gap-4 custom-class'
 * ```
 */
export const buildFlexClassName = ({
  direction,
  wrap,
  align,
  justify,
  gap,
  className,
}: FlexClassNameProps): string => {
  // Build array of class names starting with base flex styles
  const classNames = [
    styles.flexBase,
    styles.flexDirection[direction],
    styles.flexWrap[wrap],
    styles.alignItems[align],
    styles.justifyContent[justify],
    styles.flexGap[gap],
  ];

  // Add custom className if provided
  if (className) {
    classNames.push(className);
  }

  // Join all classes with spaces and return
  return classNames.join(' ');
};

/**
 * Determines if the current direction represents a column layout
 * Used for conditional logic that depends on flex direction
 *
 * @param direction - The flex direction value
 * @returns True if direction is column or column-reverse
 *
 * @example
 * ```typescript
 * isColumnDirection('column'); // true
 * isColumnDirection('row'); // false
 * isColumnDirection('column-reverse'); // true
 * ```
 */
export const isColumnDirection = (direction: FlexDirection): boolean =>
  direction === 'column' || direction === 'column-reverse';

/**
 * Determines if the current direction represents a reversed layout
 * Used for conditional logic that depends on direction reversal
 *
 * @param direction - The flex direction value
 * @returns True if direction is row-reverse or column-reverse
 *
 * @example
 * ```typescript
 * isReversedDirection('row-reverse'); // true
 * isReversedDirection('row'); // false
 * isReversedDirection('column-reverse'); // true
 * ```
 */
export const isReversedDirection = (direction: FlexDirection): boolean =>
  direction === 'row-reverse' || direction === 'column-reverse';
