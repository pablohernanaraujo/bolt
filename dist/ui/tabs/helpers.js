import { tabsList, tabsListVariants, tabTrigger, tabContent, tabContentVariants } from './tabs.css.js';

function buildTabsListClassName(orientation = 'horizontal', align = 'start', isFitted = false, className, renderProps) {
    const classes = [
        tabsList,
        tabsListVariants[orientation],
        tabsListVariants[align],
    ];
    if (isFitted) {
        classes.push(tabsListVariants.fitted);
    }
    const resolvedClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    if (resolvedClassName) {
        classes.push(resolvedClassName);
    }
    return classes.join(' ');
}
function buildTabTriggerClassName(size = 'medium', variant = 'default', orientation = 'horizontal', isFitted = false, className, renderProps) {
    const triggerClass = tabTrigger({
        size,
        variant,
        orientation,
        isFitted,
    });
    const resolvedClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    if (resolvedClassName) {
        return `${triggerClass} ${resolvedClassName}`;
    }
    return triggerClass;
}
function buildTabContentClassName(orientation = 'horizontal', className, renderProps) {
    const classes = [tabContent, tabContentVariants[orientation]];
    const resolvedClassName = renderProps && typeof className === 'function'
        ? className(renderProps)
        : className;
    if (resolvedClassName) {
        classes.push(resolvedClassName);
    }
    return classes.join(' ');
}
const getOrientation = (orientation) => orientation || 'horizontal';

export { buildTabContentClassName, buildTabTriggerClassName, buildTabsListClassName, getOrientation };
//# sourceMappingURL=helpers.js.map
