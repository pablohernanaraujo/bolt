// /src/ui/layout/hstack/helpers.ts
// Utility functions and helpers for the HStack component
// Contains className composition logic for building HStack styles
// RELEVANT FILES: hstack.tsx, hstack.css.ts, types.ts

import * as styles from './hstack.css';
import { type HStackProps } from './types';

/**
 * Builds the complete className string for the HStack component
 * Combines base styles with spacing, alignment, and modifier variants
 *
 * @param props - HStack component props
 * @returns Complete className string for the HStack
 */
export const buildHStackClassName = (props: {
  space?: HStackProps['space'];
  align?: HStackProps['align'];
  justify?: HStackProps['justify'];
  wrap?: HStackProps['wrap'];
  reversed?: HStackProps['reversed'];
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
    styles.hstack,

    // Space variant - gap between children
    styles.space[space],

    // Alignment variant - vertical alignment
    styles.align[align],

    // Justification variant - horizontal distribution
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
