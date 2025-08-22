import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { type KeyEmphasis } from '@/tokens';
import { type SharedTypographyProps } from '../shared-types';
export interface H2Props extends ComponentPropsWithoutRef<'h2'>, SharedTypographyProps {
    as?: ElementType;
    className?: string;
    emphasis?: KeyEmphasis;
}
