// /src/ui/textarea/index.ts
// Barrel export file for the TextArea component
// Exports component and all related types and utilities
// RELEVANT FILES: textarea.tsx, types.ts, helpers.ts

export {
  buildTextAreaClassName,
  getTextAreaRows,
  isTextAreaInvalid,
} from './helpers';
export { TextArea } from './textarea';
export type { TextAreaProps } from './types';
