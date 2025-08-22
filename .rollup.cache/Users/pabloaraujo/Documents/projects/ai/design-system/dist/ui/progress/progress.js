'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { ProgressBar } from 'react-aria-components';
import { buildProgressClassName, formatProgressValue } from './helpers';
import * as styles from './progress.css';
export const Progress = forwardRef(({ variant = 'primary', size = 'medium', label, showValue = false, formatValue = formatProgressValue, isStriped = false, isAnimated = false, className, value, maxValue = 100, ...props }, ref) => {
    const isIndeterminate = value === undefined;
    const percentage = isIndeterminate
        ? 0
        : Math.min((value / maxValue) * 100, 100);
    const displayValue = isIndeterminate ? '' : formatValue(value, maxValue);
    return (_jsxs("div", { className: label ? styles.progressWithLabel : undefined, ref: ref, children: [label && (_jsxs("div", { className: styles.labelRow, children: [_jsx("span", { className: styles.progressLabel, children: label }), showValue && !isIndeterminate && (_jsx("span", { className: styles.progressValue, children: displayValue }))] })), _jsx(ProgressBar, { value: value, maxValue: maxValue, className: buildProgressClassName(variant, size, isStriped, isAnimated, isIndeterminate, className), ...props, children: ({ percentage: ariaPercentage }) => (_jsx(_Fragment, { children: _jsx("div", { className: `${styles.progressTrack} ${styles.trackSizes[size]} ${isIndeterminate ? styles.indeterminateTrack : ''}`, children: _jsx("div", { className: `${styles.progressBar} ${styles.barVariants[variant]} ${isIndeterminate ? styles.indeterminate : ''}`, style: {
                                width: isIndeterminate
                                    ? '30%'
                                    : `${ariaPercentage || percentage}%`,
                            }, children: isStriped && (_jsx("div", { className: `${styles.stripedOverlay} ${isAnimated ? styles.animatedStripes : ''}` })) }) }) })) })] }));
});
Progress.displayName = 'Progress';
