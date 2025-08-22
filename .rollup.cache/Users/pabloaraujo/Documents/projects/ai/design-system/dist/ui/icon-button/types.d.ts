import { type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { type LucideIcon } from 'lucide-react';
import { type IconSize } from '@/icons';
export interface IconButtonProps extends AriaButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    icon: LucideIcon;
    iconSize?: IconSize | number;
    'aria-label': string;
}
//# sourceMappingURL=types.d.ts.map