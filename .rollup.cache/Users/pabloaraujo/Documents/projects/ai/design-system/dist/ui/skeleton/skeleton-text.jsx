import { forwardRef } from 'react';
import { buildSkeletonClassName, generateTextLines, getSkeletonAriaAttributes, mergeSkeletonProps, } from './helpers';
import { skeletonText, skeletonTextLine } from './skeleton.css';
export const SkeletonText = forwardRef((props, ref) => {
    const { noOfLines = 3, spacing = '0.5rem', skeletonHeight = '1rem', isLoaded = false, speed = 'normal', isAnimated = true, startColor, endColor, className, style, children, ...htmlProps } = mergeSkeletonProps(props, {
        noOfLines: 3,
        spacing: '0.5rem',
        skeletonHeight: '1rem',
        isLoaded: false,
        speed: 'normal',
        isAnimated: true,
    });
    const ariaAttributes = getSkeletonAriaAttributes(isLoaded, `Loading ${noOfLines} lines of text`);
    if (isLoaded && children) {
        return (<div ref={ref} className={className} style={style} {...htmlProps}>
          {children}
        </div>);
    }
    const textLines = generateTextLines(noOfLines);
    const containerStyle = {
        ...style,
        gap: typeof spacing === 'number' ? `${spacing}px` : spacing,
    };
    const lineBaseStyle = {
        height: typeof skeletonHeight === 'number'
            ? `${skeletonHeight}px`
            : skeletonHeight,
        backgroundColor: startColor,
    };
    return (<div ref={ref} className={`${skeletonText} ${className || ''}`} style={containerStyle} {...ariaAttributes} {...htmlProps}>
        {textLines.map((line, index) => {
            const lineClassName = buildSkeletonClassName(false, speed, 'medium', isAnimated, skeletonTextLine);
            const lineStyle = {
                ...lineBaseStyle,
                width: line.width,
                ...(startColor &&
                    endColor && {
                    background: `linear-gradient(90deg, ${startColor}, ${endColor}, ${startColor})`,
                    backgroundSize: '200% 100%',
                }),
            };
            return (<div key={line.key} className={lineClassName} style={lineStyle} aria-hidden="true"/>);
        })}
      </div>);
});
SkeletonText.displayName = 'SkeletonText';
