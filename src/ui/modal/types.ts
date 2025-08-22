// /src/ui/modal/types.ts
// Type definitions and interfaces for the Modal component
// Exports ModalProps interface extending React Aria Modal and DialogTrigger props
// RELEVANT FILES: modal.tsx, index.ts, helpers.ts

import { type ReactNode } from 'react';
import {
  type DialogProps,
  type DialogTriggerProps,
  type ModalOverlayProps,
} from 'react-aria-components';

/**
 * Size variants for the Modal component
 * Controls the maximum width of the modal dialog
 * - small: 400px max width
 * - medium: 600px max width
 * - large: 800px max width
 * - full: Full screen modal covering entire viewport
 */
export type ModalSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Props for the Modal component
 * Combines React Aria ModalOverlay and Dialog props with design system extensions
 */
export interface ModalProps extends Omit<ModalOverlayProps, 'children'> {
  /**
   * Size variant of the modal
   * Controls the maximum width and responsive behavior
   * @default 'medium'
   */
  size?: ModalSize;

  /**
   * Whether the modal can be dismissed by clicking outside or pressing Escape
   * @default true
   */
  isDismissable?: boolean;

  /**
   * Whether the Escape key is disabled for dismissing the modal
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;

  /**
   * Content of the modal dialog
   * Can be a render prop that receives dialog close function
   */
  children: ReactNode | ((close: () => void) => ReactNode);
}

/**
 * Props for the ModalTrigger component
 * Wraps React Aria DialogTrigger with design system conventions
 */
export interface ModalTriggerProps extends DialogTriggerProps {
  /**
   * Trigger element (typically a Button)
   * Should be a clickable element that opens the modal
   */
  children: [ReactNode, ReactNode];
}

/**
 * Props for the ModalContent component
 * Extends React Aria Dialog props for the modal's inner content
 */
export interface ModalContentProps extends DialogProps {
  /**
   * Title of the modal
   * Used for accessibility and as the dialog heading
   */
  title?: string;

  /**
   * Whether to show a close button in the modal header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Content of the modal
   * Main body content of the modal dialog
   */
  children: ReactNode;
}

/**
 * Props for modal header section
 */
export interface ModalHeaderProps {
  /**
   * Title text for the modal
   */
  title?: string;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Additional header content
   */
  children?: ReactNode;
}

/**
 * Props for modal body section
 */
export interface ModalBodyProps {
  /**
   * Body content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Props for modal footer section
 */
export interface ModalFooterProps {
  /**
   * Footer content (typically buttons)
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}
