import { type FC } from 'react';
import type { AccordionItemProps, AccordionProps } from './types';
export declare const AccordionItem: FC<AccordionItemProps & {
    isExpanded?: boolean;
    onToggle?: () => void;
    size?: AccordionProps['size'];
    variant?: AccordionProps['variant'];
    disableAnimation?: boolean;
}>;
export declare const Accordion: FC<AccordionProps>;
//# sourceMappingURL=accordion.d.ts.map