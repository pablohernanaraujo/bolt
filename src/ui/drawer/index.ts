// /src/ui/drawer/index.ts
// Export all drawer components and types
// Barrel export for the Drawer component family
// RELEVANT FILES: drawer.tsx, types.ts, helpers.ts

export {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from './drawer';
export {
  buildDrawerBodyClassName,
  buildDrawerDialogClassName,
  buildDrawerFooterClassName,
  drawerKeyboardHandler,
  generateDrawerId,
  getOptimalPlacement,
  scrollLockManager,
} from './helpers';
export type {
  DrawerBodyProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerPlacement,
  DrawerProps,
  DrawerSize,
  DrawerTriggerProps,
} from './types';
