'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button as AriaButton } from 'react-aria-components';
import { buildPaginationClassName, defaultPaginationConfig, generatePaginationItems, validatePaginationProps, } from './helpers';
import * as styles from './pagination.css';
const PaginationButton = ({ type, page, isActive = false, disabled = false, text, ariaLabel, size, variant, onPageChange, }) => {
    if (type === 'ellipsis') {
        return (_jsx("span", { className: `${styles.ellipsis} ${styles.sizes[size]}`, "aria-label": ariaLabel, role: "presentation", children: text }));
    }
    const handlePress = () => {
        if (!disabled && page !== undefined) {
            onPageChange(page);
        }
    };
    const isNavigationButton = ['first', 'last', 'previous', 'next'].includes(type);
    const buttonClassName = `${isNavigationButton ? styles.navigationButton : styles.paginationButton} ${styles.sizes[size]} ${styles.variants[variant]}`;
    return (_jsx(AriaButton, { className: buttonClassName, onPress: handlePress, isDisabled: disabled, "aria-current": isActive ? 'page' : undefined, "aria-label": ariaLabel, "data-variant": variant, "data-size": size, "data-type": type, children: text }));
};
export const Pagination = ({ currentPage, totalPages, onPageChange, size = defaultPaginationConfig.size, variant = defaultPaginationConfig.variant, showFirstLast = defaultPaginationConfig.showFirstLast, showPrevNext = defaultPaginationConfig.showPrevNext, maxVisiblePages = defaultPaginationConfig.maxVisiblePages, disabled = defaultPaginationConfig.disabled, className, previousText = defaultPaginationConfig.previousText, nextText = defaultPaginationConfig.nextText, firstText = defaultPaginationConfig.firstText, lastText = defaultPaginationConfig.lastText, pageAriaLabel = defaultPaginationConfig.pageAriaLabel, 'aria-label': ariaLabel = defaultPaginationConfig['aria-label'], }) => {
    const { currentPage: validCurrentPage, totalPages: validTotalPages } = validatePaginationProps(currentPage, totalPages);
    const paginationItems = generatePaginationItems({
        currentPage: validCurrentPage,
        totalPages: validTotalPages,
        maxVisiblePages,
        showFirstLast,
        showPrevNext,
        disabled,
        previousText,
        nextText,
        firstText,
        lastText,
        pageAriaLabel,
    });
    const paginationClassName = buildPaginationClassName(variant, size, className);
    const containerClassName = `${styles.pagination} ${styles.paginationGap[size]} ${paginationClassName}`;
    if (validTotalPages <= 1) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs("nav", { role: "navigation", "aria-label": ariaLabel, className: containerClassName, children: [_jsx("ol", { className: styles.paginationSection, style: {
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'inherit',
                }, children: paginationItems.map((item) => (_jsx("li", { className: styles.paginationItem, children: _jsx(PaginationButton, { type: item.type, page: item.page, isActive: item.isActive, disabled: item.disabled, text: item.text, ariaLabel: item.ariaLabel, size: size, variant: variant, onPageChange: onPageChange }) }, item.key))) }), _jsxs("div", { "aria-live": "polite", "aria-atomic": "true", className: styles.srOnly, children: ["Page ", validCurrentPage, " of ", validTotalPages] })] }));
};
Pagination.displayName = 'Pagination';
