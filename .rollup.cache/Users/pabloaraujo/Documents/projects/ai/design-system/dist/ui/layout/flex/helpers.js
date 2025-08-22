import * as styles from './flex.css';
export const buildFlexClassName = ({ direction, wrap, align, justify, gap, className, }) => {
    const classNames = [
        styles.flexBase,
        styles.flexDirection[direction],
        styles.flexWrap[wrap],
        styles.alignItems[align],
        styles.justifyContent[justify],
        styles.flexGap[gap],
    ];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
export const isColumnDirection = (direction) => direction === 'column' || direction === 'column-reverse';
export const isReversedDirection = (direction) => direction === 'row-reverse' || direction === 'column-reverse';
