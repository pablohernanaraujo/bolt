import { type HTMLAttributes } from 'react';
interface BaseSkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    isLoaded?: boolean;
    speed?: 'slow' | 'normal' | 'fast';
    startColor?: string;
    endColor?: string;
    isAnimated?: boolean;
}
export interface SkeletonProps extends BaseSkeletonProps {
    height?: string | number;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    aspectRatio?: number;
    borderRadius?: 'none' | 'small' | 'medium' | 'large' | 'full' | string;
    children?: React.ReactNode;
}
export interface SkeletonCircleProps extends BaseSkeletonProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string | number;
    children?: React.ReactNode;
}
export interface SkeletonTextProps extends BaseSkeletonProps {
    noOfLines?: number;
    spacing?: string | number;
    skeletonHeight?: string | number;
    children?: React.ReactNode;
}
export type SkeletonSpeed = 'slow' | 'normal' | 'fast';
export type SkeletonCircleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SkeletonBorderRadius = 'none' | 'small' | 'medium' | 'large' | 'full';
export {};
//# sourceMappingURL=types.d.ts.map