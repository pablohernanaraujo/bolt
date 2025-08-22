// /src/ui/input/index.ts
// Barrel export file for Input component with server-first architecture
// Exports server-compatible components as defaults with client alternatives
// RELEVANT FILES: input.tsx, input-server.tsx, input-client.tsx, types.ts

export { buildInputClassName, isInputInvalid } from './helpers';
export { Input, InputClient } from './input';
export type { InputFieldProps } from './input-field';
export { InputField } from './input-field';
export type { InputWithClearProps } from './input-with-clear';
export { InputWithClear } from './input-with-clear';
export type { InputProps, InputServerProps } from './input';
