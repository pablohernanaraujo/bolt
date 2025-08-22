// /src/ui/layout/index.ts
// Main export file for layout components
// Re-exports all layout components for consumption
// RELEVANT FILES: aspect-ratio/index.ts, flex/index.ts, grid/index.ts, hstack/index.ts

// Aspect Ratio component
export type {
  AspectRatioPreset,
  AspectRatioProps,
  CustomAspectRatio,
  ObjectFit,
} from './aspect-ratio';
export { AspectRatio } from './aspect-ratio';

// Center component
export type { CenterComponentProps, CenterProps } from './center';
export { Center } from './center';

// Container component
export type { ContainerProps } from './container';
export { Container } from './container';

// Content Wrapper component
export type {
  ContentWrapperProps,
  ContentWrapperVariant,
} from './content-wrapper';
export { ContentWrapper } from './content-wrapper';

// Flex component
export type { FlexDirection, FlexProps, FlexWrap } from './flex';
export { Flex } from './flex';

// Grid components
export type {
  GridArea,
  GridAuto,
  GridGap,
  GridItemProps,
  GridLine,
  GridProps,
  GridTemplate,
} from './grid';
export { Grid, GridItem } from './grid';

// Stack components
export type {
  AlignValue,
  HStackProps,
  JustifyValue,
  SpaceValue,
} from './hstack';
export { HStack } from './hstack';
export type { VStackProps } from './vstack';
export { VStack } from './vstack';

// App Layout components
export type { AppHeaderProps } from './app-header';
export { AppHeader } from './app-header';
export type { AppLayoutProps } from './app-layout';
export { AppLayout } from './app-layout';
export type { MainContentProps } from './main-content';
export { MainContent } from './main-content';
export type { SidebarProps } from './sidebar';
export { Sidebar } from './sidebar';
