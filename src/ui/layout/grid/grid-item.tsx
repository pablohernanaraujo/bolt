// /src/ui/layout/grid/grid-item.tsx
// Individual grid item component for precise positioning within Grid
// Provides comprehensive grid item positioning and spanning capabilities
// RELEVANT FILES: grid-item.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import * as styles from './grid-item.css';
import { buildGridItemClassName, buildGridItemStyles } from './helpers';
import { type GridItemProps } from './types';

/**
 * GridItem component for positioned grid items
 * Provides precise control over grid item placement and spanning
 *
 * Features:
 * - Column and row positioning
 * - Flexible spanning across multiple columns/rows
 * - Named grid area support
 * - Polymorphic component (can render as any HTML element)
 * - Full TypeScript support
 *
 * @example
 * Basic grid item spanning 2 columns:
 * ```tsx
 * <Grid templateColumns="repeat(4, 1fr)" gap="4">
 *   <GridItem colSpan={2}>Spans 2 columns</GridItem>
 *   <GridItem>Single column</GridItem>
 *   <GridItem>Single column</GridItem>
 * </Grid>
 * ```
 *
 * @example
 * Precise positioning with start/end:
 * ```tsx
 * <Grid templateColumns="repeat(6, 1fr)" gap="4">
 *   <GridItem colStart={2} colEnd={5}>
 *     From column 2 to 5
 *   </GridItem>
 *   <GridItem colStart={1} rowStart={2} colSpan={3}>
 *     Positioned and spanning
 *   </GridItem>
 * </Grid>
 * ```
 *
 * @example
 * Using named grid areas:
 * ```tsx
 * <Grid
 *   templateAreas={`
 *     "header header"
 *     "sidebar main"
 *   `}
 *   templateColumns="200px 1fr"
 * >
 *   <GridItem area="header">Header Content</GridItem>
 *   <GridItem area="sidebar">Sidebar Content</GridItem>
 *   <GridItem area="main">Main Content</GridItem>
 * </Grid>
 * ```
 */
export const GridItem = forwardRef<ElementRef<'div'>, GridItemProps>(
  (
    {
      colStart,
      colEnd,
      colSpan,
      rowStart,
      rowEnd,
      rowSpan,
      area,
      as: Component = 'div',
      className,
      children,
      style,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build CSS styles from props
    const gridItemStyles = buildGridItemStyles({
      colStart,
      colEnd,
      colSpan,
      rowStart,
      rowEnd,
      rowSpan,
      area,
    });

    // Combine base className with custom className
    const gridItemClassName = buildGridItemClassName(
      styles.gridItem,
      className,
    );

    // Merge custom styles with grid item styles
    const combinedStyles = {
      ...gridItemStyles,
      ...style,
    };

    // Render polymorphic component with proper typing
    return (
      <Component
        ref={ref}
        className={gridItemClassName}
        style={combinedStyles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

GridItem.displayName = 'GridItem';
