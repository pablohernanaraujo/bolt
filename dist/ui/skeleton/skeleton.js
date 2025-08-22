import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { mergeSkeletonProps, buildSkeletonClassName, buildSkeletonStyle, getSkeletonAriaAttributes, isValidBorderRadius } from './helpers.js';

const Skeleton = forwardRef((props, ref) => {
    const { isLoaded = false, speed = 'normal', isAnimated = true, borderRadius = 'medium', height, width, minWidth, maxWidth, aspectRatio, startColor, endColor, className, style, children, ...htmlProps } = mergeSkeletonProps(props, {
        isLoaded: false,
        speed: 'normal',
        isAnimated: true,
        borderRadius: 'medium',
    });
    const validBorderRadius = isValidBorderRadius(borderRadius)
        ? borderRadius
        : 'medium';
    const skeletonClassName = buildSkeletonClassName(isLoaded, speed, validBorderRadius, isAnimated, className);
    const skeletonStyle = {
        ...buildSkeletonStyle({
            height,
            width,
            minWidth,
            maxWidth,
            aspectRatio,
            startColor,
            endColor,
        }),
        ...style,
    };
    const ariaAttributes = getSkeletonAriaAttributes(isLoaded);
    if (isLoaded && children) {
        return (jsx("div", { ref: ref, className: className, style: style, ...htmlProps, children: children }));
    }
    return (jsx("div", { ref: ref, className: skeletonClassName, style: skeletonStyle, ...ariaAttributes, ...htmlProps }));
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
//# sourceMappingURL=skeleton.js.map
