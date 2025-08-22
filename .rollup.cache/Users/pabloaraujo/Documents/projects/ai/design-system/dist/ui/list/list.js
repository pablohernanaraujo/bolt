import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Icon } from '@/icons';
import { buildListItemClassName, buildListRootClassName, getListElement, } from './helpers';
import * as styles from './list.css';
export const ListRoot = forwardRef(({ variant = 'unordered', spacing = 'md', className, children, ...props }, ref) => {
    const Element = getListElement(variant);
    return (_jsx(Element, { ref: ref, className: buildListRootClassName(variant, spacing, className), role: variant === 'basic' ? 'list' : undefined, ...props, children: children }));
});
ListRoot.displayName = 'List.Root';
export const ListItem = forwardRef(({ icon, emphasis = 'high', weight = 'normal', decoration, size = 'base', colorScheme = 'default', className, children, ...props }, ref) => (_jsxs("li", { ref: ref, className: buildListItemClassName(!!icon, emphasis, weight, decoration, size, colorScheme, className), role: "listitem", ...props, children: [icon && (_jsx("div", { className: styles.listItemIcon, children: _jsx(Icon, { icon: icon, size: "sm" }) })), _jsx("div", { className: styles.listItemContent, children: children })] })));
ListItem.displayName = 'List.Item';
export const List = {
    Root: ListRoot,
    Item: ListItem,
};
