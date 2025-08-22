// /src/ui/button/button.tsx
// Button component with server-first architecture and React Server Components compatibility
// Provides server-compatible button with optional client-side enhancements
// RELEVANT FILES: button-server.tsx, button-client.tsx, button.css.ts, types.ts, helpers.ts

// Re-export server component as the default Button API (RSC compatible)
export { ButtonServer as Button } from './button-server';

// Re-export client component for when advanced React Aria features are needed
export { ButtonClient } from './button-client';

// Re-export types for both server and client usage
export type { ButtonProps } from './types';
export type { ButtonServerProps } from './button-server';
