// /src/ui/skeleton/types.ts
// Type definitions for Skeleton and SkeletonCircle components
// Defines props interfaces for loading placeholder components
// RELEVANT FILES: skeleton.tsx, skeleton-circle.tsx, helpers.ts

import { type HTMLAttributes } from 'react';

/**
 * Base skeleton props shared between variants
 */
interface BaseSkeletonProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Whether the content has finished loading
   * When true, shows children instead of skeleton
   */
  isLoaded?: boolean;

  /**
   * Animation speed variant
   * @default 'normal'
   */
  speed?: 'slow' | 'normal' | 'fast';

  /**
   * Start color for the animation gradient
   * Uses theme tokens by default
   */
  startColor?: string;

  /**
   * End color for the animation gradient
   * Uses theme tokens by default
   */
  endColor?: string;

  /**
   * Whether to show the pulse animation
   * @default true
   */
  isAnimated?: boolean;
}

/**
 * Props for the main Skeleton component (rectangular)
 */
export interface SkeletonProps extends BaseSkeletonProps {
  /**
   * Height of the skeleton
   * Can be any valid CSS height value
   */
  height?: string | number;

  /**
   * Width of the skeleton
   * Can be any valid CSS width value
   */
  width?: string | number;

  /**
   * Minimum width of the skeleton
   * Useful for responsive layouts
   */
  minWidth?: string | number;

  /**
   * Maximum width of the skeleton
   * Useful for responsive layouts
   */
  maxWidth?: string | number;

  /**
   * Aspect ratio for the skeleton
   * When provided, height is calculated based on width
   */
  aspectRatio?: number;

  /**
   * Border radius for the skeleton
   * @default 'medium'
   */
  borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full' | string;

  /**
   * Content to show when isLoaded is true
   */
  children?: React.ReactNode;
}

/**
 * Props for the SkeletonCircle component
 */
export interface SkeletonCircleProps extends BaseSkeletonProps {
  /**
   * Size of the circular skeleton
   * Can be a predefined size or custom value
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string | number;

  /**
   * Content to show when isLoaded is true
   */
  children?: React.ReactNode;
}

/**
 * Props for SkeletonText component (for text content)
 */
export interface SkeletonTextProps extends BaseSkeletonProps {
  /**
   * Number of lines to render
   * @default 3
   */
  noOfLines?: number;

  /**
   * Spacing between lines
   * @default '0.5rem'
   */
  spacing?: string | number;

  /**
   * Height of each text line
   * @default '1rem'
   */
  skeletonHeight?: string | number;

  /**
   * Content to show when isLoaded is true
   */
  children?: React.ReactNode;
}

/**
 * Animation speed configuration
 */
export type SkeletonSpeed = 'slow' | 'normal' | 'fast';

/**
 * Size presets for SkeletonCircle
 */
export type SkeletonCircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Border radius options
 */
export type SkeletonBorderRadius =
  | 'none'
  | 'small'
  | 'medium'
  | 'large'
  | 'full';
