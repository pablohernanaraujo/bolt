import * as styles from './button.css';
export const buildButtonClassName = (variant = 'primary', size = 'medium', fullWidth = false, className, renderProps) => {
    const baseClassName = typeof className === 'function' ? className(renderProps) : className;
    const classNames = [
        styles.button,
        styles.variants[variant],
        styles.sizes[size],
    ];
    if (fullWidth) {
        classNames.push(styles.fullWidth);
    }
    if (baseClassName) {
        classNames.push(baseClassName);
    }
    return classNames.filter(Boolean).join(' ').trim();
};
