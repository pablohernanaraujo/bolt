// /src/ui/password-input/password-input.tsx
// Accessible password input component with visibility toggle
// Built on React Aria Components with eye/eye-off toggle functionality using InputGroup
// RELEVANT FILES: types.ts, helpers.ts, ../input/input.tsx

'use client';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, type ReactElement, useState } from 'react';

import { Icon } from '@/icons';

import { InputGroup, InputRightElement } from '../input-group';
import { InputClient } from '../input/input-client';
import { getToggleAriaLabel, handleToggleKeyDown } from './helpers';
import { type PasswordInputProps } from './types';

/**
 * PasswordInput component with visibility toggle functionality
 * Built using InputGroup pattern for proper layout and positioning
 *
 * Features:
 * - Password visibility toggle with eye/eye-off icons
 * - Multiple visual variants (outline, filled)
 * - Three sizes (small, medium, large)
 * - Error state support
 * - Controlled and uncontrolled visibility states
 * - Complete keyboard navigation and screen reader support
 * - Focus management and ARIA attributes handled automatically
 * - Proper icon positioning inside input using InputRightElement
 *
 * Note: This component should be used with FormField for proper labeling,
 * or provide aria-label/aria-labelledby when used standalone
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      variant = 'outline',
      size = 'medium',
      hasError = false,
      defaultVisible = false,
      isVisible,
      onVisibilityChange,
      toggleAriaLabel,
      placeholder = 'Enter password',
      disabled,
      type: _type,
      ...props
    },
    ref,
  ): ReactElement => {
    // Internal state for uncontrolled visibility
    const [internalVisible, setInternalVisible] = useState(defaultVisible);

    // Determine if component is controlled
    const isControlled = isVisible !== undefined;
    const visible = isControlled ? isVisible : internalVisible;

    /**
     * Handles visibility toggle
     * Updates internal state or calls external handler for controlled component
     */
    const handleToggleVisibility = (): void => {
      if (disabled) return;

      const newVisible = !visible;

      if (isControlled) {
        onVisibilityChange?.(newVisible);
      } else {
        setInternalVisible(newVisible);
      }
    };

    // Determine input type based on visibility
    const inputType = visible ? 'text' : 'password';

    // Get appropriate aria label for toggle button
    const toggleAriaLabelText = getToggleAriaLabel(visible, toggleAriaLabel);

    return (
      <InputGroup
        variant={variant}
        size={size}
        isDisabled={disabled}
        hasError={hasError}
      >
        <InputClient
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          hasError={hasError}
          {...props}
        />
        <InputRightElement isInteractive>
          <button
            type="button"
            onClick={handleToggleVisibility}
            onKeyDown={(event) =>
              handleToggleKeyDown(event, handleToggleVisibility)
            }
            disabled={disabled}
            aria-label={toggleAriaLabelText}
            tabIndex={0}
            style={{
              background: 'none',
              border: 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              color: 'inherit',
            }}
          >
            <Icon icon={visible ? EyeOff : Eye} size="sm" aria-hidden="true" />
          </button>
        </InputRightElement>
      </InputGroup>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
