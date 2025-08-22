// /src/ui/accordion/types.ts
// Type definitions for Accordion component
// Defines props and interfaces for accordion and accordion items
// RELEVANT FILES: accordion.tsx, helpers.ts, index.ts

import { type ReactNode } from 'react';

/**
 * Selection mode for accordion
 */
export type AccordionSelectionMode = 'single' | 'multiple';

/**
 * Visual variant for accordion styling
 */
export type AccordionVariant = 'default' | 'bordered' | 'separated';

/**
 * Size variant for accordion
 */
export type AccordionSize = 'small' | 'medium' | 'large';

/**
 * Props for individual accordion item
 */
export interface AccordionItemProps {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Header content of the accordion item
   */
  title: ReactNode;

  /**
   * Content revealed when item is expanded
   */
  children: ReactNode;

  /**
   * Whether the item is disabled
   */
  isDisabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Icon to show in the header (optional)
   */
  icon?: ReactNode;
}

/**
 * Props for the Accordion component
 */
export interface AccordionProps {
  /**
   * Array of accordion items
   */
  items?: AccordionItemProps[];

  /**
   * Children can be AccordionItem components for more control
   */
  children?: ReactNode;

  /**
   * Selection mode - single or multiple items can be expanded
   */
  selectionMode?: AccordionSelectionMode;

  /**
   * Visual variant of the accordion
   */
  variant?: AccordionVariant;

  /**
   * Size of the accordion
   */
  size?: AccordionSize;

  /**
   * Controlled expanded keys
   */
  expandedKeys?: Set<string> | string[];

  /**
   * Default expanded keys for uncontrolled mode
   */
  defaultExpandedKeys?: Set<string> | string[];

  /**
   * Callback when expanded keys change
   */
  onExpandedChange?: (keys: Set<string>) => void;

  /**
   * Whether the accordion takes full width
   */
  fullWidth?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether to allow all items to be collapsed in single mode
   */
  allowAllClosed?: boolean;

  /**
   * Disable animation for expand/collapse
   */
  disableAnimation?: boolean;
}

/**
 * Render props passed to className builder
 */
export interface AccordionRenderProps {
  isExpanded?: boolean;
  isFocused?: boolean;
  isDisabled?: boolean;
  isPressed?: boolean;
  isFocusVisible?: boolean;
}
