/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/checkbox/checkbox-client.tsx
// Client-side checkbox component with React Aria Components interactive features
// Provides enhanced checkbox interactions requiring client-side JavaScript
// RELEVANT FILES: checkbox-server.tsx, checkbox.css.ts, types.ts, helpers.ts

'use client';

import { Check } from 'lucide-react';
import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';

import { Icon } from '@/icons';

import {
  buildCheckboxClassName,
  buildCheckmarkClassName,
  buildContainerClassName,
  buildLabelClassName,
} from './helpers';
import { type CheckboxProps } from './types';

/**
 * Client-side Checkbox component with enhanced React Aria interactions
 * Manages advanced checkbox behaviors with client-side JavaScript
 *
 * Features:
 * - Advanced focus management with focus-visible detection
 * - Enhanced keyboard interactions (Space to toggle, arrow navigation in groups)
 * - Real-time state management with render props
 * - ARIA attributes for complex interaction patterns
 * - Integration with React Aria forms and selection components
 * - Advanced accessibility features like screen reader announcements
 * - Press animations and visual feedback
 *
 * Use this version when:
 * - Building complex forms with dynamic validation
 * - Need advanced focus management and keyboard navigation
 * - Working with React Aria selection components (CheckboxGroup, etc.)
 * - Require render props for conditional styling based on interaction state
 * - Building rich application interfaces with dynamic behavior
 * - Need integration with React Aria collections and data components
 *
 * For simple form checkboxes and basic functionality, prefer CheckboxServer
 */
export const CheckboxClient = forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      labelPosition = 'right',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    /**
     * Render function for the Checkbox component
     * Receives render props from React Aria with component state
     * Uses this state to apply appropriate styles to checkbox and checkmark
     */
    const renderCheckbox = (renderProps: any): ReactNode => {
      const { isSelected } = renderProps;

      // Handle className which can be a function in React Aria Components
      const resolvedClassName =
        typeof className === 'function'
          ? className({
              ...renderProps,
              defaultClassName: undefined,
            })
          : className;

      // Build class names using existing helper functions with state
      const containerClassName = buildContainerClassName(
        labelPosition,
        resolvedClassName,
      );
      const checkboxClassName = buildCheckboxClassName(
        size,
        variant,
        isSelected,
      );
      const checkmarkClassName = buildCheckmarkClassName(size);
      const labelClassName = buildLabelClassName(size);

      return (
        <div className={containerClassName}>
          {/* Custom checkbox visual */}
          <div className={checkboxClassName}>
            {/* Checkmark icon - only visible when selected */}
            {isSelected && (
              <Icon
                icon={Check}
                className={checkmarkClassName}
                aria-hidden="true"
              />
            )}
          </div>

          {/* Label text */}
          {children && (
            <span className={labelClassName}>
              {typeof children === 'function'
                ? children({
                    ...renderProps,
                    defaultChildren: undefined,
                  })
                : children}
            </span>
          )}
        </div>
      );
    };

    return (
      <AriaCheckbox ref={ref} {...props}>
        {renderCheckbox}
      </AriaCheckbox>
    );
  },
);

CheckboxClient.displayName = 'CheckboxClient';
