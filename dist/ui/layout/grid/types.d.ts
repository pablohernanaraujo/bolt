import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { type SpaceValue } from '../hstack';
export type GridTemplate = string;
export type GridGap = SpaceValue;
export type GridAuto = string;
export type GridLine = number | string;
export type GridArea = string;
export interface GridProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    templateColumns?: GridTemplate;
    templateRows?: GridTemplate;
    templateAreas?: string;
    gap?: GridGap;
    columnGap?: GridGap;
    rowGap?: GridGap;
    autoColumns?: GridAuto;
    autoRows?: GridAuto;
    autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
    as?: ElementType;
    children?: ReactNode;
    className?: string;
}
export interface GridItemProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    colStart?: GridLine;
    colEnd?: GridLine;
    colSpan?: GridLine;
    rowStart?: GridLine;
    rowEnd?: GridLine;
    rowSpan?: GridLine;
    area?: GridArea;
    as?: ElementType;
    children?: ReactNode;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map