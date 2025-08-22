// /src/ui/menu/index.ts
// Barrel export file for Menu components
// Exports all Menu-related components and types
// RELEVANT FILES: menu.tsx, types.ts, helpers.ts

export {
  buildMenuClassName,
  buildMenuItemClassName,
  buildMenuSectionClassName,
  buildMenuSeparatorClassName,
  getAriaPlacement,
  getMenuWidthConstraints,
  getOffsetForSize,
  getTransformOrigin,
  isValidMenuPlacement,
  scrollItemIntoView,
  shouldShowShortcut,
} from './helpers';
export {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from './menu';
export type {
  MenuCollectionItem,
  MenuItemProps,
  MenuItemVariant,
  MenuPlacement,
  MenuProps,
  MenuSectionProps,
  MenuSeparatorProps,
  MenuSize,
  MenuTriggerProps,
  MenuVariant,
} from './types';
