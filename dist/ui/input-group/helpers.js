import { Children, isValidElement } from 'react';
import { inputGroup, groupVariants, groupSizes, element, rightElement, elementSizes, leftElement, addon, leftAddon, rightAddon, addonSizes, addonVariants, groupError, groupDisabled, addonDisabled, interactiveElement, elementDisabled } from './input-group.css.js';

const buildInputGroupClassName = (variant, size, hasError, isDisabled, className) => {
    const classes = [
        inputGroup,
        groupVariants[variant],
        groupSizes[size],
    ];
    if (hasError) {
        classes.push(groupError);
    }
    if (isDisabled) {
        classes.push(groupDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
const buildAddonClassName = (position, size, variant, isDisabled, className) => {
    const classes = [
        addon,
        position === 'left' ? leftAddon : rightAddon,
        addonSizes[size],
        addonVariants[variant],
    ];
    if (isDisabled) {
        classes.push(addonDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
const buildElementClassName = (position, size, isInteractive, isDisabled, className) => {
    const classes = [
        element,
        position === 'left' ? leftElement : rightElement,
        elementSizes[size],
    ];
    if (isInteractive && !isDisabled) {
        classes.push(interactiveElement);
    }
    if (isDisabled) {
        classes.push(elementDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
const analyzeChildren = (children) => {
    const result = {
        hasLeftAddon: false,
        hasRightAddon: false,
        hasLeftElement: false,
        hasRightElement: false,
    };
    Children.forEach(children, (child) => {
        if (isValidElement(child)) {
            const displayName = child.type?.displayName;
            switch (displayName) {
                case 'InputLeftAddon':
                    result.hasLeftAddon = true;
                    break;
                case 'InputRightAddon':
                    result.hasRightAddon = true;
                    break;
                case 'InputLeftElement':
                    result.hasLeftElement = true;
                    break;
                case 'InputRightElement':
                    result.hasRightElement = true;
                    break;
            }
        }
    });
    return result;
};

export { analyzeChildren, buildAddonClassName, buildElementClassName, buildInputGroupClassName };
//# sourceMappingURL=helpers.js.map
