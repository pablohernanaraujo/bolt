// /src/ui/input-group/index.ts
// Export all InputGroup components and types
// Central export point for input group functionality
// RELEVANT FILES: input-group.tsx, input-addons.tsx, input-elements.tsx, types.ts

export { InputLeftAddon, InputRightAddon } from './input-addons';
export { InputLeftElement, InputRightElement } from './input-elements';
export { InputGroup } from './input-group';
export { useInputGroup, useInputGroupRequired } from './input-group-context';
export type {
  InputAddonProps,
  InputElementProps,
  InputGroupContextValue,
  InputGroupProps,
} from './types';
