// /src/ui/input/input-client.tsx
// Client-side input component with React Aria Components interactive features
// Provides enhanced input interactions requiring client-side JavaScript
// RELEVANT FILES: input-server.tsx, input.css.ts, types.ts, helpers.ts

'use client';

import { forwardRef, type ReactElement } from 'react';
import { Input as AriaInput } from 'react-aria-components';

import { useInputGroup } from '../input-group';
import { buildInputClassName, buildInputWithGroupClassName } from './helpers';
import { type InputProps } from './types';

/**
 * Client-side Input component with enhanced React Aria interactions
 * Manages advanced input behaviors with client-side JavaScript
 *
 * Features:
 * - Advanced focus management with focus-visible detection
 * - Enhanced keyboard interactions and input validation
 * - Real-time validation state management
 * - ARIA attributes for complex interaction patterns
 * - Integration with React Aria forms and field groups
 * - Advanced accessibility features like screen reader announcements
 * - Composition with React Aria compound components
 *
 * Use this version when:
 * - Building complex forms with real-time validation
 * - Need advanced focus management and keyboard navigation
 * - Working with React Aria form components (TextField, etc.)
 * - Require render props for conditional styling based on state
 * - Building rich application interfaces with dynamic behavior
 * - Need integration with React Aria selection and data components
 *
 * For simple form inputs and basic functionality, prefer InputServer
 */
export const InputClient = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'outline',
      size = 'medium',
      hasError = false,
      type = 'text',
      className,
      placeholder,
      ...props
    },
    ref,
  ): ReactElement => {
    // Get InputGroup context if this input is inside a group
    const inputGroup = useInputGroup();

    return (
      <AriaInput
        ref={ref}
        type={type}
        className={(renderProps) => {
          const renderPropsWithDefault = {
            ...renderProps,
            defaultClassName: renderProps.defaultClassName || '',
          };

          return inputGroup
            ? buildInputWithGroupClassName(
                variant,
                size,
                inputGroup,
                className,
                renderPropsWithDefault,
              )
            : buildInputClassName(
                variant,
                size,
                className,
                renderPropsWithDefault,
              );
        }}
        placeholder={placeholder}
        {...props}
      />
    );
  },
);

InputClient.displayName = 'InputClient';
