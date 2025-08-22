// /src/ui/layout/content-wrapper/index.ts
// Barrel export file for Content Wrapper component and related types
// Provides clean imports for the Content Wrapper layout component
// RELEVANT FILES: content-wrapper.tsx, types.ts, helpers.ts

export { ContentWrapper } from './content-wrapper';
export { buildContentWrapperClassName, getEffectivePadding } from './helpers';
export type {
  ContentWrapperProps,
  ContentWrapperVariant,
  SimpleContentWrapperProps,
  SpaceValue,
} from './types';
