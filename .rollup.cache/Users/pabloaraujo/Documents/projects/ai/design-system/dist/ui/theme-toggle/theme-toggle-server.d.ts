import { type FC } from 'react';
import { type ThemeVariant } from '@/tokens/themes';
import { type ThemeToggleProps } from './types';
interface ThemeToggleServerProps extends Omit<ThemeToggleProps, 'onClick'> {
    currentTheme: ThemeVariant;
}
export declare const ThemeToggleServer: FC<ThemeToggleServerProps>;
export {};
