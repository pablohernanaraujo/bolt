import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
export type SpaceValue = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16' | '20' | '24';
interface BaseContainerProps {
    paddingY?: SpaceValue;
    className?: string;
    children?: ReactNode;
}
export type ContainerProps<T extends ElementType = 'div'> = BaseContainerProps & Omit<ComponentPropsWithoutRef<T>, keyof BaseContainerProps> & {
    as?: T;
};
export type SimpleContainerProps = ContainerProps<'div'> | ContainerProps<'main'> | ContainerProps<'section'> | ContainerProps<'article'>;
export {};
