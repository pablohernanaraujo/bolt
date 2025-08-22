import { avatarContainer, avatarSizes, avatarVariants, avatarInitials, avatarInitialsSizes, avatarIcon, avatarIconSizes, statusIndicator, statusIndicatorSizes, statusIndicatorVariants, avatarImage, avatarImageVariants } from './avatar.css.js';

const buildAvatarClassName = (size = 'md', variant = 'circle', className) => {
    const sizeClass = avatarSizes[size];
    const variantClass = avatarVariants[variant];
    return `${avatarContainer} ${sizeClass} ${variantClass} ${className ?? ''}`.trim();
};
const buildAvatarImageClassName = (variant = 'circle') => {
    const variantClass = avatarImageVariants[variant];
    return `${avatarImage} ${variantClass}`.trim();
};
const buildAvatarInitialsClassName = (size = 'md') => {
    const sizeClass = avatarInitialsSizes[size];
    return `${avatarInitials} ${sizeClass}`.trim();
};
const buildAvatarIconClassName = (size = 'md') => {
    const sizeClass = avatarIconSizes[size];
    return `${avatarIcon} ${sizeClass}`.trim();
};
const buildStatusIndicatorClassName = (size = 'md', status = 'online') => {
    const sizeClass = statusIndicatorSizes[size];
    const statusClass = statusIndicatorVariants[status];
    return `${statusIndicator} ${sizeClass} ${statusClass}`.trim();
};
const generateInitials = (name) => {
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
const getIconSize = (size) => {
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

export { buildAvatarClassName, buildAvatarIconClassName, buildAvatarImageClassName, buildAvatarInitialsClassName, buildStatusIndicatorClassName, generateInitials, getIconSize };
//# sourceMappingURL=helpers.js.map
