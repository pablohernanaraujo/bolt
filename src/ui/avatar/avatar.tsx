// /src/ui/avatar/avatar.tsx
// Avatar component with server-first architecture
// Provides server-compatible avatar with optional client-side image loading
// RELEVANT FILES: avatar-server.tsx, avatar-client.tsx, avatar.css.ts, types.ts, helpers.ts

// Re-export server component as the default Avatar API
export { AvatarServer as Avatar } from './avatar-server';

// Re-export client component for when image loading is specifically needed
export { AvatarWithImage } from './avatar-client';

// Re-export types
export type {
  AvatarProps,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
} from './types';
