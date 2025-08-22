/* eslint-disable max-params */
// /src/ui/button/helpers.ts
// Utility functions and helpers for the Button component
// Contains className composition logic and other button-specific utilities
// RELEVANT FILES: button.tsx, button.css.ts, types.ts

import { type ButtonRenderProps } from 'react-aria-components';

import * as styles from './button.css';
import { type ButtonProps } from './types';

/**
 * Builds the complete className string for the button component
 * Combines base styles, variant styles, size styles, and conditional modifiers
 *
 * @param variant - The button variant (primary, secondary, ghost, danger)
 * @param size - The button size (small, medium, large)
 * @param fullWidth - Whether button should be full width
 * @param className - Additional className from props (can be string or function)
 * @param renderProps - React Aria render props for conditional styling
 * @returns Complete className string for the button
 */
export const buildButtonClassName = (
  variant: ButtonProps['variant'] = 'primary',
  size: ButtonProps['size'] = 'medium',
  fullWidth: ButtonProps['fullWidth'] = false,
  className: ButtonProps['className'],
  renderProps: ButtonRenderProps & { defaultClassName: string },
): string => {
  // Handle function className from React Aria
  const baseClassName =
    typeof className === 'function' ? className(renderProps) : className;

  // Build array of class names for easier management
  const classNames = [
    styles.button,
    styles.variants[variant],
    styles.sizes[size],
  ];

  // Add conditional modifiers
  if (fullWidth) {
    classNames.push(styles.fullWidth);
  }

  // Add external className if provided
  if (baseClassName) {
    classNames.push(baseClassName);
  }

  // Filter out undefined/empty values and join
  return classNames.filter(Boolean).join(' ').trim();
};
