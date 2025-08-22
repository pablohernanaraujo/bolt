import { type AvatarSize, type AvatarStatus, type AvatarVariant } from './types';
export declare const buildAvatarClassName: (size?: AvatarSize, variant?: AvatarVariant, className?: string) => string;
export declare const buildAvatarImageClassName: (variant?: AvatarVariant) => string;
export declare const buildAvatarInitialsClassName: (size?: AvatarSize) => string;
export declare const buildAvatarIconClassName: (size?: AvatarSize) => string;
export declare const buildStatusIndicatorClassName: (size?: AvatarSize, status?: AvatarStatus) => string;
export declare const generateInitials: (name: string) => string;
export declare const getIconSize: (size: AvatarSize) => number;
