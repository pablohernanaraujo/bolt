/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/input/input-with-clear.tsx
// Wrapper component that adds clear button functionality to Input
// Provides a convenient way to add clearable behavior
// RELEVANT FILES: input.tsx, types.ts, ../input-group/index.ts

'use client';

import { X } from 'lucide-react';
import { forwardRef, type ReactElement, useCallback, useState } from 'react';

import { InputGroup, InputRightElement } from '../input-group';
import { Input } from './input';
import { type InputProps } from './types';

/**
 * Props for InputWithClear component
 * Extends InputProps with clear-specific functionality
 */
export interface InputWithClearProps extends Omit<InputProps, 'isClearable'> {
  /**
   * Callback fired when the clear button is clicked
   */
  onClear?: () => void;

  /**
   * Custom clear button icon
   * @default X icon from lucide-react
   */
  clearIcon?: ReactElement;

  /**
   * Whether to always show the clear button
   * @default false - only shows when input has value
   */
  alwaysShowClear?: boolean;

  /**
   * Whether the input is disabled
   */
  isDisabled?: boolean;
}

/**
 * InputWithClear component - Input with built-in clear button
 * Wraps Input component with InputGroup for clear functionality
 *
 * Features:
 * - Automatic clear button when input has value
 * - Custom clear icon support
 * - Controlled and uncontrolled modes
 * - Preserves all Input component features
 *
 * Example:
 * ```tsx
 * <InputWithClear
 *   placeholder="Search..."
 *   onClear={() => console.log('Cleared')}
 * />
 * ```
 */
export const InputWithClear = forwardRef<HTMLInputElement, InputWithClearProps>(
  (
    {
      onClear,
      clearIcon,
      alwaysShowClear = false,
      value: controlledValue,
      defaultValue,
      onChange,
      variant = 'outline',
      size = 'medium',
      isDisabled,
      hasError,
      className,
      style,
      ...props
    },
    ref,
  ): ReactElement => {
    // Track internal value for uncontrolled mode
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Handle value changes
    const handleChange = useCallback(
      (e: any) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    // Handle clear action
    const handleClear = useCallback(() => {
      if (!isDisabled) {
        if (!isControlled) {
          setInternalValue('');
        }
        onClear?.();

        // Create synthetic event for onChange
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        };
        onChange?.(syntheticEvent as any);
      }
    }, [isDisabled, isControlled, onClear, onChange]);

    // Determine if clear button should be shown
    const showClearButton =
      alwaysShowClear || (currentValue && String(currentValue).length > 0);

    return (
      <InputGroup
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        hasError={hasError}
      >
        <Input
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          isDisabled={isDisabled}
          hasError={hasError}
          className={typeof className === 'string' ? className : undefined}
          style={typeof style === 'object' ? style : undefined}
          {...props}
        />
        {showClearButton && !isDisabled && (
          <InputRightElement isInteractive>
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              {clearIcon || <X size={16} />}
            </button>
          </InputRightElement>
        )}
      </InputGroup>
    );
  },
);

InputWithClear.displayName = 'InputWithClear';
