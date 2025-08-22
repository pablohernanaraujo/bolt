import { progress } from './progress.css.js';

const buildProgressClassName = (variant, size, isStriped, isAnimated, isIndeterminate, className) => {
    const classes = [
        progress({
            variant,
            size,
            isStriped,
            isAnimated,
            isIndeterminate,
        }),
    ];
    if (className) {
        classes.push(className);
    }
    return classes.filter(Boolean).join(' ');
};
const formatProgressValue = (value, maxValue) => {
    const percentage = Math.round((value / maxValue) * 100);
    return `${percentage}%`;
};
const formatFileProgressValue = (value, maxValue) => `${value} / ${maxValue}`;
const formatTimeProgressValue = (value, maxValue) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    return `${formatTime(value)} / ${formatTime(maxValue)}`;
};
const formatDataProgressValue = (value, maxValue) => {
    const formatBytes = (bytes) => {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };
    return `${formatBytes(value)} / ${formatBytes(maxValue)}`;
};
const getProgressVariantByValue = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 100)
        return 'success';
    if (percentage >= 75)
        return 'primary';
    if (percentage >= 50)
        return 'warning';
    return 'error';
};
const calculateProgressPercentage = (value, maxValue) => {
    if (maxValue <= 0)
        return 0;
    return Math.min(Math.max((value / maxValue) * 100, 0), 100);
};
const isIndeterminateProgress = (value) => value === undefined;

export { buildProgressClassName, calculateProgressPercentage, formatDataProgressValue, formatFileProgressValue, formatProgressValue, formatTimeProgressValue, getProgressVariantByValue, isIndeterminateProgress };
//# sourceMappingURL=helpers.js.map
