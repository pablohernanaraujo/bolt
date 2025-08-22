import { Children, isValidElement } from 'react';
import * as styles from './input-group.css';
export const buildInputGroupClassName = (variant, size, hasError, isDisabled, className) => {
    const classes = [
        styles.inputGroup,
        styles.groupVariants[variant],
        styles.groupSizes[size],
    ];
    if (hasError) {
        classes.push(styles.groupError);
    }
    if (isDisabled) {
        classes.push(styles.groupDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const buildAddonClassName = (position, size, variant, isDisabled, className) => {
    const classes = [
        styles.addon,
        position === 'left' ? styles.leftAddon : styles.rightAddon,
        styles.addonSizes[size],
        styles.addonVariants[variant],
    ];
    if (isDisabled) {
        classes.push(styles.addonDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const buildElementClassName = (position, size, isInteractive, isDisabled, className) => {
    const classes = [
        styles.element,
        position === 'left' ? styles.leftElement : styles.rightElement,
        styles.elementSizes[size],
    ];
    if (isInteractive && !isDisabled) {
        classes.push(styles.interactiveElement);
    }
    if (isDisabled) {
        classes.push(styles.elementDisabled);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const analyzeChildren = (children) => {
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
export const getInputPaddingAdjustments = (size, hasLeftElement, hasRightElement) => {
    const adjustments = {};
    const elementPadding = {
        small: '32px',
        medium: '40px',
        large: '48px',
    };
    if (hasLeftElement) {
        adjustments.paddingLeft =
            elementPadding[size];
    }
    if (hasRightElement) {
        adjustments.paddingRight =
            elementPadding[size];
    }
    return adjustments;
};
