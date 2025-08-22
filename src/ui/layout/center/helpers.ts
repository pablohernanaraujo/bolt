// /src/ui/layout/center/helpers.ts
// Helper functions for Center component className composition
// Provides utilities for combining center styles with custom classes
// RELEVANT FILES: center.tsx, center.css.ts, types.ts

import { styles } from './center.css';

/**
 * Props for building center className
 */
interface BuildCenterClassNameProps {
  /**
   * Additional CSS class name to append
   */
  className?: string;
}

/**
 * Builds complete className for Center component
 * Combines base center styles with optional custom className
 *
 * @param props - Configuration object with optional className
 * @returns Complete className string for Center component
 *
 * @example
 * ```tsx
 * const className = buildCenterClassName({ className: 'custom-class' });
 * // Returns: 'center_abc123 custom-class'
 * ```
 */
export const buildCenterClassName = ({
  className,
}: BuildCenterClassNameProps): string => {
  // Start with base center class
  const classes = [styles.center];

  // Add custom className if provided
  if (className) {
    classes.push(className);
  }

  // Join all classes with spaces
  return classes.join(' ');
};
