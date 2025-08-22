/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable max-params */
// /src/ui/skeleton/helpers.ts
// Helper functions for Skeleton components className composition and utilities
// Handles dynamic styling, size calculations, and accessibility features
// RELEVANT FILES: skeleton.css.ts, types.ts, skeleton.tsx

import { skeleton, skeletonCircle } from './skeleton.css';
import {
  type SkeletonBorderRadius,
  type SkeletonCircleProps,
  type SkeletonCircleSize,
  type SkeletonProps,
  type SkeletonSpeed,
} from './types';

/**
 * Builds className for main Skeleton component
 * Uses recipe variants for all styling
 */
export const buildSkeletonClassName = (
  isLoaded: boolean = false,
  speed: SkeletonSpeed = 'normal',
  borderRadius: SkeletonBorderRadius = 'medium',
  isAnimated: boolean = true,
  className?: string,
): string => {
  const skeletonClass = skeleton({
    animation: isAnimated ? 'animated' : 'static',
    speed,
    borderRadius,
    loaded: isLoaded,
  });

  // Add custom className if provided
  if (className) {
    return `${skeletonClass} ${className}`;
  }

  return skeletonClass;
};

/**
 * Builds className for SkeletonCircle component
 * Uses recipe variants for all styling
 */
export const buildSkeletonCircleClassName = (
  size: SkeletonCircleSize | string | number = 'md',
  isLoaded: boolean = false,
  speed: SkeletonSpeed = 'normal',
  isAnimated: boolean = true,
  className?: string,
): string => {
  const skeletonClass = skeletonCircle({
    size: isValidCircleSize(size) ? (size as SkeletonCircleSize) : undefined,
    animation: isAnimated ? 'animated' : 'static',
    speed,
    loaded: isLoaded,
  });

  // Add custom className if provided
  if (className) {
    return `${skeletonClass} ${className}`;
  }

  return skeletonClass;
};

/**
 * Builds inline styles for Skeleton component
 * Handles dynamic width, height, and color properties
 */
export const buildSkeletonStyle = (
  props: Pick<
    SkeletonProps,
    | 'height'
    | 'width'
    | 'minWidth'
    | 'maxWidth'
    | 'aspectRatio'
    | 'startColor'
    | 'endColor'
  >,
): React.CSSProperties => {
  const style: React.CSSProperties = {};

  // Handle dimensions
  if (props.height !== undefined) {
    style.height =
      typeof props.height === 'number' ? `${props.height}px` : props.height;
  }

  if (props.width !== undefined) {
    style.width =
      typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  if (props.minWidth !== undefined) {
    style.minWidth =
      typeof props.minWidth === 'number'
        ? `${props.minWidth}px`
        : props.minWidth;
  }

  if (props.maxWidth !== undefined) {
    style.maxWidth =
      typeof props.maxWidth === 'number'
        ? `${props.maxWidth}px`
        : props.maxWidth;
  }

  // Handle aspect ratio
  if (props.aspectRatio !== undefined && props.width) {
    const width =
      typeof props.width === 'number'
        ? props.width
        : Number.parseFloat(props.width.toString());
    if (!isNaN(width)) {
      style.height = `${width / props.aspectRatio}px`;
    }
  }

  // Handle custom colors
  if (props.startColor) {
    style.backgroundColor = props.startColor;
  }

  if (props.endColor && props.startColor) {
    // Create custom gradient for shimmer effect
    (style as any)['--skeleton-start-color'] = props.startColor;
    (style as any)['--skeleton-end-color'] = props.endColor;
  }

  return style;
};

/**
 * Builds inline styles for SkeletonCircle component
 * Handles custom size and color properties
 */
export const buildSkeletonCircleStyle = (
  size: SkeletonCircleSize | string | number = 'md',
  startColor?: string,
  endColor?: string,
): React.CSSProperties => {
  const style: React.CSSProperties = {};

  // Handle custom size (when not using preset)
  if (!isValidCircleSize(size)) {
    const sizeValue = typeof size === 'number' ? `${size}px` : size;
    style.width = sizeValue;
    style.height = sizeValue;
  }

  // Handle custom colors
  if (startColor) {
    style.backgroundColor = startColor;
  }

  if (endColor && startColor) {
    (style as any)['--skeleton-start-color'] = startColor;
    (style as any)['--skeleton-end-color'] = endColor;
  }

  return style;
};

/**
 * Gets ARIA attributes for skeleton components
 * Provides accessibility information for screen readers
 */
export const getSkeletonAriaAttributes = (
  isLoaded: boolean = false,
  label?: string,
): React.AriaAttributes & { role?: string } => {
  if (isLoaded) {
    return {};
  }

  return {
    'aria-busy': true,
    'aria-live': 'polite',
    'aria-label': label || 'Loading content',
    role: 'status',
  };
};

/**
 * Validates if a size value is a valid SkeletonCircleSize preset
 */
export const isValidCircleSize = (size: any): size is SkeletonCircleSize =>
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(size);

/**
 * Validates if a border radius value is a valid preset
 */
export const isValidBorderRadius = (
  borderRadius: any,
): borderRadius is SkeletonBorderRadius =>
  ['none', 'small', 'medium', 'large', 'full'].includes(borderRadius);

/**
 * Converts animation speed to duration value
 * Used for custom animation implementations
 */
export const getAnimationDuration = (speed: SkeletonSpeed): string => {
  switch (speed) {
    case 'slow':
      return '3s';
    case 'fast':
      return '1s';
    case 'normal':
    default:
      return '2s';
  }
};

/**
 * Generates skeleton lines for text content
 * Creates an array of widths for varied line lengths
 */
export const generateTextLines = (
  noOfLines: number,
  lastLineWidth: number = 80,
): Array<{ width: string; key: string }> => {
  const lines: Array<{ width: string; key: string }> = [];

  for (let i = 0; i < noOfLines; i++) {
    const isLastLine = i === noOfLines - 1;
    const width = isLastLine ? `${lastLineWidth}%` : '100%';

    lines.push({
      width,
      key: `skeleton-line-${i}`,
    });
  }

  return lines;
};

/**
 * Calculates responsive skeleton dimensions
 * Adjusts sizes based on container or viewport
 */
export const getResponsiveDimensions = (
  baseWidth: number,
  baseHeight: number,
  containerWidth?: number,
  maxWidth?: number,
): { width: string; height: string } => {
  let width = baseWidth;
  let height = baseHeight;

  // Adjust for container constraints
  if (containerWidth && width > containerWidth) {
    const ratio = height / width;
    width = containerWidth;
    height = width * ratio;
  }

  // Respect maximum width constraint
  if (maxWidth && width > maxWidth) {
    const ratio = height / width;
    width = maxWidth;
    height = width * ratio;
  }

  return {
    width: `${Math.round(width)}px`,
    height: `${Math.round(height)}px`,
  };
};

/**
 * Utility to merge skeleton props with defaults
 * Provides consistent fallback values
 */
export const mergeSkeletonProps = <
  T extends SkeletonProps | SkeletonCircleProps,
>(
  props: T,
  defaults: Partial<T>,
): T =>
  ({
    ...defaults,
    ...props,
    // Ensure boolean props have proper defaults
    isLoaded: props.isLoaded ?? false,
    isAnimated: props.isAnimated ?? true,
    speed: props.speed ?? 'normal',
  }) as T;
