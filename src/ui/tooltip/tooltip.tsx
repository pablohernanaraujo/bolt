/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/tooltip/tooltip.tsx
// Tooltip component implementation using React Aria Components
// Provides accessible tooltip functionality with positioning and variants
// RELEVANT FILES: types.ts, helpers.ts, tooltip.css.ts

'use client';

import { type FC, type ReactElement, useEffect, useState } from 'react';
import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  OverlayArrow,
} from 'react-aria-components';

import { darkTheme, lightTheme } from '@/tokens/themes';

import {
  buildTooltipArrowClassName,
  buildTooltipClassName,
  getAriaPlacement,
  getOffsetForSize,
} from './helpers';
import { type TooltipProps, type TooltipTriggerProps } from './types';

/**
 * TooltipTrigger component
 * Wraps trigger element and tooltip with hover/focus interaction
 * Handles delay, positioning, and accessibility features
 */
export const TooltipTrigger: FC<TooltipTriggerProps> = ({
  delay = 700,
  closeDelay = 0,
  children,
  ...props
}): ReactElement => (
  <AriaTooltipTrigger delay={delay} closeDelay={closeDelay} {...props}>
    {children}
  </AriaTooltipTrigger>
);

/**
 * Tooltip component
 * Displays contextual information when triggered by hover or focus
 * Built with React Aria Components for full accessibility support
 *
 * Features:
 * - Flexible positioning with 14+ placement options
 * - Multiple size variants (small, medium, large)
 * - Visual variants (default, inverse, accent)
 * - Optional arrow pointing to trigger element
 * - Configurable delays and offsets
 * - Automatic text wrapping for long content
 * - Full keyboard navigation and screen reader support
 * - Respects user motion preferences
 */
export const Tooltip: FC<TooltipProps> = ({
  children,
  placement = 'top',
  size = 'medium',
  variant = 'default',
  offset: customOffset,
  showArrow = false,
  maxWidth = 300,
  className,
  ...props
}): ReactElement => {
  // Theme detection for proper color inheritance
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const detectTheme = (): void => {
      if (typeof document !== 'undefined') {
        const theme =
          document.documentElement.getAttribute('data-theme') || 'light';
        setCurrentTheme(theme as 'light' | 'dark');
      }
    };

    // Initial detection
    detectTheme();

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          detectTheme();
        }
      }
    });

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    }

    return () => observer.disconnect();
  }, []);

  // Calculate final offset based on size if not explicitly provided
  const offset = getOffsetForSize(size, customOffset);

  // Convert our placement prop to React Aria placement
  const ariaPlacement = getAriaPlacement(placement);

  // Build className with theme class for proper color inheritance
  const themeClass = currentTheme === 'light' ? lightTheme : darkTheme;
  const tooltipClassName = `${themeClass} ${buildTooltipClassName(size, variant, className)}`;

  return (
    <AriaTooltip
      placement={ariaPlacement as any}
      offset={offset}
      className={tooltipClassName}
      style={{ maxWidth: `${maxWidth}px` }}
      {...props}
    >
      {/* Conditional arrow rendering */}
      {showArrow && (
        <OverlayArrow>
          <div
            className={`${themeClass} ${buildTooltipArrowClassName(variant)}`}
          />
        </OverlayArrow>
      )}

      {/* Tooltip content */}
      <div>{children}</div>
    </AriaTooltip>
  );
};
