import * as styles from './spinner.css';
export const buildSpinnerClassName = (size, colorScheme, showTrack, className) => {
    const classes = [styles.spinner];
    classes.push(styles.sizes[size]);
    classes.push(styles.colorSchemes[colorScheme]);
    if (showTrack) {
        classes.push(styles.withTrack);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const getAriaValueText = (label) => `${label}...`;
