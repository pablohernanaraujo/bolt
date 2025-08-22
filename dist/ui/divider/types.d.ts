import { type ComponentProps } from 'react';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerSize = 'thin' | 'medium' | 'thick';
export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';
export interface DividerProps extends ComponentProps<'div'> {
    orientation?: DividerOrientation;
    variant?: DividerVariant;
    size?: DividerSize;
    spacing?: DividerSpacing;
    className?: string;
}
//# sourceMappingURL=types.d.ts.map