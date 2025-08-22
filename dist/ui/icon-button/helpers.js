import { iconSizes } from '../../icons/index.js';
import { iconButton, variants, sizes } from './icon-button.css.js';

const buttonSizeToIconSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
};
const getIconSize = (buttonSize = 'medium', iconSize) => {
    if (iconSize !== undefined) {
        return iconSize;
    }
    return buttonSizeToIconSize[buttonSize];
};
const getIconSizeValue = (size) => typeof size === 'number' ? size : iconSizes[size];
const buildIconButtonClassName = (variant = 'primary', size = 'medium', className, renderProps) => {
    const baseClassName = typeof className === 'function' ? className(renderProps) : className;
    const classNames = [
        iconButton,
        variants[variant],
        sizes[size],
    ];
    if (baseClassName) {
        classNames.push(baseClassName);
    }
    return classNames.filter(Boolean).join(' ').trim();
};

export { buildIconButtonClassName, getIconSize, getIconSizeValue };
//# sourceMappingURL=helpers.js.map
