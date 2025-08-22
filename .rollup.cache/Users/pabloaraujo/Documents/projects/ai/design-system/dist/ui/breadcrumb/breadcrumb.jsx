'use client';
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
    return (<BreadcrumbContext.Provider value={contextValue}>
      <nav className={`${styles.breadcrumbRoot} ${styles.breadcrumbVariants[variant]} ${className}`} aria-label={ariaLabel} role="navigation">
        {children}
      </nav>
    </BreadcrumbContext.Provider>);
};
export const BreadcrumbList = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (<ol className={`${styles.breadcrumbList} ${styles.breadcrumbListSizeVariants[size]} ${styles.breadcrumbResponsive} ${className}`}>
      {children}
    </ol>);
};
export const BreadcrumbItem = ({ children, className = '', icon, isCurrentPage = false, }) => (<li className={`${styles.breadcrumbItem} ${className}`} aria-current={isCurrentPage ? 'page' : undefined}>
    {icon && <span className={styles.breadcrumbIcon}>{icon}</span>}
    {children}
  </li>);
export const BreadcrumbLink = ({ children, href, className = '', onClick, external = false, }) => {
    const { size } = useBreadcrumbContext();
    const linkProps = {
        className: `${styles.breadcrumbLinkBase} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`,
        onClick,
        title: typeof children === 'string' ? children : undefined,
    };
    if (external) {
        return (<a {...linkProps} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>);
    }
    return (<Link {...linkProps} href={href}>
      {children}
    </Link>);
};
export const BreadcrumbCurrentLink = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (<span className={`${styles.breadcrumbCurrentLink} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`} aria-current="page" title={typeof children === 'string' ? children : undefined}>
      {children}
    </span>);
};
export const BreadcrumbSeparator = ({ children, className = '', }) => {
    const { size } = useBreadcrumbContext();
    return (<span className={`${styles.breadcrumbSeparator} ${styles.breadcrumbSeparatorSizeVariants[size]} ${className}`} role="presentation" aria-hidden="true">
      {children || <Icon icon={ChevronRight} size="sm"/>}
    </span>);
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
    return (<li className={styles.breadcrumbItem}>
      <button className={`${styles.breadcrumbEllipsis} ${styles.breadcrumbLinkSizeVariants[size]} ${className}`} onClick={handleClick} onKeyDown={handleKeyDown} aria-expanded={isOpen} aria-label="Show collapsed breadcrumb items" title="Show collapsed breadcrumb items">
        <Icon icon={MoreHorizontal} size="sm"/>
      </button>

      {isOpen && (<div className={styles.breadcrumbDropdown}>
          {items.map((item) => (<BreadcrumbLink key={item.id} href={item.href} className="truncate">
              {item.icon && (<span className={styles.breadcrumbIcon}>{item.icon}</span>)}
              {item.label}
            </BreadcrumbLink>))}
        </div>)}
    </li>);
};
const renderCollapsedBreadcrumbs = (items, separator, maxItems, itemsBeforeCollapse, itemsAfterCollapse) => {
    if (items.length <= maxItems) {
        return items.flatMap((item, index) => {
            const elements = [];
            elements.push(<BreadcrumbItem key={item.id} icon={item.icon} isCurrentPage={item.isCurrentPage}>
          {item.isCurrentPage ? (<BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>) : (<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>)}
        </BreadcrumbItem>);
            if (index < items.length - 1) {
                elements.push(<BreadcrumbSeparator key={`separator-${item.id}`}>
            {separator}
          </BreadcrumbSeparator>);
            }
            return elements;
        });
    }
    const startItems = items.slice(0, itemsBeforeCollapse);
    const endItems = items.slice(-itemsAfterCollapse);
    const collapsedItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);
    const elements = [];
    for (const item of startItems) {
        elements.push(<BreadcrumbItem key={item.id} icon={item.icon} isCurrentPage={item.isCurrentPage}>
        {item.isCurrentPage ? (<BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>) : (<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>)}
      </BreadcrumbItem>);
        elements.push(<BreadcrumbSeparator key={`separator-${item.id}`}>
        {separator}
      </BreadcrumbSeparator>);
    }
    if (collapsedItems.length > 0) {
        elements.push(<BreadcrumbEllipsis key="ellipsis" items={collapsedItems}/>);
        elements.push(<BreadcrumbSeparator key="separator-ellipsis">
        {separator}
      </BreadcrumbSeparator>);
    }
    for (const [index, item] of endItems.entries()) {
        elements.push(<BreadcrumbItem key={item.id} icon={item.icon} isCurrentPage={item.isCurrentPage}>
        {item.isCurrentPage ? (<BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>) : (<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>)}
      </BreadcrumbItem>);
        if (index < endItems.length - 1) {
            elements.push(<BreadcrumbSeparator key={`separator-${item.id}`}>
          {separator}
        </BreadcrumbSeparator>);
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
            elements.push(<BreadcrumbItem key={item.id} icon={item.icon} isCurrentPage={item.isCurrentPage}>
            {item.isCurrentPage ? (<BreadcrumbCurrentLink>{item.label}</BreadcrumbCurrentLink>) : (<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>)}
          </BreadcrumbItem>);
            if (index < items.length - 1) {
                elements.push(<BreadcrumbSeparator key={`separator-${item.id}`}>
              {separator}
            </BreadcrumbSeparator>);
            }
            return elements;
        });
    return (<BreadcrumbRoot size={size} variant={variant} className={className} aria-label={ariaLabel}>
      <BreadcrumbList>{breadcrumbElements}</BreadcrumbList>
    </BreadcrumbRoot>);
};
