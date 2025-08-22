import { toast, toastVariants, toastVisible, toastHidden, toastContainer, toastContainerPositions } from './toast.css.js';

const generateToastId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
const buildToastContainerClassName = (position) => {
    const baseClassName = toastContainer;
    const positionClassName = toastContainerPositions[position];
    return `${baseClassName} ${positionClassName}`;
};
const buildToastClassName = (variant, isVisible, className) => {
    const baseClassName = toast;
    const variantClassName = toastVariants[variant];
    const visibilityClassName = isVisible
        ? toastVisible
        : toastHidden;
    return [baseClassName, variantClassName, visibilityClassName, className]
        .filter(Boolean)
        .join(' ');
};
const getDefaultDuration = (variant) => {
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
const getAriaRole = (variant) => {
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

export { buildToastClassName, buildToastContainerClassName, generateToastId, getAriaRole, getDefaultDuration };
//# sourceMappingURL=helpers.js.map
