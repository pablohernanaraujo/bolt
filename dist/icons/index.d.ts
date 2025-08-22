import { type LucideIcon } from 'lucide-react';
import { type ComponentProps } from 'react';
export * from 'lucide-react';
export declare const iconSizes: {
    readonly xs: 14;
    readonly sm: 16;
    readonly md: 20;
    readonly lg: 24;
    readonly xl: 32;
};
export type IconSize = keyof typeof iconSizes;
export interface IconProps extends ComponentProps<'svg'> {
    size?: IconSize | number;
    slot?: string;
}
export declare function createIcon(LucideIconComponent: LucideIcon): React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
export interface GenericIconProps extends IconProps {
    icon: LucideIcon;
}
export declare const Icon: import("react").ForwardRefExoticComponent<Omit<GenericIconProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
