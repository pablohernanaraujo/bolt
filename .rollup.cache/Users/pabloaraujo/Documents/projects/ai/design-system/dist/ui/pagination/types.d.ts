import { type ReactNode } from 'react';
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'simple';
    showFirstLast?: boolean;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
    disabled?: boolean;
    'aria-label'?: string;
    className?: string;
    previousText?: ReactNode;
    nextText?: ReactNode;
    firstText?: ReactNode;
    lastText?: ReactNode;
    pageAriaLabel?: (page: number) => string;
}
export interface PaginationPageItem {
    type: 'page' | 'ellipsis' | 'first' | 'last' | 'previous' | 'next';
    page?: number;
    isActive?: boolean;
    disabled?: boolean;
    text?: ReactNode;
    ariaLabel?: string;
    key: string;
}
export interface PaginationConfig {
    currentPage: number;
    totalPages: number;
    maxVisiblePages: number;
    showFirstLast: boolean;
    showPrevNext: boolean;
    disabled: boolean;
    previousText: ReactNode;
    nextText: ReactNode;
    firstText: ReactNode;
    lastText: ReactNode;
    pageAriaLabel: (page: number) => string;
}
//# sourceMappingURL=types.d.ts.map