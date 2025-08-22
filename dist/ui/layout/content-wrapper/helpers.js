import { clsx } from 'clsx';
import { base, variantStyles, paddingVariants } from './content-wrapper.css.js';

const VARIANT_DEFAULT_PADDING = {
    screen: '6',
    header: '4',
    body: '6',
    footer: '4',
};
const getEffectivePadding = (variant = 'body', paddingX, borderless = false) => {
    if (borderless) {
        return '0';
    }
    return paddingX ?? VARIANT_DEFAULT_PADDING[variant];
};
const buildContentWrapperClassName = ({ variant = 'body', paddingX, borderless = false, className, }) => {
    const effectivePadding = getEffectivePadding(variant, paddingX, borderless);
    return clsx(base, variantStyles[variant], paddingVariants[effectivePadding], className);
};

export { buildContentWrapperClassName, getEffectivePadding };
//# sourceMappingURL=helpers.js.map
