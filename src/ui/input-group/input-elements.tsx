// /src/ui/input-group/input-elements.tsx
// Left and right element components for InputGroup
// Overlay elements positioned inside the input field
// RELEVANT FILES: input-group.tsx, types.ts, input-group.css.ts

import { type FC, type ReactElement } from 'react';

import { buildElementClassName } from './helpers';
import { useInputGroup } from './input-group-context';
import { type InputElementProps } from './types';

/**
 * InputLeftElement component for overlaying content on the left side of input
 * Typically used for icons or small interactive elements
 *
 * Features:
 * - Positioned absolutely inside the input
 * - Can be interactive (buttons) or decorative (icons)
 * - Input padding automatically adjusted
 * - Inherits size from InputGroup
 *
 * Example:
 * ```tsx
 * <InputGroup>
 *   <InputLeftElement>
 *     <SearchIcon />
 *   </InputLeftElement>
 *   <Input placeholder="Search..." />
 * </InputGroup>
 * ```
 */
export const InputLeftElement: FC<InputElementProps> = ({
  children,
  isDisabled: ownDisabled,
  isInteractive = false,
  className,
  ...props
}): ReactElement => {
  const context = useInputGroup();

  // Use defaults if not in a group context
  const size = context?.size ?? 'medium';
  const isDisabled = ownDisabled ?? context?.isDisabled ?? false;

  const elementClassName = buildElementClassName(
    'left',
    size,
    isInteractive,
    isDisabled,
    className,
  );

  return (
    <div
      className={elementClassName}
      data-disabled={isDisabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
};

InputLeftElement.displayName = 'InputLeftElement';

/**
 * InputRightElement component for overlaying content on the right side of input
 * Commonly used for clear buttons, password visibility toggles, or status icons
 *
 * Features:
 * - Positioned absolutely inside the input
 * - Can be interactive (buttons) or decorative (icons)
 * - Input padding automatically adjusted
 * - Inherits size from InputGroup
 *
 * Example:
 * ```tsx
 * <InputGroup>
 *   <Input placeholder="Password" type="password" />
 *   <InputRightElement isInteractive>
 *     <button onClick={toggleVisibility}>
 *       <EyeIcon />
 *     </button>
 *   </InputRightElement>
 * </InputGroup>
 * ```
 */
export const InputRightElement: FC<InputElementProps> = ({
  children,
  isDisabled: ownDisabled,
  isInteractive = false,
  className,
  ...props
}): ReactElement => {
  const context = useInputGroup();

  // Use defaults if not in a group context
  const size = context?.size ?? 'medium';
  const isDisabled = ownDisabled ?? context?.isDisabled ?? false;

  const elementClassName = buildElementClassName(
    'right',
    size,
    isInteractive,
    isDisabled,
    className,
  );

  return (
    <div
      className={elementClassName}
      data-disabled={isDisabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
};

InputRightElement.displayName = 'InputRightElement';
