// /src/ui/icon-button/helpers.ts
// Utility functions and helpers for the IconButton component
// Contains className composition logic and icon size mapping utilities
// RELEVANT FILES: icon-button.tsx, icon-button.css.ts, types.ts

import { type ButtonRenderProps } from 'react-aria-components';

import { type IconSize, iconSizes } from '@/icons';

import * as styles from './icon-button.css';
import { type IconButtonProps } from './types';

/**
 * Maps button sizes to appropriate icon sizes
 * Ensures visual consistency between button and icon proportions
 */
const buttonSizeToIconSize: Record<
  NonNullable<IconButtonProps['size']>,
  IconSize
> = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
};

/**
 * Gets the appropriate icon size for a given button size
 * Falls back to provided iconSize or auto-calculated size
 *
 * @param buttonSize - The size of the button (small, medium, large)
 * @param iconSize - Custom icon size override
 * @returns Icon size value (preset name or number)
 */
export const getIconSize = (
  buttonSize: IconButtonProps['size'] = 'medium',
  iconSize?: IconButtonProps['iconSize'],
): IconSize | number => {
  // Use custom iconSize if provided
  if (iconSize !== undefined) {
    return iconSize;
  }

  // Auto-calculate based on button size
  return buttonSizeToIconSize[buttonSize];
};

/**
 * Gets the numeric pixel value for an icon size
 * Converts preset names to actual pixel values
 *
 * @param size - Icon size (preset name or number)
 * @returns Numeric pixel value for the icon
 */
export const getIconSizeValue = (size: IconSize | number): number =>
  typeof size === 'number' ? size : iconSizes[size];

/**
 * Builds the complete className string for the icon button component
 * Combines base styles, variant styles, size styles, and additional classes
 *
 * @param variant - The button variant (primary, secondary, ghost, danger)
 * @param size - The button size (small, medium, large)
 * @param className - Additional className from props (can be string or function)
 * @param renderProps - React Aria render props for conditional styling
 * @returns Complete className string for the icon button
 */
export const buildIconButtonClassName = (
  variant: IconButtonProps['variant'] = 'primary',
  size: IconButtonProps['size'] = 'medium',
  className: IconButtonProps['className'],
  renderProps: ButtonRenderProps & { defaultClassName: string },
): string => {
  // Handle function className from React Aria
  const baseClassName =
    typeof className === 'function' ? className(renderProps) : className;

  // Build array of class names for easier management
  const classNames = [
    styles.iconButton,
    styles.variants[variant],
    styles.sizes[size],
  ];

  // Add external className if provided
  if (baseClassName) {
    classNames.push(baseClassName);
  }

  // Filter out undefined/empty values and join
  return classNames.filter(Boolean).join(' ').trim();
};
