// /src/ui/checkbox/index.ts
// Barrel export file for Checkbox component with server-first architecture
// Exports server-compatible components as defaults with client alternatives
// RELEVANT FILES: checkbox.tsx, checkbox-server.tsx, checkbox-client.tsx, types.ts, helpers.ts

export { Checkbox, CheckboxClient } from './checkbox';
export {
  buildCheckboxClassName,
  buildCheckmarkClassName,
  buildContainerClassName,
  buildLabelClassName,
} from './helpers';
export type { CheckboxProps, CheckboxServerProps } from './checkbox';
