// /src/ui/radio/radio.tsx
// Accessible radio button component built with React Aria Components
// Individual radio option used within RadioGroup component
// RELEVANT FILES: radio.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement, type ReactNode } from 'react';
import { Radio as AriaRadio } from 'react-aria-components';

import {
  buildRadioClassName,
  buildRadioDotClassName,
  buildRadioLabelClassName,
} from './helpers';
import { type RadioProps } from './types';

/**
 * Radio component for individual radio button options
 * Built on React Aria Radio for robust interaction handling
 *
 * Features:
 * - Multiple visual variants inherited from RadioGroup
 * - Three sizes inherited from RadioGroup
 * - Complete keyboard navigation (handled by RadioGroup)
 * - Screen reader support with proper ARIA attributes
 * - Focus management handled automatically by React Aria
 * - Must be used within a RadioGroup component
 */
export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      className,
      children,
      value,
      ...props
    },
    ref,
  ): ReactElement => {
    /**
     * Render function for the Radio component
     * Receives render props from React Aria with component state
     * Uses this state to apply appropriate styles to radio and dot
     */
    const renderRadio = (renderProps: {
      isSelected: boolean;
      isFocused: boolean;
      isDisabled: boolean;
      isReadOnly: boolean;
    }): ReactNode => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          cursor: renderProps.isDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {/* Radio input - the circular input that contains the dot */}
        <div
          className={buildRadioClassName(size, variant, renderProps.isSelected)}
          data-focused={renderProps.isFocused || undefined}
          data-disabled={renderProps.isDisabled || undefined}
          data-selected={renderProps.isSelected || undefined}
        >
          {/* Radio dot - appears when selected */}
          <div className={buildRadioDotClassName(size, variant)} />
        </div>

        {/* Label text - optional, appears next to the radio */}
        {children && typeof children !== 'function' && (
          <span className={buildRadioLabelClassName(size)}>{children}</span>
        )}
      </div>
    );

    return (
      <AriaRadio
        ref={ref}
        value={value}
        className={typeof className === 'string' ? className : undefined}
        {...props}
      >
        {renderRadio}
      </AriaRadio>
    );
  },
);

Radio.displayName = 'Radio';
