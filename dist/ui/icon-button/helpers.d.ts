import { type ButtonRenderProps } from 'react-aria-components';
import { type IconSize } from '@/icons';
import { type IconButtonProps } from './types';
export declare const getIconSize: (buttonSize?: IconButtonProps["size"], iconSize?: IconButtonProps["iconSize"]) => IconSize | number;
export declare const getIconSizeValue: (size: IconSize | number) => number;
export declare const buildIconButtonClassName: (variant: IconButtonProps["variant"], size: IconButtonProps["size"], className: IconButtonProps["className"], renderProps: ButtonRenderProps & {
    defaultClassName: string;
}) => string;
