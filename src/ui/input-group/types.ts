// /src/ui/input-group/types.ts
// Type definitions for InputGroup and related addon components
// Provides interfaces for group container, addons, and elements
// RELEVANT FILES: input-group.tsx, input-group.css.ts, ../input/types.ts

import { type HTMLAttributes, type ReactNode } from 'react';

/**
 * Base props for all input group components
 */
export interface InputGroupBaseProps {
  /**
   * Size of the input group and its children
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Visual variant of the input group
   * @default 'outline'
   */
  variant?: 'outline' | 'filled';
}

/**
 * Props for the InputGroup container component
 * Groups input with addons and elements
 */
export interface InputGroupProps
  extends InputGroupBaseProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Children elements (Input, addons, elements)
   */
  children: ReactNode;

  /**
   * Whether the group is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether the group has an error state
   * @default false
   */
  hasError?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for InputLeftAddon and InputRightAddon components
 * Static elements that extend the input visually
 */
export interface InputAddonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the addon
   */
  children: ReactNode;

  /**
   * Whether the addon is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for InputLeftElement and InputRightElement components
 * Overlay elements positioned inside the input
 */
export interface InputElementProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the element (typically an icon or button)
   */
  children: ReactNode;

  /**
   * Whether the element is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether this element contains an interactive element like a button
   * Affects pointer-events handling
   * @default false
   */
  isInteractive?: boolean;
}

/**
 * Context value for InputGroup
 * Provides shared state to child components
 */
export interface InputGroupContextValue {
  /**
   * Size of the input group
   */
  size: 'small' | 'medium' | 'large';

  /**
   * Visual variant of the input group
   */
  variant: 'outline' | 'filled';

  /**
   * Whether the group is disabled
   */
  isDisabled?: boolean;

  /**
   * Whether the group has an error state
   */
  hasError?: boolean;

  /**
   * Whether there's a left addon
   */
  hasLeftAddon?: boolean;

  /**
   * Whether there's a right addon
   */
  hasRightAddon?: boolean;

  /**
   * Whether there's a left element
   */
  hasLeftElement?: boolean;

  /**
   * Whether there's a right element
   */
  hasRightElement?: boolean;
}
