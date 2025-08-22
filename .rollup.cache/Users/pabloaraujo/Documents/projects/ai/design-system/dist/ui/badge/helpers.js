import { badge, sizes, variants } from './badge.css';
export const buildBadgeClassName = (variant, colorScheme, size, className) => {
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
