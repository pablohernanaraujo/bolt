// /src/ui/toast/types.ts
// TypeScript interfaces and types for Toast component
// Defines props, variants, and positioning options
// RELEVANT FILES: toast.tsx, helpers.ts, toast.css.ts

import { type ReactNode } from 'react';

/**
 * Toast variant types for different semantic meanings
 */
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast positioning options
 */
export type ToastPosition =
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/**
 * Toast status for accessibility
 */
export type ToastStatus = 'assertive' | 'polite';

/**
 * Individual Toast component props
 */
export interface ToastProps {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Toast variant for semantic styling
   * @default 'info'
   */
  variant?: ToastVariant;

  /**
   * Main title of the toast
   */
  title?: string;

  /**
   * Description or body content
   */
  description?: ReactNode;

  /**
   * Whether the toast can be dismissed manually
   * @default true
   */
  isClosable?: boolean;

  /**
   * Duration in milliseconds before auto-dismiss
   * Set to null to disable auto-dismiss
   * @default 5000
   */
  duration?: number | null;

  /**
   * Callback fired when toast is closed
   */
  onClose?: (id: string) => void;

  /**
   * ARIA status for screen readers
   * @default 'polite'
   */
  status?: ToastStatus;

  /**
   * Custom icon to override default variant icon
   */
  icon?: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Toast container/provider props
 */
export interface ToastProviderProps {
  /**
   * Children components
   */
  children: ReactNode;

  /**
   * Default position for all toasts
   * @default 'bottom'
   */
  position?: ToastPosition;

  /**
   * Maximum number of toasts to show
   * @default 5
   */
  max?: number;

  /**
   * Default duration for toasts
   * @default 5000
   */
  duration?: number;
}

/**
 * Toast context type for imperative API
 */
export interface ToastContextType {
  /**
   * Add a new toast
   */
  toast: (options: Omit<ToastProps, 'id'>) => string;

  /**
   * Close a specific toast
   */
  close: (id: string) => void;

  /**
   * Close all toasts
   */
  closeAll: () => void;

  /**
   * Update an existing toast
   */
  update: (id: string, options: Partial<ToastProps>) => void;
}

/**
 * Internal toast state
 */
export interface ToastState extends ToastProps {
  /**
   * Timestamp when toast was created
   */
  createdAt: number;

  /**
   * Whether toast is currently visible
   */
  isVisible: boolean;
}
