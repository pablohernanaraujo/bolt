import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
export type SpaceValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24';
export type ContentWrapperVariant = 'screen' | 'header' | 'body' | 'footer';
interface BaseContentWrapperProps {
    variant?: ContentWrapperVariant;
    paddingX?: SpaceValue;
    borderless?: boolean;
    className?: string;
    children?: ReactNode;
}
export type ContentWrapperProps<T extends ElementType = 'div'> = BaseContentWrapperProps & Omit<ComponentPropsWithoutRef<T>, keyof BaseContentWrapperProps> & {
    as?: T;
};
export type SimpleContentWrapperProps = ContentWrapperProps<'div'> | ContentWrapperProps<'section'> | ContentWrapperProps<'header'> | ContentWrapperProps<'footer'> | ContentWrapperProps<'main'> | ContentWrapperProps<'article'>;
export {};
//# sourceMappingURL=types.d.ts.map