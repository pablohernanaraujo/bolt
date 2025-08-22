import { type ComponentPropsWithoutRef, type ElementType } from 'react';
import { type KeyEmphasis } from '@/tokens';
import { type SharedTypographyProps } from '../shared-types';
export interface SubtitleProps extends ComponentPropsWithoutRef<'p'>, SharedTypographyProps {
    as?: ElementType;
    className?: string;
    emphasis?: KeyEmphasis;
}
