// /src/ui/popover/types.ts
// TypeScript type definitions for Popover component
// Defines interfaces for all popover-related components and their props
// RELEVANT FILES: popover.tsx, helpers.ts, popover.css.ts

import { type ReactNode } from 'react';
import { type DialogTriggerProps } from 'react-aria-components';

/**
 * Placement options for the popover relative to its trigger
 */
export type PopoverPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom';

/**
 * Size variants for the popover
 */
export type PopoverSize = 'small' | 'medium' | 'large';

/**
 * Visual variants for the popover
 */
export type PopoverVariant = 'default' | 'inverse' | 'accent';

/**
 * Props for the PopoverTrigger component
 */
export interface PopoverTriggerProps extends DialogTriggerProps {
  /**
   * Delay in milliseconds before showing popover on hover
   * @default 700
   */
  delay?: number;
  /**
   * Delay in milliseconds before hiding popover
   * @default 0
   */
  closeDelay?: number;
  /**
   * Children elements (trigger and popover)
   */
  children: ReactNode;
}

/**
 * Props for the main Popover component
 */
export interface PopoverProps {
  /**
   * Position of the popover relative to trigger element
   * @default 'top'
   */
  placement?: PopoverPlacement;
  /**
   * Size variant of the popover
   * @default 'medium'
   */
  size?: PopoverSize;
  /**
   * Visual variant of the popover
   * @default 'default'
   */
  variant?: PopoverVariant;
  /**
   * Distance in pixels from trigger element
   * If not provided, uses default based on size
   */
  offset?: number;
  /**
   * Whether to show arrow pointing to trigger
   * @default false
   */
  showArrow?: boolean;
  /**
   * Maximum width of popover in pixels
   * @default 320
   */
  maxWidth?: number;
  /**
   * Whether popover can be dismissed by clicking outside or pressing escape
   * @default true
   */
  isDismissable?: boolean;
  /**
   * Whether keyboard dismiss is disabled
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Popover content
   */
  children: ReactNode;
}

/**
 * Props for the PopoverContent structured component
 */
export interface PopoverContentProps {
  /**
   * Optional header title
   */
  title?: string;
  /**
   * Whether to show close button in header
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to show header separator
   * @default true
   */
  showHeaderDivider?: boolean;
  /**
   * Content for the popover body
   */
  children: ReactNode;
  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for the PopoverHeader component
 */
export interface PopoverHeaderProps {
  /**
   * Header title text
   */
  title?: string;
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Whether to show bottom divider
   * @default true
   */
  showDivider?: boolean;
  /**
   * Custom header content (in addition to or instead of title)
   */
  children?: ReactNode;
  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for the PopoverBody component
 */
export interface PopoverBodyProps {
  /**
   * Body content
   */
  children: ReactNode;
  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for the PopoverFooter component
 */
export interface PopoverFooterProps {
  /**
   * Footer content (typically action buttons)
   */
  children: ReactNode;
  /**
   * Whether to show top divider
   * @default true
   */
  showDivider?: boolean;
  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * Props for the PopoverArrow component
 */
export interface PopoverArrowProps {
  /**
   * Visual variant matching the popover
   * @default 'default'
   */
  variant?: PopoverVariant;
  /**
   * Custom CSS class name
   */
  className?: string;
}
