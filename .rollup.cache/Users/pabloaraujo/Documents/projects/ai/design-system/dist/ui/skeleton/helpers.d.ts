import { type SkeletonBorderRadius, type SkeletonCircleProps, type SkeletonCircleSize, type SkeletonProps, type SkeletonSpeed } from './types';
export declare const buildSkeletonClassName: (isLoaded?: boolean, speed?: SkeletonSpeed, borderRadius?: SkeletonBorderRadius, isAnimated?: boolean, className?: string) => string;
export declare const buildSkeletonCircleClassName: (size?: SkeletonCircleSize | string | number, isLoaded?: boolean, speed?: SkeletonSpeed, isAnimated?: boolean, className?: string) => string;
export declare const buildSkeletonStyle: (props: Pick<SkeletonProps, "height" | "width" | "minWidth" | "maxWidth" | "aspectRatio" | "startColor" | "endColor">) => React.CSSProperties;
export declare const buildSkeletonCircleStyle: (size?: SkeletonCircleSize | string | number, startColor?: string, endColor?: string) => React.CSSProperties;
export declare const getSkeletonAriaAttributes: (isLoaded?: boolean, label?: string) => React.AriaAttributes & {
    role?: string;
};
export declare const isValidCircleSize: (size: any) => size is SkeletonCircleSize;
export declare const isValidBorderRadius: (borderRadius: any) => borderRadius is SkeletonBorderRadius;
export declare const getAnimationDuration: (speed: SkeletonSpeed) => string;
export declare const generateTextLines: (noOfLines: number, lastLineWidth?: number) => Array<{
    width: string;
    key: string;
}>;
export declare const getResponsiveDimensions: (baseWidth: number, baseHeight: number, containerWidth?: number, maxWidth?: number) => {
    width: string;
    height: string;
};
export declare const mergeSkeletonProps: <T extends SkeletonProps | SkeletonCircleProps>(props: T, defaults: Partial<T>) => T;
