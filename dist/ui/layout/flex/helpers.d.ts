import { type AlignValue, type FlexDirection, type FlexWrap, type JustifyValue, type SpaceValue } from './types';
export interface FlexClassNameProps {
    direction: FlexDirection;
    wrap: FlexWrap;
    align: AlignValue;
    justify: JustifyValue;
    gap: SpaceValue;
    className?: string;
}
export declare const buildFlexClassName: ({ direction, wrap, align, justify, gap, className, }: FlexClassNameProps) => string;
export declare const isColumnDirection: (direction: FlexDirection) => boolean;
export declare const isReversedDirection: (direction: FlexDirection) => boolean;
