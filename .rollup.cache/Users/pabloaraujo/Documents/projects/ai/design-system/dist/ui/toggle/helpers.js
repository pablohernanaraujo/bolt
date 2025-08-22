import { clsx } from 'clsx';
import * as styles from './toggle.css';
export const buildContainerClassName = (labelPosition = 'right', className) => clsx(styles.container, styles.labelPositions[labelPosition], className);
export const buildTrackClassName = (size = 'medium', variant = 'primary', isSelected) => {
    const classes = [styles.track, styles.trackSizes[size]];
    if (isSelected) {
        classes.push(styles.checkedVariants[variant]);
    }
    return clsx(...classes);
};
export const buildThumbClassName = (size = 'medium', isSelected) => {
    const classes = [styles.thumb, styles.thumbSizes[size]];
    if (isSelected) {
        classes.push(styles.thumbCheckedPositions[size]);
    }
    return clsx(...classes);
};
export const buildLabelClassName = (size = 'medium') => clsx(styles.label, styles.labelSizes[size]);
