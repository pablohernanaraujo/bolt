// /src/ui/modal/helpers.ts
// Utility functions and helpers for the Modal component
// Provides className building and modal state management utilities
// RELEVANT FILES: modal.tsx, modal.css.ts, types.ts

import clsx from 'clsx';

import * as styles from './modal.css';
import { type ModalSize } from './types';

/**
 * Builds the className for the modal dialog container
 * Combines base styles with size variant and custom classes
 *
 * @param size - Size variant of the modal
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildModalDialogClassName = (
  size: ModalSize = 'medium',
  className?: string,
): string => clsx(styles.modalDialog, styles.modalSizes[size], className);

/**
 * Builds the className for modal body
 * Handles special cases for modals without header/footer
 *
 * @param hasHeader - Whether the modal has a header
 * @param hasFooter - Whether the modal has a footer
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildModalBodyClassName = (
  hasHeader: boolean = true,
  hasFooter: boolean = true,
  className?: string,
): string =>
  clsx(
    styles.modalBody,
    !hasHeader && styles.modalBodyNoHeader,
    !hasFooter && styles.modalBodyNoFooter,
    className,
  );

/**
 * Builds the className for modal footer
 *
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildModalFooterClassName = (className?: string): string =>
  clsx(styles.modalFooter, className);

/**
 * Utility to manage body scroll lock when modal is open
 * Prevents background scrolling while modal is displayed
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
 * Used for accessibility when modal has a title
 *
 * @param titleId - ID of the modal title element
 * @returns aria-labelledby value or undefined
 */
export const getAriaLabelledBy = (titleId?: string): string | undefined =>
  titleId ? titleId : undefined;

/**
 * Generates a unique ID for modal elements
 * Used for accessibility relationships between elements
 *
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
export const generateModalId = (prefix: string = 'modal'): string =>
  `${prefix}-${Math.random().toString(36).slice(2, 11)}`;

/**
 * Handles keyboard navigation within modal
 * Manages focus trap and escape key handling
 */
export const modalKeyboardHandler = {
  /**
   * Handles escape key press for modal dismissal
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
