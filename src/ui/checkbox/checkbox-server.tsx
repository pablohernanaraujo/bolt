// /src/ui/checkbox/checkbox-server.tsx
// Server-compatible checkbox component with zero JavaScript requirements
// Provides all checkbox functionality using native HTML input element
// RELEVANT FILES: checkbox.tsx, checkbox-client.tsx, helpers.ts, types.ts

import { forwardRef, type ReactElement, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

import { Icon } from '@/icons';

import {
  buildCheckboxClassName,
  buildCheckmarkClassName,
  buildContainerClassName,
  buildLabelClassName,
} from './helpers';

/**
 * Server-compatible Checkbox component interface
 * Extends native input attributes instead of React Aria CheckboxProps
 */
export interface CheckboxServerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  /**
   * Visual style variant of the checkbox
   * Controls the color scheme when checked
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';

  /**
   * Size of the checkbox
   * Controls the dimensions of the checkbox and text size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Position of the label relative to the checkbox
   * Determines if label appears on left or right side
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';

  /**
   * Custom className to apply to the container
   */
  className?: string;

  /**
   * Label text or content for the checkbox
   */
  children?: React.ReactNode;
}

/**
 * Server-compatible Checkbox component with comprehensive functionality
 * Renders on the server without requiring client-side JavaScript
 *
 * Features:
 * - Zero JavaScript - works with JS disabled
 * - Full form integration with native checkbox behavior
 * - Complete accessibility with proper semantic HTML
 * - All visual variants and sizes from design system
 * - Works in forms with standard HTML validation
 * - Progressive enhancement ready
 * - Keyboard navigation (Space to toggle, Tab to focus)
 *
 * Server-Side Benefits:
 * - No hydration cost
 * - Immediate form functionality without JS
 * - SEO-friendly with proper checkbox semantics
 * - Works in environments where JS is disabled
 * - Faster initial page loads
 * - Native browser form validation support
 *
 * Usage:
 * <CheckboxServer name="terms" required>I agree to terms</CheckboxServer>
 * <CheckboxServer variant="success" size="large">Large success checkbox</CheckboxServer>
 * <CheckboxServer labelPosition="left">Label on left</CheckboxServer>
 *
 * Note: Always provide meaningful label text in children for accessibility
 */
export const CheckboxServer = forwardRef<HTMLLabelElement, CheckboxServerProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      labelPosition = 'right',
      className,
      children,
      checked,
      defaultChecked,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build class names using existing helper functions
    const containerClassName = buildContainerClassName(
      labelPosition,
      className,
    );
    const checkboxClassName = buildCheckboxClassName(
      size,
      variant,
      checked || defaultChecked || false,
    );
    const checkmarkClassName = buildCheckmarkClassName(size);
    const labelClassName = buildLabelClassName(size);

    return (
      <label ref={ref} className={containerClassName}>
        {/* Checkbox input element */}
        <input
          type="checkbox"
          className={checkboxClassName}
          checked={checked}
          defaultChecked={defaultChecked}
          {...props}
        />

        {/* Custom checkbox visual with checkmark */}
        <div className="checkbox-visual">
          <Icon
            icon={Check}
            className={checkmarkClassName}
            aria-hidden="true"
          />
        </div>

        {/* Label text */}
        {children && <span className={labelClassName}>{children}</span>}
      </label>
    );
  },
);

CheckboxServer.displayName = 'CheckboxServer';
