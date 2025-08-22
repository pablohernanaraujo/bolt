import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
export type SpaceValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24';
export type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface VStackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    space?: SpaceValue;
    align?: AlignValue;
    justify?: JustifyValue;
    wrap?: boolean;
    reversed?: boolean;
    as?: ElementType;
    children: ReactNode;
}
