import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { type KeyEmphasis } from '@/tokens';
import { type SharedTypographyProps } from '../typography/shared-types';
export type LinkVariant = 'primary' | 'secondary' | 'external' | 'disabled';
export type LinkSize = 'caption' | 'body3' | 'body2' | 'body1' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1';
export type LinkUnderline = 'none' | 'hover' | 'always';
export interface LinkProps extends ComponentPropsWithoutRef<'a'>, SharedTypographyProps {
    as?: ElementType;
    className?: string;
    variant?: LinkVariant;
    size?: LinkSize;
    emphasis?: KeyEmphasis;
    underlineBehavior?: LinkUnderline;
    isExternal?: boolean;
    isDisabled?: boolean;
    icon?: any;
    iconPosition?: 'left' | 'right';
}
