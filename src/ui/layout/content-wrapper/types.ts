// /src/ui/layout/content-wrapper/types.ts
// Type definitions for Content Wrapper layout component
// Defines props interface for horizontal padding, variants, and borderless support
// RELEVANT FILES: content-wrapper.tsx, helpers.ts, ../../tokens/tokens.css.ts

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
 * Content Wrapper variant types for different semantic uses
 * Each variant has different default padding and intended usage
 */
export type ContentWrapperVariant = 'screen' | 'header' | 'body' | 'footer';

/**
 * Base Content Wrapper component props without polymorphic support
 * Provides horizontal padding control and variant-based styling
 */
interface BaseContentWrapperProps {
  /**
   * Semantic variant that determines default padding and usage context
   * @default "body"
   *
   * - screen: Full-screen content (24px default padding)
   * - header: Navigation/header areas (16px default padding)
   * - body: Main content areas (24px default padding)
   * - footer: Footer/action areas (16px default padding)
   */
  variant?: ContentWrapperVariant;

  /**
   * Horizontal padding (left and right) using design system space tokens
   * When specified, overrides the variant's default padding
   * When borderless=true, this prop is ignored and padding is set to 0
   */
  paddingX?: SpaceValue;

  /**
   * When true, removes all horizontal padding to allow clean nesting
   * Useful when you need to nest another ContentWrapper inside
   * @default false
   */
  borderless?: boolean;

  /**
   * Additional CSS class names to apply to the content wrapper
   * Merged with component's default classes
   */
  className?: string;

  /**
   * Child elements to render inside the content wrapper
   */
  children?: ReactNode;
}

/**
 * Polymorphic Content Wrapper component props
 * Allows rendering as different HTML elements while maintaining styling
 */
export type ContentWrapperProps<T extends ElementType = 'div'> =
  BaseContentWrapperProps &
    Omit<ComponentPropsWithoutRef<T>, keyof BaseContentWrapperProps> & {
      /**
       * The HTML element or React component to render as
       * @default "div"
       * @example "section" | "header" | "footer" | "main" | "article"
       */
      as?: T;
    };

/**
 * Content Wrapper component props with common element types
 * Used for simplified typing when polymorphic behavior is not needed
 */
export type SimpleContentWrapperProps =
  | ContentWrapperProps<'div'>
  | ContentWrapperProps<'section'>
  | ContentWrapperProps<'header'>
  | ContentWrapperProps<'footer'>
  | ContentWrapperProps<'main'>
  | ContentWrapperProps<'article'>;
