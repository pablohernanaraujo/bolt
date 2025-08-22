import { code } from './code.css.js';

const buildCodeClassName = (className) => {
    const classes = [code];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};

export { buildCodeClassName };
//# sourceMappingURL=helpers.js.map
