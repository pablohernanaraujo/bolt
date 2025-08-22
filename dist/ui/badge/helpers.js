import { variants, badge, sizes } from './badge.css.js';

const buildBadgeClassName = (variant, colorScheme, size, className) => {
    const classes = [badge];
    classes.push(sizes[size]);
    const variantStyles = variants[variant];
    if (variantStyles && variantStyles[colorScheme]) {
        classes.push(variantStyles[colorScheme]);
    }
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};

export { buildBadgeClassName };
//# sourceMappingURL=helpers.js.map
