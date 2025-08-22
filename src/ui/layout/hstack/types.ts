// /src/ui/layout/hstack/types.ts
// Type definitions and interfaces for the HStack component
// Defines props for horizontal stack layout with spacing and alignment options
// RELEVANT FILES: hstack.tsx, hstack.css.ts, helpers.ts

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
 * Alignment options for vertical axis (align-items)
 * Controls how children align perpendicular to main axis
 */
export type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Justification options for horizontal axis (justify-content)
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
 * Base props for HStack component
 * Extends HTML div attributes with layout-specific properties
 */
export interface HStackProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Space between child elements
   * Uses design system spacing tokens
   * @default '0'
   */
  space?: SpaceValue;

  /**
   * Vertical alignment of children
   * Controls align-items CSS property
   * @default 'stretch'
   */
  align?: AlignValue;

  /**
   * Horizontal distribution of children
   * Controls justify-content CSS property
   * @default 'start'
   */
  justify?: JustifyValue;

  /**
   * Whether children should wrap to new lines
   * Enables flex-wrap when true
   * @default false
   */
  wrap?: boolean;

  /**
   * Reverse the order of children
   * Uses flex-direction: row-reverse
   * @default false
   */
  reversed?: boolean;

  /**
   * HTML element to render as
   * Allows polymorphic component usage
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Child elements to arrange horizontally
   */
  children: ReactNode;
}
