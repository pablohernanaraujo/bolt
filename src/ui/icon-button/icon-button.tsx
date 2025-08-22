// /src/ui/icon-button/icon-button.tsx
// Accessible icon button component built with React Aria Components
// Provides multiple variants, sizes, and states with full keyboard support for icon-only buttons
// RELEVANT FILES: icon-button.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import { Button as AriaButton } from 'react-aria-components';

import {
  buildIconButtonClassName,
  getIconSize,
  getIconSizeValue,
} from './helpers';
import { type IconButtonProps } from './types';

/**
 * IconButton component with multiple variants and full accessibility
 * Built on React Aria Components for robust interaction handling
 * Optimized for icon-only usage with proper accessibility
 *
 * Features:
 * - Multiple visual variants (primary, secondary, ghost, danger)
 * - Three sizes (small, medium, large)
 * - Automatic icon sizing based on button size
 * - Complete keyboard navigation and screen reader support
 * - Focus management and ARIA attributes handled automatically
 * - Required aria-label for accessibility compliance
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      icon: IconComponent,
      iconSize,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref,
  ): ReactElement => {
    // Calculate the appropriate icon size
    const resolvedIconSize = getIconSize(size, iconSize);
    const iconSizeValue = getIconSizeValue(resolvedIconSize);

    return (
      <AriaButton
        ref={ref}
        aria-label={ariaLabel}
        className={(renderProps) =>
          buildIconButtonClassName(variant, size, className, {
            ...renderProps,
            defaultClassName: renderProps.defaultClassName || '',
          })
        }
        {...props}
      >
        <IconComponent size={iconSizeValue} />
      </AriaButton>
    );
  },
);

IconButton.displayName = 'IconButton';
