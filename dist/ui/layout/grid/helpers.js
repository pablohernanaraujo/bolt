import { tokens } from '../../../tokens/tokens.css.js';

const getSpaceValue = (space) => tokens.space[space] || space;
const getGridLineValue = (line) => {
    if (typeof line === 'number') {
        return line.toString();
    }
    if (typeof line === 'string' && line.startsWith('span ')) {
        return line;
    }
    return line;
};
const buildGridStyles = (props) => {
    const { templateColumns, templateRows, templateAreas, gap, columnGap, rowGap, autoColumns, autoRows, autoFlow, } = props;
    const styles = {};
    if (templateColumns) {
        styles.gridTemplateColumns = templateColumns;
    }
    if (templateRows) {
        styles.gridTemplateRows = templateRows;
    }
    if (templateAreas) {
        styles.gridTemplateAreas = templateAreas;
    }
    if (gap) {
        styles.gap = getSpaceValue(gap);
    }
    if (columnGap) {
        styles.columnGap = getSpaceValue(columnGap);
    }
    if (rowGap) {
        styles.rowGap = getSpaceValue(rowGap);
    }
    if (autoColumns) {
        styles.gridAutoColumns = autoColumns;
    }
    if (autoRows) {
        styles.gridAutoRows = autoRows;
    }
    if (autoFlow) {
        styles.gridAutoFlow = autoFlow;
    }
    return styles;
};
const buildGridItemStyles = (props) => {
    const { colStart, colEnd, colSpan, rowStart, rowEnd, rowSpan, area } = props;
    const styles = {};
    if (colStart !== undefined) {
        styles.gridColumnStart = getGridLineValue(colStart);
    }
    if (colEnd !== undefined) {
        styles.gridColumnEnd = getGridLineValue(colEnd);
    }
    if (colSpan !== undefined) {
        styles.gridColumn =
            typeof colSpan === 'number' ? `span ${colSpan}` : colSpan;
    }
    if (rowStart !== undefined) {
        styles.gridRowStart = getGridLineValue(rowStart);
    }
    if (rowEnd !== undefined) {
        styles.gridRowEnd = getGridLineValue(rowEnd);
    }
    if (rowSpan !== undefined) {
        styles.gridRow = typeof rowSpan === 'number' ? `span ${rowSpan}` : rowSpan;
    }
    if (area) {
        styles.gridArea = area;
    }
    return styles;
};
const buildGridClassName = (baseClassName, className) => {
    const classes = [baseClassName];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};
const buildGridItemClassName = (baseClassName, className) => {
    const classes = [baseClassName];
    if (className) {
        classes.push(className);
    }
    return classes.join(' ');
};

export { buildGridClassName, buildGridItemClassName, buildGridItemStyles, buildGridStyles, getGridLineValue, getSpaceValue };
//# sourceMappingURL=helpers.js.map
