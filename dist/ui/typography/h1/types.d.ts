import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { type KeyEmphasis } from '@/tokens';
import { type SharedTypographyProps } from '../shared-types';
export interface H1Props extends ComponentPropsWithoutRef<'h1'>, SharedTypographyProps {
    as?: ElementType;
    className?: string;
    emphasis?: KeyEmphasis;
}
