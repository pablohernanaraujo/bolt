// /src/ui/layout/container/container.tsx
// Layout container component for consistent page padding and full-width structure
// Provides vertical padding control while maintaining full width across all screen sizes
// RELEVANT FILES: container.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { buildContainerClassName } from './helpers';
import { type SimpleContainerProps } from './types';

/**
 * Container component for page layout structure
 * Provides consistent vertical padding while maintaining full width
 *
 * Features:
 * - Always full width (100%)
 * - Configurable vertical padding using design system tokens
 * - Polymorphic component (can render as any HTML element)
 * - Zero horizontal padding (preserves full width)
 * - Proper box-sizing for predictable layout
 *
 * @example
 * ```tsx
 * // Basic usage with default padding
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 *
 * // Custom padding
 * <Container paddingY="12">
 *   <section>Large padding content</section>
 * </Container>
 *
 * // Semantic HTML element
 * <Container as="main" paddingY="8">
 *   <article>Main page content</article>
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, SimpleContainerProps>(
  (
    { paddingY = '6', as: Component = 'div', className, children, ...props },
    ref,
  ): ReactElement => {
    // Build complete className from props
    const containerClassName = buildContainerClassName({
      paddingY,
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref} className={containerClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Container.displayName = 'Container';
