// /src/ui/avatar/helpers.ts
// Utility functions and helpers for the Avatar component
// Contains className builders and initials generation logic
// RELEVANT FILES: avatar.tsx, avatar.css.ts, types.ts

import * as styles from './avatar.css';
import {
  type AvatarSize,
  type AvatarStatus,
  type AvatarVariant,
} from './types';

/**
 * Build avatar container className based on size and variant
 * Applies size-specific and variant-specific styles
 */
export const buildAvatarClassName = (
  size: AvatarSize = 'md',
  variant: AvatarVariant = 'circle',
  className?: string,
): string => {
  const sizeClass = styles.avatarSizes[size];
  const variantClass = styles.avatarVariants[variant];

  return `${styles.avatarContainer} ${sizeClass} ${variantClass} ${className ?? ''}`.trim();
};

/**
 * Build avatar image className
 * Applies styling for the avatar image element
 */
export const buildAvatarImageClassName = (
  variant: AvatarVariant = 'circle',
): string => {
  const variantClass = styles.avatarImageVariants[variant];
  return `${styles.avatarImage} ${variantClass}`.trim();
};

/**
 * Build avatar initials className
 * Applies styling for the initials text
 */
export const buildAvatarInitialsClassName = (
  size: AvatarSize = 'md',
): string => {
  const sizeClass = styles.avatarInitialsSizes[size];
  return `${styles.avatarInitials} ${sizeClass}`.trim();
};

/**
 * Build avatar icon className
 * Applies styling for the fallback icon
 */
export const buildAvatarIconClassName = (size: AvatarSize = 'md'): string => {
  const sizeClass = styles.avatarIconSizes[size];
  return `${styles.avatarIcon} ${sizeClass}`.trim();
};

/**
 * Build status indicator className
 * Applies styling for the status dot
 */
export const buildStatusIndicatorClassName = (
  size: AvatarSize = 'md',
  status: AvatarStatus = 'online',
): string => {
  const sizeClass = styles.statusIndicatorSizes[size];
  const statusClass = styles.statusIndicatorVariants[status];
  return `${styles.statusIndicator} ${sizeClass} ${statusClass}`.trim();
};

/**
 * Generate initials from a name
 * Extracts first letter of first two words
 */
export const generateInitials = (name: string): string => {
  if (!name || !name.trim()) return '';

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Single word: take first two characters
    return words[0].slice(0, 2).toUpperCase();
  }

  // Multiple words: take first letter of first two words
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
};

/**
 * Get icon size for the avatar size
 * Maps avatar sizes to appropriate icon sizes
 */
export const getIconSize = (size: AvatarSize): number => {
  const iconSizeMap: Record<AvatarSize, number> = {
    xs: 12,
    sm: 14,
    md: 18,
    lg: 22,
    xl: 28,
    '2xl': 36,
  };

  return iconSizeMap[size];
};
