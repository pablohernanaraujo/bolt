// /src/ui/progress/index.ts
// Barrel export for Progress component
// Exports component, types, and helper functions for external consumption
// RELEVANT FILES: progress.tsx, types.ts, helpers.ts

export {
  buildProgressClassName,
  calculateProgressPercentage,
  formatDataProgressValue,
  formatFileProgressValue,
  formatProgressValue,
  formatTimeProgressValue,
  getProgressVariantByValue,
  isIndeterminateProgress,
} from './helpers';
export { Progress } from './progress';
export type {
  ProgressProps,
  ProgressSegmentProps,
  ProgressSize,
  ProgressState,
  ProgressVariant,
} from './types';
