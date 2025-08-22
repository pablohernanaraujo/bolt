import { type ToggleProps } from './types';
export declare const buildContainerClassName: (labelPosition?: ToggleProps["labelPosition"], className?: string) => string;
export declare const buildTrackClassName: (size: ToggleProps["size"], variant: ToggleProps["variant"], isSelected: boolean) => string;
export declare const buildThumbClassName: (size: ToggleProps["size"], isSelected: boolean) => string;
export declare const buildLabelClassName: (size?: ToggleProps["size"]) => string;
