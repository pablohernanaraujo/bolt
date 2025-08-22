import { menuItemBase, menuItemSize, menuItemVariant, menuBase, menuSize, menuVariant, menuSection, menuSeparator } from './menu.css.js';

const buildMenuClassName = (size = 'medium', variant = 'default', customClassName) => {
    const classNames = [
        menuBase,
        menuSize[size],
        menuVariant[variant],
    ];
    if (customClassName) {
        classNames.push(customClassName);
    }
    return classNames.join(' ');
};
const buildMenuItemClassName = (size = 'medium', variant = 'default', customClassName) => {
    const classNames = [
        menuItemBase,
        menuItemSize[size],
        menuItemVariant[variant],
    ];
    if (customClassName) {
        classNames.push(customClassName);
    }
    return classNames.join(' ');
};
const getAriaPlacement = (placement) => {
    const placementMap = {
        top: 'top',
        bottom: 'bottom',
        left: 'left',
        right: 'right',
        start: 'start',
        end: 'end',
        'top start': 'top start',
        'top end': 'top end',
        'bottom start': 'bottom start',
        'bottom end': 'bottom end',
        'left top': 'left top',
        'left bottom': 'left bottom',
        'right top': 'right top',
        'right bottom': 'right bottom',
    };
    return placementMap[placement] || 'bottom start';
};
const getOffsetForSize = (size, customOffset) => {
    if (customOffset !== undefined) {
        return customOffset;
    }
    const offsetMap = {
        small: 2,
        medium: 4,
        large: 6,
    };
    return offsetMap[size];
};
const buildMenuSectionClassName = (customClassName) => {
    const classNames = [menuSection];
    if (customClassName) {
        classNames.push(customClassName);
    }
    return classNames.join(' ');
};
const buildMenuSeparatorClassName = (customClassName) => {
    const classNames = [menuSeparator];
    if (customClassName) {
        classNames.push(customClassName);
    }
    return classNames.join(' ');
};
const getMenuWidthConstraints = (size, minWidth, maxWidth) => {
    const sizeConstraints = {
        small: {
            minWidth: 160,
            maxWidth: 240,
        },
        medium: {
            minWidth: 200,
            maxWidth: 320,
        },
        large: {
            minWidth: 240,
            maxWidth: 400,
        },
    };
    const defaults = sizeConstraints[size];
    return {
        minWidth: minWidth ?? defaults.minWidth,
        maxWidth: maxWidth ?? defaults.maxWidth,
    };
};
const shouldShowShortcut = (shortcut, hasEndIcon = false) => Boolean(shortcut && !hasEndIcon);
const isValidMenuPlacement = (placement) => {
    const validPlacements = [
        'top',
        'bottom',
        'left',
        'right',
        'start',
        'end',
        'top start',
        'top end',
        'bottom start',
        'bottom end',
        'left top',
        'left bottom',
        'right top',
        'right bottom',
    ];
    return validPlacements.includes(placement);
};
const getTransformOrigin = (placement) => {
    const originMap = {
        top: 'bottom center',
        bottom: 'top center',
        left: 'right center',
        right: 'left center',
        'top start': 'bottom left',
        'top end': 'bottom right',
        'bottom start': 'top left',
        'bottom end': 'top right',
        'left top': 'right top',
        'left bottom': 'right bottom',
        'right top': 'left top',
        'right bottom': 'left bottom',
    };
    return originMap[placement] || 'top center';
};
const scrollItemIntoView = (menuElement, itemElement) => {
    const menuRect = menuElement.getBoundingClientRect();
    const itemRect = itemElement.getBoundingClientRect();
    const isAboveView = itemRect.top < menuRect.top;
    const isBelowView = itemRect.bottom > menuRect.bottom;
    if (isAboveView || isBelowView) {
        itemElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }
};

export { buildMenuClassName, buildMenuItemClassName, buildMenuSectionClassName, buildMenuSeparatorClassName, getAriaPlacement, getMenuWidthConstraints, getOffsetForSize, getTransformOrigin, isValidMenuPlacement, scrollItemIntoView, shouldShowShortcut };
//# sourceMappingURL=helpers.js.map
