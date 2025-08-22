// /src/ui/list/types.ts
// Type definitions and interfaces for the List component
// Exports ListRootProps and ListItemProps interfaces with variant and spacing options
// RELEVANT FILES: list.tsx, index.ts, helpers.ts

import { type LucideIcon } from 'lucide-react';
import type React from 'react';
import { type HTMLAttributes, type ReactNode } from 'react';

/**
 * Props interface for the ListRoot component
 * Extends HTML ul/ol attributes with design system properties
 */
export interface ListRootProps extends HTMLAttributes<HTMLElement> {
  /**
   * List variant - determines semantic HTML element and styling
   * @default 'unordered'
   */
  variant?: 'unordered' | 'ordered' | 'basic';

  /**
   * Spacing between list items
   * Controls the gap between individual list items
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';

  /**
   * List items content
   */
  children: ReactNode;
}

/**
 * Props interface for the ListItem component
 * Extends HTML li attributes with design system properties
 */
export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Optional icon to display before the list item content
   */
  icon?: LucideIcon;

  /**
   * Text emphasis level using design tokens
   * Controls color opacity and visual weight
   * @default 'high'
   */
  emphasis?: 'high' | 'medium' | 'low' | 'pure';

  /**
   * Font weight for the list item
   * @default 'normal'
   */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /**
   * Text decoration style
   */
  decoration?: 'italic' | 'underline' | 'line-through';

  /**
   * Size variant for the list item text
   * @default 'base'
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';

  /**
   * Color scheme for special emphasis
   */
  colorScheme?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';

  /**
   * List item content
   */
  children: ReactNode;
}

/**
 * Combined List component type for compound component
 * Defines the shape of the compound List component with Root and Item sub-components
 */
export interface ListProps {
  Root: React.ForwardRefExoticComponent<
    ListRootProps & React.RefAttributes<HTMLElement>
  >;
  Item: React.ForwardRefExoticComponent<
    ListItemProps & React.RefAttributes<HTMLLIElement>
  >;
}
