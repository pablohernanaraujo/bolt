// /src/ui/layout/grid/types.ts
// Type definitions for Grid and GridItem components
// Defines props interfaces and shared types for grid layout components
// RELEVANT FILES: grid.tsx, grid-item.tsx, helpers.ts

import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';

import { type SpaceValue } from '../hstack';

/**
 * Grid template values for columns and rows
 * Supports common patterns like repeat(), minmax(), fr units
 */
export type GridTemplate = string;

/**
 * Grid gap values using design system spacing tokens
 */
export type GridGap = SpaceValue;

/**
 * Grid auto-sizing values
 */
export type GridAuto = string;

/**
 * Grid line positioning values
 * Supports positive integers, negative integers, and span notation
 */
export type GridLine = number | string;

/**
 * Grid area names for named grid areas
 */
export type GridArea = string;

/**
 * Props for the Grid component
 * Main container for CSS Grid layouts
 */
export interface GridProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * CSS grid-template-columns property
   * Defines the columns of the grid with explicit sizing
   *
   * @example
   * ```tsx
   * <Grid templateColumns="repeat(3, 1fr)">
   * <Grid templateColumns="200px 1fr 100px">
   * <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
   * ```
   */
  templateColumns?: GridTemplate;

  /**
   * CSS grid-template-rows property
   * Defines the rows of the grid with explicit sizing
   *
   * @example
   * ```tsx
   * <Grid templateRows="repeat(3, 100px)">
   * <Grid templateRows="auto 1fr auto">
   * ```
   */
  templateRows?: GridTemplate;

  /**
   * CSS grid-template-areas property
   * Defines named grid areas for easier positioning
   *
   * @example
   * ```tsx
   * <Grid templateAreas={`
   *   "header header"
   *   "sidebar main"
   *   "footer footer"
   * `}>
   * ```
   */
  templateAreas?: string;

  /**
   * CSS gap property (shorthand for row-gap and column-gap)
   * Sets both row and column gaps using design system tokens
   */
  gap?: GridGap;

  /**
   * CSS column-gap property
   * Sets spacing between columns using design system tokens
   */
  columnGap?: GridGap;

  /**
   * CSS row-gap property
   * Sets spacing between rows using design system tokens
   */
  rowGap?: GridGap;

  /**
   * CSS grid-auto-columns property
   * Sets the size of auto-generated columns
   *
   * @example
   * ```tsx
   * <Grid autoColumns="minmax(0, 1fr)">
   * <Grid autoColumns="100px">
   * ```
   */
  autoColumns?: GridAuto;

  /**
   * CSS grid-auto-rows property
   * Sets the size of auto-generated rows
   *
   * @example
   * ```tsx
   * <Grid autoRows="minmax(100px, auto)">
   * <Grid autoRows="1fr">
   * ```
   */
  autoRows?: GridAuto;

  /**
   * CSS grid-auto-flow property
   * Controls how auto-placed items flow in the grid
   */
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';

  /**
   * HTML element to render as
   * Allows polymorphic component usage
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Child elements to arrange in the grid
   */
  children?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}

/**
 * Props for the GridItem component
 * Individual items within a Grid container
 */
export interface GridItemProps
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * CSS grid-column-start property
   * Starting column line for the grid item
   */
  colStart?: GridLine;

  /**
   * CSS grid-column-end property
   * Ending column line for the grid item
   */
  colEnd?: GridLine;

  /**
   * CSS grid-column property (shorthand)
   * Spans across specified number of columns
   *
   * @example
   * ```tsx
   * <GridItem colSpan={2}> // Spans 2 columns
   * <GridItem colSpan="1 / 3"> // From line 1 to line 3
   * ```
   */
  colSpan?: GridLine;

  /**
   * CSS grid-row-start property
   * Starting row line for the grid item
   */
  rowStart?: GridLine;

  /**
   * CSS grid-row-end property
   * Ending row line for the grid item
   */
  rowEnd?: GridLine;

  /**
   * CSS grid-row property (shorthand)
   * Spans across specified number of rows
   *
   * @example
   * ```tsx
   * <GridItem rowSpan={2}> // Spans 2 rows
   * <GridItem rowSpan="1 / 3"> // From line 1 to line 3
   * ```
   */
  rowSpan?: GridLine;

  /**
   * CSS grid-area property
   * Places item in a named grid area
   *
   * @example
   * ```tsx
   * <GridItem area="header">
   * <GridItem area="sidebar">
   * ```
   */
  area?: GridArea;

  /**
   * HTML element to render as
   * Allows polymorphic component usage
   * @default 'div'
   */
  as?: ElementType;

  /**
   * Child elements within the grid item
   */
  children?: ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;
}
