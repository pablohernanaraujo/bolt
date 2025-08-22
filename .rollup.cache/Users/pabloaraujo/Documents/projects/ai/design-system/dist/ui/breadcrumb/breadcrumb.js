'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { createContext, useContext, useState, } from 'react';
import { Icon } from '@/icons';
import * as styles from './breadcrumb.css';
const BreadcrumbContext = createContext({
    size: 'medium',
    variant: 'default',
});
const useBreadcrumbContext = () => {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('Breadcrumb components must be used within BreadcrumbRoot');
    }
    return context;
};
export const BreadcrumbRoot = ({ children, size = 'medium', variant = 'default', className = '', 'aria-label': ariaLabel = 'Breadcrumb navigation', }) => {
    const contextValue = {
        size,
        variant,
    };
    return (_jsx(BreadcrumbContext.Provider, { value: contextValue, children: _jsx("nav", { className: `${styles.breadcrumbRoot} ${styles.breadcrumbVariants[variant]} ${className}`, "aria-label": ariaLabel, role: "navigation", children: children }) }));
};
export const BreadcrumbList = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (_jsx("ol", { className: `${styles.breadcrumbList} ${styles.breadcrumbListSizeVariants[size]} ${styles.breadcrumbResponsive} ${className}`, children: children }));
};
export const BreadcrumbItem = ({ children, className = '', icon, isCurrentPage = false, }) => (_jsxs("li", { className: `${styles.breadcrumbItem} ${className}`, "aria-current": isCurrentPage ? 'page' : undefined, children: [icon && _jsx("span", { className: styles.breadcrumbIcon, children: icon }), children] }));
export const BreadcrumbLink = ({ children, href, className = '', onClick, external = false, }) => {
    const { size } = useBreadcrumbContext();
    const linkProps = {
        className: `${styles.breadcrumbLinkBase} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`,
        onClick,
        title: typeof children === 'string' ? children : undefined,
    };
    if (external) {
        return (_jsx("a", { ...linkProps, href: href, target: "_blank", rel: "noopener noreferrer", children: children }));
    }
    return (_jsx(Link, { ...linkProps, href: href, children: children }));
};
export const BreadcrumbCurrentLink = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (_jsx("span", { className: `${styles.breadcrumbCurrentLink} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`, "aria-current": "page", title: typeof children === 'string' ? children : undefined, children: children }));
};
export const BreadcrumbSeparator = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (_jsx("span", { className: `${styles.breadcrumbSeparator} ${styles.breadcrumbSeparatorSizeVariants[size]} ${className}`, role: "presentation", "aria-hidden": "true", children: children || _jsx(Icon, { icon: ChevronRight, size: "sm" }) }));
};
const BreadcrumbEllipsis = ({ items, className = '', }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { size } = useBreadcrumbContext();
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
        else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };
    return (_jsxs("li", { className: styles.breadcrumbItem, children: [_jsx("button", { className: `${styles.breadcrumbEllipsis} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`, onClick: handleClick, onKeyDown: handleKeyDown, "aria-expanded": isOpen, "aria-label": "Show collapsed breadcrumb items", title: "Show collapsed breadcrumb items", children: _jsx(Icon, { icon: MoreHorizontal, size: "sm" }) }), isOpen && (_jsx("div", { className: styles.breadcrumbDropdown, children: items.map((item) => (_jsxs(BreadcrumbLink, { href: item.href, className: "truncate", children: [item.icon && (_jsx("span", { className: styles.breadcrumbIcon, children: item.icon })), item.label] }, item.id))) }))] }));
};
const renderCollapsedBreadcrumbs = (items, separator, maxItems, itemsBeforeCollapse, itemsAfterCollapse) => {
    if (items.length <= maxItems) {
        return items.flatMap((item, index) => {
            const elements = [];
            elements.push(_jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (_jsx(BreadcrumbCurrentLink, { children: item.label })) : (_jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
            if (index < items.length - 1) {
                elements.push(_jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
            }
            return elements;
        });
    }
    const startItems = items.slice(0, itemsBeforeCollapse);
    const endItems = items.slice(-itemsAfterCollapse);
    const collapsedItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);
    const elements = [];
    for (const item of startItems) {
        elements.push(_jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (_jsx(BreadcrumbCurrentLink, { children: item.label })) : (_jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
        elements.push(_jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
    }
    if (collapsedItems.length > 0) {
        elements.push(_jsx(BreadcrumbEllipsis, { items: collapsedItems }, "ellipsis"));
        elements.push(_jsx(BreadcrumbSeparator, { children: separator }, "separator-ellipsis"));
    }
    for (const [index, item] of endItems.entries()) {
        elements.push(_jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (_jsx(BreadcrumbCurrentLink, { children: item.label })) : (_jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
        if (index < endItems.length - 1) {
            elements.push(_jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
        }
    }
    return elements;
};
export const Breadcrumb = ({ items, size = 'medium', variant = 'default', separator, maxItems, itemsBeforeCollapse = 1, itemsAfterCollapse = 1, className, 'aria-label': ariaLabel, }) => {
    const safeItemsBeforeCollapse = Math.max(1, itemsBeforeCollapse);
    const safeItemsAfterCollapse = Math.max(1, itemsAfterCollapse);
    const safeMaxItems = maxItems ? Math.max(3, maxItems) : undefined;
    const breadcrumbElements = safeMaxItems
        ? renderCollapsedBreadcrumbs(items, separator, safeMaxItems, safeItemsBeforeCollapse, safeItemsAfterCollapse)
        : items.flatMap((item, index) => {
            const elements = [];
            elements.push(_jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (_jsx(BreadcrumbCurrentLink, { children: item.label })) : (_jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
            if (index < items.length - 1) {
                elements.push(_jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
            }
            return elements;
        });
    return (_jsx(BreadcrumbRoot, { size: size, variant: variant, className: className, "aria-label": ariaLabel, children: _jsx(BreadcrumbList, { children: breadcrumbElements }) }));
};
