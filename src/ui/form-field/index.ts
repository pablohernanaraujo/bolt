// /src/ui/form-field/index.ts
// Export all FormField component exports
// Barrel export file for the FormField component
// RELEVANT FILES: form-field.tsx, types.ts

export { FormField } from './form-field';
export {
  buildAriaDescribedBy,
  buildFormFieldClassName,
  generateFormFieldIds,
  hasFormFieldError,
} from './helpers';
export type { FormFieldProps } from './types';
