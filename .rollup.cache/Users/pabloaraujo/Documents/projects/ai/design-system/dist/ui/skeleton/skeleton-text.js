import { jsx as _jsx } from "react/jsx-runtime";
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
        return (_jsx("div", { ref: ref, className: className, style: style, ...htmlProps, children: children }));
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
    return (_jsx("div", { ref: ref, className: `${skeletonText} ${className || ''}`, style: containerStyle, ...ariaAttributes, ...htmlProps, children: textLines.map((line, index) => {
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
            return (_jsx("div", { className: lineClassName, style: lineStyle, "aria-hidden": "true" }, line.key));
        }) }));
});
SkeletonText.displayName = 'SkeletonText';
