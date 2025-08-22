// /src/ui/button/index.ts
// Barrel export file for Button component with server-first architecture
// Exports server-compatible components as defaults with client alternatives
// RELEVANT FILES: button.tsx, button-server.tsx, button-client.tsx, types.ts, helpers.ts

// Export the main Button component (server-compatible by default)
export { Button, ButtonClient } from './button';

// Export all types for external consumption
export type { ButtonProps, ButtonServerProps } from './button';

// Export helper functions for advanced use cases
export { buildButtonClassName } from './helpers';
