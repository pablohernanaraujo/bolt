// /src/ui/skeleton/skeleton-text.tsx
// SkeletonText component for multi-line text loading placeholders
// Specialized skeleton for text content with multiple lines
// RELEVANT FILES: skeleton.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import {
  buildSkeletonClassName,
  generateTextLines,
  getSkeletonAriaAttributes,
  mergeSkeletonProps,
} from './helpers';
import { skeletonText, skeletonTextLine } from './skeleton.css';
import { type SkeletonTextProps } from './types';

/**
 * SkeletonText component for multi-line text loading placeholders
 *
 * Features:
 * - Configurable number of lines
 * - Customizable line spacing
 * - Variable line height
 * - Last line typically shorter for natural text appearance
 * - Same animation options as other skeleton components
 * - Accessibility support
 *
 * Use cases:
 * - Article content loading
 * - Comment sections
 * - Description text
 * - Paragraph placeholders
 * - Multi-line labels
 * - Text blocks in cards
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (props, ref): ReactElement => {
    // Merge props with defaults for consistent behavior
    const {
      noOfLines = 3,
      spacing = '0.5rem',
      skeletonHeight = '1rem',
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
      noOfLines: 3,
      spacing: '0.5rem',
      skeletonHeight: '1rem',
      isLoaded: false,
      speed: 'normal',
      isAnimated: true,
    });

    // Get accessibility attributes
    const ariaAttributes = getSkeletonAriaAttributes(
      isLoaded,
      `Loading ${noOfLines} lines of text`,
    );

    // When content is loaded, show children instead of skeleton
    if (isLoaded && children) {
      return (
        <div ref={ref} className={className} style={style} {...htmlProps}>
          {children}
        </div>
      );
    }

    // Generate lines with varied widths for natural appearance
    const textLines = generateTextLines(noOfLines);

    // Container styles
    const containerStyle = {
      ...style,
      gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
    };

    // Individual line styles
    const lineBaseStyle = {
      height:
        typeof skeletonHeight === 'number'
          ? `${skeletonHeight}px`
          : skeletonHeight,
      backgroundColor: startColor,
    };

    return (
      <div
        ref={ref}
        className={`${skeletonText} ${className || ''}`}
        style={containerStyle}
        {...ariaAttributes}
        {...htmlProps}
      >
        {textLines.map((line, index) => {
          // Build className for each line
          const lineClassName = buildSkeletonClassName(
            false, // Never loaded for individual lines
            speed,
            'medium',
            isAnimated,
            skeletonTextLine,
          );

          // Custom line styles
          const lineStyle = {
            ...lineBaseStyle,
            width: line.width,
            // Custom gradient for lines if colors provided
            ...(startColor &&
              endColor && {
                background: `linear-gradient(90deg, ${startColor}, ${endColor}, ${startColor})`,
                backgroundSize: '200% 100%',
              }),
          };

          return (
            <div
              key={line.key}
              className={lineClassName}
              style={lineStyle}
              aria-hidden="true" // Individual lines don't need separate announcement
            />
          );
        })}
      </div>
    );
  },
);

SkeletonText.displayName = 'SkeletonText';
