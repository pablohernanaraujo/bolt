import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
export type AspectRatioPreset = 'square' | 'video' | 'photo' | 'classic' | 'cinema' | 'portrait' | 'golden';
export interface CustomAspectRatio {
    width: number;
    height: number;
}
export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export interface AspectRatioProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    preset?: AspectRatioPreset;
    ratio?: CustomAspectRatio;
    objectFit?: ObjectFit;
    as?: ElementType;
    children: ReactNode;
}
export interface AspectRatioClassNameProps {
    preset?: AspectRatioPreset;
    ratio?: CustomAspectRatio;
    objectFit?: ObjectFit;
    className?: string;
}
