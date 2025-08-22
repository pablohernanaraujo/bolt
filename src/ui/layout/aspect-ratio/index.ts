// /src/ui/layout/aspect-ratio/index.ts
// Barrel export file for AspectRatio component
// Exports component and types for external consumption
// RELEVANT FILES: aspect-ratio.tsx, types.ts, helpers.ts

export { AspectRatio } from './aspect-ratio';
export {
  buildAspectRatioClassName,
  calculateAspectRatio,
  calculateFallbackPadding,
  createAspectRatioStyles,
  getAspectRatioValue,
} from './helpers';
export type {
  AspectRatioPreset,
  AspectRatioProps,
  CustomAspectRatio,
  ObjectFit,
} from './types';
