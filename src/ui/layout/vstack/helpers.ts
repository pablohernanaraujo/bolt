// /src/ui/layout/vstack/helpers.ts
// Utility functions and helpers for the VStack component
// Contains className composition logic for building VStack styles
// RELEVANT FILES: vstack.tsx, vstack.css.ts, types.ts

import { type VStackProps } from './types';
import * as styles from './vstack.css';

/**
 * Builds the complete className string for the VStack component
 * Combines base styles with spacing, alignment, and modifier variants
 *
 * @param props - VStack component props
 * @returns Complete className string for the VStack
 */
export const buildVStackClassName = (props: {
  space?: VStackProps['space'];
  align?: VStackProps['align'];
  justify?: VStackProps['justify'];
  wrap?: VStackProps['wrap'];
  reversed?: VStackProps['reversed'];
  className?: string;
}): string => {
  const {
    space = '0',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    reversed = false,
    className,
  } = props;

  // Build array of class names for easier management
  const classNames = [
    // Base styles - always included
    styles.vstack,

    // Space variant - gap between children
    styles.space[space],

    // Alignment variant - horizontal alignment (cross-axis in column layout)
    styles.align[align],

    // Justification variant - vertical distribution (main-axis in column layout)
    styles.justify[justify],
  ];

  // Add conditional modifiers
  if (wrap) {
    classNames.push(styles.wrap);
  }

  if (reversed) {
    classNames.push(styles.reversed);
  }

  // Add external className if provided
  if (className) {
    classNames.push(className);
  }

  // Filter out undefined/empty values and join
  return classNames.filter(Boolean).join(' ').trim();
};

/**
 * Type guard to check if a value is a valid space value
 * Helps with runtime validation if needed
 *
 * @param value - Value to check
 * @returns Whether the value is a valid SpaceValue
 */
export const isValidSpaceValue = (value: unknown): boolean => {
  const validValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '8',
    '10',
    '12',
    '16',
    '20',
    '24',
  ];
  return typeof value === 'string' && validValues.includes(value);
};
