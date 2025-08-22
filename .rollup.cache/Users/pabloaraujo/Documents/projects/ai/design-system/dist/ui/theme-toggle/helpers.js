import * as styles from './theme-toggle.css';
export const buildThemeToggleClassName = (className) => {
    const classNames = [styles.themeToggle];
    if (className) {
        classNames.push(className);
    }
    return classNames.join(' ');
};
