import { type LucideIcon } from 'lucide-react';
import { type HTMLAttributes } from 'react';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarVariant = 'circle' | 'rounded' | 'square';
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    size?: AvatarSize;
    variant?: AvatarVariant;
    status?: AvatarStatus;
    showStatus?: boolean;
    icon?: React.ComponentType<any> | LucideIcon;
}
