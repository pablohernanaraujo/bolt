import * as styles from './popover.css';
export const buildPopoverClassName = (size, variant, className) => {
    const classNames = [
        styles.popover,
        styles.popoverSizes[size],
        styles.popoverVariants[variant],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const buildPopoverArrowClassName = (variant, className) => {
    const classNames = [
        styles.popoverArrow,
        styles.popoverArrowVariants[variant],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const buildPopoverHeaderClassName = (showDivider, className) => {
    const classNames = [styles.popoverHeader];
    if (showDivider) {
        classNames.push(styles.popoverHeaderWithDivider);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const buildPopoverBodyClassName = (hasHeader, hasFooter, className) => {
    const classNames = [styles.popoverBody];
    if (hasHeader) {
        classNames.push(styles.popoverBodyWithHeader);
    }
    if (hasFooter) {
        classNames.push(styles.popoverBodyWithFooter);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const buildPopoverFooterClassName = (showDivider, className) => {
    const classNames = [styles.popoverFooter];
    if (showDivider) {
        classNames.push(styles.popoverFooterWithDivider);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const isVerticalPlacement = (placement) => placement.includes('top') || placement.includes('bottom');
export const isHorizontalPlacement = (placement) => placement.includes('left') || placement.includes('right');
export const getOppositeArrowDirection = (placement) => {
    if (placement.includes('top'))
        return 'bottom';
    if (placement.includes('bottom'))
        return 'top';
    if (placement.includes('left'))
        return 'right';
    if (placement.includes('right'))
        return 'left';
    return 'bottom';
};
export const validatePopoverContent = (hasTitle, hasInteractiveContent) => {
    if (hasInteractiveContent) {
        return {
            role: 'dialog',
            'aria-modal': false,
        };
    }
    if (hasTitle) {
        return { role: 'region' };
    }
    return { role: 'tooltip' };
};
