'use client';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { Link as AriaLink } from 'react-aria-components';
import { ExternalLink } from '@/icons';
import { buildContainerClassName, buildIconClassName, buildLinkClassName, getExternalLinkAttributes, isExternalUrl, sanitizeHref, } from './helpers';
import * as styles from './link.css';
export const Link = forwardRef(({ as, href, variant = 'primary', size = 'body2', emphasis = 'high', underlineBehavior = 'hover', isExternal: isExternalProp, isDisabled = false, icon, iconPosition = 'right', className, children, bold = false, isTruncated = false, italic = false, underline: underlineProp = false, strikeThrough = false, highlight = false, ...props }, ref) => {
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
        return (<>
          
          {IconComponent && iconPosition === 'left' && (<span className={iconClassName}>
              <IconComponent size="1em"/>
            </span>)}

          
          <span className={styles.linkText}>{children}</span>

          
          {IconComponent && iconPosition === 'right' && (<span className={iconClassName}>
              <IconComponent size="1em"/>
            </span>)}
        </>);
    };
    if (as && as !== 'a') {
        const Component = as;
        return (<Component ref={ref} className={`${containerClassName} ${linkClassName}`} role="link" tabIndex={isDisabled ? -1 : 0} aria-disabled={isDisabled} {...props}>
          {renderContent()}
        </Component>);
    }
    if (isDisabled) {
        return (<span ref={ref} className={`${containerClassName} ${linkClassName}`} role="link" aria-disabled={true} {...props}>
          {renderContent()}
        </span>);
    }
    if (sanitizedHref && !isExternal) {
        return (<NextLink href={sanitizedHref} className={`${containerClassName} ${linkClassName}`} ref={ref} {...props}>
          {renderContent()}
        </NextLink>);
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
    return (<AriaLink ref={ref} href={sanitizedHref} className={`${containerClassName} ${linkClassName}`} {...externalAttributes} {...ariaLinkProps}>
        {renderContent()}
      </AriaLink>);
});
Link.displayName = 'Link';
