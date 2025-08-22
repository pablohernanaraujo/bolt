// /src/ui/button/button-client.tsx
// Client-side button component with React Aria Components interactive features
// Provides enhanced interactions requiring client-side JavaScript
// RELEVANT FILES: button-server.tsx, button.css.ts, types.ts, helpers.ts

'use client';

import { forwardRef, type ReactElement } from 'react';
import { Button as AriaButton } from 'react-aria-components';

import { buildButtonClassName } from './helpers';
import { type ButtonProps } from './types';

/**
 * Client-side Button component with enhanced React Aria interactions
 * Manages advanced button behaviors with client-side JavaScript
 *
 * Features:
 * - Advanced focus management with focus-visible detection
 * - Enhanced keyboard interactions (Space/Enter handling)
 * - Press state management with visual feedback
 * - ARIA attributes for complex interaction patterns
 * - Integration with React Aria collections and forms
 * - Advanced accessibility features like announcement roles
 *
 * Use this version when:
 * - Building complex interactive components (toolbars, menus)
 * - Need advanced focus management
 * - Working with React Aria compound components
 * - Require render props for conditional styling based on state
 * - Building rich application interfaces
 *
 * For simple buttons in forms or basic interactions, prefer ButtonServer
 */
export const ButtonClient = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ): ReactElement => (
    <AriaButton
      ref={ref}
      className={(renderProps) =>
        buildButtonClassName(variant, size, fullWidth, className, {
          ...renderProps,
          defaultClassName: renderProps.defaultClassName || '',
        })
      }
      {...props}
    />
  ),
);

ButtonClient.displayName = 'ButtonClient';
