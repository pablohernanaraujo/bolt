// /src/ui/layout/vstack/types.ts
// Type definitions and interfaces for the VStack component
// Defines props for vertical stack layout with spacing and alignment options
// RELEVANT FILES: vstack.tsx, vstack.css.ts, helpers.ts

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
 * Alignment options for horizontal axis (align-items)
 * Controls how children align perpendicular to main axis (horizontally in VStack)
 */
export type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Justification options for vertical axis (justify-content)
 * Controls how children are distributed along main axis (vertically in VStack)
 */
export type JustifyValue =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/**
 * Base props for VStack component
 * Extends HTML div attributes with vertical layout-specific properties
 */
export interface VStackProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Space between child elements
   * Uses design system spacing tokens
   * @default '0'
   */
  space?: SpaceValue;

  /**
   * Horizontal alignment of children
   * Controls align-items CSS property (cross-axis)
   * @default 'stretch'
   */
  align?: AlignValue;

  /**
   * Vertical distribution of children
   * Controls justify-content CSS property (main-axis)
   * @default 'start'
   */
  justify?: JustifyValue;

  /**
   * Whether children should wrap to new columns
   * Enables flex-wrap when true
   * @default false
   */
  wrap?: boolean;

  /**
   * Reverse the order of children
   * Uses flex-direction: column-reverse
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
   * Child elements to arrange vertically
   */
  children: ReactNode;
}
