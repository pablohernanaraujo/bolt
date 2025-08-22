// /src/ui/button/button-server.tsx
// Server-compatible button component with zero JavaScript requirements
// Provides all button functionality using native HTML button element
// RELEVANT FILES: button.tsx, button-client.tsx, helpers.ts, types.ts

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactElement,
} from 'react';

import { buildButtonClassName } from './helpers';

/**
 * Server-compatible Button component interface
 * Extends native button attributes instead of React Aria ButtonProps
 */
export interface ButtonServerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  /**
   * Visual style variant of the button
   * Controls the color scheme and appearance
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Size of the button
   * Controls padding, font size, and border radius
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the button should take full width
   * Makes button expand to container width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Custom className to apply to the button
   * Note: Unlike React Aria version, this only accepts strings
   */
  className?: string;
}

/**
 * Server-compatible Button component with comprehensive functionality
 * Renders on the server without requiring client-side JavaScript
 *
 * Features:
 * - Zero JavaScript - works with JS disabled
 * - Full form integration with native button behavior
 * - Complete accessibility with proper semantic HTML
 * - All visual variants and sizes from design system
 * - Works in forms, as submit buttons, or with onclick handlers
 * - Progressive enhancement ready
 *
 * Server-Side Benefits:
 * - No hydration cost
 * - Immediate interaction without JS
 * - SEO-friendly with proper button semantics
 * - Works in environments where JS is disabled
 * - Faster initial page loads
 *
 * Usage:
 * <ButtonServer type="submit">Submit Form</ButtonServer>
 * <ButtonServer variant="secondary" onClick={handleClick}>Click Me</ButtonServer>
 * <ButtonServer size="large" fullWidth>Large Full Width</ButtonServer>
 */
export const ButtonServer = forwardRef<HTMLButtonElement, ButtonServerProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      className,
      type = 'button',
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build className using existing helper but with simpler render props
    const buttonClassName = buildButtonClassName(
      variant,
      size,
      fullWidth,
      className,
      {
        // Provide minimal render props that the helper expects
        defaultClassName: '',
        isPressed: false,
        isHovered: false,
        isFocused: false,
        isFocusVisible: false,
        isDisabled: props.disabled || false,
        isPending: false,
      },
    );

    return (
      <button ref={ref} type={type} className={buttonClassName} {...props}>
        {children}
      </button>
    );
  },
);

ButtonServer.displayName = 'ButtonServer';
