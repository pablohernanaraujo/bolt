import { type ContentWrapperVariant, type SpaceValue } from './types';
interface BuildContentWrapperClassNameProps {
    variant?: ContentWrapperVariant;
    paddingX?: SpaceValue;
    borderless?: boolean;
    className?: string;
}
export declare const getEffectivePadding: (variant?: ContentWrapperVariant, paddingX?: SpaceValue, borderless?: boolean) => SpaceValue;
export declare const buildContentWrapperClassName: ({ variant, paddingX, borderless, className, }: BuildContentWrapperClassNameProps) => string;
export {};
