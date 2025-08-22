import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { mergeSkeletonProps, buildSkeletonCircleClassName, buildSkeletonCircleStyle, getSkeletonAriaAttributes } from './helpers.js';

const SkeletonCircle = forwardRef((props, ref) => {
    const { size = 'md', isLoaded = false, speed = 'normal', isAnimated = true, startColor, endColor, className, style, children, ...htmlProps } = mergeSkeletonProps(props, {
        size: 'md',
        isLoaded: false,
        speed: 'normal',
        isAnimated: true,
    });
    const skeletonClassName = buildSkeletonCircleClassName(size, isLoaded, speed, isAnimated, className);
    const skeletonStyle = {
        ...buildSkeletonCircleStyle(size, startColor, endColor),
        ...style,
    };
    const ariaAttributes = getSkeletonAriaAttributes(isLoaded);
    if (isLoaded && children) {
        return (jsx("div", { ref: ref, className: className, style: {
                ...skeletonStyle,
                ...style,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }, ...htmlProps, children: children }));
    }
    return (jsx("div", { ref: ref, className: skeletonClassName, style: skeletonStyle, ...ariaAttributes, ...htmlProps }));
});
SkeletonCircle.displayName = 'SkeletonCircle';

export { SkeletonCircle };
//# sourceMappingURL=skeleton-circle.js.map
