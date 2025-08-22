// /src/ui/layout/container/types.ts
// Type definitions for Container layout component
// Defines props interface for vertical padding and polymorphic support
// RELEVANT FILES: container.tsx, helpers.ts, ../../tokens/tokens.css.ts

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Spacing values based on design system tokens
 * Maps to space tokens defined in tokens.css.ts
 */
export type SpaceValue =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '8'
  | '10'
  | '12'
  | '16'
  | '20'
  | '24';

/**
 * Base Container component props without polymorphic support
 * Provides vertical padding control for page layout containers
 */
interface BaseContainerProps {
  /**
   * Vertical padding (top and bottom) using design system space tokens
   * Controls the spacing above and below the container content
   * @default "6" (24px)
   */
  paddingY?: SpaceValue;

  /**
   * Additional CSS class names to apply to the container
   * Merged with component's default classes
   */
  className?: string;

  /**
   * Child elements to render inside the container
   */
  children?: ReactNode;
}

/**
 * Polymorphic Container component props
 * Allows rendering as different HTML elements while maintaining styling
 */
export type ContainerProps<T extends ElementType = 'div'> = BaseContainerProps &
  Omit<ComponentPropsWithoutRef<T>, keyof BaseContainerProps> & {
    /**
     * The HTML element or React component to render as
     * @default "div"
     * @example "main" | "section" | "article"
     */
    as?: T;
  };

/**
 * Container component props with default div element type
 * Used for simplified typing when polymorphic behavior is not needed
 */
export type SimpleContainerProps =
  | ContainerProps<'div'>
  | ContainerProps<'main'>
  | ContainerProps<'section'>
  | ContainerProps<'article'>;
