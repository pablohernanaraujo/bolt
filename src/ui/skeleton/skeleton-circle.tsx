// /src/ui/skeleton/skeleton-circle.tsx
// SkeletonCircle component for circular loading placeholders
// Specialized skeleton for avatars, profile pictures, and circular content
// RELEVANT FILES: skeleton.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import {
  buildSkeletonCircleClassName,
  buildSkeletonCircleStyle,
  getSkeletonAriaAttributes,
  mergeSkeletonProps,
} from './helpers';
import { type SkeletonCircleProps } from './types';

/**
 * SkeletonCircle component for circular loading placeholders
 *
 * Features:
 * - Predefined size variants (xs, sm, md, lg, xl, 2xl)
 * - Custom size support with string or number values
 * - Same animation options as main Skeleton
 * - Perfect circle shape maintained automatically
 * - Accessibility support with proper ARIA attributes
 * - Loading state management with children support
 *
 * Use cases:
 * - User avatars
 * - Profile pictures
 * - Icon placeholders
 * - Circular badges
 * - Round image thumbnails
 * - Circular buttons or controls
 */
export const SkeletonCircle = forwardRef<HTMLDivElement, SkeletonCircleProps>(
  (props, ref): ReactElement => {
    // Merge props with defaults for consistent behavior
    const {
      size = 'md',
      isLoaded = false,
      speed = 'normal',
      isAnimated = true,
      startColor,
      endColor,
      className,
      style,
      children,
      ...htmlProps
    } = mergeSkeletonProps(props, {
      size: 'md',
      isLoaded: false,
      speed: 'normal',
      isAnimated: true,
    });

    // Build className combining recipe variants and custom classes
    const skeletonClassName = buildSkeletonCircleClassName(
      size,
      isLoaded,
      speed,
      isAnimated,
      className,
    );

    // Build inline styles for custom size and colors
    const skeletonStyle = {
      ...buildSkeletonCircleStyle(size, startColor, endColor),
      ...style,
    };

    // Get accessibility attributes
    const ariaAttributes = getSkeletonAriaAttributes(isLoaded);

    // When content is loaded, show children instead of skeleton
    if (isLoaded && children) {
      return (
        <div
          ref={ref}
          className={className}
          style={{
            ...skeletonStyle,
            ...style,
            // Maintain circular shape for loaded content
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...htmlProps}
        >
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

SkeletonCircle.displayName = 'SkeletonCircle';
