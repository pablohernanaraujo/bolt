/* eslint-disable complexity */
/* eslint-disable max-statements */
// /src/ui/pagination/helpers.ts
// Utility functions for pagination logic and page calculations
// Generates pagination items and handles complex page range logic
// RELEVANT FILES: pagination.tsx, types.ts, index.ts

import { type ReactNode } from 'react';

import { type PaginationConfig, type PaginationPageItem } from './types';

/**
 * Generates an array of pagination items based on configuration
 * Handles ellipsis insertion and navigation button generation
 * @param config - Pagination configuration object
 * @returns Array of pagination items to render
 */
export const generatePaginationItems = (
  config: PaginationConfig,
): PaginationPageItem[] => {
  const {
    currentPage,
    totalPages,
    maxVisiblePages,
    showFirstLast,
    showPrevNext,
    disabled,
    previousText,
    nextText,
    firstText,
    lastText,
    pageAriaLabel,
  } = config;

  const items: PaginationPageItem[] = [];

  // Add first page button if enabled and needed
  if (showFirstLast && totalPages > 1) {
    items.push({
      type: 'first',
      page: 1,
      disabled: disabled || currentPage === 1,
      text: firstText,
      ariaLabel: 'Go to first page',
      key: 'first',
    });
  }

  // Add previous page button if enabled
  if (showPrevNext && totalPages > 1) {
    items.push({
      type: 'previous',
      page: Math.max(1, currentPage - 1),
      disabled: disabled || currentPage === 1,
      text: previousText,
      ariaLabel: 'Go to previous page',
      key: 'previous',
    });
  }

  // Generate page number buttons with ellipsis handling
  const pageItems = generatePageItems(currentPage, totalPages, maxVisiblePages);
  for (const [index, item] of pageItems.entries()) {
    if (item.type === 'ellipsis') {
      items.push({
        type: 'ellipsis',
        disabled: true,
        text: '…',
        ariaLabel: 'More pages',
        key: `ellipsis-${index}`,
      });
    } else if (item.type === 'page' && item.page !== undefined) {
      items.push({
        type: 'page',
        page: item.page,
        isActive: item.page === currentPage,
        disabled: disabled,
        text: item.page.toString(),
        ariaLabel: pageAriaLabel(item.page),
        key: `page-${item.page}`,
      });
    }
  }

  // Add next page button if enabled
  if (showPrevNext && totalPages > 1) {
    items.push({
      type: 'next',
      page: Math.min(totalPages, currentPage + 1),
      disabled: disabled || currentPage === totalPages,
      text: nextText,
      ariaLabel: 'Go to next page',
      key: 'next',
    });
  }

  // Add last page button if enabled and needed
  if (showFirstLast && totalPages > 1) {
    items.push({
      type: 'last',
      page: totalPages,
      disabled: disabled || currentPage === totalPages,
      text: lastText,
      ariaLabel: 'Go to last page',
      key: 'last',
    });
  }

  return items;
};

/**
 * Generates page number items with ellipsis for large page ranges
 * Implements smart ellipsis insertion to keep pagination concise
 * @param currentPage - Current active page
 * @param totalPages - Total number of pages
 * @param maxVisiblePages - Maximum page buttons to show
 * @returns Array of page and ellipsis items
 */
export const generatePageItems = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): Array<{ type: 'page' | 'ellipsis'; page?: number }> => {
  // If total pages fit within max visible pages, show all
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => ({
      type: 'page' as const,
      page: i + 1,
    }));
  }

  const items: Array<{ type: 'page' | 'ellipsis'; page?: number }> = [];

  // Calculate boundaries for ellipsis insertion
  const sidePages = Math.floor((maxVisiblePages - 1) / 2);
  const leftBoundary = currentPage - sidePages;
  const rightBoundary = currentPage + sidePages;

  // Always show first page
  items.push({
    type: 'page',
    page: 1,
  } as const);

  // Add left ellipsis if needed
  if (leftBoundary > 2) {
    items.push({
      type: 'ellipsis',
    } as const);
  }

  // Add pages around current page
  const startPage = Math.max(2, leftBoundary);
  const endPage = Math.min(totalPages - 1, rightBoundary);

  for (let page = startPage; page <= endPage; page++) {
    // Skip page 1 if already added
    if (page === 1) continue;
    // Skip last page if it will be added later
    if (page === totalPages && totalPages > 1) continue;

    items.push({
      type: 'page',
      page,
    } as const);
  }

  // Add right ellipsis if needed
  if (rightBoundary < totalPages - 1) {
    items.push({
      type: 'ellipsis',
    } as const);
  }

  // Always show last page (if different from first)
  if (totalPages > 1) {
    items.push({
      type: 'page',
      page: totalPages,
    } as const);
  }

  return items;
};

/**
 * Validates pagination props and returns normalized values
 * Ensures currentPage is within valid bounds and totalPages is positive
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @returns Normalized pagination values
 */
export const validatePaginationProps = (
  currentPage: number,
  totalPages: number,
): { currentPage: number; totalPages: number } => {
  const normalizedTotalPages = Math.max(1, Math.floor(totalPages));
  const normalizedCurrentPage = Math.max(
    1,
    Math.min(normalizedTotalPages, Math.floor(currentPage)),
  );

  return {
    currentPage: normalizedCurrentPage,
    totalPages: normalizedTotalPages,
  };
};

/**
 * Builds CSS class names for pagination variants and states
 * Combines base classes with variant, size, and state modifiers
 * @param variant - Visual variant
 * @param size - Size variant
 * @param className - Additional custom class names
 * @returns Combined class name string
 */
export const buildPaginationClassName = (
  variant: 'default' | 'simple',
  size: 'small' | 'medium' | 'large',
  className?: string,
): string => {
  const baseClass = 'pagination';
  const variantClass = `pagination--${variant}`;
  const sizeClass = `pagination--${size}`;

  return [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');
};

/**
 * Default pagination configuration values
 * Provides sensible defaults for all configuration options
 */
export const defaultPaginationConfig = {
  maxVisiblePages: 5,
  showFirstLast: true,
  showPrevNext: true,
  disabled: false,
  size: 'medium' as const,
  variant: 'default' as const,
  previousText: 'Previous' as ReactNode,
  nextText: 'Next' as ReactNode,
  firstText: 'First' as ReactNode,
  lastText: 'Last' as ReactNode,
  pageAriaLabel: (page: number): string => `Go to page ${page}`,
  'aria-label': 'Pagination navigation',
};
