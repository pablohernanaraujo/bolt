import clsx from 'clsx';
import * as styles from './tooltip.css';
export const buildTooltipClassName = (size = 'medium', variant = 'default', className) => clsx(styles.tooltip, styles.sizes[size], styles.variants[variant], className);
export const buildTooltipArrowClassName = (variant = 'default') => clsx(styles.arrow, styles.arrowVariants[variant]);
export const getAriaPlacement = (placement = 'top') => {
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
export const getOffsetForSize = (size = 'medium', customOffset) => {
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
export const shouldWrapContent = (content, maxWidth = 300) => content.length > 40 || maxWidth < 200;
