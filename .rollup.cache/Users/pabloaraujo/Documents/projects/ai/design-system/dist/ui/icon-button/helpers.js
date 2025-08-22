import { iconSizes } from '@/icons';
import * as styles from './icon-button.css';
const buttonSizeToIconSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
};
export const getIconSize = (buttonSize = 'medium', iconSize) => {
    if (iconSize !== undefined) {
        return iconSize;
    }
    return buttonSizeToIconSize[buttonSize];
};
export const getIconSizeValue = (size) => typeof size === 'number' ? size : iconSizes[size];
export const buildIconButtonClassName = (variant = 'primary', size = 'medium', className, renderProps) => {
    const baseClassName = typeof className === 'function' ? className(renderProps) : className;
    const classNames = [
        styles.iconButton,
        styles.variants[variant],
        styles.sizes[size],
    ];
    if (baseClassName) {
        classNames.push(baseClassName);
    }
    return classNames.filter(Boolean).join(' ').trim();
};
