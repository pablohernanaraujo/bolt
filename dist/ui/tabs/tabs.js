import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Tabs as Tabs$1, TabList, Tab, TabPanel } from 'react-aria-components';
import { getOrientation, buildTabsListClassName, buildTabTriggerClassName, buildTabContentClassName } from './helpers.js';
import { tabsRoot } from './tabs.css.js';

const TabsRoot = forwardRef(({ size = 'medium', variant = 'default', isFitted = false, align = 'start', orientation = 'horizontal', className, children, ...props }, ref) => (jsx(Tabs$1, { ref: ref, orientation: orientation, className: `${tabsRoot} ${className || ''}`, "data-size": size, "data-variant": variant, "data-fitted": isFitted, "data-align": align, ...props, children: children })));
TabsRoot.displayName = 'Tabs.Root';
const TabsList = forwardRef(({ className, children, ...props }, ref) => (jsx(TabList, { ref: ref, className: (renderProps) => {
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
    }, ...props, children: children })));
TabsList.displayName = 'Tabs.List';
const TabsTrigger = forwardRef(({ isDisabled = false, className, children, ...props }, ref) => (jsx(Tab, { ref: ref, isDisabled: isDisabled, className: (renderProps) => {
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
    }, ...props, children: children })));
TabsTrigger.displayName = 'Tabs.Trigger';
const TabsContent = forwardRef(({ className, children, ...props }, ref) => (jsx(TabPanel, { ref: ref, className: (renderProps) => {
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
    }, ...props, children: children })));
TabsContent.displayName = 'Tabs.Content';
const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
};

export { Tabs };
//# sourceMappingURL=tabs.js.map
