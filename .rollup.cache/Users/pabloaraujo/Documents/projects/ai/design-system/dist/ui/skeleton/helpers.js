import { skeleton, skeletonCircle } from './skeleton.css';
export const buildSkeletonClassName = (isLoaded = false, speed = 'normal', borderRadius = 'medium', isAnimated = true, className) => {
    const skeletonClass = skeleton({
        animation: isAnimated ? 'animated' : 'static',
        speed,
        borderRadius,
        loaded: isLoaded,
    });
    if (className) {
        return `${skeletonClass} ${className}`;
    }
    return skeletonClass;
};
export const buildSkeletonCircleClassName = (size = 'md', isLoaded = false, speed = 'normal', isAnimated = true, className) => {
    const skeletonClass = skeletonCircle({
        size: isValidCircleSize(size) ? size : undefined,
        animation: isAnimated ? 'animated' : 'static',
        speed,
        loaded: isLoaded,
    });
    if (className) {
        return `${skeletonClass} ${className}`;
    }
    return skeletonClass;
};
export const buildSkeletonStyle = (props) => {
    const style = {};
    if (props.height !== undefined) {
        style.height =
            typeof props.height === 'number' ? `${props.height}px` : props.height;
    }
    if (props.width !== undefined) {
        style.width =
            typeof props.width === 'number' ? `${props.width}px` : props.width;
    }
    if (props.minWidth !== undefined) {
        style.minWidth =
            typeof props.minWidth === 'number'
                ? `${props.minWidth}px`
                : props.minWidth;
    }
    if (props.maxWidth !== undefined) {
        style.maxWidth =
            typeof props.maxWidth === 'number'
                ? `${props.maxWidth}px`
                : props.maxWidth;
    }
    if (props.aspectRatio !== undefined && props.width) {
        const width = typeof props.width === 'number'
            ? props.width
            : Number.parseFloat(props.width.toString());
        if (!isNaN(width)) {
            style.height = `${width / props.aspectRatio}px`;
        }
    }
    if (props.startColor) {
        style.backgroundColor = props.startColor;
    }
    if (props.endColor && props.startColor) {
        style['--skeleton-start-color'] = props.startColor;
        style['--skeleton-end-color'] = props.endColor;
    }
    return style;
};
export const buildSkeletonCircleStyle = (size = 'md', startColor, endColor) => {
    const style = {};
    if (!isValidCircleSize(size)) {
        const sizeValue = typeof size === 'number' ? `${size}px` : size;
        style.width = sizeValue;
        style.height = sizeValue;
    }
    if (startColor) {
        style.backgroundColor = startColor;
    }
    if (endColor && startColor) {
        style['--skeleton-start-color'] = startColor;
        style['--skeleton-end-color'] = endColor;
    }
    return style;
};
export const getSkeletonAriaAttributes = (isLoaded = false, label) => {
    if (isLoaded) {
        return {};
    }
    return {
        'aria-busy': true,
        'aria-live': 'polite',
        'aria-label': label || 'Loading content',
        role: 'status',
    };
};
export const isValidCircleSize = (size) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(size);
export const isValidBorderRadius = (borderRadius) => ['none', 'small', 'medium', 'large', 'full'].includes(borderRadius);
export const getAnimationDuration = (speed) => {
    switch (speed) {
        case 'slow':
            return '3s';
        case 'fast':
            return '1s';
        case 'normal':
        default:
            return '2s';
    }
};
export const generateTextLines = (noOfLines, lastLineWidth = 80) => {
    const lines = [];
    for (let i = 0; i < noOfLines; i++) {
        const isLastLine = i === noOfLines - 1;
        const width = isLastLine ? `${lastLineWidth}%` : '100%';
        lines.push({
            width,
            key: `skeleton-line-${i}`,
        });
    }
    return lines;
};
export const getResponsiveDimensions = (baseWidth, baseHeight, containerWidth, maxWidth) => {
    let width = baseWidth;
    let height = baseHeight;
    if (containerWidth && width > containerWidth) {
        const ratio = height / width;
        width = containerWidth;
        height = width * ratio;
    }
    if (maxWidth && width > maxWidth) {
        const ratio = height / width;
        width = maxWidth;
        height = width * ratio;
    }
    return {
        width: `${Math.round(width)}px`,
        height: `${Math.round(height)}px`,
    };
};
export const mergeSkeletonProps = (props, defaults) => ({
    ...defaults,
    ...props,
    isLoaded: props.isLoaded ?? false,
    isAnimated: props.isAnimated ?? true,
    speed: props.speed ?? 'normal',
});
