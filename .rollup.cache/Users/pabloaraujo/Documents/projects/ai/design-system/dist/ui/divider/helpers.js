import { clsx } from 'clsx';
import * as styles from './divider.css';
export const buildDividerClassName = (orientation, variant, size, spacing, className) => clsx(styles.divider, styles.orientations[orientation], orientation === 'vertical'
    ? styles.verticalVariants[variant]
    : styles.variants[variant], orientation === 'vertical'
    ? styles.verticalSizes[size]
    : styles.horizontalSizes[size], orientation === 'vertical'
    ? styles.verticalSpacing[spacing]
    : styles.horizontalSpacing[spacing], className);
export const getDividerRole = (orientation) => 'separator';
export const getDividerAriaOrientation = (orientation) => orientation;
