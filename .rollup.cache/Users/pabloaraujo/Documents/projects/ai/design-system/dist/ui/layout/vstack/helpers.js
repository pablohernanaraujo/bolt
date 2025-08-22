import * as styles from './vstack.css';
export const buildVStackClassName = (props) => {
    const { space = '0', align = 'stretch', justify = 'start', wrap = false, reversed = false, className, } = props;
    const classNames = [
        styles.vstack,
        styles.space[space],
        styles.align[align],
        styles.justify[justify],
    ];
    if (wrap) {
        classNames.push(styles.wrap);
    }
    if (reversed) {
        classNames.push(styles.reversed);
    }
    if (className) {
        classNames.push(className);
    }
    return classNames.filter(Boolean).join(' ').trim();
};
export const isValidSpaceValue = (value) => {
    const validValues = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '8',
        '10',
        '12',
        '16',
        '20',
        '24',
    ];
    return typeof value === 'string' && validValues.includes(value);
};
