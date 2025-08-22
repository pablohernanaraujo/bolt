import { type AspectRatioClassNameProps, type CustomAspectRatio } from './types';
export declare const calculateAspectRatio: (ratio: CustomAspectRatio) => string;
export declare const calculateFallbackPadding: (ratio: CustomAspectRatio) => string;
export declare const getAspectRatioValue: (preset?: string, ratio?: CustomAspectRatio) => string | undefined;
export declare const buildAspectRatioClassName: ({ preset, objectFit, className, }: AspectRatioClassNameProps) => string;
export declare const createAspectRatioStyles: (preset?: string, ratio?: CustomAspectRatio) => Record<string, string>;
//# sourceMappingURL=helpers.d.ts.map