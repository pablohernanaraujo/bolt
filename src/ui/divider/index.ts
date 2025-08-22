// /src/ui/divider/index.ts
// Barrel export for Divider component and its types
// Provides clean imports from the divider module
// RELEVANT FILES: divider.tsx, types.ts, helpers.ts

export { Divider } from './divider';
export {
  buildDividerClassName,
  getDividerAriaOrientation,
  getDividerRole,
} from './helpers';
export type {
  DividerOrientation,
  DividerProps,
  DividerSize,
  DividerSpacing,
  DividerVariant,
} from './types';
