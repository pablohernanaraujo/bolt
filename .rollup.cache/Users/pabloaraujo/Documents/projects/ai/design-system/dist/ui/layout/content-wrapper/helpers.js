import { clsx } from 'clsx';
import * as styles from './content-wrapper.css';
const VARIANT_DEFAULT_PADDING = {
    screen: '6',
    header: '4',
    body: '6',
    footer: '4',
};
export const getEffectivePadding = (variant = 'body', paddingX, borderless = false) => {
    if (borderless) {
        return '0';
    }
    return paddingX ?? VARIANT_DEFAULT_PADDING[variant];
};
export const buildContentWrapperClassName = ({ variant = 'body', paddingX, borderless = false, className, }) => {
    const effectivePadding = getEffectivePadding(variant, paddingX, borderless);
    return clsx(styles.base, styles.variantStyles[variant], styles.paddingVariants[effectivePadding], className);
};
