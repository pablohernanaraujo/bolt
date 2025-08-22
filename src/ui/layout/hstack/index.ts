// /src/ui/layout/hstack/index.ts
// Barrel export file for HStack component
// Exports the main component, types, and helper functions
// RELEVANT FILES: hstack.tsx, types.ts, helpers.ts

// Export the main HStack component
export { HStack } from './hstack';

// Export all types for external consumption
export type {
  AlignValue,
  HStackProps,
  JustifyValue,
  SpaceValue,
} from './types';

// Export helper functions for advanced use cases
export { buildHStackClassName, isValidSpaceValue } from './helpers';
