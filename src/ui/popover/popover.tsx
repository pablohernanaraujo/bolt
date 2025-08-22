/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/popover/popover.tsx
// Popover component implementation using React Aria Components
// Provides accessible popover functionality with positioning, variants and interactive content
// RELEVANT FILES: types.ts, helpers.ts, popover.css.ts

'use client';

import { X } from 'lucide-react';
import { type FC, type ReactElement, useEffect, useId, useState } from 'react';
import {
  Button as AriaButton,
  Popover as AriaPopover,
  Dialog,
  DialogTrigger,
  Heading,
  OverlayArrow,
} from 'react-aria-components';

import { Icon } from '@/icons';
import { darkTheme, lightTheme } from '@/tokens/themes';

import { getAriaPlacement, getOffsetForSize } from '../tooltip/helpers';
import {
  buildPopoverArrowClassName,
  buildPopoverBodyClassName,
  buildPopoverClassName,
  buildPopoverFooterClassName,
  buildPopoverHeaderClassName,
} from './helpers';
import * as styles from './popover.css';
import {
  type PopoverArrowProps,
  type PopoverBodyProps,
  type PopoverContentProps,
  type PopoverFooterProps,
  type PopoverHeaderProps,
  type PopoverProps,
  type PopoverTriggerProps,
} from './types';

/**
 * PopoverTrigger component
 * Wraps trigger element and popover with click interaction
 * Handles positioning, accessibility, and interaction patterns
 *
 * Note: The first child should be a pressable element (Button, Pressable, etc.)
 * If using non-pressable elements, they will be automatically wrapped in Pressable
 */
export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  delay,
  closeDelay,
  children,
  ...props
}): ReactElement => <DialogTrigger {...props}>{children}</DialogTrigger>;

/**
 * Popover component
 * Displays contextual content when triggered by user interaction
 * Built with React Aria Components for full accessibility support
 *
 * Features:
 * - Flexible positioning with 14+ placement options
 * - Multiple size variants (small, medium, large)
 * - Visual variants (default, inverse, accent)
 * - Optional arrow pointing to trigger element
 * - Configurable dismiss behavior and offsets
 * - Full keyboard navigation and screen reader support
 * - Automatic focus management and restoration
 * - Respects user motion preferences
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <PopoverTrigger>
 *   <Button>Click me</Button>
 *   <Popover placement="top" size="medium" showArrow>
 *     <PopoverContent title="Information">
 *       <p>Contextual information here</p>
 *     </PopoverContent>
 *   </Popover>
 * </PopoverTrigger>
 * ```
 */
export const Popover: FC<PopoverProps> = ({
  placement = 'top',
  size = 'medium',
  variant = 'default',
  offset: customOffset,
  showArrow = false,
  maxWidth = 320,
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  className,
  children,
  ...props
}): ReactElement => {
  // Theme detection for proper color inheritance in portaled content
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const detectTheme = (): void => {
      if (typeof document !== 'undefined') {
        const theme =
          document.documentElement.getAttribute('data-theme') || 'light';
        setCurrentTheme(theme as 'light' | 'dark');
      }
    };

    // Initial theme detection
    detectTheme();

    // Listen for theme changes in the document
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
  const popoverClassName = `${themeClass} ${buildPopoverClassName(size, variant, className)} ${styles.responsivePopover}`;

  return (
    <AriaPopover
      placement={ariaPlacement as any}
      offset={offset}
      className={popoverClassName}
      style={{ maxWidth: `${maxWidth}px` }}
      {...props}
    >
      <Dialog>
        {/* Conditional arrow rendering */}
        {showArrow && (
          <OverlayArrow>
            <div
              className={`${themeClass} ${buildPopoverArrowClassName(variant)}`}
            />
          </OverlayArrow>
        )}

        {/* Popover content */}
        <div>{children}</div>
      </Dialog>
    </AriaPopover>
  );
};

/**
 * PopoverContent component
 * Structured content container with optional header and proper accessibility
 * Automatically handles ARIA attributes based on content type
 *
 * @example
 * ```tsx
 * <PopoverContent title="Settings" showCloseButton>
 *   <p>Popover body content with structured layout</p>
 * </PopoverContent>
 * ```
 */
export const PopoverContent: FC<PopoverContentProps> = ({
  title,
  showCloseButton = true,
  showHeaderDivider = true,
  children,
  className,
  ...props
}): ReactElement => {
  const hasHeader = !!title || showCloseButton;

  return (
    <div className={className} {...props}>
      {hasHeader && (
        <PopoverHeader
          title={title}
          showCloseButton={showCloseButton}
          showDivider={showHeaderDivider}
        />
      )}
      <PopoverBody hasHeader={hasHeader}>{children}</PopoverBody>
    </div>
  );
};

/**
 * PopoverHeader component
 * Header section with title and optional close button
 * Provides consistent header layout and styling
 */
export const PopoverHeader: FC<PopoverHeaderProps> = ({
  title,
  showCloseButton = true,
  showDivider = true,
  children,
  className,
}): ReactElement => {
  const titleId = useId();

  return (
    <header className={buildPopoverHeaderClassName(showDivider, className)}>
      <div>
        {title && (
          <Heading id={titleId} className={styles.popoverTitle} slot="title">
            {title}
          </Heading>
        )}
        {children}
      </div>

      {showCloseButton && (
        <AriaButton
          className={styles.popoverCloseButton}
          aria-label="Close popover"
          slot="close"
        >
          <Icon icon={X} size="sm" />
        </AriaButton>
      )}
    </header>
  );
};

/**
 * PopoverBody component
 * Main content area of the popover
 * Handles spacing adjustments based on header/footer presence
 */
export const PopoverBody: FC<
  PopoverBodyProps & { hasHeader?: boolean; hasFooter?: boolean }
> = ({ children, hasHeader, hasFooter, className }): ReactElement => (
  <div className={buildPopoverBodyClassName(hasHeader, hasFooter, className)}>
    {children}
  </div>
);

/**
 * PopoverFooter component
 * Footer section typically containing action buttons
 * Provides consistent footer layout for interactive popovers
 */
export const PopoverFooter: FC<PopoverFooterProps> = ({
  children,
  showDivider = true,
  className,
}): ReactElement => (
  <footer className={buildPopoverFooterClassName(showDivider, className)}>
    {children}
  </footer>
);

/**
 * PopoverArrow component
 * Arrow element that points from popover to trigger
 * Automatically styled to match popover variant
 */
export const PopoverArrow: FC<PopoverArrowProps> = ({
  variant = 'default',
  className,
}): ReactElement => (
  <div className={buildPopoverArrowClassName(variant, className)} />
);

// Set display names for better debugging
Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';
PopoverHeader.displayName = 'PopoverHeader';
PopoverBody.displayName = 'PopoverBody';
PopoverFooter.displayName = 'PopoverFooter';
PopoverArrow.displayName = 'PopoverArrow';
