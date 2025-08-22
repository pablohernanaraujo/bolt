import { styles } from './center.css';
export const buildCenterClassName = ({ className, }) => {
    const classes = [styles.center];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
