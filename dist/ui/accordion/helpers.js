import { clsx } from 'clsx';
import { accordion, sizeVariants, fullWidth, accordionItem, variants, disabled, accordionTrigger, triggerSizeVariants, accordionTriggerContent, accordionIcon, noAnimation, accordionChevron, accordionContent, contentSizeVariants, accordionContentInner } from './accordion.css.js';

const buildAccordionClassName = (variant = 'default', size = 'medium', fullWidth$1 = false, className) => clsx(accordion, sizeVariants[size], fullWidth$1 && fullWidth, className);
const buildAccordionItemClassName = (variant = 'default', isDisabled = false, className) => clsx(accordionItem, variants[variant], isDisabled && disabled, className);
const buildAccordionTriggerClassName = (size = 'medium', renderProps, className) => clsx(accordionTrigger, triggerSizeVariants[size], className);
const buildAccordionContentClassName = (size = 'medium', isExpanded = false, disableAnimation = false, className) => clsx(accordionContent, contentSizeVariants[size], disableAnimation && noAnimation, className);
const buildTriggerContentClassName = (className) => clsx(accordionTriggerContent, className);
const buildChevronClassName = (disableAnimation = false, className) => clsx(accordionChevron, disableAnimation && noAnimation, className);
const buildIconClassName = (disableAnimation = false, className) => clsx(accordionIcon, disableAnimation && noAnimation, className);
const buildContentInnerClassName = (className) => clsx(accordionContentInner, className);
const normalizeKeys = (keys) => {
    if (!keys)
        return new Set();
    return keys instanceof Set ? keys : new Set(keys);
};
const toggleKey = (keys, key, selectionMode, allowAllClosed = true) => {
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

export { buildAccordionClassName, buildAccordionContentClassName, buildAccordionItemClassName, buildAccordionTriggerClassName, buildChevronClassName, buildContentInnerClassName, buildIconClassName, buildTriggerContentClassName, normalizeKeys, toggleKey };
//# sourceMappingURL=helpers.js.map
