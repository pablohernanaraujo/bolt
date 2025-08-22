import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { Link as Link$1 } from 'react-aria-components';
import { sanitizeHref, isExternalUrl, buildLinkClassName, buildContainerClassName, getExternalLinkAttributes, buildIconClassName } from './helpers.js';
import { linkText } from './link.css.js';
import { ExternalLink } from 'lucide-react';

const Link = forwardRef(({ as, href, variant = 'primary', size = 'body2', emphasis = 'high', underlineBehavior = 'hover', isExternal: isExternalProp, isDisabled = false, icon, iconPosition = 'right', className, children, bold = false, isTruncated = false, italic = false, underline: underlineProp = false, strikeThrough = false, highlight = false, ...props }, ref) => {
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
        return (jsxs(Fragment, { children: [IconComponent && iconPosition === 'left' && (jsx("span", { className: iconClassName, children: jsx(IconComponent, { size: "1em" }) })), jsx("span", { className: linkText, children: children }), IconComponent && iconPosition === 'right' && (jsx("span", { className: iconClassName, children: jsx(IconComponent, { size: "1em" }) }))] }));
    };
    if (as && as !== 'a') {
        const Component = as;
        return (jsx(Component, { ref: ref, className: `${containerClassName} ${linkClassName}`, role: "link", tabIndex: isDisabled ? -1 : 0, "aria-disabled": isDisabled, ...props, children: renderContent() }));
    }
    if (isDisabled) {
        return (jsx("span", { ref: ref, className: `${containerClassName} ${linkClassName}`, role: "link", "aria-disabled": true, ...props, children: renderContent() }));
    }
    if (sanitizedHref && !isExternal) {
        return (jsx(NextLink, { href: sanitizedHref, className: `${containerClassName} ${linkClassName}`, ref: ref, ...props, children: renderContent() }));
    }
    const ariaLinkProps = {
        'aria-label': props['aria-label'],
        'aria-labelledby': props['aria-labelledby'],
        'aria-describedby': props['aria-describedby'],
        'data-testid': props['data-testid'],
        id: props.id,
        role: props.role,
        tabIndex: props.tabIndex,
    };
    return (jsx(Link$1, { ref: ref, href: sanitizedHref, className: `${containerClassName} ${linkClassName}`, ...externalAttributes, ...ariaLinkProps, children: renderContent() }));
});
Link.displayName = 'Link';

export { Link };
//# sourceMappingURL=link.js.map
