// /src/ui/layout/grid/grid.tsx
// CSS Grid layout component for flexible grid arrangements
// Provides comprehensive grid layout capabilities using CSS Grid
// RELEVANT FILES: grid.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import * as styles from './grid.css';
import { buildGridClassName, buildGridStyles } from './helpers';
import { type GridProps } from './types';

/**
 * Grid component for CSS Grid layouts
 * Creates flexible grid containers with comprehensive layout control
 *
 * Features:
 * - CSS Grid-based layout system
 * - Flexible column and row templates
 * - Design system spacing integration
 * - Named grid areas support
 * - Auto-sizing capabilities
 * - Polymorphic component (can render as any HTML element)
 * - Full TypeScript support
 *
 * @example
 * Basic 3-column grid:
 * ```tsx
 * <Grid templateColumns="repeat(3, 1fr)" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 *
 * @example
 * Responsive grid with auto-fit:
 * ```tsx
 * <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap="6">
 *   <Card>Card 1</Card>
 *   <Card>Card 2</Card>
 *   <Card>Card 3</Card>
 * </Grid>
 * ```
 *
 * @example
 * Named grid areas:
 * ```tsx
 * <Grid
 *   templateAreas={`
 *     "header header"
 *     "sidebar main"
 *     "footer footer"
 *   `}
 *   templateColumns="200px 1fr"
 *   templateRows="auto 1fr auto"
 *   gap="4"
 * >
 *   <GridItem area="header">Header</GridItem>
 *   <GridItem area="sidebar">Sidebar</GridItem>
 *   <GridItem area="main">Main Content</GridItem>
 *   <GridItem area="footer">Footer</GridItem>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<ElementRef<'div'>, GridProps>(
  (
    {
      templateColumns,
      templateRows,
      templateAreas,
      gap,
      columnGap,
      rowGap,
      autoColumns,
      autoRows,
      autoFlow,
      as: Component = 'div',
      className,
      children,
      style,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build CSS styles from props
    const gridStyles = buildGridStyles({
      templateColumns,
      templateRows,
      templateAreas,
      gap,
      columnGap,
      rowGap,
      autoColumns,
      autoRows,
      autoFlow,
    });

    // Combine base className with custom className
    const gridClassName = buildGridClassName(styles.grid, className);

    // Merge custom styles with grid styles
    const combinedStyles = {
      ...gridStyles,
      ...style,
    };

    // Render polymorphic component with proper typing
    return (
      <Component
        ref={ref}
        className={gridClassName}
        style={combinedStyles}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Grid.displayName = 'Grid';
