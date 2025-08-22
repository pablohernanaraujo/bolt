import { jsxs, jsx } from 'react/jsx-runtime';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import NextLink from 'next/link';
import { createContext, useContext, useState } from 'react';
import { Icon } from '../../icons/index.js';
import { breadcrumbCurrentLink, breadcrumbLinkSizeVariants, breadcrumbItem, breadcrumbIcon, breadcrumbLinkBase, breadcrumbList, breadcrumbListSizeVariants, breadcrumbResponsive, breadcrumbRoot, breadcrumbVariants, breadcrumbSeparator, breadcrumbSeparatorSizeVariants, breadcrumbEllipsis, breadcrumbDropdown } from './breadcrumb.css.js';

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
const BreadcrumbRoot = ({ children, size = 'medium', variant = 'default', className = '', 'aria-label': ariaLabel = 'Breadcrumb navigation', }) => {
    const contextValue = {
        size,
        variant,
    };
    return (jsx(BreadcrumbContext.Provider, { value: contextValue, children: jsx("nav", { className: `${breadcrumbRoot} ${breadcrumbVariants[variant]} ${className}`, "aria-label": ariaLabel, role: "navigation", children: children }) }));
};
const BreadcrumbList = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (jsx("ol", { className: `${breadcrumbList} ${breadcrumbListSizeVariants[size]} ${breadcrumbResponsive} ${className}`, children: children }));
};
const BreadcrumbItem = ({ children, className = '', icon, isCurrentPage = false, }) => (jsxs("li", { className: `${breadcrumbItem} ${className}`, "aria-current": isCurrentPage ? 'page' : undefined, children: [icon && jsx("span", { className: breadcrumbIcon, children: icon }), children] }));
const BreadcrumbLink = ({ children, href, className = '', onClick, external = false, }) => {
    const { size } = useBreadcrumbContext();
    const linkProps = {
        className: `${breadcrumbLinkBase} ${breadcrumbLinkSizeVariants[size]} ${className}`,
        onClick,
        title: typeof children === 'string' ? children : undefined,
    };
    if (external) {
        return (jsx("a", { ...linkProps, href: href, target: "_blank", rel: "noopener noreferrer", children: children }));
    }
    return (jsx(NextLink, { ...linkProps, href: href, children: children }));
};
const BreadcrumbCurrentLink = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (jsx("span", { className: `${breadcrumbCurrentLink} ${breadcrumbLinkSizeVariants[size]} ${className}`, "aria-current": "page", title: typeof children === 'string' ? children : undefined, children: children }));
};
const BreadcrumbSeparator = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (jsx("span", { className: `${breadcrumbSeparator} ${breadcrumbSeparatorSizeVariants[size]} ${className}`, role: "presentation", "aria-hidden": "true", children: children || jsx(Icon, { icon: ChevronRight, size: "sm" }) }));
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
    return (jsxs("li", { className: breadcrumbItem, children: [jsx("button", { className: `${breadcrumbEllipsis} ${breadcrumbLinkSizeVariants[size]} ${className}`, onClick: handleClick, onKeyDown: handleKeyDown, "aria-expanded": isOpen, "aria-label": "Show collapsed breadcrumb items", title: "Show collapsed breadcrumb items", children: jsx(Icon, { icon: MoreHorizontal, size: "sm" }) }), isOpen && (jsx("div", { className: breadcrumbDropdown, children: items.map((item) => (jsxs(BreadcrumbLink, { href: item.href, className: "truncate", children: [item.icon && (jsx("span", { className: breadcrumbIcon, children: item.icon })), item.label] }, item.id))) }))] }));
};
const renderCollapsedBreadcrumbs = (items, separator, maxItems, itemsBeforeCollapse, itemsAfterCollapse) => {
    if (items.length <= maxItems) {
        return items.flatMap((item, index) => {
            const elements = [];
            elements.push(jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (jsx(BreadcrumbCurrentLink, { children: item.label })) : (jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
            if (index < items.length - 1) {
                elements.push(jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
            }
            return elements;
        });
    }
    const startItems = items.slice(0, itemsBeforeCollapse);
    const endItems = items.slice(-itemsAfterCollapse);
    const collapsedItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);
    const elements = [];
    for (const item of startItems) {
        elements.push(jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (jsx(BreadcrumbCurrentLink, { children: item.label })) : (jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
        elements.push(jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
    }
    if (collapsedItems.length > 0) {
        elements.push(jsx(BreadcrumbEllipsis, { items: collapsedItems }, "ellipsis"));
        elements.push(jsx(BreadcrumbSeparator, { children: separator }, "separator-ellipsis"));
    }
    for (const [index, item] of endItems.entries()) {
        elements.push(jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (jsx(BreadcrumbCurrentLink, { children: item.label })) : (jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
        if (index < endItems.length - 1) {
            elements.push(jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
        }
    }
    return elements;
};
const Breadcrumb = ({ items, size = 'medium', variant = 'default', separator, maxItems, itemsBeforeCollapse = 1, itemsAfterCollapse = 1, className, 'aria-label': ariaLabel, }) => {
    const safeItemsBeforeCollapse = Math.max(1, itemsBeforeCollapse);
    const safeItemsAfterCollapse = Math.max(1, itemsAfterCollapse);
    const safeMaxItems = maxItems ? Math.max(3, maxItems) : undefined;
    const breadcrumbElements = safeMaxItems
        ? renderCollapsedBreadcrumbs(items, separator, safeMaxItems, safeItemsBeforeCollapse, safeItemsAfterCollapse)
        : items.flatMap((item, index) => {
            const elements = [];
            elements.push(jsx(BreadcrumbItem, { icon: item.icon, isCurrentPage: item.isCurrentPage, children: item.isCurrentPage ? (jsx(BreadcrumbCurrentLink, { children: item.label })) : (jsx(BreadcrumbLink, { href: item.href, children: item.label })) }, item.id));
            if (index < items.length - 1) {
                elements.push(jsx(BreadcrumbSeparator, { children: separator }, `separator-${item.id}`));
            }
            return elements;
        });
    return (jsx(BreadcrumbRoot, { size: size, variant: variant, className: className, "aria-label": ariaLabel, children: jsx(BreadcrumbList, { children: breadcrumbElements }) }));
};

export { Breadcrumb, BreadcrumbCurrentLink, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbRoot, BreadcrumbSeparator };
//# sourceMappingURL=breadcrumb.js.map
