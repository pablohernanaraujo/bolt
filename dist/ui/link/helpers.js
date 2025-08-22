import { buildCompleteTypographyClass } from '../../tokens/typography-helpers.js';
import { linkBase, linkVariants, underlineVariants, iconPositionVariants, sizeVariants, linkIcon, externalIcon } from './link.css.js';

const buildLinkClassName = (variant = 'primary', size = 'body2', underlineBehavior = 'hover', isDisabled = false, emphasis = 'high', typographyProps = {}, customClassName) => {
    const effectiveVariant = isDisabled ? 'disabled' : variant;
    const typographyClass = buildCompleteTypographyClass(sizeVariants[size], emphasis, typographyProps);
    const classNames = [
        linkBase,
        linkVariants[effectiveVariant],
        underlineVariants[underlineBehavior],
        typographyClass,
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};
const buildIconClassName = (isExternal = false, customClassName) => {
    const classNames = [
        linkIcon,
        isExternal && externalIcon,
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};
const isExternalUrl = (href) => {
    if (!href)
        return false;
    return (href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.includes('://'));
};
const getExternalLinkAttributes = (isExternal) => {
    if (!isExternal) {
        return {
            target: '_self',
            rel: 'noopener noreferrer',
        };
    }
    return {
        target: '_blank',
        rel: 'noopener noreferrer',
    };
};
const sanitizeHref = (href) => {
    if (!href)
        return undefined;
    const validProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];
    if (href.includes('://')) {
        const protocol = href.split('://')[0] + ':';
        if (!validProtocols.includes(protocol)) {
            console.warn(`Invalid protocol in href: ${href}`);
            return undefined;
        }
    }
    if (href.toLowerCase().startsWith('javascript:') ||
        href.toLowerCase().startsWith('data:') ||
        href.toLowerCase().startsWith('vbscript:')) {
        console.warn(`Blocked potentially dangerous href: ${href}`);
        return undefined;
    }
    return href;
};
const buildContainerClassName = (iconPosition = 'right', customClassName) => {
    const classNames = [
        iconPositionVariants[iconPosition],
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};

export { buildContainerClassName, buildIconClassName, buildLinkClassName, getExternalLinkAttributes, isExternalUrl, sanitizeHref };
//# sourceMappingURL=helpers.js.map
