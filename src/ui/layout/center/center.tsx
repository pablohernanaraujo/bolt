/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/layout/center/center.tsx
// Center layout component for centering content horizontally and vertically
// Uses flexbox to provide simple and reliable centering behavior
// RELEVANT FILES: center.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import { buildCenterClassName } from './helpers';
import { type CenterComponentProps } from './types';

/**
 * Center component for centering content
 * Centers children both horizontally and vertically using flexbox
 *
 * Features:
 * - Automatic horizontal and vertical centering
 * - Polymorphic component (can render as any HTML element)
 * - Full TypeScript support with proper element props
 * - Zero configuration required - just wrap content
 *
 * @example
 * ```tsx
 * <Center>
 *   <Button>This will be centered</Button>
 * </Center>
 * ```
 *
 * @example
 * ```tsx
 * <Center as="section" style={{ height: '200px', backgroundColor: 'lightgray' }}>
 *   <div>Centered in a 200px tall section</div>
 * </Center>
 * ```
 */
export const Center = forwardRef<ElementRef<any>, CenterComponentProps<any>>(
  (
    { as: Component = 'div', className, children, ...props },
    ref,
  ): ReactElement => {
    // Build complete className from props
    const centerClassName = buildCenterClassName({
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref as any} className={centerClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Center.displayName = 'Center';
