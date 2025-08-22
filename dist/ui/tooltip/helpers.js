import clsx from 'clsx';
import { arrow, arrowVariants, tooltip, sizes, variants } from './tooltip.css.js';

const buildTooltipClassName = (size = 'medium', variant = 'default', className) => clsx(tooltip, sizes[size], variants[variant], className);
const buildTooltipArrowClassName = (variant = 'default') => clsx(arrow, arrowVariants[variant]);
const getAriaPlacement = (placement = 'top') => {
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
    return placementMap[placement] || 'top';
};
const getOffsetForSize = (size = 'medium', customOffset) => {
    if (customOffset !== undefined) {
        return customOffset;
    }
    const offsetMap = {
        small: 6,
        medium: 8,
        large: 10,
    };
    return offsetMap[size];
};
const shouldWrapContent = (content, maxWidth = 300) => content.length > 40 || maxWidth < 200;

export { buildTooltipArrowClassName, buildTooltipClassName, getAriaPlacement, getOffsetForSize, shouldWrapContent };
//# sourceMappingURL=helpers.js.map
