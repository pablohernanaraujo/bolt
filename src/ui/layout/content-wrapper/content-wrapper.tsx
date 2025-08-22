// /src/ui/layout/content-wrapper/content-wrapper.tsx
// Content wrapper component for horizontal padding and semantic layout structure
// Designed to be used inside Container component to provide horizontal spacing
// RELEVANT FILES: content-wrapper.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { buildContentWrapperClassName } from './helpers';
import { type SimpleContentWrapperProps } from './types';

/**
 * Content Wrapper component for horizontal layout structure
 * Provides consistent horizontal padding and semantic variants
 *
 * Features:
 * - Configurable horizontal padding using design system tokens
 * - Semantic variants (screen, header, body, footer) with smart defaults
 * - Borderless mode for clean nesting without padding conflicts
 * - Polymorphic component (can render as any HTML element)
 * - Full width within parent Container
 * - Proper box-sizing for predictable layout
 *
 * Designed to work inside Container component:
 * - Container handles vertical padding (paddingY)
 * - ContentWrapper handles horizontal padding (paddingX)
 *
 * @example
 * ```tsx
 * // Basic usage with default body variant
 * <Container paddingY="8">
 *   <ContentWrapper>
 *     <h1>Main Content</h1>
 *     <p>This has 24px horizontal padding by default</p>
 *   </ContentWrapper>
 * </Container>
 *
 * // Different variants with semantic meaning
 * <Container paddingY="0">
 *   <ContentWrapper variant="header" as="header">
 *     <nav>Navigation (16px padding)</nav>
 *   </ContentWrapper>
 *   <ContentWrapper variant="body" as="main">
 *     <article>Main content (24px padding)</article>
 *   </ContentWrapper>
 *   <ContentWrapper variant="footer" as="footer">
 *     <div>Footer actions (16px padding)</div>
 *   </ContentWrapper>
 * </Container>
 *
 * // Nested usage with borderless
 * <Container paddingY="8">
 *   <ContentWrapper variant="body" borderless>
 *     <ContentWrapper variant="header" paddingX="4">
 *       <h2>Nested Header</h2>
 *     </ContentWrapper>
 *     <ContentWrapper variant="body" paddingX="8">
 *       <p>Nested content with larger padding</p>
 *     </ContentWrapper>
 *   </ContentWrapper>
 * </Container>
 *
 * // Custom padding override
 * <Container paddingY="6">
 *   <ContentWrapper variant="screen" paddingX="12">
 *     <form>Form with extra horizontal space</form>
 *   </ContentWrapper>
 * </Container>
 * ```
 */
export const ContentWrapper = forwardRef<
  HTMLDivElement,
  SimpleContentWrapperProps
>(
  (
    {
      variant = 'body',
      paddingX,
      borderless = false,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build complete className from props
    const contentWrapperClassName = buildContentWrapperClassName({
      variant,
      paddingX,
      borderless,
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref} className={contentWrapperClassName} {...props}>
        {children}
      </Component>
    );
  },
);

ContentWrapper.displayName = 'ContentWrapper';
