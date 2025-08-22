const generatePaginationItems = (config) => {
    const { currentPage, totalPages, maxVisiblePages, showFirstLast, showPrevNext, disabled, previousText, nextText, firstText, lastText, pageAriaLabel, } = config;
    const items = [];
    if (showFirstLast && totalPages > 1) {
        items.push({
            type: 'first',
            page: 1,
            disabled: disabled || currentPage === 1,
            text: firstText,
            ariaLabel: 'Go to first page',
            key: 'first',
        });
    }
    if (showPrevNext && totalPages > 1) {
        items.push({
            type: 'previous',
            page: Math.max(1, currentPage - 1),
            disabled: disabled || currentPage === 1,
            text: previousText,
            ariaLabel: 'Go to previous page',
            key: 'previous',
        });
    }
    const pageItems = generatePageItems(currentPage, totalPages, maxVisiblePages);
    for (const [index, item] of pageItems.entries()) {
        if (item.type === 'ellipsis') {
            items.push({
                type: 'ellipsis',
                disabled: true,
                text: '…',
                ariaLabel: 'More pages',
                key: `ellipsis-${index}`,
            });
        }
        else if (item.type === 'page' && item.page !== undefined) {
            items.push({
                type: 'page',
                page: item.page,
                isActive: item.page === currentPage,
                disabled: disabled,
                text: item.page.toString(),
                ariaLabel: pageAriaLabel(item.page),
                key: `page-${item.page}`,
            });
        }
    }
    if (showPrevNext && totalPages > 1) {
        items.push({
            type: 'next',
            page: Math.min(totalPages, currentPage + 1),
            disabled: disabled || currentPage === totalPages,
            text: nextText,
            ariaLabel: 'Go to next page',
            key: 'next',
        });
    }
    if (showFirstLast && totalPages > 1) {
        items.push({
            type: 'last',
            page: totalPages,
            disabled: disabled || currentPage === totalPages,
            text: lastText,
            ariaLabel: 'Go to last page',
            key: 'last',
        });
    }
    return items;
};
const generatePageItems = (currentPage, totalPages, maxVisiblePages) => {
    if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => ({
            type: 'page',
            page: i + 1,
        }));
    }
    const items = [];
    const sidePages = Math.floor((maxVisiblePages - 1) / 2);
    const leftBoundary = currentPage - sidePages;
    const rightBoundary = currentPage + sidePages;
    items.push({
        type: 'page',
        page: 1,
    });
    if (leftBoundary > 2) {
        items.push({
            type: 'ellipsis',
        });
    }
    const startPage = Math.max(2, leftBoundary);
    const endPage = Math.min(totalPages - 1, rightBoundary);
    for (let page = startPage; page <= endPage; page++) {
        if (page === 1)
            continue;
        if (page === totalPages && totalPages > 1)
            continue;
        items.push({
            type: 'page',
            page,
        });
    }
    if (rightBoundary < totalPages - 1) {
        items.push({
            type: 'ellipsis',
        });
    }
    if (totalPages > 1) {
        items.push({
            type: 'page',
            page: totalPages,
        });
    }
    return items;
};
const validatePaginationProps = (currentPage, totalPages) => {
    const normalizedTotalPages = Math.max(1, Math.floor(totalPages));
    const normalizedCurrentPage = Math.max(1, Math.min(normalizedTotalPages, Math.floor(currentPage)));
    return {
        currentPage: normalizedCurrentPage,
        totalPages: normalizedTotalPages,
    };
};
const buildPaginationClassName = (variant, size, className) => {
    const baseClass = 'pagination';
    const variantClass = `pagination--${variant}`;
    const sizeClass = `pagination--${size}`;
    return [baseClass, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ');
};
const defaultPaginationConfig = {
    maxVisiblePages: 5,
    showFirstLast: true,
    showPrevNext: true,
    disabled: false,
    size: 'medium',
    variant: 'default',
    previousText: 'Previous',
    nextText: 'Next',
    firstText: 'First',
    lastText: 'Last',
    pageAriaLabel: (page) => `Go to page ${page}`,
    'aria-label': 'Pagination navigation',
};

export { buildPaginationClassName, defaultPaginationConfig, generatePageItems, generatePaginationItems, validatePaginationProps };
//# sourceMappingURL=helpers.js.map
