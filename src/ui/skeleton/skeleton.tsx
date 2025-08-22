// /src/ui/skeleton/skeleton.tsx
// Main Skeleton component for loading placeholder rectangles
// Provides customizable loading states with accessibility support
// RELEVANT FILES: skeleton.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import {
  buildSkeletonClassName,
  buildSkeletonStyle,
  getSkeletonAriaAttributes,
  isValidBorderRadius,
  mergeSkeletonProps,
} from './helpers';
import { type SkeletonProps } from './types';

/**
 * Skeleton component for rectangular loading placeholders
 *
 * Features:
 * - Customizable dimensions (width, height, aspect ratio)
 * - Multiple animation options (pulse, shimmer, static)
 * - Theme integration with design tokens
 * - Full accessibility support with ARIA attributes
 * - Responsive design capabilities
 * - Loading state management
 *
 * Use cases:
 * - Content cards while loading
 * - Image placeholders
 * - Text blocks
 * - Form fields
 * - Any rectangular content area
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref): ReactElement => {
    // Merge props with defaults for consistent behavior
    const {
      isLoaded = false,
      speed = 'normal',
      isAnimated = true,
      borderRadius = 'medium',
      height,
      width,
      minWidth,
      maxWidth,
      aspectRatio,
      startColor,
      endColor,
      className,
      style,
      children,
      ...htmlProps
    } = mergeSkeletonProps(props, {
      isLoaded: false,
      speed: 'normal',
      isAnimated: true,
      borderRadius: 'medium',
    });

    // Build className combining recipe variants and custom classes
    const validBorderRadius = isValidBorderRadius(borderRadius)
      ? borderRadius
      : 'medium';
    const skeletonClassName = buildSkeletonClassName(
      isLoaded,
      speed,
      validBorderRadius,
      isAnimated,
      className,
    );

    // Build inline styles for dynamic properties
    const skeletonStyle = {
      ...buildSkeletonStyle({
        height,
        width,
        minWidth,
        maxWidth,
        aspectRatio,
        startColor,
        endColor,
      }),
      ...style,
    };

    // Get accessibility attributes
    const ariaAttributes = getSkeletonAriaAttributes(isLoaded);

    // When content is loaded, show children instead of skeleton
    if (isLoaded && children) {
      return (
        <div ref={ref} className={className} style={style} {...htmlProps}>
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={skeletonClassName}
        style={skeletonStyle}
        {...ariaAttributes}
        {...htmlProps}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
