/* eslint-disable max-statements */
/* eslint-disable max-params */
// /src/ui/breadcrumb/breadcrumb.tsx
// Main breadcrumb component implementation with compound component pattern
// Provides accessible navigation hierarchy with customizable separators and responsive design
// RELEVANT FILES: types.ts, breadcrumb.css.ts, index.ts

'use client';

import { ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import {
  createContext,
  type FC,
  type ReactElement,
  useContext,
  useState,
} from 'react';

import { Icon } from '@/icons';

import * as styles from './breadcrumb.css';
import {
  type BreadcrumbCurrentLinkProps,
  type BreadcrumbItemData,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbListProps,
  type BreadcrumbProps,
  type BreadcrumbRootProps,
  type BreadcrumbSeparatorProps,
  type BreadcrumbSize,
  type BreadcrumbVariant,
} from './types';

/**
 * Context for sharing breadcrumb configuration across components
 */
interface BreadcrumbContextValue {
  size: BreadcrumbSize;
  variant: BreadcrumbVariant;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  size: 'medium',
  variant: 'default',
});

/**
 * Hook to access breadcrumb context
 */
const useBreadcrumbContext = (): BreadcrumbContextValue => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('Breadcrumb components must be used within BreadcrumbRoot');
  }
  return context;
};

/**
 * Root container for breadcrumb navigation
 * Provides context and ARIA navigation landmark
 */
export const BreadcrumbRoot: FC<BreadcrumbRootProps> = ({
  children,
  size = 'medium',
  variant = 'default',
  className = '',
  'aria-label': ariaLabel = 'Breadcrumb navigation',
}): ReactElement => {
  const contextValue: BreadcrumbContextValue = {
    size,
    variant,
  };

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav
        className={`${styles.breadcrumbRoot} ${styles.breadcrumbVariants[variant]} ${className}`}
        aria-label={ariaLabel}
        role="navigation"
      >
        {children}
      </nav>
    </BreadcrumbContext.Provider>
  );
};

/**
 * Breadcrumb list container - holds all items and separators
 */
export const BreadcrumbList: FC<BreadcrumbListProps> = ({
  children,
  className = '',
}): ReactElement => {
  const { size } = useBreadcrumbContext();

  return (
    <ol
      className={`${styles.breadcrumbList} ${styles.breadcrumbListSizeVariants[size]} ${styles.breadcrumbResponsive} ${className}`}
    >
      {children}
    </ol>
  );
};

/**
 * Individual breadcrumb item container
 */
export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  children,
  className = '',
  icon,
  isCurrentPage = false,
}): ReactElement => (
  <li
    className={`${styles.breadcrumbItem} ${className}`}
    aria-current={isCurrentPage ? 'page' : undefined}
  >
    {icon && <span className={styles.breadcrumbIcon}>{icon}</span>}
    {children}
  </li>
);

/**
 * Clickable breadcrumb link for navigation
 */
export const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
  children,
  href,
  className = '',
  onClick,
  external = false,
}): ReactElement => {
  const { size } = useBreadcrumbContext();

  const linkProps = {
    className: `${styles.breadcrumbLinkBase} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`,
    onClick,
    title: typeof children === 'string' ? children : undefined,
  };

  if (external) {
    return (
      <a {...linkProps} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link {...linkProps} href={href}>
      {children}
    </Link>
  );
};

/**
 * Current page indicator (non-clickable)
 */
export const BreadcrumbCurrentLink: FC<BreadcrumbCurrentLinkProps> = ({
  children,
  className = '',
}): ReactElement => {
  const { size } = useBreadcrumbContext();

  return (
    <span
      className={`${styles.breadcrumbCurrentLink} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`}
      aria-current="page"
      title={typeof children === 'string' ? children : undefined}
    >
      {children}
    </span>
  );
};

/**
 * Separator between breadcrumb items
 */
export const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  children,
  className = '',
}): ReactElement => {
  const { size } = useBreadcrumbContext();

  return (
    <span
      className={`${styles.breadcrumbSeparator} ${styles.breadcrumbSeparatorSizeVariants[size]} ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {children || <Icon icon={ChevronRight} size="sm" />}
    </span>
  );
};

/**
 * Ellipsis component for collapsed breadcrumb items
 */
interface BreadcrumbEllipsisProps {
  items: BreadcrumbItemData[];
  className?: string;
}

const BreadcrumbEllipsis: FC<BreadcrumbEllipsisProps> = ({
  items,
  className = '',
}): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const { size } = useBreadcrumbContext();

  const handleClick = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <li className={styles.breadcrumbItem}>
      <button
        className={`${styles.breadcrumbEllipsis} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-label="Show collapsed breadcrumb items"
        title="Show collapsed breadcrumb items"
      >
        <Icon icon={MoreHorizontal} size="sm" />
      </button>

      {isOpen && (
        <div className={styles.breadcrumbDropdown}>
          {items.map((item) => (
            <BreadcrumbLink
              key={item.id}
              href={item.href!}
              className="truncate"
            >
              {item.icon && (
                <span className={styles.breadcrumbIcon}>{item.icon}</span>
              )}
              {item.label}
            </BreadcrumbLink>
          ))}
        </div>
      )}
    </li>
  );
};

/**
 * Helper function to render collapsed breadcrumbs with ellipsis
 */
const renderCollapsedBreadcrumbs = (
  items: BreadcrumbItemData[],
  separator: React.ReactNode,
  maxItems: number,
  itemsBeforeCollapse: number,
  itemsAfterCollapse: number,
): ReactElement[] => {
  if (items.length <= maxItems) {
    // No need to collapse, render all items
    return items.flatMap((item, index) => {
      const elements = [];

      // Add the item
      elements.push(
        <BreadcrumbItem
          key={item.id}
          icon={item.icon}
          isCurrentPage={item.isCurrentPage}
        >
          {item.isCurrentPage ? (
            <BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>
          ) : (
            <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>
          )}
        </BreadcrumbItem>,
      );

      // Add separator after item (except for last item)
      if (index < items.length - 1) {
        elements.push(
          <BreadcrumbSeparator key={`separator-${item.id}`}>
            {separator}
          </BreadcrumbSeparator>,
        );
      }

      return elements;
    });
  }

  // Collapse items
  const startItems = items.slice(0, itemsBeforeCollapse);
  const endItems = items.slice(-itemsAfterCollapse);
  const collapsedItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);

  const elements: ReactElement[] = [];

  // Render start items
  for (const item of startItems) {
    elements.push(
      <BreadcrumbItem
        key={item.id}
        icon={item.icon}
        isCurrentPage={item.isCurrentPage}
      >
        {item.isCurrentPage ? (
          <BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>
        ) : (
          <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>
        )}
      </BreadcrumbItem>,
    );
    elements.push(
      <BreadcrumbSeparator key={`separator-${item.id}`}>
        {separator}
      </BreadcrumbSeparator>,
    );
  }

  // Add ellipsis for collapsed items
  if (collapsedItems.length > 0) {
    elements.push(<BreadcrumbEllipsis key="ellipsis" items={collapsedItems} />);
    elements.push(
      <BreadcrumbSeparator key="separator-ellipsis">
        {separator}
      </BreadcrumbSeparator>,
    );
  }

  // Render end items
  for (const [index, item] of endItems.entries()) {
    elements.push(
      <BreadcrumbItem
        key={item.id}
        icon={item.icon}
        isCurrentPage={item.isCurrentPage}
      >
        {item.isCurrentPage ? (
          <BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>
        ) : (
          <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>
        )}
      </BreadcrumbItem>,
    );

    // Add separator after item (except for last item)
    if (index < endItems.length - 1) {
      elements.push(
        <BreadcrumbSeparator key={`separator-${item.id}`}>
          {separator}
        </BreadcrumbSeparator>,
      );
    }
  }

  return elements;
};

/**
 * Complete breadcrumb component with items array
 * Provides automatic separator insertion and optional truncation
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  items,
  size = 'medium',
  variant = 'default',
  separator,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  className,
  'aria-label': ariaLabel,
}): ReactElement => {
  // Ensure at least one item before and after collapse
  const safeItemsBeforeCollapse = Math.max(1, itemsBeforeCollapse);
  const safeItemsAfterCollapse = Math.max(1, itemsAfterCollapse);
  const safeMaxItems = maxItems ? Math.max(3, maxItems) : undefined; // Minimum 3 for meaningful collapse

  const breadcrumbElements = safeMaxItems
    ? renderCollapsedBreadcrumbs(
        items,
        separator,
        safeMaxItems,
        safeItemsBeforeCollapse,
        safeItemsAfterCollapse,
      )
    : items.flatMap((item, index) => {
        const elements = [];

        // Add the item
        elements.push(
          <BreadcrumbItem
            key={item.id}
            icon={item.icon}
            isCurrentPage={item.isCurrentPage}
          >
            {item.isCurrentPage ? (
              <BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>
            ) : (
              <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>,
        );

        // Add separator after item (except for last item)
        if (index < items.length - 1) {
          elements.push(
            <BreadcrumbSeparator key={`separator-${item.id}`}>
              {separator}
            </BreadcrumbSeparator>,
          );
        }

        return elements;
      });

  return (
    <BreadcrumbRoot
      size={size}
      variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      <BreadcrumbList>{breadcrumbElements}</BreadcrumbList>
    </BreadcrumbRoot>
  );
};
