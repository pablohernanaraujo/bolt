import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { type KeyEmphasis } from '@/tokens';
import { type SharedTypographyProps } from '../shared-types';
export interface OverlineProps extends ComponentPropsWithoutRef<'span'>, SharedTypographyProps {
    as?: ElementType;
    className?: string;
    emphasis?: KeyEmphasis;
}
