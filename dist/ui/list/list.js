import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Icon } from '../../icons/index.js';
import { getListElement, buildListRootClassName, buildListItemClassName } from './helpers.js';
import { listItemIcon, listItemContent } from './list.css.js';

const ListRoot = forwardRef(({ variant = 'unordered', spacing = 'md', className, children, ...props }, ref) => {
    const Element = getListElement(variant);
    return (jsx(Element, { ref: ref, className: buildListRootClassName(variant, spacing, className), role: variant === 'basic' ? 'list' : undefined, ...props, children: children }));
});
ListRoot.displayName = 'List.Root';
const ListItem = forwardRef(({ icon, emphasis = 'high', weight = 'normal', decoration, size = 'base', colorScheme = 'default', className, children, ...props }, ref) => (jsxs("li", { ref: ref, className: buildListItemClassName(!!icon, emphasis, weight, decoration, size, colorScheme, className), role: "listitem", ...props, children: [icon && (jsx("div", { className: listItemIcon, children: jsx(Icon, { icon: icon, size: "sm" }) })), jsx("div", { className: listItemContent, children: children })] })));
ListItem.displayName = 'List.Item';
const List = {
    Root: ListRoot,
    Item: ListItem,
};

export { List, ListItem, ListRoot };
//# sourceMappingURL=list.js.map
