// /src/ui/pagination/pagination.tsx
// Accessible pagination component built with React Aria Components
// Provides navigation through multiple pages with keyboard support and screen reader compatibility
// RELEVANT FILES: pagination.css.ts, types.ts, helpers.ts

'use client';
import { type FC, type ReactElement } from 'react';
import { Button as AriaButton } from 'react-aria-components';

import {
  buildPaginationClassName,
  defaultPaginationConfig,
  generatePaginationItems,
  validatePaginationProps,
} from './helpers';
import * as styles from './pagination.css';
import { type PaginationProps } from './types';

/**
 * Individual pagination button component
 * Renders different types of pagination items (page, navigation, ellipsis)
 */
interface PaginationButtonProps {
  type: 'page' | 'ellipsis' | 'first' | 'last' | 'previous' | 'next';
  page?: number;
  isActive?: boolean;
  disabled?: boolean;
  text?: React.ReactNode;
  ariaLabel?: string;
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'simple';
  onPageChange: (page: number) => void;
}

const PaginationButton: FC<PaginationButtonProps> = ({
  type,
  page,
  isActive = false,
  disabled = false,
  text,
  ariaLabel,
  size,
  variant,
  onPageChange,
}): ReactElement => {
  // Handle ellipsis (non-interactive)
  if (type === 'ellipsis') {
    return (
      <span
        className={`${styles.ellipsis} ${styles.sizes[size]}`}
        aria-label={ariaLabel}
        role="presentation"
      >
        {text}
      </span>
    );
  }

  // Handle interactive buttons
  const handlePress = (): void => {
    if (!disabled && page !== undefined) {
      onPageChange(page);
    }
  };

  const isNavigationButton = ['first', 'last', 'previous', 'next'].includes(
    type,
  );
  const buttonClassName = `${
    isNavigationButton ? styles.navigationButton : styles.paginationButton
  } ${styles.sizes[size]} ${styles.variants[variant]}`;

  return (
    <AriaButton
      className={buttonClassName}
      onPress={handlePress}
      isDisabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      aria-label={ariaLabel}
      data-variant={variant}
      data-size={size}
      data-type={type}
    >
      {text}
    </AriaButton>
  );
};

/**
 * Pagination component for navigating through multiple pages
 *
 * Features:
 * - Full keyboard navigation support (Arrow keys, Tab, Enter, Space)
 * - Screen reader compatibility with ARIA labels and navigation landmarks
 * - Responsive design with mobile-friendly controls
 * - Customizable appearance with variants and sizes
 * - Smart ellipsis handling for large page ranges
 * - Configurable first/last and previous/next buttons
 *
 * Based on Chakra UI pagination patterns with React Aria accessibility
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  size = defaultPaginationConfig.size,
  variant = defaultPaginationConfig.variant,
  showFirstLast = defaultPaginationConfig.showFirstLast,
  showPrevNext = defaultPaginationConfig.showPrevNext,
  maxVisiblePages = defaultPaginationConfig.maxVisiblePages,
  disabled = defaultPaginationConfig.disabled,
  className,
  previousText = defaultPaginationConfig.previousText,
  nextText = defaultPaginationConfig.nextText,
  firstText = defaultPaginationConfig.firstText,
  lastText = defaultPaginationConfig.lastText,
  pageAriaLabel = defaultPaginationConfig.pageAriaLabel,
  'aria-label': ariaLabel = defaultPaginationConfig['aria-label'],
}): ReactElement => {
  // Validate and normalize props
  const { currentPage: validCurrentPage, totalPages: validTotalPages } =
    validatePaginationProps(currentPage, totalPages);

  // Generate pagination items based on configuration
  const paginationItems = generatePaginationItems({
    currentPage: validCurrentPage,
    totalPages: validTotalPages,
    maxVisiblePages,
    showFirstLast,
    showPrevNext,
    disabled,
    previousText,
    nextText,
    firstText,
    lastText,
    pageAriaLabel,
  });

  // Build CSS class names
  const paginationClassName = buildPaginationClassName(
    variant,
    size,
    className,
  );
  const containerClassName = `${styles.pagination} ${styles.paginationGap[size]} ${paginationClassName}`;

  // Don't render if only one page
  if (validTotalPages <= 1) {
    return <></>;
  }

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel}
      className={containerClassName}
    >
      <ol
        className={styles.paginationSection}
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 'inherit',
        }}
      >
        {paginationItems.map((item) => (
          <li key={item.key} className={styles.paginationItem}>
            <PaginationButton
              type={item.type}
              page={item.page}
              isActive={item.isActive}
              disabled={item.disabled}
              text={item.text}
              ariaLabel={item.ariaLabel}
              size={size}
              variant={variant}
              onPageChange={onPageChange}
            />
          </li>
        ))}
      </ol>

      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>
        Page {validCurrentPage} of {validTotalPages}
      </div>
    </nav>
  );
};

/**
 * Pagination display name for debugging
 */
Pagination.displayName = 'Pagination';
