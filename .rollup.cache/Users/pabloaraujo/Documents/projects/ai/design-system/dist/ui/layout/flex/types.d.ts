import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
export type SpaceValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type JustifyValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface FlexProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    direction?: FlexDirection;
    wrap?: FlexWrap;
    align?: AlignValue;
    justify?: JustifyValue;
    gap?: SpaceValue;
    as?: ElementType;
    children: ReactNode;
}
//# sourceMappingURL=types.d.ts.map