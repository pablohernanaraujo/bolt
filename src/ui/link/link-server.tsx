/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable complexity */
// /src/ui/link/link-server.tsx
// Server-compatible Link component with zero JavaScript requirements
// Provides all link functionality using server-side rendering and NextLink integration
// RELEVANT FILES: link.tsx, link-client.tsx, helpers.ts, types.ts

import NextLink from 'next/link';
import { forwardRef, type ReactElement, type ReactNode } from 'react';

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
 * Server-compatible Link component with comprehensive functionality
 * Renders on the server without requiring client-side JavaScript
 *
 * Features:
 * - Zero JavaScript - works with JS disabled
 * - Full NextLink integration for internal navigation
 * - External link detection and security attributes
 * - Complete typography system integration
 * - Icon support with flexible positioning
 * - Accessibility attributes rendered server-side
 * - Proper semantic HTML for all variants
 *
 * Server-Side Benefits:
 * - No hydration cost
 * - Immediate navigation without JS
 * - SEO-friendly with proper link structure
 * - Works in environments where JS is disabled
 * - Faster initial page loads
 *
 * Usage:
 * <LinkServer href="/internal">Internal link</LinkServer>
 * <LinkServer href="https://external.com" isExternal>External link</LinkServer>
 * <LinkServer variant="secondary" size="h3">Large secondary link</LinkServer>
 */
export const LinkServer = forwardRef<HTMLAnchorElement, LinkProps>(
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
    // Sanitize and validate href - same logic as client component
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

    // Get external link attributes for security
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

    // For internal Next.js links (relative paths) - Server-side compatible
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

    // For external links - Server-side compatible
    return (
      <a
        ref={ref}
        href={sanitizedHref}
        className={`${containerClassName} ${linkClassName}`}
        {...externalAttributes}
        {...props}
      >
        {renderContent()}
      </a>
    );
  },
);

LinkServer.displayName = 'LinkServer';
