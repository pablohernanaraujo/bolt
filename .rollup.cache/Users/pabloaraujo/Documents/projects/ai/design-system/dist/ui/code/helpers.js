import * as styles from './code.css';
export const buildCodeClassName = (className) => {
    const classes = [styles.code];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
export const formatCodeContent = (content) => content;
