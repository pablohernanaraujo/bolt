// /src/ui/popover/helpers.ts
// Helper functions for Popover component
// Utilities for building classNames, converting placements, and calculating offsets
// RELEVANT FILES: popover.tsx, types.ts, popover.css.ts

import * as styles from './popover.css';
import {
  type PopoverPlacement,
  type PopoverSize,
  type PopoverVariant,
} from './types';

/**
 * Build className for popover container
 * Combines base styles with size and variant modifiers
 */
export const buildPopoverClassName = (
  size: PopoverSize,
  variant: PopoverVariant,
  className?: string,
): string => {
  const classNames = [
    styles.popover,
    styles.popoverSizes[size],
    styles.popoverVariants[variant],
  ];

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Build className for popover arrow
 * Applies variant-specific styles to arrow element
 */
export const buildPopoverArrowClassName = (
  variant: PopoverVariant,
  className?: string,
): string => {
  const classNames = [
    styles.popoverArrow,
    styles.popoverArrowVariants[variant],
  ];

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Build className for popover header
 */
export const buildPopoverHeaderClassName = (
  showDivider: boolean,
  className?: string,
): string => {
  const classNames = [styles.popoverHeader];

  if (showDivider) {
    classNames.push(styles.popoverHeaderWithDivider);
  }

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Build className for popover body
 */
export const buildPopoverBodyClassName = (
  hasHeader?: boolean,
  hasFooter?: boolean,
  className?: string,
): string => {
  const classNames = [styles.popoverBody];

  if (hasHeader) {
    classNames.push(styles.popoverBodyWithHeader);
  }

  if (hasFooter) {
    classNames.push(styles.popoverBodyWithFooter);
  }

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Build className for popover footer
 */
export const buildPopoverFooterClassName = (
  showDivider: boolean,
  className?: string,
): string => {
  const classNames = [styles.popoverFooter];

  if (showDivider) {
    classNames.push(styles.popoverFooterWithDivider);
  }

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Check if placement is on vertical axis (top/bottom)
 * Used for conditional styling and positioning logic
 */
export const isVerticalPlacement = (placement: PopoverPlacement): boolean =>
  placement.includes('top') || placement.includes('bottom');

/**
 * Check if placement is on horizontal axis (left/right)
 * Used for conditional styling and positioning logic
 */
export const isHorizontalPlacement = (placement: PopoverPlacement): boolean =>
  placement.includes('left') || placement.includes('right');

/**
 * Get opposite placement for arrow positioning
 * Used internally for arrow direction calculations
 */
export const getOppositeArrowDirection = (
  placement: PopoverPlacement,
): string => {
  if (placement.includes('top')) return 'bottom';
  if (placement.includes('bottom')) return 'top';
  if (placement.includes('left')) return 'right';
  if (placement.includes('right')) return 'left';
  return 'bottom'; // default
};

/**
 * Validate popover content for accessibility
 * Ensures proper ARIA attributes and structure
 */
export const validatePopoverContent = (
  hasTitle: boolean,
  hasInteractiveContent: boolean,
): { role: string; 'aria-modal'?: boolean } => {
  // For popovers with interactive content, use dialog role
  if (hasInteractiveContent) {
    return {
      role: 'dialog',
      'aria-modal': false, // Popovers are not modal by default
    };
  }

  // For simple informational popovers, use tooltip or region
  if (hasTitle) {
    return { role: 'region' };
  }

  return { role: 'tooltip' };
};
