/* eslint-disable max-statements */
// /src/ui/layout/grid/helpers.ts
// Utility functions and className builders for Grid components
// Handles CSS class composition and prop-to-style conversion
// RELEVANT FILES: grid.css.ts, grid-item.css.ts, types.ts

import { tokens } from '@/tokens/tokens.css';

import {
  type GridGap,
  type GridItemProps,
  type GridLine,
  type GridProps,
} from './types';

/**
 * Convert space token to CSS value
 * Maps design system spacing tokens to actual CSS values
 */
export const getSpaceValue = (space: GridGap): string =>
  tokens.space[space] || space;

/**
 * Convert grid line value to CSS value
 * Handles span notation and direct line numbers
 */
export const getGridLineValue = (line: GridLine): string => {
  if (typeof line === 'number') {
    return line.toString();
  }

  // Handle span notation
  if (typeof line === 'string' && line.startsWith('span ')) {
    return line;
  }

  return line;
};

/**
 * Build CSS styles object for Grid component
 * Converts Grid props to CSS custom properties and styles
 */
export const buildGridStyles = (
  props: GridProps,
): Record<string, string | undefined> => {
  const {
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    columnGap,
    rowGap,
    autoColumns,
    autoRows,
    autoFlow,
  } = props;

  const styles: Record<string, string | undefined> = {};

  // Template properties
  if (templateColumns) {
    styles.gridTemplateColumns = templateColumns;
  }

  if (templateRows) {
    styles.gridTemplateRows = templateRows;
  }

  if (templateAreas) {
    styles.gridTemplateAreas = templateAreas;
  }

  // Gap properties
  if (gap) {
    styles.gap = getSpaceValue(gap);
  }

  if (columnGap) {
    styles.columnGap = getSpaceValue(columnGap);
  }

  if (rowGap) {
    styles.rowGap = getSpaceValue(rowGap);
  }

  // Auto properties
  if (autoColumns) {
    styles.gridAutoColumns = autoColumns;
  }

  if (autoRows) {
    styles.gridAutoRows = autoRows;
  }

  if (autoFlow) {
    styles.gridAutoFlow = autoFlow;
  }

  return styles;
};

/**
 * Build CSS styles object for GridItem component
 * Converts GridItem props to CSS custom properties and styles
 */
export const buildGridItemStyles = (
  props: GridItemProps,
): Record<string, string | undefined> => {
  const { colStart, colEnd, colSpan, rowStart, rowEnd, rowSpan, area } = props;

  const styles: Record<string, string | undefined> = {};

  // Column properties
  if (colStart !== undefined) {
    styles.gridColumnStart = getGridLineValue(colStart);
  }

  if (colEnd !== undefined) {
    styles.gridColumnEnd = getGridLineValue(colEnd);
  }

  if (colSpan !== undefined) {
    // Handle span notation for colSpan
    styles.gridColumn =
      typeof colSpan === 'number' ? `span ${colSpan}` : colSpan;
  }

  // Row properties
  if (rowStart !== undefined) {
    styles.gridRowStart = getGridLineValue(rowStart);
  }

  if (rowEnd !== undefined) {
    styles.gridRowEnd = getGridLineValue(rowEnd);
  }

  if (rowSpan !== undefined) {
    // Handle span notation for rowSpan
    styles.gridRow = typeof rowSpan === 'number' ? `span ${rowSpan}` : rowSpan;
  }

  // Area property
  if (area) {
    styles.gridArea = area;
  }

  return styles;
};

/**
 * Build className for Grid component
 * Combines base styles with custom className
 */
export const buildGridClassName = (
  baseClassName: string,
  className?: string,
): string => {
  const classes = [baseClassName];

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};

/**
 * Build className for GridItem component
 * Combines base styles with custom className
 */
export const buildGridItemClassName = (
  baseClassName: string,
  className?: string,
): string => {
  const classes = [baseClassName];

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};
