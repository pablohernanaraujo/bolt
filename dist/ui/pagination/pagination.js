import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Button } from 'react-aria-components';
import { validatePaginationProps, generatePaginationItems, buildPaginationClassName, defaultPaginationConfig } from './helpers.js';
import { pagination, paginationGap, paginationSection, paginationItem, srOnly, ellipsis, sizes, navigationButton, paginationButton, variants } from './pagination.css.js';

const PaginationButton = ({ type, page, isActive = false, disabled = false, text, ariaLabel, size, variant, onPageChange, }) => {
    if (type === 'ellipsis') {
        return (jsx("span", { className: `${ellipsis} ${sizes[size]}`, "aria-label": ariaLabel, role: "presentation", children: text }));
    }
    const handlePress = () => {
        if (!disabled && page !== undefined) {
            onPageChange(page);
        }
    };
    const isNavigationButton = ['first', 'last', 'previous', 'next'].includes(type);
    const buttonClassName = `${isNavigationButton ? navigationButton : paginationButton} ${sizes[size]} ${variants[variant]}`;
    return (jsx(Button, { className: buttonClassName, onPress: handlePress, isDisabled: disabled, "aria-current": isActive ? 'page' : undefined, "aria-label": ariaLabel, "data-variant": variant, "data-size": size, "data-type": type, children: text }));
};
const Pagination = ({ currentPage, totalPages, onPageChange, size = defaultPaginationConfig.size, variant = defaultPaginationConfig.variant, showFirstLast = defaultPaginationConfig.showFirstLast, showPrevNext = defaultPaginationConfig.showPrevNext, maxVisiblePages = defaultPaginationConfig.maxVisiblePages, disabled = defaultPaginationConfig.disabled, className, previousText = defaultPaginationConfig.previousText, nextText = defaultPaginationConfig.nextText, firstText = defaultPaginationConfig.firstText, lastText = defaultPaginationConfig.lastText, pageAriaLabel = defaultPaginationConfig.pageAriaLabel, 'aria-label': ariaLabel = defaultPaginationConfig['aria-label'], }) => {
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
    const containerClassName = `${pagination} ${paginationGap[size]} ${paginationClassName}`;
    if (validTotalPages <= 1) {
        return jsx(Fragment, {});
    }
    return (jsxs("nav", { role: "navigation", "aria-label": ariaLabel, className: containerClassName, children: [jsx("ol", { className: paginationSection, style: {
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'inherit',
                }, children: paginationItems.map((item) => (jsx("li", { className: paginationItem, children: jsx(PaginationButton, { type: item.type, page: item.page, isActive: item.isActive, disabled: item.disabled, text: item.text, ariaLabel: item.ariaLabel, size: size, variant: variant, onPageChange: onPageChange }) }, item.key))) }), jsxs("div", { "aria-live": "polite", "aria-atomic": "true", className: srOnly, children: ["Page ", validCurrentPage, " of ", validTotalPages] })] }));
};
Pagination.displayName = 'Pagination';

export { Pagination };
//# sourceMappingURL=pagination.js.map
