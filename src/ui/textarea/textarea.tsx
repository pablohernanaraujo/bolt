// /src/ui/textarea/textarea.tsx
// Accessible textarea component built with React Aria Components
// Provides multiple variants, sizes, and states with full keyboard support
// RELEVANT FILES: textarea.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import { TextArea as AriaTextArea } from 'react-aria-components';

import {
  buildTextAreaClassName,
  getTextAreaRows,
  isTextAreaInvalid,
} from './helpers';
import { type TextAreaProps } from './types';

/**
 * TextArea component with multiple variants and full accessibility
 * Built on React Aria Components for robust interaction handling
 *
 * Features:
 * - Multiple visual variants (outline, filled)
 * - Three sizes (small, medium, large)
 * - Error state support
 * - Configurable resize behavior (none, vertical, horizontal, both)
 * - Auto-sizing with minimum/maximum rows
 * - Complete keyboard navigation and screen reader support
 * - Focus management and ARIA attributes handled automatically
 *
 * Note: This component should be used with FormField for proper labeling,
 * or provide aria-label/aria-labelledby when used standalone
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = 'outline',
      size = 'medium',
      hasError = false,
      resize = 'vertical',
      rows,
      maxRows,
      className,
      placeholder,
      isDisabled,
      isInvalid,
      ...props
    },
    ref,
  ): ReactElement => {
    // Determine if textarea is in invalid state
    const textareaIsInvalid = isTextAreaInvalid(hasError, isInvalid);

    // Calculate appropriate rows
    const textareaRows = getTextAreaRows(size, rows);

    return (
      <AriaTextArea
        ref={ref}
        rows={textareaRows}
        placeholder={placeholder}
        disabled={isDisabled}
        className={(renderProps) => {
          return typeof className === 'function'
            ? buildTextAreaClassName(variant, size, resize, className, {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
              })
            : buildTextAreaClassName(variant, size, resize, className);
        }}
        data-invalid={textareaIsInvalid || undefined}
        data-disabled={isDisabled || undefined}
        style={{
          maxHeight:
            maxRows && resize !== 'none' ? `${maxRows * 1.5}em` : undefined,
        }}
        {...props}
      />
    );
  },
);

TextArea.displayName = 'TextArea';
