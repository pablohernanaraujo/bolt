import { type SharedTypographyProps } from '../ui/typography/shared-types';
import { type KeyEmphasis } from './emphasis.css';
export declare const buildTypographyClass: (baseClass: string, emphasis?: KeyEmphasis) => string;
export declare const buildCompleteTypographyClass: (baseClass: string, emphasis?: KeyEmphasis, modifiers?: Omit<SharedTypographyProps, "className">, customClass?: string) => string;
