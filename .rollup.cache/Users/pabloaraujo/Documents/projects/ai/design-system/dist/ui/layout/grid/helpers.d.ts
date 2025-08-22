import { type GridGap, type GridItemProps, type GridLine, type GridProps } from './types';
export declare const getSpaceValue: (space: GridGap) => string;
export declare const getGridLineValue: (line: GridLine) => string;
export declare const buildGridStyles: (props: GridProps) => Record<string, string | undefined>;
export declare const buildGridItemStyles: (props: GridItemProps) => Record<string, string | undefined>;
export declare const buildGridClassName: (baseClassName: string, className?: string) => string;
export declare const buildGridItemClassName: (baseClassName: string, className?: string) => string;
