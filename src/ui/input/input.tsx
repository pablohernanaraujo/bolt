// /src/ui/input/input.tsx
// Input component with server-first architecture and React Server Components compatibility
// Provides server-compatible input with optional client-side enhancements
// RELEVANT FILES: input-server.tsx, input-client.tsx, input.css.ts, types.ts, helpers.ts

// Re-export server component as the default Input API (RSC compatible)
export { InputServer as Input } from './input-server';

// Re-export client component for when advanced React Aria features are needed
export { InputClient } from './input-client';

// Re-export types for both server and client usage
export type { InputProps } from './types';
export type { InputServerProps } from './input-server';
