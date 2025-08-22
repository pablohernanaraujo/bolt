import { styles } from './center.css.js';

const buildCenterClassName = ({ className, }) => {
    const classes = [styles.center];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};

export { buildCenterClassName };
//# sourceMappingURL=helpers.js.map
