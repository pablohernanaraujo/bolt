import { forwardRef } from 'react';
import { buildSkeletonCircleClassName, buildSkeletonCircleStyle, getSkeletonAriaAttributes, mergeSkeletonProps, } from './helpers';
export const SkeletonCircle = forwardRef((props, ref) => {
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
        return (<div ref={ref} className={className} style={{
                ...skeletonStyle,
                ...style,
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }} {...htmlProps}>
          {children}
        </div>);
    }
    return (<div ref={ref} className={skeletonClassName} style={skeletonStyle} {...ariaAttributes} {...htmlProps}/>);
});
SkeletonCircle.displayName = 'SkeletonCircle';
