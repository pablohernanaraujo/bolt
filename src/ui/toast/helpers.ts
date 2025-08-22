// /src/ui/toast/helpers.ts
// Utility functions for toast management and styling
// Provides toast state management and className composition
// RELEVANT FILES: types.ts, toast.tsx, toast.css.ts

import * as styles from './toast.css';
import { type ToastPosition, type ToastVariant } from './types';

/**
 * Generate unique toast ID
 */
export const generateToastId = (): string =>
  `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Build className for toast container based on position
 */
export const buildToastContainerClassName = (
  position: ToastPosition,
): string => {
  const baseClassName = styles.toastContainer;
  const positionClassName = styles.toastContainerPositions[position];

  return `${baseClassName} ${positionClassName}`;
};

/**
 * Build className for individual toast based on variant and state
 */
export const buildToastClassName = (
  variant: ToastVariant,
  isVisible: boolean,
  className?: string,
): string => {
  const baseClassName = styles.toast;
  const variantClassName = styles.toastVariants[variant];
  const visibilityClassName = isVisible
    ? styles.toastVisible
    : styles.toastHidden;

  return [baseClassName, variantClassName, visibilityClassName, className]
    .filter(Boolean)
    .join(' ');
};

/**
 * Get default duration based on toast variant
 * Error toasts stay longer, others use default
 */
export const getDefaultDuration = (variant: ToastVariant): number => {
  switch (variant) {
    case 'error':
      return 8000; // Errors stay longer
    case 'warning':
      return 6000; // Warnings stay a bit longer
    case 'success':
    case 'info':
    default:
      return 5000; // Default duration
  }
};

/**
 * Get ARIA role based on toast variant
 */
export const getAriaRole = (variant: ToastVariant): string => {
  switch (variant) {
    case 'error':
    case 'warning':
      return 'alert'; // Immediate attention needed
    case 'success':
    case 'info':
    default:
      return 'status'; // General notification
  }
};

/**
 * Get position styles for toast container
 * Used by vanilla-extract for dynamic positioning
 */
export const getPositionStyles = (
  position: ToastPosition,
): Record<string, string> => {
  switch (position) {
    case 'top':
      return {
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      } as const;
    case 'bottom':
      return {
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      } as const;
    case 'top-left':
      return {
        top: '1rem',
        left: '1rem',
      } as const;
    case 'top-right':
      return {
        top: '1rem',
        right: '1rem',
      } as const;
    case 'bottom-left':
      return {
        bottom: '1rem',
        left: '1rem',
      } as const;
    case 'bottom-right':
      return {
        bottom: '1rem',
        right: '1rem',
      } as const;
    default:
      return {
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
      } as const;
  }
};

/**
 * Calculate stacking order for multiple toasts
 */
export const calculateZIndex = (index: number): number => {
  const baseZIndex = 1000; // Base z-index for toasts
  return baseZIndex + index;
};

/**
 * Determine if position is on top or bottom
 * Used for animation direction
 */
export const isTopPosition = (position: ToastPosition): boolean =>
  position.includes('top');
