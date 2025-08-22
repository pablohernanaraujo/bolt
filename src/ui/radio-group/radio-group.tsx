/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/radio-group/radio-group.tsx
// Accessible radio group component built with React Aria Components
// Provides multiple variants, sizes, orientations, and full keyboard support
// RELEVANT FILES: radio-group.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import { RadioGroup as AriaRadioGroup, Label } from 'react-aria-components';

import { buildGroupLabelClassName, buildRadioGroupClassName } from './helpers';
import { type RadioGroupProps } from './types';

/**
 * RadioGroup component with multiple variants and full accessibility
 * Built on React Aria RadioGroup for robust interaction handling
 *
 * Features:
 * - Multiple visual variants (primary, secondary, success, danger)
 * - Three sizes (small, medium, large)
 * - Two orientations (horizontal, vertical)
 * - Complete keyboard navigation (Arrow keys, Tab to focus)
 * - Screen reader support with proper ARIA attributes
 * - Focus management handled automatically by React Aria
 *
 * IMPORTANT: You must provide either a `label` prop or an `aria-label` prop
 * for accessibility. The label prop creates a visible label, while aria-label
 * provides an invisible label for screen readers.
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      orientation = 'vertical',
      className,
      children,
      label,
      ...props
    },
    ref,
  ): ReactElement => {
    /**
     * Build the radio group container className
     * Combines orientation styles with any custom className
     */
    const radioGroupClassName = buildRadioGroupClassName(
      orientation,
      typeof className === 'string' ? className : undefined,
    );

    return (
      <AriaRadioGroup
        ref={ref}
        className={radioGroupClassName}
        data-variant={variant}
        data-size={size}
        data-orientation={orientation}
        {...props}
      >
        {/* Optional group label - only render if label prop is provided */}
        {label && (
          <Label className={buildGroupLabelClassName(size)}>{label}</Label>
        )}

        {/* Radio options container */}
        <div
          style={{
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: orientation === 'horizontal' ? '1rem' : '0.75rem',
            flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
          }}
        >
          {typeof children === 'function' ? children({} as any) : children}
        </div>
      </AriaRadioGroup>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
