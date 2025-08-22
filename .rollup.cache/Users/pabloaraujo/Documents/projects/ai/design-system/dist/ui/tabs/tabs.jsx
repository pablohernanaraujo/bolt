'use client';
import { forwardRef } from 'react';
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs, } from 'react-aria-components';
import { buildTabContentClassName, buildTabsListClassName, buildTabTriggerClassName, getOrientation, } from './helpers';
import { tabsRoot } from './tabs.css';
const TabsRoot = forwardRef(({ size = 'medium', variant = 'default', isFitted = false, align = 'start', orientation = 'horizontal', className, children, ...props }, ref) => (<AriaTabs ref={ref} orientation={orientation} className={`${tabsRoot} ${className || ''}`} data-size={size} data-variant={variant} data-fitted={isFitted} data-align={align} {...props}>
      {children}
    </AriaTabs>));
TabsRoot.displayName = 'Tabs.Root';
const TabsList = forwardRef(({ className, children, ...props }, ref) => (<AriaTabList ref={ref} className={(renderProps) => {
        const tabsElement = renderProps.defaultClassName
            ? document.querySelector('[data-size]')
            : null;
        const isFitted = tabsElement?.getAttribute('data-fitted') === 'true';
        const align = tabsElement?.getAttribute('data-align') ||
            'start';
        const orientation = getOrientation(tabsElement?.getAttribute('aria-orientation'));
        return typeof className === 'function'
            ? buildTabsListClassName(orientation, align, isFitted, className, {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
            })
            : buildTabsListClassName(orientation, align, isFitted, className);
    }} {...props}>
      {children}
    </AriaTabList>));
TabsList.displayName = 'Tabs.List';
const TabsTrigger = forwardRef(({ isDisabled = false, className, children, ...props }, ref) => (<AriaTab ref={ref} isDisabled={isDisabled} className={(renderProps) => {
        const tabsElement = renderProps.defaultClassName
            ? document.querySelector('[data-size]')
            : null;
        const size = tabsElement?.getAttribute('data-size') ||
            'medium';
        const variant = tabsElement?.getAttribute('data-variant') || 'default';
        const isFitted = tabsElement?.getAttribute('data-fitted') === 'true';
        const orientation = getOrientation(tabsElement?.getAttribute('aria-orientation'));
        return typeof className === 'function'
            ? buildTabTriggerClassName(size, variant, orientation, isFitted, className, {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
            })
            : buildTabTriggerClassName(size, variant, orientation, isFitted, className);
    }} {...props}>
      {children}
    </AriaTab>));
TabsTrigger.displayName = 'Tabs.Trigger';
const TabsContent = forwardRef(({ className, children, ...props }, ref) => (<AriaTabPanel ref={ref} className={(renderProps) => {
        const tabsElement = renderProps.defaultClassName
            ? document.querySelector('[data-size]')
            : null;
        const orientation = getOrientation(tabsElement?.getAttribute('aria-orientation'));
        return typeof className === 'function'
            ? buildTabContentClassName(orientation, className, {
                ...renderProps,
                defaultClassName: renderProps.defaultClassName || '',
            })
            : buildTabContentClassName(orientation, className);
    }} {...props}>
      {children}
    </AriaTabPanel>));
TabsContent.displayName = 'Tabs.Content';
export const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
};
