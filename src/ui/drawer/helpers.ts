/* eslint-disable complexity */
/* eslint-disable max-statements */
// /src/ui/drawer/helpers.ts
// Utility functions and helpers for the Drawer component
// Provides className building and drawer state management utilities
// RELEVANT FILES: drawer.tsx, drawer.css.ts, types.ts

import clsx from 'clsx';

import * as styles from './drawer.css';
import {
  type DrawerAnimationSpeed,
  type DrawerPlacement,
  type DrawerSize,
} from './types';

/**
 * Builds the className for the drawer dialog container
 * Combines base styles with placement, size variant and custom classes
 *
 * @param placement - Placement of the drawer (left, right, top, bottom)
 * @param size - Size variant of the drawer
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildDrawerDialogClassName = (
  placement: DrawerPlacement = 'right',
  size: DrawerSize = 'medium',
  className?: string,
): string => {
  // Determine if placement is horizontal (left/right) or vertical (top/bottom)
  const isHorizontal = placement === 'left' || placement === 'right';

  // Choose the appropriate size variant based on placement
  const sizeStyles = isHorizontal
    ? styles.drawerSizesHorizontal[size]
    : styles.drawerSizesVertical[size];

  return clsx(
    styles.drawerDialog,
    styles.drawerPlacements[placement],
    sizeStyles,
    className,
  );
};

/**
 * Builds the className for drawer body
 * Handles special cases for drawers without header/footer
 *
 * @param hasHeader - Whether the drawer has a header
 * @param hasFooter - Whether the drawer has a footer
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildDrawerBodyClassName = (
  hasHeader: boolean = true,
  hasFooter: boolean = true,
  className?: string,
): string =>
  clsx(
    styles.drawerBody,
    !hasHeader && styles.drawerBodyNoHeader,
    !hasFooter && styles.drawerBodyNoFooter,
    className,
  );

/**
 * Builds the className for drawer footer
 *
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildDrawerFooterClassName = (className?: string): string =>
  clsx(styles.drawerFooter, className);

/**
 * Utility to manage body scroll lock when drawer is open
 * Prevents background scrolling while drawer is displayed
 * Reuses the same implementation as modal for consistency
 */
export const scrollLockManager = {
  /**
   * Lock body scroll
   * Adds overflow: hidden to document body
   */
  lock: (): void => {
    const body = document.body;
    body.style.overflow = 'hidden';
    body.setAttribute('data-scroll-locked', 'true');
  },

  /**
   * Unlock body scroll
   * Restores normal scrolling behavior
   */
  unlock: (): void => {
    const body = document.body;
    body.style.overflow = '';
    body.removeAttribute('data-scroll-locked');
  },

  /**
   * Check if scroll is currently locked
   * @returns Whether scroll is locked
   */
  isLocked: (): boolean => document.body.hasAttribute('data-scroll-locked'),
};

/**
 * Utility to get the appropriate aria-labelledby value
 * Used for accessibility when drawer has a title
 *
 * @param titleId - ID of the drawer title element
 * @returns aria-labelledby value or undefined
 */
export const getAriaLabelledBy = (titleId?: string): string | undefined =>
  titleId ? titleId : undefined;

/**
 * Generates a unique ID for drawer elements
 * Used for accessibility relationships between elements
 *
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const generateDrawerId = (prefix: string = 'drawer'): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Utility to determine optimal placement based on trigger position
 * Helps automatically position drawer to avoid viewport edges
 *
 * @param triggerElement - The element that triggered the drawer
 * @param preferredPlacement - User's preferred placement
 * @returns Optimal placement for the drawer
 */
export const getOptimalPlacement = (
  triggerElement?: HTMLElement,
  preferredPlacement: DrawerPlacement = 'right',
): DrawerPlacement => {
  if (!triggerElement) return preferredPlacement;

  const rect = triggerElement.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // If element is closer to left edge, prefer right placement
  if (
    rect.left < viewportWidth / 2 &&
    (preferredPlacement === 'left' || preferredPlacement === 'right')
  ) {
    return 'right';
  }

  // If element is closer to right edge, prefer left placement
  if (
    rect.right > viewportWidth / 2 &&
    (preferredPlacement === 'left' || preferredPlacement === 'right')
  ) {
    return 'left';
  }

  // If element is closer to top, prefer bottom placement
  if (
    rect.top < viewportHeight / 2 &&
    (preferredPlacement === 'top' || preferredPlacement === 'bottom')
  ) {
    return 'bottom';
  }

  // If element is closer to bottom, prefer top placement
  if (
    rect.bottom > viewportHeight / 2 &&
    (preferredPlacement === 'top' || preferredPlacement === 'bottom')
  ) {
    return 'top';
  }

  // Default to user preference
  return preferredPlacement;
};

/**
 * Gets animation timing values based on speed setting
 * Provides consistent animation durations across the design system
 *
 * @param speed - Animation speed setting
 * @returns Object with enter and exit durations in milliseconds
 */
export const getAnimationSpeed = (
  speed: DrawerAnimationSpeed = 'normal',
): { enter: number; exit: number } => {
  switch (speed) {
    case 'fast':
      return {
        enter: 150,
        exit: 100,
      };
    case 'slow':
      return {
        enter: 400,
        exit: 300,
      };
    case 'normal':
    default:
      return {
        enter: 300,
        exit: 200,
      };
  }
};

/**
 * Handles keyboard navigation within drawer
 * Manages focus trap and escape key handling
 */
export const drawerKeyboardHandler = {
  /**
   * Handles escape key press for drawer dismissal
   * @param event - Keyboard event
   * @param onClose - Close callback
   * @param isKeyboardDismissDisabled - Whether keyboard dismiss is disabled
   */
  handleEscape: (
    event: KeyboardEvent,
    onClose: () => void,
    isKeyboardDismissDisabled: boolean = false,
  ): void => {
    if (event.key === 'Escape' && !isKeyboardDismissDisabled) {
      event.preventDefault();
      onClose();
    }
  },

  /**
   * Gets all focusable elements within a container
   * @param container - Container element
   * @returns Array of focusable elements
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const focusableSelector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelector));
  },
};
