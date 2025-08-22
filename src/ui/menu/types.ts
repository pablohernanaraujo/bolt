/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/menu/types.ts
// TypeScript interfaces and types for Menu components
// Defines props for MenuTrigger, Menu, MenuItem, and related components
// RELEVANT FILES: menu.tsx, helpers.ts, menu.css.ts

import { type Key, type ReactElement, type ReactNode } from 'react';
import { type MenuTriggerProps as AriaMenuTriggerProps } from 'react-aria-components';

/**
 * Placement options for menu positioning relative to trigger
 * Supports all standard positions with start/end variants
 */
export type MenuPlacement =
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
 * Size variants for menu component
 * Controls padding, font size, and spacing
 */
export type MenuSize = 'small' | 'medium' | 'large';

/**
 * Visual variants for menu styling
 * Affects background, borders, and color scheme
 */
export type MenuVariant = 'default' | 'accent' | 'inverse';

/**
 * MenuItem variants for different item types
 * Controls styling for different types of menu items
 */
export type MenuItemVariant = 'default' | 'danger' | 'success' | 'warning';

/**
 * Props for MenuTrigger component
 * Container that handles trigger element and menu overlay
 */
export interface MenuTriggerProps
  extends Omit<AriaMenuTriggerProps, 'children'> {
  /**
   * Trigger element and Menu component
   * First child should be the trigger, second should be Menu
   */
  children: [ReactElement, ReactElement];
}

/**
 * Props for Menu component
 * Main menu container with items
 */
export interface MenuProps {
  /**
   * Menu items or render function for dynamic items
   * Can be static MenuItem elements or function for collections
   */
  children: ReactNode | ((item: any) => ReactElement);

  /**
   * Menu placement relative to trigger
   * @default 'bottom start'
   */
  placement?: MenuPlacement;

  /**
   * Size variant of menu
   * @default 'medium'
   */
  size?: MenuSize;

  /**
   * Visual variant of menu
   * @default 'default'
   */
  variant?: MenuVariant;

  /**
   * Custom offset from trigger in pixels
   * @default 4
   */
  offset?: number;

  /**
   * Maximum width of menu in pixels
   * @default 320
   */
  maxWidth?: number;

  /**
   * Minimum width of menu in pixels
   * @default 200
   */
  minWidth?: number;

  /**
   * Whether menu should close on selection
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Handler called when an item is selected
   * Receives the key of the selected item
   */
  onAction?: (key: Key) => void;

  /**
   * Items for dynamic collections
   * Alternative to static children
   */
  items?: Iterable<any>;

  /**
   * Whether menu can be dismissed by clicking outside
   * @default true
   */
  isDismissable?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Disabled state for entire menu
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props for MenuItem component
 * Individual selectable menu item
 */
export interface MenuItemProps {
  /**
   * Content of the menu item
   * Can include icons, text, and other elements
   */
  children: ReactNode;

  /**
   * Unique key for the item
   * Used in onAction handlers and selection
   */
  id?: Key;

  /**
   * Text value for accessibility and searching
   * Auto-generated from children if not provided
   */
  textValue?: string;

  /**
   * Visual variant of menu item
   * @default 'default'
   */
  variant?: MenuItemVariant;

  /**
   * Whether item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Handler called when item is selected
   * Alternative to Menu's onAction
   */
  onAction?: () => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Shortcut text to display on the right
   * For keyboard shortcuts or additional info
   */
  shortcut?: string;

  /**
   * Icon to display before the text
   */
  startIcon?: ReactElement;

  /**
   * Icon to display after the text
   */
  endIcon?: ReactElement;
}

/**
 * Props for MenuSection component
 * Groups related menu items with optional heading
 */
export interface MenuSectionProps {
  /**
   * Section title/heading
   * Optional label for the section
   */
  title?: string;

  /**
   * Menu items within this section
   */
  children: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for MenuSeparator component
 * Visual divider between menu sections or items
 */
export interface MenuSeparatorProps {
  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Collection item interface for dynamic menus
 * Standardized structure for menu items from external data
 */
export interface MenuCollectionItem {
  /**
   * Unique identifier for the item
   */
  id: Key;

  /**
   * Display text for the item
   */
  label: string;

  /**
   * Optional description or subtitle
   */
  description?: string;

  /**
   * Whether item is disabled
   */
  isDisabled?: boolean;

  /**
   * Visual variant for the item
   */
  variant?: MenuItemVariant;

  /**
   * Icon component to display
   */
  icon?: ReactElement;

  /**
   * Keyboard shortcut text
   */
  shortcut?: string;

  /**
   * Optional section/group identifier
   */
  section?: string;
}
