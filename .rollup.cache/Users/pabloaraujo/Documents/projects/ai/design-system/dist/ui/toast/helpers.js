import * as styles from './toast.css';
export const generateToastId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
export const buildToastContainerClassName = (position) => {
    const baseClassName = styles.toastContainer;
    const positionClassName = styles.toastContainerPositions[position];
    return `${baseClassName} ${positionClassName}`;
};
export const buildToastClassName = (variant, isVisible, className) => {
    const baseClassName = styles.toast;
    const variantClassName = styles.toastVariants[variant];
    const visibilityClassName = isVisible
        ? styles.toastVisible
        : styles.toastHidden;
    return [baseClassName, variantClassName, visibilityClassName, className]
        .filter(Boolean)
        .join(' ');
};
export const getDefaultDuration = (variant) => {
    switch (variant) {
        case 'error':
            return 8000;
        case 'warning':
            return 6000;
        case 'success':
        case 'info':
        default:
            return 5000;
    }
};
export const getAriaRole = (variant) => {
    switch (variant) {
        case 'error':
        case 'warning':
            return 'alert';
        case 'success':
        case 'info':
        default:
            return 'status';
    }
};
export const getPositionStyles = (position) => {
    switch (position) {
        case 'top':
            return {
                top: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
            };
        case 'bottom':
            return {
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
            };
        case 'top-left':
            return {
                top: '1rem',
                left: '1rem',
            };
        case 'top-right':
            return {
                top: '1rem',
                right: '1rem',
            };
        case 'bottom-left':
            return {
                bottom: '1rem',
                left: '1rem',
            };
        case 'bottom-right':
            return {
                bottom: '1rem',
                right: '1rem',
            };
        default:
            return {
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
            };
    }
};
export const calculateZIndex = (index) => {
    const baseZIndex = 1000;
    return baseZIndex + index;
};
export const isTopPosition = (position) => position.includes('top');
