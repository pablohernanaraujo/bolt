import * as styles from './avatar.css';
export const buildAvatarClassName = (size = 'md', variant = 'circle', className) => {
    const sizeClass = styles.avatarSizes[size];
    const variantClass = styles.avatarVariants[variant];
    return `${styles.avatarContainer} ${sizeClass} ${variantClass} ${className ?? ''}`.trim();
};
export const buildAvatarImageClassName = (variant = 'circle') => {
    const variantClass = styles.avatarImageVariants[variant];
    return `${styles.avatarImage} ${variantClass}`.trim();
};
export const buildAvatarInitialsClassName = (size = 'md') => {
    const sizeClass = styles.avatarInitialsSizes[size];
    return `${styles.avatarInitials} ${sizeClass}`.trim();
};
export const buildAvatarIconClassName = (size = 'md') => {
    const sizeClass = styles.avatarIconSizes[size];
    return `${styles.avatarIcon} ${sizeClass}`.trim();
};
export const buildStatusIndicatorClassName = (size = 'md', status = 'online') => {
    const sizeClass = styles.statusIndicatorSizes[size];
    const statusClass = styles.statusIndicatorVariants[status];
    return `${styles.statusIndicator} ${sizeClass} ${statusClass}`.trim();
};
export const generateInitials = (name) => {
    if (!name || !name.trim())
        return '';
    const words = name.trim().split(/\s+/);
    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase();
    }
    return words
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
};
export const getIconSize = (size) => {
    const iconSizeMap = {
        xs: 12,
        sm: 14,
        md: 18,
        lg: 22,
        xl: 28,
        '2xl': 36,
    };
    return iconSizeMap[size];
};
