// /src/ui/tabs/types.ts
// Type definitions and interfaces for the Tabs component
// Exports interfaces for all tab components extending React Aria Components
// RELEVANT FILES: tabs.tsx, index.ts, helpers.ts

import {
  type TabListProps as AriaTabListProps,
  type TabPanelProps as AriaTabPanelProps,
  type TabProps as AriaTabProps,
  type TabsProps as AriaTabsProps,
} from 'react-aria-components';

/**
 * Props interface for the Tabs.Root component
 * Extends React Aria TabsProps with additional design system properties
 */
export interface TabsRootProps extends AriaTabsProps {
  /**
   * Size variant for all tabs in the group
   * Controls padding and font size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Visual variant for the tabs
   * Controls styling and appearance
   * @default 'default'
   */
  variant?: 'default' | 'enclosed' | 'soft-rounded' | 'unstyled';

  /**
   * Whether tabs should be fitted to container
   * Makes tabs expand to fill available width
   * @default false
   */
  isFitted?: boolean;

  /**
   * Alignment of tab list
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
}

/**
 * Props interface for the Tabs.List component
 * Extends React Aria TabListProps with design system properties
 */
export interface TabsListProps extends AriaTabListProps<object> {}

/**
 * Props interface for the Tabs.Trigger component
 * Extends React Aria TabProps with design system properties
 */
export interface TabsTriggerProps extends AriaTabProps {
  /**
   * Whether the tab is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props interface for the Tabs.Content component
 * Extends React Aria TabPanelProps with design system properties
 */
export interface TabsContentProps extends AriaTabPanelProps {}
