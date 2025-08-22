// /src/ui/checkbox/checkbox.tsx
// Checkbox component with server-first architecture and React Server Components compatibility
// Provides server-compatible checkbox with optional client-side enhancements
// RELEVANT FILES: checkbox-server.tsx, checkbox-client.tsx, checkbox.css.ts, types.ts, helpers.ts

// Re-export server component as the default Checkbox API (RSC compatible)
export { CheckboxServer as Checkbox } from './checkbox-server';

// Re-export client component for when advanced React Aria features are needed
export { CheckboxClient } from './checkbox-client';

// Re-export types for both server and client usage
export type { CheckboxProps } from './types';
export type { CheckboxServerProps } from './checkbox-server';
