import { clsx } from 'clsx';
import * as styles from './accordion.css';
export const buildAccordionClassName = (variant = 'default', size = 'medium', fullWidth = false, className) => clsx(styles.accordion, styles.sizeVariants[size], fullWidth && styles.fullWidth, className);
export const buildAccordionItemClassName = (variant = 'default', isDisabled = false, className) => clsx(styles.accordionItem, styles.variants[variant], isDisabled && styles.disabled, className);
export const buildAccordionTriggerClassName = (size = 'medium', renderProps, className) => clsx(styles.accordionTrigger, styles.triggerSizeVariants[size], className);
export const buildAccordionContentClassName = (size = 'medium', isExpanded = false, disableAnimation = false, className) => clsx(styles.accordionContent, styles.contentSizeVariants[size], disableAnimation && styles.noAnimation, className);
export const buildTriggerContentClassName = (className) => clsx(styles.accordionTriggerContent, className);
export const buildChevronClassName = (disableAnimation = false, className) => clsx(styles.accordionChevron, disableAnimation && styles.noAnimation, className);
export const buildIconClassName = (disableAnimation = false, className) => clsx(styles.accordionIcon, disableAnimation && styles.noAnimation, className);
export const buildContentInnerClassName = (className) => clsx(styles.accordionContentInner, className);
export const normalizeKeys = (keys) => {
    if (!keys)
        return new Set();
    return keys instanceof Set ? keys : new Set(keys);
};
export const toggleKey = (keys, key, selectionMode, allowAllClosed = true) => {
    const newKeys = new Set(keys);
    if (selectionMode === 'single') {
        if (newKeys.has(key)) {
            if (allowAllClosed) {
                newKeys.delete(key);
            }
        }
        else {
            newKeys.clear();
            newKeys.add(key);
        }
    }
    else {
        if (newKeys.has(key)) {
            newKeys.delete(key);
        }
        else {
            newKeys.add(key);
        }
    }
    return newKeys;
};
