// /src/ui/link/index.ts
// Barrel export file for Link component with server-first approach
// Exports server-compatible Link as default, with client version available when needed
// RELEVANT FILES: link-server.tsx, link.tsx, types.ts, helpers.ts

export {
  buildContainerClassName,
  buildIconClassName,
  buildLinkClassName,
  getExternalLinkAttributes,
  isExternalUrl,
  sanitizeHref,
} from './helpers';

// Server-first export pattern: server component as default
export { LinkServer as Link } from './link-server';

// Client component available when interactivity is needed
export { Link as LinkClient } from './link';
export type { LinkProps, LinkSize, LinkUnderline, LinkVariant } from './types';
