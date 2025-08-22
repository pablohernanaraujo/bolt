// /src/ui/pagination/index.ts
// Barrel export file for Pagination component
// Re-exports all pagination-related exports for easy consumption
// RELEVANT FILES: pagination.tsx, types.ts, helpers.ts

export {
  buildPaginationClassName,
  defaultPaginationConfig,
  generatePageItems,
  generatePaginationItems,
  validatePaginationProps,
} from './helpers';
export { Pagination } from './pagination';
export type {
  PaginationConfig,
  PaginationPageItem,
  PaginationProps,
} from './types';
