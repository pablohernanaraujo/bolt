import { type ReactNode } from 'react';
import { type PaginationConfig, type PaginationPageItem } from './types';
export declare const generatePaginationItems: (config: PaginationConfig) => PaginationPageItem[];
export declare const generatePageItems: (currentPage: number, totalPages: number, maxVisiblePages: number) => Array<{
    type: "page" | "ellipsis";
    page?: number;
}>;
export declare const validatePaginationProps: (currentPage: number, totalPages: number) => {
    currentPage: number;
    totalPages: number;
};
export declare const buildPaginationClassName: (variant: "default" | "simple", size: "small" | "medium" | "large", className?: string) => string;
export declare const defaultPaginationConfig: {
    maxVisiblePages: number;
    showFirstLast: boolean;
    showPrevNext: boolean;
    disabled: boolean;
    size: "medium";
    variant: "default";
    previousText: ReactNode;
    nextText: ReactNode;
    firstText: ReactNode;
    lastText: ReactNode;
    pageAriaLabel: (page: number) => string;
    'aria-label': string;
};
//# sourceMappingURL=helpers.d.ts.map