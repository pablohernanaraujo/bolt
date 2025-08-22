// /src/ui/tabs/tabs.tsx
// Accessible tabs component built with React Aria Components
// Provides compound components for organizing content in tabbed interface
// RELEVANT FILES: tabs.css.ts, types.ts, helpers.ts

'use client';
import { forwardRef, type ReactElement } from 'react';
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
} from 'react-aria-components';

import {
  buildTabContentClassName,
  buildTabsListClassName,
  buildTabTriggerClassName,
  getOrientation,
} from './helpers';
import { tabsRoot } from './tabs.css';
import {
  type TabsContentProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from './types';

/**
 * Tabs Root Component
 * Main container that manages tab state and provides context
 *
 * Features:
 * - Multiple visual variants (default, enclosed, soft-rounded)
 * - Three sizes (small, medium, large)
 * - Horizontal and vertical orientations
 * - Fitted and aligned layouts
 * - Full keyboard navigation and accessibility
 */
const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  (
    {
      size = 'medium',
      variant = 'default',
      isFitted = false,
      align = 'start',
      orientation = 'horizontal',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => (
    <AriaTabs
      ref={ref}
      orientation={orientation}
      className={`${tabsRoot} ${className || ''}`}
      data-size={size}
      data-variant={variant}
      data-fitted={isFitted}
      data-align={align}
      {...props}
    >
      {children}
    </AriaTabs>
  ),
);

TabsRoot.displayName = 'Tabs.Root';

/**
 * Tabs List Component
 * Container for tab triggers, handles layout and styling
 */
const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref): ReactElement => (
    <AriaTabList
      ref={ref}
      className={(renderProps) => {
        // Get context from parent Tabs component
        const tabsElement = renderProps.defaultClassName
          ? (document.querySelector('[data-size]') as HTMLElement)
          : null;

        const isFitted = tabsElement?.getAttribute('data-fitted') === 'true';
        const align =
          (tabsElement?.getAttribute('data-align') as TabsRootProps['align']) ||
          'start';
        const orientation = getOrientation(
          tabsElement?.getAttribute('aria-orientation') as
            | 'horizontal'
            | 'vertical',
        );

        return typeof className === 'function'
          ? buildTabsListClassName(orientation, align, isFitted, className, {
              ...renderProps,
              defaultClassName: renderProps.defaultClassName || '',
            })
          : buildTabsListClassName(orientation, align, isFitted, className);
      }}
      {...props}
    >
      {children}
    </AriaTabList>
  ),
);

TabsList.displayName = 'Tabs.List';

/**
 * Tabs Trigger Component
 * Individual tab button that switches between content panels
 */
const TabsTrigger = forwardRef<HTMLDivElement, TabsTriggerProps>(
  (
    { isDisabled = false, className, children, ...props },
    ref,
  ): ReactElement => (
    <AriaTab
      ref={ref}
      isDisabled={isDisabled}
      className={(renderProps) => {
        // Get context from parent Tabs component
        const tabsElement = renderProps.defaultClassName
          ? (document.querySelector('[data-size]') as HTMLElement)
          : null;

        const size =
          (tabsElement?.getAttribute('data-size') as TabsRootProps['size']) ||
          'medium';
        const variant =
          (tabsElement?.getAttribute(
            'data-variant',
          ) as TabsRootProps['variant']) || 'default';
        const isFitted = tabsElement?.getAttribute('data-fitted') === 'true';
        const orientation = getOrientation(
          tabsElement?.getAttribute('aria-orientation') as
            | 'horizontal'
            | 'vertical',
        );

        return typeof className === 'function'
          ? buildTabTriggerClassName(
              size,
              variant,
              orientation,
              isFitted,
              className,
              {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
              },
            )
          : buildTabTriggerClassName(
              size,
              variant,
              orientation,
              isFitted,
              className,
            );
      }}
      {...props}
    >
      {children}
    </AriaTab>
  ),
);

TabsTrigger.displayName = 'Tabs.Trigger';

/**
 * Tabs Content Component
 * Content panel that displays content for the selected tab
 */
const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, ...props }, ref): ReactElement => (
    <AriaTabPanel
      ref={ref}
      className={(renderProps) => {
        // Get context from parent Tabs component
        const tabsElement = renderProps.defaultClassName
          ? (document.querySelector('[data-size]') as HTMLElement)
          : null;

        const orientation = getOrientation(
          tabsElement?.getAttribute('aria-orientation') as
            | 'horizontal'
            | 'vertical',
        );

        return typeof className === 'function'
          ? buildTabContentClassName(orientation, className, {
              ...renderProps,
              defaultClassName: renderProps.defaultClassName || '',
            })
          : buildTabContentClassName(orientation, className);
      }}
      {...props}
    >
      {children}
    </AriaTabPanel>
  ),
);

TabsContent.displayName = 'Tabs.Content';

/**
 * Tabs compound component with all sub-components
 *
 * Usage:
 * ```tsx
 * <Tabs.Root defaultSelectedKey="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger id="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger id="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content id="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content id="tab2">Content 2</Tabs.Content>
 * </Tabs.Root>
 * ```
 */
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
