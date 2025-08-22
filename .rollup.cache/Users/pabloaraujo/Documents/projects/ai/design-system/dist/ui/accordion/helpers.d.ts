import type { AccordionRenderProps, AccordionSize, AccordionVariant } from './types';
export declare const buildAccordionClassName: (variant?: AccordionVariant, size?: AccordionSize, fullWidth?: boolean, className?: string) => string;
export declare const buildAccordionItemClassName: (variant?: AccordionVariant, isDisabled?: boolean, className?: string) => string;
export declare const buildAccordionTriggerClassName: (size?: AccordionSize, renderProps?: AccordionRenderProps, className?: string) => string;
export declare const buildAccordionContentClassName: (size?: AccordionSize, isExpanded?: boolean, disableAnimation?: boolean, className?: string) => string;
export declare const buildTriggerContentClassName: (className?: string) => string;
export declare const buildChevronClassName: (disableAnimation?: boolean, className?: string) => string;
export declare const buildIconClassName: (disableAnimation?: boolean, className?: string) => string;
export declare const buildContentInnerClassName: (className?: string) => string;
export declare const normalizeKeys: (keys?: Set<string> | string[]) => Set<string>;
export declare const toggleKey: (keys: Set<string>, key: string, selectionMode: "single" | "multiple", allowAllClosed?: boolean) => Set<string>;
//# sourceMappingURL=helpers.d.ts.map