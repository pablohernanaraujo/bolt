// /src/ui/layout/grid/index.ts
// Barrel export file for Grid components
// Exports Grid and GridItem components with their type definitions
// RELEVANT FILES: grid.tsx, grid-item.tsx, types.ts

// Grid component exports
export { Grid } from './grid';
export { GridItem } from './grid-item';

// Type exports
export type {
  GridArea,
  GridAuto,
  GridGap,
  GridItemProps,
  GridLine,
  GridProps,
  GridTemplate,
} from './types';

// Helper function exports (for advanced usage)
export {
  buildGridItemStyles,
  buildGridStyles,
  getGridLineValue,
  getSpaceValue,
} from './helpers';
