import { type ComponentPropsWithoutRef, type ElementType } from 'react';
export interface CenterProps<T extends ElementType = 'div'> {
    as?: T;
    children?: React.ReactNode;
    className?: string;
}
export type CenterComponentProps<T extends ElementType = 'div'> = CenterProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CenterProps<T>>;
