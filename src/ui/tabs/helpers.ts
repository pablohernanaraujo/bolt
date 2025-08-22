/* eslint-disable max-params */
// /src/ui/tabs/helpers.ts
// Utility functions and helpers for the Tabs component
// Contains className builders and component composition utilities
// RELEVANT FILES: tabs.tsx, tabs.css.ts, types.ts

import {
  type TabListRenderProps,
  type TabPanelRenderProps,
  type TabRenderProps,
} from 'react-aria-components';

import {
  tabContent,
  tabContentVariants,
  tabsList,
  tabsListVariants,
  tabTrigger,
} from './tabs.css';
import { type TabsRootProps } from './types';

/**
 * Builds className for tab list based on orientation, alignment, and fitted state
 */
export function buildTabsListClassName(
  orientation: 'horizontal' | 'vertical',
  align: TabsRootProps['align'],
  isFitted: boolean,
  className?: string,
): string;
export function buildTabsListClassName(
  orientation: 'horizontal' | 'vertical',
  align: TabsRootProps['align'],
  isFitted: boolean,
  className: (
    values: TabListRenderProps & { defaultClassName: string | undefined },
  ) => string,
  renderProps: TabListRenderProps & { defaultClassName: string | undefined },
): string;
export function buildTabsListClassName(
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  align: TabsRootProps['align'] = 'start',
  isFitted: boolean = false,
  className?:
    | string
    | ((
        values: TabListRenderProps & { defaultClassName: string | undefined },
      ) => string),
  renderProps?: TabListRenderProps & { defaultClassName: string | undefined },
): string {
  const classes = [
    tabsList,
    tabsListVariants[orientation],
    tabsListVariants[align],
  ];

  if (isFitted) {
    classes.push(tabsListVariants.fitted);
  }

  const resolvedClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  if (resolvedClassName) {
    classes.push(resolvedClassName);
  }

  return classes.join(' ');
}

/**
 * Builds className for tab trigger with all variants applied
 */
export function buildTabTriggerClassName(
  size: TabsRootProps['size'],
  variant: TabsRootProps['variant'],
  orientation: 'horizontal' | 'vertical',
  isFitted: boolean,
  className?: string,
): string;
export function buildTabTriggerClassName(
  size: TabsRootProps['size'],
  variant: TabsRootProps['variant'],
  orientation: 'horizontal' | 'vertical',
  isFitted: boolean,
  className: (
    values: TabRenderProps & { defaultClassName: string | undefined },
  ) => string,
  renderProps: TabRenderProps & { defaultClassName: string | undefined },
): string;
export function buildTabTriggerClassName(
  size: TabsRootProps['size'] = 'medium',
  variant: TabsRootProps['variant'] = 'default',
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  isFitted: boolean = false,
  className?:
    | string
    | ((
        values: TabRenderProps & { defaultClassName: string | undefined },
      ) => string),
  renderProps?: TabRenderProps & { defaultClassName: string | undefined },
): string {
  const triggerClass = tabTrigger({
    size,
    variant,
    orientation,
    isFitted,
  });

  const resolvedClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  if (resolvedClassName) {
    return `${triggerClass} ${resolvedClassName}`;
  }

  return triggerClass;
}

/**
 * Builds className for tab content based on orientation
 */
export function buildTabContentClassName(
  orientation: 'horizontal' | 'vertical',
  className?: string,
): string;
export function buildTabContentClassName(
  orientation: 'horizontal' | 'vertical',
  className: (
    values: TabPanelRenderProps & { defaultClassName: string | undefined },
  ) => string,
  renderProps: TabPanelRenderProps & { defaultClassName: string | undefined },
): string;
export function buildTabContentClassName(
  orientation: 'horizontal' | 'vertical' = 'horizontal',
  className?:
    | string
    | ((
        values: TabPanelRenderProps & { defaultClassName: string | undefined },
      ) => string),
  renderProps?: TabPanelRenderProps & { defaultClassName: string | undefined },
): string {
  const classes = [tabContent, tabContentVariants[orientation]];

  const resolvedClassName =
    renderProps && typeof className === 'function'
      ? className(renderProps)
      : (className as string);

  if (resolvedClassName) {
    classes.push(resolvedClassName);
  }

  return classes.join(' ');
}

/**
 * Extracts orientation from tabs props, with fallback to horizontal
 */
export const getOrientation = (
  orientation?: 'horizontal' | 'vertical',
): 'horizontal' | 'vertical' => orientation || 'horizontal';

/**
 * Determines if tabs should be fitted based on isFitted prop
 */
export const shouldBeFitted = (isFitted?: boolean): boolean =>
  Boolean(isFitted);
