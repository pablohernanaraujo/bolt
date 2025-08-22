// /src/ui/layout/aspect-ratio/aspect-ratio.tsx
// Aspect ratio container component for maintaining consistent proportions
// Provides predefined aspect ratios and custom ratio support with object-fit options
// RELEVANT FILES: aspect-ratio.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import * as styles from './aspect-ratio.css';
import { buildAspectRatioClassName, createAspectRatioStyles } from './helpers';
import { type AspectRatioProps } from './types';

/**
 * AspectRatio component for maintaining consistent proportions
 * Ensures content maintains specific width-to-height ratios across different screen sizes
 *
 * Features:
 * - Predefined aspect ratio presets (square, video, photo, etc.)
 * - Custom aspect ratio support with width/height values
 * - Object-fit control for child content positioning
 * - Responsive behavior for mobile devices
 * - Modern CSS aspect-ratio with fallback for older browsers
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * // Using preset
 * <AspectRatio preset="video">
 *   <img src="video-thumbnail.jpg" alt="Video thumbnail" />
 * </AspectRatio>
 *
 * // Using custom ratio
 * <AspectRatio ratio={{ width: 5, height: 3 }} objectFit="contain">
 *   <div>Custom content</div>
 * </AspectRatio>
 *
 * // As different element
 * <AspectRatio preset="square" as="section">
 *   <img src="profile.jpg" alt="Profile" />
 * </AspectRatio>
 * ```
 */
export const AspectRatio = forwardRef<ElementRef<'div'>, AspectRatioProps>(
  (
    {
      preset,
      ratio,
      objectFit = 'cover',
      as: Component = 'div',
      className,
      style,
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    // Validate that either preset or ratio is provided, but not both
    if (preset && ratio) {
      console.warn(
        'AspectRatio: Both preset and ratio props are provided. The ratio prop will take precedence.',
      );
    }

    if (!preset && !ratio) {
      console.warn(
        'AspectRatio: Either preset or ratio prop must be provided. Falling back to square preset.',
      );
      preset = 'square';
    }

    // Build complete className from props
    const aspectRatioClassName = buildAspectRatioClassName({
      preset,
      ratio,
      objectFit,
      className,
    });

    // Create CSS custom properties for dynamic aspect ratio
    const aspectRatioStyles = createAspectRatioStyles(preset, ratio);

    // Combine custom styles with user-provided styles
    const combinedStyles = {
      ...aspectRatioStyles,
      ...style,
    };

    // Render polymorphic component with aspect ratio container
    return (
      <Component
        ref={ref}
        className={aspectRatioClassName}
        style={combinedStyles}
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </Component>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
