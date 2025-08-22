import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import * as styles from './link.css';
export const buildLinkClassName = (variant = 'primary', size = 'body2', underlineBehavior = 'hover', isDisabled = false, emphasis = 'high', typographyProps = {}, customClassName) => {
    const effectiveVariant = isDisabled ? 'disabled' : variant;
    const typographyClass = buildCompleteTypographyClass(styles.sizeVariants[size], emphasis, typographyProps);
    const classNames = [
        styles.linkBase,
        styles.linkVariants[effectiveVariant],
        styles.underlineVariants[underlineBehavior],
        typographyClass,
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};
export const buildIconClassName = (isExternal = false, customClassName) => {
    const classNames = [
        styles.linkIcon,
        isExternal && styles.externalIcon,
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};
export const isExternalUrl = (href) => {
    if (!href)
        return false;
    return (href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.includes('://'));
};
export const getExternalLinkAttributes = (isExternal) => {
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
export const sanitizeHref = (href) => {
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
export const buildContainerClassName = (iconPosition = 'right', customClassName) => {
    const classNames = [
        styles.iconPositionVariants[iconPosition],
        customClassName,
    ].filter(Boolean);
    return classNames.join(' ');
};
