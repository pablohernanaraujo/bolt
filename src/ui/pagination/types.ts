// /src/ui/pagination/types.ts
// Type definitions and interfaces for the Pagination component
// Defines props for pagination navigation with accessibility support
// RELEVANT FILES: pagination.tsx, helpers.ts, index.ts

import { type ReactNode } from 'react';

/**
 * Props interface for the Pagination component
 * Controls pagination behavior, appearance, and interactions
 */
export interface PaginationProps {
  /**
   * Current active page (1-based indexing)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback fired when page changes
   * @param page - The new page number (1-based)
   */
  onPageChange: (page: number) => void;

  /**
   * Size variant for the pagination controls
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Visual variant for styling
   * @default 'default'
   */
  variant?: 'default' | 'simple';

  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;

  /**
   * Whether to show previous/next page buttons
   * @default true
   */
  showPrevNext?: boolean;

  /**
   * Maximum number of page buttons to show (excluding first/last/prev/next)
   * When exceeded, ellipsis will be used
   * @default 5
   */
  maxVisiblePages?: number;

  /**
   * Whether the entire pagination is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom aria-label for the navigation
   * @default 'Pagination navigation'
   */
  'aria-label'?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Custom text for previous button
   * @default 'Previous'
   */
  previousText?: ReactNode;

  /**
   * Custom text for next button
   * @default 'Next'
   */
  nextText?: ReactNode;

  /**
   * Custom text for first page button
   * @default 'First'
   */
  firstText?: ReactNode;

  /**
   * Custom text for last page button
   * @default 'Last'
   */
  lastText?: ReactNode;

  /**
   * Custom aria-label for page buttons
   * Function receives page number and returns aria-label string
   * @default (page) => `Go to page ${page}`
   */
  pageAriaLabel?: (page: number) => string;
}

/**
 * Internal interface for pagination page items
 * Used by helpers to generate page button data
 */
export interface PaginationPageItem {
  /**
   * Type of pagination item
   */
  type: 'page' | 'ellipsis' | 'first' | 'last' | 'previous' | 'next';

  /**
   * Page number (1-based) for page items
   */
  page?: number;

  /**
   * Whether this item is currently active
   */
  isActive?: boolean;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;

  /**
   * Display text for the item
   */
  text?: ReactNode;

  /**
   * Aria label for the item
   */
  ariaLabel?: string;

  /**
   * Unique key for React rendering
   */
  key: string;
}

/**
 * Configuration for pagination page generation
 * Used internally by helper functions
 */
export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
  disabled: boolean;
  previousText: ReactNode;
  nextText: ReactNode;
  firstText: ReactNode;
  lastText: ReactNode;
  pageAriaLabel: (page: number) => string;
}
