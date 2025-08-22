// /src/ui/input-group/input-addons.tsx
// Left and right addon components for InputGroup
// Static elements that visually extend the input field
// RELEVANT FILES: input-group.tsx, types.ts, input-group.css.ts

import { type FC, type ReactElement } from 'react';

import { buildAddonClassName } from './helpers';
import { useInputGroup } from './input-group-context';
import { type InputAddonProps } from './types';

/**
 * InputLeftAddon component for adding content to the left of an input
 * Displays static content like currency symbols or URL prefixes
 *
 * Features:
 * - Inherits size and variant from InputGroup
 * - Seamless visual connection with input
 * - Proper border radius handling
 * - Disabled state support
 *
 * Example:
 * ```tsx
 * <InputGroup>
 *   <InputLeftAddon>$</InputLeftAddon>
 *   <Input placeholder="0.00" />
 * </InputGroup>
 * ```
 */
export const InputLeftAddon: FC<InputAddonProps> = ({
  children,
  isDisabled: ownDisabled,
  className,
  ...props
}): ReactElement => {
  const context = useInputGroup();

  // Use defaults if not in a group context
  const size = context?.size ?? 'medium';
  const variant = context?.variant ?? 'outline';
  const isDisabled = ownDisabled ?? context?.isDisabled ?? false;

  const addonClassName = buildAddonClassName(
    'left',
    size,
    variant,
    isDisabled,
    className,
  );

  return (
    <div
      className={addonClassName}
      data-disabled={isDisabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
};

InputLeftAddon.displayName = 'InputLeftAddon';

/**
 * InputRightAddon component for adding content to the right of an input
 * Displays static content like domain extensions or units
 *
 * Features:
 * - Inherits size and variant from InputGroup
 * - Seamless visual connection with input
 * - Proper border radius handling
 * - Disabled state support
 *
 * Example:
 * ```tsx
 * <InputGroup>
 *   <Input placeholder="mysite" />
 *   <InputRightAddon>.com</InputRightAddon>
 * </InputGroup>
 * ```
 */
export const InputRightAddon: FC<InputAddonProps> = ({
  children,
  isDisabled: ownDisabled,
  className,
  ...props
}): ReactElement => {
  const context = useInputGroup();

  // Use defaults if not in a group context
  const size = context?.size ?? 'medium';
  const variant = context?.variant ?? 'outline';
  const isDisabled = ownDisabled ?? context?.isDisabled ?? false;

  const addonClassName = buildAddonClassName(
    'right',
    size,
    variant,
    isDisabled,
    className,
  );

  return (
    <div
      className={addonClassName}
      data-disabled={isDisabled || undefined}
      {...props}
    >
      {children}
    </div>
  );
};

InputRightAddon.displayName = 'InputRightAddon';
