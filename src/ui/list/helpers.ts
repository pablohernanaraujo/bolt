/* eslint-disable max-params */
// /src/ui/list/helpers.ts
// Utility functions and helpers for the List component
// Provides className composition and variant handling logic
// RELEVANT FILES: list.tsx, list.css.ts, types.ts

import clsx from 'clsx';

import * as styles from './list.css';
import { type ListItemProps, type ListRootProps } from './types';

/**
 * Builds the className for the ListRoot component
 * Combines base styles with variant and spacing modifiers
 */
export const buildListRootClassName = (
  variant: ListRootProps['variant'] = 'unordered',
  spacing: ListRootProps['spacing'] = 'md',
  className?: string,
): string =>
  clsx(
    styles.listRoot,
    styles.variants[variant],
    styles.spacing[spacing],
    className,
  );

/**
 * Builds the className for the ListItem component
 * Combines base styles with emphasis and optional modifiers
 */
export const buildListItemClassName = (
  hasIcon?: boolean,
  emphasis?: ListItemProps['emphasis'],
  weight?: ListItemProps['weight'],
  decoration?: ListItemProps['decoration'],
  size?: ListItemProps['size'],
  colorScheme?: ListItemProps['colorScheme'],
  className?: string,
): string =>
  clsx(
    styles.listItem,
    hasIcon && styles.listItemWithIcon,
    emphasis && styles.emphasis[emphasis],
    weight && styles.weight[weight],
    decoration && styles.decoration[decoration],
    size && styles.size[size],
    colorScheme && styles.colorScheme[colorScheme],
    className,
  );

/**
 * Determines the appropriate HTML element for the list variant
 * Returns semantic HTML tag based on variant type
 */
export const getListElement = (
  variant: ListRootProps['variant'],
): 'ul' | 'ol' | 'div' => {
  switch (variant) {
    case 'ordered':
      return 'ol';
    case 'basic':
      return 'div';
    case 'unordered':
    default:
      return 'ul';
  }
};
