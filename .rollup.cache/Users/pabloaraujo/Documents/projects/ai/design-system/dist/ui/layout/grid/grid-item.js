import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as styles from './grid-item.css';
import { buildGridItemClassName, buildGridItemStyles } from './helpers';
export const GridItem = forwardRef(({ colStart, colEnd, colSpan, rowStart, rowEnd, rowSpan, area, as: Component = 'div', className, children, style, ...props }, ref) => {
    const gridItemStyles = buildGridItemStyles({
        colStart,
        colEnd,
        colSpan,
        rowStart,
        rowEnd,
        rowSpan,
        area,
    });
    const gridItemClassName = buildGridItemClassName(styles.gridItem, className);
    const combinedStyles = {
        ...gridItemStyles,
        ...style,
    };
    return (_jsx(Component, { ref: ref, className: gridItemClassName, style: combinedStyles, ...props, children: children }));
});
GridItem.displayName = 'GridItem';
