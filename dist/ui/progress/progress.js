import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { ProgressBar } from 'react-aria-components';
import { formatProgressValue, buildProgressClassName } from './helpers.js';
import { progressWithLabel, labelRow, progressLabel, progressValue, progressTrack, trackSizes, indeterminateTrack, progressBar, barVariants, indeterminate, stripedOverlay, animatedStripes } from './progress.css.js';

const Progress = forwardRef(({ variant = 'primary', size = 'medium', label, showValue = false, formatValue = formatProgressValue, isStriped = false, isAnimated = false, className, value, maxValue = 100, ...props }, ref) => {
    const isIndeterminate = value === undefined;
    const percentage = isIndeterminate
        ? 0
        : Math.min((value / maxValue) * 100, 100);
    const displayValue = isIndeterminate ? '' : formatValue(value, maxValue);
    return (jsxs("div", { className: label ? progressWithLabel : undefined, ref: ref, children: [label && (jsxs("div", { className: labelRow, children: [jsx("span", { className: progressLabel, children: label }), showValue && !isIndeterminate && (jsx("span", { className: progressValue, children: displayValue }))] })), jsx(ProgressBar, { value: value, maxValue: maxValue, className: buildProgressClassName(variant, size, isStriped, isAnimated, isIndeterminate, className), ...props, children: ({ percentage: ariaPercentage }) => (jsx(Fragment, { children: jsx("div", { className: `${progressTrack} ${trackSizes[size]} ${isIndeterminate ? indeterminateTrack : ''}`, children: jsx("div", { className: `${progressBar} ${barVariants[variant]} ${isIndeterminate ? indeterminate : ''}`, style: {
                                width: isIndeterminate
                                    ? '30%'
                                    : `${ariaPercentage || percentage}%`,
                            }, children: isStriped && (jsx("div", { className: `${stripedOverlay} ${isAnimated ? animatedStripes : ''}` })) }) }) })) })] }));
});
Progress.displayName = 'Progress';

export { Progress };
//# sourceMappingURL=progress.js.map
