import * as styles from './radio-group.css';
export const buildRadioGroupClassName = (orientation = 'vertical', className) => {
    const orientationClass = orientation === 'horizontal'
        ? styles.radioGroupHorizontal
        : styles.radioGroupVertical;
    return `${styles.radioGroup} ${orientationClass} ${className ?? ''}`.trim();
};
export const buildGroupLabelClassName = (size = 'medium') => `${styles.radioGroupLabel} ${styles.groupLabelSizes[size]}`.trim();
