import { button, variants, sizes, fullWidth } from './button.css.js';

const buildButtonClassName = (variant = 'primary', size = 'medium', fullWidth$1 = false, className, renderProps) => {
    const baseClassName = typeof className === 'function' ? className(renderProps) : className;
    const classNames = [
        button,
        variants[variant],
        sizes[size],
    ];
    if (fullWidth$1) {
        classNames.push(fullWidth);
    }
    if (baseClassName) {
        classNames.push(baseClassName);
    }
    return classNames.filter(Boolean).join(' ').trim();
};

export { buildButtonClassName };
//# sourceMappingURL=helpers.js.map
