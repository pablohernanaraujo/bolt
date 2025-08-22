import { type FC } from 'react';
import { type ThemeVariant } from '@/tokens/themes';
import { type ThemeToggleProps } from './types';
interface ThemeToggleProgressiveProps extends Omit<ThemeToggleProps, 'onClick'> {
    initialTheme: ThemeVariant;
}
export declare const ThemeToggleProgressive: FC<ThemeToggleProgressiveProps>;
export {};
