// /src/ui/breadcrumb/types.ts
// TypeScript interfaces and types for breadcrumb component
// Defines props for all breadcrumb subcomponents with accessibility support
// RELEVANT FILES: breadcrumb.tsx, breadcrumb.css.ts

import { type ReactElement, type ReactNode } from 'react';

/**
 * Size variants for breadcrumb component
 */
export type BreadcrumbSize = 'small' | 'medium' | 'large';

/**
 * Visual variants for breadcrumb styling
 */
export type BreadcrumbVariant = 'default' | 'subtle';

/**
 * Props for the root breadcrumb container
 */
export interface BreadcrumbRootProps {
  /**
   * Breadcrumb content (typically BreadcrumbList)
   */
  children: ReactNode;

  /**
   * Size variant for the entire breadcrumb
   * @default 'medium'
   */
  size?: BreadcrumbSize;

  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: BreadcrumbVariant;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * ARIA label for the breadcrumb navigation
   * @default 'Breadcrumb navigation'
   */
  'aria-label'?: string;
}

/**
 * Props for the breadcrumb list container
 */
export interface BreadcrumbListProps {
  /**
   * Breadcrumb items and separators
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Props for individual breadcrumb items
 */
export interface BreadcrumbItemProps {
  /**
   * Item content (typically BreadcrumbLink or BreadcrumbCurrentLink)
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Optional icon to display before the item text
   */
  icon?: ReactElement;

  /**
   * Whether this is the current/active item
   * Used for styling and accessibility
   * @default false
   */
  isCurrentPage?: boolean;
}

/**
 * Props for breadcrumb links (clickable navigation items)
 */
export interface BreadcrumbLinkProps {
  /**
   * Link text content
   */
  children: ReactNode;

  /**
   * URL to navigate to when clicked
   */
  href: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Click handler for custom navigation
   */
  onClick?: () => void;

  /**
   * Whether to open in new tab/window
   * @default false
   */
  external?: boolean;
}

/**
 * Props for the current page link (non-clickable, represents current location)
 */
export interface BreadcrumbCurrentLinkProps {
  /**
   * Current page text content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Props for breadcrumb separators
 */
export interface BreadcrumbSeparatorProps {
  /**
   * Custom separator content (defaults to chevron right icon)
   */
  children?: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Individual breadcrumb item data for programmatic usage
 */
export interface BreadcrumbItemData {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Display text for the breadcrumb item
   */
  label: string;

  /**
   * URL for navigation (omit for current page)
   */
  href?: string;

  /**
   * Optional icon element
   */
  icon?: ReactElement;

  /**
   * Whether this is the current page
   */
  isCurrentPage?: boolean;
}

/**
 * Props for programmatic breadcrumb usage with items array
 */
export interface BreadcrumbProps extends Omit<BreadcrumbRootProps, 'children'> {
  /**
   * Array of breadcrumb items to render
   */
  items: BreadcrumbItemData[];

  /**
   * Custom separator component or string
   * @default ChevronRight icon
   */
  separator?: ReactNode;

  /**
   * Maximum number of items to show before truncating with ellipsis
   * @default undefined (no truncation)
   */
  maxItems?: number;

  /**
   * Number of items to show at the start when truncating
   * @default 1
   */
  itemsBeforeCollapse?: number;

  /**
   * Number of items to show at the end when truncating
   * @default 1
   */
  itemsAfterCollapse?: number;
}
