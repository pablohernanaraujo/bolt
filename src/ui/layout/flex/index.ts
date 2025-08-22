// /src/ui/layout/flex/index.ts
// Barrel export for Flex component and related types
// Single entry point for importing Flex functionality
// RELEVANT FILES: flex.tsx, types.ts, helpers.ts

export { Flex } from './flex';
export {
  buildFlexClassName,
  isColumnDirection,
  isReversedDirection,
} from './helpers';
export type {
  AlignValue,
  FlexDirection,
  FlexProps,
  FlexWrap,
  JustifyValue,
  SpaceValue,
} from './types';
