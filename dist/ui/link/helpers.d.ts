import { type KeyEmphasis } from '@/tokens';
import { type LinkSize, type LinkUnderline, type LinkVariant } from './types';
export declare const buildLinkClassName: (variant?: LinkVariant, size?: LinkSize, underlineBehavior?: LinkUnderline, isDisabled?: boolean, emphasis?: KeyEmphasis, typographyProps?: {
    bold?: boolean;
    isTruncated?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
    highlight?: boolean;
}, customClassName?: string) => string;
export declare const buildIconClassName: (isExternal?: boolean, customClassName?: string) => string;
export declare const isExternalUrl: (href?: string) => boolean;
export declare const getExternalLinkAttributes: (isExternal: boolean) => {
    target: string;
    rel: string;
};
export declare const sanitizeHref: (href?: string) => string | undefined;
export declare const buildContainerClassName: (iconPosition?: "left" | "right", customClassName?: string) => string;
//# sourceMappingURL=helpers.d.ts.map