/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable complexity */
// /src/ui/link/link.tsx
// Accessible Link component built with React Aria Components and typography integration
// Provides multiple variants, sizes, and states with full keyboard and screen reader support
// RELEVANT FILES: link.css.ts, types.ts, helpers.ts

'use client';

import NextLink from 'next/link';
import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { Link as AriaLink } from 'react-aria-components';

import { ExternalLink } from '@/icons';

import {
  buildContainerClassName,
  buildIconClassName,
  buildLinkClassName,
  getExternalLinkAttributes,
  isExternalUrl,
  sanitizeHref,
} from './helpers';
import * as styles from './link.css';
import { type LinkProps } from './types';

/**
 * Link component with comprehensive typography integration and accessibility
 * Built on React Aria Link for robust interaction handling
 *
 * Features:
 * - Multiple visual variants (primary, secondary, external, disabled)
 * - Typography system integration with all text sizes
 * - Underline behavior control (none, hover, always)
 * - Automatic external link detection and handling
 * - Full keyboard navigation and screen reader support
 * - Next.js Link integration for internal navigation
 * - Icon support with flexible positioning
 * - Typography modifiers (bold, italic, underline, etc.)
 *
 * Usage:
 * <Link href="/internal">Internal link</Link>
 * <Link href="https://external.com" isExternal>External link</Link>
 * <Link variant="secondary" size="h3">Large secondary link</Link>
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      as,
      href,
      variant = 'primary',
      size = 'body2',
      emphasis = 'high',
      underlineBehavior = 'hover',
      isExternal: isExternalProp,
      isDisabled = false,
      icon,
      iconPosition = 'right',
      className,
      children,
      bold = false,
      isTruncated = false,
      italic = false,
      underline: underlineProp = false,
      strikeThrough = false,
      highlight = false,
      ...props
    },
    ref,
  ): ReactElement => {
    // Sanitize and validate href
    const sanitizedHref = sanitizeHref(href);

    // Determine if this is an external link
    const isExternal = isExternalProp ?? isExternalUrl(sanitizedHref);

    // Build class names using helper functions
    const linkClassName = buildLinkClassName(
      variant,
      size,
      underlineBehavior,
      isDisabled,
      emphasis,
      {
        bold,
        isTruncated,
        italic,
        underline: underlineProp,
        strikeThrough,
        highlight,
      },
      className,
    );

    // Container class for icon positioning
    const containerClassName = buildContainerClassName(iconPosition);

    // Get external link attributes
    const externalAttributes = getExternalLinkAttributes(isExternal);

    // Determine which icon to show
    const displayIcon =
      isExternal && variant === 'external' ? ExternalLink : icon;

    // Build icon class name
    const iconClassName = displayIcon
      ? buildIconClassName(isExternal && variant === 'external')
      : undefined;

    /**
     * Render the link content with optional icon
     * Handles icon positioning and external link indicators
     */
    const renderContent = (): ReactNode => {
      // Create the icon component if we have an icon to display
      const IconComponent = displayIcon;

      return (
        <>
          {/* Left-positioned icon */}
          {IconComponent && iconPosition === 'left' && (
            <span className={iconClassName}>
              <IconComponent size="1em" />
            </span>
          )}

          {/* Link text content */}
          <span className={styles.linkText}>{children}</span>

          {/* Right-positioned icon */}
          {IconComponent && iconPosition === 'right' && (
            <span className={iconClassName}>
              <IconComponent size="1em" />
            </span>
          )}
        </>
      );
    };

    // If custom element is specified, render with that element
    if (as && as !== 'a') {
      const Component = as;

      return (
        <Component
          ref={ref}
          className={`${containerClassName} ${linkClassName}`}
          role="link"
          tabIndex={isDisabled ? -1 : 0}
          aria-disabled={isDisabled}
          {...props}
        >
          {renderContent()}
        </Component>
      );
    }

    // If disabled, render as span to prevent interaction
    if (isDisabled) {
      return (
        <span
          ref={ref as any}
          className={`${containerClassName} ${linkClassName}`}
          role="link"
          aria-disabled={true}
          {...props}
        >
          {renderContent()}
        </span>
      );
    }

    // For internal Next.js links (relative paths)
    if (sanitizedHref && !isExternal) {
      return (
        <NextLink
          href={sanitizedHref}
          className={`${containerClassName} ${linkClassName}`}
          ref={ref}
          {...props}
        >
          {renderContent()}
        </NextLink>
      );
    }

    // For external links or when using React Aria Link features
    // Only pass safe props to avoid type conflicts
    const ariaLinkProps = {
      'aria-label': (props as any)['aria-label'],
      'aria-labelledby': (props as any)['aria-labelledby'],
      'aria-describedby': (props as any)['aria-describedby'],
      'data-testid': (props as any)['data-testid'],
      id: props.id,
      role: props.role,
      tabIndex: props.tabIndex,
    };

    return (
      <AriaLink
        ref={ref}
        href={sanitizedHref}
        className={`${containerClassName} ${linkClassName}`}
        {...externalAttributes}
        {...ariaLinkProps}
      >
        {renderContent()}
      </AriaLink>
    );
  },
);

Link.displayName = 'Link';
