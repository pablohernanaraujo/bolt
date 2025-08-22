import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { ExternalLink } from '@/icons';
import { buildContainerClassName, buildIconClassName, buildLinkClassName, getExternalLinkAttributes, isExternalUrl, sanitizeHref, } from './helpers';
import * as styles from './link.css';
export const LinkServer = forwardRef(({ as, href, variant = 'primary', size = 'body2', emphasis = 'high', underlineBehavior = 'hover', isExternal: isExternalProp, isDisabled = false, icon, iconPosition = 'right', className, children, bold = false, isTruncated = false, italic = false, underline: underlineProp = false, strikeThrough = false, highlight = false, ...props }, ref) => {
    const sanitizedHref = sanitizeHref(href);
    const isExternal = isExternalProp ?? isExternalUrl(sanitizedHref);
    const linkClassName = buildLinkClassName(variant, size, underlineBehavior, isDisabled, emphasis, {
        bold,
        isTruncated,
        italic,
        underline: underlineProp,
        strikeThrough,
        highlight,
    }, className);
    const containerClassName = buildContainerClassName(iconPosition);
    const externalAttributes = getExternalLinkAttributes(isExternal);
    const displayIcon = isExternal && variant === 'external' ? ExternalLink : icon;
    const iconClassName = displayIcon
        ? buildIconClassName(isExternal && variant === 'external')
        : undefined;
    const renderContent = () => {
        const IconComponent = displayIcon;
        return (_jsxs(_Fragment, { children: [IconComponent && iconPosition === 'left' && (_jsx("span", { className: iconClassName, children: _jsx(IconComponent, { size: "1em" }) })), _jsx("span", { className: styles.linkText, children: children }), IconComponent && iconPosition === 'right' && (_jsx("span", { className: iconClassName, children: _jsx(IconComponent, { size: "1em" }) }))] }));
    };
    if (as && as !== 'a') {
        const Component = as;
        return (_jsx(Component, { ref: ref, className: `${containerClassName} ${linkClassName}`, role: "link", tabIndex: isDisabled ? -1 : 0, "aria-disabled": isDisabled, ...props, children: renderContent() }));
    }
    if (isDisabled) {
        return (_jsx("span", { ref: ref, className: `${containerClassName} ${linkClassName}`, role: "link", "aria-disabled": true, ...props, children: renderContent() }));
    }
    if (sanitizedHref && !isExternal) {
        return (_jsx(NextLink, { href: sanitizedHref, className: `${containerClassName} ${linkClassName}`, ref: ref, ...props, children: renderContent() }));
    }
    return (_jsx("a", { ref: ref, href: sanitizedHref, className: `${containerClassName} ${linkClassName}`, ...externalAttributes, ...props, children: renderContent() }));
});
LinkServer.displayName = 'LinkServer';
