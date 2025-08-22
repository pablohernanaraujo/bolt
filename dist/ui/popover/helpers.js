import { popoverArrow, popoverArrowVariants, popoverBody, popover, popoverSizes, popoverVariants, popoverFooter, popoverHeader, popoverHeaderWithDivider, popoverBodyWithHeader, popoverBodyWithFooter, popoverFooterWithDivider } from './popover.css.js';

const buildPopoverClassName = (size, variant, className) => {
    const classNames = [
        popover,
        popoverSizes[size],
        popoverVariants[variant],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const buildPopoverArrowClassName = (variant, className) => {
    const classNames = [
        popoverArrow,
        popoverArrowVariants[variant],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const buildPopoverHeaderClassName = (showDivider, className) => {
    const classNames = [popoverHeader];
    if (showDivider) {
        classNames.push(popoverHeaderWithDivider);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const buildPopoverBodyClassName = (hasHeader, hasFooter, className) => {
    const classNames = [popoverBody];
    if (hasHeader) {
        classNames.push(popoverBodyWithHeader);
    }
    if (hasFooter) {
        classNames.push(popoverBodyWithFooter);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const buildPopoverFooterClassName = (showDivider, className) => {
    const classNames = [popoverFooter];
    if (showDivider) {
        classNames.push(popoverFooterWithDivider);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
const isVerticalPlacement = (placement) => placement.includes('top') || placement.includes('bottom');
const isHorizontalPlacement = (placement) => placement.includes('left') || placement.includes('right');

export { buildPopoverArrowClassName, buildPopoverBodyClassName, buildPopoverClassName, buildPopoverFooterClassName, buildPopoverHeaderClassName, isHorizontalPlacement, isVerticalPlacement };
//# sourceMappingURL=helpers.js.map
