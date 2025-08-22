// /src/ui/toggle/toggle.tsx
// Accessible toggle/switch component built with React Aria Components
// Provides multiple variants, sizes, and full keyboard support
// RELEVANT FILES: toggle.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';

import {
  buildContainerClassName,
  buildLabelClassName,
  buildThumbClassName,
  buildTrackClassName,
} from './helpers';
import { type ToggleProps } from './types';

/**
 * Toggle component with multiple variants and full accessibility
 * Built on React Aria Switch for robust interaction handling
 *
 * Features:
 * - Multiple visual variants (primary, secondary, success, danger)
 * - Three sizes (small, medium, large)
 * - Label positioning (left or right)
 * - Complete keyboard navigation (Space to toggle, Tab to focus)
 * - Screen reader support with proper ARIA attributes
 * - Focus management handled automatically by React Aria
 */
export const Toggle = forwardRef<HTMLLabelElement, ToggleProps>(
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
     * Render function for the Switch component
     * Receives render props from React Aria with component state
     * Uses this state to apply appropriate styles to track and thumb
     */
    const renderSwitch = (renderProps: {
      isSelected: boolean;
      isFocused: boolean;
      isDisabled: boolean;
      isReadOnly: boolean;
    }): ReactNode => (
      <>
        {/* Toggle track - the background that contains the thumb */}
        <div
          className={buildTrackClassName(size, variant, renderProps.isSelected)}
          data-focused={renderProps.isFocused || undefined}
          data-disabled={renderProps.isDisabled || undefined}
        >
          {/* Toggle thumb - the circular indicator that slides */}
          <div className={buildThumbClassName(size, renderProps.isSelected)} />
        </div>

        {/* Label text - optional, positioned based on labelPosition prop */}
        {children && typeof children !== 'function' && (
          <span className={buildLabelClassName(size)}>{children}</span>
        )}
      </>
    );

    const containerClassName =
      typeof className === 'string' || className === undefined
        ? buildContainerClassName(labelPosition, className)
        : className;

    return (
      <AriaSwitch ref={ref} className={containerClassName} {...props}>
        {renderSwitch}
      </AriaSwitch>
    );
  },
);

Toggle.displayName = 'Toggle';
