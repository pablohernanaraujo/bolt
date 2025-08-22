// /src/ui/skeleton/index.ts
// Barrel export file for Skeleton components
// Exports all skeleton variants and related types
// RELEVANT FILES: skeleton.tsx, skeleton-circle.tsx, skeleton-text.tsx, types.ts

// Main components
export { Skeleton } from './skeleton';
export { SkeletonCircle } from './skeleton-circle';
export { SkeletonText } from './skeleton-text';

// Type exports
export type {
  SkeletonBorderRadius,
  SkeletonCircleProps,
  SkeletonCircleSize,
  SkeletonProps,
  SkeletonSpeed,
  SkeletonTextProps,
} from './types';

// Helper function exports (for advanced usage)
export {
  buildSkeletonCircleClassName,
  buildSkeletonCircleStyle,
  buildSkeletonClassName,
  buildSkeletonStyle,
  generateTextLines,
  getAnimationDuration,
  getResponsiveDimensions,
  getSkeletonAriaAttributes,
  isValidBorderRadius,
  isValidCircleSize,
} from './helpers';
