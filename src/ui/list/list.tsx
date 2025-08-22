/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/list/list.tsx
// List component for displaying structured content in various formats
// Provides compound component pattern with List.Root and List.Item
// RELEVANT FILES: list.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { Icon } from '@/icons';

import {
  buildListItemClassName,
  buildListRootClassName,
  getListElement,
} from './helpers';
import * as styles from './list.css';
import { type ListItemProps, type ListRootProps } from './types';

/**
 * ListRoot component - Container for list items
 * Supports ordered, unordered, and basic list variants
 *
 * Features:
 * - Semantic HTML (ul, ol, or div based on variant)
 * - Configurable spacing between items
 * - Proper accessibility attributes
 * - Design token integration
 */
export const ListRoot = forwardRef<HTMLElement, ListRootProps>(
  (
    { variant = 'unordered', spacing = 'md', className, children, ...props },
    ref,
  ): ReactElement => {
    // Determine the correct HTML element based on variant
    const Element = getListElement(variant) as any;

    return (
      <Element
        ref={ref}
        className={buildListRootClassName(variant, spacing, className)}
        // Add role for accessibility when using basic variant
        role={variant === 'basic' ? 'list' : undefined}
        {...props}
      >
        {children}
      </Element>
    );
  },
);

ListRoot.displayName = 'List.Root';

/**
 * ListItem component - Individual item within a list
 * Supports optional icons, emphasis, and flexible styling
 *
 * Features:
 * - Optional icon support with proper alignment
 * - Complete emphasis system (weight, color, decoration, size)
 * - Flexible content layout
 * - Accessibility attributes
 * - Design token integration
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      icon,
      emphasis = 'high',
      weight = 'normal',
      decoration,
      size = 'base',
      colorScheme = 'default',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => (
    <li
      ref={ref}
      className={buildListItemClassName(
        !!icon,
        emphasis,
        weight,
        decoration,
        size,
        colorScheme,
        className,
      )}
      // Add role for accessibility when parent is basic variant
      role="listitem"
      {...props}
    >
      {icon && (
        <div className={styles.listItemIcon}>
          <Icon icon={icon} size="sm" />
        </div>
      )}
      <div className={styles.listItemContent}>{children}</div>
    </li>
  ),
);

ListItem.displayName = 'List.Item';

/**
 * Compound List component
 * Exports both Root and Item as properties for compound usage
 */
export const List = {
  Root: ListRoot,
  Item: ListItem,
};
