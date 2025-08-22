import clsx from 'clsx';
import { listRoot, variants, spacing, listItem, listItemWithIcon, emphasis, weight, decoration, size, colorScheme } from './list.css.js';

const buildListRootClassName = (variant = 'unordered', spacing$1 = 'md', className) => clsx(listRoot, variants[variant], spacing[spacing$1], className);
const buildListItemClassName = (hasIcon, emphasis$1, weight$1, decoration$1, size$1, colorScheme$1, className) => clsx(listItem, hasIcon && listItemWithIcon, emphasis$1 && emphasis[emphasis$1], weight$1 && weight[weight$1], decoration$1 && decoration[decoration$1], size$1 && size[size$1], colorScheme$1 && colorScheme[colorScheme$1], className);
const getListElement = (variant) => {
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

export { buildListItemClassName, buildListRootClassName, getListElement };
//# sourceMappingURL=helpers.js.map
