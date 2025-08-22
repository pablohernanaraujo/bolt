// /src/ui/layout/flex/types.ts
// Type definitions and interfaces for the Flex component
// Unified flexbox layout component combining HStack and VStack capabilities
// RELEVANT FILES: flex.tsx, flex.css.ts, helpers.ts

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';

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
 * Flex direction options
 * Controls the main axis direction and order of flex items
 */
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Flex wrap options
 * Controls whether flex items wrap to new lines
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Alignment options for cross axis (align-items)
 * Controls how children align perpendicular to main axis
 */
export type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Justification options for main axis (justify-content)
 * Controls how children are distributed along main axis
 */
export type JustifyValue =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * Base props for Flex component
 * Extends HTML div attributes with flexbox-specific properties
 */
export interface FlexProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Primary axis direction and item order
   * Controls flex-direction CSS property
   * @default 'row'
   */
  direction?: FlexDirection;

  /**
   * Whether flex items should wrap to new lines
   * Controls flex-wrap CSS property
   * @default 'nowrap'
   */
  wrap?: FlexWrap;

  /**
   * Cross-axis alignment of children
   * Controls align-items CSS property
   * @default 'stretch'
   */
  align?: AlignValue;

  /**
   * Main-axis distribution of children
   * Controls justify-content CSS property
   * @default 'start'
   */
  justify?: JustifyValue;

  /**
   * Gap between child elements
   * Uses design system spacing tokens
   * @default '0'
   */
  gap?: SpaceValue;

  /**
   * HTML element to render as
   * Allows polymorphic component usage
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Child elements to arrange with flexbox
   */
  children: ReactNode;
}
