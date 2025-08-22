import clsx from 'clsx';
import * as styles from './list.css';
export const buildListRootClassName = (variant = 'unordered', spacing = 'md', className) => clsx(styles.listRoot, styles.variants[variant], styles.spacing[spacing], className);
export const buildListItemClassName = (hasIcon, emphasis, weight, decoration, size, colorScheme, className) => clsx(styles.listItem, hasIcon && styles.listItemWithIcon, emphasis && styles.emphasis[emphasis], weight && styles.weight[weight], decoration && styles.decoration[decoration], size && styles.size[size], colorScheme && styles.colorScheme[colorScheme], className);
export const getListElement = (variant) => {
    switch (variant) {
        case 'ordered':
            return 'ol';
        case 'basic':
            return 'div';
        case 'unordered':
        default:
            return 'ul';
    }
};
