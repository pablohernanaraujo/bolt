import { forwardRef } from 'react';
import { Icon } from '@/icons';
import { buildListItemClassName, buildListRootClassName, getListElement, } from './helpers';
import * as styles from './list.css';
export const ListRoot = forwardRef(({ variant = 'unordered', spacing = 'md', className, children, ...props }, ref) => {
    const Element = getListElement(variant);
    return (<Element ref={ref} className={buildListRootClassName(variant, spacing, className)} role={variant === 'basic' ? 'list' : undefined} {...props}>
        {children}
      </Element>);
});
ListRoot.displayName = 'List.Root';
export const ListItem = forwardRef(({ icon, emphasis = 'high', weight = 'normal', decoration, size = 'base', colorScheme = 'default', className, children, ...props }, ref) => (<li ref={ref} className={buildListItemClassName(!!icon, emphasis, weight, decoration, size, colorScheme, className)} role="listitem" {...props}>
      {icon && (<div className={styles.listItemIcon}>
          <Icon icon={icon} size="sm"/>
        </div>)}
      <div className={styles.listItemContent}>{children}</div>
    </li>));
ListItem.displayName = 'List.Item';
export const List = {
    Root: ListRoot,
    Item: ListItem,
};
