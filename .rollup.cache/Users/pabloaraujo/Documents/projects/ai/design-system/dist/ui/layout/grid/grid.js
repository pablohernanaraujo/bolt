import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import * as styles from './grid.css';
import { buildGridClassName, buildGridStyles } from './helpers';
export const Grid = forwardRef(({ templateColumns, templateRows, templateAreas, gap, columnGap, rowGap, autoColumns, autoRows, autoFlow, as: Component = 'div', className, children, style, ...props }, ref) => {
    const gridStyles = buildGridStyles({
        templateColumns,
        templateRows,
        templateAreas,
        gap,
        columnGap,
        rowGap,
        autoColumns,
        autoRows,
        autoFlow,
    });
    const gridClassName = buildGridClassName(styles.grid, className);
    const combinedStyles = {
        ...gridStyles,
        ...style,
    };
    return (_jsx(Component, { ref: ref, className: gridClassName, style: combinedStyles, ...props, children: children }));
});
Grid.displayName = 'Grid';
